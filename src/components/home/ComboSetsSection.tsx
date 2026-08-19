'use client';

import Image from 'next/image';
import { toast } from 'sonner';
import { Icon } from '@/components/common/Icon';
import type { ComboSet } from '@/types/home';

type ComboSetsSectionProps = {
  combos?: ComboSet[];
  onAddToCart?: (item: { id: string; name: string; price: number; image: string }) => void;
};

function extractServings(title: string, desc: string): string {
  const text = `${title} ${desc}`.toLowerCase();
  const match = /(\d+\s*[-–]\s*\d+|\d+)\s*(?:người|khách|pax)/u.exec(text);
  if (match?.[1]) {
    return `${match[1].replaceAll(' ', '')} người`;
  }
  return '2 - 4 người';
}

function cleanDescription(title: string, desc: string): string {
  if (!desc) {
    return 'Đầy đủ hải sản tươi ngon, sơ chế sẵn kèm trọn bộ gia vị sốt chấm chuẩn vị.';
  }
  let result = desc.trim();
  if (result.toLowerCase().startsWith(title.toLowerCase())) {
    result = result
      .slice(title.length)
      .replace(/^[\s\-:–,]+/u, '')
      .trim();
  }
  return result || desc;
}

function getBadgeClass(tag?: string): string {
  const lower = (tag ?? '').toLowerCase();
  if (lower.includes('tiết kiệm') || lower.includes('deal')) {
    return 'bg-tertiary text-white';
  }
  if (lower.includes('bán chạy') || lower.includes('hot')) {
    return 'bg-primary text-white';
  }
  if (lower.includes('cuối tuần') || lower.includes('vip')) {
    return 'bg-accent text-foreground';
  }
  return 'bg-secondary text-white';
}

function ComboSpotlightCard({
  combo,
  onOrder,
}: {
  combo: ComboSet;
  onOrder: (c: ComboSet) => void;
}) {
  const servings = extractServings(combo.title, combo.description);
  const description = cleanDescription(combo.title, combo.description);
  const image = combo.imageUrl ?? combo.image;
  const originalPrice = combo.originalPrice ?? Math.round((combo.price * 1.2) / 10_000) * 10_000;
  const badgeClass = getBadgeClass(combo.tag);

  return (
    <div className="group relative mb-6 overflow-hidden rounded-2xl border-2 border-primary/20 bg-card shadow-md transition-all duration-300 hover:border-primary/40 hover:shadow-xl lg:mb-8">
      <div className="flex flex-col lg:flex-row">
        {/* Spotlight Left Image */}
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

          {/* Badges */}
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

        {/* Spotlight Right Content */}
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

            {/* Value Highlights */}
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
                Giá gốc: {originalPrice.toLocaleString('vi-VN')}₫
              </span>
              <div className="flex items-baseline gap-1">
                <span className="font-sans text-2xl font-bold text-primary sm:text-3xl">
                  {combo.price.toLocaleString('vi-VN')}₫
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
}

function ComboStandardCard({
  combo,
  onOrder,
}: {
  combo: ComboSet;
  onOrder: (c: ComboSet) => void;
}) {
  const servings = extractServings(combo.title, combo.description);
  const description = cleanDescription(combo.title, combo.description);
  const image = combo.imageUrl ?? combo.image;
  const originalPrice = combo.originalPrice ?? Math.round((combo.price * 1.2) / 10_000) * 10_000;
  const badgeClass = getBadgeClass(combo.tag);

  return (
    <div className="group flex flex-col justify-between overflow-hidden rounded-xl border border-border bg-card shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-secondary/40 hover:shadow-md">
      {/* Top Image */}
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
            className={`absolute top-3 left-3 rounded-full px-2.5 py-0.5 text-[10px] font-bold shadow-xs ${badgeClass}`}
          >
            {combo.tag}
          </span>
        )}

        <span className="absolute right-3 bottom-3 rounded-md bg-background/90 px-2 py-0.5 text-[10px] font-bold text-foreground shadow-xs backdrop-blur-xs">
          👥 {servings}
        </span>
      </div>

      {/* Body Content */}
      <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
        <div>
          <h3 className="line-clamp-2 min-h-[44px] font-heading text-base font-bold text-foreground transition-colors group-hover:text-primary sm:text-lg">
            {combo.title}
          </h3>

          <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
            {description}
          </p>

          <div className="mt-3 flex items-center gap-2 text-[11px] font-semibold text-secondary">
            <Icon name="gift" size="xs" className="text-accent" />
            <span>Tặng kèm trọn bộ sốt chấm &amp; gia vị</span>
          </div>
        </div>

        {/* Price & CTA */}
        <div className="mt-5 flex items-center justify-between border-t border-border/70 pt-3">
          <div>
            <span className="block text-[10px] text-muted-foreground line-through">
              {originalPrice.toLocaleString('vi-VN')}₫
            </span>
            <div className="flex items-baseline gap-1">
              <span className="font-sans text-base font-bold text-primary sm:text-lg">
                {combo.price.toLocaleString('vi-VN')}₫
              </span>
              <span className="text-[10px] text-muted-foreground">/{combo.unit || 'Set'}</span>
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
}

export function ComboSetsSection({ combos = [], onAddToCart }: ComboSetsSectionProps) {
  if (combos.length === 0) {
    return null;
  }

  const handleOrderCombo = (combo: ComboSet) => {
    if (onAddToCart) {
      onAddToCart({
        id: String(combo.id),
        name: combo.title,
        price: combo.price,
        image: combo.imageUrl ?? combo.image ?? '',
      });
    }
    toast.success(`Đã thêm "${combo.title}" vào giỏ hàng!`);
  };

  // If we have 5 items, render 1 Spotlight card + 4 Grid cards for perfect symmetry
  const hasSpotlight = combos.length >= 5;
  const spotlightCombo = hasSpotlight ? combos[0] : null;
  const standardCombos = hasSpotlight ? combos.slice(1) : combos;

  return (
    <section id="combo-section" className="bg-background py-10 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-12">
          <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl">
            Combo Hải Sản Tiệc Cao Cấp
          </h2>
          <p className="mt-1.5 text-xs text-muted-foreground sm:text-sm">
            Sơ chế sạch sẽ, đầy đủ định lượng cho gia đình &amp; tiệc tùng, tặng kèm trọn bộ sốt
            chấm muối ớt xanh Phan Thiết chuẩn vị.
          </p>
        </div>

        {/* Spotlight Card if 5+ combos */}
        {spotlightCombo && <ComboSpotlightCard combo={spotlightCombo} onOrder={handleOrderCombo} />}

        {/* 2-col or 4-col Standard Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 lg:gap-8">
          {standardCombos.map((combo) => (
            <ComboStandardCard key={combo.id} combo={combo} onOrder={handleOrderCombo} />
          ))}
        </div>
      </div>
    </section>
  );
}
