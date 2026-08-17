'use client';

import { Icon } from '@/components/common/Icon';
import type { Category } from '@/types/api';

type SearchFilterToolbarProps = {
  categories: Category[];
  selectedCategoryId?: number;
  selectedPriceRange?: string;
  selectedSort?: string;
  onCategoryChange: (catId?: number) => void;
  onPriceRangeChange: (range?: string) => void;
  onSortChange: (sort?: string) => void;
  onResetFilters: () => void;
};

const PRICE_RANGES = [
  { id: 'all', label: 'Tất cả giá', min: undefined, max: undefined },
  { id: 'under-200k', label: 'Dưới 200.000₫', min: 0, max: 200_000 },
  { id: '200k-500k', label: '200.000₫ - 500.000₫', min: 200_000, max: 500_000 },
  { id: '500k-1m', label: '500.000₫ - 1.000.000₫', min: 500_000, max: 1_000_000 },
  { id: 'above-1m', label: 'Trên 1.000.000₫', min: 1_000_000, max: undefined },
];

const SORT_OPTIONS = [
  { id: 'newest', label: 'Mới nhất cập bến', sort: 'id', direction: 'desc' },
  { id: 'price-asc', label: 'Giá từ thấp đến cao', sort: 'price', direction: 'asc' },
  { id: 'price-desc', label: 'Giá từ cao đến thấp', sort: 'price', direction: 'desc' },
  { id: 'popular', label: 'Sản phẩm nổi bật', sort: 'featured', direction: 'desc' },
];

export function SearchFilterToolbar(props: SearchFilterToolbarProps) {
  const {
    categories,
    selectedCategoryId,
    selectedPriceRange = 'all',
    selectedSort = 'newest',
    onCategoryChange,
    onPriceRangeChange,
    onSortChange,
    onResetFilters,
  } = props;

  const hasActiveFilters = Boolean(selectedCategoryId) || selectedPriceRange !== 'all';

  return (
    <div className="space-y-4 rounded-2xl border border-border bg-card p-4 shadow-xs sm:p-6">
      {/* Category Pills Slider */}
      <div>
        <span className="mb-2 block text-xs font-bold text-foreground">Danh mục hải sản:</span>
        <div className="flex scrollbar-none gap-2 overflow-x-auto pb-1">
          <button
            type="button"
            onClick={() => {
              onCategoryChange();
            }}
            className={`rounded-xl px-4 py-2 text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategoryId
                ? 'border border-border bg-background text-foreground hover:border-secondary'
                : 'bg-secondary text-secondary-foreground shadow-xs'
            }`}
          >
            Tất cả danh mục
          </button>
          {categories.map((cat) => {
            const isSelected = selectedCategoryId === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  onCategoryChange(cat.id);
                }}
                className={`rounded-xl px-4 py-2 text-xs font-bold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-secondary text-secondary-foreground shadow-xs'
                    : 'border border-border bg-background text-foreground hover:border-secondary'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Row 2: Price range filter pills & Sort dropdown */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border/60 pt-4">
        {/* Price range pills */}
        <div className="flex scrollbar-none items-center gap-2 overflow-x-auto">
          <span className="shrink-0 text-xs font-bold text-foreground">Khoảng giá:</span>
          <div className="flex gap-1.5">
            {PRICE_RANGES.map((pr) => {
              const isSelected = selectedPriceRange === pr.id;

              return (
                <button
                  key={pr.id}
                  type="button"
                  onClick={() => {
                    onPriceRangeChange(pr.id);
                  }}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-primary font-bold text-primary-foreground shadow-xs'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                  }`}
                >
                  {pr.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sort & Reset Actions */}
        <div className="flex items-center gap-3">
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              className="flex items-center gap-1 text-xs font-bold text-destructive hover:underline"
            >
              <Icon name="x" size="xs" />
              <span>Xoá bộ lọc</span>
            </button>
          )}

          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-foreground">Sắp xếp:</span>
            <select
              aria-label="Sắp xếp sản phẩm"
              value={selectedSort}
              onChange={(e) => {
                onSortChange(e.target.value);
              }}
              className="rounded-xl border border-border bg-background py-1.5 pr-8 pl-3 text-xs font-semibold text-foreground focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-hidden"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
