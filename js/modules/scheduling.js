/**
 * Scheduling Module
 * Handles class scheduling, tutor assignment, and room allocation
 */

import { showToast, setButtonLoading } from "./ui.js";

// Mock Data
let mockScheduleClasses = [
  {
    id: "L01",
    courseId: "CO1023",
    courseName: "Hệ thống số",
    tutorId: null,
    tutorName: null,
    day: null,
    shift: null,
    room: null,
    studentsCount: 45,
  },
  {
    id: "L02",
    courseId: "CO1023",
    courseName: "Hệ thống số",
    tutorId: "T001",
    tutorName: "Nguyen Van A",
    day: "2",
    shift: "1",
    room: "H6-301",
    studentsCount: 42,
  },
  {
    id: "L01",
    courseId: "CO2003",
    courseName: "Cấu trúc dữ liệu",
    tutorId: null,
    tutorName: null,
    day: null,
    shift: null,
    room: null,
    studentsCount: 60,
  },
  {
    id: "L01",
    courseId: "EE1001",
    courseName: "Mạch điện 1",
    tutorId: "T002",
    tutorName: "Tran Thi B",
    day: "3",
    shift: "2",
    room: null, // Missing room
    studentsCount: 50,
  },
  {
    id: "L03",
    courseId: "CO1023",
    courseName: "Hệ thống số",
    tutorId: "T001",
    tutorName: "Nguyen Van A",
    day: "2",
    shift: "1", // Conflict with L02
    room: "H6-302",
    studentsCount: 40,
  },
];

const mockTutorsList = [
  { id: "T001", name: "Nguyen Van A", dept: "CSE" },
  { id: "T002", name: "Tran Thi B", dept: "EEE" },
  { id: "T003", name: "Le Van C", dept: "CSE" },
  { id: "T004", name: "Pham Thi D", dept: "ME" },
];

// Render Scheduling View
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
      c.id.toLowerCase().includes(search);

    let matchFilter = true;
    if (filter === "UNASSIGNED") matchFilter = !c.tutorId;
    if (filter === "NO_ROOM") matchFilter = !c.room;
    if (filter === "CONFLICT") matchFilter = checkConflict(c);

    return matchSearch && matchFilter;
  });

  // Update Stats
  const total = mockScheduleClasses.length;
  const assignedTutor = mockScheduleClasses.filter((c) => c.tutorId).length;
  const assignedRoom = mockScheduleClasses.filter((c) => c.room).length;
  const percent = Math.round(
    ((assignedTutor + assignedRoom) / (total * 2)) * 100
  );

  document.getElementById(
    "stat-assigned-tutor"
  ).innerText = `${assignedTutor}/${total}`;
  document.getElementById(
    "stat-assigned-room"
  ).innerText = `${assignedRoom}/${total}`;
  document.getElementById(
    "schedule-progress-percent"
  ).innerText = `${percent}%`;
  document.getElementById("schedule-progress-bar").style.width = `${percent}%`;

  // Render List
  container.innerHTML = filtered
    .map((c) => {
      const isConflict = checkConflict(c);
      const statusColor = isConflict
        ? "border-red-200 bg-red-50"
        : c.tutorId && c.room
        ? "border-green-200 bg-white"
        : "border-orange-200 bg-orange-50/50";

      return `
        <div class="p-4 rounded-xl border ${statusColor} shadow-sm hover:shadow-md transition group relative">
            ${
              isConflict
                ? `<div class="absolute top-2 right-2 text-red-500" title="Xung đột lịch"><i class="fa-solid fa-triangle-exclamation"></i></div>`
                : ""
            }
            <div class="flex justify-between items-start">
                <div>
                    <div class="flex items-center gap-2">
                        <span class="font-bold text-slate-800 text-lg">${
                          c.courseName
                        }</span>
                        <span class="px-2 py-0.5 rounded bg-slate-200 text-slate-600 text-[10px] font-mono font-bold">${
                          c.courseId
                        } - ${c.id}</span>
                    </div>
                    <div class="mt-2 space-y-1">
                        <p class="text-sm text-slate-600 flex items-center gap-2">
                            <i class="fa-solid fa-user-tie w-4 text-center text-slate-400"></i>
                            ${
                              c.tutorName
                                ? `<span class="font-bold text-blue-600">${c.tutorName}</span>`
                                : `<span class="italic text-slate-400">Chưa xếp GV</span>`
                            }
                        </p>
                        <p class="text-sm text-slate-600 flex items-center gap-2">
                            <i class="fa-solid fa-clock w-4 text-center text-slate-400"></i>
                            ${
                              c.day
                                ? `Thứ ${c.day}, Ca ${c.shift}`
                                : `<span class="italic text-slate-400">Chưa xếp lịch</span>`
                            }
                        </p>
                        <p class="text-sm text-slate-600 flex items-center gap-2">
                            <i class="fa-solid fa-location-dot w-4 text-center text-slate-400"></i>
                            ${
                              c.room
                                ? `<span class="font-bold text-slate-700">${c.room}</span>`
                                : `<span class="italic text-slate-400">Chưa xếp phòng</span>`
                            }
                        </p>
                    </div>
                </div>
                <button onclick="openSchedulingModal('${c.courseId}', '${
        c.id
      }')" class="w-10 h-10 rounded-xl bg-white border border-slate-200 text-blue-600 hover:bg-blue-50 transition flex items-center justify-center shadow-sm">
                    <i class="fa-solid fa-pen"></i>
                </button>
            </div>
        </div>
    `;
    })
    .join("");

  if (filtered.length === 0) {
    container.innerHTML = `<p class="text-center text-slate-400 italic py-8">Không tìm thấy lớp học nào.</p>`;
  }

  renderConflicts();
}

function checkConflict(c) {
  if (!c.tutorId || !c.day || !c.shift) return false;
  // Check if tutor has another class at same time
  const conflict = mockScheduleClasses.find(
    (other) =>
      other !== c &&
      other.tutorId === c.tutorId &&
      other.day === c.day &&
      other.shift === c.shift
  );
  return !!conflict;
}

function renderConflicts() {
  const container = document.getElementById("schedule-conflicts");
  if (!container) return;

  const conflicts = [];
  mockScheduleClasses.forEach((c) => {
    if (!c.tutorId || !c.day || !c.shift) return;
    const conflict = mockScheduleClasses.find(
      (other) =>
        other !== c &&
        other.tutorId === c.tutorId &&
        other.day === c.day &&
        other.shift === c.shift
    );
    if (
      conflict &&
      !conflicts.some(
        (item) =>
          (item.c1 === c && item.c2 === conflict) ||
          (item.c1 === conflict && item.c2 === c)
      )
    ) {
      conflicts.push({ c1: c, c2: conflict });
    }
  });

  if (conflicts.length === 0) {
    container.innerHTML = `<p class="text-sm text-slate-500 italic text-center py-4">Không có xung đột nào.</p>`;
    return;
  }

  container.innerHTML = conflicts
    .map(
      (item) => `
        <div class="p-3 bg-red-50 border border-red-100 rounded-xl text-xs">
            <p class="font-bold text-red-600 mb-1">GV ${item.c1.tutorName}</p>
            <p class="text-slate-600">Bị trùng lịch dạy Thứ ${item.c1.day}, Ca ${item.c1.shift}</p>
            <div class="flex gap-2 mt-1">
                <span class="bg-white px-1 rounded border border-red-100">${item.c1.courseId}-${item.c1.id}</span>
                <span class="bg-white px-1 rounded border border-red-100">${item.c2.courseId}-${item.c2.id}</span>
            </div>
        </div>
    `
    )
    .join("");
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
    document.getElementById(
      "sched-modal-title"
    ).innerText = `Xếp lịch lớp ${cls.id}`;
    document.getElementById(
      "sched-modal-course"
    ).innerText = `Môn: ${cls.courseName}`;

    // Populate Tutors
    const tutorSelect = document.getElementById("sched-tutor");
    tutorSelect.innerHTML =
      `<option value="">-- Chọn giảng viên --</option>` +
      mockTutorsList
        .map(
          (t) =>
            `<option value="${t.id}" ${
              cls.tutorId === t.id ? "selected" : ""
            }>${t.name} (${t.dept})</option>`
        )
        .join("");

    document.getElementById("sched-day").value = cls.day || "2";
    document.getElementById("sched-shift").value = cls.shift || "1";
    document.getElementById("sched-room").value = cls.room || "";

    modal.classList.remove("hidden");
  }
}

export function closeSchedulingModal() {
  const modal = document.getElementById("scheduling-modal");
  if (modal) modal.classList.add("hidden");
  currentScheduleClass = null;
}

export function submitScheduleForm(e) {
  e.preventDefault();
  if (!currentScheduleClass) return;

  const btn = document.querySelector('#scheduling-modal button[type="submit"]');
  setButtonLoading(btn, true);

  const tutorId = document.getElementById("sched-tutor").value;
  const day = document.getElementById("sched-day").value;
  const shift = document.getElementById("sched-shift").value;
  const room = document.getElementById("sched-room").value.trim();

  const tutor = mockTutorsList.find((t) => t.id === tutorId);

  setTimeout(() => {
    currentScheduleClass.tutorId = tutorId || null;
    currentScheduleClass.tutorName = tutor ? tutor.name : null;
    currentScheduleClass.day = day;
    currentScheduleClass.shift = shift;
    currentScheduleClass.room = room || null;

    setButtonLoading(btn, false);
    showToast("Cập nhật thời khóa biểu thành công!", "success");
    closeSchedulingModal();
    renderScheduling();
  }, 800);
}

export function autoSchedule() {
  showToast("Đang chạy thuật toán xếp lịch tự động...", "info");
  setTimeout(() => {
    // Simple mock: assign random tutors and rooms to unassigned classes
    mockScheduleClasses.forEach((c) => {
      if (!c.tutorId) {
        const randomTutor =
          mockTutorsList[Math.floor(Math.random() * mockTutorsList.length)];
        c.tutorId = randomTutor.id;
        c.tutorName = randomTutor.name;
      }
      if (!c.room) {
        c.room = `H6-${Math.floor(Math.random() * 900) + 100}`;
      }
      if (!c.day) c.day = Math.floor(Math.random() * 6) + 2;
      if (!c.shift) c.shift = Math.floor(Math.random() * 4) + 1;
    });
    renderScheduling();
    showToast("Đã xếp lịch tự động hoàn tất!", "success");
  }, 2000);
}

// Bind to window
window.renderScheduling = renderScheduling;
window.openSchedulingModal = openSchedulingModal;
window.closeSchedulingModal = closeSchedulingModal;
window.submitScheduleForm = submitScheduleForm;
window.autoSchedule = autoSchedule;
