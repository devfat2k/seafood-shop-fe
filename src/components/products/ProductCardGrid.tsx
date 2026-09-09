'use client';

import { Icon } from '@/components/common/Icon';
import { Link } from '@/libs/I18nNavigation';
import { ProductCardImage } from './card/ProductCardImage';
import { ProductCardPrice } from './card/ProductCardPrice';
import type { ProductCardItem, ProductCardProps } from './productCardTypes';

export const ProductCardGrid = <T extends ProductCardItem>(props: ProductCardProps<T>) => {
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
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border/80 bg-card p-3.5 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-secondary/40 hover:shadow-xl hover:shadow-secondary/10 sm:p-4">
      <div>
        <ProductCardImage
          id={id}
          name={name}
          image={image}
          discountPercent={discountPercent}
          onQuickView={
            onQuickView
              ? () => {
                  onQuickView(product);
                }
              : undefined
          }
        />

        <div className="mt-3.5 space-y-1.5">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="truncate font-semibold text-secondary">{metaLabel}</span>
            {hasRating && (
              <div className="flex items-center gap-1 font-semibold text-foreground">
                <Icon name="star" size="xs" className="fill-accent text-accent" />
                <span>{rating}</span>
                {salesCount && <span className="text-muted-foreground">({salesCount})</span>}
              </div>
            )}
          </div>

          <Link href={`/products/${id}`} className="block">
            <h3 className="line-clamp-2 min-h-10 font-heading text-sm leading-snug font-bold text-foreground transition-colors group-hover:text-primary sm:text-base">
              {name}
            </h3>
          </Link>

          {specText && <p className="line-clamp-1 text-xs text-muted-foreground">{specText}</p>}
        </div>
      </div>

      <div className="mt-3.5 flex items-center justify-between border-t border-border/60 pt-3">
        <ProductCardPrice price={price} originalPrice={originalPrice} unit={unit} />

        {onAddToCart && (
          <button
            type="button"
            onClick={() => {
              onAddToCart(product);
            }}
            disabled={!isInStock}
            className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-200 ${
              isInStock
                ? 'cursor-pointer bg-primary text-white shadow-md shadow-primary/25 hover:scale-105 hover:bg-primary/90 active:scale-95'
                : 'cursor-not-allowed bg-muted text-muted-foreground/60 opacity-60'
            }`}
            aria-label={isInStock ? `Thêm ${name} vào giỏ hàng` : 'Tạm hết hàng'}
            title={isInStock ? 'Thêm vào giỏ' : 'Tạm hết hàng'}
          >
            <Icon name="shopping-bag" size="xs" />
          </button>
        )}
      </div>
    </div>
  );
};
