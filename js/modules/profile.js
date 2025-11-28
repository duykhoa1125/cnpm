/**
 * Profile Module
 * Handles student and tutor profile management
 */

import { showToast, setButtonLoading, handleImagePreview } from "./ui.js";

// Toggle Student Profile Edit
export function toggleProfileEdit() {
  const form = document.getElementById("student-edit-mode");
  const isHidden = form.classList.contains("hidden");

  if (isHidden) {
    // Pre-fill data
    document.getElementById("student-name-input").value =
      document.getElementById("student-name-display").innerText;
    document.getElementById("student-email-input").value =
      document.getElementById("student-email-display").innerText;
    document.getElementById("student-phone-input").value =
      document.getElementById("student-phone-display").innerText;

    // Reset Image Preview
    document.getElementById("student-avatar-preview").src = "";
    document.getElementById("student-avatar-preview").classList.add("hidden");
    document
      .getElementById("student-avatar-placeholder")
      .classList.remove("hidden");
    document.getElementById("student-avatar-input").value = "";

    form.classList.remove("hidden");
  } else {
    form.classList.add("hidden");
  }
}

// Update Student Profile
export function updateProfile(e) {
  e.preventDefault();
  const btn = e.target.querySelector("button[type='submit']");
  setButtonLoading(btn, true);

  const name = document.getElementById("student-name-input").value.trim();
  const email = document.getElementById("student-email-input").value.trim();
  const phone = document.getElementById("student-phone-input").value.trim();
  const avatarInput = document.getElementById("student-avatar-input");

  // Validation
  if (!name) {
    showToast("Vui lòng nhập họ tên!", "error");
    setButtonLoading(btn, false);
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showToast("Email không hợp lệ!", "error");
    setButtonLoading(btn, false);
    return;
  }

  const phoneRegex = /^[0-9]{10,11}$/;
  if (!phoneRegex.test(phone.replace(/\s/g, ""))) {
    showToast("Số điện thoại không hợp lệ!", "error");
    setButtonLoading(btn, false);
    return;
  }

  setTimeout(() => {
    // Update DOM
    document.getElementById("student-name-display").innerText = name;
    document.getElementById("student-email-display").innerText = email;
    document.getElementById("student-phone-display").innerText = phone;

    // Update Avatar if changed
    if (avatarInput.files && avatarInput.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        document.getElementById("student-avatar-display").src = e.target.result;
      };
      reader.readAsDataURL(avatarInput.files[0]);
    }

    showToast("Hồ sơ sinh viên đã được cập nhật!", "success");
    toggleProfileEdit();
    setButtonLoading(btn, false);
  }, 800);
}

// Toggle Tutor Profile Edit
export function toggleTutorProfileEdit() {
  const form = document.getElementById("tutor-edit-mode");
  const isHidden = form.classList.contains("hidden");

  if (isHidden) {
    // Pre-fill
    document.getElementById("tutor-name-input").value =
      document.getElementById("tutor-name-display").innerText;
    document.getElementById("tutor-email-input").value =
      document.getElementById("tutor-email-display").innerText;
    document.getElementById("tutor-phone-input").value =
      document.getElementById("tutor-phone-display").innerText;

    // Reset Image Preview
    document.getElementById("tutor-avatar-preview").src = "";
    document.getElementById("tutor-avatar-preview").classList.add("hidden");
    document
      .getElementById("tutor-avatar-placeholder")
      .classList.remove("hidden");
    document.getElementById("tutor-avatar-input").value = "";

    form.classList.remove("hidden");
  } else {
    form.classList.add("hidden");
  }
}

// Update Tutor Profile
export function updateTutorProfile(e) {
  e.preventDefault();
  const btn = e.target.querySelector("button[type='submit']");
  setButtonLoading(btn, true);

  const name = document.getElementById("tutor-name-input").value.trim();
  const email = document.getElementById("tutor-email-input").value.trim();
  const phone = document.getElementById("tutor-phone-input").value.trim();
  const avatarInput = document.getElementById("tutor-avatar-input");

  // Validation
  if (!name) {
    showToast("Vui lòng nhập họ tên!", "error");
    setButtonLoading(btn, false);
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showToast("Email không hợp lệ!", "error");
    setButtonLoading(btn, false);
    return;
  }

  const phoneRegex = /^[0-9]{10,11}$/;
  if (!phoneRegex.test(phone.replace(/\s/g, ""))) {
    showToast("Số điện thoại không hợp lệ!", "error");
    setButtonLoading(btn, false);
    return;
  }

  setTimeout(() => {
    // Update DOM
    document.getElementById("tutor-name-display").innerText = name;
    document.getElementById("tutor-email-display").innerText = email;
    document.getElementById("tutor-phone-display").innerText = phone;

    // Update Avatar if changed
    if (avatarInput.files && avatarInput.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        document.getElementById("tutor-avatar-display").src = e.target.result;
      };
      reader.readAsDataURL(avatarInput.files[0]);
    }

    showToast("Hồ sơ Tutor đã được cập nhật!", "success");
    toggleTutorProfileEdit();
    setButtonLoading(btn, false);
  }, 800);
}

// Make functions globally available
window.toggleProfileEdit = toggleProfileEdit;
window.updateProfile = updateProfile;
window.toggleTutorProfileEdit = toggleTutorProfileEdit;
window.updateTutorProfile = updateTutorProfile;
window.handleImagePreview = handleImagePreview;
