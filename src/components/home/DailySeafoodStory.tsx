'use client';

import Image from 'next/image';
import { toast } from 'sonner';
import { Icon } from '@/components/common/Icon';
import { Link } from '@/libs/I18nNavigation';
import type { DailyArrival } from '@/types/home';
import { formatCurrency } from '@/utils/Helpers';

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

export const DailySeafoodStory = ({ arrivals = [], onAddToCart }: DailySeafoodStoryProps) => {
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
      description: `Giá: ${formatCurrency(item.price)}/${item.unit}`,
    });
  };

  return (
    <section className="bg-card py-10 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:mb-10 sm:flex-row sm:items-end">
          <div>
            <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl">
              Hải Sản Vừa Cập Bến
            </h2>
            <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
              Cập nhật trực tiếp các mẻ hải sản đánh bắt tự nhiên từ vùng biển Phan Thiết
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-1 text-xs font-bold text-primary transition-colors hover:underline"
          >
            <span>Xem tất cả</span>
            <Icon name="arrow-right" size="xs" />
          </Link>
        </div>

        <div className="flex snap-x snap-mandatory scrollbar-none gap-4 overflow-x-auto pb-4 sm:grid sm:snap-none sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:grid-cols-4">
          {displayArrivals.map((item) => (
            <div
              key={item.id}
              className="group flex max-w-65 min-w-65 snap-start flex-col justify-between rounded-xl border border-border bg-background p-4 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-secondary/40 hover:shadow-md sm:max-w-none sm:min-w-0"
            >
              <div>
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

                  <span className="absolute top-2 left-2 rounded-full bg-primary px-2.5 py-0.5 text-xs font-bold text-primary-foreground uppercase shadow-xs">
                    {item.badge}
                  </span>
                </div>

                <div className="mt-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-secondary">
                    <Icon name="map-pin" size="xs" />
                    <span>{item.boatCode}</span>
                  </div>

                  <h3 className="mt-1 line-clamp-2 min-h-10 font-sans text-sm font-bold text-foreground transition-colors group-hover:text-primary">
                    <Link href={`/products/${item.id}`}>{item.name}</Link>
                  </h3>

                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3">
                <div>
                  <span className="font-sans text-base font-bold text-primary sm:text-lg">
                    {item.price > 0 ? formatCurrency(item.price) : 'Theo thời giá'}
                  </span>
                  <span className="text-xs text-muted-foreground">/{item.unit}</span>
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
};
