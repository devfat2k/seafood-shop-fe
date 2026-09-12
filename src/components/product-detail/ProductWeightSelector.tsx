'use client';

import { Icon } from '@/components/common/Icon';

export type WeightOption = {
  id: string;
  label: string;
  subLabel: string;
  price: number;
  originalPrice: number;
  stock: number;
  disabled?: boolean;
};

type ProductWeightSelectorProps = {
  options: WeightOption[];
  selectedId: string;
  onSelect: (option: WeightOption) => void;
};

export function ProductWeightSelector({
  options,
  selectedId,
  onSelect,
}: ProductWeightSelectorProps) {
  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold tracking-wide text-foreground uppercase">
          Quy cách & Trọng lượng:
        </span>
        <span className="text-[11px] font-medium text-secondary">Sơ chế theo yêu cầu</span>
      </div>

      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
        {options.map((opt) => {
          const isSelected = selectedId === opt.id;

          return (
            <button
              key={opt.id}
              type="button"
              disabled={opt.disabled}
              onClick={() => {
                onSelect(opt);
              }}
              className={`relative flex flex-col items-start justify-between rounded-xl p-3 text-left transition-all ${
                isSelected
                  ? 'border-2 border-primary bg-primary/5 shadow-xs ring-1 ring-primary/20'
                  : 'border border-border bg-card hover:border-secondary/60 hover:bg-secondary/5'
              } ${opt.disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
            >
              <div className="flex w-full items-start justify-between gap-1">
                <span
                  className={`text-xs leading-tight font-bold ${
                    isSelected ? 'text-primary' : 'text-foreground'
                  }`}
                >
                  {opt.label}
                </span>
                {isSelected && (
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                    <Icon name="check" size="xs" />
                  </span>
                )}
              </div>
              <span className="mt-1.5 text-[11px] text-muted-foreground">{opt.subLabel}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
