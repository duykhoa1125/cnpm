/**
 * Utilities Module
 * Handles student utilities like GPA calculation and personal notes
 */

export function renderUtilities() {
  console.log("Rendering Utilities...");
  loadNote();
  // Add initial rows if empty (handled in HTML, but good to ensure)
}

export function addSubjectRow() {
  const tbody = document.getElementById("gpa-table-body");
  const row = document.createElement("tr");
  row.className = "group animate-fade-in";
  row.innerHTML = `
        <td class="bg-slate-50 rounded-l-xl border-y border-l border-slate-100 p-2">
            <input type="text" placeholder="Nhập tên môn..." class="w-full bg-transparent border-none focus:ring-0 p-0 text-sm placeholder-slate-400 font-medium text-slate-700">
        </td>
        <td class="bg-slate-50 border-y border-slate-100 p-2">
            <input type="number" min="1" max="10" value="3" onchange="calculateGPA()" class="w-full bg-white border border-slate-200 rounded-lg px-1 py-1 text-center focus:ring-2 focus:ring-blue-100 gpa-credit text-xs font-bold">
        </td>
        <td class="bg-slate-50 border-y border-slate-100 p-2">
            <input type="number" min="0" max="10" step="0.1" placeholder="0.0" onchange="calculateGPA()" class="w-full bg-white border border-slate-200 rounded-lg px-1 py-1 text-center focus:ring-2 focus:ring-blue-100 gpa-score text-xs font-bold text-blue-600">
        </td>
        <td class="bg-slate-50 rounded-r-xl border-y border-r border-slate-100 p-2 text-center">
            <button onclick="removeSubjectRow(this)" class="text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                <i class="fa-solid fa-xmark"></i>
            </button>
        </td>
    `;
  tbody.appendChild(row);
}

export function removeSubjectRow(btn) {
  const row = btn.closest("tr");
  if (document.querySelectorAll("#gpa-table-body tr").length > 1) {
    row.remove();
    calculateGPA(); // Recalculate after removal
  } else {
    // Clear inputs if it's the last row
    row
      .querySelectorAll("input")
      .forEach((input) => (input.value = input.type === "number" ? "" : ""));
    calculateGPA();
  }
}

export function calculateGPA() {
  const rows = document.querySelectorAll("#gpa-table-body tr");
  let totalCredits = 0;
  let totalScore = 0;
  let totalScore4 = 0;

  rows.forEach((row) => {
    const creditInput = row.querySelector(".gpa-credit");
    const scoreInput = row.querySelector(".gpa-score");

    const credit = parseFloat(creditInput.value) || 0;
    const score = parseFloat(scoreInput.value) || 0;

    // Convert 10-scale to 4-scale (Approximate HCMUT/Standard rule)
    let score4 = 0;
    if (score >= 8.5) score4 = 4.0;
    else if (score >= 8.0) score4 = 3.5;
    else if (score >= 7.0) score4 = 3.0;
    else if (score >= 6.5) score4 = 2.5;
    else if (score >= 5.5) score4 = 2.0;
    else if (score >= 5.0) score4 = 1.5;
    else if (score >= 4.0) score4 = 1.0;
    else score4 = 0;

    if (credit > 0 && score >= 0) {
      totalCredits += credit;
      totalScore += score * credit;
      totalScore4 += score4 * credit;
    }
  });

  const gpa =
    totalCredits > 0 ? (totalScore / totalCredits).toFixed(2) : "0.00";
  const gpa4 =
    totalCredits > 0 ? (totalScore4 / totalCredits).toFixed(2) : "0.00";

  document.getElementById("total-credits").textContent = totalCredits;
  document.getElementById("gpa-result").textContent = gpa;
  document.getElementById("gpa-4-result").textContent = gpa4;

  // Update Classification
  const classificationEl = document.getElementById("gpa-classification");
  let classification = "Chưa xếp loại";
  let colorClass = "bg-white/10 text-slate-300";

  if (totalCredits > 0) {
    const gpaVal = parseFloat(gpa);
    if (gpaVal >= 9.0) {
      classification = "Xuất sắc";
      colorClass = "bg-green-500 text-white";
    } else if (gpaVal >= 8.0) {
      classification = "Giỏi";
      colorClass = "bg-blue-500 text-white";
    } else if (gpaVal >= 7.0) {
      classification = "Khá";
      colorClass = "bg-cyan-500 text-white";
    } else if (gpaVal >= 5.0) {
      classification = "Trung bình";
      colorClass = "bg-orange-500 text-white";
    } else {
      classification = "Yếu";
      colorClass = "bg-red-500 text-white";
    }
  }

  classificationEl.textContent = classification;
  classificationEl.className = `px-2 py-0.5 rounded text-[10px] font-bold ${colorClass}`;
}

// Debounce function for auto-saving
let saveTimeout;
export function saveNote() {
  const status = document.getElementById("note-status");
  status.style.opacity = "0";

  clearTimeout(saveTimeout);
  saveTimeout = setTimeout(() => {
    const note = document.getElementById("personal-note").value;
    localStorage.setItem("student_personal_note", note);

    status.textContent = "Đã lưu";
    status.style.opacity = "1";
    setTimeout(() => {
      status.style.opacity = "0";
    }, 2000);
  }, 1000);
}

export function loadNote() {
  const note = localStorage.getItem("student_personal_note");
  if (note) {
    const textarea = document.getElementById("personal-note");
    if (textarea) {
      textarea.value = note;
    }
  }
}

// --- Pomodoro Timer Logic ---
let pomoInterval;
let pomoTime = 25 * 60; // Default 25 minutes
let pomoIsRunning = false;
let pomoMode = "focus"; // focus, short, long

export function switchPomodoroMode(mode) {
  pomoMode = mode;
  pomoIsRunning = false;
  clearInterval(pomoInterval);

  // Update UI Buttons
  document.getElementById(
    "pomo-btn-focus"
  ).className = `px-3 py-1 rounded-md text-xs font-bold transition-all ${
    mode === "focus"
      ? "bg-white text-rose-600 shadow-sm"
      : "text-white hover:bg-white/10"
  }`;
  document.getElementById(
    "pomo-btn-short"
  ).className = `px-3 py-1 rounded-md text-xs font-bold transition-all ${
    mode === "short"
      ? "bg-white text-rose-600 shadow-sm"
      : "text-white hover:bg-white/10"
  }`;
  document.getElementById(
    "pomo-btn-long"
  ).className = `px-3 py-1 rounded-md text-xs font-bold transition-all ${
    mode === "long"
      ? "bg-white text-rose-600 shadow-sm"
      : "text-white hover:bg-white/10"
  }`;

  // Set Time
  if (mode === "focus") pomoTime = 25 * 60;
  else if (mode === "short") pomoTime = 5 * 60;
  else if (mode === "long") pomoTime = 15 * 60;

  updatePomodoroDisplay();
  updatePomodoroButton();
}

export function togglePomodoro() {
  if (pomoIsRunning) {
    pausePomodoro();
  } else {
    startPomodoro();
  }
}

function startPomodoro() {
  if (pomoIsRunning) return;
  pomoIsRunning = true;
  updatePomodoroButton();

  pomoInterval = setInterval(() => {
    if (pomoTime > 0) {
      pomoTime--;
      updatePomodoroDisplay();
    } else {
      // Timer finished
      pausePomodoro();
      alert("Time's up!"); // Simple alert for now
      // Optionally play sound here
    }
  }, 1000);
}

function pausePomodoro() {
  pomoIsRunning = false;
  clearInterval(pomoInterval);
  updatePomodoroButton();
}

export function resetPomodoro() {
  pausePomodoro();
  if (pomoMode === "focus") pomoTime = 25 * 60;
  else if (pomoMode === "short") pomoTime = 5 * 60;
  else if (pomoMode === "long") pomoTime = 15 * 60;
  updatePomodoroDisplay();
}

function updatePomodoroDisplay() {
  const minutes = Math.floor(pomoTime / 60);
  const seconds = pomoTime % 60;
  const display = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
  document.getElementById("pomo-timer").textContent = display;
  document.title = `${display} - Pomodoro`; // Update browser tab title
}

function updatePomodoroButton() {
  const btn = document.getElementById("pomo-toggle");
  if (pomoIsRunning) {
    btn.innerHTML = '<i class="fa-solid fa-pause pl-1"></i>';
  } else {
    btn.innerHTML = '<i class="fa-solid fa-play pl-1"></i>';
  }
}
