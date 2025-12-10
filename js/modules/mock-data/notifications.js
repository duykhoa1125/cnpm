/**
 * Mock Notifications Data
 * Contains notification messages for the system
 */

export let mockNotifications = [
  {
    id: 1,
    type: "schedule",
    title: "Thay đổi link Zoom buổi học Giải tích 1",
    message: "Lớp L01 sẽ sử dụng link Zoom mới vào buổi học sáng mai.",
    time: "2 phút trước",
    isRead: false,
  },
  {
    id: 2,
    type: "cancel",
    title: "Tạm hoãn buổi học CTDL & Giải thuật",
    message: "Tutor bận đột xuất, buổi học ngày 12/12 sẽ được dời sang 14/12.",
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
    message: "Hệ thống sẽ bảo trì từ 00:00 đến 02:00 ngày 15/12.",
    time: "1 ngày trước",
    isRead: true,
  },
  {
    id: 5,
    type: "deadline",
    title: "Sắp đến hạn Quiz Chương 5",
    message: "Quiz Giải tích 1 - Chương 5 còn 2 ngày nữa là hết hạn.",
    time: "2 ngày trước",
    isRead: true,
  },
  {
    id: 6,
    type: "grade",
    title: "Đã có kết quả Quiz",
    message: "Quiz CTDL & Giải thuật - Chương 3 đã được chấm điểm: 8.5/10.",
    time: "3 ngày trước",
    isRead: true,
  },
];

export function setMockNotifications(notifications) {
  mockNotifications = notifications;
}
