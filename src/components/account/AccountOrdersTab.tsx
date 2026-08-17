'use client';

import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'sonner';
import { Icon } from '@/components/common/Icon';
import { Link } from '@/libs/I18nNavigation';
import { useCancelOrderMutation, useMyOrdersQuery } from '@/libs/queries/orders';
import type { DeliveryStep, OrderResponse, OrderStatus } from '@/types/order';

function getStepCircleClass(isDone: boolean, isCurrent?: boolean) {
  if (isDone) {
    return 'bg-tertiary text-white';
  }
  if (isCurrent) {
    return 'animate-pulse bg-secondary text-white ring-4 ring-secondary/20';
  }
  return 'border border-border bg-card text-muted-foreground';
}

function getStatusBadge(status: OrderStatus) {
  switch (status) {
    case 'SHIPPED': {
      return {
        label: 'Đang giao 2H',
        className: 'bg-secondary/15 text-secondary border-secondary/30',
        icon: 'truck',
      };
    }
    case 'DONE': {
      return {
        label: 'Giao thành công',
        className: 'bg-tertiary/15 text-tertiary border-tertiary/30',
        icon: 'check',
      };
    }
    case 'CONFIRMED': {
      return {
        label: 'Đã xác nhận',
        className: 'bg-secondary/15 text-secondary border-secondary/30',
        icon: 'check',
      };
    }
    case 'PENDING': {
      return {
        label: 'Chờ xử lý',
        className: 'bg-accent/15 text-accent border-accent/30',
        icon: 'clock',
      };
    }
    case 'CANCELLED': {
      return {
        label: 'Đã hủy',
        className: 'bg-destructive/15 text-destructive border-destructive/30',
        icon: 'x',
      };
    }
    default: {
      return {
        label: status,
        className: 'bg-muted text-muted-foreground border-border',
        icon: 'shopping-bag',
      };
    }
  }
}

function OrdersLoadingSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2].map((i) => (
        <div
          key={i}
          className="animate-pulse rounded-2xl border border-border bg-card p-6 shadow-sm"
        >
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div className="h-5 w-32 rounded-lg bg-muted" />
            <div className="h-5 w-24 rounded-full bg-muted" />
          </div>
          <div className="my-4 h-16 rounded-xl bg-muted/60" />
          <div className="flex items-center justify-between border-t border-border pt-4">
            <div className="h-6 w-36 rounded-lg bg-muted" />
            <div className="h-9 w-24 rounded-xl bg-muted" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function AccountOrdersTab() {
  const [page, setPage] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');
  const [cancellingOrderId, setCancellingOrderId] = useState<number | string | null>(null);

  const { data: pageData, isLoading, isError, refetch } = useMyOrdersQuery(page, 10);
  const cancelOrderMutation = useCancelOrderMutation();

  const orders: OrderResponse[] = pageData?.content ?? [];

  const filteredOrders =
    selectedFilter === 'ALL' ? orders : orders.filter((o) => o.status === selectedFilter);

  const filterTabs: { id: string; label: string; count: number }[] = [
    { id: 'ALL', label: 'Tất cả', count: orders.length },
    {
      id: 'PENDING',
      label: 'Chờ xử lý',
      count: orders.filter((o) => o.status === 'PENDING').length,
    },
    {
      id: 'CONFIRMED',
      label: 'Đã xác nhận',
      count: orders.filter((o) => o.status === 'CONFIRMED').length,
    },
    {
      id: 'SHIPPED',
      label: 'Đang giao',
      count: orders.filter((o) => o.status === 'SHIPPED').length,
    },
    {
      id: 'DONE',
      label: 'Hoàn tất',
      count: orders.filter((o) => o.status === 'DONE').length,
    },
    {
      id: 'CANCELLED',
      label: 'Đã hủy',
      count: orders.filter((o) => o.status === 'CANCELLED').length,
    },
  ];

  const handleCancelOrder = async (orderId: number | string) => {
    try {
      await cancelOrderMutation.mutateAsync(orderId);
      toast.success('Hủy đơn hàng thành công!');
      setCancellingOrderId(null);
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Hủy đơn hàng thất bại';
      toast.error(msg);
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Header & Filter Bar */}
      <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-6">
        <div className="flex flex-col gap-4 border-b border-border pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-heading text-xl font-bold text-foreground sm:text-2xl">
              Đơn Hàng Của Tôi
            </h1>
            <p className="text-xs text-muted-foreground">
              Theo dõi lộ trình giao hàng hải sản tươi sống và lịch sử mua sắm.
            </p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="mt-4 flex flex-wrap gap-2">
          {filterTabs.map((tab) => {
            const isActive = selectedFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setSelectedFilter(tab.id);
                }}
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-xs'
                    : 'border border-border bg-background text-muted-foreground hover:border-secondary/40 hover:text-foreground'
                }`}
              >
                <span>{tab.label}</span>
                {tab.count > 0 && (
                  <span
                    className={`py-0.2 rounded-full px-1.5 text-[10px] ${
                      isActive ? 'bg-white/20 text-white' : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Loading State */}
      {isLoading && <OrdersLoadingSkeleton />}

      {/* 3. Error State */}
      {isError && (
        <div className="rounded-2xl border border-destructive/30 bg-destructive/10 p-8 text-center shadow-sm">
          <p className="text-xs font-bold text-destructive">
            Không thể tải danh sách đơn hàng lúc này.
          </p>
          <button
            type="button"
            onClick={() => {
              void refetch();
            }}
            className="mt-4 rounded-xl bg-destructive px-5 py-2 text-xs font-bold text-white shadow-xs hover:bg-destructive/90"
          >
            Thử lại
          </button>
        </div>
      )}

      {/* 4. Empty State */}
      {!isLoading && !isError && filteredOrders.length === 0 && (
        <div className="rounded-2xl border border-border bg-card p-12 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <Icon name="shopping-bag" size="lg" />
          </div>
          <h3 className="mt-4 font-heading text-lg font-bold text-foreground">
            Chưa có đơn hàng nào
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Khám phá ngay các món hải sản tươi ngon hôm nay và đặt đơn đầu tiên!
          </p>
          <Link
            href="/products"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-xs font-bold text-primary-foreground shadow-md transition-all hover:bg-primary/90"
          >
            <span>Khám phá sản phẩm ngay</span>
            <Icon name="arrow-right" size="sm" />
          </Link>
        </div>
      )}

      {/* 5. Orders List */}
      {!isLoading && !isError && filteredOrders.length > 0 && (
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const badge = getStatusBadge(order.status);

            return (
              <div
                key={order.id}
                className="overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:border-secondary/40 sm:p-6"
              >
                {/* Order Top Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm font-bold text-foreground">
                      #{order.code}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${badge.className}`}
                    >
                      <Icon name={badge.icon} size="xs" />
                      <span>{badge.label}</span>
                    </span>
                  </div>

                  <span className="text-xs text-muted-foreground">
                    Thời gian đặt: {order.orderDate}
                  </span>
                </div>

                {/* Delivery Step Progress Line */}
                {order.deliveryTimeline && order.deliveryTimeline.length > 0 && (
                  <div className="my-4 rounded-xl border border-border/60 bg-background p-4">
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {order.deliveryTimeline.map((step: DeliveryStep, idx: number) => {
                        const isDone = step.completed;
                        const isCurrent = step.current;

                        return (
                          <div key={idx} className="flex items-center gap-2.5">
                            <div
                              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${getStepCircleClass(
                                isDone,
                                isCurrent,
                              )}`}
                            >
                              {isDone ? <Icon name="check" size="xs" /> : idx + 1}
                            </div>
                            <div className="min-w-0">
                              <p className="truncate text-xs font-bold text-foreground">
                                {step.title}
                              </p>
                              {step.time && (
                                <p className="text-[10px] text-muted-foreground">{step.time}</p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Items List */}
                <div className="divide-y divide-border/60 py-2">
                  {order.items?.map((item) => (
                    <div key={item.id} className="flex items-center justify-between py-3">
                      <div className="flex items-center gap-3.5">
                        {item.imageUrl && (
                          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-border bg-background">
                            <Image
                              src={item.imageUrl}
                              alt={item.productName}
                              fill
                              unoptimized
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div>
                          <h4 className="font-sans text-xs font-bold text-foreground sm:text-sm">
                            {item.productName}
                          </h4>
                          {item.spec && (
                            <p className="mt-0.5 text-[11px] text-muted-foreground">{item.spec}</p>
                          )}
                          <p className="mt-1 text-xs text-muted-foreground">
                            Số lượng:{' '}
                            <span className="font-bold text-foreground">{item.quantity}</span>
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="font-sans text-xs font-bold text-primary sm:text-sm">
                          {(item.price * item.quantity).toLocaleString('vi-VN')}₫
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Footer & Actions */}
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
                  <div>
                    <span className="text-xs text-muted-foreground">Tổng tiền thanh toán: </span>
                    <span className="font-sans text-base font-bold text-primary sm:text-lg">
                      {order.totalPrice.toLocaleString('vi-VN')}₫
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {order.status === 'PENDING' && (
                      <button
                        type="button"
                        onClick={() => {
                          setCancellingOrderId(order.id);
                        }}
                        className="rounded-xl border border-destructive/40 bg-background px-4 py-2 text-xs font-bold text-destructive transition-colors hover:bg-destructive/10"
                      >
                        Hủy đơn
                      </button>
                    )}
                    <Link
                      href={`/orders/${order.id}`}
                      className="rounded-xl border border-border bg-background px-4 py-2 text-xs font-bold text-foreground transition-colors hover:border-secondary/40 hover:bg-muted"
                    >
                      Chi tiết
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Pagination Controls */}
          {pageData && pageData.totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-4">
              <button
                type="button"
                disabled={page === 0}
                onClick={() => {
                  setPage((p) => Math.max(p - 1, 0));
                }}
                className="rounded-xl border border-border bg-card px-3 py-1.5 text-xs font-bold text-foreground disabled:opacity-40"
              >
                Trang trước
              </button>
              <span className="text-xs text-muted-foreground">
                Trang {page + 1} / {pageData.totalPages}
              </span>
              <button
                type="button"
                disabled={pageData.last}
                onClick={() => {
                  setPage((p) => p + 1);
                }}
                className="rounded-xl border border-border bg-card px-3 py-1.5 text-xs font-bold text-foreground disabled:opacity-40"
              >
                Trang sau
              </button>
            </div>
          )}
        </div>
      )}

      {/* Modal Confirm Cancel Order */}
      {cancellingOrderId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="Đóng modal"
            onClick={() => {
              setCancellingOrderId(null);
            }}
            className="fixed inset-0 border-none bg-black/60 backdrop-blur-xs outline-none"
          />
          <div className="relative z-10 w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-2xl">
            <h3 className="font-heading text-lg font-bold text-foreground">
              Xác Nhận Hủy Đơn Hàng?
            </h3>
            <p className="mt-2 text-xs text-muted-foreground">
              Bạn có chắc chắn muốn hủy đơn hàng này không? Thao tác này không thể hoàn tác.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setCancellingOrderId(null);
                }}
                className="rounded-xl border border-border bg-background px-4 py-2 text-xs font-bold text-foreground hover:bg-muted"
              >
                Không, giữ đơn
              </button>
              <button
                type="button"
                disabled={cancelOrderMutation.isPending}
                onClick={() => {
                  void handleCancelOrder(cancellingOrderId);
                }}
                className="rounded-xl bg-destructive px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-destructive/90 disabled:opacity-50"
              >
                {cancelOrderMutation.isPending ? 'Đang hủy...' : 'Đồng ý hủy đơn'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
