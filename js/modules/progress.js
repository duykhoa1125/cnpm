/**
 * Progress Module
 * Handles progress tracking and reporting
 */

import { mockStudentProgress } from "./config.js";
import { showToast } from "./ui.js";
import {
  createTutorProgressChart,
  createAdminProgressCharts,
} from "./charts.js";

// GPA Conversion Helper
function convertToGPA(score10) {
  if (score10 < 4.0) return 0.0;
  if (score10 < 5.5) return 1.0;
  if (score10 < 7.0) return 2.0;
  if (score10 < 8.5) return 3.0;
  return 4.0;
}

// Render Tutor Progress View
export function renderTutorProgress() {
  const courseName = document.getElementById("progress-course-select").value;
  let students = mockStudentProgress.filter((s) => s.course === courseName);

  // Update Stats
  const size = students.length;
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

  filterProgressTable();

  // Calculate distribution for chart
  const scores = students.map((s) => s.midterm * 0.3 + s.final * 0.7);
  const distribution = [0, 0, 0, 0, 0];

  scores.forEach((s) => {
    if (s < 4.0) distribution[0]++;
    else if (s < 5.5) distribution[1]++;
    else if (s < 7.0) distribution[2]++;
    else if (s < 8.5) distribution[3]++;
    else distribution[4]++;
  });

  createTutorProgressChart(distribution);
}

// Filter Progress Table
export function filterProgressTable() {
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

// Render Admin Progress View
export function renderAdminProgress() {
  createAdminProgressCharts();
}

// Export Progress to CSV
export function exportProgressToCSV(sectionId) {
  const section = document.getElementById(sectionId);
  if (!section) {
    showToast("Không tìm thấy phần tiến độ", "error");
    return;
  }

  const rows = section.querySelectorAll(".progress-row");
  if (!rows || rows.length === 0) {
    showToast("Không có dữ liệu tiến độ để xuất", "error");
    return;
  }

  const lines = [];
  lines.push(["MSSV", "Ho va ten", "Tien do (%)"].join(","));

  const escape = (s) => '"' + String(s).replace(/"/g, '""') + '"';

  rows.forEach((r) => {
    const name =
      r.dataset.name ||
      (r.querySelector(".text-xs")
        ? r.querySelector(".text-xs").textContent.trim()
        : "");
    const mssv =
      r.dataset.mssv ||
      (r.querySelector(".text-[10px]")
        ? r
            .querySelector(".text-[10px]")
            .textContent.replace("MSSV:", "")
            .trim()
        : "");
    const percent =
      r.dataset.percent ||
      (r.querySelector(".text-right")
        ? r.querySelector(".text-right").textContent.replace("%", "").trim()
        : "");
    lines.push([mssv, name, percent].map(escape).join(","));
  });

  const csv = lines.join("\r\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  const now = new Date();
  const date = now.toISOString().slice(0, 10);
  a.href = url;
  a.download = `progress_${sectionId}_${date}.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  showToast("Đã tải xuống file tiến độ", "success");
}

// Make functions globally available
window.renderTutorProgress = renderTutorProgress;
window.filterProgressTable = filterProgressTable;
window.exportProgressToCSV = exportProgressToCSV;
