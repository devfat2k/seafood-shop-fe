"use client";

import { Icon } from "@/components/common/Icon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "@/libs/I18nNavigation";
import { ProductCardImage } from "./card/ProductCardImage";
import { ProductCardPrice } from "./card/ProductCardPrice";
import type { ProductCardItem, ProductCardProps } from "./productCardTypes";

export const ProductCardGrid = <T extends ProductCardItem>(
  props: ProductCardProps<T>,
) => {
  const { product, onAddToCart, onQuickView } = props;
  const {
    id,
    name,
    price,
    originalPrice,
    unit,
    image,
    category,
    origin,
    rating,
    inStock,
  } = product;

  const isInStock = inStock !== false;
  const hasDiscount = Boolean(originalPrice && originalPrice > price);
  const discountPercent =
    hasDiscount && originalPrice
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : 0;

  const displayRating = typeof rating === "number" && rating > 0 ? rating : 4.9;
  const metaCategory = category || "Hải sản tươi sống";
  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/70 bg-card p-4 shadow-[0_4px_16px_-4px_rgba(11,74,92,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:border-secondary/40 hover:shadow-[0_20px_40px_-10px_rgba(11,74,92,0.14)]">
      <div>
        <ProductCardImage
          id={id}
          name={name}
          image={image}
          origin={origin}
          discountPercent={discountPercent}
          onQuickView={
            onQuickView
              ? () => {
                  onQuickView(product);
                }
              : undefined
          }
        />

        <div className="mt-3 space-y-1.5 px-1">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="truncate text-[11px] font-bold tracking-wider text-secondary uppercase">
              {metaCategory}
            </span>
            <div className="flex items-center gap-1 font-semibold text-foreground">
              <Icon name="star" size="xs" className="fill-accent text-accent" />
              <span className="text-xs font-bold">{displayRating}</span>
            </div>
          </div>

          <Link href={`/products/${id}`} className="block">
            <h3 className="line-clamp-2 min-h-10 font-sans text-sm leading-snug font-bold text-foreground transition-colors group-hover:text-primary sm:min-h-11 sm:text-[15px]">
              {name}
            </h3>
          </Link>
        </div>
      </div>

      <div className="mt-4 flex items-end justify-between gap-2 px-1 pt-1">
        <ProductCardPrice
          price={price}
          originalPrice={originalPrice}
          unit={unit}
        />

        {onAddToCart && (
          <Button
            size="default"
            onClick={() => {
              onAddToCart(product);
            }}
            disabled={!isInStock}
            className={cn(
              "group/buy-btn h-8 shrink-0 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-300 ease-out",
              isInStock
                ? "w-8 gap-0 px-0 bg-primary text-white shadow-xs shadow-primary/20 hover:w-auto hover:gap-1.5 hover:bg-primary/90 hover:px-2.5 hover:shadow-sm active:scale-95 xl:w-auto xl:gap-1.5 xl:px-2.5"
                : "w-8 px-0 cursor-not-allowed border-border/60 bg-muted text-muted-foreground/50 opacity-70 hover:bg-muted",
            )}
            aria-label={
              isInStock ? `Thêm ${name} vào giỏ hàng` : "Tạm hết hàng"
            }
            title={isInStock ? "Thêm vào giỏ" : "Tạm hết hàng"}
          >
            <Icon name="shopping-bag" size="xs" className="shrink-0" />
            {isInStock ? (
              <span className="max-w-0 overflow-hidden text-xs font-semibold whitespace-nowrap opacity-0 transition-all duration-300 ease-out group-hover/buy-btn:max-w-12 group-hover/buy-btn:opacity-100 xl:max-w-12 xl:opacity-100">
                Mua
              </span>
            ) : null}
          </Button>
        )}
      </div>
    </div>
  );
};
