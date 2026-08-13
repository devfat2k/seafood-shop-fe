'use client';

import { useState } from 'react';
import { Icon } from '@/components/common/Icon';
import type { DailyArrival } from '@/types/home';

type DailySeafoodStoryProps = {
  arrivals?: DailyArrival[];
};

export function DailySeafoodStory(props: DailySeafoodStoryProps) {
  const { arrivals = [] } = props;
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);

  if (arrivals.length === 0) {
    return null;
  }

  const activeStory = arrivals[activeStoryIndex] ?? arrivals[0];
  if (!activeStory) return null;

  return (
    <section className="bg-[#F8FAFC] py-8 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E4EEEA] bg-[#E4EEEA] px-4 py-1.5 text-xs font-bold text-[#0B2F28]">
            <Icon name="clock" size="xs" />
            <span>CẬP NHẬT MỖI SÁNG TẠI CẢNG</span>
          </div>
          <h2 className="mt-3 text-2xl font-extrabold text-[#26312D] sm:text-3xl lg:text-4xl">
            Hải Sản Mới Về <span className="text-[#C4922F]">Hôm Nay</span>
          </h2>
          <p className="mt-2 text-xs leading-relaxed text-text-secondary sm:text-sm">
            Hình ảnh & thông tin hải sản tươi sống vừa cập bến cảng Phan Thiết lúc rạng sáng
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Sticky Left Image */}
          <div className="top-24 lg:sticky lg:col-span-6">
            <div className="relative overflow-hidden rounded-3xl border border-[#E4E0D8] bg-white p-3 shadow-xl">
              <div className="relative h-[340px] w-full overflow-hidden rounded-2xl sm:h-[420px]">
                {activeStory.image && (
                  <img
                    src={activeStory.image}
                    alt={activeStory.imageAlt ?? activeStory.title ?? ''}
                    className="h-full w-full object-cover transition-all duration-700 hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                {activeStory.badge && (
                  <div className="absolute top-4 left-4 rounded-full bg-[#0E3D34] px-3.5 py-1.5 text-xs font-extrabold text-white shadow-md">
                    <Icon name="sparkles" size="xs" className="mr-1.5 inline-block text-[#D9A441]" />
                    {activeStory.badge}
                  </div>
                )}

                <div className="absolute right-4 bottom-4 left-4 rounded-xl border border-white/30 bg-black/40 p-4 text-white backdrop-blur-md">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="flex items-center gap-1.5 text-[#D9A441]">
                      <Icon name="clock" size="xs" />
                      {activeStory.time ?? 'Vừa cập bến'}
                    </span>
                    <span className="flex items-center gap-1.5 text-slate-200">
                      <Icon name="map-pin" size="xs" />
                      {activeStory.origin ?? 'Cảng cá Phan Thiết'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scrollable Right Story Cards */}
          <div className="flex flex-col gap-5 lg:col-span-6">
            {arrivals.map((story, index) => {
              const isActive = index === activeStoryIndex;
              const formattedPrice = typeof story.price === 'number'
                ? `${story.price.toLocaleString('vi-VN')}₫`
                : (story.price ?? '');
              const formattedOrigPrice = typeof story.originalPrice === 'number'
                ? `${story.originalPrice.toLocaleString('vi-VN')}₫`
                : (story.originalPrice ?? '');

              return (
                <button
                  key={story.id}
                  type="button"
                  onMouseEnter={() => setActiveStoryIndex(index)}
                  onClick={() => setActiveStoryIndex(index)}
                  className={`group cursor-pointer rounded-2xl border p-6 text-left transition-all duration-300 ${
                    isActive
                      ? 'border-[#0B2F28] bg-white shadow-lg ring-2 ring-[#0B2F28]/20'
                      : 'border-[#E4E0D8] bg-white/70 hover:border-[#C4922F]/40 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-[#E4EEEA] px-3 py-1 text-xs font-extrabold text-[#0B2F28]">
                      {story.time ?? 'Vừa cập bến'}
                    </span>
                    <div className="text-right">
                      {formattedOrigPrice && (
                        <span className="mr-2 text-xs text-text-secondary line-through">
                          {formattedOrigPrice}
                        </span>
                      )}
                      {formattedPrice && (
                        <span className="text-xl font-extrabold text-[#C4922F]">
                          {formattedPrice}
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="mt-3 text-lg font-bold text-[#26312D] group-hover:text-[#0B2F28]">
                    {story.title}
                  </h3>

                  {story.description && (
                    <p className="mt-2 text-xs leading-relaxed text-text-secondary sm:text-sm">
                      {story.description}
                    </p>
                  )}

                  <div className="mt-4 flex items-center justify-between border-t border-[#E4E0D8]/60 pt-4 text-xs font-semibold text-text-secondary">
                    {story.weight && (
                      <span className="flex items-center gap-1 text-[#0B2F28]">
                        <Icon name="shield-check" size="xs" />
                        Quy cách: {story.weight}
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1 font-bold text-[#0B2F28] group-hover:text-[#C4922F] hover:underline">
                      <span>Đặt mua ngay</span>
                      <Icon name="arrow-right" size="xs" />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
