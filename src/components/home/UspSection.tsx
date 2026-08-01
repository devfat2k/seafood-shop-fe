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
    <section className="border-y border-[#E4E0D8] bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {USP_LIST.map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-4 rounded-2xl border border-[#E4E0D8] bg-[#FBF8F3] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#0E3D34]/30 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#E4EEEA] text-[#0E3D34] transition-colors group-hover:bg-[#0E3D34] group-hover:text-white">
                <Icon name={getUspIconName(item.iconName)} size="lg" />
              </div>
              <div>
                <h4 className="text-base font-bold text-[#26312D]">{item.title}</h4>
                <p className="mt-1 text-xs leading-relaxed text-[#5B6B63]">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
