'use client';

import { toast } from 'sonner';
import { useProductQuery, useRelatedProductsQuery } from '@/libs/queries/products';
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

  const { data: relatedData } = useRelatedProductsQuery(product?.categoryId);

  const galleryImages = product ? getGalleryImages(product) : [];
  const relatedProducts = product
    ? (relatedData?.content ?? []).filter((p) => p.id !== product.id).slice(0, 4)
    : [];

  const handleAddRelatedToCart = (rel: Product, image: string) => {
    addCartItem({
      id: rel.id,
      name: rel.name,
      weight: rel.unit ? `1 ${rel.unit}` : 'Quy cách chuẩn',
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
