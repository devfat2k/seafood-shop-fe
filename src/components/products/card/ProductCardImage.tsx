'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Icon } from '@/components/common/Icon';
import { Link } from '@/libs/I18nNavigation';

type ProductCardImageProps = {
  id: string | number;
  name: string;
  image?: string;
  discountPercent?: number;
  onQuickView?: () => void;
};

export const ProductCardImage = ({
  id,
  name,
  image,
  discountPercent = 0,
  onQuickView,
}: ProductCardImageProps) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-border/60 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-secondary/10 via-background to-muted/30 p-2">
      <Link href={`/products/${id}`} className="relative block h-full w-full">
        {image && !imageError ? (
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            unoptimized
            onError={() => {
              setImageError(true);
            }}
            className="object-contain p-2 drop-shadow-[0_8px_16px_rgba(11,74,92,0.18)] transition-all duration-500 group-hover:scale-108 group-hover:-translate-y-1 group-hover:drop-shadow-[0_14px_24px_rgba(11,74,92,0.28)]"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center rounded-xl bg-secondary/5 text-muted-foreground/60">
            <Icon name="fish" size="xl" className="text-secondary/40" />
            <span className="mt-1.5 text-xs font-medium text-muted-foreground/80">
              Hải sản tươi sống
            </span>
          </div>
        )}
      </Link>

      {discountPercent > 0 && (
        <span className="absolute top-2.5 right-2.5 rounded-full bg-primary px-2 py-0.5 text-xs font-bold text-white shadow-xs">
          -{discountPercent}%
        </span>
      )}

      {onQuickView && (
        <button
          type="button"
          onClick={onQuickView}
          className="absolute right-2.5 bottom-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-card/95 text-foreground opacity-0 shadow-md backdrop-blur-md transition-all duration-200 group-hover:opacity-100 hover:scale-110 hover:bg-secondary hover:text-white"
          aria-label={`Xem nhanh ${name}`}
        >
          <Icon name="eye" size="xs" />
        </button>
      )}
    </div>
  );
};
