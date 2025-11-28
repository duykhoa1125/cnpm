/**
 * Authentication Module
 * Handles login, logout, and role management
 */

import { currentUserRole, setCurrentUserRole, roleMenus } from "./config.js";
import { showToast, setButtonLoading, setupCustomSelect } from "./ui.js";
import {
  generateSidebar,
  switchTab,
  updateDashboardGreeting,
} from "./navigation.js";
import { destroyAllCharts } from "./charts.js";

// Handle Login Form
export function handleLogin(e) {
  if (e) e.preventDefault();
  const btn = e.target.querySelector("button[type='submit']") || e.target;
  const roleSelect = document.getElementById("role-select");
  const usernameInput = document.getElementById("login-username");
  const passwordInput = document.getElementById("login-password");

  const username = usernameInput.value;
  const password = passwordInput?.value;

  if (!username || !password) {
    showToast("Vui lòng nhập đầy đủ Tên đăng nhập và Mật khẩu.", "error");
    return;
  }

  setButtonLoading(btn, true);

  // Simulate API delay
  setTimeout(() => {
    setCurrentUserRole(roleSelect.value);
    localStorage.setItem("currentUserRole", roleSelect.value);
    localStorage.setItem("username", username);

    applyLoginState(username, roleSelect.value);
    setButtonLoading(btn, false);
  }, 800);
}

// Apply Login State
export function applyLoginState(username, role) {
  document
    .querySelectorAll(".user-name-display")
    .forEach((el) => (el.innerText = username));
  document
    .querySelectorAll(".user-role-display")
    .forEach((el) => (el.innerText = role.toUpperCase()));

  const portalBadge = document.getElementById("portal-badge");
  if (portalBadge) portalBadge.innerText = role.toUpperCase();

  // Update Greeting based on time
  updateDashboardGreeting();

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

// Logout
export function logout() {
  localStorage.removeItem("currentUserRole");
  localStorage.removeItem("username");
  localStorage.removeItem("activeTab");

  setCurrentUserRole("student");
  destroyAllCharts();

  document.getElementById("main-app").classList.add("hidden");
  document.getElementById("main-app").classList.remove("flex");
  document.getElementById("login-screen").classList.remove("hidden");
  document.getElementById("login-username").value = "hcmut_student";
}

// Role Change Handler (for login form)
export function onRoleChange() {
  const roleSelect = document.getElementById("role-select");
  const usernameInput = document.getElementById("login-username");
  const passwordInput = document.getElementById("login-password");

  if (!roleSelect || !usernameInput || !passwordInput) return;

  const selectedRole = roleSelect.value;
  let username = "";
  let password = "hcmut";

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

// Initialize Auth Module
export function initAuth() {
  // Login Role Select
  setupCustomSelect("role-select", {
    student: "fa-user-graduate",
    tutor: "fa-chalkboard-user",
    department: "fa-building-user",
    academic: "fa-university",
    admin: "fa-user-shield",
  });

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
}

// Make functions globally available
window.handleLogin = handleLogin;
window.logout = logout;
window.onRoleChange = onRoleChange;
