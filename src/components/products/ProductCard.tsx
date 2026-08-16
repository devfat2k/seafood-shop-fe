'use client';

import Image from 'next/image';
import { Icon } from '@/components/common/Icon';
import { Link } from '@/libs/I18nNavigation';

export type ProductCardItem = {
  id: string | number;
  name: string;
  category: string;
  categorySlug?: string;
  badges?: string[];
  spec?: string;
  price: number;
  originalPrice?: number;
  unit?: string;
  image?: string;
  origin?: string;
  rating?: number;
  salesCount?: number;
  inStock?: boolean;
};

type ProductCardProps<T extends ProductCardItem = ProductCardItem> = {
  product: T;
  viewMode?: 'grid' | 'list';
  onAddToCart?: (product: T) => void;
  onQuickView?: (product: T) => void;
};

function getBadgeStyle(badge: string): { bg: string; text: string } {
  if (badge.includes('🟢') || badge.includes('Còn hàng') || badge.includes('TƯƠI SỐNG')) {
    return { bg: 'bg-tertiary/15 border-tertiary/30', text: 'text-tertiary' };
  }
  if (badge.includes('HOT') || badge.includes('BÁN CHẠY')) {
    return { bg: 'bg-primary/15 border-primary/30', text: 'text-primary' };
  }
  if (badge.includes('SALE') || badge.includes('Giảm') || badge.includes('Nổi bật')) {
    return { bg: 'bg-accent/20 border-accent/40', text: 'text-accent' };
  }
  return { bg: 'bg-secondary/15 border-secondary/30', text: 'text-secondary' };
}

function ProductCardList<T extends ProductCardItem>(props: ProductCardProps<T>) {
  const { product, onAddToCart, onQuickView } = props;
  const badges = product.badges ?? (product.inStock === false ? ['TẠM HẾT'] : ['TƯƠI SỐNG']);
  const rating = product.rating ?? 4.9;
  const salesCount = product.salesCount ?? 120;
  const origin = product.origin ?? 'Cảng cá Phan Thiết';
  const originalPrice = product.originalPrice ?? Math.round(product.price * 1.15);
  const discountPercent =
    originalPrice > product.price
      ? Math.round(((originalPrice - product.price) / originalPrice) * 100)
      : 0;

  return (
    <div className="group flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 shadow-xs transition-all duration-300 hover:-translate-y-0.5 hover:border-secondary/40 hover:shadow-md sm:flex-row sm:items-center">
      {/* Left: Image Container */}
      <div className="relative aspect-square w-full shrink-0 overflow-hidden rounded-xl bg-muted sm:w-48">
        <Link href={`/products/${product.id}`} className="relative block h-full w-full">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              loading="lazy"
              unoptimized
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
              <Icon name="fish" size="lg" />
            </div>
          )}
        </Link>

        {badges.length > 0 && (
          <div className="pointer-events-none absolute top-2 left-2 z-10 flex flex-col gap-1">
            {badges.slice(0, 2).map((badge, idx) => {
              const style = getBadgeStyle(badge);
              return (
                <span
                  key={idx}
                  className={`rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase shadow-xs ${style.bg} ${style.text}`}
                >
                  {badge}
                </span>
              );
            })}
          </div>
        )}

        {onQuickView && (
          <button
            type="button"
            onClick={() => {
              onQuickView(product);
            }}
            className="absolute right-2 bottom-2 flex h-8 w-8 items-center justify-center rounded-full bg-foreground/75 text-white opacity-0 backdrop-blur-md transition-all group-hover:opacity-100 hover:scale-110 hover:bg-secondary"
            aria-label={`Xem nhanh ${product.name}`}
            title="Xem nhanh"
          >
            <Icon name="eye" size="xs" />
          </button>
        )}
      </div>

      {/* Center: Info */}
      <div className="flex flex-1 flex-col justify-between space-y-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold tracking-wider text-secondary uppercase">
              {product.category}
            </span>
            <span className="text-muted-foreground">•</span>
            <span className="text-[11px] text-muted-foreground">{origin}</span>
          </div>

          <h3 className="mt-1 font-heading text-base font-bold text-foreground transition-colors hover:text-primary sm:text-lg">
            <Link href={`/products/${product.id}`}>{product.name}</Link>
          </h3>

          {product.spec && (
            <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{product.spec}</p>
          )}
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1 text-accent">
            <Icon name="star" size="xs" />
            <span className="font-bold text-foreground">{rating}</span>
          </div>
          <span className="text-muted-foreground">|</span>
          <span className="text-muted-foreground">Đã bán {salesCount}+</span>
        </div>
      </div>

      {/* Right: Price & CTA */}
      <div className="flex flex-row items-center justify-between border-t border-border/60 pt-3 sm:flex-col sm:items-end sm:justify-center sm:border-t-0 sm:border-l sm:pt-0 sm:pl-6">
        <div className="text-left sm:text-right">
          {originalPrice > product.price && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground line-through">
                {originalPrice.toLocaleString('vi-VN')}₫
              </span>
              <span className="rounded bg-destructive/10 px-1.5 py-0.5 text-[10px] font-bold text-destructive">
                -{discountPercent}%
              </span>
            </div>
          )}
          <p className="font-heading text-lg font-bold text-primary sm:text-xl">
            {product.price.toLocaleString('vi-VN')}₫
          </p>
          {product.unit && (
            <span className="text-[11px] text-muted-foreground">/ {product.unit}</span>
          )}
        </div>

        <div className="mt-2 flex items-center gap-2">
          {onAddToCart && (
            <button
              type="button"
              onClick={() => {
                onAddToCart(product);
              }}
              className="flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-xs transition-all hover:bg-primary/90 active:scale-95"
            >
              <Icon name="shopping-cart" size="xs" />
              <span>Thêm giỏ</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function ProductCardGrid<T extends ProductCardItem>(props: ProductCardProps<T>) {
  const { product, onAddToCart, onQuickView } = props;
  const badges = product.badges ?? (product.inStock === false ? ['TẠM HẾT'] : ['TƯƠI SỐNG']);
  const rating = product.rating ?? 4.9;
  const salesCount = product.salesCount ?? 120;
  const origin = product.origin ?? 'Cảng cá Phan Thiết';
  const originalPrice = product.originalPrice ?? Math.round(product.price * 1.15);

  return (
    <div className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-3.5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-secondary/40 hover:shadow-md sm:p-4">
      <div>
        {/* Image Container */}
        <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-muted">
          <Link href={`/products/${product.id}`} className="relative block h-full w-full">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                loading="lazy"
                unoptimized
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
                <Icon name="fish" size="lg" />
              </div>
            )}
          </Link>

          {/* Badges */}
          {badges.length > 0 && (
            <div className="pointer-events-none absolute top-2 left-2 z-10 flex flex-col gap-1">
              {badges.slice(0, 2).map((badge, idx) => {
                const style = getBadgeStyle(badge);
                return (
                  <span
                    key={idx}
                    className={`rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase shadow-xs ${style.bg} ${style.text}`}
                  >
                    {badge}
                  </span>
                );
              })}
            </div>
          )}

          {/* Quick View Button */}
          {onQuickView && (
            <button
              type="button"
              onClick={() => {
                onQuickView(product);
              }}
              className="absolute right-2 bottom-2 flex h-8 w-8 items-center justify-center rounded-full bg-foreground/75 text-white opacity-0 backdrop-blur-md transition-all group-hover:opacity-100 hover:scale-110 hover:bg-secondary"
              aria-label={`Xem nhanh ${product.name}`}
              title="Xem nhanh"
            >
              <Icon name="eye" size="xs" />
            </button>
          )}
        </div>

        {/* Info */}
        <div className="mt-3">
          <div className="flex items-center justify-between gap-1">
            <span className="text-[10px] font-bold tracking-wider text-secondary uppercase">
              {product.category}
            </span>
            <span className="max-w-[110px] truncate text-[10px] text-muted-foreground">
              {origin}
            </span>
          </div>

          <h3 className="mt-1 line-clamp-2 min-h-[38px] font-heading text-sm font-bold text-foreground transition-colors group-hover:text-primary">
            <Link href={`/products/${product.id}`}>{product.name}</Link>
          </h3>

          <div className="mt-1.5 flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-1 text-accent">
              <Icon name="star" size="xs" />
              <span className="font-bold text-foreground">{rating}</span>
            </div>
            <span className="text-muted-foreground">Đã bán {salesCount}+</span>
          </div>
        </div>
      </div>

      {/* Pricing & Add to Cart Footer */}
      <div className="mt-3 border-t border-border/60 pt-3">
        <div className="flex items-end justify-between gap-2">
          <div>
            {originalPrice > product.price && (
              <span className="block text-[11px] text-muted-foreground line-through">
                {originalPrice.toLocaleString('vi-VN')}₫
              </span>
            )}
            <div className="flex items-baseline gap-1">
              <span className="font-heading text-base font-bold text-primary sm:text-lg">
                {product.price.toLocaleString('vi-VN')}₫
              </span>
              {product.unit && (
                <span className="text-[10px] text-muted-foreground">/{product.unit}</span>
              )}
            </div>
          </div>

          {onAddToCart && (
            <button
              type="button"
              onClick={() => {
                onAddToCart(product);
              }}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all hover:bg-primary hover:text-primary-foreground active:scale-95"
              aria-label={`Thêm ${product.name} vào giỏ hàng`}
              title="Thêm vào giỏ"
            >
              <Icon name="shopping-cart" size="sm" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export function ProductCard<T extends ProductCardItem>(props: ProductCardProps<T>) {
  if (props.viewMode === 'list') {
    return <ProductCardList {...props} />;
  }
  return <ProductCardGrid {...props} />;
}
