'use client';

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
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-primary/90"
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
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-secondary px-6 py-3 text-xs font-bold text-white shadow-md hover:bg-secondary/90"
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

  const categoryName = product.category?.name ?? product.categoryName ?? 'Hải Sản';
  const categorySlug = product.category?.slug ?? product.categorySlug ?? 'all';

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        <ProductDetailBreadcrumb
          categoryName={categoryName}
          categorySlug={categorySlug}
          productName={product.name}
        />

        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <ProductGallery images={galleryImages} productName={product.name} />
          </div>

          <div className="lg:col-span-6">
            <ProductPurchasePanel product={product} />
          </div>
        </div>

        <div className="mt-12">
          <ProductTabs product={product} />
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <RelatedProductsSection
              products={relatedProducts}
              onAddToCart={handleAddRelatedToCart}
            />
          </div>
        )}
      </div>
    </div>
  );
}
