'use client';

import { useState } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { Icon } from '@/components/common/Icon';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import type { AdminProductFormValues } from '@/validations/admin';

type ProductSpecTabProps = {
  form: UseFormReturn<AdminProductFormValues>;
};

export const ProductSpecTab = ({ form }: ProductSpecTabProps) => {
  const { register, watch, setValue } = form;
  const [weightInput, setWeightInput] = useState('');
  const weightOptions = watch('weightOptions') ?? [];

  const handleAddWeight = () => {
    if (!weightInput.trim()) {
      return;
    }
    const updated = [...weightOptions, weightInput.trim()];
    setValue('weightOptions', updated);
    setWeightInput('');
  };

  const handleRemoveWeight = (index: number) => {
    const updated = weightOptions.filter((_, i) => i !== index);
    setValue('weightOptions', updated);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="product-unit-input" className="text-xs font-semibold text-foreground">
            Đơn vị tính
          </label>
          <Input
            id="product-unit-input"
            placeholder="VD: kg, con, khay, phần..."
            className="mt-1 text-xs"
            {...register('unit')}
          />
        </div>

        <div>
          <label htmlFor="product-spec-input" className="text-xs font-semibold text-foreground">
            Quy cách size
          </label>
          <Input
            id="product-spec-input"
            placeholder="VD: Size 2-3 con/kg"
            className="mt-1 text-xs"
            {...register('spec')}
          />
        </div>

        <div>
          <label htmlFor="product-origin-input" className="text-xs font-semibold text-foreground">
            Xuất xứ / Vùng đánh bắt
          </label>
          <Input
            id="product-origin-input"
            placeholder="VD: Cà Mau, Phú Yên..."
            className="mt-1 text-xs"
            {...register('origin')}
          />
        </div>
      </div>

      <div>
        <label htmlFor="product-weight-input" className="text-xs font-semibold text-foreground">
          Tùy chọn trọng lượng (Weight Options)
        </label>
        <div className="mt-1 flex gap-2">
          <Input
            id="product-weight-input"
            value={weightInput}
            onChange={(e) => {
              setWeightInput(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddWeight();
              }
            }}
            placeholder="Nhập mức kg (VD: 1kg, 2kg, 5kg) rồi ấn Thêm"
            className="text-xs"
          />
          <button
            type="button"
            onClick={handleAddWeight}
            className="rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-primary/90"
          >
            Thêm
          </button>
        </div>

        {weightOptions.length > 0 && (
          <div className="mt-2.5 flex flex-wrap gap-2">
            {weightOptions.map((opt, idx) => (
              <Badge
                key={idx}
                variant="secondary"
                className="gap-1 px-2.5 py-1 text-xs font-medium"
              >
                <span>{opt}</span>
                <button
                  type="button"
                  onClick={() => {
                    handleRemoveWeight(idx);
                  }}
                  className="text-muted-foreground hover:text-destructive"
                  aria-label="Xóa tùy chọn"
                >
                  <Icon name="x" size="xs" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
