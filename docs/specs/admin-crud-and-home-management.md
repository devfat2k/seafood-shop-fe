# Spec: Bổ sung Đầy đủ Giao diện Thao tác CRUD & Quản lý Trang Chủ Phía Admin (Admin Portal)

## 1. Mục tiêu
Hoàn thiện 100% giao diện tương tác và các thao tác CRUD phía Admin Portal theo chuẩn tài liệu `docs/ADMIN_API_DOCUMENTATION.md` (v1.2.0), bao gồm:
- Quản lý Sản phẩm: Thêm mới, Chỉnh sửa, Upload ảnh, Điều chỉnh tồn kho nhanh (+/-), Cấu hình Combo nổi bật.
- Quản lý Danh mục: Thêm mới, Chỉnh sửa, Upload ảnh, Cấu hình Bento Grid / Trang chủ.
- Quản lý Nội dung Trang chủ: Thêm/Sửa Hero Banner (kèm Upload ảnh), Thêm/Sửa Hải sản cập bến theo ngày (Daily Arrivals).
- Quản lý RBAC & Người dùng: Thêm Role mới, Gán vai trò (Roles) cho người dùng.

## 2. User flow

### 2.1 Quản lý Sản phẩm (`/admin/products`)
1. **Thêm sản phẩm mới**: Admin nhấn nút "+ Thêm sản phẩm" -> Mở Dialog Form -> Nhập thông tin (Tên, Giá, Giá gốc, Tồn kho, Danh mục, Đơn vị, Quy cách, Xuất xứ, Tùy chọn trọng lượng, Loại SP) -> Submit (`POST /api/v1/admin/products`) -> Toast thông báo -> Tự động refresh danh sách.
2. **Chỉnh sửa sản phẩm**: Admin nhấn nút icon "Sửa" trên từng dòng sản phẩm -> Mở Dialog Form điền sẵn thông tin cũ -> Cập nhật -> Submit (`PATCH /api/v1/admin/products/{id}`) -> Toast thông báo -> Refresh danh sách.
3. **Upload ảnh sản phẩm**: Admin nhấn icon "Ảnh" -> Mở Dialog chọn file ảnh từ máy -> Submit multipart/form-data (`POST /api/v1/admin/products/{id}/image`) -> Toast thông báo -> Refresh ảnh tức thì.
4. **Tăng/Giảm tồn kho nhanh**: Admin click vào badge tồn kho hoặc icon Kho -> Nhập số lượng và chọn Tăng/Giảm -> Submit (`PATCH /api/v1/admin/products/{increase|decrease}/{id}?quantity=...`) -> Toast thành công.
5. **Cấu hình Combo Trang chủ**: Admin nhấn icon "Combo" trên sản phẩm -> Mở modal cấu hình (Category combo, Theme sáng/tối, Tag tiết kiệm, Nút CTA, Link href, Cờ Breakout, Thứ tự sắp xếp) -> Submit (`PATCH /api/v1/admin/products/{id}/combo-config`).

### 2.2 Quản lý Danh mục (`/admin/categories`)
1. **Tạo danh mục mới**: Admin nhấn nút "+ Thêm danh mục" -> Mở Dialog nhập Tên danh mục, Mô tả, Trạng thái kích hoạt -> Submit (`POST /api/v1/admin/categories`).
2. **Sửa danh mục**: Admin click icon "Sửa" -> Mở Dialog chỉnh sửa thông tin -> Submit (`PUT /api/v1/admin/categories/{id}`).
3. **Upload ảnh danh mục**: Admin click icon "Ảnh" -> Chọn file -> Submit (`POST /api/v1/admin/categories/{id}/image`).
4. **Cấu hình Bento Grid / Trang chủ**: Admin click icon "Cấu hình Home" -> Chọn kiểu hiển thị Bento (`main` | `card` | `icon`), Badge ("BÁN CHẠY #1", "hot", "fresh"), Icon lucide, Thứ tự sắp xếp -> Submit (`PATCH /api/v1/admin/categories/{id}/home-config`).

### 2.3 Quản lý Nội dung Trang chủ (`/admin/content/*`)
1. **Hero Banners (`/admin/content/banners`)**:
   - Thêm banner mới: Nhấn "+ Thêm Banner" -> Nhập Tiêu đề, Subtitle, CTA text, CTA Link, Thứ tự, Trạng thái -> Submit (`POST /api/v1/admin/hero-banners`).
   - Sửa banner & Upload ảnh banner (`PATCH /api/v1/admin/hero-banners/{id}` & `POST /api/v1/admin/hero-banners/{id}/image`).
2. **Hải sản Cập bến (`/admin/content/daily-arrivals`)**:
   - Thêm sản phẩm cập bến: Chọn ngày -> Nhấn "+ Thêm cập bến" -> Chọn sản phẩm từ dropdown, Nhập badge ("CHUYẾN ĐÊM HÔM NAY"), Tiêu đề hiển thị, Mô tả -> Submit (`POST /api/v1/admin/daily-arrivals`).
   - Sửa thông tin cập bến (`PATCH /api/v1/admin/daily-arrivals/{id}`).

### 2.4 Quản lý RBAC & Người dùng
1. **Thêm Role mới (`/admin/rbac`)**: Nhấn "+ Thêm Role" -> Nhập tên vai trò (`ROLE_MODERATOR`, ...), Mô tả -> Submit (`POST /api/v1/admin/rbac/roles`).
2. **Gán Role cho User (`/admin/users`)**: Nhấn icon "Phân vai trò" cạnh user -> Mở Dialog tích chọn các Roles (`ROLE_USER`, `ROLE_ADMIN`, ...) -> Submit (`PATCH /api/v1/admin/rbac/users/{userId}/roles`).

## 3. API liên quan (Đã có trong `ADMIN_API_DOCUMENTATION.md`)
- `POST /api/v1/admin/products`
- `PATCH /api/v1/admin/products/{id}`
- `DELETE /api/v1/admin/products/{id}`
- `PATCH /api/v1/admin/products/increase/{id}?quantity=...` & `decrease`
- `POST /api/v1/admin/products/{id}/image`
- `PATCH /api/v1/admin/products/{id}/featured`
- `PATCH /api/v1/admin/products/{id}/combo-config`
- `POST /api/v1/admin/categories`
- `PUT /api/v1/admin/categories/{id}`
- `DELETE /api/v1/admin/categories/{id}`
- `POST /api/v1/admin/categories/{id}/image`
- `PATCH /api/v1/admin/categories/{id}/home-config`
- `POST /api/v1/admin/hero-banners`
- `PATCH /api/v1/admin/hero-banners/{id}`
- `POST /api/v1/admin/hero-banners/{id}/image`
- `DELETE /api/v1/admin/hero-banners/{id}`
- `PATCH /api/v1/admin/hero-banners/{id}/toggle`
- `POST /api/v1/admin/daily-arrivals`
- `PATCH /api/v1/admin/daily-arrivals/{id}`
- `DELETE /api/v1/admin/daily-arrivals/{id}`
- `POST /api/v1/admin/rbac/roles`
- `PATCH /api/v1/admin/rbac/roles/{roleId}/permissions`
- `PATCH /api/v1/admin/rbac/users/{userId}/roles`

## 4. UI States
- **Loading State**:
  - Khi tải danh sách: Hiển thị Table Skeleton đúng số cột và hàng.
  - Khi submit Dialog Form: Nút Submit hiển thị spinner và disable để tránh double submit.
- **Empty State**:
  - Khi không có sản phẩm/danh mục/banner: Card thông báo tiếng Việt + Icon + Nút hành động tạo mới tương ứng.
- **Error State**:
  - Báo đỏ viền input và hiển thị text validation khi form lỗi.
  - Khi API trả lỗi (400, 403, 409, 500): Sonner toast hiển thị chi tiết thông báo lỗi từ backend.
- **Success State**:
  - Toast thông báo tiếng Việt, tự đóng Dialog và tự động invalidate TanStack Query cache.

## 5. Edge cases
- Upload file ảnh quá dung lượng hoặc sai định dạng: Validate kích thước client-side (< 5MB, JPG/PNG/WEBP).
- Người dùng nhập giá sản phẩm dạng chuỗi hoặc số âm: Validate bằng Zod schema.
- Thao tác nhanh làm trùng lặp request: Disable button `isPending`.
- Token hết hạn giữa chừng (401): Axios interceptor tự động refresh token hoặc redirect về `/admin/login`.

## 6. Ngoài phạm vi (Out of scope)
- Thay đổi cấu trúc cơ sở dữ liệu backend.
- Đăng ký công khai tài khoản admin (tuân thủ rule bảo mật backend).
