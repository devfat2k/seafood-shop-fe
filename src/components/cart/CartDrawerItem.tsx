'use client';

import Image from 'next/image';
import { Icon } from '@/components/common/Icon';
import type { CartItem } from '@/libs/stores/cart';
import { formatCurrency } from '@/utils/Helpers';

type CartDrawerItemProps = {
  item: CartItem;
  onUpdateQuantity: (id: string | number, delta: number) => void;
  onRemoveItem: (id: string | number) => void;
};

export const CartDrawerItem = ({ item, onUpdateQuantity, onRemoveItem }: CartDrawerItemProps) => (
  <div className="flex gap-4 py-4">
    {item.image && (
      <Image
        src={item.image}
        alt={item.name}
        width={80}
        height={80}
        unoptimized
        className="h-20 w-20 shrink-0 rounded-lg border border-border object-cover"
      />
    )}
    <div className="flex flex-1 flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-2 text-xs font-bold text-foreground">{item.name}</h3>
          <button
            type="button"
            onClick={() => {
              onRemoveItem(item.id);
            }}
            className="text-muted-foreground hover:text-destructive"
            aria-label="Xoá món"
          >
            <Icon name="trash" size="xs" />
          </button>
        </div>
        {item.weight && <p className="mt-0.5 text-xs text-muted-foreground">{item.weight}</p>}
      </div>

      <div className="mt-2 flex items-center justify-between">
        <div className="flex items-center rounded-lg border border-border bg-background">
          <button
            type="button"
            onClick={() => {
              onUpdateQuantity(item.id, -1);
            }}
            className="px-2 py-1 text-xs font-bold text-muted-foreground hover:bg-muted"
          >
            -
          </button>
          <span className="px-2 text-xs font-bold text-foreground">{item.quantity}</span>
          <button
            type="button"
            onClick={() => {
              onUpdateQuantity(item.id, 1);
            }}
            className="px-2 py-1 text-xs font-bold text-muted-foreground hover:bg-muted"
          >
            +
          </button>
        </div>

        <span className="text-sm font-bold text-primary">
          {formatCurrency(item.price * item.quantity)}
        </span>
      </div>
    </div>
  </div>
);
