'use client';

import { Icon } from '@/components/common/Icon';
import type { ShippingAddressSnapshot } from '@/types/order';

type OrderTrackingRecipientProps = {
  addressSnapshot?: string | ShippingAddressSnapshot | null;
  paymentMethod?: string;
};

export function OrderTrackingRecipient({
  addressSnapshot,
  paymentMethod,
}: OrderTrackingRecipientProps) {
  let parsed: ShippingAddressSnapshot | null = null;

  if (typeof addressSnapshot === 'string') {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion, typescript/no-unsafe-type-assertion
      parsed = JSON.parse(addressSnapshot) as ShippingAddressSnapshot;
    } catch {
      parsed = null;
    }
  } else if (addressSnapshot && typeof addressSnapshot === 'object') {
    parsed = addressSnapshot;
  }

  if (!parsed) {
    return null;
  }

  const fullAddress = [
    parsed.addressDetail?.trim(),
    parsed.ward?.trim(),
    parsed.district?.trim(),
    parsed.province?.trim(),
  ]
    .filter(Boolean)
    .join(', ');

  if (!parsed.recipientName && !fullAddress) {
    return null;
  }

  return (
    <div className="mt-4 rounded-xl border border-border bg-muted/30 p-3.5 text-xs text-foreground">
      <div className="flex items-center gap-2 font-bold text-secondary">
        <Icon name="map-pin" size="xs" />
        <span>Thông tin nhận hàng</span>
      </div>
      <div className="mt-1.5 space-y-0.5 text-muted-foreground">
        <p>
          <strong className="text-foreground">{parsed.recipientName?.trim()}</strong>
          {parsed.phone ? ` • ${parsed.phone.trim()}` : ''}
        </p>
        {fullAddress && <p>{fullAddress}</p>}
        {paymentMethod && (
          <p className="text-2xs pt-1 text-muted-foreground">
            Phương thức: <span className="font-semibold text-foreground">{paymentMethod}</span>
          </p>
        )}
      </div>
    </div>
  );
}
