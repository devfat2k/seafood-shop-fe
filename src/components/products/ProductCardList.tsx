'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Icon } from '@/components/common/Icon';
import { Link } from '@/libs/I18nNavigation';
import type { ProductCardItem, ProductCardProps } from './productCardTypes';
import { getBadgeStyle } from './productCardTypes';

export function ProductCardList<T extends ProductCardItem>(props: ProductCardProps<T>) {
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
    <div className="group flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 shadow-xs transition-all duration-300 hover:-translate-y-0.5 hover:border-secondary/40 hover:shadow-md sm:flex-row sm:items-center">
      {/* Left: Image Container */}
      <div className="relative aspect-square w-full shrink-0 overflow-hidden rounded-xl bg-muted/60 sm:w-48">
        <Link href={`/products/${product.id}`} className="relative block h-full w-full">
          {product.image && !imageError ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, 192px"
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

        {primaryBadge && (
          <div className="absolute top-2.5 left-2.5">
            <span
              className={`rounded-lg border px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase shadow-xs backdrop-blur-xs ${getBadgeStyle(primaryBadge).bg} ${getBadgeStyle(primaryBadge).text}`}
            >
              {primaryBadge}
            </span>
          </div>
        )}

        {discountPercent > 0 && (
          <span className="absolute top-2.5 right-2.5 rounded-lg bg-destructive px-1.5 py-0.5 text-[10px] font-bold text-white shadow-xs">
            -{discountPercent}%
          </span>
        )}
      </div>

      {/* Right: Content */}
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Nguồn gốc: {origin}</span>
            <div className="flex items-center gap-1 font-semibold text-foreground">
              <Icon name="star" size="xs" className="fill-amber-400 text-amber-400" />
              <span>{rating}</span>
              <span className="text-muted-foreground">({salesCount} đánh giá)</span>
            </div>
          </div>

          <Link href={`/products/${product.id}`} className="mt-1.5 block">
            <h3 className="font-heading text-sm font-bold text-foreground transition-colors group-hover:text-primary sm:text-base">
              {product.name}
            </h3>
          </Link>

          {product.spec && (
            <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{product.spec}</p>
          )}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border/60 pt-3">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-heading text-base font-bold text-primary sm:text-lg">
                {product.price.toLocaleString('vi-VN')}₫
              </span>
              {product.unit && (
                <span className="text-xs text-muted-foreground">/{product.unit}</span>
              )}
            </div>
            {originalPrice > product.price && (
              <span className="text-xs text-muted-foreground line-through">
                {originalPrice.toLocaleString('vi-VN')}₫
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {onQuickView && (
              <button
                type="button"
                onClick={() => {
                  onQuickView(product);
                }}
                className="flex items-center gap-1.5 rounded-xl border border-border px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-muted"
              >
                <Icon name="eye" size="xs" />
                <span>Xem nhanh</span>
              </button>
            )}

            {onAddToCart && (
              <button
                type="button"
                onClick={() => {
                  onAddToCart(product);
                }}
                disabled={product.inStock === false}
                className="flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-white shadow-sm transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Icon name="shopping-bag" size="xs" />
                <span>Thêm vào giỏ</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
