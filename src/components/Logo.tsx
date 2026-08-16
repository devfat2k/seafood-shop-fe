import Image from 'next/image';

type LogoProps = {
  className?: string;
  showSubtext?: boolean;
  textColor?: string;
  size?: 'sm' | 'md' | 'lg';
};

export function Logo(props: LogoProps) {
  const { className = '', showSubtext = true, textColor = 'text-foreground', size = 'md' } = props;

  const imageDimensions = {
    sm: { width: 32, height: 32, container: 'h-8 w-8' },
    md: { width: 40, height: 40, container: 'h-10 w-10 sm:h-11 sm:w-11' },
    lg: { width: 48, height: 48, container: 'h-12 w-12 sm:h-14 sm:w-14' },
  }[size];

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div
        className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-full shadow-xs ${imageDimensions.container}`}
      >
        <Image
          src="/assets/images/logo.png"
          alt="logo"
          width={imageDimensions.width}
          height={imageDimensions.height}
          priority
          className="h-full w-full object-cover"
        />
      </div>
      <div>
        <span
          className={`block font-heading text-base font-bold tracking-tight sm:text-lg ${textColor}`}
        >
          Hải Sản Phan Thiết
        </span>
        {showSubtext && (
          <span className="-mt-0.5 hidden text-[10px] font-bold tracking-widest text-secondary uppercase sm:block">
            Tươi từ biển • Sạch đến bàn ăn
          </span>
        )}
      </div>
    </div>
  );
}
