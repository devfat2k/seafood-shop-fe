import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { page } from 'vitest/browser';
import ProductGrid from '@/app/[locale]/(marketing)/products/ProductGrid';
import * as productsApi from '@/libs/api/products';

async function renderWithClient(ui: ReactNode) {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return await render(<QueryClientProvider client={client}>{ui}</QueryClientProvider>);
}

describe('ProductGrid', () => {
  it('hiển thị empty state khi không có sản phẩm', async () => {
    vi.spyOn(productsApi, 'getProducts').mockResolvedValue({
      content: [],
      page: 0,
      size: 12,
      totalElements: 0,
      totalPages: 0,
      last: true,
    });
    await renderWithClient(<ProductGrid />);
    await expect.element(page.getByText('Chưa có sản phẩm nào.')).toBeInTheDocument();
  });

  it('hiển thị sản phẩm khi có dữ liệu', async () => {
    vi.spyOn(productsApi, 'getProducts').mockResolvedValue({
      content: [
        {
          id: 1,
          name: 'Tôm sú',
          price: 320_000,
          imageUrl: null,
          active: true,
          stock: 10,
          categoryId: 2,
        },
      ],
      page: 0,
      size: 12,
      totalElements: 1,
      totalPages: 1,
      last: true,
    });
    await renderWithClient(<ProductGrid />);
    await expect.element(page.getByText('Tôm sú')).toBeInTheDocument();
    await expect.element(page.getByText('320.000₫')).toBeInTheDocument();
  });
});
