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

export async function registerUser(data: RegisterRequest): Promise<ApiResponse<UserResponseDto>> {
  const res = await api.post<ApiResponse<UserResponseDto>>('/auth/register', data);
  return res.data;
}

export async function loginUser(data: LoginRequest): Promise<ApiResponse<AuthResponse>> {
  const res = await api.post<ApiResponse<AuthResponse>>('/auth/login', data);
  if (typeof window !== 'undefined' && res.data?.success && res.data.data?.accessToken) {
    localStorage.setItem('accessToken', res.data.data.accessToken);
    localStorage.setItem('refreshToken', res.data.data.refreshToken);
  }
  return res.data;
}

export async function logoutUser(refreshToken?: string): Promise<ApiResponse<null>> {
  const token =
    refreshToken ?? (typeof window === 'undefined' ? null : localStorage.getItem('refreshToken'));
  const res = await api.post<ApiResponse<null>>('/auth/logout', {
    refreshToken: token ?? '',
  });
  if (typeof window !== 'undefined') {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
  return res.data;
}

export async function verifyOtp(data: OtpVerifyRequest): Promise<ApiResponse<VerifyOtpResponse>> {
  const res = await api.post<ApiResponse<VerifyOtpResponse>>('/auth/verify-otp', data);
  if (typeof window !== 'undefined' && res.data?.success && res.data.data?.accessToken) {
    localStorage.setItem('accessToken', res.data.data.accessToken);
    if (res.data.data.refreshToken) {
      localStorage.setItem('refreshToken', res.data.data.refreshToken);
    }
  }
  return res.data;
}

export async function forgotPassword(data: ForgotPasswordRequest): Promise<ApiResponse<null>> {
  const res = await api.post<ApiResponse<null>>('/auth/forgot-password', data);
  return res.data;
}

export async function resendOtp(data: ResendOtpRequest): Promise<ApiResponse<null>> {
  const res = await api.post<ApiResponse<null>>('/auth/resend-otp', data);
  return res.data;
}

export async function resetPassword(data: ResetPasswordRequest): Promise<ApiResponse<null>> {
  const res = await api.post<ApiResponse<null>>('/auth/reset-password', data);
  return res.data;
}
