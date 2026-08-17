# Feature: Admin Panel — Quản Lý Cửa Hàng Hải Sản

> **Ngày tạo**: 2026-08-16  
> **Trạng thái**: Chờ duyệt  
> **Kiến trúc**: Route `/admin` độc lập ngoài `[locale]` (Hướng 2)

---

## Mục tiêu (cái gì / tại sao)

Cung cấp giao diện quản trị nội bộ (Admin Panel) cho chủ cửa hàng và nhân viên có vai trò `ROLE_ADMIN`, cho phép quản lý toàn bộ vận hành: sản phẩm, danh mục, đơn hàng, người dùng, nội dung trang chủ, và phân quyền hệ thống — tất cả trong một giao diện riêng biệt hoàn toàn với storefront, tránh xung đột session và bundle.

---

## User Stories

- Là admin, tôi muốn đăng nhập vào trang quản trị riêng để quản lý cửa hàng mà không ảnh hưởng đến phiên mua sắm của khách hàng.
- Là admin, tôi muốn xem Dashboard tổng quan (doanh thu, đơn hàng, top sản phẩm) để nắm bắt tình hình kinh doanh nhanh chóng.
- Là admin, tôi muốn thêm/sửa/xóa sản phẩm và điều chỉnh tồn kho để cập nhật hàng hóa kịp thời.
- Là admin, tôi muốn cập nhật trạng thái đơn hàng để khách hàng theo dõi được tiến trình giao hàng.
- Là admin, tôi muốn quản lý banner và hải sản cập bến hàng ngày để cập nhật nội dung trang chủ.
- Là admin, tôi muốn khóa/mở khóa tài khoản người dùng và phân quyền để đảm bảo bảo mật hệ thống.
- Là khách hàng có `ROLE_ADMIN`, tôi muốn bấm nút "Quản lý cửa hàng" trên Header để truy cập nhanh vào Admin Panel.

---

## User Flow

### Flow 1: Truy cập Admin từ Storefront
1. User đã đăng nhập với `ROLE_ADMIN` → Header hiển thị thêm nút "Quản lý cửa hàng".
2. User bấm nút → mở tab mới dẫn đến `/admin`.
3. Middleware `/admin` kiểm tra `admin_accessToken` trong localStorage.
4. Nếu chưa có token → redirect về `/admin/login`.
5. Nếu đã có token hợp lệ → redirect về `/admin/dashboard`.

### Flow 2: Đăng nhập Admin
1. Admin truy cập `/admin/login`.
2. Nhập Email + Mật khẩu → Submit → `POST /api/v1/auth/login`.
3. Nhận `AuthResponse` → kiểm tra `user.roles.includes('ROLE_ADMIN')`.
4. Nếu không có role admin → Toast lỗi "Tài khoản không có quyền truy cập", không lưu token.
5. Nếu hợp lệ → lưu vào localStorage với key `admin_accessToken` / `admin_refreshToken`.
6. Redirect về `/admin/dashboard`.

### Flow 3: Quản lý Sản phẩm
1. Admin vào `/admin/products` → xem bảng danh sách sản phẩm (phân trang, tìm kiếm, lọc danh mục).
2. Thêm sản phẩm → mở form → điền thông tin → Submit → `POST /api/v1/admin/products`.
3. Upload ảnh → `POST /api/v1/admin/products/{id}/image`.
4. Sửa sản phẩm → `PATCH /api/v1/admin/products/{id}`.
5. Xóa mềm → `DELETE /api/v1/admin/products/{id}` + xác nhận dialog.
6. Điều chỉnh tồn kho → mở dialog → nhập số lượng → `PATCH increase/{id}` hoặc `decrease/{id}`.

### Flow 4: Cập nhật Trạng thái Đơn hàng
1. Admin vào `/admin/orders` → bảng toàn bộ đơn hàng, lọc theo status / user.
2. Click vào đơn → xem chi tiết.
3. Chọn trạng thái mới từ dropdown → xác nhận → `PATCH /api/v1/admin/orders/{id}/update-status`.
4. Hiển thị badge trạng thái mới ngay lập tức (optimistic update).

### Flow 5: Quản lý Nội dung Trang chủ
1. Admin vào `/admin/content/banners` → xem danh sách banner.
2. Thêm/sửa/xóa banner → upload ảnh → toggle hiển thị.
3. Admin vào `/admin/content/daily-arrivals` → thêm hải sản cập bến theo ngày.
4. Sau khi chỉnh nội dung → bấm "Xóa Cache" → `POST /api/v1/admin/home/cache/evict`.

### Flow 6: Đăng xuất Admin
1. Admin bấm nút Logout trên AdminTopBar.
2. `POST /api/v1/auth/logout` với `admin_refreshToken`.
3. Xóa `admin_accessToken` / `admin_refreshToken` khỏi localStorage.
4. Redirect về `/admin/login`.

---

## Kiến trúc Kỹ thuật

### Route Structure
```
src/app/admin/
├── layout.tsx                  ← Root layout (font, ThemeProvider, QueryClient)
├── login/page.tsx              ← Public: /admin/login
└── (dashboard)/
    ├── layout.tsx              ← AdminShell (guard + Sidebar + TopBar)
    ├── page.tsx                ← redirect → /admin/dashboard
    ├── dashboard/page.tsx
    ├── products/
    │   ├── page.tsx
    │   └── [id]/page.tsx
    ├── categories/page.tsx
    ├── orders/
    │   ├── page.tsx
    │   └── [id]/page.tsx
    ├── users/page.tsx
    ├── content/
    │   ├── banners/page.tsx
    │   └── daily-arrivals/page.tsx
    └── rbac/page.tsx
```

### Middleware (sửa `src/proxy.ts`)
- Phân tách: route bắt đầu bằng `/admin` → xử lý bởi `adminMiddleware` (không qua `next-intl`).
- `adminMiddleware`: kiểm tra `admin_accessToken` → nếu thiếu/hết hạn → redirect `/admin/login`.
- Các route còn lại → xử lý bởi `intlMiddleware` + Arcjet như hiện tại.

### AdminApiClient (`src/lib/AdminApiClient.ts`)
- Clone từ `ApiClient.ts` với token keys đổi thành `admin_accessToken` / `admin_refreshToken`.
- Khi refresh thất bại → redirect về `/admin/login` (không phải `/login` của storefront).
- **Không sửa** `ApiClient.ts` hiện tại để tránh breaking storefront.

### Shared Resources (dùng chung, không thay đổi)
- `src/components/ui/` — toàn bộ shadcn components (Button, Table, Dialog, Badge...)
- `src/types/api.ts` — `ApiResponse<T>`, `PageResponse<T>`
- `src/types/user.ts`, `order.ts`, `auth.ts`
- `src/utils/` — `cn()`, formatters
- `src/libs/Env.ts`

---

## API Liên Quan

### Auth
| Chức năng | Method | Endpoint | Ghi chú |
|---|---|---|---|
| Đăng nhập Admin | `POST` | `/api/v1/auth/login` | Kiểm tra `roles.includes('ROLE_ADMIN')` |
| Đăng xuất | `POST` | `/api/v1/auth/logout` | Dùng `admin_refreshToken` |
| Làm mới Token | `POST` | `/api/v1/auth/refresh-token` | Dùng `admin_refreshToken` |

### Dashboard
| Chức năng | Method | Endpoint |
|---|---|---|
| Top sản phẩm bán chạy | `GET` | `/api/v1/admin/products/top-buy?limit=10` |
| Doanh thu theo danh mục | `GET` | `/api/v1/admin/products/revenue-by-category` |
| Doanh thu theo tháng | `GET` | `/api/v1/admin/products/revenue-in-month` |

### Sản phẩm
| Chức năng | Method | Endpoint |
|---|---|---|
| Danh sách có phân trang | `GET` | `/api/v1/products?page=0&size=10` |
| Tạo mới | `POST` | `/api/v1/admin/products` |
| Cập nhật | `PATCH` | `/api/v1/admin/products/{id}` |
| Xóa mềm | `DELETE` | `/api/v1/admin/products/{id}` |
| Upload ảnh | `POST` | `/api/v1/admin/products/{id}/image` |
| Tăng tồn kho | `PATCH` | `/api/v1/admin/products/increase/{id}?quantity=N` |
| Giảm tồn kho | `PATCH` | `/api/v1/admin/products/decrease/{id}?quantity=N` |
| Toggle nổi bật | `PATCH` | `/api/v1/admin/products/{id}/featured` |
| Cấu hình combo | `PATCH` | `/api/v1/admin/products/{id}/combo-config` |

### Danh mục
| Chức năng | Method | Endpoint |
|---|---|---|
| Danh sách | `GET` | `/api/v1/categories` |
| Tạo mới | `POST` | `/api/v1/admin/categories` |
| Cập nhật | `PUT` | `/api/v1/admin/categories/{id}` |
| Xóa | `DELETE` | `/api/v1/admin/categories/{id}` |
| Upload ảnh | `POST` | `/api/v1/admin/categories/{id}/image` |
| Cấu hình Bento trang chủ | `PATCH` | `/api/v1/admin/categories/{id}/home-config` |

### Đơn hàng
| Chức năng | Method | Endpoint |
|---|---|---|
| Toàn bộ đơn hàng | `GET` | `/api/v1/admin/orders?page=0&size=10` |
| Lọc theo user/status | `GET` | `/api/v1/admin/orders/{userId}?status=CONFIRMED` |
| Cập nhật trạng thái | `PATCH` | `/api/v1/admin/orders/{id}/update-status` |

### Người dùng & RBAC
| Chức năng | Method | Endpoint |
|---|---|---|
| Danh sách users | `GET` | `/api/v1/admin/users?page=0&size=10` |
| Khóa / kích hoạt | `PATCH` | `/api/v1/admin/users/{id}/status?isActive=false` |
| Danh sách Roles | `GET` | `/api/v1/admin/rbac/roles` |
| Tạo Role | `POST` | `/api/v1/admin/rbac/roles` |
| Danh sách Permissions | `GET` | `/api/v1/admin/rbac/permissions` |
| Cập nhật Permission cho Role | `PATCH` | `/api/v1/admin/rbac/roles/{roleId}/permissions` |
| Gán Role cho User | `PATCH` | `/api/v1/admin/rbac/users/{userId}/roles` |

### Nội dung Trang chủ
| Chức năng | Method | Endpoint |
|---|---|---|
| Danh sách Banners | `GET` | `/api/v1/admin/hero-banners` |
| Tạo Banner | `POST` | `/api/v1/admin/hero-banners` |
| Cập nhật Banner | `PATCH` | `/api/v1/admin/hero-banners/{id}` |
| Xóa Banner | `DELETE` | `/api/v1/admin/hero-banners/{id}` |
| Toggle Banner | `PATCH` | `/api/v1/admin/hero-banners/{id}/toggle` |
| Upload ảnh Banner | `POST` | `/api/v1/admin/hero-banners/{id}/image` |
| Daily Arrivals theo ngày | `GET` | `/api/v1/admin/daily-arrivals?date=YYYY-MM-DD` |
| Thêm Daily Arrival | `POST` | `/api/v1/admin/daily-arrivals` |
| Cập nhật Daily Arrival | `PATCH` | `/api/v1/admin/daily-arrivals/{id}` |
| Xóa Daily Arrival | `DELETE` | `/api/v1/admin/daily-arrivals/{id}` |
| Xóa Cache trang chủ | `POST` | `/api/v1/admin/home/cache/evict` |

---

## Acceptance Criteria (Given-When-Then)

- **Given** user có `ROLE_ADMIN` đã đăng nhập storefront, **When** bấm "Quản lý cửa hàng" trên Header, **Then** mở tab mới dẫn đến `/admin/login` (nếu chưa có admin session) hoặc `/admin/dashboard` (nếu đã có session).
- **Given** user nhập credentials không có `ROLE_ADMIN`, **When** submit form đăng nhập admin, **Then** hiển thị toast lỗi "Tài khoản không có quyền truy cập" và không lưu token.
- **Given** admin đang ở `/admin/(dashboard)/*` mà `admin_accessToken` hết hạn, **When** gọi bất kỳ API nào, **Then** `AdminApiClient` tự động refresh token; nếu refresh thất bại → redirect về `/admin/login`.
- **Given** admin xóa mềm sản phẩm, **When** confirm dialog, **Then** sản phẩm biến mất khỏi bảng (invalidate query), toast "Đã xóa sản phẩm thành công".
- **Given** admin cập nhật trạng thái đơn hàng, **When** chọn trạng thái mới và confirm, **Then** badge trạng thái trong bảng cập nhật ngay (optimistic update), toast xác nhận.
- **Given** admin đăng xuất, **When** bấm Logout, **Then** `admin_accessToken` / `admin_refreshToken` bị xóa, redirect về `/admin/login`, không ảnh hưởng đến session storefront.

---

## Trạng thái bắt buộc (cho mọi màn hình động)

| Màn hình | Loading | Empty | Error |
|---|---|---|---|
| Dashboard | Skeleton KPI cards + chart placeholders | — (luôn có dữ liệu) | Toast + nút Thử lại |
| Bảng sản phẩm | Skeleton rows (10 dòng) | "Chưa có sản phẩm nào" + icon + nút Thêm | Toast lỗi + Thử lại |
| Bảng đơn hàng | Skeleton rows | "Không có đơn hàng nào" + icon | Toast lỗi + Thử lại |
| Bảng users | Skeleton rows | "Không có người dùng nào" | Toast lỗi + Thử lại |
| Form tạo/sửa | Button spinner + disabled khi `isPending` | — | Lỗi inline trên field (Zod) + toast |

---

## Ràng buộc UI (trỏ tới `design-spec.md` & `GEMINI.md`)

- **Spacing**: Tuân thủ scale `4, 8, 12, 16, 24, 32, 48, 64, 96px`. Cấm arbitrary value.
- **Màu sắc**: Chỉ dùng token trong `src/styles/global.css`. Cấm hardcode hex.
- **Component**: Tái dụng `src/components/ui/` (Button, Input, Table, Dialog, Badge, Card). Không viết lại từ đầu.
- **Layout**: AdminSidebar collapsible (mở rộng/thu gọn). Desktop-first (admin không cần responsive mobile).
- **i18n**: Admin Panel **không dùng `next-intl`** — toàn bộ text hardcode tiếng Việt trực tiếp (vì admin chỉ cần 1 ngôn ngữ, không cần SEO).
- **File size**: Mỗi component không vượt quá ~150 dòng. Logic tách ra hooks.
- **Token display**: Giá tiền hiển thị dạng `320.000₫`.

---

## Edge Cases

| Tình huống | Cách xử lý |
|---|---|
| `ROLE_ADMIN` không có trong response sau login | Toast lỗi "Không có quyền Admin", không lưu token, ở lại trang login |
| Refresh token admin hết hạn | Redirect về `/admin/login`, clear token, không ảnh hưởng storefront session |
| Xóa sản phẩm đang có trong đơn hàng active | Backend trả 409 Conflict → hiển thị toast lỗi cụ thể từ `message` của API |
| Upload ảnh quá dung lượng / sai định dạng | Validate client-side trước (PNG/JPG/WEBP, max 5MB) + xử lý lỗi từ API |
| Điều chỉnh tồn kho về số âm | Validate: không cho nhập số lượng giảm lớn hơn tồn kho hiện tại |
| Cập nhật trạng thái đơn hàng không hợp lệ (vd: DONE → PENDING) | Backend trả 400 → toast lỗi message từ API |
| Admin bấm "Quản lý cửa hàng" khi chưa đăng nhập storefront | Nút không hiển thị (chỉ hiện khi đã login và có `ROLE_ADMIN`) |
| Hai tab admin mở đồng thời, một tab logout | Tab còn lại sẽ bị 401 ở lần request tiếp theo → redirect về `/admin/login` |

---

## Ngoài Phạm Vi (Out of Scope)

- **Responsive mobile** cho admin panel — admin dùng desktop.
- **Dark mode toggle** cho admin panel — có thể thêm sau.
- **Real-time notifications** (WebSocket/SSE) cho đơn hàng mới — phase 2.
- **Báo cáo xuất Excel/PDF** — phase 2.
- **Multi-admin / audit log** — phase 2.
- **Social login** cho admin — không cần thiết.
- **i18n đa ngôn ngữ** cho admin panel.

---

## Thứ Tự Implement Đề Xuất

Triển khai theo từng phase nhỏ, mỗi phase là 1 PR độc lập:

| Phase | Nội dung | Mức độ ưu tiên |
|---|---|---|
| **0** | `AdminApiClient` + sửa middleware phân tách `/admin` | Bắt buộc trước |
| **1** | Admin Login page + AdminShell layout (Sidebar + TopBar) | Cao |
| **2** | Dashboard (KPI cards + charts) | Cao |
| **3** | Quản lý Sản phẩm (CRUD + upload + tồn kho) | Cao |
| **4** | Quản lý Đơn hàng (danh sách + cập nhật status) | Cao |
| **5** | Quản lý Danh mục (CRUD + home config) | Trung bình |
| **6** | Quản lý Nội dung (Banners + Daily Arrivals + Cache) | Trung bình |
| **7** | Quản lý Người dùng (khóa/mở + gán role) | Trung bình |
| **8** | Phân quyền RBAC (roles + permissions matrix) | Thấp |
| **9** | Nút "Quản lý cửa hàng" trên Header storefront | Song song với Phase 1 |
