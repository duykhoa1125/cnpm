# Kế hoạch Cải thiện Dự án (Tập trung Cấu trúc & Tính năng mới)

Kế hoạch này tập trung vào việc làm sạch mã nguồn và bổ sung các tính năng giao diện mới để demo hấp dẫn hơn, bỏ qua các yếu tố về xử lý dữ liệu động hay hiệu ứng loading.

## 1. Cấu trúc lại Mã nguồn (Code Restructuring)

Mục tiêu: Tách biệt rõ ràng giữa logic (JS) và giao diện (HTML), giúp code dễ đọc và dễ sửa đổi.

### 1.1. Tách HTML Templates (Template Extraction)

Hiện tại, code HTML đang nằm lẫn lộn trong các file JavaScript (ví dụ: `courses-student.js`, `ui.js`).

- **Giải pháp**: Tạo thư mục `js/templates/` hoặc file `js/modules/templates.js`.
- **Thực hiện**:
  - Chuyển các chuỗi string HTML (như thẻ Card khóa học, dòng thông báo, modal content) vào các hàm trả về string trong `templates.js`.
  - File logic chính chỉ gọi hàm render và truyền dữ liệu vào.
  - _Ví dụ_: `renderCourseCard(course)` thay vì viết template string dài trong vòng lặp map.

### 1.2. Chuẩn hóa CSS & Components

- **Giải pháp**: Nhóm các class Tailwind/CSS thường dùng vào file CSS chung hoặc định nghĩa biến.
- **Thực hiện**:
  - Rà soát các đoạn code lặp lại (ví dụ: style của các nút bấm, style của các thẻ Card).
  - Đảm bảo tính nhất quán về UI (màu sắc, spacing) giữa các trang Admin, Student, và Tutor.

### 1.3. Centralize Configuration (Tập trung Cấu hình)

- **Giải pháp**: Đưa các thông số cấu hình cứng (như danh sách menu, tiêu đề trang, breadcrumb) về một nơi duy nhất.
- **Thực hiện**:
  - Kiểm tra lại `navigation-config.js` để đảm bảo nó quản lý toàn bộ cấu trúc menu.

## 2. Đề xuất Tính năng Mới (New Features - UI Only)

Mục tiêu: Thêm các màn hình và chức năng demo để làm phong phú trải nghiệm người dùng.

### 2.1. Lịch Biểu Trực quan (Visual Schedule Calendar)

- **Hiện tại**: Lịch học chỉ là danh sách dạng bảng.
- **Nâng cấp**:
  - Xây dựng giao diện Lịch tuần (Weekly Calendar View) dạng lưới (Grid).
  - Hiển thị các tiết học dưới dạng các khối màu trên lịch.
  - Cho phép chuyển đổi giữa "Xem danh sách" và "Xem lịch".

### 2.2. Hồ sơ Năng lực Sinh viên (Student Skill Profile)

- **Tính năng**: Hiển thị biểu đồ Radar (Mạng nhện) về kỹ năng của sinh viên.
- **Chi tiết**:
  - Các trục: Chuyên cần, Bài tập, Kiểm tra, Thực hành, Tham gia.
  - Giao diện đẹp mắt, hiện đại để sinh viên thấy điểm mạnh/yếu của mình.

### 2.3. Giao diện Chat AI Tutor (AI Assistant UI)

- **Tính năng**: Mở rộng phần `ai_tutor_matching`.
- **Chi tiết**:
  - Xây dựng giao diện khung chat bên phải hoặc modal chat nổi.
  - Có sẵn các câu hỏi gợi ý (Chips) để người dùng click vào (ví dụ: "Gợi ý môn học", "Tình hình học tập").
  - Hiển thị câu trả lời mẫu đẹp mắt (Markdown support giả lập).

### 2.4. Xuất Báo cáo / Bảng điểm (Export UI)

- **Tính năng**: Thêm nút "Xuất PDF" hoặc "In bảng điểm".
- **Chi tiết**:
  - Thiết kế mẫu trang in (Print layout) cho bảng điểm hoặc lịch học.
  - Khi bấm nút, hiển thị giao diện xem trước (Preview) của báo cáo.

### 2.5. Trung tâm Thông báo Nâng cao (Notification Center)

- **Tính năng**: Trang quản lý thông báo riêng biệt.
- **Chi tiết**:
  - Phân loại thông báo: Học tập, Hệ thống, Sự kiện.
  - Giao diện đánh dấu "Đã đọc", "Xóa tất cả".

---

**Lộ trình thực hiện:**

1.  **Refactor Templates**: Ưu tiên làm sạch file `courses-student.js` và `ui.js` trước.
2.  **Visual Calendar**: Tính năng này sẽ tạo ấn tượng thị giác tốt nhất.
3.  **AI Chat UI**: Hoàn thiện tính năng AI đang có sẵn file partial.
