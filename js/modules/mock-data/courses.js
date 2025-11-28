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
        title: "Quiz 1: Chương 1",
        deadline: "2025-09-20",
        status: "completed",
        score: 9.0,
        description:
          "Kiểm tra kiến thức về giới hạn và hàm số liên tục. Thời gian làm bài: 15 phút.",
        files: [],
      },
      {
        id: 2,
        title: "Quiz 2: Chương 2",
        deadline: "2025-10-10",
        status: "completed",
        score: 7.5,
        description:
          "Kiểm tra kiến thức về đạo hàm và vi phân. Thời gian làm bài: 20 phút.",
        files: [],
      },
      {
        id: 3,
        title: "Kiểm tra giữa kỳ",
        deadline: "2025-10-25",
        status: "completed",
        score: 8.0,
        description:
          "Nội dung bao gồm chương 1, 2 và 3. Hình thức: Tự luận + Trắc nghiệm.",
        files: [{ name: "De_cuong_on_tap_GK.pdf", size: "2.5 MB" }],
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
