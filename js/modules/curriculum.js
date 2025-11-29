/**
 * Curriculum Management Module
 * Handles course creation, editing, and listing for Academic role
 */

import { showToast, confirmActionModal, setButtonLoading } from "./ui.js";

// Mock Data for Courses
let mockCourses = [
  {
    id: "CO1023",
    name: "Hệ thống số",
    credits: 3,
    dept: "CSE",
    prereq: [],
    status: "active",
    desc: "Nhập môn về hệ thống số và thiết kế logic.",
  },
  {
    id: "CO2003",
    name: "Cấu trúc dữ liệu và Giải thuật",
    credits: 4,
    dept: "CSE",
    prereq: ["CO1023"],
    status: "active",
    desc: "Các cấu trúc dữ liệu cơ bản và giải thuật nâng cao.",
  },
  {
    id: "CO2007",
    name: "Kiến trúc máy tính",
    credits: 3,
    dept: "CSE",
    prereq: ["CO1023"],
    status: "active",
    desc: "Tổ chức và kiến trúc máy tính hiện đại.",
  },
  {
    id: "EE1001",
    name: "Mạch điện 1",
    credits: 3,
    dept: "EEE",
    prereq: [],
    status: "active",
    desc: "Các định luật cơ bản trong mạch điện.",
  },
  {
    id: "CO3001",
    name: "Hệ điều hành",
    credits: 3,
    dept: "CSE",
    prereq: ["CO2003", "CO2007"],
    status: "inactive",
    desc: "Nguyên lý hoạt động của hệ điều hành.",
  },
];

// Render Curriculum View
export function renderCurriculum() {
  const container = document.getElementById("curriculum-course-list");
  if (!container) return;

  // Update Stats
  document.getElementById("total-courses-count").innerText = mockCourses.length;
  document.getElementById("total-credits-count").innerText = mockCourses.reduce(
    (acc, c) => acc + c.credits,
    0
  );
  document.getElementById("active-courses-count").innerText =
    mockCourses.filter((c) => c.status === "active").length;

  // Filter Logic (Basic)
  const filterDept = document.getElementById("course-filter-dept")
    ? document.getElementById("course-filter-dept").value
    : "ALL";
  const search = document.getElementById("course-search")
    ? document.getElementById("course-search").value.toLowerCase()
    : "";

  const filtered = mockCourses.filter((c) => {
    const matchDept = filterDept === "ALL" || c.dept === filterDept;
    const matchSearch =
      c.id.toLowerCase().includes(search) ||
      c.name.toLowerCase().includes(search);
    return matchDept && matchSearch;
  });

  // Render Table
  container.innerHTML = filtered
    .map(
      (c) => `
        <tr class="hover:bg-blue-50/50 transition border-b border-slate-50 group">
            <td class="p-4 font-mono font-bold text-blue-600">${c.id}</td>
            <td class="p-4 font-bold text-slate-700">
                ${c.name}
                <p class="text-[10px] text-slate-400 font-normal truncate max-w-[200px]">${
                  c.desc
                }</p>
            </td>
            <td class="p-4 text-center font-bold text-slate-600">${
              c.credits
            }</td>
            <td class="p-4"><span class="px-2 py-1 rounded bg-slate-100 text-slate-500 text-xs font-bold">${
              c.dept
            }</span></td>
            <td class="p-4">
                ${
                  c.prereq.length > 0
                    ? c.prereq
                        .map(
                          (p) =>
                            `<span class="inline-block px-1.5 py-0.5 rounded border border-slate-200 text-[10px] font-mono text-slate-500 mr-1">${p}</span>`
                        )
                        .join("")
                    : '<span class="text-slate-300 text-xs italic">Không có</span>'
                }
            </td>
            <td class="p-4 text-center">
                <span class="px-2 py-1 rounded-full text-[10px] font-bold ${
                  c.status === "active"
                    ? "bg-green-100 text-green-600"
                    : "bg-slate-100 text-slate-400"
                }">
                    ${c.status === "active" ? "Đang mở" : "Tạm ngưng"}
                </span>
            </td>
            <td class="p-4 text-right">
                <button onclick="editCourse('${
                  c.id
                }')" class="w-8 h-8 rounded-lg text-blue-500 hover:bg-blue-50 transition"><i class="fa-solid fa-pen"></i></button>
                <button onclick="deleteCourse('${
                  c.id
                }')" class="w-8 h-8 rounded-lg text-red-500 hover:bg-red-50 transition"><i class="fa-solid fa-trash"></i></button>
            </td>
        </tr>
    `
    )
    .join("");

  if (filtered.length === 0) {
    container.innerHTML = `<tr><td colspan="7" class="p-8 text-center text-slate-400 italic">Không tìm thấy môn học nào phù hợp.</td></tr>`;
  }
}

// Modal Functions
export function openAddCourseModal() {
  const modal = document.getElementById("course-modal");
  const form = document.querySelector("#course-modal form");
  const title = document.getElementById("course-modal-title");

  if (modal && form) {
    form.reset();
    document.getElementById("course-form-id").value = ""; // Empty for new
    document.getElementById("course-code").readOnly = false;
    document.getElementById("course-code").classList.remove("bg-slate-100");
    title.innerText = "Thêm môn học mới";
    modal.classList.remove("hidden");
  }
}

export function editCourse(id) {
  const course = mockCourses.find((c) => c.id === id);
  if (!course) return;

  const modal = document.getElementById("course-modal");
  const title = document.getElementById("course-modal-title");

  if (modal) {
    document.getElementById("course-form-id").value = course.id;
    document.getElementById("course-code").value = course.id;
    document.getElementById("course-code").readOnly = true; // Cannot change ID
    document.getElementById("course-code").classList.add("bg-slate-100");

    document.getElementById("course-name").value = course.name;
    document.getElementById("course-credits").value = course.credits;
    document.getElementById("course-dept").value = course.dept;
    document.getElementById("course-status").value = course.status;
    document.getElementById("course-prereq").value = course.prereq.join(", ");
    document.getElementById("course-desc").value = course.desc;

    title.innerText = "Chỉnh sửa môn học";
    modal.classList.remove("hidden");
  }
}

export function closeCourseModal() {
  const modal = document.getElementById("course-modal");
  if (modal) modal.classList.add("hidden");
}

export function submitCourseForm(e) {
  e.preventDefault();
  const btn = document.querySelector('#course-modal button[type="submit"]');
  setButtonLoading(btn, true);

  const id = document.getElementById("course-code").value.trim().toUpperCase();
  const name = document.getElementById("course-name").value.trim();
  const credits = parseInt(document.getElementById("course-credits").value);
  const dept = document.getElementById("course-dept").value;
  const status = document.getElementById("course-status").value;
  const prereqStr = document.getElementById("course-prereq").value.trim();
  const desc = document.getElementById("course-desc").value.trim();

  const prereq = prereqStr ? prereqStr.split(",").map((s) => s.trim()) : [];
  const isEdit = document.getElementById("course-form-id").value !== "";

  setTimeout(() => {
    if (isEdit) {
      // Update
      const index = mockCourses.findIndex((c) => c.id === id);
      if (index !== -1) {
        mockCourses[index] = { id, name, credits, dept, status, prereq, desc };
        showToast("Cập nhật môn học thành công!", "success");
      }
    } else {
      // Create
      if (mockCourses.find((c) => c.id === id)) {
        showToast("Mã môn học đã tồn tại!", "error");
        setButtonLoading(btn, false);
        return;
      }
      mockCourses.push({ id, name, credits, dept, status, prereq, desc });
      showToast("Thêm môn học mới thành công!", "success");
    }

    setButtonLoading(btn, false);
    closeCourseModal();
    renderCurriculum();
  }, 800);
}

export function deleteCourse(id) {
  confirmActionModal(
    "Xóa môn học?",
    `Bạn có chắc chắn muốn xóa môn học ${id} không? Hành động này không thể hoàn tác.`,
    () => {
      mockCourses = mockCourses.filter((c) => c.id !== id);
      renderCurriculum();
      showToast(`Đã xóa môn học ${id}`, "success");
    },
    "Xóa ngay",
    "bg-red-500"
  );
}

// Bind to window
window.renderCurriculum = renderCurriculum;
window.openAddCourseModal = openAddCourseModal;
window.editCourse = editCourse;
window.closeCourseModal = closeCourseModal;
window.submitCourseForm = submitCourseForm;
window.deleteCourse = deleteCourse;
