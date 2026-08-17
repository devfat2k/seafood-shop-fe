# Spec: Module Authentication & Security (Auth)

## 1. Mục tiêu
Cung cấp luồng xác thực bảo mật và thân thiện cho khách hàng của Seafood Shop Web:
- Đăng ký tài khoản mới + xác thực OTP qua Email (tự động đăng nhập sau khi xác thực OTP thành công).
- Đăng nhập tài khoản bằng Email + Mật khẩu. Xử lý trường hợp tài khoản chưa xác thực (redirect/mở OTP modal).
- Quên mật khẩu đa bước: Nhập Email -> Gửi OTP -> Xác thực OTP nhận `actionToken` -> Đặt lại mật khẩu mới bằng `actionToken`.
- Gửi lại OTP (Resend OTP) với bộ đếm ngược 60s và cơ chế chống spam.
- Đăng xuất an toàn (thu hồi refresh token ở backend và dọn sạch storage).
- Quản lý trạng thái xác thực toàn cục (Auth Context / TanStack Query) để cập nhật giao diện Header (Avatar/Tên user vs nút Đăng nhập) và bảo vệ các trang yêu cầu quyền (Account, Orders, Checkout).

## 2. User Flow

### 2.1 Luồng Đăng ký (Register & OTP Flow)
1. Người dùng mở `AuthModal` -> Chọn tab **Đăng Ký**.
2. Nhập `Họ và tên`, `Email`, `Số điện thoại`, `Mật khẩu` (validate qua Zod).
3. Submit form -> Gọi `POST /api/v1/auth/register`.
4. Khi nhận 201 Created:
   - Hiển thị thông báo thành công qua `sonner`.
   - Chuyển sang `OtpVerificationModal` với `purpose: "REGISTER_VERIFICATION"` và `email`.
5. Người dùng nhập 6 số OTP -> Gọi `POST /api/v1/auth/verify-otp`.
6. Backend trả về `accessToken` & `refreshToken` -> Lưu token vào storage, cập nhật user state, đóng modal và hiển thị Toast "Đăng ký và kích hoạt tài khoản thành công!".

### 2.2 Luồng Đăng nhập (Login Flow)
1. Người dùng mở `AuthModal` -> Tab **Đăng Nhập**.
2. Nhập `Email` và `Mật khẩu`.
3. Submit form -> Gọi `POST /api/v1/auth/login`.
4. Nếu thành công (200 OK):
   - Lưu `accessToken` và `refreshToken`.
   - Cập nhật state đăng nhập của User.
   - Đóng modal, thông báo "Đăng nhập thành công!".
5. Nếu lỗi 401 (Tài khoản chưa kích hoạt OTP):
   - Bắt lỗi đặc thù -> Mở `OtpVerificationModal` với `purpose: "REGISTER_VERIFICATION"`, cho phép người dùng nhập OTP hoặc bấm "Gửi lại mã OTP" (`POST /api/v1/auth/resend-otp`).

### 2.3 Luồng Quên & Đặt lại mật khẩu (Forgot & Reset Password Flow)
1. Người dùng click "Quên mật khẩu?" trên `AuthModal` -> Mở `ForgotPasswordModal`.
2. **Bước 1 (Email)**: Nhập email -> Submit gọi `POST /api/v1/auth/forgot-password`.
3. **Bước 2 (OTP)**: Hệ thống gửi OTP về email -> Người dùng nhập 6 số OTP -> Gọi `POST /api/v1/auth/verify-otp` với `purpose: "RESET_PASSWORD"`.
   - Backend trả về `actionToken`.
4. **Bước 3 (Mật khẩu mới)**: Người dùng nhập mật khẩu mới + xác nhận mật khẩu -> Submit gọi `POST /api/v1/auth/reset-password` với `{ actionToken, newPassword }`.
5. **Bước 4 (Thành công)**: Hiển thị màn hình thông báo hoàn tất, cho phép bấm "Quay lại đăng nhập".

### 2.4 Luồng Đăng xuất (Logout)
1. Người dùng chọn Đăng xuất từ Header / Sidebar Account.
2. Gọi `POST /api/v1/auth/logout` với `refreshToken`.
3. Xoá token ở storage, xoá query cache `['auth', 'me']`, redirect hoặc refresh trạng thái UI.

## 3. Danh sách API Liên Quan (Theo docs/API_DOCUMENTATION.md)

| Chức năng | Method | Endpoint | Request Body / Params | Response Data |
|---|---|---|---|---|
| Đăng ký | `POST` | `/api/v1/auth/register` | `{ fullName, email, phoneNumber, password }` | `ApiResponse<UserResponseDto>` |
| Đăng nhập | `POST` | `/api/v1/auth/login` | `{ email, password }` | `ApiResponse<AuthResponse>` |
| Làm mới Token | `POST` | `/api/v1/auth/refresh-token` | `{ refreshToken }` | `ApiResponse<{ accessToken, refreshToken }>` |
| Đăng xuất | `POST` | `/api/v1/auth/logout` | `{ refreshToken }` | `ApiResponse<null>` |
| Xác thực OTP | `POST` | `/api/v1/auth/verify-otp` | `{ email, otpCode, purpose }` | `ApiResponse<{ accessToken?, refreshToken?, actionToken? }>` |
| Quên mật khẩu | `POST` | `/api/v1/auth/forgot-password` | `{ email }` | `ApiResponse<null>` |
| Gửi lại OTP | `POST` | `/api/v1/auth/resend-otp` | `{ email, purpose }` | `ApiResponse<null>` |
| Đặt lại mật khẩu | `POST` | `/api/v1/auth/reset-password` | `{ actionToken, newPassword }` | `ApiResponse<null>` |
| Lấy Profile hiện tại | `GET` | `/api/v1/users/me` | Header `Authorization: Bearer <token>` | `ApiResponse<UserResponseDto>` |

## 4. UI States & Validation Rules
- **Form validation**: Sử dụng `react-hook-form` + `@hookform/resolvers/zod`.
  - Email: chuẩn định dạng email regex.
  - Password: tối thiểu 8 ký tự.
  - PhoneNumber: chuẩn số điện thoại VN 9-11 số.
  - OTP: đúng 6 chữ số (`^\d{6}$`).
- **Loading state**: Nút submit hiển thị spinner + disabled khi mutation đang `isPending`.
- **Error state**: Bắt lỗi `400 Validation`, `401 Unauthorized`, `409 Conflict (Email/SĐT đã tồn tại)`, `429 Too Many Requests (Rate limit)` và hiển thị thông báo lỗi rõ ràng qua toast hoặc inline form error.
- **Design Tokens**: Tuân thủ bảng màu chuẩn của dự án (`primary`, `secondary`, `border`, `card`, `foreground`, `muted-foreground`), loại bỏ hoàn toàn các mã màu hex thô.

## 5. Ngoài phạm vi (Out of scope)
- Đăng nhập bằng Social OAuth (Google, Facebook) — Backend hiện tại chưa cung cấp endpoint này.
- Phân quyền Admin portal (Module RBAC) — Xử lý riêng trong module Admin.
