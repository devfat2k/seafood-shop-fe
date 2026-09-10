'use client';

import { Icon } from '@/components/common/Icon';
import { Badge } from '@/components/ui/badge';
import { DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import type { Product } from '@/types/api';

type ProductDetailHeaderProps = {
  product: Product;
};

export const ProductDetailHeader = ({ product }: ProductDetailHeaderProps) => (
  <DialogHeader className="space-y-1.5 border-b border-border pb-3">
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="outline" className="font-mono text-xs text-muted-foreground">
        #{product.id}
      </Badge>
      {product.categoryName && (
        <Badge variant="secondary" className="text-xs">
          {product.categoryName}
        </Badge>
      )}
      {product.productType === 'COMBO' && (
        <Badge variant="outline" className="border-amber-500 text-xs font-bold text-amber-600">
          COMBO
        </Badge>
      )}
      {product.featured && (
        <Badge className="bg-amber-500 text-xs text-white">
          <Icon name="star" size="xs" className="mr-1 fill-white" />
          Nổi bật
        </Badge>
      )}
      <Badge variant={product.active ? 'default' : 'secondary'} className="text-xs">
        {product.active ? 'Đang mở bán' : 'Đã ẩn khỏi shop'}
      </Badge>
    </div>
    <DialogTitle className="font-heading text-xl font-bold text-foreground sm:text-2xl">
      {product.name}
    </DialogTitle>
    <DialogDescription className="text-xs text-muted-foreground">
      Thông tin chi tiết, tình trạng kho hàng và cấu hình hiển thị của sản phẩm
    </DialogDescription>
  </DialogHeader>
);
