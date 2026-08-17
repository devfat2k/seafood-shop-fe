'use client';

import Image from 'next/image';
import { Icon } from '@/components/common/Icon';
import type { OrderResponse } from '@/types/order';

type OrderTrackingModalProps = {
  order: OrderResponse | null;
  onClose: () => void;
};

type StepItem = {
  step: number;
  title: string;
  description: string;
  done: boolean;
  current?: boolean;
};

const defaultSteps: StepItem[] = [
  {
    step: 1,
    title: 'Đặt hàng thành công',
    description: 'Đơn hàng đã được tiếp nhận tại hệ thống cảng cá Phan Thiết',
    done: true,
  },
  {
    step: 2,
    title: 'Đã chuẩn bị & đóng gói oxy',
    description: 'Hải sản tươi sống đã được đóng gói chuyên dụng',
    done: true,
  },
  {
    step: 3,
    title: 'Đang giao hàng',
    description: 'Shipper đang giao hải sản đến địa chỉ của bạn',
    done: false,
    current: true,
  },
  {
    step: 4,
    title: 'Giao hàng thành công',
    description: 'Khách hàng nhận & kiểm tra hải sản trước khi thanh toán',
    done: false,
  },
];

function getStepBadgeStyle(s: StepItem): string {
  if (s.done) {
    return 'bg-tertiary text-white';
  }
  if (s.current) {
    return 'animate-pulse bg-secondary text-white ring-4 ring-secondary/20';
  }
  return 'border border-border bg-card text-muted-foreground';
}

export function OrderTrackingModal({ order, onClose }: OrderTrackingModalProps) {
  if (!order) {
    return null;
  }

  const steps = defaultSteps.map((step) => {
    if (order.status === 'DONE') {
      return { ...step, done: true, current: false };
    }
    if (order.status === 'SHIPPED') {
      return { ...step, done: step.step <= 2, current: step.step === 3 };
    }
    if (order.status === 'CONFIRMED') {
      return { ...step, done: step.step === 1, current: step.step === 2 };
    }
    if (order.status === 'PENDING') {
      return { ...step, done: false, current: step.step === 1 };
    }
    return step;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        className="fixed inset-0 animate-in cursor-default bg-black/60 backdrop-blur-xs transition-opacity fade-in"
        onClick={onClose}
        aria-label="Đóng modal"
      />

      <div className="relative max-h-[90vh] w-full max-w-2xl animate-in overflow-y-auto rounded-2xl border border-border bg-card p-6 shadow-2xl zoom-in-95 sm:p-8">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div>
            <span className="text-xs font-semibold text-secondary">Chi Tiết Đơn Hàng</span>
            <h3 className="font-heading text-lg font-bold text-foreground">
              #{order.code || `ORD-${order.id}`}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label="Đóng modal"
          >
            <Icon name="x" size="sm" />
          </button>
        </div>

        {/* 4-Step Progress Stepper */}
        {order.status !== 'CANCELLED' && (
          <div className="my-6 space-y-6">
            <h4 className="font-heading text-xs font-bold tracking-wider text-muted-foreground uppercase">
              Tiến Trình Giao Hàng
            </h4>
            <div className="relative space-y-6 pl-6 before:absolute before:top-2 before:bottom-2 before:left-2.5 before:w-0.5 before:bg-border">
              {steps.map((s) => (
                <div key={s.step} className="relative flex items-start gap-4">
                  <div
                    className={`absolute -left-6 flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${getStepBadgeStyle(s)}`}
                  >
                    {s.done ? <Icon name="check" size="xs" /> : s.step}
                  </div>
                  <div>
                    <p
                      className={`text-xs font-bold ${
                        s.current ? 'text-secondary' : 'text-foreground'
                      }`}
                    >
                      {s.title}
                    </p>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">{s.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Order Items List */}
        <div className="border-t border-border pt-4">
          <h4 className="font-heading text-xs font-bold tracking-wider text-muted-foreground uppercase">
            Danh Sách Sản Phẩm ({order.items?.length ?? 0})
          </h4>
          <div className="mt-3 divide-y divide-border/60">
            {(order.items ?? []).map((item) => (
              <div key={item.id} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  {item.imageUrl && (
                    <Image
                      src={item.imageUrl}
                      alt={item.productName}
                      width={48}
                      height={48}
                      unoptimized
                      className="h-12 w-12 rounded-lg border border-border object-cover"
                    />
                  )}
                  <div>
                    <p className="text-xs font-bold text-foreground">{item.productName}</p>
                    <p className="text-[11px] text-muted-foreground">
                      Số lượng: {item.quantity} x {item.price.toLocaleString('vi-VN')}₫
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-foreground">
                  {(item.price * item.quantity).toLocaleString('vi-VN')}₫
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
          <span className="text-xs text-muted-foreground">Tổng tiền thanh toán:</span>
          <span className="text-base font-bold text-primary sm:text-lg">
            {order.totalPrice.toLocaleString('vi-VN')}₫
          </span>
        </div>
      </div>
    </div>
  );
}
