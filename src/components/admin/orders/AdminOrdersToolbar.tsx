'use client';

import { Button } from '@/components/ui/button';
import type { AdminOrderStatus } from '@/types/admin';

export const STATUS_OPTIONS: { value: AdminOrderStatus; label: string; color: string }[] = [
  { value: 'PENDING', label: 'Chờ xác nhận', color: 'bg-amber-100 text-amber-800' },
  { value: 'CONFIRMED', label: 'Đã xác nhận', color: 'bg-blue-100 text-blue-800' },
  { value: 'SHIPPED', label: 'Đang giao', color: 'bg-purple-100 text-purple-800' },
  { value: 'DONE', label: 'Hoàn tất', color: 'bg-emerald-100 text-emerald-800' },
  { value: 'CANCELLED', label: 'Đã hủy', color: 'bg-red-100 text-red-800' },
];

export const getStatusBadge = (status: string) => {
  const found = STATUS_OPTIONS.find((s) => s.value === status);
  return found ?? { label: status, color: 'bg-muted text-muted-foreground' };
};

type AdminOrdersToolbarProps = {
  statusFilter?: AdminOrderStatus;
  onSelectStatus: (status?: AdminOrderStatus) => void;
};

export const AdminOrdersToolbar = ({ statusFilter, onSelectStatus }: AdminOrdersToolbarProps) => (
  <div className="flex flex-wrap items-center gap-2">
    <Button
      size="sm"
      variant={statusFilter === undefined ? 'default' : 'outline'}
      onClick={() => {
        onSelectStatus();
      }}
      className="text-xs"
    >
      Tất cả
    </Button>
    {STATUS_OPTIONS.map((s) => (
      <Button
        key={s.value}
        size="sm"
        variant={statusFilter === s.value ? 'default' : 'outline'}
        onClick={() => {
          onSelectStatus(s.value);
        }}
        className="text-xs"
      >
        {s.label}
      </Button>
    ))}
  </div>
);
