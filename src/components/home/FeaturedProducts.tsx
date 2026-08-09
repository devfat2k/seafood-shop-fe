"use client";

import { useState } from "react";
import { Icon } from "@/components/common/Icon";
import type { ProductCardItem } from "@/components/products/ProductCard";
import { ProductCard } from "@/components/products/ProductCard";
import { FEATURED_PRODUCTS } from "@/data/home-mock";
import { Link } from "@/libs/I18nNavigation";

type FeaturedProductsProps = {
  onQuickView?: (product: ProductCardItem) => void;
};

export function FeaturedProducts({ onQuickView }: FeaturedProductsProps) {
  const [activeTab, setActiveTab] = useState<string>("all");

  const filteredProducts =
    activeTab === "all"
      ? FEATURED_PRODUCTS
      : FEATURED_PRODUCTS.filter((p) => p.categorySlug === activeTab);

  return (
    <section className="bg-white py-14 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-xs font-bold tracking-wider text-[#F97316] uppercase">
              ĐƯỢC MUA NHIỀU NHẤT
            </span>
            <h2 className="mt-2 text-3xl font-extrabold text-[#0F172A] sm:text-4xl">
              Hải Sản Tươi Sống Hôm Nay
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2 rounded-full border border-[#E2E8F0] bg-[#F8FAFC] p-1.5">
            <button
              type="button"
              onClick={() => {
                setActiveTab("all");
              }}
              className={`rounded-full px-4 py-2 text-xs font-bold transition-colors ${
                activeTab === "all"
                  ? "bg-[#1E3A8A] text-white"
                  : "text-text-secondary hover:text-[#0F172A]"
              }`}
            >
              Tất cả
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab("tom-cua");
              }}
              className={`rounded-full px-4 py-2 text-xs font-bold transition-colors ${
                activeTab === "tom-cua"
                  ? "bg-[#1E3A8A] text-white"
                  : "text-text-secondary hover:text-[#0F172A]"
              }`}
            >
              Tôm &amp; Cua
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab("muc-bach-tuoc");
              }}
              className={`rounded-full px-4 py-2 text-xs font-bold transition-colors ${
                activeTab === "muc-bach-tuoc"
                  ? "bg-[#1E3A8A] text-white"
                  : "text-text-secondary hover:text-[#0F172A]"
              }`}
            >
              Mực &amp; Bạch tuộc
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab("sot-tiec");
              }}
              className={`rounded-full px-4 py-2 text-xs font-bold transition-colors ${
                activeTab === "sot-tiec"
                  ? "bg-[#1E3A8A] text-white"
                  : "text-text-secondary hover:text-[#0F172A]"
              }`}
            >
              Sốt Tiệc
            </button>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={onQuickView}
            />
          ))}
        </div>

        <div className="mt-8 flex items-center justify-center">
          <Link
            href="/products"
            className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#E2E8F0] bg-[#EDF2F7] px-12 py-4 text-xs font-bold text-[#0F172A] shadow-xs transition-all hover:-translate-y-0.5 hover:bg-[#DBEAFE] hover:text-[#1E3A8A]"
          >
            <span>Xem Tất Cả</span>
            <Icon name="chevron-right" size="sm" />
          </Link>
        </div>
      </div>
    </section>
  );
}
