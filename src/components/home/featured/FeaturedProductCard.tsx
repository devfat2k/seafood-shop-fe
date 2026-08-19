'use client';

import Image from 'next/image';
import { Icon } from '@/components/common/Icon';
import type { ProductCardItem } from '@/components/products/ProductCard';
import { Link } from '@/libs/I18nNavigation';
import type { Product } from '@/types/api';
import { formatCurrency } from '@/utils/Helpers';

type FeaturedProductCardProps = {
  item: Product;
  onQuickView?: (product: ProductCardItem) => void;
  onAddToCart: (item: Product) => void;
};

export const FeaturedProductCard = ({
  item,
  onQuickView,
  onAddToCart,
}: FeaturedProductCardProps) => {
  const image = item.imageUrl ?? item.images?.[0] ?? '';
  const originalPrice = item.originalPrice ?? Math.round(item.price * 1.15);
  const inStock = item.active && item.stock > 0;
  const categoryTitle =
    item.categoryLabel ??
    item.categoryName ??
    item.category?.categoryName ??
    item.category?.name ??
    'Hải Sản';

  return (
    <div className="group flex flex-col justify-between overflow-hidden rounded-xl border border-border bg-card shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-secondary/40 hover:shadow-md">
      <div>
        <div className="relative aspect-square w-full overflow-hidden bg-muted">
          <Link href={`/products/${item.id}`} className="relative block h-full w-full">
            {image ? (
              <Image
                src={image}
                alt={item.name}
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

          {onQuickView && (
            <button
              type="button"
              onClick={() => {
                onQuickView({
                  id: item.id,
                  name: item.name,
                  price: item.price,
                  image,
                  category: categoryTitle,
                  badges: item.featured ? ['NỔI BẬT'] : ['TƯƠI SỐNG'],
                  spec: item.spec ?? item.description ?? '',
                });
              }}
              className="absolute right-2 bottom-2 flex h-8 w-8 items-center justify-center rounded-full bg-foreground/75 text-white opacity-0 backdrop-blur-md transition-all group-hover:opacity-100 hover:scale-110 hover:bg-secondary"
              aria-label={`Xem nhanh ${item.name}`}
              title="Xem nhanh"
            >
              <Icon name="eye" size="xs" />
            </button>
          )}
        </div>

        <div className="p-3 sm:p-4">
          <div className="flex items-center justify-between text-xs font-bold text-secondary uppercase">
            <span>{categoryTitle}</span>
            <span className={inStock ? 'text-tertiary' : 'text-destructive'}>
              {inStock ? 'Còn hàng' : 'Tạm hết'}
            </span>
          </div>

          <h3 className="mt-1 line-clamp-2 min-h-10 font-sans text-xs font-bold text-foreground transition-colors group-hover:text-primary sm:text-sm">
            <Link href={`/products/${item.id}`}>{item.name}</Link>
          </h3>

          {item.description && (
            <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{item.description}</p>
          )}
        </div>
      </div>

      <div className="border-t border-border/60 p-3 pt-3 sm:p-4">
        <div className="flex items-center justify-between">
          <div>
            {originalPrice > item.price && (
              <span className="block text-xs text-muted-foreground line-through">
                {formatCurrency(originalPrice)}
              </span>
            )}
            <span className="font-sans text-sm font-bold text-primary sm:text-base">
              {formatCurrency(item.price)}
            </span>
          </div>

          <button
            type="button"
            disabled={!inStock}
            onClick={() => {
              onAddToCart(item);
            }}
            className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all ${
              inStock
                ? 'bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground active:scale-95'
                : 'cursor-not-allowed bg-muted text-muted-foreground opacity-50'
            }`}
            aria-label={`Thêm ${item.name} vào giỏ hàng`}
            title={inStock ? 'Thêm vào giỏ' : 'Hết hàng'}
          >
            <Icon name="shopping-cart" size="xs" />
          </button>
        </div>
      </div>
    </div>
  );
};
