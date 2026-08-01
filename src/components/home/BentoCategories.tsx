import { Icon } from '@/components/common/Icon';
import { BENTO_CATEGORIES } from '@/data/home-mock';
import { Link } from '@/libs/I18nNavigation';

export function BentoCategories() {
  const [mainCombo, lobsterCard, squidCard] = BENTO_CATEGORIES;
  const bottomCards = BENTO_CATEGORIES.slice(3);

  return (
    <section className="border-b border-[#E2E8F0] bg-[#F8FAFC] py-10 lg:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#F97316]/20 bg-[#FFEDD5] px-3.5 py-1 text-[11px] font-extrabold text-[#EA580C] uppercase">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#F97316]" />
              <span>DANH MỤC HẢI SẢN PHAN THIẾT</span>
            </div>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-[#0F172A] sm:text-3xl lg:text-4xl">
              Chọn Lựa Theo Thói Quen Thưởng Thức
            </h2>
            <p className="mt-2 text-xs text-text-secondary sm:text-sm">
              Hải sản đánh bắt trong đêm tại cảng cá Phan Thiết, phân loại theo nhu cầu ăn tiệc, gia
              đình &amp; quà tặng.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-full border border-[#E2E8F0] bg-white px-5 py-2.5 text-xs font-bold text-[#1E3A8A] shadow-sm transition-all hover:border-[#1E3A8A] hover:bg-[#1E3A8A] hover:text-white"
            >
              <span>Xem tất cả danh mục</span>
              <Icon name="arrow-right" size="xs" />
            </Link>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-5">
          {mainCombo && (
            <div className="group relative overflow-hidden rounded-3xl border border-[#1E3A8A]/20 bg-[#1E3A8A] text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl lg:col-span-2">
              {/* biome-ignore lint/performance/noImgElement: mock category image */}
              <img
                src={mainCombo.image}
                alt={mainCombo.title}
                className="h-full min-h-75 w-full object-cover opacity-45 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-[#0F172A] via-[#1E3A8A]/60 to-transparent p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[#F97316] px-3.5 py-1 text-[10px] font-extrabold tracking-wide text-white uppercase shadow-sm">
                    👑 {mainCombo.badge ?? 'PET COMBO'}
                  </span>
                  <span className="rounded-full bg-white/20 px-3 py-1 text-[10px] font-bold text-white backdrop-blur-md">
                    ⚡ Giao kèm sốt chấm chuẩn vị
                  </span>
                </div>

                <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                  {mainCombo.title}
                </h3>
                <p className="mt-2 max-w-xl text-xs leading-relaxed text-blue-100 sm:text-sm">
                  {mainCombo.subtitle}
                </p>

                <div className="mt-5 flex items-center gap-4">
                  <Link
                    href={mainCombo.href}
                    className="inline-flex items-center gap-2 rounded-full bg-[#F97316] px-6 py-3 text-xs font-bold text-white shadow-lg transition-transform hover:scale-105 hover:bg-[#EA580C]"
                  >
                    <span>{mainCombo.linkText}</span>
                    <Icon name="arrow-right" size="xs" />
                  </Link>
                  <span className="text-xs font-semibold text-blue-200">
                    Chỉ từ <span className="font-extrabold text-white">650.000₫/set</span>
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Right Column Stack (2 Cards) */}
          <div className="flex flex-col gap-4 lg:col-span-1 lg:gap-5">
            {lobsterCard && (
              <div className="group relative overflow-hidden rounded-3xl border border-[#E2E8F0] bg-[#1E3A8A] text-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                {/* biome-ignore lint/performance/noImgElement: mock category image */}
                <img
                  src={lobsterCard.image}
                  alt={lobsterCard.title}
                  className="h-40 w-full object-cover opacity-50 transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex flex-col justify-between bg-linear-to-r from-[#0F172A]/90 via-[#1E3A8A]/70 to-transparent p-5">
                  <div className="flex items-start justify-between">
                    <span className="rounded-full bg-[#DBEAFE] px-2.5 py-0.5 text-[10px] font-extrabold text-[#1E3A8A]">
                      🟢 TƯƠI SỐNG 100%
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-white">{lobsterCard.title}</h3>
                    <p className="mt-1 text-xs text-blue-100">{lobsterCard.subtitle}</p>
                    <Link
                      href={lobsterCard.href}
                      className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[#F97316] transition-all hover:underline"
                    >
                      <span>{lobsterCard.linkText}</span>
                      <Icon name="chevron-right" size="xs" />
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {squidCard && (
              <div className="group relative overflow-hidden rounded-3xl border border-[#E2E8F0] bg-[#1E3A8A] text-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                {/* biome-ignore lint/performance/noImgElement: mock category image */}
                <img
                  src={squidCard.image}
                  alt={squidCard.title}
                  className="h-40 w-full object-cover opacity-50 transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex flex-col justify-between bg-linear-to-r from-[#0F172A]/90 via-[#1E3A8A]/70 to-transparent p-5">
                  <div className="flex items-start justify-between">
                    <span className="rounded-full bg-[#FFEDD5] px-2.5 py-0.5 text-[10px] font-extrabold text-[#EA580C]">
                      🔥 GIỜ BÁN CHẠY
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-white">{squidCard.title}</h3>
                    <p className="mt-1 text-xs text-blue-100">{squidCard.subtitle}</p>
                    <Link
                      href={squidCard.href}
                      className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[#F97316] transition-all hover:underline"
                    >
                      <span>{squidCard.linkText}</span>
                      <Icon name="chevron-right" size="xs" />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bento Bottom Row: 3 Distinct Cards */}
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:gap-5">
          {bottomCards.map((card) => (
            <div
              key={card.id}
              className="group flex flex-col justify-between rounded-3xl border border-[#E2E8F0] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#1E3A8A]/40 hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between">
                  {card.badge ? (
                    <span className="inline-block rounded-full bg-[#EDF2F7] px-3 py-1 text-[10px] font-extrabold text-[#475569]">
                      {card.badge}
                    </span>
                  ) : (
                    <span className="inline-block rounded-full bg-[#DBEAFE] px-3 py-1 text-[10px] font-extrabold text-[#1E3A8A]">
                      ĐẶC SẢN
                    </span>
                  )}
                  <span className="text-xs font-semibold text-text-secondary group-hover:text-[#F97316]">
                    ★ 4.9
                  </span>
                </div>

                <h3 className="mt-3 text-base font-extrabold text-[#0F172A] group-hover:text-[#1E3A8A]">
                  {card.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-text-secondary">
                  {card.subtitle}
                </p>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-[#E2E8F0]/60 pt-3.5">
                <Link
                  href={card.href}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E3A8A] transition-colors group-hover:text-[#F97316]"
                >
                  <span>{card.linkText}</span>
                  <Icon name="chevron-right" size="xs" />
                </Link>
                <span className="text-[11px] font-semibold text-text-secondary">Giao hỏa tốc</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
