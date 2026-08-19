'use client';

import { useState } from 'react';
import { Icon } from '@/components/common/Icon';
import { ProductCard } from '@/components/products/ProductCard';
import { ProductCatalogEmpty } from '@/components/products/ProductCatalogEmpty';
import { ProductCatalogSkeleton } from '@/components/products/ProductCatalogSkeleton';
import { ProductHeaderBanner } from '@/components/products/ProductHeaderBanner';
import { ProductListToolbar } from '@/components/products/ProductListToolbar';
import { ProductPagination } from '@/components/products/ProductPagination';
import { ProductSidebarFilter } from '@/components/products/ProductSidebarFilter';
import { QuickViewModal } from '@/components/products/QuickViewModal';
import { useProductCatalogState } from '@/components/products/useProductCatalogState';
import type { Category, PageResponse, Product } from '@/types/api';

type ProductCatalogContainerProps = {
  initialPageData?: PageResponse<Product>;
  initialCategories?: Category[];
  initialCategory?: string;
  initialSearch?: string;
  initialPage?: number;
  initialSort?: string;
};

export const ProductCatalogContainer = (props: ProductCatalogContainerProps) => {
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const {
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
    handleOpenQuickView,
    handleResetFilters,
  } = useProductCatalogState(props.initialPageData, props.initialCategories, {
    initialCategory: props.initialCategory,
    initialSearch: props.initialSearch,
    initialPage: props.initialPage,
    initialSort: props.initialSort,
  });

  const renderProductsList = () => {
    if (isLoading) {
      return <ProductCatalogSkeleton />;
    }
    if (isError) {
      return (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-destructive/30 bg-destructive/5 py-16 text-center">
          <Icon name="alert-circle" size="xl" className="text-destructive" />
          <p className="mt-3 font-heading text-base font-bold text-destructive">
            Không thể tải danh sách sản phẩm
          </p>
          <button
            type="button"
            onClick={() => {
              void refetch();
            }}
            className="mt-4 rounded-xl bg-card px-5 py-2 text-xs font-bold text-foreground shadow-sm hover:bg-muted"
          >
            Thử lại
          </button>
        </div>
      );
    }
    if (products.length === 0) {
      return <ProductCatalogEmpty onReset={handleResetFilters} />;
    }
    return (
      <div
        className={
          viewMode === 'grid'
            ? 'grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3'
            : 'flex flex-col gap-4'
        }
      >
        {products.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            viewMode={viewMode}
            onAddToCart={handleAddToCart}
            onQuickView={handleOpenQuickView}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <ProductHeaderBanner
        totalProducts={totalElements}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="flex flex-col gap-8 lg:flex-row">
          <aside className="hidden w-64 shrink-0 lg:block">
            <ProductSidebarFilter
              categoryList={filterCategories}
              filters={filters}
              onFilterChange={(newFilters) => {
                setFilters(newFilters);
                setCurrentPage(1);
              }}
              onResetFilters={handleResetFilters}
            />
          </aside>

          <main className="flex-1 space-y-6">
            <ProductListToolbar
              totalCount={totalElements}
              shownRange={shownRange}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              sortBy={sortBy}
              onSortChange={setSortBy}
              onToggleMobileFilter={() => {
                setMobileFilterOpen(!mobileFilterOpen);
              }}
            />

            {mobileFilterOpen && (
              <div className="rounded-2xl border border-border bg-card p-4 lg:hidden">
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-heading text-sm font-bold text-foreground">Bộ Lọc</span>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileFilterOpen(false);
                    }}
                    className="text-xs text-muted-foreground hover:text-foreground"
                  >
                    Đóng
                  </button>
                </div>
                <ProductSidebarFilter
                  categoryList={filterCategories}
                  filters={filters}
                  onFilterChange={(newFilters) => {
                    setFilters(newFilters);
                    setCurrentPage(1);
                  }}
                  onResetFilters={handleResetFilters}
                />
              </div>
            )}

            {renderProductsList()}

            {totalPages > 1 && (
              <div className="pt-6">
                <ProductPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </main>
        </div>
      </div>

      <QuickViewModal
        product={quickViewProduct}
        isOpen={quickViewProduct !== null}
        onClose={() => {
          setQuickViewProduct(null);
        }}
      />
    </div>
  );
};
