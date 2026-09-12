'use client';

import Image from 'next/image';
import { Icon } from '@/components/common/Icon';
import { useProductPurchase } from '@/components/product-detail/useProductPurchase';
import type { Product } from '@/types/api';
import { formatCurrency } from '@/utils/Helpers';

type ProductMobileStickyBarProps = {
  product: Product;
};

export function ProductMobileStickyBar({ product }: ProductMobileStickyBarProps) {
  const { currentPrice, isInStock, handleAddToCart, handleBuyNow } = useProductPurchase(product);
  const image = product.imageUrl ?? product.images?.[0] ?? '';

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border/80 bg-card/95 p-3 pb-4 shadow-[0_-4px_24px_rgba(0,0,0,0.08)] backdrop-blur-md lg:hidden">
      <div className="mx-auto flex max-w-lg items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          {image ? (
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-border bg-muted">
              <Image src={image} alt={product.name} fill unoptimized className="object-cover" />
            </div>
          ) : (
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
              <Icon name="fish" size="xs" />
            </div>
          )}

          <div className="min-w-0 flex-1">
            <h4 className="truncate text-xs font-bold text-foreground">{product.name}</h4>
            <div className="flex items-baseline gap-1">
              <span className="font-heading text-sm font-black text-primary">
                {formatCurrency(currentPrice)}
              </span>
              {product.unit && (
                <span className="text-[10px] text-muted-foreground">/{product.unit}</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            disabled={!isInStock}
            onClick={handleAddToCart}
            aria-label="Thêm vào giỏ"
            className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-primary bg-card text-primary transition-all active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Icon name="shopping-bag" size="xs" />
          </button>

          <button
            type="button"
            disabled={!isInStock}
            onClick={handleBuyNow}
            className="flex h-10 items-center justify-center rounded-xl bg-primary px-4 text-xs font-black text-white shadow-md shadow-primary/20 transition-all active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Icon name="zap" size="xs" className="mr-1" />
            <span>Mua Ngay</span>
          </button>
        </div>
      </div>
    </div>
  );
}
