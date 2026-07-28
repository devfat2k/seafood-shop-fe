# Components

## Phân tầng
- `src/components/ui/` = Shadcn primitives. KHÔNG sửa trực tiếp. Cần biến thể → compose ở tầng trên hoặc dùng CVA.
- Component nghiệp vụ đặt theo feature: `src/features/<feature>/` (vd `src/features/products/ProductCard.tsx`).
- Layout tái dùng (Header, Footer, MegaFooter) đặt ở `src/components/layout/`.

## Quy ước
- Variants bằng `class-variance-authority` (CVA), không viết if/else className dài.
- Gộp className bằng `cn()` (tailwind-merge) — không nối chuỗi thủ công.
- Icon: Lucide React.
- Mọi component có trạng thái động phải render đủ: loading (skeleton) / empty / error / success.

## File mẫu canonical
- `src/features/products/ProductCard.tsx` (tạo khi làm card breakout theo design-spec)
