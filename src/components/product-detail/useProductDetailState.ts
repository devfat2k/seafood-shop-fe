'use client';

import { toast } from 'sonner';
import {
  useProductQuery,
  useProductsQuery,
  useRelatedProductsQuery,
} from '@/libs/queries/products';
import { useCartStore } from '@/libs/stores/cart';
import type { Product } from '@/types/api';

type UseProductDetailStateProps = {
  productId?: string;
  initialProduct?: Product;
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
  const { addItem: addCartItem } = useCartStore();

  const {
    data: product,
    isLoading,
    isError,
    error,
    refetch,
  } = useProductQuery(productId ?? '', initialProduct);

  const categoryId = product?.categoryId ?? product?.category?.id ?? undefined;
  const { data: relatedData } = useRelatedProductsQuery(categoryId);
  const { data: fallbackData } = useProductsQuery({ size: 8 });

  const galleryImages = product ? getGalleryImages(product) : [];

  // Combine category-related products with popular fallback products
  const categoryItems = (relatedData?.content ?? []).filter((p) => p.id !== product?.id);
  const fallbackItems = (fallbackData?.content ?? []).filter(
    (p) => p.id !== product?.id && !categoryItems.some((c) => c.id === p.id),
  );
  const relatedProducts = [...categoryItems, ...fallbackItems].slice(0, 4);

  const handleAddRelatedToCart = (rel: Product, image: string) => {
    addCartItem({
      id: rel.id,
      name: rel.name,
      weight: rel.unit ? `1 ${rel.unit}` : '1 Kg (Tiêu chuẩn)',
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
    handleAddRelatedToCart,
  };
}
