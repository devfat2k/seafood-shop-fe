---
name: testing
description: Use when writing or expanding tests. Vitest for unit/integration, Playwright for E2E user flows. Enforces house style — test behavior via user flows, assertive test names, minimal mocking.
---

# Testing conventions

## Chọn framework
- Vitest: unit + integration (logic, hooks, component render).
- Playwright: E2E theo user flow thật (thêm giỏ → checkout → kết quả).
- Không thêm Jest.

## Style
- Tên test dạng khẳng định: "hiển thị empty state khi giỏ trống", không "test cart".
- Test hành vi người dùng thấy, không test chi tiết cài đặt nội bộ.
- Mock tối thiểu: mock network (API) ở integration; không mock logic của chính mình.
- Mỗi file nguồn có file test tương ứng dưới `tests/`.

## TDD cho logic nhạy cảm
Với checkout, thanh toán, OTP: viết test TRƯỚC, chạy xác nhận FAIL, rồi mới code cho pass. Không sửa test để code pass.

## Bắt buộc kiểm cho mỗi màn hình
- Render đủ 4 trạng thái: loading / empty / error / success.
- E2E ít nhất 1 happy path cho flow chính.
