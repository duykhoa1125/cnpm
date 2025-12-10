/**
 * Scheduling Module (Tutor Class Management)
 * Handles class listing for Academic Department
 */

import { showToast } from "./ui.js";

// Mock Data - Tutor Classes (Online)
let mockScheduleClasses = [
  {
    id: "L01",
    courseId: "CO1023",
    courseName: "Giải tích 1",
    tutorId: "T001",
    tutorName: "Trần Văn B",
    tutorEmail: "b.tran@tutor.edu.vn",
    schedule: "Thứ 2, 07:00 - 10:00",
    platform: "Zoom Meeting",
    studentsCount: 45,
    status: "active",
  },
  {
    id: "L02",
    courseId: "CO2013",
    courseName: "CTDL & Giải thuật",
    tutorId: "T002",
    tutorName: "Phạm Văn Z",
    tutorEmail: "z.pham@tutor.edu.vn",
    schedule: "Thứ 4, 09:00 - 11:00",
    platform: "Google Meet",
    studentsCount: 38,
    status: "active",
  },
  {
    id: "L01",
    courseId: "CO3005",
    courseName: "Lập trình Web",
    tutorId: "T003",
    tutorName: "Lê Thị M",
    tutorEmail: "m.le@tutor.edu.vn",
    schedule: "Thứ 7, 09:00 - 12:00",
    platform: "Zoom Meeting",
    studentsCount: 52,
    status: "active",
  },
  {
    id: "L02",
    courseId: "CO1023",
    courseName: "Giải tích 1",
    tutorId: "T004",
    tutorName: "Nguyễn Thị K",
    tutorEmail: "k.nguyen@tutor.edu.vn",
    schedule: "Thứ 5, 14:00 - 17:00",
    platform: "Google Meet",
    studentsCount: 40,
    status: "finished",
  },
  {
    id: "L01",
    courseId: "MT1007",
    courseName: "Đại số Tuyến tính",
    tutorId: "T005",
    tutorName: "Ngô Văn N",
    tutorEmail: "n.ngo@tutor.edu.vn",
    schedule: "Thứ 3, 14:00 - 16:00",
    platform: "Zoom Meeting",
    studentsCount: 35,
    status: "active",
  },
];

// Render Scheduling View (now: Quản lý Lớp học)
export function renderScheduling() {
  const container = document.getElementById("schedule-class-list");
  if (!container) return;

  const search = document.getElementById("schedule-search")
    ? document.getElementById("schedule-search").value.toLowerCase()
    : "";
  const filter = document.getElementById("schedule-filter-status")
    ? document.getElementById("schedule-filter-status").value
    : "ALL";

  // Filter Logic
  const filtered = mockScheduleClasses.filter((c) => {
    const matchSearch =
      c.courseName.toLowerCase().includes(search) ||
      c.courseId.toLowerCase().includes(search) ||
      c.tutorName.toLowerCase().includes(search) ||
      c.id.toLowerCase().includes(search);

    let matchFilter = true;
    if (filter === "ONGOING") matchFilter = c.status === "active";
    if (filter === "FINISHED") matchFilter = c.status === "finished";

    return matchSearch && matchFilter;
  });

  // Update Stats
  const total = mockScheduleClasses.length;
  const activeClasses = mockScheduleClasses.filter((c) => c.status === "active").length;
  const uniqueTutors = [...new Set(mockScheduleClasses.map((c) => c.tutorId))].length;
  const totalStudents = mockScheduleClasses.reduce((sum, c) => sum + c.studentsCount, 0);

  const statTotal = document.getElementById("stat-total-classes");
  const statActive = document.getElementById("stat-active-classes");
  const statTutors = document.getElementById("stat-tutors");
  const statStudents = document.getElementById("stat-students");
  
  if (statTotal) statTotal.innerText = total;
  if (statActive) statActive.innerText = activeClasses;
  if (statTutors) statTutors.innerText = uniqueTutors;
  if (statStudents) statStudents.innerText = totalStudents;

  // Render List
  container.innerHTML = filtered
    .map((c) => {
      const statusClass = c.status === "active" 
        ? "border-green-200 bg-green-50/50" 
        : "border-slate-200 bg-slate-50";
      const statusBadge = c.status === "active"
        ? `<span class="px-2 py-1 bg-green-100 text-green-600 rounded text-[10px] font-bold">Đang hoạt động</span>`
        : `<span class="px-2 py-1 bg-slate-200 text-slate-600 rounded text-[10px] font-bold">Đã kết thúc</span>`;
      
      const platformIcon = c.platform === "Zoom Meeting" 
        ? `<i class="fa-solid fa-video text-blue-500"></i>` 
        : `<i class="fa-brands fa-google text-red-500"></i>`;

      return `
        <div class="p-4 rounded-xl border ${statusClass} shadow-sm hover:shadow-md transition group relative">
            <div class="flex justify-between items-start">
                <div class="flex-1">
                    <div class="flex items-center gap-2 flex-wrap">
                        <span class="font-bold text-slate-800 text-lg">${c.courseName}</span>
                        <span class="px-2 py-0.5 rounded bg-blue-100 text-blue-600 text-[10px] font-mono font-bold">${c.courseId} - ${c.id}</span>
                        ${statusBadge}
                    </div>
                    <div class="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div class="flex items-center gap-2 text-sm text-slate-600">
                            <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(c.tutorName)}&size=24&background=3b82f6&color=fff" class="w-6 h-6 rounded-full" />
                            <span class="font-bold text-slate-700">${c.tutorName}</span>
                        </div>
                        <p class="text-sm text-slate-600 flex items-center gap-2">
                            <i class="fa-solid fa-clock text-slate-400"></i>
                            ${c.schedule}
                        </p>
                        <p class="text-sm text-slate-600 flex items-center gap-2">
                            ${platformIcon}
                            <span class="font-medium">${c.platform}</span>
                        </p>
                        <p class="text-sm text-slate-600 flex items-center gap-2">
                            <i class="fa-solid fa-users text-slate-400"></i>
                            <span>${c.studentsCount} sinh viên</span>
                        </p>
                    </div>
                </div>
                <button onclick="openSchedulingModal('${c.courseId}', '${c.id}')" class="w-10 h-10 rounded-xl bg-white border border-slate-200 text-blue-600 hover:bg-blue-50 transition flex items-center justify-center shadow-sm">
                    <i class="fa-solid fa-eye"></i>
                </button>
            </div>
        </div>
    `;
    })
    .join("");

  if (filtered.length === 0) {
    container.innerHTML = `<p class="text-center text-slate-400 italic py-8">Không tìm thấy lớp học nào.</p>`;
  }
}

// Modal Functions
let currentScheduleClass = null;

export function openSchedulingModal(courseId, classId) {
  const cls = mockScheduleClasses.find(
    (c) => c.courseId === courseId && c.id === classId
  );
  if (!cls) return;
  currentScheduleClass = cls;

  const modal = document.getElementById("scheduling-modal");
  if (modal) {
    document.getElementById("sched-modal-title").innerText = `Chi tiết lớp ${cls.id}`;
    document.getElementById("sched-modal-course").innerText = `Môn: ${cls.courseName}`;
    document.getElementById("sched-tutor-name").innerText = cls.tutorName;
    document.getElementById("sched-tutor-email").innerText = cls.tutorEmail;
    document.getElementById("sched-time").innerText = cls.schedule;
    document.getElementById("sched-students").innerText = `${cls.studentsCount} SV`;
    document.getElementById("sched-platform").innerText = cls.platform;

    modal.classList.remove("hidden");
  }
}

export function closeSchedulingModal() {
  const modal = document.getElementById("scheduling-modal");
  if (modal) modal.classList.add("hidden");
  currentScheduleClass = null;
}

export function exportClassList() {
  showToast("Đang xuất danh sách lớp học...", "info");
  setTimeout(() => {
    showToast("Đã xuất file Excel thành công!", "success");
  }, 1500);
}

export function sendBulkNotification() {
  showToast("Đang gửi thông báo đến tất cả Tutor...", "info");
  setTimeout(() => {
    showToast("Đã gửi thông báo thành công!", "success");
  }, 1500);
}

// Bind to window
window.renderScheduling = renderScheduling;
window.openSchedulingModal = openSchedulingModal;
window.closeSchedulingModal = closeSchedulingModal;
window.exportClassList = exportClassList;
window.sendBulkNotification = sendBulkNotification;
