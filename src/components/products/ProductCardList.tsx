'use client';

import { Icon } from '@/components/common/Icon';
import { Link } from '@/libs/I18nNavigation';
import { ProductCardImage } from './card/ProductCardImage';
import { ProductCardPrice } from './card/ProductCardPrice';
import type { ProductCardItem, ProductCardProps } from './productCardTypes';

export const ProductCardList = <T extends ProductCardItem>(props: ProductCardProps<T>) => {
  const { product, onAddToCart, onQuickView } = props;
  const {
    id,
    name,
    price,
    originalPrice,
    unit,
    image,
    category,
    origin,
    spec,
    rating,
    salesCount,
    inStock,
  } = product;

  const isInStock = inStock !== false;
  const hasDiscount = Boolean(originalPrice && originalPrice > price);
  const discountPercent =
    hasDiscount && originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  const hasRating = typeof rating === 'number' && rating > 0;
  const metaLabel = category || (origin ? `Nguồn gốc: ${origin}` : 'Hải sản');
  const specText = spec ?? origin;

  return (
    <div className="group flex flex-col gap-4 rounded-2xl border border-border/60 bg-card p-3.5 shadow-[0_2px_8px_rgba(11,74,92,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-secondary/30 hover:shadow-[0_12px_24px_-4px_rgba(11,74,92,0.1)] sm:flex-row sm:items-center sm:p-4">
      <div className="w-full shrink-0 sm:w-44">
        <ProductCardImage
          id={id}
          name={name}
          image={image}
          origin={origin}
          discountPercent={discountPercent}
          onQuickView={
            onQuickView
              ? () => {
                  onQuickView(product);
                }
              : undefined
          }
        />
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="text-[11px] font-semibold tracking-wide text-secondary uppercase">
              {metaLabel}
            </span>
            {hasRating && (
              <div className="flex items-center gap-1 font-semibold text-foreground">
                <Icon name="star" size="xs" className="fill-accent text-accent" />
                <span className="text-xs">{rating}</span>
                {salesCount && (
                  <span className="text-[11px] text-muted-foreground">({salesCount} đánh giá)</span>
                )}
              </div>
            )}
          </div>

          <Link href={`/products/${id}`} className="mt-1.5 block">
            <h3 className="font-heading text-sm font-bold text-foreground transition-colors group-hover:text-primary sm:text-base">
              {name}
            </h3>
          </Link>

          {specText && (
            <p className="mt-1 line-clamp-2 text-xs text-muted-foreground/80">{specText}</p>
          )}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-1">
          <ProductCardPrice price={price} originalPrice={originalPrice} unit={unit} />

          <div className="flex items-center gap-2">
            {onQuickView && (
              <button
                type="button"
                onClick={() => {
                  onQuickView(product);
                }}
                className="flex items-center gap-1.5 rounded-xl border border-border/80 bg-card px-3 py-2 text-xs font-semibold text-foreground transition-all hover:bg-muted active:scale-95"
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
                disabled={!isInStock}
                className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold text-white shadow-xs transition-all ${
                  isInStock
                    ? 'cursor-pointer bg-primary hover:scale-105 hover:bg-primary/90 active:scale-95'
                    : 'cursor-not-allowed bg-muted text-muted-foreground/60 opacity-60'
                }`}
              >
                <Icon name="shopping-bag" size="xs" />
                <span>{isInStock ? 'Thêm vào giỏ' : 'Tạm hết'}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
