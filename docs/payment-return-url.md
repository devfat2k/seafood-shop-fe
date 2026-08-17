# Payment Return URL — Seafood Shop FE

> Tài liệu này mô tả URL mà **Backend cần cấu hình làm `return_url`** khi tích hợp cổng thanh toán (VNPAY, MOMO, ZaloPay...).  
> FE sẽ nhận redirect từ cổng thanh toán về URL này và hiển thị kết quả giao dịch cho người dùng.

---

## Return URL

| Môi trường | URL |
|---|---|
| **Local (dev)** | `http://localhost:3000/en/payment-result` |
| **Staging / Production** | `{NEXT_PUBLIC_APP_URL}/en/payment-result` |

> **Lưu ý:** App dùng `next-intl`, route có prefix locale (`/en/`, `/vi/`).  
> Dùng `/en/payment-result` làm mặc định — Next.js sẽ resolve đúng.

---

## Query Params BE phải append khi redirect về

Sau khi cổng thanh toán callback về BE, BE **redirect sang FE** kèm các query params sau:

```
{RETURN_URL}?orderId={orderId}&status={success|failed}&paymentId={transactionId}&paymentMethod={METHOD}
```

### Ví dụ thực tế

```
https://seafood-shop.vn/en/payment-result?orderId=123&status=success&paymentId=14052609&paymentMethod=VNPAY
```

```
https://seafood-shop.vn/en/payment-result?orderId=123&status=failed&paymentMethod=VNPAY
```

---

## Mô tả từng Query Param

| Param | Kiểu | Bắt buộc | Mô tả |
|---|---|---|---|
| `orderId` | `string \| number` | ✅ | ID đơn hàng trong hệ thống |
| `status` | `"success" \| "failed"` | ✅ | Kết quả giao dịch |
| `paymentId` | `string` | ❌ | Mã giao dịch từ cổng thanh toán (VD: `vnp_TransactionNo`) |
| `paymentMethod` | `"VNPAY" \| "MOMO" \| "ZALOPAY" \| "COD"` | ❌ | Phương thức thanh toán |

---

## Logic FE xử lý sau khi nhận redirect

1. Đọc `status` từ query params → hiển thị màn hình **Thành Công** hoặc **Thất Bại**.
2. Dùng `orderId` để gọi API lấy chi tiết đơn hàng (`GET /orders/{orderId}`).
3. Hiển thị mã đơn, tổng tiền, phương thức thanh toán, mã giao dịch.

---

## Liên quan

- Page nhận kết quả: `src/app/[locale]/(marketing)/payment-result/page.tsx`
- API tạo payment URL: `src/libs/api/payments.ts`
- Query hook: `src/libs/queries/payments.ts`
