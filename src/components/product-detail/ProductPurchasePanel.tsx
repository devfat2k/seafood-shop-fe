'use client';

import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { Icon } from '@/components/common/Icon';
import type { Product } from '@/types/api';

type WeightOption = {
  id: string;
  label: string;
  subLabel: string;
  price: number;
  originalPrice: number;
  stock: number;
  disabled?: boolean;
};

function getWeightButtonClass(isSelected: boolean, isDisabled: boolean): string {
  if (isSelected) {
    return 'border-2 border-primary bg-card font-bold text-foreground shadow-xs';
  }
  if (isDisabled) {
    return 'cursor-not-allowed border border-border bg-muted/50 text-muted-foreground';
  }
  return 'border border-border bg-card text-foreground hover:border-secondary';
}

function getProductWeightOptions(product: Product): WeightOption[] {
  if (product.weightOptions && product.weightOptions.length > 0) {
    return product.weightOptions.map((w, idx) => {
      const adjustment = w.priceAdjustment ?? 0;
      const label = w.label ?? w.value ?? 'Quy cách chuẩn';
      return {
        id: String(w.id ?? idx),
        label,
        subLabel: adjustment > 0 ? `+${adjustment.toLocaleString('vi-VN')}₫` : 'Giá chuẩn',
        price: product.price + adjustment,
        originalPrice: (product.originalPrice ?? Math.round(product.price * 1.15)) + adjustment,
        stock: product.stock,
        disabled: product.stock <= 0,
      };
    });
  }

  const specLabel = product.spec ?? (product.unit ? `1 ${product.unit}` : 'Quy cách chuẩn');
  return [
    {
      id: 'default-weight',
      label: specLabel,
      subLabel: product.stock > 0 ? 'Còn hàng tại bến' : 'Tạm hết hàng',
      price: product.price,
      originalPrice: product.originalPrice ?? Math.round(product.price * 1.15),
      stock: product.stock,
      disabled: product.stock <= 0,
    },
  ];
}

type ProductPurchasePanelProps = {
  product: Product;
  onAddToCart?: (item: {
    id: string | number;
    name: string;
    weight: string;
    price: number;
    quantity: number;
    image: string;
  }) => void;
  onBuyNow?: (item: {
    id: string | number;
    name: string;
    weight: string;
    price: number;
    quantity: number;
    image: string;
  }) => void;
};

export function ProductPurchasePanel(props: ProductPurchasePanelProps) {
  const { product, onAddToCart, onBuyNow } = props;

  const weightOptions = useMemo(() => getProductWeightOptions(product), [product]);
  const [selectedWeight, setSelectedWeight] = useState<WeightOption>(
    weightOptions[0] ?? {
      id: 'default',
      label: 'Quy cách chuẩn',
      subLabel: 'Giá chuẩn',
      price: product.price,
      originalPrice: product.originalPrice ?? Math.round(product.price * 1.15),
      stock: product.stock,
    },
  );
  const [quantity, setQuantity] = useState(1);

  const currentPrice = selectedWeight.price;
  const currentOriginalPrice = selectedWeight.originalPrice;
  const discountAmount = Math.max(0, currentOriginalPrice - currentPrice);
  const discountPercent =
    currentOriginalPrice > 0 ? Math.round((discountAmount / currentOriginalPrice) * 100) : 0;

  const handleSelectWeight = (option: WeightOption) => {
    if (Boolean(option.disabled) || option.stock === 0) {
      return;
    }
    setSelectedWeight(option);
    setQuantity(1);
  };

  const handleAdjustQuantity = (delta: number) => {
    const nextQty = quantity + delta;
    if (nextQty < 1) {
      return;
    }
    if (nextQty > selectedWeight.stock) {
      toast.error(`Rất tiếc! Bến cảng hiện chỉ còn ${selectedWeight.stock} sản phẩm.`);
      return;
    }
    setQuantity(nextQty);
  };

  const handleAddToCartClick = (isBuyNow: boolean) => {
    if (quantity > selectedWeight.stock) {
      toast.error(
        `Lỗi vượt quá tồn kho! Hiện tại chỉ còn ${selectedWeight.stock} sản phẩm tại bến.`,
      );
      return;
    }

    const payload = {
      id: `${product.id}-${selectedWeight.id}`,
      name: product.name,
      weight: selectedWeight.label,
      price: currentPrice,
      quantity,
      image: product.imageUrl ?? product.images?.[0] ?? '',
    };

    if (isBuyNow && onBuyNow) {
      onBuyNow(payload);
    } else if (onAddToCart) {
      onAddToCart(payload);
    }

    toast.success(`Đã thêm ${quantity} x ${product.name} (${selectedWeight.label}) vào giỏ hàng!`);
  };

  return (
    <div className="flex flex-col justify-between space-y-6 rounded-2xl border border-border bg-card p-6 shadow-xs sm:p-8">
      <div className="space-y-4">
        {/* Category & Traceability Link */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-bold tracking-wider text-secondary uppercase">
            Phân loại: {product.categoryName ?? 'Hải Sản Tươi Sống'}
          </span>
          <div className="flex items-center gap-1.5 rounded-full bg-tertiary/10 px-2.5 py-1 text-xs font-semibold text-tertiary">
            <Icon name="check-circle" size="xs" />
            <span className="text-foreground">
              Đã kiểm định xuất xứ {product.origin ?? 'Phan Thiết'}
            </span>
          </div>
        </div>

        {/* Product Title */}
        <h1 className="font-heading text-2xl leading-tight font-bold text-foreground sm:text-3xl">
          {product.name}
        </h1>

        {/* Rating & Sales */}
        <div className="flex flex-wrap items-center gap-3 border-b border-border pb-4 text-xs sm:text-sm">
          <div className="flex items-center gap-1 text-accent">
            {Array.from({ length: 5 }).map((_, i) => (
              <Icon key={i} name="star" size="xs" />
            ))}
            <span className="ml-1 font-bold text-foreground">{product.rating ?? 4.9}</span>
          </div>
          <span className="text-muted-foreground">|</span>
          <span className="text-muted-foreground">
            <strong className="text-foreground">{product.reviewCount ?? 48}</strong> đánh giá thực
            tế
          </span>
          <span className="text-muted-foreground">|</span>
          <span className="text-muted-foreground">
            Tồn kho: <strong className="text-foreground">{product.stock}</strong> tại bến
          </span>
        </div>

        {/* Pricing Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-background p-4">
          <div className="space-y-0.5">
            <span className="block text-xs text-muted-foreground">Giá bán ưu đãi</span>
            <div className="flex items-baseline gap-3">
              <span className="font-heading text-2xl font-bold text-primary sm:text-3xl">
                {currentPrice.toLocaleString('vi-VN')}₫
              </span>
              {currentOriginalPrice > currentPrice && (
                <span className="text-xs text-muted-foreground line-through sm:text-sm">
                  {currentOriginalPrice.toLocaleString('vi-VN')}₫
                </span>
              )}
            </div>
          </div>
          {discountPercent > 0 && (
            <span className="rounded-lg bg-destructive/10 px-2.5 py-1 text-xs font-bold text-destructive">
              Tiết kiệm {discountAmount.toLocaleString('vi-VN')}₫ (-{discountPercent}%)
            </span>
          )}
        </div>

        {/* Weight Selector */}
        {weightOptions.length > 1 && (
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-foreground">Chọn quy cách / kích thước:</span>
              <span className="text-muted-foreground">Đóng gói đá gel lạnh 2H</span>
            </div>
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
              {weightOptions.map((opt) => {
                const isSelected = selectedWeight.id === opt.id;
                const isDisabled = Boolean(opt.disabled) || opt.stock === 0;

                return (
                  <button
                    key={opt.id}
                    type="button"
                    disabled={isDisabled}
                    onClick={() => {
                      handleSelectWeight(opt);
                    }}
                    className={`flex flex-col items-start rounded-xl p-3 text-left transition-all ${getWeightButtonClass(
                      isSelected,
                      isDisabled,
                    )}`}
                  >
                    <span className="text-xs font-bold">{opt.label}</span>
                    <span className="mt-1 text-[11px] text-muted-foreground">{opt.subLabel}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Quantity and Actions */}
        <div className="space-y-3 pt-4">
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold text-foreground">Số lượng:</span>
            <div className="flex items-center rounded-xl border border-border bg-background">
              <button
                type="button"
                onClick={() => {
                  handleAdjustQuantity(-1);
                }}
                disabled={quantity <= 1}
                className="flex h-10 w-10 items-center justify-center text-sm font-bold text-muted-foreground transition-colors hover:bg-muted disabled:opacity-40"
                aria-label="Giảm số lượng"
              >
                -
              </button>
              <span className="w-12 text-center text-sm font-bold text-foreground">{quantity}</span>
              <button
                type="button"
                onClick={() => {
                  handleAdjustQuantity(1);
                }}
                disabled={quantity >= selectedWeight.stock}
                className="flex h-10 w-10 items-center justify-center text-sm font-bold text-muted-foreground transition-colors hover:bg-muted disabled:opacity-40"
                aria-label="Tăng số lượng"
              >
                +
              </button>
            </div>
            <span className="text-xs text-muted-foreground">
              (Còn {selectedWeight.stock} sản phẩm)
            </span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <button
              type="button"
              disabled={selectedWeight.stock <= 0}
              onClick={() => {
                handleAddToCartClick(false);
              }}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-primary bg-primary/10 py-3.5 text-xs font-bold text-primary transition-all hover:bg-primary hover:text-primary-foreground disabled:opacity-50 sm:text-sm"
            >
              <Icon name="shopping-cart" size="sm" />
              <span>Thêm vào giỏ hàng</span>
            </button>

            <button
              type="button"
              disabled={selectedWeight.stock <= 0}
              onClick={() => {
                handleAddToCartClick(true);
              }}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-xs font-bold text-primary-foreground shadow-md transition-all hover:bg-primary/90 disabled:opacity-50 sm:text-sm"
            >
              <span>Mua ngay giao 2H</span>
              <Icon name="arrow-right" size="sm" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
