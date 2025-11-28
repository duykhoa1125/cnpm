/**
 * Library Module
 * Handles library/materials rendering and filtering
 */

import { mockMaterials } from "./config.js";
import { showToast } from "./ui.js";

// Render Library View
export function renderLibrary() {
  const courseSelect = document.getElementById("library-course-filter");

  // Populate filters if needed
  if (courseSelect && courseSelect.options.length === 1) {
    const courses = [...new Set(mockMaterials.map((m) => m.course))];
    courses.forEach((c) => {
      const opt = document.createElement("option");
      opt.value = c;
      opt.innerText = c;
      courseSelect.appendChild(opt);
    });
  }

  filterLibrary();
}

// Filter Library
export function filterLibrary() {
  let data = mockMaterials;

  const search = document.getElementById("library-search").value.toLowerCase();
  const course = document.getElementById("library-course-filter").value;
  const type = document.getElementById("library-type-filter").value;

  data = data.filter((m) => {
    const matchSearch =
      m.title.toLowerCase().includes(search) ||
      m.author.toLowerCase().includes(search);
    const matchCourse = course === "all" || m.course === course;
    const matchType = type === "all" || m.type === type;
    return matchSearch && matchCourse && matchType;
  });

  document.getElementById(
    "library-result-count"
  ).innerText = `Hiện ${data.length} tài liệu`;

  const grid = document.getElementById("library-list");
  const empty = document.getElementById("library-empty");
  grid.innerHTML = "";

  if (data.length === 0) {
    empty.classList.remove("hidden");
  } else {
    empty.classList.add("hidden");

    const typeIcons = {
      PDF: { icon: "fa-file-pdf", color: "text-red-500", bg: "bg-red-100" },
      Slide: {
        icon: "fa-layer-group",
        color: "text-orange-500",
        bg: "bg-orange-100",
      },
      Exam: {
        icon: "fa-file-lines",
        color: "text-blue-500",
        bg: "bg-blue-100",
      },
      Video: {
        icon: "fa-video",
        color: "text-purple-500",
        bg: "bg-purple-100",
      },
    };

    data.forEach((m) => {
      const style = typeIcons[m.type] || typeIcons["PDF"];

      const card = document.createElement("div");
      card.className =
        "glass-card p-5 rounded-2xl hover:-translate-y-1 transition group flex flex-col h-full border border-white/50";
      card.innerHTML = `
                <div class="flex justify-between items-start mb-4">
                    <div class="w-12 h-12 rounded-xl ${style.bg} ${style.color} flex items-center justify-center text-xl shadow-sm">
                        <i class="fa-solid ${style.icon}"></i>
                    </div>
                    <div class="text-xs font-bold bg-white/60 px-2 py-1 rounded-lg text-slate-500 border border-white">
                        ${m.type}
                    </div>
                </div>
                
                <h4 class="font-bold text-slate-800 text-lg leading-snug mb-2 group-hover:text-blue-600 transition line-clamp-2" title="${m.title}">${m.title}</h4>
                
                <div class="mb-4 flex-1">
                    <p class="text-xs text-slate-500 mb-1"><i class="fa-solid fa-book-open mr-1"></i> ${m.course}</p>
                    <p class="text-xs text-slate-500"><i class="fa-solid fa-user-pen mr-1"></i> ${m.author}</p>
                </div>
                
                <div class="flex items-center justify-between pt-4 border-t border-slate-200/50">
                    <div class="text-xs text-slate-400 font-medium">
                        <span>${m.size}</span> • <span>${m.downloads} tải</span>
                    </div>
                    <button onclick="openLibraryMaterial(${m.id})" class="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition shadow-sm">
                        <i class="fa-solid fa-arrow-right -rotate-45"></i>
                    </button>
                </div>
            `;
      grid.appendChild(card);
    });
  }
}

// Filter Library by Type
export function filterLibraryByType(type) {
  const select = document.getElementById("library-type-filter");
  if (select) {
    select.value = type;
    filterLibrary();
    document
      .getElementById("library-list")
      .scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

// Reset Library Filter
export function resetLibraryFilter() {
  document.getElementById("library-search").value = "";
  document.getElementById("library-course-filter").value = "all";
  document.getElementById("library-type-filter").value = "all";
  filterLibrary();
}

// Open Library Material
export function openLibraryMaterial(id) {
  const item = mockMaterials.find((m) => m.id === id);
  if (item) {
    const modalTitle = document.querySelector("#material-modal h3");
    if (modalTitle) modalTitle.innerText = item.title;

    document.getElementById("material-modal").classList.remove("hidden");
    showToast(`Đang mở tài liệu: ${item.title}`, "info");
  }
}

// Make functions globally available
window.filterLibrary = filterLibrary;
window.filterLibraryByType = filterLibraryByType;
window.resetLibraryFilter = resetLibraryFilter;
window.openLibraryMaterial = openLibraryMaterial;
