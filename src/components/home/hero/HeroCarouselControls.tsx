'use client';

import { Icon } from '@/components/common/Icon';
import type { SlideDisplayItem } from './hero-utils';

type HeroCarouselControlsProps = {
  slides: SlideDisplayItem[];
  currentIdx: number;
  onSelectIdx: (idx: number) => void;
  onPrev: () => void;
  onNext: () => void;
};

export const HeroCarouselControls = ({
  slides,
  currentIdx,
  onSelectIdx,
  onPrev,
  onNext,
}: HeroCarouselControlsProps) => {
  if (slides.length <= 1) {
    return null;
  }

  return (
    <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-4 sm:mt-12 sm:pt-6">
      <div className="flex items-center gap-2">
        {slides.map((s, idx) => (
          <button
            key={s.id}
            type="button"
            onClick={() => {
              onSelectIdx(idx);
            }}
            aria-label={`Chuyển đến banner ${idx + 1}`}
            className={`h-2 rounded-full transition-all ${
              idx === currentIdx ? 'w-8 bg-primary' : 'w-2.5 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onPrev}
          aria-label="Banner trước"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-xs transition-all hover:bg-white/25 active:scale-95"
        >
          <Icon name="chevron-left" size="sm" />
        </button>
        <button
          type="button"
          onClick={onNext}
          aria-label="Banner tiếp theo"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-xs transition-all hover:bg-white/25 active:scale-95"
        >
          <Icon name="chevron-right" size="sm" />
        </button>
      </div>
    </div>
  );
};
