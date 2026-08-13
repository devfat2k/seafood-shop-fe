import type { PageResponse, Product } from '@/types/api';
import { apiResponseSchema, pageResponseSchema, productSchema } from '@/types/api';

import { api } from '../ApiClient';

export type ProductListParams = {
  search?: string;
  categoryId?: number | number[];
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  page?: number;
  size?: number;
  sort?: string;
  direction?: 'asc' | 'desc';
};

export async function getProducts(params: ProductListParams = {}): Promise<PageResponse<Product>> {
  const res = await api.get('/products', { params });
  const parsed = apiResponseSchema(pageResponseSchema(productSchema)).safeParse(res.data);
  if (!parsed.success) {
    throw new Error(`Invalid product list response: ${parsed.error.message}`);
  }
  if (!parsed.data.data) {
    throw new Error('Empty product list data');
  }
  return parsed.data.data;
}

export async function getProduct(id: number | string): Promise<Product> {
  const res = await api.get(`/products/${id}`);
  const parsed = apiResponseSchema(productSchema).safeParse(res.data);
  if (!parsed.success || !parsed.data.data) {
    throw new Error('Invalid product response');
  }
  return parsed.data.data;
}
