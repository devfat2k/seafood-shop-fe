'use client';

import Image from 'next/image';
import { toast } from 'sonner';
import { Icon } from '@/components/common/Icon';
import { Link } from '@/libs/I18nNavigation';
import type { DailyArrival } from '@/types/home';

type ArrivalItem = {
  id: string;
  boatCode: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  image: string;
  badge: string;
};

type DailySeafoodStoryProps = {
  arrivals?: DailyArrival[];
  onAddToCart?: (item: { id: string; name: string; price: number; image: string }) => void;
};

export function DailySeafoodStory({ arrivals = [], onAddToCart }: DailySeafoodStoryProps) {
  const displayArrivals: ArrivalItem[] = arrivals.map((a) => ({
    id: String(a.id),
    boatCode: a.boatCode ?? 'Tàu bến Phan Thiết',
    name: a.title ?? 'Hải sản tươi sống',
    description: a.description ?? 'Đánh bắt tự nhiên trong ngày, tươi sống bơi bể.',
    price: typeof a.price === 'number' ? a.price : Number(a.price) || 0,
    unit: a.weight ?? 'kg',
    image: a.imageUrl ?? a.image ?? '',
    badge: a.badge ?? 'MỚI CẬP BẾN',
  }));

  if (displayArrivals.length === 0) {
    return null;
  }

  const handleAddToCart = (item: ArrivalItem) => {
    if (onAddToCart) {
      onAddToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
      });
    }
    toast.success(`Đã thêm "${item.name}" vào giỏ hàng!`, {
      description: `Giá: ${item.price.toLocaleString('vi-VN')}₫/${item.unit}`,
    });
  };

  return (
    <section className="bg-card py-10 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-6 flex flex-col justify-between gap-4 sm:mb-10 sm:flex-row sm:items-end">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 animate-ping rounded-full bg-tertiary" />
              <span className="text-xs font-bold tracking-wider text-secondary uppercase">
                Hải Sản Hôm Nay
              </span>
            </div>
            <h2 className="mt-1.5 font-heading text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl">
              Hải Sản Vừa Cập Bến
            </h2>
            <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
              Cập nhật trực tiếp các mẻ hải sản đánh bắt tự nhiên từ vùng biển Phan Thiết
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden rounded-full bg-secondary/10 px-3 py-1 text-xs font-bold text-secondary sm:inline-block">
              📦 Chuỗi lạnh 2H tại TP.HCM
            </span>
            <Link
              href="/products"
              className="inline-flex items-center gap-1 text-xs font-bold text-primary transition-colors hover:underline"
            >
              <span>Xem tất cả</span>
              <Icon name="arrow-right" size="xs" />
            </Link>
          </div>
        </div>

        {/* Swipe Rail on Mobile / 4-Col Grid on Desktop */}
        <div className="flex snap-x snap-mandatory scrollbar-none gap-4 overflow-x-auto pb-4 sm:grid sm:snap-none sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:grid-cols-4">
          {displayArrivals.map((item) => (
            <div
              key={item.id}
              className="group flex max-w-[260px] min-w-[260px] snap-start flex-col justify-between rounded-xl border border-border bg-background p-4 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-secondary/40 hover:shadow-md sm:max-w-none sm:min-w-0"
            >
              <div>
                {/* Image Container */}
                <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-muted">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      loading="lazy"
                      unoptimized
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
                      <Icon name="fish" size="lg" />
                    </div>
                  )}

                  {/* Badge */}
                  <span className="absolute top-2 left-2 rounded-full bg-primary px-2.5 py-0.5 text-[9px] font-bold text-primary-foreground uppercase shadow-xs">
                    {item.badge}
                  </span>
                </div>

                {/* Info */}
                <div className="mt-3">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-secondary">
                    <Icon name="map-pin" size="xs" />
                    <span>{item.boatCode}</span>
                  </div>

                  <h3 className="mt-1 line-clamp-2 min-h-[38px] font-heading text-sm font-bold text-foreground transition-colors group-hover:text-primary">
                    <Link href={`/products/${item.id}`}>{item.name}</Link>
                  </h3>

                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Price & CTA */}
              <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3">
                <div>
                  <span className="font-heading text-base font-bold text-primary sm:text-lg">
                    {item.price > 0 ? `${item.price.toLocaleString('vi-VN')}₫` : 'Theo thời giá'}
                  </span>
                  <span className="text-[10px] text-muted-foreground">/{item.unit}</span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    handleAddToCart(item);
                  }}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all hover:bg-primary hover:text-primary-foreground active:scale-95"
                  aria-label={`Thêm ${item.name} vào giỏ hàng`}
                  title="Thêm vào giỏ"
                >
                  <Icon name="shopping-cart" size="xs" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
