'use client';

import { Icon } from '@/components/common/Icon';
import type { OrderStatus } from '@/types/order';

type StepItem = {
  step: number;
  title: string;
  description: string;
  done: boolean;
  current?: boolean;
};

const DEFAULT_STEPS: StepItem[] = [
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

export function OrderTrackingTimeline({ status }: { status: OrderStatus }) {
  if (status === 'CANCELLED') {
    return null;
  }

  const steps = DEFAULT_STEPS.map((step) => {
    if (status === 'DONE') {
      return { ...step, done: true, current: false };
    }
    if (status === 'SHIPPED') {
      return { ...step, done: step.step <= 2, current: step.step === 3 };
    }
    if (status === 'CONFIRMED') {
      return { ...step, done: step.step === 1, current: step.step === 2 };
    }
    if (status === 'PENDING') {
      return { ...step, done: false, current: step.step === 1 };
    }
    return step;
  });

  return (
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
                className={`text-xs font-bold ${s.current ? 'text-secondary' : 'text-foreground'}`}
              >
                {s.title}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">{s.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
