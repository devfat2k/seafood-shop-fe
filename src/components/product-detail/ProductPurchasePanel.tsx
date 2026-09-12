'use client';

import { ProductGuarantees } from '@/components/product-detail/ProductGuarantees';
import { ProductWeightSelector } from '@/components/product-detail/ProductWeightSelector';
import { ProductActionButtons } from '@/components/product-detail/purchase/ProductActionButtons';
import { ProductHeaderInfo } from '@/components/product-detail/purchase/ProductHeaderInfo';
import { ProductPriceDisplay } from '@/components/product-detail/purchase/ProductPriceDisplay';
import { useProductPurchase } from '@/components/product-detail/useProductPurchase';
import type { Product } from '@/types/api';

type ProductPurchasePanelProps = {
  product: Product;
};

export const ProductPurchasePanel = ({ product }: ProductPurchasePanelProps) => {
  const {
    weightOptions,
    selectedWeight,
    setSelectedWeight,
    quantity,
    isInStock,
    currentPrice,
    currentOriginalPrice,
    discountPercent,
    stockStatusText,
    handleAddToCart,
    handleBuyNow,
    increaseQuantity,
    decreaseQuantity,
  } = useProductPurchase(product);

  return (
    <div className="space-y-6 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
      <ProductHeaderInfo product={product} />

      <ProductPriceDisplay
        currentPrice={currentPrice}
        currentOriginalPrice={currentOriginalPrice}
        discountPercent={discountPercent}
        unit={product.unit}
      />

      <ProductWeightSelector
        options={weightOptions}
        selectedId={selectedWeight.id}
        onSelect={setSelectedWeight}
      />

      <ProductActionButtons
        quantity={quantity}
        isInStock={isInStock}
        stockStatusText={stockStatusText}
        onIncrease={increaseQuantity}
        onDecrease={decreaseQuantity}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
      />

      <ProductGuarantees />
    </div>
  );
};
