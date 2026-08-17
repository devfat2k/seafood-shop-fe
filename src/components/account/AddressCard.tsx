'use client';

import { Icon } from '@/components/common/Icon';
import type { UserAddress } from '@/types/user';

type AddressCardProps = {
  address: UserAddress;
  onSetDefault: (id: number | string) => void;
  onDelete: (id: number | string) => void;
  isSettingDefault: boolean;
  isDeleting: boolean;
};

export function AddressCard({
  address,
  onSetDefault,
  onDelete,
  isSettingDefault,
  isDeleting,
}: AddressCardProps) {
  const fullAddress = [address.addressDetail, address.ward, address.district, address.province]
    .filter(Boolean)
    .join(', ');

  return (
    <div
      className={`relative flex flex-col justify-between rounded-2xl border p-5 shadow-xs transition-all ${
        address.defaultAddress
          ? 'border-secondary/60 bg-secondary/5'
          : 'border-border bg-card hover:border-secondary/40'
      }`}
    >
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-heading text-sm font-bold text-foreground">
              {address.recipientName}
            </span>
            <span className="rounded-md border border-border bg-background px-2 py-0.5 text-[10px] font-semibold text-muted-foreground uppercase">
              {address.tag ?? 'Nhà Riêng'}
            </span>
          </div>

          {address.defaultAddress && (
            <span className="rounded-full bg-secondary/15 px-2.5 py-0.5 text-[10px] font-bold text-secondary">
              Mặc định
            </span>
          )}
        </div>

        <div className="mt-3 space-y-1 text-xs text-muted-foreground">
          <p className="flex items-center gap-2 font-medium text-foreground">
            <Icon name="phone" size="xs" className="text-secondary" />
            {address.phone}
          </p>
          <p className="flex items-start gap-2 pt-1">
            <Icon name="map-pin" size="xs" className="mt-0.5 shrink-0 text-secondary" />
            <span>{fullAddress}</span>
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-border/80 pt-3">
        {address.defaultAddress ? (
          <span className="text-xs font-semibold text-muted-foreground">
            Địa chỉ nhận hàng chính
          </span>
        ) : (
          <button
            type="button"
            onClick={() => {
              onSetDefault(address.id);
            }}
            disabled={isSettingDefault}
            className="text-xs font-semibold text-secondary hover:underline disabled:opacity-50"
          >
            {isSettingDefault ? 'Đang cập nhật...' : 'Đặt làm mặc định'}
          </button>
        )}

        <button
          type="button"
          onClick={() => {
            onDelete(address.id);
          }}
          disabled={isDeleting}
          className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive disabled:opacity-50"
          aria-label="Xoá địa chỉ"
        >
          <Icon name="trash" size="xs" />
        </button>
      </div>
    </div>
  );
}
