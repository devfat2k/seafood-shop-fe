'use client';

import { CheckoutAddressSection } from '@/components/checkout/CheckoutAddressSection';
import { CheckoutItemsSummary } from '@/components/checkout/CheckoutItemsSummary';
import { CheckoutPaymentMethod } from '@/components/checkout/CheckoutPaymentMethod';
import { Icon } from '@/components/common/Icon';
import type { CartItem } from '@/libs/stores/cart';
import type { PaymentMethod } from '@/types/payment';
import type { UserAddress } from '@/types/user';

type CheckoutStepContentProps = {
  currentStep: 1 | 2 | 3;
  selectedAddress: UserAddress | null;
  onSelectAddress: (addr: UserAddress) => void;
  note: string;
  onNoteChange: (val: string) => void;
  selectedMethod: PaymentMethod;
  onSelectMethod: (m: PaymentMethod) => void;
  items: CartItem[];
  onNextToPayment: () => void;
  onNextToConfirm: () => void;
  onStepChange: (step: 1 | 2 | 3) => void;
};

export function CheckoutStepContent({
  currentStep,
  selectedAddress,
  onSelectAddress,
  note,
  onNoteChange,
  selectedMethod,
  onSelectMethod,
  items,
  onNextToPayment,
  onNextToConfirm,
  onStepChange,
}: CheckoutStepContentProps) {
  if (currentStep === 1) {
    return (
      <div className="space-y-6">
        <CheckoutAddressSection
          selectedAddress={selectedAddress}
          onSelectAddress={onSelectAddress}
        />

        <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
          <label htmlFor="checkout-note" className="block text-xs font-bold text-foreground">
            Ghi chú giao nhận hải sản
          </label>
          <textarea
            id="checkout-note"
            aria-label="Ghi chú giao nhận hải sản"
            value={note}
            onChange={(e) => {
              onNoteChange(e.target.value);
            }}
            placeholder="Ví dụ: Giao trước 11h30 trưa, đóng thùng oxy, gọi trước 15 phút..."
            rows={2}
            className="mt-2 w-full rounded-xl border border-border bg-background p-3 text-xs text-foreground placeholder:text-muted-foreground focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={onNextToPayment}
            className="flex cursor-pointer items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-xs font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 active:scale-98 sm:text-sm"
          >
            <span>Tiếp tục: Chọn phương thức thanh toán</span>
            <Icon name="arrow-right" size="sm" />
          </button>
        </div>
      </div>
    );
  }

  if (currentStep === 2) {
    return (
      <div className="space-y-6">
        <CheckoutPaymentMethod selectedMethod={selectedMethod} onSelectMethod={onSelectMethod} />

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              onStepChange(1);
            }}
            className="flex cursor-pointer items-center gap-1.5 rounded-xl border border-border bg-card px-5 py-3 text-xs font-bold text-muted-foreground hover:text-foreground"
          >
            <Icon name="arrow-left" size="xs" />
            <span>Quay lại địa chỉ</span>
          </button>

          <button
            type="button"
            onClick={onNextToConfirm}
            className="flex cursor-pointer items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-xs font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 active:scale-98 sm:text-sm"
          >
            <span>Tiếp tục: Xác nhận đơn hàng</span>
            <Icon name="arrow-right" size="sm" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <CheckoutItemsSummary items={items} note={note} onNoteChange={onNoteChange} />

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => {
            onStepChange(2);
          }}
          className="flex cursor-pointer items-center gap-1.5 rounded-xl border border-border bg-card px-5 py-3 text-xs font-bold text-muted-foreground hover:text-foreground"
        >
          <Icon name="arrow-left" size="xs" />
          <span>Đổi phương thức thanh toán</span>
        </button>
      </div>
    </div>
  );
}
