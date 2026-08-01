'use client';

import type { CatalogProduct } from '@/data/products-catalog-mock';
import { Link } from '@/libs/I18nNavigation';

type ProductCardProps = {
  product: CatalogProduct;
  onAddToCart?: (product: CatalogProduct) => void;
};

function getBadgeClassName(badge: string): string {
  if (badge.includes('🟢')) {
    return 'bg-[#0E3D34] text-white';
  }
  if (badge.includes('Phan Thiết') || badge.includes('Bán chạy')) {
    return 'bg-[#D9A441] text-[#26312D]';
  }
  return 'bg-[#F5F1E8] text-[#5B6B63]';
}

export function ProductCard(props: ProductCardProps) {
  const { product, onAddToCart } = props;

  return (
    <div className="group flex flex-col justify-between rounded-3xl border border-[#E4E0D8] bg-[#FBF8F3] p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
      <div>
        {/* Product Image & Badges */}
        <Link href={`/products/${product.id}`} className="block">
          <div className="relative h-52 w-full overflow-hidden rounded-2xl bg-[#F5F1E8]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5">
              {product.badges.map((badge, idx) => (
                <span
                  key={idx}
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${getBadgeClassName(badge)}`}
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </Link>

        {/* Content Info */}
        <div className="mt-4">
          <span className="text-[10px] font-extrabold tracking-wider text-[#5B6B63] uppercase">
            {product.category}
          </span>
          <h3 className="mt-1 line-clamp-2 text-base leading-snug font-bold text-[#26312D] transition-colors hover:text-[#0E3D34]">
            <Link href={`/products/${product.id}`}>{product.name}</Link>
          </h3>
          <p className="mt-2 text-xs text-[#5B6B63]">{product.spec}</p>
        </div>
      </div>

      {/* Price & Action */}
      <div className="mt-6 flex items-center justify-between border-t border-[#E4E0D8] pt-4">
        <div>
          <span className="text-[11px] text-[#5B6B63]">Đơn giá / {product.unit}</span>
          <p className="text-xl font-extrabold text-[#D9A441]">
            {product.price.toLocaleString('vi-VN')}đ
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
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0E3D34] text-white shadow transition-transform hover:scale-110 hover:bg-[#0B2F28]"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
    </div>
  );
}
