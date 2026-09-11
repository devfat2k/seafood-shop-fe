/* eslint-disable no-use-before-define, promise/avoid-new, promise/prefer-await-to-callbacks */
/* oxlint-disable typescript/no-unsafe-type-assertion, typescript/no-base-to-string */
import { Env } from '@/libs/Env';

const BASE_URL = Env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8085';

// --- Token helpers (đổi sang cookie an toàn khi lên prod) ---
const getAccessToken = () =>
  typeof window === 'undefined' ? null : localStorage.getItem('accessToken');
const getRefreshToken = () =>
  typeof window === 'undefined' ? null : localStorage.getItem('refreshToken');
const setTokens = (a: string, r: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('accessToken', a);
    localStorage.setItem('refreshToken', r);
  }
};
const clearTokens = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
};

export type ApiRequestConfig = {
  headers?: Record<string, string>;
  params?: Record<string, unknown>;
  signal?: AbortSignal;
};

export type ApiResponseData<T = unknown> = {
  data: T;
  status: number;
  statusText: string;
};

export class ApiError<T = unknown> extends Error {
  status: number;
  data?: T;
  response?: {
    status: number;
    data?: T;
  };

  constructor(message: string, status: number, data?: T) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
    this.response = { status, data };
  }
}

// --- Refresh Queue ---
let isRefreshing = false;
let refreshQueue: ((token: string | null) => void)[] = [];

const flushQueue = (token: string | null) => {
  for (const cb of refreshQueue) {
    // eslint-disable-next-line promise/prefer-await-to-callbacks
    cb(token);
  }
  refreshQueue = [];
};

function buildUrl(endpoint: string, params?: Record<string, unknown>): string {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const fullUrl = cleanEndpoint.startsWith('/api/v1')
    ? `${BASE_URL}${cleanEndpoint}`
    : `${BASE_URL}/api/v1${cleanEndpoint}`;

  if (!params) {
    return fullUrl;
  }

  const url = new URL(fullUrl);
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === '') {
      continue;
    }

    if (Array.isArray(value)) {
      for (const item of value) {
        if (item !== undefined && item !== null) {
          url.searchParams.append(key, String(item));
        }
      }
    } else if (typeof value === 'object') {
      url.searchParams.append(key, JSON.stringify(value));
    } else {
      url.searchParams.append(key, String(value));
    }
  }

  return url.toString();
}

async function handleTokenRefresh<T>(
  endpoint: string,
  options: RequestInit & { params?: Record<string, unknown> },
  customHeaders: Record<string, string> | undefined,
  data: unknown,
): Promise<ApiResponseData<T>> {
  if (isRefreshing) {
    // eslint-disable-next-line promise/avoid-new
    return await new Promise<ApiResponseData<T>>((resolve, reject) => {
      refreshQueue.push((newToken) => {
        if (!newToken) {
          reject(new ApiError('Unauthorized', 401, data));
          return;
        }
        const mergedHeaders: Record<string, string> = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${newToken}`,
        };
        if (customHeaders) {
          Object.assign(mergedHeaders, customHeaders);
        }
        request<T>(
          endpoint,
          {
            ...options,
            headers: mergedHeaders,
          },
          true,
        )
          .then(resolve)
          .catch(reject);
      });
    });
  }

  isRefreshing = true;
  try {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const refreshRes = await fetch(`${BASE_URL}/api/v1/auth/refresh-token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    if (!refreshRes.ok) {
      throw new Error('Refresh token failed');
    }

    const refreshData = (await refreshRes.json()) as {
      data: { accessToken: string; refreshToken: string };
    };
    const newAccess = refreshData.data.accessToken;
    const newRefresh = refreshData.data.refreshToken;

    setTokens(newAccess, newRefresh);
    flushQueue(newAccess);

    const retryHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${newAccess}`,
    };
    if (customHeaders) {
      Object.assign(retryHeaders, customHeaders);
    }

    return await request<T>(
      endpoint,
      {
        ...options,
        headers: retryHeaders,
      },
      true,
    );
  } catch {
    flushQueue(null);
    clearTokens();
    if (typeof window !== 'undefined') {
      window.location.href = window.location.pathname.startsWith('/admin') ? '/admin/login' : '/';
    }
    throw new ApiError('Session expired', 401, data);
  } finally {
    isRefreshing = false;
  }
}

async function request<T = unknown>(
  endpoint: string,
  options: RequestInit & { params?: Record<string, unknown> } = {},
  isRetry = false,
): Promise<ApiResponseData<T>> {
  const { params, headers: customHeaders, ...fetchOptions } = options;
  const url = buildUrl(endpoint, params);

  const token = getAccessToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(customHeaders as Record<string, string>),
  };

  if (fetchOptions.body instanceof FormData) {
    delete headers['Content-Type'];
  }

  if (token && !headers.Authorization) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const signal =
      fetchOptions.signal ??
      (typeof AbortSignal !== 'undefined' && 'timeout' in AbortSignal
        ? AbortSignal.timeout(10_000)
        : undefined);

    const res = await fetch(url, {
      ...fetchOptions,
      headers,
      signal,
    });

    const contentType = res.headers.get('content-type');
    const rawText = await res.text();
    const normalizedText = rawText.replaceAll(
      /https:\/\/?(?:[a-zA-Z0-9_-]+\.)?r2\.cloudflarestorage\.com\/mini-ecommerce-storage\//gu,
      'https://pub-2b46d3c416734df8807474e64c55b5cb.r2.dev/',
    );
    const data: T = contentType?.includes('application/json')
      ? (JSON.parse(normalizedText) as T)
      : (normalizedText as unknown as T);

    if (!res.ok) {
      if (res.status === 401 && !isRetry) {
        return await handleTokenRefresh<T>(
          endpoint,
          options,
          customHeaders as Record<string, string> | undefined,
          data,
        );
      }

      throw new ApiError(`HTTP Error ${res.status}: ${res.statusText}`, res.status, data);
    }

    return {
      data,
      status: res.status,
      statusText: res.statusText,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    const message = error instanceof Error ? error.message : 'Network request failed';
    const causeMessage =
      error instanceof Error && error.cause instanceof Error ? `: ${error.cause.message}` : '';
    throw new ApiError(`${message}${causeMessage}`, 0);
  }
}

function serializeBody(data?: unknown): BodyInit | undefined {
  if (data instanceof FormData) {
    return data;
  }
  if (data === undefined) {
    return undefined;
  }
  return JSON.stringify(data);
}

export const api = {
  async get<T = unknown>(url: string, config?: ApiRequestConfig): Promise<ApiResponseData<T>> {
    return await request<T>(url, { method: 'GET', ...config });
  },

  async post<T = unknown>(
    url: string,
    data?: unknown,
    config?: ApiRequestConfig,
  ): Promise<ApiResponseData<T>> {
    return await request<T>(url, {
      method: 'POST',
      body: serializeBody(data),
      ...config,
    });
  },

  async put<T = unknown>(
    url: string,
    data?: unknown,
    config?: ApiRequestConfig,
  ): Promise<ApiResponseData<T>> {
    return await request<T>(url, {
      method: 'PUT',
      body: serializeBody(data),
      ...config,
    });
  },

  async delete<T = unknown>(url: string, config?: ApiRequestConfig): Promise<ApiResponseData<T>> {
    return await request<T>(url, { method: 'DELETE', ...config });
  },

  async patch<T = unknown>(
    url: string,
    data?: unknown,
    config?: ApiRequestConfig,
  ): Promise<ApiResponseData<T>> {
    return await request<T>(url, {
      method: 'PATCH',
      body: serializeBody(data),
      ...config,
    });
  },
};
