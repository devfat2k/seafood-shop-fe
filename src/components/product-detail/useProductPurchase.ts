'use client';

import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import type { WeightOption } from '@/components/product-detail/ProductWeightSelector';
import { isProductInStock } from '@/components/products/catalog-utils';
import { useRouter } from '@/libs/I18nNavigation';
import { useCartStore } from '@/libs/stores/cart';
import type { Product } from '@/types/api';
import { formatCurrency } from '@/utils/Helpers';

export function getProductWeightOptions(product: Product): WeightOption[] {
  const isOutOfStock = typeof product.stock === 'number' && product.stock <= 0;
  if (product.weightOptions && product.weightOptions.length > 0) {
    return product.weightOptions.map((w, idx) => {
      if (typeof w === 'string') {
        return {
          id: `w-${idx}`,
          label: w,
          subLabel: 'Quy cách tuyển chọn',
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
        subLabel: adjustment > 0 ? `+${formatCurrency(adjustment)}` : 'Giá tiêu chuẩn',
        price: product.price + adjustment,
        originalPrice: (product.originalPrice ?? Math.round(product.price * 1.15)) + adjustment,
        stock: product.stock ?? 10,
        disabled: isOutOfStock,
      };
    });
  }

  const specLabel = product.spec ?? (product.unit ? `1 ${product.unit}` : '1 Kg (Tiêu chuẩn)');
  return [
    {
      id: 'default-weight',
      label: specLabel,
      subLabel: isOutOfStock ? 'Tạm hết hàng' : 'Tươi sống bơi tại bể',
      price: product.price,
      originalPrice: product.originalPrice ?? Math.round(product.price * 1.15),
      stock: product.stock ?? 10,
      disabled: isOutOfStock,
    },
    {
      id: 'tray-pack',
      label: 'Khay 500g (Làm sạch sẵn)',
      subLabel: 'Đóng khay hút chân không',
      price: Math.round(product.price * 0.52),
      originalPrice: Math.round((product.originalPrice ?? Math.round(product.price * 1.15)) * 0.52),
      stock: product.stock ?? 10,
      disabled: isOutOfStock,
    },
    {
      id: 'oxygen-pack',
      label: 'Túi oxy sống (Giao hỏa tốc 2H)',
      subLabel: 'Bơi sống tận nơi',
      price: product.price,
      originalPrice: product.originalPrice ?? Math.round(product.price * 1.15),
      stock: product.stock ?? 10,
      disabled: isOutOfStock,
    },
  ];
}

export function useProductPurchase(product: Product) {
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

  const stockStatusText = useMemo(() => {
    if (!isInStock) {
      return 'Tạm hết hàng';
    }
    if (typeof product.stock === 'number') {
      return `Còn ${product.stock} ${product.unit ?? 'kg'} tại bể Phan Thiết`;
    }
    return 'Đang bơi tại bể — Sẵn sàng giao ngay';
  }, [isInStock, product.stock, product.unit]);

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

  const increaseQuantity = () => {
    const maxStock = typeof product.stock === 'number' && product.stock > 0 ? product.stock : 99;
    setQuantity((prev) => Math.min(maxStock, prev + 1));
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  return {
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
  };
}
