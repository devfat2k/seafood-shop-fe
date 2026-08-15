import type { ApiResponse, PageResponse } from '@/types/api';
import type { CreateOrderRequest, OrderResponse } from '@/types/order';
import { api } from '../ApiClient';

export async function createOrder(data: CreateOrderRequest): Promise<ApiResponse<OrderResponse>> {
  const res = await api.post<ApiResponse<OrderResponse>>('/orders', data);
  return res.data;
}

export async function getMyOrders(
  page = 0,
  size = 10,
): Promise<PageResponse<OrderResponse> | null> {
  try {
    const res = await api.get<ApiResponse<PageResponse<OrderResponse>>>(
      `/orders/my-orders?page=${page}&size=${size}`,
    );
    return res.data.data;
  } catch (error) {
    console.error('Failed to fetch my orders:', error);
    return null;
  }
}

export async function cancelOrder(id: number, reason?: string): Promise<ApiResponse<null>> {
  const res = await api.patch<ApiResponse<null>>(`/orders/${id}/cancel`, { reason });
  return res.data;
}
