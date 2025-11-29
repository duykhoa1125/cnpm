/**
 * Department Management Module
 * Handles student and tutor management for Department role
 */

import { showToast, setButtonLoading, confirmActionModal } from "./ui.js";

// Mock Data
let mockDeptMembers = {
  tutors: [
    {
      id: "T001",
      name: "Nguyen Van A",
      email: "nva@hcmut.edu.vn",
      major: "Software Engineering",
      status: "active",
    },
    {
      id: "T003",
      name: "Le Van C",
      email: "lvc@hcmut.edu.vn",
      major: "Computer Science",
      status: "active",
    },
    {
      id: "T005",
      name: "Pham Van E",
      email: "pve@hcmut.edu.vn",
      major: "Information Systems",
      status: "leave",
    },
  ],
  students: [
    {
      id: "1910001",
      name: "Tran Van X",
      email: "tvx@hcmut.edu.vn",
      major: "Computer Science",
      status: "active",
    },
    {
      id: "1910002",
      name: "Le Thi Y",
      email: "lty@hcmut.edu.vn",
      major: "Software Engineering",
      status: "active",
    },
    {
      id: "1910003",
      name: "Nguyen Van Z",
      email: "nvz@hcmut.edu.vn",
      major: "Computer Science",
      status: "warning",
    },
    {
      id: "1910004",
      name: "Hoang Thi K",
      email: "htk@hcmut.edu.vn",
      major: "Information Systems",
      status: "active",
    },
  ],
};

let currentDeptTab = "tutors";

// Render Department Members
export function renderDeptMembers() {
  const container = document.getElementById("dept-member-list");
  if (!container) return;

  const search = document.getElementById("dept-search")
    ? document.getElementById("dept-search").value.toLowerCase()
    : "";

  const list = mockDeptMembers[currentDeptTab];
  const filtered = list.filter(
    (m) =>
      m.name.toLowerCase().includes(search) ||
      m.id.toLowerCase().includes(search)
  );

  container.innerHTML = filtered
    .map(
      (m) => `
    <tr class="hover:bg-blue-50/50 transition border-b border-slate-50 group">
        <td class="p-4 font-mono font-bold text-blue-600">${m.id}</td>
        <td class="p-4 font-bold text-slate-700">${m.name}</td>
        <td class="p-4 text-slate-600">${m.email}</td>
        <td class="p-4 text-slate-500">${m.major}</td>
        <td class="p-4 text-center">
            <span class="px-2 py-1 rounded-full text-[10px] font-bold ${getStatusColor(
              m.status
            )}">
                ${getStatusText(m.status)}
            </span>
        </td>
        <td class="p-4 text-right">
            <button onclick="editDeptMember('${
              m.id
            }')" class="w-8 h-8 rounded-lg text-blue-500 hover:bg-blue-50 transition"><i class="fa-solid fa-pen"></i></button>
            <button onclick="deleteDeptMember('${
              m.id
            }')" class="w-8 h-8 rounded-lg text-red-500 hover:bg-red-50 transition"><i class="fa-solid fa-trash"></i></button>
        </td>
    </tr>
  `
    )
    .join("");

  if (filtered.length === 0) {
    container.innerHTML = `<tr><td colspan="6" class="p-8 text-center text-slate-400 italic">Không tìm thấy thành viên nào.</td></tr>`;
  }
}

function getStatusColor(status) {
  if (status === "active") return "bg-green-100 text-green-600";
  if (status === "warning") return "bg-orange-100 text-orange-600";
  if (status === "leave") return "bg-slate-100 text-slate-500";
  return "bg-slate-100 text-slate-500";
}

function getStatusText(status) {
  if (status === "active") return "Hoạt động";
  if (status === "warning") return "Cảnh báo";
  if (status === "leave") return "Nghỉ phép";
  return status;
}

// Switch Tab
export function switchDeptTab(tab) {
  currentDeptTab = tab;

  // Update UI
  document.getElementById("tab-btn-tutors").className =
    tab === "tutors"
      ? "px-6 py-3 text-sm font-bold text-blue-600 border-b-2 border-blue-600 transition"
      : "px-6 py-3 text-sm font-bold text-slate-500 hover:text-blue-600 transition";

  document.getElementById("tab-btn-students").className =
    tab === "students"
      ? "px-6 py-3 text-sm font-bold text-blue-600 border-b-2 border-blue-600 transition"
      : "px-6 py-3 text-sm font-bold text-slate-500 hover:text-blue-600 transition";

  renderDeptMembers();
}

// Modal Functions
export function openAddMemberModal() {
  const modal = document.getElementById("dept-member-modal");
  if (modal) {
    document.querySelector("#dept-member-modal form").reset();
    document.getElementById("dept-member-role").value =
      currentDeptTab === "tutors" ? "tutor" : "student";
    modal.classList.remove("hidden");
  }
}

export function closeDeptMemberModal() {
  const modal = document.getElementById("dept-member-modal");
  if (modal) modal.classList.add("hidden");
}

export function submitDeptMember(e) {
  e.preventDefault();
  const btn = document.querySelector(
    '#dept-member-modal button[type="submit"]'
  );
  setButtonLoading(btn, true);

  const role = document.getElementById("dept-member-role").value; // 'tutor' or 'student'
  const id = document.getElementById("dept-member-id").value;
  const name = document.getElementById("dept-member-name").value;
  const email = document.getElementById("dept-member-email").value;
  const major = document.getElementById("dept-member-major").value;

  setTimeout(() => {
    const list =
      role === "tutor" ? mockDeptMembers.tutors : mockDeptMembers.students;

    if (list.find((m) => m.id === id)) {
      showToast("Mã số đã tồn tại!", "error");
      setButtonLoading(btn, false);
      return;
    }

    list.push({ id, name, email, major, status: "active" });

    setButtonLoading(btn, false);
    showToast("Thêm thành viên thành công!", "success");
    closeDeptMemberModal();

    // Switch to the tab where we added the member
    if (
      (role === "tutor" && currentDeptTab !== "tutors") ||
      (role === "student" && currentDeptTab !== "students")
    ) {
      switchDeptTab(role + "s");
    } else {
      renderDeptMembers();
    }
  }, 800);
}

export function deleteDeptMember(id) {
  confirmActionModal(
    "Xóa thành viên?",
    `Bạn có chắc chắn muốn xóa thành viên ${id} không?`,
    () => {
      const list = mockDeptMembers[currentDeptTab];
      const index = list.findIndex((m) => m.id === id);
      if (index !== -1) {
        list.splice(index, 1);
        renderDeptMembers();
        showToast("Đã xóa thành viên.", "success");
      }
    },
    "Xóa ngay",
    "bg-red-500"
  );
}

export function editDeptMember(id) {
  showToast("Tính năng chỉnh sửa đang phát triển", "info");
}

// Bind to window
window.renderDeptMembers = renderDeptMembers;
window.switchDeptTab = switchDeptTab;
window.openAddMemberModal = openAddMemberModal;
window.closeDeptMemberModal = closeDeptMemberModal;
window.submitDeptMember = submitDeptMember;
window.deleteDeptMember = deleteDeptMember;
window.editDeptMember = editDeptMember;
