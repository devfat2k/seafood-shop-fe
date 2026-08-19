'use client';

import Image from 'next/image';
import { Icon } from '@/components/common/Icon';
import type { ComboSet } from '@/types/home';
import { formatCurrency } from '@/utils/Helpers';
import { cleanDescription, extractServings, getBadgeClass } from './combo-utils';

type ComboSpotlightCardProps = {
  combo: ComboSet;
  onOrder: (combo: ComboSet) => void;
};

export const ComboSpotlightCard = ({ combo, onOrder }: ComboSpotlightCardProps) => {
  const servings = extractServings(combo.title, combo.description);
  const description = cleanDescription(combo.title, combo.description);
  const image = combo.imageUrl ?? combo.image;
  const originalPrice = combo.originalPrice ?? Math.round((combo.price * 1.2) / 10_000) * 10_000;
  const badgeClass = getBadgeClass(combo.tag);

  return (
    <div className="group relative mb-6 overflow-hidden rounded-2xl border-2 border-primary/20 bg-card shadow-md transition-all duration-300 hover:border-primary/40 hover:shadow-xl lg:mb-8">
      <div className="flex flex-col lg:flex-row">
        <div className="relative min-h-[240px] w-full overflow-hidden bg-muted sm:min-h-[300px] lg:w-5/12">
          {image ? (
            <Image
              src={image}
              alt={combo.title}
              fill
              unoptimized
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
              <Icon name="fish" size="xl" />
            </div>
          )}

          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            <span className={`rounded-full px-3 py-1 text-xs font-bold shadow-xs ${badgeClass}`}>
              {combo.tag || 'COMBO TIỆC VIP'}
            </span>
            <span className="rounded-full bg-foreground/80 px-3 py-1 text-xs font-bold text-white shadow-xs backdrop-blur-xs">
              ⭐ BÁN CHẠY #1
            </span>
          </div>

          <div className="absolute bottom-3 left-3 rounded-lg bg-background/90 px-3 py-1 text-xs font-bold text-foreground shadow-xs backdrop-blur-xs">
            👥 Khẩu phần: {servings}
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-secondary uppercase">
              <Icon name="sparkles" size="xs" className="text-accent" />
              <span>Lựa chọn hàng đầu cho tiệc &amp; gia đình</span>
            </div>

            <h3 className="mt-2 font-heading text-xl font-bold text-foreground sm:text-2xl lg:text-3xl">
              {combo.title}
            </h3>

            <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-muted-foreground sm:text-sm">
              {description}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 rounded-md bg-secondary/10 px-2.5 py-1 text-xs font-semibold text-secondary">
                <Icon name="shield-check" size="xs" />
                Hải sản tươi sống bơi hồ
              </span>
              <span className="inline-flex items-center gap-1 rounded-md bg-accent/15 px-2.5 py-1 text-xs font-semibold text-foreground">
                <Icon name="gift" size="xs" className="text-accent" />
                Tặng sốt muối ớt Phan Thiết
              </span>
              <span className="inline-flex items-center gap-1 rounded-md bg-tertiary/10 px-2.5 py-1 text-xs font-semibold text-tertiary">
                <Icon name="truck" size="xs" />
                Giao nhanh chuỗi lạnh 2H
              </span>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-4">
            <div>
              <span className="block text-xs text-muted-foreground line-through">
                Giá gốc: {formatCurrency(originalPrice)}
              </span>
              <div className="flex items-baseline gap-1">
                <span className="font-sans text-2xl font-bold text-primary sm:text-3xl">
                  {formatCurrency(combo.price)}
                </span>
                <span className="text-xs font-semibold text-muted-foreground">
                  /{combo.unit || 'Set'}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                onOrder(combo);
              }}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-xs font-bold text-primary-foreground shadow-md transition-all hover:bg-primary/90 active:scale-95 sm:text-sm"
            >
              <Icon name="shopping-cart" size="sm" />
              <span>Đặt Combo Ngay</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
