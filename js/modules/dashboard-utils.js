/**
 * Dashboard Utilities Module
 * Handlers for various dashboard action buttons across roles
 */

import { showToast, setButtonLoading } from "./ui.js";

// Academic Dashboard - Download Report
export function downloadAcademicReport() {
  showToast("Đang tạo báo cáo tuần...", "info");

  // Simulate report generation
  setTimeout(() => {
    // Create mock report data
    const reportContent = `BÁO CÁO TUẦN - HỆ THỐNG ĐÀO TẠO
========================================
Ngày: ${new Date().toLocaleDateString("vi-VN")}

TỔNG QUAN:
- Tổng sinh viên: 14,502
- Lớp học phần đang hoạt động: 850
- Tỷ lệ feedback: 68%
- Vi phạm quy chế: 12 trường hợp

TIẾN ĐỘ NHẬP ĐIỂM:
- Khoa KHMT: 98%
- Khoa Điện - ĐT: 85%
- Khoa Xây Dựng: 60%

NHẬT KÝ HOẠT ĐỘNG:
- Cập nhật lịch thi HK251
- Phê duyệt mở lớp bổ sung: Web Adv
- Hủy lớp: Vật lý 2 (L09) - Không đủ sĩ số

========================================
Báo cáo được tạo tự động bởi Hệ thống Tutor App
`;

    // Create and download file
    const blob = new Blob([reportContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Bao_cao_tuan_${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast("Đã tải xuống báo cáo thành công!", "success");
  }, 1500);
}

// Library - View Material
export function viewLibraryMaterial(materialId) {
  showToast("Đang mở tài liệu...", "info");
  setTimeout(() => {
    showToast(`Đang xem tài liệu #${materialId}`, "success");
  }, 500);
}

// Library - Download Material
export function downloadLibraryMaterial(materialId, materialName) {
  showToast(`Đang tải ${materialName}...`, "info");
  setTimeout(() => {
    showToast("Tải xuống thành công!", "success");
  }, 1000);
}

// Library - Upload Material (Tutor/Admin)
export function uploadLibraryMaterial() {
  showToast("Vui lòng chọn file để upload...", "info");
  // In a real app, this would open a file picker
}

// Dashboard - View Full Schedule
export function viewFullSchedule() {
  const modal = document.getElementById("schedule-modal");
  if (modal) {
    modal.classList.remove("hidden");
  }
}

// Dashboard - Quick Stats Click Handlers
export function viewGPADetails() {
  showToast("Đang tải chi tiết tiến độ Quiz...", "info");
  setTimeout(() => {
    showToast("Xem chi tiết tại mục 'Tiến độ học tập'", "info");
  }, 500);
}

export function viewCreditDetails() {
  showToast("Đang tải thông tin Quiz...", "info");
  setTimeout(() => {
    showToast("Bạn đã hoàn thành 80% Quiz trong chương trình học", "success");
  }, 500);
}

export function viewTrainingScoreDetails() {
  showToast("Đang tải điểm rèn luyện...", "info");
  setTimeout(() => {
    showToast("Điểm rèn luyện của bạn: 92/100 - Xếp loại Tốt", "success");
  }, 500);
}

// Admin - Send Reminder
export function sendAutomatedReminder(department) {
  showToast(`Đang gửi nhắc nhở tới ${department}...`, "info");
  setTimeout(() => {
    showToast("Đã gửi email nhắc nhở thành công!", "success");
  }, 1000);
}

// Export Student Report (Admin/Department)
export function exportStudentReport(type = "all") {
  showToast("Đang xuất báo cáo sinh viên...", "info");

  setTimeout(() => {
    const reportData = `Báo cáo sinh viên - ${type}
Ngày xuất: ${new Date().toLocaleDateString("vi-VN")}

Tổng số sinh viên: 14,502
Sinh viên đạt: 92%
Sinh viên cảnh báo: 8%

Chi tiết theo khoa:
- Khoa KHMT: 3,200 sinh viên
- Khoa Điện-ĐT: 2,800 sinh viên
- Khoa Xây Dựng: 1,900 sinh viên
`;

    const blob = new Blob([reportData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Bao_cao_sinh_vien_${new Date()
      .toISOString()
      .slice(0, 10)}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast("Đã xuất báo cáo thành công!", "success");
  }, 1500);
}

// Make functions globally available
window.downloadAcademicReport = downloadAcademicReport;
window.viewLibraryMaterial = viewLibraryMaterial;
window.downloadLibraryMaterial = downloadLibraryMaterial;
window.uploadLibraryMaterial = uploadLibraryMaterial;
window.viewFullSchedule = viewFullSchedule;
window.viewGPADetails = viewGPADetails;
window.viewCreditDetails = viewCreditDetails;
window.viewTrainingScoreDetails = viewTrainingScoreDetails;
window.sendAutomatedReminder = sendAutomatedReminder;
window.exportStudentReport = exportStudentReport;
