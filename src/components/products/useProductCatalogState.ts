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

const ITEMS_PER_PAGE = 9;

function getProductBadges(p: Product): string[] {
  if (p.featured) {
    return ['NỔI BẬT'];
  }
  if ((p.stock ?? 0) > 0) {
    return ['TƯƠI SỐNG'];
  }
  return ['TẠM HẾT'];
}

function getCategoryInfo(p: Product): { name: string; slug: string } {
  const name = p.category?.categoryName ?? p.category?.name ?? p.categoryName ?? 'Hải Sản';
  const slug = p.category?.slug ?? p.categorySlug ?? '';
  return { name, slug };
}

export function mapProductToCardItem(p: Product): ProductCardItem {
  const cat = getCategoryInfo(p);
  const price = p.price ?? 0;
  const originalPrice = p.originalPrice ?? Math.round(price * 1.15);
  const image = p.imageUrl ?? p.images?.[0] ?? '';

  return {
    id: p.id,
    name: p.name,
    category: cat.name,
    categorySlug: cat.slug,
    badges: getProductBadges(p),
    spec: p.spec ?? p.description ?? '',
    price,
    originalPrice,
    unit: p.unit ?? 'kg',
    origin: p.origin ?? 'Cảng cá Phan Thiết',
    rating: p.rating ?? 4.9,
    salesCount: p.reviewCount ?? 120,
    inStock: (p.active ?? true) && (p.stock ?? 0) > 0,
    image,
  };
}

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

function resolveCategoryIds(categoryKeys: string[], categories: Category[]): number[] | undefined {
  if (categoryKeys.length === 0) {
    return undefined;
  }
  const ids: number[] = [];
  for (const key of categoryKeys) {
    const parsed = Number(key);
    if (!Number.isNaN(parsed) && parsed > 0) {
      ids.push(parsed);
    } else {
      const found = categories.find((c) => c.slug === key);
      if (found) {
        ids.push(found.id);
      }
    }
  }
  return ids.length > 0 ? ids : undefined;
}

function mapToQuickView(p: ProductCardItem): QuickViewProduct {
  return {
    id: String(p.id),
    name: p.name,
    badge: p.badges?.[0] ?? 'CẢNG PHAN THIẾT',
    price: `${p.price.toLocaleString('vi-VN')}₫`,
    originalPrice: p.originalPrice ? `${p.originalPrice.toLocaleString('vi-VN')}₫` : undefined,
    rating: p.rating ?? 4.9,
    reviewsCount: p.salesCount ?? 120,
    origin: p.origin ?? 'Cảng cá Phan Thiết',
    description: p.spec ?? 'Hải sản tươi sống loại 1 cập bến mỗi sáng.',
    image: p.image ?? '',
    weights: p.unit ? [`1 ${p.unit}`, `2 ${p.unit}`] : ['500g', '1kg'],
  };
}

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
