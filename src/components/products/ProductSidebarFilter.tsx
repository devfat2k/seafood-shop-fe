'use client';

import { Icon } from '@/components/common/Icon';

export type CategoryFilterItem = {
  id: number | string;
  name: string;
  slug: string;
  count?: number;
};

export type FilterState = {
  categories: string[];
  minPrice: number;
  maxPrice: number;
  onlyInStock: boolean;
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
  { id: 'cat-tom', name: 'Tôm Hùm & Tôm Biển', slug: 'tom-cua', count: 18 },
  { id: 'cat-cua', name: 'Cua Huỳnh Đế & Ghẹ', slug: 'cua-ghe', count: 14 },
  { id: 'cat-muc', name: 'Mực Nháy & Bạch Tuộc', slug: 'muc-tuoi', count: 22 },
  {
    id: 'cat-ca',
    name: 'Cá Biển Cắt Lát & 1 Nắng',
    slug: 'ca-mot-nang',
    count: 16,
  },
  { id: 'cat-oc', name: 'Nghêu, Sò & Ốc Hương', slug: 'so-oc', count: 28 },
  {
    id: 'cat-combo',
    name: 'Combo Đại Tiệc & Lẩu',
    slug: 'combo-set',
    count: 8,
  },
];

const PRICE_PRESETS = [
  { label: 'Tất cả mức giá', min: 0, max: 10_000_000 },
  { label: 'Dưới 300.000₫', min: 0, max: 300_000 },
  { label: '300.000₫ - 700.000₫', min: 300_000, max: 700_000 },
  { label: '700.000₫ - 1.500.000₫', min: 700_000, max: 1_500_000 },
  { label: 'Trên 1.500.000₫', min: 1_500_000, max: 10_000_000 },
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

  const isPresetActive = (min: number, max: number) =>
    filters.minPrice === min && filters.maxPrice === max;

  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.minPrice > 0 ||
    filters.maxPrice < 10_000_000 ||
    filters.onlyInStock ||
    filters.fastShippingOnly ||
    filters.cleanPrepOnly;

  return (
    <aside className="w-full space-y-6 rounded-2xl border border-border bg-card p-5 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div className="flex items-center gap-2">
          <Icon name="sliders-horizontal" size="sm" className="text-secondary" />
          <h3 className="font-heading text-base font-bold text-foreground">Bộ Lọc Tìm Kiếm</h3>
        </div>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="flex items-center gap-1 text-xs font-bold text-primary transition-colors hover:opacity-80"
          >
            <span>⟲ Xoá lọc</span>
          </button>
        )}
      </div>

      {/* Applied Filter Chips */}
      {filters.categories.length > 0 && (
        <div className="space-y-2 border-b border-border pb-4">
          <span className="text-[11px] font-bold text-muted-foreground uppercase">
            Đang chọn ({filters.categories.length})
          </span>
          <div className="flex flex-wrap gap-1.5">
            {filters.categories.map((slug) => {
              const cat = categoryList.find((c) => c.slug === slug);
              return (
                <span
                  key={slug}
                  className="inline-flex items-center gap-1.5 rounded-full bg-secondary/10 px-2.5 py-1 text-xs font-semibold text-secondary"
                >
                  <span>{cat?.name ?? slug}</span>
                  <button
                    type="button"
                    aria-label={`Xoá lọc ${cat?.name}`}
                    onClick={() => {
                      removeCategoryTag(slug);
                    }}
                    className="rounded-full p-0.5 hover:bg-secondary/20"
                  >
                    <Icon name="x" size="xs" />
                  </button>
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* Category Filter */}
      <div className="space-y-3">
        <h4 className="font-heading text-sm font-bold text-foreground">Danh Mục Hải Sản</h4>
        <div className="space-y-1.5">
          {categoryList.map((cat) => {
            const isChecked = filters.categories.includes(cat.slug);
            return (
              <label
                key={cat.id}
                className="flex cursor-pointer items-center justify-between rounded-lg px-2 py-1.5 text-xs transition-colors hover:bg-muted/50"
              >
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    aria-label={`Lọc danh mục ${cat.name}`}
                    onChange={() => {
                      toggleCategory(cat.slug);
                    }}
                    className="h-4 w-4 rounded border-border text-secondary accent-secondary focus:ring-secondary"
                  />
                  <span
                    className={`font-medium ${isChecked ? 'font-bold text-foreground' : 'text-muted-foreground'}`}
                  >
                    {cat.name}
                  </span>
                </div>
                {cat.count !== undefined && (
                  <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                    {cat.count}
                  </span>
                )}
              </label>
            );
          })}
        </div>
      </div>

      {/* Price Range Presets */}
      <div className="space-y-3 border-t border-border pt-4">
        <h4 className="font-heading text-sm font-bold text-foreground">Khoảng Giá</h4>
        <div className="space-y-1.5">
          {PRICE_PRESETS.map((preset, idx) => {
            const active = isPresetActive(preset.min, preset.max);
            return (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  onFilterChange({
                    ...filters,
                    minPrice: preset.min,
                    maxPrice: preset.max,
                  });
                }}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs transition-all ${
                  active
                    ? 'bg-secondary font-bold text-secondary-foreground shadow-xs'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <span>{preset.label}</span>
                {active && <Icon name="check" size="xs" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Trust Guarantee Mini Box */}
      <div className="rounded-xl border border-tertiary/30 bg-tertiary/5 p-3 text-xs">
        <div className="flex items-center gap-1.5 font-bold text-tertiary">
          <Icon name="shield-check" size="xs" />
          <span>Cam kết tươi sống 100%</span>
        </div>
        <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
          Hoàn tiền hoặc đổi mới 1-1 nếu hải sản không đạt chuẩn tươi ngon khi nhận.
        </p>
      </div>
    </aside>
  );
}
