'use client';

import { formatCurrency } from '@/utils/Helpers';

type ProductCardPriceProps = {
  price: number;
  originalPrice?: number;
  unit?: string;
};

export const ProductCardPrice = ({ price, originalPrice, unit }: ProductCardPriceProps) => {
  const hasDiscount = Boolean(originalPrice && originalPrice > price);

  return (
    <div>
      <div className="flex items-baseline gap-1">
        <span className="font-heading text-lg font-black text-primary tabular-nums sm:text-xl">
          {formatCurrency(price)}
        </span>
        <span className="text-xs font-medium text-muted-foreground">/{unit ?? 'kg'}</span>
      </div>
      {hasDiscount && originalPrice && (
        <span className="block text-xs text-muted-foreground/60 tabular-nums line-through">
          {formatCurrency(originalPrice)}
        </span>
      )}
    </div>
  );
};
