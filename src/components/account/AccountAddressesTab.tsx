'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Icon } from '@/components/common/Icon';
import {
  useAddressesQuery,
  useCreateAddressMutation,
  useDeleteAddressMutation,
  useSetDefaultAddressMutation,
} from '@/libs/queries/users';
import type { AddressRequest, UserAddress } from '@/types/user';

function AddressesLoadingSkeleton() {
  return (
    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
      {[1, 2].map((i) => (
        <div
          key={i}
          className="animate-pulse rounded-2xl border border-border bg-card p-5 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div className="h-4 w-32 rounded bg-muted" />
            <div className="h-4 w-16 rounded-full bg-muted" />
          </div>
          <div className="mt-3 space-y-2">
            <div className="h-3 w-28 rounded bg-muted" />
            <div className="h-3 w-48 rounded bg-muted" />
          </div>
          <div className="mt-4 border-t border-border pt-3">
            <div className="h-4 w-20 rounded bg-muted" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function AccountAddressesTab() {
  const { data: addresses = [], isLoading, isError, refetch } = useAddressesQuery();

  const createAddressMutation = useCreateAddressMutation();
  const deleteAddressMutation = useDeleteAddressMutation();
  const setDefaultAddressMutation = useSetDefaultAddressMutation();

  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState<AddressRequest>({
    recipientName: '',
    phone: '',
    province: '',
    district: '',
    ward: '',
    addressDetail: '',
    defaultAddress: false,
    tag: 'Nhà Riêng',
  });

  const handleCreateAddress = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!formData.recipientName || !formData.phone || !formData.addressDetail) {
      toast.error('Vui lòng điền đầy đủ các trường thông tin');
      return;
    }

    try {
      await createAddressMutation.mutateAsync(formData);
      toast.success('Thêm địa chỉ giao hàng mới thành công!');
      setShowAddModal(false);
      setFormData({
        recipientName: '',
        phone: '',
        province: '',
        district: '',
        ward: '',
        addressDetail: '',
        defaultAddress: false,
        tag: 'Nhà Riêng',
      });
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Thêm địa chỉ thất bại';
      toast.error(msg);
    }
  };

  const handleSetDefault = async (id: number | string) => {
    try {
      await setDefaultAddressMutation.mutateAsync(id);
      toast.success('Đã đặt làm địa chỉ giao hàng mặc định!');
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Thiết lập mặc định thất bại';
      toast.error(msg);
    }
  };

  const handleDelete = async (id: number | string) => {
    try {
      await deleteAddressMutation.mutateAsync(id);
      toast.success('Đã xóa địa chỉ khỏi sổ địa chỉ!');
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Xóa địa chỉ thất bại';
      toast.error(msg);
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Card */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div className="flex flex-col gap-4 border-b border-border pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
              <Icon name="map-pin" size="sm" />
            </div>
            <div>
              <h1 className="font-heading text-xl font-bold text-foreground sm:text-2xl">
                Sổ Địa Chỉ Giao Hàng
              </h1>
              <p className="text-xs text-muted-foreground">
                Quản lý các địa chỉ nhận hải sản tươi sống giao nhanh 2H.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setShowAddModal(true);
            }}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 active:scale-95"
          >
            <Icon name="plus" size="xs" />
            <span>Thêm địa chỉ mới</span>
          </button>
        </div>

        {/* 2. Loading State */}
        {isLoading && <AddressesLoadingSkeleton />}

        {/* 3. Error State */}
        {isError && (
          <div className="mt-6 rounded-2xl border border-destructive/30 bg-destructive/10 p-6 text-center shadow-sm">
            <p className="text-xs font-bold text-destructive">Không thể tải danh sách địa chỉ.</p>
            <button
              type="button"
              onClick={() => {
                void refetch();
              }}
              className="mt-3 rounded-xl bg-destructive px-4 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-destructive/90"
            >
              Thử lại
            </button>
          </div>
        )}

        {/* 4. Empty State */}
        {!isLoading && !isError && addresses.length === 0 && (
          <div className="py-12 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <Icon name="map-pin" size="md" />
            </div>
            <h3 className="mt-3 font-heading text-base font-bold text-foreground">
              Chưa có địa chỉ giao hàng nào
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Vui lòng thêm địa chỉ nhận hàng để thuận tiện khi đặt hải sản tươi.
            </p>
            <button
              type="button"
              onClick={() => {
                setShowAddModal(true);
              }}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground shadow-sm hover:bg-primary/90"
            >
              <Icon name="plus" size="xs" />
              <span>Thêm địa chỉ ngay</span>
            </button>
          </div>
        )}

        {/* 5. Addresses Grid */}
        {!isLoading && !isError && addresses.length > 0 && (
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {addresses.map((addr: UserAddress) => (
              <div
                key={addr.id}
                className={`relative flex flex-col justify-between rounded-2xl border p-5 transition-all ${
                  addr.defaultAddress
                    ? 'border-primary/50 bg-primary/5 shadow-xs'
                    : 'border-border bg-background hover:border-secondary/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-sans text-sm font-bold text-foreground">
                        {addr.recipientName}
                      </h3>
                      {addr.tag && (
                        <span className="rounded-full bg-muted px-2.5 py-0.5 text-[10px] font-bold text-foreground">
                          {addr.tag}
                        </span>
                      )}
                    </div>
                    {addr.defaultAddress && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-tertiary/15 px-2.5 py-0.5 text-[10px] font-bold text-tertiary">
                        <Icon name="check" size="xs" />
                        <span>Mặc định</span>
                      </span>
                    )}
                  </div>

                  <div className="mt-2.5 space-y-1 text-xs text-muted-foreground">
                    <p className="flex items-center gap-1.5 font-medium text-foreground">
                      <Icon name="phone" size="xs" className="text-secondary" />
                      <span>{addr.phone}</span>
                    </p>
                    <p className="flex items-start gap-1.5 leading-relaxed">
                      <Icon name="map-pin" size="xs" className="mt-0.5 shrink-0 text-secondary" />
                      <span>
                        {addr.addressDetail}
                        {addr.ward ? `, ${addr.ward}` : ''}
                        {addr.district ? `, ${addr.district}` : ''}
                        {addr.province ? `, ${addr.province}` : ''}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3">
                  {addr.defaultAddress ? (
                    <span className="text-[11px] font-medium text-tertiary">
                      Địa chỉ nhận mặc định
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        void handleSetDefault(addr.id);
                      }}
                      className="text-xs font-bold text-secondary transition-colors hover:underline"
                    >
                      Đặt làm mặc định
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      void handleDelete(addr.id);
                    }}
                    className="text-xs font-bold text-destructive transition-colors hover:underline"
                  >
                    Xóa
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Add New Address */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="Đóng modal"
            onClick={() => {
              setShowAddModal(false);
            }}
            className="fixed inset-0 border-none bg-black/60 backdrop-blur-xs outline-none"
          />

          <div className="relative z-10 w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-2xl transition-all sm:p-8">
            <button
              type="button"
              onClick={() => {
                setShowAddModal(false);
              }}
              className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground hover:text-foreground"
              aria-label="Đóng"
            >
              <Icon name="x" size="sm" />
            </button>

            <div className="border-b border-border pb-3">
              <h3 className="font-heading text-lg font-bold text-foreground">
                Thêm Địa Chỉ Giao Hàng Mới
              </h3>
              <p className="text-xs text-muted-foreground">
                Nhập chính xác để giao nhanh chuỗi lạnh 2H tận nơi.
              </p>
            </div>

            <form onSubmit={handleCreateAddress} className="mt-5 space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="modal-addr-name"
                    className="block text-xs font-bold text-foreground"
                  >
                    Họ tên người nhận <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="modal-addr-name"
                    type="text"
                    aria-label="Họ tên người nhận"
                    placeholder="Nguyễn Văn A"
                    value={formData.recipientName}
                    onChange={(e) => {
                      setFormData({ ...formData, recipientName: e.target.value });
                    }}
                    className="mt-1 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="modal-addr-phone"
                    className="block text-xs font-bold text-foreground"
                  >
                    Số điện thoại <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="modal-addr-phone"
                    type="tel"
                    aria-label="Số điện thoại người nhận"
                    placeholder="0912345678"
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e.target.value });
                    }}
                    className="mt-1 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label
                    htmlFor="modal-addr-province"
                    className="block text-xs font-bold text-foreground"
                  >
                    Tỉnh / TP
                  </label>
                  <input
                    id="modal-addr-province"
                    type="text"
                    aria-label="Tỉnh / Thành phố"
                    placeholder="TP. Hồ Chí Minh"
                    value={formData.province ?? ''}
                    onChange={(e) => {
                      setFormData({ ...formData, province: e.target.value });
                    }}
                    className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="modal-addr-district"
                    className="block text-xs font-bold text-foreground"
                  >
                    Quận / Huyện
                  </label>
                  <input
                    id="modal-addr-district"
                    type="text"
                    aria-label="Quận / Huyện"
                    placeholder="Quận 1"
                    value={formData.district ?? ''}
                    onChange={(e) => {
                      setFormData({ ...formData, district: e.target.value });
                    }}
                    className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="modal-addr-ward"
                    className="block text-xs font-bold text-foreground"
                  >
                    Phường / Xã
                  </label>
                  <input
                    id="modal-addr-ward"
                    type="text"
                    aria-label="Phường / Xã"
                    placeholder="Phường Bến Nghé"
                    value={formData.ward ?? ''}
                    onChange={(e) => {
                      setFormData({ ...formData, ward: e.target.value });
                    }}
                    className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="modal-addr-detail"
                  className="block text-xs font-bold text-foreground"
                >
                  Địa chỉ chi tiết (Số nhà, tên đường) <span className="text-destructive">*</span>
                </label>
                <textarea
                  id="modal-addr-detail"
                  rows={2}
                  aria-label="Địa chỉ chi tiết"
                  placeholder="Ví dụ: 123 Đường Lê Lợi"
                  value={formData.addressDetail}
                  onChange={(e) => {
                    setFormData({ ...formData, addressDetail: e.target.value });
                  }}
                  className="mt-1 w-full rounded-xl border border-border bg-background px-3.5 py-2 text-xs text-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="block text-xs font-bold text-foreground">Loại địa chỉ</span>
                  <div className="mt-1 flex gap-2">
                    {['Nhà Riêng', 'Văn Phòng'].map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => {
                          setFormData({ ...formData, tag });
                        }}
                        className={`rounded-xl border px-3 py-1.5 text-xs font-bold transition-all ${
                          formData.tag === tag
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-border bg-background text-muted-foreground'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                <label className="flex cursor-pointer items-center gap-2 pt-4 text-xs font-bold text-foreground">
                  <input
                    type="checkbox"
                    aria-label="Đặt làm địa chỉ mặc định"
                    checked={formData.defaultAddress}
                    onChange={(e) => {
                      setFormData({ ...formData, defaultAddress: e.target.checked });
                    }}
                    className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                  />
                  <span>Đặt làm mặc định</span>
                </label>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={createAddressMutation.isPending}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-xs font-bold text-primary-foreground shadow-md transition-all hover:bg-primary/90 disabled:opacity-50"
                >
                  {createAddressMutation.isPending ? (
                    <span>Đang lưu...</span>
                  ) : (
                    <>
                      <span>Lưu Địa Chỉ Mới</span>
                      <Icon name="check" size="sm" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
