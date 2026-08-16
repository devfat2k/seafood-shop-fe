'use client';

import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'sonner';
import { CartDrawer } from '@/components/cart/CartDrawer';
import type { CartItem } from '@/components/cart/CartDrawer';
import { Icon } from '@/components/common/Icon';
import { ProductDetailBreadcrumb } from '@/components/product-detail/ProductDetailBreadcrumb';
import { ProductDetailSkeleton } from '@/components/product-detail/ProductDetailSkeleton';
import { ProductGallery } from '@/components/product-detail/ProductGallery';
import { ProductPurchasePanel } from '@/components/product-detail/ProductPurchasePanel';
import { ProductTabs } from '@/components/product-detail/ProductTabs';
import { Link } from '@/libs/I18nNavigation';
import { useProductQuery, useRelatedProductsQuery } from '@/libs/queries/products';
import type { Product } from '@/types/api';

type ProductDetailContainerProps = {
  productId?: string;
  initialProduct?: Product;
};

function getGalleryImages(p: Product): string[] {
  if (p.images && p.images.length > 0) {
    return p.images;
  }
  if (p.imageUrl) {
    return [p.imageUrl];
  }
  return [];
}

export function ProductDetailContainer(props: ProductDetailContainerProps) {
  const { productId, initialProduct } = props;
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // 1. Fetch product detail
  const {
    data: product,
    isLoading,
    isError,
    error,
    refetch,
  } = useProductQuery(productId ?? '', initialProduct);

  // 2. Fetch related products by category
  const { data: relatedData } = useRelatedProductsQuery(product?.categoryId);

  // 1. Loading State
  if (isLoading && !product) {
    return <ProductDetailSkeleton />;
  }

  // 2. Error State
  if (isError && !product) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 py-16 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
          <Icon name="alert-triangle" size="md" />
        </div>
        <h2 className="mt-4 font-heading text-2xl font-bold text-foreground">
          Không thể tải thông tin sản phẩm
        </h2>
        <p className="mt-2 text-xs text-muted-foreground">
          {error?.message ?? 'Đã có lỗi xảy ra khi kết nối máy chủ.'}
        </p>
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={() => void refetch()}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground shadow-xs hover:bg-primary/90"
          >
            <Icon name="refresh-cw" size="xs" />
            <span>Thử lại</span>
          </button>
          <Link
            href="/products"
            className="rounded-xl border border-border bg-card px-5 py-2.5 text-xs font-bold text-foreground hover:bg-muted"
          >
            Về danh mục
          </Link>
        </div>
      </div>
    );
  }

  // 3. Not Found State
  if (!product) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 py-16 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
          <Icon name="fish" size="md" />
        </div>
        <h2 className="mt-4 font-heading text-2xl font-bold text-foreground">
          Không tìm thấy sản phẩm
        </h2>
        <p className="mt-2 text-xs text-muted-foreground">
          Sản phẩm bạn đang tìm kiếm có thể đã hết hàng hoặc ngừng kinh doanh.
        </p>
        <Link
          href="/products"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-secondary px-6 py-3 text-xs font-bold text-secondary-foreground shadow-md hover:bg-secondary/90"
        >
          <span>Khám phá các hải sản khác</span>
          <Icon name="arrow-right" size="xs" />
        </Link>
      </div>
    );
  }

  // Dynamic gallery images
  const galleryImages = getGalleryImages(product);

  const relatedProducts = (relatedData?.content ?? [])
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = (item: {
    id: string | number;
    name: string;
    weight: string;
    price: number;
    quantity: number;
    image: string;
  }) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i,
        );
      }
      return [...prev, item];
    });
  };

  const handleBuyNow = (item: {
    id: string | number;
    name: string;
    weight: string;
    price: number;
    quantity: number;
    image: string;
  }) => {
    handleAddToCart(item);
    setIsCartOpen(true);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* MAIN CONTAINER */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6">
        {/* Breadcrumb */}
        <ProductDetailBreadcrumb
          categoryName={product.categoryName ?? 'Hải sản'}
          categorySlug={product.categorySlug ?? 'hai-san'}
          productName={product.name}
        />

        {/* DEFAULT CONTENT */}
        <div className="space-y-12">
          {/* Top 2 Columns Layout: Gallery (Left) + Purchase Panel (Right) */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
            <ProductGallery
              images={galleryImages}
              productName={product.name}
              badges={product.featured ? ['Nổi bật', 'Tươi sống'] : ['Tươi sống']}
            />
            <ProductPurchasePanel
              product={product}
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
            />
          </div>

          {/* Product Tabs Section */}
          <ProductTabs product={product} />

          {/* Related Products Section */}
          {relatedProducts.length > 0 && (
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

              {/* 4-column Grid */}
              <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
                {relatedProducts.map((rel) => {
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
                          <span className="absolute top-2.5 left-2.5 rounded-full bg-accent px-2.5 py-0.5 text-[9px] font-bold text-accent-foreground uppercase shadow-xs">
                            NỔI BẬT
                          </span>
                        )}
                      </div>

                      <div className="flex flex-1 flex-col justify-between p-3 sm:p-4">
                        <div>
                          <span className="text-[10px] font-bold text-secondary uppercase">
                            {rel.categoryName ?? 'Hải sản'}
                          </span>
                          <h3 className="mt-0.5 line-clamp-2 min-h-[34px] font-heading text-xs font-bold text-foreground transition-colors group-hover:text-primary sm:min-h-[40px] sm:text-sm">
                            <Link href={`/products/${rel.id}`}>{rel.name}</Link>
                          </h3>
                          <div className="mt-1.5 flex items-center gap-1.5 text-[11px]">
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
                                {relOriginalPrice.toLocaleString('vi-VN')}₫
                              </span>
                            )}
                            <span className="font-heading text-sm font-bold text-primary sm:text-base">
                              {rel.price.toLocaleString('vi-VN')}₫
                            </span>
                          </div>
                          <button
                            type="button"
                            disabled={rel.stock <= 0}
                            onClick={() => {
                              handleAddToCart({
                                id: rel.id,
                                name: rel.name,
                                weight: '1kg / Túi oxy',
                                price: rel.price,
                                quantity: 1,
                                image: relImage,
                              });
                              toast.success(`Đã thêm "${rel.name}" vào giỏ hàng!`);
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
          )}
        </div>
      </main>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => {
          setIsCartOpen(false);
        }}
        initialItems={cartItems}
        onUpdateItems={(newItems) => {
          setCartItems(newItems);
        }}
      />
    </div>
  );
}
