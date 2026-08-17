import { z } from 'zod';

const phoneRegex = /^(0[35789])([0-9]{8})$/u;

export const addressFormSchema = z.object({
  recipientName: z
    .string()
    .min(2, 'Họ và tên người nhận phải có ít nhất 2 ký tự')
    .max(100, 'Họ và tên người nhận không được quá 100 ký tự'),
  phone: z.string().regex(phoneRegex, 'Số điện thoại không đúng định dạng (Ví dụ: 0912345678)'),
  province: z.string().min(1, 'Vui lòng chọn Tỉnh / Thành phố'),
  district: z.string().min(1, 'Vui lòng chọn Quận / Huyện'),
  ward: z.string().min(1, 'Vui lòng chọn Phường / Xã'),
  addressDetail: z
    .string()
    .min(5, 'Địa chỉ chi tiết (số nhà, tên đường) phải có ít nhất 5 ký tự')
    .max(255, 'Địa chỉ chi tiết không được quá 255 ký tự'),
  tag: z.string(),
  defaultAddress: z.boolean(),
});

export type AddressFormValues = z.infer<typeof addressFormSchema>;

export const updateProfileSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Họ và tên phải có ít nhất 2 ký tự')
    .max(100, 'Họ và tên không được quá 100 ký tự'),
  phone: z
    .string()
    .regex(phoneRegex, 'Số điện thoại không đúng định dạng')
    .optional()
    .or(z.literal('')),
  avatarUrl: z.url('URL ảnh đại diện không hợp lệ').optional().or(z.literal('')),
});

export type UpdateProfileFormValues = z.infer<typeof updateProfileSchema>;

export const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(6, 'Mật khẩu hiện tại phải có ít nhất 6 ký tự'),
    newPassword: z.string().min(6, 'Mật khẩu mới phải có ít nhất 6 ký tự'),
    confirmPassword: z.string().min(6, 'Vui lòng xác nhận mật khẩu mới'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Mật khẩu xác nhận không khớp với mật khẩu mới',
    path: ['confirmPassword'],
  });

export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;
