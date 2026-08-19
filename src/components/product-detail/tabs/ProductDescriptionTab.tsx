import type { Product } from '@/types/api';

type ProductDescriptionTabProps = {
  product: Product;
};

export const ProductDescriptionTab = ({ product }: ProductDescriptionTabProps) => (
  <div className="space-y-6">
    <div className="space-y-4 text-xs leading-relaxed text-muted-foreground sm:text-sm">
      <p className="font-heading text-base font-bold text-foreground sm:text-lg">
        {product.name} — Đặc sản biển tự nhiên từ vùng biển Phan Thiết, Bình Thuận.
      </p>
      <p>
        {product.description ??
          'Sản phẩm được ngư dân Phan Thiết đánh bắt tự nhiên trong ngày bằng phương pháp thủ công, đảm bảo hải sản không bị dập nát hay mất độ tươi. Ngay sau khi kéo lưới, hải sản được bảo quản bằng đá tuyết hoặc bể oxy chuyển lạnh 2H về TP.HCM.'}
      </p>
      <p>
        Cam kết 100% hải sản sạch tự nhiên, không sử dụng chất bảo quản hay hóa chất tẩy rửa. Hoàn
        tiền hoặc đổi mới 1-1 nếu chất lượng không đạt chuẩn tươi ngon khi nhận hàng.
      </p>
    </div>
  </div>
);
