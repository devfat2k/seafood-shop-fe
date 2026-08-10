import Image from 'next/image';
import { Icon } from '@/components/common/Icon';
import { BENTO_CATEGORIES } from '@/data/home-mock';
import { Link } from '@/libs/I18nNavigation';

export function BentoCategories() {
  const [mainCombo, lobsterCard, squidCard] = BENTO_CATEGORIES;
  const bottomCards = BENTO_CATEGORIES.slice(3);

  return (
    <section className="bg-white py-8 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-extrabold tracking-widest text-[#C4922F] uppercase">
            DANH MỤC ĐA DẠNG
          </span>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-[#0B2F28] sm:text-3xl lg:text-4xl">
            Khám Phá Hải Sản Phan Thiết
          </h2>
          <p className="mt-2.5 text-xs leading-relaxed text-[#5B6B63] sm:text-sm">
            Tuyển chọn những loại hải sản tươi ngon, đa dạng phù hợp cho từng nhu cầu ăn uống
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {mainCombo && (
            <div className="group relative min-h-95 overflow-hidden rounded-3xl text-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:min-h-105 lg:col-span-2">
              <Image
                src={mainCombo.image}
                alt={mainCombo.title}
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
              <div className="absolute inset-0 flex flex-col justify-between bg-linear-to-t from-[#0B2F28]/95 via-[#0B2F28]/40 to-transparent p-6 sm:p-8">
                <div>
                  <span className="inline-block rounded-full bg-[#D9A441] px-3.5 py-1 text-[11px] font-extrabold tracking-wide text-white uppercase shadow-xs">
                    {mainCombo.badge ?? 'HOT COMBO'}
                  </span>
                </div>

                <div className="max-w-xl">
                  <h3 className="text-2xl font-extrabold tracking-tight text-white uppercase sm:text-3xl lg:text-4xl">
                    {mainCombo.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-200 sm:text-sm">
                    {mainCombo.subtitle}
                  </p>

                  <div className="mt-6">
                    <Link
                      href={mainCombo.href}
                      className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-xs font-bold text-[#0B2F28] shadow-md transition-all hover:scale-105 hover:bg-slate-100 sm:text-sm"
                    >
                      <span>{mainCombo.linkText}</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-6 lg:col-span-1">
            {lobsterCard && (
              <div className="group relative h-50 overflow-hidden rounded-3xl border border-[#E4E0D8] bg-[#0B2F28] text-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:h-[210px]">
                <img
                  src={lobsterCard.image}
                  alt={lobsterCard.title}
                  className="h-full w-full object-cover opacity-65 transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-[#0B2F28]/95 via-[#0B2F28]/40 to-transparent p-6">
                  <div>
                    <h3 className="text-lg font-extrabold text-white sm:text-xl">
                      {lobsterCard.title}
                    </h3>
                    <p className="mt-1 text-xs text-slate-200">{lobsterCard.subtitle}</p>
                    <Link
                      href={lobsterCard.href}
                      className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-[#D9A441] transition-all hover:text-[#C4922F]"
                    >
                      <span>{lobsterCard.linkText}</span>
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {squidCard && (
              <div className="group relative h-[200px] overflow-hidden rounded-3xl border border-[#E4E0D8] bg-[#0B2F28] text-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:h-[210px]">
                <Image
                  src={squidCard.image}
                  alt={squidCard.title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
                <div className="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-[#0B2F28]/95 via-[#0B2F28]/40 to-transparent p-6">
                  <div>
                    <h3 className="text-lg font-extrabold text-white sm:text-xl">
                      {squidCard.title}
                    </h3>
                    <p className="mt-1 text-xs text-slate-200">{squidCard.subtitle}</p>
                    <Link
                      href={squidCard.href}
                      className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-[#D9A441] transition-all hover:text-[#C4922F]"
                    >
                      <span>{squidCard.linkText}</span>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {bottomCards.map((card) => (
            <div
              key={card.id}
              className="group flex flex-col justify-between rounded-3xl border border-[#E4E0D8] bg-white p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[#C4922F]/40 hover:shadow-md sm:p-7"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F5F1E8] text-[#C4922F] transition-transform duration-300 group-hover:scale-110">
                    <Icon name={card.iconName ?? 'fish'} size="sm" />
                  </div>

                  {card.badge && (
                    <span
                      className={`rounded-full px-3 py-1 text-[11px] font-extrabold ${
                        card.badgeType === 'fresh'
                          ? 'bg-[#F6E8CC] text-[#C4922F]'
                          : 'bg-[#F5F1E8] text-[#5B6B63]'
                      }`}
                    >
                      {card.badge}
                    </span>
                  )}
                </div>

                <h3 className="mt-4 text-base font-extrabold text-[#0B2F28] transition-colors group-hover:text-[#C4922F] sm:text-lg">
                  {card.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-[#5B6B63]">{card.subtitle}</p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-[#E4E0D8]/60 pt-4">
                <Link
                  href={card.href}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B2F28] transition-colors group-hover:text-[#C4922F]"
                >
                  <span>{card.linkText}</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
