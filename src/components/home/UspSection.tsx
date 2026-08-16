import { Icon } from '@/components/common/Icon';

type UspItem = {
  id: string;
  iconName: string;
  title: string;
  description: string;
};

const USP_LIST: UspItem[] = [
  {
    id: 'usp-1',
    iconName: 'anchor',
    title: 'Cam kết xuất xứ',
    description:
      '100% hải sản được thu mua trực tiếp tại cảng cá Phan Thiết, Bình Thuận có nhật ký đánh bắt rõ ràng.',
  },
  {
    id: 'usp-2',
    iconName: 'snowflake',
    title: 'Chuỗi lạnh bảo quản',
    description:
      'Hệ thống cấp đông siêu tốc và xe đông lạnh chuyên dụng giữ nhiệt độ chuẩn từ biển đến bàn ăn.',
  },
  {
    id: 'usp-3',
    iconName: 'truck',
    title: 'Giao nhanh 2H',
    description:
      'Giao hàng siêu tốc trong vòng 2 giờ tại nội thành đối với hải sản tươi sống bơi tại hồ.',
  },
];

export function UspSection() {
  return (
    <section className="border-b border-border bg-card py-6 lg:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-6">
          {USP_LIST.map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-3.5 rounded-xl border border-border bg-background p-4 shadow-xs transition-all hover:border-secondary/40 hover:shadow-sm"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                <Icon name={item.iconName} size="md" />
              </div>
              <div>
                <h3 className="font-sans text-sm font-bold text-foreground">{item.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
