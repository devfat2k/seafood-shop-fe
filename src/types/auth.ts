import { z } from 'zod';

export const registerRequestSchema = z.object({
  fullName: z.string().min(1, 'Họ và tên không được để trống'),
  email: z.string().email('Email không đúng định dạng'),
  phoneNumber: z.string().min(9, 'Số điện thoại không hợp lệ'),
  password: z.string().min(8, 'Mật khẩu phải từ 8 ký tự trở lên'),
});

export const loginRequestSchema = z.object({
  email: z.string().email('Email không đúng định dạng'),
  password: z.string().min(1, 'Vui lòng nhập mật khẩu'),
});

export const otpSendRequestSchema = z.object({
  email: z.string().email('Email không đúng định dạng'),
  purpose: z.enum(['REGISTER_VERIFICATION', 'RESET_PASSWORD']),
});

export const otpVerifyRequestSchema = z.object({
  email: z.string().email('Email không đúng định dạng'),
  otpCode: z.string().length(6, 'Mã OTP gồm 6 chữ số'),
  purpose: z.enum(['REGISTER_VERIFICATION', 'RESET_PASSWORD']),
});

export const resetPasswordRequestSchema = z.object({
  email: z.string().email('Email không đúng định dạng'),
  otpCode: z.string().length(6, 'Mã OTP gồm 6 chữ số'),
  newPassword: z.string().min(8, 'Mật khẩu mới phải từ 8 ký tự trở lên'),
});

export type RegisterRequest = z.infer<typeof registerRequestSchema>;
export type LoginRequest = z.infer<typeof loginRequestSchema>;
export type OtpSendRequest = z.infer<typeof otpSendRequestSchema>;
export type OtpVerifyRequest = z.infer<typeof otpVerifyRequestSchema>;
export type ResetPasswordRequest = z.infer<typeof resetPasswordRequestSchema>;

export type UserAuthDto = {
  id: number;
  fullName: string;
  email: string;
  roles: string[];
};

export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  user: UserAuthDto;
};

export type RegisterResponse = {
  userId: number;
  fullName: string;
  email: string;
  emailVerified: boolean;
};
