import { z } from 'zod';

export const emailSchema = z
  .string()
  .min(1, 'Email không được để trống')
  .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/u, 'Email không đúng định dạng');

export const registerRequestSchema = z.object({
  fullName: z.string().min(2, 'Họ và tên tối thiểu 2 ký tự'),
  email: emailSchema,
  phoneNumber: z
    .string()
    .min(9, 'Số điện thoại tối thiểu 9 số')
    .max(12, 'Số điện thoại tối đa 12 số')
    .regex(/^(0|\+84)\d{8,10}$/u, 'Số điện thoại không hợp lệ'),
  password: z.string().min(8, 'Mật khẩu phải từ 8 ký tự trở lên'),
});

export const loginRequestSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Vui lòng nhập mật khẩu'),
});

export const otpPurposeSchema = z.enum(['REGISTER_VERIFICATION', 'RESET_PASSWORD']);

export const forgotPasswordRequestSchema = z.object({
  email: emailSchema,
});

export const resendOtpRequestSchema = z.object({
  email: emailSchema,
  purpose: otpPurposeSchema,
});

export const otpVerifyRequestSchema = z.object({
  email: emailSchema,
  otpCode: z
    .string()
    .length(6, 'Mã OTP gồm 6 chữ số')
    .regex(/^\d{6}$/u, 'Mã OTP chỉ chứa chữ số'),
  purpose: otpPurposeSchema,
});

export const resetPasswordRequestSchema = z.object({
  actionToken: z.string().min(1, 'Mã xác thực hành động không hợp lệ'),
  newPassword: z.string().min(8, 'Mật khẩu mới phải từ 8 ký tự trở lên'),
});

export const resetPasswordFormSchema = z
  .object({
    newPassword: z.string().min(8, 'Mật khẩu mới phải từ 8 ký tự trở lên'),
    confirmPassword: z.string().min(1, 'Vui lòng xác nhận lại mật khẩu mới'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Mật khẩu xác nhận không trùng khớp',
    path: ['confirmPassword'],
  });

export type RegisterRequest = z.infer<typeof registerRequestSchema>;
export type LoginRequest = z.infer<typeof loginRequestSchema>;
export type OtpPurpose = z.infer<typeof otpPurposeSchema>;
export type ForgotPasswordRequest = z.infer<typeof forgotPasswordRequestSchema>;
export type ResendOtpRequest = z.infer<typeof resendOtpRequestSchema>;
export type OtpVerifyRequest = z.infer<typeof otpVerifyRequestSchema>;
export type ResetPasswordRequest = z.infer<typeof resetPasswordRequestSchema>;
export type ResetPasswordFormValues = z.infer<typeof resetPasswordFormSchema>;
