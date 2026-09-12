'use client';

import { useEffect, useState } from 'react';
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
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const activeSlides: SlideDisplayItem[] = slides.map((s) => formatHeroSlide(s));

  useEffect(() => {
    const timer =
      activeSlides.length > 1 && !isPaused
        ? setInterval(() => {
            setCurrentIdx((prev) => (prev === activeSlides.length - 1 ? 0 : prev + 1));
          }, 6000)
        : null;

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [activeSlides.length, isPaused]);

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
    <section
      onMouseEnter={() => {
        setIsPaused(true);
      }}
      onMouseLeave={() => {
        setIsPaused(false);
      }}
      className="relative w-full overflow-hidden border-b border-white/10 bg-gradient-to-br from-[#062933] via-[#0B4A5C] to-[#041D24] py-10 text-white sm:py-16 lg:py-20"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-20 h-[550px] w-[550px] rounded-full bg-[#0F7C8C]/30 blur-[130px]" />
        <div className="absolute -right-20 -bottom-32 h-[500px] w-[500px] rounded-full bg-[#FF6B4A]/20 blur-[130px]" />
        <div className="absolute top-1/2 left-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:32px_32px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="flex flex-col justify-between space-y-4 sm:space-y-6 lg:col-span-7 lg:min-h-[460px]">
            <div
              key={currentIdx}
              className="animate-in space-y-4 duration-500 fade-in sm:space-y-6"
            >
              <div className="h-8">
                {slide.badgeText && (
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold text-accent shadow-xs backdrop-blur-md">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
                    <span>{slide.badgeText}</span>
                  </div>
                )}
              </div>

              <div className="min-h-[110px] sm:min-h-[140px] lg:min-h-[160px]">
                <h1 className="font-heading text-3xl leading-[1.12] font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                  {slide.titlePrefix && (
                    <span className="block text-white/95">{slide.titlePrefix}</span>
                  )}
                  <span className="bg-gradient-to-r from-[#FF7A59] via-[#FFA44A] to-[#FFD166] bg-clip-text text-transparent">
                    {slide.titleHighlight}
                  </span>
                  {slide.titleSuffix && (
                    <span className="block text-white">{slide.titleSuffix}</span>
                  )}
                </h1>
              </div>

              <div className="min-h-[44px] sm:min-h-[52px]">
                <p className="max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
                  {slide.description}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2 sm:gap-4 sm:pt-3">
                <Link
                  href={slide.primaryHref}
                  className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-primary px-8 py-4 text-sm font-extrabold text-white shadow-xl shadow-primary/35 transition-all hover:scale-105 hover:bg-primary/90 hover:shadow-2xl hover:shadow-primary/50 active:scale-95 sm:text-base"
                >
                  <span>{slide.primaryLabel}</span>
                  <Icon name="arrow-right" size="sm" />
                </Link>

                {slide.secondaryLabel && (
                  <Link
                    href={slide.secondaryHref}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-7 py-4 text-sm font-bold text-white shadow-xs backdrop-blur-md transition-all hover:border-white/40 hover:bg-white/20 active:scale-95 sm:text-base"
                  >
                    <span>{slide.secondaryLabel}</span>
                  </Link>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3 sm:grid-cols-4 sm:gap-4 sm:pt-4">
              <div className="flex flex-col items-center justify-center rounded-xl border border-white/15 bg-white/10 p-3 text-center backdrop-blur-md">
                <div className="flex items-center gap-1.5 text-base font-black text-accent sm:text-lg">
                  <Icon name="star" size="xs" className="fill-accent text-accent" />
                  <span>4.9/5</span>
                </div>
                <div className="text-[11px] text-white/70">2.500+ khách hàng</div>
              </div>
              <div className="flex flex-col items-center justify-center rounded-xl border border-white/15 bg-white/10 p-3 text-center backdrop-blur-md">
                <div className="flex items-center gap-1.5 text-base font-black text-white sm:text-lg">
                  <Icon name="truck" size="xs" className="text-secondary" />
                  <span>2 Giờ</span>
                </div>
                <div className="text-[11px] text-white/70">Giao sống bơi oxy</div>
              </div>
              <div className="flex flex-col items-center justify-center rounded-xl border border-white/15 bg-white/10 p-3 text-center backdrop-blur-md">
                <div className="flex items-center gap-1.5 text-base font-black text-tertiary sm:text-lg">
                  <Icon name="shield-check" size="xs" className="text-tertiary" />
                  <span>1 Đổi 1</span>
                </div>
                <div className="text-[11px] text-white/70">Bao ăn tận nơi</div>
              </div>
              <div className="flex flex-col items-center justify-center rounded-xl border border-white/15 bg-white/10 p-3 text-center backdrop-blur-md">
                <div className="flex items-center gap-1.5 text-base font-black text-white sm:text-lg">
                  <Icon name="anchor" size="xs" className="text-white/80" />
                  <span>04:00 AM</span>
                </div>
                <div className="text-[11px] text-white/70">Cập cảng mỗi ngày</div>
              </div>
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
