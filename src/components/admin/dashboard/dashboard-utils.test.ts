import { describe, expect, it } from 'vitest';
import { computeMonthlyOrderCounts, parseRevenueInMonth } from './dashboard-utils';

describe(parseRevenueInMonth, () => {
  it('handles backend ISO datetime string format correctly', () => {
    const result = parseRevenueInMonth({
      month: '2026-09-01T00:00:00',
      revenue: 1_160_000,
    });

    expect(result).toStrictEqual({
      month: 9,
      year: 2026,
      monthLabel: 'T9/26',
      fullMonth: 'Tháng 9/2026',
      revenue: 1_160_000,
      orderCount: 0,
    });
  });

  it('handles standard separate month and year numbers', () => {
    const result = parseRevenueInMonth({
      month: 8,
      year: 2026,
      revenue: 2_500_000,
      orderCount: 12,
    });

    expect(result).toStrictEqual({
      month: 8,
      year: 2026,
      monthLabel: 'T8/26',
      fullMonth: 'Tháng 8/2026',
      revenue: 2_500_000,
      orderCount: 12,
    });
  });

  it('handles array month format [year, month, day]', () => {
    const result = parseRevenueInMonth({
      month: [2026, 7, 1],
      revenue: 800_000,
    });

    expect(result).toStrictEqual({
      month: 7,
      year: 2026,
      monthLabel: 'T7/26',
      fullMonth: 'Tháng 7/2026',
      revenue: 800_000,
      orderCount: 0,
    });
  });

  it('handles string YYYY-MM format', () => {
    const result = parseRevenueInMonth({
      month: '2026-05',
      revenue: 950_000,
    });

    expect(result).toStrictEqual({
      month: 5,
      year: 2026,
      monthLabel: 'T5/26',
      fullMonth: 'Tháng 5/2026',
      revenue: 950_000,
      orderCount: 0,
    });
  });

  it('handles number month without year gracefully', () => {
    const currentYear = new Date().getFullYear();
    const result = parseRevenueInMonth({
      month: 4,
      revenue: 400_000,
    });

    expect(result.month).toBe(4);
    expect(result.year).toBe(currentYear);
    expect(result.revenue).toBe(400_000);
  });
});

describe(computeMonthlyOrderCounts, () => {
  it('aggregates orders by year and month correctly', () => {
    const orders = [
      { createdAt: '2026-09-11T17:29:21.639894' },
      { createdAt: '2026-09-11T17:38:27.75797' },
      { createdAt: '2026-09-12T10:00:00.00000' },
      { orderDate: '2026-08-15T09:30:00.00000' },
      { createdAt: 'invalid-date' },
      {},
    ];

    const counts = computeMonthlyOrderCounts(orders);

    expect(counts).toStrictEqual({
      '2026-9': 3,
      '2026-8': 1,
    });
  });

  it('returns empty object when orders list is empty', () => {
    const counts = computeMonthlyOrderCounts([]);
    expect(counts).toStrictEqual({});
  });
});
