'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Icon } from '@/components/common/Icon';
import { ProductGalleryModal } from '@/components/product-detail/ProductGalleryModal';

type ProductGalleryProps = {
  images?: string[];
  productName: string;
};

export function ProductGallery({ images = [], productName }: ProductGalleryProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  const displayImages = images.length > 0 ? images : [''];
  const currentImage = displayImages[activeIdx] ?? displayImages[0] ?? '';

  const handlePrev = () => {
    setActiveIdx((prev) => (prev === 0 ? displayImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev === displayImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-4">
      <div className="group relative aspect-4/3 w-full overflow-hidden rounded-2xl border border-border bg-card shadow-xs sm:aspect-4/5 lg:aspect-4/5 lg:min-h-[680px]">
        {currentImage ? (
          <button
            type="button"
            onClick={() => {
              setIsZoomOpen(true);
            }}
            aria-label={`Phóng to ảnh ${productName}`}
            className="relative block h-full w-full cursor-zoom-in text-left"
          >
            <Image
              src={currentImage}
              alt={productName}
              fill
              priority
              unoptimized
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </button>
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center bg-muted/40 text-muted-foreground">
            <Icon name="fish" size="xl" className="text-secondary/50" />
            <span className="mt-2 text-xs">Hải sản tươi sống</span>
          </div>
        )}

        <div className="pointer-events-none absolute top-3 left-3 flex flex-wrap items-center gap-1.5 sm:top-4 sm:left-4">
          <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[11px] font-bold text-white backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span>Tươi sống tại bến</span>
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-primary/90 px-3 py-1 text-[11px] font-black text-white shadow-xs">
            <span>Đánh bắt tự nhiên</span>
          </span>
        </div>

        {currentImage && (
          <button
            type="button"
            onClick={() => {
              setIsZoomOpen(true);
            }}
            aria-label="Phóng to ảnh"
            className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-black/40 text-white backdrop-blur-md transition-transform hover:scale-110 sm:top-4 sm:right-4"
          >
            <Icon name="search" size="xs" />
          </button>
        )}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between bg-linear-to-t from-black/60 to-transparent p-4 text-xs text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="text-[11px] font-medium">Bấm vào ảnh để xem chi tiết</span>
          <span className="text-[11px] font-semibold text-accent">Cảng cá Phan Thiết</span>
        </div>
      </div>

      {displayImages.length > 1 && (
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Ảnh trước"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-card text-foreground transition-all hover:border-secondary hover:bg-muted"
          >
            <Icon name="chevron-left" size="sm" />
          </button>

          <div className="grid flex-1 grid-cols-4 gap-2 sm:gap-3">
            {displayImages.slice(0, 4).map((img, idx) => {
              const isActive = idx === activeIdx;

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setActiveIdx(idx);
                  }}
                  aria-label={`Xem ảnh ${idx + 1}`}
                  className={`relative aspect-square overflow-hidden rounded-xl bg-card p-1 transition-all ${
                    isActive
                      ? 'border-2 border-primary ring-2 ring-primary/20'
                      : 'border border-border hover:border-secondary/60'
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
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-card text-foreground transition-all hover:border-secondary hover:bg-muted"
          >
            <Icon name="chevron-right" size="sm" />
          </button>
        </div>
      )}

      <ProductGalleryModal
        isOpen={isZoomOpen}
        image={currentImage}
        productName={productName}
        onClose={() => {
          setIsZoomOpen(false);
        }}
      />
    </div>
  );
}
