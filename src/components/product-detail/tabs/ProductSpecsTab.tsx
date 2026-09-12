import { Icon } from '@/components/common/Icon';
import type { Product } from '@/types/api';

type ProductSpecsTabProps = {
  product: Product;
};

export const ProductSpecsTab = ({ product }: ProductSpecsTabProps) => {
  const specs = [
    {
      icon: 'fish',
      label: 'Tên thương phẩm',
      value: product.name,
    },
    {
      icon: 'map-pin',
      label: 'Vùng biển đánh bắt',
      value: product.origin ?? 'Cảng cá Phan Thiết, Tỉnh Bình Thuận',
    },
    {
      icon: 'sliders-horizontal',
      label: 'Danh mục phân loại',
      value: product.category?.name ?? product.categoryName ?? 'Hải Sản Tươi Sống Loại 1',
    },
    {
      icon: 'sparkles',
      label: 'Quy cách giao hàng',
      value: product.spec ?? 'Túi oxy thở sống / Hút chân không đóng thùng xốp đá gel -18°C',
    },
    {
      icon: 'shield-check',
      label: 'Tiêu chuẩn chất lượng',
      value: '100% tự nhiên, không kháng sinh, không hóa chất giữ tươi',
    },
    {
      icon: 'clock',
      label: 'Nhiệt độ & Hạn dùng',
      value: 'Bảo quản ngăn đông (-18°C) 30 ngày hoặc dùng ngon nhất trong 24h khi nhận hàng sống',
    },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {specs.map((item, idx) => (
          <div
            key={idx}
            className="flex items-start gap-3.5 rounded-xl border border-border bg-card p-4 transition-colors hover:border-secondary/30"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
              <Icon name={item.icon} size="xs" />
            </div>
            <div>
              <span className="text-xs font-semibold text-muted-foreground">{item.label}</span>
              <p className="mt-0.5 text-xs font-bold text-foreground sm:text-sm">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
