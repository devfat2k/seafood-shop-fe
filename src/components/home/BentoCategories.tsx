import { BENTO_CATEGORIES } from "@/data/home-mock";
import { Link } from "@/libs/I18nNavigation";

export function BentoCategories() {
  const [mainCombo] = BENTO_CATEGORIES;
  const bottomCards = BENTO_CATEGORIES.slice(3);

  return (
    <section className="bg-[#FBF8F3] py-8 lg:py-12 rounded-xl">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <span className="text-xs font-bold tracking-wider text-[#D9A441] uppercase">
            DANH MỤC ĐA DẠNG
          </span>
          <h2 className="mt-2 text-3xl font-extrabold text-[#26312D] sm:text-4xl">
            Khám Phá Hải Sản Phan Thiết
          </h2>
          <p className="mt-3 text-sm text-[#5B6B63] sm:text-base">
            Tuyển chọn những loại hải sản tươi ngon, đa dạng phù hợp cho từng
            nhu cầu ăn uống
          </p>
        </div>

        <div className="mt-12 gap-6 lg:grid-cols-3">
          {mainCombo && (
            <div className="group relative overflow-hidden rounded-3xl border border-[#E4E0D8] bg-[#0E3D34] text-white shadow-lg lg:col-span-2">
              <img
                src={mainCombo.image}
                alt={mainCombo.title}
                className="h-full min-h-80 w-full object-cover opacity-60 transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/30 to-transparent p-8">
                <span className="w-fit rounded-full bg-[#D9A441] px-3 py-1 text-[11px] font-extrabold text-[#26312D] uppercase">
                  {mainCombo.badge}
                </span>
                <h3 className="mt-3 text-2xl font-extrabold sm:text-3xl">
                  {mainCombo.title}
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/90">
                  {mainCombo.subtitle}
                </p>
                <div className="mt-6">
                  <Link
                    href={mainCombo.href}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-xs font-bold text-[#0E3D34] transition-transform hover:scale-105"
                  >
                    <span>{mainCombo.linkText}</span>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {bottomCards.map((card) => (
            <div
              key={card.id}
              className="flex flex-col justify-between rounded-3xl border border-[#E4E0D8] bg-white p-6 shadow-sm transition-all hover:shadow-md"
            >
              <div>
                {card.badge && (
                  <span className="inline-block rounded-full bg-[#F5F1E8] px-3 py-1 text-[10px] font-bold text-[#5B6B63]">
                    {card.badge}
                  </span>
                )}
                <h3 className="mt-3 text-lg font-bold text-[#26312D]">
                  {card.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[#5B6B63]">
                  {card.subtitle}
                </p>
              </div>
              <div className="mt-6 border-t border-[#E4E0D8]/50 pt-4">
                <Link
                  href={card.href}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#0E3D34] hover:text-[#D9A441]"
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
