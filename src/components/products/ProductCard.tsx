"use client";

import { Icon } from "@/components/common/Icon";
import { Link } from "@/libs/I18nNavigation";
import Image from "next/image";

export type ProductCardItem = {
  id: string;
  name: string;
  category: string;
  badges: string[];
  spec: string;
  price: number;
  unit: string;
  image: string;
};

type ProductCardProps<T extends ProductCardItem = ProductCardItem> = {
  product: T;
  onAddToCart?: (product: T) => void;
};

function getBadgeClassName(badge: string): string {
  if (badge.includes("🟢")) {
    return "bg-[#1E3A8A] text-white";
  }
  if (badge.includes("Phan Thiết") || badge.includes("Bán chạy")) {
    return "bg-[#F97316] text-white";
  }
  return "bg-[#EDF2F7] text-text-secondary";
}

export function ProductCard<T extends ProductCardItem>(
  props: ProductCardProps<T>,
) {
  const { product, onAddToCart } = props;

  return (
    <div className="group flex flex-col justify-between rounded-3xl border border-[#E2E8F0] bg-[#F8FAFC] p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
      <div>
        <Link href={`/products/${product.id}`} className="block">
          <div className="relative h-52 w-full overflow-hidden rounded-2xl bg-[#EDF2F7]">
            <Image
              src={product.image}
              alt={product.name}
              fill
              loading="lazy"
              unoptimized
              className="object-cover transition-transform duration-500 group-hover:scale-105"
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

        <div className="mt-4">
          <span className="text-[10px] font-extrabold tracking-wider text-text-secondary uppercase">
            {product.category}
          </span>
          <h3 className="mt-1 line-clamp-2 text-base leading-snug font-bold text-text-primary transition-colors hover:text-[#1E3A8A]">
            <Link href={`/products/${product.id}`}>{product.name}</Link>
          </h3>
          <p className="mt-2 text-xs text-text-secondary">{product.spec}</p>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-[#E2E8F0] pt-4">
        <div>
          <span className="text-[11px] text-text-secondary">
            Đơn giá / {product.unit}
          </span>
          <p className="text-xl font-extrabold text-[#F97316]">
            {product.price.toLocaleString("vi-VN")}đ
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
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1E3A8A] text-white shadow transition-transform hover:scale-110 hover:bg-[#172554]"
        >
          <Icon name="plus" size="sm" />
        </button>
      </div>
    </div>
  );
}
