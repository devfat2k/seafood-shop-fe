# Spec: Tối Ưu & Tái Cấu Trúc Hero Section Theo Chuẩn Design Spec

> **Mã Spec**: `SPEC-HERO-REVAMP-01`  
> **Người soạn**: Senior Frontend Engineer  
> **Trạng thái**: Draft — Chờ duyệt (Pending Approval)  
> **Vị trí**: `src/components/home/HeroSection.tsx`

---

## 1. Mục tiêu & Vấn đề cần giải quyết

### 1.1 Vấn đề hiện tại trên UI
1. **Bố cục mất cân đối & Trống trải (Layout Imbalance)**: Toàn bộ chữ bị dồn về phía góc trái, nửa bên phải để trống hoàn toàn chỉ có hình nền, không có điểm nhấn thị giác (focal point).
2. **Bộ điều khiển Carousel bị cô lập**: Thanh pagination và nút Prev/Next bị đẩy xuống sát đáy trên một đường kẻ mờ đơn độc, tạo khoảng cách thừa quá lớn.
3. **Chưa áp dụng Split-Screen + Showcase Card**: Theo `design-spec.md` (mục 3.1 & 2.3), Hero cần có bố cục Split-Screen với 1 Showcase Card / Breakout Product Card bên phải tạo chiều sâu không gian (depth).
4. **Nút bấm & Badge chưa sắc nét**: Nút phụ và badge chưa theo chuẩn glassmorphism cao cấp của dự án.

### 1.2 Mục tiêu sau khi nâng cấp
- Áp dụng cấu trúc **Split-Screen (55/45)**:
  - Cột trái: Headline Typography phân cấp ấn tượng (`Fraunces` + `Be Vietnam Pro`), phụ đề súc tích, 2 CTA chính phụ rõ ràng, kèm dải 3 cam kết nhỏ (Giao 2H · Tươi sống 100% · Đổi trả tận nơi).
  - Cột phải: Thẻ **Showcase Product Card** (Kính mờ Glassmorphism, ảnh hải sản sắc nét, tag giờ cập cảng `04:30 AM`, giá niêm yết và nút điều hướng).
- Tích hợp Carousel Indicators & Arrows gọn gàng, liền mạch với layout.
- Chuẩn hóa 100% Design Tokens (`bg-foreground` #0B4A5C, `text-primary` #FF6B4A, `text-secondary` #0F7C8C, `rounded-xl`, `rounded-2xl`).

---

## 2. Thiết kế Chi Tiết

### 2.1 Cột Trái: Content & CTA
- **Badge**: `inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-bold text-white backdrop-blur-md`.
- **Headline**: `font-heading text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]`.
- **Description**: `text-white/85 text-xs sm:text-base max-w-lg leading-relaxed`.
- **CTAs**:
  - Primary: `rounded-xl bg-primary px-6 py-3.5 text-xs font-bold text-primary-foreground shadow-lg hover:bg-primary/90 active:scale-95 sm:text-sm`.
  - Secondary: `rounded-xl border border-white/30 bg-white/10 px-6 py-3.5 text-xs font-bold text-white backdrop-blur-xs hover:bg-white/20 sm:text-sm`.
- **Trust Badges**: 3 cam kết ngắn có icon (`truck`, `shield-check`, `refresh-cw`).

### 2.2 Cột Phải: Showcase Product Card (Glassmorphism)
- Card nổi `rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md p-4 sm:p-5 shadow-2xl`:
  - Ảnh hải sản nổi bật với góc bo chuẩn `rounded-xl`.
  - Badge mẻ cá: `⚡ MẺ CÁ CẬP CẢNG RẠNG SÁNG`.
  - Tên sản phẩm & xuất xứ: `Cảng cá Phan Thiết`.
  - Giá tham khảo & nút Mua Ngay.

### 2.3 Điều khiển Carousel (Slider Controls)
- Đặt ngay ngắn dưới chân Hero: Các thanh dash bo tròn `w-8 bg-primary` / `w-2.5 bg-white/30` kèm 2 nút mũi tên Prev/Next tinh tế.

---

## 3. UI States & Edge Cases
- Hỗ trợ chuyển slide tự động hoặc bằng tay (Prev/Next/Click dash).
- Hỗ trợ hiển thị mượt mà trên Mobile (Cột Showcase hiển thị dưới dạng Compact Highlight Card hoặc ẩn gọn).
