'use client';

import { useQuery } from '@tanstack/react-query';
import { getCategories, getCategory } from '@/libs/api/categories';
import type { Category } from '@/types/api';

export const categoryQueryKeys = {
  all: ['categories'] as const,
  detail: (id: number | string) => ['categories', id] as const,
};

export function useCategoriesQuery(initialData?: Category[]) {
  return useQuery<Category[]>({
    queryKey: categoryQueryKeys.all,
    queryFn: async () => await getCategories(),
    initialData: initialData ?? undefined,
    staleTime: 5 * 60 * 1000,
  });
}

export function useCategoryQuery(id: number | string, initialData?: Category) {
  return useQuery<Category>({
    queryKey: categoryQueryKeys.detail(id),
    queryFn: async () => await getCategory(id),
    initialData: initialData ?? undefined,
    enabled: Boolean(id),
    staleTime: 5 * 60 * 1000,
  });
}
