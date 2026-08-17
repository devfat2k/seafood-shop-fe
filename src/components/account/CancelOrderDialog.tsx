'use client';

import { Icon } from '@/components/common/Icon';
import type { OrderResponse } from '@/types/order';

type CancelOrderDialogProps = {
  order: OrderResponse | null;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  isCancelling: boolean;
};

export function CancelOrderDialog({
  order,
  onClose,
  onConfirm,
  isCancelling,
}: CancelOrderDialogProps) {
  if (!order) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        className="fixed inset-0 animate-in cursor-default bg-black/60 backdrop-blur-xs transition-opacity fade-in"
        onClick={onClose}
        aria-label="Đóng dialog"
      />

      <div className="relative w-full max-w-md animate-in rounded-2xl border border-border bg-card p-6 shadow-2xl zoom-in-95">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-destructive/15 text-destructive">
            <Icon name="alert-triangle" size="sm" />
          </div>
          <div>
            <h3 className="font-heading text-base font-bold text-foreground">
              Xác Nhận Hủy Đơn Hàng?
            </h3>
            <p className="text-xs text-muted-foreground">
              Đơn hàng #{order.code || order.id} sẽ bị hủy và không thể khôi phục.
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3 border-t border-border pt-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-border px-4 py-2 text-xs font-semibold text-foreground hover:bg-muted"
          >
            Giữ đơn hàng
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isCancelling}
            className="rounded-xl bg-destructive px-5 py-2 text-xs font-bold text-white shadow-sm hover:bg-destructive/90 disabled:opacity-50"
          >
            {isCancelling ? 'Đang hủy...' : 'Đồng ý hủy'}
          </button>
        </div>
      </div>
    </div>
  );
}
