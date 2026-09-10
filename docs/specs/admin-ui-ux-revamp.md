# Spec: Cải Tổ Toàn Diện UI/UX Admin Portal (Big Update)

## 1. Mục tiêu
Giải quyết triệt để các vấn đề hiển thị và trải nghiệm quản trị phía Admin Portal:
- **Panel & Layout**: Mở rộng không gian hiển thị, cải tiến Sidebar phân nhóm khoa học với kích thước thoáng đãng, TopBar chuyên nghiệp với breadcrumb, thông tin admin và nút truy cập nhanh.
- **Danh sách bảng (Data Tables)**: Tăng kích thước typography, cell padding, hiển thị đầy đủ thumbnail lớn, giá gốc/giá bán, tồn kho có màu cảnh báo, badge trạng thái và gom gọn các thao tác bằng Action Dropdown Menu.
- **Xem chi tiết sản phẩm**: Bổ sung Product Detail Drawer/Sheet xem toàn diện 100% thuộc tính sản phẩm (ảnh lớn, quy cách, xuất xứ, trọng lượng, combo config, giá, tồn kho, ngày tạo).
- **Form thao tác chuyên nghiệp**: Nâng cấp Dialogs lên kích thước lớn (`max-w-3xl`), chia tabs/cột logic (Thông tin cơ bản, Quy cách & Đơn vị, Mô tả), hỗ trợ đầy đủ các trường DTO từ backend (`originalPrice`, `unit`, `spec`, `origin`, `weightOptions`, `productType`).
- **Bám sát 100% API Document**: Không tự vẽ thêm logic hoặc UI không có endpoint hỗ trợ, tận dụng triệt để các API trong `docs/ADMIN_API_DOCUMENTATION.md` (v1.2.0).

## 2. User flow & Các Màn hình Trọng Tâm

### 2.1 Panel & Layout Admin Tổng Thể
- **Sidebar**:
  - Phân nhóm: **Tổng Quan**, **Kinh Doanh** (Sản phẩm, Danh mục, Đơn hàng), **Nội Dung & Marketing** (Hero Banners, Cập bến ngày), **Hệ Thống & Bảo Mật** (Người dùng, Phân quyền RBAC).
  - Hover/Active state sang trọng theo màu token `#FF6B4A` và `#0F7C8C`.
  - Hỗ trợ thu gọn/mở rộng mượt mà.
- **TopBar**:
  - Hiển thị Breadcrumbs theo trang hiện tại.
  - Nút "Xóa Cache Redis Trang Chủ" và "Xem Cửa Hàng" nổi bật.
  - Avatar Admin kèm Role Badge và Dropdown thao tác (Đổi mật khẩu, Đăng xuất).

### 2.2 Quản Lý Sản Phẩm (`/admin/products`)
1. **Bảng Danh Sách Sản Phẩm**:
   - Toolbar: Tìm kiếm (debounce), Lọc theo Danh mục, Lọc theo Loại sản phẩm (REGULAR/COMBO), Lọc trạng thái (Đang bán/Ẩn), Chọn số lượng hiển thị (10/20/50).
   - Table Row: Thumbnail ảnh 48x48px chất lượng cao, Tên sản phẩm kèm danh mục & badge combo, Giá bán kèm giá gốc (nếu có khuyến mãi), Tồn kho trực quan (click sửa nhanh), Trạng thái Mở bán (switch/badge), Ghim nổi bật (Star button).
   - Cột Thao tác: Nút "Xem chi tiết" (mở Drawer), Nút "Sửa" và Dropdown menu `...` (Đổi ảnh, Chỉnh kho, Cấu hình Combo, Ghim nổi bật, Xóa).
2. **Xem Chi Tiết Sản Phẩm (Product Detail Sheet/Drawer)**:
   - Mở Sheet trượt từ cạnh phải khi click vào sản phẩm.
   - Hiển thị: Gallery ảnh lớn, SKU/ID, Tên, Danh mục, Giá bán/Giá gốc/% Tiết kiệm, Tồn kho, Đơn vị tính (`unit`), Quy cách (`spec`), Xuất xứ (`origin`), Tùy chọn khối lượng (`weightOptions`), Cấu hình Combo, Mô tả chi tiết, Ngày tạo/cập nhật.
   - Quick action buttons: "Chỉnh sửa ngay", "Đổi ảnh", "Điều chỉnh kho".
3. **Form Thêm / Sửa Sản Phẩm (Dialog `max-w-3xl`)**:
   - Tab 1: **Thông tin cơ bản** (Tên sản phẩm, Danh mục, Loại sản phẩm REGULAR/COMBO, Giá bán, Giá gốc, Tồn kho, Trạng thái mở bán).
   - Tab 2: **Quy cách & Xuất xứ** (Đơn vị tính: kg/con/khay..., Quy cách: Size 2-3 con/kg, Xuất xứ: Cà Mau..., Tùy chọn khối lượng: 1kg, 2kg, 5kg...).
   - Tab 3: **Mô tả chi tiết** (Mô tả sản phẩm phong phú).

### 2.3 Quản Lý Đơn Hàng (`/admin/orders`)
- Bảng hiển thị rộng rãi, typography rõ ràng, font-mono cho mã đơn hàng.
- Badge trạng thái trực quan: Chờ xử lý (`PENDING`), Đã xác nhận (`CONFIRMED`), Đang giao (`SHIPPED`), Hoàn tất (`DONE`), Đã hủy (`CANCELLED`).
- Nút chuyển nhanh trạng thái tiếp theo trực tiếp trên hàng.

### 2.4 Quản Lý Danh Mục (`/admin/categories`)
- Bảng hiển thị thumbnail danh mục, tên, mô tả, số sản phẩm, badge bento grid.
- Dialog tạo/sửa danh mục và Dialog cấu hình Bento Grid rộng rãi, preview trực quan.

### 2.5 Quản Lý Nội Dung (Hero Banners & Daily Arrivals) & RBAC / Users
- Bảng hiển thị to rõ, hỗ trợ preview hình ảnh banner và sản phẩm cập bến theo ngày.
- Form tạo/sửa được nới rộng kích thước, hỗ trợ điền thông tin nhanh chóng.

## 3. API Liên Quan (Bám sát `docs/ADMIN_API_DOCUMENTATION.md`)
- `GET /products` (lấy danh sách sản phẩm với filters `page`, `size`, `search`, `categoryId`, `productType`, `sort`)
- `POST /api/v1/admin/products` (tạo sản phẩm với full DTO: `name`, `description`, `price`, `originalPrice`, `stock`, `categoryId`, `unit`, `spec`, `origin`, `weightOptions`, `productType`, `isActive`)
- `PATCH /api/v1/admin/products/{id}` (cập nhật sản phẩm)
- `DELETE /api/v1/admin/products/{id}` (xóa mềm sản phẩm)
- `PATCH /api/v1/admin/products/increase/{id}?quantity=...` & `decrease`
- `POST /api/v1/admin/products/{id}/image`
- `PATCH /api/v1/admin/products/{id}/featured`
- `PATCH /api/v1/admin/products/{id}/combo-config`
- Toàn bộ các API cho Categories, Orders, Users, RBAC, Banners, Daily Arrivals, Home Cache Evict.

## 4. UI States Bắt Buộc
- **Loading State**: Skeleton table đúng số hàng/cột, Skeleton preview cho Drawer và Cards.
- **Empty State**: Icon minh họa theo domain + thông báo tiếng Việt + nút CTA thêm mới hoặc xóa bộ lọc tìm kiếm.
- **Error State**: Thông báo lỗi rõ ràng + nút "Thử lại", Sonner toast chi tiết khi có lỗi từ server.
- **Success State**: Toast phản hồi thành công tiếng Việt, tự động đóng modal/drawer và invalidate TanStack Query cache.

## 5. Quy Chuẩn Kỹ Thuật & Design Tokens
- Tuân thủ Spacing scale: `4, 8, 12, 16, 24, 32, 48, 64, 96px`.
- Màu sắc token: `bg-background`, `text-foreground`, `bg-primary`, `bg-secondary`, `bg-card`, `border-border`.
- Typography: Be Vietnam Pro (`font-sans`), Fraunces (`font-heading`), JetBrains Mono (`font-mono`).
- Định dạng tiền tệ: `xxx.xxx₫`.
- Phân rã component <150 dòng/file, không sử dụng comment thừa/đánh số.

## 6. Ngoài phạm vi (Out of scope)
- Thay đổi cấu trúc backend API hoặc can thiệp Database.
- Tự thêm các API/tính năng không có trong `ADMIN_API_DOCUMENTATION.md`.
