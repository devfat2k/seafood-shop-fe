import { describe, expect, it } from 'vitest';
import { checkoutFormSchema } from './order';

describe('Order Validation Schema Tests', () => {
  it('passes validation for valid checkout data', () => {
    const validData = {
      paymentMethod: 'VNPAY',
      note: 'Giao hàng giờ hành chính',
      items: [
        { productId: 1, quantity: 2 },
        { productId: 2, quantity: 1 },
      ],
    };

    const result = checkoutFormSchema.safeParse(validData);
    expect(result.success).toBeTruthy();
  });

  it('fails validation when items list is empty', () => {
    const invalidData = {
      paymentMethod: 'COD',
      note: '',
      items: [],
    };

    const result = checkoutFormSchema.safeParse(invalidData);
    expect(result.success).toBeFalsy();
  });

  it('fails validation when payment method is invalid', () => {
    const invalidData = {
      paymentMethod: 'CRYPTO',
      items: [{ productId: 1, quantity: 1 }],
    };

    const result = checkoutFormSchema.safeParse(invalidData);
    expect(result.success).toBeFalsy();
  });

  it('fails validation when item quantity is 0 or negative', () => {
    const invalidData = {
      paymentMethod: 'COD',
      items: [{ productId: 1, quantity: 0 }],
    };

    const result = checkoutFormSchema.safeParse(invalidData);
    expect(result.success).toBeFalsy();
  });
});
