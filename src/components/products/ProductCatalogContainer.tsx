'use client';

import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { CartDrawer } from '@/components/cart/CartDrawer';
import type { CartItem } from '@/components/cart/CartDrawer';
import { Icon } from '@/components/common/Icon';
import type { ProductCardItem } from '@/components/products/ProductCard';
import { ProductCatalogGrid } from '@/components/products/ProductCatalogGrid';
import { ProductCatalogSkeleton } from '@/components/products/ProductCatalogSkeleton';
import type { CategoryPill } from '@/components/products/ProductHeaderBanner';
import { ProductHeaderBanner } from '@/components/products/ProductHeaderBanner';
import { ProductListToolbar } from '@/components/products/ProductListToolbar';
import { ProductPagination } from '@/components/products/ProductPagination';
import type { CategoryFilterItem, FilterState } from '@/components/products/ProductSidebarFilter';
import { ProductSidebarFilter } from '@/components/products/ProductSidebarFilter';
import type { QuickViewProduct } from '@/components/products/QuickViewModal';
import { QuickViewModal } from '@/components/products/QuickViewModal';
import { useCategoriesQuery } from '@/libs/queries/categories';
import { useProductsQuery } from '@/libs/queries/products';
import type { Category, PageResponse, Product } from '@/types/api';

const ITEMS_PER_PAGE = 9;

type ProductCatalogContainerProps = {
  initialPageData?: PageResponse<Product>;
  initialCategories?: Category[];
};

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

function mapProductToCardItem(p: Product): ProductCardItem {
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

export function ProductCatalogContainer(props: ProductCatalogContainerProps) {
  const { initialPageData, initialCategories } = props;

  // 1. Fetch categories dynamically from API
  const { data: categoriesData = [] } = useCategoriesQuery(initialCategories);

  // 2. Local filter states
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    minPrice: 0,
    maxPrice: 10_000_000,
    onlyInStock: false,
    fastShippingOnly: false,
    cleanPrepOnly: false,
  });

  // Selected category IDs lookup (handles both slug and direct ID)
  const selectedCategoryIds = useMemo(() => {
    if (filters.categories.length === 0) {
      return null;
    }
    const ids = filters.categories
      .map((catKey) => {
        const match = categoriesData.find(
          (c) => String(c.id) === catKey || (c.slug && c.slug === catKey),
        );
        return match ? match.id : Number(catKey);
      })
      .filter((id) => !Number.isNaN(id) && id > 0);

    return ids.length > 0 ? ids : null;
  }, [filters.categories, categoriesData]);

  // 3. Fetch products via React Query with API criteria
  const queryParams = useMemo(
    () => ({
      page: currentPage - 1,
      size: ITEMS_PER_PAGE,
      search: searchQuery.trim() || undefined,
      categoryId: selectedCategoryIds ?? undefined,
      minPrice: filters.minPrice > 0 ? filters.minPrice : undefined,
      maxPrice: filters.maxPrice < 10_000_000 ? filters.maxPrice : undefined,
      inStock: filters.onlyInStock ? true : undefined,
      sort: mapSortToApi(sortBy),
    }),
    [
      currentPage,
      searchQuery,
      selectedCategoryIds,
      filters.minPrice,
      filters.maxPrice,
      filters.onlyInStock,
      sortBy,
    ],
  );

  const {
    data: pageResponse,
    isLoading,
    isError,
    error,
    refetch,
  } = useProductsQuery(queryParams, initialPageData);

  // 4. Modal and Cart states
  const [quickViewProduct, setQuickViewProduct] = useState<QuickViewProduct | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Category List mapped for sidebar
  const categoryFilterList: CategoryFilterItem[] = useMemo(
    () =>
      categoriesData.map((c) => ({
        id: c.id,
        name: c.name ?? c.categoryName ?? `Danh mục #${c.id}`,
        slug: String(c.id),
        count: c.productCount ?? undefined,
      })),
    [categoriesData],
  );

  // Category Pills mapped for header banner
  const categoryPills: CategoryPill[] = useMemo(
    () =>
      categoriesData.map((c) => ({
        id: c.id,
        name: c.name ?? c.categoryName ?? `Danh mục #${c.id}`,
        slug: String(c.id),
      })),
    [categoriesData],
  );

  // Product cards mapping
  const productCards: ProductCardItem[] = useMemo(
    () => (pageResponse?.content ?? []).map(mapProductToCardItem),
    [pageResponse],
  );

  const totalPages = pageResponse?.totalPages ? Math.max(1, pageResponse.totalPages) : 1;
  const totalElements = pageResponse?.totalElements ?? productCards.length;
  const shownRange =
    totalElements > 0
      ? `${Math.min(1 + (currentPage - 1) * ITEMS_PER_PAGE, totalElements)} - ${Math.min(
          currentPage * ITEMS_PER_PAGE,
          totalElements,
        )}`
      : '0';

  const handleSelectQuickCategory = (slug: string) => {
    if (slug === 'all') {
      setFilters((prev) => ({ ...prev, categories: [] }));
    } else {
      setFilters((prev) => ({ ...prev, categories: [slug] }));
    }
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setFilters({
      categories: [],
      minPrice: 0,
      maxPrice: 10_000_000,
      onlyInStock: false,
      fastShippingOnly: false,
      cleanPrepOnly: false,
    });
    setCurrentPage(1);
  };

  const handleAddToCart = (product: ProductCardItem) => {
    if (product.inStock === false) {
      toast.error('Sản phẩm tạm hết hàng');
      return;
    }
    const newItem: CartItem = {
      id: `cart-${product.id}-${Date.now()}`,
      name: product.name,
      weight: product.spec ? `Quy cách: ${product.spec}` : 'Tươi sống nguyên con',
      price: product.price,
      quantity: 1,
      image: product.image ?? '',
    };
    setCartItems((prev) => [...prev, newItem]);
    setIsCartOpen(true);
    toast.success(`Đã thêm "${product.name}" vào giỏ!`, {
      description: `Đơn giá: ${product.price.toLocaleString('vi-VN')}₫`,
    });
  };

  const handleOpenQuickView = (product: ProductCardItem) => {
    setQuickViewProduct({
      id: product.id,
      name: product.name,
      badge: product.badges?.[0] ?? 'CẢNG PHAN THIẾT',
      price: `${product.price.toLocaleString('vi-VN')}₫`,
      originalPrice: product.originalPrice
        ? `${product.originalPrice.toLocaleString('vi-VN')}₫`
        : undefined,
      rating: product.rating ?? 4.9,
      reviewsCount: product.salesCount ?? 50,
      origin: product.origin ?? 'Cảng cá Phan Thiết, Bình Thuận',
      description:
        product.spec ??
        'Hải sản tươi sống bơi bể, đánh bắt rạng sáng từ biển đảo Phan Thiết. Đóng túi khí oxy chuyển lạnh 2H.',
      image: product.image ?? '',
      weights: ['500g / Khay', '1kg / Túi oxy', 'Combo 2kg'],
    });
  };

  const renderProductArea = () => {
    if (isLoading && !pageResponse) {
      return (
        <div className="mt-6">
          <ProductCatalogSkeleton />
        </div>
      );
    }

    if (isError && !pageResponse) {
      return (
        <div className="mt-6 flex flex-col items-center justify-center rounded-2xl border border-destructive/20 bg-destructive/5 p-12 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
            <Icon name="alert-triangle" size="md" />
          </div>
          <h3 className="mt-4 font-heading text-lg font-bold text-foreground">
            Không thể tải danh sách sản phẩm
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">
            {error?.message ?? 'Đã có lỗi xảy ra khi kết nối máy chủ.'}
          </p>
          <button
            type="button"
            onClick={() => void refetch()}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground shadow-xs hover:bg-primary/90"
          >
            <Icon name="refresh-cw" size="xs" />
            <span>Thử lại</span>
          </button>
        </div>
      );
    }

    return (
      <div className="mt-6">
        <ProductCatalogGrid
          products={productCards}
          viewMode={viewMode}
          onAddToCart={handleAddToCart}
          onQuickView={handleOpenQuickView}
          onResetFilters={handleResetFilters}
        />

        {/* Pagination */}
        {totalPages > 1 && (
          <ProductPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 320, behavior: 'smooth' });
            }}
          />
        )}
      </div>
    );
  };

  return (
    <div className="flex min-h-screen flex-col bg-background pb-16">
      {/* 1. Category Header Banner with 1-Click Category Rail & Integrated Search */}
      <ProductHeaderBanner
        totalProducts={totalElements}
        activeCategory={filters.categories[0] ?? 'all'}
        categoryList={categoryPills}
        searchQuery={searchQuery}
        onCategorySelect={handleSelectQuickCategory}
        onSearchChange={(q) => {
          setSearchQuery(q);
          setCurrentPage(1);
        }}
      />

      {/* 2. Main Content Layout */}
      <div className="mx-auto mt-6 w-full max-w-7xl px-4 sm:mt-10 sm:px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Desktop Sidebar Filter */}
          <div className="hidden lg:col-span-1 lg:block">
            <div className="sticky top-24">
              <ProductSidebarFilter
                filters={filters}
                categoryList={categoryFilterList}
                onFilterChange={(newFilters) => {
                  setFilters(newFilters);
                  setCurrentPage(1);
                }}
                onResetFilters={handleResetFilters}
              />
            </div>
          </div>

          {/* Product Grid / List Area */}
          <main className="lg:col-span-3">
            {/* Toolbar */}
            <ProductListToolbar
              totalCount={totalElements}
              shownRange={shownRange}
              sortBy={sortBy}
              viewMode={viewMode}
              onSortChange={(sort) => {
                setSortBy(sort);
                setCurrentPage(1);
              }}
              onViewModeChange={setViewMode}
              onToggleMobileFilter={() => {
                setIsMobileFilterOpen(true);
              }}
            />

            {/* Content States */}
            {renderProductArea()}
          </main>
        </div>
      </div>

      {/* Mobile Filter Sheet Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => {
              setIsMobileFilterOpen(false);
            }}
            aria-hidden="true"
          />
          <div className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-background p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <span className="font-heading text-base font-bold text-foreground">
                Bộ Lọc Hải Sản
              </span>
              <button
                type="button"
                onClick={() => {
                  setIsMobileFilterOpen(false);
                }}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-muted/80"
                aria-label="Đóng bộ lọc"
              >
                <Icon name="x" size="xs" />
              </button>
            </div>
            <div className="mt-4 flex-1">
              <ProductSidebarFilter
                filters={filters}
                categoryList={categoryFilterList}
                onFilterChange={(newFilters) => {
                  setFilters(newFilters);
                  setCurrentPage(1);
                }}
                onResetFilters={handleResetFilters}
              />
            </div>
            <div className="mt-6 border-t border-border pt-4">
              <button
                type="button"
                onClick={() => {
                  setIsMobileFilterOpen(false);
                }}
                className="w-full rounded-xl bg-primary py-3 text-xs font-bold text-primary-foreground shadow-md"
              >
                Xem {totalElements} sản phẩm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={quickViewProduct !== null}
        onClose={() => {
          setQuickViewProduct(null);
        }}
        onAddToCart={(p, weight, qty) => {
          const item: CartItem = {
            id: `cart-${p.id}-${Date.now()}`,
            name: p.name,
            weight: `Quy cách: ${weight}`,
            price: Number(p.price.replaceAll(/[^\d]/gu, '')) || 0,
            quantity: qty,
            image: p.image,
          };
          setCartItems((prev) => [...prev, item]);
          setIsCartOpen(true);
          toast.success(`Đã thêm ${qty}x "${p.name}" vào giỏ!`);
        }}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => {
          setIsCartOpen(false);
        }}
        initialItems={cartItems}
        onUpdateItems={(newItems) => {
          setCartItems(newItems);
        }}
      />
    </div>
  );
}
