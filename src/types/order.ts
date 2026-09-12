/* eslint-disable @typescript-eslint/no-unsafe-type-assertion, @typescript-eslint/no-base-to-string */
import { z } from 'zod';
import type { PageResponse } from '@/types/api';

export const orderItemRequestSchema = z.object({
  productId: z.number().min(1, 'Product ID không hợp lệ'),
  quantity: z.number().min(1, 'Số lượng tối thiểu là 1'),
});

export const createOrderRequestSchema = z.object({
  paymentMethod: z.enum(['COD', 'VNPAY', 'MOMO', 'ZALOPAY']),
  note: z.string().optional(),
  items: z.array(orderItemRequestSchema).min(1, 'Đơn hàng phải chứa ít nhất 1 sản phẩm'),
});

export type OrderItemRequest = z.infer<typeof orderItemRequestSchema>;
export type CreateOrderRequest = z.infer<typeof createOrderRequestSchema>;

export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DONE' | 'CANCELLED';

export type OrderItemResponse = {
  id?: number;
  productId?: number;
  productName: string;
  spec?: string;
  quantity: number;
  unit?: string;
  price: number;
  unitPrice?: number;
  imageUrl?: string;
};

export type DeliveryStep = {
  title: string;
  time: string;
  completed: boolean;
  current?: boolean;
};

export type ShippingAddressSnapshot = {
  recipientName?: string;
  phone?: string;
  province?: string;
  district?: string;
  ward?: string;
  addressDetail?: string;
};

export type OrderResponse = {
  id: number;
  code?: string;
  orderDate?: string;
  createdAt?: string;
  status: OrderStatus;
  statusText?: string;
  statusBadgeColor?: string;
  totalPrice?: number;
  totalAmount?: number;
  shippingAddressId?: number;
  paymentMethod?: string;
  note?: string;
  items?: OrderItemResponse[];
  orderItems?: OrderItemResponse[];
  shippingAddress?: unknown;
  shippingAddressSnapshot?: string | ShippingAddressSnapshot | null;
  deliveryTimeline?: DeliveryStep[];
  shipperPhone?: string;
};

export function normalizeOrder(raw: unknown): OrderResponse {
  if (!raw || typeof raw !== 'object') {
    return raw as OrderResponse;
  }

  const order = raw as Record<string, unknown>;

  let parsedAddressSnapshot: ShippingAddressSnapshot | string | null = null;
  if (typeof order.shippingAddressSnapshot === 'string') {
    try {
      parsedAddressSnapshot = JSON.parse(order.shippingAddressSnapshot) as ShippingAddressSnapshot;
    } catch {
      parsedAddressSnapshot = order.shippingAddressSnapshot;
    }
  } else if (order.shippingAddressSnapshot && typeof order.shippingAddressSnapshot === 'object') {
    parsedAddressSnapshot = order.shippingAddressSnapshot as ShippingAddressSnapshot;
  }

  let rawItems: unknown[] = [];
  if (Array.isArray(order.orderItems)) {
    rawItems = order.orderItems;
  } else if (Array.isArray(order.items)) {
    rawItems = order.items;
  }

  const items: OrderItemResponse[] = rawItems.map((item: unknown, idx: number) => {
    const it = (typeof item === 'object' && item !== null ? item : {}) as Record<string, unknown>;
    const unitPrice = Number(it.unitPrice ?? it.price ?? 0);

    let imageUrl: string | undefined;
    if (typeof it.imageUrl === 'string') {
      ({ imageUrl } = it);
    } else if (typeof it.productImage === 'string') {
      imageUrl = it.productImage;
    }

    return {
      id: Number(it.id ?? idx + 1),
      productId: Number(it.productId ?? 0),
      productName: String(it.productName ?? 'Hải sản tươi sống'),
      spec: typeof it.spec === 'string' ? it.spec : undefined,
      quantity: Number(it.quantity ?? 1),
      unit: typeof it.unit === 'string' ? it.unit : undefined,
      price: unitPrice,
      unitPrice,
      imageUrl,
    };
  });

  const total = Number(order.totalAmount ?? order.totalPrice ?? 0);
  const dateStr = String(order.createdAt ?? order.orderDate ?? '');
  const idNum = Number(order.id ?? 0);

  let codeStr = '';
  if (typeof order.code === 'string' && order.code) {
    codeStr = order.code;
  } else if (idNum > 0) {
    codeStr = `#DH-${idNum}`;
  }

  return {
    ...order,
    id: idNum,
    code: codeStr,
    orderDate: dateStr,
    createdAt: dateStr,
    status: (order.status as OrderStatus) ?? 'PENDING',
    totalPrice: total,
    totalAmount: total,
    items,
    orderItems: items,
    shippingAddressSnapshot: parsedAddressSnapshot,
  };
}

export function normalizeOrderPage(
  pageData: PageResponse<unknown> | null,
): PageResponse<OrderResponse> | null {
  if (!pageData || !Array.isArray(pageData.content)) {
    return null;
  }

  return {
    ...pageData,
    content: pageData.content.map(normalizeOrder),
  };
}
