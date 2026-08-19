'use client';

import Image from 'next/image';
import { Icon } from '@/components/common/Icon';
import { Link } from '@/libs/I18nNavigation';
import type { Product } from '@/types/api';
import { formatCurrency } from '@/utils/Helpers';

type SearchProductCardProps = {
  product: Product;
  onAddToCart: (product: Product) => void;
};

export const SearchProductCard = ({ product, onAddToCart }: SearchProductCardProps) => (
  <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-3.5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-secondary/40 hover:shadow-lg sm:p-4">
    <div>
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-muted">
        <Link href={`/products/${product.id}`} className="relative block h-full w-full">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-muted-foreground">
              <Icon name="fish" size="lg" />
            </div>
          )}
        </Link>
      </div>

      <div className="mt-3 space-y-1">
        <span className="text-xs font-semibold text-secondary">
          {product.category?.name ?? 'Hải sản'}
        </span>
        <Link href={`/products/${product.id}`} className="block">
          <h3 className="line-clamp-2 font-heading text-xs font-bold text-foreground transition-colors group-hover:text-primary sm:text-sm">
            {product.name}
          </h3>
        </Link>
      </div>
    </div>

    <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3">
      <span className="font-heading text-sm font-bold text-primary sm:text-base">
        {formatCurrency(product.price)}
      </span>
      <button
        type="button"
        onClick={() => {
          onAddToCart(product);
        }}
        className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-white shadow-xs transition-transform hover:scale-105 active:scale-95 sm:h-9 sm:w-9"
        aria-label="Thêm vào giỏ"
      >
        <Icon name="shopping-bag" size="xs" />
      </button>
    </div>
  </div>
);
