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
import type { Category } from '@/types/api';

type AdminCategoriesTableProps = {
  categories: Category[];
  deletingId: number | null;
  onEdit: (cat: Category) => void;
  onUploadImage: (cat: Category) => void;
  onConfigHome: (cat: Category) => void;
  onDelete: (cat: Category) => void;
};

export const AdminCategoriesTable = ({
  categories,
  deletingId,
  onEdit,
  onUploadImage,
  onConfigHome,
  onDelete,
}: AdminCategoriesTableProps) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead className="w-12 text-center">#</TableHead>
        <TableHead>Tên Danh Mục</TableHead>
        <TableHead>Mô Tả</TableHead>
        <TableHead className="text-center">Ảnh</TableHead>
        <TableHead className="text-center">Hiển Thị Home</TableHead>
        <TableHead className="text-right">Thao Tác</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {categories.map((cat, index) => (
        <TableRow key={cat.id}>
          <TableCell className="text-center text-xs font-bold text-muted-foreground">
            {index + 1}
          </TableCell>
          <TableCell className="text-xs font-semibold text-foreground">
            {cat.name ?? cat.categoryName ?? '—'}
          </TableCell>
          <TableCell className="max-w-[200px] truncate text-xs text-muted-foreground">
            {cat.description ?? '—'}
          </TableCell>
          <TableCell className="text-center">
            <button
              type="button"
              onClick={() => {
                onUploadImage(cat);
              }}
              className="inline-flex items-center gap-1"
              title="Bấm để upload ảnh danh mục"
            >
              {cat.imageUrl ? (
                <Badge variant="default" className="cursor-pointer text-xs">
                  Đã có ảnh
                </Badge>
              ) : (
                <Badge variant="outline" className="cursor-pointer text-xs">
                  + Thêm ảnh
                </Badge>
              )}
            </button>
          </TableCell>
          <TableCell className="text-center">
            <button
              type="button"
              onClick={() => {
                onConfigHome(cat);
              }}
              title="Cấu hình hiển thị Bento Grid trên trang chủ"
            >
              {cat.homeDisplayStyle ? (
                <Badge
                  variant="outline"
                  className="cursor-pointer border-primary text-xs text-primary"
                >
                  Bento: {cat.homeDisplayStyle}
                </Badge>
              ) : (
                <span className="cursor-pointer text-xs text-muted-foreground hover:underline">
                  + Cấu hình
                </span>
              )}
            </button>
          </TableCell>
          <TableCell className="text-right">
            <div className="inline-flex items-center gap-1">
              <button
                type="button"
                onClick={() => {
                  onConfigHome(cat);
                }}
                className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
                title="Cấu hình Bento Grid"
              >
                <Icon name="sparkles" size="xs" />
              </button>

              <button
                type="button"
                onClick={() => {
                  onUploadImage(cat);
                }}
                className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                title="Upload ảnh danh mục"
              >
                <Icon name="camera" size="xs" />
              </button>

              <button
                type="button"
                onClick={() => {
                  onEdit(cat);
                }}
                className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                title="Chỉnh sửa danh mục"
              >
                <Icon name="edit-3" size="xs" />
              </button>

              <button
                type="button"
                onClick={() => {
                  onDelete(cat);
                }}
                disabled={deletingId === cat.id}
                className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive disabled:opacity-50"
                title="Xóa danh mục"
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
