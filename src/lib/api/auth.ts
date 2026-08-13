import type {
  AuthResponse,
  LoginRequest,
  OtpSendRequest,
  OtpVerifyRequest,
  RegisterRequest,
  RegisterResponse,
  ResetPasswordRequest,
} from '@/types/auth';
import type { ApiResponse } from '@/types/api';
import { api } from '../ApiClient';

export async function registerUser(data: RegisterRequest): Promise<ApiResponse<RegisterResponse>> {
  const res = await api.post<ApiResponse<RegisterResponse>>('/auth/register', data);
  return res.data;
}

export async function loginUser(data: LoginRequest): Promise<ApiResponse<AuthResponse>> {
  const res = await api.post<ApiResponse<AuthResponse>>('/auth/login', data);
  if (res.data.success && res.data.data) {
    localStorage.setItem('accessToken', res.data.data.accessToken);
    localStorage.setItem('refreshToken', res.data.data.refreshToken);
  }
  return res.data;
}

export async function logoutUser(refreshToken: string): Promise<ApiResponse<null>> {
  const res = await api.post<ApiResponse<null>>('/auth/logout', { refreshToken });
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  return res.data;
}

export async function sendOtp(data: OtpSendRequest): Promise<ApiResponse<null>> {
  const res = await api.post<ApiResponse<null>>('/auth/otp/send', data);
  return res.data;
}

export async function verifyOtp(data: OtpVerifyRequest): Promise<ApiResponse<null>> {
  const res = await api.post<ApiResponse<null>>('/auth/otp/verify', data);
  return res.data;
}

export async function resetPassword(data: ResetPasswordRequest): Promise<ApiResponse<null>> {
  const res = await api.post<ApiResponse<null>>('/auth/reset-password', data);
  return res.data;
}
