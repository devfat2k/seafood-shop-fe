'use client';

import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { CancelOrderDialog } from '@/components/account/CancelOrderDialog';
import { OrderCard } from '@/components/account/OrderCard';
import { OrdersSkeleton } from '@/components/account/OrdersSkeleton';
import { OrderTrackingModal } from '@/components/account/OrderTrackingModal';
import { Icon } from '@/components/common/Icon';
import { Link } from '@/libs/I18nNavigation';
import { useCancelOrderMutation, useMyOrdersQuery } from '@/libs/queries/orders';
import type { OrderResponse, OrderStatus } from '@/types/order';

const ORDER_TABS: { key: string; label: string; status?: OrderStatus }[] = [
  { key: 'ALL', label: 'Tất cả đơn' },
  { key: 'PENDING', label: 'Chờ xử lý', status: 'PENDING' },
  { key: 'CONFIRMED', label: 'Đã xác nhận', status: 'CONFIRMED' },
  { key: 'SHIPPED', label: 'Đang giao hàng', status: 'SHIPPED' },
  { key: 'DONE', label: 'Hoàn tất', status: 'DONE' },
  { key: 'CANCELLED', label: 'Đã hủy', status: 'CANCELLED' },
];

export function AccountOrdersTab() {
  const [activeTab, setActiveTab] = useState('ALL');
  const [selectedOrder, setSelectedOrder] = useState<OrderResponse | null>(null);
  const [cancelTargetOrder, setCancelTargetOrder] = useState<OrderResponse | null>(null);

  const { data: ordersPage, isLoading, isError, refetch } = useMyOrdersQuery(0, 50);
  const cancelOrderMutation = useCancelOrderMutation();

  const orders = useMemo(() => ordersPage?.content ?? [], [ordersPage]);

  const filteredOrders = useMemo(() => {
    if (activeTab === 'ALL') {
      return orders;
    }
    return orders.filter((o) => o.status === activeTab);
  }, [activeTab, orders]);

  const handleConfirmCancel = async () => {
    if (!cancelTargetOrder) {
      return;
    }
    try {
      await cancelOrderMutation.mutateAsync(cancelTargetOrder.id);
      toast.success(
        `Đã hủy thành công đơn hàng #${cancelTargetOrder.code || cancelTargetOrder.id}`,
      );
      setCancelTargetOrder(null);
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Hủy đơn hàng thất bại';
      toast.error(msg);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return <OrdersSkeleton />;
    }
    if (isError) {
      return (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-destructive/30 bg-destructive/5 py-12 text-center">
          <Icon name="alert-circle" size="lg" className="text-destructive" />
          <p className="mt-3 text-sm font-semibold text-destructive">
            Không thể tải danh sách đơn hàng
          </p>
          <button
            type="button"
            onClick={() => {
              void refetch();
            }}
            className="mt-3 rounded-lg bg-card px-4 py-1.5 text-xs font-bold text-foreground shadow-xs hover:bg-muted"
          >
            Thử lại
          </button>
        </div>
      );
    }
    if (filteredOrders.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card py-16 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary/15 text-secondary">
            <Icon name="shopping-bag" size="lg" />
          </div>
          <h3 className="mt-4 font-heading text-base font-bold text-foreground">
            Chưa có đơn hàng nào
          </h3>
          <p className="mt-1 max-w-sm text-xs text-muted-foreground">
            Bạn chưa có đơn hàng nào ở trạng thái này. Khám phá các loại hải sản tươi sống và đặt
            hàng ngay!
          </p>
          <Link
            href="/products"
            className="mt-5 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:opacity-90"
          >
            Mua Sắm Ngay
          </Link>
        </div>
      );
    }
    return (
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            onOpenTracking={(ord) => {
              setSelectedOrder(ord);
            }}
            onOpenCancel={(ord) => {
              setCancelTargetOrder(ord);
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="font-heading text-lg font-bold text-foreground sm:text-xl">
          Đơn Hàng Của Tôi
        </h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Theo dõi hành trình mẻ hải sản tươi sống giao nhanh hỏa tốc 2H tận cửa
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-border pb-3">
        {ORDER_TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => {
              setActiveTab(tab.key);
            }}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition-colors ${
              activeTab === tab.key
                ? 'bg-primary text-white shadow-xs'
                : 'bg-card text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 3 UI States */}
      {renderContent()}

      {/* Tracking Modal */}
      <OrderTrackingModal
        order={selectedOrder}
        onClose={() => {
          setSelectedOrder(null);
        }}
      />

      {/* Cancel Confirmation Dialog */}
      <CancelOrderDialog
        order={cancelTargetOrder}
        onClose={() => {
          setCancelTargetOrder(null);
        }}
        onConfirm={handleConfirmCancel}
        isCancelling={cancelOrderMutation.isPending}
      />
    </div>
  );
}
