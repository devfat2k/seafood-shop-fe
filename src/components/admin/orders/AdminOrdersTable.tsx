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
    <div className="overflow-x-auto rounded-xl border border-border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/30">
            <TableHead className="min-w-[130px] text-xs font-bold uppercase">Mã Đơn Hàng</TableHead>
            <TableHead className="min-w-[120px] text-xs font-bold uppercase">Ngày Đặt</TableHead>
            <TableHead className="text-center text-xs font-bold uppercase">Trạng Thái</TableHead>
            <TableHead className="text-right text-xs font-bold uppercase">Tổng Giá Trị</TableHead>
            <TableHead className="text-center text-xs font-bold uppercase">Phương Thức</TableHead>
            <TableHead className="text-center text-xs font-bold uppercase">
              Chuyển Trạng Thái
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => {
            const badge = getStatusBadge(order.status);
            const nextStatuses = NEXT_STATUS[order.status] ?? [];
            return (
              <TableRow key={order.id} className="transition-colors hover:bg-muted/40">
                <TableCell className="font-mono text-sm font-bold text-foreground">
                  {order.code}
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">
                  {new Date(order.orderDate).toLocaleDateString('vi-VN', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </TableCell>
                <TableCell className="text-center">
                  <Badge className={`px-2.5 py-0.5 text-xs font-semibold ${badge.color}`}>
                    {badge.label}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-heading text-sm font-bold text-primary">
                  {formatCurrency(order.totalPrice)}
                </TableCell>
                <TableCell className="text-center text-xs font-medium text-muted-foreground">
                  {order.paymentMethod ?? 'COD'}
                </TableCell>
                <TableCell className="text-center">
                  {nextStatuses.length > 0 ? (
                    <div className="flex flex-wrap items-center justify-center gap-1.5">
                      {nextStatuses.map((ns) => {
                        const nsBadge = getStatusBadge(ns);
                        return (
                          <button
                            key={ns}
                            type="button"
                            onClick={() => {
                              onUpdateStatus(order.id, ns);
                            }}
                            className={`rounded-lg px-2.5 py-1 text-xs font-semibold shadow-2xs transition-transform hover:scale-105 ${nsBadge.color}`}
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
    </div>

    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
      <span className="text-xs text-muted-foreground">
        Trang <strong className="text-foreground">{page + 1}</strong> / {totalPages} · Tổng{' '}
        <strong className="text-foreground">{totalElements}</strong> đơn hàng
      </span>
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant="outline"
          className="h-8 text-xs font-semibold"
          disabled={page === 0}
          onClick={() => {
            onPageChange(Math.max(0, page - 1));
          }}
        >
          Trang trước
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="h-8 text-xs font-semibold"
          disabled={isLastPage}
          onClick={() => {
            onPageChange(page + 1);
          }}
        >
          Trang sau
        </Button>
      </div>
    </div>
  </>
);
