/**
 * Student Courses Module
 * Handles student-specific course management logic
 */

import { mockCourseDetails, mockStudentCourses } from "./config.js";
import { showToast, setButtonLoading, confirmActionModal } from "./ui.js";
import { switchTab } from "./navigation.js";

let currentCourseId = null;
let currentCourseName = null;
let currentForumId = null;

// Register Course
export function registerCourse() {
  switchTab("student_register");
}

// Confirm Registration
export function confirmRegistration(courseName) {
  confirmActionModal(
    "Xác nhận Đăng ký",
    `Bạn có chắc chắn muốn đăng ký môn học "${courseName}" không?`,
    () => {
      // Add to mock data
      const newCourse = {
        id: `CO${Math.floor(Math.random() * 9000) + 1000}`,
        name: courseName,
        tutor: "Tutor Mới",
        deadline: "30/12/2025",
        progress: 0,
        week: 1,
        totalWeeks: 15,
        icon: "fa-book",
        color: "green",
      };
      mockStudentCourses.push(newCourse);

      // Re-render and switch tab
      renderStudentCourses();
      switchTab("courses_student");

      showToast(`Đã đăng ký thành công ${courseName}!`, "success");
    },
    "Đăng ký",
    "bg-blue-600"
  );
}

// Render Student Courses
export function renderStudentCourses() {
  const container = document.getElementById("student-course-list");
  if (!container) return;

  if (mockStudentCourses.length === 0) {
    container.innerHTML =
      '<div class="col-span-full text-center py-12 text-slate-400 italic">Bạn chưa đăng ký môn học nào.</div>';
    return;
  }

  container.innerHTML = mockStudentCourses
    .map(
      (course) => `
    <div
      id="course-card-${course.id}"
      class="glass-card p-6 rounded-[28px] flex flex-col md:flex-row gap-6 group hover:border-blue-300 transition-all relative overflow-hidden hover-lift"
    >
      <div
        class="w-full md:w-32 h-32 rounded-2xl bg-${course.color}-100 flex items-center justify-center text-4xl text-${course.color}-500 shadow-inner flex-shrink-0"
      >
        <i class="fa-solid ${course.icon}"></i>
      </div>
      <div class="flex-1 min-w-0">
        <div class="flex justify-between items-start">
          <div class="min-w-0">
            <span
              class="text-[10px] font-bold bg-${course.color}-50 text-${course.color}-600 px-2 py-1 rounded uppercase"
              >${course.id}</span
            >
            <h4 class="text-xl font-bold text-slate-800 mt-1 truncate">
              ${course.name}
            </h4>
            <p class="text-sm text-slate-500 truncate">
              <i class="fa-solid fa-user-tie mr-1"></i> Tutor: ${course.tutor}
            </p>
            <p class="text-[10px] text-orange-500 font-bold mt-1">
              <i class="fa-regular fa-clock mr-1"></i> Hạn hủy: ${course.deadline}
            </p>
          </div>
          <button
            onclick="cancelCourse('${course.id}', '${course.name}')"
            class="ml-2 px-3 py-1 rounded-lg bg-red-50 text-red-500 text-xs font-bold hover:bg-red-500 hover:text-white transition border border-red-100 flex-shrink-0"
          >
            <i class="fa-solid fa-ban mr-1"></i> Hủy môn
          </button>
        </div>
        <div class="mt-4">
          <div
            class="flex justify-between text-xs font-bold text-slate-500 mb-1"
          >
            <span>Tiến độ (Tuần ${course.week}/${course.totalWeeks})</span>
            <span>${course.progress}%</span>
          </div>
          <div class="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div class="h-full bg-${course.color}-500 w-[${course.progress}%] rounded-full"></div>
          </div>
        </div>
        <div class="mt-4 flex gap-3 flex-wrap">
          <button
            onclick="enterClass('${course.id}', '${course.name}')"
            class="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-lg hover:bg-blue-700 transition"
          >
            Vào lớp
          </button>
        </div>
      </div>
    </div>
  `
    )
    .join("");
}

// View All Schedule
export function viewAllSchedule() {
  showToast(
    "Chức năng xem tất cả lịch học sẽ được bổ sung trong phiên bản tiếp theo",
    "info"
  );
}

// Enter Class
export function enterClass(courseId, courseName) {
  currentCourseId = courseId;
  currentCourseName = courseName;
  console.log("Entering class:", courseName);

  const details = mockCourseDetails[courseName] || {
    tutor: "Unknown",
    schedule: "Unknown",
    announcements: [],
    scheduleList: [],
    assignments: [],
    quizzes: [],
    forum: [],
    exams: [],
    materials: [],
    grades: [],
  };

  // Populate Header
  const nameEl = document.getElementById("detail-course-name");
  const infoEl = document.getElementById("detail-course-info");

  if (nameEl) nameEl.innerText = `${courseName} - ${details.group || ""}`;
  if (infoEl) {
    infoEl.innerHTML = `
        <div class="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-lg backdrop-blur-sm">
            <i class="fa-solid fa-user-tie"></i> ${details.tutor}
        </div>
        <div class="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-lg backdrop-blur-sm">
            <i class="fa-solid fa-clock"></i> ${details.schedule}
        </div>
        <div class="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-lg backdrop-blur-sm">
            <i class="fa-solid fa-location-dot"></i> ${
              details.room || "Chưa cập nhật"
            }
        </div>
      `;
  }

  // Render Overview (Default Tab)
  renderCourseOverview(details);

  // Render other tabs data
  renderCourseAnnouncements(details.announcements);
  renderCourseSchedule(details.scheduleList);
  renderCourseAssignments(details.assignments, details.quizzes);
  renderCourseForum(details.forum);
  renderCourseExams(details.exams);
  renderCourseMaterials(details.materials);
  renderCourseGrades(details.grades);

  // Switch View
  switchTab("courses_student_detail");

  // Reset tabs to Overview
  const firstTab = document.querySelector(".course-tab-btn");
  if (firstTab) switchCourseTab(firstTab, "tab-overview");
}

export function backToCourses() {
  switchTab("courses_student");
}

export function switchCourseTab(btn, targetId) {
  // Remove active class from all buttons
  document.querySelectorAll(".course-tab-btn").forEach((b) => {
    b.classList.remove(
      "active",
      "bg-blue-600",
      "text-white",
      "shadow-lg",
      "shadow-blue-500/30"
    );
    b.classList.add("text-slate-500", "hover:bg-slate-100");
  });

  // Add active class to clicked button
  btn.classList.add(
    "active",
    "bg-blue-600",
    "text-white",
    "shadow-lg",
    "shadow-blue-500/30"
  );
  btn.classList.remove("text-slate-500", "hover:bg-slate-100");

  // Hide all tab contents
  document
    .querySelectorAll(".course-tab-content")
    .forEach((c) => c.classList.add("hidden"));

  // Show target tab content
  const target = document.getElementById(targetId);
  if (target) target.classList.remove("hidden");
}

// Render helpers (internal)
function renderCourseOverview(details) {
  // Recent Announcements (Top 2)
  const annContainer = document.getElementById("overview-announcements");
  if (annContainer) {
    const recent = details.announcements.slice(0, 2);
    if (recent.length === 0) {
      annContainer.innerHTML =
        '<p class="text-slate-400 text-sm italic">Không có thông báo mới.</p>';
    } else {
      annContainer.innerHTML = recent
        .map(
          (a) => `
                <div class="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div class="flex justify-between items-start mb-1">
                        <span class="text-xs font-bold ${
                          a.type === "important"
                            ? "text-red-600 bg-red-100 px-2 py-0.5 rounded"
                            : "text-blue-600 bg-blue-100 px-2 py-0.5 rounded"
                        } uppercase">${
            a.type === "important" ? "Quan trọng" : "Thông báo"
          }</span>
                        <span class="text-[10px] text-slate-400">${
                          a.date
                        }</span>
                    </div>
                    <h5 class="font-bold text-slate-800 text-sm mb-1 line-clamp-1">${
                      a.title
                    }</h5>
                    <p class="text-xs text-slate-500 line-clamp-2">${
                      a.content
                    }</p>
                </div>
            `
        )
        .join("");
    }
  }

  // Upcoming Schedule (Next 2)
  const schedContainer = document.getElementById("overview-schedule");
  if (schedContainer) {
    const upcoming = details.scheduleList.slice(0, 2); // Mock: just take first 2
    if (upcoming.length === 0) {
      schedContainer.innerHTML =
        '<p class="text-slate-400 text-sm italic">Chưa có lịch học.</p>';
    } else {
      schedContainer.innerHTML = upcoming
        .map(
          (s) => `
                <div class="flex items-center gap-4 py-3 border-b border-slate-100 last:border-0">
                    <div class="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex flex-col items-center justify-center shadow-sm flex-shrink-0">
                        <span class="text-[10px] font-bold uppercase">TUẦN</span>
                        <span class="text-lg font-black leading-none">${s.week}</span>
                    </div>
                    <div>
                        <h5 class="font-bold text-slate-800 text-sm">${s.content}</h5>
                        <p class="text-xs text-slate-500 mt-1">
                            <i class="fa-regular fa-clock mr-1"></i> ${s.time} • <i class="fa-solid fa-location-dot mr-1"></i> ${s.room}
                        </p>
                    </div>
                </div>
            `
        )
        .join("");
    }
  }

  // Deadlines (Assignments & Quizzes)
  const deadContainer = document.getElementById("overview-deadlines");
  if (deadContainer) {
    const allTasks = [
      ...(details.assignments || []),
      ...(details.quizzes || []),
    ];
    // Filter incomplete
    const pending = allTasks
      .filter((t) => t.status !== "submitted" && t.status !== "completed")
      .slice(0, 3);

    if (pending.length === 0) {
      deadContainer.innerHTML = `
                <div class="text-center py-4">
                    <div class="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-2"><i class="fa-solid fa-check"></i></div>
                    <p class="text-slate-500 text-sm font-medium">Bạn đã hoàn thành tất cả bài tập!</p>
                </div>
            `;
    } else {
      deadContainer.innerHTML = pending
        .map(
          (t) => `
                <div class="p-3 rounded-xl bg-white border border-slate-100 shadow-sm flex justify-between items-center group cursor-pointer hover:border-orange-300 transition" onclick="openAssignmentModal('${
                  t.score !== undefined ? "assignment" : "quiz"
                }', '${t.id}')">
                    <div>
                        <p class="text-xs font-bold text-orange-500 mb-0.5"><i class="fa-regular fa-clock mr-1"></i> Hạn: ${
                          t.deadline
                        }</p>
                        <h5 class="font-bold text-slate-800 text-sm group-hover:text-orange-600 transition">${
                          t.title
                        }</h5>
                    </div>
                    <i class="fa-solid fa-chevron-right text-slate-300 text-xs"></i>
                </div>
            `
        )
        .join("");
    }
  }
}

function renderCourseAnnouncements(list) {
  const container = document.getElementById("course-announcements-list");
  if (!container) return;
  if (!list || list.length === 0) {
    container.innerHTML =
      '<p class="text-slate-400 text-center italic">Không có thông báo nào.</p>';
    return;
  }
  container.innerHTML = list
    .map(
      (a) => `
        <div class="p-4 rounded-xl border ${
          a.type === "important"
            ? "border-red-200 bg-red-50"
            : "border-slate-200 bg-white"
        }">
            <div class="flex justify-between items-start mb-2">
                <h5 class="font-bold ${
                  a.type === "important" ? "text-red-700" : "text-slate-800"
                }">${a.title}</h5>
                <span class="text-xs text-slate-500">${a.date}</span>
            </div>
            <p class="text-sm text-slate-600 mb-2">${a.content}</p>
            <p class="text-xs font-bold text-slate-500"><i class="fa-solid fa-user-pen mr-1"></i> ${
              a.author
            }</p>
        </div>
    `
    )
    .join("");
}

function renderCourseSchedule(list) {
  const container = document.getElementById("course-schedule-list");
  if (!container) return;
  if (!list || list.length === 0) {
    container.innerHTML =
      '<tr><td colspan="5" class="text-center p-4 text-slate-400">Chưa có lịch học.</td></tr>';
    return;
  }
  container.innerHTML = list
    .map(
      (s) => `
        <tr class="hover:bg-slate-50 transition">
            <td class="p-3 font-bold text-blue-600">Tuần ${s.week}</td>
            <td class="p-3 font-medium">${s.content}</td>
            <td class="p-3 whitespace-nowrap"><i class="fa-regular fa-clock mr-1 text-slate-400"></i> ${
              s.time
            }</td>
            <td class="p-3 whitespace-nowrap"><i class="fa-solid fa-location-dot mr-1 text-slate-400"></i> ${
              s.room
            }</td>
            <td class="p-3 text-xs italic text-slate-500">${s.note || ""}</td>
        </tr>
    `
    )
    .join("");
}

function renderCourseAssignments(assignments, quizzes) {
  const assignContainer = document.getElementById("course-assignments-list");
  const quizContainer = document.getElementById("course-quizzes-list");

  if (assignContainer) {
    if (!assignments || assignments.length === 0) {
      assignContainer.innerHTML =
        '<p class="text-slate-400 text-sm italic">Không có bài tập lớn.</p>';
    } else {
      assignContainer.innerHTML = assignments
        .map(
          (a) => `
                <div onclick="openAssignmentModal('assignment', '${
                  a.id
                }')" class="cursor-pointer p-3 rounded-xl border border-slate-200 bg-white flex justify-between items-center group hover:border-purple-300 transition">
                    <div>
                        <p class="text-sm font-bold text-slate-800 group-hover:text-purple-700 transition">${
                          a.title
                        }</p>
                        <p class="text-xs text-slate-500 mt-1">Hạn: ${
                          a.deadline
                        }</p>
                    </div>
                    <div class="text-right">
                        ${
                          a.status === "submitted"
                            ? `<span class="px-2 py-1 rounded bg-green-100 text-green-700 text-[10px] font-bold">Đã nộp</span>`
                            : `<span class="px-2 py-1 rounded bg-orange-100 text-orange-700 text-[10px] font-bold">Chưa nộp</span>`
                        }
                        ${
                          a.score !== null
                            ? `<p class="text-sm font-black text-purple-600 mt-1">${a.score}</p>`
                            : ""
                        }
                    </div>
                </div>
            `
        )
        .join("");
    }
  }

  if (quizContainer) {
    if (!quizzes || quizzes.length === 0) {
      quizContainer.innerHTML =
        '<p class="text-slate-400 text-sm italic">Không có bài kiểm tra.</p>';
    } else {
      quizContainer.innerHTML = quizzes
        .map(
          (q) => `
                <div onclick="openAssignmentModal('quiz', '${
                  q.id
                }')" class="cursor-pointer p-3 rounded-xl border border-slate-200 bg-white flex justify-between items-center group hover:border-orange-300 transition">
                    <div>
                        <p class="text-sm font-bold text-slate-800 group-hover:text-orange-700 transition">${
                          q.title
                        }</p>
                        <p class="text-xs text-slate-500 mt-1">Hạn: ${
                          q.deadline
                        }</p>
                    </div>
                    <div class="text-right">
                        ${
                          q.status === "completed"
                            ? `<span class="px-2 py-1 rounded bg-blue-100 text-blue-700 text-[10px] font-bold">Đã làm</span>`
                            : `<span class="px-2 py-1 rounded bg-slate-100 text-slate-500 text-[10px] font-bold">Chưa làm</span>`
                        }
                        ${
                          q.score !== null
                            ? `<p class="text-sm font-black text-orange-600 mt-1">${q.score}</p>`
                            : ""
                        }
                    </div>
                </div>
            `
        )
        .join("");
    }
  }
}

function renderCourseForum(list) {
  const container = document.getElementById("course-forum-list");
  if (!container) return;
  if (!list || list.length === 0) {
    container.innerHTML =
      '<p class="text-slate-400 text-center italic">Chưa có thảo luận nào.</p>';
    return;
  }
  container.innerHTML = list
    .map(
      (f) => `
        <div onclick="window.openForumModal(${
          f.id
        })" class="p-4 rounded-xl border border-slate-200 bg-white hover:shadow-md transition cursor-pointer group hover:border-blue-300">
            <div class="flex justify-between items-start">
                <h5 class="font-bold text-slate-800 group-hover:text-blue-600 transition">${
                  f.title
                }</h5>
                <span class="text-xs text-slate-400">${f.last_post}</span>
            </div>
            <div class="flex justify-between items-center mt-3">
                <div class="flex items-center gap-2">
                    <div class="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">${f.author.charAt(
                      0
                    )}</div>
                    <span class="text-xs text-slate-600">${f.author}</span>
                </div>
                <div class="flex items-center gap-4 text-slate-400 text-xs">
                    <span><i class="fa-solid fa-reply mr-1"></i> ${
                      f.replies
                    } trả lời</span>
                </div>
            </div>
        </div>
    `
    )
    .join("");
}

function renderCourseExams(list) {
  const container = document.getElementById("course-exams-list");
  if (!container) return;
  if (!list || list.length === 0) {
    container.innerHTML =
      '<p class="text-slate-400 text-center italic">Chưa có lịch thi.</p>';
    return;
  }
  container.innerHTML = list
    .map(
      (e) => `
        <div class="flex items-center p-4 bg-red-50 rounded-xl border border-red-100">
            <div class="w-12 h-12 rounded-lg bg-white text-red-500 flex flex-col items-center justify-center shadow-sm flex-shrink-0">
                <span class="text-[10px] font-bold uppercase">${
                  e.date.split("-")[1]
                }</span>
                <span class="text-lg font-black">${e.date.split("-")[2]}</span>
            </div>
            <div class="ml-4 flex-1">
                <h5 class="font-bold text-slate-800">${e.name}</h5>
                <p class="text-xs text-slate-500 mt-1">
                    <i class="fa-regular fa-clock mr-1"></i> ${e.time}
                    <span class="mx-2">•</span>
                    <i class="fa-solid fa-location-dot mr-1"></i> ${e.room}
                </p>
            </div>
            <span class="px-3 py-1 rounded-full bg-white text-red-600 text-xs font-bold border border-red-100 shadow-sm">${
              e.type
            }</span>
        </div>
    `
    )
    .join("");
}

function renderCourseMaterials(list) {
  const container = document.getElementById("course-materials-list");
  if (!container) return;
  if (!list || list.length === 0) {
    container.innerHTML =
      '<p class="text-slate-400 text-center italic col-span-2">Chưa có tài liệu nào.</p>';
    return;
  }
  container.innerHTML = list
    .map(
      (m) => `
        <div class="flex items-center justify-between p-4 border border-slate-200 rounded-xl bg-white hover:border-blue-400 transition group/file cursor-pointer">
            <div class="flex items-center gap-4 overflow-hidden">
                <div class="w-12 h-12 bg-${
                  m.type === "pdf"
                    ? "red"
                    : m.type === "doc"
                    ? "blue"
                    : "orange"
                }-50 text-${
        m.type === "pdf" ? "red" : m.type === "doc" ? "blue" : "orange"
      }-500 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                    <i class="fa-solid fa-file-${
                      m.type === "pdf"
                        ? "pdf"
                        : m.type === "doc"
                        ? "word"
                        : "file"
                    }"></i>
                </div>
                <div class="min-w-0">
                    <p class="text-sm font-bold text-slate-700 truncate group-hover/file:text-blue-600 transition">${
                      m.title
                    }</p>
                    <p class="text-[10px] text-slate-500 mt-1">${m.size} • ${
        m.date
      }</p>
                </div>
            </div>
            <button class="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-blue-600 transition">
                <i class="fa-solid fa-download"></i>
            </button>
        </div>
    `
    )
    .join("");
}

function renderCourseGrades(list) {
  const container = document.getElementById("course-grades-list");
  if (!container) return;
  if (!list || list.length === 0) {
    container.innerHTML =
      '<tr><td colspan="3" class="text-center p-4 text-slate-400">Chưa có bảng điểm.</td></tr>';
    return;
  }
  container.innerHTML = list
    .map(
      (g) => `
        <tr class="hover:bg-slate-50 transition">
            <td class="p-3 font-bold text-slate-700">${g.item}</td>
            <td class="p-3 text-center text-slate-500 font-mono text-xs">${
              g.weight
            }</td>
            <td class="p-3 text-center">
                ${
                  g.score !== null
                    ? `<span class="font-black text-blue-600">${g.score}</span>`
                    : `<span class="text-slate-400 italic text-xs">--</span>`
                }
            </td>
        </tr>
    `
    )
    .join("");
}

// Open Assignment/Quiz Modal
export function openAssignmentModal(type, id) {
  const details = mockCourseDetails[currentCourseName];
  if (!details) return;

  let item;
  if (type === "assignment") {
    item = details.assignments.find((a) => a.id == id);
  } else {
    item = details.quizzes.find((q) => q.id == id);
  }

  if (!item) return;

  const modal = document.getElementById("assignment-modal");
  const icon = document.getElementById("assign-icon");
  const title = document.getElementById("assign-title");
  const status = document.getElementById("assign-status");
  const deadline = document.getElementById("assign-deadline");
  const desc = document.getElementById("assign-desc");
  const files = document.getElementById("assign-files");
  const submissionArea = document.getElementById("assign-submission-area");
  const actionBtn = document.getElementById("assign-action-btn");

  // Reset
  files.innerHTML = "";
  submissionArea.innerHTML = "";
  actionBtn.classList.add("hidden");

  // Set Data
  title.innerText = item.title;
  deadline.innerText = item.deadline;
  desc.innerText = item.description || "Không có mô tả.";

  // Icon & Color
  if (type === "assignment") {
    icon.className =
      "w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center text-xl shadow-sm border border-purple-100";
    icon.innerHTML = '<i class="fa-solid fa-file-code"></i>';
  } else {
    icon.className =
      "w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center text-xl shadow-sm border border-orange-100";
    icon.innerHTML = '<i class="fa-solid fa-stopwatch"></i>';
  }

  // Status & Submission Area
  if (
    (type === "assignment" && item.status === "submitted") ||
    (type === "quiz" && item.status === "completed")
  ) {
    status.className =
      "px-2.5 py-1 rounded-lg bg-green-100 text-green-700 text-xs font-bold";
    status.innerText = type === "assignment" ? "Đã nộp" : "Đã làm";

    submissionArea.innerHTML = `
            <div class="flex justify-between items-center">
                <div>
                    <p class="text-xs font-bold text-slate-500 uppercase">Điểm số</p>
                    <p class="text-3xl font-black ${
                      item.score >= 5 ? "text-green-600" : "text-red-500"
                    }">${item.score !== null ? item.score : "--"}</p>
                </div>
                <div class="text-right">
                    <p class="text-xs font-bold text-slate-500 uppercase">Ngày nộp</p>
                    <p class="text-sm font-bold text-slate-700">20/10/2025</p>
                </div>
            </div>
        `;
  } else {
    status.className =
      "px-2.5 py-1 rounded-lg bg-slate-100 text-slate-500 text-xs font-bold";
    status.innerText = "Chưa nộp";

    actionBtn.classList.remove("hidden");
    actionBtn.innerText = type === "assignment" ? "Nộp bài" : "Làm bài ngay";

    if (type === "assignment") {
      // Drag & Drop UI
      submissionArea.innerHTML = `
            <div id="drop-zone" class="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center hover:border-blue-500 hover:bg-blue-50 transition cursor-pointer relative group">
                <input type="file" id="file-upload" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer" multiple>
                <div class="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition">
                    <i class="fa-solid fa-cloud-arrow-up text-2xl"></i>
                </div>
                <p class="text-sm font-bold text-slate-700">Kéo thả file vào đây hoặc click để chọn</p>
                <p class="text-xs text-slate-400 mt-2">Hỗ trợ: PDF, DOCX, ZIP (Max 20MB)</p>
                <div id="file-list" class="mt-4 space-y-2 hidden"></div>
            </div>
            
            <!-- Progress Bar (Hidden initially) -->
            <div id="upload-progress" class="hidden mt-4">
                <div class="flex justify-between text-xs font-bold text-slate-500 mb-1">
                    <span>Đang tải lên...</span>
                    <span id="progress-percent">0%</span>
                </div>
                <div class="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div id="progress-bar" class="h-full bg-blue-600 w-0 transition-all duration-300"></div>
                </div>
            </div>
        `;

      // Handle File Selection
      setTimeout(() => {
        const fileInput = document.getElementById("file-upload");
        const fileList = document.getElementById("file-list");

        if (fileInput) {
          fileInput.addEventListener("change", (e) => {
            if (e.target.files.length > 0) {
              fileList.classList.remove("hidden");
              fileList.innerHTML = Array.from(e.target.files)
                .map(
                  (file) => `
                            <div class="flex items-center justify-between p-2 bg-slate-50 rounded-lg border border-slate-200 text-left">
                                <div class="flex items-center gap-2 min-w-0">
                                    <i class="fa-solid fa-file text-slate-400"></i>
                                    <span class="text-xs font-bold text-slate-700 truncate">${
                                      file.name
                                    }</span>
                                </div>
                                <span class="text-[10px] text-slate-400">${(
                                  file.size /
                                  1024 /
                                  1024
                                ).toFixed(2)} MB</span>
                            </div>
                        `
                )
                .join("");
            }
          });
        }
      }, 100);

      actionBtn.onclick = () => {
        const fileInput = document.getElementById("file-upload");
        if (!fileInput || fileInput.files.length === 0) {
          showToast("Vui lòng chọn file để nộp!", "error");
          return;
        }

        // Simulate Upload
        setButtonLoading(actionBtn, true);
        const progressDiv = document.getElementById("upload-progress");
        const progressBar = document.getElementById("progress-bar");
        const progressText = document.getElementById("progress-percent");

        progressDiv.classList.remove("hidden");
        let width = 0;
        const interval = setInterval(() => {
          width += Math.random() * 10;
          if (width > 100) width = 100;

          progressBar.style.width = width + "%";
          progressText.innerText = Math.round(width) + "%";

          if (width === 100) {
            clearInterval(interval);
            setTimeout(() => {
              setButtonLoading(actionBtn, false);
              showToast("Nộp bài thành công!", "success");
              closeAssignmentModal();

              // Update UI Status (Mock)
              item.status = "submitted";
              item.score = null; // Pending grading

              // Re-render
              const details = mockCourseDetails[currentCourseName];
              renderCourseAssignments(details.assignments, details.quizzes);
              renderCourseOverview(details); // Update overview deadlines
            }, 500);
          }
        }, 200);
      };
    } else {
      // Quiz Logic (Keep as is or update later)
      submissionArea.innerHTML = `
            <div class="text-center py-4">
                <div class="w-12 h-12 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-3 text-xl">
                    <i class="fa-solid fa-stopwatch"></i>
                </div>
                <p class="text-sm font-bold text-slate-700">Bài kiểm tra trắc nghiệm</p>
                <p class="text-xs text-slate-500 mt-1">Thời gian làm bài: 45 phút</p>
            </div>
        `;
      actionBtn.onclick = () => {
        showToast("Chức năng làm bài kiểm tra đang được phát triển", "info");
      };
    }
  }

  // Files
  if (item.files && item.files.length > 0) {
    files.innerHTML = item.files
      .map(
        (f) => `
        <div class="flex items-center p-3 bg-white border border-slate-200 rounded-xl hover:border-blue-400 transition cursor-pointer group">
            <div class="w-8 h-8 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center mr-3">
                <i class="fa-solid fa-file"></i>
            </div>
            <div class="min-w-0 flex-1">
                <p class="text-xs font-bold text-slate-700 truncate group-hover:text-blue-600 transition">${f.name}</p>
                <p class="text-[10px] text-slate-400">${f.size}</p>
            </div>
            <button class="text-slate-400 hover:text-blue-600 transition"><i class="fa-solid fa-download"></i></button>
        </div>
    `
      )
      .join("");
  } else {
    files.innerHTML =
      '<p class="text-slate-400 text-xs italic col-span-2">Không có tài liệu đính kèm.</p>';
  }

  modal.classList.remove("hidden");
}

export function closeAssignmentModal() {
  document.getElementById("assignment-modal").classList.add("hidden");
}

// Search Courses
export function searchCourses() {
  const searchInput = document.querySelector(
    '#student_register input[type="text"]'
  );
  const filter = searchInput ? searchInput.value.toLowerCase().trim() : "";
  const courseCards = document.querySelectorAll(
    "#student_register .grid > div"
  );
  let hasResults = false;

  courseCards.forEach((card) => {
    const text = card.textContent.toLowerCase();
    if (text.includes(filter)) {
      card.classList.remove("hidden");
      card.classList.add("animate-fade-in-up");
      hasResults = true;
    } else {
      card.classList.add("hidden");
      card.classList.remove("animate-fade-in-up");
    }
  });
}

// View Detailed Report
export function viewDetailedReport() {
  showToast("Đang tải báo cáo chi tiết...", "info");
}

// Toggle Class Details (generic)
export function toggleClassDetails(id) {
  document.getElementById(id).classList.toggle("hidden");
}

// Open Forum Modal
export function openForumModal(forumId) {
  // Fallback if currentCourseName is lost (e.g. after reload)
  if (!currentCourseName) {
    const nameEl = document.getElementById("detail-course-name");
    if (nameEl) {
      const text = nameEl.innerText;
      if (text) {
        // Extract name part (before " - ")
        currentCourseName = text.split(" - ")[0].trim();
        console.log("Recovered course name from DOM:", currentCourseName);
      }
    }
  }

  const details = mockCourseDetails[currentCourseName];
  if (!details) {
    console.error("Course details not found for:", currentCourseName);
    return;
  }

  const topic = details.forum.find((f) => f.id == forumId);
  if (!topic) return;

  currentForumId = forumId;
  console.log("Opening Forum Modal:", forumId);

  const modal = document.getElementById("forum-modal");
  const title = document.getElementById("forum-topic-title");
  const author = document.getElementById("forum-topic-author");
  const date = document.getElementById("forum-topic-date");
  const content = document.getElementById("forum-topic-content");
  const count = document.getElementById("forum-reply-count");
  const list = document.getElementById("forum-replies-list");

  title.innerText = topic.title;
  author.innerText = topic.author;
  date.innerText = topic.last_post;
  content.innerText =
    topic.content || "Nội dung bài viết đang được cập nhật...";
  count.innerText = topic.repliesList ? topic.repliesList.length : 0;

  // Render Replies
  if (topic.repliesList && topic.repliesList.length > 0) {
    list.innerHTML = topic.repliesList
      .map(
        (r) => `
        <div class="flex gap-4">
            <div class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600 flex-shrink-0 border border-slate-200">
                ${r.author.charAt(0)}
            </div>
            <div class="flex-1">
                <div class="bg-slate-50 p-3 rounded-2xl rounded-tl-none border border-slate-100">
                    <div class="flex justify-between items-center mb-1">
                        <span class="text-xs font-bold text-slate-700">${
                          r.author
                        }</span>
                        <span class="text-[10px] text-slate-400">${
                          r.date
                        }</span>
                    </div>
                    <p class="text-sm text-slate-600">${r.content}</p>
                </div>
            </div>
        </div>
    `
      )
      .join("");
  } else {
    list.innerHTML =
      '<p class="text-slate-400 text-sm italic text-center py-4">Chưa có phản hồi nào. Hãy là người đầu tiên!</p>';
  }

  modal.classList.remove("hidden");
}

export function closeForumModal() {
  document.getElementById("forum-modal").classList.add("hidden");
}

export function submitForumReply(e) {
  e.preventDefault();
  const input = document.getElementById("forum-reply-input");
  const content = input.value.trim();
  if (!content) return;

  const btn = e.target.querySelector('button[type="submit"]');
  setButtonLoading(btn, true);

  // Simulate API call
  setTimeout(() => {
    const details = mockCourseDetails[currentCourseName];
    const topic = details.forum.find((f) => f.id == currentForumId);

    if (topic) {
      if (!topic.repliesList) topic.repliesList = [];

      // Add new reply
      topic.repliesList.push({
        author: "Bạn (SV)",
        content: content,
        date: new Date().toLocaleString("vi-VN", {
          hour: "2-digit",
          minute: "2-digit",
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
      });

      topic.replies++;
      topic.last_post = new Date().toISOString().split("T")[0];

      // Refresh View
      openForumModal(currentForumId);
      renderCourseForum(details.forum);
    }

    input.value = "";
    setButtonLoading(btn, false);
    showToast("Đã gửi bình luận thành công!", "success");
  }, 600);
}

export function cancelCurrentCourse() {
  const courseName = document.getElementById("detail-course-name").innerText;
  if (currentCourseId && courseName) {
    if (window.cancelCourse) {
      window.cancelCourse(currentCourseId, courseName);
    }
  }
}

// Contact Tutor Modal Logic
export function openContactModal() {
  // Fallback if currentCourseName is lost
  if (!currentCourseName) {
    const nameEl = document.getElementById("detail-course-name");
    if (nameEl) {
      const text = nameEl.innerText;
      if (text) {
        currentCourseName = text.split(" - ")[0].trim();
      }
    }
  }

  const details = mockCourseDetails[currentCourseName];
  if (!details) {
    showToast("Không tìm thấy thông tin môn học!", "error");
    return;
  }

  const modal = document.getElementById("contact-tutor-modal");
  const tutorInput = document.getElementById("contact-tutor-name");
  const subjectInput = document.getElementById("contact-subject");
  const messageInput = document.getElementById("contact-message");

  if (modal && tutorInput && subjectInput && messageInput) {
    tutorInput.value = details.tutor || "Giảng viên";
    subjectInput.value = `[${currentCourseName}] Thắc mắc về môn học`;
    messageInput.value = "";
    modal.classList.remove("hidden");
  }
}

export function closeContactModal() {
  const modal = document.getElementById("contact-tutor-modal");
  if (modal) modal.classList.add("hidden");
}

export function submitContactEmail(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  setButtonLoading(btn, true);

  setTimeout(() => {
    setButtonLoading(btn, false);
    showToast("Đã gửi email thành công!", "success");
    closeContactModal();
  }, 1000);
}

// Window assignments
window.registerCourse = registerCourse;
window.confirmRegistration = confirmRegistration;
window.viewAllSchedule = viewAllSchedule;
window.enterClass = enterClass;
window.searchCourses = searchCourses;
window.viewDetailedReport = viewDetailedReport;
window.toggleClassDetails = toggleClassDetails;
window.switchCourseTab = switchCourseTab;
window.backToCourses = backToCourses;
window.openAssignmentModal = openAssignmentModal;
window.closeAssignmentModal = closeAssignmentModal;
window.openForumModal = openForumModal;
window.closeForumModal = closeForumModal;
window.submitForumReply = submitForumReply;
window.renderStudentCourses = renderStudentCourses;
window.openContactModal = openContactModal;
window.closeContactModal = closeContactModal;
window.submitContactEmail = submitContactEmail;
