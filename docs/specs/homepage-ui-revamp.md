# Spec: Tối Ưu & Nâng Cấp Giao Diện Trang Chủ Dựa Trên 100% Dữ Liệu API Thật

> **Mã Spec**: `SPEC-HOMEPAGE-REVAMP-02`  
> **Người soạn**: Senior Frontend Engineer  
> **Trạng thái**: Draft — Chờ duyệt (Pending Approval)  
> **Dữ liệu nguồn**: `GET /api/v1/home` (Dữ liệu thực tế từ Backend Database & MinIO S3)

---

## 1. Mục tiêu

Nâng cấp giao diện Trang Chủ Storefront trở nên nổi bật, sang trọng, mượt mà và chuyên nghiệp, **chỉ tập trung 100% vào các trường dữ liệu thực tế** mà API `/api/v1/home` trả về (không đưa thêm các section giả hay dữ liệu ngoài luồng).

---

## 2. Rà Soát Dữ Liệu Thực Tế Từ `/api/v1/home`

| Khối dữ liệu | Dữ liệu trả về thực tế từ Backend | Section tương ứng trên Trang Chủ |
|---|---|---|
| `heroSlides` | 3 banner slides có `productCard.imageUrl` (ảnh MinIO S3), `sortOrder`, `isActive` | **Hero Section**: Slider chuyển ảnh mượt mà, ocean overlay, tiêu đề & nút CTA điều hướng sang `/products`. |
| `stats` | `{ totalOrdersDelivered: 1250, averageRating: 5.0, totalReviews: 0 }` | **Live Stats Bar**: Thống kê uy tín (1.250+ đơn giao thành công, 5.0★ đánh giá) lồng ghép ngay dưới Hero. |
| `categories` | 8 danh mục (`id`, `name`, `imageUrl`, `badge`, `badgeType`, `iconName`, `productCount`, `displayStyle`) | **Bento Grid Categories**: Hiển thị 8 danh mục với ảnh thật, badge ("BÁN CHẠY #1"), icon Lucide, số lượng sản phẩm, link tới `/products?category={id}`. |
| `featuredProductTabs` | 8 tabs (`all`, `ca-bien-tuoi`, `tom`, `muc`, `cua-ghe`, `so-ngheu-oc`, `hai-san-kho`, `nuoc-mam-gia-vi-bien`) | **Category Tabs Bar**: Thanh tab lọc danh mục sản phẩm nổi bật. |
| `featuredProducts` | 19 sản phẩm có `id`, `name`, `price`, `imageUrl`, `categoryLabel`, `description` | **Featured Products Grid**: Lưới sản phẩm nổi bật theo Tab lọc, hiển thị ảnh thật MinIO, giá định dạng `xxx.xxx₫`, nút Quick View và Thêm vào giỏ. |
| `dailyArrivals` | Mảng dữ liệu cập bến theo ngày (0-n phần tử) | **Daily Arrivals**: Chỉ render khi `dailyArrivals.length > 0`. |
| `comboSets` | Mảng combo set tiệc (0-n phần tử) | **Combo Sets**: Chỉ render khi `comboSets.length > 0`. |
| `featuredReviews` | Mảng đánh giá khách hàng (0-n phần tử) | **Social Proof**: Chỉ render khi `featuredReviews.length > 0`. |

---

## 3. Các Điểm Cần Cải Thiện & Sửa Lỗi Cụ Thể

1. **Hero Banner & Stats Bar**:
   - Khắc phục hiển thị 3 slide ảnh banner từ MinIO S3 (`http://localhost:9000/...`).
   - Tích hợp thanh thống kê số liệu thật từ `stats` (`totalOrdersDelivered: 1250`, `averageRating: 5.0`) với thiết kế kính mờ (Glassmorphism) tinh tế.
2. **Bento Grid Categories**:
   - Tối ưu bố cục Bento 8 ô chuẩn tỷ lệ, hỗ trợ `displayStyle` (`main` là ô lớn, `card` là ô vừa), hiển thị badge động và số lượng sản phẩm thực tế `productCount`.
   - Điều hướng chuẩn khi bấm danh mục: chuyển sang `/products?category={cat.id}`.
3. **Sửa Lỗi Lọc Tab Sản Phẩm Nổi Bật (`FeaturedProducts.tsx`)**:
   - Hiện tại backend trả `p.categorySlug = null` nhưng có `p.categoryLabel` (VD: 'Tôm Tươi Sống', 'Cá Biển & Cá Nước Ngọt', 'Cua & Ghẹ'...).
   - Sửa logic filter để ánh xạ `tab.slug` với `p.categoryLabel` (hoặc nhãn danh mục tương ứng) để khi bấm tab (Tôm, Cua ghẹ, Cá biển, Hải sản khô...) sản phẩm lọc chính xác 100%, không bị trả về mảng rỗng `[]`.
   - Nâng cấp Product Card với hiệu ứng hover mượt mà, nút xem nhanh (Quick View modal) và nút thêm giỏ hàng.
4. **Ẩn Các Khối Dữ Liệu Rỗng (Clean UI)**:
   - Với `dailyArrivals`, `comboSets`, `featuredReviews`, chỉ render khi mảng có dữ liệu từ backend, tránh để khối trống hoặc chèn dữ liệu tĩnh không có trong DB.

---

## 4. Ba Trạng Thái UI Bắt Buộc

- **Loading**: Skeleton đúng khung Hero, Bento Grid và Product Grid.
- **Empty**: Thông báo tiếng Việt khi API trả về trống + nút Làm mới.
- **Error**: Thông báo lỗi kết nối + nút Thử lại (`refetch()`).
