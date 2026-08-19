'use client';

import Image from 'next/image';
import { Icon } from '@/components/common/Icon';

type QuickViewImageProps = {
  image?: string;
  name: string;
  badge?: string;
};

export const QuickViewImage = ({ image, name, badge }: QuickViewImageProps) => (
  <div className="relative h-64 min-h-70 w-full bg-muted md:h-full">
    {image ? (
      <Image src={image} alt={name} fill unoptimized className="object-cover" />
    ) : (
      <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
        <Icon name="fish" size="lg" />
      </div>
    )}
    {badge && (
      <span className="absolute top-4 left-4 rounded-full bg-secondary px-3 py-1 text-xs font-bold text-secondary-foreground uppercase shadow-sm">
        {badge}
      </span>
    )}
  </div>
);
