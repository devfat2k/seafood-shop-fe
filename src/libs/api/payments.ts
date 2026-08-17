import { api } from '@/libs/ApiClient';
import type { ApiResponse } from '@/types/api';

export type CreatePaymentUrlResponse = {
  paymentUrl: string;
};

export async function createPaymentUrl(
  orderId: number | string,
  bankCode?: string,
): Promise<ApiResponse<CreatePaymentUrlResponse>> {
  const url = bankCode
    ? `/payments/${orderId}/create?bankCode=${encodeURIComponent(bankCode)}`
    : `/payments/${orderId}/create`;
  const res = await api.post<ApiResponse<CreatePaymentUrlResponse>>(url);
  return res.data;
}
