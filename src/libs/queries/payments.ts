'use client';

import { useMutation } from '@tanstack/react-query';
import { createPaymentUrl } from '@/libs/api/payments';
import type { CreatePaymentUrlResponse } from '@/libs/api/payments';
import type { ApiResponse } from '@/types/api';

export function useCreatePaymentUrlMutation() {
  return useMutation<
    ApiResponse<CreatePaymentUrlResponse>,
    Error,
    { orderId: number | string; bankCode?: string }
  >({
    mutationFn: async ({ orderId, bankCode }) => {
      const res = await createPaymentUrl(orderId, bankCode);
      if (!res.success || !res.data?.paymentUrl) {
        throw new Error(res.message || 'Không thể tạo liên kết thanh toán VNPay');
      }
      return res;
    },
  });
}
