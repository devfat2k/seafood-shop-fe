"use client";

import { useState } from "react";
import { BentoCategories } from "@/components/home/BentoCategories";
import { ComboSetsSection } from "@/components/home/ComboSetsSection";
import { DailySeafoodStory } from "@/components/home/DailySeafoodStory";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { HeroSection } from "@/components/home/HeroSection";
import { MarqueeStrip } from "@/components/home/MarqueeStrip";
import { MasonryGallery } from "@/components/home/MasonryGallery";
import { SocialProofSection } from "@/components/home/SocialProofSection";
import { QuickViewModal } from "@/components/products/QuickViewModal";
import type { QuickViewProduct } from "@/components/products/QuickViewModal";

export default function IndexPage() {
  const [quickViewProduct, setQuickViewProduct] =
    useState<QuickViewProduct | null>(null);

  const handleOpenQuickView = (product: {
    id: string;
    name: string;
    price: number;
    image: string;
    badges: string[];
    spec: string;
  }) => {
    setQuickViewProduct({
      id: product.id,
      name: product.name,
      badge: product.badges[0] ?? "CẢNG PHAN THIẾT",
      price: `${product.price.toLocaleString("vi-VN")}₫`,
      originalPrice: `${Math.round(product.price * 1.15).toLocaleString("vi-VN")}₫`,
      rating: 4.9,
      reviewsCount: 42,
      origin: "Cảng cá Phan Thiết, Bình Thuận",
      description:
        "Hải sản tươi bơi bể, tuyển chọn loại 1 từ đánh bắt rạng sáng. Cam kết 1 đổi 1 nếu không đạt chất lượng tươi sống.",
      image: product.image,
      weights: ["500g / Khay", "1kg / Túi oxy", "Combo 2kg"],
    });
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#F8FAFC]">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Marquee Strip */}
      <MarqueeStrip />

      {/* 3. Bento Grid Categories */}
      <BentoCategories />

      {/* 5. "Hải Sản Hôm Nay" — Sticky Scroll Storytelling */}
      <DailySeafoodStory />

      {/* 6. Featured Products Carousel / Grid */}
      <FeaturedProducts onQuickView={handleOpenQuickView} />

      {/* 7. Masonry Editorial Gallery "Khoảnh Khắc Hải Sản" */}
      <MasonryGallery />

      {/* 9. Social Proof & Reviews */}
      <SocialProofSection />

      {/* 10. Combo Sets Section */}
      <ComboSetsSection />

      {/* Quick View Modal Overlay */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => {
          setQuickViewProduct(null);
        }}
      />
    </div>
  );
}
