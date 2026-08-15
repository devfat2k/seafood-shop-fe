import axios, { create } from 'axios';
import type { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { Env } from '@/libs/Env';

const BASE_URL = Env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8085';

export const api: AxiosInstance = create({
  baseURL: `${BASE_URL}/api/v1`,
  headers: { 'Content-Type': 'application/json' },
});

// --- Token helpers (đổi sang cookie an toàn khi lên prod) ---
const getAccessToken = () =>
  typeof window === 'undefined' ? null : localStorage.getItem('accessToken');
const getRefreshToken = () =>
  typeof window === 'undefined' ? null : localStorage.getItem('refreshToken');
const setTokens = (a: string, r: string) => {
  localStorage.setItem('accessToken', a);
  localStorage.setItem('refreshToken', r);
};
const clearTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

// --- Request: gắn token (KHÔNG ghi đè cả headers) ---
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// --- Hàng đợi khi refresh: chỉ gọi refresh 1 lần ---
let isRefreshing = false;
let queue: ((token: string | null) => void)[] = [];
const flushQueue = (token: string | null) => {
  for (const cb of queue) {
    // eslint-disable-next-line promise/prefer-await-to-callbacks
    cb(token);
  }
  queue = [];
};

const retriedRequests = new WeakSet<InternalAxiosRequestConfig>();

api.interceptors.response.use(
  (res) => res,
  // eslint-disable-next-line promise/prefer-await-to-callbacks
  async (error: AxiosError) => {
    const original = error.config;
    if (!original || error.response?.status !== 401 || retriedRequests.has(original)) {
      throw error;
    }
    retriedRequests.add(original);

    if (isRefreshing) {
      // Chờ token mới rồi retry
      // eslint-disable-next-line promise/avoid-new
      return await new Promise((resolve, reject) => {
        queue.push((token) => {
          if (!token) {
            reject(error);
            return;
          }
          original.headers.Authorization = `Bearer ${token}`;
          resolve(api(original));
        });
      });
    }

    isRefreshing = true;
    try {
      const refreshToken = getRefreshToken();
      const response = await axios.post<{
        success: boolean;
        data: { accessToken: string; refreshToken: string };
      }>(`${BASE_URL}/api/v1/auth/refresh-token`, { refreshToken });
      const newAccess = response.data.data.accessToken;
      const newRefresh = response.data.data.refreshToken;
      setTokens(newAccess, newRefresh);
      flushQueue(newAccess);
      original.headers.Authorization = `Bearer ${newAccess}`;
      return await api(original);
    } catch (refreshError) {
      flushQueue(null);
      clearTokens();
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
      throw refreshError;
    } finally {
      isRefreshing = false;
    }
  },
);
