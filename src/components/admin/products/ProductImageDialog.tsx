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
import { useUploadProductImageMutation } from '@/libs/queries/admin/products';
import type { Product } from '@/types/api';

type ProductImageDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
};

export function ProductImageDialog({ open, onOpenChange, product }: ProductImageDialogProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const uploadMutation = useUploadProductImageMutation();

  if (!product) {
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
        id: product.id,
        file: selectedFile,
      });
      toast.success('Upload ảnh sản phẩm thành công');
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
          <DialogTitle>Upload hình ảnh sản phẩm</DialogTitle>
          <DialogDescription>
            Cập nhật hình ảnh đại diện cho{' '}
            <span className="font-semibold text-foreground">{product.name}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex flex-col items-center justify-center">
            {previewUrl || product.imageUrl ? (
              <div className="relative h-44 w-44 overflow-hidden rounded-xl border border-border bg-muted">
                <Image
                  src={previewUrl ?? product.imageUrl ?? ''}
                  alt={product.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            ) : (
              <div className="flex h-44 w-44 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/50 text-muted-foreground">
                <Icon name="camera" size="lg" />
                <span className="mt-2 text-xs">Chưa có ảnh</span>
              </div>
            )}
          </div>

          <div>
            <label
              htmlFor="product-image-upload"
              className="block text-xs font-semibold text-foreground"
            >
              Chọn tệp ảnh từ máy tính (PNG, JPG, WEBP &lt; 5MB):
            </label>
            <input
              id="product-image-upload"
              type="file"
              accept="image/*"
              aria-label="Chọn tệp ảnh sản phẩm"
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
