'use client';

import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import type { ProductCardItem } from '@/components/products/productCardTypes';
import type { CategoryFilterItem, FilterState } from '@/components/products/ProductSidebarFilter';
import type { QuickViewProduct } from '@/components/products/QuickViewModal';
import { useCategoriesQuery } from '@/libs/queries/categories';
import { useProductsQuery } from '@/libs/queries/products';
import { useCartStore } from '@/libs/stores/cart';
import type { Category, PageResponse, Product } from '@/types/api';

const ITEMS_PER_PAGE = 9;

function mapSortToApi(sortBy: string): string {
  if (sortBy === 'price-asc') {
    return 'price,asc';
  }
  if (sortBy === 'price-desc') {
    return 'price,desc';
  }
  if (sortBy === 'popular') {
    return 'createdAt,desc';
  }
  return 'createdAt,desc';
}

function getProductBadges(p: Product): string[] {
  if (p.featured) {
    return ['NỔI BẬT'];
  }
  if (p.stock > 0) {
    return ['TƯƠI SỐNG'];
  }
  return ['TẠM HẾT'];
}

export function mapProductToCardItem(p: Product): ProductCardItem {
  const categoryName = p.category?.categoryName ?? p.category?.name ?? p.categoryName ?? 'Hải Sản';
  const categorySlug = p.category?.slug ?? p.categorySlug ?? '';

  return {
    id: p.id,
    name: p.name,
    category: categoryName,
    categorySlug,
    badges: getProductBadges(p),
    spec: p.spec ?? p.description ?? '',
    price: p.price,
    originalPrice: p.originalPrice ?? Math.round(p.price * 1.15),
    unit: p.unit ?? 'kg',
    origin: p.origin ?? 'Cảng cá Phan Thiết',
    rating: p.rating ?? 4.9,
    salesCount: p.reviewCount ?? 120,
    inStock: p.active && p.stock > 0,
    image: p.imageUrl ?? p.images?.[0] ?? '',
  };
}

export const INITIAL_FILTERS: FilterState = {
  categories: [],
  minPrice: 0,
  maxPrice: 5_000_000,
  onlyInStock: false,
  fastShippingOnly: false,
  cleanPrepOnly: false,
};

export function useProductCatalogState(
  initialPageData?: PageResponse<Product>,
  initialCategories?: Category[],
) {
  const { addItem: addCartItem } = useCartStore();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('popular');
  const [quickViewProduct, setQuickViewProduct] = useState<QuickViewProduct | null>(null);
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);

  const { data: categories = [] } = useCategoriesQuery(initialCategories);

  const selectedCategoryIds = useMemo(() => {
    if (filters.categories.length === 0) {
      return null;
    }
    const ids: number[] = [];
    for (const slugOrId of filters.categories) {
      const match = categories.find((c) => c.slug === slugOrId || String(c.id) === slugOrId);
      if (match) {
        ids.push(match.id);
      }
    }
    return ids.length > 0 ? ids : null;
  }, [filters.categories, categories]);

  const queryParams = useMemo(
    () => ({
      page: currentPage - 1,
      size: ITEMS_PER_PAGE,
      sort: mapSortToApi(sortBy),
      categoryId: selectedCategoryIds ?? undefined,
      minPrice: filters.minPrice > 0 ? filters.minPrice : undefined,
      maxPrice: filters.maxPrice < 5_000_000 ? filters.maxPrice : undefined,
      inStock: filters.onlyInStock ? true : undefined,
    }),
    [currentPage, sortBy, filters, selectedCategoryIds],
  );

  const {
    data: pageData,
    isLoading,
    isError,
    refetch,
  } = useProductsQuery(
    queryParams,
    currentPage === 1 && !selectedCategoryIds && filters.minPrice === 0
      ? initialPageData
      : undefined,
  );

  const totalPages = pageData?.totalPages ?? 1;
  const totalElements = pageData?.totalElements ?? 0;
  const products: ProductCardItem[] = useMemo(
    () => (pageData?.content ?? []).map(mapProductToCardItem),
    [pageData],
  );

  const filterCategories: CategoryFilterItem[] = useMemo(
    () => [
      { id: 'all', name: 'Tất cả hải sản', slug: 'all', count: totalElements },
      ...categories.map((c) => ({
        id: c.id,
        name: c.name ?? c.categoryName ?? 'Danh mục',
        slug: c.slug ?? String(c.id),
        count: c.productCount ?? 0,
      })),
    ],
    [categories, totalElements],
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

  const handleOpenQuickView = (p: ProductCardItem) => {
    setQuickViewProduct({
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
    });
  };

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
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
    handleOpenQuickView,
    handleResetFilters,
  };
}
