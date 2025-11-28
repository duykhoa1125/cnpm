/**
 * UI Utilities Module
 * Contains toast notifications, modals, custom dropdowns, and button utilities
 */

// Helper: Button Loading State
export function setButtonLoading(btn, isLoading, originalText = "") {
  if (!btn) return;

  if (isLoading) {
    btn.dataset.originalText = btn.innerHTML;
    btn.disabled = true;
    btn.classList.add("opacity-75", "cursor-not-allowed");
    btn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin mr-2"></i>Đang xử lý...`;
  } else {
    btn.innerHTML = originalText || btn.dataset.originalText;
    btn.disabled = false;
    btn.classList.remove("opacity-75", "cursor-not-allowed");
  }
}

// Toast Notification Logic
export function showToast(message, type = "info") {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;

  let iconClass = "fa-info";
  let title = "Thông báo";

  if (type === "success") {
    iconClass = "fa-check";
    title = "Thành công";
  } else if (type === "error") {
    iconClass = "fa-xmark";
    title = "Lỗi";
  }

  toast.innerHTML = `
        <div class="toast-icon">
            <i class="fa-solid ${iconClass}"></i>
        </div>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
    `;

  container.appendChild(toast);

  // Remove after 3s
  setTimeout(() => {
    toast.classList.add("hiding");
    toast.addEventListener("animationend", () => {
      toast.remove();
    });
  }, 3000);
}

// Confirmation Modal
export function confirmActionModal(
  title,
  message,
  onConfirm,
  confirmText = "Xác nhận",
  confirmColor = "bg-red-500"
) {
  let modal = document.getElementById("confirmation-modal");
  if (!modal) {
    const modalHtml = `
        <div id="confirmation-modal" class="hidden fixed inset-0 z-[70] flex items-center justify-center">
            <div class="absolute inset-0 bg-slate-900/30 backdrop-blur-sm transition-opacity" onclick="closeConfirmationModal()"></div>
            <div class="glass-panel w-full max-w-sm p-6 rounded-[24px] shadow-2xl relative z-10 bg-white/90 transform transition-all scale-100 m-4">
                <div class="text-center mb-5">
                    <div class="w-14 h-14 bg-slate-100 text-slate-600 rounded-full flex items-center justify-center text-2xl mx-auto mb-3 shadow-inner">
                        <i class="fa-solid fa-question"></i>
                    </div>
                    <h3 id="confirm-modal-title" class="text-xl font-bold text-slate-800">Xác nhận</h3>
                    <p id="confirm-modal-message" class="text-slate-500 mt-2 text-sm leading-relaxed">Bạn có chắc chắn muốn thực hiện hành động này?</p>
                </div>
                <div class="grid grid-cols-2 gap-3">
                    <button onclick="closeConfirmationModal()" class="py-2.5 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition text-sm">Hủy bỏ</button>
                    <button id="confirm-modal-btn" class="py-2.5 rounded-xl text-white font-bold shadow-lg transition text-sm ${confirmColor}">Xác nhận</button>
                </div>
            </div>
        </div>`;
    document.body.insertAdjacentHTML("beforeend", modalHtml);
    modal = document.getElementById("confirmation-modal");
  }

  document.getElementById("confirm-modal-title").innerText = title;
  document.getElementById("confirm-modal-message").innerText = message;

  const confirmBtn = document.getElementById("confirm-modal-btn");
  confirmBtn.innerText = confirmText;
  confirmBtn.className = `py-2.5 rounded-xl text-white font-bold shadow-lg transition text-sm ${confirmColor} hover:brightness-110`;

  // Remove old event listeners to prevent stacking
  const newBtn = confirmBtn.cloneNode(true);
  confirmBtn.parentNode.replaceChild(newBtn, confirmBtn);

  newBtn.onclick = () => {
    onConfirm();
    closeConfirmationModal();
  };

  modal.classList.remove("hidden");
}

export function closeConfirmationModal() {
  const modal = document.getElementById("confirmation-modal");
  if (modal) modal.classList.add("hidden");
}

// Custom Dropdown Logic
export function setupCustomSelect(selectId, icons = {}) {
  const select = document.getElementById(selectId);
  if (!select) return;

  // Check if already initialized
  if (select.parentNode.classList.contains("custom-select-wrapper")) return;

  const wrapper = document.createElement("div");
  wrapper.className = "custom-select-wrapper w-full relative";
  select.parentNode.insertBefore(wrapper, select);
  wrapper.appendChild(select);

  // Hide original select
  select.style.display = "none";

  // Hide original chevron sibling if it exists
  let nextSibling = wrapper.nextElementSibling;
  while (nextSibling) {
    if (
      nextSibling.tagName === "I" &&
      nextSibling.classList.contains("fa-chevron-down")
    ) {
      nextSibling.style.display = "none";
      break;
    }
    nextSibling = nextSibling.nextElementSibling;
  }

  // Create Trigger
  const trigger = document.createElement("div");

  // Determine style based on original select classes
  const isSmall =
    select.classList.contains("text-xs") || select.classList.contains("py-1");
  const padding = isSmall ? "p-2" : "p-4";
  const textSize = isSmall ? "text-xs" : "text-base";

  trigger.className = `custom-select-trigger w-full ${padding} bg-white/50 border border-white rounded-xl cursor-pointer flex justify-between items-center text-slate-700 font-bold shadow-sm hover:bg-white/80 transition-all ${textSize}`;

  // Get initial selected option
  const selectedOption =
    select.options[select.selectedIndex] || select.options[0];
  let initialIcon = "";
  if (selectedOption) {
    initialIcon = icons[selectedOption.value]
      ? `<i class="fa-solid ${
          icons[selectedOption.value]
        } mr-3 text-blue-600 text-lg"></i>`
      : "";
  }

  trigger.innerHTML = `
        <div class="flex items-center gap-2 truncate">${initialIcon}<span class="${textSize} truncate">${
    selectedOption ? selectedOption.text : ""
  }</span></div>
        <i class="fa-solid fa-chevron-down text-slate-400 transition-transform duration-300 text-[10px]"></i>
    `;
  wrapper.appendChild(trigger);

  // Create Options Container
  const optionsContainer = document.createElement("div");
  optionsContainer.className = "custom-select-options custom-scroll";

  Array.from(select.options).forEach((option) => {
    const optionDiv = document.createElement("div");
    optionDiv.className = `custom-option ${
      option.selected ? "selected" : ""
    } ${textSize}`;
    const icon = icons[option.value]
      ? `<i class="fa-solid ${
          icons[option.value]
        } text-lg w-6 text-center"></i>`
      : "";
    optionDiv.innerHTML = `${icon}<span class="flex-1 truncate">${option.text}</span>`;
    if (option.selected) optionDiv.classList.add("bg-blue-50", "text-blue-600");

    optionDiv.addEventListener("click", () => {
      select.value = option.value;
      select.dispatchEvent(new Event("change"));

      // Update Trigger
      const newIcon = icons[option.value]
        ? `<i class="fa-solid ${
            icons[option.value]
          } mr-3 text-blue-600 text-lg"></i>`
        : "";
      trigger.innerHTML = `
                <div class="flex items-center gap-2 truncate">${newIcon}<span class="${textSize} truncate">${option.text}</span></div>
                <i class="fa-solid fa-chevron-down text-slate-400 transition-transform duration-300 text-[10px]"></i>
            `;

      // Update Selected State
      wrapper.querySelectorAll(".custom-option").forEach((el) => {
        el.classList.remove("selected", "bg-blue-50", "text-blue-600");
      });
      optionDiv.classList.add("selected", "bg-blue-50", "text-blue-600");

      // Close Dropdown
      optionsContainer.classList.remove("open");
      trigger.querySelector(".fa-chevron-down").style.transform =
        "rotate(0deg)";
    });

    optionsContainer.appendChild(optionDiv);
  });
  wrapper.appendChild(optionsContainer);

  // Toggle Dropdown
  trigger.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = optionsContainer.classList.contains("open");

    // Close all other custom selects
    document.querySelectorAll(".custom-select-options").forEach((el) => {
      el.classList.remove("open");
      if (el.previousElementSibling) {
        const chevron =
          el.previousElementSibling.querySelector(".fa-chevron-down");
        if (chevron) chevron.style.transform = "rotate(0deg)";
      }
    });

    if (!isOpen) {
      optionsContainer.classList.add("open");
      trigger.querySelector(".fa-chevron-down").style.transform =
        "rotate(180deg)";
    }
  });

  // Close when clicking outside
  document.addEventListener("click", (e) => {
    if (!wrapper.contains(e.target)) {
      optionsContainer.classList.remove("open");
      trigger.querySelector(".fa-chevron-down").style.transform =
        "rotate(0deg)";
    }
  });
}

// Star Rating Logic
export function setRating(n) {
  const stars = document.querySelectorAll(".star-btn");
  const ratingText = document.getElementById("rating-text");

  stars.forEach((star, index) => {
    if (index < n) {
      star.classList.remove("text-slate-200");
      star.classList.add("text-yellow-400");
    } else {
      star.classList.add("text-slate-200");
      star.classList.remove("text-yellow-400");
    }
  });

  const ratingLabels = ["Rất tệ", "Tệ", "Bình thường", "Tốt", "Rất tốt"];

  if (ratingText) {
    ratingText.innerText = `Đánh giá: ${ratingLabels[n - 1]}`;
    ratingText.classList.remove("text-slate-400");
    ratingText.classList.add("text-slate-600");
  }
}

// Toggle Sidebar
export function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("sidebar-overlay");

  if (!sidebar || !overlay) return;

  const isClosed = sidebar.classList.contains("-translate-x-full");

  if (isClosed) {
    // Open sidebar
    sidebar.classList.remove("-translate-x-full");
    overlay.classList.remove("hidden");
    void overlay.offsetWidth;
    overlay.classList.remove("opacity-0");
  } else {
    // Close sidebar
    sidebar.classList.add("-translate-x-full");
    overlay.classList.add("opacity-0");
    setTimeout(() => {
      overlay.classList.add("hidden");
    }, 300);
  }
}

// Toggle Notifications Dropdown
export function toggleNotifications() {
  document.getElementById("notification-dropdown").classList.toggle("hidden");
}

// Modal Utilities
export function openMaterialModal(name) {
  document.getElementById("material-modal").classList.remove("hidden");
}

export function closeMaterialModal() {
  document.getElementById("material-modal").classList.add("hidden");
}

// Upload Modal
export function openUploadModal(courseId) {
  document.getElementById("upload-modal").classList.remove("hidden");
  document.getElementById("upload-course-id").value = courseId;
  document.getElementById("selected-files-preview").innerHTML = "";
}

export function closeUploadModal() {
  document.getElementById("upload-modal").classList.add("hidden");
}

export function handleFileSelect(input) {
  const container = document.getElementById("selected-files-preview");
  if (input.files) {
    Array.from(input.files).forEach((file) => {
      const div = document.createElement("div");
      div.className =
        "flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200";
      div.innerHTML = `
                <div class="flex items-center gap-3">
                    <i class="fa-solid fa-file text-slate-400"></i>
                    <span class="text-sm font-medium text-slate-700 truncate">${
                      file.name
                    }</span>
                </div>
                <span class="text-xs text-slate-500">${(
                  file.size /
                  1024 /
                  1024
                ).toFixed(2)} MB</span>
            `;
      container.appendChild(div);
    });
  }
}

// Image Preview Handler
export function handleImagePreview(input, imgId, placeholderId) {
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = document.getElementById(imgId);
      const ph = document.getElementById(placeholderId);
      img.src = e.target.result;
      img.classList.remove("hidden");
      ph.classList.add("hidden");
    };
    reader.readAsDataURL(input.files[0]);
  }
}

// Make closeConfirmationModal globally available
window.closeConfirmationModal = closeConfirmationModal;
