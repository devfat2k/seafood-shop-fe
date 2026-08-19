'use client';

import { SearchEmptyView } from '@/components/search/SearchEmptyView';
import { SearchErrorView } from '@/components/search/SearchErrorView';
import { SearchFilterToolbar } from '@/components/search/SearchFilterToolbar';
import { SearchHeaderBar } from '@/components/search/SearchHeaderBar';
import { SearchProductCard } from '@/components/search/SearchProductCard';
import { SearchSkeleton } from '@/components/search/SearchSkeleton';
import { useSearchState } from '@/components/search/useSearchState';
import type { Product } from '@/types/api';

export const SearchContainer = () => {
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
          <SearchProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
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

        <div className="mt-8">{renderContent()}</div>
      </div>
    </div>
  );
};
