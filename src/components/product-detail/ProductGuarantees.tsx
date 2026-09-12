import { Icon } from '@/components/common/Icon';

const GUARANTEE_ITEMS = [
  {
    id: 'g-1',
    iconName: 'truck',
    title: 'Giao nhanh 2 Giờ',
    desc: 'Bảo quản chuỗi lạnh -18°C hoặc túi oxy bơi sống',
    color: 'text-secondary',
    bgColor: 'bg-secondary/10',
  },
  {
    id: 'g-2',
    iconName: 'fish',
    title: 'Tươi sống tại bến',
    desc: 'Tuyển chọn từ cảng cá Phan Thiết lúc 4h sáng',
    color: 'text-secondary',
    bgColor: 'bg-secondary/10',
  },
  {
    id: 'g-3',
    iconName: 'shield-check',
    title: 'Bao ăn 1 đổi 1',
    desc: 'Đổi mới hoặc hoàn tiền ngay nếu hàng không đạt',
    color: 'text-tertiary',
    bgColor: 'bg-tertiary/10',
  },
  {
    id: 'g-4',
    iconName: 'check',
    title: 'Cân đủ 100%',
    desc: 'Kiểm tra hàng & cân lại tại nhà trước khi trả tiền',
    color: 'text-accent',
    bgColor: 'bg-accent/10',
  },
];

export function ProductGuarantees() {
  return (
    <div className="rounded-2xl border border-border/80 bg-muted/20 p-4 sm:p-5">
      <h3 className="mb-3 text-xs font-bold tracking-wider text-foreground uppercase">
        Cam kết vàng từ Hải Sản Phan Thiết
      </h3>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {GUARANTEE_ITEMS.map((item) => (
          <div key={item.id} className="flex items-start gap-3">
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${item.bgColor} ${item.color}`}
            >
              <Icon name={item.iconName} size="xs" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-foreground">{item.title}</h4>
              <p className="text-[11px] leading-snug text-muted-foreground">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
