'use client';

import { Icon } from '@/components/common/Icon';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { DailyArrival } from '@/types/admin';
import { formatCurrency } from '@/utils/Helpers';

type DailyArrivalsTableProps = {
  arrivals: DailyArrival[];
  deletingId: number | null;
  onEdit: (arr: DailyArrival) => void;
  onDelete: (arr: DailyArrival) => void;
};

export const DailyArrivalsTable = ({
  arrivals,
  deletingId,
  onEdit,
  onDelete,
}: DailyArrivalsTableProps) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead className="w-10 text-center">#</TableHead>
        <TableHead>Tên Hải Sản / Tiêu Đề</TableHead>
        <TableHead>Badge</TableHead>
        <TableHead className="text-right">Giá Bán</TableHead>
        <TableHead>Ngày Cập Bến</TableHead>
        <TableHead className="text-right">Thao Tác</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {arrivals.map((arr, idx) => (
        <TableRow key={arr.id}>
          <TableCell className="text-center text-xs font-bold text-muted-foreground">
            {idx + 1}
          </TableCell>
          <TableCell className="text-xs font-semibold text-foreground">
            {arr.title ?? arr.productName ?? '—'}
          </TableCell>
          <TableCell className="text-xs">
            {arr.badge ? (
              <Badge variant="outline" className="text-xs">
                {arr.badge}
              </Badge>
            ) : (
              '—'
            )}
          </TableCell>
          <TableCell className="text-right text-xs font-semibold text-foreground">
            {arr.price ? formatCurrency(arr.price) : '—'}
          </TableCell>
          <TableCell className="text-xs text-muted-foreground">
            {arr.arrivalDate ? new Date(arr.arrivalDate).toLocaleDateString('vi-VN') : '—'}
          </TableCell>
          <TableCell className="text-right">
            <div className="inline-flex items-center gap-1">
              <button
                type="button"
                onClick={() => {
                  onEdit(arr);
                }}
                className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                title="Chỉnh sửa"
              >
                <Icon name="edit-3" size="xs" />
              </button>
              <button
                type="button"
                onClick={() => {
                  onDelete(arr);
                }}
                disabled={deletingId === arr.id}
                className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive disabled:opacity-50"
                title="Xóa"
              >
                <Icon name="trash-2" size="xs" />
              </button>
            </div>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);
