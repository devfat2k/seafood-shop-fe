'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import type { Product } from '@/types/api';
import { ProductDetailBody } from './detail/ProductDetailBody';
import { ProductDetailFooter } from './detail/ProductDetailFooter';
import { ProductDetailHeader } from './detail/ProductDetailHeader';

type ProductDetailDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
  onEdit: (product: Product) => void;
  onUploadImage: (product: Product) => void;
  onAdjustStock: (product: Product) => void;
  onConfigureCombo: (product: Product) => void;
  onToggleFeatured: (id: number) => void;
};

export function ProductDetailDialog({
  open,
  onOpenChange,
  product,
  onEdit,
  onUploadImage,
  onAdjustStock,
  onConfigureCombo,
  onToggleFeatured,
}: ProductDetailDialogProps) {
  if (!product) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] overflow-y-auto p-6 sm:max-w-3xl md:max-w-4xl">
        <ProductDetailHeader product={product} />

        <ProductDetailBody product={product} />

        <ProductDetailFooter
          product={product}
          onEdit={onEdit}
          onUploadImage={onUploadImage}
          onAdjustStock={onAdjustStock}
          onConfigureCombo={onConfigureCombo}
          onToggleFeatured={onToggleFeatured}
        />
      </DialogContent>
    </Dialog>
  );
}
