import { api } from '@/libs/ApiClient';
import type { ApiResponse, PageResponse } from '@/types/api';
import { normalizeOrder, normalizeOrderPage } from '@/types/order';
import type { CreateOrderRequest, OrderResponse } from '@/types/order';

export async function createOrder(data: CreateOrderRequest): Promise<ApiResponse<OrderResponse>> {
  const res = await api.post<ApiResponse<OrderResponse>>('/orders', data);
  if (res.data?.data) {
    return {
      ...res.data,
      data: normalizeOrder(res.data.data),
    };
  }
  return res.data;
}

export async function getMyOrders(
  page = 0,
  size = 10,
): Promise<PageResponse<OrderResponse> | null> {
  const token = typeof window === 'undefined' ? null : localStorage.getItem('accessToken');
  if (!token) {
    return null;
  }
  try {
    const res = await api.get<ApiResponse<PageResponse<unknown>>>(
      `/orders/my-orders?page=${page}&size=${size}`,
    );
    return normalizeOrderPage(res.data?.data ?? null);
  } catch (error) {
    console.error('Failed to fetch my orders:', error);
    return null;
  }
}

export async function getOrderDetail(id: number | string): Promise<OrderResponse | null> {
  const token = typeof window === 'undefined' ? null : localStorage.getItem('accessToken');
  if (!token) {
    return null;
  }
  try {
    const res = await api.get<ApiResponse<unknown>>(`/orders/${id}`);
    return res.data?.data ? normalizeOrder(res.data.data) : null;
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
  const token = typeof window === 'undefined' ? null : localStorage.getItem('accessToken');
  if (!token) {
    return null;
  }
  try {
    const res = await api.get<ApiResponse<PageResponse<unknown>>>(
      `/orders/me/${userId}?status=${status}&page=${page}&size=${size}`,
    );
    return normalizeOrderPage(res.data?.data ?? null);
  } catch (error) {
    console.error('Failed to fetch orders by status:', error);
    return null;
  }
}

export async function cancelOrder(id: number | string): Promise<ApiResponse<null>> {
  const res = await api.post<ApiResponse<null>>(`/orders/${id}/cancel-order`);
  return res.data;
}
