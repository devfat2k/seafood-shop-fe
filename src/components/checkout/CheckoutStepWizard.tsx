'use client';

import { Icon } from '@/components/common/Icon';

type CheckoutStepWizardProps = {
  currentStep: 1 | 2 | 3;
  onStepClick: (step: 1 | 2 | 3) => void;
};

const STEPS = [
  { id: 1 as const, label: 'Địa chỉ nhận hàng', icon: 'map-pin' as const },
  { id: 2 as const, label: 'Phương thức thanh toán', icon: 'credit-card' as const },
  { id: 3 as const, label: 'Xác nhận đơn hàng', icon: 'check-circle' as const },
];

const getBadgeClass = (isCompleted: boolean, isCurrent: boolean) => {
  if (isCompleted) {
    return 'bg-tertiary text-white shadow-sm';
  }
  if (isCurrent) {
    return 'bg-secondary text-white shadow-md shadow-secondary/20 ring-4 ring-secondary/15';
  }
  return 'bg-muted text-muted-foreground';
};

const getLabelClass = (isCompleted: boolean, isCurrent: boolean) => {
  if (isCurrent) {
    return 'text-foreground';
  }
  if (isCompleted) {
    return 'text-foreground/80';
  }
  return 'text-muted-foreground';
};

export const CheckoutStepWizard = ({ currentStep, onStepClick }: CheckoutStepWizardProps) => (
  <div className="mb-8 rounded-3xl border border-border/80 bg-card p-4 shadow-sm sm:p-6">
    <div className="flex items-center justify-between">
      {STEPS.map((step, idx) => {
        const isCompleted = currentStep > step.id;
        const isCurrent = currentStep === step.id;
        const isClickable = currentStep > step.id;

        return (
          <div key={step.id} className="flex flex-1 items-center">
            <button
              type="button"
              disabled={!isClickable}
              onClick={() => {
                if (isClickable) {
                  onStepClick(step.id);
                }
              }}
              className={`flex items-center gap-2.5 text-left transition-all ${
                isClickable ? 'cursor-pointer hover:opacity-80' : 'cursor-default'
              }`}
            >
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl text-xs font-bold transition-all duration-300 sm:h-10 sm:w-10 sm:text-sm ${getBadgeClass(
                  isCompleted,
                  isCurrent,
                )}`}
              >
                {isCompleted ? <Icon name="check" size="xs" /> : <span>0{step.id}</span>}
              </div>

              <div className="hidden md:block">
                <span className="block text-[10px] font-bold text-muted-foreground uppercase">
                  Bước 0{step.id}
                </span>
                <span
                  className={`block text-xs font-bold ${getLabelClass(isCompleted, isCurrent)}`}
                >
                  {step.label}
                </span>
              </div>
            </button>

            {idx < STEPS.length - 1 && (
              <div className="mx-3 h-0.5 flex-1 rounded-full bg-border/80 sm:mx-6">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    currentStep > step.id ? 'w-full bg-tertiary' : 'w-0 bg-transparent'
                  }`}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  </div>
);
