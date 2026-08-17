'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { AddressCard } from '@/components/account/AddressCard';
import { AddressesSkeleton } from '@/components/account/AddressesSkeleton';
import { AddressFormDialog } from '@/components/account/AddressFormDialog';
import { Icon } from '@/components/common/Icon';
import {
  useAddressesQuery,
  useCreateAddressMutation,
  useDeleteAddressMutation,
  useSetDefaultAddressMutation,
} from '@/libs/queries/users';
import type { AddressRequest } from '@/types/user';
import type { AddressFormValues } from '@/validations/user';

export function AccountAddressesTab() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const { data: addresses = [], isLoading, isError, refetch } = useAddressesQuery();
  const createAddressMutation = useCreateAddressMutation();
  const setDefaultAddressMutation = useSetDefaultAddressMutation();
  const deleteAddressMutation = useDeleteAddressMutation();

  const handleSetDefault = async (id: number | string) => {
    try {
      await setDefaultAddressMutation.mutateAsync(id);
      toast.success('Đã cập nhật địa chỉ mặc định!');
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Cập nhật thất bại';
      toast.error(msg);
    }
  };

  const handleDelete = async (id: number | string) => {
    try {
      await deleteAddressMutation.mutateAsync(id);
      toast.success('Đã xóa địa chỉ thành công!');
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Xóa địa chỉ thất bại';
      toast.error(msg);
    }
  };

  const handleAddSubmit = async (data: AddressFormValues) => {
    try {
      const payload: AddressRequest = {
        recipientName: data.recipientName,
        phone: data.phone,
        province: data.province,
        district: data.district,
        ward: data.ward,
        addressDetail: data.addressDetail,
        defaultAddress: data.defaultAddress,
        tag: data.tag,
      };
      await createAddressMutation.mutateAsync(payload);
      toast.success('Thêm địa chỉ giao hàng thành công!');
      setIsAddDialogOpen(false);
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Thêm địa chỉ thất bại';
      toast.error(msg);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return <AddressesSkeleton />;
    }
    if (isError) {
      return (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-destructive/30 bg-destructive/5 py-12 text-center">
          <Icon name="alert-circle" size="lg" className="text-destructive" />
          <p className="mt-3 text-sm font-semibold text-destructive">
            Không thể tải danh sách địa chỉ nhận hàng
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
    if (addresses.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card py-16 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary/15 text-secondary">
            <Icon name="map-pin" size="lg" />
          </div>
          <h3 className="mt-4 font-heading text-base font-bold text-foreground">
            Chưa có sổ địa chỉ nhận hàng
          </h3>
          <p className="mt-1 max-w-sm text-xs text-muted-foreground">
            Thêm địa chỉ để shipper giao mẻ hải sản tươi sống đến bạn nhanh chóng và chính xác nhất.
          </p>
          <button
            type="button"
            onClick={() => {
              setIsAddDialogOpen(true);
            }}
            className="mt-5 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:opacity-90"
          >
            + Thêm Địa Chỉ Mới
          </button>
        </div>
      );
    }
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {addresses.map((addr) => (
          <AddressCard
            key={addr.id}
            address={addr}
            onSetDefault={handleSetDefault}
            onDelete={handleDelete}
            isSettingDefault={setDefaultAddressMutation.isPending}
            isDeleting={deleteAddressMutation.isPending}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-lg font-bold text-foreground sm:text-xl">
            Sổ Địa Chỉ Nhận Hàng
          </h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Quản lý các địa chỉ giao hàng để đặt hải sản hỏa tốc thuận tiện nhất
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setIsAddDialogOpen(true);
          }}
          className="flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-white shadow-sm transition-opacity hover:opacity-90 active:scale-98"
        >
          <Icon name="plus" size="xs" />
          <span>Thêm Địa Chỉ Mới</span>
        </button>
      </div>

      {/* 3 UI States */}
      {renderContent()}

      {/* Add Dialog */}
      <AddressFormDialog
        isOpen={isAddDialogOpen}
        onClose={() => {
          setIsAddDialogOpen(false);
        }}
        onSubmit={handleAddSubmit}
        isPending={createAddressMutation.isPending}
      />
    </div>
  );
}
