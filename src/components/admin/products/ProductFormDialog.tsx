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
    submitLabel = 'Lưu thay đổi';
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl md:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="font-heading text-lg font-bold sm:text-xl">
            {isEdit ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            {isEdit
              ? 'Cập nhật thông tin chi tiết của sản phẩm hải sản trên hệ thống'
              : 'Điền đầy đủ thông tin để tạo sản phẩm mới trên hệ thống cửa hàng'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <ProductFormFields form={form} categories={categories} />

          <DialogFooter className="mt-6 border-t border-border pt-4">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={isPending}
              onClick={() => {
                onOpenChange(false);
              }}
              className="text-xs"
            >
              Hủy bỏ
            </Button>
            <Button type="submit" size="sm" disabled={isPending} className="text-xs font-semibold">
              {submitLabel}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
