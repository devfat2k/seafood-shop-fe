import { describe, expect, it } from 'vitest';
import type { Product } from '@/types/api';
import { getProductBadges, isProductInStock, mapProductToCardItem } from './catalog-utils';

describe('catalog-utils', () => {
  it('isProductInStock returns true for active in-stock item', () => {
    const inStockProduct: Product = {
      id: 1,
      name: 'Cá Bớp',
      price: 150_000,
      active: true,
      stock: 5,
    };
    expect(isProductInStock(inStockProduct)).toBeTruthy();
  });

  it('isProductInStock returns false for out of stock or inactive item', () => {
    const outOfStockProduct: Product = {
      id: 2,
      name: 'Cua Huỳnh Đế',
      price: 500_000,
      active: true,
      stock: 0,
    };
    expect(isProductInStock(outOfStockProduct)).toBeFalsy();

    const inactiveProduct: Product = {
      id: 3,
      name: 'Tôm Hùm',
      price: 800_000,
      active: false,
      stock: 10,
    };
    expect(isProductInStock(inactiveProduct)).toBeFalsy();

    const homeApiProduct: Product = {
      id: 4,
      name: 'Set Tiệc Hoàng Gia',
      price: 1_650_000,
    };
    expect(isProductInStock(homeApiProduct)).toBeTruthy();

    const explicitOutOfStockProduct: Product = {
      id: 5,
      name: 'Cá Tuyết',
      price: 900_000,
      inStock: false,
    };
    expect(isProductInStock(explicitOutOfStockProduct)).toBeFalsy();
  });

  it('getProductBadges only returns real badges without fake defaults', () => {
    const regularProduct: Product = {
      id: 1,
      name: 'Mực Trứng',
      price: 200_000,
      active: true,
      stock: 10,
    };
    expect(getProductBadges(regularProduct)).toStrictEqual([]);

    const featuredProduct: Product = {
      id: 2,
      name: 'Tôm Sú',
      price: 300_000,
      active: true,
      featured: true,
    };
    expect(getProductBadges(featuredProduct)).toStrictEqual(['NỔI BẬT']);

    const outOfStockProduct: Product = {
      id: 3,
      name: 'Bào Ngư',
      price: 1_200_000,
      active: true,
      stock: 0,
    };
    expect(getProductBadges(outOfStockProduct)).toStrictEqual(['TẠM HẾT']);
  });

  it('mapProductToCardItem does not fabricate originalPrice, ratings, origin or badges', () => {
    const cleanProduct: Product = {
      id: 10,
      name: 'Cá Thu Cắt Lát',
      price: 180_000,
      active: true,
      stock: 10,
      categoryName: 'Cá Biển',
    };

    const cardItem = mapProductToCardItem(cleanProduct);

    expect(cardItem.id).toBe(10);
    expect(cardItem.name).toBe('Cá Thu Cắt Lát');
    expect(cardItem.originalPrice).toBeUndefined();
    expect(cardItem.rating).toBeUndefined();
    expect(cardItem.badges).toStrictEqual([]);
  });

  it('mapProductToCardItem correctly keeps real discount and real rating when provided', () => {
    const discountedProduct: Product = {
      id: 11,
      name: 'Cua Cà Mau',
      price: 350_000,
      originalPrice: 400_000,
      rating: 4.8,
      reviewCount: 35,
      origin: 'Năm Căn, Cà Mau',
      active: true,
    };

    const cardItem = mapProductToCardItem(discountedProduct);

    expect(cardItem.price).toBe(350_000);
    expect(cardItem.originalPrice).toBe(400_000);
    expect(cardItem.rating).toBe(4.8);
    expect(cardItem.salesCount).toBe(35);
    expect(cardItem.origin).toBe('Năm Căn, Cà Mau');
  });
});
