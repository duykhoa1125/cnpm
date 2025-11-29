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

// Open Cancellation Rule Modal (Add/Edit)
export function openCancellationRuleModal(ruleId = null) {
  const modal = document.getElementById("cancellation-rule-modal");
  const form = document.getElementById("cancellation-rule-form");
  const title = document.getElementById("cancellation-rule-modal-title");

  if (!modal || !form) return;

  // Reset form
  form.reset();
  document.getElementById("rule-id").value = "";

  if (ruleId) {
    // Edit Mode
    const rule = mockCancellationRules.find((r) => r.id === ruleId);
    if (!rule) return;

    title.innerText = "Chỉnh sửa quy tắc";
    document.getElementById("rule-id").value = rule.id;
    document.getElementById("rule-condition").value = rule.condition;
    document.getElementById("rule-timeframe").value = rule.timeframe || "";
    document.getElementById("rule-consequence").value = rule.consequence;
    document.getElementById("rule-refund").value = rule.refundRate;
    document.getElementById("rule-penalty").value = rule.isPenalty.toString();
  } else {
    // Add Mode
    title.innerText = "Thêm quy tắc mới";
  }

  modal.classList.remove("hidden");
}

// Close Cancellation Rule Modal
export function closeCancellationRuleModal() {
  const modal = document.getElementById("cancellation-rule-modal");
  if (modal) modal.classList.add("hidden");
}

// Submit Cancellation Rule Form
export function submitCancellationRule(e) {
  e.preventDefault();

  const id = document.getElementById("rule-id").value;
  const condition = document.getElementById("rule-condition").value;
  const timeframe = document.getElementById("rule-timeframe").value;
  const consequence = document.getElementById("rule-consequence").value;
  const refundRate = parseInt(document.getElementById("rule-refund").value);
  const isPenalty = document.getElementById("rule-penalty").value === "true";

  if (id) {
    // Update existing rule
    const rule = mockCancellationRules.find((r) => r.id == id);
    if (rule) {
      rule.condition = condition;
      rule.timeframe = timeframe;
      rule.consequence = consequence;
      rule.refundRate = refundRate;
      rule.isPenalty = isPenalty;
      showToast("Đã cập nhật quy tắc!", "success");
    }
  } else {
    // Create new rule
    const newRule = {
      id:
        mockCancellationRules.length > 0
          ? Math.max(...mockCancellationRules.map((r) => r.id)) + 1
          : 1,
      condition,
      timeframe,
      consequence,
      refundRate,
      isPenalty,
    };
    mockCancellationRules.push(newRule);
    showToast("Đã thêm quy tắc mới thành công!", "success");
  }

  renderCourseCancellationRules();
  closeCancellationRuleModal();
}

// Add Cancellation Rule (Proxy)
export function addCancellationRule() {
  openCancellationRuleModal();
}

// Edit Cancellation Rule (Proxy)
export function editCancellationRule(id) {
  openCancellationRuleModal(id);
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
window.openCancellationRuleModal = openCancellationRuleModal;
window.closeCancellationRuleModal = closeCancellationRuleModal;
window.submitCancellationRule = submitCancellationRule;
