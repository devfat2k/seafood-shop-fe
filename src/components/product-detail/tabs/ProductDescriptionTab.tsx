import { Icon } from '@/components/common/Icon';
import type { Product } from '@/types/api';

type ProductDescriptionTabProps = {
  product: Product;
};

const DISH_RECOMMENDATIONS = [
  {
    name: 'Hấp gừng sả lá chanh',
    time: '8 - 10 phút',
    desc: 'Giữ trọn độ ngọt tự nhiên, giòn dai sần sật. Chấm cùng muối ớt chanh Phan Thiết.',
    badge: 'Khuyên dùng',
  },
  {
    name: 'Nướng muối ớt / Sa tế bơ tỏi',
    time: '12 - 15 phút',
    desc: 'Thơm lừng đậm đà trên than hoa, vị cay the kích thích vị giác cực đỉnh.',
    badge: 'Món nhậu ngon',
  },
  {
    name: 'Xào chua ngọt / Chiên nước mắm',
    time: '10 phút',
    desc: 'Hương vị mặn ngọt hài hòa, sốt óng ánh cực kỳ đưa cơm cho cả gia đình.',
    badge: 'Bữa cơm gia đình',
  },
];

export const ProductDescriptionTab = ({ product }: ProductDescriptionTabProps) => (
  <div className="space-y-8">
    <div className="space-y-4">
      <h3 className="font-heading text-lg font-bold text-foreground sm:text-xl">
        {product.name} — Tinh hoa hải sản đánh bắt trong ngày tại vùng biển Phan Thiết
      </h3>
      <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
        {product.description ??
          'Hải sản được đội tàu ngư dân Phan Thiết đánh bắt tự nhiên từ vùng nước sâu Bình Thuận và cập cảng vào lúc 4 giờ sáng. Ngay khi lên bờ, từng cá thể được tuyển chọn kỹ lưỡng theo tiêu chuẩn loại 1 (kích thước đồng đều, thịt dày chắc, mắt trong veo, thân sáng óng ánh).'}
      </p>
      <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
        Chúng tôi áp dụng quy trình kiểm soát chuỗi lạnh khép kín (Cold Chain) từ bến cảng đến tận
        cửa nhà bạn trong vòng 2 giờ. Sản phẩm được đóng gói trong túi oxy bơi sống hoặc thùng xốp
        giữ nhiệt đá gel chuyên dụng, cam kết 100% không sử dụng hóa chất hay chất bảo quản.
      </p>
    </div>

    <div className="rounded-2xl border border-secondary/20 bg-secondary/5 p-5 sm:p-6">
      <div className="mb-4 flex items-center gap-2">
        <Icon name="sparkles" size="sm" className="text-secondary" />
        <h4 className="font-heading text-base font-bold text-foreground">
          Gợi ý món ngon chế biến từ {product.name}
        </h4>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {DISH_RECOMMENDATIONS.map((dish, idx) => (
          <div
            key={idx}
            className="flex flex-col justify-between rounded-xl border border-border bg-card p-4 shadow-2xs transition-all hover:border-secondary/40"
          >
            <div>
              <div className="flex items-center justify-between gap-1">
                <span className="text-xs font-bold text-foreground">{dish.name}</span>
                <span className="rounded-md bg-secondary/10 px-1.5 py-0.5 text-[10px] font-semibold text-secondary">
                  {dish.badge}
                </span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{dish.desc}</p>
            </div>
            <div className="mt-3 flex items-center gap-1 text-[11px] font-medium text-foreground/80">
              <Icon name="clock" size="xs" className="text-muted-foreground" />
              <span>Thời gian: {dish.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
