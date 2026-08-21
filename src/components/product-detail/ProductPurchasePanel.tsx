'use client';

import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { Icon } from '@/components/common/Icon';
import { ProductGuarantees } from '@/components/product-detail/ProductGuarantees';
import { ProductWeightSelector } from '@/components/product-detail/ProductWeightSelector';
import type { WeightOption } from '@/components/product-detail/ProductWeightSelector';
import { isProductInStock } from '@/components/products/catalog-utils';
import { useRouter } from '@/libs/I18nNavigation';
import { useCartStore } from '@/libs/stores/cart';
import type { Product } from '@/types/api';
import { formatCurrency } from '@/utils/Helpers';

function getProductWeightOptions(product: Product): WeightOption[] {
  const isOutOfStock = typeof product.stock === 'number' && product.stock <= 0;
  if (product.weightOptions && product.weightOptions.length > 0) {
    return product.weightOptions.map((w, idx) => {
      if (typeof w === 'string') {
        return {
          id: `w-${idx}`,
          label: w,
          subLabel: 'Giá chuẩn',
          price: product.price,
          originalPrice: product.originalPrice ?? Math.round(product.price * 1.15),
          stock: product.stock ?? 10,
          disabled: isOutOfStock,
        };
      }
      const adjustment = w.priceAdjustment ?? 0;
      const label = w.label ?? w.value ?? 'Quy cách chuẩn';
      return {
        id: String(w.id ?? idx),
        label,
        subLabel: adjustment > 0 ? `+${formatCurrency(adjustment)}` : 'Giá chuẩn',
        price: product.price + adjustment,
        originalPrice: (product.originalPrice ?? Math.round(product.price * 1.15)) + adjustment,
        stock: product.stock ?? 10,
        disabled: isOutOfStock,
      };
    });
  }

  const specLabel = product.spec ?? (product.unit ? `1 ${product.unit}` : 'Quy cách chuẩn');
  return [
    {
      id: 'default-weight',
      label: specLabel,
      subLabel: isOutOfStock ? 'Tạm hết hàng' : 'Còn hàng tại bể',
      price: product.price,
      originalPrice: product.originalPrice ?? Math.round(product.price * 1.15),
      stock: product.stock ?? 10,
      disabled: isOutOfStock,
    },
  ];
}

type ProductPurchasePanelProps = {
  product: Product;
};

export const ProductPurchasePanel = ({ product }: ProductPurchasePanelProps) => {
  const router = useRouter();
  const { addItem: addCartItem } = useCartStore();
  const weightOptions = useMemo(() => getProductWeightOptions(product), [product]);
  const [selectedWeight, setSelectedWeight] = useState<WeightOption>(
    weightOptions[0] ?? {
      id: 'default',
      label: 'Quy cách chuẩn',
      subLabel: 'Giá chuẩn',
      price: product.price,
      originalPrice: product.originalPrice ?? Math.round(product.price * 1.15),
      stock: product.stock ?? 10,
    },
  );
  const [quantity, setQuantity] = useState(1);

  const isInStock = isProductInStock(product);
  const currentPrice = selectedWeight.price;
  const currentOriginalPrice = selectedWeight.originalPrice;
  const discountPercent =
    currentOriginalPrice > currentPrice
      ? Math.round(((currentOriginalPrice - currentPrice) / currentOriginalPrice) * 100)
      : 0;

  const handleAddToCart = () => {
    addCartItem({
      id: `${product.id}-${selectedWeight.id}`,
      name: `${product.name} (${selectedWeight.label})`,
      price: currentPrice,
      image: product.imageUrl ?? product.images?.[0] ?? '',
      weight: selectedWeight.label,
      quantity,
    });
    toast.success(`Đã thêm ${quantity} x "${product.name}" vào giỏ hàng!`);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push('/checkout');
  };

  return (
    <div className="space-y-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="flex flex-wrap items-baseline gap-3 border-b border-border pb-4">
        <span className="font-heading text-2xl font-bold text-primary sm:text-3xl">
          {formatCurrency(currentPrice)}
        </span>
        {currentOriginalPrice > currentPrice && (
          <span className="text-sm text-muted-foreground line-through">
            {formatCurrency(currentOriginalPrice)}
          </span>
        )}
        {discountPercent > 0 && (
          <span className="rounded-md bg-destructive/15 px-2 py-0.5 text-xs font-bold text-destructive">
            Tiết kiệm {discountPercent}%
          </span>
        )}
      </div>

      <ProductWeightSelector
        options={weightOptions}
        selectedId={selectedWeight.id}
        onSelect={setSelectedWeight}
      />

      <div>
        <span className="block text-xs font-bold text-foreground">Số Lượng:</span>
        <div className="mt-2 flex items-center gap-3">
          <div className="flex items-center rounded-xl border border-border bg-background">
            <button
              type="button"
              disabled={quantity <= 1}
              onClick={() => {
                setQuantity((prev) => Math.max(1, prev - 1));
              }}
              className="px-3.5 py-2 text-sm font-bold text-muted-foreground hover:bg-muted disabled:opacity-40"
            >
              -
            </button>
            <span className="w-8 text-center text-sm font-bold text-foreground">{quantity}</span>
            <button
              type="button"
              disabled={
                typeof product.stock === 'number' && product.stock > 0
                  ? quantity >= product.stock
                  : false
              }
              onClick={() => {
                setQuantity((prev) => prev + 1);
              }}
              className="px-3.5 py-2 text-sm font-bold text-muted-foreground hover:bg-muted disabled:opacity-40"
            >
              +
            </button>
          </div>
          <span className="text-xs text-muted-foreground">
            {isInStock ? `Còn ${product.stock} sản phẩm tại bể` : 'Tạm hết hàng'}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2.5 pt-2 sm:flex-row">
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={!isInStock}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-primary bg-card py-3 text-xs font-bold text-primary shadow-xs transition-all hover:bg-primary/5 active:scale-98 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Icon name="shopping-bag" size="sm" />
          <span>Thêm Vào Giỏ Hàng</span>
        </button>

        <button
          type="button"
          onClick={handleBuyNow}
          disabled={!isInStock}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary py-3 text-xs font-bold text-white shadow-md transition-all hover:opacity-90 active:scale-98 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Icon name="zap" size="sm" />
          <span>Mua Ngay</span>
        </button>
      </div>

      <ProductGuarantees />
    </div>
  );
};
