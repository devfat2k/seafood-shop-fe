# Project Constitution — Seafood Shop Web (FE)

Các nguyên tắc này bất biến. Mọi plan/code phải tuân, kể cả khi mâu thuẫn với gợi ý mặc định của agent.

1. Type-safe tuyệt đối: không dùng `any`. Type API sinh từ `docs/specs/api-contract.md`.
2. Mọi màn hình có dữ liệu động phải có 3 trạng thái: loading (skeleton, không spinner), empty, error.
3. UI tuân `docs/specs/design-spec.md` — không đổi token màu, spacing theo bảng cứng.
4. Accessibility tối thiểu WCAG AA: alt cho ảnh, focus visible, tôn trọng prefers-reduced-motion.
5. Text hiển thị 100% tiếng Việt, giá định dạng `320.000₫`, không Lorem Ipsum.
6. Server state dùng TanStack Query; global UI state dùng Zustand. Không lẫn lộn.
7. Không commit secrets. Validate mọi input người dùng bằng Zod tại ranh giới.
