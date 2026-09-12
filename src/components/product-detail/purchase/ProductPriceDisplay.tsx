import { Icon } from '@/components/common/Icon';
import { formatCurrency } from '@/utils/Helpers';

type ProductPriceDisplayProps = {
  currentPrice: number;
  currentOriginalPrice: number;
  discountPercent: number;
  unit?: string | null;
};

export function ProductPriceDisplay({
  currentPrice,
  currentOriginalPrice,
  discountPercent,
  unit,
}: ProductPriceDisplayProps) {
  const displayUnit = unit ? `/${unit}` : '';

  return (
    <div className="rounded-xl border border-secondary/20 bg-secondary/5 p-4 sm:p-5">
      <div className="flex flex-wrap items-baseline gap-3">
        <div className="flex items-baseline gap-1">
          <span className="font-heading text-3xl font-black text-primary sm:text-4xl">
            {formatCurrency(currentPrice)}
          </span>
          {displayUnit && (
            <span className="text-xs font-semibold text-muted-foreground">{displayUnit}</span>
          )}
        </div>

        {currentOriginalPrice > currentPrice && (
          <span className="text-sm font-medium text-muted-foreground line-through">
            {formatCurrency(currentOriginalPrice)}
          </span>
        )}

        {discountPercent > 0 && (
          <span className="rounded-full bg-primary/15 px-2.5 py-0.5 text-xs font-black text-primary">
            Tiết kiệm {discountPercent}%
          </span>
        )}
      </div>

      <div className="mt-3 flex items-center gap-2 border-t border-secondary/15 pt-3 text-xs text-foreground/80">
        <Icon name="sparkles" size="xs" className="shrink-0 text-accent" />
        <span>Miễn phí làm sạch, sơ chế theo yêu cầu & tặng kèm muối ớt chanh Phan Thiết.</span>
      </div>
    </div>
  );
}
