import { DashboardKpiCards } from '@/components/admin/dashboard/DashboardKpiCards';
import { RevenueByCategoryCard } from '@/components/admin/dashboard/RevenueByCategoryCard';
import { TopBuyProductsTable } from '@/components/admin/dashboard/TopBuyProductsTable';

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <DashboardKpiCards />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <TopBuyProductsTable />
        </div>
        <div>
          <RevenueByCategoryCard />
        </div>
      </div>
    </div>
  );
}
