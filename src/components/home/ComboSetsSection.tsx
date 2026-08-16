'use client';

import Image from 'next/image';
import { toast } from 'sonner';
import { Icon } from '@/components/common/Icon';
import type { ComboSet } from '@/types/home';

type ComboSetsSectionProps = {
  combos?: ComboSet[];
  onAddToCart?: (item: { id: string; name: string; price: number; image: string }) => void;
};

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
        image: combo.image,
      });
    }
    toast.success(`Đã thêm "${combo.title}" vào giỏ hàng!`);
  };

  return (
    <section id="combo-section" className="bg-background py-10 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto mb-8 max-w-xl text-center sm:mb-12">
          <span className="text-xs font-bold tracking-wider text-secondary uppercase">
            Tiết Kiệm &amp; Tiện Lợi
          </span>
          <h2 className="mt-1 font-heading text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl">
            Combo Hải Sản Tiệc Cao Cấp
          </h2>
          <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
            Đầy đủ gia vị nước chấm muối ớt xanh Phan Thiết chuẩn vị đi kèm.
          </p>
        </div>

        {/* 2 Combo / row */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          {combos.map((combo) => (
            <div
              key={combo.id}
              className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-secondary/40 hover:shadow-md sm:flex-row"
            >
              {/* Left Image */}
              <div className="relative min-h-[200px] w-full overflow-hidden bg-muted sm:min-h-[260px] sm:w-1/2">
                {combo.image ? (
                  <Image
                    src={combo.image}
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
                  <span className="absolute top-3 left-3 rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground shadow-xs">
                    {combo.tag}
                  </span>
                )}
              </div>

              {/* Right Content */}
              <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
                <div>
                  <h3 className="font-heading text-lg font-bold text-foreground sm:text-xl">
                    {combo.title}
                  </h3>
                  {combo.description && (
                    <p className="mt-1 text-xs font-medium text-secondary">{combo.description}</p>
                  )}
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-border/60 pt-4">
                  <div>
                    <span className="font-heading text-lg font-bold text-primary sm:text-xl">
                      {combo.price.toLocaleString('vi-VN')}₫
                    </span>
                    {combo.unit && (
                      <span className="text-[10px] text-muted-foreground">/{combo.unit}</span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      handleOrderCombo(combo);
                    }}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-xs transition-all hover:bg-primary/90 active:scale-95"
                  >
                    <span>{combo.ctaText || 'Đặt Combo'}</span>
                    <Icon name="arrow-right" size="xs" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
