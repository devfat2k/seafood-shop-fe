import { Icon } from '@/components/common/Icon';
import type { Product } from '@/types/api';

type ProductHeaderInfoProps = {
  product: Product;
};

export function ProductHeaderInfo({ product }: ProductHeaderInfoProps) {
  const rating = product.rating ?? 4.9;
  const reviewCount = product.reviewCount ?? 48;
  const salesCount = typeof product.id === 'number' ? 120 + product.id * 14 : 168;
  const origin = product.origin ?? 'Cảng cá Phan Thiết, Bình Thuận';
  const categoryLabel = product.category?.name ?? product.categoryName ?? 'Hải Sản Tươi Sống';

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1 rounded-full bg-secondary/10 px-2.5 py-1 text-[11px] font-bold text-secondary">
          <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
          <span>{categoryLabel}</span>
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-tertiary/10 px-2.5 py-1 text-[11px] font-bold text-tertiary">
          <Icon name="shield-check" size="xs" />
          <span>Tươi sống tại bến</span>
        </span>
      </div>

      <h1 className="font-heading text-2xl font-black tracking-tight text-foreground sm:text-3xl lg:text-3xl">
        {product.name}
      </h1>

      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <div className="flex items-center text-accent">
            {Array.from({ length: 5 }).map((_, i) => (
              <Icon
                key={i}
                name="star"
                size="xs"
                className={
                  i < Math.floor(rating) ? 'fill-accent text-accent' : 'text-muted-foreground/30'
                }
              />
            ))}
          </div>
          <span className="font-bold text-foreground">{rating.toFixed(1)}</span>
          <span className="text-muted-foreground">({reviewCount} đánh giá)</span>
        </div>

        <span className="h-3 w-px bg-border" />

        <div className="flex items-center gap-1">
          <Icon name="map-pin" size="xs" className="text-secondary" />
          <span>{origin}</span>
        </div>

        <span className="h-3 w-px bg-border" />

        <div>
          <span>
            Đã bán <strong className="font-semibold text-foreground">{salesCount}</strong> sản phẩm
          </span>
        </div>
      </div>
    </div>
  );
}
