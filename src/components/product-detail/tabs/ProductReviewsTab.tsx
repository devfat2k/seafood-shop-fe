import Image from 'next/image';
import { Icon } from '@/components/common/Icon';

type ProductReviewsTabProps = {
  rating: number;
  reviewCount: number;
};

const DEFAULT_REVIEWS = [
  {
    id: 'rev-1',
    author: 'Phạm Hoàng Yến',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    size: 'Quy cách chuẩn',
    date: '10/08/2026',
    rating: 5,
    comment:
      'Hải sản giao đến nhà tươi rói, đóng gói chu đáo giữ lạnh tốt. Ăn ngọt lịm chắc thịt. Sẽ ủng hộ lâu dài!',
  },
  {
    id: 'rev-2',
    author: 'Lê Minh Hoàng',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    size: 'Đóng khay hút chân không',
    date: '05/08/2026',
    rating: 5,
    comment:
      'Hàng tươi ngon, cân đúng trọng lượng cam kết. Chuỗi lạnh giao hàng rất chuyên nghiệp, đóng gói cẩn thận.',
  },
];

export const ProductReviewsTab = ({ rating, reviewCount }: ProductReviewsTabProps) => (
  <div className="space-y-8">
    <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-border bg-background p-6 sm:flex-row sm:p-8">
      <div className="flex items-center gap-4">
        <span className="font-heading text-4xl font-bold text-foreground sm:text-5xl">
          {rating}
        </span>
        <div>
          <div className="flex items-center gap-1 text-accent">
            {Array.from({ length: 5 }).map((_, i) => (
              <Icon key={i} name="star" size="sm" />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            Dựa trên {reviewCount} đánh giá từ khách hàng đã mua
          </span>
        </div>
      </div>
    </div>

    <div className="divide-y divide-border/60">
      {DEFAULT_REVIEWS.map((rev) => (
        <div key={rev.id} className="space-y-3 py-6 first:pt-0 last:pb-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src={rev.avatar}
                alt={rev.author}
                width={36}
                height={36}
                unoptimized
                className="h-9 w-9 rounded-full object-cover"
              />
              <div>
                <h4 className="text-xs font-bold text-foreground">{rev.author}</h4>
                <span className="text-xs text-muted-foreground">
                  {rev.size} • {rev.date}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-0.5 text-accent">
              {Array.from({ length: rev.rating }).map((_, i) => (
                <Icon key={i} name="star" size="xs" />
              ))}
            </div>
          </div>
          <p className="text-xs leading-relaxed text-muted-foreground">{rev.comment}</p>
        </div>
      ))}
    </div>
  </div>
);
