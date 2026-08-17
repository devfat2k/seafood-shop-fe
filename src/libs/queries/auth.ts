'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  forgotPassword,
  loginUser,
  logoutUser,
  registerUser,
  resendOtp,
  resetPassword,
  verifyOtp,
} from '@/lib/api/auth';
import { api } from '@/libs/ApiClient';
import type { ApiResponse } from '@/types/api';
import type {
  AuthResponse,
  ForgotPasswordRequest,
  LoginRequest,
  OtpVerifyRequest,
  RegisterRequest,
  ResendOtpRequest,
  ResetPasswordRequest,
  UserResponseDto,
  VerifyOtpResponse,
} from '@/types/auth';
import type { UserProfile } from '@/types/user';

export const authQueryKeys = {
  all: ['auth'] as const,
  me: () => ['auth', 'me'] as const,
};

async function fetchCurrentUser(): Promise<UserProfile | null> {
  const token = typeof window === 'undefined' ? null : localStorage.getItem('accessToken');
  if (!token) {
    return null;
  }

  try {
    const res = await api.get<ApiResponse<UserProfile>>('/users/me');
    if (res.data?.success && res.data.data) {
      return res.data.data;
    }
    return null;
  } catch {
    return null;
  }
}

export function useCurrentUserQuery() {
  const hasToken = typeof window !== 'undefined' && Boolean(localStorage.getItem('accessToken'));

  return useQuery<UserProfile | null>({
    queryKey: authQueryKeys.me(),
    queryFn: fetchCurrentUser,
    enabled: hasToken,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
}

export function useLoginMutation() {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<AuthResponse>, Error, LoginRequest>({
    mutationFn: async (data: LoginRequest) => {
      const res = await loginUser(data);
      if (!res.success) {
        throw new Error(res.message || 'Đăng nhập thất bại');
      }
      return res;
    },
    onSuccess: (res) => {
      if (res.data?.user) {
        void queryClient.invalidateQueries({ queryKey: authQueryKeys.all });
      }
    },
  });
}

export function useRegisterMutation() {
  return useMutation<ApiResponse<UserResponseDto>, Error, RegisterRequest>({
    mutationFn: async (data: RegisterRequest) => {
      const res = await registerUser(data);
      if (!res.success) {
        throw new Error(res.message || 'Đăng ký không thành công');
      }
      return res;
    },
  });
}

export function useVerifyOtpMutation() {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<VerifyOtpResponse>, Error, OtpVerifyRequest>({
    mutationFn: async (data: OtpVerifyRequest) => {
      const res = await verifyOtp(data);
      if (!res.success) {
        throw new Error(res.message || 'Xác thực OTP không thành công');
      }
      return res;
    },
    onSuccess: (res) => {
      if (res.data?.accessToken) {
        void queryClient.invalidateQueries({ queryKey: authQueryKeys.all });
      }
    },
  });
}

export function useForgotPasswordMutation() {
  return useMutation<ApiResponse<null>, Error, ForgotPasswordRequest>({
    mutationFn: async (data: ForgotPasswordRequest) => {
      const res = await forgotPassword(data);
      if (!res.success) {
        throw new Error(res.message || 'Không thể gửi mã khôi phục');
      }
      return res;
    },
  });
}

export function useResendOtpMutation() {
  return useMutation<ApiResponse<null>, Error, ResendOtpRequest>({
    mutationFn: async (data: ResendOtpRequest) => {
      const res = await resendOtp(data);
      if (!res.success) {
        throw new Error(res.message || 'Không thể gửi lại mã OTP');
      }
      return res;
    },
  });
}

export function useResetPasswordMutation() {
  return useMutation<ApiResponse<null>, Error, ResetPasswordRequest>({
    mutationFn: async (data: ResetPasswordRequest) => {
      const res = await resetPassword(data);
      if (!res.success) {
        throw new Error(res.message || 'Đặt lại mật khẩu thất bại');
      }
      return res;
    },
  });
}

export function useLogoutMutation() {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<null>>({
    mutationFn: async () => await logoutUser(),
    onSettled: () => {
      queryClient.setQueryData(authQueryKeys.me(), null);
      void queryClient.invalidateQueries({ queryKey: authQueryKeys.all });
    },
  });
}
