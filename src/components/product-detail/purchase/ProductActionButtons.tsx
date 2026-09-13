import { Icon } from '@/components/common/Icon';

type ProductActionButtonsProps = {
  quantity: number;
  isInStock: boolean;
  stockStatusText: string;
  onIncrease: () => void;
  onDecrease: () => void;
  onAddToCart: () => void;
  onBuyNow: () => void;
};

export function ProductActionButtons({
  quantity,
  isInStock,
  stockStatusText,
  onIncrease,
  onDecrease,
  onAddToCart,
  onBuyNow,
}: ProductActionButtonsProps) {
  return (
    <div className="space-y-4 pt-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-foreground uppercase">Số Lượng:</span>
          <div className="inline-flex items-center rounded-xl border border-border bg-background p-0.5 shadow-2xs">
            <button
              type="button"
              disabled={quantity <= 1 || !isInStock}
              onClick={onDecrease}
              aria-label="Giảm số lượng"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-40"
            >
              -
            </button>
            <span className="w-10 text-center text-xs font-black text-foreground tabular-nums">
              {quantity}
            </span>
            <button
              type="button"
              disabled={!isInStock}
              onClick={onIncrease}
              aria-label="Tăng số lượng"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-40"
            >
              +
            </button>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs">
          <span
            className={`h-2 w-2 rounded-full ${
              isInStock ? 'animate-pulse bg-tertiary' : 'bg-destructive'
            }`}
          />
          <span
            className={isInStock ? 'font-medium text-tertiary' : 'font-medium text-destructive'}
          >
            {stockStatusText}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onAddToCart}
          disabled={!isInStock}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-primary bg-card py-3.5 text-xs font-black text-primary shadow-xs transition-all hover:bg-primary/5 active:scale-98 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm"
        >
          <Icon name="shopping-bag" size="sm" />
          <span>Thêm Vào Giỏ Hàng</span>
        </button>

        <button
          type="button"
          onClick={onBuyNow}
          disabled={!isInStock}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-xs font-black text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 active:scale-98 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm"
        >
          <Icon name="zap" size="sm" />
          <span>Mua Ngay</span>
        </button>
      </div>
    </div>
  );
}
