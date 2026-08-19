'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '@/libs/AdminApiClient';
import type { RevenueByCategory, RevenueInMonth, TopBuyProduct } from '@/types/admin';
import type { ApiResponse } from '@/types/api';

export const adminDashboardKeys = {
  all: ['admin-dashboard'] as const,
  topBuy: (limit = 10) => ['admin-dashboard', 'top-buy', limit] as const,
  revenueByCategory: () => ['admin-dashboard', 'revenue-by-category'] as const,
  revenueInMonth: () => ['admin-dashboard', 'revenue-in-month'] as const,
};

export function useTopBuyProductsQuery(limit = 10) {
  return useQuery<TopBuyProduct[]>({
    queryKey: adminDashboardKeys.topBuy(limit),
    queryFn: async () => {
      const res = await adminApi.get<ApiResponse<TopBuyProduct[]>>(
        `/admin/products/top-buy?limit=${limit}`,
      );
      if (res.data?.success && res.data.data) {
        return res.data.data;
      }
      return [];
    },
    staleTime: 2 * 60 * 1000,
  });
}

export function useRevenueByCategoryQuery() {
  return useQuery<RevenueByCategory[]>({
    queryKey: adminDashboardKeys.revenueByCategory(),
    queryFn: async () => {
      const res = await adminApi.get<ApiResponse<RevenueByCategory[]>>(
        '/admin/products/revenue-by-category',
      );
      if (res.data?.success && res.data.data) {
        return res.data.data;
      }
      return [];
    },
    staleTime: 2 * 60 * 1000,
  });
}

export function useRevenueInMonthQuery() {
  return useQuery<RevenueInMonth[]>({
    queryKey: adminDashboardKeys.revenueInMonth(),
    queryFn: async () => {
      const res = await adminApi.get<ApiResponse<RevenueInMonth[]>>(
        '/admin/products/revenue-in-month',
      );
      if (res.data?.success && res.data.data) {
        return res.data.data;
      }
      return [];
    },
    staleTime: 2 * 60 * 1000,
  });
}

export function useEvictCacheMutation() {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<null>>({
    mutationFn: async () => {
      const res = await adminApi.post<ApiResponse<null>>('/admin/home/cache/evict');
      if (!res.data?.success) {
        throw new Error(res.data?.message || 'Xóa cache thất bại');
      }
      return res.data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: adminDashboardKeys.all });
    },
  });
}
