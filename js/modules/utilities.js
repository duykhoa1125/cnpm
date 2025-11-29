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
            <input type="number" min="1" max="10" value="3" onchange="calculateGPA()" class="w-full bg-white border border-slate-200 rounded-lg px-2 py-1 text-center focus:ring-2 focus:ring-blue-100 focus:border-blue-300 outline-none transition-all gpa-credit text-xs font-bold text-slate-600">
        </td>
        <td class="bg-slate-50 border-y border-slate-100 p-2">
            <input type="number" min="0" max="10" step="0.1" placeholder="0.0" onchange="calculateGPA()" class="w-full bg-white border border-slate-200 rounded-lg px-2 py-1 text-center focus:ring-2 focus:ring-blue-100 focus:border-blue-300 outline-none transition-all gpa-score text-xs font-bold text-blue-600">
        </td>
        <td class="bg-slate-50 rounded-r-xl border-y border-r border-slate-100 p-2 text-center">
            <button onclick="removeSubjectRow(this)" class="w-6 h-6 rounded-full hover:bg-red-50 text-slate-300 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100 flex items-center justify-center">
                <i class="fa-solid fa-xmark text-xs"></i>
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
// --- Notes Logic ---
// --- Todo List & Notes Logic ---
let todos = [];

export function loadNote() {
  const savedTodos = localStorage.getItem("student_todos");
  if (savedTodos) {
    todos = JSON.parse(savedTodos);
  } else {
    // Migrate old notes if exists
    const oldNotes = localStorage.getItem("student_notes");
    if (oldNotes) {
      const parsedNotes = JSON.parse(oldNotes);
      todos = parsedNotes.map((n) => ({
        id: n.id,
        content: n.content,
        isCompleted: false,
        color: n.color || "bg-white",
        tags: [],
      }));
      localStorage.removeItem("student_notes");
      saveTodos();
    }
  }
  renderTodos();
}

export function saveTodos() {
  localStorage.setItem("student_todos", JSON.stringify(todos));
}

export function renderTodos() {
  const container = document.getElementById("notes-container");
  if (!container) return;

  container.innerHTML = "";

  if (todos.length === 0) {
    container.innerHTML = `
            <div class="flex flex-col items-center justify-center h-40 text-slate-400">
                <i class="fa-solid fa-clipboard-check text-3xl mb-2"></i>
                <p class="text-xs">Chưa có công việc nào</p>
            </div>
        `;
    return;
  }

  // Sort: Incomplete first, then by date
  todos.sort((a, b) => {
    if (a.isCompleted === b.isCompleted) return b.id - a.id;
    return a.isCompleted ? 1 : -1;
  });

  todos.forEach((todo) => {
    const todoEl = document.createElement("div");
    const isDone = todo.isCompleted;
    todoEl.className = `p-3 rounded-xl border ${
      isDone ? "bg-slate-50 border-slate-100" : "bg-white border-slate-200"
    } relative group animate-fade-in transition-all hover:shadow-md flex items-start gap-3`;

    todoEl.innerHTML = `
            <button onclick="toggleTodoStatus(${
              todo.id
            })" class="mt-1 w-5 h-5 rounded-md border-2 ${
      isDone
        ? "bg-green-500 border-green-500 text-white"
        : "border-slate-300 text-transparent hover:border-green-500"
    } flex items-center justify-center transition-all">
                <i class="fa-solid fa-check text-xs"></i>
            </button>
            
            <div class="flex-1 cursor-pointer" onclick="openTodoModal(${
              todo.id
            })">
                <p class="text-sm ${
                  isDone ? "text-slate-400 line-through" : "text-slate-700"
                } font-medium line-clamp-2">${renderRichText(todo.content)}</p>
                <div class="flex items-center gap-2 mt-1">
                    <span class="text-[10px] text-slate-400">${new Date(
                      todo.id
                    ).toLocaleDateString("vi-VN")}</span>
                    ${
                      todo.tags
                        ? todo.tags
                            .map(
                              (tag) =>
                                `<span class="px-1.5 py-0.5 rounded text-[9px] bg-blue-50 text-blue-600 font-bold">#${tag}</span>`
                            )
                            .join("")
                        : ""
                    }
                </div>
            </div>

            <button onclick="deleteTodo(${
              todo.id
            })" class="text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 p-1">
                <i class="fa-solid fa-trash-can"></i>
            </button>
        `;
    container.appendChild(todoEl);
  });
}

export function addTodo() {
  const newTodo = {
    id: Date.now(),
    content: "",
    isCompleted: false,
    color: "bg-white",
    tags: [],
  };
  todos.unshift(newTodo);
  saveTodos();
  renderTodos();
  openTodoModal(newTodo.id);
}

// Delete Modal Logic
let todoToDeleteId = null;

export function deleteTodo(id) {
  todoToDeleteId = id;
  const modal = document.getElementById("delete-confirm-modal");
  if (modal) {
    modal.classList.remove("hidden");
  } else {
    // Fallback if modal doesn't exist (shouldn't happen if HTML is updated)
    if (confirm("Bạn có chắc muốn xóa công việc này?")) {
      confirmDeleteTodo();
    }
  }
}

export function confirmDeleteTodo() {
  if (todoToDeleteId) {
    todos = todos.filter((t) => t.id !== todoToDeleteId);
    saveTodos();
    renderTodos();
    closeDeleteModal();
  }
}

export function closeDeleteModal() {
  const modal = document.getElementById("delete-confirm-modal");
  if (modal) modal.classList.add("hidden");
  todoToDeleteId = null;
}

export function toggleTodoStatus(id) {
  const todo = todos.find((t) => t.id === id);
  if (todo) {
    todo.isCompleted = !todo.isCompleted;
    saveTodos();
    renderTodos();
  }
}

// Todo Modal Logic
let currentTodoId = null;

export function openTodoModal(id) {
  currentTodoId = id;
  const todo = todos.find((t) => t.id === id);
  if (!todo) return;

  const modal = document.getElementById("note-modal");
  const textarea = document.getElementById("note-textarea");

  textarea.value = todo.content;

  // Reset formatting buttons
  document
    .getElementById("format-bold")
    .classList.remove("text-blue-600", "bg-blue-50");
  document
    .getElementById("format-italic")
    .classList.remove("text-blue-600", "bg-blue-50");
  document
    .getElementById("format-list")
    .classList.remove("text-blue-600", "bg-blue-50");

  modal.classList.remove("hidden");
  textarea.focus();
}

export function closeTodoModal() {
  document.getElementById("note-modal").classList.add("hidden");
  currentTodoId = null;
}

export function updateTodoContent(content) {
  if (!currentTodoId) return;
  const todo = todos.find((t) => t.id === currentTodoId);
  if (todo) {
    todo.content = content;
    saveTodos();
    renderTodos();
  }
}

// Rich Text Helpers (Simple implementation for textarea)
// Rich Text Helpers
export function insertFormat(format) {
  const textarea = document.getElementById("note-textarea");
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const text = textarea.value;
  const selectedText = text.substring(start, end);

  let newText = "";
  let newCursorPos = end;

  if (format === "bold") {
    newText =
      text.substring(0, start) + `<b>${selectedText}</b>` + text.substring(end);
    newCursorPos += 7; // <b> + </b> = 3 + 4 = 7
  } else if (format === "italic") {
    newText =
      text.substring(0, start) + `<i>${selectedText}</i>` + text.substring(end);
    newCursorPos += 7; // <i> + </i> = 3 + 4 = 7
  } else if (format === "list") {
    newText =
      text.substring(0, start) + `\n• ${selectedText}` + text.substring(end);
    newCursorPos += 3;
  }

  textarea.value = newText;
  updateTodoContent(newText);
  textarea.focus();
  textarea.setSelectionRange(newCursorPos, newCursorPos);
}

// Helper to render basic HTML safely (sanitized)
function renderRichText(text) {
  if (!text) return "Công việc mới";
  // Escape HTML first to prevent XSS, then allow specific tags
  let safeText = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

  // Re-enable specific tags we added
  safeText = safeText
    .replace(/&lt;b&gt;/g, "<b>")
    .replace(/&lt;\/b&gt;/g, "</b>")
    .replace(/&lt;i&gt;/g, "<i>")
    .replace(/&lt;\/i&gt;/g, "</i>");

  return safeText;
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
