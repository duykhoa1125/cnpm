/**
 * Main Entry Point
 * HCMUT Learning Management System
 *
 * This file imports and initializes all modules.
 * The application is organized into the following modules:
 *
 * - config.js: Global state and mock data
 * - ui.js: UI utilities (toast, modal, dropdown)
 * - auth.js: Authentication (login, logout, role management)
 * - navigation.js: Tab switching, sidebar, breadcrumbs
 * - charts.js: Chart.js initialization
 * - feedback.js: Feedback management
 * - library.js: Library/materials management
 * - notifications.js: Notification system
 * - progress.js: Progress tracking
 * - courses.js: Course management
 * - profile.js: Profile management
 * - admin.js: Admin system functions
 * - bonus-session.js: Bonus session management
 * - cancellation.js: Course cancellation logic
 */

// Import all modules
import "./modules/config.js";
import {
  showToast,
  setButtonLoading,
  confirmActionModal,
  closeConfirmationModal,
  setupCustomSelect,
  setRating,
  toggleSidebar,
  toggleNotifications,
  openMaterialModal,
  closeMaterialModal,
  openUploadModal,
  closeUploadModal,
  handleFileSelect,
  handleImagePreview,
} from "./modules/ui.js";

import {
  handleLogin,
  logout,
  onRoleChange,
  initAuth,
  applyLoginState,
} from "./modules/auth.js";

import {
  switchTab,
  generateSidebar,
  updateBreadcrumbs,
  updateDashboardGreeting,
} from "./modules/navigation.js";

import {
  initAdminCharts,
  initTutorCharts,
  initDeptCharts,
  initAcademicCharts,
  destroyAllCharts,
} from "./modules/charts.js";

import {
  renderTutorFeedback,
  filterTutorFeedback,
  renderAdminFeedback,
  filterAdminFeedback,
  submitFeedback,
  selectFeedbackCourse,
  exportFeedback,
} from "./modules/feedback.js";

import {
  renderLibrary,
  filterLibrary,
  filterLibraryByType,
  resetLibraryFilter,
  openLibraryMaterial,
} from "./modules/library.js";

import {
  renderNotifications,
  filterNotifications,
  toggleNotificationRead,
  markAllNotificationsRead,
  deleteNotification,
  viewNotificationDetail,
  openCreateNotificationModal,
  closeCreateNotificationModal,
  toggleScheduleTime,
  submitCreateNotification,
} from "./modules/notifications.js";

import {
  renderTutorProgress,
  filterProgressTable,
  renderAdminProgress,
  exportProgressToCSV,
} from "./modules/progress.js";

import {
  renderTutorCourses,
  toggleTutorClassDetail,
  switchDetailTab,
  exportClassData,
  submitUpload,
  registerCourse,
  confirmRegistration,
  viewAllSchedule,
  enterClass,
  searchCourses,
  viewDetailedReport,
  toggleClassDetails,
  saveTutorSchedule,
  openSaveScheduleModal,
  closeSaveScheduleModal,
  confirmSaveSchedule,
  openAssignmentModal,
  closeAssignmentModal,
  openForumModal,
  closeForumModal,
  submitForumReply,
  renderStudentCourses,
} from "./modules/courses.js";

import {
  toggleProfileEdit,
  updateProfile,
  toggleTutorProfileEdit,
  updateTutorProfile,
} from "./modules/profile.js";

import {
  renderAdminSystem,
  renderSystemLogs,
  simulateSync,
  simulateAdjust,
  simulateStatus,
  clearSystemLogs,
  exportSystemLogs,
  renderUserTable,
  addUser,
  editUser,
  deleteUser,
  triggerBackup,
  restoreBackup,
} from "./modules/admin.js";

import {
  submitBonusSession,
  onBonusScopeChange,
  updateBonusPreview,
  renderBonusSessions,
  renderBonusRsvps,
  sendBonusNotification,
  changeRsvpStatus,
  initBonusModule,
} from "./modules/bonus-session.js";

import {
  cancelCourse,
  closeCancellationModal,
  processCancellation,
  renderCourseCancellationRules,
  addCancellationRule,
  editCancellationRule,
  deleteCancellationRule,
  filterProgressBySemester,
} from "./modules/cancellation.js";

import {
  downloadAcademicReport,
  viewLibraryMaterial,
  downloadLibraryMaterial,
  uploadLibraryMaterial,
  viewFullSchedule,
  viewGPADetails,
  viewCreditDetails,
  viewTrainingScoreDetails,
  sendAutomatedReminder,
  exportStudentReport,
} from "./modules/dashboard-utils.js";

import {
  scrollToMatchingForm,
  startAIMatching,
  resetAIMatching,
  connectWithTutor,
} from "./modules/ai-matching.js";

import {
  renderUtilities,
  addQuizRow,
  removeQuizRow,
  calculateQuizProgress,
  switchPomodoroMode,
  togglePomodoro,
  resetPomodoro,
  addTodo,
  deleteTodo,
  toggleTodoStatus,
  openTodoModal,
  closeTodoModal,
  updateTodoContent,
  insertFormat,
  confirmDeleteTodo,
  closeDeleteModal,
} from "./modules/utilities.js";

// Make all functions globally available for HTML onclick handlers
// UI Functions
window.showToast = showToast;
window.setButtonLoading = setButtonLoading;
window.confirmActionModal = confirmActionModal;
window.closeConfirmationModal = closeConfirmationModal;
window.setRating = setRating;
window.toggleSidebar = toggleSidebar;
window.toggleNotifications = toggleNotifications;
window.openMaterialModal = openMaterialModal;
window.closeMaterialModal = closeMaterialModal;
window.openUploadModal = openUploadModal;
window.closeUploadModal = closeUploadModal;
window.handleFileSelect = handleFileSelect;
window.handleImagePreview = handleImagePreview;

// Auth Functions
window.handleLogin = handleLogin;
window.logout = logout;
window.onRoleChange = onRoleChange;

// Navigation Functions
window.switchTab = switchTab;

// Feedback Functions
window.filterTutorFeedback = filterTutorFeedback;
window.filterAdminFeedback = filterAdminFeedback;
window.submitFeedback = submitFeedback;
window.selectFeedbackCourse = selectFeedbackCourse;
window.exportFeedback = exportFeedback;

// Library Functions
window.filterLibrary = filterLibrary;
window.filterLibraryByType = filterLibraryByType;
window.resetLibraryFilter = resetLibraryFilter;
window.openLibraryMaterial = openLibraryMaterial;

// Notification Functions
window.filterNotifications = filterNotifications;
window.toggleNotificationRead = toggleNotificationRead;
window.markAllNotificationsRead = markAllNotificationsRead;
window.deleteNotification = deleteNotification;
window.viewNotificationDetail = viewNotificationDetail;
window.openCreateNotificationModal = openCreateNotificationModal;
window.closeCreateNotificationModal = closeCreateNotificationModal;
window.toggleScheduleTime = toggleScheduleTime;
window.submitCreateNotification = submitCreateNotification;

// Progress Functions
window.renderTutorProgress = renderTutorProgress;
window.filterProgressTable = filterProgressTable;
window.exportProgressToCSV = exportProgressToCSV;

// Course Functions
window.toggleTutorClassDetail = toggleTutorClassDetail;
window.switchDetailTab = switchDetailTab;
window.exportClassData = exportClassData;
window.submitUpload = submitUpload;
window.registerCourse = registerCourse;
window.confirmRegistration = confirmRegistration;
window.viewAllSchedule = viewAllSchedule;
window.enterClass = enterClass;
window.searchCourses = searchCourses;
window.viewDetailedReport = viewDetailedReport;
window.toggleClassDetails = toggleClassDetails;
window.saveTutorSchedule = saveTutorSchedule;
window.openSaveScheduleModal = openSaveScheduleModal;
window.closeSaveScheduleModal = closeSaveScheduleModal;
window.confirmSaveSchedule = confirmSaveSchedule;
window.openAssignmentModal = openAssignmentModal;
window.closeAssignmentModal = closeAssignmentModal;
window.openForumModal = openForumModal;
window.closeForumModal = closeForumModal;
window.submitForumReply = submitForumReply;
window.openScheduleModal = () =>
  document.getElementById("schedule-modal").classList.remove("hidden");

// Profile Functions
window.toggleProfileEdit = toggleProfileEdit;
window.updateProfile = updateProfile;
window.toggleTutorProfileEdit = toggleTutorProfileEdit;
window.updateTutorProfile = updateTutorProfile;

// Admin Functions
window.renderSystemLogs = renderSystemLogs;
window.simulateSync = simulateSync;
window.simulateAdjust = simulateAdjust;
window.simulateStatus = simulateStatus;
window.clearSystemLogs = clearSystemLogs;
window.exportSystemLogs = exportSystemLogs;
window.addUser = addUser;
window.editUser = editUser;
window.deleteUser = deleteUser;
window.triggerBackup = triggerBackup;
window.restoreBackup = restoreBackup;

// Bonus Session Functions
window.submitBonusSession = submitBonusSession;
window.onBonusScopeChange = onBonusScopeChange;
window.updateBonusPreview = updateBonusPreview;
window.sendBonusNotification = sendBonusNotification;
window.changeRsvpStatus = changeRsvpStatus;

// Cancellation Functions
window.cancelCourse = cancelCourse;
window.closeCancellationModal = closeCancellationModal;
window.processCancellation = processCancellation;
window.addCancellationRule = addCancellationRule;
window.editCancellationRule = editCancellationRule;
window.deleteCancellationRule = deleteCancellationRule;
window.filterProgressBySemester = filterProgressBySemester;

// Dashboard Utilities
window.downloadAcademicReport = downloadAcademicReport;
window.viewLibraryMaterial = viewLibraryMaterial;
window.downloadLibraryMaterial = downloadLibraryMaterial;
window.uploadLibraryMaterial = uploadLibraryMaterial;
window.viewFullSchedule = viewFullSchedule;
window.viewGPADetails = viewGPADetails;
window.viewCreditDetails = viewCreditDetails;
window.viewTrainingScoreDetails = viewTrainingScoreDetails;
window.sendAutomatedReminder = sendAutomatedReminder;
window.exportStudentReport = exportStudentReport;

// AI Tutor Matching Functions
window.scrollToMatchingForm = scrollToMatchingForm;
window.startAIMatching = startAIMatching;
window.resetAIMatching = resetAIMatching;
window.connectWithTutor = connectWithTutor;

// Utilities Functions
window.renderUtilities = renderUtilities;
window.addQuizRow = addQuizRow;
window.removeQuizRow = removeQuizRow;
window.calculateQuizProgress = calculateQuizProgress;
window.switchPomodoroMode = switchPomodoroMode;
window.togglePomodoro = togglePomodoro;
window.resetPomodoro = resetPomodoro;
window.addTodo = addTodo;
window.deleteTodo = deleteTodo;
window.toggleTodoStatus = toggleTodoStatus;
window.openTodoModal = openTodoModal;
window.closeTodoModal = closeTodoModal;
window.updateTodoContent = updateTodoContent;
window.insertFormat = insertFormat;
window.confirmDeleteTodo = confirmDeleteTodo;
window.closeDeleteModal = closeDeleteModal;

// Initialize Application when partials are loaded
document.addEventListener("partialsLoaded", () => {
  console.log("🚀 HCMUT LMS Initializing...");

  // Initialize Auth (handles login form setup and session restore)
  initAuth();

  // Initialize Bonus Module
  initBonusModule();

  // Initialize Notifications
  renderNotifications();

  // Initialize Student Courses
  if (window.renderStudentCourses) window.renderStudentCourses();

  // Initialize Student Chart
  const userRole = localStorage.getItem("currentUserRole");
  if (userRole === "student") {
    setTimeout(() => {
      import("./modules/charts.js").then((module) => {
        if (module.initStudentGPAChart) module.initStudentGPAChart();
      });
    }, 500);
  }

  // Setup Feedback Select
  const feedbackSelect = document.querySelector("#feedback_student select");
  if (feedbackSelect) {
    if (!feedbackSelect.id) feedbackSelect.id = "feedback-select-unique";
    setupCustomSelect(feedbackSelect.id);
  }

  // Setup Bonus Session Modal Select
  const bonusSelect = document.querySelector("#bonus-session-modal select");
  if (bonusSelect) {
    if (!bonusSelect.id) bonusSelect.id = "bonus-select-unique";
    setupCustomSelect(bonusSelect.id);
  }

  console.log("✅ HCMUT LMS Ready!");
});

// Export for external access if needed
export { showToast, switchTab, handleLogin, logout };
