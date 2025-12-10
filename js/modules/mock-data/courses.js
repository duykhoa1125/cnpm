/**
 * Mock Course Data
 * Contains tutor classes and detailed course information
 */

// Mock Tutor Classes Data
export const mockTutorClasses = [
  {
    id: "CO1023",
    name: "Giải tích 1",
    group: "L01",
    room: "Zoom Meeting",
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
    room: "Google Meet",
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
    room: "Zoom Meeting",
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

// Mock Student Courses (Registered)
export const mockStudentCourses = [
  {
    id: "CO1023",
    name: "Giải tích 1",
    tutor: "Trần Văn B",
    deadline: "30/11/2025",
    progress: 80,
    week: 12,
    totalWeeks: 15,
    icon: "fa-calculator",
    color: "blue",
  },
  {
    id: "CO3005",
    name: "Lập trình Web",
    tutor: "Nguyễn Văn A",
    deadline: "15/10/2025",
    progress: 33,
    week: 5,
    totalWeeks: 15,
    icon: "fa-code",
    color: "purple",
  },
  {
    id: "CO2003",
    name: "Cấu trúc dữ liệu",
    tutor: "Lê Thị C",
    deadline: "20/09/2025",
    progress: 6,
    week: 1,
    totalWeeks: 15,
    icon: "fa-layer-group",
    color: "orange",
  },
];

// Mock Course Details
export const mockCourseDetails = {
  "Giải tích 1": {
    tutor: "Trần Văn B",
    schedule: "Thứ 2 (07:00 - 10:00)",
    room: "Zoom Meeting",
    group: "L01",
    announcements: [
      {
        id: 1,
        title: "Chào mừng các em đến với môn học",
        content:
          "Xin chào các em! Thầy sẽ hỗ trợ các em ôn tập kiến thức thông qua các bài quiz nội bộ. Hãy cố gắng hoàn thành đầy đủ nhé!",
        date: "2025-10-15",
        author: "Trần Văn B",
        type: "important",
      },
      {
        id: 2,
        title: "Buổi học bổ sung ngày 22/11",
        content:
          "Lớp sẽ có buổi học bổ sung vào sáng thứ 7 tuần sau để ôn tập thêm.",
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
        room: "Zoom Meeting",
        note: "",
      },
      {
        week: 2,
        content: "Chương 1: Giới hạn và Liên tục",
        time: "07:00 - 10:00",
        room: "Zoom Meeting",
        note: "",
      },
      {
        week: 3,
        content: "Chương 2: Đạo hàm và Vi phân",
        time: "07:00 - 10:00",
        room: "Zoom Meeting",
        note: "Quiz nhỏ",
      },
      {
        week: 4,
        content: "Chương 2: Ứng dụng của Đạo hàm",
        time: "07:00 - 10:00",
        room: "Zoom Meeting",
        note: "",
      },
      {
        week: 5,
        content: "Chương 3: Tích phân bất định",
        time: "07:00 - 10:00",
        room: "Zoom Meeting",
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
        description:
          "Áp dụng các kiến thức về đạo hàm để giải quyết bài toán tối ưu hóa trong thực tế. Yêu cầu trình bày rõ ràng, chi tiết.",
        files: [
          { name: "De_bai_BTL1.pdf", size: "1.2 MB" },
          { name: "Mau_bao_cao.docx", size: "500 KB" },
        ],
      },
      {
        id: 2,
        title: "Bài tập lớn số 2: Tích phân",
        deadline: "2025-12-15",
        status: "pending",
        score: null,
        description:
          "Tính diện tích hình phẳng và thể tích vật thể tròn xoay sử dụng tích phân xác định.",
        files: [{ name: "De_bai_BTL2.pdf", size: "1.0 MB" }],
      },
    ],
    quizzes: [
      {
        id: 1,
        title: "Quiz: Giới hạn và Liên tục",
        deadline: "2025-09-20",
        status: "completed",
        score: 9.0,
        description:
          "Kiểm tra kiến thức về giới hạn và hàm số liên tục. Thời gian làm bài: 15 phút.",
        files: [],
      },
      {
        id: 2,
        title: "Quiz: Đạo hàm và Vi phân",
        deadline: "2025-10-10",
        status: "completed",
        score: 7.5,
        description:
          "Kiểm tra kiến thức về đạo hàm và vi phân. Thời gian làm bài: 20 phút.",
        files: [],
      },
      {
        id: 3,
        title: "Quiz: Tích phân cơ bản",
        deadline: "2025-10-25",
        status: "pending",
        score: null,
        description:
          "Quiz ôn tập kiến thức tích phân cơ bản. Thời gian làm bài: 25 phút.",
        files: [],
      },
      {
        id: 4,
        title: "Quiz: Ứng dụng Đạo hàm",
        deadline: "2025-11-05",
        status: "pending",
        score: null,
        description:
          "Kiểm tra ứng dụng đạo hàm trong bài toán cực trị. Thời gian: 30 phút.",
        files: [],
      },
    ],
    forum: [
      {
        id: 1,
        title: "Hỏi về bài tập chương 2",
        author: "Nguyễn Văn A",
        replies: 2,
        last_post: "2025-10-05",
        content:
          "Chào thầy và các bạn, cho em hỏi bài tập 2.5 trong sách giáo trình làm như thế nào ạ? Em bị vướng ở bước biến đổi đạo hàm.",
        repliesList: [
          {
            author: "Trần Văn B (GV)",
            content: "Em xem lại công thức đạo hàm hợp nhé. U' = u'.v + v'.u",
            date: "2025-10-05 08:30",
          },
          {
            author: "Lê Thị C",
            content: "Mình cũng bị vướng bài này, cảm ơn thầy ạ.",
            date: "2025-10-05 09:15",
          },
        ],
      },
      {
        id: 2,
        title: "Xin tài liệu tham khảo thêm",
        author: "Lê Thị C",
        replies: 1,
        last_post: "2025-10-12",
        content:
          "Thầy ơi, thầy có thể chia sẻ thêm một số tài liệu về phần Tích phân không ạ? Em muốn luyện tập thêm.",
        repliesList: [
          {
            author: "Trần Văn B (GV)",
            content:
              "Thầy đã upload thêm file bài tập nâng cao trong mục Tài liệu nhé.",
            date: "2025-10-12 14:00",
          },
        ],
      },
    ],
    exams: [],
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
      { item: "Quiz: Giới hạn và Liên tục", weight: "25%", score: 9.0 },
      { item: "Quiz: Đạo hàm và Vi phân", weight: "25%", score: 7.5 },
      { item: "Quiz: Tích phân cơ bản", weight: "25%", score: null },
      { item: "Quiz: Ứng dụng Đạo hàm", weight: "25%", score: null },
    ],
  },
  "Lập trình Web": {
    tutor: "Nguyễn Văn A",
    schedule: "Thứ 4 (13:00 - 16:00)",
    room: "Zoom Meeting",
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
        room: "Zoom Meeting",
        note: "",
      },
      {
        week: 2,
        content: "CSS & Layout",
        time: "13:00 - 16:00",
        room: "Zoom Meeting",
        note: "",
      },
      {
        week: 3,
        content: "JavaScript cơ bản",
        time: "13:00 - 16:00",
        room: "Zoom Meeting",
        note: "",
      },
      {
        week: 4,
        content: "DOM & Events",
        time: "13:00 - 16:00",
        room: "Zoom Meeting",
        note: "",
      },
    ],
    assignments: [],
    quizzes: [
      {
        id: 1,
        title: "Quiz: HTML & CSS cơ bản",
        deadline: "2025-09-25",
        status: "completed",
        score: 10.0,
        description: "Kiểm tra kiến thức HTML5 và CSS3. Thời gian: 20 phút.",
      },
      {
        id: 2,
        title: "Quiz: JavaScript Fundamentals",
        deadline: "2025-10-15",
        status: "pending",
        score: null,
        description: "Kiểm tra kiến thức JavaScript cơ bản. Thời gian: 30 phút.",
      },
    ],
    forum: [],
    exams: [],
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
      { item: "Quiz: HTML & CSS cơ bản", weight: "50%", score: 10.0 },
      { item: "Quiz: JavaScript Fundamentals", weight: "50%", score: null },
    ],
  },
  "Cấu trúc dữ liệu": {
    tutor: "Lê Thị C",
    schedule: "Thứ 6 (07:00 - 10:00)",
    room: "Google Meet",
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
