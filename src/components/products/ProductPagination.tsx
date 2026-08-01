'use client';

type ProductPaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function ProductPagination(props: ProductPaginationProps) {
  const { currentPage, totalPages, onPageChange } = props;

  const renderPageNumbers = () => {
    const pages: (number | string)[] = [1, 2, 3, '...', totalPages];
    return pages.map((page, idx) => {
      if (typeof page === 'string') {
        return (
          <span key={`dots-${idx}`} className="px-2 text-xs font-bold text-[#5B6B63]">
            ...
          </span>
        );
      }

      const isActive = page === currentPage;
      return (
        <button
          key={page}
          type="button"
          onClick={() => {
            onPageChange(page);
          }}
          className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold transition-all ${
            isActive
              ? 'bg-[#0E3D34] text-white shadow'
              : 'text-[#26312D] hover:bg-[#E4EEEA] hover:text-[#0E3D34]'
          }`}
        >
          {page}
        </button>
      );
    });
  };

  return (
    <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-[#E4E0D8] pt-8">
      {/* Nút Trang Trước */}
      <button
        type="button"
        disabled={currentPage <= 1}
        onClick={() => {
          if (currentPage > 1) {
            onPageChange(currentPage - 1);
          }
        }}
        className="inline-flex items-center gap-1.5 rounded-full border border-[#E4E0D8] bg-white px-5 py-2 text-xs font-bold text-[#26312D] shadow-sm transition-all hover:bg-[#F5F1E8] disabled:opacity-50 disabled:hover:bg-white"
      >
        <span>← Trang Trước</span>
      </button>

      {/* Danh sách số trang */}
      <div className="flex items-center gap-1.5">{renderPageNumbers()}</div>

      {/* Nút Trang Sau */}
      <button
        type="button"
        disabled={currentPage >= totalPages}
        onClick={() => {
          if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
          }
        }}
        className="inline-flex items-center gap-1.5 rounded-full border border-[#E4E0D8] bg-white px-5 py-2 text-xs font-bold text-[#26312D] shadow-sm transition-all hover:bg-[#F5F1E8] disabled:opacity-50 disabled:hover:bg-white"
      >
        <span>Trang Sau →</span>
      </button>
    </div>
  );
}
