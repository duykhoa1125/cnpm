let currentUserRole = "student";
let trafficChart = null;
let userChart = null;
let tutorStudentChart = null;
let adminChartInited = false;
let tutorChartInited = false;

// Mock Feedback Data
const mockFeedbacks = [
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
const mockMaterials = [
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
const mockStudentProgress = [
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

// Mock Notifications
let mockNotifications = [
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

let tutorProgressChart = null;
let adminDeptChart = null;
let adminGradeChart = null;

// Custom Dropdown Logic
function setupCustomSelect(selectId, icons = {}) {
  const select = document.getElementById(selectId);
  if (!select) return;

  // Check if already initialized
  if (select.parentNode.classList.contains("custom-select-wrapper")) return;

  const wrapper = document.createElement("div");
  wrapper.className = "custom-select-wrapper w-full relative"; // Added relative here just in case
  select.parentNode.insertBefore(wrapper, select);
  wrapper.appendChild(select);

  // Hide original select
  select.style.display = "none";

  // Hide original chevron sibling if it exists
  let nextSibling = wrapper.nextElementSibling;
  while (nextSibling) {
    if (
      nextSibling.tagName === "I" &&
      nextSibling.classList.contains("fa-chevron-down")
    ) {
      nextSibling.style.display = "none";
      break;
    }
    nextSibling = nextSibling.nextElementSibling;
  }

  // Create Trigger
  const trigger = document.createElement("div");
  
  // Determine style based on original select classes
  const isSmall = select.classList.contains("text-xs") || select.classList.contains("py-1");
  const padding = isSmall ? "p-2" : "p-4";
  const textSize = isSmall ? "text-xs" : "text-base";
  
  trigger.className =
    `custom-select-trigger w-full ${padding} bg-white/50 border border-white rounded-xl cursor-pointer flex justify-between items-center text-slate-700 font-bold shadow-sm hover:bg-white/80 transition-all ${textSize}`;

  // Get initial selected option
  const selectedOption =
    select.options[select.selectedIndex] || select.options[0];
  let initialIcon = "";
  if (selectedOption) {
    initialIcon = icons[selectedOption.value]
      ? `<i class="fa-solid ${
          icons[selectedOption.value]
        } mr-3 text-blue-600 text-lg"></i>`
      : "";
  }

  trigger.innerHTML = `
                <div class="flex items-center gap-2 truncate">${initialIcon}<span class="${textSize} truncate">${
    selectedOption ? selectedOption.text : ""
  }</span></div>
                <i class="fa-solid fa-chevron-down text-slate-400 transition-transform duration-300 text-[10px]"></i>
            `;
  wrapper.appendChild(trigger);

  // Create Options Container
  const optionsContainer = document.createElement("div");
  optionsContainer.className = "custom-select-options custom-scroll";

  Array.from(select.options).forEach((option) => {
    const optionDiv = document.createElement("div");
    optionDiv.className = `custom-option ${option.selected ? "selected" : ""} ${textSize}`;
    const icon = icons[option.value]
      ? `<i class="fa-solid ${
          icons[option.value]
        } text-lg w-6 text-center"></i>`
      : "";
    optionDiv.innerHTML = `${icon}<span class="flex-1 truncate">${option.text}</span>`;
    if (option.selected) optionDiv.classList.add("bg-blue-50", "text-blue-600");

    optionDiv.addEventListener("click", () => {
      select.value = option.value;
      select.dispatchEvent(new Event("change")); // Trigger change event

      // Update Trigger
      const newIcon = icons[option.value]
        ? `<i class="fa-solid ${
            icons[option.value]
          } mr-3 text-blue-600 text-lg"></i>`
        : "";
      trigger.innerHTML = `
                        <div class="flex items-center gap-2 truncate">${newIcon}<span class="${textSize} truncate">${option.text}</span></div>
                        <i class="fa-solid fa-chevron-down text-slate-400 transition-transform duration-300 text-[10px]"></i>
                    `;

      // Update Selected State
      wrapper.querySelectorAll(".custom-option").forEach((el) => {
        el.classList.remove("selected", "bg-blue-50", "text-blue-600");
      });
      optionDiv.classList.add("selected", "bg-blue-50", "text-blue-600");

      // Close Dropdown
      optionsContainer.classList.remove("open");
      trigger.querySelector(".fa-chevron-down").style.transform =
        "rotate(0deg)";
    });

    optionsContainer.appendChild(optionDiv);
  });
  wrapper.appendChild(optionsContainer);

  // Toggle Dropdown
  trigger.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = optionsContainer.classList.contains("open");

    // Close all other custom selects
    document.querySelectorAll(".custom-select-options").forEach((el) => {
      el.classList.remove("open");
      if (el.previousElementSibling) {
        const chevron =
          el.previousElementSibling.querySelector(".fa-chevron-down");
        if (chevron) chevron.style.transform = "rotate(0deg)";
      }
    });

    if (!isOpen) {
      optionsContainer.classList.add("open");
      trigger.querySelector(".fa-chevron-down").style.transform =
        "rotate(180deg)";
    }
  });

  // Close when clicking outside
  document.addEventListener("click", (e) => {
    if (!wrapper.contains(e.target)) {
      optionsContainer.classList.remove("open");
      trigger.querySelector(".fa-chevron-down").style.transform =
        "rotate(0deg)";
    }
  });
}

// Initialize Custom Selects
document.addEventListener("partialsLoaded", () => {
  // Login Role Select
  setupCustomSelect("role-select", {
    student: "fa-user-graduate",
    tutor: "fa-chalkboard-user",
    department: "fa-building-user",
    academic: "fa-university",
    admin: "fa-user-shield",
  });

  // Feedback Select
  const feedbackSelect = document.querySelector("#feedback_student select");
  if (feedbackSelect) {
    if (!feedbackSelect.id) feedbackSelect.id = "feedback-select-unique";
    setupCustomSelect(feedbackSelect.id);
  }

  // Bonus Session Modal Select
  const bonusSelect = document.querySelector("#bonus-session-modal select");
  if (bonusSelect) {
    if (!bonusSelect.id) bonusSelect.id = "bonus-select-unique";
    setupCustomSelect(bonusSelect.id);
  }

  // Event listener for role change
  const roleSelect = document.getElementById("role-select");
  if (roleSelect) {
    roleSelect.addEventListener("change", onRoleChange);
  }

  // Set initial login credentials based on default role
  onRoleChange();

  // Check for existing session
  const savedRole = localStorage.getItem("currentUserRole");
  const savedUsername = localStorage.getItem("username");

  if (savedRole && savedUsername) {
    const roleSelect = document.getElementById("role-select");
    if (roleSelect) roleSelect.value = savedRole;

    const userInput = document.getElementById("login-username");
    if (userInput) userInput.value = savedUsername;

    applyLoginState(savedUsername, savedRole);
  }
});

const roleMenus = {
  student: [
    { id: "dashboard_student", icon: "fa-chart-pie", text: "Tổng quan" },
    { id: "courses_student", icon: "fa-book-open", text: "Môn học" },
    { id: "library_view", icon: "fa-book-bookmark", text: "Thư viện số" },
    { id: "feedback_student", icon: "fa-comment-dots", text: "Đánh giá" },
    { id: "profile_student", icon: "fa-user", text: "Hồ sơ" },
  ],
  tutor: [
    {
      id: "dashboard_tutor",
      icon: "fa-chart-line",
      text: "Dashboard Tutor",
    },
    {
      id: "tutor_schedule",
      icon: "fa-calendar-days",
      text: "Lịch dạy & Đăng ký",
    },
    { id: "courses_tutor", icon: "fa-chalkboard-user", text: "Lớp dạy" },
    { id: "progress_tutor", icon: "fa-chart-simple", text: "Tiến độ Học tập" },
    { id: "library_view", icon: "fa-book-bookmark", text: "Thư viện số" },
    { id: "feedback_view_tutor", icon: "fa-comments", text: "Xem Phản hồi" },
    { id: "profile_tutor", icon: "fa-user-tie", text: "Hồ sơ Tutor" },
  ],
  department: [
    { id: "dashboard_department", icon: "fa-building", text: "Tổng quan Khoa" },
    { id: "feedback_view_admin", icon: "fa-comments", text: "Phản hồi Khoa" }, // Reuse admin view but filtered
    { id: "progress_admin", icon: "fa-chart-pie", text: "Tiến độ Khoa" }, // Reuse admin view but filtered
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

function handleLogin(e) {
  if (e) e.preventDefault();
  currentUserRole = document.getElementById("role-select").value;
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password")?.value;

  if (!username || !password) {
    showToast("Vui lòng nhập đầy đủ Tên đăng nhập và Mật khẩu.", "error");
    return;
  }

  // Save to local storage
  localStorage.setItem("currentUserRole", currentUserRole);
  localStorage.setItem("username", username);

  applyLoginState(username, currentUserRole);
}

function applyLoginState(username, role) {
  document
    .querySelectorAll(".user-name-display")
    .forEach((el) => (el.innerText = username));
  document
    .querySelectorAll(".user-role-display")
    .forEach((el) => (el.innerText = role.toUpperCase()));

  const portalBadge = document.getElementById("portal-badge");
  if (portalBadge) portalBadge.innerText = role.toUpperCase();

  generateSidebar(role);

  const loginScreen = document.getElementById("login-screen");
  if (loginScreen) loginScreen.classList.add("hidden");

  const mainApp = document.getElementById("main-app");
  if (mainApp) {
    mainApp.classList.remove("hidden");
    mainApp.classList.add("flex");
  }

  // Restore active tab or default
  const savedTab = localStorage.getItem("activeTab");
  const dashboardId =
    role === "admin"
      ? "dashboard_admin"
      : role === "tutor"
      ? "dashboard_tutor"
      : role === "department"
      ? "dashboard_department"
      : role === "academic"
      ? "dashboard_academic"
      : "dashboard_student";

  switchTab(savedTab || dashboardId);
}

function generateSidebar(role) {
  const container = document.getElementById("sidebar-nav");
  container.innerHTML = "";
  (roleMenus[role] || roleMenus["student"]).forEach((item) => {
    const btn = document.createElement("button");
    btn.className = `nav-item w-full text-left px-4 py-3 rounded-xl text-slate-500 hover:bg-white/50 transition flex items-center gap-3 text-sm font-bold mb-1`;
    btn.onclick = () => switchTab(item.id);
    btn.innerHTML = `<i class="fa-solid ${item.icon} w-6 text-center flex-shrink-0"></i> <span class="truncate">${item.text}</span>`;
    btn.dataset.target = item.id;
    container.appendChild(btn);
  });
}

function switchTab(tabId) {
  document
    .querySelectorAll(".section-view")
    .forEach((el) => el.classList.remove("active"));
  const target = document.getElementById(tabId);
  if (target) target.classList.add("active");

  document.querySelectorAll(".nav-item").forEach((el) => {
    el.classList.toggle("active", el.dataset.target === tabId);
  });

  if (tabId === "dashboard_admin") initAdminCharts();
  if (tabId === "dashboard_tutor") initTutorCharts();
  if (tabId === "dashboard_department") initDeptCharts();
  if (tabId === "dashboard_academic") initAcademicCharts();
  if (tabId === "notifications_view") renderNotifications();
  if (tabId === "course_cancellation_rules") renderCourseCancellationRules();
  if (tabId === "feedback_view_tutor") renderTutorFeedback();
  if (tabId === "feedback_view_admin") renderAdminFeedback();
  if (tabId === "system_admin") renderAdminSystem();
  if (tabId === "library_view") renderLibrary();
  if (tabId === "progress_tutor") renderTutorProgress();
  if (tabId === "progress_admin") renderAdminProgress();
  if (tabId === "tutor_schedule") {
    renderBonusSessions();
    renderBonusRsvps();
  }

  // Save active tab
  localStorage.setItem("activeTab", tabId);
}

function logout() {
  localStorage.removeItem("currentUserRole");
  localStorage.removeItem("username");
  localStorage.removeItem("activeTab");

  currentUserRole = "student";
  adminChartInited = false;
  tutorChartInited = false;
  if (trafficChart) {
    trafficChart.destroy();
    trafficChart = null;
  }
  if (userChart) {
    userChart.destroy();
    userChart = null;
  }
  if (tutorStudentChart) {
    tutorStudentChart.destroy();
    tutorStudentChart = null;
  }

  document.getElementById("main-app").classList.add("hidden");
  document.getElementById("main-app").classList.remove("flex");
  document.getElementById("login-screen").classList.remove("hidden");
  document.getElementById("login-username").value = "hcmut_student";
}

// Toast Notification Logic
function showToast(message, type = "info") {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;

  let iconClass = "fa-info";
  let title = "Thông báo";

  if (type === "success") {
    iconClass = "fa-check";
    title = "Thành công";
  } else if (type === "error") {
    iconClass = "fa-xmark";
    title = "Lỗi";
  }

  toast.innerHTML = `
        <div class="toast-icon">
            <i class="fa-solid ${iconClass}"></i>
        </div>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
    `;

  container.appendChild(toast);

  // Remove after 3s
  setTimeout(() => {
    toast.classList.add("hiding");
    toast.addEventListener("animationend", () => {
      toast.remove();
    });
  }, 3000);
}

// Helper functions (register, cancel, toggle, modal, charts...)
function registerCourse() {
  switchTab("student_register");
}

// --- Course Cancellation Logic (UC006) ---
let pendingCancelId = null;
let pendingCancelName = null;

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

function cancelCourse(id, name) {
  ensureCancellationModalExists();
  pendingCancelId = id;
  pendingCancelName = name;

  // Mock Logic for Rules
  const isLate = id === "CO1023"; // Mock condition

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

function closeCancellationModal() {
  document.getElementById("cancellation-modal").classList.add("hidden");
  pendingCancelId = null;
}

function processCancellation() {
  if (!pendingCancelId) return;

  // 1. Close Modal
  document.getElementById("cancellation-modal").classList.add("hidden");

  // 2. Mock API Call / Loading State
  showToast(`Đang xử lý hủy môn ${pendingCancelName}...`, "info");

  setTimeout(() => {
    // 3. Update UI (Visual update on the card)
    const card = document.getElementById(`course-card-${pendingCancelId}`);
    if (card) {
      // Apply "Cancelled" visual state
      card.classList.add("opacity-60", "grayscale");
      card.style.pointerEvents = "none"; // Disable interactions

      // Find button and change text
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
// -------------------------------------

function confirmRegistration(courseName) {
  confirmActionModal(
      "Xác nhận Đăng ký",
      `Bạn có chắc chắn muốn đăng ký môn học "${courseName}" không?`,
      () => {
          showToast(`Đã đăng ký thành công ${courseName}!`, "success");
      },
      "Đăng ký",
      "bg-blue-600"
  );
}
function viewAllSchedule() {
  showToast(
    "Chức năng xem tất cả lịch học sẽ được bổ sung trong phiên bản tiếp theo",
    "info"
  );
}
function enterClass(courseName) {
  showToast(`Đang vào lớp học ${courseName || ""}...`, "success");
}
function searchCourses() {
  const searchInput = document.querySelector(
    '#student_register input[type="text"]'
  );
  const searchValue = searchInput ? searchInput.value.trim() : "";
  if (searchValue) {
    showToast(`Đang tìm kiếm: ${searchValue}`, "info");
  } else {
    showToast("Vui lòng nhập từ khóa tìm kiếm", "error");
  }
}
function viewDetailedReport() {
  showToast("Đang tải báo cáo chi tiết...", "info");
}
function submitFeedback(e) {
  e.preventDefault();

  const courseId = document.getElementById("selected-feedback-course")?.value;
  if (!courseId) {
    showToast("Vui lòng chọn môn học để đánh giá!", "error");
    return;
  }

  showToast("Cảm ơn phản hồi của bạn!", "success");
  // Reset form
  e.target.reset();
  // Reset hidden input
  document.getElementById("selected-feedback-course").value = "";
  // Reset UI selection
  document.querySelectorAll(".course-select-card").forEach((card) => {
    card.classList.remove(
      "bg-blue-50",
      "border-blue-500",
      "ring-1",
      "ring-blue-500"
    );
    card.classList.add("bg-white", "border-slate-200");
    const check = card.querySelector(".check-icon");
    if (check) {
      check.classList.remove("bg-blue-500", "border-blue-500", "text-white");
      check.classList.add("border-slate-200", "text-transparent");
    }
  });

  // Reset star rating
  const stars = document.querySelectorAll(".star-btn");
  stars.forEach((star) => {
    star.classList.remove("text-yellow-400");
    star.classList.add("text-slate-200");
  });
  const ratingText = document.getElementById("rating-text");
  if (ratingText) {
    ratingText.innerText = "Chưa chọn mức độ";
    ratingText.classList.remove("text-slate-600");
    ratingText.classList.add("text-slate-400");
  }
}

// Bonus Session Data
let bonusSessions = [
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

let bonusRsvps = [
  {
    id: "R1",
    sessionId: "S1",
    studentId: "sv001",
    name: "Nguyen Van A",
    status: "ACCEPTED",
  },
];

function submitBonusSession(e) {
  e.preventDefault();

  const title = document.getElementById("bonus-title")?.value || "Untitled";
  const course = document.getElementById("bonus-course")?.value;
  const desc = document.getElementById("bonus-desc")?.value || "";
  const scope = document.getElementById("bonus-scope")?.value || "CLASS";
  const students = Array.from(
    document.getElementById("bonus-students")?.selectedOptions || []
  ).map((o) => o.value);
  const date = document.getElementById("bonus-date")?.value;
  const start = document.getElementById("bonus-start")?.value;
  const duration = document.getElementById("bonus-duration")?.value || 60;
  const mode = document.getElementById("bonus-mode")?.value || "ONLINE";
  const location = document.getElementById("bonus-location")?.value || "";
  const max = document.getElementById("bonus-max")?.value || 30;
  const approval = document.getElementById("bonus-approval")?.checked || false;

  // Validation
  if (!course) {
    showToast("Vui lòng chọn môn học!", "error");
    return;
  }
  if (!date || !start) {
    showToast("Vui lòng nhập ngày và giờ bắt đầu!", "error");
    return;
  }
  if (duration <= 0) {
    showToast("Thời lượng phải lớn hơn 0!", "error");
    return;
  }

  const newSession = {
    id: "S" + (bonusSessions.length + 1),
    title: title,
    course: course,
    desc: desc,
    scope: scope,
    students: students,
    date: date,
    start: start,
    duration: parseInt(duration),
    mode: mode,
    location: location,
    max: parseInt(max),
    approval: approval,
    tutor: "Nguyen Van B",
    status: approval ? "PENDING" : "ACTIVE",
    count: 0,
  };

  bonusSessions.push(newSession);

  showToast("Đã tạo buổi học bổ sung thành công!", "success");
  document.getElementById("bonus-session-modal").classList.add("hidden");
  document.getElementById("bonus-session-form")?.reset();
  updateBonusPreview();
  renderBonusSessions();
  renderBonusRsvps();
}

function onBonusScopeChange() {
  const scope = document.getElementById("bonus-scope")?.value;
  const wrapper = document.getElementById("bonus-students-wrapper");
  if (wrapper) {
    wrapper.classList.toggle("hidden", scope !== "INDIVIDUAL");
  }
}

function updateBonusPreview() {
  const preview = document.getElementById("bonus-preview");
  if (!preview) return;

  const title = document.getElementById("bonus-title")?.value || "";
  const course = document.getElementById("bonus-course")?.value || "";
  const date = document.getElementById("bonus-date")?.value || "";
  const start = document.getElementById("bonus-start")?.value || "";
  const duration = document.getElementById("bonus-duration")?.value || "";

  if (title || course || date) {
    preview.textContent = `${title || "Chưa có tiêu đề"} • ${
      course || "Chưa chọn môn"
    } • ${date} ${start} • ${duration} phút`;
  } else {
    preview.textContent = "Các thông tin sẽ hiện tại đây khi nhập form.";
  }
}

function renderBonusSessions() {
  const container = document.getElementById("bonus-sessions-list");
  const countEl = document.getElementById("bonus-session-count");

  if (!container) return;

  if (countEl) countEl.textContent = bonusSessions.length + " buổi";

  if (bonusSessions.length === 0) {
    container.innerHTML = `<div class="text-center py-8 text-slate-400">
      <i class="fa-solid fa-calendar-xmark text-4xl mb-3 opacity-50"></i>
      <p class="text-sm">Chưa có buổi học bổ sung nào.</p>
      <p class="text-xs mt-1">Nhấn "Tạo buổi bổ sung" để bắt đầu.</p>
    </div>`;
    return;
  }

  container.innerHTML = bonusSessions
    .slice()
    .reverse()
    .map((s) => {
      const statusBadge =
        s.status === "ACTIVE"
          ? '<span class="px-2 py-1 bg-green-100 text-green-600 rounded-lg text-[10px] font-bold">ACTIVE</span>'
          : '<span class="px-2 py-1 bg-yellow-100 text-yellow-600 rounded-lg text-[10px] font-bold">PENDING</span>';

      const modeBadge =
        s.mode === "ONLINE"
          ? '<span class="px-2 py-1 bg-blue-100 text-blue-600 rounded-lg text-[10px] font-bold"><i class="fa-solid fa-video mr-1"></i>Online</span>'
          : '<span class="px-2 py-1 bg-purple-100 text-purple-600 rounded-lg text-[10px] font-bold"><i class="fa-solid fa-building mr-1"></i>Offline</span>';

      return `<div class="p-4 rounded-xl border border-slate-200 bg-white/50 hover:bg-white/80 transition">
      <div class="flex items-start justify-between gap-4">
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 mb-2">
            <h5 class="font-bold text-slate-800 truncate">${s.title}</h5>
            ${statusBadge}
            ${modeBadge}
          </div>
          <div class="text-xs text-slate-500 space-y-1">
            <p><i class="fa-solid fa-calendar mr-1"></i>${s.date} ${
        s.start
      } • ${s.duration} phút</p>
            <p><i class="fa-solid fa-user-tie mr-1"></i>Tutor: ${s.tutor}</p>
            ${
              s.location
                ? `<p><i class="fa-solid fa-location-dot mr-1"></i>${s.location}</p>`
                : ""
            }
          </div>
        </div>
        <div class="text-right flex-shrink-0">
          <div class="text-lg font-bold text-slate-700">${s.count}/${
        s.max
      }</div>
          <div class="text-[10px] text-slate-400">đăng ký</div>
          <button onclick="sendBonusNotification('${
            s.id
          }')" class="mt-2 px-3 py-1 rounded-lg bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition">
            <i class="fa-solid fa-paper-plane mr-1"></i>Gửi TB
          </button>
        </div>
      </div>
    </div>`;
    })
    .join("");
}

function renderBonusRsvps() {
  const container = document.getElementById("bonus-rsvp-list");
  const countEl = document.getElementById("rsvp-count");

  if (!container) return;

  if (countEl) countEl.textContent = bonusRsvps.length + " đăng ký";

  if (bonusRsvps.length === 0) {
    container.innerHTML = `<div class="text-center py-8 text-slate-400">
      <i class="fa-solid fa-users-slash text-4xl mb-3 opacity-50"></i>
      <p class="text-sm">Chưa có sinh viên đăng ký.</p>
    </div>`;
    return;
  }

  container.innerHTML = bonusRsvps
    .map((r) => {
      const session = bonusSessions.find((s) => s.id === r.sessionId);
      const sessionTitle = session ? session.title : "Unknown";

      const statusBadge =
        r.status === "ACCEPTED"
          ? '<span class="px-2 py-1 bg-green-100 text-green-600 rounded-lg text-[10px] font-bold">Đã chấp nhận</span>'
          : r.status === "DECLINED"
          ? '<span class="px-2 py-1 bg-red-100 text-red-600 rounded-lg text-[10px] font-bold">Đã từ chối</span>'
          : '<span class="px-2 py-1 bg-yellow-100 text-yellow-600 rounded-lg text-[10px] font-bold">Chờ xác nhận</span>';

      return `<div class="p-4 rounded-xl border border-slate-200 bg-white/50 flex items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(
          r.name
        )}&background=eff6ff&color=2563eb" class="w-10 h-10 rounded-full border-2 border-white">
        <div>
          <p class="font-bold text-slate-800">${r.name}</p>
          <p class="text-xs text-slate-500">Buổi: ${sessionTitle}</p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        ${statusBadge}
        ${
          r.status !== "DECLINED"
            ? `<button onclick="changeRsvpStatus('${r.id}', 'DECLINED')" class="px-3 py-1 rounded-lg bg-red-100 text-red-600 text-xs font-bold hover:bg-red-200 transition">Từ chối</button>`
            : ""
        }
        ${
          r.status !== "ACCEPTED"
            ? `<button onclick="changeRsvpStatus('${r.id}', 'ACCEPTED')" class="px-3 py-1 rounded-lg bg-green-100 text-green-600 text-xs font-bold hover:bg-green-200 transition">Chấp nhận</button>`
            : ""
        }
      </div>
    </div>`;
    })
    .join("");
}

function sendBonusNotification(sessionId) {
  showToast("Thông báo mời tham gia đã được gửi!", "info");
}

function changeRsvpStatus(rsvpId, newStatus) {
  const rsvp = bonusRsvps.find((r) => r.id === rsvpId);
  if (rsvp) {
    rsvp.status = newStatus;
    renderBonusRsvps();
    showToast(`Đã cập nhật trạng thái RSVP thành ${newStatus}`, "success");
  }
}

// Wire up bonus preview updates
document.addEventListener("partialsLoaded", () => {
  [
    "bonus-title",
    "bonus-course",
    "bonus-date",
    "bonus-start",
    "bonus-duration",
  ].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("input", updateBonusPreview);
  });

  // Initialize bonus sessions list if on tutor schedule
  renderBonusSessions();
  renderBonusRsvps();
});

function saveTutorSchedule() {
  showToast("Lịch dạy đã được lưu thành công!", "success");
}
function toggleClassDetails(id) {
  document.getElementById(id).classList.toggle("hidden");
}
function openMaterialModal(name) {
  document.getElementById("material-modal").classList.remove("hidden");
}
function closeMaterialModal() {
  document.getElementById("material-modal").classList.add("hidden");
}
function toggleNotifications() {
  document.getElementById("notification-dropdown").classList.toggle("hidden");
}

function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("sidebar-overlay");

  if (!sidebar || !overlay) return;

  const isClosed = sidebar.classList.contains("-translate-x-full");

  if (isClosed) {
    // Open sidebar
    sidebar.classList.remove("-translate-x-full");
    overlay.classList.remove("hidden");
    // Trigger reflow for opacity transition
    void overlay.offsetWidth;
    overlay.classList.remove("opacity-0");
  } else {
    // Close sidebar
    sidebar.classList.add("-translate-x-full");
    overlay.classList.add("opacity-0");
    setTimeout(() => {
      overlay.classList.add("hidden");
    }, 300); // Wait for transition
  }
}

function toggleProfileEdit() {
  const form = document.getElementById("student-edit-mode");
  const view = document.getElementById("student-view-mode"); // Optional: if we want to toggle visibility of view

  const isHidden = form.classList.contains("hidden");

  if (isHidden) {
    // Open: Pre-fill data
    document.getElementById("student-name-input").value =
      document.getElementById("student-name-display").innerText;
    document.getElementById("student-email-input").value =
      document.getElementById("student-email-display").innerText;
    document.getElementById("student-phone-input").value =
      document.getElementById("student-phone-display").innerText;

    // Reset Image Preview
    document.getElementById("student-avatar-preview").src = "";
    document.getElementById("student-avatar-preview").classList.add("hidden");
    document
      .getElementById("student-avatar-placeholder")
      .classList.remove("hidden");
    document.getElementById("student-avatar-input").value = "";

    form.classList.remove("hidden");
  } else {
    // Close
    form.classList.add("hidden");
  }
}

function updateProfile(e) {
  e.preventDefault();

  const name = document.getElementById("student-name-input").value.trim();
  const email = document.getElementById("student-email-input").value.trim();
  const phone = document.getElementById("student-phone-input").value.trim();
  const avatarInput = document.getElementById("student-avatar-input");

  // Validation
  if (!name) return showToast("Vui lòng nhập họ tên!", "error");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return showToast("Email không hợp lệ!", "error");

  const phoneRegex = /^[0-9]{10,11}$/;
  if (!phoneRegex.test(phone.replace(/\s/g, "")))
    return showToast("Số điện thoại không hợp lệ!", "error");

  // Update DOM
  document.getElementById("student-name-display").innerText = name;
  document.getElementById("student-email-display").innerText = email;
  document.getElementById("student-phone-display").innerText = phone;

  // Update Avatar if changed
  if (avatarInput.files && avatarInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("student-avatar-display").src = e.target.result;
    };
    reader.readAsDataURL(avatarInput.files[0]);
  }

  showToast("Hồ sơ sinh viên đã được cập nhật!", "success");
  toggleProfileEdit();
}

function toggleTutorProfileEdit() {
  const form = document.getElementById("tutor-edit-mode");
  const isHidden = form.classList.contains("hidden");

  if (isHidden) {
    // Pre-fill
    document.getElementById("tutor-name-input").value =
      document.getElementById("tutor-name-display").innerText;
    document.getElementById("tutor-email-input").value =
      document.getElementById("tutor-email-display").innerText;
    document.getElementById("tutor-phone-input").value =
      document.getElementById("tutor-phone-display").innerText;

    // Reset Image Preview
    document.getElementById("tutor-avatar-preview").src = "";
    document.getElementById("tutor-avatar-preview").classList.add("hidden");
    document
      .getElementById("tutor-avatar-placeholder")
      .classList.remove("hidden");
    document.getElementById("tutor-avatar-input").value = "";

    form.classList.remove("hidden");
  } else {
    form.classList.add("hidden");
  }
}

function updateTutorProfile(e) {
  e.preventDefault();

  const name = document.getElementById("tutor-name-input").value.trim();
  const email = document.getElementById("tutor-email-input").value.trim();
  const phone = document.getElementById("tutor-phone-input").value.trim();
  const avatarInput = document.getElementById("tutor-avatar-input");

  // Validation
  if (!name) return showToast("Vui lòng nhập họ tên!", "error");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return showToast("Email không hợp lệ!", "error");

  const phoneRegex = /^[0-9]{10,11}$/;
  if (!phoneRegex.test(phone.replace(/\s/g, "")))
    return showToast("Số điện thoại không hợp lệ!", "error");

  // Update DOM
  document.getElementById("tutor-name-display").innerText = name;
  document.getElementById("tutor-email-display").innerText = email;
  document.getElementById("tutor-phone-display").innerText = phone;

  // Update Avatar if changed
  if (avatarInput.files && avatarInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("tutor-avatar-display").src = e.target.result;
    };
    reader.readAsDataURL(avatarInput.files[0]);
  }

  showToast("Hồ sơ Tutor đã được cập nhật!", "success");
  toggleTutorProfileEdit();
}

function handleImagePreview(input, imgId, placeholderId) {
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = document.getElementById(imgId);
      const ph = document.getElementById(placeholderId);
      img.src = e.target.result;
      img.classList.remove("hidden");
      ph.classList.add("hidden");
    };
    reader.readAsDataURL(input.files[0]);
  }
}

// Mock User Data for Admin
let mockUsers = [
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

function renderAdminSystem() {
  renderUserTable();
  renderSystemLogs();
}

// System Logs Data
let systemLogs = [
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

function renderSystemLogs() {
  const area = document.getElementById("system-log-area");
  if (!area) return;

  const filterEl = document.getElementById("log-filter");
  const filter = filterEl ? filterEl.value : "ALL";

  const filteredLogs = systemLogs.filter(
    (l) => filter === "ALL" || l.level === filter
  );

  if (filteredLogs.length === 0) {
    area.innerHTML =
      '<p class="text-slate-500">Không có log nào.</p><p class="animate-pulse text-slate-500">_</p>';
    return;
  }

  area.innerHTML =
    filteredLogs
      .map((l) => {
        let levelColor = "text-blue-400";
        if (l.level === "WARN") levelColor = "text-yellow-400";
        if (l.level === "ERROR") levelColor = "text-red-400";

        return `<div class="py-2 border-b border-slate-700/50">
            <p><span class="${levelColor}">[${l.level}]</span> <span class="text-slate-400">${l.ts}</span> <span class="text-cyan-400">[${l.actor}]</span></p>
            <p class="text-slate-300">${l.action}</p>
            <p class="text-slate-500 text-[11px]">${l.details}</p>
        </div>`;
      })
      .join("") + '<p class="animate-pulse text-slate-500 mt-2">_</p>';
}

function simulateSync() {
  showToast("Đang sync với HCMUT_DataCore...", "info");
  setTimeout(() => {
    const now = new Date().toISOString().slice(0, 19).replace("T", " ");
    systemLogs.unshift({
      ts: now,
      level: "INFO",
      actor: "Admin",
      action: "Manual sync",
      details: "Sync completed (mô phỏng)",
    });

    const syncEl = document.getElementById("sys-sync");
    if (syncEl) syncEl.textContent = now;

    renderSystemLogs();
    showToast("Đồng bộ DataCore hoàn tất!", "success");
  }, 1200);
}

function simulateAdjust() {
  showToast("Đang áp dụng cấu hình mới...", "info");
  setTimeout(() => {
    const now = new Date().toISOString().slice(0, 19).replace("T", " ");
    systemLogs.unshift({
      ts: now,
      level: "INFO",
      actor: "Admin",
      action: "Adjust settings",
      details: "Updated threshold values",
    });
    renderSystemLogs();
    showToast("Cấu hình đã được cập nhật!", "success");
  }, 1000);
}

function simulateStatus() {
  const statusEl = document.getElementById("sys-status");
  const indicatorEl = document.getElementById("status-indicator");
  if (!statusEl) return;

  const currentStatus = statusEl.textContent;
  if (currentStatus === "OK") {
    statusEl.textContent = "DEGRADED";
    statusEl.className = "text-yellow-600";
    if (indicatorEl)
      indicatorEl.className =
        "w-3 h-3 rounded-full bg-yellow-500 animate-pulse";
  } else {
    statusEl.textContent = "OK";
    statusEl.className = "text-green-600";
    if (indicatorEl)
      indicatorEl.className = "w-3 h-3 rounded-full bg-green-500 animate-pulse";
  }
  showToast("Trạng thái hệ thống: " + statusEl.textContent, "info");
}

function clearSystemLogs() {
  confirmActionModal(
      "Xóa toàn bộ Logs?",
      "Tất cả lịch sử hoạt động hệ thống sẽ bị xóa. Bạn không thể khôi phục lại.",
      () => {
          systemLogs = [];
          renderSystemLogs();
          showToast("Đã xóa logs thành công", "success");
      },
      "Xóa Logs",
      "bg-red-500"
  );
}

function exportSystemLogs() {
  const csv = [
    "timestamp,level,actor,action,details",
    ...systemLogs.map(
      (l) => `${l.ts},${l.level},${l.actor},"${l.action}","${l.details}"`
    ),
  ].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "system_logs.csv";
  a.click();
  URL.revokeObjectURL(url);
  showToast("File CSV đã được tải xuống", "success");
}

function renderUserTable() {
  const tbody = document.getElementById("admin-user-list");
  if (!tbody) return;

  tbody.innerHTML = mockUsers
    .map(
      (u) => `
        <tr class="border-b border-slate-100 hover:bg-blue-50/50 transition">
            <td class="py-3 pl-4 font-mono text-slate-500 text-xs">${u.id}</td>
            <td class="py-3 font-bold text-slate-700">${u.name}</td>
            <td class="py-3"><span class="uppercase text-[10px] font-bold px-2 py-1 rounded bg-slate-100 text-slate-500">${
              u.role
            }</span></td>
            <td class="py-3 text-sm text-slate-600">${u.email}</td>
            <td class="py-3">
                <span class="px-2 py-1 rounded text-[10px] font-bold ${
                  u.status === "active"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }">
                    ${u.status === "active" ? "Hoạt động" : "Đã khóa"}
                </span>
            </td>
            <td class="py-3 text-right pr-4">
                <button onclick="editUser('${
                  u.id
                }')" class="text-blue-500 hover:bg-blue-100 p-2 rounded-lg transition"><i class="fa-solid fa-pen"></i></button>
                <button onclick="deleteUser('${
                  u.id
                }')" class="text-red-500 hover:bg-red-100 p-2 rounded-lg transition"><i class="fa-solid fa-trash"></i></button>
            </td>
        </tr>
    `
    )
    .join("");
}

function addUser() {
  const name = prompt("Nhập tên người dùng mới:");
  if (name) {
    const id = "U" + Date.now().toString().slice(-4);
    mockUsers.push({
      id: id,
      name: name,
      role: "student",
      email: "new.user@hcmut.edu.vn",
      status: "active",
    });
    renderUserTable();
    showToast("Đã thêm người dùng mới thành công", "success");
  }
}

function editUser(id) {
  const user = mockUsers.find((u) => u.id === id);
  if (user) {
    const newName = prompt("Chỉnh sửa tên người dùng:", user.name);
    if (newName) {
      user.name = newName;
      renderUserTable();
      showToast("Đã cập nhật thông tin người dùng", "success");
    }
  }
}

function confirmActionModal(title, message, onConfirm, confirmText = "Xác nhận", confirmColor = "bg-red-500") {
    let modal = document.getElementById('confirmation-modal');
    if (!modal) {
        const modalHtml = `
        <div id="confirmation-modal" class="hidden fixed inset-0 z-[70] flex items-center justify-center">
            <div class="absolute inset-0 bg-slate-900/30 backdrop-blur-sm transition-opacity" onclick="closeConfirmationModal()"></div>
            <div class="glass-panel w-full max-w-sm p-6 rounded-[24px] shadow-2xl relative z-10 bg-white/90 transform transition-all scale-100 m-4">
                <div class="text-center mb-5">
                    <div class="w-14 h-14 bg-slate-100 text-slate-600 rounded-full flex items-center justify-center text-2xl mx-auto mb-3 shadow-inner">
                        <i class="fa-solid fa-question"></i>
                    </div>
                    <h3 id="confirm-modal-title" class="text-xl font-bold text-slate-800">Xác nhận</h3>
                    <p id="confirm-modal-message" class="text-slate-500 mt-2 text-sm leading-relaxed">Bạn có chắc chắn muốn thực hiện hành động này?</p>
                </div>
                <div class="grid grid-cols-2 gap-3">
                    <button onclick="closeConfirmationModal()" class="py-2.5 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition text-sm">Hủy bỏ</button>
                    <button id="confirm-modal-btn" class="py-2.5 rounded-xl text-white font-bold shadow-lg transition text-sm ${confirmColor}">Xác nhận</button>
                </div>
            </div>
        </div>`;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
        modal = document.getElementById('confirmation-modal');
    }

    document.getElementById('confirm-modal-title').innerText = title;
    document.getElementById('confirm-modal-message').innerText = message;
    
    const confirmBtn = document.getElementById('confirm-modal-btn');
    confirmBtn.innerText = confirmText;
    confirmBtn.className = `py-2.5 rounded-xl text-white font-bold shadow-lg transition text-sm ${confirmColor} hover:brightness-110`;
    
    // Remove old event listeners to prevent stacking
    const newBtn = confirmBtn.cloneNode(true);
    confirmBtn.parentNode.replaceChild(newBtn, confirmBtn);
    
    newBtn.onclick = () => {
        onConfirm();
        closeConfirmationModal();
    };

    modal.classList.remove('hidden');
}

function closeConfirmationModal() {
    const modal = document.getElementById('confirmation-modal');
    if (modal) modal.classList.add('hidden');
}

function deleteUser(id) {
    confirmActionModal(
        "Xóa người dùng?",
        "Hành động này sẽ xóa vĩnh viễn người dùng khỏi hệ thống.",
        () => {
            mockUsers = mockUsers.filter(u => u.id !== id);
            renderUserTable();
            showToast("Đã xóa người dùng", "success");
        },
        "Xóa ngay",
        "bg-red-500"
    );
}

function triggerBackup() {
  showToast("Đang tiến hành sao lưu dữ liệu hệ thống...", "info");
  setTimeout(() => {
    showToast("Sao lưu hoàn tất! File: backup_2025_11_28.sql", "success");
  }, 2000);
}

function restoreBackup() {
  confirmActionModal(
      "Khôi phục Hệ thống?",
      "CẢNH BÁO: Việc khôi phục sẽ ghi đè toàn bộ dữ liệu hiện tại bằng bản sao lưu. Dữ liệu mới hơn sẽ bị mất.",
      () => {
          showToast("Đang khôi phục dữ liệu...", "info");
          setTimeout(() => {
              showToast("Khôi phục hệ thống thành công.", "success");
          }, 3000);
      },
      "Khôi phục",
      "bg-orange-500"
  );
}

function setRating(n) {
  const stars = document.querySelectorAll(".star-btn");
  const ratingText = document.getElementById("rating-text");

  stars.forEach((star, index) => {
    if (index < n) {
      star.classList.remove("text-slate-200");
      star.classList.add("text-yellow-400");
    } else {
      star.classList.add("text-slate-200");
      star.classList.remove("text-yellow-400");
    }
  });

  const ratingLabels = ["Rất tệ", "Tệ", "Bình thường", "Tốt", "Rất tốt"];

  if (ratingText) {
    ratingText.innerText = `Đánh giá: ${ratingLabels[n - 1]}`;
    ratingText.classList.remove("text-slate-400");
    ratingText.classList.add("text-slate-600");
  }
}

function initAdminCharts() {
  if (trafficChart) trafficChart.destroy();
  if (userChart) userChart.destroy();

  const primaryColor =
    getComputedStyle(document.documentElement).getPropertyValue(
      "--color-primary"
    ) || "#3b82f6";
  const secondaryColor =
    getComputedStyle(document.documentElement).getPropertyValue(
      "--color-secondary"
    ) || "#6366f1";

  trafficChart = new Chart(document.getElementById("trafficChart"), {
    type: "line",
    data: {
      labels: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"],
      datasets: [
        {
          label: "Truy cập",
          data: [120, 250, 180, 300, 280, 400, 450],
          borderColor: primaryColor,
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          tension: 0.4,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, grid: { display: false } },
        x: { grid: { display: false } },
      },
    },
  });
  userChart = new Chart(document.getElementById("userChart"), {
    type: "bar",
    data: {
      labels: ["Thg 1", "Thg 2", "Thg 3", "Thg 4"],
      datasets: [
        {
          label: "Người dùng mới",
          data: [50, 80, 120, 150],
          backgroundColor: secondaryColor,
          borderRadius: 6,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, grid: { display: false } },
        x: { grid: { display: false } },
      },
    },
  });
  adminChartInited = true;
}
function initTutorCharts() {
  if (tutorStudentChart) tutorStudentChart.destroy();

  tutorStudentChart = new Chart(document.getElementById("tutorStudentChart"), {
    type: "bar",
    data: {
      labels: [
        "A (3.6-4.0)",
        "B (3.2-3.6)",
        "C (2.5-3.2)",
        "D (2.0-2.5)",
        "F (<2.0)",
      ],
      datasets: [
        {
          label: "Số lượng SV",
          data: [12, 25, 18, 5, 2],
          backgroundColor: [
            "#22c55e",
            "#3b82f6",
            "#eab308",
            "#f97316",
            "#ef4444",
          ],
          borderRadius: 6,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true } },
    },
  });
  tutorChartInited = true;
}

// --- Feedback Logic ---

function renderTutorFeedback() {
  // Assume current user is "Nguyễn Văn A" for demo purposes if role is tutor
  // In a real app, filter by logged in user ID
  const currentTutorName = "Nguyễn Văn A";
  const feedbacks = mockFeedbacks.filter((f) => f.tutor === currentTutorName);

  // Update Stats
  const total = feedbacks.length;
  const avg =
    total > 0
      ? (feedbacks.reduce((a, b) => a + b.rating, 0) / total).toFixed(1)
      : "0.0";
  const fiveStarCount = feedbacks.filter((f) => f.rating === 5).length;
  const fiveStarRate =
    total > 0 ? Math.round((fiveStarCount / total) * 100) + "%" : "0%";

  document.getElementById("tutor-total-feedback").innerText = total;
  document.getElementById("tutor-avg-rating").innerText = avg;
  document.getElementById("tutor-5star-rate").innerText = fiveStarRate;

  // Populate Course Filter
  const courses = [...new Set(feedbacks.map((f) => f.course))];
  const courseSelect = document.getElementById("tutor-course-filter");
  if (courseSelect && courseSelect.options.length === 1) {
    // Only populate if empty (except default)
    courses.forEach((c) => {
      const opt = document.createElement("option");
      opt.value = c;
      opt.innerText = c;
      courseSelect.appendChild(opt);
    });
  }

  filterTutorFeedback(); // Render list
}

function filterTutorFeedback() {
  const currentTutorName = "Nguyễn Văn A";
  let data = mockFeedbacks.filter((f) => f.tutor === currentTutorName);

  const search = document
    .getElementById("tutor-feedback-search")
    .value.toLowerCase();
  const course = document.getElementById("tutor-course-filter").value;
  const rating = document.getElementById("tutor-rating-filter").value;

  data = data.filter((f) => {
    const matchName = f.student.toLowerCase().includes(search);
    const matchCourse = course === "all" || f.course === course;
    const matchRating = rating === "all" || f.rating == rating;
    return matchName && matchCourse && matchRating;
  });

  const tbody = document.getElementById("tutor-feedback-list");
  const empty = document.getElementById("tutor-feedback-empty");
  tbody.innerHTML = "";

  if (data.length === 0) {
    empty.classList.remove("hidden");
  } else {
    empty.classList.add("hidden");
    data.forEach((f) => {
      const tr = document.createElement("tr");
      tr.className = "border-b border-slate-100 hover:bg-blue-50/50 transition";

      let starsHtml = "";
      for (let i = 1; i <= 5; i++) {
        starsHtml += `<i class="fa-solid fa-star ${
          i <= f.rating ? "text-yellow-400" : "text-slate-200"
        } text-[10px]"></i>`;
      }

      tr.innerHTML = `
        <td class="py-4 pl-4 font-bold text-slate-700">${f.student}</td>
        <td class="py-4 text-slate-600">${f.course}</td>
        <td class="py-4">${starsHtml}</td>
        <td class="py-4 text-slate-600 italic">"${f.comment}"</td>
        <td class="py-4 text-slate-500 text-xs">${f.date}</td>
      `;
      tbody.appendChild(tr);
    });
  }
}

function renderAdminFeedback() {
  // Admin sees all
  const feedbacks = mockFeedbacks;

  // Update Stats
  const total = feedbacks.length;
  const avg =
    total > 0
      ? (feedbacks.reduce((a, b) => a + b.rating, 0) / total).toFixed(1)
      : "0.0";
  const lowRating = feedbacks.filter((f) => f.rating < 3).length;

  document.getElementById("admin-total-feedback").innerText = total;
  document.getElementById("admin-avg-rating").innerText = avg;
  document.getElementById("admin-low-rating-count").innerText = lowRating;

  filterAdminFeedback();
}

function filterAdminFeedback() {
  let data = mockFeedbacks;

  const search = document
    .getElementById("admin-feedback-search")
    .value.toLowerCase();
  const ratingType = document.getElementById("admin-rating-filter").value;

  data = data.filter((f) => {
    const matchSearch =
      f.tutor.toLowerCase().includes(search) ||
      f.student.toLowerCase().includes(search) ||
      f.course.toLowerCase().includes(search);
    let matchRating = true;
    if (ratingType === "positive") matchRating = f.rating >= 4;
    if (ratingType === "negative") matchRating = f.rating <= 3;
    return matchSearch && matchRating;
  });

  document.getElementById(
    "admin-feedback-count-badge"
  ).innerText = `${data.length} bản ghi`;

  const tbody = document.getElementById("admin-feedback-list");
  const empty = document.getElementById("admin-feedback-empty");
  tbody.innerHTML = "";

  if (data.length === 0) {
    empty.classList.remove("hidden");
  } else {
    empty.classList.add("hidden");
    data.forEach((f) => {
      const tr = document.createElement("tr");
      tr.className = "border-b border-slate-100 hover:bg-blue-50/50 transition";

      let ratingBadge = "";
      if (f.rating >= 4)
        ratingBadge = `<span class="px-2 py-1 bg-green-100 text-green-600 rounded-lg text-xs font-bold">${f.rating} <i class="fa-solid fa-star"></i></span>`;
      else if (f.rating === 3)
        ratingBadge = `<span class="px-2 py-1 bg-yellow-100 text-yellow-600 rounded-lg text-xs font-bold">${f.rating} <i class="fa-solid fa-star"></i></span>`;
      else
        ratingBadge = `<span class="px-2 py-1 bg-red-100 text-red-600 rounded-lg text-xs font-bold">${f.rating} <i class="fa-solid fa-star"></i></span>`;

      tr.innerHTML = `
        <td class="py-4 pl-4 font-bold text-blue-600">${f.tutor}</td>
        <td class="py-4 font-bold text-slate-700">${f.student}</td>
        <td class="py-4 text-slate-600">${f.course}</td>
        <td class="py-4 text-center">${ratingBadge}</td>
        <td class="py-4 text-slate-600 truncate max-w-xs" title="${f.comment}">${f.comment}</td>
        <td class="py-4 text-slate-500 text-xs">${f.date}</td>
      `;
      tbody.appendChild(tr);
    });
  }
}

function exportFeedback(type) {
  showToast(`Đang xuất dữ liệu ra file ${type.toUpperCase()}...`, "success");
  // In a real app, this would trigger a backend download or client-side file generation
}

// --- Library Logic ---

function renderLibrary() {
  const courseSelect = document.getElementById("library-course-filter");

  // Populate filters if needed
  if (courseSelect && courseSelect.options.length === 1) {
    const courses = [...new Set(mockMaterials.map((m) => m.course))];
    courses.forEach((c) => {
      const opt = document.createElement("option");
      opt.value = c;
      opt.innerText = c;
      courseSelect.appendChild(opt);
    });
  }

  filterLibrary();
}

function filterLibrary() {
  let data = mockMaterials;

  const search = document.getElementById("library-search").value.toLowerCase();
  const course = document.getElementById("library-course-filter").value;
  const type = document.getElementById("library-type-filter").value;

  data = data.filter((m) => {
    const matchSearch =
      m.title.toLowerCase().includes(search) ||
      m.author.toLowerCase().includes(search);
    const matchCourse = course === "all" || m.course === course;
    const matchType = type === "all" || m.type === type;
    return matchSearch && matchCourse && matchType;
  });

  document.getElementById(
    "library-result-count"
  ).innerText = `Hiện ${data.length} tài liệu`;

  const grid = document.getElementById("library-list");
  const empty = document.getElementById("library-empty");
  grid.innerHTML = "";

  if (data.length === 0) {
    empty.classList.remove("hidden");
  } else {
    empty.classList.add("hidden");

    const typeIcons = {
      PDF: { icon: "fa-file-pdf", color: "text-red-500", bg: "bg-red-100" },
      Slide: {
        icon: "fa-layer-group",
        color: "text-orange-500",
        bg: "bg-orange-100",
      },
      Exam: {
        icon: "fa-file-lines",
        color: "text-blue-500",
        bg: "bg-blue-100",
      },
      Video: {
        icon: "fa-video",
        color: "text-purple-500",
        bg: "bg-purple-100",
      },
    };

    data.forEach((m) => {
      const style = typeIcons[m.type] || typeIcons["PDF"];

      const card = document.createElement("div");
      card.className =
        "glass-card p-5 rounded-2xl hover:-translate-y-1 transition group flex flex-col h-full border border-white/50";
      card.innerHTML = `
            <div class="flex justify-between items-start mb-4">
                <div class="w-12 h-12 rounded-xl ${style.bg} ${style.color} flex items-center justify-center text-xl shadow-sm">
                    <i class="fa-solid ${style.icon}"></i>
                </div>
                <div class="text-xs font-bold bg-white/60 px-2 py-1 rounded-lg text-slate-500 border border-white">
                    ${m.type}
                </div>
            </div>
            
            <h4 class="font-bold text-slate-800 text-lg leading-snug mb-2 group-hover:text-blue-600 transition line-clamp-2" title="${m.title}">${m.title}</h4>
            
            <div class="mb-4 flex-1">
                <p class="text-xs text-slate-500 mb-1"><i class="fa-solid fa-book-open mr-1"></i> ${m.course}</p>
                <p class="text-xs text-slate-500"><i class="fa-solid fa-user-pen mr-1"></i> ${m.author}</p>
            </div>
            
            <div class="flex items-center justify-between pt-4 border-t border-slate-200/50">
                <div class="text-xs text-slate-400 font-medium">
                    <span>${m.size}</span> • <span>${m.downloads} tải</span>
                </div>
                <button onclick="openLibraryMaterial(${m.id})" class="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition shadow-sm">
                    <i class="fa-solid fa-arrow-right -rotate-45"></i>
                </button>
            </div>
         `;
      grid.appendChild(card);
    });
  }
}

function filterLibraryByType(type) {
  const select = document.getElementById("library-type-filter");
  if (select) {
    select.value = type;
    filterLibrary();
    // Scroll to results
    document
      .getElementById("library-list")
      .scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function resetLibraryFilter() {
  document.getElementById("library-search").value = "";
  document.getElementById("library-course-filter").value = "all";
  document.getElementById("library-type-filter").value = "all";
  filterLibrary();
}

function openLibraryMaterial(id) {
  const item = mockMaterials.find((m) => m.id === id);
  if (item) {
    // Use the existing modal, but update title if possible,
    // or just show toast for simulation

    // Hack: Update the existing modal content dynamically if needed
    // For now, reuse the static modal but act like we loaded this file

    // Change modal title temporarily (optional)
    const modalTitle = document.querySelector("#material-modal h3");
    if (modalTitle) modalTitle.innerText = item.title;

    document.getElementById("material-modal").classList.remove("hidden");

    // Show toast
    showToast(`Đang mở tài liệu: ${item.title}`, "info");
  }
}

// --- Progress Logic ---

function renderTutorProgress() {
  const courseName = document.getElementById("progress-course-select").value;

  // Filter students by selected course
  let students = mockStudentProgress.filter((s) => s.course === courseName);

  // Update Stats
  const size = students.length;

  // Calculate GPA 4.0 Scale
  // <4.0 (F) = 0, 4.0-5.4 (D) = 1.0, 5.5-6.9 (C) = 2.0, 7.0-8.4 (B) = 3.0, 8.5-10 (A) = 4.0
  const convertToGPA = (score10) => {
    if (score10 < 4.0) return 0.0;
    if (score10 < 5.5) return 1.0;
    if (score10 < 7.0) return 2.0;
    if (score10 < 8.5) return 3.0;
    return 4.0;
  };

  const totalGPA = students.reduce((sum, s) => {
    const score10 = s.midterm * 0.3 + s.final * 0.7;
    return sum + convertToGPA(score10);
  }, 0);

  const avg = size > 0 ? (totalGPA / size).toFixed(2) : "0.00";
  const atRisk = students.filter(
    (s) => s.midterm * 0.3 + s.final * 0.7 < 4.0
  ).length;

  document.getElementById("prog-class-size").innerText = size;
  document.getElementById("prog-class-avg").innerText = avg + " / 4.0";
  document.getElementById("prog-class-risk").innerText = atRisk;

  filterProgressTable(); // Render table

  // Draw Chart: Score Distribution (Scale 10 for distribution buckets, but context is GPA)
  if (tutorProgressChart) tutorProgressChart.destroy();

  const scores = students.map((s) => s.midterm * 0.3 + s.final * 0.7);
  const distribution = [0, 0, 0, 0, 0]; // <4(F), 4-5.5(D), 5.5-7(C), 7-8.5(B), >8.5(A)

  scores.forEach((s) => {
    if (s < 4.0) distribution[0]++; // F
    else if (s < 5.5) distribution[1]++; // D
    else if (s < 7.0) distribution[2]++; // C
    else if (s < 8.5) distribution[3]++; // B
    else distribution[4]++; // A
  });

  const ctx = document.getElementById("classScoreChart");
  if (ctx) {
    tutorProgressChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [
          "F (<4.0)",
          "D (4.0-5.5)",
          "C (5.5-7.0)",
          "B (7.0-8.5)",
          "A (>8.5)",
        ],
        datasets: [
          {
            label: "Số lượng SV",
            data: distribution,
            backgroundColor: [
              "#ef4444",
              "#f97316",
              "#eab308",
              "#3b82f6",
              "#22c55e",
            ],
            borderRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } },
      },
    });
  }
}

function filterProgressTable() {
  const courseName = document.getElementById("progress-course-select").value;
  const search = document
    .getElementById("prog-student-search")
    .value.toLowerCase();

  let students = mockStudentProgress.filter((s) => s.course === courseName);

  if (search) {
    students = students.filter(
      (s) => s.name.toLowerCase().includes(search) || s.id.includes(search)
    );
  }

  const tbody = document.getElementById("prog-student-list");
  tbody.innerHTML = "";

  const convertToGPA = (score10) => {
    if (score10 < 4.0) return 0.0;
    if (score10 < 5.5) return 1.0;
    if (score10 < 7.0) return 2.0;
    if (score10 < 8.5) return 3.0;
    return 4.0;
  };

  students.forEach((s) => {
    const total10 = s.midterm * 0.3 + s.final * 0.7;
    const gpa = convertToGPA(total10).toFixed(1);

    let statusHtml = `<span class="px-2 py-1 bg-green-100 text-green-600 rounded font-bold text-xs">Đạt</span>`;
    if (total10 < 4.0)
      statusHtml = `<span class="px-2 py-1 bg-red-100 text-red-600 rounded font-bold text-xs">Rớt</span>`;
    else if (total10 < 5.0)
      statusHtml = `<span class="px-2 py-1 bg-yellow-100 text-yellow-600 rounded font-bold text-xs">Cảnh báo</span>`;

    const tr = document.createElement("tr");
    tr.className =
      "border-b border-slate-100 hover:bg-blue-50/50 transition group";
    tr.innerHTML = `
            <td class="py-3 pl-2 font-mono text-slate-500">${s.id}</td>
            <td class="py-3 font-bold text-slate-700">${s.name}</td>
            <td class="py-3 text-center">${s.midterm}</td>
            <td class="py-3 text-center">${s.final}</td>
            <td class="py-3 text-center font-bold text-blue-600">${gpa} / 4.0</td>
            <td class="py-3 text-right pr-2">${statusHtml}</td>
        `;
    tbody.appendChild(tr);
  });
}

function renderAdminProgress() {
  // Only init charts once or re-render if needed. For demo, we destroy and recreate.
  if (adminDeptChart) adminDeptChart.destroy();
  if (adminGradeChart) adminGradeChart.destroy();

  // Chart 1: Department Comparison (Updated for GPA 4.0 Scale)
  const ctx1 = document.getElementById("deptComparisonChart");
  if (ctx1) {
    adminDeptChart = new Chart(ctx1, {
      type: "bar",
      data: {
        labels: ["KHMT", "Đ-ĐT", "Cơ Khí", "Hóa", "Xây Dựng"],
        datasets: [
          {
            label: "GPA TB (Thang 4)",
            data: [3.1, 2.8, 2.6, 2.9, 2.5],
            backgroundColor: "#3b82f6",
            borderRadius: 4,
          },
          {
            label: "Tỷ lệ qua môn (%)",
            data: [92, 85, 80, 88, 79],
            type: "line",
            borderColor: "#f59e0b",
            borderWidth: 2,
            yAxisID: "y1",
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            max: 4,
            title: { display: true, text: "GPA (4.0)" },
          },
          y1: {
            beginAtZero: true,
            max: 100,
            position: "right",
            grid: { drawOnChartArea: false },
            title: { display: true, text: "Tỷ lệ (%)" },
          },
        },
      },
    });
  }

  // Chart 2: System Grade Distribution
  const ctx2 = document.getElementById("systemGradeDistChart");
  if (ctx2) {
    adminGradeChart = new Chart(ctx2, {
      type: "doughnut",
      data: {
        labels: [
          "Xuất sắc (3.6-4.0)",
          "Giỏi (3.2-3.6)",
          "Khá (2.5-3.2)",
          "Trung bình (2.0-2.5)",
          "Yếu/Kém (<2.0)",
        ],
        datasets: [
          {
            data: [15, 35, 30, 15, 5],
            backgroundColor: [
              "#22c55e",
              "#3b82f6",
              "#6366f1",
              "#f59e0b",
              "#ef4444",
            ],
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        cutout: "60%",
        plugins: {
          legend: { position: "right" },
        },
      },
    });
  }
}

// --- New Role Charts ---

function initDeptCharts() {
  const ctx = document.getElementById("deptProgressChart");
  if (ctx) {
    new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Qua môn", "Rớt", "Cảnh báo"],
        datasets: [
          {
            data: [85, 10, 5],
            backgroundColor: ["#22c55e", "#ef4444", "#f59e0b"],
            borderWidth: 0,
          },
        ],
      },
      options: { responsive: true, cutout: "70%" },
    });
  }
}

function initAcademicCharts() {
  const ctx = document.getElementById("academicEnrollmentChart");
  if (ctx) {
    new Chart(ctx, {
      type: "line",
      data: {
        labels: ["HK221", "HK222", "HK231", "HK232", "HK241", "HK242", "HK251"],
        datasets: [
          {
            label: "Đăng ký môn học",
            data: [12500, 12200, 13000, 12800, 14500, 14200, 15100],
            borderColor: "#3b82f6",
            tension: 0.4,
            fill: true,
            backgroundColor: "rgba(59, 130, 246, 0.1)",
          },
        ],
      },
      options: { responsive: true, scales: { y: { beginAtZero: false } } },
    });
  }
}

// --- Notification Logic ---

let currentNotiFilter = "all";

function renderNotifications() {
  // Update Badge count
  const unreadCount = mockNotifications.filter((n) => !n.isRead).length;
  const badge = document.querySelector("header .fa-bell + span");
  if (badge) {
    if (unreadCount > 0) {
      badge.classList.remove("hidden");
      badge.innerText = unreadCount > 9 ? "9+" : unreadCount;
    } else {
      badge.classList.add("hidden");
    }
  }

  // Update Dropdown List (Header)
  const headerList = document.getElementById("header-noti-list");
  if (headerList) {
    const recent = mockNotifications.slice(0, 5);
    if (recent.length === 0) {
      headerList.innerHTML =
        '<div class="p-4 text-center text-slate-400 text-sm">Không có thông báo nào</div>';
    } else {
      headerList.innerHTML = recent
        .map(
          (n) => `
                <div onclick="viewNotificationDetail(${
                  n.id
                })" class="p-3 rounded-xl cursor-pointer transition group ${
            n.isRead
              ? "hover:bg-slate-50 opacity-70"
              : "bg-blue-50/50 hover:bg-blue-50"
          }">
                    <div class="flex justify-between items-start mb-1">
                        <p class="text-xs font-bold ${getTypeColor(
                          n.type
                        )}">${getTypeName(n.type)}</p>
                        <p class="text-[10px] text-slate-400 whitespace-nowrap ml-2">${
                          n.time
                        }</p>
                    </div>
                    <p class="text-sm text-slate-800 font-bold leading-tight mb-1 group-hover:text-blue-600 transition">${
                      n.title
                    }</p>
                    <p class="text-xs text-slate-500 line-clamp-1">${
                      n.message
                    }</p>
                </div>
            `
        )
        .join("");
    }
  }

  // Update Full Page List (If active)
  const pageList = document.getElementById("notification-list");
  if (pageList) {
    const search =
      document.getElementById("notification-search")?.value.toLowerCase() || "";

    let filtered = mockNotifications.filter((n) => {
      const matchesSearch =
        n.title.toLowerCase().includes(search) ||
        n.message.toLowerCase().includes(search);
      if (currentNotiFilter === "unread") return matchesSearch && !n.isRead;
      return matchesSearch;
    });

    const empty = document.getElementById("notification-empty");

    if (filtered.length === 0) {
      pageList.innerHTML = "";
      if (empty) empty.classList.remove("hidden");
    } else {
      if (empty) empty.classList.add("hidden");
      pageList.innerHTML = filtered
        .map(
          (n) => `
                <div class="relative group flex flex-col md:flex-row gap-4 p-4 rounded-2xl border transition-all duration-300 ${
                  n.isRead
                    ? "bg-white/40 border-white hover:bg-white/60"
                    : "bg-white border-blue-100 shadow-lg shadow-blue-100/20"
                }">
                    
                    <!-- Icon Box -->
                    <div class="w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center text-xl ${getTypeIconStyle(
                      n.type
                    )}">
                        <i class="fa-solid ${getTypeIcon(n.type)}"></i>
                    </div>

                    <!-- Content -->
                    <div class="flex-1 min-w-0 py-1">
                        <div class="flex justify-between items-start">
                             <div class="flex items-center gap-2 mb-1">
                                <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${getTypeBadgeStyle(
                                  n.type
                                )}">${getTypeName(n.type)}</span>
                                ${
                                  !n.isRead
                                    ? '<span class="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>'
                                    : ""
                                }
                             </div>
                             <span class="text-xs font-medium text-slate-400 flex-shrink-0">${
                               n.time
                             }</span>
                        </div>
                        
                        <h4 class="text-base font-bold text-slate-800 mb-1 ${
                          n.isRead ? "" : "text-blue-900"
                        }">${n.title}</h4>
                        <p class="text-sm text-slate-600 leading-relaxed">${
                          n.message
                        }</p>
                    </div>

                    <!-- Actions -->
                    <div class="flex md:flex-col gap-2 items-center md:justify-center border-t md:border-t-0 md:border-l border-slate-100 pt-3 md:pt-0 md:pl-4 mt-2 md:mt-0">
                        <button onclick="toggleNotificationRead(${
                          n.id
                        })" class="w-8 h-8 rounded-full flex items-center justify-center hover:bg-blue-50 transition text-slate-400 hover:text-blue-600" title="${
            n.isRead ? "Đánh dấu chưa đọc" : "Đánh dấu đã đọc"
          }">
                            <i class="fa-regular ${
                              n.isRead ? "fa-envelope" : "fa-envelope-open"
                            }"></i>
                        </button>
                        <button onclick="deleteNotification(${
                          n.id
                        })" class="w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-50 transition text-slate-400 hover:text-red-500" title="Xóa thông báo">
                            <i class="fa-regular fa-trash-can"></i>
                        </button>
                    </div>
                </div>
            `
        )
        .join("");
    }
  }
}

function filterNotifications(type) {
  currentNotiFilter = type;

  // Update Filter Buttons UI
  document.querySelectorAll(".noti-filter-btn").forEach((btn) => {
    btn.classList.remove("bg-white", "shadow-sm", "text-blue-600");
    btn.classList.add("text-slate-500");
  });

  const activeBtn = document.getElementById(`filter-noti-${type}`);
  if (activeBtn) {
    activeBtn.classList.add("bg-white", "shadow-sm", "text-blue-600");
    activeBtn.classList.remove("text-slate-500");
  }

  renderNotifications();
}

function toggleNotificationRead(id) {
  const noti = mockNotifications.find((n) => n.id === id);
  if (noti) {
    noti.isRead = !noti.isRead;
    renderNotifications();
    showToast(
      noti.isRead ? "Đã đánh dấu đã đọc" : "Đã đánh dấu chưa đọc",
      "info"
    );
  }
}

function markAllNotificationsRead() {
  mockNotifications.forEach((n) => (n.isRead = true));
  renderNotifications();
  showToast("Đã đánh dấu tất cả là đã đọc", "success");
}

function deleteNotification(id) {
    confirmActionModal(
        "Xóa thông báo?",
        "Bạn có chắc muốn xóa thông báo này khỏi danh sách không?",
        () => {
            mockNotifications = mockNotifications.filter(n => n.id !== id);
            renderNotifications();
            showToast("Đã xóa thông báo", "info");
        },
        "Xóa",
        "bg-red-500"
    );
}

function viewNotificationDetail(id) {
  toggleNotificationRead(id);
  switchTab("notifications_view");
  // Optionally scroll to item
}

function selectFeedbackCourse(el, value) {
  // Deselect all
  document.querySelectorAll(".course-select-card").forEach((card) => {
    card.classList.remove(
      "bg-blue-50",
      "border-blue-500",
      "ring-1",
      "ring-blue-500"
    );
    card.classList.add("bg-white", "border-slate-200");

    const check = card.querySelector(".check-icon");
    if (check) {
      check.classList.remove("bg-blue-500", "border-blue-500", "text-white");
      check.classList.add("border-slate-200", "text-transparent");
    }
  });

  // Select clicked
  el.classList.remove("bg-white", "border-slate-200");
  el.classList.add("bg-blue-50", "border-blue-500", "ring-1", "ring-blue-500");

  const check = el.querySelector(".check-icon");
  if (check) {
    check.classList.remove("border-slate-200", "text-transparent");
    check.classList.add("bg-blue-500", "border-blue-500", "text-white");
  }

  // Update hidden input
  const input = document.getElementById("selected-feedback-course");
  if (input) input.value = value;
}

// Helpers for UI Styling
function getTypeIcon(type) {
  const map = {
    schedule: "fa-calendar-days",
    cancel: "fa-calendar-xmark",
    feedback: "fa-comments",
    system: "fa-server",
    deadline: "fa-clock",
    grade: "fa-graduation-cap",
  };
  return map[type] || "fa-bell";
}

function getTypeName(type) {
  const map = {
    schedule: "Lịch học",
    cancel: "Hủy lớp",
    feedback: "Phản hồi",
    system: "Hệ thống",
    deadline: "Hạn nộp",
    grade: "Điểm số",
  };
  return map[type] || "Thông báo";
}

function getTypeColor(type) {
  if (type === "cancel" || type === "deadline") return "text-red-500";
  if (type === "feedback" || type === "grade") return "text-green-500";
  return "text-blue-500";
}

function getTypeIconStyle(type) {
  if (type === "cancel" || type === "deadline")
    return "bg-red-100 text-red-500";
  if (type === "feedback" || type === "grade")
    return "bg-green-100 text-green-500";
  if (type === "system") return "bg-slate-100 text-slate-500";
  return "bg-blue-100 text-blue-500";
}

function getTypeBadgeStyle(type) {
  if (type === "cancel" || type === "deadline")
    return "bg-red-50 text-red-600 border border-red-100";
  if (type === "feedback" || type === "grade")
    return "bg-green-50 text-green-600 border border-green-100";
  if (type === "system")
    return "bg-slate-50 text-slate-600 border border-slate-100";
  return "bg-blue-50 text-blue-600 border border-blue-100";
}

function onRoleChange() {
  const roleSelect = document.getElementById("role-select");
  const usernameInput = document.getElementById("login-username");
  const passwordInput = document.getElementById("login-password");

  if (!roleSelect || !usernameInput || !passwordInput) return;

  const selectedRole = roleSelect.value;
  let username = "";
  let password = "hcmut"; // Default password for all demo roles

  switch (selectedRole) {
    case "student":
      username = "hcmut_student";
      break;
    case "tutor":
      username = "hcmut_tutor";
      break;
    case "department":
      username = "hcmut_dept";
      break;
    case "academic":
      username = "hcmut_academic";
      break;
    case "admin":
      username = "hcmut_admin";
      break;
    default:
      username = "hcmut_member";
      break;
  }

  usernameInput.value = username;
  passwordInput.value = password;
}

// Placeholder function for rendering cancellation rules
function renderCancellationRules() {
  // In a real application, this would fetch rules from a backend and render them
  // For this demo, the rules are statically defined in partial/cancellation_rules.html
  // No dynamic rendering needed here, but the function ensures the tab can be switched to.
  console.log("Rendering Cancellation Rules view.");
}
