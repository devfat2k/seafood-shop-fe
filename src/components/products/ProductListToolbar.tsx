'use client';

import { Icon } from '@/components/common/Icon';

type ProductListToolbarProps = {
  totalCount: number;
  shownRange: string;
  sortBy: string;
  onSortChange: (sort: string) => void;
  onToggleMobileFilter?: () => void;
};

export function ProductListToolbar(props: ProductListToolbarProps) {
  const { totalCount, shownRange, sortBy, onSortChange, onToggleMobileFilter } = props;

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      {/* Thông tin số lượng */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-text-secondary">
          Hiển thị <span className="font-bold text-[#0F172A]">{shownRange}</span> của{' '}
          <span className="font-bold text-[#1E3A8A]">{totalCount}</span> sản phẩm phù hợp
        </p>

        {/* Nút lọc mobile */}
        {onToggleMobileFilter && (
          <button
            type="button"
            onClick={() => {
              onToggleMobileFilter();
            }}
            className="flex items-center gap-1.5 rounded-full border border-[#E2E8F0] bg-[#EDF2F7] px-3 py-1.5 text-xs font-bold text-[#1E3A8A] lg:hidden"
          >
            <Icon name="filter" size="sm" />
            <span>Bộ lọc</span>
          </button>
        )}
      </div>

      {/* Dropdown Sắp xếp */}
      <div className="flex items-center gap-2">
        <label htmlFor="sort-dropdown" className="text-xs font-semibold text-text-secondary">
          Sắp xếp:
        </label>
        <select
          id="sort-dropdown"
          value={sortBy}
          onChange={(e) => {
            onSortChange(e.target.value);
          }}
          className="rounded-full border border-[#E2E8F0] bg-[#EDF2F7] px-4 py-1.5 text-xs font-bold text-[#0F172A] transition-colors focus:border-[#1E3A8A] focus:outline-none"
        >
          <option value="newest">Mới nhất hôm nay</option>
          <option value="popular">Bán chạy nhất</option>
          <option value="price-asc">Giá: Thấp đến Cao</option>
          <option value="price-desc">Giá: Cao đến Thấp</option>
        </select>
      </div>
    </div>
  );
}
