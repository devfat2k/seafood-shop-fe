import { Icon } from '@/components/common/Icon';
import type { FeaturedReview, HomeStats } from '@/types/home';

type SocialProofSectionProps = {
  reviews?: FeaturedReview[];
  stats?: HomeStats;
};

export function SocialProofSection(props: SocialProofSectionProps) {
  const { reviews = [], stats } = props;

  const displayStats = {
    orders: stats?.totalOrdersDelivered
      ? `${stats.totalOrdersDelivered.toLocaleString('vi-VN')}+`
      : '12.000+',
    rating: stats?.averageRating ? `${stats.averageRating.toFixed(1)} / 5.0` : '4.9 / 5.0',
    totalReviews: stats?.totalReviews
      ? `${stats.totalReviews.toLocaleString('vi-VN')}+ Đánh Giá`
      : '10.000+ Đánh Giá',
  };

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
              {displayStats.orders}
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
              {displayStats.rating}
            </p>
            <p className="mt-1 text-sm font-semibold text-text-secondary">
              Rating {displayStats.totalReviews}
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
        {reviews.length > 0 && (
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="flex flex-col justify-between rounded-2xl border border-[#E4E0D8] bg-white p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[#C4922F]/40 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[#D9A441]">
                      {Array.from({ length: review.rating ?? 5 }).map((_, i) => (
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
                  {review.product && (
                    <p className="text-xs font-bold text-[#0B2F28]">{review.product}</p>
                  )}
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0B2F28] text-xs font-extrabold text-white">
                        {review.avatar || review.author.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#26312D]">{review.author}</p>
                        {review.location && (
                          <p className="text-[11px] text-text-secondary">{review.location}</p>
                        )}
                      </div>
                    </div>
                    <span className="text-[11px] text-text-secondary">{review.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
