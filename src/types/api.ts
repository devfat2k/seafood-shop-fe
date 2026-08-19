import { z } from 'zod';

/**
 * Wrapper chung của mọi response backend.
 * BE trả `{ success, message, data, timestamp }` — KHÔNG có trường `errors`.
 * Validation errors nằm trong `data` khi `success = false`.
 * @param data - Schema cho trường data.
 * @returns Schema object ApiResponse.
 */
export const apiResponseSchema = <T extends z.ZodType>(data: T) =>
  z.object({
    success: z.boolean(),
    message: z.string(),
    data: data.nullable(),
    timestamp: z.string().optional(),
  });

/**
 * Wrapper phân trang (page 0-indexed).
 * @param item - Schema cho các item trong mảng content.
 * @returns Schema object PageResponse.
 */
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
  id: z.number().optional(),
  label: z.string().optional(),
  value: z.string().optional(),
  priceAdjustment: z.number().optional(),
});

/** Category DTO (hỗ trợ cả name & categoryName, slug, count). */
export const categorySchema = z.object({
  id: z.number(),
  name: z.string().optional(),
  categoryName: z.string().optional(),
  slug: z.string().optional(),
  description: z.string().nullable().optional(),
  imageUrl: z.string().nullable().optional(),
  badge: z.string().nullable().optional(),
  badgeType: z.string().nullable().optional(),
  iconName: z.string().nullable().optional(),
  homeDisplayStyle: z.string().nullable().optional(),
  homeSortOrder: z.number().nullable().optional(),
  homeIsActive: z.boolean().nullable().optional(),
  active: z.boolean().optional().default(true),
  productCount: z.number().nullable().optional(),
});

/** Product DTO — full fields từ BE product list & detail response. */
export const productSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string().optional(),
  description: z.string().nullable().optional(),
  price: z.coerce.number(),
  originalPrice: z.coerce.number().nullable().optional(),
  imageUrl: z.string().nullable().optional(),
  images: z.array(z.string()).optional(),
  active: z.boolean().optional().default(true),
  featured: z.boolean().optional(),
  stock: z.coerce.number().optional().default(0),
  unit: z.string().nullable().optional(),
  origin: z.string().nullable().optional(),
  spec: z.string().nullable().optional(),
  categoryId: z.number().optional(),
  categoryName: z.string().nullable().optional(),
  categorySlug: z.string().nullable().optional(),
  category: categorySchema.nullable().optional(),
  productType: z.enum(['REGULAR', 'COMBO']).optional(),
  tags: z.array(z.string()).optional(),
  weightOptions: z.array(weightOptionSchema).optional(),
  rating: z.number().nullable().optional(),
  reviewCount: z.number().nullable().optional(),
  createdAt: z.string().nullable().optional(),
  updatedAt: z.string().nullable().optional(),
});

export type Product = z.infer<typeof productSchema>;
export type WeightOption = z.infer<typeof weightOptionSchema>;
export type Category = z.infer<typeof categorySchema>;

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T | null;
  timestamp?: string;
};

export type PageResponse<T> = {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
};
