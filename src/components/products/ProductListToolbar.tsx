'use client';

import { Icon } from '@/components/common/Icon';

type ProductListToolbarProps = {
  totalCount: number;
  shownRange: string;
  sortBy: string;
  viewMode?: 'grid' | 'list';
  onSortChange: (sort: string) => void;
  onViewModeChange?: (mode: 'grid' | 'list') => void;
  onToggleMobileFilter?: () => void;
};

export function ProductListToolbar(props: ProductListToolbarProps) {
  const {
    totalCount,
    shownRange,
    sortBy,
    viewMode = 'grid',
    onSortChange,
    onViewModeChange,
    onToggleMobileFilter,
  } = props;

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-3.5 shadow-xs sm:flex-row sm:items-center sm:justify-between sm:p-4">
      {/* Total Count and Mobile Filter Trigger */}
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground sm:text-sm">
          Hiển thị <span className="font-bold text-foreground">{shownRange}</span> trên tổng số{' '}
          <strong className="font-heading font-bold text-primary">{totalCount}</strong> hải sản
        </p>

        {/* Mobile Filter Button */}
        {onToggleMobileFilter && (
          <button
            type="button"
            onClick={onToggleMobileFilter}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/60 px-3.5 py-1.5 text-xs font-bold text-foreground transition-colors hover:bg-muted lg:hidden"
          >
            <Icon name="sliders-horizontal" size="xs" className="text-secondary" />
            <span>Lọc ({totalCount})</span>
          </button>
        )}
      </div>

      {/* Right: View Mode Switcher & Sort Dropdown */}
      <div className="flex items-center justify-between gap-3 sm:justify-end">
        {/* View Mode Toggle */}
        {onViewModeChange && (
          <div className="flex items-center rounded-xl border border-border bg-muted/40 p-0.5">
            <button
              type="button"
              onClick={() => {
                onViewModeChange('grid');
              }}
              aria-label="Xem dạng lưới"
              className={`rounded-lg p-1.5 transition-all ${
                viewMode === 'grid'
                  ? 'bg-card text-primary shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name="grid" size="xs" />
            </button>
            <button
              type="button"
              onClick={() => {
                onViewModeChange('list');
              }}
              aria-label="Xem dạng danh sách"
              className={`rounded-lg p-1.5 transition-all ${
                viewMode === 'list'
                  ? 'bg-card text-primary shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name="list" size="xs" />
            </button>
          </div>
        )}

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <label
            htmlFor="sort-dropdown"
            className="hidden text-xs font-medium whitespace-nowrap text-muted-foreground sm:inline"
          >
            Sắp xếp:
          </label>
          <div className="relative">
            <select
              id="sort-dropdown"
              value={sortBy}
              onChange={(e) => {
                onSortChange(e.target.value);
              }}
              className="appearance-none rounded-xl border border-border bg-background py-2 pr-8 pl-3 text-xs font-bold text-foreground transition-colors focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none"
            >
              <option value="newest">✨ Mới nhất cập cảng</option>
              <option value="popular">🔥 Bán chạy nhất</option>
              <option value="price-asc">💵 Giá: Thấp đến Cao</option>
              <option value="price-desc">💎 Giá: Cao đến Thấp</option>
            </select>
            <span className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 text-muted-foreground">
              <Icon name="chevron-down" size="xs" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
