'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '@/libs/AdminApiClient';
import type { AdminUserItem } from '@/types/admin';
import type { ApiResponse, PageResponse } from '@/types/api';

export const adminUserKeys = {
  all: ['admin-users'] as const,
  list: (params: Record<string, unknown>) => ['admin-users', 'list', params] as const,
};

export function useAdminUsersQuery(
  params: {
    page?: number;
    size?: number;
    sort?: string;
  } = {},
) {
  return useQuery<PageResponse<AdminUserItem>>({
    queryKey: adminUserKeys.list(params),
    queryFn: async () => {
      const res = await adminApi.get<ApiResponse<PageResponse<AdminUserItem>>>('/admin/users', {
        params,
      });
      if (res.data?.success && res.data.data) {
        return res.data.data;
      }
      throw new Error(res.data?.message ?? 'Không thể tải danh sách người dùng');
    },
    staleTime: 30 * 1000,
  });
}

export function useToggleUserStatusMutation() {
  const queryClient = useQueryClient();
  return useMutation<undefined, Error, { id: number; isActive: boolean }>({
    mutationFn: async ({ id, isActive }) => {
      await adminApi.patch(`/admin/users/${id}/status`, undefined, {
        params: { isActive },
      });
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: adminUserKeys.all });
    },
  });
}
