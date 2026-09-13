import type { Metadata } from 'next';
import { DashboardTabs } from '@/components/admin/dashboard/DashboardTabs';

export const metadata: Metadata = {
  title: 'Bảng Điều Khiển Tổng Quan',
};

export default function AdminDashboardPage() {
  return <DashboardTabs />;
}
