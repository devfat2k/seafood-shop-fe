import type { Metadata } from 'next';
import { Suspense } from 'react';
import { SearchContainer } from '@/components/search/SearchContainer';

export const metadata: Metadata = {
  title: 'Tìm Kiếm Hải Sản Tươi Sống — Hải Sản Phan Thiết',
  description:
    'Tìm kiếm sản phẩm hải sản tươi sống đánh bắt tự nhiên từ vùng biển Phan Thiết. Đơn hàng giao tốc độ 2H tại TP.HCM.',
};

function SearchPageFallback() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="h-14 w-full animate-pulse rounded-2xl bg-muted" />
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-64 animate-pulse rounded-2xl bg-muted" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchPageFallback />}>
      <SearchContainer />
    </Suspense>
  );
}
