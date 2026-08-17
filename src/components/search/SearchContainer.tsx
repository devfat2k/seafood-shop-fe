'use client';

import Image from 'next/image';
import { Icon } from '@/components/common/Icon';
import { SearchEmptyView } from '@/components/search/SearchEmptyView';
import { SearchFilterToolbar } from '@/components/search/SearchFilterToolbar';
import { SearchHeaderBar } from '@/components/search/SearchHeaderBar';
import { useSearchState } from '@/components/search/useSearchState';
import { Link } from '@/libs/I18nNavigation';
import type { Product } from '@/types/api';

function SearchSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, idx) => (
        <div
          key={idx}
          className="flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-4 shadow-xs"
        >
          <div className="aspect-square w-full animate-pulse rounded-xl bg-muted" />
          <div className="mt-4 space-y-2">
            <div className="h-3 w-1/3 animate-pulse rounded-md bg-muted" />
            <div className="h-4 w-3/4 animate-pulse rounded-md bg-muted" />
            <div className="h-4 w-1/2 animate-pulse rounded-md bg-muted" />
          </div>
          <div className="mt-6 flex items-center justify-between border-t border-border/60 pt-3">
            <div className="h-5 w-24 animate-pulse rounded-md bg-muted" />
            <div className="h-9 w-9 animate-pulse rounded-lg bg-muted" />
          </div>
        </div>
      ))}
    </div>
  );
}

function SearchErrorView({
  errorMessage,
  onRetry,
}: {
  errorMessage?: string;
  onRetry: () => void;
}) {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-md flex-col items-center justify-center rounded-3xl border border-border bg-card px-6 py-12 text-center shadow-xs">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
        <Icon name="alert-triangle" size="md" />
      </div>
      <h3 className="mt-4 font-heading text-xl font-bold text-foreground">
        Không thể tải kết quả tìm kiếm
      </h3>
      <p className="mt-2 text-xs text-muted-foreground">
        {errorMessage ?? 'Đã có lỗi xảy ra khi kết nối máy chủ.'}
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-primary/90"
      >
        <Icon name="refresh-cw" size="xs" />
        <span>Thử lại</span>
      </button>
    </div>
  );
}

export function SearchContainer() {
  const {
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
  } = useSearchState();

  const hasActiveFilters =
    Boolean(selectedCategoryId) || priceRangeParam !== 'all' || sortParam !== 'newest';

  const renderContent = () => {
    if (isLoading) {
      return <SearchSkeleton />;
    }
    if (isError) {
      return (
        <SearchErrorView
          errorMessage={error?.message}
          onRetry={() => {
            void refetch();
          }}
        />
      );
    }
    if (products.length === 0) {
      return (
        <SearchEmptyView
          queryParam={queryParam}
          hasActiveFilters={hasActiveFilters}
          onSearchSubmit={(val) => {
            updateUrlParams({ q: val });
          }}
          onResetAll={resetAll}
        />
      );
    }
    return (
      <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {products.map((product: Product) => (
          <div
            key={product.id}
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-3.5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-secondary/40 hover:shadow-lg sm:p-4"
          >
            <div>
              <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-muted">
                <Link href={`/products/${product.id}`} className="relative block h-full w-full">
                  {product.imageUrl ? (
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                      <Icon name="fish" size="lg" />
                    </div>
                  )}
                </Link>
              </div>

              <div className="mt-3 space-y-1">
                <span className="text-[11px] font-semibold text-secondary">
                  {product.category?.name ?? 'Hải sản'}
                </span>
                <Link href={`/products/${product.id}`} className="block">
                  <h3 className="line-clamp-2 font-heading text-xs font-bold text-foreground transition-colors group-hover:text-primary sm:text-sm">
                    {product.name}
                  </h3>
                </Link>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3">
              <span className="font-heading text-sm font-bold text-primary sm:text-base">
                {product.price.toLocaleString('vi-VN')}₫
              </span>
              <button
                type="button"
                onClick={() => {
                  handleAddToCart(product);
                }}
                className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-white shadow-xs transition-transform hover:scale-105 active:scale-95 sm:h-9 sm:w-9"
                aria-label="Thêm vào giỏ"
              >
                <Icon name="shopping-bag" size="xs" />
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SearchHeaderBar
          initialQuery={queryParam}
          totalResults={totalElements}
          onSearchSubmit={(val) => {
            updateUrlParams({ q: val });
          }}
        />

        <div className="mt-8">
          <SearchFilterToolbar
            categories={categories}
            selectedCategoryId={selectedCategoryId}
            selectedPriceRange={priceRangeParam}
            selectedSort={sortParam}
            onCategoryChange={(id) => {
              updateUrlParams({ category: id === undefined ? undefined : String(id) });
            }}
            onPriceRangeChange={(range) => {
              updateUrlParams({ priceRange: range });
            }}
            onSortChange={(sort) => {
              updateUrlParams({ sort });
            }}
            onResetFilters={resetAll}
          />
        </div>

        {/* 3 UI States */}
        <div className="mt-8">{renderContent()}</div>
      </div>
    </div>
  );
}
