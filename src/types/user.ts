import { z } from 'zod';

export const updateProfileSchema = z.object({
  fullName: z.string().min(1, 'Họ và tên không được để trống'),
  phoneNumber: z.string().min(9, 'Số điện thoại không hợp lệ'),
});

export const changePasswordSchema = z.object({
  oldPassword: z.string().min(1, 'Vui lòng nhập mật khẩu hiện tại'),
  newPassword: z.string().min(8, 'Mật khẩu mới phải từ 8 ký tự'),
});

export const addressRequestSchema = z.object({
  recipientName: z.string().min(1, 'Họ tên người nhận không được để trống'),
  phone: z.string().min(9, 'Số điện thoại không hợp lệ'),
  province: z.string().optional(),
  district: z.string().optional(),
  ward: z.string().optional(),
  addressDetail: z.string().min(5, 'Địa chỉ chi tiết không đủ thông tin'),
  defaultAddress: z.boolean().optional(),
  tag: z.string().optional(),
});

export type UpdateProfileRequest = z.infer<typeof updateProfileSchema>;
export type ChangePasswordRequest = z.infer<typeof changePasswordSchema>;
export type AddressRequest = z.infer<typeof addressRequestSchema>;

export type UserProfile = {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  avatarUrl?: string | null;
  isActive?: boolean;
  roles: string[];
  permissions?: string[];
  rank?: string;
  gender?: string;
  birthDate?: string;
};

export type AddressResponseDto = {
  id: number | string;
  recipientName: string;
  phone: string;
  province?: string;
  district?: string;
  ward?: string;
  addressDetail: string;
  defaultAddress: boolean;
  tag?: string;
};

export type UserAddress = AddressResponseDto;
