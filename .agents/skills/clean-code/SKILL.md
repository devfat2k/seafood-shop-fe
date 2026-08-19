---
name: clean-code
description: Nguyên tắc viết code sạch, ngắn gọn, dễ đọc cho dự án Next.js/React/TypeScript này. Dùng khi implement bất kỳ component, hook, hoặc function nào.
---

## Nguyên tắc bắt buộc

1. **Một component = một trách nhiệm.** Nếu component vừa fetch data, vừa xử lý form,
   vừa render UI phức tạp → tách thành: 1 hook (data/logic) + 1 component thuần render.
2. **Giới hạn độ dài:**
   - Function/hook: tối đa ~40 dòng thân hàm. Vượt quá → tách hàm con.
   - Component file: tối đa ~150 dòng. Vượt quá → tách sub-component.
3. **Đặt tên rõ nghĩa, không viết tắt mơ hồ.** `isLoadingOrders` chứ không phải `isLd`.
   Boolean luôn bắt đầu bằng `is/has/should/can`.
4. **Không nested ternary/condition quá 2 tầng trong JSX.** Logic hiển thị phức tạp →
   tách thành hàm `renderXxx()` hoặc component riêng.
5. **Không magic number/string.** Đưa vào constant có tên rõ nghĩa
   (vd: `const MAX_CART_ITEMS = 20`) thay vì số `20` rải rác trong code.
6. **Sớm return (early return), tránh else lồng nhau.**
7. **Custom hook cho mọi logic tái sử dụng ở >1 nơi** — không copy-paste logic giữa
   các component.
8. **Không để lại code chết:** không comment code cũ, không `console.log` khi hoàn
   tất, không import không dùng (khớp với `bun run check:deps` / knip).
9. **Không viết comment thừa/đánh số:** Cấm tuyệt đối chèn các comment đánh số thứ tự section trong JSX (`{/* 1. Hero */}`, `{/* 2. USP */}`) hoặc chú thích hiển nhiên lặp lại tên code (`{/* Image Container */}`). Code phải tự giải thích bằng tên component/biến rõ ràng.

## Trước khi báo "xong" một đoạn code, tự hỏi

- File này đọc lướt qua có hiểu ngay logic không, hay phải đọc 3 lần mới hiểu?
- Có đoạn nào trên 40 dòng nên tách ra không?
- Có logic nào lặp lại ở component khác không — nên đưa vào hook/util chung?
- Nếu xoá hết comment, code còn tự giải thích được không? (Nếu không → đặt tên lại
  thay vì thêm comment.)
