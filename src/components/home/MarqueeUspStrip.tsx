import { Icon } from '@/components/common/Icon';

type MarqueeItem = {
  id: string;
  icon: string;
  text: string;
  highlight?: string;
};

const MARQUEE_ITEMS: MarqueeItem[] = [
  {
    id: 'm1',
    icon: 'anchor',
    text: '100% Đánh Bắt Tự Nhiên',
    highlight: 'Biển Phan Thiết',
  },
  {
    id: 'm2',
    icon: 'truck',
    text: 'Giao Sống Bơi Oxy',
    highlight: 'Siêu Tốc 2H',
  },
  {
    id: 'm3',
    icon: 'shield-check',
    text: 'Cam Kết 1 Đổi 1 Tận Nơi',
    highlight: 'Bao Ăn Toàn Diện',
  },
  {
    id: 'm4',
    icon: 'sparkles',
    text: 'Miễn Phí Sơ Chế Sạch',
    highlight: 'Tặng Muối Ớt Xanh',
  },
  {
    id: 'm5',
    icon: 'snowflake',
    text: 'Chuỗi Bảo Quản Lạnh',
    highlight: 'Giữ Trọn Vị Biển',
  },
  {
    id: 'm6',
    icon: 'clock',
    text: 'Cập Bến Mỗi Ngày',
    highlight: '04:00 Sáng',
  },
];

export function MarqueeUspStrip() {
  const doubleList = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div
      className="relative z-20 w-full overflow-hidden border-b border-white/10 bg-[#06242D] py-3 text-white select-none"
      aria-label="Cam kết chất lượng và dịch vụ"
    >
      <div className="animate-marquee flex items-center gap-8 text-xs font-bold tracking-wider uppercase sm:text-sm">
        {doubleList.map((item, idx) => (
          <div key={`${item.id}-${idx}`} className="flex shrink-0 items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 text-accent">
              <Icon name={item.icon} size="xs" />
            </span>
            <span className="text-white/85">{item.text}</span>
            {item.highlight && <span className="text-accent">{item.highlight}</span>}
            <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
          </div>
        ))}
      </div>
    </div>
  );
}
