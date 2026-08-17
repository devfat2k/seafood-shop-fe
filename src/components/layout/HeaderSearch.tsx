'use client';

import { useEffect, useRef, useState } from 'react';
import { Icon } from '@/components/common/Icon';
import { SearchInstantDropdown } from '@/components/search/SearchInstantDropdown';
import { useRouter } from '@/libs/I18nNavigation';
import { useProductsQuery } from '@/libs/queries/products';

type HeaderSearchProps = {
  isMobileOverlayOpen: boolean;
  onCloseMobileOverlay: () => void;
};

export function HeaderSearch({ isMobileOverlayOpen, onCloseMobileOverlay }: HeaderSearchProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchContainerRef = useRef<HTMLFormElement>(null);

  const trimmedQuery = searchQuery.trim();

  const { data: instantSearchData, isLoading } = useProductsQuery({
    search: trimmedQuery || undefined,
    size: 5,
  });

  const instantResults = instantSearchData?.content ?? [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        event.target instanceof Node &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchSubmit = (e?: React.SyntheticEvent) => {
    if (e) {
      e.preventDefault();
    }
    setIsDropdownOpen(false);
    onCloseMobileOverlay();
    if (trimmedQuery) {
      router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`);
    } else {
      router.push('/search');
    }
  };

  return (
    <>
      {/* Desktop Search Bar */}
      <form
        ref={searchContainerRef}
        onSubmit={handleSearchSubmit}
        className="relative hidden w-72 items-center md:flex lg:w-80"
      >
        <input
          type="text"
          aria-label="Tìm kiếm sản phẩm"
          value={searchQuery}
          onFocus={() => {
            setIsDropdownOpen(true);
          }}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsDropdownOpen(true);
          }}
          placeholder="Tìm cua, tôm, mực, cá..."
          className="w-full rounded-full border border-border bg-background py-2 pr-4 pl-10 text-xs text-foreground transition-all focus:border-secondary focus:ring-2 focus:ring-secondary/20 focus:outline-none"
        />
        <button
          type="submit"
          className="absolute left-3 text-muted-foreground hover:text-foreground"
          aria-label="Tìm kiếm"
        >
          <Icon name="search" size="xs" />
        </button>

        <SearchInstantDropdown
          isOpen={isDropdownOpen}
          query={searchQuery}
          isLoading={isLoading}
          results={instantResults}
          onClose={() => {
            setIsDropdownOpen(false);
          }}
        />
      </form>

      {/* Mobile Search Overlay */}
      {isMobileOverlayOpen && (
        <div className="fixed inset-x-0 top-0 z-50 flex items-center gap-3 border-b border-border bg-card p-4 shadow-md md:hidden">
          <form onSubmit={handleSearchSubmit} className="relative flex-1">
            <input
              type="text"
              aria-label="Tìm kiếm sản phẩm trên di động"
              value={searchQuery}
              autoFocus
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
              placeholder="Tìm kiếm hải sản..."
              className="w-full rounded-full border border-border bg-background py-2.5 pr-4 pl-10 text-sm text-foreground focus:border-secondary focus:outline-none"
            />
            <Icon
              name="search"
              size="sm"
              className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
            />
          </form>
          <button
            type="button"
            onClick={onCloseMobileOverlay}
            className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label="Đóng tìm kiếm"
          >
            <Icon name="x" size="sm" />
          </button>
        </div>
      )}
    </>
  );
}
