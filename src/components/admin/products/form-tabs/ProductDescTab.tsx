'use client';

import type { UseFormReturn } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
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
      <Textarea
        id="product-desc-input"
        rows={6}
        placeholder="Nhập mô tả sản phẩm..."
        className="mt-1 text-xs"
        {...register('description')}
      />
      {errors.description && (
        <p className="mt-1 text-xs text-destructive">{errors.description.message}</p>
      )}
    </div>
  );
};
