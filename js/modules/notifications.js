/**
 * Notifications Module
 * Handles notification rendering, filtering, and management
 */

import { mockNotifications, setMockNotifications } from "./config.js";
import { showToast, confirmActionModal } from "./ui.js";
import { switchTab } from "./navigation.js";

let currentNotiFilter = "all";

// Helpers for UI Styling
function getTypeIcon(type) {
  const map = {
    schedule: "fa-calendar-days",
    cancel: "fa-calendar-xmark",
    feedback: "fa-comments",
    system: "fa-server",
    deadline: "fa-clock",
    grade: "fa-graduation-cap",
  };
  return map[type] || "fa-bell";
}

function getTypeName(type) {
  const map = {
    schedule: "Lịch học",
    cancel: "Hủy lớp",
    feedback: "Phản hồi",
    system: "Hệ thống",
    deadline: "Hạn nộp",
    grade: "Điểm số",
  };
  return map[type] || "Thông báo";
}

function getTypeColor(type) {
  if (type === "cancel" || type === "deadline") return "text-red-500";
  if (type === "feedback" || type === "grade") return "text-green-500";
  return "text-blue-500";
}

function getTypeIconStyle(type) {
  if (type === "cancel" || type === "deadline")
    return "bg-red-100 text-red-500";
  if (type === "feedback" || type === "grade")
    return "bg-green-100 text-green-500";
  if (type === "system") return "bg-slate-100 text-slate-500";
  return "bg-blue-100 text-blue-500";
}

function getTypeBadgeStyle(type) {
  if (type === "cancel" || type === "deadline")
    return "bg-red-50 text-red-600 border border-red-100";
  if (type === "feedback" || type === "grade")
    return "bg-green-50 text-green-600 border border-green-100";
  if (type === "system")
    return "bg-slate-50 text-slate-600 border border-slate-100";
  return "bg-blue-50 text-blue-600 border border-blue-100";
}

// Render Notifications
export function renderNotifications() {
  // Update Badge count
  const unreadCount = mockNotifications.filter((n) => !n.isRead).length;
  const badge = document.querySelector("header .fa-bell + span");
  if (badge) {
    if (unreadCount > 0) {
      badge.classList.remove("hidden");
      badge.innerText = unreadCount > 9 ? "9+" : unreadCount;
    } else {
      badge.classList.add("hidden");
    }
  }

  // Update Dropdown List (Header)
  const headerList = document.getElementById("header-noti-list");
  if (headerList) {
    const recent = mockNotifications.slice(0, 5);
    if (recent.length === 0) {
      headerList.innerHTML =
        '<div class="p-4 text-center text-slate-400 text-sm">Không có thông báo nào</div>';
    } else {
      headerList.innerHTML = recent
        .map(
          (n) => `
                <div onclick="viewNotificationDetail(${
                  n.id
                })" class="p-3 rounded-xl cursor-pointer transition group flex gap-3 ${
            n.isRead
              ? "hover:bg-slate-50 opacity-75"
              : "bg-blue-50/40 hover:bg-blue-50"
          }">
                    <div class="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center ${getTypeIconStyle(
                      n.type
                    )} bg-opacity-20">
                        <i class="fa-solid ${getTypeIcon(n.type)} text-sm"></i>
                    </div>
                    <div class="flex-1 min-w-0">
                        <div class="flex justify-between items-start mb-0.5">
                            <p class="text-[10px] font-bold uppercase tracking-wider ${getTypeColor(
                              n.type
                            )}">${getTypeName(n.type)}</p>
                            <p class="text-[10px] text-slate-400 whitespace-nowrap ml-2">${
                              n.time
                            }</p>
                        </div>
                        <p class="text-sm text-slate-800 font-bold leading-tight mb-0.5 group-hover:text-blue-600 transition line-clamp-2">${
                          n.title
                        }</p>
                        <p class="text-xs text-slate-500 line-clamp-1">${
                          n.message
                        }</p>
                    </div>
                </div>
            `
        )
        .join("");
    }
  }

  // Update Full Page List
  const pageList = document.getElementById("notification-list");
  if (pageList) {
    const search =
      document.getElementById("notification-search")?.value.toLowerCase() || "";

    let filtered = mockNotifications.filter((n) => {
      const matchesSearch =
        n.title.toLowerCase().includes(search) ||
        n.message.toLowerCase().includes(search);
      if (currentNotiFilter === "unread") return matchesSearch && !n.isRead;
      return matchesSearch;
    });

    const empty = document.getElementById("notification-empty");

    if (filtered.length === 0) {
      pageList.innerHTML = "";
      if (empty) empty.classList.remove("hidden");
    } else {
      if (empty) empty.classList.add("hidden");
      pageList.innerHTML = filtered
        .map(
          (n) => `
                <div class="relative group flex flex-col md:flex-row gap-4 p-4 rounded-2xl border transition-all duration-300 ${
                  n.isRead
                    ? "bg-white/40 border-white hover:bg-white/60"
                    : "bg-white border-blue-100 shadow-lg shadow-blue-100/20"
                }">
                    
                    <!-- Icon Box -->
                    <div class="w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center text-xl ${getTypeIconStyle(
                      n.type
                    )}">
                        <i class="fa-solid ${getTypeIcon(n.type)}"></i>
                    </div>

                    <!-- Content -->
                    <div class="flex-1 min-w-0 py-1">
                        <div class="flex justify-between items-start">
                             <div class="flex items-center gap-2 mb-1">
                                <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${getTypeBadgeStyle(
                                  n.type
                                )}">${getTypeName(n.type)}</span>
                                ${
                                  !n.isRead
                                    ? '<span class="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>'
                                    : ""
                                }
                             </div>
                             <span class="text-xs font-medium text-slate-400 flex-shrink-0">${
                               n.time
                             }</span>
                        </div>
                        
                        <h4 class="text-base font-bold text-slate-800 mb-1 ${
                          n.isRead ? "" : "text-blue-900"
                        }">${n.title}</h4>
                        <p class="text-sm text-slate-600 leading-relaxed">${
                          n.message
                        }</p>
                    </div>

                    <!-- Actions -->
                    <div class="flex md:flex-col gap-2 items-center md:justify-center border-t md:border-t-0 md:border-l border-slate-100 pt-3 md:pt-0 md:pl-4 mt-2 md:mt-0">
                        <button onclick="toggleNotificationRead(${
                          n.id
                        })" class="w-8 h-8 rounded-full flex items-center justify-center hover:bg-blue-50 transition text-slate-400 hover:text-blue-600" title="${
            n.isRead ? "Đánh dấu chưa đọc" : "Đánh dấu đã đọc"
          }">
                            <i class="fa-regular ${
                              n.isRead ? "fa-envelope" : "fa-envelope-open"
                            }"></i>
                        </button>
                        <button onclick="deleteNotification(${
                          n.id
                        })" class="w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-50 transition text-slate-400 hover:text-red-500" title="Xóa thông báo">
                            <i class="fa-regular fa-trash-can"></i>
                        </button>
                    </div>
                </div>
            `
        )
        .join("");
    }
  }
}

// Filter Notifications
export function filterNotifications(type) {
  currentNotiFilter = type;

  // Update Filter Buttons UI
  document.querySelectorAll(".noti-filter-btn").forEach((btn) => {
    btn.classList.remove("bg-white", "shadow-sm", "text-blue-600");
    btn.classList.add("text-slate-500");
  });

  const activeBtn = document.getElementById(`filter-noti-${type}`);
  if (activeBtn) {
    activeBtn.classList.add("bg-white", "shadow-sm", "text-blue-600");
    activeBtn.classList.remove("text-slate-500");
  }

  renderNotifications();
}

// Toggle Notification Read State
export function toggleNotificationRead(id) {
  const noti = mockNotifications.find((n) => n.id === id);
  if (noti) {
    noti.isRead = !noti.isRead;
    renderNotifications();
    showToast(
      noti.isRead ? "Đã đánh dấu đã đọc" : "Đã đánh dấu chưa đọc",
      "info"
    );
  }
}

// Mark All Notifications as Read
export function markAllNotificationsRead() {
  mockNotifications.forEach((n) => (n.isRead = true));
  renderNotifications();
  showToast("Đã đánh dấu tất cả là đã đọc", "success");
}

// Delete Notification
export function deleteNotification(id) {
  confirmActionModal(
    "Xóa thông báo?",
    "Bạn có chắc muốn xóa thông báo này khỏi danh sách không?",
    () => {
      const filtered = mockNotifications.filter((n) => n.id !== id);
      setMockNotifications(filtered);
      renderNotifications();
      showToast("Đã xóa thông báo", "info");
    },
    "Xóa",
    "bg-red-500"
  );
}

// View Notification Detail
export function viewNotificationDetail(id) {
  toggleNotificationRead(id);
  switchTab("notifications_view");
}

// Open Create Notification Modal
export function openCreateNotificationModal() {
  const modal = document.getElementById("create-notification-modal");
  if (modal) {
    document.getElementById("notification-form").reset();
    document.getElementById("notif-preview").innerText =
      "Nhập thông tin để xem trước thông báo...";
    document.getElementById("schedule-time-section").classList.add("hidden");
    modal.classList.remove("hidden");

    // Add real-time preview
    setupNotificationPreview();
  }
}

// Close Create Notification Modal
export function closeCreateNotificationModal() {
  const modal = document.getElementById("create-notification-modal");
  if (modal) modal.classList.add("hidden");
}

// Toggle Schedule Time Section
export function toggleScheduleTime(checkbox) {
  const section = document.getElementById("schedule-time-section");
  if (checkbox.checked) {
    section.classList.remove("hidden");
  } else {
    section.classList.add("hidden");
  }
}

// Setup Real-time Notification Preview
function setupNotificationPreview() {
  const titleEl = document.getElementById("notif-title");
  const contentEl = document.getElementById("notif-content");
  const typeEl = document.getElementById("notif-type");
  const previewEl = document.getElementById("notif-preview");

  const updatePreview = () => {
    const title = titleEl.value || "[Tiêu đề]";
    const content = contentEl.value || "[Nội dung]";
    const type = typeEl.options[typeEl.selectedIndex].text;

    previewEl.innerHTML = `
            <div class="space-y-1">
                <p class="text-xs font-bold text-blue-600 uppercase">${type}</p>
                <p class="text-sm font-bold text-slate-800">${title}</p>
                <p class="text-xs text-slate-600">${content}</p>
            </div>
        `;
  };

  titleEl.addEventListener("input", updatePreview);
  contentEl.addEventListener("input", updatePreview);
  typeEl.addEventListener("change", updatePreview);
}

// Submit Create Notification
export function submitCreateNotification(e) {
  e.preventDefault();

  const title = document.getElementById("notif-title").value;
  const content = document.getElementById("notif-content").value;
  const type = document.getElementById("notif-type").value;
  const recipients = document.getElementById("notif-recipients").value;
  const isScheduled = document.getElementById("notif-schedule").checked;

  let scheduleInfo = "";
  if (isScheduled) {
    const date = document.getElementById("notif-schedule-date").value;
    const time = document.getElementById("notif-schedule-time").value;
    scheduleInfo = ` (Lên lịch: ${date} ${time})`;
  }

  // Create new notification object
  const newNotification = {
    id: mockNotifications.length + 1,
    type: type,
    title: title,
    message: content,
    time: isScheduled ? scheduleInfo : "Vừa xong",
    isRead: false,
  };

  // Add to mock data
  mockNotifications.unshift(newNotification);

  // Show success message
  showToast(
    `Thông báo đã được ${isScheduled ? "lên lịch" : "gửi"} thành công!`,
    "success"
  );

  // Refresh notifications
  renderNotifications();

  // Close modal
  closeCreateNotificationModal();
}

// Make functions globally available
window.renderNotifications = renderNotifications;
window.filterNotifications = filterNotifications;
window.toggleNotificationRead = toggleNotificationRead;
window.markAllNotificationsRead = markAllNotificationsRead;
window.deleteNotification = deleteNotification;
window.viewNotificationDetail = viewNotificationDetail;
window.openCreateNotificationModal = openCreateNotificationModal;
window.closeCreateNotificationModal = closeCreateNotificationModal;
window.toggleScheduleTime = toggleScheduleTime;
window.submitCreateNotification = submitCreateNotification;
