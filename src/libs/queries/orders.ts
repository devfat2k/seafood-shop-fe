'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { cancelOrder, getMyOrders, getOrderDetail } from '@/libs/api/orders';
import type { ApiResponse, PageResponse } from '@/types/api';
import type { OrderResponse } from '@/types/order';

export const orderQueryKeys = {
  all: ['orders'] as const,
  myOrders: (page = 0, size = 10) => ['orders', 'my-orders', { page, size }] as const,
  detail: (id: number | string) => ['orders', 'detail', id] as const,
};

export function useMyOrdersQuery(
  page = 0,
  size = 10,
  initialData?: PageResponse<OrderResponse> | null,
) {
  const hasToken = typeof window !== 'undefined' && Boolean(localStorage.getItem('accessToken'));

  return useQuery<PageResponse<OrderResponse> | null>({
    queryKey: orderQueryKeys.myOrders(page, size),
    queryFn: async () => await getMyOrders(page, size),
    enabled: hasToken,
    initialData,
    staleTime: 30 * 1000,
  });
}

export function useOrderDetailQuery(id: number | string, enabled = true) {
  const hasToken = typeof window !== 'undefined' && Boolean(localStorage.getItem('accessToken'));

  return useQuery<OrderResponse | null>({
    queryKey: orderQueryKeys.detail(id),
    queryFn: async () => await getOrderDetail(id),
    enabled: hasToken && enabled && Boolean(id),
    staleTime: 30 * 1000,
  });
}

export function useCancelOrderMutation() {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<null>, Error, number | string>({
    mutationFn: async (id: number | string) => {
      const res = await cancelOrder(id);
      if (!res.success) {
        throw new Error(res.message || 'Hủy đơn hàng thất bại');
      }
      return res;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: orderQueryKeys.all });
    },
  });
}
