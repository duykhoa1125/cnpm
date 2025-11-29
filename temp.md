1. Sinh viên (Student)
Route: dashboard_student, courses_student, library_view, profile_student

Cải thiện UI & Tính năng thiếu:
Dashboard (Quan trọng):
Nhắc nhở quan trọng (Important Reminders): Hiện tại đang là HTML tĩnh (hardcoded). Cần viết hàm renderStudentDashboard() để hiển thị nhắc nhở dựa trên deadline thực tế từ mock-data.
Sự kiện trong ngày (Daily Events): Cũng đang là HTML tĩnh. Cần mapping với lịch học thực tế của sinh viên.
Thời khóa biểu tuần: Bảng hiển thị đang fix cứng dữ liệu. Các nút mũi tên (Chevron) chuyển tuần chưa có sự kiện 
onclick
.

Hồ sơ (Profile):
Dữ liệu chỉnh sửa chỉ lưu tạm thời trên DOM, sẽ mất khi reload trang (đây là đặc điểm của prototype không có backend, nhưng có thể cải thiện bằng localStorage nếu muốn trải nghiệm tốt hơn).
2. Giảng viên (Tutor)
Route: dashboard_tutor, tutor_schedule, courses_tutor

Cải thiện UI & Tính năng thiếu:
Dashboard:
Lớp dạy sắp tới: Đang là HTML tĩnh. Cần hiển thị động dựa trên lịch dạy.
Bảng tổng quan tiến độ sinh viên: Dữ liệu trong bảng đang fix cứng. Cần lấy từ mockStudentProgress.
Quản lý khóa học:
Nút "Đăng ký lịch dạy" ở header dashboard chưa có logic xử lý (hoặc chỉ chuyển tab đơn giản).
Chưa có tính năng Upload tài liệu thực sự (chỉ có giao diện xem).
3. Admin & Quản lý (Admin, Department, Academic)
Route: system_admin, dashboard_admin, dashboard_department

Cải thiện UI & Tính năng thiếu:
System Admin:
Cấu hình hệ thống (Toggles): Các nút gạt "Chế độ bảo trì" và "Debug Mode" hiện chỉ có tác dụng hiển thị (visual only), chưa có sự kiện onchange để lưu trạng thái.
Quản lý User: Các tính năng Thêm/Sửa user đang dùng prompt() của trình duyệt. Để đạt chuẩn "Premium UI", nên chuyển sang dùng Modal chuyên nghiệp hơn.
Dashboard Admin:
Biểu đồ trafficChart và userChart đã hoạt động tốt, nhưng các số liệu thống kê nhanh (Quick Stats) ở trên cùng vẫn có thể đang fix cứng.
4. Các nút bấm chưa hoạt động (Unimplemented Buttons)
Dưới đây là danh sách cụ thể các nút đang "chết" hoặc chưa có logic:

Student Dashboard: 2 nút mũi tên < và > ở phần "Thời khóa biểu tuần".
Library: Nút "Tải xuống" trong Modal xem trước tài liệu (hiện tại chỉ hiện Toast, chưa có logic giả lập tải file).
Notifications: Nút "Đánh dấu tất cả là đã đọc" (nếu có trong thiết kế) chưa thấy logic xử lý.
Footer: Các link trong Footer (nếu có) thường chưa dẫn đi đâu.
Đề xuất thực hiện ngay:
Để nâng cao chất lượng prototype ngay lập tức, tôi đề xuất thực hiện theo thứ tự ưu tiên sau:

Dynamic Student Dashboard: Viết hàm renderStudentDashboard để biến các phần "Nhắc nhở", "Sự kiện", và "Thời khóa biểu" thành dữ liệu động. Điều này sẽ làm cho trang Dashboard sinh động và thật hơn rất nhiều.
Dynamic Tutor Dashboard: Tương tự, làm động phần "Lớp dạy sắp tới" và bảng tiến độ.
Nâng cấp Admin User Modal: Thay thế prompt() bằng Modal đẹp mắt cho tính năng thêm/sửa user.
Bạn muốn tôi bắt đầu với phần nào trước? (Khuyên dùng: Dynamic Student Dashboard)