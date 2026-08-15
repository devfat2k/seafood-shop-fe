import type { ApiResponse } from '@/types/api';
import type { CreateVnpayUrlRequest } from '@/types/payment';
import { api } from '../ApiClient';

export async function createVnpayUrl(data: CreateVnpayUrlRequest): Promise<ApiResponse<string>> {
  const res = await api.post<ApiResponse<string>>('/payments/create-vnpay-url', data);
  return res.data;
}
