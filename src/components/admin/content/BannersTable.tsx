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
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead className="w-10 text-center">#</TableHead>
        <TableHead>Tiêu Đề / Mô Tả</TableHead>
        <TableHead>Link Liên Kết</TableHead>
        <TableHead className="text-center">Thứ Tự</TableHead>
        <TableHead className="text-center">Trạng Thái</TableHead>
        <TableHead className="text-right">Thao Tác</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {banners.map((banner, index) => (
        <TableRow key={banner.id}>
          <TableCell className="text-center text-xs font-bold text-muted-foreground">
            {index + 1}
          </TableCell>
          <TableCell>
            <div className="space-y-0.5">
              <p className="text-xs font-semibold text-foreground">{banner.title}</p>
              {banner.subtitle && (
                <p className="line-clamp-1 text-xs text-muted-foreground">{banner.subtitle}</p>
              )}
            </div>
          </TableCell>
          <TableCell className="text-xs text-muted-foreground">
            {banner.ctaLink ? <span className="font-mono text-xs">{banner.ctaLink}</span> : '—'}
          </TableCell>
          <TableCell className="text-center text-xs font-bold">{banner.sortOrder ?? 0}</TableCell>
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
                className="cursor-pointer text-xs"
              >
                {banner.isActive ? 'Hiển thị' : 'Ẩn'}
              </Badge>
            </button>
          </TableCell>
          <TableCell className="text-right">
            <div className="inline-flex items-center gap-1">
              <button
                type="button"
                onClick={() => {
                  onEdit(banner);
                }}
                className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                title="Chỉnh sửa banner"
              >
                <Icon name="edit-3" size="xs" />
              </button>
              <button
                type="button"
                onClick={() => {
                  onDelete(banner);
                }}
                disabled={deletingId === banner.id}
                className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive disabled:opacity-50"
                title="Xóa banner"
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
