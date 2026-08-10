import { Icon } from '@/components/common/Icon';

const MARQUEE_ITEMS = [
  { text: 'HẢI SẢN PHAN THIẾT TƯƠI SỐNG 100%', icon: 'fish' },
  { text: 'GIAO TẬN NHÀ TRONG 2 GIỜ', icon: 'truck' },
  { text: 'CAM KẾT 1 ĐỔI 1 NẾU KHÔNG TƯƠI', icon: 'shield-check' },
  { text: 'ĐÓNG THÙNG GIỮ LẠNH CHUẨN XUẤT KHẨU', icon: 'sparkles' },
] as const;

export function MarqueeStrip() {
  return (
    <div className="relative overflow-hidden border-y border-[#0B2F28] bg-[#0E3D34] py-3.5 text-white">
      <div className="animate-marquee flex items-center gap-12 whitespace-nowrap">
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, index) => (
          <div
            key={index}
            className="inline-flex items-center gap-3 text-xs font-extrabold tracking-wider text-[#D9A441] uppercase"
          >
            <Icon name={item.icon} size="xs" className="text-[#D9A441]" />
            <span>{item.text}</span>
            <span className="ml-8 text-white/30">•</span>
          </div>
        ))}
      </div>
    </div>
  );
}
