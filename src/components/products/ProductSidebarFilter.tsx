"use client";

import { Icon } from "@/components/common/Icon";
import { CATEGORY_FILTER_LIST } from "@/data/products-catalog-mock";
import type { CatalogProduct } from "@/data/products-catalog-mock";

type FilterState = {
  categories: CatalogProduct["categorySlug"][];
  minPrice: number;
  maxPrice: number;
  onlyInStock: boolean;
  includeUpcoming: boolean;
  fastShippingOnly: boolean;
  cleanPrepOnly: boolean;
};

type ProductSidebarFilterProps = {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onResetFilters: () => void;
};

export function ProductSidebarFilter(props: ProductSidebarFilterProps) {
  const { filters, onFilterChange, onResetFilters } = props;

  const toggleCategory = (slug: CatalogProduct["categorySlug"]) => {
    const exists = filters.categories.includes(slug);
    const updated = exists
      ? filters.categories.filter((c) => c !== slug)
      : [...filters.categories, slug];

    onFilterChange({
      ...filters,
      categories: updated,
    });
  };

  const removeCategoryTag = (slug: CatalogProduct["categorySlug"]) => {
    onFilterChange({
      ...filters,
      categories: filters.categories.filter((c) => c !== slug),
    });
  };

  return (
    <aside className="w-full rounded-3xl border border-[#E2E8F0] bg-[#F8FAFC] p-5 shadow-sm">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
        <div className="flex items-center gap-2">
          <Icon
            name="sliders-horizontal"
            size="sm"
            className="text-[#1E3A8A]"
          />
          <h3 className="text-base font-extrabold text-[#0F172A]">
            Bộ Lọc Tìm Kiếm
          </h3>
        </div>
        <button
          type="button"
          onClick={() => {
            onResetFilters();
          }}
          className="flex items-center gap-1 text-xs font-bold text-text-secondary transition-colors hover:text-[#F97316]"
        >
          <span>⟲ Xoá bộ lọc</span>
        </button>
      </div>

      {/* Applied Filter Chips */}
      {filters.categories.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 border-b border-[#E2E8F0] py-3">
          {filters.categories.map((slug) => {
            const cat = CATEGORY_FILTER_LIST.find((c) => c.slug === slug);
            return (
              <span
                key={slug}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#DBEAFE] px-3 py-1 text-xs font-bold text-[#1E3A8A]"
              >
                <span>{cat?.name ?? slug}</span>
                <button
                  type="button"
                  aria-label={`Xoá lọc ${cat?.name}`}
                  onClick={() => {
                    removeCategoryTag(slug);
                  }}
                  className="rounded-full hover:bg-[#1E3A8A]/10"
                >
                  <Icon name="x" size="xs" />
                </button>
              </span>
            );
          })}
          {filters.onlyInStock && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#DBEAFE] px-3 py-1 text-xs font-bold text-[#1E3A8A]">
              <span>Còn hàng</span>
            </span>
          )}
        </div>
      )}

      {/* Phân đoạn 1: Danh Mục Hải Sản */}
      <div className="border-b border-[#E2E8F0] py-5">
        <h4 className="text-xs font-extrabold tracking-wider text-[#0F172A] uppercase">
          Danh Mục Hải Sản
        </h4>
        <div className="mt-3 space-y-2.5">
          {CATEGORY_FILTER_LIST.map((item) => {
            const isChecked = filters.categories.includes(item.slug);
            return (
              <label
                key={item.id}
                className="flex cursor-pointer items-center justify-between text-xs text-text-secondary hover:text-[#0F172A]"
              >
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    aria-label={`Chọn danh mục ${item.name}`}
                    checked={isChecked}
                    onChange={() => {
                      toggleCategory(item.slug);
                    }}
                    className="h-4 w-4 rounded border-[#E2E8F0] text-[#1E3A8A] focus:ring-[#1E3A8A]"
                  />
                  <span className={isChecked ? "font-bold text-[#1E3A8A]" : ""}>
                    {item.name}
                  </span>
                </div>
                <span className="text-[11px] text-text-secondary">
                  ({item.count})
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Phân đoạn 2: Khoảng Giá */}
      <div className="border-b border-[#E2E8F0] py-5">
        <h4 className="text-xs font-extrabold tracking-wider text-[#0F172A] uppercase">
          Khoảng Giá (VNĐ)
        </h4>

        {/* Thanh trượt giá giả lập */}
        <div className="mt-4 px-1">
          <div className="relative h-2 w-full rounded-full bg-[#E2E8F0]">
            <div
              className="absolute h-2 rounded-full bg-[#F97316]"
              style={{
                left: `${Math.min(100, Math.max(0, (filters.minPrice / 2_500_000) * 100))}%`,
                right: `${Math.min(100, Math.max(0, 100 - (filters.maxPrice / 2_500_000) * 100))}%`,
              }}
            />
            <div
              className="absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-2 border-white bg-[#F97316] shadow-md"
              style={{
                left: `${Math.min(100, Math.max(0, (filters.minPrice / 2_500_000) * 100))}%`,
              }}
            />
            <div
              className="absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-2 border-white bg-[#F97316] shadow-md"
              style={{
                left: `${Math.min(100, Math.max(0, (filters.maxPrice / 2_500_000) * 100))}%`,
              }}
            />
          </div>
          <div className="mt-2 flex justify-between text-[10px] text-text-secondary">
            <span>0đ</span>
            <span>2.500.000đ</span>
          </div>
        </div>

        {/* Ô nhập giá Min / Max */}
        <div className="mt-4 flex items-center gap-2">
          <input
            type="text"
            aria-label="Giá tối thiểu"
            value={filters.minPrice.toLocaleString("vi-VN")}
            readOnly
            className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3 py-2 text-center text-xs font-bold text-[#0F172A]"
          />
          <span className="text-xs text-text-secondary">-</span>
          <input
            type="text"
            aria-label="Giá tối đa"
            value={filters.maxPrice.toLocaleString("vi-VN")}
            readOnly
            className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3 py-2 text-center text-xs font-bold text-[#0F172A]"
          />
        </div>
      </div>

      {/* Phân đoạn 3: Trạng Thái Kho Hàng */}
      <div className="border-b border-[#E2E8F0] py-5">
        <h4 className="text-xs font-extrabold tracking-wider text-[#0F172A] uppercase">
          Trạng Thái Kho Hàng
        </h4>
        <div className="mt-3 space-y-2.5">
          <label className="flex cursor-pointer items-center gap-2.5 text-xs text-text-secondary hover:text-[#0F172A]">
            <input
              type="checkbox"
              aria-label="Chỉ hiển thị sản phẩm Còn Hàng"
              checked={filters.onlyInStock}
              onChange={() => {
                onFilterChange({
                  ...filters,
                  onlyInStock: !filters.onlyInStock,
                });
              }}
              className="h-4 w-4 rounded border-[#E2E8F0] text-[#1E3A8A] focus:ring-[#1E3A8A]"
            />
            <span>Chỉ hiển thị sản phẩm Còn Hàng</span>
          </label>
          <label className="flex cursor-pointer items-center gap-2.5 text-xs text-text-secondary hover:text-[#0F172A]">
            <input
              type="checkbox"
              aria-label="Bao gồm sản phẩm Sắp Về Hàng"
              checked={filters.includeUpcoming}
              onChange={() => {
                onFilterChange({
                  ...filters,
                  includeUpcoming: !filters.includeUpcoming,
                });
              }}
              className="h-4 w-4 rounded border-[#E2E8F0] text-[#1E3A8A] focus:ring-[#1E3A8A]"
            />
            <span>Bao gồm sản phẩm Sắp Về Hàng</span>
          </label>
        </div>
      </div>

      {/* Phân đoạn 4: Cam Kết Phục Vụ */}
      <div className="pt-5">
        <h4 className="text-xs font-extrabold tracking-wider text-[#0F172A] uppercase">
          Cam Kết Phục Vụ
        </h4>
        <div className="mt-3 space-y-2.5">
          <label className="flex cursor-pointer items-center gap-2.5 text-xs text-text-secondary hover:text-[#0F172A]">
            <input
              type="checkbox"
              aria-label="Giao hỏa tốc 2 giờ"
              checked={filters.fastShippingOnly}
              onChange={() => {
                onFilterChange({
                  ...filters,
                  fastShippingOnly: !filters.fastShippingOnly,
                });
              }}
              className="h-4 w-4 rounded border-[#E2E8F0] text-[#1E3A8A] focus:ring-[#1E3A8A]"
            />
            <span>Giao hỏa tốc 2 giờ</span>
          </label>
          <label className="flex cursor-pointer items-center gap-2.5 text-xs text-text-secondary hover:text-[#0F172A]">
            <input
              type="checkbox"
              aria-label="Hỗ trợ làm sạch, tách vỏ"
              checked={filters.cleanPrepOnly}
              onChange={() => {
                onFilterChange({
                  ...filters,
                  cleanPrepOnly: !filters.cleanPrepOnly,
                });
              }}
              className="h-4 w-4 rounded border-[#E2E8F0] text-[#1E3A8A] focus:ring-[#1E3A8A]"
            />
            <span>Hỗ trợ làm sạch, tách vỏ</span>
          </label>
        </div>
      </div>
    </aside>
  );
}
