import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mic } from "lucide-react";
import { VOICE_STEPS } from "@/data/content";

const VoiceLayer = ({ open, setOpen }) => {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setOpen]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[95] bg-black/70 flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.94, y: 14 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            className="bevel hard-shadow w-full max-w-lg flex flex-col"
            style={{ maxHeight: "min(92dvh, 92vh)" }}
            onClick={(e) => e.stopPropagation()}
            data-testid="voice-layer-modal"
            role="dialog"
            aria-label="This site was built by speaking"
          >
            <div className="titlebar-dark flex items-center gap-2 px-2 py-1.5 shrink-0">
              <Mic size={14} />
              <span className="font-vt text-[15px] text-[#33ff33] flex-1">VOICE.EXE — HOW THIS SITE WAS MADE</span>
              <button aria-label="close voice" onClick={() => setOpen(false)} className="bevel-btn w-5 h-5 flex items-center justify-center text-inherit">
                <X size={12} />
              </button>
            </div>
            <div className="bg-[#14161c] p-4 overflow-y-auto flex-1 min-h-0" data-lenis-prevent>
              <div className="flex flex-col gap-0">
                {VOICE_STEPS.map((s, i) => (
                  <div key={s.step} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <span className="w-3 h-3 bg-[#ffb000] mt-1.5 shrink-0" />
                      {i < VOICE_STEPS.length - 1 && <span className="w-px flex-1 bg-[#33ff33]/30" />}
                    </div>
                    <div className="pb-4 pl-1">
                      <div className="font-vt text-[18px] text-[#ffb000] phos-amber">
                        {String(i + 1).padStart(2, "0")} · {s.step}
                      </div>
                      <p className="text-[13px] text-[#9fb0c3] mt-0.5">{s.line}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bevel-dark p-3 mt-1">
                <div className="font-vt text-[14px] tracking-widest text-[#33ff33]/60 mb-2">REAL SESSION LOG — DAY 1</div>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {[["2,532", "WORDS DICTATED"], ["81", "WPM"], ["1", "DAY STREAK"]].map(([k, v]) => (
                    <div key={v} className="bevel-dark p-2 text-center">
                      <div className="font-vt text-[20px] text-[#ffb000]">{k}</div>
                      <div className="font-vt text-[12px] tracking-widest text-[#33ff33]/60">{v}</div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-2">
                  {[
                    "This must not feel like a conversational developer portfolio or resume website or a generic AI-generated landing page. The goal is to turn my life and engineering journey into an interactive experience.",
                    "When I was a child my father had a PC and an HP laptop running Windows XP. I still remember two things I used to do on it: play FFX Runner and Uphill Farmer, and design cars in MS Paint because I have always been a car enthusiast.",
                    "Do not hide this. Turn it into a playful interactive incident. Show the AWS instance status as running. Time passed. Bill: ₹3,000.",
                    "This should become a small story called 'One Builder, Two Builders.' Yug builds. Brother watches. Brother starts building. Building becomes contagious.",
                  ].map((q) => (
                    <p key={q.slice(0, 24)} className="text-[12.5px] leading-relaxed text-[#9fb0c3] border-l-2 border-[#33ff33]/40 pl-2.5">
                      "{q}"
                    </p>
                  ))}
                </div>
                <a
                  href="/assets/wispr_transcript.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="voice-transcript-link"
                  className="block mt-3 bevel-dark p-2 group"
                >
                  <img
                    src="/assets/wispr_transcript.png"
                    alt="Wispr Flow dictation transcript, day 1"
                    loading="lazy"
                    className="w-full h-40 object-cover object-top"
                  />
                  <div className="font-vt text-[14px] text-[#33ff33]/70 mt-2 group-hover:text-[#ffb000]">
                    OPEN THE ACTUAL TRANSCRIPT ↗ — dictated at 12:30 AM, day 1
                  </div>
                </a>
                <p className="font-vt text-[13px] text-[#33ff33]/50 mt-2">
                  Screenshots come from the real Wispr Flow session that built this site. Nothing recreated, nothing faked.
                </p>
              </div>
              <p className="font-vt text-[14px] text-[#33ff33]/50 mt-3">
                Voice did not just get mentioned in the application. It built the application.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VoiceLayer;
