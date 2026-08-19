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
          <h3 className="font-heading text-base font-bold text-white">{slide.titleHighlight}</h3>
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
);
