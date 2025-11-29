/**
 * Admin Module
 * Handles admin system functions, user management, and system logs
 */

import {
  mockUsers,
  setMockUsers,
  systemLogs,
  addSystemLog,
  setSystemLogs,
} from "./config.js";
import { showToast, confirmActionModal } from "./ui.js";

let autoLogInterval = null;

// Render Admin System View
export function renderAdminSystem() {
  renderUserTable();
  renderSystemLogs();
  startAutoLogs();
}

// Start Auto Log Generation
export function startAutoLogs() {
  if (autoLogInterval) clearInterval(autoLogInterval);

  autoLogInterval = setInterval(() => {
    // Only run if currently on System Admin tab
    if (localStorage.getItem("activeTab") !== "system_admin") return;

    const actors = [
      "AuthService",
      "PaymentGateway",
      "StudentPortal",
      "TutorService",
      "SystemMonitor",
    ];
    const actions = [
      "Health check OK",
      "User session refresh",
      "Cache invalidated",
      "API Request processed",
      "Database optimization",
    ];
    const levels = ["INFO", "INFO", "INFO", "WARN"];

    const randomActor = actors[Math.floor(Math.random() * actors.length)];
    const randomAction = actions[Math.floor(Math.random() * actions.length)];
    const randomLevel = levels[Math.floor(Math.random() * levels.length)];
    const now = new Date().toISOString().slice(0, 19).replace("T", " ");

    const newLog = {
      ts: now,
      level: randomLevel,
      actor: randomActor,
      action: randomAction,
      details: `Latency: ${Math.floor(Math.random() * 200)}ms`,
    };

    addSystemLog(newLog);
    renderSystemLogs();
  }, 5000);
}

// Render System Logs
export function renderSystemLogs() {
  const area = document.getElementById("system-log-area");
  if (!area) return;

  const filterEl = document.getElementById("log-filter");
  const filter = filterEl ? filterEl.value : "ALL";

  const filteredLogs = systemLogs.filter(
    (l) => filter === "ALL" || l.level === filter
  );

  if (filteredLogs.length === 0) {
    area.innerHTML =
      '<p class="text-slate-500">Không có log nào.</p><p class="animate-pulse text-slate-500">_</p>';
    return;
  }

  area.innerHTML =
    filteredLogs
      .map((l) => {
        let levelColor = "text-blue-400";
        if (l.level === "WARN") levelColor = "text-yellow-400";
        if (l.level === "ERROR") levelColor = "text-red-400";

        return `<div class="py-2 border-b border-slate-700/50">
            <p><span class="${levelColor}">[${l.level}]</span> <span class="text-slate-400">${l.ts}</span> <span class="text-cyan-400">[${l.actor}]</span></p>
            <p class="text-slate-300">${l.action}</p>
            <p class="text-slate-500 text-[11px]">${l.details}</p>
        </div>`;
      })
      .join("") + '<p class="animate-pulse text-slate-500 mt-2">_</p>';
}

// Simulate Sync
export function simulateSync() {
  showToast("Đang sync với HCMUT_DataCore...", "info");
  setTimeout(() => {
    const now = new Date().toISOString().slice(0, 19).replace("T", " ");
    addSystemLog({
      ts: now,
      level: "INFO",
      actor: "Admin",
      action: "Manual sync",
      details: "Sync completed (mô phỏng)",
    });

    const syncEl = document.getElementById("sys-sync");
    if (syncEl) syncEl.textContent = now;

    renderSystemLogs();
    showToast("Đồng bộ DataCore hoàn tất!", "success");
  }, 1200);
}

// Simulate Adjust
export function simulateAdjust() {
  showToast("Đang áp dụng cấu hình mới...", "info");
  setTimeout(() => {
    const now = new Date().toISOString().slice(0, 19).replace("T", " ");
    addSystemLog({
      ts: now,
      level: "INFO",
      actor: "Admin",
      action: "Adjust settings",
      details: "Updated threshold values",
    });
    renderSystemLogs();
    showToast("Cấu hình đã được cập nhật!", "success");
  }, 1000);
}

// Simulate Status Toggle
export function simulateStatus() {
  const statusEl = document.getElementById("sys-status");
  const indicatorEl = document.getElementById("status-indicator");
  if (!statusEl) return;

  const currentStatus = statusEl.textContent;
  if (currentStatus === "OK") {
    statusEl.textContent = "DEGRADED";
    statusEl.className = "text-yellow-600";
    if (indicatorEl)
      indicatorEl.className =
        "w-3 h-3 rounded-full bg-yellow-500 animate-pulse";
  } else {
    statusEl.textContent = "OK";
    statusEl.className = "text-green-600";
    if (indicatorEl)
      indicatorEl.className = "w-3 h-3 rounded-full bg-green-500 animate-pulse";
  }
  showToast("Trạng thái hệ thống: " + statusEl.textContent, "info");
}

// Clear System Logs
export function clearSystemLogs() {
  confirmActionModal(
    "Xóa toàn bộ Logs?",
    "Tất cả lịch sử hoạt động hệ thống sẽ bị xóa. Bạn không thể khôi phục lại.",
    () => {
      setSystemLogs([]);
      renderSystemLogs();
      showToast("Đã xóa logs thành công", "success");
    },
    "Xóa Logs",
    "bg-red-500"
  );
}

// Export System Logs
export function exportSystemLogs() {
  const csv = [
    "timestamp,level,actor,action,details",
    ...systemLogs.map(
      (l) => `${l.ts},${l.level},${l.actor},"${l.action}","${l.details}"`
    ),
  ].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "system_logs.csv";
  a.click();
  URL.revokeObjectURL(url);
  showToast("File CSV đã được tải xuống", "success");
}

// Render User Table
export function renderUserTable() {
  const tbody = document.getElementById("admin-user-list");
  if (!tbody) return;

  tbody.innerHTML = mockUsers
    .map(
      (u) => `
        <tr class="border-b border-slate-100 hover:bg-blue-50/50 transition">
            <td class="py-3 pl-4 font-mono text-slate-500 text-xs">${u.id}</td>
            <td class="py-3 font-bold text-slate-700">${u.name}</td>
            <td class="py-3"><span class="uppercase text-[10px] font-bold px-2 py-1 rounded bg-slate-100 text-slate-500">${
              u.role
            }</span></td>
            <td class="py-3 text-sm text-slate-600">${u.email}</td>
            <td class="py-3">
                <span class="px-2 py-1 rounded text-[10px] font-bold ${
                  u.status === "active"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }">
                    ${u.status === "active" ? "Hoạt động" : "Đã khóa"}
                </span>
            </td>
            <td class="py-3 text-right pr-4">
                <button onclick="editUser('${
                  u.id
                }')" class="text-blue-500 hover:bg-blue-100 p-2 rounded-lg transition"><i class="fa-solid fa-pen"></i></button>
                <button onclick="deleteUser('${
                  u.id
                }')" class="text-red-500 hover:bg-red-100 p-2 rounded-lg transition"><i class="fa-solid fa-trash"></i></button>
            </td>
        </tr>
    `
    )
    .join("");
}

// Add User (Open Modal)
export function addUser() {
  const modal = document.getElementById("user-modal");
  const form = document.getElementById("user-form");
  const title = document.getElementById("user-modal-title");

  if (modal && form) {
    form.reset();
    document.getElementById("user-id").value = ""; // Empty for new user
    document.getElementById("user-role").value = "student";
    document.getElementById("user-status").value = "active";
    title.innerText = "Thêm người dùng mới";
    modal.classList.remove("hidden");
  }
}

// Edit User (Open Modal)
export function editUser(id) {
  const user = mockUsers.find((u) => u.id === id);
  if (!user) return;

  const modal = document.getElementById("user-modal");
  const form = document.getElementById("user-form");
  const title = document.getElementById("user-modal-title");

  if (modal && form) {
    document.getElementById("user-id").value = user.id;
    document.getElementById("user-name").value = user.name;
    document.getElementById("user-email").value = user.email;
    document.getElementById("user-role").value = user.role;
    document.getElementById("user-status").value = user.status;

    title.innerText = "Chỉnh sửa người dùng";
    modal.classList.remove("hidden");
  }
}

// Close User Modal
export function closeUserModal() {
  const modal = document.getElementById("user-modal");
  if (modal) modal.classList.add("hidden");
}

// Submit User Form
export function submitUserForm(e) {
  e.preventDefault();
  const id = document.getElementById("user-id").value;
  const name = document.getElementById("user-name").value;
  const email = document.getElementById("user-email").value;
  const role = document.getElementById("user-role").value;
  const status = document.getElementById("user-status").value;

  if (id) {
    // Edit existing
    const user = mockUsers.find((u) => u.id === id);
    if (user) {
      user.name = name;
      user.email = email;
      user.role = role;
      user.status = status;
      showToast("Đã cập nhật thông tin người dùng", "success");
    }
  } else {
    // Add new
    const newId = "U" + Date.now().toString().slice(-4);
    mockUsers.push({
      id: newId,
      name: name,
      email: email,
      role: role,
      status: status,
    });
    showToast("Đã thêm người dùng mới thành công", "success");
  }

  renderUserTable();
  closeUserModal();
}

// Delete User
export function deleteUser(id) {
  confirmActionModal(
    "Xóa người dùng?",
    "Hành động này sẽ xóa vĩnh viễn người dùng khỏi hệ thống.",
    () => {
      const filtered = mockUsers.filter((u) => u.id !== id);
      setMockUsers(filtered);
      renderUserTable();
      showToast("Đã xóa người dùng", "success");
    },
    "Xóa ngay",
    "bg-red-500"
  );
}

// Trigger Backup
export function triggerBackup() {
  showToast("Đang tiến hành sao lưu dữ liệu hệ thống...", "info");
  setTimeout(() => {
    showToast("Sao lưu hoàn tất! File: backup_2025_11_28.sql", "success");
  }, 2000);
}

// Restore Backup
export function restoreBackup() {
  confirmActionModal(
    "Khôi phục Hệ thống?",
    "CẢNH BÁO: Việc khôi phục sẽ ghi đè toàn bộ dữ liệu hiện tại bằng bản sao lưu. Dữ liệu mới hơn sẽ bị mất.",
    () => {
      showToast("Đang khôi phục dữ liệu...", "info");
      setTimeout(() => {
        showToast("Khôi phục hệ thống thành công.", "success");
      }, 3000);
    },
    "Khôi phục",
    "bg-orange-500"
  );
}

// Make functions globally available
window.renderAdminSystem = renderAdminSystem;
window.renderSystemLogs = renderSystemLogs;
window.simulateSync = simulateSync;
window.simulateAdjust = simulateAdjust;
window.simulateStatus = simulateStatus;
window.clearSystemLogs = clearSystemLogs;
window.exportSystemLogs = exportSystemLogs;
window.renderUserTable = renderUserTable;
window.addUser = addUser;
window.editUser = editUser;
window.closeUserModal = closeUserModal;
window.submitUserForm = submitUserForm;
window.deleteUser = deleteUser;
window.triggerBackup = triggerBackup;
window.restoreBackup = restoreBackup;
