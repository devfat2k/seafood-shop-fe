---
name: ui-ux
description: Use when building or editing any storefront UI screen, section, or component for the seafood shop. Enforces the design spec (tokens, hard spacing table, breakout product images, ≤3 màu/màn hình) and runs an anti-slop check before finishing.
---

# UI/UX — Seafood storefront

## Bước 1 — Trước khi code
1. Đọc `docs/specs/design-spec.md`. Xác định màn hình thuộc nhóm nào trong 11 screen.
2. Chọn macrostructure (Split-Screen hero / Bento / Sticky scroll / Masonry). Không lặp lại layout vừa dùng.

## Bước 2 — Ràng buộc cứng
- Spacing lấy ĐÚNG bảng mục 1.1 của design-spec. Không nội suy (không 18/28/52px). Thang: 4·8·12·16·24·32·48·64·96.
- Breakout product image ở mọi vị trí chỉ định; ảnh PNG tách nền tràn viền trên 15–30%; shadow đặt dưới thân sản phẩm.
- Màu sắc: `background` (#FBF7F0), `foreground` (#0B4A5C), `primary` (#FF6B4A), `secondary` (#0F7C8C), `tertiary` (#2E8B57), `accent` (#F4A93B).
- Typography: `font-sans` (Be Vietnam Pro), `font-heading` (Fraunces), `font-mono` (JetBrains Mono).
- Radius: card 12px (`rounded-xl`), button/input 8px (`rounded-lg`), modal 16–20px, badge 999px (`rounded-full`).
- Motion tôn trọng `prefers-reduced-motion`.

## Bước 3 — Trạng thái bắt buộc
Mọi màn hình có dữ liệu động phải có: Loading (skeleton, KHÔNG spinner) · Empty · Error · Success.

## Bước 4 — Anti-slop gate (tự tick trước khi xuất code)
- [ ] Không hero gradient tím→xanh; dùng nền `bg-background` (#FBF7F0) hoặc `bg-card` (#FFFFFF).
- [ ] Kết hợp chuẩn font: `font-heading` (Fraunces) cho Display/Hero và `font-sans` (Be Vietnam Pro) cho Body/Heading.
- [ ] Không căn giữa mọi thứ; bias layout có chủ đích.
- [ ] Spacing khớp bảng cứng, đồng nhất giữa các phần tử cùng cấp.
- [ ] Có skeleton + empty + error.
- [ ] Data mẫu 100% tiếng Việt thật, giá `320.000₫`, không Lorem Ipsum.

## Ghi chú
Có thể dùng skill `hallmark` verb `audit` để soi thẩm mỹ, nhưng khi xung đột, design-spec của dự án LUÔN thắng.
