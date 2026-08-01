'use client';

import { useState } from 'react';
import { ProductCatalogGrid } from '@/components/products/ProductCatalogGrid';
import { ProductHeaderBanner } from '@/components/products/ProductHeaderBanner';
import { ProductListToolbar } from '@/components/products/ProductListToolbar';
import { ProductPagination } from '@/components/products/ProductPagination';
import { ProductSidebarFilter } from '@/components/products/ProductSidebarFilter';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { CATALOG_PRODUCTS } from '@/data/products-catalog-mock';
import type { CatalogProduct } from '@/data/products-catalog-mock';

const INITIAL_FILTERS = {
  categories: ['tom-cua'] as CatalogProduct['categorySlug'][],
  minPrice: 200_000,
  maxPrice: 1_500_000,
  onlyInStock: true,
  includeUpcoming: false,
  fastShippingOnly: false,
  cleanPrepOnly: false,
};

export function ProductCatalogContainer() {
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  /* Lọc danh sách sản phẩm theo bộ lọc */
  let filteredProducts = CATALOG_PRODUCTS.filter((product) => {
    // 1. Lọc theo danh mục (nếu có chọn)
    if (filters.categories.length > 0 && !filters.categories.includes(product.categorySlug)) {
      return false;
    }
    // 2. Lọc theo khoảng giá
    if (product.price < filters.minPrice || product.price > filters.maxPrice) {
      return false;
    }
    // 3. Chỉ sản phẩm còn hàng
    if (filters.onlyInStock && !product.inStock) {
      return false;
    }
    // 4. Giao hỏa tốc
    if (filters.fastShippingOnly && !product.fastShipping) {
      return false;
    }
    // 5. Làm sạch sơ chế
    if (filters.cleanPrepOnly && !product.cleanPrep) {
      return false;
    }
    return true;
  });

  /* Sắp xếp danh sách sản phẩm */
  if (sortBy === 'price-asc') {
    filteredProducts = [...filteredProducts].toSorted((a, b) => a.price - b.price);
  } else if (sortBy === 'price-desc') {
    filteredProducts = [...filteredProducts].toSorted((a, b) => b.price - a.price);
  } else if (sortBy === 'popular') {
    filteredProducts = [...filteredProducts].toSorted(
      (a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0),
    );
  }

  const resetFilters = () => {
    setFilters({
      categories: [],
      minPrice: 100_000,
      maxPrice: 2_500_000,
      onlyInStock: false,
      includeUpcoming: false,
      fastShippingOnly: false,
      cleanPrepOnly: false,
    });
    setCurrentPage(1);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#FBF8F3]">
      {/* Banner Tiêu Đề Top */}
      <ProductHeaderBanner totalProducts={filteredProducts.length} />

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
              totalCount={filteredProducts.length}
              shownRange={`1 - ${Math.min(12, filteredProducts.length)}`}
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
                // Thêm vào giỏ hàng
                console.log('Thêm vào giỏ hàng:', prod.name);
              }}
            />

            {/* Phân Trang */}
            {filteredProducts.length > 0 && (
              <ProductPagination
                currentPage={currentPage}
                totalPages={8}
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
