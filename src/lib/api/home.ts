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
    console.error('Failed to fetch home page data:', error);
    return null;
  }
}
