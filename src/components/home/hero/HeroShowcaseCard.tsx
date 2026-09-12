'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Icon } from '@/components/common/Icon';
import { Link } from '@/libs/I18nNavigation';
import { formatCurrency } from '@/utils/Helpers';
import type { SlideDisplayItem } from './hero-utils';

type HeroShowcaseCardProps = {
  slide: SlideDisplayItem;
};

type ShowcaseMediaProps = {
  bgImage: string;
  imageAlt: string;
  badgeText: string;
  discountBadge?: string;
};

function HeroShowcaseMedia({ bgImage, imageAlt, badgeText, discountBadge }: ShowcaseMediaProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-[#072F3A]/60 shadow-2xl sm:rounded-3xl">
      {bgImage && !imgError ? (
        <Image
          src={bgImage}
          alt={imageAlt}
          fill
          unoptimized
          priority
          onError={() => {
            setImgError(true);
          }}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center bg-white/5 text-white/60">
          <Icon name="fish" size="xl" className="text-secondary" />
          <span className="mt-2 text-xs font-medium text-white/80">Hải sản tươi sống cập bến</span>
        </div>
      )}

      {/* Subtle bottom vignette to blend beautifully */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#06242D]/90 via-transparent to-black/30" />

      {/* Floating Badges inside image */}
      <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/40 px-3.5 py-1 text-xs font-bold text-white shadow-md backdrop-blur-md sm:top-4 sm:left-4">
        <span className="h-2 w-2 animate-ping rounded-full bg-accent" />
        <span>{badgeText}</span>
      </div>

      {discountBadge && (
        <div className="absolute top-3 right-3 rounded-full bg-primary px-3.5 py-1 text-xs font-black text-white shadow-lg shadow-primary/40 sm:top-4 sm:right-4">
          {discountBadge}
        </div>
      )}

      <div className="absolute right-3 bottom-3 left-3 flex items-center justify-between text-xs text-white/90 sm:right-4 sm:bottom-4 sm:left-4">
        <div className="flex items-center gap-1.5 rounded-lg bg-black/50 px-2.5 py-1 backdrop-blur-md">
          <Icon name="shield-check" size="xs" className="text-tertiary" />
          <span className="text-[11px] font-medium sm:text-xs">Bao ăn 1 đổi 1 tận nơi</span>
        </div>
        <div className="flex items-center gap-1.5 rounded-lg bg-black/50 px-2.5 py-1 backdrop-blur-md">
          <Icon name="truck" size="xs" className="text-accent" />
          <span className="text-[11px] font-medium sm:text-xs">Giao sống bơi oxy</span>
        </div>
      </div>
    </div>
  );
}

type ShowcaseInfoProps = {
  title: string;
  subtitle: string;
  primaryHref: string;
  salePrice?: number;
  originalPrice?: number;
};

function HeroShowcaseInfo({
  title,
  subtitle,
  primaryHref,
  salePrice,
  originalPrice,
}: ShowcaseInfoProps) {
  const hasDiscount = Boolean(originalPrice && salePrice && originalPrice > salePrice);

  return (
    <div className="mt-4 flex min-h-[72px] flex-col justify-between gap-3 sm:min-h-[76px] sm:flex-row sm:items-center">
      <div className="min-w-0 flex-1">
        <h3 className="truncate font-heading text-lg font-bold text-white sm:text-xl">{title}</h3>
        <p className="mt-0.5 line-clamp-1 text-xs text-white/70 sm:text-sm">{subtitle}</p>

        <div className="mt-1.5 flex h-7 items-baseline gap-2.5">
          {salePrice === undefined ? (
            <span className="text-xs font-semibold text-accent/90 sm:text-sm">
              Giá tươi cập cảng hôm nay
            </span>
          ) : (
            <>
              <span className="font-heading text-xl font-black text-accent tabular-nums sm:text-2xl">
                {formatCurrency(salePrice)}
              </span>
              {hasDiscount && originalPrice !== undefined && (
                <span className="text-xs text-white/50 tabular-nums line-through sm:text-sm">
                  {formatCurrency(originalPrice)}
                </span>
              )}
            </>
          )}
        </div>
      </div>

      <Link
        href={primaryHref}
        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-xs font-bold text-white shadow-lg shadow-primary/30 transition-all hover:scale-105 hover:bg-primary/90 active:scale-95 sm:text-sm"
      >
        <span>Đặt hàng ngay</span>
        <Icon name="arrow-right" size="xs" />
      </Link>
    </div>
  );
}

export function HeroShowcaseCard({ slide }: HeroShowcaseCardProps) {
  const card = slide.productCard;
  const title = card?.title ?? slide.titleHighlight;
  const subtitle = card?.subtitle ?? 'Cảng cá Phan Thiết, Bình Thuận';
  const badgeText = card?.comboBadge ?? 'VỪA CẬP CẢNG';
  const imageAlt = card?.imageAlt ?? title;

  return (
    <div className="relative mx-auto w-full lg:col-span-5">
      {/* Ocean ambient halo glow */}
      <div className="absolute -inset-4 -z-10 rounded-[36px] bg-gradient-to-tr from-secondary/30 via-accent/20 to-primary/25 opacity-80 blur-3xl transition-all duration-700 group-hover:opacity-100" />

      <div className="group relative overflow-hidden rounded-[30px] border border-white/20 bg-white/10 p-3.5 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:border-white/35 sm:p-5">
        <HeroShowcaseMedia
          bgImage={slide.bgImage}
          imageAlt={imageAlt}
          badgeText={badgeText}
          discountBadge={card?.discountBadge ?? undefined}
        />

        <HeroShowcaseInfo
          title={title}
          subtitle={subtitle}
          primaryHref={slide.primaryHref}
          salePrice={card?.salePrice}
          originalPrice={card?.originalPrice}
        />
      </div>
    </div>
  );
}
