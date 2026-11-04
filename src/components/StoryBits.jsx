import { Marquee } from "./Marquee";
import { MARQUEE_ITEMS } from "@/data/content";

export const QuoteBlock = ({ quote }) => (
  <blockquote className="my-6 border-l-4 border-[#ffb000] pl-4 transition-transform duration-200 hover:translate-x-1 animate-float-gentle will-change-transform">
    <p className="font-vt text-[22px] sm:text-[26px] leading-tight text-[#ffb000] phos-amber">"{quote.text}"</p>
    <cite className="not-italic font-vt text-[15px] text-[#33ff33]/60 block mt-1">— {quote.by}</cite>
  </blockquote>
);

export const MarqueeBand = () => <Marquee items={MARQUEE_ITEMS} />;
