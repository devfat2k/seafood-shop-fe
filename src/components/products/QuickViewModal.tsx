'use client';

import { useEffect, useState } from 'react';
import { Icon } from '@/components/common/Icon';
import { QuickViewDetails } from './quick-view/QuickViewDetails';
import { QuickViewImage } from './quick-view/QuickViewImage';

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

export const QuickViewModal = ({
  product,
  isOpen = true,
  onClose,
  onAddToCart,
}: QuickViewModalProps) => {
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
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

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
          <QuickViewImage image={product.image} name={product.name} badge={product.badge} />
          <QuickViewDetails
            product={product}
            selectedWeight={selectedWeight}
            onSelectWeight={setSelectedWeight}
            quantity={quantity}
            onUpdateQuantity={setQuantity}
            onAddToCart={handleAdd}
            onClose={onClose}
          />
        </div>
      </div>
    </div>
  );
};
