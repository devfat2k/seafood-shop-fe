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
import { useAdminCategoriesQuery } from '@/libs/queries/admin/categories';
import { useCreateProductMutation, useUpdateProductMutation } from '@/libs/queries/admin/products';
import type { Product } from '@/types/api';
import type { AdminProductFormValues } from '@/validations/admin';
import { adminProductSchema } from '@/validations/admin';

type ProductFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productToEdit?: Product | null;
};

export function ProductFormDialog({ open, onOpenChange, productToEdit }: ProductFormDialogProps) {
  const isEdit = Boolean(productToEdit);
  const { data: categories } = useAdminCategoriesQuery();
  const createMutation = useCreateProductMutation();
  const updateMutation = useUpdateProductMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AdminProductFormValues>({
    resolver: zodResolver(adminProductSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      originalPrice: undefined,
      stock: 0,
      categoryId: 1,
      unit: 'kg',
      spec: '',
      origin: '',
      productType: 'REGULAR',
    },
  });

  useEffect(() => {
    if (productToEdit) {
      reset({
        name: productToEdit.name,
        description: productToEdit.description ?? '',
        price: productToEdit.price,
        originalPrice: productToEdit.originalPrice ?? undefined,
        stock: productToEdit.stock,
        categoryId: productToEdit.categoryId ?? 1,
        unit: productToEdit.unit ?? 'kg',
        spec: productToEdit.spec ?? '',
        origin: productToEdit.origin ?? '',
        productType: productToEdit.productType ?? 'REGULAR',
      });
    } else {
      reset({
        name: '',
        description: '',
        price: 0,
        originalPrice: undefined,
        stock: 0,
        categoryId: categories?.[0]?.id ?? 1,
        unit: 'kg',
        spec: '',
        origin: '',
        productType: 'REGULAR',
      });
    }
  }, [productToEdit, reset, categories]);

  const onSubmit = async (values: AdminProductFormValues) => {
    try {
      if (isEdit && productToEdit) {
        await updateMutation.mutateAsync({
          id: productToEdit.id,
          data: {
            name: values.name,
            description: values.description,
            price: values.price,
            originalPrice: values.originalPrice,
            stock: values.stock,
            categoryId: values.categoryId,
            unit: values.unit,
            spec: values.spec,
            origin: values.origin,
            productType: values.productType,
          },
        });
        toast.success('Cập nhật sản phẩm thành công');
      } else {
        await createMutation.mutateAsync({
          name: values.name,
          description: values.description,
          price: values.price,
          originalPrice: values.originalPrice,
          stock: values.stock,
          categoryId: values.categoryId,
          unit: values.unit,
          spec: values.spec,
          origin: values.origin,
          productType: values.productType,
        });
        toast.success('Tạo sản phẩm mới thành công');
      }
      onOpenChange(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Thao tác thất bại');
    }
  };

  const isPending = isSubmitting || createMutation.isPending || updateMutation.isPending;

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

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="product-name-input" className="text-xs font-semibold text-foreground">
              Tên sản phẩm *
            </label>
            <Input
              id="product-name-input"
              placeholder="VD: Cua Gạch Cà Mau Tuyển Chọn"
              className="mt-1 text-xs"
              {...register('name')}
            />
            {errors.name && (
              <p className="mt-1 text-[11px] text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="product-cat-select" className="text-xs font-semibold text-foreground">
                Danh mục *
              </label>
              <select
                id="product-cat-select"
                className="mt-1 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-xs shadow-xs transition-colors focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none"
                {...register('categoryId', { valueAsNumber: true })}
              >
                {categories?.map((cat) => (
                  <option key={cat.id} value={cat.id} className="bg-popover text-foreground">
                    {cat.name ?? cat.categoryName}
                  </option>
                ))}
              </select>
              {errors.categoryId && (
                <p className="mt-1 text-[11px] text-destructive">{errors.categoryId.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="product-type-select"
                className="text-xs font-semibold text-foreground"
              >
                Loại sản phẩm
              </label>
              <select
                id="product-type-select"
                className="mt-1 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-xs shadow-xs transition-colors focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none"
                {...register('productType')}
              >
                <option value="REGULAR" className="bg-popover text-foreground">
                  Thông thường (REGULAR)
                </option>
                <option value="COMBO" className="bg-popover text-foreground">
                  Gói Combo (COMBO)
                </option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label
                htmlFor="product-price-input"
                className="text-xs font-semibold text-foreground"
              >
                Giá bán (₫) *
              </label>
              <Input
                id="product-price-input"
                type="number"
                placeholder="480000"
                className="mt-1 text-xs"
                {...register('price', { valueAsNumber: true })}
              />
              {errors.price && (
                <p className="mt-1 text-[11px] text-destructive">{errors.price.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="product-orig-price" className="text-xs font-semibold text-foreground">
                Giá gốc (₫)
              </label>
              <Input
                id="product-orig-price"
                type="number"
                placeholder="550000"
                className="mt-1 text-xs"
                {...register('originalPrice', {
                  setValueAs: (v: string) =>
                    v === '' || Number.isNaN(Number(v)) ? undefined : Number(v),
                })}
              />
            </div>

            <div>
              <label
                htmlFor="product-stock-input"
                className="text-xs font-semibold text-foreground"
              >
                Tồn kho *
              </label>
              <Input
                id="product-stock-input"
                type="number"
                placeholder="50"
                className="mt-1 text-xs"
                {...register('stock', { valueAsNumber: true })}
              />
              {errors.stock && (
                <p className="mt-1 text-[11px] text-destructive">{errors.stock.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label htmlFor="product-unit-input" className="text-xs font-semibold text-foreground">
                Đơn vị tính
              </label>
              <Input
                id="product-unit-input"
                placeholder="kg, con, set"
                className="mt-1 text-xs"
                {...register('unit')}
              />
            </div>

            <div>
              <label htmlFor="product-spec-input" className="text-xs font-semibold text-foreground">
                Quy cách
              </label>
              <Input
                id="product-spec-input"
                placeholder="Size 2-3 con/kg"
                className="mt-1 text-xs"
                {...register('spec')}
              />
            </div>

            <div>
              <label
                htmlFor="product-origin-input"
                className="text-xs font-semibold text-foreground"
              >
                Xuất xứ
              </label>
              <Input
                id="product-origin-input"
                placeholder="Cà Mau, Nha Trang"
                className="mt-1 text-xs"
                {...register('origin')}
              />
            </div>
          </div>

          <div>
            <label htmlFor="product-desc-input" className="text-xs font-semibold text-foreground">
              Mô tả sản phẩm
            </label>
            <textarea
              id="product-desc-input"
              rows={3}
              placeholder="Mô tả chi tiết độ tươi ngon, cách bảo quản..."
              className="mt-1 flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-xs shadow-xs focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none"
              {...register('description')}
            />
          </div>

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
}
