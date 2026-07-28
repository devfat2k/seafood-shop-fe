import { apiResponseSchema, pageResponseSchema, productSchema } from '@/types/api';
import type { Product, PageResponse } from '@/types/api';
import { api } from './../ApiClient';

export type ProductListParams = {
  page?: number;
  size?: number;
  sort?: string;
  direction?: 'asc' | 'desc';
};

export async function getProducts(params: ProductListParams = {}): Promise<PageResponse<Product>> {
  const res = await api.get('/products', { params });
  // Validate: response phải là ApiResponse<PageResponse<Product>>
  const parsed = apiResponseSchema(pageResponseSchema(productSchema)).safeParse(res.data);
  if (!parsed.success) {
    throw new Error(`Invalid product list response: ${parsed.error.message}`);
  }
  if (!parsed.data.data) {
    throw new Error('Empty product list data');
  }
  return parsed.data.data;
}

export async function getProduct(id: number): Promise<Product> {
  const res = await api.get(`/products/${id}`);
  const parsed = apiResponseSchema(productSchema).safeParse(res.data);
  if (!parsed.success || !parsed.data.data) {
    throw new Error('Invalid product response');
  }
  return parsed.data.data;
}
