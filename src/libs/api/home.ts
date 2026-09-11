import { api } from '@/libs/ApiClient';
import type { ApiResponse } from '@/types/api';
import type { HomePageData } from '@/types/home';

export async function getHomePageData(): Promise<HomePageData | null> {
  try {
    const res = await api.get<ApiResponse<HomePageData>>('/home');
    if (res.data?.success && res.data?.data) {
      return res.data.data;
    }
    return null;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(
        '[Home API] Backend unavailable during SSR, fallback to client:',
        error instanceof Error ? error.message : String(error),
      );
    }
    return null;
  }
}
