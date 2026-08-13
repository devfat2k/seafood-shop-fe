'use client';

import { useState } from 'react';
import { Icon } from '@/components/common/Icon';
import { Link } from '@/libs/I18nNavigation';
import type { ComboSet } from '@/types/home';

type ComboSetsSectionProps = {
  combos?: ComboSet[];
};

export function ComboSetsSection(props: ComboSetsSectionProps) {
  const { combos = [] } = props;
  const [activeCategory, setActiveCategory] = useState<string>('all');

  if (combos.length === 0) {
    return null;
  }

  const filteredCombos = activeCategory === 'all'
    ? combos
    : combos.filter((c) => c.category === activeCategory);

  return (
    <section className="bg-[#F8FAFC] py-8 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#F6E8CC] bg-[#F6E8CC] px-4 py-1.5 text-xs font-bold text-[#C4922F]">
              <Icon name="sparkles" size="xs" />
              <span>SET COMBO ĐẶC BIỆT</span>
            </div>
            <h2 className="mt-3 text-2xl font-extrabold text-[#26312D] sm:text-3xl lg:text-4xl">
              Combo Hải Sản <span className="text-[#C4922F]">Trọn Vị</span>
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-text-secondary sm:text-sm">
              Tiết kiệm đến 20% khi đặt combo hải sản chế biến sẵn & set tiệc BBQ
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 rounded-full border border-[#E4E0D8] bg-white p-1.5 shadow-xs">
            {[
              { id: 'all', label: 'Tất cả' },
              { id: 'lunch', label: 'Cơm trưa' },
              { id: 'party', label: 'Tiệc BBQ' },
              { id: 'family', label: 'Lẩu gia đình' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCategory(tab.id)}
                className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                  activeCategory === tab.id
                    ? 'bg-[#0B2F28] text-white shadow-xs'
                    : 'text-text-secondary hover:text-[#0B2F28]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredCombos.map((combo) => {
            const isDark = combo.theme === 'dark';
            return (
              <div
                key={combo.id}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border p-6 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl ${
                  isDark
                    ? 'border-[#0E3D34] bg-gradient-to-b from-[#071E19] to-[#0E3D34] text-white'
                    : 'border-[#E4E0D8] bg-white text-[#26312D]'
                }`}
              >
                <div>
                  <div className="relative h-44 w-full overflow-hidden rounded-2xl bg-[#F5F1E8]">
                    {combo.image && (
                      <img
                        src={combo.image}
                        alt={combo.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                    <span className="absolute top-2.5 left-2.5 rounded-full bg-[#D9A441] px-3 py-1 text-[10px] font-extrabold text-[#0B2F28] uppercase shadow-xs">
                      {combo.tag}
                    </span>
                  </div>

                  <h3
                    className={`mt-4 text-lg font-extrabold leading-snug ${
                      isDark ? 'text-white' : 'text-[#26312D]'
                    }`}
                  >
                    {combo.title}
                  </h3>

                  <p
                    className={`mt-2 text-xs leading-relaxed ${
                      isDark ? 'text-emerald-100/80' : 'text-text-secondary'
                    }`}
                  >
                    {combo.description}
                  </p>
                </div>

                <div className="mt-6 border-t border-[#E4E0D8]/40 pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-text-secondary uppercase font-semibold">
                        Giá trọn gói / {combo.unit}
                      </span>
                      <p className="text-xl font-extrabold text-[#C4922F]">
                        {combo.price.toLocaleString('vi-VN')}₫
                      </p>
                    </div>

                    <Link
                      href={combo.href}
                      className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#0B2F28] px-4 py-2.5 text-xs font-bold text-white shadow-xs transition-transform hover:scale-105 hover:bg-[#0E3D34]"
                    >
                      <span>{combo.ctaText}</span>
                      <Icon name="arrow-right" size="xs" />
                    </Link>
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
