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
    iconName: 'bag',
    title: 'Đánh Bắt Trong Đêm',
    description: 'Hải sản tươi mang từ cảng cá Phan Thiết ngay từ bình minh.',
  },
  {
    id: 'usp-2',
    iconName: 'clock',
    title: 'Giao Hỏa Tốc < 2h',
    description: 'Đóng gói giữ lạnh chuyên nghiệp, giao hàng tận nơi nhanh chóng.',
  },
  {
    id: 'usp-3',
    iconName: 'shield',
    title: 'Cam Kết Hoàn Tiền',
    description: 'Bồi hoàn 100% nếu sản phẩm hư hỏng hoặc không tươi.',
  },
  {
    id: 'usp-4',
    iconName: 'snowflake',
    title: 'Đóng Khay Sạch Sẽ',
    description: 'Hải sản làm sạch, sơ chế và hút chân không chuẩn 5 sao.',
  },
];

export function UspSection() {
  return (
    <section className="border-b border-[#E4E0D8] bg-[#FBF8F3] py-8 lg:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {USP_LIST.map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-4 rounded-2xl border border-[#E4E0D8]/60 bg-white p-5 shadow-xs transition-all hover:border-[#C4922F]/40 hover:shadow-md"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E4EEEA] text-[#0B2F28]">
                <Icon name={item.iconName} size="md" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-[#26312D]">{item.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-text-secondary">
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
