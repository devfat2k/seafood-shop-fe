'use client';

import { useQuery } from '@tanstack/react-query';
import type { ProductListParams } from '@/lib/api/products';
import { getProduct, getProducts } from '@/lib/api/products';
import type { PageResponse, Product } from '@/types/api';

export const productQueryKeys = {
  all: ['products'] as const,
  list: (params: ProductListParams) => ['products', params] as const,
  detail: (id: number | string) => ['product', id] as const,
  related: (categoryId: number | string) => ['products', 'related', categoryId] as const,
};

export function useProductsQuery(
  params: ProductListParams = {},
  initialData?: PageResponse<Product>,
) {
  return useQuery<PageResponse<Product>>({
    queryKey: productQueryKeys.list(params),
    queryFn: async () => await getProducts(params),
    initialData: initialData ?? undefined,
    staleTime: 60 * 1000,
  });
}

export function useProductQuery(id: number | string, initialData?: Product) {
  return useQuery<Product>({
    queryKey: productQueryKeys.detail(id),
    queryFn: async () => await getProduct(id),
    initialData: initialData ?? undefined,
    enabled: Boolean(id),
    staleTime: 60 * 1000,
  });
}

export function useRelatedProductsQuery(categoryId?: number | null) {
  return useQuery<PageResponse<Product>>({
    queryKey: productQueryKeys.related(categoryId ?? 0),
    queryFn: async () => await getProducts({ categoryId: categoryId ?? undefined, size: 4 }),
    enabled: Boolean(categoryId),
    staleTime: 5 * 60 * 1000,
  });
}
