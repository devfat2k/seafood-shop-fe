'use client';

import { Dialog as DialogPrimitive } from '@base-ui/react/dialog';
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
  if (!image) {
    return null;
  }

  return (
    <DialogPrimitive.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
    >
      <DialogPrimitive.Portal>
        <DialogPrimitive.Backdrop className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm transition-opacity" />
        <DialogPrimitive.Popup
          className="fixed top-1/2 left-1/2 z-50 max-h-[90vh] max-w-4xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl bg-card p-3 shadow-2xl outline-none"
          aria-label={`Phóng to ảnh ${productName}`}
        >
          <DialogPrimitive.Close
            className="absolute top-5 right-5 z-20 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-black/70 text-white backdrop-blur-md transition-all hover:scale-105 hover:bg-black"
            aria-label="Đóng phóng to"
          >
            <Icon name="x" size="sm" />
          </DialogPrimitive.Close>

          <div className="relative h-[70vh] w-[85vw] max-w-3xl">
            <Image
              src={image}
              alt={productName}
              fill
              unoptimized
              priority
              className="rounded-xl object-contain"
            />
          </div>

          <p className="py-2 text-center text-xs font-semibold text-muted-foreground">
            {productName} — Ảnh thực tế chuẩn tươi sống
          </p>
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
