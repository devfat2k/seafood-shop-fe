'use client';

import { Icon } from '@/components/common/Icon';

export type CategoryFilterItem = {
  id: number | string;
  name: string;
  slug: string;
  count?: number;
};

type FilterState = {
  categories: string[];
  minPrice: number;
  maxPrice: number;
  onlyInStock: boolean;
  includeUpcoming: boolean;
  fastShippingOnly: boolean;
  cleanPrepOnly: boolean;
};

type ProductSidebarFilterProps = {
  filters: FilterState;
  categoryList?: CategoryFilterItem[];
  onFilterChange: (newFilters: FilterState) => void;
  onResetFilters: () => void;
};

const DEFAULT_CATEGORIES: CategoryFilterItem[] = [
  { id: 'cat-combo', name: 'Set Hải Sản BBQ & Nhậu', slug: 'set-combo', count: 12 },
  { id: 'cat-tom-cua', name: 'Tôm Hùm & Cua Ghẹ', slug: 'tom-cua', count: 18 },
  { id: 'cat-muc', name: 'Mực & Bạch Tuộc', slug: 'muc-bach-tuoc', count: 24 },
  { id: 'cat-so-oc', name: 'Nghêu, Sò & Ốc', slug: 'so-oc', count: 30 },
  { id: 'cat-che-bien', name: 'Chế Biến Sẵn & Phile', slug: 'che-bien-san', count: 15 },
  { id: 'cat-kho', name: 'Đặc Sản Khô & Gia Vị', slug: 'dac-san-kho', count: 21 },
];

export function ProductSidebarFilter(props: ProductSidebarFilterProps) {
  const { filters, categoryList = DEFAULT_CATEGORIES, onFilterChange, onResetFilters } = props;

  const toggleCategory = (slug: string) => {
    const exists = filters.categories.includes(slug);
    const updated = exists
      ? filters.categories.filter((c) => c !== slug)
      : [...filters.categories, slug];

    onFilterChange({
      ...filters,
      categories: updated,
    });
  };

  const removeCategoryTag = (slug: string) => {
    onFilterChange({
      ...filters,
      categories: filters.categories.filter((c) => c !== slug),
    });
  };

  return (
    <aside className="w-full rounded-3xl border border-[#E4E0D8] bg-white p-5 shadow-xs">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between border-b border-[#E4E0D8] pb-4">
        <div className="flex items-center gap-2">
          <Icon name="sliders-horizontal" size="sm" className="text-[#0B2F28]" />
          <h3 className="text-base font-extrabold text-[#26312D]">Bộ Lọc Tìm Kiếm</h3>
        </div>
        <button
          type="button"
          onClick={onResetFilters}
          className="flex items-center gap-1 text-xs font-bold text-text-secondary transition-colors hover:text-[#C4922F]"
        >
          <span>⟲ Xoá bộ lọc</span>
        </button>
      </div>

      {/* Applied Filter Chips */}
      {filters.categories.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 border-b border-[#E4E0D8] py-3">
          {filters.categories.map((slug) => {
            const cat = categoryList.find((c) => c.slug === slug);
            return (
              <span
                key={slug}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#E4EEEA] px-3 py-1 text-xs font-bold text-[#0B2F28]"
              >
                <span>{cat?.name ?? slug}</span>
                <button
                  type="button"
                  aria-label={`Xoá lọc ${cat?.name}`}
                  onClick={() => {
                    removeCategoryTag(slug);
                  }}
                  className="rounded-full hover:bg-[#0B2F28]/10"
                >
                  <Icon name="x" size="xs" />
                </button>
              </span>
            );
          })}
          {filters.onlyInStock && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E4EEEA] px-3 py-1 text-xs font-bold text-[#0B2F28]">
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
          {categoryList.map((item) => {
            const isChecked = filters.categories.includes(item.slug);
            return (
              <label
                key={item.id}
                className="flex cursor-pointer items-center justify-between text-xs text-text-secondary hover:text-[#26312D]"
              >
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    aria-label={`Chọn danh mục ${item.name}`}
                    checked={isChecked}
                    onChange={() => {
                      toggleCategory(item.slug);
                    }}
                    className="h-4 w-4 rounded border-[#E4E0D8] text-[#0B2F28] focus:ring-[#0B2F28]"
                  />
                  <span className={isChecked ? 'font-bold text-[#0B2F28]' : ''}>{item.name}</span>
                </div>
                {item.count !== undefined && (
                  <span className="text-[11px] text-text-secondary">({item.count})</span>
                )}
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

        <div className="mt-4 px-1">
          <div className="relative h-2 w-full rounded-full bg-[#E4E0D8]">
            <div
              className="absolute h-2 rounded-full bg-[#C4922F]"
              style={{
                left: `${Math.min(100, Math.max(0, (filters.minPrice / 2_500_000) * 100))}%`,
                right: `${Math.min(100, Math.max(0, 100 - (filters.maxPrice / 2_500_000) * 100))}%`,
              }}
            />
            <div
              className="absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-2 border-white bg-[#C4922F] shadow-md"
              style={{
                left: `${Math.min(100, Math.max(0, (filters.minPrice / 2_500_000) * 100))}%`,
              }}
            />
            <div
              className="absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-2 border-white bg-[#C4922F] shadow-md"
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

        <div className="mt-4 flex items-center gap-2">
          <input
            type="text"
            aria-label="Giá tối thiểu"
            value={filters.minPrice.toLocaleString('vi-VN')}
            readOnly
            className="w-full rounded-xl border border-[#E4E0D8] bg-[#FBF8F3] px-3 py-2 text-center text-xs font-bold text-[#26312D]"
          />
          <span className="text-xs text-text-secondary">-</span>
          <input
            type="text"
            aria-label="Giá tối đa"
            value={filters.maxPrice.toLocaleString('vi-VN')}
            readOnly
            className="w-full rounded-xl border border-[#E4E0D8] bg-[#FBF8F3] px-3 py-2 text-center text-xs font-bold text-[#26312D]"
          />
        </div>
      </div>

      {/* Phân đoạn 3: Trạng Thái Kho Hàng */}
      <div className="border-b border-[#E4E0D8] py-5">
        <h4 className="text-xs font-extrabold tracking-wider text-[#26312D] uppercase">
          Trạng Thái Kho Hàng
        </h4>
        <div className="mt-3 space-y-2.5">
          <label className="flex cursor-pointer items-center gap-2.5 text-xs text-text-secondary hover:text-[#26312D]">
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
              className="h-4 w-4 rounded border-[#E4E0D8] text-[#0B2F28] focus:ring-[#0B2F28]"
            />
            <span>Chỉ hiển thị sản phẩm Còn Hàng</span>
          </label>
        </div>
      </div>

      {/* Phân đoạn 4: Cam Kết Phục Vụ */}
      <div className="pt-5">
        <h4 className="text-xs font-extrabold tracking-wider text-[#26312D] uppercase">
          Cam Kết Phục Vụ
        </h4>
        <div className="mt-3 space-y-2.5">
          <label className="flex cursor-pointer items-center gap-2.5 text-xs text-text-secondary hover:text-[#26312D]">
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
              className="h-4 w-4 rounded border-[#E4E0D8] text-[#0B2F28] focus:ring-[#0B2F28]"
            />
            <span>Giao hỏa tốc 2 giờ</span>
          </label>
        </div>
      </div>
    </aside>
  );
}
