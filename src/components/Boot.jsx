import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BOOT_LINES } from "@/data/content";
import { CRTOverlay } from "./Win98";

const Boot = ({ onDone }) => {
  const [lineCount, setLineCount] = useState(0);
  const done = lineCount >= BOOT_LINES.length;

  useEffect(() => {
    if (done) {
      const t = setTimeout(onDone, 700);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setLineCount((c) => c + 1), 150);
    return () => clearTimeout(t);
  }, [lineCount, done, onDone]);

  useEffect(() => {
    const skip = () => onDone();
    window.addEventListener("keydown", skip);
    return () => window.removeEventListener("keydown", skip);
  }, [onDone]);

  const pct = Math.min(100, Math.round((lineCount / BOOT_LINES.length) * 100));

  return (
    <div
      data-testid="boot-sequence-container"
      onClick={onDone}
      className="fixed inset-0 z-[100] bg-black cursor-pointer flex flex-col justify-center px-6 sm:px-16"
    >
      <div className="max-w-2xl w-full mx-auto">
        <pre className="font-vt text-[16px] sm:text-[19px] leading-[1.35] text-[#33ff33] phos whitespace-pre-wrap">
          {BOOT_LINES.slice(0, lineCount).join("\n")}
          <span className="blink text-[#ffb000]">█</span>
        </pre>
        <div className="mt-6 bevel-in h-5 p-[3px]">
          <div className="h-full bg-[#000080] transition-all duration-150" style={{ width: `${pct}%` }} />
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="font-vt text-[15px] text-[#33ff33]/70">YUG.EXE — a computer that remembers</span>
          <button data-testid="boot-skip-button" onClick={onDone} className="font-vt text-[15px] text-[#ffb000] underline">
            press any key to skip
          </button>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: done ? 1 : 0 }}
        transition={{ duration: 0.15 }}
        className="absolute inset-0 bg-white pointer-events-none"
      />
      <CRTOverlay />
    </div>
  );
};

export default Boot;
