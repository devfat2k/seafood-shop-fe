'use client';

import { Icon } from '@/components/common/Icon';
import { Link } from '@/libs/I18nNavigation';
import type { CategoryItem } from '@/types/home';

type BentoCategoriesProps = {
  categories?: CategoryItem[];
};

export function BentoCategories(props: BentoCategoriesProps) {
  const { categories = [] } = props;

  if (categories.length === 0) {
    return null;
  }

  return (
    <section className="bg-white py-8 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-10 text-center">
          <span className="text-xs font-extrabold tracking-widest text-[#C4922F] uppercase">
            DANH MỤC SẢN PHẨM
          </span>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-[#0B2F28] sm:text-3xl lg:text-4xl">
            Thế Giới Hải Sản Phan Thiết
          </h2>
          <p className="mt-2 text-xs leading-relaxed text-text-secondary sm:text-sm">
            Tuyển chọn hải sản tươi sống đánh bắt tự nhiên & đặc sản nướng tiệc đậm vị
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, idx) => {
            const isLarge = idx === 0;
            return (
              <div
                key={cat.id}
                className={`group relative overflow-hidden rounded-3xl border border-[#E4E0D8] bg-[#F5F1E8] p-6 shadow-xs transition-all duration-500 hover:-translate-y-1 hover:border-[#C4922F]/40 hover:shadow-xl ${
                  isLarge ? 'col-span-1 sm:col-span-2 lg:col-span-2' : ''
                }`}
              >
                {cat.imageUrl && (
                  <img
                    src={cat.imageUrl}
                    alt={cat.name}
                    className="absolute inset-0 h-full w-full object-cover opacity-85 transition-transform duration-700 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                <div className="relative z-10 flex h-full flex-col justify-between text-white min-h-[220px]">
                  <div>
                    {cat.badge && (
                      <span className="inline-block rounded-full bg-[#D9A441] px-3 py-1 text-[10px] font-extrabold text-[#0B2F28] uppercase shadow-sm">
                        {cat.badge}
                      </span>
                    )}
                    <h3 className="mt-3 text-xl font-extrabold text-white sm:text-2xl">
                      {cat.name}
                    </h3>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-white/20 pt-4">
                    <span className="text-xs font-bold text-slate-200">
                      {cat.productCount ? `${cat.productCount} sản phẩm` : 'Xem thêm'}
                    </span>
                    <Link
                      href={`/products?categoryId=${cat.id}`}
                      className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#D9A441] transition-transform group-hover:translate-x-1 hover:underline"
                    >
                      <span>Khám phá ngay</span>
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
