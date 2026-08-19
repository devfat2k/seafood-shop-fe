# Spec: Tối Ưu & Nâng Cấp Toàn Diện Section Combo Hải Sản Tiệc

> **Mã Spec**: `SPEC-COMBO-REVAMP-01`  
> **Người soạn**: Senior Frontend Engineer  
> **Trạng thái**: Draft — Chờ duyệt (Pending Approval)  
> **Vị trí**: `src/components/home/ComboSetsSection.tsx`

---

## 1. Mục tiêu & Vấn đề cần giải quyết

### 1.1 Vấn đề hiện tại trên UI
1. **Mất điểm bán hàng (Thiếu Value Proposition)**: Khách hàng nhìn vào không thấy lý do rõ ràng "Tại sao phải chọn combo?" (không có khẩu phần mấy người, không có giá gốc so sánh để thấy mức tiết kiệm, không có tag quà tặng kèm gia vị/nước chấm).
2. **Mất cân đối thị giác & Màu sắc lộn xộn**: Đoạn mô tả dùng màu `text-secondary` (Teal) dài dòng và lặp lại tên combo, tạo cảm giác nặng nề, khó đọc, thiếu phân cấp thị giác (hierarchy).
3. **Nút bấm và nhãn không nhất quán (Button Inconsistency)**: Mỗi card dùng 1 nhãn khác nhau ("Đặt Set Ngay", "Khám Phá Set VIP", "Đặt Nồi Lẩu", "Đặt Set Ăn Ngay"), nút bị lệch và thiếu đồng bộ.
4. **Bố cục lưới bị lẻ (Odd Grid)**: API trả về 5 combos khiến hàng thứ 3 chỉ có 1 card trơ trọi bên trái.
5. **Badges thô cứng**: Badges dán cứng trên ảnh chưa theo hệ thống token phân loại.

### 1.2 Mục tiêu sau khi nâng cấp
- Trả lời ngay câu hỏi: **"Tại sao nên mua combo?"** $\rightarrow$ Tiết kiệm 15–20% so với mua lẻ, Đủ khẩu phần định lượng (2-4 người, 6-8 người), Tặng kèm trọn bộ nước chấm muối ớt xanh Phan Thiết chuẩn vị.
- Chuẩn hóa typography theo style guide: `font-heading` (Fraunces) cho tiêu đề lớn/tiêu đề combo cao cấp; `font-sans` (Be Vietnam Pro) cho nội dung, thông số, badge, giá tiền và nút bấm.
- Màu sắc cân bằng: Màu chữ mô tả `text-muted-foreground` dễ chịu, thông tin điểm nhấn dùng `text-foreground` và badge HSL tinh tế.
- Bố cục lưới cân xứng, mượt mà trên cả Mobile & Desktop.
- Nút CTA đồng bộ 100%: "Thêm Combo Vào Giỏ" / "Đặt Combo" kèm icon chuẩn và kết nối trực tiếp với `useCartStore`.

---

## 2. Thiết kế UX/UI & Cấu trúc Component

### 2.1 Cấu trúc Card Combo Mới (High-Value Combo Card)
Mỗi card combo sẽ được tái cấu trúc thành 4 lớp thông tin rõ ràng:
1. **Media & Badges**:
   - Ảnh combo chất lượng cao với hiệu ứng zoom nhẹ (`group-hover:scale-105`).
   - Badge nổi bật góc trên: `TIẾT KIỆM 20%` (amber/tertiary), `BÁN CHẠY #1` (coral/primary), hoặc `TIỆC GIA ĐÌNH` (teal/secondary).
   - Chip khẩu phần nhanh góc dưới ảnh: `👥 4-6 Người` hoặc `🍲 Kèm Nồi Lẩu/Sốt`.
2. **Thông tin cốt lõi (Title & Feature Highlights)**:
   - Tiêu đề Combo: `font-heading text-lg font-bold text-foreground` (gọn gàng, không lặp lại).
   - Danh sách điểm nổi bật (Feature Bullets / Chips):
     - 🦐 *Thành phần*: Tôm càng, mực lá, cua thịt, nghêu Phan Thiết.
     - 🎁 *Tặng kèm*: Sốt chấm muối ớt xanh + rau bổi lẩu.
3. **Giá trị kinh tế (Pricing & Savings)**:
   - Giá combo nổi bật: `font-sans text-xl font-bold text-primary`.
   - Giá gốc so sánh (tiết kiệm): `text-xs text-muted-foreground line-through` thể hiện rõ giá trị tiết kiệm cho khách.
   - Nhãn đơn vị: `/Set`.
4. **Hành động nhất quán (Unified CTA)**:
   - Nút chính: `Thêm Vào Giỏ` / `Đặt Combo` (kích thước chuẩn `rounded-lg`, nền `bg-primary`, text `text-white font-bold`, icon `shopping-cart`).

### 2.2 Xử lý Bố cục Lưới khi số lượng lẻ (5 combos)
- **Phương án 1 (Khuyên dùng - Featured Spotlight + Grid)**: 
  - 1 Combo VIP / Bán chạy nhất được render ở dạng **Spotlight Card (Banner nổi bật)** chiếm 1 nửa hoặc full-width với đầy đủ visual chi tiết.
  - 4 Combos còn lại render dạng 2x2 Grid cân đối.
- **Phương án 2 (Responsive Auto Grid + Mobile Carousel Snap)**:
  - Grid 3 cột trên màn hình lớn `lg:grid-cols-3` với card cân đối, hoặc Responsive Slider trên Mobile để lướt mượt mà không bị cụt hàng.

---

## 3. Dữ liệu & API Contract

Sử dụng dữ liệu từ `GET /api/v1/home` $\rightarrow$ `data.comboSets`:
```typescript
export type ComboSet = {
  id: number | string;
  tag: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  unit: string;
  ctaText?: string;
  href?: string;
  image: string;
  imageUrl?: string;
  servings?: string;
  includesGifts?: string;
};
```

---

## 4. UI States & Edge Cases

| State | Hành vi |
|---|---|
| **Loading** | Skeleton 2 hàng card combo có đầy đủ placeholder ảnh, tiêu đề và nút bấm |
| **Empty** | Tự động ẩn section nếu `combos.length === 0` (clean home page) |
| **Success/Thao tác** | Bấm CTA $\rightarrow$ Gọi `addItem` vào `cartStore` $\rightarrow$ Toast thông báo tiếng Việt $\rightarrow$ Mở `CartDrawer` |

---

## 5. Ngoài phạm vi (Out of scope)
- Chưa làm trang builder tự tùy biến nguyên liệu trong combo (sẽ làm ở giai đoạn sau).
