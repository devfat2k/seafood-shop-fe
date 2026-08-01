'use client';

import { useState } from 'react';

type ProductGalleryProps = {
  images: string[];
  productName: string;
  badges: string[];
};

export function ProductGallery(props: ProductGalleryProps) {
  const { images, productName, badges } = props;
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const currentImage = images[activeImageIndex] ?? images[0];

  return (
    <div className="flex flex-col gap-4">
      {/* Khung ảnh chính lớn */}
      <div className="relative h-[480px] w-full overflow-hidden rounded-3xl border border-[#E4E0D8] bg-[#F5F1E8] shadow-md">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={currentImage}
          alt={productName}
          className="h-full w-full object-cover transition-all duration-300"
        />

        {/* Badges đè trên ảnh */}
        <div className="absolute top-4 left-4 flex flex-col items-start gap-2">
          {badges.map((badge, idx) => (
            <span
              key={idx}
              className={`rounded-full px-3.5 py-1 text-xs font-bold ${
                badge.includes('🟢')
                  ? 'bg-[#0E3D34] text-white shadow-sm'
                  : 'bg-[#26312D] text-white shadow-sm'
              }`}
            >
              {badge}
            </span>
          ))}
        </div>
      </div>

      {/* Dải Thumbnails bên dưới */}
      <div className="grid grid-cols-4 gap-3">
        {images.map((img, idx) => {
          const isActive = idx === activeImageIndex;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setActiveImageIndex(idx);
              }}
              className={`relative h-24 overflow-hidden rounded-2xl border-2 transition-all ${
                isActive
                  ? 'border-[#0E3D34] ring-2 ring-[#0E3D34]/20'
                  : 'border-[#E4E0D8] opacity-70 hover:opacity-100'
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img}
                alt={`${productName} thumbnail ${idx + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
