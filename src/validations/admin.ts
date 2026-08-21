import { z } from 'zod';
import { emailSchema } from '@/validations/auth';

export const adminLoginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Vui lòng nhập mật khẩu'),
});

export const adminProductSchema = z.object({
  name: z.string().min(2, 'Tên sản phẩm tối thiểu 2 ký tự'),
  description: z.string().min(1, 'Vui lòng nhập mô tả sản phẩm'),
  price: z.number({ message: 'Vui lòng nhập giá bán' }).min(1000, 'Giá sản phẩm tối thiểu 1.000₫'),
  originalPrice: z.number().optional().nullable(),
  stock: z
    .number({ message: 'Vui lòng nhập tồn kho' })
    .int('Tồn kho phải là số nguyên')
    .min(1, 'Tồn kho tối thiểu là 1'),
  categoryId: z.number({ message: 'Vui lòng chọn danh mục' }).min(1, 'Vui lòng chọn danh mục'),
  unit: z.string().optional().nullable(),
  spec: z.string().optional().nullable(),
  origin: z.string().optional().nullable(),
  weightOptions: z.array(z.string()).optional().nullable(),
  productType: z.enum(['REGULAR', 'COMBO']).optional(),
  isActive: z.boolean(),
});

export const adminCategorySchema = z.object({
  name: z.string().min(2, 'Tên danh mục tối thiểu 2 ký tự'),
  description: z.string().optional(),
  active: z.boolean(),
});

export const adminCategoryHomeConfigSchema = z.object({
  badge: z.string().optional(),
  badgeType: z.enum(['hot', 'fresh', 'dry', 'number']).optional(),
  iconName: z.string().optional(),
  homeDisplayStyle: z.enum(['main', 'card', 'icon']),
  homeSortOrder: z.number(),
  homeIsActive: z.boolean(),
});

export const adminProductComboConfigSchema = z.object({
  comboCategory: z.string().min(2, 'Tên danh mục combo tối thiểu 2 ký tự'),
  comboTheme: z.enum(['light', 'dark']),
  comboTag: z.string().optional(),
  comboCtaText: z.string(),
  comboHref: z.string().optional(),
  isBreakout: z.boolean(),
  comboSortOrder: z.number(),
});

export const adminBannerSchema = z.object({
  title: z.string().min(2, 'Tiêu đề banner tối thiểu 2 ký tự'),
  subtitle: z.string().optional(),
  ctaText: z.string().optional(),
  ctaLink: z.string().optional(),
  sortOrder: z.number(),
  isActive: z.boolean(),
});

export const adminDailyArrivalSchema = z.object({
  productId: z.number().min(1, 'Vui lòng chọn sản phẩm'),
  arrivalDate: z.string().min(10, 'Vui lòng chọn ngày (YYYY-MM-DD)'),
  badge: z.string().optional(),
  title: z.string().min(2, 'Tiêu đề hiển thị tối thiểu 2 ký tự'),
  description: z.string().optional(),
});

export const adminStockAdjustmentSchema = z.object({
  quantity: z.number().min(1, 'Số lượng tối thiểu là 1'),
  action: z.enum(['increase', 'decrease']),
});

export const adminRoleSchema = z.object({
  name: z.string().min(3, 'Tên vai trò tối thiểu 3 ký tự (VD: ROLE_MODERATOR)'),
  description: z.string().optional(),
});

export const adminUserRoleAssignSchema = z.object({
  roleIds: z.array(z.number()).min(1, 'Vui lòng chọn ít nhất 1 vai trò'),
});

export type AdminLoginFormValues = z.infer<typeof adminLoginSchema>;
export type AdminProductFormValues = z.infer<typeof adminProductSchema>;
export type AdminCategoryFormValues = z.infer<typeof adminCategorySchema>;
export type AdminCategoryHomeConfigFormValues = z.infer<typeof adminCategoryHomeConfigSchema>;
export type AdminProductComboConfigFormValues = z.infer<typeof adminProductComboConfigSchema>;
export type AdminBannerFormValues = z.infer<typeof adminBannerSchema>;
export type AdminDailyArrivalFormValues = z.infer<typeof adminDailyArrivalSchema>;
export type AdminStockAdjustmentFormValues = z.infer<typeof adminStockAdjustmentSchema>;
export type AdminRoleFormValues = z.infer<typeof adminRoleSchema>;
export type AdminUserRoleAssignFormValues = z.infer<typeof adminUserRoleAssignSchema>;
