'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Icon } from '@/components/common/Icon';
import { Link } from '@/libs/I18nNavigation';
import type { ProductCardItem, ProductCardProps } from './productCardTypes';
import { getBadgeStyle } from './productCardTypes';

export function ProductCardGrid<T extends ProductCardItem>(props: ProductCardProps<T>) {
  const { product, onAddToCart, onQuickView } = props;
  const [imageError, setImageError] = useState(false);

  const badges = product.badges ?? (product.inStock === false ? ['TẠM HẾT'] : ['TƯƠI SỐNG']);
  const rating = product.rating ?? 4.9;
  const salesCount = product.salesCount ?? 120;
  const origin = product.origin ?? 'Cảng cá Phan Thiết';
  const originalPrice = product.originalPrice ?? Math.round(product.price * 1.15);
  const discountPercent =
    originalPrice > product.price
      ? Math.round(((originalPrice - product.price) / originalPrice) * 100)
      : 0;

  const [primaryBadge] = badges;

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-3.5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-secondary/40 hover:shadow-md">
      <div>
        {/* Product Image Box with Floating Badges */}
        <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl bg-muted/60">
          <Link href={`/products/${product.id}`} className="relative block h-full w-full">
            {product.image && !imageError ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                unoptimized
                onError={() => {
                  setImageError(true);
                }}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center bg-linear-to-br from-secondary/5 to-muted text-muted-foreground/60">
                <Icon name="fish" size="xl" className="text-secondary/40" />
                <span className="mt-1 text-[10px] font-medium text-muted-foreground">
                  Hải sản tươi sống
                </span>
              </div>
            )}
          </Link>

          {/* Top-Left Floating Badge */}
          {primaryBadge && (
            <div className="absolute top-2.5 left-2.5">
              <span
                className={`rounded-lg border px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase shadow-xs backdrop-blur-xs ${getBadgeStyle(primaryBadge).bg} ${getBadgeStyle(primaryBadge).text}`}
              >
                {primaryBadge}
              </span>
            </div>
          )}

          {/* Top-Right Floating Discount */}
          {discountPercent > 0 && (
            <span className="absolute top-2.5 right-2.5 rounded-lg bg-destructive px-1.5 py-0.5 text-[10px] font-bold text-white shadow-xs">
              -{discountPercent}%
            </span>
          )}

          {/* Quick View Button on Hover */}
          {onQuickView && (
            <button
              type="button"
              onClick={() => {
                onQuickView(product);
              }}
              className="absolute right-2.5 bottom-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-card/90 text-foreground opacity-0 shadow-md backdrop-blur-xs transition-all duration-200 group-hover:opacity-100 hover:bg-card hover:text-secondary"
              aria-label="Xem nhanh sản phẩm"
            >
              <Icon name="eye" size="xs" />
            </button>
          )}
        </div>

        {/* Product Content */}
        <div className="mt-3 space-y-1.5">
          <div className="flex items-center justify-between text-[11px] text-muted-foreground">
            <span className="truncate">{origin}</span>
            <div className="flex items-center gap-1 font-semibold text-foreground">
              <Icon name="star" size="xs" className="fill-amber-400 text-amber-400" />
              <span>{rating}</span>
              <span className="text-muted-foreground">({salesCount})</span>
            </div>
          </div>

          <Link href={`/products/${product.id}`} className="block">
            <h3 className="line-clamp-2 min-h-10 font-heading text-xs font-bold text-foreground transition-colors group-hover:text-primary sm:text-sm">
              {product.name}
            </h3>
          </Link>

          {product.spec && (
            <p className="line-clamp-1 text-[11px] text-muted-foreground">{product.spec}</p>
          )}
        </div>
      </div>

      {/* Price & Add to cart button */}
      <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3">
        <div>
          <div className="flex items-baseline gap-1">
            <span className="font-heading text-sm font-bold text-primary sm:text-base">
              {product.price.toLocaleString('vi-VN')}₫
            </span>
            {product.unit && (
              <span className="text-[10px] text-muted-foreground">/{product.unit}</span>
            )}
          </div>
          {originalPrice > product.price && (
            <span className="block text-[11px] text-muted-foreground line-through">
              {originalPrice.toLocaleString('vi-VN')}₫
            </span>
          )}
        </div>

        {onAddToCart && (
          <button
            type="button"
            onClick={() => {
              onAddToCart(product);
            }}
            disabled={product.inStock === false}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white shadow-xs transition-all duration-200 hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Thêm vào giỏ hàng"
          >
            <Icon name="shopping-bag" size="xs" />
          </button>
        )}
      </div>
    </div>
  );
}
