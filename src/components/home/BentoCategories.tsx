import { Icon } from '@/components/common/Icon';
import { BENTO_CATEGORIES } from '@/data/home-mock';
import { Link } from '@/libs/I18nNavigation';

export function BentoCategories() {
  const [mainCombo, lobsterCard, squidCard] = BENTO_CATEGORIES;
  const bottomCards = BENTO_CATEGORIES.slice(3);

  return (
    <section className="bg-[#FBF8F3] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center">
          <span className="text-xs font-bold tracking-wider text-[#D9A441] uppercase">
            DANH MỤC ĐA DẠNG
          </span>
          <h2 className="mt-2 text-3xl font-extrabold text-[#26312D] sm:text-4xl">
            Khám Phá Hải Sản Phan Thiết
          </h2>
          <p className="mt-3 text-sm text-[#5B6B63] sm:text-base">
            Tuyển chọn những loại hải sản tươi ngon, đa dạng phù hợp cho từng nhu cầu ăn uống
          </p>
        </div>

        {/* Bento Top Row: 2-column main combo + 1-column stack */}
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Main Combo Card (occupies 2 columns desktop) */}
          {mainCombo && (
            <div className="group relative overflow-hidden rounded-3xl border border-[#E4E0D8] bg-[#0E3D34] text-white shadow-lg lg:col-span-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={mainCombo.image}
                alt={mainCombo.title}
                className="h-full min-h-[340px] w-full object-cover opacity-60 transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/30 to-transparent p-8">
                <span className="w-fit rounded-full bg-[#D9A441] px-3 py-1 text-[11px] font-extrabold text-[#26312D] uppercase">
                  {mainCombo.badge}
                </span>
                <h3 className="mt-3 text-2xl font-extrabold sm:text-3xl">{mainCombo.title}</h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/90">
                  {mainCombo.subtitle}
                </p>
                <div className="mt-6">
                  <Link
                    href={mainCombo.href}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-xs font-bold text-[#0E3D34] shadow transition-transform hover:scale-105"
                  >
                    <span>{mainCombo.linkText}</span>
                    <Icon name="arrow-right" size="xs" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Right Stack (2 Cards) */}
          <div className="flex flex-col gap-6 lg:col-span-1">
            {lobsterCard && (
              <div className="group relative overflow-hidden rounded-3xl border border-[#E4E0D8] bg-[#0E3D34] text-white shadow-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={lobsterCard.image}
                  alt={lobsterCard.title}
                  className="h-44 w-full object-cover opacity-50 transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-r from-black/75 to-transparent p-6">
                  <div>
                    <h3 className="text-xl font-bold">{lobsterCard.title}</h3>
                    <p className="mt-1 text-xs text-white/80">{lobsterCard.subtitle}</p>
                  </div>
                  <Link
                    href={lobsterCard.href}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#D9A441] hover:underline"
                  >
                    <span>{lobsterCard.linkText}</span>
                    <Icon name="chevron-right" size="xs" />
                  </Link>
                </div>
              </div>
            )}

            {squidCard && (
              <div className="group relative overflow-hidden rounded-3xl border border-[#E4E0D8] bg-[#0E3D34] text-white shadow-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={squidCard.image}
                  alt={squidCard.title}
                  className="h-44 w-full object-cover opacity-50 transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-r from-black/75 to-transparent p-6">
                  <div>
                    <h3 className="text-xl font-bold">{squidCard.title}</h3>
                    <p className="mt-1 text-xs text-white/80">{squidCard.subtitle}</p>
                  </div>
                  <Link
                    href={squidCard.href}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#D9A441] hover:underline"
                  >
                    <span>{squidCard.linkText}</span>
                    <Icon name="chevron-right" size="xs" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bento Bottom Row: 3 Cards */}
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {bottomCards.map((card) => (
            <div
              key={card.id}
              className="flex flex-col justify-between rounded-3xl border border-[#E4E0D8] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#0E3D34]/30 hover:shadow-lg"
            >
              <div>
                {card.badge && (
                  <span className="inline-block rounded-full bg-[#F5F1E8] px-3 py-1 text-[10px] font-bold text-[#5B6B63]">
                    {card.badge}
                  </span>
                )}
                <h3 className="mt-3 text-lg font-bold text-[#26312D]">{card.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-[#5B6B63]">{card.subtitle}</p>
              </div>
              <div className="mt-6 border-t border-[#E4E0D8]/50 pt-4">
                <Link
                  href={card.href}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#0E3D34] hover:text-[#D9A441]"
                >
                  <span>{card.linkText}</span>
                  <Icon name="chevron-right" size="xs" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
