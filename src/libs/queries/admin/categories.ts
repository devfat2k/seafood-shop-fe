'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '@/libs/AdminApiClient';
import type {
  CategoryHomeConfig,
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from '@/types/admin';
import type { ApiResponse, Category } from '@/types/api';

export const adminCategoryKeys = {
  all: ['admin-categories'] as const,
  list: () => ['admin-categories', 'list'] as const,
};

export function useAdminCategoriesQuery() {
  return useQuery<Category[]>({
    queryKey: adminCategoryKeys.list(),
    queryFn: async () => {
      const res = await adminApi.get<ApiResponse<Category[]>>('/categories');
      if (res.data?.success && res.data.data) {
        return res.data.data;
      }
      return [];
    },
    staleTime: 60 * 1000,
  });
}

export function useCreateCategoryMutation() {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<Category>, Error, CreateCategoryRequest>({
    mutationFn: async (data) => {
      const res = await adminApi.post<ApiResponse<Category>>('/admin/categories', data);
      if (!res.data?.success) {
        throw new Error(res.data?.message ?? 'Tạo danh mục thất bại');
      }
      return res.data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: adminCategoryKeys.all });
    },
  });
}

export function useUpdateCategoryMutation() {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<Category>, Error, { id: number; data: UpdateCategoryRequest }>({
    mutationFn: async ({ id, data }) => {
      const res = await adminApi.put<ApiResponse<Category>>(`/admin/categories/${id}`, data);
      if (!res.data?.success) {
        throw new Error(res.data?.message ?? 'Cập nhật danh mục thất bại');
      }
      return res.data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: adminCategoryKeys.all });
    },
  });
}

export function useDeleteCategoryMutation() {
  const queryClient = useQueryClient();
  return useMutation<undefined, Error, number>({
    mutationFn: async (id) => {
      await adminApi.delete(`/admin/categories/${id}`);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: adminCategoryKeys.all });
    },
  });
}

export function useUploadCategoryImageMutation() {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<Category>, Error, { id: number; file: File }>({
    mutationFn: async ({ id, file }) => {
      const formData = new FormData();
      formData.append('file', file);
      const res = await adminApi.post<ApiResponse<Category>>(
        `/admin/categories/${id}/image`,
        formData,
      );
      if (!res.data?.success) {
        throw new Error(res.data?.message ?? 'Upload ảnh danh mục thất bại');
      }
      return res.data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: adminCategoryKeys.all });
    },
  });
}

export function useCategoryHomeConfigMutation() {
  const queryClient = useQueryClient();
  return useMutation<undefined, Error, { id: number; data: CategoryHomeConfig }>({
    mutationFn: async ({ id, data }) => {
      await adminApi.patch(`/admin/categories/${id}/home-config`, data);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: adminCategoryKeys.all });
    },
  });
}
