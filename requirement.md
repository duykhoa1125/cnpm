# TÀI LIỆU ĐẶC TẢ HỆ THỐNG PHẦN MỀM: HCMUT TUTOR SYSTEM

## 1. TỔNG QUAN DỰ ÁN (Project Overview)

### 1.1. Bối cảnh & Mục tiêu
* **Bối cảnh:** Trường Đại học Bách Khoa – ĐHQG TP.HCM (HCMUT) triển khai chương trình Tutor/Mentor. [cite_start]Quy trình hiện tại thủ công, tốn thời gian và khó mở rộng[cite: 853, 854].
* [cite_start]**Mục tiêu:** Xây dựng hệ thống phần mềm quản lý chương trình Tutor hiện đại, tích hợp với hạ tầng CNTT sẵn có (SSO, DataCore, Library), hỗ trợ ghép đôi Tutor-Student, quản lý lịch hẹn và báo cáo thống kê[cite: 861, 864, 866].

### 1.2. Các bên liên quan (Stakeholders) & Tác nhân (Actors)
* [cite_start]**Student (Sinh viên):** Đăng ký chương trình, chọn tutor, đặt lịch, truy cập tài liệu, phản hồi[cite: 857].
* [cite_start]**Tutor (Người hướng dẫn):** Đăng ký lịch dạy, quản lý lớp, theo dõi tiến độ sinh viên, tạo buổi học bổ sung[cite: 857].
* [cite_start]**Department (Khoa/Bộ môn):** Quản lý chất lượng, xem báo cáo phản hồi để cải tiến chương trình[cite: 859].
* [cite_start]**Academic Affairs Office (Phòng Đào tạo):** Quản lý tổng thể, phân bổ nguồn lực[cite: 859].
* [cite_start]**Student Affairs Office (Phòng Công tác Sinh viên):** Quản lý điểm rèn luyện, học bổng liên quan đến hoạt động Tutor[cite: 859].
* [cite_start]**IT Staff (Quản trị viên):** Quản trị kỹ thuật, bảo trì hệ thống, đảm bảo tích hợp[cite: 859].
* **Hệ thống bên ngoài:**
    * [cite_start]**HCMUT_SSO:** Xác thực tập trung[cite: 894].
    * [cite_start]**HCMUT_DATACORE:** Đồng bộ dữ liệu sinh viên/tutor[cite: 896].
    * [cite_start]**HCMUT_LIBRARY:** Truy xuất tài liệu học tập[cite: 914].

---

## 2. YÊU CẦU CHỨC NĂNG (Functional Requirements - Use Cases)

Hệ thống bao gồm 13 Use Case chính:

### UC001: View Feedback (Xem phản hồi)
* **Actor:** Bộ môn, Phòng Đào tạo, Tutor.
* [cite_start]**Mô tả:** Xem dữ liệu đánh giá chất lượng buổi học từ sinh viên để cải tiến[cite: 925].
* [cite_start]**Luồng chính:** Đăng nhập -> Chọn "Xem dữ liệu đánh giá" -> Hệ thống hiển thị báo cáo/thống kê[cite: 925].
* [cite_start]**Tính năng phụ:** Lọc, tìm kiếm, xuất file Excel/PDF[cite: 925].

### UC002: Access Study Material (Truy cập tài liệu học tập)
* **Actor:** Sinh viên, Tutor.
* [cite_start]**Mô tả:** Truy cập giáo trình, tài liệu tham khảo thông qua tích hợp HCMUT_LIBRARY[cite: 927].
* [cite_start]**Luồng chính:** Chọn "Truy cập thư viện" -> Hệ thống kết nối API thư viện -> Tìm kiếm theo từ khóa/môn học -> Xem hoặc tải tài liệu[cite: 927].

### UC003: Manage Personal Profile (Quản lý hồ sơ cá nhân)
* **Actor:** Sinh viên, Tutor.
* [cite_start]**Mô tả:** Xem và điều chỉnh thông tin cá nhân[cite: 930].
* [cite_start]**Lưu ý:** Dữ liệu chính được đồng bộ từ DataCore, người dùng chỉ sửa được các thông tin cho phép[cite: 933].

### UC004: View Progress (Xem tiến độ học tập)
* **Actor:** Tutor, Phòng Đào tạo, Bộ môn.
* [cite_start]**Mô tả:** Xem điểm số, biểu đồ tiến bộ của sinh viên[cite: 935, 937].
* [cite_start]**Luồng chính:** Chọn "Danh sách sinh viên" -> Chọn sinh viên -> Hệ thống hiển thị biểu đồ cột về điểm số/mốc thời gian[cite: 937].

### UC005: Make Feedback (Thực hiện đánh giá)
* **Actor:** Sinh viên.
* [cite_start]**Mô tả:** Đánh giá buổi học sau khi tham gia[cite: 939].
* [cite_start]**Luồng chính:** Hệ thống hiện form sau buổi học -> Chọn sao (1-5) -> Nhập nhận xét -> Gửi[cite: 939].
* [cite_start]**Hậu điều kiện:** Phản hồi được lưu và gửi thông báo cho Tutor[cite: 939].

### UC006: Cancel Register Course (Hủy đăng ký khóa học)
* **Actor:** Sinh viên.
* [cite_start]**Mô tả:** Hủy buổi học đã đăng ký[cite: 941].
* **Quy tắc:**
    * Có thể hoàn tác trong 30 phút.
    * Hủy trước 24h: Hợp lệ.
    * [cite_start]Hủy sau 24h: Ghi nhận vi phạm, cảnh báo cấm đăng ký mới[cite: 456, 941].

### UC007: Log in (Đăng nhập)
* **Actor:** Tất cả người dùng.
* [cite_start]**Mô tả:** Đăng nhập thông qua HCMUT_SSO[cite: 943].
* [cite_start]**Cơ chế:** Redirect sang trang SSO của trường -> Nhập MSSV/Password -> Nhận Token -> Vào hệ thống[cite: 943].

### UC008: Receive Notifications (Nhận thông báo)
* **Actor:** Tất cả người dùng.
* [cite_start]**Mô tả:** Xem thông báo, nhắc nhở (lịch học, hủy lớp, phản hồi) qua biểu tượng chuông[cite: 946].

### UC009: Schedule Appointments (Đăng ký lịch dạy)
* **Actor:** Tutor.
* [cite_start]**Mô tả:** Tutor đăng ký môn học có thể dạy và khung thời gian rảnh[cite: 949].
* [cite_start]**Luồng chính:** Chọn môn học -> Chọn khung giờ -> Hệ thống kiểm tra trùng lịch -> Lưu[cite: 951].

### UC010: Select a Tutor (Đăng ký khóa học)
* **Actor:** Sinh viên.
* [cite_start]**Mô tả:** Sinh viên tìm kiếm và đăng ký lớp học/Tutor[cite: 952].
* [cite_start]**Luồng chính:** Tìm kiếm môn học -> Xem danh sách Tutor/Khung giờ -> Chọn và Đăng ký -> Hệ thống tạo Enrollment[cite: 954].
* [cite_start]**Tính năng phụ:** Hệ thống có thể gợi ý Tutor phù hợp hoặc ghép cặp tự động (AI matching)[cite: 954].

### UC011: Bonus Schedule (Tạo buổi học bổ sung)
* **Actor:** Tutor.
* [cite_start]**Mô tả:** Tutor tạo buổi dạy phụ đạo/ôn tập[cite: 962].
* [cite_start]**Luồng chính:** Điền form (Tiêu đề, Phạm vi mời, Thời gian, Online/Offline) -> Tạo[cite: 964].
* [cite_start]**Trạng thái:** "Active" (hoạt động ngay) hoặc "Pending" (nếu cần Admin duyệt)[cite: 964].

### UC012: Manage System (Quản trị hệ thống)
* **Actor:** IT Staff.
* [cite_start]**Mô tả:** Cấu hình hệ thống, xem Log History, xử lý sự cố[cite: 967, 970].

### UC013: Centralized Authentication (Xác thực tập trung)
* [cite_start]**Mô tả:** Cơ chế nền tảng sử dụng HCMUT_SSO cho toàn bộ hệ thống[cite: 971].

---

## 3. KIẾN TRÚC HỆ THỐNG (System Architecture)

[cite_start]Hệ thống sử dụng **Kiến trúc phân tầng (Layered Architecture)** gồm: Controller, Service, Database/Entity và External Services[cite: 1383].

### 3.1. Các Module chính (Class Design)

#### Module: User & Profile Management
* **Controller:** `LoginController`, `ProfileController`, `AdminController`.
* **Service:** `AuthService` (gọi SSO), `ProfileService`, `AdminService`.
* [cite_start]**External:** `HCMUT_SSO`, `HCMUT_DataCore` (đồng bộ User)[cite: 1076].

#### Module: Course & Material Management
* **Controller:** `CourseController` (đăng ký/hủy khóa), `StudyMaterialController` (xem/tải tài liệu).
* **Service:** `CourseService`, `StudyMaterialService`.
* **Entity:** `Course`, `Enrollment`, `StudyMaterial`.
* [cite_start]**External:** `HCMUT_Library`[cite: 1144].

#### Module: Schedule & Session Management
* **Controller:** `ScheduleController` (tạo lịch, tạo bonus session).
* **Service:** `ScheduleService`.
* **Entity:** `Schedule`, `Session`, `BonusSession`.
* [cite_start]**Logic:** Kiểm tra trùng lịch, phê duyệt Bonus Session[cite: 1198].

#### Module: Feedback & Progress Management
* **Controller:** `FeedbackController`, `ProgressController`.
* **Service:** `FeedbackService`, `ProgressService` (tạo biểu đồ).
* [cite_start]**Entity:** `Feedback`, `ProgressReport`[cite: 1252].

#### Module: Notification System
* **Controller:** `NotificationController`.
* [cite_start]**Service:** `NotificationService` (được các service khác gọi để gửi thông báo khi có sự kiện như hủy lớp, có phản hồi mới)[cite: 1301].

### 3.2. Mô hình triển khai (Deployment View)
* **Client:** Web Browser trên Laptop/PC.
* **Server:** Web/Application Server chạy trên hạ tầng Cloud (File `.war`).
* **Database:** Server's Database (lưu trữ nội bộ TutorSystem).
* **Kết nối ngoài (Integration):**
    * [cite_start]Gọi `HCMUT_SSO`, `HCMUT_DataCore`, `HCMUT_Library` qua giao thức HTTPS (API Call)[cite: 1330, 1347].

---

## 4. YÊU CẦU PHI CHỨC NĂNG (Non-functional Requirements)

### 4.1. Hiệu năng (Performance)
* [cite_start]**Thời gian phản hồi:** < 2 giây (tải trang), < 500ms (tương tác tức thì)[cite: 1618, 1619].
* [cite_start]**Chịu tải:** Phục vụ đồng thời ít nhất 1.000 người dùng (cao điểm lên tới 3.000 - 6.000 sinh viên)[cite: 1009, 1624].
* [cite_start]**Thông lượng:** Xử lý 100 yêu cầu/giây[cite: 1628].

### 4.2. Khả dụng & Tin cậy (Availability & Reliability)
* [cite_start]**Uptime:** 99.5%[cite: 1633].
* **Backup:** Sao lưu tự động hàng ngày.
* [cite_start]**Recovery:** RTO < 4 giờ (khôi phục sau sự cố), RPO < 24 giờ (dữ liệu mất tối đa)[cite: 1637, 1638].

### 4.3. Bảo mật (Security)
* [cite_start]**Xác thực:** Bắt buộc qua HCMUT_SSO, không lưu mật khẩu người dùng[cite: 1650].
* [cite_start]**Mã hóa:** HTTPS/TLS cho truyền tải dữ liệu[cite: 1659].
* [cite_start]**Phân quyền:** RBAC (Role-Based Access Control) nghiêm ngặt (Sinh viên chỉ sửa hồ sơ mình, Tutor chỉ xem lớp mình)[cite: 1653].

### 4.4. Tích hợp (Integrability)
* **SSO:** Tuân thủ giao thức của trường (SAML/OAuth).
* [cite_start]**DataCore:** Đồng bộ dữ liệu định kỳ (ví dụ: mỗi 24h) để cập nhật danh sách sinh viên/tutor[cite: 1667].
* [cite_start]**Library:** Gọi API thư viện tuân thủ bản quyền[cite: 1670].

### 4.5. Khác
* [cite_start]**Usability:** Giao diện nhất quán, tối đa 3-4 bước để đặt lịch[cite: 1680].
* [cite_start]**Maintainability:** Code dạng module, dễ mở rộng (ví dụ nâng cấp module AI sau này)[cite: 1691].
* [cite_start]**Log:** Ghi log lịch sử hoạt động, tự động xóa log sau 30 ngày[cite: 1002].
* [cite_start]**Session:** Tự động đăng xuất sau 20 phút không hoạt động[cite: 998].