import { Icon } from '@/components/common/Icon';

type SearchErrorViewProps = {
  errorMessage?: string;
  onRetry: () => void;
};

export const SearchErrorView = ({ errorMessage, onRetry }: SearchErrorViewProps) => (
  <div className="mx-auto flex min-h-[50vh] max-w-md flex-col items-center justify-center rounded-3xl border border-border bg-card px-6 py-12 text-center shadow-xs">
    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
      <Icon name="alert-triangle" size="md" />
    </div>
    <h3 className="mt-4 font-heading text-xl font-bold text-foreground">
      Không thể tải kết quả tìm kiếm
    </h3>
    <p className="mt-2 text-xs text-muted-foreground">
      {errorMessage ?? 'Đã có lỗi xảy ra khi kết nối máy chủ.'}
    </p>
    <button
      type="button"
      onClick={onRetry}
      className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-primary/90"
    >
      <Icon name="refresh-cw" size="xs" />
      <span>Thử lại</span>
    </button>
  </div>
);
