'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
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
import { useAdjustStockMutation } from '@/libs/queries/admin/products';
import type { Product } from '@/types/api';
import type { AdminStockAdjustmentFormValues } from '@/validations/admin';
import { adminStockAdjustmentSchema } from '@/validations/admin';

type ProductStockDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
};

export function ProductStockDialog({ open, onOpenChange, product }: ProductStockDialogProps) {
  const adjustMutation = useAdjustStockMutation();
  const [action, setAction] = useState<'increase' | 'decrease'>('increase');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AdminStockAdjustmentFormValues>({
    resolver: zodResolver(adminStockAdjustmentSchema),
    defaultValues: {
      quantity: 10,
      action: 'increase',
    },
  });

  if (!product) {
    return null;
  }

  const onSubmit = async (values: AdminStockAdjustmentFormValues) => {
    try {
      await adjustMutation.mutateAsync({
        id: product.id,
        quantity: values.quantity,
        type: action,
      });
      toast.success(
        `Đã ${action === 'increase' ? 'tăng' : 'giảm'} ${values.quantity} tồn kho cho sản phẩm "${product.name}"`,
      );
      reset();
      onOpenChange(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Điều chỉnh tồn kho thất bại');
    }
  };

  const isPending = isSubmitting || adjustMutation.isPending;

  let submitLabel = action === 'increase' ? 'Xác nhận nhập kho' : 'Xác nhận giảm kho';
  if (isPending) {
    submitLabel = 'Đang xử lý...';
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Điều chỉnh tồn kho nhanh</DialogTitle>
          <DialogDescription>
            Sản phẩm: <span className="font-semibold text-foreground">{product.name}</span>
            <br />
            Tồn kho hiện tại: <span className="font-bold text-primary">{product.stock}</span>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex gap-2">
            <Button
              type="button"
              size="sm"
              variant={action === 'increase' ? 'default' : 'outline'}
              className="flex-1 text-xs"
              onClick={() => {
                setAction('increase');
              }}
            >
              + Nhập thêm kho
            </Button>
            <Button
              type="button"
              size="sm"
              variant={action === 'decrease' ? 'destructive' : 'outline'}
              className="flex-1 text-xs"
              onClick={() => {
                setAction('decrease');
              }}
            >
              - Xuất / Giảm kho
            </Button>
          </div>

          <div>
            <label htmlFor="stock-qty-input" className="text-xs font-semibold text-foreground">
              Số lượng thay đổi *
            </label>
            <Input
              id="stock-qty-input"
              type="number"
              placeholder="10"
              className="mt-1 text-xs"
              {...register('quantity', { valueAsNumber: true })}
            />
            {errors.quantity && (
              <p className="mt-1 text-[11px] text-destructive">{errors.quantity.message}</p>
            )}
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
            <Button
              type="submit"
              size="sm"
              variant={action === 'increase' ? 'default' : 'destructive'}
              disabled={isPending}
            >
              {submitLabel}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
