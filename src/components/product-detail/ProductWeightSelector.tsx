'use client';

export type WeightOption = {
  id: string;
  label: string;
  subLabel: string;
  price: number;
  originalPrice: number;
  stock: number;
  disabled?: boolean;
};

function getWeightButtonClass(isSelected: boolean, isDisabled?: boolean): string {
  if (isSelected) {
    return 'border-2 border-primary bg-card font-bold text-foreground shadow-xs';
  }
  if (isDisabled) {
    return 'cursor-not-allowed border border-border bg-muted/50 text-muted-foreground';
  }
  return 'border border-border bg-card text-foreground hover:border-secondary';
}

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
    <div>
      <span className="block text-xs font-bold text-foreground">Chọn Quy Cách / Trọng Lượng:</span>
      <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
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
              className={`flex flex-col items-start rounded-xl p-2.5 text-left transition-all ${getWeightButtonClass(
                isSelected,
                opt.disabled,
              )}`}
            >
              <span className="text-xs font-bold">{opt.label}</span>
              <span className="mt-0.5 text-[10px] text-muted-foreground">{opt.subLabel}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
