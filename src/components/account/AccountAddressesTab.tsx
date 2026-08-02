"use client";

import { useState } from "react";
import { MOCK_ADDRESSES } from "@/data/account-mock";
import type { UserAddress } from "@/data/account-mock";

export function AccountAddressesTab() {
  const [addresses, setAddresses] = useState<UserAddress[]>(MOCK_ADDRESSES);
  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);

  const handleSetDefault = (id: string) => {
    setAddresses(
      addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      })),
    );
    setNotificationMsg("Đã thiết lập địa chỉ mặc định mới thành công.");
    setTimeout(() => {
      setNotificationMsg(null);
    }, 3000);
  };

  return (
    <div className="rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-sm sm:p-8">
      <div className="flex flex-col gap-4 border-b border-[#E2E8F0] pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0F172A]">
            Địa Chỉ Giao Hàng
          </h1>
          <p className="mt-1 text-xs text-text-secondary">
            Quản lý danh sách địa chỉ nhận hải sản tươi giao tận nhà.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setNotificationMsg("Mở form nhập địa chỉ giao hàng mới.");
            setTimeout(() => {
              setNotificationMsg(null);
            }, 3000);
          }}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1E3A8A] px-5 py-2.5 text-xs font-bold text-white shadow hover:bg-[#172554]"
        >
          <span>+ Thêm địa chỉ mới</span>
        </button>
      </div>

      {notificationMsg && (
        <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-3 text-xs font-bold text-emerald-800">
          {notificationMsg}
        </div>
      )}

      {/* Address Cards List */}
      <div className="mt-6 space-y-4">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className="flex flex-col justify-between gap-4 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-5 sm:flex-row sm:items-center"
          >
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-extrabold text-[#0F172A]">
                  {addr.name}
                </h3>
                <span className="text-xs text-text-secondary">
                  ({addr.phone})
                </span>
                {addr.tag && (
                  <span className="rounded-full bg-[#DBEAFE] px-2.5 py-0.5 text-[10px] font-bold text-[#1E3A8A]">
                    {addr.tag}
                  </span>
                )}
                {addr.isDefault && (
                  <span className="rounded-full bg-[#F97316] px-2.5 py-0.5 text-[10px] font-bold text-white">
                    Mặc định
                  </span>
                )}
              </div>
              <p className="mt-2 text-xs leading-relaxed text-text-secondary">
                {addr.addressDetail}
              </p>
            </div>

            <div className="flex items-center gap-3">
              {!addr.isDefault && (
                <button
                  type="button"
                  onClick={() => {
                    handleSetDefault(addr.id);
                  }}
                  className="rounded-full border border-[#E2E8F0] bg-white px-3.5 py-1.5 text-xs font-bold text-text-secondary hover:text-[#1E3A8A]"
                >
                  Thiết lập mặc định
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  setNotificationMsg(
                    `Mở form chỉnh sửa địa chỉ: ${addr.tag ?? addr.name}`,
                  );
                  setTimeout(() => {
                    setNotificationMsg(null);
                  }, 3000);
                }}
                className="text-xs font-bold text-[#1E3A8A] hover:underline"
              >
                Sửa
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
