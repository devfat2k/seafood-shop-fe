'use client';

import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import type { ProductCardItem } from '@/components/products/productCardTypes';
import type { CategoryFilterItem, FilterState } from '@/components/products/ProductSidebarFilter';
import type { QuickViewProduct } from '@/components/products/QuickViewModal';
import { useCategoriesQuery } from '@/libs/queries/categories';
import { useProductsQuery } from '@/libs/queries/products';
import { useCartStore } from '@/libs/stores/cart';
import type { Category, PageResponse, Product } from '@/types/api';
import { mapProductToCardItem, mapToQuickView, resolveCategoryIds } from './catalog-utils';

export { mapProductToCardItem };

const ITEMS_PER_PAGE = 9;

export const INITIAL_FILTERS: FilterState = {
  categories: [],
  minPrice: 0,
  maxPrice: 10_000_000,
  onlyInStock: false,
  fastShippingOnly: false,
  cleanPrepOnly: false,
};

type UseProductCatalogOptions = {
  initialCategory?: string;
  initialSearch?: string;
  initialPage?: number;
  initialSort?: string;
};

export function useProductCatalogState(
  initialPageData?: PageResponse<Product>,
  initialCategories?: Category[],
  options?: UseProductCatalogOptions,
) {
  const { addItem: addCartItem } = useCartStore();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(options?.initialPage ?? 1);
  const [sortBy, setSortBy] = useState(options?.initialSort ?? 'createdAt,desc');
  const [searchQuery, setSearchQuery] = useState(options?.initialSearch ?? '');
  const [debouncedSearch, setDebouncedSearch] = useState(options?.initialSearch ?? '');
  const [quickViewProduct, setQuickViewProduct] = useState<QuickViewProduct | null>(null);

  const [filters, setFilters] = useState<FilterState>({
    ...INITIAL_FILTERS,
    categories: options?.initialCategory ? [options.initialCategory] : [],
  });

  const { data: categories = [] } = useCategoriesQuery(initialCategories);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery.trim());
      setCurrentPage(1);
    }, 400);
    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  const selectedCategoryIds = useMemo(
    () => resolveCategoryIds(filters.categories, categories),
    [filters.categories, categories],
  );

  const queryParams = useMemo(
    () => ({
      page: currentPage - 1,
      size: ITEMS_PER_PAGE,
      sort: sortBy,
      search: debouncedSearch || undefined,
      categoryId: selectedCategoryIds,
      minPrice: filters.minPrice > 0 ? filters.minPrice : undefined,
      maxPrice: filters.maxPrice < 10_000_000 ? filters.maxPrice : undefined,
      inStock: filters.onlyInStock ? true : undefined,
    }),
    [currentPage, sortBy, debouncedSearch, selectedCategoryIds, filters],
  );

  const {
    data: pageData,
    isLoading,
    isError,
    refetch,
  } = useProductsQuery(queryParams, currentPage === 1 ? initialPageData : undefined);

  const totalPages = pageData?.totalPages ?? 1;
  const totalElements = pageData?.totalElements ?? 0;
  const products: ProductCardItem[] = useMemo(
    () => (pageData?.content ?? []).map(mapProductToCardItem),
    [pageData],
  );

  const filterCategories: CategoryFilterItem[] = useMemo(
    () =>
      categories.map((c) => ({
        id: c.id,
        name: c.categoryName ?? c.name ?? `Danh mục #${c.id}`,
        slug: c.slug ?? String(c.id),
        count: c.productCount ?? undefined,
      })),
    [categories],
  );

  const shownStart = totalElements === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const shownEnd = Math.min(currentPage * ITEMS_PER_PAGE, totalElements);
  const shownRange = `${shownStart}-${shownEnd}`;

  const handleAddToCart = (product: ProductCardItem) => {
    addCartItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      weight: product.unit ? `1 ${product.unit}` : undefined,
      quantity: 1,
    });
    toast.success(`Đã thêm "${product.name}" vào giỏ hàng!`);
  };

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
    setSearchQuery('');
    setCurrentPage(1);
  };

  return {
    viewMode,
    setViewMode,
    currentPage,
    setCurrentPage,
    totalPages,
    totalElements,
    shownRange,
    sortBy,
    setSortBy,
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    filterCategories,
    products,
    isLoading,
    isError,
    refetch,
    quickViewProduct,
    setQuickViewProduct,
    handleAddToCart,
    handleOpenQuickView: (p: ProductCardItem) => {
      setQuickViewProduct(mapToQuickView(p));
    },
    handleResetFilters,
  };
}
