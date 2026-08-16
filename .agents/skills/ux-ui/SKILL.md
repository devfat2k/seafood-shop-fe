---
name: ux-ui
description: Quy chuẩn thiết kế UI/UX, design tokens, spacing, và pattern component cho Seafood Shop Web. Dùng khi tạo hoặc chỉnh sửa bất kỳ UI nào.
---

## Design tokens (UXMagic Frame 6a8031ae52f49148d866f95c)
 
- **Spacing scale**: chỉ `4, 8, 12, 16, 24, 32, 48, 64, 96px` — map Tailwind:
   `p-1/p-2/p-3/p-4/p-6/p-8/p-12/p-16/p-24`.
- **Màu sắc**: chỉ dùng token định nghĩa trong `src/styles/global.css`:
  - `bg-background` (`#FBF7F0` Ivory Warm) · `text-foreground` (`#0B4A5C` Ocean Deep)
  - `bg-primary` / `text-primary` (`#FF6B4A` Coral) · `bg-secondary` / `text-secondary` (`#0F7C8C` Ocean Teal)
  - `text-tertiary` (`#2E8B57` Fresh Green) · `text-accent` (`#F4A93B` Amber) · `text-destructive` (`#E4483C` Red)
  - `bg-card` (`#FFFFFF`) · `border-border` (`#E2E8E4`) · `text-muted-foreground` (`#4A5560`)
  - Không hardcode mã hex trong component.
- **Typography**:
  - `font-sans`: **Be Vietnam Pro** (UI, body, heading H2-H6, button, price)
  - `font-heading`: **Fraunces** (Display headline, Hero banner, Luxury combo)
  - `font-mono`: **JetBrains Mono** (Mã đơn hàng, ngày giờ, số liệu kỹ thuật)
- **Radius**: `sm` 8px (input/button), `md/lg` 12px (card/banner), `full` 999px (badge/pill).

## Component pattern

- Luôn kiểm tra `src/components/ui/` trước — nếu shadcn đã có Button/Card/Dialog/Input
  thì dùng lại, không viết mới.
- Component domain-specific đặt đúng thư mục theo feature (`product-detail/`,
  `account/`...), không nhét chung vào `common/` nếu đã có domain rõ ràng.
- Responsive: mobile-first, dùng breakpoint chuẩn Tailwind (`sm/md/lg/xl`), không tự
  định nghĩa breakpoint riêng.

## 3 state bắt buộc cho mọi màn hình động

| State | Yêu cầu |
|---|---|
| Loading | Skeleton đúng hình dạng nội dung thật (không spinner tròn chung chung) |
| Empty | Message tiếng Việt + icon/illustration, không để trắng trơn |
| Error | Message rõ nguyên nhân (nếu biết) + nút "Thử lại" nếu retry hợp lý |

## Gu thẩm mỹ (tránh AI-generated look mặc định)

- **Tránh**: shadow mặc định quá đậm, border-radius không nhất quán giữa các
  component, quá nhiều màu accent trong 1 màn hình, căn giữa mọi thứ theo mặc định.
- **Ưu tiên**: nhất quán về khoảng cách (đúng spacing scale), phân cấp rõ ràng bằng
  font-weight/size thay vì thêm màu, đủ whitespace (không nhồi nhét nội dung).
- Nếu không chắc "đẹp" theo hướng nào → hỏi user, đừng tự quyết định phá vỡ pattern
  đã có trong `docs/conventions/` hoặc Storybook hiện tại.

## Khi tạo component UI mới

1. Kiểm tra Storybook (`bun run storybook`) xem đã có pattern tương tự chưa.
2. Follow spacing/token ở trên.
3. Thêm story `.stories.tsx` nếu là component tái dùng.
4. Kiểm tra responsive tối thiểu ở 375px (mobile) và 1280px (desktop).
