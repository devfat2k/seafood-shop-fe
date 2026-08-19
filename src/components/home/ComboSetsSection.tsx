'use client';

import { toast } from 'sonner';
import type { ComboSet } from '@/types/home';
import { ComboSpotlightCard } from './combo/ComboSpotlightCard';
import { ComboStandardCard } from './combo/ComboStandardCard';

type ComboSetsSectionProps = {
  combos?: ComboSet[];
  onAddToCart?: (item: { id: string; name: string; price: number; image: string }) => void;
};

export const ComboSetsSection = ({ combos = [], onAddToCart }: ComboSetsSectionProps) => {
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

  const hasSpotlight = combos.length >= 5;
  const spotlightCombo = hasSpotlight ? combos[0] : null;
  const standardCombos = hasSpotlight ? combos.slice(1) : combos;

  return (
    <section id="combo-section" className="bg-background py-10 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-12">
          <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl">
            Combo Hải Sản Tiệc Cao Cấp
          </h2>
          <p className="mt-1.5 text-xs text-muted-foreground sm:text-sm">
            Sơ chế sạch sẽ, đầy đủ định lượng cho gia đình &amp; tiệc tùng, tặng kèm trọn bộ sốt
            chấm muối ớt xanh Phan Thiết chuẩn vị.
          </p>
        </div>

        {spotlightCombo && <ComboSpotlightCard combo={spotlightCombo} onOrder={handleOrderCombo} />}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 lg:gap-8">
          {standardCombos.map((combo) => (
            <ComboStandardCard key={combo.id} combo={combo} onOrder={handleOrderCombo} />
          ))}
        </div>
      </div>
    </section>
  );
};
