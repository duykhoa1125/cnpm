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

// Chat State
let currentChatRole = "ai"; // 'ai' or 'tutor'
let isTyping = false;

// Connect with Tutor (Opens Chat)
export function connectWithTutor(tutorName) {
  openChat(tutorName, "tutor");
}

// Open Chat Modal
export function openChat(name, role) {
  const modal = document.getElementById("ai-chat-modal");
  const avatar = document.getElementById("chat-avatar");
  const nameEl = document.getElementById("chat-name");
  const messages = document.getElementById("chat-messages");
  const input = document.getElementById("chat-input");

  if (!modal) return;

  currentChatRole = role;
  nameEl.innerText = name;

  // Set Avatar based on role
  if (role === "ai") {
    avatar.src =
      "https://ui-avatars.com/api/?name=AI&background=6366f1&color=fff";
  } else {
    avatar.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name
    )}&background=random`;
  }

  // Clear previous messages or load history (mock)
  messages.innerHTML = "";

  // Add Welcome Message
  const welcomeText =
    role === "ai"
      ? "Xin chào! Tôi là trợ lý AI. Tôi có thể giúp gì cho việc tìm kiếm Tutor của bạn?"
      : `Chào bạn! Mình là ${name}. Rất vui được kết nối với bạn. Bạn cần hỗ trợ môn học nào?`;

  appendMessage(welcomeText, "receiver", role === "ai" ? "AI" : "Tutor");

  modal.classList.remove("hidden");
  input.focus();
}

// Close Chat Modal
export function closeChat() {
  const modal = document.getElementById("ai-chat-modal");
  if (modal) modal.classList.add("hidden");
}

// Send Chat Message
export function sendChatMessage(e) {
  e.preventDefault();
  const input = document.getElementById("chat-input");
  const text = input.value.trim();

  if (!text) return;

  // Append User Message
  appendMessage(text, "sender", "Me");
  input.value = "";

  // Simulate Response
  if (!isTyping) {
    isTyping = true;
    showTypingIndicator();

    // Delay for realism
    setTimeout(() => {
      removeTypingIndicator();
      const response = generateResponse(text, currentChatRole);
      appendMessage(
        response,
        "receiver",
        currentChatRole === "ai" ? "AI" : "Tutor"
      );
      isTyping = false;
    }, 1500 + Math.random() * 1000);
  }
}

// Helper: Append Message to UI
function appendMessage(text, type, senderName) {
  const messages = document.getElementById("chat-messages");
  const div = document.createElement("div");

  if (type === "receiver") {
    // Receiver Message (Left)
    div.className = "flex items-start gap-3 animate-fade-in-up";
    div.innerHTML = `
        <div class="w-8 h-8 rounded-full ${
          senderName === "AI"
            ? "bg-indigo-100 text-indigo-600"
            : "bg-slate-200 text-slate-600"
        } flex items-center justify-center text-[10px] font-bold shrink-0 uppercase border border-white shadow-sm">
            ${senderName.substring(0, 2)}
        </div>
        <div class="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 max-w-[80%]">
            <p class="text-sm text-slate-600 leading-relaxed">${text}</p>
            <span class="text-[10px] text-slate-400 mt-1 block">Just now</span>
        </div>
    `;
  } else {
    // Sender Message (Right)
    div.className =
      "flex items-start gap-3 justify-end animate-fade-in-up flex-row-reverse";
    div.innerHTML = `
         <div class="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-bold shrink-0 border border-white shadow-sm">
            ME
        </div>
        <div class="bg-blue-600 p-3 rounded-2xl rounded-tr-none shadow-lg shadow-blue-500/20 max-w-[80%]">
            <p class="text-sm text-white leading-relaxed">${text}</p>
        </div>
    `;
  }

  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

// Helper: Show Typing Indicator
function showTypingIndicator() {
  const messages = document.getElementById("chat-messages");
  const div = document.createElement("div");
  div.id = "typing-indicator";
  div.className = "flex items-start gap-3 animate-fade-in";
  div.innerHTML = `
        <div class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
            <i class="fa-solid fa-ellipsis text-slate-400 animate-pulse"></i>
        </div>
        <div class="bg-white px-4 py-3 rounded-2xl rounded-tl-none shadow-sm border border-slate-100">
            <div class="flex gap-1">
                <div class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                <div class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                <div class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 0.4s"></div>
            </div>
        </div>
    `;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

function removeTypingIndicator() {
  const el = document.getElementById("typing-indicator");
  if (el) el.remove();
}

// Helper: Mock Response Generator
function generateResponse(input, role) {
  input = input.toLowerCase();

  if (role === "ai") {
    if (input.includes("xin chào") || input.includes("hi"))
      return "Chào bạn! Bạn cần tìm Tutor cho môn học nào?";
    if (input.includes("giải tích") || input.includes("toán"))
      return "Môn Giải tích khá khó. Tôi đề xuất bạn nên tìm Tutor có phong cách 'Visual' để dễ hình dung đồ thị. Bạn có muốn tôi lọc danh sách không?";
    if (input.includes("lập trình") || input.includes("code"))
      return "Với môn Lập trình, bạn nên tìm Tutor có nhiều bài tập thực hành. Tôi thấy Tutor Trần Hùng rất phù hợp.";
    if (input.includes("cảm ơn"))
      return "Không có chi! Chúc bạn tìm được Tutor ưng ý.";
    return "Tôi đã ghi nhận thông tin. Tôi đang phân tích thêm dữ liệu để hỗ trợ bạn tốt hơn.";
  } else {
    // Tutor Role
    if (input.includes("xin chào") || input.includes("hi"))
      return "Chào bạn, mình có thể giúp gì cho bạn?";
    if (input.includes("học phí") || input.includes("giá"))
      return "Học phí của mình là 150k/giờ cho lớp 1-1 nhé.";
    if (input.includes("lịch") || input.includes("rảnh"))
      return "Mình thường rảnh vào tối thứ 3, 5, 7. Bạn có thể học giờ nào?";
    if (input.includes("bài tập") || input.includes("khó"))
      return "Đừng lo, mình sẽ hướng dẫn bạn phương pháp giải chi tiết. Hôm nào mình học thử 1 buổi nhé?";
    return "Ok, mình đã nắm được. Để mình xem lại lịch rồi báo bạn nhé.";
  }
}

// Make functions globally available
window.scrollToMatchingForm = scrollToMatchingForm;
window.startAIMatching = startAIMatching;
window.resetAIMatching = resetAIMatching;
window.connectWithTutor = connectWithTutor;
window.openChat = openChat;
window.closeChat = closeChat;
window.sendChatMessage = sendChatMessage;
