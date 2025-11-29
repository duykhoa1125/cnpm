/**
 * Feedback Module
 * Handles feedback rendering, filtering, and submission
 */

import { mockFeedbacks } from "./config.js";
import { showToast } from "./ui.js";

// Render Tutor Feedback View
export function renderTutorFeedback() {
  const currentTutorName = "Nguyễn Văn A";
  const feedbacks = mockFeedbacks.filter((f) => f.tutor === currentTutorName);

  // Update Stats
  const total = feedbacks.length;
  const avg =
    total > 0
      ? (feedbacks.reduce((a, b) => a + b.rating, 0) / total).toFixed(1)
      : "0.0";
  const fiveStarCount = feedbacks.filter((f) => f.rating === 5).length;
  const fiveStarRate =
    total > 0 ? Math.round((fiveStarCount / total) * 100) + "%" : "0%";

  document.getElementById("tutor-total-feedback").innerText = total;
  document.getElementById("tutor-avg-rating").innerText = avg;
  document.getElementById("tutor-5star-rate").innerText = fiveStarRate;

  // Populate Course Filter
  const courseSelect = document.getElementById("tutor-course-filter");
  if (courseSelect && courseSelect.options.length === 1) {
    const courses = [...new Set(feedbacks.map((f) => f.course))];
    courses.forEach((c) => {
      const opt = document.createElement("option");
      opt.value = c;
      opt.innerText = c;
      courseSelect.appendChild(opt);
    });
  }

  filterTutorFeedback();
}

// Filter Tutor Feedback
export function filterTutorFeedback() {
  const currentTutorName = "Nguyễn Văn A";
  let data = mockFeedbacks.filter((f) => f.tutor === currentTutorName);

  const search = document
    .getElementById("tutor-feedback-search")
    .value.toLowerCase();
  const course = document.getElementById("tutor-course-filter").value;
  const rating = document.getElementById("tutor-rating-filter").value;

  data = data.filter((f) => {
    const matchName = f.student.toLowerCase().includes(search);
    const matchCourse = course === "all" || f.course === course;
    const matchRating = rating === "all" || f.rating == rating;
    return matchName && matchCourse && matchRating;
  });

  const container = document.getElementById("tutor-feedback-container");
  const empty = document.getElementById("tutor-feedback-empty");

  if (!container) return;

  container.innerHTML = "";

  if (data.length === 0) {
    empty.classList.remove("hidden");
  } else {
    empty.classList.add("hidden");

    // Group by Course
    const grouped = data.reduce((acc, curr) => {
      (acc[curr.course] = acc[curr.course] || []).push(curr);
      return acc;
    }, {});

    Object.keys(grouped).forEach((courseName) => {
      const items = grouped[courseName];

      // Calculate stats for this course group
      const courseAvg = (
        items.reduce((a, b) => a + b.rating, 0) / items.length
      ).toFixed(1);

      const section = document.createElement("div");
      section.className =
        "glass-card p-6 rounded-[28px] animate-fade-in-up mb-6";

      let tableRows = items
        .map((f) => {
          let starsHtml = "";
          for (let i = 1; i <= 5; i++) {
            starsHtml += `<i class="fa-solid fa-star ${
              i <= f.rating ? "text-yellow-400" : "text-slate-200"
            } text-[10px]"></i>`;
          }

          // Detailed criteria tooltip or small display
          let criteriaHtml = "";
          if (f.criteria) {
            criteriaHtml = `
                <div class="mt-1 flex gap-2 text-[10px] text-slate-400">
                    <span title="Giảng dạy"><i class="fa-solid fa-chalkboard-user"></i> ${f.criteria.teaching}%</span>
                    <span title="Tài liệu"><i class="fa-solid fa-book"></i> ${f.criteria.materials}%</span>
                </div>
                `;
          }

          return `
            <tr class="border-b border-slate-50 hover:bg-blue-50/50 transition group/row">
                <td class="py-4 pl-4 font-bold text-slate-700 text-sm">${f.student}</td>
                <td class="py-4 whitespace-nowrap">
                    ${starsHtml}
                    ${criteriaHtml}
                </td>
                <td class="py-4 text-slate-600 text-sm italic">"${f.comment}"</td>
                <td class="py-4 text-slate-400 text-xs text-right pr-4">${f.date}</td>
            </tr>
            `;
        })
        .join("");

      section.innerHTML = `
            <div class="flex justify-between items-center mb-4 pb-4 border-b border-slate-100">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-lg">
                        <i class="fa-solid fa-book-open"></i>
                    </div>
                    <div>
                        <h3 class="font-bold text-slate-800 text-lg">${courseName}</h3>
                        <p class="text-xs text-slate-500">${items.length} đánh giá</p>
                    </div>
                </div>
                <div class="px-3 py-1 rounded-lg bg-yellow-50 text-yellow-600 text-sm font-bold border border-yellow-100">
                    ${courseAvg} <i class="fa-solid fa-star text-[10px] ml-1"></i>
                </div>
            </div>
            
            <div class="overflow-x-auto">
                 <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="text-slate-400 text-[10px] uppercase tracking-wider">
                            <th class="pb-2 pl-4 w-1/4">Sinh viên</th>
                            <th class="pb-2 w-32">Đánh giá</th>
                            <th class="pb-2">Nội dung</th>
                            <th class="pb-2 text-right pr-4 w-32">Ngày</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-50">
                        ${tableRows}
                    </tbody>
                </table>
            </div>
        `;

      container.appendChild(section);
    });
  }
}

// Render Admin Feedback View
export function renderAdminFeedback() {
  const feedbacks = mockFeedbacks;

  // Update Stats
  const total = feedbacks.length;
  const avg =
    total > 0
      ? (feedbacks.reduce((a, b) => a + b.rating, 0) / total).toFixed(1)
      : "0.0";
  const lowRating = feedbacks.filter((f) => f.rating < 3).length;

  document.getElementById("admin-total-feedback").innerText = total;
  document.getElementById("admin-avg-rating").innerText = avg;
  document.getElementById("admin-low-rating-count").innerText = lowRating;

  filterAdminFeedback();
}

// Filter Admin Feedback
export function filterAdminFeedback() {
  let data = mockFeedbacks;

  const search = document
    .getElementById("admin-feedback-search")
    .value.toLowerCase();
  const ratingType = document.getElementById("admin-rating-filter").value;

  data = data.filter((f) => {
    const matchSearch =
      f.tutor.toLowerCase().includes(search) ||
      f.student.toLowerCase().includes(search) ||
      f.course.toLowerCase().includes(search);
    let matchRating = true;
    if (ratingType === "positive") matchRating = f.rating >= 4;
    if (ratingType === "negative") matchRating = f.rating <= 3;
    return matchSearch && matchRating;
  });

  document.getElementById(
    "admin-feedback-count-badge"
  ).innerText = `${data.length} bản ghi`;

  const tbody = document.getElementById("admin-feedback-list");
  const empty = document.getElementById("admin-feedback-empty");

  if (!tbody) return;
  tbody.innerHTML = "";

  if (data.length === 0) {
    empty.classList.remove("hidden");
  } else {
    empty.classList.add("hidden");
    data.forEach((f) => {
      const tr = document.createElement("tr");
      tr.className = "border-b border-slate-100 hover:bg-blue-50/50 transition";

      let ratingBadge = "";
      if (f.rating >= 4)
        ratingBadge = `<span class="px-2 py-1 bg-green-100 text-green-600 rounded-lg text-xs font-bold">${f.rating} <i class="fa-solid fa-star"></i></span>`;
      else if (f.rating === 3)
        ratingBadge = `<span class="px-2 py-1 bg-yellow-100 text-yellow-600 rounded-lg text-xs font-bold">${f.rating} <i class="fa-solid fa-star"></i></span>`;
      else
        ratingBadge = `<span class="px-2 py-1 bg-red-100 text-red-600 rounded-lg text-xs font-bold">${f.rating} <i class="fa-solid fa-star"></i></span>`;

      tr.innerHTML = `
                <td class="py-4 pl-4 font-bold text-blue-600">${f.tutor}</td>
                <td class="py-4 font-bold text-slate-700">${f.student}</td>
                <td class="py-4 text-slate-600">${f.course}</td>
                <td class="py-4 text-center">${ratingBadge}</td>
                <td class="py-4 text-slate-600 truncate max-w-xs" title="${f.comment}">${f.comment}</td>
                <td class="py-4 text-slate-500 text-xs">${f.date}</td>
            `;
      tbody.appendChild(tr);
    });
  }
}

// --- NEW FEATURES FOR STUDENT FEEDBACK ---

// Init Student Feedback
export function initStudentFeedback() {
  renderStudentFeedbackHistory();
  setupStarRating();
}

// Setup Star Rating
function setupStarRating() {
  const container = document.getElementById("star-rating-group");
  if (!container) return;

  const stars = container.querySelectorAll(".star-interactive");
  const ratingInput = document.getElementById("feedback-rating-value");
  const ratingText = document.getElementById("rating-text");
  const emojiDisplay = document.getElementById("emoji-display");

  let currentRating = 0;

  stars.forEach((star) => {
    // Clone to remove old listeners if any
    const newStar = star.cloneNode(true);
    star.parentNode.replaceChild(newStar, star);
  });

  // Re-select after cloning
  const newStars = container.querySelectorAll(".star-interactive");
  newStars.forEach((star) => {
    star.addEventListener("mouseenter", () => {
      const value = parseInt(star.dataset.value);
      highlightStars(value);
      updateEmoji(value);
    });

    star.addEventListener("click", () => {
      currentRating = parseInt(star.dataset.value);
      ratingInput.value = currentRating;
      highlightStars(currentRating);
      updateEmoji(currentRating);

      // Update text
      const texts = [
        "Rất tệ 😡",
        "Tệ 😞",
        "Bình thường 😐",
        "Tốt 🙂",
        "Tuyệt vời 🤩",
      ];
      if (ratingText) {
        ratingText.innerText = texts[currentRating - 1];
        ratingText.className =
          "text-sm font-bold text-blue-600 transition-colors";
      }
    });
  });

  container.addEventListener("mouseleave", () => {
    if (currentRating === 0) {
      highlightStars(0);
      updateEmoji(0);
      if (ratingText) {
        ratingText.innerText = "Hãy chọn mức độ hài lòng";
        ratingText.className =
          "text-sm font-bold text-slate-500 transition-colors";
      }
    } else {
      highlightStars(currentRating);
      updateEmoji(currentRating);
    }
  });
}

function highlightStars(count) {
  const stars = document.querySelectorAll(".star-interactive");
  stars.forEach((star) => {
    const value = parseInt(star.dataset.value);
    star.className =
      "fa-solid fa-star star-interactive transition-all duration-200"; // Reset

    if (value <= count) {
      star.classList.add("active");
      if (count <= 2) star.classList.add("text-red-500"); // star-gradient-1
      else if (count === 3)
        star.classList.add("text-yellow-400"); // star-gradient-3
      else if (count === 4)
        star.classList.add("text-lime-500"); // star-gradient-4
      else star.classList.add("text-green-500"); // star-gradient-5
    } else {
      star.classList.add("text-slate-200");
    }
  });
}

function updateEmoji(count) {
  const emojiDisplay = document.getElementById("emoji-display");
  if (!emojiDisplay) return;

  const emojis = ["😡", "😞", "😐", "🙂", "🤩"];

  // Reset animation
  emojiDisplay.style.animation = "none";
  emojiDisplay.offsetHeight; /* trigger reflow */
  emojiDisplay.style.animation =
    "popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)";

  if (count > 0) {
    emojiDisplay.innerText = emojis[count - 1];
  } else {
    emojiDisplay.innerText = "😐";
  }
}

// Update Slider Value
export function updateSliderValue(id, value) {
  const display = document.getElementById(`val-${id}`);
  if (display) {
    display.innerText = `${value}%`;
    // Color change based on value
    if (value < 50) display.className = "text-sm font-bold text-red-500";
    else if (value < 80)
      display.className = "text-sm font-bold text-yellow-500";
    else display.className = "text-sm font-bold text-green-600";
  }
}

// Render Feedback History
export function renderStudentFeedbackHistory() {
  const container = document.getElementById("student-feedback-history");
  if (!container) return;

  const currentStudent = "Trần Thị B"; // Mock
  const history = mockFeedbacks
    .filter((f) => f.student === currentStudent)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  container.innerHTML = "";

  if (history.length === 0) {
    container.innerHTML = `<div class="text-center text-slate-400 py-4">Chưa có đánh giá nào</div>`;
    return;
  }

  history.forEach((f) => {
    const card = document.createElement("div");
    card.className =
      "bg-white border border-slate-100 p-4 rounded-2xl shadow-sm hover:shadow-md transition-all group mb-3";

    let emoji = "😐";
    if (f.rating >= 5) emoji = "🤩";
    else if (f.rating >= 4) emoji = "🙂";
    else if (f.rating <= 2) emoji = "😞";

    card.innerHTML = `
            <div class="flex justify-between items-start mb-2">
                <div>
                    <h4 class="font-bold text-slate-700 text-sm">${f.course}</h4>
                    <p class="text-xs text-slate-400">${f.tutor}</p>
                </div>
                <div class="text-2xl">${emoji}</div>
            </div>
            <div class="flex items-center gap-1 mb-2">
                <span class="font-bold text-slate-800">${f.rating}</span>
                <i class="fa-solid fa-star text-yellow-400 text-xs"></i>
                <span class="text-xs text-slate-300 mx-1">•</span>
                <span class="text-xs text-slate-400">${f.date}</span>
            </div>
            <p class="text-xs text-slate-500 italic line-clamp-2">"${f.comment}"</p>
        `;
    container.appendChild(card);
  });
}

// Submit Feedback (Student)
export function submitFeedback(e) {
  e.preventDefault();

  const courseId = document.getElementById("selected-feedback-course")?.value;
  const rating = document.getElementById("feedback-rating-value")?.value;

  if (!courseId) {
    showToast("Vui lòng chọn môn học để đánh giá!", "error");
    return;
  }
  if (!rating || rating == 0) {
    showToast("Vui lòng chọn mức độ hài lòng!", "error");
    return;
  }

  // Capture slider values
  const teaching = document.getElementById("range-teaching").value;
  const materials = document.getElementById("range-materials").value;
  const support = document.getElementById("range-support").value;
  const facilities = document.getElementById("range-facilities").value;

  showToast("Cảm ơn phản hồi của bạn!", "success");

  // Add to mock data (in memory)
  mockFeedbacks.unshift({
    id: Date.now(),
    tutor: "Nguyễn Văn A", // Mock
    student: "Trần Thị B", // Mock
    course: "Môn học mới", // Should map code to name
    rating: parseInt(rating),
    criteria: {
      teaching: parseInt(teaching),
      materials: parseInt(materials),
      support: parseInt(support),
      facilities: parseInt(facilities),
    },
    comment: e.target.querySelector("textarea").value,
    date: new Date().toISOString().split("T")[0],
  });

  // Reset form
  e.target.reset();
  document.getElementById("selected-feedback-course").value = "";
  document.getElementById("feedback-rating-value").value = "0";

  // Reset UI selection
  document.querySelectorAll(".course-select-card").forEach((card) => {
    card.classList.remove(
      "bg-blue-50",
      "border-blue-500",
      "ring-1",
      "ring-blue-500"
    );
    card.classList.add("bg-white", "border-slate-200");
    const check = card.querySelector(".check-icon");
    if (check) {
      check.classList.remove("bg-blue-500", "border-blue-500", "text-white");
      check.classList.add("border-slate-200", "text-transparent");
    }
  });

  // Reset sliders
  document.querySelectorAll(".custom-range").forEach((r) => {
    r.value = 50;
    updateSliderValue(r.id.replace("range-", ""), 50);
  });

  // Reset stars
  setupStarRating();

  renderStudentFeedbackHistory();
}

// Select Feedback Course
export function selectFeedbackCourse(el, value) {
  // Deselect all
  document.querySelectorAll(".course-select-card").forEach((card) => {
    card.classList.remove(
      "bg-blue-50",
      "border-blue-500",
      "ring-1",
      "ring-blue-500"
    );
    card.classList.add("bg-white", "border-slate-200");
    const check = card.querySelector(".check-icon");
    if (check) {
      check.classList.remove("bg-blue-500", "border-blue-500", "text-white");
      check.classList.add("border-slate-200", "text-transparent");
    }
  });

  // Select clicked
  el.classList.remove("bg-white", "border-slate-200");
  el.classList.add("bg-blue-50", "border-blue-500", "ring-1", "ring-blue-500");
  const check = el.querySelector(".check-icon");
  if (check) {
    check.classList.remove("border-slate-200", "text-transparent");
    check.classList.add("bg-blue-500", "border-blue-500", "text-white");
  }

  // Update hidden input
  const input = document.getElementById("selected-feedback-course");
  if (input) input.value = value;
}

// Export Feedback
export function exportFeedback(type) {
  showToast(`Đang xuất dữ liệu ra file ${type.toUpperCase()}...`, "success");
}

// Make functions globally available
window.filterTutorFeedback = filterTutorFeedback;
window.filterAdminFeedback = filterAdminFeedback;
window.submitFeedback = submitFeedback;
window.selectFeedbackCourse = selectFeedbackCourse;
window.exportFeedback = exportFeedback;
window.initStudentFeedback = initStudentFeedback;
window.updateSliderValue = updateSliderValue;
