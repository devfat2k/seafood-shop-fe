'use client';

import { useState } from 'react';
import { Icon } from '@/components/common/Icon';

type SearchHeaderBarProps = {
  initialQuery?: string;
  totalResults?: number;
  onSearchSubmit: (query: string) => void;
};

export function SearchHeaderBar(props: SearchHeaderBarProps) {
  const { initialQuery = '', totalResults = 0, onSearchSubmit } = props;
  const [query, setQuery] = useState(initialQuery);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onSearchSubmit(query.trim());
  };

  const handleClear = () => {
    setQuery('');
    onSearchSubmit('');
  };

  return (
    <div className="space-y-4">
      {/* Search Input Bar */}
      <form onSubmit={handleSubmit} className="relative flex w-full items-center">
        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-muted-foreground">
            <Icon name="search" size="md" />
          </div>
          <input
            type="text"
            aria-label="Tìm kiếm hải sản"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            placeholder="Nhập tên hải sản (Tôm hùm, Cua Cà Mau, Cá thu...)"
            className="w-full rounded-2xl border border-border bg-card py-3.5 pr-10 pl-11 text-sm text-foreground shadow-xs transition-all placeholder:text-muted-foreground focus:border-secondary focus:ring-2 focus:ring-secondary/20 focus:outline-hidden sm:py-4 sm:text-base"
          />
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground"
              aria-label="Xoá từ khóa"
            >
              <Icon name="x" size="sm" />
            </button>
          )}
        </div>
        <button
          type="submit"
          className="ml-3 inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3.5 text-xs font-bold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 sm:py-4 sm:text-sm"
        >
          <span>Tìm kiếm</span>
          <Icon name="arrow-right" size="xs" />
        </button>
      </form>

      {/* Query Stats & Context */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-4 text-xs sm:text-sm">
        <div>
          {initialQuery ? (
            <p className="text-muted-foreground">
              Kết quả tìm kiếm cho từ khóa:{' '}
              <strong className="font-bold text-foreground">&quot;{initialQuery}&quot;</strong>
            </p>
          ) : (
            <p className="text-muted-foreground">Tất cả sản phẩm hải sản tươi sống tại bến</p>
          )}
        </div>
        <div className="flex items-center gap-1.5 font-bold text-secondary">
          <Icon name="fish" size="xs" />
          <span>Tìm thấy {totalResults} sản phẩm</span>
        </div>
      </div>
    </div>
  );
}
