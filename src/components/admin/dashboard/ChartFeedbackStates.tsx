'use client';

import * as React from 'react';
import { Icon } from '@/components/common/Icon';
import { Button } from '@/components/ui/button';

type ChartFeedbackStatesProps = {
  isLoading: boolean;
  isError: boolean;
  isEmpty: boolean;
  errorTitle: string;
  emptyTitle: string;
  emptySubtitle?: string;
  emptyIcon?: string;
  onRetry?: () => void;
  skeleton: React.ReactNode;
  children: React.ReactNode;
};

export function ChartFeedbackStates({
  isLoading,
  isError,
  isEmpty,
  errorTitle,
  emptyTitle,
  emptySubtitle,
  emptyIcon = 'sparkles',
  onRetry,
  skeleton,
  children,
}: ChartFeedbackStatesProps) {
  if (isLoading) {
    return <>{skeleton}</>;
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10 text-destructive">
          <Icon name="x" size="sm" />
        </div>
        <p className="text-xs font-semibold text-foreground">{errorTitle}</p>
        {onRetry && (
          <Button
            size="sm"
            variant="outline"
            className="mt-3"
            onClick={() => {
              onRetry();
            }}
          >
            Thử lại
          </Button>
        )}
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
          <Icon name={emptyIcon} size="md" />
        </div>
        <p className="text-xs font-semibold text-foreground">{emptyTitle}</p>
        {emptySubtitle && <p className="mt-1 text-[11px] text-muted-foreground">{emptySubtitle}</p>}
      </div>
    );
  }

  return <>{children}</>;
}
