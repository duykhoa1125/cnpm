/**
 * Course Cancellation Logic Module
 * Handles course cancellation and cancellation rules management
 */

import { mockCancellationRules } from "./config.js";
import { showToast, confirmActionModal, setButtonLoading } from "./ui.js";

// Cancel Course (Student)
export function cancelCourse(courseId, courseName) {
  const modal = document.getElementById("cancel-course-modal");
  if (modal) {
    document.getElementById("cancel-course-name").innerText = courseName;
    document.getElementById("cancel-course-id").value = courseId;
    document.getElementById("cancel-reason").value = "";
    modal.classList.remove("hidden");
  }
}

// Close Cancellation Modal
export function closeCancellationModal() {
  const modal = document.getElementById("cancel-course-modal");
  if (modal) modal.classList.add("hidden");
}

// Process Cancellation
export function processCancellation(e) {
  e.preventDefault();

  const courseId = document.getElementById("cancel-course-id").value;
  const reason = document.getElementById("cancel-reason").value;

  const btn = e.target.querySelector('button[type="submit"]');
  setButtonLoading(btn, true);

  setTimeout(() => {
    setButtonLoading(btn, false);
    showToast("Yêu cầu hủy môn đã được gửi!", "success");
    closeCancellationModal();

    // Show rule consequence
    setTimeout(() => {
      showToast(
        "Lưu ý: Bạn sẽ được hoàn 80% học phí do hủy trước 2 tuần.",
        "info"
      );
    }, 1000);
  }, 1200);
}

// Render Cancellation Rules (Academic/Admin)
export function renderCourseCancellationRules() {
  const tableBody = document.getElementById("cancellation-rules-list");
  const emptyState = document.getElementById("cancellation-rules-empty");

  if (!tableBody) return;

  if (mockCancellationRules.length === 0) {
    tableBody.innerHTML = "";
    if (emptyState) emptyState.classList.remove("hidden");
    return;
  }

  if (emptyState) emptyState.classList.add("hidden");

  tableBody.innerHTML = mockCancellationRules
    .map(
      (rule) => `
        <tr class="border-b border-slate-100 hover:bg-blue-50/30 transition">
            <td class="py-4 pl-4">
                <p class="font-bold text-slate-800">${rule.condition}</p>
                <p class="text-xs text-slate-500 mt-1">${rule.timeframe}</p>
            </td>
            <td class="py-4">
                <p class="text-sm text-slate-700">${rule.consequence}</p>
            </td>
            <td class="py-4 text-center">
                <span class="px-3 py-1 rounded-full text-xs font-bold ${
                  rule.refundRate >= 80
                    ? "bg-green-100 text-green-700"
                    : rule.refundRate >= 50
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }">
                    ${rule.refundRate}%
                </span>
            </td>
            <td class="py-4 text-center">
                ${
                  rule.isPenalty
                    ? '<span class="px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700"><i class="fa-solid fa-exclamation-triangle mr-1"></i>Có</span>'
                    : '<span class="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-500">Không</span>'
                }
            </td>
            <td class="py-4 pr-4 text-right">
                <div class="flex gap-2 justify-end">
                    <button onclick="editCancellationRule(${
                      rule.id
                    })" class="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition flex items-center justify-center" title="Chỉnh sửa">
                        <i class="fa-solid fa-pen text-xs"></i>
                    </button>
                    <button onclick="deleteCancellationRule(${
                      rule.id
                    })" class="w-8 h-8 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition flex items-center justify-center" title="Xóa">
                        <i class="fa-solid fa-trash text-xs"></i>
                    </button>
                </div>
            </td>
        </tr>
    `
    )
    .join("");
}

// Add Cancellation Rule
export function addCancellationRule() {
  const condition = prompt("Nhập điều kiện (VD: Hủy trước 2 tuần):");
  if (!condition) return;

  const timeframe = prompt(
    "Nhập khung thời gian (VD: >= 14 ngày trước khai giảng):"
  );
  if (!timeframe) return;

  const consequence = prompt(
    "Nhập hậu quả (VD: Được hoàn học phí, không bị phạt):"
  );
  if (!consequence) return;

  const refundRate = parseInt(prompt("Nhập % hoàn học phí (0-100):") || "0");
  const isPenalty = confirm("Có bị phạt/cảnh cáo không?");

  const newRule = {
    id: mockCancellationRules.length + 1,
    condition,
    timeframe,
    consequence,
    refundRate: Math.min(100, Math.max(0, refundRate)),
    isPenalty,
  };

  mockCancellationRules.push(newRule);
  renderCourseCancellationRules();
  showToast("Đã thêm quy tắc mới thành công!", "success");
}

// Edit Cancellation Rule
export function editCancellationRule(id) {
  const rule = mockCancellationRules.find((r) => r.id === id);
  if (!rule) return;

  const condition = prompt("Điều kiện:", rule.condition);
  if (condition) rule.condition = condition;

  const timeframe = prompt("Khung thời gian:", rule.timeframe);
  if (timeframe) rule.timeframe = timeframe;

  const consequence = prompt("Hậu quả:", rule.consequence);
  if (consequence) rule.consequence = consequence;

  const refundRate = prompt("% Hoàn học phí:", rule.refundRate);
  if (refundRate) rule.refundRate = parseInt(refundRate);

  const isPenalty = confirm(
    `Có bị phạt? (Hiện tại: ${rule.isPenalty ? "Có" : "Không"})`
  );
  rule.isPenalty = isPenalty;

  renderCourseCancellationRules();
  showToast("Đã cập nhật quy tắc!", "success");
}

// Delete Cancellation Rule
export function deleteCancellationRule(id) {
  confirmActionModal(
    "Xóa quy tắc?",
    "Bạn có chắc muốn xóa quy tắc này không?",
    () => {
      const index = mockCancellationRules.findIndex((r) => r.id === id);
      if (index !== -1) {
        mockCancellationRules.splice(index, 1);
        renderCourseCancellationRules();
        showToast("Đã xóa quy tắc!", "info");
      }
    },
    "Xóa",
    "bg-red-500"
  );
}

// Filter Progress by Semester (Student Progress)
export function filterProgressBySemester(semester) {
  showToast(
    `Đang lọc theo ${semester === "all" ? "tất cả học kỳ" : semester}...`,
    "info"
  );
  // In a real app, this would filter the table
}

// Make functions globally available
window.cancelCourse = cancelCourse;
window.closeCancellationModal = closeCancellationModal;
window.processCancellation = processCancellation;
window.renderCourseCancellationRules = renderCourseCancellationRules;
window.addCancellationRule = addCancellationRule;
window.editCancellationRule = editCancellationRule;
window.deleteCancellationRule = deleteCancellationRule;
window.filterProgressBySemester = filterProgressBySemester;
