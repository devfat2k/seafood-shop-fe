'use client';

import Image from 'next/image';
import { Icon } from '@/components/common/Icon';
import { Link } from '@/libs/I18nNavigation';
import type { CategoryItem } from '@/types/home';

type BentoCategoriesProps = {
  categories?: CategoryItem[];
};

function LargeCategoryCard({ category }: { category: CategoryItem }) {
  const name = category.name ?? category.categoryName ?? 'Hải sản';
  const linkHref = `/products?category=${category.slug ?? String(category.id)}`;

  return (
    <div className="group relative min-h-[260px] overflow-hidden rounded-xl border border-border shadow-xs transition-all duration-500 hover:-translate-y-1 hover:shadow-md sm:col-span-2 sm:min-h-[360px]">
      {category.imageUrl ? (
        <Image
          src={category.imageUrl}
          alt={name}
          fill
          unoptimized
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div className="h-full w-full bg-muted" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent" />
      {category.badge && (
        <span className="absolute top-4 left-4 rounded-full bg-primary px-3 py-0.5 text-xs font-bold text-primary-foreground shadow-xs">
          {category.badge}
        </span>
      )}

      <div className="absolute right-6 bottom-6 left-6 space-y-1.5 text-white">
        <h3 className="font-heading text-xl font-bold sm:text-2xl">{name}</h3>
        {category.description && (
          <p className="hidden max-w-md text-xs text-white/80 sm:block">{category.description}</p>
        )}
        <Link
          href={linkHref}
          className="inline-flex items-center gap-1.5 pt-1 text-xs font-bold text-white transition-transform group-hover:translate-x-1 hover:underline"
        >
          <span>Xem ngay danh mục</span>
          <Icon name="arrow-right" size="xs" />
        </Link>
      </div>
    </div>
  );
}

function SmallCategoryCard({
  category,
  badgeStyle = 'bg-secondary text-secondary-foreground',
}: {
  category: CategoryItem;
  badgeStyle?: string;
}) {
  const name = category.name ?? category.categoryName ?? 'Hải sản';
  const linkHref = `/products?category=${category.slug ?? String(category.id)}`;

  return (
    <div className="group relative min-h-[160px] overflow-hidden rounded-xl border border-border shadow-xs transition-all duration-500 hover:-translate-y-1 hover:shadow-md sm:min-h-[170px]">
      {category.imageUrl ? (
        <Image
          src={category.imageUrl}
          alt={name}
          fill
          unoptimized
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div className="h-full w-full bg-muted" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent" />
      {category.badge && (
        <span
          className={`absolute top-3 left-3 rounded-full px-2.5 py-0.5 text-[10px] font-bold shadow-xs ${badgeStyle}`}
        >
          {category.badge}
        </span>
      )}

      <div className="absolute right-4 bottom-4 left-4 space-y-1 text-white">
        <h3 className="font-heading text-base font-bold sm:text-lg">{name}</h3>
        <Link
          href={linkHref}
          className="inline-flex items-center gap-1 text-xs font-bold text-white transition-transform group-hover:translate-x-1 hover:underline"
        >
          <span>Xem danh mục</span>
          <Icon name="arrow-right" size="xs" />
        </Link>
      </div>
    </div>
  );
}

export function BentoCategories({ categories = [] }: BentoCategoriesProps) {
  if (categories.length === 0) {
    return null;
  }

  const [first, second, third] = categories;

  return (
    <section className="bg-background py-10 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-8 text-center sm:mb-10">
          <span className="text-xs font-bold tracking-wider text-secondary uppercase">
            Danh Mục Tuyển Chọn
          </span>
          <h2 className="mt-1 font-heading text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl">
            Khám Phá Hương Vị Biển Khơi
          </h2>
          <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
            Tuyển chọn hải sản tươi sống đánh bắt tự nhiên &amp; đặc sản nướng tiệc đậm vị
          </p>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:gap-6">
          {first && <LargeCategoryCard category={first} />}
          {second && <SmallCategoryCard category={second} />}
          {third && (
            <SmallCategoryCard category={third} badgeStyle="bg-accent text-accent-foreground" />
          )}
        </div>
      </div>
    </section>
  );
}
