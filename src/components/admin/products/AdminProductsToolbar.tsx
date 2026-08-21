'use client';

import { Icon } from '@/components/common/Icon';
import { Input } from '@/components/ui/input';
import { useAdminCategoriesQuery } from '@/libs/queries/admin/categories';

type AdminProductsToolbarProps = {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  debouncedSearch: string;
  onClearSearch: () => void;
  categoryFilter?: number;
  onCategoryFilterChange: (catId?: number) => void;
  productTypeFilter?: string;
  onProductTypeFilterChange: (type?: string) => void;
};

export function AdminProductsToolbar({
  searchTerm,
  onSearchChange,
  debouncedSearch,
  onClearSearch,
  categoryFilter,
  onCategoryFilterChange,
  productTypeFilter,
  onProductTypeFilterChange,
}: AdminProductsToolbarProps) {
  const { data: categories } = useAdminCategoriesQuery();

  return (
    <div className="space-y-3 pb-2">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        {/* Search input */}
        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
            <Icon name="search" size="xs" />
          </div>
          <Input
            placeholder="Tìm kiếm theo tên sản phẩm..."
            value={searchTerm}
            onChange={(e) => {
              onSearchChange(e.target.value);
            }}
            className="h-10 w-full rounded-xl pr-9 pl-9 text-xs sm:text-sm"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={onClearSearch}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground"
              aria-label="Xóa từ khóa"
            >
              <Icon name="x" size="xs" />
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Category filter */}
          <select
            value={categoryFilter ?? ''}
            onChange={(e) => {
              const val = e.target.value;
              onCategoryFilterChange(val ? Number(val) : undefined);
            }}
            className="h-10 rounded-xl border border-input bg-card px-3 text-xs font-semibold text-foreground shadow-2xs focus-visible:ring-1 focus-visible:ring-ring"
          >
            <option value="">Tất cả danh mục</option>
            {categories?.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name ?? cat.categoryName}
              </option>
            ))}
          </select>

          {/* Type filter */}
          <select
            value={productTypeFilter ?? ''}
            onChange={(e) => {
              onProductTypeFilterChange(e.target.value || undefined);
            }}
            className="h-10 rounded-xl border border-input bg-card px-3 text-xs font-semibold text-foreground shadow-2xs focus-visible:ring-1 focus-visible:ring-ring"
          >
            <option value="">Tất cả loại sản phẩm</option>
            <option value="REGULAR">Sản phẩm thường</option>
            <option value="COMBO">Gói Combo tiệc</option>
          </select>
        </div>
      </div>

      {debouncedSearch && (
        <div className="flex items-center justify-between rounded-xl bg-muted/50 px-3.5 py-2 text-xs">
          <span className="text-muted-foreground">
            Kết quả tìm kiếm cho:{' '}
            <strong className="font-semibold text-foreground">&quot;{debouncedSearch}&quot;</strong>
          </span>
          <button
            type="button"
            onClick={onClearSearch}
            className="font-semibold text-primary hover:underline"
          >
            Xóa tìm kiếm
          </button>
        </div>
      )}
    </div>
  );
}
