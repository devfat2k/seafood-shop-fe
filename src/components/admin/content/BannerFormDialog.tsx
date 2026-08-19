'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
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
  useCreateBannerMutation,
  useUpdateBannerMutation,
  useUploadBannerImageMutation,
} from '@/libs/queries/admin/content';
import type { HeroBanner } from '@/types/admin';
import type { AdminBannerFormValues } from '@/validations/admin';
import { adminBannerSchema } from '@/validations/admin';

type BannerFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bannerToEdit?: HeroBanner | null;
};

export function BannerFormDialog({ open, onOpenChange, bannerToEdit }: BannerFormDialogProps) {
  const isEdit = Boolean(bannerToEdit);
  const createMutation = useCreateBannerMutation();
  const updateMutation = useUpdateBannerMutation();
  const uploadImageMutation = useUploadBannerImageMutation();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AdminBannerFormValues>({
    resolver: zodResolver(adminBannerSchema),
    defaultValues: {
      title: '',
      subtitle: '',
      ctaText: 'Mua Ngay',
      ctaLink: '/products',
      sortOrder: 1,
      isActive: true,
    },
  });

  useEffect(() => {
    if (bannerToEdit) {
      reset({
        title: bannerToEdit.title,
        subtitle: bannerToEdit.subtitle ?? '',
        ctaText: bannerToEdit.ctaText ?? 'Mua Ngay',
        ctaLink: bannerToEdit.ctaLink ?? '/products',
        sortOrder: bannerToEdit.sortOrder ?? 1,
        isActive: bannerToEdit.isActive,
      });
    } else {
      reset({
        title: '',
        subtitle: '',
        ctaText: 'Mua Ngay',
        ctaLink: '/products',
        sortOrder: 1,
        isActive: true,
      });
    }
    setSelectedFile(null);
  }, [bannerToEdit, reset]);

  const onSubmit = async (values: AdminBannerFormValues) => {
    try {
      let bannerId = bannerToEdit?.id;
      if (isEdit && bannerId) {
        await updateMutation.mutateAsync({
          id: bannerId,
          data: values,
        });
        toast.success('Cập nhật thông tin banner thành công');
      } else {
        const res = await createMutation.mutateAsync(values);
        bannerId = res.data?.id;
        toast.success('Tạo banner mới thành công');
      }

      // If user also attached a new image file
      if (selectedFile && bannerId) {
        await uploadImageMutation.mutateAsync({
          id: bannerId,
          file: selectedFile,
        });
        toast.success('Upload ảnh banner thành công');
      }

      onOpenChange(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Thao tác thất bại');
    }
  };

  const isPending =
    isSubmitting ||
    createMutation.isPending ||
    updateMutation.isPending ||
    uploadImageMutation.isPending;

  let submitLabel = 'Tạo Banner';
  if (isPending) {
    submitLabel = 'Đang lưu...';
  } else if (isEdit) {
    submitLabel = 'Cập nhật';
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Chỉnh sửa Banner' : 'Thêm Banner Mới'}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? 'Cập nhật nội dung hiển thị của Hero Banner trên Storefront'
              : 'Tạo Hero Banner mới quảng bá chương trình hoặc sản phẩm'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <label htmlFor="banner-title-input" className="text-xs font-semibold text-foreground">
              Tiêu đề Banner *
            </label>
            <Input
              id="banner-title-input"
              placeholder="VD: Đại Tiệc Hải Sản Hoàng Gia"
              className="mt-1 text-xs"
              {...register('title')}
            />
            {errors.title && (
              <p className="mt-1 text-[11px] text-destructive">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="banner-sub-input" className="text-xs font-semibold text-foreground">
              Phụ đề (Subtitle)
            </label>
            <Input
              id="banner-sub-input"
              placeholder="VD: Giảm ngay 20% cho đơn hàng đầu tiên hôm nay"
              className="mt-1 text-xs"
              {...register('subtitle')}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="banner-cta-input" className="text-xs font-semibold text-foreground">
                Chữ trên nút CTA
              </label>
              <Input
                id="banner-cta-input"
                placeholder="Mua Ngay"
                className="mt-1 text-xs"
                {...register('ctaText')}
              />
            </div>

            <div>
              <label htmlFor="banner-link-input" className="text-xs font-semibold text-foreground">
                Liên kết nút (Link)
              </label>
              <Input
                id="banner-link-input"
                placeholder="/products"
                className="mt-1 text-xs"
                {...register('ctaLink')}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="banner-sort-input" className="text-xs font-semibold text-foreground">
                Thứ tự ưu tiên
              </label>
              <Input
                id="banner-sort-input"
                type="number"
                placeholder="1"
                className="mt-1 text-xs"
                {...register('sortOrder', { valueAsNumber: true })}
              />
            </div>

            <div className="flex items-center gap-2 pt-5">
              <input
                type="checkbox"
                id="bannerActive"
                className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                {...register('isActive')}
              />
              <label
                htmlFor="bannerActive"
                className="cursor-pointer text-xs font-medium text-foreground"
              >
                Hiển thị trên Trang chủ
              </label>
            </div>
          </div>

          <div>
            <label
              htmlFor="banner-file-input"
              className="block text-xs font-semibold text-foreground"
            >
              Chọn tệp hình ảnh banner {isEdit ? '(tùy chọn thay đổi)' : '*'}:
            </label>
            <input
              id="banner-file-input"
              type="file"
              accept="image/*"
              aria-label="Chọn tệp ảnh banner"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) {
                  setSelectedFile(f);
                }
              }}
              className="mt-1.5 block w-full text-xs text-muted-foreground file:mr-3 file:rounded-lg file:border-0 file:bg-primary/10 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-primary hover:file:bg-primary/20"
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
