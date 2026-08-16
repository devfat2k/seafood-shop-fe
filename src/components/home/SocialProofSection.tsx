'use client';

import Image from 'next/image';
import { Icon } from '@/components/common/Icon';
import type { FeaturedReview } from '@/types/home';

type SocialProofSectionProps = {
  reviews?: FeaturedReview[];
};

export function SocialProofSection({ reviews = [] }: SocialProofSectionProps) {
  if (reviews.length === 0) {
    return null;
  }

  return (
    <section className="bg-card py-10 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-6 flex items-center justify-between sm:mb-10">
          <div>
            <span className="text-xs font-bold tracking-wider text-secondary uppercase">
              Đánh Giá Thực Tế
            </span>
            <h2 className="mt-1 font-heading text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl">
              Khách Hàng Đánh Giá
            </h2>
          </div>
          <span className="text-xs text-muted-foreground sm:hidden">Vuốt ngang →</span>
        </div>

        {/* Swipe Rail on Mobile / 3-col Grid on Desktop */}
        <div className="flex snap-x snap-mandatory scrollbar-none gap-4 overflow-x-auto pb-4 sm:grid sm:snap-none sm:grid-cols-3 sm:overflow-visible sm:pb-0">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="flex max-w-[260px] min-w-[260px] snap-start flex-col justify-between rounded-xl border border-border bg-background p-4 shadow-xs transition-all duration-300 hover:border-secondary/40 hover:shadow-md sm:max-w-none sm:min-w-0 sm:p-6"
            >
              <div>
                <div className="flex items-center gap-1 text-accent">
                  {Array.from({ length: rev.rating ?? 5 }).map((_, i) => (
                    <Icon key={i} name="star" size="xs" />
                  ))}
                </div>
                <p className="mt-3 text-xs leading-relaxed text-foreground italic sm:text-sm">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              <div className="mt-4 flex items-center gap-3 border-t border-border/60 pt-3">
                {rev.avatar && (
                  <Image
                    src={rev.avatar}
                    alt={rev.author ?? 'Khách hàng'}
                    width={36}
                    height={36}
                    unoptimized
                    className="h-9 w-9 rounded-full border border-border object-cover"
                  />
                )}
                <div>
                  <h4 className="text-xs font-bold text-foreground">{rev.author}</h4>
                  {rev.location && (
                    <p className="text-[10px] text-muted-foreground">{rev.location}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
