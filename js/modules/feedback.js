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
  const courses = [...new Set(feedbacks.map((f) => f.course))];
  const courseSelect = document.getElementById("tutor-course-filter");
  if (courseSelect && courseSelect.options.length === 1) {
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

    Object.keys(grouped).forEach(courseName => {
        const items = grouped[courseName];
        
        // Calculate stats for this course group
        const courseAvg = (items.reduce((a, b) => a + b.rating, 0) / items.length).toFixed(1);
        
        const section = document.createElement("div");
        section.className = "glass-card p-6 rounded-[28px] animate-fade-in-up";
        
        let tableRows = items.map(f => {
             let starsHtml = "";
            for (let i = 1; i <= 5; i++) {
                starsHtml += `<i class="fa-solid fa-star ${
                i <= f.rating ? "text-yellow-400" : "text-slate-200"
                } text-[10px]"></i>`;
            }
            
            return `
            <tr class="border-b border-slate-50 hover:bg-blue-50/50 transition group/row">
                <td class="py-4 pl-4 font-bold text-slate-700 text-sm">${f.student}</td>
                <td class="py-4 whitespace-nowrap">${starsHtml}</td>
                <td class="py-4 text-slate-600 text-sm italic">"${f.comment}"</td>
                <td class="py-4 text-slate-400 text-xs text-right pr-4">${f.date}</td>
            </tr>
            `;
        }).join("");

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

// Submit Feedback (Student)
export function submitFeedback(e) {
  e.preventDefault();

  const courseId = document.getElementById("selected-feedback-course")?.value;
  if (!courseId) {
    showToast("Vui lòng chọn môn học để đánh giá!", "error");
    return;
  }

  showToast("Cảm ơn phản hồi của bạn!", "success");

  // Reset form
  e.target.reset();
  document.getElementById("selected-feedback-course").value = "";

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

  // Reset star rating
  const stars = document.querySelectorAll(".star-btn");
  stars.forEach((star) => {
    star.classList.remove("text-yellow-400");
    star.classList.add("text-slate-200");
  });
  const ratingText = document.getElementById("rating-text");
  if (ratingText) {
    ratingText.innerText = "Chưa chọn mức độ";
    ratingText.classList.remove("text-slate-600");
    ratingText.classList.add("text-slate-400");
  }
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
