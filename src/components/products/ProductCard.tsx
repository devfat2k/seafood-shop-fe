'use client';

import Image from 'next/image';
import { Icon } from '@/components/common/Icon';
import { Link } from '@/libs/I18nNavigation';

export type ProductCardItem = {
  id: string | number;
  name: string;
  category: string;
  badges?: string[];
  spec?: string;
  price: number;
  unit?: string;
  image?: string;
};

type ProductCardProps<T extends ProductCardItem = ProductCardItem> = {
  product: T;
  onAddToCart?: (product: T) => void;
  onQuickView?: (product: T) => void;
};

function getBadgeClassName(badge: string): string {
  if (badge.includes('🟢')) {
    return 'bg-[#0E3D34] text-white';
  }
  if (badge.includes('Phan Thiết') || badge.includes('Bán chạy') || badge.includes('Nổi bật')) {
    return 'bg-[#C4922F] text-white';
  }
  return 'bg-[#E4EEEA] text-[#0B2F28]';
}

export function ProductCard<T extends ProductCardItem>(props: ProductCardProps<T>) {
  const { product, onAddToCart, onQuickView } = props;
  const badges = product.badges ?? [];

  return (
    <div className="group flex flex-col justify-between rounded-3xl border border-[#E4E0D8] bg-white p-5 shadow-xs transition-all hover:-translate-y-1 hover:border-[#C4922F]/40 hover:shadow-lg">
      <div>
        <div className="relative h-52 w-full overflow-hidden rounded-2xl bg-[#F5F1E8]">
          <Link href={`/products/${product.id}`} className="block h-full w-full">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                loading="lazy"
                unoptimized
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-[#E4EEEA] text-[#0B2F28]">
                <Icon name="fish" size="lg" />
              </div>
            )}
          </Link>

          {badges.length > 0 && (
            <div className="pointer-events-none absolute top-2.5 left-2.5 flex flex-wrap gap-1.5">
              {badges.map((badge, idx) => (
                <span
                  key={idx}
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${getBadgeClassName(badge)}`}
                >
                  {badge}
                </span>
              ))}
            </div>
          )}

          {/* Quick View Button */}
          {onQuickView && (
            <button
              type="button"
              onClick={() => {
                onQuickView(product);
              }}
              className="absolute right-2.5 bottom-2.5 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white opacity-0 backdrop-blur-md transition-all group-hover:opacity-100 hover:scale-110 hover:bg-[#0B2F28]"
              aria-label={`Xem nhanh ${product.name}`}
              title="Xem nhanh"
            >
              <Icon name="eye" size="xs" />
            </button>
          )}
        </div>

        <div className="mt-4">
          <span className="text-[10px] font-extrabold tracking-wider text-text-secondary uppercase">
            {product.category}
          </span>
          <h3 className="mt-1 line-clamp-2 text-base leading-snug font-bold text-[#26312D] transition-colors hover:text-[#0B2F28]">
            <Link href={`/products/${product.id}`}>{product.name}</Link>
          </h3>
          {product.spec && <p className="mt-2 text-xs text-text-secondary">{product.spec}</p>}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-[#E4E0D8]/60 pt-4">
        <div>
          <span className="text-[11px] text-text-secondary">Đơn giá / {product.unit ?? '1kg'}</span>
          <p className="text-xl font-extrabold text-[#C4922F]">
            {product.price.toLocaleString('vi-VN')}₫
          </p>
        </div>
        <button
          type="button"
          aria-label={`Thêm ${product.name} vào giỏ hàng`}
          onClick={() => {
            if (onAddToCart) {
              onAddToCart(product);
            }
          }}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0B2F28] text-white shadow-xs transition-transform hover:scale-110 hover:bg-[#0E3D34]"
        >
          <Icon name="plus" size="sm" />
        </button>
      </div>
    </div>
  );
}
