import { Icon } from '@/components/common/Icon';

const MARQUEE_ITEMS = [
  { text: 'GIAO NHANH CHUỖI LẠNH 2 GIỜ', icon: 'truck' },
  { text: 'CHUỖI LẠNH ĐẠT CHUẨN IQF', icon: 'snowflake' },
  { text: 'ĐÁNH BẮT TỰ NHIÊN PHAN THIẾT', icon: 'waves' },
  { text: 'CAM KẾT HOÀN TIỀN 100% NẾU KHÔNG TƯƠI', icon: 'shield-check' },
  { text: 'CHẤT LƯỢNG HẢI SẢN LOẠI 1', icon: 'sparkles' },
] as const;

export function MarqueeStrip() {
  return (
    <div className="relative overflow-hidden border-y border-secondary/20 bg-secondary py-3 text-white">
      <div className="animate-marquee flex items-center gap-12 whitespace-nowrap">
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, index) => (
          <div
            key={index}
            className="inline-flex items-center gap-2.5 text-xs font-bold tracking-wider text-white uppercase"
          >
            <Icon name={item.icon} size="xs" className="text-accent" />
            <span>{item.text}</span>
            <span className="ml-8 text-white/40">•</span>
          </div>
        ))}
      </div>
    </div>
  );
}
