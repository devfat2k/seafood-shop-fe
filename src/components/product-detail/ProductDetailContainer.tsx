'use client';

import { ProductDetailBreadcrumb } from '@/components/product-detail/ProductDetailBreadcrumb';
import { ProductGallery } from '@/components/product-detail/ProductGallery';
import { ProductPurchasePanel } from '@/components/product-detail/ProductPurchasePanel';
import { ProductTabs } from '@/components/product-detail/ProductTabs';
import type { Product } from '@/types/api';

type ProductDetailContainerProps = {
  productId?: string;
  initialProduct?: Product;
};

export function ProductDetailContainer(props: ProductDetailContainerProps) {
  const { productId, initialProduct } = props;

  const product: Product = initialProduct ?? {
    id: productId ? Number(productId) || 1 : 1,
    name: 'Sản phẩm Hải Sản Phan Thiết',
    price: 0,
    imageUrl: '',
    images: [],
    active: true,
    stock: 0,
    categoryId: 1,
    categoryName: 'Hải Sản',
    categorySlug: 'tom-cua',
  };

  const images = product.images && product.images.length > 0
    ? product.images
    : [product.imageUrl ?? ''];

  return (
    <div className="flex min-h-screen flex-col bg-[#FBF8F3]">
      <ProductDetailBreadcrumb
        categoryName={product.categoryName ?? 'Hải Sản'}
        categorySlug={product.categorySlug ?? 'tom-cua'}
        productName={product.name}
      />

      {/* Main Layout Content */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6">
        {/* Top 2 Columns Layout: Gallery (Left) + Purchase Panel (Right) */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Gallery Cột Trái */}
          <div className="lg:col-span-6">
            <ProductGallery
              images={images}
              productName={product.name}
              badges={product.featured ? ['Nổi bật'] : []}
            />
          </div>

          {/* Purchase Panel Cột Phải */}
          <div className="lg:col-span-6">
            <ProductPurchasePanel product={product} />
          </div>
        </div>

        {/* Content Tabs Section */}
        <ProductTabs product={product} />
      </main>
    </div>
  );
}
