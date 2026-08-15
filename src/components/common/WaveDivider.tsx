import type { FC } from 'react';

type WaveDividerProps = {
  fillColor?: string;
  className?: string;
  flip?: boolean;
};

export const WaveDivider: FC<WaveDividerProps> = ({
  fillColor = '#EFF6FF',
  className = '',
  flip = false,
}) => (
  <div
    className={`pointer-events-none w-full overflow-hidden leading-none ${
      flip ? 'rotate-180' : ''
    } ${className}`}
  >
    <svg
      className="relative block h-10 w-full sm:h-14 lg:h-20"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
    >
      <path
        d="M0,32 C240,75 480,75 720,35 C960,-5 1200,-5 1440,35 L1440,120 L0,120 Z"
        fill={fillColor}
      />
    </svg>
  </div>
);
