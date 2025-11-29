/**
 * Tutor Courses Module
 * Handles tutor-specific course management logic
 */

import { mockTutorClasses } from "./config.js";
import { showToast, setButtonLoading } from "./ui.js";

// Render Tutor Courses
export function renderTutorCourses() {
  const container = document.getElementById("tutor-courses-list");
  if (!container) return;

  container.innerHTML = mockTutorClasses
    .map((c) => {
      const isOngoing = c.status === "ONGOING";
      const statusBadge = isOngoing
        ? `<span class="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold flex-shrink-0 ml-2 animate-pulse">Đang diễn ra</span>`
        : `<span class="px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-xs font-bold flex-shrink-0 ml-2">Đã kết thúc</span>`;

      const avgScore =
        c.students.reduce((acc, s) => acc + (parseFloat(s.average) || 0), 0) /
        (c.students.filter((s) => s.average !== "--").length || 1);

      return `
        <div class="glass-card p-6 rounded-[28px] group hover:border-blue-300 transition-all duration-300 relative overflow-hidden">
            <div class="absolute top-0 right-0 w-32 h-32 bg-blue-400/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

            <div class="flex flex-col md:flex-row gap-6 items-start">
                <div class="w-full md:w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center text-2xl text-blue-600 shadow-inner flex-shrink-0">
                    <i class="fa-solid fa-chalkboard-user"></i>
                </div>

                <div class="flex-1 w-full min-w-0">
                    <div class="flex justify-between items-start">
                        <div class="min-w-0">
                            <span class="text-[10px] font-bold bg-blue-50 text-blue-600 px-2 py-1 rounded uppercase tracking-wider shadow-sm">${
                              c.id
                            }</span>
                            <h4 class="text-xl font-black text-slate-800 mt-2 truncate">${
                              c.name
                            } - ${c.group}</h4>
                            <p class="text-sm text-slate-500 mt-1 truncate font-medium">
                                <i class="fa-solid fa-location-dot mr-1.5 text-red-400"></i>Phòng: ${
                                  c.room
                                }
                                <span class="mx-2">•</span>
                                <i class="fa-solid fa-clock mr-1.5 text-orange-400"></i>${
                                  c.schedule
                                }
                            </p>
                        </div>
                        ${statusBadge}
                    </div>

                    <div class="grid grid-cols-3 gap-4 mt-5 max-w-md">
                        <div class="bg-slate-50/80 p-2.5 rounded-xl border border-slate-100 text-center hover:bg-white hover:shadow-sm transition">
                            <p class="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Sĩ số</p>
                            <p class="font-black text-slate-700 text-lg">${
                              c.studentsCount
                            }</p>
                        </div>
                        <div class="bg-slate-50/80 p-2.5 rounded-xl border border-slate-100 text-center hover:bg-white hover:shadow-sm transition">
                            <p class="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Vắng</p>
                            <p class="font-black text-red-500 text-lg">${
                              c.studentsCount - c.studentsPresent
                            }</p>
                        </div>
                        <div class="bg-slate-50/80 p-2.5 rounded-xl border border-slate-100 text-center hover:bg-white hover:shadow-sm transition">
                            <p class="text-[10px] text-slate-400 uppercase font-bold tracking-wider">ĐTB</p>
                            <p class="font-black text-emerald-500 text-lg">${
                              isNaN(avgScore) ? "--" : avgScore.toFixed(1)
                            }</p>
                        </div>
                    </div>
                </div>

                <div class="flex flex-col gap-3 w-full md:w-auto flex-shrink-0 mt-4 md:mt-0">
                    <button onclick="toggleTutorClassDetail('${
                      c.id
                    }')" class="px-5 py-3 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition flex items-center justify-center gap-2 w-full md:w-auto">
                        <i class="fa-solid fa-folder-open"></i> Quản lý & Chi tiết
                    </button>
                    <div class="flex gap-2">
                         <button onclick="takeAttendance('${
                           c.id
                         }')" class="flex-1 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition flex items-center justify-center gap-2">
                            <i class="fa-solid fa-list-check"></i> Điểm danh
                        </button>
                        <button onclick="sendEmail('${
                          c.id
                        }')" class="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-600 hover:text-blue-600 hover:border-blue-200 transition">
                            <i class="fa-solid fa-envelope"></i>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Expandable Details -->
            <div id="details-${
              c.id
            }" class="hidden mt-6 pt-6 border-t border-slate-100 animate-fade-in-down">
                ${renderClassDetailTabs(c)}
            </div>
        </div>
        `;
    })
    .join("");
}

// Render Class Detail Tabs
function renderClassDetailTabs(c) {
  const avgScore =
    c.students.reduce((acc, s) => acc + (parseFloat(s.average) || 0), 0) /
    (c.students.filter((s) => s.average !== "--").length || 1);

  return `
        <div class="flex border-b border-slate-200 mb-6 overflow-x-auto">
            <button class="detail-tab-btn active px-4 py-2 text-sm font-bold text-blue-600 border-b-2 border-blue-600 transition whitespace-nowrap" onclick="switchDetailTab(this, 'tab-students-${
              c.id
            }')">
                <i class="fa-solid fa-user-graduate mr-2"></i>Sinh viên & Điểm
            </button>
            <button class="detail-tab-btn px-4 py-2 text-sm font-bold text-slate-500 hover:text-blue-600 transition whitespace-nowrap" onclick="switchDetailTab(this, 'tab-materials-${
              c.id
            }')">
                <i class="fa-solid fa-folder-open mr-2"></i>Tài liệu
            </button>
            <button class="detail-tab-btn px-4 py-2 text-sm font-bold text-slate-500 hover:text-blue-600 transition whitespace-nowrap" onclick="switchDetailTab(this, 'tab-stats-${
              c.id
            }')">
                <i class="fa-solid fa-chart-pie mr-2"></i>Thống kê
            </button>
        </div>

        <!-- Student List Tab -->
        <div id="tab-students-${c.id}" class="detail-tab-content">
             <div class="flex justify-between items-center mb-4">
                <div class="relative">
                    <input type="text" placeholder="Tìm sinh viên..." class="pl-8 pr-4 py-2 bg-slate-50 rounded-xl text-xs font-medium focus:outline-none focus:ring-1 focus:ring-blue-500 w-48">
                    <i class="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                </div>
                <button onclick="exportClassData('${
                  c.id
                }')" class="px-3 py-1.5 rounded-lg bg-green-100 text-green-700 text-xs font-bold hover:bg-green-200 transition">
                    <i class="fa-solid fa-file-excel mr-1"></i>Xuất Excel
                </button>
            </div>

            <div class="overflow-x-auto border rounded-xl border-slate-200">
                <table class="w-full text-left border-collapse">
                    <thead class="bg-slate-50 text-xs text-slate-500 uppercase font-bold">
                        <tr>
                            <th class="p-3">MSSV</th>
                            <th class="p-3">Họ tên</th>
                            <th class="p-3 text-center">Tiến độ</th>
                            <th class="p-3 text-center">Giữa kỳ</th>
                            <th class="p-3 text-center">Cuối kỳ</th>
                            <th class="p-3 text-center">Tổng kết</th>
                            <th class="p-3 text-right">Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody class="text-sm text-slate-700 divide-y divide-slate-100 bg-white">
                        ${c.students
                          .slice(0, 5)
                          .map(
                            (s) => `
                        <tr class="hover:bg-blue-50/50 transition">
                            <td class="p-3 font-mono text-slate-500 text-xs">${
                              s.id
                            }</td>
                            <td class="p-3 font-bold">${s.name}</td>
                            <td class="p-3 text-center">
                                <div class="w-full bg-slate-200 rounded-full h-1.5 mb-1 overflow-hidden">
                                    <div class="bg-blue-500 h-1.5 rounded-full" style="width: ${
                                      s.progress
                                    }%"></div>
                                </div>
                                <span class="text-[10px] text-slate-500">${
                                  s.progress
                                }%</span>
                            </td>
                            <td class="p-3 text-center font-mono">${
                              s.midterm
                            }</td>
                            <td class="p-3 text-center font-mono">${
                              s.final
                            }</td>
                            <td class="p-3 text-center font-bold font-mono text-blue-600">${
                              s.average
                            }</td>
                            <td class="p-3 text-right">
                                ${
                                  s.status === "warning"
                                    ? `<span class="px-2 py-1 bg-red-100 text-red-600 rounded text-[10px] font-bold">Cảnh báo</span>`
                                    : `<span class="px-2 py-1 bg-green-100 text-green-600 rounded text-[10px] font-bold">Đạt</span>`
                                }
                            </td>
                        </tr>
                        `
                          )
                          .join("")}
                        ${
                          c.students.length > 5
                            ? `
                        <tr>
                            <td colspan="7" class="p-3 text-center text-xs text-slate-400 italic bg-slate-50">
                                ... và ${
                                  c.students.length - 5
                                } sinh viên khác ...
                            </td>
                        </tr>`
                            : ""
                        }
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Materials Tab -->
        <div id="tab-materials-${c.id}" class="detail-tab-content hidden">
            <div class="flex justify-between items-center mb-4">
                <h5 class="text-sm font-bold text-slate-700">Tài liệu đã tải lên (${
                  c.materials.length
                })</h5>
                <button onclick="openUploadModal('${
                  c.id
                }')" class="px-3 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition shadow-md">
                    <i class="fa-solid fa-cloud-arrow-up mr-2"></i>Upload mới
                </button>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                ${
                  c.materials.length > 0
                    ? c.materials
                        .map(
                          (m) => `
                <div class="flex items-center justify-between p-3 border border-slate-200 rounded-xl bg-white hover:border-blue-400 transition group/file">
                    <div class="flex items-center gap-3 overflow-hidden">
                        <div class="w-10 h-10 bg-${
                          m.type === "pdf" ? "red" : "blue"
                        }-50 text-${
                            m.type === "pdf" ? "red" : "blue"
                          }-500 rounded-lg flex items-center justify-center text-lg flex-shrink-0">
                            <i class="fa-solid fa-file-${
                              m.type === "pdf" ? "pdf" : "powerpoint"
                            }"></i>
                        </div>
                        <div class="min-w-0">
                            <p class="text-xs font-bold text-slate-700 truncate">${
                              m.name
                            }</p>
                            <p class="text-[10px] text-slate-500">${m.size} • ${
                            m.date
                          }</p>
                        </div>
                    </div>
                    <button class="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-red-500 transition opacity-0 group-hover/file:opacity-100">
                        <i class="fa-solid fa-trash text-xs"></i>
                    </button>
                </div>
                `
                        )
                        .join("")
                    : `<p class="text-slate-400 text-sm col-span-2 text-center py-4">Chưa có tài liệu nào.</p>`
                }
            </div>
        </div>

        <!-- Statistics Tab -->
        <div id="tab-stats-${c.id}" class="detail-tab-content hidden">
             <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="p-4 border border-slate-200 rounded-xl bg-white">
                    <h6 class="text-xs font-bold text-slate-500 uppercase mb-4">Phân bố điểm số</h6>
                    <div class="h-40 flex items-end justify-between px-4 gap-2">
                        <div class="w-full bg-blue-100 rounded-t-md h-[20%] relative group"><span class="hidden group-hover:block absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] bg-slate-800 text-white px-1 rounded">Yếu</span></div>
                        <div class="w-full bg-blue-200 rounded-t-md h-[40%] relative group"><span class="hidden group-hover:block absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] bg-slate-800 text-white px-1 rounded">TB</span></div>
                        <div class="w-full bg-blue-400 rounded-t-md h-[60%] relative group"><span class="hidden group-hover:block absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] bg-slate-800 text-white px-1 rounded">Khá</span></div>
                        <div class="w-full bg-blue-600 rounded-t-md h-[80%] relative group"><span class="hidden group-hover:block absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] bg-slate-800 text-white px-1 rounded">Giỏi</span></div>
                        <div class="w-full bg-emerald-500 rounded-t-md h-[30%] relative group"><span class="hidden group-hover:block absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] bg-slate-800 text-white px-1 rounded">Xuất sắc</span></div>
                    </div>
                    <div class="flex justify-between text-[10px] text-slate-400 mt-2 px-4">
                        <span><5</span><span>5-6.5</span><span>6.5-8</span><span>8-9</span><span>>9</span>
                    </div>
                </div>
                <div class="p-4 border border-slate-200 rounded-xl bg-white">
                    <h6 class="text-xs font-bold text-slate-500 uppercase mb-4">Tổng quan</h6>
                    <ul class="space-y-3 text-sm">
                        <li class="flex justify-between">
                            <span class="text-slate-600">Điểm trung bình lớp</span>
                            <span class="font-bold text-slate-800">${avgScore.toFixed(
                              2
                            )}</span>
                        </li>
                        <li class="flex justify-between">
                            <span class="text-slate-600">Tỷ lệ qua môn (dự kiến)</span>
                            <span class="font-bold text-green-600">92%</span>
                        </li>
                        <li class="flex justify-between">
                            <span class="text-slate-600">Sinh viên cần chú ý</span>
                            <span class="font-bold text-red-500">3</span>
                        </li>
                    </ul>
                </div>
             </div>
        </div>
    `;
}

// Toggle Tutor Class Detail
export function toggleTutorClassDetail(id) {
  const detail = document.getElementById(`details-${id}`);
  if (detail) {
    detail.classList.toggle("hidden");
  }
}

// Switch Detail Tab
export function switchDetailTab(btn, targetId) {
  const container = btn.closest(".glass-card");

  container.querySelectorAll(".detail-tab-btn").forEach((b) => {
    b.classList.remove(
      "active",
      "border-b-2",
      "border-blue-600",
      "text-blue-600"
    );
    b.classList.add("text-slate-500");
  });

  btn.classList.add("active", "border-b-2", "border-blue-600", "text-blue-600");
  btn.classList.remove("text-slate-500");

  container
    .querySelectorAll(".detail-tab-content")
    .forEach((c) => c.classList.add("hidden"));

  const target = document.getElementById(targetId);
  if (target) target.classList.remove("hidden");
}

// Export Class Data
export function exportClassData(courseId) {
  const course = mockTutorClasses.find((c) => c.id === courseId);
  if (!course) return;

  showToast(`Đang xuất báo cáo lớp ${courseId}...`, "info");

  // Create CSV content
  const headers = [
    "MSSV",
    "Ho Ten",
    "Tien Do (%)",
    "Diem GK",
    "Diem CK",
    "Diem TK",
  ];
  const rows = course.students.map((s) => [
    s.id,
    s.name,
    s.progress || 0,
    s.midterm,
    s.final,
    s.average,
  ]);

  const csvContent =
    "data:text/csv;charset=utf-8," +
    [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `Bao_cao_lop_${courseId}.csv`);
  document.body.appendChild(link);

  setTimeout(() => {
    link.click();
    document.body.removeChild(link);
    showToast("File Excel (CSV) đã được tải xuống.", "success");
  }, 1000);
}

// Take Attendance
export function takeAttendance(courseId) {
  const course = mockTutorClasses.find((c) => c.id === courseId);
  if (!course) return;

  const modal = document.getElementById("attendance-modal");
  const title = document.getElementById("attendance-course-name");
  const count = document.getElementById("attendance-count");
  const list = document.getElementById("attendance-list");

  title.innerText = `Lớp: ${course.name} - ${course.group}`;
  count.innerText = course.students.length;

  // Populate list
  list.innerHTML = course.students
    .map(
      (s) => `
    <div class="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 hover:border-blue-200 transition group/student">
        <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                ${s.name.charAt(0)}
            </div>
            <div>
                <p class="text-sm font-bold text-slate-700">${s.name}</p>
                <p class="text-[10px] text-slate-500 font-mono">${s.id}</p>
            </div>
        </div>
        <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" value="${
              s.id
            }" class="sr-only peer attendance-check" checked>
            <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            <span class="ml-3 text-xs font-medium text-slate-600 peer-checked:text-blue-600 min-w-[3rem] text-right status-text">Có mặt</span>
        </label>
    </div>
  `
    )
    .join("");

  // Add event listeners to update text
  list.querySelectorAll(".attendance-check").forEach((cb) => {
    cb.addEventListener("change", (e) => {
      const text = e.target.parentElement.querySelector(".status-text");
      text.innerText = e.target.checked ? "Có mặt" : "Vắng";
      text.classList.toggle("text-blue-600", e.target.checked);
      text.classList.toggle("text-slate-400", !e.target.checked);
    });
  });

  modal.classList.remove("hidden");
}

export function closeAttendanceModal() {
  document.getElementById("attendance-modal").classList.add("hidden");
}

export function toggleAllAttendance() {
  const checks = document.querySelectorAll(".attendance-check");
  const allChecked = Array.from(checks).every((c) => c.checked);

  checks.forEach((c) => {
    c.checked = !allChecked;
    // Trigger change event manually to update UI text
    c.dispatchEvent(new Event("change"));
  });
}

export function submitAttendance() {
  const btn = document.querySelector(
    '#attendance-modal button[onclick="submitAttendance()"]'
  );
  setButtonLoading(btn, true);

  // Simulate API call
  setTimeout(() => {
    setButtonLoading(btn, false);
    showToast("Đã lưu điểm danh thành công!", "success");
    closeAttendanceModal();
  }, 800);
}

// Send Email
export function sendEmail(courseId) {
  const course = mockTutorClasses.find((c) => c.id === courseId);
  if (!course) return;

  const modal = document.getElementById("email-modal");
  const title = document.getElementById("email-course-name");

  title.innerText = `Đến: Sinh viên lớp ${course.name} (${course.group})`;
  document.getElementById("email-form").reset();

  modal.classList.remove("hidden");
}

export function closeEmailModal() {
  document.getElementById("email-modal").classList.add("hidden");
}

export function submitEmail(e) {
  e.preventDefault();
  const btn = document.querySelector('#email-form button[type="submit"]');
  setButtonLoading(btn, true);

  setTimeout(() => {
    setButtonLoading(btn, false);
    showToast("Email đã được gửi đi thành công!", "success");
    closeEmailModal();
  }, 1000);
}

// Open Upload Modal
export function openUploadModal(courseId) {
  const modal = document.getElementById("upload-modal");
  const courseInput = document.getElementById("upload-course-id");
  const preview = document.getElementById("selected-files-preview");
  const fileInput = document.getElementById("file-input");

  if (modal && courseInput) {
    courseInput.value = courseId;
    preview.innerHTML = ""; // Clear previous previews
    fileInput.value = ""; // Clear file input
    modal.classList.remove("hidden");
  }
}

export function closeUploadModal() {
  const modal = document.getElementById("upload-modal");
  if (modal) modal.classList.add("hidden");
}

// Handle File Selection
export function handleFileSelect(input) {
  const preview = document.getElementById("selected-files-preview");
  const files = Array.from(input.files);

  if (files.length === 0) return;

  files.forEach((file) => {
    const fileEl = document.createElement("div");
    fileEl.className =
      "flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200";

    let iconClass = "fa-file";
    let colorClass = "text-slate-500";

    if (file.name.endsWith(".pdf")) {
      iconClass = "fa-file-pdf";
      colorClass = "text-red-500";
    } else if (file.name.endsWith(".pptx") || file.name.endsWith(".ppt")) {
      iconClass = "fa-file-powerpoint";
      colorClass = "text-orange-500";
    } else if (file.name.endsWith(".docx") || file.name.endsWith(".doc")) {
      iconClass = "fa-file-word";
      colorClass = "text-blue-500";
    } else if (file.name.endsWith(".mp4")) {
      iconClass = "fa-video";
      colorClass = "text-purple-500";
    }

    fileEl.innerHTML = `
            <div class="flex items-center gap-3 overflow-hidden">
                <div class="w-8 h-8 rounded-lg bg-white flex items-center justify-center ${colorClass} shadow-sm">
                    <i class="fa-solid ${iconClass}"></i>
                </div>
                <div class="min-w-0">
                    <p class="text-xs font-bold text-slate-700 truncate">${
                      file.name
                    }</p>
                    <p class="text-[10px] text-slate-400">${(
                      file.size /
                      1024 /
                      1024
                    ).toFixed(2)} MB</p>
                </div>
            </div>
            <button onclick="this.parentElement.remove()" class="text-slate-400 hover:text-red-500 transition">
                <i class="fa-solid fa-xmark"></i>
            </button>
        `;
    preview.appendChild(fileEl);
  });
}

// Submit Upload
export function submitUpload() {
  const btn = document.querySelector(
    '#upload-modal button[onclick="submitUpload()"]'
  );
  const courseId = document.getElementById("upload-course-id").value;
  const preview = document.getElementById("selected-files-preview");

  if (preview.children.length === 0) {
    showToast("Vui lòng chọn ít nhất một file!", "error");
    return;
  }

  setButtonLoading(btn, true);

  setTimeout(() => {
    // Mock adding files to course materials
    const course = mockTutorClasses.find((c) => c.id === courseId);
    if (course) {
      const newFiles = Array.from(preview.children).map((child) => {
        const name = child.querySelector("p.truncate").innerText;
        const size = child.querySelector("p.text-\\[10px\\]").innerText;
        const type = name.endsWith(".pdf") ? "pdf" : "pptx"; // Simplified type detection
        return {
          name: name,
          size: size,
          date: new Date().toLocaleDateString("vi-VN"),
          type: type,
        };
      });
      course.materials.push(...newFiles);

      // Re-render to show new files
      renderTutorCourses();
      // Re-open the specific tab
      setTimeout(() => {
        toggleTutorClassDetail(courseId);
        const tabBtn = document.querySelector(
          `button[onclick*="tab-materials-${courseId}"]`
        );
        if (tabBtn) tabBtn.click();
      }, 100);
    }

    showToast("Upload tài liệu thành công!", "success");
    setButtonLoading(btn, false);
    closeUploadModal();
  }, 1000);
}

// Save Tutor Schedule
export function saveTutorSchedule() {
  // Get form values (if they exist)
  const form = document.getElementById("tutor-schedule-form");

  // Confirm action with user
  const confirmed = confirm(
    "Xác nhận lưu lịch dạy?\n\nLịch dạy đã đăng ký sẽ được cập nhật vào hệ thống và gửi thông báo đến sinh viên."
  );

  if (!confirmed) {
    showToast("Đã hủy lưu lịch dạy", "info");
    return;
  }

  // Show loading state
  const saveBtn = document.querySelector(
    'button[onclick="saveTutorSchedule()"]'
  );
  if (saveBtn) {
    setButtonLoading(saveBtn, true, "Đang lưu...");
  }

  // Simulate API call
  setTimeout(() => {
    // Reset button
    if (saveBtn) {
      setButtonLoading(saveBtn, false);
    }

    // Show success message with more details
    showToast(
      "Lịch dạy đã được lưu thành công! Sinh viên sẽ nhận được thông báo.",
      "success"
    );

    // Optional: Reset form if it exists
    if (form) {
      // Don't reset, keep data for reference
      console.log("Schedule saved successfully");
    }
  }, 1200);
}

// Window assignments
window.renderTutorCourses = renderTutorCourses;
window.toggleTutorClassDetail = toggleTutorClassDetail;
window.switchDetailTab = switchDetailTab;
window.exportClassData = exportClassData;
window.takeAttendance = takeAttendance;
window.closeAttendanceModal = closeAttendanceModal;
window.toggleAllAttendance = toggleAllAttendance;
window.submitAttendance = submitAttendance;
window.sendEmail = sendEmail;
window.closeEmailModal = closeEmailModal;
window.submitEmail = submitEmail;
window.openUploadModal = openUploadModal;
window.closeUploadModal = closeUploadModal;
window.handleFileSelect = handleFileSelect;
window.submitUpload = submitUpload;
window.saveTutorSchedule = saveTutorSchedule;
