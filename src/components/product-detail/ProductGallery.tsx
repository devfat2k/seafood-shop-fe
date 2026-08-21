'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Icon } from '@/components/common/Icon';

type ProductGalleryProps = {
  images?: string[];
  productName: string;
  badges?: string[];
};

export function ProductGallery(props: ProductGalleryProps) {
  const { images = [], productName } = props;
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const currentImage = images[activeImageIndex] ?? images[0] ?? '';

  const handlePrev = () => {
    if (images.length === 0) {
      return;
    }
    setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    if (images.length === 0) {
      return;
    }
    setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-4">
      <div className="group relative aspect-square w-full overflow-hidden rounded-2xl border border-border bg-card shadow-xs">
        {currentImage ? (
          <Image
            src={currentImage}
            alt={productName}
            fill
            priority
            unoptimized
            className="cursor-zoom-in object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
            <Icon name="fish" size="xl" />
          </div>
        )}

        {currentImage && (
          <div className="pointer-events-none absolute right-4 bottom-4 flex items-center gap-1.5 rounded-lg bg-black/60 px-3 py-1.5 text-xs text-white opacity-0 backdrop-blur-xs transition-opacity duration-300 group-hover:opacity-100">
            <Icon name="search" size="xs" />
            <span>Rê chuột để phóng to</span>
          </div>
        )}
      </div>

      {/* Dải Thumbnails bên dưới */}
      {images.length > 1 && (
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Ảnh trước"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-card text-foreground transition-all hover:bg-muted"
          >
            <Icon name="chevron-left" size="sm" />
          </button>

          {/* Thumbnails grid */}
          <div className="grid flex-1 grid-cols-4 gap-3">
            {images.slice(0, 4).map((img, idx) => {
              const isActive = idx === activeImageIndex;

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setActiveImageIndex(idx);
                  }}
                  aria-label={`Xem ảnh ${idx + 1}`}
                  className={`relative aspect-square overflow-hidden rounded-xl bg-card p-1 transition-all ${
                    isActive
                      ? 'border-2 border-primary ring-2 ring-primary/20'
                      : 'border border-border hover:border-secondary'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${productName} thumbnail ${idx + 1}`}
                    fill
                    unoptimized
                    className="rounded-lg object-cover"
                  />
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Ảnh tiếp theo"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-card text-foreground transition-all hover:bg-muted"
          >
            <Icon name="chevron-right" size="sm" />
          </button>
        </div>
      )}
    </div>
  );
}
