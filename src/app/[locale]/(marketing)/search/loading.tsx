import { SearchSkeleton } from '@/components/search/SearchSkeleton';

export default function SearchLoading() {
  return (
    <div
      className="min-h-screen bg-background py-8 sm:py-12"
      aria-busy="true"
      aria-label="Đang tải trang tìm kiếm"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SearchSkeleton />
      </div>
    </div>
  );
}
