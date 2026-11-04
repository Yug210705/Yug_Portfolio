export const Marquee = ({ items, className = "" }) => (
  <div className={`relative overflow-hidden border-y border-[#33ff33]/20 bg-[#0c0d12] py-3 ${className}`} aria-hidden="false">
    <div className="marquee-track flex w-max">
      {[0, 1].map((track) => (
        <div key={track} aria-hidden={track === 1} className="flex shrink-0">
          {items.map((item, i) => (
            <span key={`${track}-${i}`} className="font-vt text-[18px] sm:text-[20px] text-[#33ff33]/80 px-6 whitespace-nowrap flex items-center gap-6">
              {item}
              <span className="text-[#ffb000]">//</span>
            </span>
          ))}
        </div>
      ))}
    </div>
  </div>
);

export default Marquee;
