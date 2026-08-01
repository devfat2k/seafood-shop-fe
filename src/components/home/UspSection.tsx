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
    <section className="border-y border-[#E2E8F0] bg-white py-8 lg:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 items-center gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {USP_LIST.map((item) => (
            <div
              key={item.id}
              className="group flex items-center gap-4 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#1E3A8A]/30 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#DBEAFE] text-[#1E3A8A] transition-colors group-hover:bg-[#1E3A8A] group-hover:text-white">
                <Icon name={getUspIconName(item.iconName)} size="lg" />
              </div>
              <div>
                <h4 className="text-base font-bold text-[#0F172A]">{item.title}</h4>
                <p className="mt-0.5 text-xs leading-relaxed text-[#475569]">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
