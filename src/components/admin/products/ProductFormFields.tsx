'use client';

import { useState } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import type { Category } from '@/types/api';
import type { AdminProductFormValues } from '@/validations/admin';
import { ProductBasicTab } from './form-tabs/ProductBasicTab';
import { ProductDescTab } from './form-tabs/ProductDescTab';
import { ProductSpecTab } from './form-tabs/ProductSpecTab';

type ProductFormFieldsProps = {
  form: UseFormReturn<AdminProductFormValues>;
  categories?: Category[];
};

export const ProductFormFields = ({ form, categories }: ProductFormFieldsProps) => {
  const [activeTab, setActiveTab] = useState<'basic' | 'spec' | 'desc'>('basic');

  return (
    <div className="space-y-4">
      <div className="flex border-b border-border text-sm font-semibold">
        <button
          type="button"
          onClick={() => {
            setActiveTab('basic');
          }}
          className={`border-b-2 px-4 py-2.5 transition-colors ${
            activeTab === 'basic'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          Thông tin cơ bản & Giá
        </button>
        <button
          type="button"
          onClick={() => {
            setActiveTab('spec');
          }}
          className={`border-b-2 px-4 py-2.5 transition-colors ${
            activeTab === 'spec'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          Quy cách & Xuất xứ
        </button>
        <button
          type="button"
          onClick={() => {
            setActiveTab('desc');
          }}
          className={`border-b-2 px-4 py-2.5 transition-colors ${
            activeTab === 'desc'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          Mô tả chi tiết
        </button>
      </div>

      {activeTab === 'basic' && <ProductBasicTab form={form} categories={categories} />}
      {activeTab === 'spec' && <ProductSpecTab form={form} />}
      {activeTab === 'desc' && <ProductDescTab form={form} />}
    </div>
  );
};
