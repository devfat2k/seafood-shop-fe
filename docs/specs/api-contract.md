# Hướng dẫn & Lưu ý Dành Cho Frontend (FE / Full-stack & AI Reader)

> **Phần này dành riêng cho Developer Frontend (React, Vue, Next.js...) hoặc các AI subagents hỗ trợ viết code FE để tích hợp chính xác và mượt mà với Backend.**

## Server Connection & Swagger Reference

- **Base URL (Local):** `http://localhost:8085`
- **Swagger UI (Interactive API Docs):** `http://localhost:8085/swagger-ui.html`
- **OpenAPI JSON Spec:** `http://localhost:8085/v1/api-docs`

---

## Quy Chuẩn Phản Hồi API (API Response Conventions)

Tất cả các API đều phản hồi dưới định dạng JSON đồng nhất theo class `ApiResponse<T>`:

```typescript
interface ApiResponse<T> {
  code: number;          // HTTP Status Code (200, 201, 400, 401, 403, 404, 409, 500)
  message: string;       // Thông điệp tiếng Anh/Việt mô tả kết quả
  data: T | null;        // Dữ liệu trả về (Object, Array, PageResponse, hoặc null)
  errors: any | null;    // Chi tiết lỗi (nếu có, ví dụ map lỗi validation)
  timestamp: string;     // ISO Timestamp
}
```

---

## Quy Chuẩn Phân Trang (Pagination Standards)

Các API danh sách (`GET /products`, `GET /categories`, `GET /users`) nhận query parameters phân trang:

- `page`: Trang cần lấy (**0-indexed**, mặc định `0` = trang 1)
- `size`: Số lượng items/trang (mặc định `10`)
- `sort`: Field cần sắp xếp (ví dụ: `price`, `createdAt`, `name`)
- `direction`: Hướng sắp xếp (`asc` hoặc `desc`)

**Dữ liệu trả về nằm trong `data` dưới dạng `PageResponse<T>`:**

```typescript
interface PageResponse<T> {
  content: T[];          // Mảng các item của trang hiện tại
  page: number;          // Số trang hiện tại (0-indexed)
  size: number;          // Kích thước trang
  totalElements: number; // Tổng số item trên toàn hệ thống
  totalPages: number;    // Tổng số trang
  last: boolean;         // Có phải trang cuối cùng không
}
```

---

## Luồng Xác Thực Auth & Token Storage (Frontend Auth Specs)

### Đăng ký & Xác thực OTP (Registration Flow)

```text
[Bước 1] FE gọi POST /api/v1/auth/register
         Body: { fullName, email, phoneNumber, password }
         -> Trả về HTTP 201 + UserResponseDto.
         -> FE hiển thị Modal/Màn hình "Nhập mã OTP 6 chữ số đã gửi về email".

[Bước 2] FE gọi POST /api/v1/auth/verify-otp
         Body: { email, otpCode: "123456", purpose: "REGISTER_VERIFICATION" }
         -> Trả về HTTP 200 + VerifyOtpResponseDto: { accessToken, refreshToken, actionToken: null }
         -> FE lưu accessToken & refreshToken vào LocalStorage / Secure Cookie.
         -> FE set header Authorization cho các request sau & Tự động chuyển thẳng vào Dashboard/Trang chủ!
```

### Đăng nhập (Login Flow)

```text
FE gọi POST /api/v1/auth/login
Body: { email, password }
-> Nếu thành công: Trả về AuthResponseDto: { accessToken, refreshToken, tokenType: "Bearer", expiresIn: 3600000 }
-> Nếu lỗi 401 "AccountNotVerifiedException":
   FE bắt mã lỗi 401 ➔ Thông báo user: "Tài khoản chưa được kích thực email" ➔ Chuyển user sang màn hình nhập OTP ➔ Có nút "Resend OTP" gọi POST /api/v1/auth/resend-otp { email, purpose: "REGISTER_VERIFICATION" }.
```

### Tự động Refresh Token khi 401 Unauthorized (Axios Interceptor Pattern)

- Access Token có thời hạn **1 giờ**.
- Refresh Token có thời hạn **7 ngày**.
- Khi bất kỳ API nào trả về `401 Unauthorized` (do Token hết hạn):
  1. Axios Interceptor tạm hoãn các request bị lỗi.
  2. Gửi request `POST /api/v1/auth/refresh-token` với Body: `{ refreshToken }`.
  3. Nhận `accessToken` mới ➔ Cập nhật LocalStorage/State.
  4. Thử lại request ban đầu với Header `Authorization: Bearer <new_access_token>`.
  5. Nếu Refresh Token cũng hết hạn (401) ➔ Xoá LocalStorage & Chuyển hướng người dùng về `/login`.

---

## Bảng Phân Quyền & Access Rules Cho Frontend

| API Group | Endpoints | Mức độ Phân quyền (Auth Requirement) |
|---|---|---|
| **Public Catalog** | `GET /api/v1/products`, `GET /api/v1/products/{id}`, `GET /api/v1/categories`, `GET /api/v1/categories/{id}` | **Public** — Không cần token (dùng cho khách vãng lai xem sản phẩm) |
| **Auth Operations** | `POST /api/v1/auth/**` (register, verify-otp, resend-otp, forgot-password, login, refresh-token, logout) | **Public** — Không cần token |
| **Payment Return/IPN** | `GET /api/v1/payments/vnpay-return`, `GET /api/v1/payments/vnpay-ipn` | **Public** — VNPay callback |
| **User Profile** | `GET /api/v1/users/me`, `PATCH /api/v1/users/me/update`, `PATCH /api/v1/users/password`, `POST /api/v1/users/me/avatar` | **Authenticated** — Cần Header `Authorization: Bearer <token>` |
| **Orders & Payment** | `POST /api/v1/orders`, `GET /api/v1/orders/user/{userId}`, `GET /api/v1/orders/{id}`, `POST /api/v1/payments/create` | **Authenticated** — User chỉ xem/tạo đơn của chính mình |
| **Admin Portal** | `POST/PUT/DELETE` Products & Categories, `GET /api/v1/products/top-buy`, `GET /api/v1/products/revenue-*`, `GET /api/v1/users`, `PATCH /api/v1/users/{id}/status`, `PATCH /api/v1/orders/{id}/status` | **ADMIN Role Only** — Cần Token có Role `ADMIN` |

---

## Hướng dẫn Upload Media (Hình ảnh Sản phẩm & Avatar User)

- **Header Content-Type:** `multipart/form-data`
- **Field Name:** `file`
- **Dung lượng tối đa:** `5MB`
- **Định dạng cho phép:** `image/jpeg`, `image/png`, `image/webp`, `image/gif`

**Endpoints Upload:**

- POST `/api/v1/users/me/avatar`: Upload avatar cá nhân (Cần Bearer Token)
- POST `/api/v1/products/{id}/image`: Upload ảnh sản phẩm (Cần Admin Bearer Token)

---

> **🎯 KẾT LUẬN CHO FE & AI AGENTS**
>
> Hệ thống Backend **Mini Ecommerce Seafood** hiện đã hoàn chỉnh 100% về cơ chế **Xác thực OTP Email**, **Phân quyền Security**, **Quản lý Sản phẩm/Đơn hàng/Thanh toán VNPay**, **Upload ảnh**, và **Swagger Documentation**. Frontend có thể bắt đầu tích hợp trực tiếp dựa theo tài liệu hướng dẫn trên.