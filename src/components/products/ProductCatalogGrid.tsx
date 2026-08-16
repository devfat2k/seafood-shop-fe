'use client';

import { Icon } from '@/components/common/Icon';
import type { ProductCardItem } from '@/components/products/ProductCard';
import { ProductCard } from '@/components/products/ProductCard';

type ProductCatalogGridProps<T extends ProductCardItem = ProductCardItem> = {
  products: T[];
  viewMode?: 'grid' | 'list';
  onResetFilters?: () => void;
  onAddToCart?: (product: T) => void;
  onQuickView?: (product: T) => void;
  onSelectSuggestion?: (query: string) => void;
};

const SUGGESTIONS = ['Tôm hùm bông', 'Cua huỳnh đế', 'Mực lá mi nơ', 'Cá bớp tươi'];

export function ProductCatalogGrid<T extends ProductCardItem>(props: ProductCatalogGridProps<T>) {
  const {
    products,
    viewMode = 'grid',
    onResetFilters,
    onAddToCart,
    onQuickView,
    onSelectSuggestion,
  } = props;

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-border bg-card p-8 py-16 text-center shadow-xs sm:p-12">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary/10 text-secondary shadow-xs">
          <Icon name="waves" size="xl" />
        </div>
        <h3 className="mt-4 font-heading text-xl font-bold text-foreground sm:text-2xl">
          Không Tìm Thấy Hải Sản Phù Hợp
        </h3>
        <p className="mt-2 max-w-md text-xs leading-relaxed text-muted-foreground sm:text-sm">
          Rất tiếc, không có sản phẩm nào khớp với tiêu chí tìm kiếm hoặc bộ lọc hiện tại của bạn.
          Hãy thử tìm kiếm với các từ khóa gợi ý phổ biến bên dưới hoặc xóa bộ lọc.
        </p>

        {/* Suggestions */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs font-semibold text-muted-foreground">Gợi ý tìm kiếm:</span>
          {SUGGESTIONS.map((sug, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onSelectSuggestion?.(sug)}
              className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-foreground transition-colors hover:border-secondary hover:text-secondary"
            >
              {sug}
            </button>
          ))}
        </div>

        {onResetFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-xs font-bold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 active:scale-95 sm:text-sm"
          >
            <Icon name="refresh-cw" size="xs" />
            <span>Xóa Tất Cả Bộ Lọc</span>
          </button>
        )}
      </div>
    );
  }

  if (viewMode === 'list') {
    return (
      <div className="flex flex-col gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            viewMode="list"
            onAddToCart={onAddToCart}
            onQuickView={onQuickView}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          viewMode="grid"
          onAddToCart={onAddToCart}
          onQuickView={onQuickView}
        />
      ))}
    </div>
  );
}
