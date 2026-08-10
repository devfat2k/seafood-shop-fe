import { Icon } from '@/components/common/Icon';

type Testimonial = {
  id: string;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  product: string;
  comment: string;
  date: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    id: 'rev-1',
    name: 'Nguyễn Thanh Hà',
    location: 'Quận 2, TP. Hồ Chí Minh',
    avatar: 'TH',
    rating: 5,
    product: 'Set Hải Sản BBQ "Đại Dương Xanh"',
    comment:
      'Tôm hùm giao tới vẫn còn giãy đành đạch trong thùng oxy! Gia đình mình làm tiệc nướng cuối tuần ai cũng khen hải sản tươi ngọt xuất sắc. Sẽ ủng hộ dài dài.',
    date: 'Hôm qua',
  },
  {
    id: 'rev-2',
    name: 'Trần Hoàng Nam',
    location: 'Quận 7, TP. Hồ Chí Minh',
    avatar: 'HN',
    rating: 5,
    product: 'Set Cua Gạch Phan Thiết (2 Con)',
    comment:
      'Cua béo ngậy 100% gạch son chuẩn như mô tả. Shop giao hàng chưa đầy 1 tiếng rưỡi đã tới nơi. Sốt muối ớt xanh tặng kèm ăn dính lắm!',
    date: '3 ngày trước',
  },
  {
    id: 'rev-3',
    name: 'Lê Minh Thuận',
    location: 'Bình Thạnh, TP. Hồ Chí Minh',
    avatar: 'MT',
    rating: 5,
    product: 'Set Lẩu Hải Sản "Hoàng Gia"',
    comment:
      'Nước lẩu Thái chua cay vừa vị, cá bớp phi lê tươi không hề tanh. Đóng gói rất chỉn chu, nước đá bảo quản dày dặn. 10/10 điểm dịch vụ.',
    date: '5 ngày trước',
  },
];

export function SocialProofSection() {
  return (
    <section className="bg-white py-8 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Count-up Stats Bar */}
        <div className="grid grid-cols-1 gap-6 rounded-3xl border border-[#E4EEEA] bg-white p-8 shadow-lg sm:grid-cols-3">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E4EEEA] text-[#0B2F28]">
              <Icon name="truck" size="md" />
            </div>
            <p className="mt-4 text-4xl font-black tracking-tight text-[#26312D] sm:text-5xl">
              12.000+
            </p>
            <p className="mt-1 text-sm font-semibold text-text-secondary">
              Đơn Hàng Giao Thành Công
            </p>
          </div>

          <div className="flex flex-col items-center border-t border-[#E4E0D8] pt-6 text-center sm:border-t-0 sm:border-l sm:pt-0">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F6E8CC] text-[#C4922F]">
              <Icon name="star" size="md" />
            </div>
            <p className="mt-4 text-4xl font-black tracking-tight text-[#C4922F] sm:text-5xl">
              4.9 / 5.0
            </p>
            <p className="mt-1 text-sm font-semibold text-text-secondary">
              Rating 10.000+ Đánh Giá
            </p>
          </div>

          <div className="flex flex-col items-center border-t border-[#E4E0D8] pt-6 text-center sm:border-t-0 sm:border-l sm:pt-0">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E4EEEA] text-[#0B2F28]">
              <Icon name="shield-check" size="md" />
            </div>
            <p className="mt-4 text-4xl font-black tracking-tight text-[#0B2F28] sm:text-5xl">
              100%
            </p>
            <p className="mt-1 text-sm font-semibold text-text-secondary">Cam Kết Tươi 1 Đổi 1</p>
          </div>
        </div>

        {/* Customer Testimonials Header */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E4EEEA] bg-white px-4 py-1.5 text-xs font-bold text-[#0B2F28] shadow-xs">
            <Icon name="sparkles" size="xs" />
            <span>ĐÁNH GIÁ THỰC TẾ</span>
          </div>
          <h2 className="mt-3 text-2xl font-extrabold text-[#26312D] sm:text-3xl lg:text-4xl">
            Khách Hàng Nói Gì Về <span className="text-[#C4922F]">Hải Sản Phan Thiết?</span>
          </h2>
          <p className="mt-2 text-xs leading-relaxed text-text-secondary sm:text-sm">
            Hàng ngàn bữa ăn gia đình & tiệc nhậu trọn vẹn nhờ hải sản tươi sống mỗi ngày
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((review) => (
            <div
              key={review.id}
              className="flex flex-col justify-between rounded-2xl border border-[#E4E0D8] bg-white p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[#C4922F]/40 hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#D9A441]">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Icon key={i} name="star" size="xs" />
                    ))}
                  </div>
                  <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-600">
                    Đã mua hàng
                  </span>
                </div>

                <p className="mt-4 text-xs leading-relaxed text-[#26312D] sm:text-sm">
                  &quot;{review.comment}&quot;
                </p>
              </div>

              <div className="mt-6 border-t border-[#E4E0D8]/60 pt-4">
                <p className="text-xs font-bold text-[#0B2F28]">{review.product}</p>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0B2F28] text-xs font-extrabold text-white">
                      {review.avatar}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#26312D]">{review.name}</p>
                      <p className="text-[11px] text-text-secondary">{review.location}</p>
                    </div>
                  </div>
                  <span className="text-[11px] text-text-secondary">{review.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
