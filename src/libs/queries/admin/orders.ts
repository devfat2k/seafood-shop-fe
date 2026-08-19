'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '@/libs/AdminApiClient';
import type { AdminOrderStatus, UpdateOrderStatusRequest } from '@/types/admin';
import type { ApiResponse, PageResponse } from '@/types/api';
import type { OrderResponse } from '@/types/order';

export const adminOrderKeys = {
  all: ['admin-orders'] as const,
  list: (params: Record<string, unknown>) => ['admin-orders', 'list', params] as const,
  byUser: (userId: number | string, params: Record<string, unknown>) =>
    ['admin-orders', 'user', userId, params] as const,
};

export function useAdminOrdersQuery(
  params: {
    page?: number;
    size?: number;
    sort?: string;
    status?: AdminOrderStatus;
  } = {},
) {
  return useQuery<PageResponse<OrderResponse>>({
    queryKey: adminOrderKeys.list(params),
    queryFn: async () => {
      const res = await adminApi.get<ApiResponse<PageResponse<OrderResponse>>>('/admin/orders', {
        params,
      });
      if (res.data?.success && res.data.data) {
        return res.data.data;
      }
      throw new Error(res.data?.message ?? 'Không thể tải danh sách đơn hàng');
    },
    staleTime: 30 * 1000,
  });
}

export function useAdminOrdersByUserQuery(
  userId: number | string,
  params: { status?: AdminOrderStatus; page?: number; size?: number } = {},
) {
  return useQuery<PageResponse<OrderResponse>>({
    queryKey: adminOrderKeys.byUser(userId, params),
    queryFn: async () => {
      const res = await adminApi.get<ApiResponse<PageResponse<OrderResponse>>>(
        `/admin/orders/${userId}`,
        { params },
      );
      if (res.data?.success && res.data.data) {
        return res.data.data;
      }
      throw new Error(res.data?.message ?? 'Không thể tải đơn hàng của người dùng');
    },
    enabled: Boolean(userId),
    staleTime: 30 * 1000,
  });
}

export function useUpdateOrderStatusMutation() {
  const queryClient = useQueryClient();
  return useMutation<
    ApiResponse<OrderResponse>,
    Error,
    { id: number; data: UpdateOrderStatusRequest }
  >({
    mutationFn: async ({ id, data }) => {
      const res = await adminApi.patch<ApiResponse<OrderResponse>>(
        `/admin/orders/${id}/update-status`,
        data,
      );
      if (!res.data?.success) {
        throw new Error(res.data?.message ?? 'Cập nhật trạng thái đơn hàng thất bại');
      }
      return res.data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: adminOrderKeys.all });
    },
  });
}
