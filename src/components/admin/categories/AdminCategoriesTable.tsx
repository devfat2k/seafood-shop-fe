'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Icon } from '@/components/common/Icon';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
}: AdminCategoriesTableProps) => {
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/30">
            <TableHead className="w-12 text-center text-xs font-bold uppercase">#</TableHead>
            <TableHead className="w-16 text-center text-xs font-bold uppercase">Ảnh</TableHead>
            <TableHead className="min-w-[180px] text-xs font-bold uppercase">
              Tên Danh Mục
            </TableHead>
            <TableHead className="min-w-[200px] text-xs font-bold uppercase">Mô Tả</TableHead>
            <TableHead className="text-center text-xs font-bold uppercase">
              Hiển Thị Home (Bento)
            </TableHead>
            <TableHead className="text-right text-xs font-bold uppercase">Thao Tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((cat, index) => {
            const imgErr = imageErrors[cat.id];

            return (
              <TableRow key={cat.id} className="transition-colors hover:bg-muted/40">
                <TableCell className="text-center font-mono text-xs font-bold text-muted-foreground">
                  {index + 1}
                </TableCell>
                <TableCell className="text-center">
                  <button
                    type="button"
                    onClick={() => {
                      onUploadImage(cat);
                    }}
                    className="relative mx-auto flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-muted shadow-2xs transition-transform hover:scale-105"
                    title="Nhấn để đổi ảnh danh mục"
                  >
                    {cat.imageUrl && !imgErr ? (
                      <Image
                        src={cat.imageUrl}
                        alt={cat.name ?? cat.categoryName ?? ''}
                        fill
                        className="object-cover"
                        unoptimized
                        onError={() => {
                          setImageErrors((prev) => ({ ...prev, [cat.id]: true }));
                        }}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                        <Icon name="camera" size="xs" />
                      </div>
                    )}
                  </button>
                </TableCell>
                <TableCell className="text-sm font-semibold text-foreground">
                  {cat.name ?? cat.categoryName ?? '—'}
                </TableCell>
                <TableCell className="max-w-[260px] truncate text-xs text-muted-foreground">
                  {cat.description ?? '—'}
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
                        className="cursor-pointer border-primary px-2 py-0.5 text-xs font-semibold text-primary shadow-2xs hover:bg-primary/10"
                      >
                        Bento: {cat.homeDisplayStyle}
                      </Badge>
                    ) : (
                      <span className="cursor-pointer rounded-lg border border-dashed border-border px-2.5 py-1 text-xs text-muted-foreground hover:bg-muted hover:text-foreground">
                        + Thiết lập Bento
                      </span>
                    )}
                  </button>
                </TableCell>
                <TableCell className="text-right">
                  <div className="inline-flex items-center gap-1.5">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        onEdit(cat);
                      }}
                      className="h-8 px-2.5 text-xs font-semibold"
                      title="Chỉnh sửa danh mục"
                    >
                      <Icon name="edit-3" size="xs" className="mr-1" />
                      <span>Sửa</span>
                    </Button>

                    <DropdownMenu>
                      <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted">
                        <Icon name="more-horizontal" size="sm" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem
                          onClick={() => {
                            onConfigHome(cat);
                          }}
                          className="cursor-pointer gap-2 text-xs text-primary"
                        >
                          <Icon name="sparkles" size="xs" />
                          <span>Cấu hình Bento Grid</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            onUploadImage(cat);
                          }}
                          className="cursor-pointer gap-2 text-xs"
                        >
                          <Icon name="camera" size="xs" />
                          <span>Upload ảnh danh mục</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => {
                            onDelete(cat);
                          }}
                          disabled={deletingId === cat.id}
                          className="cursor-pointer gap-2 text-xs text-destructive focus:bg-destructive/10 focus:text-destructive"
                        >
                          <Icon name="trash-2" size="xs" />
                          <span>Xóa danh mục</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
