'use client';

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
};

export function ProductCatalogContainer(props: ProductCatalogContainerProps) {
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
  } = useProductCatalogState(props.initialPageData, props.initialCategories);

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
      <ProductHeaderBanner />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Left Sidebar Filter */}
          <aside className="w-full shrink-0 lg:w-64">
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

          {/* Right Product Grid & Content */}
          <main className="flex-1">
            <ProductListToolbar
              totalCount={totalElements}
              shownRange={shownRange}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />

            {/* 3 UI States */}
            {renderProductsList()}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-10">
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

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={quickViewProduct !== null}
        onClose={() => {
          setQuickViewProduct(null);
        }}
      />
    </div>
  );
}
