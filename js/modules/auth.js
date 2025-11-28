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

// Prevent multiple simultaneous login attempts
let isLoggingIn = false;

// Handle Login Form
export function handleLogin(e) {
  if (e) e.preventDefault();

  // Prevent multiple simultaneous submissions
  if (isLoggingIn) {
    console.warn("Login already in progress");
    return;
  }

  const btn = e.target.querySelector("button[type='submit']") || e.target;
  const roleSelect = document.getElementById("role-select");
  const usernameInput = document.getElementById("login-username");
  const passwordInput = document.getElementById("login-password");

  // Validate DOM elements exist
  if (!roleSelect || !usernameInput || !passwordInput) {
    console.error("Login form elements not found");
    showToast("Lỗi hệ thống. Vui lòng tải lại trang.", "error");
    return;
  }

  const username = usernameInput.value;
  const password = passwordInput.value;

  if (!username || !password) {
    showToast("Vui lòng nhập đầy đủ Tên đăng nhập và Mật khẩu.", "error");
    return;
  }

  isLoggingIn = true;
  setButtonLoading(btn, true);

  // Simulate API delay
  setTimeout(() => {
    try {
      // Validate Credentials
      const validPassword = "hcmut";
      let validUsername = "hcmut_member";

      switch (roleSelect.value) {
        case "student":
          validUsername = "hcmut_student";
          break;
        case "tutor":
          validUsername = "hcmut_tutor";
          break;
        case "department":
          validUsername = "hcmut_dept";
          break;
        case "academic":
          validUsername = "hcmut_academic";
          break;
        case "admin":
          validUsername = "hcmut_admin";
          break;
      }

      if (password !== validPassword || username !== validUsername) {
        showToast("Tên đăng nhập hoặc mật khẩu không đúng.", "error");
        setButtonLoading(btn, false);
        isLoggingIn = false;
        return;
      }

      setCurrentUserRole(roleSelect.value);

      // Safe localStorage operations
      try {
        localStorage.setItem("currentUserRole", roleSelect.value);
        localStorage.setItem("username", username);
      } catch (storageError) {
        console.error("localStorage error:", storageError);
        showToast("Cảnh báo: Không thể lưu phiên đăng nhập.", "warning");
      }

      applyLoginState(username, roleSelect.value);
      isLoggingIn = false;
    } catch (error) {
      console.error("Login error:", error);
      showToast("Có lỗi xảy ra khi đăng nhập. Vui lòng thử lại.", "error");
      setButtonLoading(btn, false);
      isLoggingIn = false;
    } finally {
      // Only stop loading if we haven't redirected/succeeded
      const loginScreen = document.getElementById("login-screen");
      if (loginScreen && !loginScreen.classList.contains("hidden")) {
        setButtonLoading(btn, false);
        isLoggingIn = false;
      }
    }
  }, 800);
}

// Toggle Password Visibility
export function togglePasswordVisibility() {
  const passwordInput = document.getElementById("login-password");
  const toggleIcon = document.getElementById("password-toggle-icon");

  if (!passwordInput || !toggleIcon) return;

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    toggleIcon.classList.remove("fa-eye");
    toggleIcon.classList.add("fa-eye-slash");
  } else {
    passwordInput.type = "password";
    toggleIcon.classList.remove("fa-eye-slash");
    toggleIcon.classList.add("fa-eye");
  }
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
  // Safe localStorage operations
  try {
    localStorage.removeItem("currentUserRole");
    localStorage.removeItem("username");
    localStorage.removeItem("activeTab");
  } catch (storageError) {
    console.error("localStorage error during logout:", storageError);
  }

  setCurrentUserRole("student");
  destroyAllCharts();

  const mainApp = document.getElementById("main-app");
  if (mainApp) {
    mainApp.classList.add("hidden");
    mainApp.classList.remove("flex");
  }

  const loginScreen = document.getElementById("login-screen");
  if (loginScreen) {
    loginScreen.classList.remove("hidden");
  }

  const usernameInput = document.getElementById("login-username");
  if (usernameInput) {
    usernameInput.value = "hcmut_student";
  }

  // Reset button loading state if it was stuck
  const btn = loginScreen?.querySelector("button[type='submit']");
  if (btn) {
    setButtonLoading(
      btn,
      false,
      `Đăng nhập <i class="fa-solid fa-arrow-right ml-2"></i>`
    );
  }

  // Reset login flag
  isLoggingIn = false;
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
window.togglePasswordVisibility = togglePasswordVisibility;
