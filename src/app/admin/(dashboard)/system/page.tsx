import { SystemMonitoringPanel } from '@/components/admin/system/SystemMonitoringPanel';

export const metadata = {
  title: 'Quản Lý Hệ Thống & Bộ Nhớ Đệm | Admin Portal',
};

export default function AdminSystemPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-xl font-bold text-foreground sm:text-2xl">
          Hệ Thống & Bộ Nhớ Đệm
        </h1>
        <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
          Giám sát trạng thái dịch vụ, hạ tầng API và quản trị bộ nhớ đệm Redis
        </p>
      </div>

      <SystemMonitoringPanel />
    </div>
  );
}
