'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { Icon } from '@/components/common/Icon';
import { COMBO_SETS } from '@/data/home-mock';
import type { ComboSet } from '@/data/home-mock';
import { Link } from '@/libs/I18nNavigation';

export function ComboSetsSection() {
  const [activeCategory, setActiveCategory] = useState<ComboSet['category']>('all');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const filteredSets =
    activeCategory === 'all'
      ? COMBO_SETS
      : COMBO_SETS.filter((set) => set.category === activeCategory);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="bg-[#F8FAFC] py-8 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-xs font-extrabold tracking-widest text-[#C4922F] uppercase">
              COMBO &amp; SET TIỆC TIỆN LỢI
            </span>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-[#0B2F28] sm:text-3xl lg:text-4xl">
              Thưởng Thức Hải Sản Theo Dịp
            </h2>
            <p className="mt-2 text-xs text-[#5B6B63] sm:text-sm">
              Thiết kế trọn gói cho bữa ăn văn phòng, gia đình hoặc tiệc nhậu nướng ngoài trời
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 rounded-full border border-[#E4E0D8] bg-white p-1 shadow-xs">
              <button
                type="button"
                onClick={() => {
                  setActiveCategory('all');
                }}
                className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-all ${
                  activeCategory === 'all'
                    ? 'bg-[#0B2F28] text-white shadow-xs'
                    : 'text-[#5B6B63] hover:text-[#0B2F28]'
                }`}
              >
                Tất cả
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveCategory('lunch');
                }}
                className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-all ${
                  activeCategory === 'lunch'
                    ? 'bg-[#0B2F28] text-white shadow-xs'
                    : 'text-[#5B6B63] hover:text-[#0B2F28]'
                }`}
              >
                Ăn Trưa
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveCategory('party');
                }}
                className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-all ${
                  activeCategory === 'party'
                    ? 'bg-[#0B2F28] text-white shadow-xs'
                    : 'text-[#5B6B63] hover:text-[#0B2F28]'
                }`}
              >
                Tiệc BBQ
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveCategory('family');
                }}
                className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-all ${
                  activeCategory === 'family'
                    ? 'bg-[#0B2F28] text-white shadow-xs'
                    : 'text-[#5B6B63] hover:text-[#0B2F28]'
                }`}
              >
                Gia Đình
              </button>
            </div>

            <div className="hidden items-center gap-2 sm:flex">
              <button
                type="button"
                onClick={() => {
                  handleScroll('left');
                }}
                aria-label="Cuộn trái"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E4E0D8] bg-white text-[#0B2F28] shadow-xs transition-all hover:scale-105 hover:bg-[#F5F1E8] active:scale-95"
              >
                <Icon name="chevron-left" size="sm" />
              </button>
              <button
                type="button"
                onClick={() => {
                  handleScroll('right');
                }}
                aria-label="Cuộn phải"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E4E0D8] bg-white text-[#0B2F28] shadow-xs transition-all hover:scale-105 hover:bg-[#F5F1E8] active:scale-95"
              >
                <Icon name="chevron-right" size="sm" />
              </button>
            </div>
          </div>
        </div>

        {/* Combo Cards Grid / Carousel */}
        <div
          ref={scrollContainerRef}
          className="mt-8 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4 lg:grid lg:grid-cols-2 lg:overflow-visible"
        >
          {filteredSets.map((set) => {
            const formattedPrice = `${set.price.toLocaleString('vi-VN')}₫`;

            if (set.theme === 'dark') {
              return (
                <div
                  key={set.id}
                  className="group relative flex min-w-[320px] flex-1 snap-start flex-col justify-between overflow-hidden rounded-3xl border border-[#0B2F28] bg-[#0B2F28] p-6 text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:min-w-[440px] sm:p-8"
                >
                  <div className="relative z-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-start">
                    <div className="max-w-xs sm:max-w-sm">
                      <span className="inline-block rounded-full bg-[#D9A441] px-3.5 py-1 text-[11px] font-extrabold tracking-wide text-[#0B2F28] uppercase shadow-xs">
                        {set.tag}
                      </span>

                      <h3 className="mt-4 text-2xl font-extrabold tracking-tight text-[#D9A441] sm:text-3xl">
                        {set.title}
                      </h3>
                      <p className="mt-2.5 text-xs leading-relaxed text-slate-200 sm:text-sm">
                        {set.description}
                      </p>

                      <div className="mt-6 flex items-baseline gap-1">
                        <span className="text-2xl font-extrabold text-[#D9A441] sm:text-3xl">
                          {formattedPrice}
                        </span>
                        <span className="text-xs text-slate-300 sm:text-sm">/ {set.unit}</span>
                      </div>

                      <div className="mt-6">
                        <Link
                          href={set.href}
                          className="inline-flex items-center gap-2 rounded-full bg-[#D9A441] px-6 py-3 text-xs font-bold text-[#0B2F28] shadow-md transition-all hover:scale-105 hover:bg-[#C4922F] active:scale-95 sm:text-sm"
                        >
                          <span>{set.ctaText}</span>
                          <Icon name="arrow-right" size="xs" />
                        </Link>
                      </div>
                    </div>

                    {/* Image Area */}
                    <div className="relative mt-4 flex justify-end sm:mt-0 sm:shrink-0">
                      {set.isBreakout ? (
                        <div className="relative h-44 w-44 sm:h-52 sm:w-52">
                          <Image
                            src={set.image}
                            alt={set.title}
                            fill
                            sizes="(max-width: 640px) 176px, 208px"
                            className="object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      ) : (
                        <div className="relative h-36 w-36 overflow-hidden rounded-2xl border border-white/10 shadow-lg sm:h-44 sm:w-44">
                          <Image
                            src={set.image}
                            alt={set.title}
                            fill
                            sizes="(max-width: 640px) 144px, 176px"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={set.id}
                className="group relative flex min-w-[320px] flex-1 snap-start flex-col justify-between overflow-hidden rounded-3xl border border-[#E4E0D8] bg-[#F5F1E8] p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[#C4922F]/40 hover:shadow-lg sm:min-w-[440px] sm:p-8"
              >
                <div className="relative z-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-start">
                  <div className="max-w-xs sm:max-w-sm">
                    <span className="inline-block rounded-full bg-[#F6E8CC] px-3.5 py-1 text-[11px] font-extrabold tracking-wide text-[#C4922F] uppercase shadow-xs">
                      {set.tag}
                    </span>

                    <h3 className="mt-4 text-2xl font-extrabold tracking-tight text-[#0B2F28] sm:text-3xl">
                      {set.title}
                    </h3>
                    <p className="mt-2.5 text-xs leading-relaxed text-[#5B6B63] sm:text-sm">
                      {set.description}
                    </p>

                    <div className="mt-6 flex items-baseline gap-1">
                      <span className="text-2xl font-extrabold text-[#C4922F] sm:text-3xl">
                        {formattedPrice}
                      </span>
                      <span className="text-xs text-[#5B6B63] sm:text-sm">/ {set.unit}</span>
                    </div>

                    <div className="mt-6">
                      <Link
                        href={set.href}
                        className="inline-flex items-center gap-2 rounded-full bg-[#0B2F28] px-6 py-3 text-xs font-bold text-white shadow-md transition-all hover:scale-105 hover:bg-[#0E3D34] active:scale-95 sm:text-sm"
                      >
                        <span>{set.ctaText}</span>
                        <Icon name="arrow-right" size="xs" />
                      </Link>
                    </div>
                  </div>

                  {/* Image Area */}
                  <div className="relative mt-4 flex justify-end sm:mt-0 sm:shrink-0">
                    <div className="relative h-36 w-36 overflow-hidden rounded-2xl border border-[#E4E0D8] shadow-md sm:h-44 sm:w-44">
                      <Image
                        src={set.image}
                        alt={set.title}
                        fill
                        sizes="(max-width: 640px) 144px, 176px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
