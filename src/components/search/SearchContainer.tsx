'use client';

import Image from 'next/image';
import { toast } from 'sonner';
import { CartDrawer } from '@/components/cart/CartDrawer';
import type { CartItem } from '@/components/cart/CartDrawer';
import { Icon } from '@/components/common/Icon';
import { SearchFilterToolbar } from '@/components/search/SearchFilterToolbar';
import { SearchHeaderBar } from '@/components/search/SearchHeaderBar';
import { useSearchState } from '@/components/search/useSearchState';
import { Link } from '@/libs/I18nNavigation';
import type { Product } from '@/types/api';

const HOT_SEARCH_SUGGESTIONS = [
  'Tôm hùm Phan Thiết',
  'Cua Cà Mau',
  'Cá thu một nắng',
  'Mực lá tươi',
  'Ngao 2 vòi',
  'Bạch tuộc bơi',
];

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

type SearchErrorViewProps = {
  errorMessage?: string;
  onRetry: () => void;
};

function SearchErrorView({ errorMessage, onRetry }: SearchErrorViewProps) {
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
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-xs font-bold text-primary-foreground shadow-xs hover:bg-primary/90"
      >
        <Icon name="refresh-cw" size="xs" />
        <span>Thử lại</span>
      </button>
    </div>
  );
}

type SearchEmptyViewProps = {
  queryParam: string;
  hasActiveFilters: boolean;
  onSearchSubmit: (query: string) => void;
  onResetAll: () => void;
};

function SearchEmptyView({
  queryParam,
  hasActiveFilters,
  onSearchSubmit,
  onResetAll,
}: SearchEmptyViewProps) {
  return (
    <div className="mx-auto flex min-h-[55vh] max-w-xl flex-col items-center justify-center rounded-3xl border border-border bg-card px-6 py-12 text-center shadow-xs">
      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
        <Icon name="fish" size="xl" />
      </div>
      <h3 className="mt-4 font-heading text-xl font-bold text-foreground sm:text-2xl">
        Không tìm thấy hải sản phù hợp
      </h3>
      {queryParam ? (
        <p className="mt-2 text-xs text-muted-foreground sm:text-sm">
          Rất tiếc, chúng tôi không tìm thấy kết quả nào phù hợp với từ khóa &quot;
          <strong className="text-foreground">{queryParam}</strong>&quot;.
        </p>
      ) : (
        <p className="mt-2 text-xs text-muted-foreground sm:text-sm">
          Hiện tại không có sản phẩm nào thuộc bộ lọc bạn đã chọn.
        </p>
      )}

      {/* Hot keyword suggestions */}
      <div className="mt-6 w-full rounded-2xl border border-border bg-background p-4">
        <span className="mb-2 block text-xs font-bold text-foreground">
          Gợi ý các loại hải sản tươi hot hôm nay:
        </span>
        <div className="flex flex-wrap justify-center gap-2">
          {HOT_SEARCH_SUGGESTIONS.map((kw) => (
            <button
              key={kw}
              type="button"
              onClick={() => {
                onSearchSubmit(kw);
              }}
              className="rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground shadow-2xs transition-all hover:border-secondary hover:text-secondary"
            >
              {kw}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onResetAll}
            className="rounded-xl border border-border bg-background px-5 py-2.5 text-xs font-bold text-foreground hover:bg-muted"
          >
            Xoá tất cả từ khóa &amp; bộ lọc
          </button>
        )}
        <Link
          href="/products"
          className="inline-flex items-center gap-2 rounded-xl bg-secondary px-6 py-2.5 text-xs font-bold text-secondary-foreground shadow-md hover:bg-secondary/90"
        >
          <span>Khám phá tất cả hải sản</span>
          <Icon name="arrow-right" size="xs" />
        </Link>
      </div>
    </div>
  );
}

type SearchProductGridProps = {
  products: Product[];
  onAddToCart: (item: CartItem) => void;
};

function SearchProductGrid({ products, onAddToCart }: SearchProductGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
      {products.map((product) => {
        const imgUrl = product.imageUrl ?? product.images?.[0] ?? '';
        const originalPrice = product.originalPrice ?? Math.round(product.price * 1.15);

        return (
          <div
            key={product.id}
            className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-secondary/40 hover:shadow-md"
          >
            {/* Image Container */}
            <div className="relative aspect-square w-full overflow-hidden bg-muted">
              <Link href={`/products/${product.id}`} className="relative block h-full w-full">
                {imgUrl ? (
                  <Image
                    src={imgUrl}
                    alt={product.name}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                    <Icon name="fish" size="lg" />
                  </div>
                )}
              </Link>
              {product.featured && (
                <span className="absolute top-2.5 left-2.5 rounded-full bg-accent px-2.5 py-0.5 text-[9px] font-bold text-accent-foreground uppercase shadow-xs">
                  NỔI BẬT
                </span>
              )}
            </div>

            {/* Product Details */}
            <div className="flex flex-1 flex-col justify-between p-4">
              <div>
                <span className="text-[10px] font-bold text-secondary uppercase">
                  {product.categoryName ?? 'Hải sản tươi sống'}
                </span>
                <h3 className="mt-1 line-clamp-2 min-h-[38px] font-heading text-xs font-bold text-foreground transition-colors group-hover:text-primary sm:text-sm">
                  <Link href={`/products/${product.id}`}>{product.name}</Link>
                </h3>
                <div className="mt-1.5 flex items-center gap-1.5 text-[11px]">
                  <span
                    className={`font-bold ${product.stock > 0 ? 'text-tertiary' : 'text-destructive'}`}
                  >
                    {product.stock > 0 ? 'Còn hàng bến' : 'Tạm hết'}
                  </span>
                  <span className="text-muted-foreground">• Phan Thiết</span>
                </div>
              </div>

              {/* Price & Actions */}
              <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3">
                <div>
                  {originalPrice > product.price && (
                    <span className="block text-[11px] text-muted-foreground line-through">
                      {originalPrice.toLocaleString('vi-VN')}₫
                    </span>
                  )}
                  <span className="font-heading text-sm font-bold text-primary sm:text-base">
                    {product.price.toLocaleString('vi-VN')}₫
                  </span>
                </div>

                <button
                  type="button"
                  disabled={product.stock <= 0}
                  onClick={() => {
                    onAddToCart({
                      id: product.id,
                      name: product.name,
                      weight: 'Quy cách chuẩn',
                      price: product.price,
                      quantity: 1,
                      image: imgUrl,
                    });
                  }}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all hover:bg-primary hover:text-primary-foreground disabled:opacity-40"
                  aria-label={`Thêm ${product.name} vào giỏ hàng`}
                  title="Thêm vào giỏ hàng"
                >
                  <Icon name="shopping-cart" size="xs" />
                </button>
              </div>
            </div>
          </div>
        );
      })}
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
    isCartOpen,
    setIsCartOpen,
    cartItems,
    setCartItems,
    updateUrlParams,
    resetAll,
  } = useSearchState();

  const handleAddToCart = (item: CartItem) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i,
        );
      }
      return [...prev, item];
    });
    toast.success(`Đã thêm "${item.name}" vào giỏ hàng!`);
  };

  const hasActiveFilters = Boolean(queryParam ?? selectedCategoryId ?? priceRangeParam !== 'all');

  return (
    <div className="min-h-screen bg-background py-8 sm:py-12">
      <div className="mx-auto max-w-7xl space-y-8 px-4 sm:px-6">
        <SearchHeaderBar
          initialQuery={queryParam}
          totalResults={totalElements}
          onSearchSubmit={(newQuery) => {
            updateUrlParams({ q: newQuery || undefined });
          }}
        />

        <SearchFilterToolbar
          categories={categories}
          selectedCategoryId={selectedCategoryId}
          selectedPriceRange={priceRangeParam}
          selectedSort={sortParam}
          onCategoryChange={(catId) => {
            updateUrlParams({ category: catId ? String(catId) : undefined });
          }}
          onPriceRangeChange={(range) => {
            updateUrlParams({ priceRange: range === 'all' ? undefined : range });
          }}
          onSortChange={(sort) => {
            updateUrlParams({ sort: sort === 'newest' ? undefined : sort });
          }}
          onResetFilters={() => {
            updateUrlParams({ category: undefined, priceRange: undefined, sort: undefined });
          }}
        />

        {isLoading && <SearchSkeleton />}

        {!isLoading && isError && (
          <SearchErrorView
            errorMessage={error?.message}
            onRetry={() => {
              void refetch();
            }}
          />
        )}

        {!isLoading && !isError && products.length === 0 && (
          <SearchEmptyView
            queryParam={queryParam}
            hasActiveFilters={hasActiveFilters}
            onSearchSubmit={(newQuery) => {
              updateUrlParams({ q: newQuery || undefined });
            }}
            onResetAll={resetAll}
          />
        )}

        {!isLoading && !isError && products.length > 0 && (
          <SearchProductGrid products={products} onAddToCart={handleAddToCart} />
        )}
      </div>

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
