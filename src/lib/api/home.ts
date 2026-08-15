import type { HomePageData } from '@/types/home';
import { api } from '../ApiClient';

export async function getHomePageData(): Promise<HomePageData | null> {
  try {
    const res = await api.get<{ success: boolean; data: HomePageData }>('/home');
    if (res.data?.success && res.data?.data) {
      return res.data.data;
    }
    return null;
  } catch (error) {
    console.error('Failed to fetch home page data:', error);
    return null;
  }
}
