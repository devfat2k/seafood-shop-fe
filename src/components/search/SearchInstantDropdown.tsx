'use client';

import Image from 'next/image';
import { Icon } from '@/components/common/Icon';
import { Link } from '@/libs/I18nNavigation';
import type { Product } from '@/types/api';

type SearchInstantDropdownProps = {
  isOpen: boolean;
  query: string;
  isLoading: boolean;
  results: Product[];
  onClose: () => void;
  onSelectProduct?: (product: Product) => void;
};

const HOT_KEYWORDS = [
  'Tôm hùm Phan Thiết',
  'Cua Cà Mau tươi',
  'Cá thu một nắng',
  'Mực lá bến cảng',
];

function SearchInstantHotKeywords({ onClose }: { onClose: () => void }) {
  return (
    <div className="p-4">
      <span className="block text-[11px] font-bold text-muted-foreground uppercase">
        Từ khóa được tìm nhiều
      </span>
      <div className="mt-2 flex flex-wrap gap-2">
        {HOT_KEYWORDS.map((kw) => (
          <Link
            key={kw}
            href={`/search?q=${encodeURIComponent(kw)}`}
            onClick={onClose}
            className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs text-foreground transition-all hover:border-secondary hover:text-secondary"
          >
            {kw}
          </Link>
        ))}
      </div>
    </div>
  );
}

function SearchInstantResults({
  results,
  trimmedQuery,
  onClose,
  onSelectProduct,
}: {
  results: Product[];
  trimmedQuery: string;
  onClose: () => void;
  onSelectProduct?: (product: Product) => void;
}) {
  if (results.length === 0) {
    return (
      <div className="p-6 text-center">
        <p className="text-xs font-bold text-foreground">
          Không tìm thấy sản phẩm cho &quot;{trimmedQuery}&quot;
        </p>
        <p className="mt-1 text-[11px] text-muted-foreground">
          Thử tìm kiếm với các từ khóa ngắn gọn hơn hoặc xem gợi ý bên dưới.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="border-b border-border/60 bg-muted/30 px-4 py-2 text-[11px] font-bold text-muted-foreground uppercase">
        Sản phẩm gợi ý ({results.length})
      </div>

      <div className="divide-y divide-border/40">
        {results.slice(0, 5).map((product) => {
          const imgUrl = product.imageUrl ?? product.images?.[0] ?? '';

          return (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              onClick={() => {
                if (onSelectProduct) {
                  onSelectProduct(product);
                }
                onClose();
              }}
              className="flex items-center gap-3 p-3 transition-colors hover:bg-muted/50"
            >
              <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg border border-border bg-muted">
                {imgUrl ? (
                  <Image
                    src={imgUrl}
                    alt={product.name}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                    <Icon name="fish" size="xs" />
                  </div>
                )}
              </div>

              <div className="flex min-w-0 flex-1 flex-col justify-center">
                <span className="truncate text-xs font-bold text-foreground">{product.name}</span>
                <span className="text-[11px] text-muted-foreground">
                  {product.categoryName ?? 'Hải Sản Tươi Sống'}
                </span>
              </div>

              <span className="shrink-0 font-heading text-xs font-bold text-primary">
                {product.price.toLocaleString('vi-VN')}₫
              </span>
            </Link>
          );
        })}
      </div>

      <Link
        href={`/search?q=${encodeURIComponent(trimmedQuery)}`}
        onClick={onClose}
        className="flex items-center justify-center gap-2 border-t border-border bg-muted/20 p-3 text-xs font-bold text-secondary transition-colors hover:bg-muted/50 hover:text-primary"
      >
        <span>Xem tất cả kết quả cho &quot;{trimmedQuery}&quot;</span>
        <Icon name="arrow-right" size="xs" />
      </Link>
    </div>
  );
}

export function SearchInstantDropdown(props: SearchInstantDropdownProps) {
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
}
