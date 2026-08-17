# Spec: UI Tìm Kiếm Sản Phẩm & Flow Search Chuẩn E-commerce

## 1. Mục tiêu
Cung cấp màn hình tìm kiếm sản phẩm chuyên biệt và trải nghiệm tìm kiếm tối ưu cho storefront hải sản:
- Tìm kiếm tức thì với Debounce + Instant Search Dropdown ở Header.
- Màn hình kết quả tìm kiếm đầy đủ (`/[locale]/search?q=...`) với bộ lọc thông minh (danh mục, khoảng giá, trạng thái còn hàng, sắp xếp).
- Phân tích từ khóa tìm kiếm (hiển thị số lượng kết quả tìm thấy, từ khóa nổi bật/gợi ý).

## 2. User flow
1. **Header Search Interaction**:
   - Người dùng nhập từ khóa ở Header search bar -> tự động hiển thị Instant Search Dropdown (5 kết quả hàng đầu + nhóm từ khóa gợi ý như "Tôm hùm", "Cua Cà Mau", "Mực lá").
   - Nhấn `Enter` hoặc click "Xem tất cả X kết quả" -> chuyển hướng đến `/[locale]/search?q={kết_quả}`.
2. **Search Results Page (`/[locale]/search`)**:
   - Hiển thị tiêu đề tìm kiếm: `Kết quả tìm kiếm cho "{query}" (X sản phẩm)`.
   - Cung cấp Search Bar ngay tại trang kết quả để tinh chỉnh từ khóa nhanh.
   - Thanh công cụ phía trên: Lọc theo danh mục, chọn khoảng giá, chọn sắp xếp (Mới nhất, Giá tăng/giảm, Phổ biến).
   - Lưới sản phẩm (Product Grid 4 cột desktop, 2 cột mobile) tích hợp nút "Thêm vào giỏ" nhanh.

## 3. API liên quan
- `GET /api/v1/products?search={query}&categoryId={id}&minPrice={min}&maxPrice={max}&sort={sort}&page={page}&size={size}` (Đã có qua `getProducts` trong `src/lib/api/products.ts`).
- `GET /api/v1/categories` (Đã có qua `getCategories` trong `src/lib/api/categories.ts`).

## 4. UI states (Tuân thủ ux-ui skill & 3 state bắt buộc)
- **Loading State**: Hiển thị Product Card Skeleton (khung ảnh + title + giá) tương thích layout 4 cột, không dùng spinner tròn.
- **Empty State**: Khi không tìm thấy sản phẩm phù hợp với từ khóa:
  - Hiển thị Icon `fish` / `search-x` + Message tiếng Việt: *"Không tìm thấy hải sản nào phù hợp với từ khóa '{query}'"*.
  - Gợi ý từ khóa nổi bật (Tôm hùm Phan Thiết, Cua Cà Mau, Cá thu một nắng...).
  - Nút CTA: "Khám phá tất cả hải sản".
- **Error State**: Lỗi kết nối máy chủ -> Message tiếng Việt + Nút "Thử lại".
- **Success State**: Lưới sản phẩm chuẩn design tokens (Coral `#FF6B4A`, Ocean Teal `#0F7C8C`, Be Vietnam Pro, spacing scale 4/8/12/16/24/32).

## 5. Edge cases
- Từ khóa quá ngắn (< 2 ký tự): không kích hoạt instant search autocomplete nhưng vẫn cho phép submit full page search.
- Từ khóa chứa ký tự đặc biệt: Encode URL an toàn bằng `encodeURIComponent`.
- Không có từ khóa trong URL (`/search` trơn): hiển thị các từ khóa HOT và danh sách sản phẩm nổi bật / tất cả sản phẩm.

## 6. Ngoài phạm vi (Out of scope)
- Lưu lịch sử tìm kiếm vào LocalStorage (có thể bổ sung ở Phase 2).
- Voice search / Tìm kiếm bằng hình ảnh.
