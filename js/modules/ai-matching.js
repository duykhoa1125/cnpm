/**
 * AI Tutor Matching Module
 * Simulates AI analysis and matching process
 */

import { showToast, setButtonLoading } from "./ui.js";

// Scroll to form
export function scrollToMatchingForm() {
  document.getElementById("matching-form-section").scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

// Start AI Matching Process
export function startAIMatching(e) {
  e.preventDefault();

  const form = document.getElementById("ai-matching-form");
  const loadingSection = document.getElementById("ai-matching-loading");
  const resultsSection = document.getElementById("ai-matching-results");
  const submitBtn = form.querySelector('button[type="submit"]');

  // Hide previous results if any
  resultsSection.classList.add("hidden");

  // Show loading
  loadingSection.classList.remove("hidden");
  form.classList.add("opacity-50", "pointer-events-none");

  // Scroll to loading
  loadingSection.scrollIntoView({ behavior: "smooth", block: "center" });

  // Simulate AI steps
  const loadingText = document.getElementById("ai-loading-text");
  const steps = [
    "Đang phân tích hồ sơ học tập...",
    "Đang đối chiếu phong cách học tập...",
    "Đang quét cơ sở dữ liệu Tutor...",
    "Đang tính toán độ tương thích...",
    "Đang tổng hợp kết quả...",
  ];

  let stepIndex = 0;
  const interval = setInterval(() => {
    if (stepIndex < steps.length) {
      loadingText.innerText = steps[stepIndex];
      stepIndex++;
    }
  }, 800);

  // Finish simulation
  setTimeout(() => {
    clearInterval(interval);
    loadingSection.classList.add("hidden");
    form.classList.remove("opacity-50", "pointer-events-none");
    resultsSection.classList.remove("hidden");

    // Scroll to results
    resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });

    showToast("Đã tìm thấy 3 Tutor phù hợp nhất!", "success");
  }, 4500);
}

// Reset Matching
export function resetAIMatching() {
  const form = document.getElementById("ai-matching-form");
  const resultsSection = document.getElementById("ai-matching-results");

  resultsSection.classList.add("hidden");
  form.reset();
  scrollToMatchingForm();
}

// Connect with Tutor
export function connectWithTutor(tutorName) {
  showToast(`Đã gửi yêu cầu kết nối tới Tutor ${tutorName}`, "success");
  setTimeout(() => {
    showToast("Tutor sẽ phản hồi bạn trong vòng 24h", "info");
  }, 1500);
}

// Make functions globally available
window.scrollToMatchingForm = scrollToMatchingForm;
window.startAIMatching = startAIMatching;
window.resetAIMatching = resetAIMatching;
window.connectWithTutor = connectWithTutor;
