'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Icon } from '@/components/common/Icon';
import { Link } from '@/libs/I18nNavigation';

export type QuickViewProduct = {
  id: string | number;
  name: string;
  price: string;
  rawPrice?: number;
  originalPrice?: string;
  rating?: number;
  reviewsCount?: number;
  description?: string;
  image: string;
  origin?: string;
  weights?: string[];
  badge?: string;
  category?: string;
};

type QuickViewModalProps = {
  product: QuickViewProduct | null;
  isOpen?: boolean;
  onClose: () => void;
  onAddToCart?: (product: QuickViewProduct, weight: string, quantity: number) => void;
};

export function QuickViewModal({
  product,
  isOpen = true,
  onClose,
  onAddToCart,
}: QuickViewModalProps) {
  const weights = product?.weights && product.weights.length > 0 ? product.weights : ['Tiêu chuẩn'];
  const [selectedWeight, setSelectedWeight] = useState<string>(weights[0] ?? 'Tiêu chuẩn');
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    if (product?.weights && product.weights.length > 0) {
      setSelectedWeight(product.weights[0] ?? 'Tiêu chuẩn');
    } else {
      setSelectedWeight('Tiêu chuẩn');
    }
    setQuantity(1);
  }, [product]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) {
    return null;
  }

  const handleAdd = () => {
    if (onAddToCart) {
      onAddToCart(product, selectedWeight, quantity);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-foreground/60 text-white backdrop-blur-md transition-all hover:bg-foreground"
          aria-label="Đóng modal"
        >
          <Icon name="x" size="sm" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product Image */}
          <div className="relative h-64 min-h-[280px] w-full bg-muted md:h-full">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                unoptimized
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
                <Icon name="fish" size="lg" />
              </div>
            )}
            {product.badge && (
              <span className="absolute top-4 left-4 rounded-full bg-secondary px-3 py-1 text-[10px] font-bold text-secondary-foreground uppercase shadow-sm">
                {product.badge}
              </span>
            )}
          </div>

          {/* Details & Action */}
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

              <h2 className="mt-2 font-heading text-xl font-bold text-foreground">
                {product.name}
              </h2>

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

              {/* Weight Selector */}
              {product.weights && product.weights.length > 0 && (
                <div className="mt-4">
                  <span className="text-xs font-bold text-foreground">Chọn quy cách:</span>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {product.weights.map((w) => (
                      <button
                        key={w}
                        type="button"
                        onClick={() => {
                          setSelectedWeight(w);
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

              {/* Quantity Stepper */}
              <div className="mt-4 flex items-center gap-4">
                <span className="text-xs font-bold text-foreground">Số lượng:</span>
                <div className="flex items-center rounded-lg border border-border bg-background">
                  <button
                    type="button"
                    onClick={() => {
                      setQuantity((q) => Math.max(1, q - 1));
                    }}
                    className="px-3 py-1 text-sm font-bold text-muted-foreground hover:bg-muted"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-bold text-foreground">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setQuantity((q) => q + 1);
                    }}
                    className="px-3 py-1 text-sm font-bold text-muted-foreground hover:bg-muted"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-6 flex items-center gap-3 border-t border-border/60 pt-4">
              <button
                type="button"
                onClick={handleAdd}
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
        </div>
      </div>
    </div>
  );
}
