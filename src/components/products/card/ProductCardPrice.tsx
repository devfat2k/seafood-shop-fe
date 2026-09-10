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
        <span className="font-heading text-base font-bold text-primary sm:text-lg">
          {formatCurrency(price)}
        </span>
        {unit && <span className="text-xs font-medium text-muted-foreground">/{unit}</span>}
      </div>
      {hasDiscount && originalPrice && (
        <span className="block text-xs text-muted-foreground line-through">
          {formatCurrency(originalPrice)}
        </span>
      )}
    </div>
  );
};
