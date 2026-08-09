"use client";

import { useState } from "react";
import { Icon } from "@/components/common/Icon";

type StoryItem = {
  id: string;
  time: string;
  badge: string;
  title: string;
  description: string;
  weight: string;
  origin: string;
  price: string;
  originalPrice: string;
  image: string;
  imageAlt: string;
};

const DAILY_STORIES: StoryItem[] = [
  {
    id: "ca-thu-sang-nay",
    time: "04:30 Sáng nay",
    badge: "VỪA CẬP BẾN",
    title: "Cá Thu Cắt Lát Cảng Phan Thiết",
    description:
      "Cá thu tươi nguyên con vừa kéo lưới lên tại cảng Phan Thiết lúc 4h30 sáng. Thịt cá dầy, béo ngậy, băm chiên hay sốt cà chua đều ngon tuyệt đỉnh.",
    weight: "500g / Khay (2-3 lát)",
    origin: "Cảng cá Phan Thiết, Bình Thuận",
    price: "185.000₫",
    originalPrice: "220.000₫",
    image:
      "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1000&q=80",
    imageAlt: "Cá thu tươi mới cập bến cảng cá Phan Thiết",
  },
  {
    id: "tom-hum-bong",
    time: "05:15 Sáng nay",
    badge: "BƠI BỂ 100%",
    title: "Tôm Hùm Bông Bơi Bể Loại 1",
    description:
      "Tôm hùm bông bơi khoẻ đóng thùng oxy giữ lạnh xuất xưởng. Thịt tôm giòn ngọt, vỏ mỏng gạch vàng ươm, nướng bơ tỏi hay hấp bia đều hảo hạng.",
    weight: "700g - 1kg / Con",
    origin: "Đảo Phú Quý, Bình Thuận",
    price: "950.000₫",
    originalPrice: "1.100.000₫",
    image:
      "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&w=1000&q=80",
    imageAlt: "Tôm hùm bông bơi bể tươi sống",
  },
  {
    id: "ghe-xanh-phu-quoc",
    time: "06:00 Sáng nay",
    badge: "THỊT CHẮC GẠCH BÉO",
    title: "Ghẹ Xanh Phan Thiết Loại 1 (3-4 con/kg)",
    description:
      "Ghẹ xanh tươi tuyển chọn từng con chắc thịt 100%, gạch béo ngậy. Đóng thùng oxy tươi sống tận tay hoặc hỗ trợ hấp chín miễn phí.",
    weight: "1kg / Túi oxy",
    origin: "Vùng biển Phan Thiết",
    price: "480.000₫",
    originalPrice: "550.000₫",
    image:
      "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=1000&q=80",
    imageAlt: "Ghẹ xanh Phan Thiết tươi ngon loại 1",
  },
];

const DEFAULT_STORY: StoryItem = DAILY_STORIES[0] ?? {
  id: "default",
  time: "",
  badge: "",
  title: "",
  description: "",
  weight: "",
  origin: "",
  price: "",
  originalPrice: "",
  image: "",
  imageAlt: "",
};

export function DailySeafoodStory() {
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const activeStory = DAILY_STORIES[activeStoryIndex] ?? DEFAULT_STORY;

  return (
    <section className="bg-[#F8FAFC] py-14 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#DBEAFE] bg-[#DBEAFE]/60 px-4 py-1.5 text-xs font-bold text-[#1E3A8A]">
            <Icon name="clock" size="xs" />
            <span>CẬP NHẬT MỖI SÁNG TẠI CẢNG</span>
          </div>
          <h2 className="mt-4 text-3xl font-extrabold text-[#0F172A] sm:text-4xl">
            Hải Sản Mới Về <span className="text-[#F97316]">Hôm Nay</span>
          </h2>
          <p className="mt-2 text-sm text-text-secondary sm:text-base">
            Hình ảnh & thông tin hải sản tươi sống vừa cập bến cảng Phan Thiết
            lúc rạng sáng
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
          {/* Sticky Left Image */}
          <div className="top-24 lg:sticky lg:col-span-6">
            <div className="relative overflow-hidden rounded-3xl border border-[#E2E8F0] bg-white p-3 shadow-xl">
              <div className="relative h-[340px] w-full overflow-hidden rounded-2xl sm:h-[420px]">
                <img
                  src={activeStory.image}
                  alt={activeStory.imageAlt}
                  className="h-full w-full object-cover transition-all duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                <div className="absolute top-4 left-4 rounded-full bg-[#1E3A8A] px-3.5 py-1.5 text-xs font-extrabold text-white shadow-md">
                  <Icon
                    name="sparkles"
                    size="xs"
                    className="mr-1.5 inline-block"
                  />
                  {activeStory.badge}
                </div>

                <div className="absolute right-4 bottom-4 left-4 rounded-xl border border-white/30 bg-black/40 p-4 text-white backdrop-blur-md">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="flex items-center gap-1.5 text-amber-300">
                      <Icon name="clock" size="xs" />
                      {activeStory.time}
                    </span>
                    <span className="flex items-center gap-1.5 text-slate-200">
                      <Icon name="map-pin" size="xs" />
                      {activeStory.origin}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scrollable Right Story Cards */}
          <div className="flex flex-col gap-6 lg:col-span-6">
            {DAILY_STORIES.map((story, index) => {
              const isActive = index === activeStoryIndex;
              return (
                <button
                  key={story.id}
                  type="button"
                  onMouseEnter={() => {
                    setActiveStoryIndex(index);
                  }}
                  onClick={() => {
                    setActiveStoryIndex(index);
                  }}
                  className={`group cursor-pointer rounded-2xl border p-6 text-left transition-all duration-300 ${
                    isActive
                      ? "border-[#1E3A8A] bg-white shadow-lg ring-2 ring-[#1E3A8A]/20"
                      : "border-[#E2E8F0] bg-white/70 hover:border-[#CBD5E1] hover:bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-[#DBEAFE] px-3 py-1 text-xs font-extrabold text-[#1E3A8A]">
                      {story.time}
                    </span>
                    <div className="text-right">
                      <span className="mr-2 text-xs text-text-secondary line-through">
                        {story.originalPrice}
                      </span>
                      <span className="text-xl font-extrabold text-[#F97316]">
                        {story.price}
                      </span>
                    </div>
                  </div>

                  <h3 className="mt-3 text-lg font-bold text-[#0F172A] group-hover:text-[#1E3A8A]">
                    {story.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    {story.description}
                  </p>

                  <div className="mt-4 flex items-center justify-between border-t border-[#F1F5F9] pt-4 text-xs font-semibold text-text-secondary">
                    <span className="flex items-center gap-1 text-[#1E3A8A]">
                      <Icon name="shield-check" size="xs" />
                      Quy cách: {story.weight}
                    </span>
                    <span className="inline-flex items-center gap-1 font-bold text-[#1E3A8A] hover:underline">
                      <span>Đặt mua ngay</span>
                      <Icon name="arrow-right" size="xs" />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
