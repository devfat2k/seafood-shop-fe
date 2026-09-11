'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Icon } from '@/components/common/Icon';
import { Link } from '@/libs/I18nNavigation';

type ProductCardImageProps = {
  id: string | number;
  name: string;
  image?: string;
  badge?: string;
  origin?: string;
  discountPercent?: number;
  onQuickView?: () => void;
};

export const ProductCardImage = ({
  id,
  name,
  image,
  badge,
  origin,
  discountPercent = 0,
  onQuickView,
}: ProductCardImageProps) => {
  const [imageError, setImageError] = useState(false);
  const displayBadge = badge ?? 'TƯƠI SỐNG';
  const displayOrigin = origin ?? 'Phan Thiết';

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-muted/40 shadow-xs sm:aspect-square">
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
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center bg-secondary/5 text-muted-foreground/60">
            <Icon name="fish" size="xl" className="text-secondary/40" />
            <span className="mt-1.5 text-xs font-medium text-muted-foreground/80">
              Hải sản Phan Thiết
            </span>
          </div>
        )}
      </Link>

      {/* Gradient shadow overlay for badge readability */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-black/40 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/40 to-transparent" />

      {/* Top badges */}
      <div className="absolute top-2.5 left-2.5 flex flex-wrap items-center gap-1.5 sm:top-3 sm:left-3">
        {displayBadge && (
          <span className="inline-flex items-center gap-1 rounded-full border border-white/25 bg-black/40 px-2.5 py-0.5 text-[10px] font-bold text-white shadow-xs backdrop-blur-md sm:text-[11px]">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span>{displayBadge}</span>
          </span>
        )}

        {discountPercent > 0 && (
          <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-black text-white shadow-md shadow-primary/30 sm:text-[11px]">
            -{discountPercent}%
          </span>
        )}
      </div>

      {/* Quick view button */}
      {onQuickView && (
        <button
          type="button"
          onClick={onQuickView}
          className="absolute top-2.5 right-2.5 flex h-8 w-8 items-center justify-center rounded-full border border-white/40 bg-card/90 text-foreground opacity-90 shadow-md backdrop-blur-md transition-all duration-200 hover:scale-110 hover:bg-secondary hover:text-white sm:top-3 sm:right-3 sm:opacity-0 sm:group-hover:opacity-100"
          aria-label={`Xem nhanh ${name}`}
          title="Xem nhanh"
        >
          <Icon name="eye" size="xs" />
        </button>
      )}

      {/* Bottom origin badge */}
      {displayOrigin && (
        <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 rounded-md bg-black/40 px-2 py-0.5 text-[10px] font-medium text-white/90 backdrop-blur-md">
          <Icon name="map-pin" size="xs" className="h-2.5 w-2.5 text-accent" />
          <span>{displayOrigin}</span>
        </div>
      )}
    </div>
  );
};
