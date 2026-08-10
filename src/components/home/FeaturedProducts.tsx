"use client";

import { useRef, useState } from "react";
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
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const filteredProducts =
    activeTab === "all"
      ? FEATURED_PRODUCTS
      : FEATURED_PRODUCTS.filter((p) => p.categorySlug === activeTab);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -340 : 340;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="bg-white py-8 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-xs font-extrabold tracking-widest text-[#C4922F] uppercase">
              ĐƯỢC MUA NHIỀU NHẤT
            </span>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-[#0B2F28] sm:text-3xl lg:text-4xl">
              Hải Sản Tươi Sống Hôm Nay
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 rounded-full border border-[#E4E0D8] bg-[#F5F1E8] p-1.5 shadow-xs">
              <button
                type="button"
                onClick={() => {
                  setActiveTab("all");
                }}
                className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                  activeTab === "all"
                    ? "bg-[#0B2F28] text-white shadow-xs"
                    : "text-[#5B6B63] hover:text-[#0B2F28]"
                }`}
              >
                Tất cả
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("tom-cua");
                }}
                className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                  activeTab === "tom-cua"
                    ? "bg-[#0B2F28] text-white shadow-xs"
                    : "text-[#5B6B63] hover:text-[#0B2F28]"
                }`}
              >
                Tôm &amp; Cua
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("muc-bach-tuoc");
                }}
                className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                  activeTab === "muc-bach-tuoc"
                    ? "bg-[#0B2F28] text-white shadow-xs"
                    : "text-[#5B6B63] hover:text-[#0B2F28]"
                }`}
              >
                Mực &amp; Bạch tuộc
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("sot-tiec");
                }}
                className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                  activeTab === "sot-tiec"
                    ? "bg-[#0B2F28] text-white shadow-xs"
                    : "text-[#5B6B63] hover:text-[#0B2F28]"
                }`}
              >
                Sốt Tiệc
              </button>
            </div>

            {/* Prev / Next Navigation Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  handleScroll("left");
                }}
                aria-label="Cuộn trái danh sách sản phẩm"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E4E0D8] bg-white text-[#0B2F28] shadow-xs transition-all hover:scale-105 hover:bg-[#F5F1E8] active:scale-95"
              >
                <Icon name="chevron-left" size="sm" />
              </button>
              <button
                type="button"
                onClick={() => {
                  handleScroll("right");
                }}
                aria-label="Cuộn phải danh sách sản phẩm"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E4E0D8] bg-white text-[#0B2F28] shadow-xs transition-all hover:scale-105 hover:bg-[#F5F1E8] active:scale-95"
              >
                <Icon name="chevron-right" size="sm" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Grid Container */}
        <div
          ref={scrollContainerRef}
          className="mt-8 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4 scrollbar-none"
        >
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="w-[280px] shrink-0 snap-start sm:w-[300px] lg:w-[calc(25%-18px)]"
            >
              <ProductCard product={product} onQuickView={onQuickView} />
            </div>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-center">
          <Link
            href="/products"
            className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#E4E0D8] bg-[#F5F1E8] px-10 py-3.5 text-xs font-bold text-[#0B2F28] shadow-xs transition-all hover:-translate-y-0.5 hover:bg-[#E4EEEA] hover:text-[#0B2F28]"
          >
            <span>Xem Tất Cả Sản Phẩm</span>
            <Icon name="chevron-right" size="sm" />
          </Link>
        </div>
      </div>
    </section>
  );
}
