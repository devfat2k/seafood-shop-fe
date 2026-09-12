import Image from 'next/image';
import { Icon } from '@/components/common/Icon';

type ProductReviewsTabProps = {
  rating: number;
  reviewCount: number;
};

const RATING_BREAKDOWN = [
  { stars: 5, percentage: 88, count: 42 },
  { stars: 4, percentage: 10, count: 5 },
  { stars: 3, percentage: 2, count: 1 },
  { stars: 2, percentage: 0, count: 0 },
  { stars: 1, percentage: 0, count: 0 },
];

const DEFAULT_REVIEWS = [
  {
    id: 'rev-1',
    author: 'Phạm Hoàng Yến',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    size: '1 Kg (Gia đình 3-4 người)',
    date: '10/08/2026',
    rating: 5,
    tag: 'Đã mua hàng',
    comment:
      'Hải sản giao đến nhà đúng 1 tiếng 45 phút, đóng túi oxy mực vẫn còn đổi màu lấp lánh cực kỳ tươi. Hấp gừng sả ăn ngọt lịm chắc thịt, không bị teo nước. Sẽ ủng hộ shop lâu dài!',
  },
  {
    id: 'rev-2',
    author: 'Lê Minh Hoàng',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    size: 'Khay 500g (Làm sạch sẵn)',
    date: '05/08/2026',
    rating: 5,
    tag: 'Đã mua hàng',
    comment:
      'Hàng tươi ngon chuẩn cảng Phan Thiết, cân đủ đúng trọng lượng cam kết. Thùng đá gel giữ lạnh rất chuyên nghiệp, shop làm sạch sẵn nên về chỉ việc chế biến cực tiện.',
  },
  {
    id: 'rev-3',
    author: 'Nguyễn Thị Bích Ngọc',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    size: 'Túi oxy sống (Giao hỏa tốc 2H)',
    date: '01/08/2026',
    rating: 5,
    tag: 'Đã mua hàng',
    comment:
      'Lần đầu tiên đặt thử hải sản online mà ưng ý thế này. Đồ tươi rói, nước chấm muối ớt tặng kèm cũng ngon xuất sắc. 10 điểm cho chất lượng và dịch vụ!',
  },
];

export const ProductReviewsTab = ({ rating, reviewCount }: ProductReviewsTabProps) => (
  <div className="space-y-8">
    <div className="grid grid-cols-1 gap-6 rounded-2xl border border-border bg-background p-6 sm:grid-cols-12 sm:p-8">
      <div className="flex flex-col items-center justify-center border-b border-border pb-6 text-center sm:col-span-5 sm:border-r sm:border-b-0 sm:pr-8 sm:pb-0">
        <span className="font-heading text-5xl font-black text-foreground sm:text-6xl">
          {rating.toFixed(1)}
        </span>
        <div className="mt-2 flex items-center gap-1 text-accent">
          {Array.from({ length: 5 }).map((_, i) => (
            <Icon key={i} name="star" size="sm" className="fill-accent text-accent" />
          ))}
        </div>
        <span className="mt-2 text-xs font-medium text-muted-foreground">
          Dựa trên {reviewCount} đánh giá từ khách hàng đã trải nghiệm
        </span>
      </div>

      <div className="flex flex-col justify-center space-y-2 sm:col-span-7 sm:pl-4">
        {RATING_BREAKDOWN.map((row) => (
          <div key={row.stars} className="flex items-center gap-3 text-xs">
            <span className="w-10 font-bold text-foreground">{row.stars} sao</span>
            <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-accent transition-all duration-500"
                style={{ width: `${row.percentage}%` }}
              />
            </div>
            <span className="w-8 text-right font-medium text-muted-foreground">
              {row.percentage}%
            </span>
          </div>
        ))}
      </div>
    </div>

    <div className="divide-y divide-border">
      {DEFAULT_REVIEWS.map((rev) => (
        <div key={rev.id} className="space-y-3 py-5 first:pt-0 last:pb-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src={rev.avatar}
                alt={rev.author}
                width={40}
                height={40}
                unoptimized
                className="h-10 w-10 rounded-full border border-border object-cover"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-foreground">{rev.author}</h4>
                  <span className="inline-flex items-center gap-0.5 rounded-full bg-tertiary/10 px-2 py-0.5 text-[10px] font-bold text-tertiary">
                    <Icon name="check" size="xs" />
                    <span>{rev.tag}</span>
                  </span>
                </div>
                <span className="text-[11px] text-muted-foreground">
                  Phân loại: {rev.size} • {rev.date}
                </span>
              </div>
            </div>

            <div className="flex items-center text-accent">
              {Array.from({ length: rev.rating }).map((_, i) => (
                <Icon key={i} name="star" size="xs" className="fill-accent text-accent" />
              ))}
            </div>
          </div>
          <p className="text-xs leading-relaxed text-foreground/80 sm:text-sm">{rev.comment}</p>
        </div>
      ))}
    </div>
  </div>
);
