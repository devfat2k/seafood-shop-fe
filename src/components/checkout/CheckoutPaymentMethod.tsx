'use client';

import { Icon } from '@/components/common/Icon';
import type { PaymentMethod } from '@/types/payment';

type CheckoutPaymentMethodProps = {
  selectedMethod: PaymentMethod;
  onSelectMethod: (method: PaymentMethod) => void;
};

const PAYMENT_OPTIONS: {
  id: PaymentMethod;
  name: string;
  badge?: string;
  description: string;
  icon: 'credit-card' | 'shield-check' | 'shopping-bag' | 'sparkles';
}[] = [
  {
    id: 'VNPAY',
    name: 'Cổng VNPAY (QR Pay / Thẻ ATM / Visa Master)',
    badge: 'Khuyên Dùng',
    description: 'Thanh toán trực tuyến bảo mật, quét mã QR ngân hàng hoặc ví điện tử',
    icon: 'credit-card',
  },
  {
    id: 'COD',
    name: 'Thanh toán tiền mặt khi nhận hàng (COD)',
    description: 'Kiểm tra độ tươi sống của hải sản và đóng thùng oxy trước khi thanh toán',
    icon: 'shield-check',
  },
  {
    id: 'MOMO',
    name: 'Ví MoMo',
    description: 'Thanh toán qua ứng dụng Ví điện tử MoMo',
    icon: 'sparkles',
  },
  {
    id: 'ZALOPAY',
    name: 'Ví ZaloPay',
    description: 'Thanh toán bảo mật nhanh chóng qua ZaloPay',
    icon: 'shopping-bag',
  },
];

export function CheckoutPaymentMethod({
  selectedMethod,
  onSelectMethod,
}: CheckoutPaymentMethodProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
      <div className="flex items-center gap-2 border-b border-border pb-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary/15 text-secondary">
          <Icon name="credit-card" size="sm" />
        </div>
        <div>
          <h2 className="font-heading text-base font-bold text-foreground">
            Phương Thức Thanh Toán
          </h2>
          <p className="text-[11px] text-muted-foreground">
            Lựa chọn phương thức thanh toán thuận tiện và an toàn nhất
          </p>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {PAYMENT_OPTIONS.map((opt) => {
          const isSelected = selectedMethod === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              aria-label={opt.name}
              onClick={() => {
                onSelectMethod(opt.id);
              }}
              className={`w-full cursor-pointer rounded-xl border p-4 text-left transition-all ${
                isSelected
                  ? 'border-secondary bg-secondary/5 ring-1 ring-secondary'
                  : 'border-border bg-background hover:border-muted-foreground/30'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div
                    className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
                      isSelected ? 'bg-secondary text-white' : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    <Icon name={opt.icon} size="xs" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-foreground sm:text-sm">
                        {opt.name}
                      </span>
                      {opt.badge && (
                        <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-bold text-accent">
                          {opt.badge}
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">{opt.description}</p>
                  </div>
                </div>

                <div className="pt-1">
                  <input
                    type="radio"
                    checked={isSelected}
                    onChange={() => {
                      onSelectMethod(opt.id);
                    }}
                    aria-label={opt.name}
                    className="h-4 w-4 text-secondary focus:ring-secondary"
                  />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
