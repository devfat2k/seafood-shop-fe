'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { AdminOrderStatus } from '@/types/admin';
import type { OrderResponse } from '@/types/order';
import { formatCurrency } from '@/utils/Helpers';
import { getStatusBadge } from './AdminOrdersToolbar';

const NEXT_STATUS: Record<string, AdminOrderStatus[]> = {
  PENDING: ['CONFIRMED', 'CANCELLED'],
  CONFIRMED: ['SHIPPED', 'CANCELLED'],
  SHIPPED: ['DONE'],
  DONE: [],
  CANCELLED: [],
};

type AdminOrdersTableProps = {
  orders: OrderResponse[];
  page: number;
  totalPages: number;
  totalElements: number;
  isLastPage: boolean;
  isUpdating: boolean;
  onPageChange: (page: number) => void;
  onUpdateStatus: (id: number, status: AdminOrderStatus) => void;
};

export const AdminOrdersTable = ({
  orders,
  page,
  totalPages,
  totalElements,
  isLastPage,
  isUpdating,
  onPageChange,
  onUpdateStatus,
}: AdminOrdersTableProps) => (
  <>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Mã Đơn</TableHead>
          <TableHead>Ngày Đặt</TableHead>
          <TableHead className="text-center">Trạng Thái</TableHead>
          <TableHead className="text-right">Tổng Tiền</TableHead>
          <TableHead>Thanh Toán</TableHead>
          <TableHead className="text-center">Chuyển Trạng Thái</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => {
          const badge = getStatusBadge(order.status);
          const nextStatuses = NEXT_STATUS[order.status] ?? [];
          return (
            <TableRow key={order.id}>
              <TableCell className="text-xs font-bold text-foreground">{order.code}</TableCell>
              <TableCell className="text-xs text-muted-foreground">
                {new Date(order.orderDate).toLocaleDateString('vi-VN')}
              </TableCell>
              <TableCell className="text-center">
                <Badge className={`text-xs ${badge.color}`}>{badge.label}</Badge>
              </TableCell>
              <TableCell className="text-right text-xs font-semibold text-foreground">
                {formatCurrency(order.totalPrice)}
              </TableCell>
              <TableCell className="text-xs text-muted-foreground">
                {order.paymentMethod ?? '—'}
              </TableCell>
              <TableCell className="text-center">
                {nextStatuses.length > 0 ? (
                  <div className="flex items-center justify-center gap-1">
                    {nextStatuses.map((ns) => {
                      const nsBadge = getStatusBadge(ns);
                      return (
                        <button
                          key={ns}
                          type="button"
                          onClick={() => {
                            onUpdateStatus(order.id, ns);
                          }}
                          className={`rounded-md px-2 py-1 text-xs font-semibold transition-colors hover:opacity-80 ${nsBadge.color}`}
                          disabled={isUpdating}
                        >
                          → {nsBadge.label}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <span className="text-xs text-muted-foreground">—</span>
                )}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>

    <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
      <span className="text-xs text-muted-foreground">
        Trang {page + 1} / {totalPages} · Tổng {totalElements} đơn hàng
      </span>
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant="outline"
          disabled={page === 0}
          onClick={() => {
            onPageChange(Math.max(0, page - 1));
          }}
        >
          Trước
        </Button>
        <Button
          size="sm"
          variant="outline"
          disabled={isLastPage}
          onClick={() => {
            onPageChange(page + 1);
          }}
        >
          Sau
        </Button>
      </div>
    </div>
  </>
);
