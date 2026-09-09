import { describe, expect, it } from 'vitest';
import { normalizeOrder, normalizeOrderPage } from '@/types/order';

describe('Order normalization', () => {
  it('correctly maps order metadata and totals', () => {
    const rawOrder = {
      id: 1,
      status: 'CANCELLED',
      totalAmount: 500_000,
      createdAt: '2026-08-21T18:59:53.363227',
      orderItems: [],
      shippingAddress: null,
      paymentMethod: 'VNPAY',
      shippingAddressSnapshot: null,
    };

    const normalized = normalizeOrder(rawOrder);

    expect(normalized.id).toBe(1);
    expect(normalized.code).toBe('#DH-1');
    expect(normalized.status).toBe('CANCELLED');
    expect(normalized.totalPrice).toBe(500_000);
    expect(normalized.orderDate).toBe('2026-08-21T18:59:53.363227');
  });

  it('correctly maps order items and shipping snapshot', () => {
    const rawOrder = {
      id: 1,
      status: 'PENDING',
      orderItems: [
        {
          productName: 'Cá Hồi Nauy Fillet',
          quantity: 2,
          unitPrice: 250_000,
        },
      ],
      shippingAddressSnapshot:
        '{"ward":"An Nhon ","addressDetail":"123 nguyen thai son ","district":"Gò Vấp","recipientName":"Nguyen Van An ","province":"TP. Hồ Chí Minh","phone":"0929292423"}',
    };

    const normalized = normalizeOrder(rawOrder);

    expect(normalized.items).toHaveLength(1);
    expect(normalized.items?.[0]?.productName).toBe('Cá Hồi Nauy Fillet');
    expect(normalized.items?.[0]?.price).toBe(250_000);
    expect(normalized.shippingAddressSnapshot).toStrictEqual({
      ward: 'An Nhon ',
      addressDetail: '123 nguyen thai son ',
      district: 'Gò Vấp',
      recipientName: 'Nguyen Van An ',
      province: 'TP. Hồ Chí Minh',
      phone: '0929292423',
    });
  });

  it('correctly maps page response', () => {
    const rawPage = {
      content: [
        {
          id: 1,
          status: 'CANCELLED',
          totalAmount: 500_000,
          createdAt: '2026-08-21T18:59:53.363227',
          orderItems: [
            {
              productName: 'Cá Hồi Nauy Fillet',
              quantity: 2,
              unitPrice: 250_000,
            },
          ],
          shippingAddress: null,
          paymentMethod: 'VNPAY',
          shippingAddressSnapshot: null,
        },
      ],
      page: 0,
      size: 1,
      totalElements: 9,
      totalPages: 9,
      last: false,
    };

    const normalizedPage = normalizeOrderPage(rawPage);
    expect(normalizedPage).not.toBeNull();
    expect(normalizedPage?.content).toHaveLength(1);
    expect(normalizedPage?.content[0]?.totalPrice).toBe(500_000);
    expect(normalizedPage?.content[0]?.items?.[0]?.productName).toBe('Cá Hồi Nauy Fillet');
  });
});
