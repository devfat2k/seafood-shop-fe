'use client';

import type { ProductCardItem } from '@/components/products/ProductCard';
import { ProductCard } from '@/components/products/ProductCard';

type ProductCatalogGridProps<T extends ProductCardItem = ProductCardItem> = {
  products: T[];
  onResetFilters?: () => void;
  onAddToCart?: (product: T) => void;
  onQuickView?: (product: T) => void;
};

export function ProductCatalogGrid<T extends ProductCardItem>(props: ProductCatalogGridProps<T>) {
  const { products, onResetFilters, onAddToCart, onQuickView } = props;

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-[#E4E0D8] bg-white py-16 text-center shadow-xs">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F5F1E8] text-[#5B6B63]">
          🔍
        </div>
        <h3 className="mt-4 text-lg font-bold text-[#26312D]">
          Không Tìm Thấy Sản Phẩm Phù Hợp
        </h3>
        <p className="mt-1 max-w-sm text-xs text-text-secondary">
          Vui lòng thử bỏ bớt bộ lọc hoặc tìm kiếm với từ khóa khác.
        </p>
        {onResetFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="mt-6 rounded-full bg-[#0B2F28] px-6 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-[#0E3D34]"
          >
            Xóa Tất Cả Bộ Lọc
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          onQuickView={onQuickView}
        />
      ))}
    </div>
  );
}
