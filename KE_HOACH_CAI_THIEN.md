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
  - Đảm bảo tính nhất quán về UI (màu sắc, spacing) giữa các trang Admin, Student, và Tutor, Academic, Department.

### 1.3. Centralize Configuration (Tập trung Cấu hình)

- **Giải pháp**: Đưa các thông số cấu hình cứng (như danh sách menu, tiêu đề trang, breadcrumb) về một nơi duy nhất.
- **Thực hiện**:
  - Kiểm tra lại `navigation-config.js` để đảm bảo nó quản lý toàn bộ cấu trúc menu.
