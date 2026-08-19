'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '@/libs/AdminApiClient';
import type {
  CreateBannerRequest,
  CreateDailyArrivalRequest,
  DailyArrival,
  HeroBanner,
  UpdateBannerRequest,
  UpdateDailyArrivalRequest,
} from '@/types/admin';
import type { ApiResponse } from '@/types/api';

// ─── Hero Banners ──────────────────────────────────────────
export const adminBannerKeys = {
  all: ['admin-banners'] as const,
  list: () => ['admin-banners', 'list'] as const,
};

export function useAdminBannersQuery() {
  return useQuery<HeroBanner[]>({
    queryKey: adminBannerKeys.list(),
    queryFn: async () => {
      const res = await adminApi.get<ApiResponse<HeroBanner[]>>('/admin/hero-banners');
      if (res.data?.success && res.data.data) {
        return res.data.data;
      }
      return [];
    },
    staleTime: 60 * 1000,
  });
}

export function useCreateBannerMutation() {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<HeroBanner>, Error, CreateBannerRequest>({
    mutationFn: async (data) => {
      const res = await adminApi.post<ApiResponse<HeroBanner>>('/admin/hero-banners', data);
      if (!res.data?.success) {
        throw new Error(res.data?.message ?? 'Tạo banner thất bại');
      }
      return res.data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: adminBannerKeys.all });
    },
  });
}

export function useUpdateBannerMutation() {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<HeroBanner>, Error, { id: number; data: UpdateBannerRequest }>({
    mutationFn: async ({ id, data }) => {
      const res = await adminApi.patch<ApiResponse<HeroBanner>>(`/admin/hero-banners/${id}`, data);
      if (!res.data?.success) {
        throw new Error(res.data?.message ?? 'Cập nhật banner thất bại');
      }
      return res.data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: adminBannerKeys.all });
    },
  });
}

export function useToggleBannerMutation() {
  const queryClient = useQueryClient();
  return useMutation<undefined, Error, number>({
    mutationFn: async (id) => {
      await adminApi.patch(`/admin/hero-banners/${id}/toggle`);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: adminBannerKeys.all });
    },
  });
}

export function useUploadBannerImageMutation() {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<HeroBanner>, Error, { id: number; file: File }>({
    mutationFn: async ({ id, file }) => {
      const formData = new FormData();
      formData.append('file', file);
      const res = await adminApi.post<ApiResponse<HeroBanner>>(
        `/admin/hero-banners/${id}/image`,
        formData,
      );
      if (!res.data?.success) {
        throw new Error(res.data?.message ?? 'Upload ảnh banner thất bại');
      }
      return res.data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: adminBannerKeys.all });
    },
  });
}

export function useDeleteBannerMutation() {
  const queryClient = useQueryClient();
  return useMutation<undefined, Error, number>({
    mutationFn: async (id) => {
      await adminApi.delete(`/admin/hero-banners/${id}`);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: adminBannerKeys.all });
    },
  });
}

// ─── Daily Arrivals ────────────────────────────────────────
export const adminDailyArrivalKeys = {
  all: ['admin-daily-arrivals'] as const,
  list: (date: string) => ['admin-daily-arrivals', 'list', date] as const,
};

export function useAdminDailyArrivalsQuery(date: string) {
  return useQuery<DailyArrival[]>({
    queryKey: adminDailyArrivalKeys.list(date),
    queryFn: async () => {
      const res = await adminApi.get<ApiResponse<DailyArrival[]>>('/admin/daily-arrivals', {
        params: { date },
      });
      if (res.data?.success && res.data.data) {
        return res.data.data;
      }
      return [];
    },
    enabled: Boolean(date),
    staleTime: 60 * 1000,
  });
}

export function useCreateDailyArrivalMutation() {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<DailyArrival>, Error, CreateDailyArrivalRequest>({
    mutationFn: async (data) => {
      const res = await adminApi.post<ApiResponse<DailyArrival>>('/admin/daily-arrivals', data);
      if (!res.data?.success) {
        throw new Error(res.data?.message ?? 'Thêm cập bến thất bại');
      }
      return res.data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: adminDailyArrivalKeys.all });
    },
  });
}

export function useUpdateDailyArrivalMutation() {
  const queryClient = useQueryClient();
  return useMutation<
    ApiResponse<DailyArrival>,
    Error,
    { id: number; data: UpdateDailyArrivalRequest }
  >({
    mutationFn: async ({ id, data }) => {
      const res = await adminApi.patch<ApiResponse<DailyArrival>>(
        `/admin/daily-arrivals/${id}`,
        data,
      );
      if (!res.data?.success) {
        throw new Error(res.data?.message ?? 'Cập nhật cập bến thất bại');
      }
      return res.data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: adminDailyArrivalKeys.all });
    },
  });
}

export function useDeleteDailyArrivalMutation() {
  const queryClient = useQueryClient();
  return useMutation<undefined, Error, number>({
    mutationFn: async (id) => {
      await adminApi.delete(`/admin/daily-arrivals/${id}`);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: adminDailyArrivalKeys.all });
    },
  });
}
