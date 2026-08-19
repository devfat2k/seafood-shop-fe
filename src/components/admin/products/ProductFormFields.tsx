'use client';

import type { UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import type { Category } from '@/types/api';
import type { AdminProductFormValues } from '@/validations/admin';

type ProductFormFieldsProps = {
  form: UseFormReturn<AdminProductFormValues>;
  categories?: Category[];
};

export const ProductFormFields = ({ form, categories }: ProductFormFieldsProps) => {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className="space-y-4">
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

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="product-cat-select" className="text-xs font-semibold text-foreground">
            Danh mục *
          </label>
          <select
            id="product-cat-select"
            className="mt-1 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-xs shadow-xs transition-colors focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none"
            {...register('categoryId', { valueAsNumber: true })}
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

        <div>
          <label htmlFor="product-type-select" className="text-xs font-semibold text-foreground">
            Loại sản phẩm
          </label>
          <select
            id="product-type-select"
            className="mt-1 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-xs shadow-xs transition-colors focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none"
            {...register('productType')}
          >
            <option value="REGULAR" className="bg-popover text-foreground">
              Thông thường (REGULAR)
            </option>
            <option value="COMBO" className="bg-popover text-foreground">
              Gói Combo (COMBO)
            </option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div>
          <label htmlFor="product-price-input" className="text-xs font-semibold text-foreground">
            Giá bán (₫) *
          </label>
          <Input
            id="product-price-input"
            type="number"
            placeholder="480000"
            className="mt-1 text-xs"
            {...register('price', { valueAsNumber: true })}
          />
          {errors.price && <p className="mt-1 text-xs text-destructive">{errors.price.message}</p>}
        </div>

        <div>
          <label htmlFor="product-orig-price" className="text-xs font-semibold text-foreground">
            Giá gốc (₫)
          </label>
          <Input
            id="product-orig-price"
            type="number"
            placeholder="550000"
            className="mt-1 text-xs"
            {...register('originalPrice', {
              setValueAs: (v: string) =>
                v === '' || Number.isNaN(Number(v)) ? undefined : Number(v),
            })}
          />
        </div>

        <div>
          <label htmlFor="product-stock-input" className="text-xs font-semibold text-foreground">
            Tồn kho *
          </label>
          <Input
            id="product-stock-input"
            type="number"
            placeholder="50"
            className="mt-1 text-xs"
            {...register('stock', { valueAsNumber: true })}
          />
          {errors.stock && <p className="mt-1 text-xs text-destructive">{errors.stock.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div>
          <label htmlFor="product-unit-input" className="text-xs font-semibold text-foreground">
            Đơn vị tính
          </label>
          <Input
            id="product-unit-input"
            placeholder="kg, con, set"
            className="mt-1 text-xs"
            {...register('unit')}
          />
        </div>

        <div>
          <label htmlFor="product-spec-input" className="text-xs font-semibold text-foreground">
            Quy cách
          </label>
          <Input
            id="product-spec-input"
            placeholder="Size 2-3 con/kg"
            className="mt-1 text-xs"
            {...register('spec')}
          />
        </div>

        <div>
          <label htmlFor="product-origin-input" className="text-xs font-semibold text-foreground">
            Xuất xứ
          </label>
          <Input
            id="product-origin-input"
            placeholder="Cà Mau, Nha Trang"
            className="mt-1 text-xs"
            {...register('origin')}
          />
        </div>
      </div>

      <div>
        <label htmlFor="product-desc-input" className="text-xs font-semibold text-foreground">
          Mô tả sản phẩm
        </label>
        <textarea
          id="product-desc-input"
          rows={3}
          placeholder="Mô tả chi tiết độ tươi ngon, cách bảo quản..."
          className="mt-1 flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-xs shadow-xs focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none"
          {...register('description')}
        />
      </div>
    </div>
  );
};
