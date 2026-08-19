'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { Product } from '@/types/api';
import { ProductFormFields } from './ProductFormFields';
import { useProductForm } from './useProductForm';

type ProductFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productToEdit?: Product | null;
};

export const ProductFormDialog = ({
  open,
  onOpenChange,
  productToEdit,
}: ProductFormDialogProps) => {
  const { form, categories, isEdit, isPending, onSubmit } = useProductForm(productToEdit, () => {
    onOpenChange(false);
  });

  let submitLabel = 'Thêm sản phẩm';
  if (isPending) {
    submitLabel = 'Đang lưu...';
  } else if (isEdit) {
    submitLabel = 'Cập nhật';
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? 'Cập nhật thông tin chi tiết của sản phẩm hải sản'
              : 'Điền đầy đủ thông tin để tạo sản phẩm mới trên hệ thống'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <ProductFormFields form={form} categories={categories} />

          <DialogFooter className="mt-4">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={isPending}
              onClick={() => {
                onOpenChange(false);
              }}
            >
              Hủy
            </Button>
            <Button type="submit" size="sm" disabled={isPending}>
              {submitLabel}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
