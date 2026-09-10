'use client';

import Image from 'next/image';
import { Icon } from '@/components/common/Icon';
import { Link } from '@/libs/I18nNavigation';
import type { SlideDisplayItem } from './hero-utils';

type HeroShowcaseCardProps = {
  slide: SlideDisplayItem;
};

export const HeroShowcaseCard = ({ slide }: HeroShowcaseCardProps) => (
  <div className="hidden lg:col-span-5 lg:flex lg:justify-end">
    <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-border bg-card p-5 shadow-2xl shadow-secondary/10 transition-all hover:shadow-secondary/20">
      <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-secondary/5">
        {slide.bgImage ? (
          <Image
            src={slide.bgImage}
            alt={slide.titleHighlight}
            fill
            unoptimized
            className="object-cover transition-transform duration-700 hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-secondary/5 text-secondary/60">
            <Icon name="fish" size="xl" />
          </div>
        )}

        <div className="absolute top-3 left-3 rounded-full bg-card/90 px-3 py-1 text-[11px] font-bold text-secondary shadow-sm backdrop-blur-xs">
          🌊 Vừa cập cảng
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div>
          <h3 className="font-heading text-base font-bold text-foreground">
            {slide.titleHighlight}
          </h3>
          <p className="text-xs text-muted-foreground">Cảng cá Phan Thiết, Bình Thuận</p>
        </div>

        <Link
          href="/products"
          className="inline-flex items-center gap-1.5 rounded-xl bg-secondary px-3.5 py-2 text-xs font-bold text-white shadow-xs transition-all hover:bg-secondary/90 active:scale-95"
        >
          <span>Xem chi tiết</span>
          <Icon name="arrow-right" size="xs" />
        </Link>
      </div>
    </div>
  </div>
);
