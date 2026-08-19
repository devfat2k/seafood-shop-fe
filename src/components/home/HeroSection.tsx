'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Icon } from '@/components/common/Icon';
import { Link } from '@/libs/I18nNavigation';
import type { HeroSlide, HomeStats } from '@/types/home';

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
  stats?: HomeStats;
};

function getSlideBadge(s: HeroSlide): string {
  if (typeof s.badge === 'string') {
    return s.badge;
  }
  if (s.badge?.text) {
    return s.badge.text;
  }
  return s.badgeText ?? '🌊 Hải sản Phan Thiết';
}

function getSlideCtas(s: HeroSlide): {
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
} {
  return {
    primaryLabel: s.ctaText ?? s.primaryCtaLabel ?? s.primaryCta?.label ?? 'Khám Phá Ngay',
    primaryHref: s.ctaLink ?? s.primaryCtaHref ?? s.primaryCta?.href ?? '/products',
    secondaryLabel: s.secondaryCta?.label ?? 'Xem Bảng Giá',
    secondaryHref: s.secondaryCta?.href ?? '/products',
  };
}

function formatHeroSlide(s: HeroSlide): SlideDisplayItem {
  const badgeText = getSlideBadge(s);
  const ctas = getSlideCtas(s);
  const bgImage =
    s.imageUrl ??
    s.cardImageUrl ??
    s.productCard?.imageUrl ??
    s.productCard?.image ??
    s.image ??
    '';

  const titlePrefix = s.titlePrefix ?? (s.title ? '' : 'Hải Sản Phan Thiết');
  const titleHighlight = s.titleHighlight ?? s.title ?? 'Tươi Ngon';
  const titleSuffix = s.titleSuffix ?? 'Mỗi Ngày';
  const description =
    s.description ??
    s.subtitle ??
    'Đánh bắt và vận chuyển trực tiếp từ biển Phan Thiết vào bờ, giữ trọn vị ngọt tự nhiên, giao nhanh trong 2H tại TP.HCM & các tỉnh lân cận.';

  return {
    id: String(s.id),
    badgeText,
    titlePrefix,
    titleHighlight,
    titleSuffix,
    description,
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
      {/* Background Ambience Image */}
      <div className="absolute inset-0 z-0">
        {slide.bgImage ? (
          <Image
            src={slide.bgImage}
            alt={slide.titleHighlight}
            fill
            priority
            unoptimized
            className="object-cover object-center brightness-[0.45] transition-all duration-700"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-r from-foreground via-[#0E5466] to-secondary" />
        )}
        {/* Ocean Deep Gradient Overlays for high readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/85 to-foreground/40" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[500px] max-w-7xl flex-col justify-center px-4 py-12 sm:min-h-[580px] sm:px-6 lg:min-h-[640px] lg:py-16">
        {/* Split Screen 2 Columns */}
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Headline, Description, CTAs */}
          <div className="space-y-4 sm:space-y-6 lg:col-span-7">
            {/* Clean Pill Badge */}
            {slide.badgeText && (
              <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-semibold text-white/90 backdrop-blur-md">
                <span>{slide.badgeText}</span>
              </div>
            )}

            {/* Heading with Brand Typography */}
            <h1 className="font-heading text-3xl leading-[1.15] font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {slide.titlePrefix && <span>{slide.titlePrefix} </span>}
              <span className="text-primary">{slide.titleHighlight}</span>
              {slide.titleSuffix && <span> {slide.titleSuffix}</span>}
            </h1>

            {/* Description */}
            <p className="max-w-xl text-xs leading-relaxed text-white/85 sm:text-base">
              {slide.description}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2 sm:gap-4 sm:pt-3">
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
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3.5 text-xs font-bold text-white backdrop-blur-xs transition-all hover:bg-white/20 sm:text-sm"
                >
                  <span>{slide.secondaryLabel}</span>
                </Link>
              )}
            </div>
          </div>

          {/* Right Column: Clean Seafood Showcase Card */}
          <div className="hidden lg:col-span-5 lg:flex lg:justify-end">
            <div className="w-full max-w-md overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-4 shadow-2xl backdrop-blur-md">
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl bg-white/5">
                {slide.bgImage ? (
                  <Image
                    src={slide.bgImage}
                    alt={slide.titleHighlight}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-white/5 text-white/60">
                    <Icon name="fish" size="xl" />
                  </div>
                )}
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div>
                  <h3 className="font-heading text-base font-bold text-white">
                    {slide.titleHighlight}
                  </h3>
                  <p className="text-xs text-white/70">Cảng cá Phan Thiết, Bình Thuận</p>
                </div>

                <Link
                  href="/products"
                  className="inline-flex items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground transition-all hover:bg-primary/90"
                >
                  <span>Xem menu</span>
                  <Icon name="arrow-right" size="xs" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Controls */}
        {activeSlides.length > 1 && (
          <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-4 sm:mt-12 sm:pt-6">
            {/* Dash Indicators */}
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
                    idx === currentIdx ? 'w-8 bg-primary' : 'w-2.5 bg-white/40 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>

            {/* Prev / Next Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Banner trước"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-xs transition-all hover:bg-white/25 active:scale-95"
              >
                <Icon name="chevron-left" size="sm" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Banner tiếp theo"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-xs transition-all hover:bg-white/25 active:scale-95"
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
