import { z } from 'zod';

/**
 * Wrapper chung của mọi response backend.
 * BE trả `{ success, message, data, timestamp }` — KHÔNG có trường `errors`.
 * Validation errors nằm trong `data` khi `success = false`.
 */
export const apiResponseSchema = <T extends z.ZodType>(data: T) =>
  z.object({
    success: z.boolean(),
    message: z.string(),
    data: data.nullable(),
    timestamp: z.string(),
  });

/** Wrapper phân trang (page 0-indexed). */
export const pageResponseSchema = <T extends z.ZodType>(item: T) =>
  z.object({
    content: z.array(item),
    page: z.number(),
    size: z.number(),
    totalElements: z.number(),
    totalPages: z.number(),
    last: z.boolean(),
  });

/** Weight option cho sản phẩm (tùy chọn khối lượng). */
export const weightOptionSchema = z.object({
  id: z.number(),
  label: z.string(),
  value: z.string(),
  priceAdjustment: z.number().optional(),
});

/** Product DTO — full fields từ BE product detail response. */
export const productSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string().optional(),
  description: z.string().nullable().optional(),
  price: z.number(),
  originalPrice: z.number().nullable().optional(),
  imageUrl: z.string().nullable(),
  images: z.array(z.string()).optional(),
  active: z.boolean(),
  featured: z.boolean().optional(),
  stock: z.number(),
  unit: z.string().nullable().optional(),
  origin: z.string().nullable().optional(),
  spec: z.string().nullable().optional(),
  categoryId: z.number(),
  categoryName: z.string().nullable().optional(),
  categorySlug: z.string().nullable().optional(),
  weightOptions: z.array(weightOptionSchema).optional(),
  rating: z.number().nullable().optional(),
  reviewCount: z.number().nullable().optional(),
  createdAt: z.string().nullable().optional(),
  updatedAt: z.string().nullable().optional(),
});

/** Category DTO. */
export const categorySchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  imageUrl: z.string().nullable().optional(),
  badge: z.string().nullable().optional(),
  badgeType: z.string().nullable().optional(),
  iconName: z.string().nullable().optional(),
  homeDisplayStyle: z.string().nullable().optional(),
  productCount: z.number().optional(),
});

export type Product = z.infer<typeof productSchema>;
export type WeightOption = z.infer<typeof weightOptionSchema>;
export type Category = z.infer<typeof categorySchema>;

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T | null;
  timestamp: string;
};

export type PageResponse<T> = {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
};
