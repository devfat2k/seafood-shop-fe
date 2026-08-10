import type { IconName } from '@/components/common/Icon';
import { Icon } from '@/components/common/Icon';
import { USP_LIST } from '@/data/home-mock';

function getUspIconName(iconName: string): IconName {
  if (iconName === 'bag') {
    return 'shopping-bag';
  }
  if (iconName === 'clock') {
    return 'clock';
  }
  if (iconName === 'shield') {
    return 'shield-check';
  }
  return 'sparkles';
}

export function UspSection() {
  return (
    <section className="border-y border-[#E4E0D8] bg-[#F5F1E8] py-8 lg:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 items-center gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {USP_LIST.map((item) => (
            <div
              key={item.id}
              className="group flex items-center gap-4 rounded-2xl border border-[#E4E0D8] bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#0B2F28]/30 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#E4EEEA] text-[#0B2F28] transition-colors group-hover:bg-[#0B2F28] group-hover:text-white">
                <Icon name={getUspIconName(item.iconName)} size="lg" />
              </div>
              <div>
                <h4 className="text-base font-bold text-[#26312D]">{item.title}</h4>
                <p className="mt-0.5 text-xs leading-relaxed text-text-secondary">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
