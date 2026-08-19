'use client';

import { Icon } from '@/components/common/Icon';
import { Link } from '@/libs/I18nNavigation';
import type { QuickViewProduct } from '../QuickViewModal';

type QuickViewDetailsProps = {
  product: QuickViewProduct;
  selectedWeight: string;
  onSelectWeight: (weight: string) => void;
  quantity: number;
  onUpdateQuantity: (q: number) => void;
  onAddToCart: () => void;
  onClose: () => void;
};

export const QuickViewDetails = ({
  product,
  selectedWeight,
  onSelectWeight,
  quantity,
  onUpdateQuantity,
  onAddToCart,
  onClose,
}: QuickViewDetailsProps) => (
  <div className="flex flex-col justify-between p-6">
    <div>
      {product.rating !== undefined && product.rating > 0 && (
        <div className="flex items-center gap-1 text-xs text-accent">
          <Icon name="star" size="xs" />
          <span className="font-bold text-foreground">{product.rating}</span>
          {product.reviewsCount !== undefined && (
            <span className="text-muted-foreground">({product.reviewsCount} đánh giá)</span>
          )}
        </div>
      )}

      <h2 className="mt-2 font-heading text-xl font-bold text-foreground">{product.name}</h2>

      <div className="mt-2 flex items-baseline gap-2">
        <span className="font-sans text-2xl font-bold text-primary">{product.price}</span>
        {product.originalPrice && (
          <span className="text-xs text-muted-foreground line-through">
            {product.originalPrice}
          </span>
        )}
      </div>

      {product.description && (
        <p className="mt-3 line-clamp-3 text-xs leading-relaxed text-muted-foreground">
          {product.description}
        </p>
      )}

      {product.origin && (
        <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-muted-foreground">
          <Icon name="map-pin" size="xs" className="text-secondary" />
          <span>Nguồn gốc: {product.origin}</span>
        </div>
      )}

      {product.weights && product.weights.length > 0 && (
        <div className="mt-4">
          <span className="text-xs font-bold text-foreground">Chọn quy cách:</span>
          <div className="mt-2 flex flex-wrap gap-2">
            {product.weights.map((w) => (
              <button
                key={w}
                type="button"
                onClick={() => {
                  onSelectWeight(w);
                }}
                className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all ${
                  selectedWeight === w
                    ? 'border-secondary bg-secondary/10 font-bold text-secondary'
                    : 'border-border bg-card text-muted-foreground hover:border-secondary/40'
                }`}
              >
                {w}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4 flex items-center gap-4">
        <span className="text-xs font-bold text-foreground">Số lượng:</span>
        <div className="flex items-center rounded-lg border border-border bg-background">
          <button
            type="button"
            onClick={() => {
              onUpdateQuantity(Math.max(1, quantity - 1));
            }}
            className="px-3 py-1 text-sm font-bold text-muted-foreground hover:bg-muted"
          >
            -
          </button>
          <span className="px-3 text-xs font-bold text-foreground">{quantity}</span>
          <button
            type="button"
            onClick={() => {
              onUpdateQuantity(quantity + 1);
            }}
            className="px-3 py-1 text-sm font-bold text-muted-foreground hover:bg-muted"
          >
            +
          </button>
        </div>
      </div>
    </div>

    <div className="mt-6 flex items-center gap-3 border-t border-border/60 pt-4">
      <button
        type="button"
        onClick={onAddToCart}
        className="flex-1 rounded-xl bg-primary py-2.5 text-xs font-bold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 active:scale-95"
      >
        Thêm Vào Giỏ Hàng
      </button>

      <Link
        href={`/products/${product.id}`}
        onClick={onClose}
        className="rounded-xl border border-border bg-card px-4 py-2.5 text-xs font-bold text-foreground hover:bg-muted"
      >
        Chi Tiết
      </Link>
    </div>
  </div>
);
