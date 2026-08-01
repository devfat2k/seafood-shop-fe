'use client';

import { useState } from 'react';
import { MOCK_ORDERS } from '@/data/account-mock';
import type { DeliveryStep } from '@/data/account-mock';

function getStepClassName(step: DeliveryStep): string {
  if (step.current) {
    return 'bg-[#0E3D34] text-white ring-4 ring-[#0E3D34]/20';
  }
  if (step.completed) {
    return 'bg-[#3F8F5F] text-white';
  }
  return 'border border-[#E4E0D8] bg-white text-[#5B6B63]';
}

export function AccountOrdersTab() {
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'PENDING' | 'DELIVERING' | 'COMPLETED'>(
    'ALL',
  );
  const [activeMessage, setActiveMessage] = useState<string | null>(null);

  const filteredOrders = MOCK_ORDERS.filter((order) => {
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
          <h1 className="text-2xl font-extrabold text-[#26312D]">Đơn Hàng Của Tôi</h1>
          <p className="mt-1 text-xs text-[#5B6B63]">
            Quản lý và theo dõi tiến trình vận chuyển đơn hàng hải sản của bạn.
          </p>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 rounded-full border border-[#E4E0D8] bg-[#FBF8F3] p-1.5">
          <button
            type="button"
            onClick={() => {
              setFilterStatus('ALL');
            }}
            className={`rounded-full px-4 py-1.5 text-xs font-bold transition-colors ${
              filterStatus === 'ALL'
                ? 'bg-[#0E3D34] text-white'
                : 'text-[#5B6B63] hover:text-[#26312D]'
            }`}
          >
            Tất cả
          </button>
          <button
            type="button"
            onClick={() => {
              setFilterStatus('PENDING');
            }}
            className={`rounded-full px-4 py-1.5 text-xs font-bold transition-colors ${
              filterStatus === 'PENDING'
                ? 'bg-[#0E3D34] text-white'
                : 'text-[#5B6B63] hover:text-[#26312D]'
            }`}
          >
            Chờ xử lý
          </button>
          <button
            type="button"
            onClick={() => {
              setFilterStatus('DELIVERING');
            }}
            className={`rounded-full px-4 py-1.5 text-xs font-bold transition-colors ${
              filterStatus === 'DELIVERING'
                ? 'bg-[#0E3D34] text-white'
                : 'text-[#5B6B63] hover:text-[#26312D]'
            }`}
          >
            Đang giao
          </button>
          <button
            type="button"
            onClick={() => {
              setFilterStatus('COMPLETED');
            }}
            className={`rounded-full px-4 py-1.5 text-xs font-bold transition-colors ${
              filterStatus === 'COMPLETED'
                ? 'bg-[#0E3D34] text-white'
                : 'text-[#5B6B63] hover:text-[#26312D]'
            }`}
          >
            Đã hoàn tất
          </button>
        </div>
      </div>

      {activeMessage && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-3 text-xs font-bold text-emerald-800">
          {activeMessage}
        </div>
      )}

      {/* Orders List */}
      <div className="space-y-6">
        {filteredOrders.map((order) => (
          <div
            key={order.id}
            className="rounded-3xl border border-[#E4E0D8] bg-white p-6 shadow-sm transition-all hover:shadow-md"
          >
            {/* Order Card Header */}
            <div className="flex flex-wrap items-center justify-between border-b border-[#E4E0D8] pb-4">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-base font-extrabold text-[#26312D]">{order.code}</h3>
                  <span
                    className={`rounded-full px-3 py-0.5 text-[10px] font-bold ${order.statusBadgeColor}`}
                  >
                    ● {order.statusText}
                  </span>
                </div>
                <p className="mt-1 text-xs text-[#5B6B63]">{order.orderDate}</p>
              </div>

              <div className="text-right">
                <span className="text-xs text-[#5B6B63]">Tổng thanh toán:</span>
                <p className="text-xl font-extrabold text-[#D9A441]">
                  {order.totalPrice.toLocaleString('vi-VN')}đ
                </p>
              </div>
            </div>

            {/* Order Items */}
            <div className="divide-y divide-[#E4E0D8]/60 py-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-14 w-14 rounded-2xl border border-[#E4E0D8] object-cover"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-[#26312D]">{item.name}</h4>
                      <p className="mt-1 text-xs text-[#5B6B63]">{item.spec}</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-[#26312D]">
                    {item.price.toLocaleString('vi-VN')}đ
                  </span>
                </div>
              ))}
            </div>

            {/* Tiến Trình Đơn Hàng Real-time Tracker (Nếu đang giao) */}
            {order.deliveryTimeline && (
              <div className="my-4 rounded-2xl bg-[#FBF8F3] p-5">
                <h4 className="flex items-center gap-2 text-xs font-bold text-[#26312D]">
                  <span>⚡ Tiến Trình Đơn Hàng Real-time:</span>
                </h4>

                <div className="mt-6 grid grid-cols-4 gap-2 text-center">
                  {order.deliveryTimeline.map((step, idx) => (
                    <div key={idx} className="relative flex flex-col items-center">
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold shadow-sm ${getStepClassName(step)}`}
                      >
                        {step.completed ? '✓' : idx + 1}
                      </div>
                      <span className="mt-2 text-xs font-bold text-[#26312D]">{step.title}</span>
                      <span className="mt-0.5 text-[10px] text-[#5B6B63]">{step.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Order Action Buttons */}
            <div className="mt-4 flex flex-wrap items-center justify-end gap-3 pt-2">
              {order.status === 'DELIVERING' && (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      showNotification(`Đang kết nối tới shipper: ${order.shipperPhone}`);
                    }}
                    className="inline-flex items-center gap-2 rounded-full border border-[#E4E0D8] bg-white px-5 py-2.5 text-xs font-bold text-[#26312D] shadow-sm hover:bg-[#F5F1E8]"
                  >
                    <span>📞 Liên hệ shipper</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      showNotification('Đã mở bản đồ theo dõi định vị shipper real-time.');
                    }}
                    className="inline-flex items-center gap-2 rounded-full bg-[#0E3D34] px-6 py-2.5 text-xs font-bold text-white shadow hover:bg-[#0B2F28]"
                  >
                    <span>📍 Định vị đơn hàng</span>
                  </button>
                </>
              )}

              {order.status === 'COMPLETED' && (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      showNotification('Mở khung gửi đánh giá cho đơn hàng.');
                    }}
                    className="inline-flex items-center gap-2 rounded-full border border-[#E4E0D8] bg-white px-5 py-2.5 text-xs font-bold text-[#26312D] shadow-sm hover:bg-[#F5F1E8]"
                  >
                    <span>⭐ Viết đánh giá</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      showNotification('Đã thêm toàn bộ sản phẩm của đơn hàng vào giỏ hàng.');
                    }}
                    className="inline-flex items-center gap-2 rounded-full bg-[#0E3D34] px-6 py-2.5 text-xs font-bold text-white shadow hover:bg-[#0B2F28]"
                  >
                    <span>🔄 Mua lại đơn này</span>
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
