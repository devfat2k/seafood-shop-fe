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
import { useCategoryHomeConfigMutation } from '@/libs/queries/admin/categories';
import type { Category } from '@/types/api';
import type { AdminCategoryHomeConfigFormValues } from '@/validations/admin';
import { adminCategoryHomeConfigSchema } from '@/validations/admin';

type CategoryHomeConfigDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: Category | null;
};

export function CategoryHomeConfigDialog({
  open,
  onOpenChange,
  category,
}: CategoryHomeConfigDialogProps) {
  const configMutation = useCategoryHomeConfigMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<AdminCategoryHomeConfigFormValues>({
    resolver: zodResolver(adminCategoryHomeConfigSchema),
    defaultValues: {
      badge: '',
      badgeType: 'hot',
      iconName: 'fish',
      homeDisplayStyle: 'card',
      homeSortOrder: 1,
      homeIsActive: true,
    },
  });

  useEffect(() => {
    if (category) {
      let bType: 'hot' | 'fresh' | 'dry' | 'number' = 'hot';
      if (
        category.badgeType === 'hot' ||
        category.badgeType === 'fresh' ||
        category.badgeType === 'dry' ||
        category.badgeType === 'number'
      ) {
        bType = category.badgeType;
      }

      let dStyle: 'main' | 'card' | 'icon' = 'card';
      if (
        category.homeDisplayStyle === 'main' ||
        category.homeDisplayStyle === 'card' ||
        category.homeDisplayStyle === 'icon'
      ) {
        dStyle = category.homeDisplayStyle;
      }

      reset({
        badge: category.badge ?? '',
        badgeType: bType,
        iconName: category.iconName ?? 'fish',
        homeDisplayStyle: dStyle,
        homeSortOrder: category.homeSortOrder ?? 1,
        homeIsActive: category.homeIsActive ?? true,
      });
    }
  }, [category, reset]);

  if (!category) {
    return null;
  }

  const onSubmit = async (values: AdminCategoryHomeConfigFormValues) => {
    try {
      await configMutation.mutateAsync({
        id: category.id,
        data: values,
      });
      toast.success('Cập nhật cấu hình Bento Grid thành công');
      onOpenChange(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Cập nhật cấu hình thất bại');
    }
  };

  const isPending = isSubmitting || configMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Cấu hình Bento Grid / Trang Chủ</DialogTitle>
          <DialogDescription>
            Tùy biến cách hiển thị danh mục{' '}
            <span className="font-semibold text-foreground">
              {category.name ?? category.categoryName}
            </span>{' '}
            trên Bento Grid Storefront
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="cat-badge-input" className="text-xs font-semibold text-foreground">
                Badge Text
              </label>
              <Input
                id="cat-badge-input"
                placeholder="VD: BÁN CHẠY #1"
                className="mt-1 text-xs"
                {...register('badge')}
              />
            </div>

            <div>
              <label
                htmlFor="cat-badgetype-select"
                className="text-xs font-semibold text-foreground"
              >
                Loại Badge
              </label>
              <select
                id="cat-badgetype-select"
                className="mt-1 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-xs shadow-xs focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none"
                {...register('badgeType')}
              >
                <option value="hot" className="bg-popover text-foreground">
                  Hot (Đỏ cam)
                </option>
                <option value="fresh" className="bg-popover text-foreground">
                  Fresh (Xanh biển)
                </option>
                <option value="dry" className="bg-popover text-foreground">
                  Dry (Vàng nâu)
                </option>
                <option value="number" className="bg-popover text-foreground">
                  Number (Xám đậm)
                </option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="cat-display-select" className="text-xs font-semibold text-foreground">
                Kiểu hiển thị Bento
              </label>
              <select
                id="cat-display-select"
                className="mt-1 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-xs shadow-xs focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none"
                {...register('homeDisplayStyle')}
              >
                <option value="main" className="bg-popover text-foreground">
                  Main (Ô lớn nổi bật)
                </option>
                <option value="card" className="bg-popover text-foreground">
                  Card (Thẻ vừa chuẩn)
                </option>
                <option value="icon" className="bg-popover text-foreground">
                  Icon (Nút tròn nhỏ)
                </option>
              </select>
            </div>

            <div>
              <label htmlFor="cat-icon-input" className="text-xs font-semibold text-foreground">
                Icon Lucide Name
              </label>
              <Input
                id="cat-icon-input"
                placeholder="fish, crab, shrimp..."
                className="mt-1 text-xs"
                {...register('iconName')}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="cat-sort-input" className="text-xs font-semibold text-foreground">
                Thứ tự sắp xếp
              </label>
              <Input
                id="cat-sort-input"
                type="number"
                placeholder="1"
                className="mt-1 text-xs"
                {...register('homeSortOrder', { valueAsNumber: true })}
              />
            </div>

            <div className="flex items-center gap-2 pt-5">
              <input
                type="checkbox"
                id="homeIsActive"
                className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                {...register('homeIsActive')}
              />
              <label
                htmlFor="homeIsActive"
                className="cursor-pointer text-xs font-medium text-foreground"
              >
                Ghim lên Bento Trang chủ
              </label>
            </div>
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
              {isPending ? 'Đang lưu...' : 'Lưu cấu hình Bento'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
