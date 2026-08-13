import { z } from 'zod';

export const updateProfileSchema = z.object({
  fullName: z.string().min(1, 'Họ và tên không được để trống'),
  phoneNumber: z.string().min(9, 'Số điện thoại không hợp lệ'),
});

export const changePasswordSchema = z.object({
  oldPassword: z.string().min(1, 'Vui lòng nhập mật khẩu cũ'),
  newPassword: z.string().min(8, 'Mật khẩu mới phải từ 8 ký tự'),
});

export const addressSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, 'Họ tên người nhận không được để trống'),
  phone: z.string().min(9, 'Số điện thoại không hợp lệ'),
  addressDetail: z.string().min(5, 'Địa chỉ chi tiết không đủ thông tin'),
  isDefault: z.boolean().optional(),
  tag: z.string().optional(),
});

export type UpdateProfileRequest = z.infer<typeof updateProfileSchema>;
export type ChangePasswordRequest = z.infer<typeof changePasswordSchema>;
export type AddressRequest = z.infer<typeof addressSchema>;

export type UserProfile = {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  avatarUrl?: string | null;
  roles: string[];
  permissions?: string[];
  rank?: string;
  rewardPoints?: number;
  birthDate?: string;
  gender?: string;
};

export type UserAddress = {
  id: number;
  name: string;
  phone: string;
  addressDetail: string;
  isDefault: boolean;
  tag?: string;
};
