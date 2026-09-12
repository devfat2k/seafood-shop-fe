import type { RevenueInMonth } from '@/types/admin';

export type ParsedMonthlyRevenue = {
  month: number;
  year: number;
  monthLabel: string;
  fullMonth: string;
  revenue: number;
  orderCount: number;
};

function parseDateString(val: string, fallbackYear: number): { month: number; year: number } {
  const parsedDate = new Date(val);
  if (Number.isNaN(parsedDate.getTime())) {
    const parts = val.split(/[-/]/u);
    if (parts.length >= 2) {
      const first = parts[0] ?? '';
      const second = parts[1] ?? '1';
      if (first.length === 4) {
        return {
          year: Number.parseInt(first, 10) || fallbackYear,
          month: Number.parseInt(second, 10) || 1,
        };
      }
      return {
        month: Number.parseInt(first, 10) || 1,
        year: Number.parseInt(second, 10) || fallbackYear,
      };
    }
    return { month: 1, year: fallbackYear };
  }

  return {
    month: parsedDate.getMonth() + 1,
    year: parsedDate.getFullYear(),
  };
}

export function parseRevenueInMonth(item: RevenueInMonth): ParsedMonthlyRevenue {
  const currentYear = new Date().getFullYear();
  let month = 1;
  let year = currentYear;

  const { month: itemMonth, year: itemYear } = item;

  if (typeof itemYear === 'number' && typeof itemMonth === 'number') {
    month = itemMonth;
    year = itemYear;
  } else if (typeof itemMonth === 'string') {
    ({ month, year } = parseDateString(itemMonth, currentYear));
  } else if (Array.isArray(itemMonth) && itemMonth.length >= 2) {
    year = Number(itemMonth[0]) || currentYear;
    month = Number(itemMonth[1]) || 1;
  } else if (typeof itemMonth === 'number') {
    month = itemMonth;
    year = itemYear ?? currentYear;
  }

  const shortYear = year.toString().slice(-2);

  return {
    month,
    year,
    monthLabel: `T${month}/${shortYear}`,
    fullMonth: `Tháng ${month}/${year}`,
    revenue: item.revenue ?? 0,
    orderCount: item.orderCount ?? 0,
  };
}

export type MinimalOrderForStats = {
  createdAt?: string;
  orderDate?: string;
};

/**
 * Tính số lượng đơn hàng theo từng tháng dựa trên ngày tạo/ngày đặt thực tế.
 * @param orders - Danh sách đơn hàng tối giản chứa thông tin ngày tạo hoặc ngày đặt.
 * @returns Map dạng "YYYY-M" -> số lượng đơn.
 */
export function computeMonthlyOrderCounts(
  orders: MinimalOrderForStats[] = [],
): Record<string, number> {
  const counts: Record<string, number> = {};

  for (const order of orders) {
    const rawDate = order.createdAt ?? order.orderDate;
    if (!rawDate) {
      continue;
    }

    const date = new Date(rawDate);
    if (!Number.isNaN(date.getTime())) {
      const key = `${date.getFullYear()}-${date.getMonth() + 1}`;
      counts[key] = (counts[key] ?? 0) + 1;
    }
  }

  return counts;
}
