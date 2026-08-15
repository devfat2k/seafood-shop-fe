# AGENTS.md — Seafood Shop Web (Nguồn ngữ cảnh chung cho mọi AI tool)

> Đọc cùng với `GEMINI.md` (rule cứng, ưu tiên cao nhất — xem file đó nếu có xung đột)
> và `PROJECT_STRUCTURE.md` (kiến trúc, stack, danh sách route đầy đủ).

## Vai trò

Senior frontend engineer làm việc trên storefront thương mại điện tử hải sản
(Seafood Shop Web), dùng Next.js 16 App Router + React 19 + TypeScript strict +
Tailwind v4.

## Trước khi code — luôn theo trình tự này

1. Đọc `docs/specs/` cho feature liên quan. Nếu **chưa có spec** cho feature đang làm
   và feature đó có độ phức tạp trung bình trở lên → dùng skill `spec-writing` để tạo
   spec trước, dừng lại chờ user duyệt.
2. Đọc `docs/conventions/` cho convention liên quan (naming, folder, pattern).
3. Kiểm tra `src/components/ui/` xem đã có component tái dùng được chưa trước khi tạo mới.
4. Nếu là feature UI mới hoặc chỉnh sửa giao diện → dùng skill `ux-ui` để đối chiếu
   design tokens/spacing/pattern trước khi code.
5. Nếu yêu cầu của user mơ hồ về UX hoặc có nhiều cách implement hợp lý → dùng skill
   `brainstorm` trước khi chọn hướng.

## Stack & thư viện cố định (không tự ý đổi/thêm lib thay thế)

| Nhu cầu | Dùng | Không dùng |
|---|---|---|
| Data fetching/cache | TanStack Query | `useEffect` + `useState` fetch thủ công |
| HTTP | axios qua `ApiClient.ts` (đã có interceptor refresh token 401) | viết lại logic refresh token |
| Form | `react-hook-form` + zod qua `@hookform/resolvers` | validate tay bằng if/else |
| Toast | `sonner` | tự viết component toast |
| Icon | `lucide-react` | SVG tự vẽ/thư viện icon khác |
| i18n | `next-intl`, string qua `src/locales/` | hardcode chuỗi tiếng Việt trong JSX |
| className | `cn()` helper (clsx + tailwind-merge) | nối chuỗi className thủ công |

## Cấu trúc thư mục — đặt file đúng chỗ

- `src/components/{feature}/` theo đúng domain: `account`, `auth`, `common`, `home`,
  `layout`, `product-detail`, `products`, `ui`.
- `src/validations/` cho mọi zod schema — không định nghĩa schema rời trong component.
- `src/types/` cho types dùng chung — không định nghĩa lại type API response cục bộ
  ở nhiều nơi khác nhau.

## Testing

- Logic quan trọng (hooks, utils, validation) → unit test bằng `vitest`.
- Flow người dùng chính (checkout, auth) → cân nhắc Playwright E2E nếu spec yêu cầu.
- Component UI tái dùng (trong `src/components/ui` hoặc component phức tạp) → thêm
  Storybook story.

## Khi task lớn (nhiều màn hình / nhiều component)

Không implement một lần toàn bộ. Trình tự bắt buộc:

1. Viết spec ngắn (skill `spec-writing`) → chờ duyệt.
2. Brainstorm nếu có nhiều hướng UX (skill `brainstorm`) → chờ user chọn hướng.
3. Implement từng phần nhỏ (1 component / 1 hook mỗi lần), chạy verification loop
   (xem `GEMINI.md` mục 1) sau mỗi phần.
4. Bắt buộc thực hiện đầy đủ **Task Completion Checklist** bên dưới trước khi báo hoàn tất.

## Checklist bắt buộc khi hoàn thành task (Task Completion Checklist)

Trước khi báo xong task hoặc dừng công việc, BẮT BUỘC thực hiện kiểm tra 5 bước:
1. `bun run check:types` — PHẢI đạt 0 lỗi TS (không dùng `any` hay `// @ts-ignore`).
2. `bun run lint` — PHẢI kiểm tra và sửa các lỗi linter.
3. `bun run test` — PHẢI pass tất cả unit test khi có sửa đổi logic/hook/util.
4. **3 trạng thái UI** — PHẢI xử lý đủ Loading, Empty, Error trên các màn hình động.
5. **Quality Review** — Chạy skill `code-review` tự đánh giá code trước khi bàn giao.

## Tham chiếu

- Rule cứng, bất biến, không được vi phạm: `GEMINI.md`
- Kiến trúc tổng thể, danh sách route, danh sách dependency đầy đủ: `PROJECT_STRUCTURE.md`
- Skills chi tiết: `.agents/skills/{clean-code,ux-ui,spec-writing,code-review,brainstorm}/SKILL.md`