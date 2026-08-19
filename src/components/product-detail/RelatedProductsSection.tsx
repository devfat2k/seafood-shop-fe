'use client';

import Image from 'next/image';
import { Icon } from '@/components/common/Icon';
import { Link } from '@/libs/I18nNavigation';
import type { Product } from '@/types/api';
import { formatCurrency } from '@/utils/Helpers';

type RelatedProductsSectionProps = {
  products: Product[];
  onAddToCart: (rel: Product, image: string) => void;
};

export const RelatedProductsSection = ({ products, onAddToCart }: RelatedProductsSectionProps) => {
  if (products.length === 0) {
    return null;
  }

  return (
    <section className="space-y-6">
      <div className="flex items-baseline justify-between">
        <h2 className="font-heading text-xl font-bold text-foreground sm:text-2xl">
          Có thể bạn cũng thích
        </h2>
        <Link
          href="/products"
          className="text-xs font-bold text-secondary hover:text-primary sm:text-sm"
        >
          Xem tất cả hải sản tươi sống →
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
        {products.map((rel) => {
          const relImage = rel.imageUrl ?? rel.images?.[0] ?? '';
          const relOriginalPrice = rel.originalPrice ?? Math.round(rel.price * 1.15);

          return (
            <div
              key={rel.id}
              className="group flex flex-col justify-between overflow-hidden rounded-xl border border-border bg-card shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-secondary/40 hover:shadow-md"
            >
              <div className="relative aspect-square w-full overflow-hidden bg-muted">
                <Link href={`/products/${rel.id}`} className="relative block h-full w-full">
                  {relImage ? (
                    <Image
                      src={relImage}
                      alt={rel.name}
                      fill
                      unoptimized
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
                      <Icon name="fish" size="lg" />
                    </div>
                  )}
                </Link>
                {rel.featured && (
                  <span className="absolute top-2.5 left-2.5 rounded-full bg-accent px-2.5 py-0.5 text-xs font-bold text-accent-foreground uppercase shadow-xs">
                    NỔI BẬT
                  </span>
                )}
              </div>

              <div className="flex flex-1 flex-col justify-between p-3 sm:p-4">
                <div>
                  <span className="text-xs font-bold text-secondary uppercase">
                    {rel.categoryName ?? 'Hải sản'}
                  </span>
                  <h3 className="mt-0.5 line-clamp-2 min-h-10 font-heading text-xs font-bold text-foreground transition-colors group-hover:text-primary sm:text-sm">
                    <Link href={`/products/${rel.id}`}>{rel.name}</Link>
                  </h3>
                  <div className="mt-1.5 flex items-center gap-1.5 text-xs">
                    <span
                      className={`font-bold ${rel.stock > 0 ? 'text-tertiary' : 'text-destructive'}`}
                    >
                      {rel.stock > 0 ? 'Còn hàng' : 'Tạm hết'}
                    </span>
                    <span className="text-muted-foreground">• Phan Thiết</span>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-border/60 pt-3">
                  <div>
                    {relOriginalPrice > rel.price && (
                      <span className="block text-xs text-muted-foreground line-through">
                        {formatCurrency(relOriginalPrice)}
                      </span>
                    )}
                    <span className="font-heading text-sm font-bold text-primary sm:text-base">
                      {formatCurrency(rel.price)}
                    </span>
                  </div>
                  <button
                    type="button"
                    disabled={rel.stock <= 0}
                    onClick={() => {
                      onAddToCart(rel, relImage);
                    }}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all hover:bg-primary hover:text-primary-foreground disabled:opacity-40 sm:h-9 sm:w-9"
                    aria-label={`Thêm ${rel.name} vào giỏ hàng`}
                  >
                    <Icon name="shopping-cart" size="sm" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
