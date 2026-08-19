"use client";

import Image from "next/image";
import { Icon } from "@/components/common/Icon";
import { Link } from "@/libs/I18nNavigation";
import type { CategoryItem } from "@/types/home";

type BentoCategoriesProps = {
  categories?: CategoryItem[];
};

const BADGE_BG_MAP: Record<string, string> = {
  hot: "bg-primary text-primary-foreground",
  fresh: "bg-secondary text-secondary-foreground",
  dry: "bg-accent text-accent-foreground",
  number: "bg-foreground text-background",
};

function getBadgeBg(badgeType?: string | null): string {
  if (badgeType && BADGE_BG_MAP[badgeType]) {
    return BADGE_BG_MAP[badgeType];
  }
  return "bg-primary text-primary-foreground";
}

function MainCategoryCard({ category }: { category: CategoryItem }) {
  const name = category.name ?? category.categoryName ?? "Hải sản tươi sống";
  const linkHref = `/products?category=${category.id}`;
  const badgeClass = getBadgeBg(category.badgeType);

  return (
    <div className="group relative min-h-[300px] overflow-hidden rounded-2xl border border-border shadow-xs transition-all duration-500 hover:-translate-y-1 hover:shadow-lg sm:col-span-2 lg:col-span-2 lg:row-span-2 lg:min-h-[380px]">
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
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/95 via-foreground/45 to-transparent" />

      {category.badge && (
        <span
          className={`absolute top-4 left-4 rounded-full px-3 py-1 text-xs font-bold shadow-xs backdrop-blur-xs ${badgeClass}`}
        >
          {category.badge}
        </span>
      )}

      <div className="absolute right-6 bottom-6 left-6 space-y-2 text-white">
        <div className="flex items-center gap-2">
          {category.productCount !== null &&
            category.productCount !== undefined && (
              <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-semibold text-white backdrop-blur-xs">
                {category.productCount} sản phẩm
              </span>
            )}
        </div>
        <h3 className="font-heading text-2xl font-bold sm:text-3xl">{name}</h3>
        {category.description && (
          <p className="line-clamp-2 max-w-md text-xs text-white/80 sm:text-sm">
            {category.description}
          </p>
        )}
        <Link
          href={linkHref}
          className="inline-flex items-center gap-1.5 pt-1 text-xs font-bold text-white transition-transform group-hover:translate-x-1 hover:underline"
        >
          <span>Khám phá danh mục</span>
          <Icon name="arrow-right" size="xs" />
        </Link>
      </div>
    </div>
  );
}

function StandardCategoryCard({ category }: { category: CategoryItem }) {
  const name = category.name ?? category.categoryName ?? "Hải sản";
  const linkHref = `/products?category=${category.id}`;
  const badgeClass = getBadgeBg(category.badgeType);

  return (
    <div className="group relative min-h-[180px] overflow-hidden rounded-2xl border border-border shadow-xs transition-all duration-500 hover:-translate-y-1 hover:shadow-md">
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
          className={`absolute top-3 left-3 rounded-full px-2.5 py-0.5 text-[10px] font-bold shadow-xs ${badgeClass}`}
        >
          {category.badge}
        </span>
      )}

      <div className="absolute right-4 bottom-4 left-4 space-y-1 text-white">
        <div className="flex items-center justify-between">
          <h3 className="font-heading text-sm font-bold sm:text-base">
            {name}
          </h3>
          {category.productCount !== null &&
            category.productCount !== undefined && (
              <span className="text-[10px] font-medium text-white/75">
                {category.productCount} SP
              </span>
            )}
        </div>
        <Link
          href={linkHref}
          className="inline-flex items-center gap-1 text-xs font-bold text-white transition-transform group-hover:translate-x-1 hover:underline"
        >
          <span>Xem ngay</span>
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

  // Pick the main display category or the first one
  const mainCategory =
    categories.find((c) => c.homeDisplayStyle === "main") ?? categories[0];
  const otherCategories = categories.filter((c) => c.id !== mainCategory?.id);

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
            Tuyển chọn hải sản tươi sống đánh bắt tự nhiên &amp; đặc sản nướng
            tiệc đậm vị
          </p>
        </div>

        {/* 8-category Bento Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {mainCategory && <MainCategoryCard category={mainCategory} />}
          {otherCategories.map((cat) => (
            <StandardCategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </div>
    </section>
  );
}
