'use client';

import { Icon } from '@/components/common/Icon';
import { ProductCard } from '@/components/products/ProductCard';
import { Skeleton } from '@/components/ui/skeleton';
import type { CatalogProduct } from '@/data/products-catalog-mock';

type ProductCatalogGridProps = {
  products: CatalogProduct[];
  isLoading?: boolean;
  isError?: boolean;
  onResetFilters?: () => void;
  onAddToCart?: (product: CatalogProduct) => void;
};

export function ProductCatalogGrid(props: ProductCatalogGridProps) {
  const { products, isLoading, isError, onResetFilters, onAddToCart } = props;

  /* 1. Trạng thái Loading (Skeleton) */
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            className="flex flex-col gap-4 rounded-3xl border border-[#E2E8F0] bg-[#F8FAFC] p-5"
          >
            <Skeleton className="h-52 w-full rounded-2xl bg-[#E2E8F0]" />
            <Skeleton className="h-4 w-1/3 rounded bg-[#E2E8F0]" />
            <Skeleton className="h-6 w-full rounded bg-[#E2E8F0]" />
            <Skeleton className="h-4 w-2/3 rounded bg-[#E2E8F0]" />
            <div className="mt-4 flex items-center justify-between border-t border-[#E2E8F0] pt-4">
              <Skeleton className="h-8 w-24 rounded bg-[#E2E8F0]" />
              <Skeleton className="h-10 w-10 rounded-full bg-[#E2E8F0]" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  /* 2. Trạng thái Error */
  if (isError) {
    return (
      <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
          <Icon name="x" size="lg" />
        </div>
        <h3 className="mt-4 text-base font-bold text-red-900">Có lỗi xảy ra khi tải hải sản</h3>
        <p className="mt-1 text-xs text-red-700">
          Không thể kết nối dữ liệu. Vui lòng kiểm tra lại đường truyền mạng hoặc thử lại.
        </p>
        <button
          type="button"
          onClick={() => {
            window.location.reload();
          }}
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-red-600 px-6 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-red-700"
        >
          Thử lại
        </button>
      </div>
    );
  }

  /* 3. Trạng thái Empty */
  if (products.length === 0) {
    return (
      <div className="rounded-3xl border border-[#E4E0D8] bg-white p-12 text-center shadow-xs">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#E4EEEA] text-[#0B2F28]">
          <Icon name="search" size="xl" />
        </div>
        <h3 className="mt-4 text-lg font-bold text-[#26312D]">Không tìm thấy hải sản phù hợp</h3>
        <p className="mt-2 text-xs text-text-secondary">
          Vui lòng thử bỏ chọn một số tiêu chí lọc hoặc xóa tất cả bộ lọc để xem đầy đủ sản phẩm.
        </p>
        {onResetFilters && (
          <button
            type="button"
            onClick={() => {
              onResetFilters();
            }}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#0B2F28] px-6 py-2.5 text-xs font-bold text-white shadow-xs transition-transform hover:scale-105 hover:bg-[#0E3D34]"
          >
            ⟲ Xoá bộ lọc
          </button>
        )}
      </div>
    );
  }

  /* 4. Trạng thái Success: Render Grid */
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
}
