/**
 * Application State Module
 * Contains global state variables and chart references
 */

// Current User Role
export let currentUserRole = "student";

export function setCurrentUserRole(role) {
  currentUserRole = role;
}

// Chart References
export let trafficChart = null;
export let userChart = null;
export let tutorStudentChart = null;
export let tutorProgressChart = null;
export let adminDeptChart = null;
export let adminGradeChart = null;

// Chart Initialization Flags
export let adminChartInited = false;
export let tutorChartInited = false;

// Chart Setters
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
