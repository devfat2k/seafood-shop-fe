# GEMINI.md — Antigravity Hard Rules (Seafood Shop Web)

> File này có độ ưu tiên **cao nhất** trong Antigravity, áp dụng cho MỌI model chạy trong
> workspace này (Gemini, Claude Opus/Sonnet, ...). Nếu có xung đột với `AGENTS.md` hoặc
> bất kỳ rule nào khác trong `.agents/rules/`, file này luôn thắng.

## 1. Verification Loop — bắt buộc, không thương lượng

Sau **mọi** thay đổi code, trước khi báo "done" hoặc dừng task, PHẢI chạy tuần tự và
tự sửa lỗi cho tới khi pass:

```
bun run check:types
bun run lint
```

Nếu thay đổi liên quan tới logic/hook/util quan trọng: chạy thêm `bun run test`.
Không được báo hoàn thành task khi các lệnh trên còn lỗi. Không được tự ý "bỏ qua"
lỗi type bằng `// @ts-ignore` hoặc `any` để né lỗi — phải sửa gốc rễ hoặc dừng lại hỏi user.

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

## 7. Khi không chắc chắn

Nếu spec chưa rõ ràng (chưa có trong `docs/specs/`), hoặc convention chưa có trong
`docs/conventions/` — PHẢI dừng lại và hỏi user, KHÔNG được tự đoán rồi implement.
