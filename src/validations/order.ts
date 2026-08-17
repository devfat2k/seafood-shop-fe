import { z } from 'zod';

export const checkoutFormSchema = z.object({
  paymentMethod: z.enum(['COD', 'VNPAY', 'MOMO', 'ZALOPAY'], {
    message: 'Vui lòng chọn phương thức thanh toán',
  }),
  note: z.string().max(500, 'Ghi chú không được vượt quá 500 ký tự').optional().or(z.literal('')),
  items: z
    .array(
      z.object({
        productId: z.number().min(1, 'Mã sản phẩm không hợp lệ'),
        quantity: z.number().min(1, 'Số lượng phải lớn hơn 0'),
      }),
    )
    .min(1, 'Giỏ hàng của bạn đang trống'),
});

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;
