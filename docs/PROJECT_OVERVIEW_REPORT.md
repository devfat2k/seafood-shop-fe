# 📊 BÁO CÁO TOÀN DIỆN HỆ THỐNG SEAFOOD SHOP WEB (STOREFRONT & ADMIN PORTAL)

> **Dự án**: Website Thương Mại Điện Tử & Hệ Thống Quản Trị Hải Sản Phan Thiết  
> **Phiên bản**: `1.2.0`  
> **Ngày hoàn thành báo cáo**: 13/09/2026  
> **Kiến trúc**: Next.js 16 (App Router) + React 19 + TypeScript Strict + Tailwind CSS v4

---

## 📑 MỤC LỤC TỔNG QUAN

1. [Giới Thiệu Chung & Mục Tiêu Dự Án](#1-giới-thiệu-chung--mục-tiêu-dự-án)
2. [Ngăn Xếp Công Nghệ (Tech Stack) & Thư Viện Sử Dụng](#2-ngăn-xếp-công-nghệ-tech-stack--thư-viện-sử-dụng)
3. [Các Công Nghệ Nổi Bật & Giải Pháp Kiến Trúc Cao Cấp](#3-các-công-nghệ-nổi-bật--giải-pháp-kiến-trúc-cao-cấp)
4. [Phân Hệ 1: Cửa Hàng Trực Tuyến Dành Cho Khách Hàng (FE Storefront)](#4-phân-hệ-1-cửa-hàng-trực-tuyến-dành-cho-khách-hàng-fe-storefront)
   - 4.1. Trang Chủ (Homepage & Storytelling)
   - 4.2. Danh Mục & Bộ Lọc Sản Phẩm (Catalog & Filter)
   - 4.3. Trang Chi Tiết Sản Phẩm (Product Detail & Purchase)
   - 4.4. Giỏ Hàng Tức Thời (Slide-over Cart Drawer)
   - 4.5. Quy Trình Thanh Toán Đa Kênh (Checkout Flow & VietQR)
   - 4.6. Quản Lý Tài Khoản Khách Hàng (Profile, Orders, Addresses, Security)
   - 4.7. Xác Thực, Đăng Ký & Quên Mật Khẩu Qua Mã OTP
   - 4.8. Trang Thông Tin Bổ Trợ (About, Contact, Search)
5. [Phân Hệ 2: Hệ Thống Quản Trị Hệ Thống (Admin Dashboard Portal)](#5-phân-hệ-2-hệ-thống-quản-trị-hệ-thống-admin-dashboard-portal)
   - 5.1. Xác Thực Quản Trị & Phân Quyền (Admin Auth Guard)
   - 5.2. Trung Tâm Điều Hành & Phân Tích Dữ Liệu (Dashboard & Analytics)
   - 5.3. Quản Lý Sản Phẩm Toàn Diện (Products Management)
   - 5.4. Quản Lý Danh Mục & Cấu Hình Bento Grid (Categories & Home Layout)
   - 5.5. Quản Lý & Vận Hành Đơn Hàng (Order State Machine)
   - 5.6. Quản Lý Người Dùng (Users Management)
   - 5.7. Hệ Thống Phân Quyền Vai Trò (RBAC - Roles & Permissions)
   - 5.8. Quản Lý Nội Dung Marketing & Vận Hành (Content & Daily Arrivals)
   - 5.9. Giám Sát Kỹ Thuật & Xóa Cache Phân Vùng Redis (System & Cache Eviction)
6. [Quy Chuẩn Thiết Kế & Trải Nghiệm Người Dùng (UX/UI Standards)](#6-quy-chuẩn-thiết-kế--trải-nghiệm-người-dùng-uxui-standards)
7. [Hạ Tầng Kiểm Thử, Chất Lượng Mã Nguồn & Giám Sát Lỗi](#7-hạ-tầng-kiểm-thử-chất-lượng-mã-nguồn--giám-sát-lỗi)
8. [Tổng Kết Đánh Giá & Định Hướng Phát Triển](#8-tổng-kết-đánh-giá--định-hướng-phát-triển)

---

## 1. GIỚI THIỆU CHUNG & MỤC TIÊU DỰ ÁN

**Seafood Shop Web** là nền tảng thương mại điện tử chuyên biệt phục vụ phân phối hải sản tươi sống đánh bắt tại biển Phan Thiết (Bình Thuận). Nền tảng được thiết kế đồng bộ với hai phân hệ chính chạy trên cùng một mã nguồn Next.js hiện đại:

1. **FE Storefront (Giao diện mua sắm cho người tiêu dùng)**: Tối ưu hoá tốc độ tải trang, trải nghiệm mua sắm trực quan, giàu cảm xúc với hình ảnh hải sản sống động, quy trình đặt hàng tinh gọn, tích hợp thanh toán quét mã QR động VietQR và VNPay.
2. **Admin Portal (Cổng điều hành & quản trị doanh nghiệp)**: Phục vụ chủ cửa hàng và nhân viên vận hành theo dõi doanh thu theo thời gian thực (real-time analytics), quản lý chuỗi tồn kho, xử lý đơn hàng, điều phối hải sản cập bến trong ngày, phân quyền nhân sự nhiều cấp độ (RBAC) và kiểm soát bộ nhớ đệm Redis.

---

## 2. NGĂN XẾP CÔNG NGHỆ (TECH STACK) & THƯ VIỆN SỬ DỤNG

### 2.1 Core Framework & Runtime
- **Next.js (`16.2.6`)**: Áp dụng App Router, kiến trúc Hybrid kết hợp giữa React Server Components (RSC) cho SEO/hiệu năng và Client Components cho tương tác người dùng cao.
- **React (`19.2.6`)**: Phiên bản React mới nhất với React Compiler tự động tối ưu memoization, `useSyncExternalStore` cho quản lý state client.
- **TypeScript (`5.9.3`)**: Chế độ Strict Type-safe toàn diện, tuyệt đối không dùng `any` hay bypass linter.
- **Node.js**: Hỗ trợ môi trường runtime `>= 24.0.0` với trình quản lý gói Bun/npm.

### 2.2 Quản Lý State & Giao Tiếp Mạng
- **TanStack Query v5 (`@tanstack/react-query 5.101.4`)**: Quản lý toàn bộ server state, cơ chế cache tự động, refetch ngầm, invalidate cache thông minh theo domain (Storefront & Admin tách biệt).
- **Axios (`1.8.1`)**: HTTP Client với hệ thống Interceptors độc lập xử lý tự động refresh JWT token khi nhận mã HTTP 401:
  - `src/libs/ApiClient.ts`: Quản lý phiên làm việc của khách hàng.
  - `src/libs/AdminApiClient.ts`: Quản lý phiên làm việc độc lập và bảo mật của Quản trị viên.
- **React `useSyncExternalStore`**: Kiến trúc store tùy biến siêu nhẹ cho giỏ hàng (`cartStore`), đồng bộ 2 chiều với `localStorage` mà không gây lỗi Hydration Mismatch giữa SSR và Client.

### 2.3 Giao Diện, Hoạt Hoạ & Biểu Đồ
- **Tailwind CSS v4 (`4.3.0`)**: Kiến trúc CSS thế hệ mới, cấu hình hoàn toàn qua CSS variables chuẩn CSS Native Tokens trong `src/styles/global.css`.
- **Shadcn UI & Base UI Primitives (`@base-ui/react`, `@radix-ui`)**: Cung cấp các nền tảng Accessible Headless components (Dialog, Dropdown Menu, Sheet Drawer, Table, Badge, Button, Avatar, Separator).
- **Recharts (`3.10.1`)**: Bộ biểu đồ trực quan hóa dữ liệu kinh doanh tương tác cao (Area Chart, Donut/Pie Chart, Bar Chart).
- **Lucide React (`1.33.0`)**: Hệ thống Vector Icons nhất quán và hiện đại.
- **Sonner (`2.0.6`)**: Thông báo Toast Notification hiện đại, hỗ trợ action button và custom styling.
- **Next-Themes (`0.4.6`)**: Chuyển đổi mượt mà giữa chế độ Sáng/Tối (Light/Dark mode).

### 2.4 Form Handling, Validation & i18n
- **React Hook Form (`7.76.0`)**: Xử lý form hiệu năng cao, hạn chế re-render thừa.
- **Zod (`4.4.3`)**: Định nghĩa schema xác thực dữ liệu chặt chẽ cho cả form người dùng và response từ API.
- **@hookform/resolvers (`5.2.2`)**: Cầu nối schema Zod trực tiếp vào React Hook Form.
- **Next-Intl (`4.12.0`)**: Đa ngôn ngữ (i18n) với cấu trúc route `/[locale]`, từ điển lưu trữ tại `src/locales/`.

### 2.5 Bảo Mật, Monitoring & Hạ Tầng
- **Arcjet (`@arcjet/next 1.4.0`)**: Hệ thống tường lửa ứng dụng bảo vệ endpoint chống tấn công Bot độc hại và Rate Limiting.
- **Sentry Next.js (`@sentry/nextjs 10.53.1`)**: Giám sát lỗi runtime và phân tích hiệu năng.
- **LogTape (`@logtape/logtape 2.1.1`)**: Structured logging nhẹ, tối ưu hóa cho môi trường edge và container.
- **@t3-oss/env-nextjs (`0.13.11`)**: Kiểm tra và validate biến môi trường type-safe lúc build time.

---

## 3. CÁC CÔNG NGHỆ NỔI BẬT & GIẢI PHÁP KIẾN TRÚC CAO CẤP

1. **Kiến Trúc Dual-Engine Tách Biệt Storefront & Admin Portal**:
   - Dù nằm chung trong 1 dự án Next.js, Storefront (`src/app/[locale]`) và Admin (`src/app/admin`) hoàn toàn tách biệt về luồng xác thực, giao diện, route guards và token lifecycle. Khách hàng không thể can thiệp phiên làm việc của quản trị viên và ngược lại.
2. **Cơ Chế Auto Refresh Token Kép (Dual 401 Interceptor Pipeline)**:
   - Khi `accessToken` hết hạn trong phiên làm việc, interceptor chặn lỗi 401, tạm dừng hàng đợi request, tự động gọi `/api/v1/auth/refresh-token` bằng `refreshToken`, lưu token mới và tự động thực thi lại (retry) tất cả request đang chờ mà người dùng không hề bị gián đoạn trải nghiệm.
3. **Store Giỏ Hàng Chống Hydration Mismatch bằng `useSyncExternalStore`**:
   - Thay vì dùng giải pháp lưu trữ cồng kềnh, giỏ hàng được viết dạng publish-subscribe tối giản, tích hợp hook chuẩn React 19 `useSyncExternalStore`. Cơ chế này loại bỏ 100% hiện tượng lệch layout (hydration flicker) khi hydrate dữ liệu từ `localStorage`.
4. **Cơ Chế Thanh Toán Động Bằng VietQR Chuẩn Ngân Hàng**:
   - Bên cạnh cổng VNPay, hệ thống tự động sinh mã VietQR động trực tiếp với thông tin số tài khoản, mã ngân hàng, đúng số tiền cần thanh toán và nội dung mã đơn hàng (`SEAFOOD <MÃ ĐƠN>`), kèm đồng hồ đếm ngược và kiểm tra trạng thái thanh toán tự động.
5. **Cơ Chế Quản Lý Layout Trang Chủ Linh Hoạt (Bento Grid Configurable)**:
   - Admin có thể tùy biến trực tiếp giao diện hiển thị danh mục trên trang chủ: cấu hình phong cách ô lớn (`main`), thẻ vừa (`card`) hay nút tròn (`icon`), gắn badge khuyến mãi (`hot`, `fresh`, `dry`) mà không cần can thiệp mã nguồn.
6. **Cơ Chế Evict Cache 8 Phân Vùng Redis Siêu Tốc**:
   - Dữ liệu trang chủ Storefront được Backend tổng hợp và cache trong 8 phân vùng Redis (< 20ms độ trễ). Khi Admin cập nhật giá, banner hay sản phẩm, có thể bấm 1 nút "Đồng bộ lên cửa hàng ngay" tại `/admin/system` để lập tức xóa sạch cache và hiển thị dữ liệu mới nhất tới khách hàng.

---

## 4. PHÂN HỆ 1: CỬA HÀNG TRỰC TUYẾN DÀNH CHO KHÁCH HÀNG (FE STOREFRONT)

Phân hệ Storefront phục vụ khách hàng mua sắm hải sản với trải nghiệm mượt mà, đầy đủ các tính năng thương mại điện tử hiện đại.

```
                    HỆ THỐNG MÀN HÌNH FE STOREFRONT
  ┌─────────────────────────────────────────────────────────────┐
  │ 1. Trang Chủ: Hero -> Marquee -> Bento -> Featured -> Story │
  └──────────────────────────────┬──────────────────────────────┘
                                 │
     ┌───────────────────────────┼────────────────────────────┐
     ▼                           ▼                            ▼
┌──────────────────┐    ┌─────────────────┐        ┌──────────────────┐
│ 2. Catalog &     │    │ 4. Cart Drawer  │        │ 6. Quản Lý       │
│    Lọc Sản Phẩm  │    │    & QuickView  │        │    Tài Khoản     │
└────────┬─────────┘    └────────┬────────┘        └────────┬─────────┘
         │                       │                          │
         ▼                       ▼                          ▼
┌──────────────────┐    ┌─────────────────┐        ┌──────────────────┐
│ 3. Chi Tiết      │───>│ 5. Checkout     │        │ 7. Xác Thực      │
│    Sản Phẩm      │    │    & VietQR     │        │    OTP & Auth    │
└──────────────────┘    └─────────────────┘        └──────────────────┘
```

### 4.1. Trang Chủ (Homepage — `/[locale]`)
- **Hero Slider Động (`HeroSection`)**: Banner trình chiếu hình ảnh hải sản bắt mắt, khẩu hiệu tiếp thị ấn tượng, nút kêu gọi hành động (CTA) chuyển hướng tức thì và nhãn khuyến mãi nổi bật.
- **Dải Cam Kết Vận Hành (`MarqueeUspStrip`)**: Thanh chuyển động liên tục khẳng định 4 cam kết cốt lõi: *"Hải sản đánh bắt trong ngày"*, *"Giao sống tận nơi trong 2 giờ"*, *"Đóng thùng oxy độc quyền"*, *"Cam kết 1 đổi 1 nếu không tươi"*.
- **Lưới Danh Mục Đa Dạng Kiểu Bento (`BentoCategories`)**: Sắp xếp danh mục hải sản (Tôm Hùm, Cua Cà Mau, Cá Biển, Mực Nang, Ốc Sò...) theo phong cách Bento Grid hiện đại, có badge nổi bật và chuyển đổi hiệu ứng mượt mà.
- **Sản Phẩm Nổi Bật Kèm Tab Phân Loại (`FeaturedProducts`)**: Lọc nhanh các nhóm sản phẩm bán chạy, giảm giá, đồ tươi sống hoặc đồ khô tuyển chọn; hỗ trợ thêm vào giỏ nhanh chỉ với 1 cú click.
- **Câu Chuyện Hải Sản Về Trong Ngày (`DailySeafoodStory`)**: Khối nội dung storytelling ghi lại hình ảnh ghe thuyền cập bến Phan Thiết rạng sáng, mang lại cảm giác chân thực và kích thích nhu cầu mua sắm thực phẩm tươi sống.
- **Gói Combo Tiệc & Gia Đình (`ComboSetsSection`)**: Giới thiệu các gói hải sản thiết kế sẵn (Combo tiệc nướng BBQ, Combo lẩu hải sản, Combo đãi tiệc) với mức giá ưu đãi hơn mua lẻ.
- **Bằng Chứng Xã Hội & Đánh Giá Khách Hàng (`SocialProofSection`)**: Đánh giá 5 sao từ khách hàng thực tế, số lượng đơn hàng đã giao thành công và các chứng chỉ an toàn vệ sinh thực phẩm.

### 4.2. Danh Mục & Bộ Lọc Sản Phẩm (Catalog — `/[locale]/products`)
- **Banner Danh Mục Chuyên Nghiệp (`ProductHeaderBanner`)**: Cung cấp ngữ cảnh danh mục, số lượng sản phẩm hiện có và mô tả nguồn gốc xuất xứ.
- **Bộ Lọc Sidebar Đa Tiêu Chí (`ProductSidebarFilter`)**:
  - Lọc theo khoảng giá linh hoạt bằng thanh trượt hoặc ô nhập min/max.
  - Lọc theo danh mục sản phẩm (hỗ trợ chọn đồng thời nhiều danh mục).
  - Lọc theo tình trạng: Sản phẩm còn hàng (`inStock`), hàng tươi sống hay hàng cấp đông.
  - Lọc theo xếp hạng sao đánh giá (từ 4 sao trở lên).
- **Thanh Công Cụ Danh Sách (`ProductListToolbar`)**:
  - Chuyển đổi hiển thị dạng Lưới (Grid view) hoặc Danh sách (List view).
  - Sắp xếp sản phẩm theo: Mới nhất, Giá tăng dần, Giá giảm dần, Tên A-Z, Bán chạy nhất.
- **Modal Xem Nhanh Sản Phẩm (`QuickViewModal`)**: Popup cho phép khách hàng xem ảnh phóng to, chọn quy cách, điều chỉnh số lượng và thêm vào giỏ hàng ngay trên trang catalog mà không phải tải lại trang.
- **Phân Trang Chuẩn SEO (`ProductPagination`)**: Đồng bộ số trang lên URL query parameter, đảm bảo khả năng chia sẻ liên kết và tối ưu hóa công cụ tìm kiếm.

### 4.3. Trang Chi Tiết Sản Phẩm (Product Detail — `/[locale]/products/[id]`)
- **Đường Dẫn Điều Hướng (`ProductDetailBreadcrumb`)**: Giúp khách hàng dễ dàng quay lại trang chủ hoặc danh mục gốc.
- **Thư Viện Ảnh Nhiều Góc Chụp & Lightbox (`ProductGallery`, `ProductGalleryModal`)**: Trình chiếu ảnh chính chất lượng cao, các góc ảnh cận cảnh, phóng to chi tiết sản phẩm toàn màn hình.
- **Bảng Chọn Quy Cách & Khối Lượng Đóng Gói (`ProductWeightSelector`)**: Cho phép lựa chọn đóng gói theo nhu cầu: con sống nguyên con, cân theo kg (1kg, 2kg, 3kg, 5kg), làm sạch sẵn, đóng khay hút chân không.
- **Bảng Mua Hàng & Tính Giá Tức Thời (`ProductPurchasePanel`)**: Tính toán tổng tiền theo khối lượng và số lượng chọn lựa; cung cấp hai nút hành động: **"Thêm vào giỏ hàng"** và **"Mua ngay"**.
- **Cam Kết Chất Lượng Biển Phan Thiết (`ProductGuarantees`)**: Cung cấp minh bạch thông tin về điều kiện sống của hải sản, quy cách đóng thùng xốp giữ nhiệt + đá khô/oxy và chính sách đổi trả.
- **Hệ Thống Tab Thông Tin Mở Rộng (`ProductTabs`)**:
  - *Mô tả chi tiết*: Xuất xứ vùng biển đánh bắt, mùa vụ thu hoạch.
  - *Giá trị dinh dưỡng*: Hàm lượng Protein, Omega-3, Calo, Canxi.
  - *Gợi ý món ngon*: Hướng dẫn các công thức chế biến hải sản hấp dẫn (hấp sả ớt, sốt bơ tỏi, nướng phô mai...).
  - *Đánh giá từ khách hàng*: Đánh giá bằng sao và phản hồi chi tiết.
- **Sản Phẩm Mua Kèm & Tương Tự (`RelatedProductsSection`)**: Đề xuất các loại hải sản cùng nhóm hoặc nước chấm, gia vị ăn kèm.
- **Thanh Mua Hàng Ghim Đáy Màn Hình Di Động (`ProductMobileStickyBar`)**: Giữ cố định nút Mua Ngay và Tên/Giá sản phẩm ở dưới cùng màn hình khi khách cuộn trang trên điện thoại.

### 4.4. Giỏ Hàng Tức Thời (Slide-over Cart Drawer — `CartDrawer`)
- **Ngăn Kéo Giỏ Hàng Trượt Mượt Mà**: Mở ra tức thì từ cạnh phải màn hình khi bấm vào biểu tượng giỏ hàng trên Header hoặc khi bấm thêm sản phẩm.
- **Thao Tác Tức Thì Không Cần Reload**:
  - Tăng, giảm số lượng từng sản phẩm; tự động tính lại tổng tiền.
  - Xóa sản phẩm khỏi giỏ hàng kèm tính năng **"Khôi phục" (Undo)** nếu xóa nhầm.
  - Hiển thị tiến trình đạt mốc miễn phí vận chuyển (Freeship progress).
  - Nút chuyển hướng sang bước Thanh toán (Checkout).

### 4.5. Quy Trình Thanh Toán Đa Kênh (Checkout Flow — `/[locale]/checkout`)
- **Thanh Tiến Trình Các Bước (`CheckoutStepWizard`)**:
  - Bước 1: Thông tin nhận hàng & Địa chỉ.
  - Bước 2: Phương thức thanh toán & Ghi chú.
  - Bước 3: Xác nhận đơn hàng & Quét mã thanh toán.
- **Quản Lý Địa Chỉ Nhận Hàng (`CheckoutAddressSection`)**:
  - Tự động nhận diện và sử dụng **Địa chỉ mặc định** đã lưu của khách hàng.
  - Cho phép chọn địa chỉ khác trong sổ danh bạ địa chỉ cá nhân hoặc nhập địa chỉ mới trực tiếp.
- **Phương Thức Thanh Toán Đa Dạng (`CheckoutPaymentMethod`)**:
  - *COD*: Thanh toán tiền mặt khi nhận hàng tận nơi.
  - *VietQR*: Chuyển khoản ngân hàng trực tiếp quét mã QR tự động.
  - *VNPay*: Cổng thanh toán trực tuyến qua thẻ ATM/Visa/MasterCard hoặc ứng dụng Mobile Banking.
  - *Ví điện tử*: MoMo, ZaloPay.
- **Màn Hình Quét Mã VietQR Ngân Hàng Động (`CheckoutQrBankStep`)**:
  - Tự động sinh mã VietQR theo định dạng chuẩn Napas với đúng số tiền và nội dung đơn hàng.
  - Tích hợp nút sao chép nhanh Số tài khoản, Số tiền và Nội dung chuyển khoản.
  - Đồng hồ đếm ngược phiên thanh toán an toàn và nút kiểm tra giao dịch hoàn tất.
- **Tóm Tắt Đơn Hàng & Phí Ship (`CheckoutOrderSummary`)**: Thể hiện rõ chi tiết tiền hàng, thuế, phí vận chuyển bảo quản hải sản, giảm giá voucher và tổng thanh toán cuối cùng.
- **Màn Hình Kết Quả Thanh Toán (`/[locale]/payment-result`)**: Đón nhận kết quả chuyển hướng từ cổng thanh toán, hiển thị trạng thái Thành công / Thất bại, mã giao dịch và đường dẫn theo dõi đơn hàng.

### 4.6. Quản Lý Tài Khoản Khách Hàng (`/[locale]/account`)
- **Hồ Sơ Cá Nhân (`AccountProfileTab`)**: Cập nhật họ tên, số điện thoại, đổi ảnh đại diện (avatar upload) có hiển thị tiến trình tải lên.
- **Sổ Địa Chỉ Giao Hàng (`AccountAddressesTab`)**:
  - Danh sách các địa chỉ nhận hàng cá nhân (gắn thẻ: *Nhà riêng*, *Văn phòng*).
  - Thêm mới, chỉnh sửa, xóa và gắn cờ **Địa chỉ mặc định**.
- **Quản Lý Đơn Hàng Của Tôi (`AccountOrdersTab`)**:
  - Danh sách đơn hàng đã đặt kèm mã đơn, ngày mua, danh sách sản phẩm, tổng tiền và trạng thái (Chờ xác nhận, Đang giao, Đã hoàn thành, Đã hủy).
  - Hủy đơn hàng trực tuyến khi đơn hàng đang ở trạng thái `PENDING`.
  - **Modal Theo Dõi Tiến Trình Đơn Hàng (`OrderTrackingModal`)**: Hiển thị dòng thời gian trực quan (Timeline) từng chặng vận chuyển của shipper giao hải sản tươi sống.
- **Bảo Mật Tài Khoản (`AccountSecurityTab`)**:
  - Đổi mật khẩu đăng nhập với chỉ báo độ mạnh mật khẩu (`PasswordStrengthIndicator`).
  - Hướng dẫn bảo mật thông tin tài khoản mua hàng.

### 4.7. Xác Thực, Đăng Ký & Quên Mật Khẩu Qua Mã OTP
- **Modal Xác Thực Đăng Nhập (`AuthModal`, `AuthLoginForm`)**: Đăng nhập nhanh bằng Email và Mật khẩu, lưu phiên làm việc, thông báo lỗi bằng tiếng Việt chuẩn.
- **Đăng Ký & Nhận Mã OTP Email (`AuthRegisterForm`, `OtpVerificationModal`)**:
  - Đăng ký tài khoản mới kích hoạt gửi mã OTP 6 chữ số qua Email (luồng `REGISTER_VERIFICATION`).
  - Modal nhập mã OTP chuyên dụng với cơ chế tự động focus ô tiếp theo, đếm ngược 60 giây để gửi lại mã mới và tự động đăng nhập khi xác thực thành công.
- **Quy Trình Quên Mật Khẩu 4 Bước Chuẩn (`ForgotPasswordModal`)**:
  - *Bước 1*: Nhập email tài khoản.
  - *Bước 2*: Xác thực mã OTP gửi về hòm thư (nhận vé ủy quyền `actionToken`).
  - *Bước 3*: Thiết lập mật khẩu mới có xác nhận trùng khớp.
  - *Bước 4*: Thông báo thành công và chuyển hướng đăng nhập.

### 4.8. Trang Thông Tin Bổ Trợ
- **Trang Giới Thiệu (`/[locale]/about`)**: Giới thiệu về ngư trường Phan Thiết, lịch sử thành lập cửa hàng, quy trình đánh bắt nhân đạo và tiêu chuẩn bảo quản lạnh hiện đại.
- **Trang Liên Hệ (`/[locale]/contact`)**: Bản đồ địa chỉ cửa hàng, hotline tư vấn, thời gian mở cửa tiếp đón và form gửi câu hỏi phản hồi.
- **Tìm Kiếm Động (`/[locale]/search`)**: Gợi ý từ khóa tìm kiếm nhanh, hiển thị tức thì kết quả tìm kiếm với trạng thái Loading Skeleton, Empty và Error.

---

## 5. PHÂN HỆ 2: HỆ THỐNG QUẢN TRỊ HỆ THỐNG (ADMIN DASHBOARD PORTAL)

Phân hệ Admin Dashboard cung cấp toàn quyền kiểm soát cửa hàng, tối ưu hóa cho màn hình máy tính để bàn (Desktop) và máy tính bảng (Tablet) của người quản lý.

```
                     HỆ THỐNG QUẢN TRỊ ADMIN PORTAL
  ┌─────────────────────────────────────────────────────────────┐
  │                 Admin Auth Guard & Layout                   │
  └──────────────────────────────┬──────────────────────────────┘
                                 │
     ┌───────────────────────────┼────────────────────────────┐
     ▼                           ▼                            ▼
┌──────────────────┐    ┌─────────────────┐        ┌──────────────────┐
│ 1. Dashboard     │    │ 2. Quản Lý      │        │ 3. Quản Lý       │
│    Analytics     │    │    Sản Phẩm     │        │    Đơn Hàng      │
└────────┬─────────┘    └────────┬────────┘        └────────┬─────────┘
         │                       │                          │
         ▼                       ▼                          ▼
┌──────────────────┐    ┌─────────────────┐        ┌──────────────────┐
│ 4. Quản Lý       │    │ 5. Quản Lý      │        │ 6. Phân Quyền    │
│    Danh Mục      │    │    Người Dùng   │        │    RBAC          │
└────────┬─────────┘    └────────┬────────┘        └────────┬─────────┘
         │                       │                          │
         ▼                       ▼                          ▼
┌──────────────────┐    ┌─────────────────┐        ┌──────────────────┐
│ 7. Banners       │    │ 8. Cập Bến      │        │ 9. Giám Sát &    │
│    Quảng Cáo     │    │    Trong Ngày   │        │    Xóa Cache     │
└──────────────────┘    └─────────────────┘        └──────────────────┘
```

### 5.1. Xác Thực Quản Trị & Phân Quyền (`/admin/login`, `AdminAuthGuard`)
- **Trang Đăng Nhập Quản Trị Độc Lập**: Giao diện riêng biệt, yêu cầu tài khoản quản trị viên. Không cho phép đăng ký công khai để ngăn chặn nguy cơ leo thang đặc quyền.
- **Cơ Chế Bảo Vệ Tuyệt Đối (`AdminAuthGuard`)**:
  - Kiểm tra sự tồn tại của Admin Token trong Storage.
  - Gọi xác thực profile `/api/v1/users/me` với Backend. Nếu tài khoản không chứa vai trò `ROLE_ADMIN`, lập tức huỷ bỏ phiên đăng nhập và đẩy người dùng ra ngoài với mã lỗi `403 Forbidden`.
  - Tự động chuyển hướng về `/admin/dashboard` nếu Admin đã đăng nhập trước đó.

### 5.2. Trung Tâm Điều Hành & Phân Tích Dữ Liệu (`/admin/dashboard`)
- **Thẻ Chỉ Số Kinh Doanh Cốt Lõi (`DashboardKpiCards`)**:
  - *Tổng doanh thu*: Doanh thu tích lũy, so sánh tỷ lệ phần trăm tăng trưởng theo chu kỳ.
  - *Tổng đơn hàng*: Số lượng đơn hàng phát sinh, tỷ lệ đơn giao thành công.
  - *Khách hàng mới*: Số lượng tài khoản đăng ký mới.
  - *Sản phẩm đang kinh doanh*: Tỷ lệ sản phẩm đang bán so với sản phẩm sắp hết hàng.
- **Biểu Đồ Xu Hướng Doanh Thu (`RevenueTrendChart`)**: Trực quan hóa doanh thu 12 tháng gần nhất qua biểu đồ đường/vùng (Area Chart Recharts) mượt mà với Tooltip tiếng Việt chuẩn.
- **Biểu Đồ Cơ Cấu Doanh Thu Danh Mục (`CategoryDonutChart`)**: Biểu đồ hình tròn (Donut Chart) bóc tách tỷ trọng doanh thu giữa các nhóm hải sản (Tôm Cua, Cá Biển, Nhuyễn Thể, Combo...).
- **Biểu Đồ Cột & Bảng Top Sản Phẩm Bán Chạy (`TopProductsBarChart`, `TopBuyProductsTable`)**: Liệt kê 10 loại hải sản có lượng tiêu thụ lớn nhất cửa hàng kèm doanh thu và tỷ trọng bán lẻ.
- **Tính Năng Tự Động Làm Mới (Live Auto-refresh)**: Tự động tải lại dữ liệu phân tích mỗi 30 giây kèm nút bấm cập nhật thủ công (Manual Invalidate) và đồng hồ ghi nhận thời điểm cập nhật mới nhất.

### 5.3. Quản Lý Sản Phẩm Toàn Diện (`/admin/products`)
- **Thanh Công Cụ Tìm Kiếm & Lọc (`AdminProductsToolbar`)**: Tìm kiếm tức thì theo tên với cơ chế Debounce, lọc theo danh mục, lọc theo loại sản phẩm (`REGULAR` hoặc `COMBO`).
- **Bảng Dữ Liệu Sản Phẩm Chuẩn Admin (`AdminProductsTable`, `ProductTableRow`)**:
  - Hiển thị hình ảnh thumbnail, tên hải sản, danh mục, giá niêm yết, giá khuyến mãi, số lượng tồn kho và nhãn trạng thái kinh doanh.
  - Nút chuyển đổi nhanh cờ **"Ghim nổi bật"** (`isFeatured`) ngay trên hàng dữ liệu.
- **Form Tạo Mới & Chỉnh Sửa Chi Tiết Sản Phẩm (`ProductFormDialog`)**:
  - Nhập tên, slug, mô tả chi tiết, giá bán, giá gốc, đơn vị tính (`kg`, `con`, `khay`), quy cách sản phẩm, xuất xứ vùng biển.
  - Khai báo các tùy chọn khối lượng (`weightOptions`: 1kg, 2kg, 3kg...).
  - Lựa chọn loại sản phẩm: Đơn lẻ hay Gói Combo.
- **Modal Cập Nhật Tồn Kho Nhanh (`ProductStockDialog`)**: Thao tác tăng hoặc giảm số lượng tồn kho nhanh chóng theo số lượng nhập hàng mới từ vựa hải sản mà không cần vào form sửa thông tin.
- **Modal Tải Lên & Cập Nhật Hình Ảnh (`ProductImageDialog`)**: Kéo thả ảnh hải sản thực tế và tải trực tiếp lên kho lưu trữ MinIO S3 của hệ thống.
- **Modal Cấu Hình Combo Tiệc Trang Chủ (`ProductComboDialog`)**: Cấu hình hiển thị thẻ Combo (chọn chủ đề nền sáng/tối, nhãn ưu đãi, chữ nút bấm, liên kết trang đích).
- **Xóa Mềm An Toàn (Soft Delete)**: Chuyển cờ hoạt động của sản phẩm sang `inactive` để ẩn khỏi storefront nhưng không làm hỏng dữ liệu thống kê của các đơn hàng cũ trong lịch sử.

### 5.4. Quản Lý Danh Mục & Cấu Hình Bento Grid (`/admin/categories`)
- **Quản Trị CRUD Danh Mục**: Thêm mới danh mục hải sản, đổi tên, cập nhật mô tả và bật/tắt hoạt động.
- **Tải Lên Ảnh Danh Mục (`CategoryImageDialog`)**: Cập nhật ảnh đại diện chuyên nghiệp cho từng danh mục.
- **Cấu Hình Hiển Thị Trang Chủ Bento Grid (`CategoryHomeConfigDialog`)**:
  - Tùy chỉnh kiểu dáng hiển thị trên trang chủ: Ô chính lớn (`main`), Thẻ tiêu chuẩn (`card`) hoặc Biểu tượng nhỏ (`icon`).
  - Gắn huy hiệu tiếp thị: `BÁN CHẠY #1`, `TƯƠI SỐNG`, `ƯU ĐÃI KHỦNG`.
  - Chọn biểu tượng Vector Lucide đại diện cho danh mục.
  - Thiết lập thứ tự sắp xếp hiển thị (`homeSortOrder`).

### 5.5. Quản Lý & Vận Hành Đơn Hàng (`/admin/orders`)
- **Quản Lý Vòng Đời Đơn Hàng Theo State Machine**:
  - `PENDING`: Đơn hàng vừa đặt, chờ nhân viên xác nhận địa chỉ hoặc chờ xác nhận chuyển khoản.
  - `CONFIRMED`: Đơn hàng đã được duyệt, nhân viên đóng thùng oxy chuẩn bị xuất kho.
  - `SHIPPED`: Đơn hàng đã bàn giao cho tài xế giao nhận, đang trên đường vận chuyển.
  - `DONE`: Giao hàng thành công, khách hàng đã nhận và kiểm tra hải sản tươi sống.
  - `CANCELLED`: Đơn hàng bị hủy do khách đổi ý hoặc hết tồn kho đột xuất.
- **Bộ Lọc Trạng Thái Đơn Hàng (`AdminOrdersToolbar`)**: Lọc nhanh danh sách đơn theo từng trạng thái bằng các nút bấm trực quan.
- **Bảng Chi Tiết Đơn Hàng (`AdminOrdersTable`)**: Thể hiện đầy đủ mã đơn hàng, ngày giờ đặt, tên khách hàng, số điện thoại, địa chỉ nhận hàng, phương thức thanh toán, tổng tiền và nút cập nhật trạng thái đơn hàng tức thời.

### 5.6. Quản Lý Người Dùng (`/admin/users`)
- **Danh Sách Khách Hàng & Phân Trang (`AdminUsersTable`)**: Xem thông tin tài khoản, email, số điện thoại, ngày đăng ký, trạng thái xác thực email (`emailVerified`).
- **Khóa & Mở Khóa Tài Khoản (`toggleStatus`)**: Khóa tài khoản có hành vi gian lận hoặc mở lại tài khoản cho khách; ngăn chặn không cho phép Admin tự khóa tài khoản của chính mình.
- **Gán Vai Trò Người Dùng (`UserRoleAssignDialog`)**: Nâng cấp tài khoản khách hàng thông thường thành Nhân viên điều hành hoặc Quản trị viên.

### 5.7. Hệ Thống Phân Quyền Vai Trò (RBAC — `/admin/rbac`)
- **Danh Sách Thẻ Vai Trò (`RoleCardList`)**: Hiển thị các vai trò trong hệ sinh thái (`ROLE_ADMIN`, `ROLE_MODERATOR`, `ROLE_USER`) cùng danh sách các quyền hạn được kích hoạt.
- **Thêm Mới Vai Trò (`RoleFormDialog`)**: Khởi tạo vai trò mới phục vụ các nhóm nhân sự khác nhau (Kế toán, Nhân viên đóng gói, Nhân viên chăm sóc khách hàng).
- **Bảng Quyền Hạn Chi Tiết (`SystemPermissionsTable`)**: Quản lý danh mục các quyền hạn hạt nhân (fine-grained permissions): `product:create`, `product:update`, `product:delete`, `rbac:manage`, `order:update`...
- **Bật / Tắt Quyền Hạn Động**: Cho phép Admin tick chọn hoặc bỏ tick quyền cho từng Role với cơ chế cập nhật tức thời (Optimistic UI update).

### 5.8. Quản Lý Nội Dung Marketing & Vận Hành (`/admin/content`)
- **Quản Lý Banner Quảng Cáo (`/admin/content/banners`)**:
  - Danh sách các banner quảng cáo đang chạy trên website.
  - Thêm, sửa, xóa banner, tải ảnh quảng cáo, nhập tiêu đề, phụ đề, nút CTA và đường dẫn.
  - Nút bật/tắt (toggle) hiển thị banner ngay trên trang chủ.
- **Quản Lý Hải Sản Cập Bến Trong Ngày (`/admin/content/daily-arrivals`)**:
  - Chọn sản phẩm hải sản cập bến trong ngày theo ngày tháng cụ thể (`arrivalDate`).
  - Đặt nhãn nổi bật: *"CHUYẾN ĐÊM HÔM NAY"*, *"CẬP BẾN RẠNG SÁNG"*.
  - Nhập câu chuyện mô tả mẻ cá/tôm vừa về để khơi gợi niềm tin của khách hàng về độ tươi ngon.

### 5.9. Giám Sát Kỹ Thuật & Xóa Cache Phân Vùng Redis (`/admin/system`)
- **Bảng Điều Khiển Giám Sát Dịch Vụ (`SystemMonitoringPanel`)**:
  - Kiểm tra trạng thái trực tiếp của các dịch vụ nền tảng: Backend REST API Spring Boot, PostgreSQL Database, Redis In-Memory Cache, MinIO S3 File Storage.
- **Cơ Chế Đồng Bộ & Evict Cache Toàn Diện**:
  - Nút bấm **"Đồng Bộ Lên Cửa Hàng Ngay"** thực thi API `/api/v1/admin/home/cache/evict`.
  - Quét và làm sạch 8 phân vùng cache Redis: `home:hero`, `home:categories`, `home:arrivals`, `home:featured`, `home:combos`, `home:reviews`, `home:stats`, `home:tabs`.
  - Ghi nhận chính xác mốc thời gian đồng bộ gần nhất để quản trị viên yên tâm về tính nhất quán dữ liệu.

---

## 6. QUY CHUẨN THIẾT KẾ & TRẢI NGHIỆM NGƯỜI DÙNG (UX/UI STANDARDS)

Toàn bộ dự án tuân thủ nghiêm ngặt theo các tiêu chuẩn thiết kế cao cấp (enforced bởi bộ quy tắc `GEMINI.md` và `ux-ui` skill):

1. **Hệ Thống Spacing Scale Bất Biến**:
   - Chỉ sử dụng các kích thước khoảng cách trong thang chuẩn: `4px (1), 8px (2), 12px (3), 16px (4), 24px (6), 32px (8), 48px (12), 64px (16), 96px (24)`.
   - Tuyệt đối không dùng các giá trị tùy tiện (arbitrary values như `w-[123px]`, `mt-[17px]`).
2. **Quy Chuẩn 3 Trạng Thái UI Bắt Buộc Cho Màn Hình Động**:
   - **Loading**: Luôn sử dụng Skeleton đúng khung hình dạng của nội dung thật (Card Skeleton, Table Row Skeleton), không dùng spinner tròn đại trà làm mất cấu trúc trang.
   - **Empty**: Hiển thị hình ảnh minh họa vector thân thiện, thông điệp tiếng Việt rõ nghĩa và nút kêu gọi hành động điều hướng.
   - **Error**: Thông báo lý do sự cố rõ ràng và luôn kèm nút **"Thử lại" (Retry)** giúp người dùng tự phục hồi luồng thao tác.
3. **Định Dạng Tiền Tệ & Ngôn Ngữ Nhất Quán**:
   - Định dạng tiền tệ chuẩn thương mại điện tử Việt Nam: `xxx.xxx₫` (sử dụng dấu chấm ngăn cách hàng nghìn, ký hiệu `₫` đặt liền sau không khoảng trắng, ví dụ: `320.000₫`, `1.250.000₫`).
   - 100% văn bản hiển thị qua hệ thống i18n của `next-intl`, không hardcode chuỗi ký tự trong JSX.
4. **Quy Chuẩn Sạch Sẽ Mã Nguồn (No Noise Comments)**:
   - Nghiêm cấm chèn các chú thích thừa thãi, hiển nhiên hay đánh số thứ tự trong JSX (như `{/* 1. Hero Section */}`, `{/* Image Container */}`).
   - Mã nguồn tự giải thích (self-documenting) thông qua việc phân rã sub-components nhỏ (< 150 dòng) và đặt tên biến ngữ nghĩa.

---

## 7. HẠ TẦNG KIỂM THỬ, CHẤT LƯỢNG MÃ NGUỒN & GIÁM SÁT LỖI

| Mục Tiêu Kiểm Soát | Công Cụ & Thư Viện | Quy Trình Thực Thi |
| :--- | :--- | :--- |
| **Kiểm tra Kiểu Dữ Liệu** | TypeScript `5.9.3` | Lệnh `bun run check:types` phải đạt **0 lỗi** trước khi nghiệm thu; cấm ép kiểu `any` hoặc `@ts-ignore`. |
| **Kiểm tra Cú Pháp & Code Smell** | Ultracite + Oxlint + Knip | Chạy `bun run lint` và `bun run check:deps` để dọn dẹp biến thừa, import không sử dụng và dead-code. |
| **Unit & Integration Test** | Vitest `4.1.7` + Vitest Browser | Kiểm thử toàn diện logic định giá giỏ hàng, utils phân trang catalog, validation schemas và React Query hooks. |
| **End-to-End Testing (E2E)** | Playwright `1.60.0` | Mô phỏng luồng người dùng thực tế: Chọn hải sản -> Thêm giỏ -> Điền địa chỉ -> Chọn VietQR -> Đặt hàng. |
| **Kiểm Thử Khung Giao Diện** | Storybook `10.4.1` + Addon A11y | Kiểm tra hiển thị độc lập của các linh kiện UI (Button, Badge, Card, Modal, Dropdown) và tiêu chuẩn tiếp cận tiếp cận (Accessibility). |
| **Giám Sát Sự Cố Vận Hành** | Sentry Next.js + LogTape | Tự động bắt lỗi runtime ở Client/Server, gửi cảnh báo tức thì về kênh giám sát tập trung. |

---

## 8. TỔNG KẾT ĐÁNH GIÁ & ĐỊNH HƯỚNG PHÁT TRIỂN

### 8.1. Đánh Giá Toàn Diện Dự Án
Dự án **Seafood Shop Web** là một sản phẩm thương mại điện tử chuyên ngành hải sản được xây dựng với độ hoàn thiện kỹ thuật rất cao:
- **Trải nghiệm khách hàng (Storefront)**: Mang hơi thở biển cả Phan Thiết với hình ảnh sống động, tốc độ phản hồi cực nhanh nhờ kiến trúc Server Components kết hợp cache Redis, giỏ hàng tức thời và thanh toán quét mã QR chuẩn ngân hàng.
- **Trải nghiệm vận hành (Admin Portal)**: Báo cáo số liệu kinh doanh trực quan với Recharts, kiểm soát toàn diện vòng đời sản phẩm, đơn hàng, người dùng, phân quyền RBAC đa cấp độ và công cụ quản trị trang chủ thông minh.
- **Chất lượng mã nguồn**: Tuân thủ nghiêm ngặt các nguyên tắc thiết kế hiện đại, cấu trúc component phân rã khoa học, type-safe 100%, có hệ thống kiểm thử tự động và tài liệu tích hợp API chi tiết cho cả hai phân hệ.

### 8.2. Đề Xuất Định Hướng Mở Rộng Tiếp Theo
1. **PWA & Mobile Push Notifications**: Tích hợp Progressive Web App (PWA) để khách hàng có thể cài đặt trực tiếp lên điện thoại và nhận thông báo khi có mẻ hải sản mới cập bến vào rạng sáng.
2. **Websocket / Server-Sent Events (SSE) Cho Admin Đơn Hàng**: Cập nhật trạng thái đơn hàng và thông báo chuông reo tức thì khi có khách vừa đặt đơn mới mà không cần chờ chu kỳ polling.
3. **Hệ Thống Tích Điểm Thành Viên & Hạng Khách Hàng**: Bổ sung cơ chế xếp hạng thành viên (Bạc, Vàng, Kim Cương) và tích lũy điểm thưởng khi mua sắm để gia tăng tỷ lệ khách hàng quay lại.
4. **Live Chat Tư Vấn Trực Tiếp**: Tích hợp khung chat trực tuyến kết nối khách hàng với tư vấn viên cửa hàng để giải đáp về kích cỡ, cách chọn hải sản tươi sống theo mùa.
