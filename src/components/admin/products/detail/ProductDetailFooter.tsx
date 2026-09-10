'use client';

import { Icon } from '@/components/common/Icon';
import { Button } from '@/components/ui/button';
import type { Product } from '@/types/api';

type ProductDetailFooterProps = {
  product: Product;
  onEdit: (product: Product) => void;
  onUploadImage: (product: Product) => void;
  onAdjustStock: (product: Product) => void;
  onConfigureCombo: (product: Product) => void;
  onToggleFeatured: (id: number) => void;
};

export const ProductDetailFooter = ({
  product,
  onEdit,
  onUploadImage,
  onAdjustStock,
  onConfigureCombo,
  onToggleFeatured,
}: ProductDetailFooterProps) => (
  <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border bg-muted/20 p-4">
    <div className="flex items-center gap-2">
      <Button
        size="sm"
        variant="outline"
        onClick={() => {
          onToggleFeatured(product.id);
        }}
        className="h-9 text-xs font-semibold"
      >
        <Icon
          name="star"
          size="xs"
          className={product.featured ? 'fill-amber-500 text-amber-500' : 'text-muted-foreground'}
        />
        <span>{product.featured ? 'Bỏ ghim' : 'Ghim nổi bật'}</span>
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => {
          onAdjustStock(product);
        }}
        className="h-9 text-xs font-semibold"
      >
        <Icon name="package" size="xs" />
        <span>Chỉnh kho</span>
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => {
          onUploadImage(product);
        }}
        className="h-9 text-xs font-semibold"
      >
        <Icon name="camera" size="xs" />
        <span>Đổi ảnh</span>
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => {
          onConfigureCombo(product);
        }}
        className="h-9 text-xs font-semibold text-amber-600"
      >
        <Icon name="sparkles" size="xs" />
        <span>Gói Combo</span>
      </Button>
    </div>

    <Button
      size="sm"
      onClick={() => {
        onEdit(product);
      }}
      className="h-9 text-xs font-semibold"
    >
      <Icon name="edit-3" size="xs" className="mr-1.5" />
      Chỉnh sửa
    </Button>
  </div>
);
