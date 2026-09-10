'use client';

import { ConfirmDialog } from '@/components/common/ConfirmDialog';
import type { Product } from '@/types/api';
import { ProductComboDialog } from './ProductComboDialog';
import { ProductDetailDialog } from './ProductDetailDialog';
import { ProductFormDialog } from './ProductFormDialog';
import { ProductImageDialog } from './ProductImageDialog';
import { ProductStockDialog } from './ProductStockDialog';

type AdminProductDialogsProps = {
  detailOpen: boolean;
  onDetailOpenChange: (open: boolean) => void;
  detailProduct: Product | null;
  formOpen: boolean;
  onFormOpenChange: (open: boolean) => void;
  editingProduct: Product | null;
  stockOpen: boolean;
  onStockOpenChange: (open: boolean) => void;
  stockProduct: Product | null;
  imageOpen: boolean;
  onImageOpenChange: (open: boolean) => void;
  imageProduct: Product | null;
  comboOpen: boolean;
  onComboOpenChange: (open: boolean) => void;
  comboProduct: Product | null;
  deleteTarget: Product | null;
  onDeleteTargetChange: (product: Product | null) => void;
  isDeleting: boolean;
  onConfirmDelete: () => Promise<void>;
  onEdit: (product: Product) => void;
  onAdjustStock: (product: Product) => void;
  onUploadImage: (product: Product) => void;
  onConfigureCombo: (product: Product) => void;
  onToggleFeatured: (id: number) => void;
};

export function AdminProductDialogs({
  detailOpen,
  onDetailOpenChange,
  detailProduct,
  formOpen,
  onFormOpenChange,
  editingProduct,
  stockOpen,
  onStockOpenChange,
  stockProduct,
  imageOpen,
  onImageOpenChange,
  imageProduct,
  comboOpen,
  onComboOpenChange,
  comboProduct,
  deleteTarget,
  onDeleteTargetChange,
  isDeleting,
  onConfirmDelete,
  onEdit,
  onAdjustStock,
  onUploadImage,
  onConfigureCombo,
  onToggleFeatured,
}: AdminProductDialogsProps) {
  return (
    <>
      <ProductDetailDialog
        open={detailOpen}
        onOpenChange={onDetailOpenChange}
        product={detailProduct}
        onEdit={(p) => {
          onDetailOpenChange(false);
          onEdit(p);
        }}
        onUploadImage={(p) => {
          onUploadImage(p);
        }}
        onAdjustStock={(p) => {
          onAdjustStock(p);
        }}
        onConfigureCombo={(p) => {
          onConfigureCombo(p);
        }}
        onToggleFeatured={onToggleFeatured}
      />

      <ProductFormDialog
        open={formOpen}
        onOpenChange={onFormOpenChange}
        productToEdit={editingProduct}
      />

      <ProductStockDialog
        open={stockOpen}
        onOpenChange={onStockOpenChange}
        product={stockProduct}
      />

      <ProductImageDialog
        open={imageOpen}
        onOpenChange={onImageOpenChange}
        product={imageProduct}
      />

      <ProductComboDialog
        open={comboOpen}
        onOpenChange={onComboOpenChange}
        product={comboProduct}
      />

      <ConfirmDialog
        open={deleteTarget !== null}
        onOpenChange={(open) => {
          if (!open) {
            onDeleteTargetChange(null);
          }
        }}
        title="Xóa sản phẩm"
        description={`Bạn có chắc chắn muốn xóa sản phẩm "${deleteTarget?.name ?? ''}"? Hành động này sẽ chuyển trạng thái sản phẩm sang đã xóa.`}
        confirmText="Xóa sản phẩm"
        isLoading={isDeleting}
        onConfirm={onConfirmDelete}
      />
    </>
  );
}
