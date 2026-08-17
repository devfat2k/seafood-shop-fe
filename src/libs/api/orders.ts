import { api } from '@/libs/ApiClient';
import type { ApiResponse, PageResponse } from '@/types/api';
import type { CreateOrderRequest, OrderResponse } from '@/types/order';

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
    return res.data?.data ?? null;
  } catch (error) {
    console.error('Failed to fetch my orders:', error);
    return null;
  }
}

export async function getOrderDetail(id: number | string): Promise<OrderResponse | null> {
  try {
    const res = await api.get<ApiResponse<OrderResponse>>(`/orders/${id}`);
    return res.data?.data ?? null;
  } catch (error) {
    console.error('Failed to fetch order detail:', error);
    return null;
  }
}

export async function getMyOrdersByStatus(
  userId: number | string,
  status: string,
  page = 0,
  size = 10,
): Promise<PageResponse<OrderResponse> | null> {
  try {
    const res = await api.get<ApiResponse<PageResponse<OrderResponse>>>(
      `/orders/me/${userId}?status=${status}&page=${page}&size=${size}`,
    );
    return res.data?.data ?? null;
  } catch (error) {
    console.error('Failed to fetch orders by status:', error);
    return null;
  }
}

export async function cancelOrder(id: number | string): Promise<ApiResponse<null>> {
  const res = await api.post<ApiResponse<null>>(`/orders/${id}/cancel-order`);
  return res.data;
}
