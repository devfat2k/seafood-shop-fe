import type { Product } from '@/types/api';

type ProductSpecsTabProps = {
  product: Product;
};

export const ProductSpecsTab = ({ product }: ProductSpecsTabProps) => (
  <div className="space-y-4">
    <div className="overflow-hidden rounded-xl border border-border">
      <table className="w-full text-left text-xs sm:text-sm">
        <tbody className="divide-y divide-border">
          <tr className="bg-muted/30">
            <td className="w-1/3 px-4 py-3 font-bold text-foreground sm:px-6">Tên sản phẩm</td>
            <td className="px-4 py-3 text-muted-foreground sm:px-6">{product.name}</td>
          </tr>
          <tr>
            <td className="px-4 py-3 font-bold text-foreground sm:px-6">Nguồn gốc / Xuất xứ</td>
            <td className="px-4 py-3 text-muted-foreground sm:px-6">
              {product.origin ?? 'Cảng cá Phan Thiết, Bình Thuận'}
            </td>
          </tr>
          <tr className="bg-muted/30">
            <td className="px-4 py-3 font-bold text-foreground sm:px-6">Quy cách đóng gói</td>
            <td className="px-4 py-3 text-muted-foreground sm:px-6">
              {product.spec ?? 'Túi oxy / Hút chân không đóng thùng xốp đá gel'}
            </td>
          </tr>
          <tr>
            <td className="px-4 py-3 font-bold text-foreground sm:px-6">Danh mục</td>
            <td className="px-4 py-3 text-muted-foreground sm:px-6">
              {product.categoryName ?? 'Hải Sản Tươi Sống'}
            </td>
          </tr>
          <tr className="bg-muted/30">
            <td className="px-4 py-3 font-bold text-foreground sm:px-6">Bảo quản</td>
            <td className="px-4 py-3 text-muted-foreground sm:px-6">
              Bể oxy lạnh (đối với hàng sống) hoặc ngăn đông -18°C
            </td>
          </tr>
          <tr>
            <td className="px-4 py-3 font-bold text-foreground sm:px-6">Hạn sử dụng</td>
            <td className="px-4 py-3 text-muted-foreground sm:px-6">
              Dùng ngon nhất trong vòng 24 - 48h sau khi nhận
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);
