import { SystemMonitoringPanel } from '@/components/admin/system/SystemMonitoringPanel';

export const metadata = {
  title: 'Đồng Bộ & Giám Sát Hệ Thống',
};

export default function AdminSystemPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-xl font-bold text-foreground sm:text-2xl">
          Đồng Bộ & Trạng Thái Hệ Thống
        </h1>
        <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
          Kiểm tra trạng thái kết nối máy chủ và đồng bộ dữ liệu tức thì lên trang chủ cửa hàng
        </p>
      </div>

      <SystemMonitoringPanel />
    </div>
  );
}
