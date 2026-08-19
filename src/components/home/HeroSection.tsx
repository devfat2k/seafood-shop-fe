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
    <section className="relative w-full overflow-hidden bg-foreground text-white">
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
          <div className="h-full w-full bg-gradient-to-r from-foreground via-secondary/80 to-secondary" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/85 to-foreground/40" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[500px] max-w-7xl flex-col justify-center px-4 py-12 sm:min-h-[580px] sm:px-6 lg:min-h-[640px] lg:py-16">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="space-y-4 sm:space-y-6 lg:col-span-7">
            {slide.badgeText && (
              <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-semibold text-white/90 backdrop-blur-md">
                <span>{slide.badgeText}</span>
              </div>
            )}

            <h1 className="font-heading text-3xl leading-[1.15] font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {slide.titlePrefix && <span>{slide.titlePrefix} </span>}
              <span className="text-primary">{slide.titleHighlight}</span>
              {slide.titleSuffix && <span> {slide.titleSuffix}</span>}
            </h1>

            <p className="max-w-xl text-xs leading-relaxed text-white/85 sm:text-base">
              {slide.description}
            </p>

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
