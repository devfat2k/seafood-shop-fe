# Spec: Tối Ưu Toàn Diện UI/UX, Sửa Lỗi Bộ Lọc & Chuẩn Hóa Flow Mua Hàng Từ Trang Chủ Đến Thanh Toán

> **Mã Spec**: `SPEC-UI-UX-FLOW-OPTIMIZATION-01`  
> **Người soạn**: Senior Frontend Engineer  
> **Trạng thái**: Draft — Chờ duyệt (Pending Approval)  
> **Tài liệu đối chiếu**: `design-spec.md`, `USER_API_DOCUMENTATION.md`, `cart-and-checkout.md`, `GEMINI.md`, `AGENTS.md`

---

## 1. Mục tiêu

Khắc phục toàn bộ các vấn đề nghiêm trọng về giao diện (UI), trải nghiệm thao tác (UX Flow), các bug logic chức năng và sự lộn xộn trong mã nguồn:
1. **Sửa dứt điểm lỗi bộ lọc sản phẩm (`/products`)**: Bộ lọc danh mục, khoảng giá, trạng thái còn hàng và tìm kiếm không hoạt động do xung đột cache `initialData` trong TanStack Query.
2. **Nâng cấp thẩm mỹ toàn diện từ Trang Chủ đến Sản Phẩm**:
   - **Hero Section**: Chuyển từ giao diện tối (Dark mode vi phạm spec) sang nền be sáng `#FBF7F0` (Ivory Warm), kết hợp typography display **Fraunces** + **Be Vietnam Pro**, áp dụng kỹ thuật **Breakout Product Image** (ảnh hải sản tràn viền lơ lửng với shadow `product-drop`).
   - **Bento Grid & Featured Sections**: Chuẩn hóa nhịp điệu thị giác, card hải sản sắc nét, hiệu ứng tương tác mượt mà.
   - **Product Card**: Áp dụng Breakout Image tràn viền, bóng riêng dưới thân, badge trạng thái chuẩn màu, giá `xxx.xxx₫`.
   - **Product Detail**: Bộ ảnh gallery chuyển đổi mượt, bộ chọn quy cách/trọng lượng linh hoạt, nút Mua ngay/Thêm giỏ hàng chuẩn xác.
3. **Chuẩn hóa Flow Thêm Giỏ Hàng $\rightarrow$ Thanh Toán (Checkout 3 bước)**:
   - **Cart Drawer**: Trải nghiệm thêm giỏ hàng mượt mà, cập nhật realtime, hỗ trợ undo toast khi xóa món, cảnh báo tồn kho rõ ràng.
   - **Checkout 3 bước (Progress Indicator)**:
     - *Bước 1 — Thông tin giao nhận*: Địa chỉ nhận hàng, số điện thoại, ghi chú giao nhận.
     - *Bước 2 — Phương thức thanh toán*: COD, VNPay, QR Ngân hàng (VietQR), MoMo, ZaloPay với visual card nổi bật.
     - *Bước 3 — Xác nhận đơn & Thanh toán*: Tóm tắt chi phí, mã đơn. Với VNPay: chuyển hướng cổng thanh toán chính thống; Với QR Bank: hiển thị khung QR 200x200, thông tin STK/Chủ TK/Nội dung CK có nút Copy nhanh, đếm ngược 15 phút, nút "Tôi đã chuyển khoản".
   - **Trang Kết quả thanh toán (`/payment-result`)**: Xóa bỏ các nút toggle giả mạo `[Thành Công] [Thất Bại]`, render đúng 4 trạng thái giao dịch theo dữ liệu thực tế từ URL/Order API.
4. **Clean Code & Dọn Rác Mã Nguồn**:
   - Xóa bỏ 100% Noise Comments (`{/* Header */}`, `{/* 3 UI States */}`,...) vi phạm Rule 7 `GEMINI.md`.
   - Tuân thủ Spacing Scale chuẩn (`4, 8, 12, 16, 24, 32, 48, 64, 96px`).
   - Phân rã component quá 150 dòng và custom hooks.

---

## 2. User Flow Chi Tiết

### 2.1 Luồng Khám Phá & Lọc Sản Phẩm (`/products` & `/search`)
1. Người dùng truy cập `/products` hoặc click từ Bento Danh mục / Menu Header.
2. Người dùng thao tác bộ lọc bên trái (Sidebar) hoặc trên thanh công cụ Mobile:
   - Chọn/bỏ chọn 1 hoặc nhiều Danh mục hải sản $\rightarrow$ Giao diện cập nhật danh sách ngay lập tức.
   - Chọn khoảng giá preset hoặc kéo dual range $\rightarrow$ Danh sách lọc theo `minPrice`/`maxPrice`.
   - Bật toggle "Chỉ sản phẩm còn hàng" $\rightarrow$ Chỉ hiển thị `stock > 0`.
   - Gõ từ khóa tìm kiếm $\rightarrow$ Tự động debounce 400ms và reload danh sách.
   - Bấm "⟲ Xóa lọc" $\rightarrow$ Reset toàn bộ về trạng thái mặc định.
3. URL search params đồng bộ 2 chiều (`?category=...&minPrice=...&maxPrice=...&inStock=true`).

### 2.2 Luồng Thêm Vào Giỏ Hàng (`CartDrawer`)
1. Từ Trang Chủ, Danh Sách hoặc Chi Tiết Sản Phẩm, người dùng bấm "Thêm vào giỏ":
   - Toast thông báo thành công kèm tên sản phẩm và nút "Xem giỏ hàng".
   - Badge số lượng trên Header tăng realtime.
   - Mở nhẹ nhàng `CartDrawer` từ cạnh phải (Desktop) hoặc Bottom Sheet (Mobile).
2. Trong `CartDrawer`:
   - Tăng/giảm số lượng bằng nút `+` / `-` (không vượt tồn kho).
   - Bấm xóa món $\rightarrow$ Món biến mất + hiển thị Toast Hoàn tác (Undo trong 5s).
   - Hiển thị Tạm tính chính xác `xxx.xxx₫`.
   - Bấm "Tiến Hành Thanh Toán" $\rightarrow$ Điều hướng sang `/checkout`.

### 2.3 Luồng Thanh Toán 3 Bước (`/checkout`)
- **Bước 1 — Địa chỉ giao hàng**:
  - Khách đã đăng nhập: hiển thị danh sách địa chỉ từ `/api/v1/addresses/me`, chọn địa chỉ nhận hàng (không tự ý gửi mutation đổi default address nếu khách chỉ muốn giao đơn này), nút Thêm địa chỉ mới (modal).
  - Khách chưa đăng nhập: hiển thị banner nhắc đăng nhập hoặc cho phép mở AuthModal một chạm, đồng thời giữ nguyên giỏ hàng.
- **Bước 2 — Phương thức thanh toán**:
  - Lựa chọn 1 trong các phương thức: `COD`, `VNPAY`, `QR Bank`, `MOMO`, `ZALOPAY`.
  - Radio card hiển thị icon, mô tả và viền `secondary/coral` khi được chọn.
- **Bước 3 — Xác nhận & Thanh toán**:
  - Hiển thị tóm tắt đơn hàng (danh sách món, tổng tiền, địa chỉ, phương thức đã chọn).
  - Khách bấm "Xác Nhận Đặt Hàng":
    - Gọi API `POST /api/v1/orders`.
    - Nếu chọn **COD / MOMO / ZALOPAY**: Xóa giỏ hàng $\rightarrow$ chuyển hướng sang `/payment-result?orderId=...&status=SUCCESS`.
    - Nếu chọn **VNPAY**: Gọi API `POST /api/v1/payments/{orderId}/create` lấy `paymentUrl` $\rightarrow$ Chuyển hướng trình duyệt `window.location.href = paymentUrl`. Khi thanh toán xong, cổng VNPay redirect về backend $\rightarrow$ Backend redirect về `/payment-result?orderId=...&status=SUCCESS/FAILED`.
    - Nếu chọn **QR Bank**: Chuyển sang màn hình QR Chuyển khoản (VietQR tự động generate theo mã đơn và số tiền), hiển thị STK, Ngân hàng, Chủ tài khoản, Nội dung chuyển khoản kèm nút Copy, đồng hồ đếm ngược 15 phút, nút "Tôi đã chuyển khoản".

### 2.4 Luồng Kết Quả Thanh Toán (`/payment-result`)
1. Đọc `orderId`, `status`, `paymentId` từ URL parameters.
2. Fetch thông tin đơn hàng thật qua API `GET /api/v1/orders/{id}`.
3. Render trạng thái tương ứng:
   - **Thành công**: Icon checkmark xanh lá, mã đơn hàng, phương thức, tổng thanh toán, nút "Theo dõi đơn hàng" và "Tiếp tục mua sắm".
   - **Thất bại**: Icon cảnh báo đỏ, lý do lỗi, nút "Thử thanh toán lại" (gọi lại paymentUrl mà không tạo đơn rác) và "Về trang chủ".
   - **Đang chờ xác nhận (QR Bank)**: Icon đồng hồ cát, hướng dẫn kiểm tra và nút "Xem lại mã QR".

---

## 3. Danh Sách API Liên Quan

| API Endpoint | Method | Chức năng | Áp dụng trong Spec |
|---|---|---|---|
| `/api/v1/home` | GET | Lấy aggregated data trang chủ | Homepage hero, bento, featured |
| `/api/v1/categories` | GET | Danh sách danh mục | Filter sidebar, bento, header nav |
| `/api/v1/products` | GET | Dynamic Criteria Search sản phẩm | Product catalog, filter, search |
| `/api/v1/products/{id}` | GET | Chi tiết 1 sản phẩm | Product detail, quick view modal |
| `/api/v1/users/me` | GET | Thông tin người dùng hiện tại | Auth status, checkout prefill |
| `/api/v1/addresses/me` | GET | Sổ địa chỉ người dùng | Checkout bước 1 |
| `/api/v1/addresses` | POST | Thêm địa chỉ mới | Checkout modal thêm địa chỉ |
| `/api/v1/orders` | POST | Tạo đơn hàng mới | Checkout bước 3 |
| `/api/v1/orders/{id}` | GET | Chi tiết đơn hàng | Payment result, Order tracking |
| `/api/v1/orders/my-orders` | GET | Lịch sử đơn hàng của tôi | Account orders tab |
| `/api/v1/payments/{orderId}/create` | POST | Tạo URL thanh toán VNPay | Checkout VNPay flow |

---

## 4. UI States Bắt Buộc

Mọi màn hình động (`/`, `/products`, `/products/[id]`, `/checkout`, `/account`, `/search`, `/payment-result`) phải có đủ:
1. **Loading**: Skeleton Loader đúng tỷ lệ khung hình thực tế (Bento skeleton, Card grid skeleton, Detail skeleton, Checkout skeleton), tuyệt đối không dùng spinner xoay toàn trang.
2. **Empty**: Hình ảnh/icon minh họa chủ đề biển + tiêu đề tiếng Việt rõ ràng + nút hành động (VD: "Khám phá hải sản khác", "Làm mới").
3. **Error**: Thông báo lỗi tiếng Việt dễ hiểu + nút "Thử lại" gọi lại `refetch()`.
4. **Success**: Hiển thị đầy đủ nội dung sắc nét theo design tokens chuẩn UXMagic.

---

## 5. Edge Cases & Xử Lý Lỗi

1. **Người dùng lọc không có kết quả**: Hiển thị `ProductCatalogEmpty` với gợi ý mở rộng khoảng giá hoặc chọn danh mục khác, kèm nút "⟲ Xóa tất cả bộ lọc".
2. **Hết hàng khi đang thanh toán**: Backend trả lỗi `INSUFFICIENT_STOCK` (400) $\rightarrow$ Hiển thị thông báo Toast cảnh báo sản phẩm nào đã hết, không xóa giỏ hàng để khách điều chỉnh.
3. **Chưa đăng nhập khi bấm Thanh toán / Mua ngay**: Giữ nguyên giỏ hàng trong `localStorage`, mở `AuthModal`. Sau khi đăng nhập thành công, tự động tiếp tục luồng thanh toán mượt mà.
4. **Khách chưa có địa chỉ nhận hàng**: Nhắc nhở thêm địa chỉ ngay trong Bước 1 của Checkout bằng modal trực quan, không để gọi API tạo đơn bị lỗi 404.
5. **Thanh toán VNPay thất bại / khách hủy**: Đơn hàng vẫn lưu ở trạng thái `PENDING`, trang `/payment-result` cung cấp nút "Thử thanh toán lại" để khách lấy lại link thanh toán mà không tạo thêm đơn mới.

---

## 6. Ngoài Phạm Vi (Out of scope)

- Không tích hợp hệ thống voucher/mã giảm giá phức tạp (theo nguyên tắc tinh gọn trong `cart-and-checkout.md`).
- Không làm tính năng đấu giá hay livestream hải sản.
- Không thay đổi backend API contracts đã cố định tại `USER_API_DOCUMENTATION.md`.
