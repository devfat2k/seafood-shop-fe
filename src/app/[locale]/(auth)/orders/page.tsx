import type { Metadata } from 'next';
import { AccountOrdersTab } from '@/components/account/AccountOrdersTab';

export const metadata: Metadata = {
  title: 'Đơn Hàng Của Tôi — Hải Sản Phan Thiết',
  description: 'Theo dõi tiến trình vận chuyển và lịch sử đơn hàng của bạn',
};

export default function OrdersPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
          Đơn Hàng Của Tôi
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Theo dõi trạng thái giao hàng và lịch sử mua sắm hải sản tươi sống
        </p>
      </div>

      <AccountOrdersTab />
    </div>
  );
}
