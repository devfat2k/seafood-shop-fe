import { z } from 'zod';

// Wrapper chung của mọi response backend
export const apiResponseSchema = <T extends z.ZodType>(data: T) =>
  z.object({
    code: z.number(),
    message: z.string(),
    data: data.nullable(),
    errors: z.unknown().nullable(),
    timestamp: z.string(),
  });

// Wrapper phân trang (page 0-indexed)
export const pageResponseSchema = <T extends z.ZodType>(item: T) =>
  z.object({
    content: z.array(item),
    page: z.number(),
    size: z.number(),
    totalElements: z.number(),
    totalPages: z.number(),
    last: z.boolean(),
  });

// DTO ví dụ — Product (điền thêm theo api-contract.md)
export const productSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  imageUrl: z.string().nullable(),
  active: z.boolean(),
  stock: z.number(),
  categoryId: z.number(),
});

export type Product = z.infer<typeof productSchema>;
export type ApiResponse<T> = {
  code: number;
  message: string;
  data: T | null;
  errors: unknown;
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
