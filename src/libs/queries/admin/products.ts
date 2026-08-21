'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '@/libs/AdminApiClient';
import type { CreateProductRequest, ProductComboConfig, UpdateProductRequest } from '@/types/admin';
import type { ApiResponse, PageResponse, Product } from '@/types/api';

export const adminProductKeys = {
  all: ['admin-products'] as const,
  list: (params: Record<string, unknown>) => ['admin-products', 'list', params] as const,
  detail: (id: number | string) => ['admin-products', 'detail', id] as const,
};

export function useAdminProductsQuery(
  params: {
    page?: number;
    size?: number;
    search?: string;
    categoryId?: number;
    productType?: string;
    sort?: string;
    direction?: 'asc' | 'desc';
  } = {},
) {
  return useQuery<PageResponse<Product>>({
    queryKey: adminProductKeys.list(params),
    queryFn: async () => {
      const res = await adminApi.get<ApiResponse<PageResponse<Product>>>('/products', { params });
      if (res.data?.success && res.data.data) {
        return res.data.data;
      }
      throw new Error(res.data?.message ?? 'Không thể tải danh sách sản phẩm');
    },
    staleTime: 30 * 1000,
  });
}

export function useCreateProductMutation() {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<Product>, Error, CreateProductRequest>({
    mutationFn: async (data) => {
      const res = await adminApi.post<ApiResponse<Product>>('/admin/products', data);
      if (!res.data?.success) {
        throw new Error(res.data?.message ?? 'Tạo sản phẩm thất bại');
      }
      return res.data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: adminProductKeys.all });
      void queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}

export function useUpdateProductMutation() {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<Product>, Error, { id: number; data: UpdateProductRequest }>({
    mutationFn: async ({ id, data }) => {
      const res = await adminApi.patch<ApiResponse<Product>>(`/admin/products/${id}`, data);
      if (!res.data?.success) {
        throw new Error(res.data?.message ?? 'Cập nhật sản phẩm thất bại');
      }
      return res.data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: adminProductKeys.all });
      void queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}

export function useDeleteProductMutation() {
  const queryClient = useQueryClient();
  return useMutation<undefined, Error, number>({
    mutationFn: async (id) => {
      await adminApi.delete(`/admin/products/${id}`);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: adminProductKeys.all });
      void queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}

export function useAdjustStockMutation() {
  const queryClient = useQueryClient();
  return useMutation<
    undefined,
    Error,
    { id: number; quantity: number; type: 'increase' | 'decrease' }
  >({
    mutationFn: async ({ id, quantity, type }) => {
      await adminApi.patch(`/admin/products/${type}/${id}`, undefined, {
        params: { quantity },
      });
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: adminProductKeys.all });
      void queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}

export function useUploadProductImageMutation() {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<Product>, Error, { id: number; file: File }>({
    mutationFn: async ({ id, file }) => {
      const formData = new FormData();
      formData.append('file', file);
      const res = await adminApi.post<ApiResponse<Product>>(
        `/admin/products/${id}/image`,
        formData,
      );
      if (!res.data?.success) {
        throw new Error(res.data?.message ?? 'Upload ảnh thất bại');
      }
      return res.data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: adminProductKeys.all });
      void queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}

export function useToggleFeaturedMutation() {
  const queryClient = useQueryClient();
  return useMutation<undefined, Error, number>({
    mutationFn: async (id) => {
      await adminApi.patch(`/admin/products/${id}/featured`);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: adminProductKeys.all });
      void queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}

export function useComboConfigMutation() {
  const queryClient = useQueryClient();
  return useMutation<undefined, Error, { id: number; data: ProductComboConfig }>({
    mutationFn: async ({ id, data }) => {
      await adminApi.patch(`/admin/products/${id}/combo-config`, data);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: adminProductKeys.all });
      void queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}
