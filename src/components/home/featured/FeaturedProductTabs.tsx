'use client';

import type { FeaturedProductTab } from '@/types/home';

type FeaturedProductTabsProps = {
  tabs: FeaturedProductTab[];
  activeTab: string;
  onSelectTab: (slug: string) => void;
};

export const FeaturedProductTabs = ({ tabs, activeTab, onSelectTab }: FeaturedProductTabsProps) => {
  if (tabs.length <= 1) {
    return null;
  }

  return (
    <div className="mb-8 flex scrollbar-none gap-2 overflow-x-auto pb-2 sm:flex-wrap">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.slug;
        return (
          <button
            key={tab.slug}
            type="button"
            onClick={() => {
              onSelectTab(tab.slug);
            }}
            className={`rounded-full px-4 py-2 text-xs font-bold whitespace-nowrap transition-all active:scale-95 ${
              isActive
                ? 'bg-secondary text-secondary-foreground shadow-xs'
                : 'border border-border bg-card text-muted-foreground hover:border-secondary hover:text-foreground'
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};
