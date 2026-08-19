'use client';

import { Icon } from '@/components/common/Icon';
import type { Product } from '@/types/api';
import { SearchInstantHotKeywords } from './instant/SearchInstantHotKeywords';
import { SearchInstantResults } from './instant/SearchInstantResults';

type SearchInstantDropdownProps = {
  isOpen: boolean;
  query: string;
  isLoading: boolean;
  results: Product[];
  onClose: () => void;
  onSelectProduct?: (product: Product) => void;
};

export const SearchInstantDropdown = (props: SearchInstantDropdownProps) => {
  const { isOpen, query, isLoading, results, onClose, onSelectProduct } = props;

  if (!isOpen) {
    return null;
  }

  const trimmedQuery = query.trim();

  return (
    <div className="absolute top-full right-0 left-0 z-50 mt-2 overflow-hidden rounded-2xl border border-border bg-card shadow-xl transition-all">
      {isLoading && (
        <div className="flex items-center justify-center gap-2 p-6 text-xs text-muted-foreground">
          <Icon name="refresh-cw" size="xs" className="animate-spin text-secondary" />
          <span>Đang tìm hải sản tươi ngon...</span>
        </div>
      )}

      {!isLoading && trimmedQuery.length === 0 && <SearchInstantHotKeywords onClose={onClose} />}

      {!isLoading && trimmedQuery.length > 0 && (
        <SearchInstantResults
          results={results}
          trimmedQuery={trimmedQuery}
          onClose={onClose}
          onSelectProduct={onSelectProduct}
        />
      )}
    </div>
  );
};
