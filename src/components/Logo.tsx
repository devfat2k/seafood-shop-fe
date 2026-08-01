import Image from 'next/image';

export function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-amber-950">
        <Image src="/assets/images/logoseafood.png" alt="Logo" width={64} height={64} priority />
      </div>
      <div className="flex flex-col leading-tight">
        <span className="text-md font-extrabold tracking-wide text-[#1E3A8A] uppercase">
          Hải Sản Phan Thiết
        </span>
        <span className="text-xs font-semibold tracking-wider text-[#F97316] uppercase">
          Tươi ngon mỗi ngày
        </span>
      </div>
    </div>
  );
}
