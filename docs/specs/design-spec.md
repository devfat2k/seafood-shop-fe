# HẢI SẢN PHAN THIẾT — STOREFRONT UI DESIGN SPEC

Web site chuẩn SEO HẢI SẢN PHAN THIẾT. Vibe: biển cả, tươi sáng, trẻ trung, thời thượng, hiện đại xu hướng 2026. Font: **Inter** (400/500/600/700/800). Ngôn ngữ hiển thị: 100% tiếng Việt. Light theme tuyệt đối — không dark mode toàn trang.

---

## 1. DESIGN TOKENS

**Màu sắc**

- `bg-base` `#FBF8F3` — nền chính, 60% diện tích
- `bg-subtle` `#F5F1E8` — nền phụ, card nền, section xen kẽ
- `brand-900` `#0B2F28` — hover/active brand
- `brand-700` `#0E3D34` — brand chính: header, footer, nút primary, 30% diện tích
- `brand-100` `#E4EEEA` — tint brand: badge, hover nhẹ
- `accent-600` `#C4922F` — hover accent
- `accent-500` `#D9A441` — Sandy Gold, giá tiền/CTA phụ/badge, 10% diện tích, không tô nền lớn
- `accent-100` `#F6E8CC` — tint accent: badge khuyến mãi
- `text-primary` `#26312D` · `text-secondary` `#5B6B63` · `border` `#E4E0D8`
- `success` `#3F8F5F` · `warning` `#E8B84B` · `danger` `#D9604A` · `info` `#4A7FB5`
- Giới hạn cứng: ≤3 nhóm màu chính/màn hình (nền + brand + accent). Semantic không tính vào giới hạn.

**Typography (Inter)**

- `display` 48–56px/1.1/800 — hero headline
- `h1` 32–36px/1.2/700 — tiêu đề trang
- `h2` 24–28px/1.3/700 — tiêu đề section
- `h3` 18–20px/1.4/600 — tiêu đề card
- `body-lg` 16–18px/1.6/400–500 — mô tả dài
- `body` 14–15px/1.6/400–500 — mặc định
- `body-sm` 13px/1.5/400 — caption, meta text
- `price` 20–24px/1.2/700, màu `accent-500`
- `price-sm` 15–16px/1.2/600
- Số liệu dùng `font-variant-numeric: tabular-nums`

**Spacing scale:** `4·8·12·16·24·32·48·64·96` px — không dùng giá trị ngoài thang.
**Container:** max-width 1280px desktop, gutter 24px desktop / 16px mobile, section padding-y 64–96px desktop / 40–56px mobile.

### 1.1 LUẬT SPACING — ÉP CỨNG, KHÔNG TỰ ƯỚC LƯỢNG

| Thành phần                                            | Khoảng cách bắt buộc                                    |
| ----------------------------------------------------- | ------------------------------------------------------- |
| Section padding-top/bottom                            | 96px desktop / 56px mobile — mọi section không ngoại lệ |
| Section title → nội dung bên dưới                     | 40px desktop / 24px mobile                              |
| Gutter giữa các cột grid                              | 24px desktop / 16px tablet / 12px mobile                |
| Padding trong Product Card                            | 20px đều 4 cạnh                                         |
| Padding trong Card lớn (Dashboard/Modal content)      | 24–32px đều 4 cạnh                                      |
| Card: ảnh → tên sản phẩm                              | 16px                                                    |
| Card: tên sản phẩm → giá                              | 8px                                                     |
| Card: giá → nút CTA                                   | 12px                                                    |
| Button: padding nội dung                              | 12px trên/dưới × 24px trái/phải                         |
| Button: khoảng cách giữa 2 nút liền kề (button group) | 12px                                                    |
| Form: label → input                                   | 8px                                                     |
| Form: khoảng cách giữa 2 field liên tiếp              | 20px                                                    |
| Modal/Drawer: padding tổng thể                        | 32px desktop / 20px mobile                              |
| Modal: tiêu đề → nội dung                             | 20px                                                    |
| Modal: nội dung → nhóm nút hành động đáy              | 24px                                                    |
| Icon inline + text (badge, label có icon)             | 6px                                                     |
| Header height                                         | 72px desktop / 60px mobile                              |
| Header: khoảng cách giữa các nav item                 | 32px desktop                                            |
| Footer: khoảng cách giữa các cột                      | 48px desktop / 32px mobile (stack dọc)                  |
| Footer: padding-y tổng thể                            | 64px                                                    |
| Toast: padding                                        | 16px, khoảng cách icon → text 12px                      |

**Nguyên tắc bổ sung:** trong CÙNG 1 khung màn hình, khoảng cách giữa các phần tử cùng cấp bậc (VD: khoảng cách giữa các card trong 1 grid, khoảng cách giữa các section) phải **tuyệt đối bằng nhau** — không có trường hợp section A cách section B 64px còn section B cách section C 80px. Nếu không chắc chắn giá trị, luôn dùng giá trị lớn hơn kế tiếp trong thang `4·8·12·16·24·32·48·64·96`, không nội suy số lẻ (VD không dùng 18px, 28px, 52px).

**Radius:** `sm` 8px (input nhỏ) · `md` 12px (button/input) · `lg` 16px (card) · `xl` 20px (modal/panel) · `full` 999px (badge/avatar)

**Shadow**

- `card-rest`: outer `0 2px 8px rgba(11,47,40,.06)` + inner highlight `0 1px 0 rgba(255,255,255,.6)`
- `card-hover`: `0 8px 20px rgba(11,47,40,.12)`
- `product-drop`: `0 6px 16px rgba(11,47,40,.18)` — bóng riêng dưới thân sản phẩm breakout
- `modal`: `0 20px 48px rgba(11,47,40,.20)`

**Breakpoints:** mobile <640px · tablet 640–1023px · desktop ≥1024px

**Motion:** `fast` 150ms · `base` 300ms · `slow` 400ms · easing `cubic-bezier(0.22,1,0.36,1)` toàn hệ thống. Tôn trọng `prefers-reduced-motion`.

---

## 2. KỸ THUẬT HIỂN THỊ & BỐ CỤC (dùng đúng tên, đúng vị trí)

**2.1 Breakout / Die-cut Product Image** — kỹ thuật chủ đạo, bắt buộc. Ảnh sản phẩm tách nền hoàn toàn (PNG trong suốt), tràn ra ngoài viền trên khung chứa 15–30% chiều cao ảnh. Shadow `product-drop` đặt đúng dưới thân sản phẩm (không phải bóng cả khung) để tạo ảo giác vật thể lơ lửng. Nền trong khung là khối màu đơn giản `bg-subtle`/`brand-100`, không hoạ tiết. Hover desktop: ảnh nhích lên 4–8px, shadow đậm hơn. Áp dụng: Hero, ≥1 khối Bento danh mục, card Danh sách/Nổi bật, ảnh chính Chi tiết sản phẩm.

**2.2 Bento Grid** — khối kích thước không đều (2×1, 1×1, 2×2) tạo nhịp thị giác. Dùng cho: Bento danh mục trang chủ. Không dùng cho lưới sản phẩm cần scan/so sánh.

**2.3 Split-Screen Composition** — chia viewport 2 vùng dọc tỉ lệ 55/45 hoặc 50/50, mỗi vùng mang nội dung tương phản (chữ vs ảnh, hoặc 2 đối tượng khách hàng khác nhau). Dùng cho: Hero trang chủ, section combo theo dịp.

**2.4 Sticky/Pinned Scroll Storytelling** — 1 phần tử (ảnh sản phẩm) giữ cố định (position: sticky) trong khi nội dung text bên cạnh cuộn qua, đổi nội dung/ảnh theo từng mốc cuộn (scroll-triggered swap). Dùng cho: section "Hải Sản Hôm Nay" — giới hạn 3 mốc nội dung để không nặng.

**2.5 Masonry Editorial Grid** — lưới các ô cao thấp không đều (giống Pinterest), phá vỡ sự đơn điệu của lưới đều. Dùng cho: section ảnh lifestyle/quy trình đánh bắt-đóng gói.

**2.6 Marquee/Ticker Strip** — dải ngang mỏng (48–56px height), text/badge tự động cuộn ngang liên tục tốc độ chậm, nền `brand-700`, chữ `bg-base`/`accent-500`. Dùng cho: dải ngay dưới Hero, hiển thị USP luân phiên ("Giao trong 2h · Freeship từ 500K · Tươi sống mỗi ngày · Đổi trả nếu không tươi").

**2.7 Count-up Number Animation** — số liệu đếm tăng dần từ 0 khi vào viewport (300–600ms), dùng 1 lần duy nhất khi scroll tới. Dùng cho: social proof (số đơn đã giao, rating trung bình).

**2.8 Organic Wave Divider** — SVG sóng biển bất đối xứng thay đường thẳng, màu `brand-100` hoặc gradient `bg-base→brand-100`. Đặt ở ≥3 điểm chia section trang chủ.

**2.9 Glassmorphism (tiết chế)** — backdrop-blur 12–16px, viền 1px trắng 10% opacity. Chỉ dùng: nav sticky khi cuộn, overlay của Modal/Drawer/Bottom sheet. Không phủ toàn trang.

**2.10 Claymorphism nhẹ** — shadow `card-rest`/`card-hover` cho mọi product card, dashboard card. Không đậm tới mức giả 3D.

---

## 3. CÁC MÀN HÌNH (SCREENS)

### 3.1 Trang chủ (Home) — 11 Section (không lặp mô-típ ecommerce đại trà)

1. **Hero — Split-Screen (2.3) + Breakout (2.1):** trái: headline `display` 2 dòng (dòng 1 weight 700 `text-primary`, dòng 2 weight 800 `accent-500`), 1 dòng mô tả `body-lg` `text-secondary`, CTA primary "Đặt hàng ngay" + CTA outline "Xem thực đơn". Phải: 1 sản phẩm chủ lực (cua/tôm hùm) breakout, đặt lệch, tràn vào vùng chữ. Không đặt thanh search to giữa hero.

2. **Marquee Strip (2.6):** ngay dưới Hero, full-width, USP luân phiên chạy ngang liên tục.

3. **Bento Grid danh mục (2.2):** 9 danh mục, khối lớn ưu tiên "Set hải sản nhậu"/"Set văn phòng", ≥1 khối dùng breakout image thay ảnh nền phẳng.

4. **Wave Divider (2.8)**

5. **"Hải Sản Hôm Nay" — Sticky Scroll Storytelling (2.4):** 3 mốc nội dung (VD Cá thu sáng nay / Tôm hùm mới về / Ghẹ xanh Phú Quốc), ảnh breakout giữ cố định bên trái, text mô tả + giá + CTA nhỏ cuộn bên phải, đổi ảnh khi qua mốc.

6. **Sản phẩm nổi bật:** carousel scroll-snap ngang, card breakout + shadow `card-hover` khi hover, đủ full trên mobile (1 card + peek card kế tiếp).

7. **Masonry Gallery (2.5) "Khoảnh Khắc Hải Sản":** 5–7 ảnh cao thấp không đều — cảnh đánh bắt/đóng gói/chế biến — tạo cảm giác editorial, con người thật đứng sau thương hiệu.

8. **Wave Divider (2.8)**

9. **Social Proof:** 3 số liệu Count-up (2.7) ngang hàng (VD "12.000+ đơn đã giao", "4.9★ đánh giá trung bình", "100% cam kết tươi sống") trên nền `brand-100`, cỡ chữ `h1`, kèm 3–4 quote khách hàng dạng card nhỏ.

10. **Set combo theo dịp — Split-Screen (2.3):** 2 khối tương phản "Set văn phòng eat-clean" (nền sáng) vs "Set nhậu cuối tuần" (ảnh tối hơn, mood BBQ), mỗi khối 1 CTA riêng.

11. **Mega Footer:** 4 cột (Về chúng tôi/Chính sách/Danh mục/Liên hệ) + khối đăng ký ưu đãi full-width nền `brand-700`, input + CTA `accent-500`, social icon, nền tổng thể `brand-700`.

---

### 3.2 Danh sách sản phẩm (Product List)

⚠️ **Đây là 1 TRANG ĐẦY ĐỦ (Full Page), là nội dung BẮT BUỘC phải render trước tiên, không được thay thế bằng bất kỳ Modal/Overlay nào.**

Trang gồm đầy đủ:

- Header
- Toolbar (Search Autocomplete + Sort Dropdown)
- Sidebar Filter (Danh mục, Price Range Dual Slider, Toggle còn hàng, Filter Chips, Xóa tất cả)
- Grid 8–12 Product Card (3–4 cột Desktop)
- Pagination
- Footer

Card sử dụng **Breakout Image** + `card-hover`, badge tươi/nguồn gốc/thời gian giao.

Có đầy đủ:

- Skeleton Loading
- Empty State khi filter rỗng
- Mobile Filter Bottom Sheet

**Quick View Modal (Overlay)**

Đây chỉ là trạng thái phụ, không thay thế trang chính.

Trigger từ icon **Xem nhanh** trên Product Card.

Nội dung:

- Ảnh
- Giá
- Mô tả ngắn
- Stepper
- CTA

---

### 3.3 Chi tiết sản phẩm (Product Detail)

Gallery:

- Ảnh chính Breakout
- Thumbnail
- Zoom on Hover

Panel phải:

- Tên
- Badge
- Giá
- Mô tả
- Stepper số lượng
- CTA Thêm giỏ hàng
- CTA Mua ngay

Trust Block:

- Thời gian giao
- Chính sách đổi trả
- Hướng dẫn bảo quản

Tabs:

- Mô tả
- Hướng dẫn chế biến
- Đánh giá

Cuối trang:

- Sản phẩm liên quan

Toast thêm giỏ hàng hiển thị:

- Ảnh
- Tên
- Số lượng
- Hai nút thao tác

"Mua ngay" khi chưa đăng nhập sẽ mở **Auth Modal**.

---

### 3.4 Giỏ hàng (Cart Drawer)

Drawer phải trên Desktop.

Full Screen trên Mobile.

Bao gồm:

- Ảnh
- Tên
- Đơn giá
- Stepper
- Xóa sản phẩm (Undo Toast)

Tổng tiền cập nhật realtime.

Có:

- Cảnh báo vượt tồn kho inline
- Cảnh báo hết hàng (Modal)

CTA "Tiến hành thanh toán" sticky dưới cùng.

Nếu chưa đăng nhập sẽ mở Auth Modal.

---

### 3.5 Thanh toán & QR Code (Checkout)

Route:

`/checkout`

Bắt buộc là Route riêng vì redirect cổng thanh toán.

Thanh toán gồm **3 bước** với **Progress Dots**:

### Bước 1 — Thông tin giao hàng

- Họ tên
- SĐT
- Địa chỉ
- Ghi chú

### Bước 2 — Phương thức thanh toán

Có đầy đủ:

- COD
- QR Bank
- MoMo
- ZaloPay
- VNPay

Card gồm:

- Icon
- Tên
- Mô tả
- Radio

Card được chọn:

- Border Accent
- Background Accent

### Bước 3 — Xác nhận

Nếu:

- COD
- MoMo
- ZaloPay
- VNPay

→ Tóm tắt đơn hàng → Thanh toán → `/payment-result`

Nếu chọn **QR Code**

Hiển thị ngay:

- QR 200×200
- Ngân hàng
- STK
- Chủ tài khoản
- Số tiền
- Nội dung chuyển khoản
- Copy
- Countdown 15 phút

CTA:

"Tôi đã chuyển khoản"

Sidebar đơn hàng Sticky xuyên suốt 3 bước.

---

### 3.6 Kết quả thanh toán (Payment Result)

Route:

`/payment-result`

Gồm 4 trạng thái:

- Thành công
- Thất bại
- Đang xử lý
- Đang chờ xác nhận (QR)

Đầy đủ CTA tương ứng.

---

### 3.7 Auth Modal (Đăng nhập/Đăng ký/OTP/Quên mật khẩu)

⚠️ Là **1 Modal** nhưng gồm **5 Frame riêng biệt**:

1. Đăng nhập
2. Đăng ký
3. OTP
4. Quên mật khẩu
5. Đặt mật khẩu mới

Tất cả dùng chung:

- Kích thước
- Radius
- Shadow

Validate realtime.

OTP:

- Auto Focus
- Countdown
- Resend
- Shake khi sai
- Hết hạn sau 5 phút

Thành công:

- Check Icon
- Toast
- Tự đóng Modal

---

### 3.8 Tài khoản (Account)

Route:

`/account`

Sidebar:

- Thông tin cá nhân
- Đơn hàng
- Đổi mật khẩu
- Đăng xuất

Thông tin cá nhân:

- Avatar Upload
- Crop
- Họ tên
- SĐT
- Email

Đơn hàng:

- Filter
- Badge
- Timeline
- Hủy đơn

Đổi mật khẩu:

- 3 Field
- Toast Success
- Inline Error

---

### 3.9 Tìm kiếm (Search)

Tái sử dụng layout Product List.

Có:

- Search Suggestion
- Lịch sử tìm kiếm
- Empty State

---

### 3.10 Giới thiệu / Liên hệ (About & Contact)

Bao gồm:

- Storytelling thương hiệu
- Khu vực giao hàng
- Form liên hệ

---

### 3.11

404 / Empty State

Minh họa theo chủ đề biển.

CTA quay về Trang chủ.

| Popup                                   | Trigger                                                                       | Kiểu                                                     |
| --------------------------------------- | ----------------------------------------------------------------------------- | -------------------------------------------------------- |
| Auth Modal (Login/Register/OTP/Quên MK) | Header, Checkout, Mua ngay, Account chưa login                                | Modal overlay                                            |
| Bottom Sheet lọc                        | Nút "Lọc" mobile                                                              | Bottom sheet                                             |
| Quick View sản phẩm                     | Icon "Xem nhanh" trên card                                                    | Modal overlay                                            |
| Toast thêm giỏ hàng                     | CTA "Thêm giỏ hàng"                                                           | Toast góc trên phải, auto-dismiss                        |
| Undo Toast xoá item giỏ                 | Xoá item trong Giỏ hàng                                                       | Toast, nút Hoàn tác                                      |
| Cảnh báo hết hàng trong giỏ             | Vào Checkout / tồn kho đổi                                                    | Modal overlay                                            |
| Modal upload/crop avatar                | Đổi avatar ở Account                                                          | Modal overlay                                            |
| Modal xác nhận huỷ đơn                  | "Huỷ đơn" ở chi tiết đơn                                                      | Modal overlay                                            |
| Cart Drawer                             | Icon giỏ hàng header                                                          | Drawer phải / full-screen mobile                         |
| Modal xem lại mã QR chuyển khoản        | Nút "Xem lại mã QR" ở trang Kết quả thanh toán (trạng thái Đang chờ xác nhận) | Modal overlay, hiện lại khối QR + thông tin chuyển khoản |

---

## 6. RÀNG BUỘC CỨNG — KHÔNG THƯƠNG LƯỢNG

1. Không dark mode toàn trang — chỉ header/footer nền `brand-700`.
2. Không đổi mã màu ngoài token ở mục 1.
3. Auth Modal luôn là overlay lồng trên màn hình gốc (Giỏ hàng/Chi tiết SP), không tách thành trang riêng.
4. Breakout Product Image bắt buộc ở mọi vị trí đã chỉ định — không thay bằng ảnh bo khung vuông thông thường.
5. Không tạo route mới cho các tác vụ đã quy định dùng modal/drawer ở mục 5.
6. ≤3 nhóm màu chính/màn hình, accent không tô nền lớn.
7. Loading/Empty/Error state bắt buộc ở mọi màn hình có dữ liệu động — dùng skeleton, không dùng spinner xoay.
8. Dữ liệu mẫu 100% tiếng Việt thật, giá đúng định dạng `320.000₫`, không Lorem Ipsum.
9. **Spacing phải theo đúng bảng ở mục 1.1 tuyệt đối, không tự ước lượng.** Khoảng cách giữa các phần tử cùng cấp trong cùng màn hình phải đồng nhất — đây là lỗi đã xảy ra thực tế (spacing lệch giữa các khung) và không được lặp lại.