'use client';

import { AdminProductDialogs } from '@/components/admin/products/AdminProductDialogs';
import { AdminProductsContent } from '@/components/admin/products/AdminProductsContent';
import { AdminProductsToolbar } from '@/components/admin/products/AdminProductsToolbar';
import { useAdminProductsFlow } from '@/components/admin/products/useAdminProductsFlow';
import { Icon } from '@/components/common/Icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminProductsPage() {
  const {
    page,
    setPage,
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
    isDeleting,
    handleConfirmDelete,
    handleToggleFeatured,
  } = useAdminProductsFlow();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-heading text-xl font-bold text-foreground sm:text-2xl">
            Quản Lý Sản Phẩm
          </h2>
          <p className="text-xs text-muted-foreground sm:text-sm">
            Quản lý toàn bộ danh mục, thông số, giá bán và tồn kho hải sản trong cửa hàng
          </p>
        </div>
        <Button
          size="sm"
          onClick={() => {
            setEditingProduct(null);
            setFormOpen(true);
          }}
          className="h-10 rounded-xl px-4 text-xs font-semibold shadow-xs"
        >
          <Icon name="plus" size="xs" className="mr-1.5" />
          Thêm sản phẩm mới
        </Button>
      </div>

      <Card className="border-border shadow-xs">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-bold">Danh sách hải sản</CardTitle>
          <AdminProductsToolbar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            debouncedSearch={debouncedSearch}
            onClearSearch={handleClearSearch}
            categoryFilter={categoryFilter}
            onCategoryFilterChange={(catId) => {
              setCategoryFilter(catId);
              setPage(0);
            }}
            productTypeFilter={productTypeFilter}
            onProductTypeFilterChange={(type) => {
              setProductTypeFilter(type);
              setPage(0);
            }}
          />
        </CardHeader>

        <CardContent className="pt-2">
          <AdminProductsContent
            isLoading={isLoading}
            isError={isError}
            data={data}
            page={page}
            debouncedSearch={debouncedSearch}
            onPageChange={setPage}
            onClearSearch={handleClearSearch}
            onRefetch={() => {
              void refetch();
            }}
            onAddNew={() => {
              setEditingProduct(null);
              setFormOpen(true);
            }}
            onViewDetail={(p) => {
              setDetailProduct(p);
              setDetailOpen(true);
            }}
            onEdit={(p) => {
              setEditingProduct(p);
              setFormOpen(true);
            }}
            onAdjustStock={(p) => {
              setStockProduct(p);
              setStockOpen(true);
            }}
            onUploadImage={(p) => {
              setImageProduct(p);
              setImageOpen(true);
            }}
            onConfigureCombo={(p) => {
              setComboProduct(p);
              setComboOpen(true);
            }}
            onToggleFeatured={handleToggleFeatured}
            onDelete={(p) => {
              setDeleteTarget(p);
            }}
          />
        </CardContent>
      </Card>

      <AdminProductDialogs
        detailOpen={detailOpen}
        onDetailOpenChange={setDetailOpen}
        detailProduct={detailProduct}
        formOpen={formOpen}
        onFormOpenChange={setFormOpen}
        editingProduct={editingProduct}
        stockOpen={stockOpen}
        onStockOpenChange={setStockOpen}
        stockProduct={stockProduct}
        imageOpen={imageOpen}
        onImageOpenChange={setImageOpen}
        imageProduct={imageProduct}
        comboOpen={comboOpen}
        onComboOpenChange={setComboOpen}
        comboProduct={comboProduct}
        deleteTarget={deleteTarget}
        onDeleteTargetChange={setDeleteTarget}
        isDeleting={isDeleting}
        onConfirmDelete={handleConfirmDelete}
        onEdit={(p) => {
          setEditingProduct(p);
          setFormOpen(true);
        }}
        onAdjustStock={(p) => {
          setStockProduct(p);
          setStockOpen(true);
        }}
        onUploadImage={(p) => {
          setImageProduct(p);
          setImageOpen(true);
        }}
        onConfigureCombo={(p) => {
          setComboProduct(p);
          setComboOpen(true);
        }}
        onToggleFeatured={handleToggleFeatured}
      />
    </div>
  );
}
