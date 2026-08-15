'use client';

import { useState } from 'react';
import { Icon } from '@/components/common/Icon';
import type { DeliveryStep, OrderResponse } from '@/types/order';

function getStepClassName(step: DeliveryStep): string {
  if (step.current) {
    return 'bg-[#1E3A8A] text-white ring-4 ring-[#1E3A8A]/20';
  }
  if (step.completed) {
    return 'bg-[#16A34A] text-white';
  }
  return 'border border-[#E2E8F0] bg-white text-text-secondary';
}

type AccountOrdersTabProps = {
  orders?: OrderResponse[];
};

export function AccountOrdersTab(props: AccountOrdersTabProps) {
  const { orders = [] } = props;
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [activeMessage, setActiveMessage] = useState<string | null>(null);

  const filteredOrders = orders.filter((order) => {
    if (filterStatus === 'ALL') {
      return true;
    }
    return order.status === filterStatus;
  });

  const showNotification = (msg: string) => {
    setActiveMessage(msg);
    setTimeout(() => {
      setActiveMessage(null);
    }, 3000);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header & Status Filter Pills */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0F172A]">Đơn Hàng Của Tôi</h1>
          <p className="mt-1 text-xs text-text-secondary">
            Quản lý và theo dõi tiến trình vận chuyển đơn hàng hải sản của bạn.
          </p>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 rounded-full border border-[#E2E8F0] bg-[#F8FAFC] p-1.5">
          {[
            { id: 'ALL', label: 'Tất cả' },
            { id: 'PENDING', label: 'Chờ xử lý' },
            { id: 'DELIVERING', label: 'Đang giao' },
            { id: 'COMPLETED', label: 'Đã hoàn tất' },
            { id: 'CANCELLED', label: 'Đã hủy' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setFilterStatus(tab.id);
              }}
              className={`rounded-full px-4 py-1.5 text-xs font-bold transition-colors ${
                filterStatus === tab.id
                  ? 'bg-[#1E3A8A] text-white'
                  : 'text-text-secondary hover:text-[#0F172A]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeMessage && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-3 text-xs font-bold text-emerald-800">
          {activeMessage}
        </div>
      )}

      {/* Empty Orders State */}
      {filteredOrders.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-[#E2E8F0] bg-white py-16 text-center shadow-sm">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F1F5F9] text-text-secondary">
            <Icon name="shopping-bag" size="xl" />
          </div>
          <p className="mt-4 text-base font-bold text-[#0F172A]">Chưa có đơn hàng nào</p>
          <p className="mt-1 text-xs text-text-secondary">
            Hãy khám phá hải sản tươi ngon và đặt đơn hàng đầu tiên nhé!
          </p>
        </div>
      ) : (
        /* Orders List */
        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-sm transition-all hover:shadow-md"
            >
              {/* Order Card Header */}
              <div className="flex flex-wrap items-center justify-between border-b border-[#E2E8F0] pb-4">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-base font-extrabold text-[#0F172A]">{order.code}</h3>
                    <span
                      className={`rounded-full px-3 py-0.5 text-[10px] font-bold ${
                        order.statusBadgeColor ?? 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      ● {order.statusText ?? order.status}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-text-secondary">{order.orderDate}</p>
                </div>

                <div className="text-right">
                  <span className="text-xs text-text-secondary">Tổng thanh toán:</span>
                  <p className="text-xl font-extrabold text-[#F97316]">
                    {order.totalPrice.toLocaleString('vi-VN')}đ
                  </p>
                </div>
              </div>

              {/* Order Items */}
              <div className="divide-y divide-[#E2E8F0]/60 py-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-4">
                      {item.imageUrl && (
                        <img
                          src={item.imageUrl}
                          alt={item.productName}
                          className="h-14 w-14 rounded-2xl border border-[#E2E8F0] object-cover"
                        />
                      )}
                      <div>
                        <h4 className="text-sm font-bold text-[#0F172A]">{item.productName}</h4>
                        {item.spec && (
                          <p className="mt-1 text-xs text-text-secondary">{item.spec}</p>
                        )}
                      </div>
                    </div>
                    <span className="text-sm font-bold text-[#0F172A]">
                      {item.price.toLocaleString('vi-VN')}đ
                    </span>
                  </div>
                ))}
              </div>

              {/* Tiến Trình Đơn Hàng Real-time Tracker */}
              {order.deliveryTimeline && order.deliveryTimeline.length > 0 && (
                <div className="my-4 rounded-2xl bg-[#F8FAFC] p-5">
                  <h4 className="flex items-center gap-2 text-xs font-bold text-[#0F172A]">
                    <span>⚡ Tiến Trình Đơn Hàng Real-time:</span>
                  </h4>

                  <div className="mt-6 grid grid-cols-4 gap-2 text-center">
                    {order.deliveryTimeline.map((step, idx) => (
                      <div key={idx} className="relative flex flex-col items-center">
                        <div
                          className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold shadow-sm ${getStepClassName(
                            step,
                          )}`}
                        >
                          {step.completed ? <Icon name="check" size="xs" /> : idx + 1}
                        </div>
                        <span className="mt-2 text-xs font-bold text-[#0F172A]">{step.title}</span>
                        <span className="mt-0.5 text-[10px] text-text-secondary">{step.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Order Action Buttons */}
              <div className="mt-4 flex flex-wrap items-center justify-end gap-3 pt-2">
                {order.status === 'SHIPPED' && order.shipperPhone && (
                  <button
                    type="button"
                    onClick={() => {
                      showNotification(`Đang kết nối tới shipper: ${order.shipperPhone}`);
                    }}
                    className="inline-flex items-center gap-2 rounded-full border border-[#E2E8F0] bg-white px-5 py-2.5 text-xs font-bold text-[#0F172A] shadow-sm hover:bg-[#EDF2F7]"
                  >
                    <Icon name="phone" size="xs" />
                    <span>Liên hệ shipper</span>
                  </button>
                )}

                {order.status === 'DONE' && (
                  <button
                    type="button"
                    onClick={() => {
                      showNotification('Đã thêm toàn bộ sản phẩm của đơn hàng vào giỏ hàng.');
                    }}
                    className="inline-flex items-center gap-2 rounded-full bg-[#1E3A8A] px-6 py-2.5 text-xs font-bold text-white shadow hover:bg-[#172554]"
                  >
                    <Icon name="shopping-bag" size="xs" />
                    <span>Mua lại đơn này</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
