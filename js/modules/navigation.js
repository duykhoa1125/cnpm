/**
 * Navigation Module
 * Handles tab switching, sidebar, and breadcrumbs
 */

import { roleMenus, breadcrumbMap } from "./config.js";
import {
  initAdminCharts,
  initTutorCharts,
  initDeptCharts,
  initAcademicCharts,
  initStudentGPAChart,
} from "./charts.js";
import { renderTutorCourses } from "./courses.js";
import { renderNotifications } from "./notifications.js";
import { renderCourseCancellationRules } from "./cancellation.js";
import {
  renderTutorFeedback,
  renderAdminFeedback,
  initStudentFeedback,
} from "./feedback.js";
import { renderAdminSystem } from "./admin.js";
import { renderLibrary } from "./library.js";
import { renderAdminProgress } from "./progress.js";
import { renderBonusSessions, renderBonusRsvps } from "./bonus-session.js";

// Generate Sidebar based on role
export function generateSidebar(role) {
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

// Switch Tab
export function switchTab(tabId) {
  document
    .querySelectorAll(".section-view")
    .forEach((el) => el.classList.remove("active"));
  const target = document.getElementById(tabId);
  if (target) target.classList.add("active");

  document.querySelectorAll(".nav-item").forEach((el) => {
    el.classList.toggle("active", el.dataset.target === tabId);
  });

  // Initialize specific views
  if (tabId === "dashboard_student") initStudentGPAChart();
  if (tabId === "dashboard_admin") initAdminCharts();
  if (tabId === "dashboard_tutor") initTutorCharts();
  if (tabId === "courses_tutor") renderTutorCourses();
  if (tabId === "dashboard_department") initDeptCharts();
  if (tabId === "dashboard_academic") initAcademicCharts();
  if (tabId === "notifications_view") renderNotifications();
  if (tabId === "course_cancellation_rules") renderCourseCancellationRules();
  if (tabId === "feedback_view_tutor") renderTutorFeedback();
  if (tabId === "feedback_view_admin") renderAdminFeedback();
  if (tabId === "system_admin") renderAdminSystem();
  if (tabId === "library_view") renderLibrary();
  if (tabId === "progress_admin") renderAdminProgress();
  if (tabId === "tutor_schedule") {
    renderBonusSessions();
    renderBonusRsvps();
  }
  if (tabId === "feedback_student") initStudentFeedback();

  updateBreadcrumbs(tabId);

  // Save active tab
  localStorage.setItem("activeTab", tabId);
}

// Update Breadcrumbs
export function updateBreadcrumbs(tabId) {
  const container = document.getElementById("breadcrumb-container");
  const breadcrumbList = document.getElementById("breadcrumb-list");
  const pageTitle = document.getElementById("page-title");

  if (!container || !breadcrumbList) return;

  const path = breadcrumbMap[tabId];

  if (path && path.length > 0) {
    // Update Breadcrumbs UI
    breadcrumbList.innerHTML = path
      .map((item, index) => {
        const isLast = index === path.length - 1;
        const navigateToId = item.id || tabId;

        return `
                <li class="flex items-center">
                    <a href="#" onclick="${
                      isLast
                        ? "event.preventDefault()"
                        : `switchTab('${navigateToId}')`
                    }" 
                       class="${
                         isLast
                           ? "text-slate-800 cursor-default font-bold"
                           : "text-slate-500 hover:text-blue-600"
                       } flex items-center gap-1 transition text-xs">
                        ${
                          item.icon
                            ? `<i class="fa-solid ${item.icon}"></i>`
                            : ""
                        }
                        <span>${item.label}</span>
                    </a>
                    ${
                      !isLast
                        ? '<i class="fa-solid fa-chevron-right text-slate-300 text-[10px] mx-1"></i>'
                        : ""
                    }
                </li>
            `;
      })
      .join("");
    container.classList.remove("hidden");

    // Update Page Title Header
    if (pageTitle) {
      const currentItem = path[path.length - 1];
      pageTitle.innerText = currentItem.label;
    }
  } else {
    container.classList.add("hidden");
  }
}

// Update Dashboard Greeting
export function updateDashboardGreeting() {
  const hour = new Date().getHours();
  let greeting = "Chào";
  if (hour < 12) greeting = "Chào buổi sáng";
  else if (hour < 18) greeting = "Chào buổi chiều";
  else greeting = "Chào buổi tối";

  const greetingEl = document.querySelector("#dashboard_student h2 + p");
  if (greetingEl && greetingEl.innerHTML.includes("Chào mừng")) {
    const userSpan = greetingEl.querySelector("span")
      ? greetingEl.querySelector("span").outerHTML
      : `<span class="user-name-display font-bold text-blue-600">Sinh viên</span>`;
    greetingEl.innerHTML = `${greeting}, ${userSpan}!`;
  }
}

// Make functions globally available
window.switchTab = switchTab;
window.generateSidebar = generateSidebar;
