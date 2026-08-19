'use client';

import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'sonner';
import { Icon } from '@/components/common/Icon';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useUploadCategoryImageMutation } from '@/libs/queries/admin/categories';
import type { Category } from '@/types/api';

type CategoryImageDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: Category | null;
};

export function CategoryImageDialog({ open, onOpenChange, category }: CategoryImageDialogProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const uploadMutation = useUploadCategoryImageMutation();

  if (!category) {
    return null;
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Kích thước ảnh không được vượt quá 5MB');
        return;
      }
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error('Vui lòng chọn 1 tệp hình ảnh');
      return;
    }
    try {
      await uploadMutation.mutateAsync({
        id: category.id,
        file: selectedFile,
      });
      toast.success('Upload ảnh danh mục thành công');
      setSelectedFile(null);
      setPreviewUrl(null);
      onOpenChange(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Upload ảnh thất bại');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload hình ảnh danh mục</DialogTitle>
          <DialogDescription>
            Cập nhật hình ảnh đại diện cho danh mục{' '}
            <span className="font-semibold text-foreground">
              {category.name ?? category.categoryName}
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex flex-col items-center justify-center">
            {previewUrl || category.imageUrl ? (
              <div className="relative h-40 w-40 overflow-hidden rounded-xl border border-border bg-muted">
                <Image
                  src={previewUrl ?? category.imageUrl ?? ''}
                  alt={category.name ?? category.categoryName ?? ''}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            ) : (
              <div className="flex h-40 w-40 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/50 text-muted-foreground">
                <Icon name="camera" size="lg" />
                <span className="mt-2 text-xs">Chưa có ảnh</span>
              </div>
            )}
          </div>

          <div>
            <label
              htmlFor="category-image-upload"
              className="block text-xs font-semibold text-foreground"
            >
              Chọn tệp ảnh từ máy tính:
            </label>
            <input
              id="category-image-upload"
              type="file"
              accept="image/*"
              aria-label="Chọn tệp ảnh danh mục"
              onChange={handleFileChange}
              className="mt-1.5 block w-full text-xs text-muted-foreground file:mr-3 file:rounded-lg file:border-0 file:bg-primary/10 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-primary hover:file:bg-primary/20"
            />
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={uploadMutation.isPending}
            onClick={() => {
              onOpenChange(false);
            }}
          >
            Hủy
          </Button>
          <Button
            type="button"
            size="sm"
            disabled={!selectedFile || uploadMutation.isPending}
            onClick={() => {
              void handleUpload();
            }}
          >
            {uploadMutation.isPending ? 'Đang tải lên...' : 'Lưu ảnh'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
