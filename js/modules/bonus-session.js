/**
 * Bonus Session Module
 * Handles bonus session creation and RSVP management
 */

import {
  bonusSessions,
  bonusRsvps,
  addBonusSession,
  setBonusRsvps,
} from "./config.js";
import { showToast, setButtonLoading } from "./ui.js";

// Submit Bonus Session Form
export function submitBonusSession(e) {
  e.preventDefault();
  const btn = e.target.querySelector("button[type='submit']");
  setButtonLoading(btn, true);

  const title = document.getElementById("bonus-title")?.value || "Untitled";
  const course = document.getElementById("bonus-course")?.value;
  const desc = document.getElementById("bonus-desc")?.value || "";
  const scope = document.getElementById("bonus-scope")?.value || "CLASS";
  const students = Array.from(
    document.getElementById("bonus-students")?.selectedOptions || []
  ).map((o) => o.value);
  const date = document.getElementById("bonus-date")?.value;
  const start = document.getElementById("bonus-start")?.value;
  const duration = document.getElementById("bonus-duration")?.value || 60;
  const mode = document.getElementById("bonus-mode")?.value || "ONLINE";
  const location = document.getElementById("bonus-location")?.value || "";
  const max = document.getElementById("bonus-max")?.value || 30;
  const approval = document.getElementById("bonus-approval")?.checked || false;

  // Validation
  if (!course) {
    showToast("Vui lòng chọn môn học!", "error");
    setButtonLoading(btn, false);
    return;
  }
  if (!date || !start) {
    showToast("Vui lòng nhập ngày và giờ bắt đầu!", "error");
    setButtonLoading(btn, false);
    return;
  }
  if (duration <= 0) {
    showToast("Thời lượng phải lớn hơn 0!", "error");
    setButtonLoading(btn, false);
    return;
  }

  // Simulate Network
  setTimeout(() => {
    const newSession = {
      id: "S" + (bonusSessions.length + 1),
      title: title,
      course: course,
      desc: desc,
      scope: scope,
      students: students,
      date: date,
      start: start,
      duration: parseInt(duration),
      mode: mode,
      location: location,
      max: parseInt(max),
      approval: approval,
      tutor: "Nguyen Van B",
      status: approval ? "PENDING" : "ACTIVE",
      count: 0,
    };

    addBonusSession(newSession);

    showToast("Đã tạo buổi học bổ sung thành công!", "success");
    document.getElementById("bonus-session-modal").classList.add("hidden");
    document.getElementById("bonus-session-form")?.reset();
    updateBonusPreview();
    renderBonusSessions();
    renderBonusRsvps();

    setButtonLoading(btn, false);
  }, 800);
}

// On Bonus Scope Change
export function onBonusScopeChange() {
  const scope = document.getElementById("bonus-scope")?.value;
  const wrapper = document.getElementById("bonus-students-wrapper");
  if (wrapper) {
    wrapper.classList.toggle("hidden", scope !== "INDIVIDUAL");
  }
}

// Update Bonus Preview
export function updateBonusPreview() {
  const preview = document.getElementById("bonus-preview");
  if (!preview) return;

  const title = document.getElementById("bonus-title")?.value || "";
  const course = document.getElementById("bonus-course")?.value || "";
  const date = document.getElementById("bonus-date")?.value || "";
  const start = document.getElementById("bonus-start")?.value || "";
  const duration = document.getElementById("bonus-duration")?.value || "";

  if (title || course || date) {
    preview.textContent = `${title || "Chưa có tiêu đề"} • ${
      course || "Chưa chọn môn"
    } • ${date} ${start} • ${duration} phút`;
  } else {
    preview.textContent = "Các thông tin sẽ hiện tại đây khi nhập form.";
  }
}

// Render Bonus Sessions
export function renderBonusSessions() {
  const container = document.getElementById("bonus-sessions-list");
  const countEl = document.getElementById("bonus-session-count");

  if (!container) return;

  if (countEl) countEl.textContent = bonusSessions.length + " buổi";

  if (bonusSessions.length === 0) {
    container.innerHTML = `<div class="text-center py-8 text-slate-400">
            <i class="fa-solid fa-calendar-xmark text-4xl mb-3 opacity-50"></i>
            <p class="text-sm">Chưa có buổi học bổ sung nào.</p>
            <p class="text-xs mt-1">Nhấn "Tạo buổi bổ sung" để bắt đầu.</p>
        </div>`;
    return;
  }

  container.innerHTML = bonusSessions
    .slice()
    .reverse()
    .map((s) => {
      const statusBadge =
        s.status === "ACTIVE"
          ? '<span class="px-2 py-1 bg-green-100 text-green-600 rounded-lg text-[10px] font-bold">ACTIVE</span>'
          : '<span class="px-2 py-1 bg-yellow-100 text-yellow-600 rounded-lg text-[10px] font-bold">PENDING</span>';

      const modeBadge =
        s.mode === "ONLINE"
          ? '<span class="px-2 py-1 bg-blue-100 text-blue-600 rounded-lg text-[10px] font-bold"><i class="fa-solid fa-video mr-1"></i>Online</span>'
          : '<span class="px-2 py-1 bg-purple-100 text-purple-600 rounded-lg text-[10px] font-bold"><i class="fa-solid fa-building mr-1"></i>Offline</span>';

      return `<div class="p-4 rounded-xl border border-slate-200 bg-white/50 hover:bg-white/80 transition">
            <div class="flex items-start justify-between gap-4">
                <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2 mb-2">
                        <h5 class="font-bold text-slate-800 truncate">${
                          s.title
                        }</h5>
                        ${statusBadge}
                        ${modeBadge}
                    </div>
                    <div class="text-xs text-slate-500 space-y-1">
                        <p><i class="fa-solid fa-calendar mr-1"></i>${s.date} ${
        s.start
      } • ${s.duration} phút</p>
                        <p><i class="fa-solid fa-user-tie mr-1"></i>Tutor: ${
                          s.tutor
                        }</p>
                        ${
                          s.location
                            ? `<p><i class="fa-solid fa-location-dot mr-1"></i>${s.location}</p>`
                            : ""
                        }
                    </div>
                </div>
                <div class="text-right flex-shrink-0">
                    <div class="text-lg font-bold text-slate-700">${s.count}/${
        s.max
      }</div>
                    <div class="text-[10px] text-slate-400">đăng ký</div>
                    <button onclick="sendBonusNotification('${
                      s.id
                    }')" class="mt-2 px-3 py-1 rounded-lg bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition">
                        <i class="fa-solid fa-paper-plane mr-1"></i>Gửi TB
                    </button>
                </div>
            </div>
        </div>`;
    })
    .join("");
}

// Render Bonus RSVPs
export function renderBonusRsvps() {
  const container = document.getElementById("bonus-rsvp-list");
  const countEl = document.getElementById("rsvp-count");

  if (!container) return;

  if (countEl) countEl.textContent = bonusRsvps.length + " đăng ký";

  if (bonusRsvps.length === 0) {
    container.innerHTML = `<div class="text-center py-8 text-slate-400">
            <i class="fa-solid fa-users-slash text-4xl mb-3 opacity-50"></i>
            <p class="text-sm">Chưa có sinh viên đăng ký.</p>
        </div>`;
    return;
  }

  container.innerHTML = bonusRsvps
    .map((r) => {
      const session = bonusSessions.find((s) => s.id === r.sessionId);
      const sessionTitle = session ? session.title : "Unknown";

      const statusBadge =
        r.status === "ACCEPTED"
          ? '<span class="px-2 py-1 bg-green-100 text-green-600 rounded-lg text-[10px] font-bold">Đã chấp nhận</span>'
          : r.status === "DECLINED"
          ? '<span class="px-2 py-1 bg-red-100 text-red-600 rounded-lg text-[10px] font-bold">Đã từ chối</span>'
          : '<span class="px-2 py-1 bg-yellow-100 text-yellow-600 rounded-lg text-[10px] font-bold">Chờ xác nhận</span>';

      return `<div class="p-4 rounded-xl border border-slate-200 bg-white/50 flex items-center justify-between gap-4">
            <div class="flex items-center gap-3">
                <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(
                  r.name
                )}&background=eff6ff&color=2563eb" class="w-10 h-10 rounded-full border-2 border-white">
                <div>
                    <p class="font-bold text-slate-800">${r.name}</p>
                    <p class="text-xs text-slate-500">Buổi: ${sessionTitle}</p>
                </div>
            </div>
            <div class="flex items-center gap-2">
                ${statusBadge}
                ${
                  r.status !== "DECLINED"
                    ? `<button onclick="changeRsvpStatus('${r.id}', 'DECLINED')" class="px-3 py-1 rounded-lg bg-red-100 text-red-600 text-xs font-bold hover:bg-red-200 transition">Từ chối</button>`
                    : ""
                }
                ${
                  r.status !== "ACCEPTED"
                    ? `<button onclick="changeRsvpStatus('${r.id}', 'ACCEPTED')" class="px-3 py-1 rounded-lg bg-green-100 text-green-600 text-xs font-bold hover:bg-green-200 transition">Chấp nhận</button>`
                    : ""
                }
            </div>
        </div>`;
    })
    .join("");
}

// Send Bonus Notification
export function sendBonusNotification(sessionId) {
  showToast("Thông báo mời tham gia đã được gửi!", "info");
}

// Change RSVP Status
export function changeRsvpStatus(rsvpId, newStatus) {
  const rsvp = bonusRsvps.find((r) => r.id === rsvpId);
  if (rsvp) {
    rsvp.status = newStatus;
    renderBonusRsvps();
    showToast(`Đã cập nhật trạng thái RSVP thành ${newStatus}`, "success");
  }
}

// Initialize Bonus Module
export function initBonusModule() {
  [
    "bonus-title",
    "bonus-course",
    "bonus-date",
    "bonus-start",
    "bonus-duration",
  ].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("input", updateBonusPreview);
  });

  renderBonusSessions();
  renderBonusRsvps();
}

// Make functions globally available
window.submitBonusSession = submitBonusSession;
window.onBonusScopeChange = onBonusScopeChange;
window.updateBonusPreview = updateBonusPreview;
window.renderBonusSessions = renderBonusSessions;
window.renderBonusRsvps = renderBonusRsvps;
window.sendBonusNotification = sendBonusNotification;
window.changeRsvpStatus = changeRsvpStatus;
