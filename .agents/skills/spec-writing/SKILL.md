---
name: spec-writing
description: Viết technical spec ngắn gọn trước khi implement feature mới, sau đó dừng lại chờ user duyệt. Dùng khi user yêu cầu 1 feature/màn hình mới chưa có spec trong docs/specs/.
---

## Mục tiêu

Biến yêu cầu thô của user thành spec rõ ràng, rồi **dừng lại chờ duyệt** — không tự
implement ngay sau khi viết spec.

## Format spec (lưu vào `docs/specs/{ten-feature}.md`)

```markdown
# Spec: {Tên feature}

## 1. Mục tiêu
Feature này giải quyết vấn đề gì cho người dùng?

## 2. User flow
Các bước người dùng thực hiện, theo thứ tự.

## 3. API liên quan
- Endpoint dùng (nếu đã có trong API_DOCUMENTATION.md)
- Nếu endpoint CHƯA tồn tại → ghi rõ "cần backend bổ sung", không tự bịa response shape.

## 4. UI states
Liệt kê rõ Loading / Empty / Error / Success cho từng phần UI.

## 5. Edge cases
Các trường hợp biên cần xử lý (vd: hết hàng, hết session, mạng lỗi giữa chừng...)

## 6. Ngoài phạm vi (Out of scope)
Những gì KHÔNG làm trong lần này, tránh scope creep.
```

## Quy tắc

- Không implement code khi chưa có spec được duyệt cho feature có độ phức tạp trung
  bình trở lên (>1 component, có gọi API, hoặc có form).
- Feature nhỏ (sửa text, đổi màu, fix bug 1 dòng) → không cần spec, làm thẳng.
- Sau khi viết spec, hỏi user: "Bạn duyệt spec này chưa, hay cần chỉnh gì không?"
  và dừng lại chờ phản hồi.
