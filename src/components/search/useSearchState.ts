'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { useCategoriesQuery } from '@/libs/queries/categories';
import { useProductsQuery } from '@/libs/queries/products';
import { useCartStore } from '@/libs/stores/cart';
import type { Product } from '@/types/api';

function getPriceRangeBounds(priceRangeParam: string): {
  minPrice?: number;
  maxPrice?: number;
} {
  if (priceRangeParam === 'under-200k') {
    return { minPrice: 0, maxPrice: 200_000 };
  }
  if (priceRangeParam === '200k-500k') {
    return { minPrice: 200_000, maxPrice: 500_000 };
  }
  if (priceRangeParam === '500k-1m') {
    return { minPrice: 500_000, maxPrice: 1_000_000 };
  }
  if (priceRangeParam === 'above-1m') {
    return { minPrice: 1_000_000 };
  }
  return {};
}

function getSortConfig(sortParam: string): { sortField: string; sortDir: 'asc' | 'desc' } {
  if (sortParam === 'price-asc') {
    return { sortField: 'price', sortDir: 'asc' };
  }
  if (sortParam === 'price-desc') {
    return { sortField: 'price', sortDir: 'desc' };
  }
  if (sortParam === 'popular') {
    return { sortField: 'featured', sortDir: 'desc' };
  }
  return { sortField: 'id', sortDir: 'desc' };
}

export function useSearchState() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { addItem: addCartItem } = useCartStore();

  const queryParam = searchParams.get('q') ?? searchParams.get('search') ?? '';
  const categoryParam = searchParams.get('category');
  const priceRangeParam = searchParams.get('priceRange') ?? 'all';
  const sortParam = searchParams.get('sort') ?? 'newest';

  const selectedCategoryId = categoryParam ? Number(categoryParam) : undefined;
  const { minPrice, maxPrice } = getPriceRangeBounds(priceRangeParam);
  const { sortField, sortDir } = getSortConfig(sortParam);

  const { data: categories = [] } = useCategoriesQuery();

  const {
    data: productsData,
    isLoading,
    isError,
    error,
    refetch,
  } = useProductsQuery({
    search: queryParam.trim() || undefined,
    categoryId: selectedCategoryId,
    minPrice,
    maxPrice,
    sort: sortField,
    direction: sortDir,
    size: 24,
  });

  const products = productsData?.content ?? [];
  const totalElements = productsData?.totalElements ?? products.length;

  const updateUrlParams = (newParams: Record<string, string | undefined>) => {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(newParams)) {
      if (value === undefined || value === '') {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const resetAll = () => {
    router.push(pathname);
  };

  const handleAddToCart = (product: Product) => {
    addCartItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.imageUrl ?? product.images?.[0] ?? '',
      weight: product.unit ? `1 ${product.unit}` : undefined,
      quantity: 1,
    });
    toast.success(`Đã thêm "${product.name}" vào giỏ hàng!`);
  };

  return {
    pathname,
    queryParam,
    priceRangeParam,
    sortParam,
    selectedCategoryId,
    categories,
    products,
    totalElements,
    isLoading,
    isError,
    error,
    refetch,
    updateUrlParams,
    resetAll,
    handleAddToCart,
  };
}
