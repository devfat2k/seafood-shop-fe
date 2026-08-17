import { z } from 'zod';

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
  id: number;
  productId: number;
  productName: string;
  spec?: string;
  quantity: number;
  unit?: string;
  price: number;
  imageUrl?: string;
};

export type DeliveryStep = {
  title: string;
  time: string;
  completed: boolean;
  current?: boolean;
};

export type OrderResponse = {
  id: number;
  code: string;
  orderDate: string;
  status: OrderStatus;
  statusText?: string;
  statusBadgeColor?: string;
  totalPrice: number;
  shippingAddressId?: number;
  paymentMethod?: string;
  note?: string;
  items: OrderItemResponse[];
  deliveryTimeline?: DeliveryStep[];
  shipperPhone?: string;
};
