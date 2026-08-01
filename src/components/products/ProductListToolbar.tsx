'use client';

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
    <div className="flex flex-col gap-4 rounded-2xl border border-[#E4E0D8] bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      {/* Thông tin số lượng */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-[#5B6B63]">
          Hiển thị <span className="font-bold text-[#26312D]">{shownRange}</span> của{' '}
          <span className="font-bold text-[#0E3D34]">{totalCount}</span> sản phẩm phù hợp
        </p>

        {/* Nút lọc mobile */}
        {onToggleMobileFilter && (
          <button
            type="button"
            onClick={() => {
              onToggleMobileFilter();
            }}
            className="flex items-center gap-1.5 rounded-full border border-[#E4E0D8] bg-[#F5F1E8] px-3 py-1.5 text-xs font-bold text-[#0E3D34] lg:hidden"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            <span>Bộ lọc</span>
          </button>
        )}
      </div>

      {/* Dropdown Sắp xếp */}
      <div className="flex items-center gap-2">
        <label htmlFor="sort-dropdown" className="text-xs font-semibold text-[#5B6B63]">
          Sắp xếp:
        </label>
        <select
          id="sort-dropdown"
          value={sortBy}
          onChange={(e) => {
            onSortChange(e.target.value);
          }}
          className="rounded-full border border-[#E4E0D8] bg-[#F5F1E8] px-4 py-1.5 text-xs font-bold text-[#26312D] transition-colors focus:border-[#0E3D34] focus:outline-none"
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
