# State management

## Ranh giới rõ ràng
- **Server state** (dữ liệu từ API) → TanStack Query. KHÔNG copy vào Zustand.
- **Global UI state** (cart drawer mở/đóng, auth modal, theme) → Zustand.
- **Local state** (input, toggle trong 1 component) → `useState`.

## Zustand rules
- Mỗi store một domain: `useCartStore`, `useAuthModalStore`. Không gộp tất cả vào một store.
- Store chỉ giữ UI state; dữ liệu sản phẩm/đơn hàng lấy từ TanStack Query, không lưu song song trong store (tránh lệch nguồn sự thật).

## File mẫu canonical
- `src/libs/stores/cart.ts` (tạo khi làm feature giỏ hàng)