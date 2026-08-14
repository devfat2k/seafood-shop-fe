---
name: brainstorm
description: Đưa ra 2-3 hướng giải pháp/UX khác nhau kèm ưu-nhược điểm khi feature có nhiều cách làm hợp lý, rồi dừng lại chờ user chọn. Dùng khi yêu cầu của user mơ hồ về mặt UX hoặc có nhiều cách implement.
---

## Khi nào dùng

- User yêu cầu 1 feature nhưng không nói rõ UX cụ thể (vd: "làm filter sản phẩm cho
  tôi" — filter dạng sidebar hay dropdown hay modal?).
- Có nhiều cách implement kỹ thuật hợp lý và trade-off khác nhau (vd: cache ở
  TanStack Query vs server component).

## Format output

```markdown
## Hướng A: {tên ngắn}
- Mô tả: ...
- Ưu điểm: ...
- Nhược điểm: ...

## Hướng B: {tên ngắn}
- Mô tả: ...
- Ưu điểm: ...
- Nhược điểm: ...

## Đề xuất
Mình nghiêng về hướng {X} vì {lý do}, nhưng bạn quyết định cuối cùng.
```

## Quy tắc

- Tối đa 3 hướng — nhiều hơn gây rối, không giúp quyết định nhanh hơn.
- Không tự chọn và implement luôn — PHẢI dừng lại chờ user chọn 1 trong các hướng.
- Nếu chỉ có 1 cách làm hợp lý rõ ràng (không có trade-off đáng kể) → không cần
  skill này, làm thẳng.
