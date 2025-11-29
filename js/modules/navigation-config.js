/**
 * Navigation Configuration Module
 * Contains role-based menu definitions and breadcrumb mappings
 */

// Role-based Menu Configuration
export const roleMenus = {
  student: [
    { id: "dashboard_student", icon: "fa-chart-pie", text: "Tổng quan" },
    { id: "courses_student", icon: "fa-book-open", text: "Môn học" },
    { id: "ai_tutor_matching", icon: "fa-robot", text: "AI Tutor Matching" },
    { id: "library_view", icon: "fa-book-bookmark", text: "Thư viện số" },
    { id: "progress_student", icon: "fa-chart-line", text: "Tiến độ học tập" },
    { id: "utilities_student", icon: "fa-toolbox", text: "Tiện ích" },
    { id: "feedback_student", icon: "fa-comment-dots", text: "Đánh giá" },
    { id: "profile_student", icon: "fa-user", text: "Hồ sơ" },
  ],
  tutor: [
    { id: "dashboard_tutor", icon: "fa-chart-line", text: "Dashboard Tutor" },
    {
      id: "tutor_schedule",
      icon: "fa-calendar-days",
      text: "Lịch dạy & Đăng ký",
    },
    { id: "courses_tutor", icon: "fa-chalkboard-user", text: "Lớp dạy" },
    { id: "library_view", icon: "fa-book-bookmark", text: "Thư viện số" },
    { id: "feedback_view_tutor", icon: "fa-comments", text: "Xem Phản hồi" },
    { id: "profile_tutor", icon: "fa-user-tie", text: "Hồ sơ Tutor" },
  ],
  department: [
    { id: "dashboard_department", icon: "fa-building", text: "Tổng quan Khoa" },
    { id: "feedback_view_admin", icon: "fa-comments", text: "Phản hồi Khoa" },
    { id: "progress_department", icon: "fa-chart-pie", text: "Tiến độ Khoa" },
  ],
  academic: [
    { id: "dashboard_academic", icon: "fa-school", text: "Tổng quan Đào tạo" },
    {
      id: "course_cancellation_rules",
      icon: "fa-ban",
      text: "Quy tắc Hủy khóa học",
    },
    {
      id: "progress_admin",
      icon: "fa-chart-column",
      text: "Báo cáo Chất lượng",
    },
    { id: "feedback_view_admin", icon: "fa-star", text: "Quản lý Đánh giá" },
    { id: "library_view", icon: "fa-book", text: "Kho Tài liệu" },
  ],
  admin: [
    { id: "dashboard_admin", icon: "fa-gauge-high", text: "Dashboard" },
    { id: "progress_admin", icon: "fa-ranking-star", text: "Báo cáo Đào tạo" },
    {
      id: "feedback_view_admin",
      icon: "fa-star-half-stroke",
      text: "Quản lý Đánh giá",
    },
    { id: "system_admin", icon: "fa-gears", text: "Hệ thống & Logs" },
  ],
};

// Breadcrumb Configuration
export const breadcrumbMap = {
  dashboard_student: [{ label: "Trang chủ", icon: "fa-home" }],
  courses_student: [
    { label: "Trang chủ", icon: "fa-home" },
    { label: "Môn học của tôi", icon: "fa-book-open" },
  ],
  student_register: [
    { label: "Trang chủ", icon: "fa-home" },
    { label: "Đăng ký môn mới", icon: "fa-plus" },
  ],
  library_view: [
    { label: "Trang chủ", icon: "fa-home" },
    { label: "Thư viện số", icon: "fa-book-bookmark" },
  ],
  progress_student: [
    { label: "Trang chủ", icon: "fa-home" },
    { label: "Tiến độ học tập", icon: "fa-chart-line" },
  ],
  utilities_student: [
    { label: "Trang chủ", icon: "fa-home" },
    { label: "Tiện ích sinh viên", icon: "fa-toolbox" },
  ],
  progress_department: [
    { label: "Trang chủ", icon: "fa-home" },
    { label: "Tiến độ Khoa", icon: "fa-chart-pie" },
  ],
  ai_tutor_matching: [
    { label: "Trang chủ", icon: "fa-home" },
    { label: "AI Tutor Matching", icon: "fa-robot" },
  ],
  feedback_student: [
    { label: "Trang chủ", icon: "fa-home" },
    { label: "Gửi Đánh giá", icon: "fa-comment-dots" },
  ],
  feedback_department: [
    { label: "Trang chủ", icon: "fa-home" },
    { label: "Phản hồi Khoa", icon: "fa-comments" },
  ],
  profile_student: [
    { label: "Trang chủ", icon: "fa-home" },
    { label: "Hồ sơ cá nhân", icon: "fa-user" },
  ],
  dashboard_tutor: [
    { label: "Trang chủ", icon: "fa-home" },
    { label: "Dashboard Tutor", icon: "fa-chart-line" },
  ],
  tutor_schedule: [
    { label: "Trang chủ", icon: "fa-home" },
    { label: "Lịch dạy & Đăng ký", icon: "fa-calendar-days" },
  ],
  courses_tutor: [
    { label: "Trang chủ", icon: "fa-home" },
    { label: "Lớp dạy", icon: "fa-chalkboard-user" },
  ],
  feedback_view_tutor: [
    { label: "Trang chủ", icon: "fa-home" },
    { label: "Xem Phản hồi", icon: "fa-comments" },
  ],
  profile_tutor: [
    { label: "Trang chủ", icon: "fa-home" },
    { label: "Hồ sơ Tutor", icon: "fa-user-tie" },
  ],
  dashboard_admin: [
    { label: "Trang chủ", icon: "fa-home" },
    { label: "Dashboard Admin", icon: "fa-gauge-high" },
  ],
  progress_admin: [
    { label: "Trang chủ", icon: "fa-home" },
    { label: "Báo cáo Đào tạo", icon: "fa-ranking-star" },
  ],
  feedback_view_admin: [
    { label: "Trang chủ", icon: "fa-home" },
    { label: "Quản lý Đánh giá", icon: "fa-star-half-stroke" },
  ],
  system_admin: [
    { label: "Trang chủ", icon: "fa-home" },
    { label: "Hệ thống & Logs", icon: "fa-gears" },
  ],
  dashboard_department: [
    { label: "Trang chủ", icon: "fa-home" },
    { label: "Tổng quan Khoa", icon: "fa-building" },
  ],
  dashboard_academic: [
    { label: "Trang chủ", icon: "fa-home" },
    { label: "Tổng quan Đào tạo", icon: "fa-school" },
  ],
  course_cancellation_rules: [
    { label: "Trang chủ", icon: "fa-home" },
    { label: "Quy tắc Hủy khóa học", icon: "fa-ban" },
  ],
  courses_student_detail: [
    { label: "Trang chủ", icon: "fa-home", id: "dashboard_student" },
    { label: "Môn học của tôi", icon: "fa-book-open", id: "courses_student" },
    { label: "Chi tiết môn học", icon: "fa-chalkboard" },
  ],
  notifications_view: [
    { label: "Trang chủ", icon: "fa-home" },
    { label: "Thông báo", icon: "fa-bell" },
  ],
};
