---
name: code-review
description: Tự review code trước khi báo hoàn thành task hoặc trước khi tạo PR. Dùng sau khi implement xong bất kỳ thay đổi code nào.
---

## Checklist bắt buộc trước khi báo "done"

1. **Correctness**: Code có làm đúng spec/yêu cầu không? Có case nào bị bỏ sót?
2. **Type safety**: Không còn `any`. `bun run check:types` pass.
3. **Lint**: `bun run lint` pass, không còn unused import/variable.
4. **Convention**: Đúng vị trí file theo cấu trúc thư mục, đúng pattern
   ApiClient/Env/`cn()`, đúng spacing scale (xem skill `ux-ui`).
5. **Độ dài & cấu trúc**: Không có function/component vượt giới hạn (xem skill
   `clean-code`). Không có logic trùng lặp có thể tách hook chung.
6. **3 state UI**: Nếu có fetch data — đủ Loading/Empty/Error.
7. **i18n**: Không có string tiếng Việt hardcode ngoài file locales.
8. **Không side-effect ngoài phạm vi**: Không sửa file không liên quan đến task,
   không đổi convention có sẵn mà không hỏi.

## Nếu phát hiện vi phạm ở bước tự review

Tự sửa ngay trước khi báo hoàn thành — không báo "done" rồi để user tự phát hiện lỗi.
