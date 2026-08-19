'use client';

import Image from 'next/image';
import { Icon } from '@/components/common/Icon';
import type { ComboSet } from '@/types/home';
import { formatCurrency } from '@/utils/Helpers';
import { cleanDescription, extractServings, getBadgeClass } from './combo-utils';

type ComboStandardCardProps = {
  combo: ComboSet;
  onOrder: (combo: ComboSet) => void;
};

export const ComboStandardCard = ({ combo, onOrder }: ComboStandardCardProps) => {
  const servings = extractServings(combo.title, combo.description);
  const description = cleanDescription(combo.title, combo.description);
  const image = combo.imageUrl ?? combo.image;
  const originalPrice = combo.originalPrice ?? Math.round((combo.price * 1.2) / 10_000) * 10_000;
  const badgeClass = getBadgeClass(combo.tag);

  return (
    <div className="group flex flex-col justify-between overflow-hidden rounded-xl border border-border bg-card shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-secondary/40 hover:shadow-md">
      <div className="relative aspect-4/3 w-full overflow-hidden bg-muted sm:aspect-16/9">
        {image ? (
          <Image
            src={image}
            alt={combo.title}
            fill
            unoptimized
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
            <Icon name="fish" size="lg" />
          </div>
        )}

        {combo.tag && (
          <span
            className={`absolute top-3 left-3 rounded-full px-2.5 py-0.5 text-xs font-bold shadow-xs ${badgeClass}`}
          >
            {combo.tag}
          </span>
        )}

        <span className="absolute right-3 bottom-3 rounded-md bg-background/90 px-2 py-0.5 text-xs font-bold text-foreground shadow-xs backdrop-blur-xs">
          👥 {servings}
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
        <div>
          <h3 className="line-clamp-2 min-h-11 font-heading text-base font-bold text-foreground transition-colors group-hover:text-primary sm:text-lg">
            {combo.title}
          </h3>

          <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
            {description}
          </p>

          <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-secondary">
            <Icon name="gift" size="xs" className="text-accent" />
            <span>Tặng kèm trọn bộ sốt chấm &amp; gia vị</span>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-border/70 pt-3">
          <div>
            <span className="block text-xs text-muted-foreground line-through">
              {formatCurrency(originalPrice)}
            </span>
            <div className="flex items-baseline gap-1">
              <span className="font-sans text-base font-bold text-primary sm:text-lg">
                {formatCurrency(combo.price)}
              </span>
              <span className="text-xs text-muted-foreground">/{combo.unit || 'Set'}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              onOrder(combo);
            }}
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-xs font-bold text-primary-foreground shadow-xs transition-all hover:bg-primary/90 active:scale-95"
            aria-label={`Đặt ${combo.title}`}
          >
            <Icon name="shopping-cart" size="xs" />
            <span>Đặt Combo</span>
          </button>
        </div>
      </div>
    </div>
  );
};
