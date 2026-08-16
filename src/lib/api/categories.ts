import { z } from 'zod';
import { api } from '@/libs/ApiClient';
import type { ApiResponse, Category } from '@/types/api';
import { apiResponseSchema, categorySchema } from '@/types/api';

export async function getCategories(): Promise<Category[]> {
  const res = await api.get<ApiResponse<Category[]>>('/categories');
  const parsed = apiResponseSchema(z.array(categorySchema)).safeParse(res.data);
  if (!parsed.success || !parsed.data.data) {
    throw new Error(`Invalid categories response: ${parsed.error?.message ?? 'Empty data'}`);
  }
  return parsed.data.data;
}

export async function getCategory(id: number | string): Promise<Category> {
  const res = await api.get<ApiResponse<Category>>(`/categories/${id}`);
  const parsed = apiResponseSchema(categorySchema).safeParse(res.data);
  if (!parsed.success || !parsed.data.data) {
    throw new Error(`Invalid category response: ${parsed.error?.message ?? 'Empty data'}`);
  }
  return parsed.data.data;
}
