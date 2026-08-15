'use client';

import { useState } from 'react';
import { Icon } from '@/components/common/Icon';
import type { UserAddress } from '@/types/user';

type AccountAddressesTabProps = {
  addresses?: UserAddress[];
  onAddAddress?: (newAddr: Omit<UserAddress, 'id'>) => void;
  onSetDefaultAddress?: (id: number | string) => void;
  onDeleteAddress?: (id: number | string) => void;
};

export function AccountAddressesTab(props: AccountAddressesTabProps) {
  const { addresses = [], onSetDefaultAddress, onDeleteAddress } = props;
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div className="rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-sm sm:p-8">
      <div className="flex flex-col gap-4 border-b border-[#E2E8F0] pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0F172A]">Sổ Địa Chỉ Giao Hàng</h1>
          <p className="mt-1 text-xs text-text-secondary">
            Quản lý danh sách địa chỉ nhận hàng hải sản tươi sống.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setShowAddForm(!showAddForm);
          }}
          className="inline-flex items-center gap-2 rounded-full bg-[#1E3A8A] px-5 py-2.5 text-xs font-bold text-white shadow transition-transform hover:scale-105 hover:bg-[#172554]"
        >
          <Icon name="plus" size="xs" />
          <span>Thêm địa chỉ mới</span>
        </button>
      </div>

      {addresses.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-sm font-bold text-[#0F172A]">Chưa có địa chỉ giao hàng nào</p>
          <p className="mt-1 text-xs text-text-secondary">Vui lòng thêm địa chỉ nhận hàng mới.</p>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className="flex flex-col justify-between gap-4 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-5 sm:flex-row sm:items-center"
            >
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-sm font-extrabold text-[#0F172A]">{addr.name}</h3>
                  <span className="text-xs text-text-secondary">({addr.phone})</span>
                  {addr.isDefault && (
                    <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800">
                      Mặc định
                    </span>
                  )}
                  {addr.tag && (
                    <span className="rounded-full bg-[#EDF2F7] px-2.5 py-0.5 text-[10px] font-bold text-[#0F172A]">
                      {addr.tag}
                    </span>
                  )}
                </div>

                <p className="mt-2 text-xs leading-relaxed text-text-secondary">
                  {addr.addressDetail}
                </p>
              </div>

              <div className="flex items-center gap-3">
                {!addr.isDefault && onSetDefaultAddress && (
                  <button
                    type="button"
                    onClick={() => {
                      onSetDefaultAddress(addr.id);
                    }}
                    className="text-xs font-bold text-[#1E3A8A] hover:underline"
                  >
                    Thiết lập mặc định
                  </button>
                )}
                {onDeleteAddress && (
                  <button
                    type="button"
                    onClick={() => {
                      onDeleteAddress(addr.id);
                    }}
                    className="text-xs font-bold text-red-500 hover:underline"
                  >
                    Xóa
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
