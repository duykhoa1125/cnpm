/**
 * Cancellation Module
 * Handles course cancellation rules and logic
 */

import { showToast } from "./ui.js";

let pendingCancelId = null;
let pendingCancelName = null;

// Ensure Cancellation Modal Exists
function ensureCancellationModalExists() {
  if (!document.getElementById("cancellation-modal")) {
    const modalHtml = `
        <div id="cancellation-modal" class="hidden fixed inset-0 z-[60] flex items-center justify-center">
            <div class="absolute inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity" onclick="closeCancellationModal()"></div>
            <div class="glass-panel w-full max-w-md p-8 rounded-[32px] shadow-2xl relative z-10 bg-white/80 transform transition-all scale-100">
                <div class="text-center mb-6">
                    <div class="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center text-2xl mx-auto mb-4 shadow-inner border border-red-100">
                        <i class="fa-solid fa-triangle-exclamation"></i>
                    </div>
                    <h3 class="text-2xl font-black text-slate-800">Xác nhận hủy môn</h3>
                    <p class="text-slate-500 mt-2 text-sm font-medium">Hành động này không thể hoàn tác ngay lập tức.</p>
                </div>

                <div class="bg-white/50 p-5 rounded-2xl border border-white/60 mb-6 shadow-sm">
                    <div class="flex justify-between mb-3">
                        <span class="text-xs font-bold text-slate-400 uppercase">Môn học</span>
                        <span id="modal-course-name" class="text-sm font-bold text-slate-700 text-right">...</span>
                    </div>
                    <div class="flex justify-between mb-3">
                        <span class="text-xs font-bold text-slate-400 uppercase">Hoàn lại</span>
                        <span id="modal-refund-amount" class="text-sm font-bold text-green-600 text-right">...</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-xs font-bold text-slate-400 uppercase">Trạng thái</span>
                        <span id="modal-cancel-status" class="text-sm font-bold text-right">...</span>
                    </div>
                </div>
                
                <div id="modal-warning-box" class="hidden bg-yellow-50 text-yellow-700 p-4 rounded-xl text-xs font-medium mb-6 border border-yellow-100 flex items-start gap-3">
                    <i class="fa-solid fa-circle-info mt-0.5 text-lg"></i>
                    <span class="leading-relaxed">Lưu ý: Hủy môn sau 24h sẽ bị ghi nhận vào hồ sơ vi phạm quy chế đào tạo.</span>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <button onclick="closeCancellationModal()" class="py-3 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition text-sm">Quay lại</button>
                    <button onclick="processCancellation()" class="py-3 rounded-xl bg-red-500 text-white font-bold shadow-lg shadow-red-500/30 hover:bg-red-600 transition text-sm">Xác nhận Hủy</button>
                </div>
            </div>
        </div>`;
    document.body.insertAdjacentHTML("beforeend", modalHtml);
  }
}

// Cancel Course
export function cancelCourse(id, name) {
  ensureCancellationModalExists();
  pendingCancelId = id;
  pendingCancelName = name;

  // Mock Logic for Rules
  const isLate = id === "CO1023";

  document.getElementById("modal-course-name").innerText = name;

  const refundEl = document.getElementById("modal-refund-amount");
  const statusEl = document.getElementById("modal-cancel-status");
  const warningBox = document.getElementById("modal-warning-box");

  if (isLate) {
    refundEl.innerText = "0 VNĐ (0%)";
    refundEl.className =
      "text-sm font-bold text-slate-400 text-right decoration-dashed";
    statusEl.innerHTML = "<span class='text-red-500'>Vi phạm quy chế</span>";
    warningBox.classList.remove("hidden");
  } else {
    refundEl.innerText = "100% Học phí";
    refundEl.className = "text-sm font-bold text-green-600 text-right";
    statusEl.innerHTML = "<span class='text-blue-600'>Hợp lệ</span>";
    warningBox.classList.add("hidden");
  }

  document.getElementById("cancellation-modal").classList.remove("hidden");
}

// Close Cancellation Modal
export function closeCancellationModal() {
  document.getElementById("cancellation-modal").classList.add("hidden");
  pendingCancelId = null;
}

// Process Cancellation
export function processCancellation() {
  if (!pendingCancelId) return;

  document.getElementById("cancellation-modal").classList.add("hidden");
  showToast(`Đang xử lý hủy môn ${pendingCancelName}...`, "info");

  setTimeout(() => {
    const card = document.getElementById(`course-card-${pendingCancelId}`);
    if (card) {
      card.classList.add("opacity-60", "grayscale");
      card.style.pointerEvents = "none";

      const btn = card.querySelector('button[onclick*="cancelCourse"]');
      if (btn) {
        btn.innerHTML = '<i class="fa-solid fa-ban mr-1"></i> Đã hủy';
        btn.className =
          "ml-2 px-3 py-1 rounded-lg bg-slate-200 text-slate-500 text-xs font-bold border border-slate-300 cursor-not-allowed flex-shrink-0";
        btn.removeAttribute("onclick");
      }

      showToast(`Đã hủy thành công môn "${pendingCancelName}".`, "success");
    } else {
      showToast(`Lỗi: Không tìm thấy môn học trên giao diện.`, "error");
    }

    pendingCancelId = null;
  }, 1000);
}

// Render Course Cancellation Rules
export function renderCourseCancellationRules() {
  console.log("Rendering Cancellation Rules view.");
}

// Make functions globally available
window.cancelCourse = cancelCourse;
window.closeCancellationModal = closeCancellationModal;
window.processCancellation = processCancellation;
window.renderCourseCancellationRules = renderCourseCancellationRules;
