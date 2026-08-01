export function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-[#0E3D34] text-white shadow-sm ring-2 ring-[#0E3D34]/20">
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M4 12c2.5-3 6-5 10-5 3.5 0 6 1.5 8 4-2 2.5-4.5 4-8 4-4 0-7.5-2-10-5zm0 0c1.5 2 3.5 3 6 3m-6-3l-2-2m2 2l-2 2"
          />
        </svg>
      </div>
      <div className="flex flex-col leading-tight">
        <span className="text-base font-extrabold tracking-wide text-[#0E3D34] uppercase">
          Hải Sản Phan Thiết
        </span>
        <span className="text-[10px] font-semibold tracking-wider text-[#D9A441] uppercase">
          Tươi ngon mỗi ngày
        </span>
      </div>
    </div>
  );
}
