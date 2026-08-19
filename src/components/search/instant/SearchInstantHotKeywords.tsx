import { Link } from '@/libs/I18nNavigation';

const HOT_KEYWORDS = [
  'Tôm hùm Phan Thiết',
  'Cua Cà Mau tươi',
  'Cá thu một nắng',
  'Mực lá bến cảng',
];

type SearchInstantHotKeywordsProps = {
  onClose: () => void;
};

export const SearchInstantHotKeywords = ({ onClose }: SearchInstantHotKeywordsProps) => (
  <div className="p-4">
    <span className="block text-xs font-bold text-muted-foreground uppercase">
      Từ khóa được tìm nhiều
    </span>
    <div className="mt-2 flex flex-wrap gap-2">
      {HOT_KEYWORDS.map((kw) => (
        <Link
          key={kw}
          href={`/search?q=${encodeURIComponent(kw)}`}
          onClick={onClose}
          className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs text-foreground transition-all hover:border-secondary hover:text-secondary"
        >
          {kw}
        </Link>
      ))}
    </div>
  </div>
);
