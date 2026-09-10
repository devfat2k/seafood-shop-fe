'use client';

import type { UseFormReturn } from 'react-hook-form';
import type { AdminProductFormValues } from '@/validations/admin';

type ProductDescTabProps = {
  form: UseFormReturn<AdminProductFormValues>;
};

export const ProductDescTab = ({ form }: ProductDescTabProps) => {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div>
      <label htmlFor="product-desc-input" className="text-xs font-semibold text-foreground">
        Mô tả sản phẩm chi tiết *
      </label>
      <textarea
        id="product-desc-input"
        rows={6}
        placeholder="Mô tả độ tươi ngon, chất lượng thịt, cách sơ chế và hướng dẫn chế biến món ăn ngon..."
        className="mt-1 flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-xs shadow-xs focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none"
        {...register('description')}
      />
      {errors.description && (
        <p className="mt-1 text-xs text-destructive">{errors.description.message}</p>
      )}
    </div>
  );
};
