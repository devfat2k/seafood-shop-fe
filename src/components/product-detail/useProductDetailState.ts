'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import type { CartItem } from '@/components/cart/CartDrawer';
import { useProductQuery, useRelatedProductsQuery } from '@/libs/queries/products';
import type { Product } from '@/types/api';

type UseProductDetailStateProps = {
  productId?: string;
  initialProduct?: Product;
};

export type AddToCartPayload = {
  id: string | number;
  name: string;
  weight: string;
  price: number;
  quantity: number;
  image: string;
};

function getGalleryImages(p: Product): string[] {
  if (p.images && p.images.length > 0) {
    return p.images;
  }
  if (p.imageUrl) {
    return [p.imageUrl];
  }
  return [];
}

export function useProductDetailState({ productId, initialProduct }: UseProductDetailStateProps) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // 1. Fetch product detail
  const {
    data: product,
    isLoading,
    isError,
    error,
    refetch,
  } = useProductQuery(productId ?? '', initialProduct);

  // 2. Fetch related products by category
  const { data: relatedData } = useRelatedProductsQuery(product?.categoryId);

  const galleryImages = product ? getGalleryImages(product) : [];

  const relatedProducts = product
    ? (relatedData?.content ?? []).filter((p) => p.id !== product.id).slice(0, 4)
    : [];

  const handleAddToCart = (item: AddToCartPayload) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i,
        );
      }
      return [...prev, item];
    });
  };

  const handleBuyNow = (item: AddToCartPayload) => {
    handleAddToCart(item);
    setIsCartOpen(true);
  };

  const handleAddRelatedToCart = (rel: Product, image: string) => {
    handleAddToCart({
      id: rel.id,
      name: rel.name,
      weight: '1kg / Túi oxy',
      price: rel.price,
      quantity: 1,
      image,
    });
    toast.success(`Đã thêm "${rel.name}" vào giỏ hàng!`);
  };

  return {
    product,
    isLoading,
    isError,
    error,
    refetch,
    galleryImages,
    relatedProducts,
    isCartOpen,
    setIsCartOpen,
    cartItems,
    setCartItems,
    handleAddToCart,
    handleBuyNow,
    handleAddRelatedToCart,
  };
}
