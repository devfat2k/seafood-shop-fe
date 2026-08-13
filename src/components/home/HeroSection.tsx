'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Icon } from '@/components/common/Icon';
import type { HeroSlide } from '@/types/home';
import { Link } from '@/libs/I18nNavigation';

const AUTO_PLAY_INTERVAL_MS = 5000;
const PROGRESS_TICK_MS = 50;

type HeroSectionProps = {
  slides?: HeroSlide[];
};

export function HeroSection(props: HeroSectionProps) {
  const slides = props.slides ?? [];
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  const handleNext = useCallback(() => {
    if (slides.length === 0) return;
    setActiveIndex((prev) => (prev + 1) % slides.length);
    setProgress(0);
  }, [slides.length]);

  const handlePrev = useCallback(() => {
    if (slides.length === 0) return;
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
    setProgress(0);
  }, [slides.length]);

  const handleSelectSlide = useCallback((index: number) => {
    setActiveIndex(index);
    setProgress(0);
  }, []);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null;

    if (!isPaused && !prefersReducedMotion && slides.length > 0) {
      timer = setInterval(() => {
        setProgress((prevProgress) => {
          const nextProgress = prevProgress + (PROGRESS_TICK_MS / AUTO_PLAY_INTERVAL_MS) * 100;
          if (nextProgress >= 100) {
            setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
            return 0;
          }
          return nextProgress;
        });
      }, PROGRESS_TICK_MS);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isPaused, prefersReducedMotion, slides.length]);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsPaused(true);
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsPaused(false);
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0]?.clientX ?? null;
    if (touchEndX === null) return;

    const diff = touchEndX - touchStartX.current;
    if (diff < -50) {
      handleNext();
    } else if (diff > 50) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    }
  };

  const currentSlide = slides[activeIndex];

  if (!currentSlide) {
    return (
      <section className="relative overflow-hidden bg-gradient-to-b from-[#071E19] via-[#0B2F28] to-[#0E3D34] py-12 lg:py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
          <h1 className="text-3xl font-extrabold text-[#D9A441] sm:text-5xl">
            Hải Sản Phan Thiết Tươi Sống
          </h1>
          <p className="mt-4 text-emerald-100/90">
            Đánh bắt trong đêm • Giao hỏa tốc dưới 2 giờ
          </p>
        </div>
      </section>
    );
  }

  const badgeText = currentSlide.badgeText ?? currentSlide.badge?.text ?? '';
  const badgeIcon = currentSlide.badgeIcon ?? currentSlide.badge?.icon ?? 'sparkles';
  const primaryLabel = currentSlide.primaryCtaLabel ?? currentSlide.primaryCta?.label ?? 'Mua Ngay';
  const primaryHref = currentSlide.primaryCtaHref ?? currentSlide.primaryCta?.href ?? '/products';
  const primaryIcon = currentSlide.primaryCtaIcon ?? currentSlide.primaryCta?.icon ?? 'shopping-bag';
  const secondaryLabel = currentSlide.secondaryCta?.label ?? 'Xem Thực Đơn';
  const secondaryHref = currentSlide.secondaryCta?.href ?? '/products';
  const secondaryIcon = currentSlide.secondaryCta?.icon ?? 'fish';

  const cardImage = currentSlide.cardImageUrl ?? currentSlide.productCard?.image ?? '';
  const cardTitle = currentSlide.cardTitle ?? currentSlide.productCard?.title ?? '';
  const cardSubtitle = currentSlide.cardSubtitle ?? currentSlide.productCard?.subtitle ?? '';
  const salePrice = currentSlide.cardSalePrice
    ? `${currentSlide.cardSalePrice.toLocaleString('vi-VN')}₫`
    : (currentSlide.productCard?.salePrice ?? '');
  const originalPrice = currentSlide.cardOriginalPrice
    ? `${currentSlide.cardOriginalPrice.toLocaleString('vi-VN')}₫`
    : (currentSlide.productCard?.originalPrice ?? '');

  return (
    <section
      aria-label="Khuyến mãi & Sản phẩm nổi bật"
      className="relative overflow-hidden bg-gradient-to-b from-[#071E19] via-[#0B2F28] to-[#0E3D34] py-8 lg:py-16 text-white outline-none"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden opacity-20">
        <svg
          className="absolute -top-10 -left-10 h-[600px] w-[1440px] text-[#D9A441]"
          viewBox="0 0 1440 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-100,200 C300,400 600,0 1000,300 C1200,450 1400,100 1600,200"
            stroke="currentColor"
            strokeWidth="3"
            strokeDasharray="8 8"
          />
          <circle cx="400" cy="250" r="280" fill="url(#hero-glow)" opacity="0.4" />
          <defs>
            <radialGradient id="hero-glow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(400 250) rotate(90) scale(280)">
              <stop stopColor="#D9A441" />
              <stop offset="1" stopColor="#D9A441" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      <div
        className="mx-auto max-w-7xl px-4 sm:px-6"
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12"
          aria-live={isPaused ? 'polite' : 'off'}
        >
          {/* Left Text Content */}
          <div className="lg:col-span-7">
            {badgeText && (
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D9A441]/40 bg-[#D9A441]/15 px-4 py-1.5 text-xs font-extrabold text-[#D9A441] shadow-xs backdrop-blur-xs">
                <Icon name={badgeIcon} size="xs" />
                <span>{badgeText}</span>
              </div>
            )}

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl/tight">
              {currentSlide.titlePrefix}{' '}
              <span className="text-[#D9A441]">{currentSlide.titleHighlight}</span>{' '}
              {currentSlide.titleSuffix}
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-emerald-100/90 sm:text-lg">
              {currentSlide.description}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href={primaryHref}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D9A441] px-8 py-3.5 text-sm font-extrabold text-[#0B2F28] shadow-lg shadow-[#D9A441]/25 transition-all hover:scale-105 hover:bg-[#C4922F] focus:ring-2 focus:ring-[#D9A441] focus:ring-offset-2 active:scale-95"
              >
                <span>{primaryLabel}</span>
                <Icon name={primaryIcon} size="sm" />
              </Link>

              <Link
                href={secondaryHref}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-md transition-all hover:scale-105 hover:bg-white/20 focus:ring-2 focus:ring-white focus:ring-offset-2 active:scale-95"
              >
                <span>{secondaryLabel}</span>
                <Icon name={secondaryIcon} size="sm" />
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-white/15 pt-6">
              <div className="flex items-start gap-3">
                <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#D9A441]/20 text-[#D9A441]">
                  <Icon name="fish" size="sm" />
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-white sm:text-3xl">100%</p>
                  <p className="mt-0.5 text-xs font-medium text-emerald-100/80">
                    Tươi Sống Tại Bể
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
                  <Icon name="clock" size="sm" />
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-white sm:text-3xl">&lt; 2 Giờ</p>
                  <p className="mt-0.5 text-xs font-medium text-emerald-100/80">
                    Giao Nhanh Tốc Độ
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 text-[#D9A441]">
                  <Icon name="star" size="sm" />
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-[#D9A441] sm:text-3xl">4.9 ★</p>
                  <p className="mt-0.5 text-xs font-medium text-emerald-100/80">
                    10.000+ Khách Hàng
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Product Card & Image Carousel */}
          <div className="relative lg:col-span-5">
            <div className="group relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-3 shadow-2xl backdrop-blur-xl transition-all hover:border-white/30">
              <div className="relative h-[360px] w-full overflow-hidden rounded-2xl bg-[#071E19] sm:h-[420px]">
                {slides.map((slide, index) => {
                  const isActive = index === activeIndex;
                  const img = slide.cardImageUrl ?? slide.productCard?.image ?? '';
                  return (
                    <div
                      key={slide.id}
                      className={`absolute inset-0 transition-opacity duration-500 ease-out ${
                        isActive ? 'z-10 opacity-100' : 'pointer-events-none z-0 opacity-0'
                      }`}
                      aria-hidden={!isActive}
                    >
                      {img && (
                        <img
                          src={img}
                          alt={slide.cardTitle ?? slide.titleHighlight}
                          className="h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#071E19]/90 via-black/20 to-transparent" />
                    </div>
                  );
                })}

                {slides.length > 1 && (
                  <div className="pointer-events-none absolute top-1/2 right-3 left-3 z-20 flex -translate-y-1/2 justify-between">
                    <button
                      type="button"
                      onClick={handlePrev}
                      aria-label="Slide trước"
                      className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/40 text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-black/60 focus:ring-2 focus:ring-white focus:outline-none active:scale-95"
                    >
                      <Icon name="chevron-left" size="md" />
                    </button>

                    <button
                      type="button"
                      onClick={handleNext}
                      aria-label="Slide kế tiếp"
                      className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/40 text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-black/60 focus:ring-2 focus:ring-white focus:outline-none active:scale-95"
                    >
                      <Icon name="chevron-right" size="md" />
                    </button>
                  </div>
                )}
              </div>

              {cardTitle && (
                <div className="absolute right-6 bottom-6 left-6 z-20 rounded-2xl border border-white/30 bg-[#0B2F28]/90 p-4 shadow-xl backdrop-blur-md transition-all group-hover:bg-[#0B2F28]">
                  <div className="flex items-center justify-between">
                    <span className="rounded-md bg-[#D9A441] px-2.5 py-1 text-[10px] font-extrabold tracking-wider text-[#0B2F28] uppercase">
                      ĐẶC SẢN NỔI BẬT
                    </span>
                    <div className="text-right">
                      {originalPrice && (
                        <span className="mr-2 text-xs text-slate-300 line-through">
                          {originalPrice}
                        </span>
                      )}
                      {salePrice && (
                        <span className="text-lg font-extrabold text-[#D9A441]">{salePrice}</span>
                      )}
                    </div>
                  </div>
                  <h3 className="mt-2 text-base font-bold text-white">{cardTitle}</h3>
                  {cardSubtitle && (
                    <p className="mt-1 line-clamp-1 text-xs text-slate-300">{cardSubtitle}</p>
                  )}
                </div>
              )}
            </div>

            {slides.length > 1 && (
              <div
                className="mt-6 flex items-center justify-center gap-3"
                aria-label="Chọn slide hiển thị"
              >
                {slides.map((slide, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <button
                      key={slide.id}
                      type="button"
                      onClick={() => handleSelectSlide(index)}
                      aria-label={`Chuyển đến slide ${index + 1}`}
                      aria-current={isActive}
                      className={`relative h-2.5 overflow-hidden rounded-full transition-all duration-300 focus:ring-2 focus:ring-[#D9A441] focus:outline-none ${
                        isActive ? 'w-12 bg-white/30' : 'w-2.5 bg-white/20 hover:bg-white/40'
                      }`}
                    >
                      {isActive && (
                        <span
                          className="absolute inset-y-0 left-0 bg-[#D9A441] transition-all ease-linear"
                          style={{
                            width: `${prefersReducedMotion ? 100 : progress}%`,
                            transitionDuration: prefersReducedMotion ? '0ms' : `${PROGRESS_TICK_MS}ms`,
                          }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
