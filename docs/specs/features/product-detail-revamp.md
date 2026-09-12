# Spec: Cải tổ giao diện & Trải nghiệm Chi tiết Sản phẩm (Product Detail Revamp)

## 1. Mục tiêu
Nâng cấp toàn diện trang Chi tiết Sản phẩm (`/products/[id]`) từ một giao diện cơ bản thành trải nghiệm mua sắm hải sản tươi sống cao cấp, trực quan và khoa học:
- Khắc phục lỗi thiếu tiêu đề `<h1>` và phân cấp thông tin (Hierarchy).
- Tăng tính thuyết phục và kích thích vị giác qua hình ảnh chân thực, câu chuyện nguồn gốc Phan Thiết và gợi ý món ngon.
- Xây dựng Trust Badges vững chắc (chuỗi lạnh 2H, bao ăn 1 đổi 1, cân đủ trọng lượng).
- Tối ưu tỷ lệ chuyển đổi (CRO) với quy cách trọng lượng rõ ràng, CTA kép nổi bật và Sticky Bar tiện lợi trên Mobile.

## 2. User flow
1. Khách hàng truy cập vào trang chi tiết từ Trang chủ, Danh mục hoặc Tìm kiếm.
2. Khách nhìn thấy tiêu đề sản phẩm rõ ràng, badge "Tươi Sống Tại Bến", điểm đánh giá sao uy tín và xuất xứ bến cá Phan Thiết.
3. Khách lướt xem gallery ảnh chất lượng cao (ảnh gốc, ảnh đóng thùng oxy giữ lạnh, cận cảnh thớ thịt tươi).
4. Khách chọn quy cách sơ chế / trọng lượng mong muốn (ví dụ: khay 500g, túi oxy 1kg), xem giá cập nhật tương ứng.
5. Khách chọn số lượng và bấm:
   - **Thêm Vào Giỏ Hàng**: Hiển thị toast thông báo mượt mà.
   - **Mua Ngay**: Thêm vào giỏ và chuyển thẳng sang `/checkout`.
6. Khách cuộn xuống khám phá câu chuyện đánh bắt, gợi ý món ngon chế biến và đánh giá từ khách hàng thực tế.
7. Khách tiếp tục khám phá 4 sản phẩm liên quan gợi ý cùng báo giá trong ngày.
8. Trên thiết bị di động, khi cuộn qua cụm nút chính, thanh Sticky Purchase Bar xuất hiện ở đáy màn hình giúp thao tác không bị gián đoạn.

## 3. API liên quan
- `GET /api/v1/products/{id}`: Chi tiết sản phẩm.
- `GET /api/v1/products?categoryId={id}&size=8`: Sản phẩm cùng danh mục liên quan (với fallback lấy danh sách sản phẩm nổi bật/mới nhất nếu danh mục rỗng).

## 4. UI states & Design Constraints
- **Loading**: `ProductDetailSkeleton` mô phỏng đúng khung hình 2 cột (Gallery bên trái, Purchase Panel bên phải) và Tabs bên dưới.
- **Empty / Not Found**: Màn hình báo sản phẩm không tồn tại / ngừng kinh doanh + nút quay lại danh mục.
- **Error**: Khối thông báo lỗi kết nối máy chủ + nút Thử lại.
- **Design Tokens**:
  - Nền: `bg-background` (#FBF7F0) hoặc `bg-card` (#FFFFFF).
  - Màu chữ: `text-foreground` (#0B4A5C) và `text-muted-foreground` (#4A5560).
  - Màu nhấn: `primary` (#FF6B4A Coral), `secondary` (#0F7C8C Ocean Teal), `accent` (#F4A93B Amber), `tertiary` (#2E8B57 Fresh Green).
  - Typography: `font-heading` (Fraunces) cho tiêu đề sản phẩm; `font-sans` (Be Vietnam Pro) cho nội dung, thông số, giá bán.
  - Spacing cứng: `4, 8, 12, 16, 24, 32, 48, 64px`.

## 5. Edge cases
- **Sản phẩm hết hàng (`stock <= 0` hoặc `inStock === false`)**: Các nút CTA hiển thị trạng thái disabled "Tạm hết hàng", không cho tăng số lượng, gợi ý các sản phẩm tương tự còn hàng.
- **Sản phẩm chỉ có 1 ảnh từ API**: Hệ thống tự động bổ sung visual thumbnails theo ngữ cảnh hải sản (hàng bơi sống, quy cách đóng gói chuỗi lạnh) để không làm vỡ bố cục gallery.
- **Danh mục không có sản phẩm liên quan**: Tự động fallback sang sản phẩm bán chạy/mới về để khu vực chân trang luôn đầy đặn 4 sản phẩm.
- **Tên sản phẩm quá dài hoặc mô tả ngắn**: Bố cục linh hoạt co giãn, không bị vỡ layout hoặc tràn viền.

## 6. Ngoài phạm vi (Out of scope)
- Chưa tích hợp tính năng livestream xem bể cá trực tiếp từ cửa hàng.
- Chưa tích hợp hệ thống bình luận có kèm video upload từ khách hàng (chỉ hỗ trợ hiển thị đánh giá & form text/sao có sẵn).
