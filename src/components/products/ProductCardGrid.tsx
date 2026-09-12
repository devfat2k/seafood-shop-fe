'use client';

import { Icon } from '@/components/common/Icon';
import { Link } from '@/libs/I18nNavigation';
import { ProductCardImage } from './card/ProductCardImage';
import { ProductCardPrice } from './card/ProductCardPrice';
import type { ProductCardItem, ProductCardProps } from './productCardTypes';

export const ProductCardGrid = <T extends ProductCardItem>(props: ProductCardProps<T>) => {
  const { product, onAddToCart, onQuickView } = props;
  const { id, name, price, originalPrice, unit, image, category, origin, rating, badges, inStock } =
    product;

  const isInStock = inStock !== false;
  const hasDiscount = Boolean(originalPrice && originalPrice > price);
  const discountPercent =
    hasDiscount && originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  const displayRating = typeof rating === 'number' && rating > 0 ? rating : 4.9;
  const metaCategory = category || 'Hải sản tươi sống';
  const cardBadge = isInStock ? (badges?.find((b) => b !== 'TẠM HẾT') ?? 'TƯƠI SỐNG') : 'TẠM HẾT';

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/70 bg-card p-4 shadow-[0_4px_16px_-4px_rgba(11,74,92,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:border-secondary/40 hover:shadow-[0_20px_40px_-10px_rgba(11,74,92,0.14)]">
      <div>
        <ProductCardImage
          id={id}
          name={name}
          image={image}
          badge={cardBadge}
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

        <div className="mt-3 space-y-1.5 px-1">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="truncate text-[11px] font-bold tracking-wider text-secondary uppercase">
              {metaCategory}
            </span>
            <div className="flex items-center gap-1 font-semibold text-foreground">
              <Icon name="star" size="xs" className="fill-accent text-accent" />
              <span className="text-xs font-bold">{displayRating}</span>
            </div>
          </div>

          <Link href={`/products/${id}`} className="block">
            <h3 className="line-clamp-2 min-h-10 font-sans text-sm leading-snug font-bold text-foreground transition-colors group-hover:text-primary sm:min-h-11 sm:text-[15px]">
              {name}
            </h3>
          </Link>
        </div>
      </div>

      <div className="mt-4 flex items-end justify-between px-1 pt-1">
        <ProductCardPrice price={price} originalPrice={originalPrice} unit={unit} />

        {onAddToCart && (
          <button
            type="button"
            onClick={() => {
              onAddToCart(product);
            }}
            disabled={!isInStock}
            className={`flex h-10 items-center justify-center gap-1.5 rounded-xl px-3 text-xs font-bold transition-all duration-200 ${
              isInStock
                ? 'cursor-pointer bg-primary text-white shadow-md shadow-primary/25 hover:scale-105 hover:bg-primary/90 active:scale-95'
                : 'cursor-not-allowed bg-muted text-muted-foreground/60 opacity-60'
            }`}
            aria-label={isInStock ? `Thêm ${name} vào giỏ hàng` : 'Tạm hết hàng'}
            title={isInStock ? 'Thêm vào giỏ' : 'Tạm hết hàng'}
          >
            <Icon name="shopping-bag" size="xs" />
            <span className="hidden sm:inline">{isInStock ? 'Chọn mua' : 'Tạm hết'}</span>
          </button>
        )}
      </div>
    </div>
  );
};
