---
name: api-integration
description: Use when calling the backend REST API — fetching products/categories/orders, auth/OTP flow, or any endpoint under /api/v1. Handles ApiResponse/PageResponse unwrapping, the 401 → refresh-token flow, Zod validation, and error mapping.
---

# API integration — Seafood backend

## Nguồn sự thật
Đọc `docs/specs/api-contract.md` cho danh sách endpoint, phân quyền, và format.

## Quy tắc bắt buộc
1. Gọi API qua instance `src/libs/ApiClient.ts`. KHÔNG tạo axios instance mới, KHÔNG dùng fetch trực tiếp cho API backend.
2. Mọi response backend bọc `ApiResponse<T>` — luôn lấy dữ liệu ở `res.data.data`. API list trả `PageResponse<T>` với `page` 0-indexed.
3. Validate response bằng Zod schema (`src/types/api.ts`) trước khi dùng. Dùng `.safeParse`, không `as`.
4. Query key TanStack theo quy ước: `['products', { page, size, sort }]`, `['product', id]`, `['orders', userId]`.
5. Mutation (tạo đơn, đổi profile) dùng `useMutation` + `invalidateQueries` để làm mới cache.

## Xử lý lỗi (map theo mã HTTP)
- 401 AccountNotVerified → điều hướng màn OTP.
- 400 OtpInvalid/OtpExpired → hiện lỗi inline, cho resend (cooldown 60s).
- 409 InsufficientStock → cảnh báo tồn kho.
- Token hết hạn (401 thường) → interceptor tự refresh, không cần xử lý ở component.

## File mẫu canonical
Xem `src/libs/ApiClient.ts`, `src/libs/queries/products.ts`, `src/types/api.ts`.
