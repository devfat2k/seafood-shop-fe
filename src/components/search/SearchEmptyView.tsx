'use client';

import { Icon } from '@/components/common/Icon';

const HOT_SEARCH_SUGGESTIONS = [
  'Tôm hùm Phan Thiết',
  'Cua Cà Mau',
  'Cá thu một nắng',
  'Mực lá tươi',
  'Ngao 2 vòi',
  'Bạch tuộc bơi',
];

type SearchEmptyViewProps = {
  queryParam: string;
  hasActiveFilters: boolean;
  onSearchSubmit: (query: string) => void;
  onResetAll: () => void;
};

export function SearchEmptyView({
  queryParam,
  hasActiveFilters,
  onSearchSubmit,
  onResetAll,
}: SearchEmptyViewProps) {
  return (
    <div className="mx-auto flex min-h-[55vh] max-w-xl flex-col items-center justify-center rounded-3xl border border-border bg-card px-6 py-12 text-center shadow-xs">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary/10 text-secondary">
        <Icon name="fish" size="xl" />
      </div>
      <h3 className="mt-4 font-heading text-xl font-bold text-foreground sm:text-2xl">
        Không tìm thấy hải sản phù hợp
      </h3>
      {queryParam ? (
        <p className="mt-2 text-xs text-muted-foreground sm:text-sm">
          Rất tiếc, chúng tôi không tìm thấy kết quả nào phù hợp với từ khóa &quot;
          <strong className="text-foreground">{queryParam}</strong>&quot;.
        </p>
      ) : (
        <p className="mt-2 text-xs text-muted-foreground sm:text-sm">
          Không có sản phẩm nào phù hợp với tiêu chí lọc bạn đã chọn.
        </p>
      )}

      <div className="mt-8 w-full">
        <p className="text-xs font-semibold text-muted-foreground uppercase">
          Gợi ý tìm kiếm phổ biến:
        </p>
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          {HOT_SEARCH_SUGGESTIONS.map((sug) => (
            <button
              key={sug}
              type="button"
              onClick={() => {
                onSearchSubmit(sug);
              }}
              className="rounded-full border border-border bg-background px-3.5 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-secondary hover:text-secondary"
            >
              {sug}
            </button>
          ))}
        </div>
      </div>

      {hasActiveFilters && (
        <button
          type="button"
          onClick={onResetAll}
          className="mt-8 rounded-xl bg-primary px-6 py-2.5 text-xs font-bold text-white shadow-sm hover:opacity-90"
        >
          Xóa toàn bộ bộ lọc
        </button>
      )}
    </div>
  );
}
