'use client';

import { useState } from 'react';
import type { ProductCardItem } from '@/components/products/ProductCard';
import { ProductCatalogGrid } from '@/components/products/ProductCatalogGrid';
import { ProductHeaderBanner } from '@/components/products/ProductHeaderBanner';
import { ProductListToolbar } from '@/components/products/ProductListToolbar';
import { ProductPagination } from '@/components/products/ProductPagination';
import { ProductSidebarFilter } from '@/components/products/ProductSidebarFilter';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';

const INITIAL_FILTERS = {
  categories: [] as string[],
  minPrice: 0,
  maxPrice: 2_500_000,
  onlyInStock: false,
  includeUpcoming: false,
  fastShippingOnly: false,
  cleanPrepOnly: false,
};

type ProductCatalogContainerProps = {
  initialProducts?: ProductCardItem[];
  totalElements?: number;
  totalPages?: number;
};

export function ProductCatalogContainer(props: ProductCatalogContainerProps) {
  const { initialProducts = [], totalElements = 0, totalPages = 1 } = props;

  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  /* Lọc danh sách sản phẩm ở client nếu có initialProducts */
  let filteredProducts = initialProducts.filter((product) => {
    if (product.price < filters.minPrice || product.price > filters.maxPrice) {
      return false;
    }
    return true;
  });

  /* Sắp xếp danh sách sản phẩm */
  if (sortBy === 'price-asc') {
    filteredProducts = [...filteredProducts].toSorted((a, b) => a.price - b.price);
  } else if (sortBy === 'price-desc') {
    filteredProducts = [...filteredProducts].toSorted((a, b) => b.price - a.price);
  }

  const resetFilters = () => {
    setFilters(INITIAL_FILTERS);
    setCurrentPage(1);
  };

  const currentTotal = totalElements || filteredProducts.length;
  const currentTotalPages = totalPages || Math.ceil(currentTotal / 12) || 1;

  return (
    <div className="flex min-h-screen flex-col bg-[#FBF8F3]">
      {/* Banner Tiêu Đề Top */}
      <ProductHeaderBanner totalProducts={currentTotal} />

      {/* Main Layout Content (Split Sidebar + Grid) */}
      <main className="mx-auto w-full max-w-[1280px] flex-1 px-4 py-8 sm:px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Cột Trái: Sidebar Bộ Lọc Desktop */}
          <div className="hidden lg:col-span-3 lg:block">
            <ProductSidebarFilter
              filters={filters}
              onFilterChange={(newFilters) => {
                setFilters(newFilters);
                setCurrentPage(1);
              }}
              onResetFilters={resetFilters}
            />
          </div>

          {/* Cột Phải: Toolbar + Grid + Pagination */}
          <div className="flex flex-col gap-6 lg:col-span-9">
            {/* Toolbar Top */}
            <ProductListToolbar
              totalCount={currentTotal}
              shownRange={`1 - ${Math.min(12, currentTotal)}`}
              sortBy={sortBy}
              onSortChange={(sort) => {
                setSortBy(sort);
              }}
              onToggleMobileFilter={() => {
                setIsMobileFilterOpen(true);
              }}
            />

            {/* Grid Sản Phẩm */}
            <ProductCatalogGrid
              products={filteredProducts}
              onResetFilters={resetFilters}
              onAddToCart={(prod) => {
                console.log('Thêm vào giỏ hàng:', prod.name);
              }}
            />

            {/* Phân Trang */}
            {currentTotal > 0 && (
              <ProductPagination
                currentPage={currentPage}
                totalPages={currentTotalPages}
                onPageChange={(page) => {
                  setCurrentPage(page);
                  window.scrollTo({ top: 200, behavior: 'smooth' });
                }}
              />
            )}
          </div>
        </div>
      </main>

      {/* Drawer Bộ Lọc Mobile */}
      <Sheet open={isMobileFilterOpen} onOpenChange={setIsMobileFilterOpen}>
        <SheetContent side="left" className="w-full overflow-y-auto bg-[#FBF8F3] sm:max-w-md">
          <SheetHeader className="border-b border-[#E4E0D8] pb-4">
            <SheetTitle className="text-left text-lg font-extrabold text-[#26312D]">
              Bộ Lọc Tìm Kiếm
            </SheetTitle>
          </SheetHeader>
          <div className="mt-4">
            <ProductSidebarFilter
              filters={filters}
              onFilterChange={(newFilters) => {
                setFilters(newFilters);
                setCurrentPage(1);
              }}
              onResetFilters={resetFilters}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
