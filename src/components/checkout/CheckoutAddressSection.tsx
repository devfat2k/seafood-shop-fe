'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { AddressFormDialog } from '@/components/account/AddressFormDialog';
import { Icon } from '@/components/common/Icon';
import {
  useAddressesQuery,
  useCreateAddressMutation,
  useSetDefaultAddressMutation,
} from '@/libs/queries/users';
import type { UserAddress } from '@/types/user';
import type { AddressFormValues } from '@/validations/user';

type CheckoutAddressSectionProps = {
  selectedAddress: UserAddress | null;
  onSelectAddress: (addr: UserAddress) => void;
};

export function CheckoutAddressSection({
  selectedAddress,
  onSelectAddress,
}: CheckoutAddressSectionProps) {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const { data: addresses = [], isLoading } = useAddressesQuery();
  const createAddressMutation = useCreateAddressMutation();
  const setDefaultAddressMutation = useSetDefaultAddressMutation();

  const handleCreateAddress = async (values: AddressFormValues) => {
    try {
      const res = await createAddressMutation.mutateAsync(values);
      if (res.data) {
        onSelectAddress(res.data);
      }
      toast.success('Thêm địa chỉ giao hàng thành công!');
      setIsAddOpen(false);
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Thêm địa chỉ thất bại';
      toast.error(msg);
    }
  };

  const handleSetDefault = async (addr: UserAddress) => {
    try {
      await setDefaultAddressMutation.mutateAsync(addr.id);
      onSelectAddress(addr);
      toast.success('Đã cập nhật địa chỉ giao hàng');
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Không thể chọn địa chỉ';
      toast.error(msg);
    }
  };

  if (isLoading) {
    return (
      <div className="animate-pulse rounded-2xl border border-border bg-card p-6">
        <div className="h-5 w-48 rounded-md bg-muted" />
        <div className="mt-4 h-16 w-full rounded-xl bg-muted/60" />
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary/15 text-secondary">
            <Icon name="map-pin" size="sm" />
          </div>
          <div>
            <h2 className="font-heading text-base font-bold text-foreground">Địa Chỉ Nhận Hàng</h2>
            <p className="text-[11px] text-muted-foreground">
              Địa chỉ nhận hàng tươi sống được giao tận nơi
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            setIsAddOpen(true);
          }}
          className="flex items-center gap-1 text-xs font-bold text-secondary hover:underline"
        >
          <Icon name="plus" size="xs" />
          <span>Thêm Mới</span>
        </button>
      </div>

      {addresses.length === 0 ? (
        <div className="mt-4 rounded-xl border border-dashed border-amber-300 bg-amber-50/60 p-4 text-center dark:bg-amber-950/20">
          <Icon name="alert-triangle" size="md" className="mx-auto text-amber-600" />
          <p className="mt-2 text-xs font-bold text-amber-900 dark:text-amber-200">
            Bạn chưa có địa chỉ giao hàng nào
          </p>
          <p className="mt-1 text-[11px] text-amber-700 dark:text-amber-300">
            Vui lòng thêm địa chỉ để hệ thống lưu thông tin giao nhận hải sản
          </p>
          <button
            type="button"
            onClick={() => {
              setIsAddOpen(true);
            }}
            className="mt-3 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-white shadow-xs hover:opacity-90"
          >
            + Thêm Địa Chỉ Nhận Hàng
          </button>
        </div>
      ) : (
        <div className="mt-4 space-y-3">
          {addresses.map((addr: UserAddress) => {
            const isSelected =
              selectedAddress?.id === addr.id || (!selectedAddress && addr.defaultAddress);
            return (
              <button
                key={addr.id}
                type="button"
                aria-label={`Chọn địa chỉ nhận hàng của ${addr.recipientName}`}
                onClick={() => {
                  void handleSetDefault(addr);
                }}
                className={`w-full cursor-pointer rounded-xl border p-4 text-left transition-all ${
                  isSelected
                    ? 'border-secondary bg-secondary/5 ring-1 ring-secondary'
                    : 'border-border bg-background hover:border-muted-foreground/30'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-foreground">
                        {addr.recipientName}
                      </span>
                      <span className="text-xs text-muted-foreground">• {addr.phone}</span>
                      {addr.tag && (
                        <span className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                          {addr.tag}
                        </span>
                      )}
                      {addr.defaultAddress && (
                        <span className="rounded-md bg-tertiary/15 px-2 py-0.5 text-[10px] font-bold text-tertiary">
                          Mặc định
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {addr.addressDetail}, {addr.ward}, {addr.district}, {addr.province}
                    </p>
                  </div>
                  <div className="pt-1">
                    <input
                      type="radio"
                      checked={isSelected}
                      readOnly
                      aria-label={`Chọn địa chỉ ${addr.recipientName} - ${addr.addressDetail}`}
                      className="h-4 w-4 text-secondary focus:ring-secondary"
                    />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      <AddressFormDialog
        isOpen={isAddOpen}
        onClose={() => {
          setIsAddOpen(false);
        }}
        onSubmit={handleCreateAddress}
        isPending={createAddressMutation.isPending}
      />
    </div>
  );
}
