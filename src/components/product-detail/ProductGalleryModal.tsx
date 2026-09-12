'use client';

import Image from 'next/image';
import { Icon } from '@/components/common/Icon';

type ProductGalleryModalProps = {
  isOpen: boolean;
  image: string;
  productName: string;
  onClose: () => void;
};

export function ProductGalleryModal({
  isOpen,
  image,
  productName,
  onClose,
}: ProductGalleryModalProps) {
  if (!isOpen || !image) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Đóng phóng to ảnh"
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-sm"
      />

      <div className="relative z-10 max-h-[85vh] max-w-4xl overflow-hidden rounded-2xl bg-card p-2 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          aria-label="Đóng phóng to"
          className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-white hover:bg-black"
        >
          <Icon name="x" size="sm" />
        </button>
        <div className="relative h-[70vh] w-[80vw] max-w-3xl">
          <Image
            src={image}
            alt={productName}
            fill
            unoptimized
            className="rounded-xl object-contain"
          />
        </div>
        <p className="py-2 text-center text-xs font-semibold text-muted-foreground">
          {productName} — Ảnh thực tế chuẩn tươi sống
        </p>
      </div>
    </div>
  );
}
