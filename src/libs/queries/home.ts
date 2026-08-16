'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/libs/ApiClient';
import type { ApiResponse } from '@/types/api';
import type { HomePageData } from '@/types/home';

export const homeQueryKeys = {
  all: ['home'] as const,
};

async function fetchHomePageData(): Promise<HomePageData> {
  const res = await api.get<ApiResponse<HomePageData>>('/home');
  if (!res.data.success || !res.data.data) {
    throw new Error(res.data.message || 'Không thể tải dữ liệu trang chủ');
  }
  return res.data.data;
}

export function useHomeQuery(initialData?: HomePageData | null) {
  return useQuery<HomePageData>({
    queryKey: homeQueryKeys.all,
    queryFn: fetchHomePageData,
    initialData: initialData ?? undefined,
    staleTime: 60 * 1000, // 60s
    retry: 2,
  });
}
