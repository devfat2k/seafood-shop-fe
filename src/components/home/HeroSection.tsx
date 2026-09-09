'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Icon } from '@/components/common/Icon';
import { Link } from '@/libs/I18nNavigation';
import type { HeroSlide, HomeStats } from '@/types/home';
import { formatHeroSlide } from './hero/hero-utils';
import type { SlideDisplayItem } from './hero/hero-utils';
import { HeroCarouselControls } from './hero/HeroCarouselControls';
import { HeroShowcaseCard } from './hero/HeroShowcaseCard';

type HeroSectionProps = {
  slides?: HeroSlide[];
  stats?: HomeStats;
};

export const HeroSection = ({ slides = [] }: HeroSectionProps) => {
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
    <section className="relative w-full overflow-hidden border-b border-border/60 bg-background py-10 sm:py-16 lg:py-20">
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-secondary/10 via-background to-background" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="space-y-4 sm:space-y-6 lg:col-span-7">
            {slide.badgeText && (
              <div className="inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-secondary/10 px-3.5 py-1 text-xs font-bold text-secondary">
                <span className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
                <span>{slide.badgeText}</span>
              </div>
            )}

            <h1 className="font-heading text-3xl leading-[1.18] font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {slide.titlePrefix && <span>{slide.titlePrefix} </span>}
              <span className="text-primary">{slide.titleHighlight}</span>
              {slide.titleSuffix && <span className="block text-foreground">{slide.titleSuffix}</span>}
            </h1>

            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {slide.description}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2 sm:gap-4 sm:pt-3">
              <Link
                href={slide.primaryHref}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-xs font-bold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-xl active:scale-95 sm:text-sm"
              >
                <span>{slide.primaryLabel}</span>
                <Icon name="arrow-right" size="sm" />
              </Link>

              {slide.secondaryLabel && (
                <Link
                  href={slide.secondaryHref}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-secondary bg-card px-6 py-3 text-xs font-bold text-secondary shadow-xs transition-all hover:bg-secondary/10 active:scale-95 sm:text-sm"
                >
                  <span>{slide.secondaryLabel}</span>
                </Link>
              )}
            </div>
          </div>

          <HeroShowcaseCard slide={slide} />
        </div>

        <HeroCarouselControls
          slides={activeSlides}
          currentIdx={currentIdx}
          onSelectIdx={setCurrentIdx}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      </div>
    </section>
  );
};
