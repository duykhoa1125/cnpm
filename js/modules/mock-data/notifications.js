/**
 * Mock Notifications Data
 * Contains notification messages for the system
 */

export let mockNotifications = [
  {
    id: 1,
    type: "schedule",
    title: "Thay đổi phòng học Giải tích 1",
    message: "Lớp L03 chuyển sang phòng 405 H6 vào sáng mai.",
    time: "2 phút trước",
    isRead: false,
  },
  {
    id: 2,
    type: "cancel",
    title: "Hủy lớp Vật lý đại cương",
    message: "GV bận đột xuất, lớp ngày 29/11 sẽ được nghỉ.",
    time: "1 giờ trước",
    isRead: false,
  },
  {
    id: 3,
    type: "feedback",
    title: "Phản hồi mới từ Sinh viên",
    message: "Bạn nhận được một đánh giá 5 sao cho môn Lập trình Web.",
    time: "3 giờ trước",
    isRead: true,
  },
  {
    id: 4,
    type: "system",
    title: "Bảo trì hệ thống",
    message: "Hệ thống sẽ bảo trì từ 00:00 đến 02:00 ngày 30/11.",
    time: "1 ngày trước",
    isRead: true,
  },
  {
    id: 5,
    type: "deadline",
    title: "Sắp đến hạn nộp BTL",
    message: "Assignment 2 môn CNPM còn 2 ngày nữa là hết hạn.",
    time: "2 ngày trước",
    isRead: true,
  },
  {
    id: 6,
    type: "grade",
    title: "Đã có điểm Giữa kỳ",
    message: "Môn Cấu trúc dữ liệu đã cập nhật bảng điểm.",
    time: "3 ngày trước",
    isRead: true,
  },
];

export function setMockNotifications(notifications) {
  mockNotifications = notifications;
}
