'use client';

import { CartDrawer } from '@/components/cart/CartDrawer';
import { Icon } from '@/components/common/Icon';
import { ProductDetailBreadcrumb } from '@/components/product-detail/ProductDetailBreadcrumb';
import { ProductDetailSkeleton } from '@/components/product-detail/ProductDetailSkeleton';
import { ProductGallery } from '@/components/product-detail/ProductGallery';
import { ProductPurchasePanel } from '@/components/product-detail/ProductPurchasePanel';
import { ProductTabs } from '@/components/product-detail/ProductTabs';
import { RelatedProductsSection } from '@/components/product-detail/RelatedProductsSection';
import { useProductDetailState } from '@/components/product-detail/useProductDetailState';
import { Link } from '@/libs/I18nNavigation';
import type { Product } from '@/types/api';

type ProductDetailContainerProps = {
  productId?: string;
  initialProduct?: Product;
};

function ProductDetailError({ message, onRetry }: { message?: string; onRetry: () => void }) {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
        <Icon name="alert-triangle" size="md" />
      </div>
      <h2 className="mt-4 font-heading text-2xl font-bold text-foreground">
        Không thể tải thông tin sản phẩm
      </h2>
      <p className="mt-2 text-xs text-muted-foreground">
        {message ?? 'Đã có lỗi xảy ra khi kết nối máy chủ.'}
      </p>
      <div className="mt-6 flex gap-3">
        <button
          type="button"
          onClick={onRetry}
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

function ProductDetailNotFound() {
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

export function ProductDetailContainer({ productId, initialProduct }: ProductDetailContainerProps) {
  const {
    product,
    isLoading,
    isError,
    error,
    refetch,
    galleryImages,
    relatedProducts,
    isCartOpen,
    setIsCartOpen,
    cartItems,
    setCartItems,
    handleAddToCart,
    handleBuyNow,
    handleAddRelatedToCart,
  } = useProductDetailState({ productId, initialProduct });

  if (isLoading && !product) {
    return <ProductDetailSkeleton />;
  }

  if (isError && !product) {
    return (
      <ProductDetailError
        message={error?.message}
        onRetry={() => {
          void refetch();
        }}
      />
    );
  }

  if (!product) {
    return <ProductDetailNotFound />;
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6">
        <ProductDetailBreadcrumb
          categoryName={product.categoryName ?? 'Hải sản'}
          categorySlug={product.categorySlug ?? 'hai-san'}
          productName={product.name}
        />

        <div className="space-y-12">
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

          <ProductTabs product={product} />

          <RelatedProductsSection products={relatedProducts} onAddToCart={handleAddRelatedToCart} />
        </div>
      </main>

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
