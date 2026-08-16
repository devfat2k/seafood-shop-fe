'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Icon } from '@/components/common/Icon';
import { Link } from '@/libs/I18nNavigation';
import type { HeroSlide } from '@/types/home';

type SlideDisplayItem = {
  id: string;
  badgeText: string;
  titlePrefix: string;
  titleHighlight: string;
  titleSuffix: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
  bgImage: string;
};

type HeroSectionProps = {
  slides?: HeroSlide[];
};

function getSlideBadge(s: HeroSlide): string {
  return s.badgeText ?? s.badge?.text ?? '🌊 Hải sản Phan Thiết';
}

function getSlideCtas(s: HeroSlide): {
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
} {
  return {
    primaryLabel: s.primaryCtaLabel ?? s.primaryCta?.label ?? 'Mua ngay hôm nay',
    primaryHref: s.primaryCtaHref ?? s.primaryCta?.href ?? '/products',
    secondaryLabel: s.secondaryCta?.label ?? 'Xem bảng giá',
    secondaryHref: s.secondaryCta?.href ?? '/products',
  };
}

function formatHeroSlide(s: HeroSlide): SlideDisplayItem {
  const badgeText = getSlideBadge(s);
  const ctas = getSlideCtas(s);
  const bgImage = s.cardImageUrl ?? s.productCard?.image ?? '';

  return {
    id: String(s.id),
    badgeText,
    titlePrefix: s.titlePrefix ?? 'Hải Sản Tươi Sống',
    titleHighlight: s.titleHighlight ?? 'Cập Cảng Hôm Nay',
    titleSuffix: s.titleSuffix ?? '',
    description:
      s.description ?? 'Đánh bắt tự nhiên trong ngày, giao nhanh chuỗi lạnh 2H tại TP.HCM.',
    primaryLabel: ctas.primaryLabel,
    primaryHref: ctas.primaryHref,
    secondaryLabel: ctas.secondaryLabel,
    secondaryHref: ctas.secondaryHref,
    bgImage,
  };
}

export function HeroSection({ slides = [] }: HeroSectionProps) {
  const [currentIdx, setCurrentIdx] = useState<number>(0);

  const activeSlides: SlideDisplayItem[] = slides.map((s) => formatHeroSlide(s));

  if (activeSlides.length === 0) {
    return null;
  }

  const slide = activeSlides[currentIdx] ?? activeSlides[0];

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev === 0 ? activeSlides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIdx((prev) => (prev === activeSlides.length - 1 ? 0 : prev + 1));
  };

  if (!slide) {
    return null;
  }

  return (
    <section className="relative w-full overflow-hidden bg-foreground text-white">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        {slide.bgImage ? (
          <Image
            src={slide.bgImage}
            alt={slide.titleHighlight}
            fill
            priority
            unoptimized
            className="object-cover object-center brightness-75 transition-all duration-700"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-r from-foreground via-[#0E5466] to-secondary" />
        )}
        {/* Ocean Deep Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/75 to-transparent sm:bg-gradient-to-r sm:from-foreground/95 sm:via-foreground/80 sm:to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[480px] max-w-7xl flex-col justify-center px-4 py-16 sm:min-h-[560px] sm:px-6 lg:min-h-[620px] lg:py-24">
        <div className="max-w-2xl space-y-4 sm:space-y-6">
          {/* Badge */}
          {slide.badgeText && (
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/20 px-3.5 py-1 text-xs font-bold text-white shadow-xs backdrop-blur-md sm:text-sm">
              <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
              <span>{slide.badgeText}</span>
            </div>
          )}

          {/* Heading */}
          <h1 className="font-heading text-3xl leading-tight font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            <span>{slide.titlePrefix} </span>
            <span className="text-primary">{slide.titleHighlight}</span>
            {slide.titleSuffix && <span> {slide.titleSuffix}</span>}
          </h1>

          {/* Description */}
          <p className="max-w-xl text-xs leading-relaxed text-white/85 sm:text-base lg:text-lg">
            {slide.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2 sm:gap-4 sm:pt-4">
            <Link
              href={slide.primaryHref}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-xs font-bold text-primary-foreground shadow-lg transition-all hover:bg-primary/90 active:scale-95 sm:text-sm"
            >
              <span>{slide.primaryLabel}</span>
              <Icon name="arrow-right" size="sm" />
            </Link>

            {slide.secondaryLabel && (
              <Link
                href={slide.secondaryHref}
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/40 bg-white/10 px-6 py-3.5 text-xs font-bold text-white backdrop-blur-md transition-all hover:bg-white/25 sm:text-sm"
              >
                <span>{slide.secondaryLabel}</span>
              </Link>
            )}
          </div>
        </div>

        {/* Carousel Slide Indicators & Arrows */}
        {activeSlides.length > 1 && (
          <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6 sm:mt-12">
            <div className="flex items-center gap-2">
              {activeSlides.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    setCurrentIdx(idx);
                  }}
                  aria-label={`Chuyển đến banner ${idx + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentIdx ? 'w-8 bg-primary' : 'w-2 bg-white/40 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Banner trước"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-xs transition-all hover:bg-white/25"
              >
                <Icon name="chevron-left" size="sm" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Banner tiếp theo"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-xs transition-all hover:bg-white/25"
              >
                <Icon name="chevron-right" size="sm" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
