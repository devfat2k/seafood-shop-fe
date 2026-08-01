'use client';

import { ProductDetailBreadcrumb } from '@/components/product-detail/ProductDetailBreadcrumb';
import { ProductGallery } from '@/components/product-detail/ProductGallery';
import { ProductPurchasePanel } from '@/components/product-detail/ProductPurchasePanel';
import { ProductTabs } from '@/components/product-detail/ProductTabs';
import { PRODUCT_DETAIL_DATA } from '@/data/product-detail-mock';
import { CATALOG_PRODUCTS } from '@/data/products-catalog-mock';

export function ProductDetailContainer(props: { productId?: string }) {
  const { productId } = props;

  const matchedCatalogProduct = CATALOG_PRODUCTS.find((p) => p.id === productId);

  const product = matchedCatalogProduct
    ? {
        ...PRODUCT_DETAIL_DATA,
        id: matchedCatalogProduct.id,
        name: matchedCatalogProduct.name,
        category: matchedCatalogProduct.category,
        categorySlug: matchedCatalogProduct.categorySlug,
        price: matchedCatalogProduct.price,
        unit: matchedCatalogProduct.unit,
        images: [matchedCatalogProduct.image, ...PRODUCT_DETAIL_DATA.images.slice(1)],
      }
    : {
        ...PRODUCT_DETAIL_DATA,
        id: productId ?? PRODUCT_DETAIL_DATA.id,
      };

  return (
    <div className="flex min-h-screen flex-col bg-[#FBF8F3]">
      {/* Breadcrumb Bar */}
      <ProductDetailBreadcrumb
        categoryName={product.category}
        categorySlug={product.categorySlug}
        productName={product.name}
      />

      {/* Main Layout Content */}
      <main className="mx-auto w-full max-w-[1280px] flex-1 px-4 py-8 sm:px-6">
        {/* Top 2 Columns Layout: Gallery (Left) + Purchase Panel (Right) */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Gallery Cột Trái */}
          <div className="lg:col-span-6">
            <ProductGallery
              images={product.images}
              productName={product.name}
              badges={product.badges}
            />
          </div>

          {/* Purchase Panel Cột Phải */}
          <div className="lg:col-span-6">
            <ProductPurchasePanel product={product} />
          </div>
        </div>

        {/* Content Tabs Section (Mô Tả Sản Phẩm / Hướng Dẫn Chế Biến / Đánh Giá) */}
        <ProductTabs product={product} />
      </main>
    </div>
  );
}
