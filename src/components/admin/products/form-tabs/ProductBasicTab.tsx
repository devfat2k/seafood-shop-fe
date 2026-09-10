'use client';

import type { UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import type { Category } from '@/types/api';
import { formatCurrency } from '@/utils/Helpers';
import type { AdminProductFormValues } from '@/validations/admin';

type ProductBasicTabProps = {
  form: UseFormReturn<AdminProductFormValues>;
  categories?: Category[];
};

export const ProductBasicTab = ({ form, categories }: ProductBasicTabProps) => {
  const {
    register,
    watch,
    formState: { errors },
  } = form;

  const price = watch('price');
  const originalPrice = watch('originalPrice');

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="product-name-input" className="text-xs font-semibold text-foreground">
            Tên sản phẩm *
          </label>
          <Input
            id="product-name-input"
            placeholder="VD: Cua Gạch Cà Mau Tuyển Chọn"
            className="mt-1 text-xs"
            {...register('name')}
          />
          {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="product-cat-select" className="text-xs font-semibold text-foreground">
            Danh mục sản phẩm *
          </label>
          <select
            id="product-cat-select"
            className="mt-1 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-xs shadow-xs transition-colors focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none"
            {...register('categoryId', {
              setValueAs: (v: string) =>
                v === '' || Number.isNaN(Number(v)) ? undefined : Number(v),
            })}
          >
            {categories?.map((cat) => (
              <option key={cat.id} value={cat.id} className="bg-popover text-foreground">
                {cat.name ?? cat.categoryName}
              </option>
            ))}
          </select>
          {errors.categoryId && (
            <p className="mt-1 text-xs text-destructive">{errors.categoryId.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="product-price-input" className="text-xs font-semibold text-foreground">
              Giá bán (₫) *
            </label>
            {typeof price === 'number' && !Number.isNaN(price) && price > 0 && (
              <span className="text-[11px] font-bold text-primary">{formatCurrency(price)}</span>
            )}
          </div>
          <Input
            id="product-price-input"
            type="number"
            placeholder="VD: 480000"
            className="mt-1 text-xs"
            {...register('price', {
              setValueAs: (v: string) =>
                v === '' || Number.isNaN(Number(v)) ? undefined : Number(v),
            })}
          />
          {errors.price && <p className="mt-1 text-xs text-destructive">{errors.price.message}</p>}
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="product-original-price"
              className="text-xs font-semibold text-foreground"
            >
              Giá gốc (₫)
            </label>
            {typeof originalPrice === 'number' &&
              !Number.isNaN(originalPrice) &&
              originalPrice > 0 && (
                <span className="text-[11px] text-muted-foreground line-through">
                  {formatCurrency(originalPrice)}
                </span>
              )}
          </div>
          <Input
            id="product-original-price"
            type="number"
            placeholder="VD: 550000"
            className="mt-1 text-xs"
            {...register('originalPrice', {
              setValueAs: (v: string) =>
                v === '' || Number.isNaN(Number(v)) ? undefined : Number(v),
            })}
          />
        </div>

        <div>
          <label htmlFor="product-stock-input" className="text-xs font-semibold text-foreground">
            Tồn kho * (Số lượng)
          </label>
          <Input
            id="product-stock-input"
            type="number"
            min={0}
            placeholder="VD: 50"
            className="mt-1 text-xs"
            {...register('stock', {
              setValueAs: (v: string) =>
                v === '' || Number.isNaN(Number(v)) ? undefined : Number(v),
            })}
          />
          {errors.stock && <p className="mt-1 text-xs text-destructive">{errors.stock.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="product-type-select" className="text-xs font-semibold text-foreground">
            Loại sản phẩm
          </label>
          <select
            id="product-type-select"
            className="mt-1 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-xs shadow-xs"
            {...register('productType')}
          >
            <option value="REGULAR" className="bg-popover text-foreground">
              Sản phẩm thông thường (REGULAR)
            </option>
            <option value="COMBO" className="bg-popover text-foreground">
              Gói Combo Tiệc / Set Quà (COMBO)
            </option>
          </select>
        </div>

        <div className="flex items-center justify-between rounded-lg border border-border/80 bg-muted/30 p-3">
          <div>
            <label
              htmlFor="product-active-checkbox"
              className="text-xs font-semibold text-foreground"
            >
              Mở bán ngay trên shop
            </label>
            <p className="text-[11px] text-muted-foreground">Hiển thị sản phẩm cho khách hàng</p>
          </div>
          <input
            id="product-active-checkbox"
            type="checkbox"
            className="h-4 w-4 rounded-sm border-border text-primary focus:ring-primary"
            {...register('isActive')}
          />
        </div>
      </div>
    </div>
  );
};
