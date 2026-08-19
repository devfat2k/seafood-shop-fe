'use client';

import Image from 'next/image';
import { Icon } from '@/components/common/Icon';
import { Link } from '@/libs/I18nNavigation';
import type { Product } from '@/types/api';
import { formatCurrency } from '@/utils/Helpers';

type SearchInstantResultsProps = {
  results: Product[];
  trimmedQuery: string;
  onClose: () => void;
  onSelectProduct?: (product: Product) => void;
};

export const SearchInstantResults = ({
  results,
  trimmedQuery,
  onClose,
  onSelectProduct,
}: SearchInstantResultsProps) => {
  if (results.length === 0) {
    return (
      <div className="p-6 text-center">
        <p className="text-xs font-bold text-foreground">
          Không tìm thấy sản phẩm cho &quot;{trimmedQuery}&quot;
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Thử tìm kiếm với các từ khóa ngắn gọn hơn hoặc xem gợi ý bên dưới.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="border-b border-border/60 bg-muted/30 px-4 py-2 text-xs font-bold text-muted-foreground uppercase">
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
                <span className="text-xs text-muted-foreground">
                  {product.categoryName ?? 'Hải Sản Tươi Sống'}
                </span>
              </div>

              <span className="shrink-0 font-heading text-xs font-bold text-primary">
                {formatCurrency(product.price)}
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
};
