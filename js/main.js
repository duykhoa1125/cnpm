let currentUserRole = "student";
let trafficChart = null;
let userChart = null;
let tutorStudentChart = null;
let adminChartInited = false;
let tutorChartInited = false;

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
  trigger.className =
    "custom-select-trigger w-full p-4 bg-white/50 border border-white rounded-xl cursor-pointer flex justify-between items-center text-slate-700 font-bold shadow-sm hover:bg-white/80 transition-all";

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
                <div class="flex items-center">${initialIcon}<span class="text-base">${
    selectedOption ? selectedOption.text : ""
  }</span></div>
                <i class="fa-solid fa-chevron-down text-slate-400 transition-transform duration-300"></i>
            `;
  wrapper.appendChild(trigger);

  // Create Options Container
  const optionsContainer = document.createElement("div");
  optionsContainer.className = "custom-select-options custom-scroll";

  Array.from(select.options).forEach((option) => {
    const optionDiv = document.createElement("div");
    optionDiv.className = `custom-option ${option.selected ? "selected" : ""}`;
    const icon = icons[option.value]
      ? `<i class="fa-solid ${
          icons[option.value]
        } text-lg w-6 text-center"></i>`
      : "";
    optionDiv.innerHTML = `${icon}<span class="flex-1">${option.text}</span>`;
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
                        <div class="flex items-center">${newIcon}<span class="text-base">${option.text}</span></div>
                        <i class="fa-solid fa-chevron-down text-slate-400 transition-transform duration-300"></i>
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
});

const roleMenus = {
  student: [
    { id: "dashboard_student", icon: "fa-chart-pie", text: "Tổng quan" },
    { id: "courses_student", icon: "fa-book-open", text: "Môn học" },
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
    { id: "profile_tutor", icon: "fa-user-tie", text: "Hồ sơ Tutor" },
  ],
  admin: [
    { id: "dashboard_admin", icon: "fa-gauge-high", text: "Dashboard" },
    { id: "system_admin", icon: "fa-gears", text: "Hệ thống & Logs" },
  ],
};

function handleLogin(e) {
  e.preventDefault();
  currentUserRole = document.getElementById("role-select").value;
  const username = document.getElementById("login-username").value;

  document
    .querySelectorAll(".user-name-display")
    .forEach((el) => (el.innerText = username));
  document
    .querySelectorAll(".user-role-display")
    .forEach((el) => (el.innerText = currentUserRole.toUpperCase()));
  document.getElementById("portal-badge").innerText =
    currentUserRole.toUpperCase();

  generateSidebar(currentUserRole);
  document.getElementById("login-screen").classList.add("hidden");
  document.getElementById("main-app").classList.remove("hidden");
  document.getElementById("main-app").classList.add("flex");

  const dashboardId =
    currentUserRole === "admin"
      ? "dashboard_admin"
      : currentUserRole === "tutor"
      ? "dashboard_tutor"
      : "dashboard_student";
  switchTab(dashboardId);
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
}

function logout() {
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

// Helper functions (register, cancel, toggle, modal, charts...)
function registerCourse() {
  switchTab("student_register");
}
function cancelCourse(name) {
  if (confirm("Hủy môn?")) alert("Đã hủy " + name);
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
  /* ... */
}
function updateProfile(e) {
  e.preventDefault();
  alert("Saved!");
}

function toggleTutorProfileEdit() {
  document.getElementById("tutor-view-mode").classList.toggle("hidden");
  document.getElementById("tutor-edit-mode").classList.toggle("hidden");
}
function updateTutorProfile(e) {
  e.preventDefault();
  alert("Thông tin Tutor đã được cập nhật!");
  toggleTutorProfileEdit();
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

  if (ratingText) {
    ratingText.innerText = `Đánh giá: ${n} sao`;
    ratingText.classList.remove("text-slate-400");
    ratingText.classList.add("text-slate-600");
  }
}

function initAdminCharts() {
  if (trafficChart) trafficChart.destroy();
  if (userChart) userChart.destroy();

  trafficChart = new Chart(document.getElementById("trafficChart"), {
    type: "line",
    data: {
      labels: ["M", "T", "W", "T", "F", "S", "S"],
      datasets: [
        {
          label: "Req",
          data: [10, 20, 15, 25, 30, 40, 50],
          borderColor: "#3b82f6",
        },
      ],
    },
  });
  userChart = new Chart(document.getElementById("userChart"), {
    type: "bar",
    data: {
      labels: ["J", "F", "M", "A"],
      datasets: [
        {
          label: "Users",
          data: [50, 80, 120, 150],
          backgroundColor: "#6366f1",
        },
      ],
    },
  });
  adminChartInited = true;
}
function initTutorCharts() {
  if (tutorStudentChart) tutorStudentChart.destroy();

  tutorStudentChart = new Chart(document.getElementById("tutorStudentChart"), {
    type: "bar",
    data: {
      labels: ["A", "B", "C", "D"],
      datasets: [
        {
          label: "SV",
          data: [10, 15, 5, 2],
          backgroundColor: "#22c55e",
        },
      ],
    },
  });
  tutorChartInited = true;
}
