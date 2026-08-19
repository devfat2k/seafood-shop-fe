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
  useCreateDailyArrivalMutation,
  useUpdateDailyArrivalMutation,
} from '@/libs/queries/admin/content';
import { useAdminProductsQuery } from '@/libs/queries/admin/products';
import type { DailyArrival } from '@/types/admin';
import { formatCurrency } from '@/utils/Helpers';
import type { AdminDailyArrivalFormValues } from '@/validations/admin';
import { adminDailyArrivalSchema } from '@/validations/admin';

type DailyArrivalFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  arrivalToEdit?: DailyArrival | null;
  defaultDate?: string;
};

export function DailyArrivalFormDialog({
  open,
  onOpenChange,
  arrivalToEdit,
  defaultDate,
}: DailyArrivalFormDialogProps) {
  const isEdit = Boolean(arrivalToEdit);
  const { data: productsData } = useAdminProductsQuery({ size: 100 });
  const createMutation = useCreateDailyArrivalMutation();
  const updateMutation = useUpdateDailyArrivalMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AdminDailyArrivalFormValues>({
    resolver: zodResolver(adminDailyArrivalSchema),
    defaultValues: {
      productId: 1,
      arrivalDate: defaultDate ?? '',
      badge: 'CHUYẾN ĐÊM HÔM NAY',
      title: '',
      description: '',
    },
  });

  useEffect(() => {
    if (arrivalToEdit) {
      reset({
        productId: arrivalToEdit.productId,
        arrivalDate: arrivalToEdit.arrivalDate,
        badge: arrivalToEdit.badge ?? 'CHUYẾN ĐÊM HÔM NAY',
        title: arrivalToEdit.title ?? arrivalToEdit.productName ?? '',
        description: arrivalToEdit.description ?? '',
      });
    } else {
      reset({
        productId: productsData?.content?.[0]?.id ?? 1,
        arrivalDate: defaultDate ?? '',
        badge: 'CHUYẾN ĐÊM HÔM NAY',
        title: '',
        description: '',
      });
    }
  }, [arrivalToEdit, defaultDate, reset, productsData]);

  const onSubmit = async (values: AdminDailyArrivalFormValues) => {
    try {
      if (isEdit && arrivalToEdit) {
        await updateMutation.mutateAsync({
          id: arrivalToEdit.id,
          data: {
            arrivalDate: values.arrivalDate,
            badge: values.badge,
            title: values.title,
            description: values.description,
          },
        });
        toast.success('Cập nhật hải sản cập bến thành công');
      } else {
        await createMutation.mutateAsync({
          productId: values.productId,
          arrivalDate: values.arrivalDate,
          badge: values.badge,
          title: values.title,
          description: values.description,
        });
        toast.success('Thêm sản phẩm cập bến thành công');
      }
      onOpenChange(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Thao tác thất bại');
    }
  };

  const isPending = isSubmitting || createMutation.isPending || updateMutation.isPending;

  let submitLabel = 'Thêm vào danh sách';
  if (isPending) {
    submitLabel = 'Đang lưu...';
  } else if (isEdit) {
    submitLabel = 'Cập nhật';
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Chỉnh sửa hải sản cập bến' : 'Thêm hải sản cập bến'}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? 'Cập nhật thông tin mẻ hải sản vừa cập bến'
              : 'Ghi nhận sản phẩm tươi sống vừa cập cảng hôm nay'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <label htmlFor="arrival-prod-select" className="text-xs font-semibold text-foreground">
              Chọn Sản phẩm *
            </label>
            <select
              id="arrival-prod-select"
              disabled={isEdit}
              className="mt-1 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-xs shadow-xs focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none disabled:opacity-60"
              {...register('productId', { valueAsNumber: true })}
            >
              {productsData?.content?.map((p) => (
                <option key={p.id} value={p.id} className="bg-popover text-foreground">
                  {p.name} ({formatCurrency(p.price)})
                </option>
              ))}
            </select>
            {errors.productId && (
              <p className="mt-1 text-[11px] text-destructive">{errors.productId.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="arrival-date-input" className="text-xs font-semibold text-foreground">
                Ngày cập bến *
              </label>
              <Input
                id="arrival-date-input"
                type="date"
                className="mt-1 text-xs"
                {...register('arrivalDate')}
              />
              {errors.arrivalDate && (
                <p className="mt-1 text-[11px] text-destructive">{errors.arrivalDate.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="arrival-badge-input"
                className="text-xs font-semibold text-foreground"
              >
                Badge nổi bật
              </label>
              <Input
                id="arrival-badge-input"
                placeholder="CHUYẾN ĐÊM HÔM NAY"
                className="mt-1 text-xs"
                {...register('badge')}
              />
            </div>
          </div>

          <div>
            <label htmlFor="arrival-title-input" className="text-xs font-semibold text-foreground">
              Tiêu đề hiển thị *
            </label>
            <Input
              id="arrival-title-input"
              placeholder="VD: Tôm Hùm Bông Phú Yên Tuyển Chọn"
              className="mt-1 text-xs"
              {...register('title')}
            />
            {errors.title && (
              <p className="mt-1 text-[11px] text-destructive">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="arrival-desc-input" className="text-xs font-semibold text-foreground">
              Mô tả độ tươi / thời gian cập bến
            </label>
            <textarea
              id="arrival-desc-input"
              rows={2}
              placeholder="Vừa cập bến lúc 4h sáng, sống khỏe 100%..."
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
