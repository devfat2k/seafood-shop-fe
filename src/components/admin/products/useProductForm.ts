'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useAdminCategoriesQuery } from '@/libs/queries/admin/categories';
import { useCreateProductMutation, useUpdateProductMutation } from '@/libs/queries/admin/products';
import type { Product } from '@/types/api';
import type { AdminProductFormValues } from '@/validations/admin';
import { adminProductSchema } from '@/validations/admin';

export const useProductForm = (
  productToEdit: Product | null | undefined,
  onSuccess: () => void,
) => {
  const isEdit = Boolean(productToEdit);
  const { data: categories } = useAdminCategoriesQuery();
  const createMutation = useCreateProductMutation();
  const updateMutation = useUpdateProductMutation();

  const form = useForm<AdminProductFormValues>({
    resolver: zodResolver(adminProductSchema),
    defaultValues: {
      name: '',
      description: '',
      price: undefined,
      originalPrice: undefined,
      stock: undefined,
      categoryId: 1,
      unit: 'kg',
      spec: '',
      origin: '',
      weightOptions: [],
      productType: 'REGULAR',
      isActive: true,
    },
  });

  useEffect(() => {
    if (productToEdit) {
      const weightOpts =
        productToEdit.weightOptions
          ?.map((opt) => (typeof opt === 'string' ? opt : (opt.label ?? opt.value ?? '')))
          .filter(Boolean) ?? [];

      form.reset({
        name: productToEdit.name,
        description: productToEdit.description ?? '',
        price: productToEdit.price,
        originalPrice: productToEdit.originalPrice ?? undefined,
        stock: productToEdit.stock ?? undefined,
        categoryId: productToEdit.categoryId ?? categories?.[0]?.id ?? 1,
        unit: productToEdit.unit ?? 'kg',
        spec: productToEdit.spec ?? '',
        origin: productToEdit.origin ?? '',
        weightOptions: weightOpts,
        productType: productToEdit.productType ?? 'REGULAR',
        isActive: productToEdit.active ?? true,
      });
    } else {
      form.reset({
        name: '',
        description: '',
        price: undefined,
        originalPrice: undefined,
        stock: undefined,
        categoryId: categories?.[0]?.id ?? 1,
        unit: 'kg',
        spec: '',
        origin: '',
        weightOptions: [],
        productType: 'REGULAR',
        isActive: true,
      });
    }
  }, [productToEdit, form, categories]);

  const onSubmit = async (values: AdminProductFormValues) => {
    try {
      if (isEdit && productToEdit) {
        await updateMutation.mutateAsync({
          id: productToEdit.id,
          data: values,
        });
        toast.success('Cập nhật sản phẩm thành công');
      } else {
        await createMutation.mutateAsync(values);
        toast.success('Tạo sản phẩm mới thành công');
      }
      form.reset();
      onSuccess();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Thao tác thất bại');
    }
  };

  const isPending =
    form.formState.isSubmitting || createMutation.isPending || updateMutation.isPending;

  return {
    form,
    categories,
    isEdit,
    isPending,
    onSubmit,
  };
};
