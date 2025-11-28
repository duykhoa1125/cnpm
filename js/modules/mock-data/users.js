/**
 * Mock System Data
 * Contains user data, system logs, and cancellation rules
 */

// Mock Users Data (Admin)
export let mockUsers = [
  {
    id: "1910001",
    name: "Nguyễn Văn A",
    role: "student",
    email: "a.nguyen@hcmut.edu.vn",
    status: "active",
  },
  {
    id: "T001",
    name: "Trần Văn B",
    role: "tutor",
    email: "b.tran@hcmut.edu.vn",
    status: "active",
  },
  {
    id: "1910002",
    name: "Lê Thị C",
    role: "student",
    email: "c.le@hcmut.edu.vn",
    status: "blocked",
  },
  {
    id: "A001",
    name: "Admin User",
    role: "admin",
    email: "admin@hcmut.edu.vn",
    status: "active",
  },
];

export function setMockUsers(users) {
  mockUsers = users;
}

// System Logs Data
export let systemLogs = [
  {
    ts: "2025-11-20 10:10:12",
    level: "INFO",
    actor: "System",
    action: "Service started",
    details: "All services running",
  },
  {
    ts: "2025-11-20 10:12:05",
    level: "WARN",
    actor: "SyncJob",
    action: "DataCore latency",
    details: "Response 1200ms",
  },
  {
    ts: "2025-11-20 10:45:00",
    level: "INFO",
    actor: "Admin",
    action: "Manual sync",
    details: "Sync completed",
  },
  {
    ts: "2025-11-21 09:20:33",
    level: "ERROR",
    actor: "HCMUT_Library",
    action: "Fetch failed",
    details: "Timeout",
  },
  {
    ts: "2025-11-22 14:02:10",
    level: "INFO",
    actor: "AutoBackup",
    action: "Backup completed",
    details: "Size: 12MB",
  },
  {
    ts: "2025-11-28 08:00:00",
    level: "INFO",
    actor: "AuthService",
    action: "User logged in",
    details: "User 'nguyenvan.a' authenticated",
  },
];

export function setSystemLogs(logs) {
  systemLogs = logs;
}

export function addSystemLog(log) {
  systemLogs.unshift(log);
  if (systemLogs.length > 50) systemLogs.pop();
}

// Cancellation Rules Data
export let mockCancellationRules = [
  {
    id: 1,
    condition: "Hủy trước khi bắt đầu học kỳ",
    consequence: "Không ghi nhận vào bảng điểm",
    refund: 100,
    violationLevel: "None",
  },
  {
    id: 2,
    condition: "Hủy trong 2 tuần đầu học kỳ",
    consequence: "Ghi nhận điểm W (Rút môn học)",
    refund: 70,
    violationLevel: "None",
  },
  {
    id: 3,
    condition: "Hủy sau 2 tuần đầu nhưng trước thi giữa kỳ",
    consequence: "Ghi nhận điểm W, tính vào số tín chỉ rút",
    refund: 0,
    violationLevel: "Warning",
  },
  {
    id: 4,
    condition: "Hủy sau khi thi giữa kỳ",
    consequence: "Ghi nhận điểm F (Rớt môn)",
    refund: 0,
    violationLevel: "Serious",
  },
];

export function setMockCancellationRules(rules) {
  mockCancellationRules = rules;
}
