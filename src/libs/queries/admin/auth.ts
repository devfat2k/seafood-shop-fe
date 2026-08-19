'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  adminApi,
  clearAdminTokens,
  getAdminAccessToken,
  getAdminRefreshToken,
  setAdminTokens,
} from '@/libs/AdminApiClient';
import type { ApiResponse } from '@/types/api';
import type { AuthResponse, LoginRequest } from '@/types/auth';
import type { UserProfile } from '@/types/user';
import { hasAdminRole } from '@/utils/role';

export const adminAuthQueryKeys = {
  all: ['admin-auth'] as const,
  me: () => ['admin-auth', 'me'] as const,
};

async function fetchAdminCurrentUser(): Promise<UserProfile | null> {
  const token = getAdminAccessToken();
  if (!token) {
    return null;
  }

  try {
    const res = await adminApi.get<ApiResponse<UserProfile>>('/users/me');
    if (res.data?.success && res.data.data) {
      // Xác nhận user có quyền Admin
      if (!hasAdminRole(res.data.data.roles)) {
        clearAdminTokens();
        return null;
      }
      return res.data.data;
    }
    return null;
  } catch {
    return null;
  }
}

export function useAdminCurrentUserQuery() {
  const hasToken = typeof window !== 'undefined' && Boolean(getAdminAccessToken());

  return useQuery<UserProfile | null>({
    queryKey: adminAuthQueryKeys.me(),
    queryFn: fetchAdminCurrentUser,
    enabled: hasToken,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
}

export function useAdminLoginMutation() {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<AuthResponse>, Error, LoginRequest>({
    mutationFn: async (credentials: LoginRequest) => {
      const { data } = await adminApi.post<ApiResponse<AuthResponse>>('/auth/login', credentials);

      if (!data?.success || !data.data?.accessToken) {
        throw new Error(data?.message || 'Đăng nhập không thành công');
      }

      // Lưu token vào storage để các request tiếp theo có header Authorization
      setAdminTokens(data.data.accessToken, data.data.refreshToken);

      // Gọi GET /users/me để xác thực vai trò Admin của tài khoản
      try {
        const meRes = await adminApi.get<ApiResponse<UserProfile>>('/users/me', {
          headers: {
            Authorization: `Bearer ${data.data.accessToken}`,
          },
        });

        const profile = meRes.data?.data;
        if (!meRes.data?.success || !profile || !hasAdminRole(profile.roles)) {
          clearAdminTokens();
          throw new Error('Tài khoản của bạn không có quyền truy cập trang Quản trị (ROLE_ADMIN).');
        }

        queryClient.setQueryData(adminAuthQueryKeys.me(), profile);
        return data;
      } catch (error) {
        clearAdminTokens();
        if (error instanceof Error) {
          throw error;
        }
        throw new Error('Không thể xác thực quyền hạn quản trị viên', { cause: error });
      }
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: adminAuthQueryKeys.all });
    },
  });
}

export function useAdminLogoutMutation() {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<null>>({
    mutationFn: async () => {
      const refreshToken = getAdminRefreshToken();
      try {
        if (refreshToken) {
          const res = await adminApi.post<ApiResponse<null>>('/auth/logout', {
            refreshToken,
          });
          return res.data;
        }
      } finally {
        clearAdminTokens();
      }
      return { success: true, message: 'Logged out', data: null };
    },
    onSettled: () => {
      queryClient.setQueryData(adminAuthQueryKeys.me(), null);
      void queryClient.invalidateQueries({ queryKey: adminAuthQueryKeys.all });
    },
  });
}
