/**
 * Student Courses Module
 * Handles student-specific course management logic
 */

import { mockCourseDetails } from "./config.js";
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
      showToast(`Đã đăng ký thành công ${courseName}!`, "success");
    },
    "Đăng ký",
    "bg-blue-600"
  );
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
        <i class="fa-solid fa-user-tie mr-1.5 text-blue-500"></i> ${
          details.tutor
        }
        <span class="mx-2">•</span>
        <i class="fa-solid fa-clock mr-1.5 text-orange-500"></i> ${
          details.schedule
        }
        <span class="mx-2">•</span>
        <i class="fa-solid fa-location-dot mr-1.5 text-red-500"></i> ${
          details.room || "Chưa cập nhật"
        }
      `;
  }

  // Render Announcements (Default Tab)
  renderCourseAnnouncements(details.announcements);

  // Render other tabs data
  renderCourseSchedule(details.scheduleList);
  renderCourseAssignments(details.assignments, details.quizzes);
  renderCourseForum(details.forum);
  renderCourseExams(details.exams);
  renderCourseMaterials(details.materials);
  renderCourseGrades(details.grades);

  // Switch View
  switchTab("courses_student_detail");

  // Reset tabs to first one
  const firstTab = document.querySelector(".course-tab-btn");
  if (firstTab) switchCourseTab(firstTab, "tab-announcements");
}

export function backToCourses() {
  switchTab("courses_student");
}

export function switchCourseTab(btn, targetId) {
  // Remove active class from all buttons
  document.querySelectorAll(".course-tab-btn").forEach((b) => {
    b.classList.remove(
      "active",
      "border-b-2",
      "border-blue-600",
      "text-blue-600"
    );
    b.classList.add("text-slate-500");
  });

  // Add active class to clicked button
  btn.classList.add("active", "border-b-2", "border-blue-600", "text-blue-600");
  btn.classList.remove("text-slate-500");

  // Hide all tab contents
  document
    .querySelectorAll(".course-tab-content")
    .forEach((c) => c.classList.add("hidden"));

  // Show target tab content
  const target = document.getElementById(targetId);
  if (target) target.classList.remove("hidden");
}

// Render helpers (internal)
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

    submissionArea.innerHTML = `
            <div class="text-center py-4">
                <div class="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 text-xl">
                    <i class="fa-solid fa-cloud-arrow-up"></i>
                </div>
                <p class="text-sm font-bold text-slate-700">Nộp bài làm của bạn</p>
                <p class="text-xs text-slate-500 mt-1">Hỗ trợ: PDF, DOCX, ZIP (Max 20MB)</p>
            </div>
        `;
    actionBtn.classList.remove("hidden");
    actionBtn.innerText = type === "assignment" ? "Nộp bài" : "Làm bài ngay";
    actionBtn.onclick = () => {
      showToast("Chức năng nộp bài đang được phát triển", "info");
    };
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
window.cancelCurrentCourse = cancelCurrentCourse;
