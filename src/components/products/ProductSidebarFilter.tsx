'use client';

import { CATEGORY_FILTER_LIST } from '@/data/products-catalog-mock';
import type { CatalogProduct } from '@/data/products-catalog-mock';

type FilterState = {
  categories: CatalogProduct['categorySlug'][];
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

  const toggleCategory = (slug: CatalogProduct['categorySlug']) => {
    const exists = filters.categories.includes(slug);
    const updated = exists
      ? filters.categories.filter((c) => c !== slug)
      : [...filters.categories, slug];

    onFilterChange({
      ...filters,
      categories: updated,
    });
  };

  const removeCategoryTag = (slug: CatalogProduct['categorySlug']) => {
    onFilterChange({
      ...filters,
      categories: filters.categories.filter((c) => c !== slug),
    });
  };

  return (
    <aside className="w-full rounded-3xl border border-[#E4E0D8] bg-[#FBF8F3] p-5 shadow-sm">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between border-b border-[#E4E0D8] pb-4">
        <div className="flex items-center gap-2">
          <svg
            className="h-5 w-5 text-[#0E3D34]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          <h3 className="text-base font-extrabold text-[#26312D]">Bộ Lọc Tìm Kiếm</h3>
        </div>
        <button
          type="button"
          onClick={() => {
            onResetFilters();
          }}
          className="flex items-center gap-1 text-xs font-bold text-[#5B6B63] transition-colors hover:text-[#D9A441]"
        >
          <span>⟲ Xoá bộ lọc</span>
        </button>
      </div>

      {/* Applied Filter Chips */}
      {filters.categories.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 border-b border-[#E4E0D8] py-3">
          {filters.categories.map((slug) => {
            const cat = CATEGORY_FILTER_LIST.find((c) => c.slug === slug);
            return (
              <span
                key={slug}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#E4EEEA] px-3 py-1 text-xs font-bold text-[#0E3D34]"
              >
                <span>{cat?.name ?? slug}</span>
                <button
                  type="button"
                  aria-label={`Xoá lọc ${cat?.name}`}
                  onClick={() => {
                    removeCategoryTag(slug);
                  }}
                  className="rounded-full hover:bg-[#0E3D34]/10"
                >
                  ✕
                </button>
              </span>
            );
          })}
          {filters.onlyInStock && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E4EEEA] px-3 py-1 text-xs font-bold text-[#0E3D34]">
              <span>Còn hàng</span>
            </span>
          )}
        </div>
      )}

      {/* Phân đoạn 1: Danh Mục Hải Sản */}
      <div className="border-b border-[#E4E0D8] py-5">
        <h4 className="text-xs font-extrabold tracking-wider text-[#26312D] uppercase">
          Danh Mục Hải Sản
        </h4>
        <div className="mt-3 space-y-2.5">
          {CATEGORY_FILTER_LIST.map((item) => {
            const isChecked = filters.categories.includes(item.slug);
            return (
              <label
                key={item.id}
                className="flex cursor-pointer items-center justify-between text-xs text-[#5B6B63] hover:text-[#26312D]"
              >
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    aria-label={`Chọn danh mục ${item.name}`}
                    checked={isChecked}
                    onChange={() => {
                      toggleCategory(item.slug);
                    }}
                    className="h-4 w-4 rounded border-[#E4E0D8] text-[#0E3D34] focus:ring-[#0E3D34]"
                  />
                  <span className={isChecked ? 'font-bold text-[#0E3D34]' : ''}>{item.name}</span>
                </div>
                <span className="text-[11px] text-[#5B6B63]">({item.count})</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Phân đoạn 2: Khoảng Giá */}
      <div className="border-b border-[#E4E0D8] py-5">
        <h4 className="text-xs font-extrabold tracking-wider text-[#26312D] uppercase">
          Khoảng Giá (VNĐ)
        </h4>

        {/* Thanh trượt giá giả lập */}
        <div className="mt-4 px-1">
          <div className="relative h-2 w-full rounded-full bg-[#E4E0D8]">
            <div
              className="absolute h-2 rounded-full bg-[#D9A441]"
              style={{ left: '10%', right: '20%' }}
            />
            <div
              className="absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-2 border-white bg-[#D9A441] shadow-md"
              style={{ left: '10%' }}
            />
            <div
              className="absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-2 border-white bg-[#D9A441] shadow-md"
              style={{ left: '80%' }}
            />
          </div>
          <div className="mt-2 flex justify-between text-[10px] text-[#5B6B63]">
            <span>100.000đ</span>
            <span>2.500.000đ</span>
          </div>
        </div>

        {/* Ô nhập giá Min / Max */}
        <div className="mt-4 flex items-center gap-2">
          <input
            type="text"
            aria-label="Giá tối thiểu"
            value={filters.minPrice.toLocaleString('vi-VN')}
            readOnly
            className="w-full rounded-xl border border-[#E4E0D8] bg-white px-3 py-2 text-center text-xs font-bold text-[#26312D]"
          />
          <span className="text-xs text-[#5B6B63]">-</span>
          <input
            type="text"
            aria-label="Giá tối đa"
            value={filters.maxPrice.toLocaleString('vi-VN')}
            readOnly
            className="w-full rounded-xl border border-[#E4E0D8] bg-white px-3 py-2 text-center text-xs font-bold text-[#26312D]"
          />
        </div>
      </div>

      {/* Phân đoạn 3: Trạng Thái Kho Hàng */}
      <div className="border-b border-[#E4E0D8] py-5">
        <h4 className="text-xs font-extrabold tracking-wider text-[#26312D] uppercase">
          Trạng Thái Kho Hàng
        </h4>
        <div className="mt-3 space-y-2.5">
          <label className="flex cursor-pointer items-center gap-2.5 text-xs text-[#5B6B63] hover:text-[#26312D]">
            <input
              type="checkbox"
              aria-label="Chỉ hiển thị sản phẩm Còn Hàng"
              checked={filters.onlyInStock}
              onChange={() => {
                onFilterChange({ ...filters, onlyInStock: !filters.onlyInStock });
              }}
              className="h-4 w-4 rounded border-[#E4E0D8] text-[#0E3D34] focus:ring-[#0E3D34]"
            />
            <span>Chỉ hiển thị sản phẩm Còn Hàng</span>
          </label>
          <label className="flex cursor-pointer items-center gap-2.5 text-xs text-[#5B6B63] hover:text-[#26312D]">
            <input
              type="checkbox"
              aria-label="Bao gồm sản phẩm Sắp Về Hàng"
              checked={filters.includeUpcoming}
              onChange={() => {
                onFilterChange({ ...filters, includeUpcoming: !filters.includeUpcoming });
              }}
              className="h-4 w-4 rounded border-[#E4E0D8] text-[#0E3D34] focus:ring-[#0E3D34]"
            />
            <span>Bao gồm sản phẩm Sắp Về Hàng</span>
          </label>
        </div>
      </div>

      {/* Phân đoạn 4: Cam Kết Phục Vụ */}
      <div className="pt-5">
        <h4 className="text-xs font-extrabold tracking-wider text-[#26312D] uppercase">
          Cam Kết Phục Vụ
        </h4>
        <div className="mt-3 space-y-2.5">
          <label className="flex cursor-pointer items-center gap-2.5 text-xs text-[#5B6B63] hover:text-[#26312D]">
            <input
              type="checkbox"
              aria-label="Giao hỏa tốc 2 giờ"
              checked={filters.fastShippingOnly}
              onChange={() => {
                onFilterChange({ ...filters, fastShippingOnly: !filters.fastShippingOnly });
              }}
              className="h-4 w-4 rounded border-[#E4E0D8] text-[#0E3D34] focus:ring-[#0E3D34]"
            />
            <span>Giao hỏa tốc 2 giờ</span>
          </label>
          <label className="flex cursor-pointer items-center gap-2.5 text-xs text-[#5B6B63] hover:text-[#26312D]">
            <input
              type="checkbox"
              aria-label="Hỗ trợ làm sạch, tách vỏ"
              checked={filters.cleanPrepOnly}
              onChange={() => {
                onFilterChange({ ...filters, cleanPrepOnly: !filters.cleanPrepOnly });
              }}
              className="h-4 w-4 rounded border-[#E4E0D8] text-[#0E3D34] focus:ring-[#0E3D34]"
            />
            <span>Hỗ trợ làm sạch, tách vỏ</span>
          </label>
        </div>
      </div>
    </aside>
  );
}
