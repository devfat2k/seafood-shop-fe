import { z } from 'zod';

export const createVnpayUrlSchema = z.object({
  orderId: z.number(),
  bankCode: z.string().nullable().optional(),
});

export type CreateVnpayUrlRequest = z.infer<typeof createVnpayUrlSchema>;

export type PaymentMethod = 'COD' | 'VNPAY' | 'MOMO' | 'ZALOPAY';
