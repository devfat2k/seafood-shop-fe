/* eslint-disable @typescript-eslint/no-unsafe-type-assertion, @typescript-eslint/no-base-to-string, typescript/no-unsafe-type-assertion, typescript/no-base-to-string, promise/avoid-new, promise/prefer-await-to-callbacks, no-use-before-define */
import { Env } from '@/libs/Env';

const BASE_URL = Env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8085';

// --- Token helpers chuyên biệt cho Quản trị viên (Admin) ---
export const getAdminAccessToken = () =>
  typeof window === 'undefined' ? null : localStorage.getItem('admin_accessToken');
export const getAdminRefreshToken = () =>
  typeof window === 'undefined' ? null : localStorage.getItem('admin_refreshToken');

export const setAdminTokens = (a: string, r: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('admin_accessToken', a);
    localStorage.setItem('admin_refreshToken', r);
  }
};

export const clearAdminTokens = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('admin_accessToken');
    localStorage.removeItem('admin_refreshToken');
  }
};

export type AdminApiRequestConfig = {
  headers?: Record<string, string>;
  params?: Record<string, unknown>;
  signal?: AbortSignal;
};

export type AdminApiResponseData<T = unknown> = {
  data: T;
  status: number;
  statusText: string;
};

export class AdminApiError<T = unknown> extends Error {
  status: number;
  data?: T;
  response?: {
    status: number;
    data?: T;
  };

  constructor(message: string, status: number, data?: T) {
    super(message);
    this.name = 'AdminApiError';
    this.status = status;
    this.data = data;
    this.response = { status, data };
  }
}

// --- Refresh Queue ---
let isAdminRefreshing = false;
let adminRefreshQueue: ((token: string | null) => void)[] = [];

const flushAdminQueue = (token: string | null) => {
  for (const cb of adminRefreshQueue) {
    cb(token);
  }
  adminRefreshQueue = [];
};

function buildAdminUrl(endpoint: string, params?: Record<string, unknown>): string {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const fullUrl = `${BASE_URL}/api/v1${cleanEndpoint}`;

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

async function refreshAdminToken(): Promise<string> {
  const refreshToken = getAdminRefreshToken();
  if (!refreshToken) {
    throw new Error('No admin refresh token available');
  }

  const refreshRes = await fetch(`${BASE_URL}/api/v1/auth/refresh-token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });

  if (!refreshRes.ok) {
    throw new Error('Admin refresh token failed');
  }

  const refreshData = (await refreshRes.json()) as {
    data: { accessToken: string; refreshToken: string };
  };
  const newAccess = refreshData.data.accessToken;
  const newRefresh = refreshData.data.refreshToken;

  setAdminTokens(newAccess, newRefresh);
  flushAdminQueue(newAccess);
  return newAccess;
}

async function enqueueRefreshRequest<T>(
  endpoint: string,
  options: RequestInit & { params?: Record<string, unknown> },
  data: T,
): Promise<AdminApiResponseData<T>> {
  const result = await new Promise<AdminApiResponseData<T>>((resolve, reject) => {
    adminRefreshQueue.push((newToken) => {
      if (!newToken) {
        reject(new AdminApiError('Unauthorized', 401, data));
        return;
      }
      const mergedHeaders: Record<string, string> = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${newToken}`,
      };
      if (options.body instanceof FormData) {
        delete mergedHeaders['Content-Type'];
      }
      if (options.headers) {
        Object.assign(mergedHeaders, options.headers);
      }
      adminRequest<T>(
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

  return result;
}

async function handleAdmin401<T>(
  endpoint: string,
  options: RequestInit & { params?: Record<string, unknown> },
  data: T,
): Promise<AdminApiResponseData<T>> {
  if (isAdminRefreshing) {
    return await enqueueRefreshRequest<T>(endpoint, options, data);
  }

  isAdminRefreshing = true;
  try {
    const newAccess = await refreshAdminToken();
    const retryHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${newAccess}`,
    };
    if (options.body instanceof FormData) {
      delete retryHeaders['Content-Type'];
    }
    if (options.headers) {
      Object.assign(retryHeaders, options.headers);
    }

    return await adminRequest<T>(
      endpoint,
      {
        ...options,
        headers: retryHeaders,
      },
      true,
    );
  } catch {
    flushAdminQueue(null);
    clearAdminTokens();
    if (typeof window !== 'undefined') {
      window.location.href = '/admin/login';
    }
    throw new AdminApiError('Admin session expired', 401, data);
  } finally {
    isAdminRefreshing = false;
  }
}

async function adminRequest<T = unknown>(
  endpoint: string,
  options: RequestInit & { params?: Record<string, unknown> } = {},
  isRetry = false,
): Promise<AdminApiResponseData<T>> {
  const { params, headers: customHeaders, ...fetchOptions } = options;
  const url = buildAdminUrl(endpoint, params);

  const token = getAdminAccessToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(customHeaders as Record<string, string>),
  };

  // Nếu gửi FormData thì xóa Content-Type để browser tự sinh boundary
  if (fetchOptions.body instanceof FormData) {
    delete headers['Content-Type'];
  }

  if (token && !headers.Authorization) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const res = await fetch(url, {
      ...fetchOptions,
      headers,
    });

    const contentType = res.headers.get('content-type');
    const data: T = contentType?.includes('application/json')
      ? ((await res.json()) as T)
      : ((await res.text()) as unknown as T);

    if (!res.ok) {
      if (res.status === 401 && !isRetry) {
        return await handleAdmin401<T>(endpoint, options, data);
      }

      throw new AdminApiError(`HTTP Error ${res.status}: ${res.statusText}`, res.status, data);
    }

    return {
      data,
      status: res.status,
      statusText: res.statusText,
    };
  } catch (error) {
    if (error instanceof AdminApiError) {
      throw error;
    }
    throw new AdminApiError(error instanceof Error ? error.message : 'Network request failed', 0);
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

export const adminApi = {
  async get<T = unknown>(
    url: string,
    config?: AdminApiRequestConfig,
  ): Promise<AdminApiResponseData<T>> {
    return await adminRequest<T>(url, { method: 'GET', ...config });
  },

  async post<T = unknown>(
    url: string,
    data?: unknown,
    config?: AdminApiRequestConfig,
  ): Promise<AdminApiResponseData<T>> {
    return await adminRequest<T>(url, {
      method: 'POST',
      body: serializeBody(data),
      ...config,
    });
  },

  async put<T = unknown>(
    url: string,
    data?: unknown,
    config?: AdminApiRequestConfig,
  ): Promise<AdminApiResponseData<T>> {
    return await adminRequest<T>(url, {
      method: 'PUT',
      body: serializeBody(data),
      ...config,
    });
  },

  async delete<T = unknown>(
    url: string,
    config?: AdminApiRequestConfig,
  ): Promise<AdminApiResponseData<T>> {
    return await adminRequest<T>(url, { method: 'DELETE', ...config });
  },

  async patch<T = unknown>(
    url: string,
    data?: unknown,
    config?: AdminApiRequestConfig,
  ): Promise<AdminApiResponseData<T>> {
    return await adminRequest<T>(url, {
      method: 'PATCH',
      body: serializeBody(data),
      ...config,
    });
  },
};
