'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import {
  useAdminProductsQuery,
  useDeleteProductMutation,
  useToggleFeaturedMutation,
} from '@/libs/queries/admin/products';
import type { Product } from '@/types/api';

export function useAdminProductsFlow() {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<number | undefined>();
  const [productTypeFilter, setProductTypeFilter] = useState<string | undefined>();

  const [detailOpen, setDetailOpen] = useState(false);
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);

  const [formOpen, setFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [stockOpen, setStockOpen] = useState(false);
  const [stockProduct, setStockProduct] = useState<Product | null>(null);

  const [imageOpen, setImageOpen] = useState(false);
  const [imageProduct, setImageProduct] = useState<Product | null>(null);

  const [comboOpen, setComboOpen] = useState(false);
  const [comboProduct, setComboProduct] = useState<Product | null>(null);

  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm.trim());
      setPage(0);
    }, 300);
    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const { data, isLoading, isError, refetch } = useAdminProductsQuery({
    page,
    size: pageSize,
    search: debouncedSearch || undefined,
    categoryId: categoryFilter,
    productType: productTypeFilter,
  });

  const deleteMutation = useDeleteProductMutation();
  const toggleFeaturedMutation = useToggleFeaturedMutation();

  const handleClearSearch = () => {
    setSearchTerm('');
    setDebouncedSearch('');
    setCategoryFilter(undefined);
    setProductTypeFilter(undefined);
    setPage(0);
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) {
      return;
    }
    try {
      await deleteMutation.mutateAsync(deleteTarget.id);
      toast.success('Đã xóa sản phẩm thành công');
      setDeleteTarget(null);
      if (detailProduct?.id === deleteTarget.id) {
        setDetailOpen(false);
        setDetailProduct(null);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Xóa sản phẩm thất bại');
    }
  };

  const handleToggleFeatured = async (id: number) => {
    try {
      await toggleFeaturedMutation.mutateAsync(id);
      toast.success('Đã cập nhật trạng thái nổi bật');
      if (detailProduct?.id === id) {
        setDetailProduct((prev) => (prev ? { ...prev, featured: !prev.featured } : null));
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Cập nhật thất bại');
    }
  };

  return {
    page,
    setPage,
    pageSize,
    setPageSize,
    searchTerm,
    setSearchTerm,
    debouncedSearch,
    categoryFilter,
    setCategoryFilter,
    productTypeFilter,
    setProductTypeFilter,
    handleClearSearch,
    data,
    isLoading,
    isError,
    refetch,
    detailOpen,
    setDetailOpen,
    detailProduct,
    setDetailProduct,
    formOpen,
    setFormOpen,
    editingProduct,
    setEditingProduct,
    stockOpen,
    setStockOpen,
    stockProduct,
    setStockProduct,
    imageOpen,
    setImageOpen,
    imageProduct,
    setImageProduct,
    comboOpen,
    setComboOpen,
    comboProduct,
    setComboProduct,
    deleteTarget,
    setDeleteTarget,
    isDeleting: deleteMutation.isPending,
    handleConfirmDelete,
    handleToggleFeatured,
  };
}
