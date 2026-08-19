# GEMINI.md — Antigravity Hard Rules (Seafood Shop Web)

> File này có độ ưu tiên **cao nhất** trong Antigravity, áp dụng cho MỌI model chạy trong
> workspace này (Gemini, Claude Opus/Sonnet, ...). Nếu có xung đột với `AGENTS.md` hoặc
> bất kỳ rule nào khác trong `.agents/rules/`, file này luôn thắng.

## 1. Verification Loop & Quy trình bắt buộc khi hoàn thành task — không thương lượng

Trước khi báo hoàn thành ("done") bất kỳ task nào hoặc dừng công việc, PHẢI kiểm tra và đáp ứng đầy đủ các điều kiện bắt buộc sau:

1. **Type Checking (Bắt buộc 100%)**:
   - Chạy `bun run check:types` — phải đạt **0 lỗi TypeScript**.
   - Cấm tuyệt đối việc dùng `// @ts-ignore`, `// @ts-nocheck`, hoặc gán ép kiểu `any` để né lỗi type.

2. **Linting & Code Formatting**:
   - Chạy `bun run lint` — khắc phục các lỗi linting và đảm bảo không có warning/error nghiêm trọng vỡ build.

3. **Automated Unit Testing**:
   - Nếu thay đổi liên quan tới logic/hook/util/validation: chạy `bun run test` và đảm bảo toàn bộ test suite pass.

4. **Kiểm tra 3 Trạng thái UI (cho màn hình/component động)**:
   - Đã xử lý đủ 3 trạng thái: **Loading** (Skeleton đúng khung hình), **Empty** (Message tiếng Việt + icon), và **Error** (Message lỗi + nút Thử lại).

5. **Đối chiếu Checklist Pre-merge**:
   - Tuân thủ các mục trong `.agents/checklists/pre-merge.md` (Design tokens, i18n tiếng Việt qua `next-intl`, định dạng tiền tệ `xxx.xxx₫`).

## 2. Kiến trúc bất biến (không được vi phạm)

- Mọi API call phải đi qua `src/libs/ApiClient.ts`. Không tạo `fetch()`/`axios()` rời rạc
  trong component.
- Response luôn theo shape `ApiResponse<T>` / `PageResponse<T>` (0-indexed). Không tự chế
  response shape khác.
- Biến môi trường chỉ đọc qua `src/libs/Env.ts`. Không dùng `process.env.X` trực tiếp
  trong component/page.
- Component UI dùng lại từ `src/components/ui/` (shadcn). Không viết lại button/input/
  card/dialog từ đầu bằng div + Tailwind thô — kiểm tra trước khi tạo mới.
- Data fetching qua TanStack Query, không fetch thủ công bằng `useEffect` + `useState`.

## 3. Spacing & Design Tokens

- Chỉ dùng spacing scale: `4, 8, 12, 16, 24, 32, 48, 64, 96px`. Cấm arbitrary value kiểu
  `w-[123px]`, `mt-[17px]` — trừ khi có comment giải thích lý do kỹ thuật bắt buộc.
- Màu sắc chỉ lấy từ token định nghĩa trong `src/styles/global.css`. Không hardcode mã
  hex trong component.

## 4. Nội dung & định dạng dữ liệu

- Toàn bộ text hiển thị: tiếng Việt, qua `next-intl` (file trong `src/locales/`).
  Không hardcode chuỗi tiếng Việt trực tiếp trong JSX.
- Định dạng tiền tệ: `xxx.xxx₫` (dấu chấm ngăn hàng nghìn, ký hiệu ₫ liền sau, không
  khoảng trắng). Ví dụ đúng: `320.000₫`.

## 5. 3 trạng thái bắt buộc cho mọi màn hình động

Mọi component/page fetch dữ liệu động PHẢI xử lý đủ 3 state:

- **Loading** — Skeleton đúng hình dạng nội dung thật, không dùng spinner tròn chung
  chung cho cả khối.
- **Empty** — có message tiếng Việt + icon/illustration, không để trắng trơn.
- **Error** — có message rõ nguyên nhân (nếu biết) + nút "Thử lại" nếu retry hợp lý.

Thiếu 1 trong 3 = task chưa hoàn thành.

## 6. Giới hạn độ dài & phân rã code

- Component file không vượt quá ~150 dòng (không tính import/type). Vượt quá → bắt buộc
  tách sub-component hoặc custom hook trước khi coi task hoàn tất.
- Không viết business logic trực tiếp trong JSX return — tách ra hàm riêng hoặc hook
  (`useXxx`).
- Không dùng `any`. Type phức tạp chưa rõ → dùng `unknown` + narrow, hoặc hỏi lại user
  thay vì đoán.

## 7. Cấm tuyệt đối chú thích thừa thãi & đánh số section JSX (No Noise Comments)

- **CẤM TUYỆT ĐỐI** việc chèn các comment đánh số thứ tự hoặc chú thích hiển nhiên trong JSX/code (Ví dụ: `{/* 1. Hero Section */}`, `{/* 2. USP Section */}`, `{/* Image Container */}`, `{/* Price & CTA */}`, `// handle submit`, `// function to fetch data`...).
- Code PHẢI tự giải thích (Self-documenting) thông qua việc đặt tên component, biến, hàm tường minh và cấu trúc thư mục rõ ràng.
- Chỉ cho phép comment khi giải thích **lý do kỹ thuật phức tạp (Why, not What)** hoặc ghi chú workaround bắt buộc không thể tránh khỏi.

## 8. Khi không chắc chắn

Nếu spec chưa rõ ràng (chưa có trong `docs/specs/`), hoặc convention chưa có trong
`docs/conventions/` — PHẢI dừng lại và hỏi user, KHÔNG được tự đoán rồi implement.
