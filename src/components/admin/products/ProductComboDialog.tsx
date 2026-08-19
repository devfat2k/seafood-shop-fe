'use client';

import { zodResolver } from '@hookform/resolvers/zod';
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
import { useComboConfigMutation } from '@/libs/queries/admin/products';
import type { Product } from '@/types/api';
import type { AdminProductComboConfigFormValues } from '@/validations/admin';
import { adminProductComboConfigSchema } from '@/validations/admin';

type ProductComboDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
};

export function ProductComboDialog({ open, onOpenChange, product }: ProductComboDialogProps) {
  const comboMutation = useComboConfigMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AdminProductComboConfigFormValues>({
    resolver: zodResolver(adminProductComboConfigSchema),
    defaultValues: {
      comboCategory: 'COMBO TIỆC GIA ĐÌNH',
      comboTheme: 'dark',
      comboTag: 'TIẾT KIỆM 20%',
      comboCtaText: 'Đặt Set Ngay',
      comboHref: product ? `/combos/combo-${product.id}` : '',
      isBreakout: false,
      comboSortOrder: 1,
    },
  });

  if (!product) {
    return null;
  }

  const onSubmit = async (values: AdminProductComboConfigFormValues) => {
    try {
      await comboMutation.mutateAsync({
        id: product.id,
        data: values,
      });
      toast.success(`Đã cấu hình gói Combo cho "${product.name}"`);
      onOpenChange(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Cấu hình Combo thất bại');
    }
  };

  const isPending = isSubmitting || comboMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Cấu hình Combo Trang Chủ</DialogTitle>
          <DialogDescription>
            Ghim sản phẩm <span className="font-semibold text-foreground">{product.name}</span>{' '}
            thành gói combo nổi bật trang chủ
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <label htmlFor="combo-cat-input" className="text-xs font-semibold text-foreground">
              Tiêu đề nhóm Combo *
            </label>
            <Input
              id="combo-cat-input"
              placeholder="VD: COMBO TIỆC GIA ĐÌNH"
              className="mt-1 text-xs"
              {...register('comboCategory')}
            />
            {errors.comboCategory && (
              <p className="mt-1 text-[11px] text-destructive">{errors.comboCategory.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="combo-theme-select" className="text-xs font-semibold text-foreground">
                Theme giao diện
              </label>
              <select
                id="combo-theme-select"
                className="mt-1 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-xs shadow-xs focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none"
                {...register('comboTheme')}
              >
                <option value="dark" className="bg-popover text-foreground">
                  Dark Theme (Tối)
                </option>
                <option value="light" className="bg-popover text-foreground">
                  Light Theme (Sáng)
                </option>
              </select>
            </div>

            <div>
              <label htmlFor="combo-tag-input" className="text-xs font-semibold text-foreground">
                Badge Tag
              </label>
              <Input
                id="combo-tag-input"
                placeholder="VD: TIẾT KIỆM 20%"
                className="mt-1 text-xs"
                {...register('comboTag')}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="combo-cta-input" className="text-xs font-semibold text-foreground">
                Nút CTA
              </label>
              <Input
                id="combo-cta-input"
                placeholder="Đặt Set Ngay"
                className="mt-1 text-xs"
                {...register('comboCtaText')}
              />
            </div>

            <div>
              <label htmlFor="combo-sort-input" className="text-xs font-semibold text-foreground">
                Thứ tự hiển thị
              </label>
              <Input
                id="combo-sort-input"
                type="number"
                placeholder="1"
                className="mt-1 text-xs"
                {...register('comboSortOrder', { valueAsNumber: true })}
              />
            </div>
          </div>

          <div>
            <label htmlFor="combo-href-input" className="text-xs font-semibold text-foreground">
              Đường dẫn liên kết (Link href)
            </label>
            <Input
              id="combo-href-input"
              placeholder="/combos/set-hoang-gia"
              className="mt-1 text-xs"
              {...register('comboHref')}
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="isBreakout"
              className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
              {...register('isBreakout')}
            />
            <label
              htmlFor="isBreakout"
              className="cursor-pointer text-xs font-medium text-foreground"
            >
              Hiệu ứng ảnh tràn khung (Breakout Image)
            </label>
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
              {isPending ? 'Đang lưu...' : 'Lưu cấu hình'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
