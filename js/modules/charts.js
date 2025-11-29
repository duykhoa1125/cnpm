/**
 * Charts Module
 * All Chart.js initialization and management
 */

import {
  trafficChart,
  userChart,
  tutorStudentChart,
  tutorProgressChart,
  adminDeptChart,
  adminGradeChart,
  adminChartInited,
  tutorChartInited,
  setTrafficChart,
  setUserChart,
  setTutorStudentChart,
  setTutorProgressChart,
  setAdminDeptChart,
  setAdminGradeChart,
  setAdminChartInited,
  setTutorChartInited,
} from "./config.js";

// Destroy all charts (used during logout)
export function destroyAllCharts() {
  if (trafficChart) {
    trafficChart.destroy();
    setTrafficChart(null);
  }
  if (userChart) {
    userChart.destroy();
    setUserChart(null);
  }
  if (tutorStudentChart) {
    tutorStudentChart.destroy();
    setTutorStudentChart(null);
  }
  if (tutorProgressChart) {
    tutorProgressChart.destroy();
    setTutorProgressChart(null);
  }
  if (adminDeptChart) {
    adminDeptChart.destroy();
    setAdminDeptChart(null);
  }
  if (adminGradeChart) {
    adminGradeChart.destroy();
    setAdminGradeChart(null);
  }
  setAdminChartInited(false);
  setTutorChartInited(false);
}

// Initialize Admin Dashboard Charts
export function initAdminCharts() {
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

  const newTrafficChart = new Chart(document.getElementById("trafficChart"), {
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
  setTrafficChart(newTrafficChart);

  const newUserChart = new Chart(document.getElementById("userChart"), {
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
  setUserChart(newUserChart);
  setAdminChartInited(true);
}

// Initialize Tutor Dashboard Charts
export function initTutorCharts() {
  if (tutorStudentChart) tutorStudentChart.destroy();

  const newChart = new Chart(document.getElementById("tutorStudentChart"), {
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
  setTutorStudentChart(newChart);
  setTutorChartInited(true);
}

// Initialize Department Charts
export function initDeptCharts() {
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

// Initialize Academic Charts
export function initAcademicCharts() {
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

// Create Tutor Progress Chart
export function createTutorProgressChart(distribution) {
  if (tutorProgressChart) tutorProgressChart.destroy();

  const ctx = document.getElementById("classScoreChart");
  if (ctx) {
    const newChart = new Chart(ctx, {
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
    setTutorProgressChart(newChart);
  }
}

// Create Admin Progress Charts
export function createAdminProgressCharts() {
  if (adminDeptChart) adminDeptChart.destroy();
  if (adminGradeChart) adminGradeChart.destroy();

  // Chart 1: Department Comparison
  const ctx1 = document.getElementById("deptComparisonChart");
  if (ctx1) {
    const newDeptChart = new Chart(ctx1, {
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
    setAdminDeptChart(newDeptChart);
  }

  // Chart 2: System Grade Distribution
  const ctx2 = document.getElementById("systemGradeDistChart");
  if (ctx2) {
    const newGradeChart = new Chart(ctx2, {
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
        plugins: { legend: { position: "right" } },
      },
    });
    setAdminGradeChart(newGradeChart);
  }
}
// Initialize Student Dashboard Charts
export function initStudentGPAChart() {
  const ctx = document.getElementById("studentGPAChart");
  if (ctx) {
    new Chart(ctx, {
      type: "line",
      data: {
        labels: ["HK221", "HK222", "HK231", "HK232", "HK241"],
        datasets: [
          {
            label: "GPA",
            data: [3.2, 3.4, 3.5, 3.55, 3.68],
            borderColor: "#3b82f6",
            backgroundColor: "rgba(59, 130, 246, 0.1)",
            tension: 0.4,
            fill: true,
            pointBackgroundColor: "#fff",
            pointBorderColor: "#3b82f6",
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            titleColor: "#1e293b",
            bodyColor: "#3b82f6",
            borderColor: "#e2e8f0",
            borderWidth: 1,
            padding: 10,
            displayColors: false,
            callbacks: {
              label: function (context) {
                return "GPA: " + context.parsed.y;
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: false,
            min: 2.0,
            max: 4.0,
            grid: { color: "#f1f5f9", borderDash: [5, 5] },
            ticks: { color: "#64748b", font: { size: 10, weight: "bold" } },
          },
          x: {
            grid: { display: false },
            ticks: { color: "#64748b", font: { size: 10, weight: "bold" } },
          },
        },
      },
    });
  }
}
