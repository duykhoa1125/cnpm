/**
 * Configuration and Mock Data Module
 * Contains all global state and mock data for the application
 */

// Global State
export let currentUserRole = "student";
export let trafficChart = null;
export let userChart = null;
export let tutorStudentChart = null;
export let tutorProgressChart = null;
export let adminDeptChart = null;
export let adminGradeChart = null;
export let adminChartInited = false;
export let tutorChartInited = false;

// State Setters
export function setCurrentUserRole(role) {
  currentUserRole = role;
}
export function setTrafficChart(chart) {
  trafficChart = chart;
}
export function setUserChart(chart) {
  userChart = chart;
}
export function setTutorStudentChart(chart) {
  tutorStudentChart = chart;
}
export function setTutorProgressChart(chart) {
  tutorProgressChart = chart;
}
export function setAdminDeptChart(chart) {
  adminDeptChart = chart;
}
export function setAdminGradeChart(chart) {
  adminGradeChart = chart;
}
export function setAdminChartInited(value) {
  adminChartInited = value;
}
export function setTutorChartInited(value) {
  tutorChartInited = value;
}

// Mock Feedback Data
export const mockFeedbacks = [
  {
    id: 1,
    tutor: "Nguyễn Văn A",
    student: "Trần Thị B",
    course: "Lập trình Web",
    rating: 5,
    comment: "Thầy dạy rất hay, dễ hiểu.",
    date: "2025-10-20",
  },
  {
    id: 2,
    tutor: "Nguyễn Văn A",
    student: "Lê Văn C",
    course: "Cấu trúc dữ liệu",
    rating: 4,
    comment: "Bài tập hơi khó nhưng thầy hỗ trợ nhiệt tình.",
    date: "2025-10-21",
  },
  {
    id: 3,
    tutor: "Trần Thị D",
    student: "Phạm Văn E",
    course: "Giải tích 1",
    rating: 3,
    comment: "Giảng hơi nhanh.",
    date: "2025-10-22",
  },
  {
    id: 4,
    tutor: "Nguyễn Văn A",
    student: "Hoàng Thị F",
    course: "Lập trình Web",
    rating: 5,
    comment: "Tuyệt vời!",
    date: "2025-10-23",
  },
  {
    id: 5,
    tutor: "Lê Văn G",
    student: "Ngô Văn H",
    course: "Vật lý đại cương",
    rating: 2,
    comment: "Ít bài tập thực hành.",
    date: "2025-10-24",
  },
  {
    id: 6,
    tutor: "Nguyễn Văn A",
    student: "Vũ Thị I",
    course: "Lập trình Web",
    rating: 5,
    comment: "Rất tâm huyết.",
    date: "2025-10-25",
  },
  {
    id: 7,
    tutor: "Trần Thị D",
    student: "Đinh Văn K",
    course: "Giải tích 1",
    rating: 4,
    comment: "Cô giảng chi tiết.",
    date: "2025-10-26",
  },
  {
    id: 8,
    tutor: "Lê Văn G",
    student: "Mai Thị L",
    course: "Vật lý đại cương",
    rating: 1,
    comment: "Không hiểu gì cả.",
    date: "2025-10-27",
  },
  {
    id: 9,
    tutor: "Nguyễn Văn A",
    student: "Bùi Văn M",
    course: "Cấu trúc dữ liệu",
    rating: 3,
    comment: "Bình thường.",
    date: "2025-10-28",
  },
  {
    id: 10,
    tutor: "Trần Thị D",
    student: "Đỗ Thị N",
    course: "Đại số tuyến tính",
    rating: 5,
    comment: "Cô dạy rất hay.",
    date: "2025-10-29",
  },
];

// Mock Library Data
export const mockMaterials = [
  {
    id: 1,
    title: "Giáo trình Lập trình Web (Full)",
    course: "Lập trình Web",
    type: "PDF",
    author: "Khoa KH&KT MT",
    size: "15 MB",
    date: "2025-09-01",
    downloads: 1200,
  },
  {
    id: 2,
    title: "Slide Bài giảng Chương 1-5",
    course: "Lập trình Web",
    type: "Slide",
    author: "TS. Nguyễn Văn A",
    size: "45 MB",
    date: "2025-09-05",
    downloads: 850,
  },
  {
    id: 3,
    title: "Đề thi Giữa kỳ HK251",
    course: "Cấu trúc dữ liệu",
    type: "Exam",
    author: "Phòng Đào tạo",
    size: "2 MB",
    date: "2025-10-15",
    downloads: 3400,
  },
  {
    id: 4,
    title: "Video Record: Seminar AI 2025",
    course: "Trí tuệ nhân tạo",
    type: "Video",
    author: "CLB AI",
    size: "1.2 GB",
    date: "2025-08-20",
    downloads: 500,
  },
  {
    id: 5,
    title: "Bài tập lớn: Quản lý thư viện",
    course: "Cơ sở dữ liệu",
    type: "PDF",
    author: "Nhóm SV 1",
    size: "5 MB",
    date: "2025-11-01",
    downloads: 230,
  },
  {
    id: 6,
    title: "Slide Ôn tập Cuối kỳ",
    course: "Giải tích 1",
    type: "Slide",
    author: "ThS. Trần Thị D",
    size: "12 MB",
    date: "2025-12-10",
    downloads: 1500,
  },
  {
    id: 7,
    title: "Ebook: Clean Code",
    course: "Công nghệ phần mềm",
    type: "PDF",
    author: "Robert C. Martin",
    size: "8 MB",
    date: "2025-01-15",
    downloads: 4500,
  },
  {
    id: 8,
    title: "Đề thi Cuối kỳ HK242",
    course: "Vật lý đại cương",
    type: "Exam",
    author: "Bộ môn Vật lý",
    size: "1.5 MB",
    date: "2025-06-20",
    downloads: 900,
  },
  {
    id: 9,
    title: "Hướng dẫn cài đặt Environment",
    course: "Hệ điều hành",
    type: "PDF",
    author: "Lab Center",
    size: "3 MB",
    date: "2025-09-10",
    downloads: 600,
  },
];

// Mock Progress Data
export const mockStudentProgress = [
  {
    id: "1910123",
    name: "Nguyễn Văn An",
    course: "Lập trình Web",
    midterm: 8.5,
    final: 9.0,
    attendance: 100,
  },
  {
    id: "1910124",
    name: "Trần Thị Bích",
    course: "Lập trình Web",
    midterm: 6.0,
    final: 7.5,
    attendance: 90,
  },
  {
    id: "1910125",
    name: "Lê Văn Cường",
    course: "Lập trình Web",
    midterm: 3.0,
    final: 4.0,
    attendance: 50,
  },
  {
    id: "1910126",
    name: "Phạm Thị Dung",
    course: "Lập trình Web",
    midterm: 9.5,
    final: 9.5,
    attendance: 100,
  },
  {
    id: "1910127",
    name: "Hoàng Văn Em",
    course: "Lập trình Web",
    midterm: 7.0,
    final: 6.5,
    attendance: 85,
  },
  {
    id: "1910201",
    name: "Ngô Văn Phát",
    course: "Cấu trúc dữ liệu",
    midterm: 5.0,
    final: 5.5,
    attendance: 80,
  },
  {
    id: "1910202",
    name: "Vũ Thị Giàu",
    course: "Cấu trúc dữ liệu",
    midterm: 9.0,
    final: 8.0,
    attendance: 95,
  },
  {
    id: "1910203",
    name: "Đinh Văn Hùng",
    course: "Cấu trúc dữ liệu",
    midterm: 2.0,
    final: 3.0,
    attendance: 40,
  },
  {
    id: "1910301",
    name: "Mai Thị Lan",
    course: "Giải tích 1",
    midterm: 8.0,
    final: 8.5,
    attendance: 100,
  },
  {
    id: "1910302",
    name: "Bùi Văn Kiên",
    course: "Giải tích 1",
    midterm: 4.5,
    final: 5.0,
    attendance: 70,
  },
];

// Mock Tutor Classes Data
export const mockTutorClasses = [
  {
    id: "CO1023",
    name: "Giải tích 1",
    group: "L01",
    room: "H6-302",
    schedule: "Thứ 2 (07:00 - 10:00)",
    status: "ONGOING",
    studentsCount: 45,
    studentsPresent: 43,
    materials: [
      {
        id: 1,
        name: "De_cuong_mon_hoc.pdf",
        size: "1.5 MB",
        type: "pdf",
        date: "2025-09-05",
      },
      {
        id: 2,
        name: "Bai_giang_Chuong_1.pptx",
        size: "5.2 MB",
        type: "ppt",
        date: "2025-09-10",
      },
    ],
    students: Array.from({ length: 45 }, (_, i) => {
      const mid = 5 + Math.random() * 5;
      const fin = 5 + Math.random() * 5;
      return {
        id: 2010000 + i + 1,
        name: `Sinh viên ${String.fromCharCode(65 + (i % 26))} ${i + 1}`,
        attendance: 80 + Math.floor(Math.random() * 20),
        progress: 70 + Math.floor(Math.random() * 30),
        midterm: mid.toFixed(1),
        final: fin.toFixed(1),
        average: (mid * 0.3 + fin * 0.7).toFixed(1),
        status: Math.random() > 0.9 ? "warning" : "active",
      };
    }),
  },
  {
    id: "CO2013",
    name: "Cấu trúc dữ liệu & Giải thuật",
    group: "L02",
    room: "H6-405",
    schedule: "Thứ 4 (13:00 - 16:00)",
    status: "ONGOING",
    studentsCount: 60,
    studentsPresent: 55,
    materials: [
      {
        id: 1,
        name: "Assignment_1.pdf",
        size: "500 KB",
        type: "pdf",
        date: "2025-10-01",
      },
    ],
    students: Array.from({ length: 60 }, (_, i) => {
      const mid = 4 + Math.random() * 6;
      return {
        id: 2020000 + i + 1,
        name: `Sinh viên ${String.fromCharCode(65 + (i % 26))} ${i + 1}`,
        attendance: 70 + Math.floor(Math.random() * 30),
        progress: 40 + Math.floor(Math.random() * 40),
        midterm: mid.toFixed(1),
        final: "--",
        average: "--",
        status: "active",
      };
    }),
  },
  {
    id: "CO3005",
    name: "Ngôn ngữ lập trình",
    group: "L05",
    room: "B1-205",
    schedule: "Thứ 6 (07:00 - 10:00)",
    status: "FINISHED",
    studentsCount: 40,
    studentsPresent: 40,
    materials: [],
    students: Array.from({ length: 40 }, (_, i) => {
      const mid = 8 + Math.random() * 2;
      const fin = 8 + Math.random() * 2;
      return {
        id: 2030000 + i + 1,
        name: `Sinh viên ${String.fromCharCode(65 + (i % 26))} ${i + 1}`,
        attendance: 100,
        progress: 100,
        midterm: mid.toFixed(1),
        final: fin.toFixed(1),
        average: (mid * 0.3 + fin * 0.7).toFixed(1),
        status: "active",
      };
    }),
  },
];

// Mock Notifications
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

// Mock Users Data (Admin)
export let mockUsers = [
  {
    id: "1910001",
    name: "Nguyễn Văn A",
    role: "student",
    email: "a.nguyen@hcmut.edu.vn",
    status: "active",
  },
  {
    id: "T001",
    name: "Trần Văn B",
    role: "tutor",
    email: "b.tran@hcmut.edu.vn",
    status: "active",
  },
  {
    id: "1910002",
    name: "Lê Thị C",
    role: "student",
    email: "c.le@hcmut.edu.vn",
    status: "blocked",
  },
  {
    id: "A001",
    name: "Admin User",
    role: "admin",
    email: "admin@hcmut.edu.vn",
    status: "active",
  },
];

export function setMockUsers(users) {
  mockUsers = users;
}

// System Logs Data
export let systemLogs = [
  {
    ts: "2025-11-20 10:10:12",
    level: "INFO",
    actor: "System",
    action: "Service started",
    details: "All services running",
  },
  {
    ts: "2025-11-20 10:12:05",
    level: "WARN",
    actor: "SyncJob",
    action: "DataCore latency",
    details: "Response 1200ms",
  },
  {
    ts: "2025-11-20 10:45:00",
    level: "INFO",
    actor: "Admin",
    action: "Manual sync",
    details: "Sync completed",
  },
  {
    ts: "2025-11-21 09:20:33",
    level: "ERROR",
    actor: "HCMUT_Library",
    action: "Fetch failed",
    details: "Timeout",
  },
  {
    ts: "2025-11-22 14:02:10",
    level: "INFO",
    actor: "AutoBackup",
    action: "Backup completed",
    details: "Size: 12MB",
  },
  {
    ts: "2025-11-28 08:00:00",
    level: "INFO",
    actor: "AuthService",
    action: "User logged in",
    details: "User 'nguyenvan.a' authenticated",
  },
];

export function setSystemLogs(logs) {
  systemLogs = logs;
}

export function addSystemLog(log) {
  systemLogs.unshift(log);
  if (systemLogs.length > 50) systemLogs.pop();
}

// Bonus Session Data
export let bonusSessions = [
  {
    id: "S1",
    title: "Ôn tập Giải tích 1",
    course: "CO1023",
    date: "2025-11-28",
    start: "14:00",
    duration: 60,
    mode: "ONLINE",
    location: "Zoom Meeting",
    tutor: "Nguyen Van B",
    status: "ACTIVE",
    count: 5,
    max: 30,
    scope: "CLASS",
  },
];

export function setBonusSessions(sessions) {
  bonusSessions = sessions;
}

export function addBonusSession(session) {
  bonusSessions.push(session);
}

export let bonusRsvps = [
  {
    id: "R1",
    sessionId: "S1",
    studentId: "sv001",
    name: "Nguyen Van A",
    status: "ACCEPTED",
  },
];

export function setBonusRsvps(rsvps) {
  bonusRsvps = rsvps;
}

// Cancellation Rules Data
export let mockCancellationRules = [
  {
    id: 1,
    condition: "Hủy trước khi bắt đầu học kỳ",
    consequence: "Không ghi nhận vào bảng điểm",
    refund: 100,
    violationLevel: "None",
  },
  {
    id: 2,
    condition: "Hủy trong 2 tuần đầu học kỳ",
    consequence: "Ghi nhận điểm W (Rút môn học)",
    refund: 70,
    violationLevel: "None",
  },
  {
    id: 3,
    condition: "Hủy sau 2 tuần đầu nhưng trước thi giữa kỳ",
    consequence: "Ghi nhận điểm W, tính vào số tín chỉ rút",
    refund: 0,
    violationLevel: "Warning",
  },
  {
    id: 4,
    condition: "Hủy sau khi thi giữa kỳ",
    consequence: "Ghi nhận điểm F (Rớt môn)",
    refund: 0,
    violationLevel: "Serious",
  },
];

export function setMockCancellationRules(rules) {
  mockCancellationRules = rules;
}

// Role-based Menu Configuration
export const roleMenus = {
  student: [
    { id: "dashboard_student", icon: "fa-chart-pie", text: "Tổng quan" },
    { id: "courses_student", icon: "fa-book-open", text: "Môn học" },
    { id: "library_view", icon: "fa-book-bookmark", text: "Thư viện số" },
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
    { id: "progress_admin", icon: "fa-chart-pie", text: "Tiến độ Khoa" },
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
  feedback_student: [
    { label: "Trang chủ", icon: "fa-home" },
    { label: "Gửi Đánh giá", icon: "fa-comment-dots" },
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

// Mock Course Details
export const mockCourseDetails = {
  "Giải tích 1": {
    tutor: "Trần Văn B",
    schedule: "Thứ 2 (07:00 - 10:00)",
    room: "H6-302",
    group: "L01",
    announcements: [
      {
        id: 1,
        title: "Thông báo về lịch thi giữa kỳ",
        content:
          "Các em chú ý lịch thi giữa kỳ sẽ diễn ra vào tuần 8. Nội dung bao gồm chương 1 đến chương 3.",
        date: "2025-10-15",
        author: "Trần Văn B",
        type: "important",
      },
      {
        id: 2,
        title: "Nghỉ học bù ngày 20/11",
        content:
          "Lớp sẽ nghỉ học vào ngày 20/11 và học bù vào sáng thứ 7 tuần sau.",
        date: "2025-11-10",
        author: "Trần Văn B",
        type: "normal",
      },
    ],
    scheduleList: [
      {
        week: 1,
        content: "Giới thiệu môn học & Chương 1: Hàm số",
        time: "07:00 - 10:00",
        room: "H6-302",
        note: "",
      },
      {
        week: 2,
        content: "Chương 1: Giới hạn và Liên tục",
        time: "07:00 - 10:00",
        room: "H6-302",
        note: "",
      },
      {
        week: 3,
        content: "Chương 2: Đạo hàm và Vi phân",
        time: "07:00 - 10:00",
        room: "H6-302",
        note: "Quiz nhỏ",
      },
      {
        week: 4,
        content: "Chương 2: Ứng dụng của Đạo hàm",
        time: "07:00 - 10:00",
        room: "H6-302",
        note: "",
      },
      {
        week: 5,
        content: "Chương 3: Tích phân bất định",
        time: "07:00 - 10:00",
        room: "H6-302",
        note: "",
      },
    ],
    assignments: [
      {
        id: 1,
        title: "Bài tập lớn số 1: Ứng dụng đạo hàm",
        deadline: "2025-10-30",
        status: "submitted",
        score: 8.5,
      },
      {
        id: 2,
        title: "Bài tập lớn số 2: Tích phân",
        deadline: "2025-12-15",
        status: "pending",
        score: null,
      },
    ],
    quizzes: [
      {
        id: 1,
        title: "Quiz 1: Chương 1",
        deadline: "2025-09-20",
        status: "completed",
        score: 9.0,
      },
      {
        id: 2,
        title: "Quiz 2: Chương 2",
        deadline: "2025-10-10",
        status: "completed",
        score: 7.5,
      },
      {
        id: 3,
        title: "Kiểm tra giữa kỳ",
        deadline: "2025-10-25",
        status: "completed",
        score: 8.0,
      },
    ],
    forum: [
      {
        id: 1,
        title: "Hỏi về bài tập chương 2",
        author: "Nguyễn Văn A",
        replies: 5,
        last_post: "2025-10-05",
      },
      {
        id: 2,
        title: "Xin tài liệu tham khảo thêm",
        author: "Lê Thị C",
        replies: 2,
        last_post: "2025-10-12",
      },
    ],
    exams: [
      {
        name: "Thi Giữa Kỳ",
        date: "2025-10-25",
        time: "07:00",
        room: "H6-302",
        type: "Tự luận",
      },
      {
        name: "Thi Cuối Kỳ",
        date: "2025-12-25",
        time: "07:00",
        room: "A4-401",
        type: "Tự luận",
      },
    ],
    materials: [
      {
        id: 1,
        title: "Slide bài giảng Chương 1",
        type: "pdf",
        size: "2.5 MB",
        date: "2025-09-05",
      },
      {
        id: 2,
        title: "Bài tập tự luyện tuần 1-5",
        type: "doc",
        size: "1.2 MB",
        date: "2025-09-10",
      },
      {
        id: 3,
        title: "Đề thi mẫu giữa kỳ",
        type: "pdf",
        size: "3.0 MB",
        date: "2025-10-01",
      },
    ],
    grades: [
      { item: "Quiz 1", weight: "10%", score: 9.0 },
      { item: "Quiz 2", weight: "10%", score: 7.5 },
      { item: "Bài tập lớn 1", weight: "20%", score: 8.5 },
      { item: "Giữa kỳ", weight: "30%", score: 8.0 },
      { item: "Cuối kỳ", weight: "30%", score: null },
    ],
  },
  "Lập trình Web": {
    tutor: "Nguyễn Văn A",
    schedule: "Thứ 4 (13:00 - 16:00)",
    room: "B1-205",
    group: "L02",
    announcements: [
      {
        id: 1,
        title: "Cài đặt môi trường thực hành",
        content:
          "Các em cài đặt VS Code và Node.js phiên bản mới nhất để chuẩn bị cho buổi thực hành đầu tiên.",
        date: "2025-09-01",
        author: "Nguyễn Văn A",
        type: "normal",
      },
    ],
    scheduleList: [
      {
        week: 1,
        content: "Tổng quan về Web & HTML",
        time: "13:00 - 16:00",
        room: "B1-205",
        note: "",
      },
      {
        week: 2,
        content: "CSS & Layout",
        time: "13:00 - 16:00",
        room: "B1-205",
        note: "",
      },
      {
        week: 3,
        content: "JavaScript cơ bản",
        time: "13:00 - 16:00",
        room: "B1-205",
        note: "",
      },
      {
        week: 4,
        content: "DOM & Events",
        time: "13:00 - 16:00",
        room: "B1-205",
        note: "",
      },
    ],
    assignments: [
      {
        id: 1,
        title: "Thiết kế Landing Page",
        deadline: "2025-10-15",
        status: "submitted",
        score: 9.5,
      },
    ],
    quizzes: [
      {
        id: 1,
        title: "HTML/CSS Quiz",
        deadline: "2025-09-25",
        status: "completed",
        score: 10.0,
      },
    ],
    forum: [],
    exams: [
      {
        name: "Thi Cuối Kỳ",
        date: "2025-12-20",
        time: "13:00",
        room: "Phòng máy 1",
        type: "Thực hành",
      },
    ],
    materials: [
      {
        id: 1,
        title: "Slide HTML5 & CSS3",
        type: "ppt",
        size: "15 MB",
        date: "2025-09-01",
      },
      {
        id: 2,
        title: "Source code demo tuần 2",
        type: "zip",
        size: "500 KB",
        date: "2025-09-15",
      },
    ],
    grades: [
      { item: "Quiz HTML/CSS", weight: "20%", score: 10.0 },
      { item: "BTL Landing Page", weight: "30%", score: 9.5 },
      { item: "Cuối kỳ", weight: "50%", score: null },
    ],
  },
  "Cấu trúc dữ liệu": {
    tutor: "Lê Thị C",
    schedule: "Thứ 6 (07:00 - 10:00)",
    room: "H6-401",
    group: "L03",
    announcements: [],
    scheduleList: [],
    assignments: [],
    quizzes: [],
    forum: [],
    exams: [],
    materials: [],
    grades: [],
  },
};
