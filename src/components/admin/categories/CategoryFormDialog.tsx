'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from '@/libs/queries/admin/categories';
import type { Category } from '@/types/api';
import type { AdminCategoryFormValues } from '@/validations/admin';
import { adminCategorySchema } from '@/validations/admin';

type CategoryFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categoryToEdit?: Category | null;
};

export function CategoryFormDialog({
  open,
  onOpenChange,
  categoryToEdit,
}: CategoryFormDialogProps) {
  const isEdit = Boolean(categoryToEdit);
  const createMutation = useCreateCategoryMutation();
  const updateMutation = useUpdateCategoryMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AdminCategoryFormValues>({
    resolver: zodResolver(adminCategorySchema),
    defaultValues: {
      name: '',
      description: '',
      active: true,
    },
  });

  useEffect(() => {
    if (categoryToEdit) {
      reset({
        name: categoryToEdit.name ?? categoryToEdit.categoryName ?? '',
        description: categoryToEdit.description ?? '',
        active: categoryToEdit.active ?? true,
      });
    } else {
      reset({
        name: '',
        description: '',
        active: true,
      });
    }
  }, [categoryToEdit, reset]);

  const onSubmit = async (values: AdminCategoryFormValues) => {
    try {
      if (isEdit && categoryToEdit) {
        await updateMutation.mutateAsync({
          id: categoryToEdit.id,
          data: values,
        });
        toast.success('Cập nhật danh mục thành công');
      } else {
        await createMutation.mutateAsync(values);
        toast.success('Tạo danh mục mới thành công');
      }
      onOpenChange(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Thao tác thất bại');
    }
  };

  const isPending = isSubmitting || createMutation.isPending || updateMutation.isPending;

  let submitLabel = 'Tạo danh mục';
  if (isPending) {
    submitLabel = 'Đang lưu...';
  } else if (isEdit) {
    submitLabel = 'Lưu thay đổi';
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-heading text-lg font-bold">
            {isEdit ? 'Chỉnh sửa danh mục' : 'Tạo danh mục mới'}
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            {isEdit
              ? 'Cập nhật tên và mô tả chi tiết của danh mục sản phẩm'
              : 'Thêm danh mục mới để phân loại hải sản trên cửa hàng'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="cat-name-input" className="text-xs font-semibold text-foreground">
              Tên danh mục *
            </label>
            <Input
              id="cat-name-input"
              placeholder="VD: Tôm & Cua Hoàng Gia"
              className="mt-1 text-xs sm:text-sm"
              {...register('name')}
            />
            {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor="cat-desc-input" className="text-xs font-semibold text-foreground">
              Mô tả danh mục
            </label>
            <textarea
              id="cat-desc-input"
              rows={4}
              placeholder="Các loại tôm cua hải sản tươi sống cao cấp tuyển chọn..."
              className="mt-1 flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-xs shadow-xs focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none sm:text-sm"
              {...register('description')}
            />
          </div>

          <div className="flex items-center justify-between rounded-lg border border-border/80 bg-muted/30 p-3">
            <div>
              <label
                htmlFor="catActive"
                className="cursor-pointer text-xs font-semibold text-foreground"
              >
                Kích hoạt danh mục
              </label>
              <p className="text-[11px] text-muted-foreground">
                Cho phép hiển thị danh mục trên storefront
              </p>
            </div>
            <input
              type="checkbox"
              id="catActive"
              className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
              {...register('active')}
            />
          </div>

          <DialogFooter className="mt-4 border-t border-border pt-4">
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
              Hủy
            </Button>
            <Button type="submit" size="sm" disabled={isPending} className="text-xs font-semibold">
              {submitLabel}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
