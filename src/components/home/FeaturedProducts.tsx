'use client';

import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'sonner';
import { Icon } from '@/components/common/Icon';
import type { ProductCardItem } from '@/components/products/ProductCard';
import { Link } from '@/libs/I18nNavigation';
import type { Product } from '@/types/api';
import type { FeaturedProductTab } from '@/types/home';

type FeaturedProductsProps = {
  products?: Product[];
  tabs?: FeaturedProductTab[];
  onQuickView?: (product: ProductCardItem) => void;
  onAddToCart?: (item: { id: string; name: string; price: number; image: string }) => void;
};

export function FeaturedProducts(props: FeaturedProductsProps) {
  const { products = [], tabs = [], onQuickView, onAddToCart } = props;
  const [activeTab, setActiveTab] = useState<string>('all');

  const displayTabs: FeaturedProductTab[] = [
    { slug: 'all', label: 'Tất cả sản phẩm' },
    ...tabs.filter((tab) => tab.slug !== 'all'),
  ].filter((tab, index, self) => index === self.findIndex((t) => t.slug === tab.slug));

  const filteredProducts =
    activeTab === 'all'
      ? products
      : products.filter(
          (p) =>
            p.categorySlug === activeTab || (p.categoryId && String(p.categoryId) === activeTab),
        );

  if (products.length === 0) {
    return null;
  }

  const handleAddToCartClick = (item: Product) => {
    if (!item.active || item.stock <= 0) {
      toast.error('Sản phẩm tạm thời hết hàng tại bến.');
      return;
    }

    const image = item.imageUrl ?? item.images?.[0] ?? '';

    if (onAddToCart) {
      onAddToCart({
        id: String(item.id),
        name: item.name,
        price: item.price,
        image,
      });
    }

    toast.success(`Đã thêm "${item.name}" vào giỏ hàng!`, {
      description: `Giá: ${item.price.toLocaleString('vi-VN')}₫`,
    });
  };

  return (
    <section id="featured-section" className="bg-background py-10 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-6 flex flex-col justify-between gap-4 sm:mb-8 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs font-bold tracking-wider text-secondary uppercase">
              Sản Phẩm Bán Chạy
            </span>
            <h2 className="mt-1 font-heading text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl">
              Hải Sản Nổi Bật
            </h2>
            <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
              Được khách hàng đặt mua nhiều nhất trong tuần qua tại bến Phan Thiết
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-1 text-xs font-bold text-secondary transition-colors hover:text-primary"
          >
            <span>Xem tất cả danh mục</span>
            <Icon name="arrow-right" size="xs" />
          </Link>
        </div>

        {/* Category Tabs */}
        {displayTabs.length > 1 && (
          <div className="mb-8 flex scrollbar-none gap-2 overflow-x-auto pb-2 sm:flex-wrap">
            {displayTabs.map((tab) => {
              const isActive = activeTab === tab.slug;
              return (
                <button
                  key={tab.slug}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab.slug);
                  }}
                  className={`rounded-full px-4 py-2 text-xs font-bold whitespace-nowrap transition-all active:scale-95 ${
                    isActive
                      ? 'bg-secondary text-secondary-foreground shadow-xs'
                      : 'border border-border bg-card text-muted-foreground hover:border-secondary hover:text-foreground'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        )}

        {/* 4-col Products Grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
          {filteredProducts.map((item) => {
            const image = item.imageUrl ?? item.images?.[0] ?? '';
            const originalPrice = item.originalPrice ?? Math.round(item.price * 1.15);
            const inStock = item.active && item.stock > 0;

            return (
              <div
                key={item.id}
                className="group flex flex-col justify-between overflow-hidden rounded-xl border border-border bg-card shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-secondary/40 hover:shadow-md"
              >
                <div>
                  {/* Image Container */}
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

                    {/* Quick View Button */}
                    {onQuickView && (
                      <button
                        type="button"
                        onClick={() => {
                          onQuickView({
                            id: item.id,
                            name: item.name,
                            price: item.price,
                            image,
                            category: item.categoryName ?? 'Hải sản',
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

                  {/* Info */}
                  <div className="p-3 sm:p-4">
                    <div className="flex items-center justify-between text-[10px] font-bold text-secondary uppercase">
                      <span>{item.categoryName ?? 'Hải Sản'}</span>
                      <span className={inStock ? 'text-tertiary' : 'text-destructive'}>
                        {inStock ? 'Còn hàng' : 'Tạm hết'}
                      </span>
                    </div>

                    <h3 className="mt-1 line-clamp-2 min-h-[38px] font-heading text-xs font-bold text-foreground transition-colors group-hover:text-primary sm:text-sm">
                      <Link href={`/products/${item.id}`}>{item.name}</Link>
                    </h3>

                    {item.description && (
                      <p className="mt-1 line-clamp-2 text-[11px] text-muted-foreground">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Price & CTA */}
                <div className="border-t border-border/60 p-3 pt-3 sm:p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      {originalPrice > item.price && (
                        <span className="block text-[10px] text-muted-foreground line-through">
                          {originalPrice.toLocaleString('vi-VN')}₫
                        </span>
                      )}
                      <span className="font-heading text-sm font-bold text-primary sm:text-base">
                        {item.price.toLocaleString('vi-VN')}₫
                      </span>
                    </div>

                    <button
                      type="button"
                      disabled={!inStock}
                      onClick={() => {
                        handleAddToCartClick(item);
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
          })}
        </div>
      </div>
    </section>
  );
}
