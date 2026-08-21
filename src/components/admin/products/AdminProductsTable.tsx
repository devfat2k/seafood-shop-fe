'use client';

import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { Product } from '@/types/api';
import { ProductTablePagination } from './ProductTablePagination';
import { ProductTableRow } from './ProductTableRow';

type AdminProductsTableProps = {
  products: Product[];
  page: number;
  totalPages: number;
  totalElements: number;
  isLastPage: boolean;
  onPageChange: (page: number) => void;
  onViewDetail: (product: Product) => void;
  onEdit: (product: Product) => void;
  onAdjustStock: (product: Product) => void;
  onUploadImage: (product: Product) => void;
  onConfigureCombo: (product: Product) => void;
  onToggleFeatured: (id: number) => void;
  onDelete: (product: Product) => void;
};

export const AdminProductsTable = ({
  products,
  page,
  totalPages,
  totalElements,
  isLastPage,
  onPageChange,
  onViewDetail,
  onEdit,
  onAdjustStock,
  onUploadImage,
  onConfigureCombo,
  onToggleFeatured,
  onDelete,
}: AdminProductsTableProps) => (
  <>
    <div className="overflow-x-auto rounded-xl border border-border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/30">
            <TableHead className="w-12 text-center text-xs font-bold uppercase">#</TableHead>
            <TableHead className="min-w-[240px] text-xs font-bold uppercase">Sản Phẩm</TableHead>
            <TableHead className="text-right text-xs font-bold uppercase">Giá Bán</TableHead>
            <TableHead className="text-center text-xs font-bold uppercase">Tồn Kho</TableHead>
            <TableHead className="text-center text-xs font-bold uppercase">Trạng Thái</TableHead>
            <TableHead className="text-center text-xs font-bold uppercase">Nổi Bật</TableHead>
            <TableHead className="text-right text-xs font-bold uppercase">Thao Tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product, index) => (
            <ProductTableRow
              key={product.id}
              product={product}
              index={index}
              page={page}
              onViewDetail={onViewDetail}
              onEdit={onEdit}
              onAdjustStock={onAdjustStock}
              onUploadImage={onUploadImage}
              onConfigureCombo={onConfigureCombo}
              onToggleFeatured={onToggleFeatured}
              onDelete={onDelete}
            />
          ))}
        </TableBody>
      </Table>
    </div>

    <ProductTablePagination
      page={page}
      totalPages={totalPages}
      totalElements={totalElements}
      isLastPage={isLastPage}
      onPageChange={onPageChange}
    />
  </>
);
