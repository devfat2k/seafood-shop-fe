'use client';

import { Icon } from '@/components/common/Icon';
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
import type { HeroBanner } from '@/types/admin';

type BannersTableProps = {
  banners: HeroBanner[];
  deletingId: number | null;
  onEdit: (banner: HeroBanner) => void;
  onToggle: (id: number) => void;
  onDelete: (banner: HeroBanner) => void;
};

export const BannersTable = ({
  banners,
  deletingId,
  onEdit,
  onToggle,
  onDelete,
}: BannersTableProps) => (
  <div className="overflow-x-auto rounded-xl border border-border">
    <Table>
      <TableHeader>
        <TableRow className="bg-muted/30">
          <TableHead className="w-12 text-center text-xs font-bold uppercase">#</TableHead>
          <TableHead className="min-w-[200px] text-xs font-bold uppercase">
            Tiêu Đề / Mô Tả
          </TableHead>
          <TableHead className="min-w-[160px] text-xs font-bold uppercase">Link CTA</TableHead>
          <TableHead className="text-center text-xs font-bold uppercase">Thứ Tự</TableHead>
          <TableHead className="text-center text-xs font-bold uppercase">Trạng Thái</TableHead>
          <TableHead className="text-right text-xs font-bold uppercase">Thao Tác</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {banners.map((banner, index) => (
          <TableRow key={banner.id} className="transition-colors hover:bg-muted/40">
            <TableCell className="text-center font-mono text-xs font-bold text-muted-foreground">
              {index + 1}
            </TableCell>
            <TableCell>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-foreground">{banner.title}</p>
                {banner.subtitle && (
                  <p className="line-clamp-1 text-xs text-muted-foreground">{banner.subtitle}</p>
                )}
              </div>
            </TableCell>
            <TableCell className="text-xs text-muted-foreground">
              {banner.ctaLink ? (
                <span className="font-mono text-xs text-primary">{banner.ctaLink}</span>
              ) : (
                '—'
              )}
            </TableCell>
            <TableCell className="text-center font-mono text-xs font-bold text-foreground">
              {banner.sortOrder ?? 0}
            </TableCell>
            <TableCell className="text-center">
              <button
                type="button"
                onClick={() => {
                  onToggle(banner.id);
                }}
                className="inline-flex items-center"
              >
                <Badge
                  variant={banner.isActive ? 'default' : 'secondary'}
                  className="cursor-pointer px-2.5 py-0.5 text-xs font-semibold"
                >
                  {banner.isActive ? 'Hiển thị' : 'Ẩn'}
                </Badge>
              </button>
            </TableCell>
            <TableCell className="text-right">
              <div className="inline-flex items-center gap-1.5">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    onEdit(banner);
                  }}
                  className="h-8 px-2.5 text-xs font-semibold"
                  title="Chỉnh sửa banner"
                >
                  <Icon name="edit-3" size="xs" className="mr-1" />
                  <span>Sửa</span>
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    onDelete(banner);
                  }}
                  disabled={deletingId === banner.id}
                  className="h-8 px-2 text-xs text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                  title="Xóa banner"
                >
                  <Icon name="trash-2" size="xs" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);
