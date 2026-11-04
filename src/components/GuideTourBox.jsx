import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronRight, ChevronLeft, X, Sparkles, Monitor, Video, Terminal, Award } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const GUIDE_STEPS = [
  {
    title: "WELCOME TO YUG.EXE",
    subtitle: "HOW TO NAVIGATE THIS SYSTEM",
    icon: Sparkles,
    content:
      "This is not a static resume — it's an interactive operating system reflecting my software engineering journey. You can launch applications, inspect real archives, and test live systems.",
    highlight: "Double-click or tap any desktop icon to open dossiers.",
  },
  {
    title: "MEET YUG: 4 ROUTES",
    subtitle: "CHOOSE HOW YOU EVALUATE ENGINEERS",
    icon: Monitor,
    content:
      "Open MEET_YUG.EXE to switch experiences: 60-Second Recruiter Dossier, 3D Interactive Story Mode, Architecture Builder Lab, or the Live Virtual Interview.",
    highlight: "The entire interface rearranges around your route.",
  },
  {
    title: "LIVE AI VIRTUAL INTERVIEW",
    subtitle: "INTERVIEW MY 3D AVATAR",
    icon: Video,
    content:
      "Launch INTERVIEW_YUG.EXE from desktop or mobile to speak or chat with my 3D avatar. Ask about LinqChain (Resilience OS), OBS Monad, GDG scaling, or DevOps pipelines.",
    highlight: "Powered by real-time speech synthesis & AI reasoning.",
  },
  {
    title: "MULTI-OS THEMES & REAL EVIDENCE",
    subtitle: "WINDOWS XP, 7, 8, 10, 11 & UBUNTU",
    icon: Award,
    content:
      "Switch themes in the Start Menu or Control Panel. Launch FIELD_PROOF.EXE to view verified photos from SAP HackFest (₹75k winner), GDG stages, and client letters.",
    highlight: "Everything here is backed by authentic production proof.",
  },
];

export default function GuideTourBox() {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Check if user previously dismissed the tour
    const dismissed = localStorage.getItem("yug_guide_dismissed");
    if (!dismissed) {
      // Small delay on first load so user sees desktop first
      const timer = setTimeout(() => setIsOpen(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem("yug_guide_dismissed", "true");
    setIsOpen(false);
  };

  const handleNext = () => {
    if (currentStep < GUIDE_STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleDismiss();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const step = GUIDE_STEPS[currentStep];
  const StepIcon = step.icon;

  return (
    <>
      {/* Floating launcher button if guide is closed */}
      {!isOpen && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={() => {
            setCurrentStep(0);
            setIsOpen(true);
          }}
          className="fixed bottom-14 right-4 sm:bottom-16 sm:right-6 z-[75] px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-700 hover:brightness-110 text-white font-sans text-xs font-semibold shadow-2xl flex items-center gap-1.5 border border-white/25 cursor-pointer backdrop-blur-md active:scale-95 transition-all"
          title="Open Website Tour & Help Guide"
        >
          <HelpCircle size={14} className="text-amber-300 animate-pulse" />
          <span>Need Help? Tour Guide</span>
        </motion.button>
      )}

      {/* Guide Tour Modal Box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-16 sm:bottom-20 right-3 sm:right-6 z-[85] w-[92vw] sm:w-[420px] max-w-md rounded-2xl bg-[#131622]/95 border-2 border-emerald-500/40 shadow-[0_20px_50px_rgba(0,0,0,0.85)] backdrop-blur-xl text-white font-sans overflow-hidden"
            role="dialog"
            aria-label="Portfolio Guide Box"
          >
            {/* Header */}
            <div className="px-4 py-3 bg-gradient-to-r from-emerald-950/80 via-[#161a29] to-[#121420] border-b border-emerald-500/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
                  <StepIcon size={14} />
                </div>
                <div>
                  <div className="font-vt text-[15px] sm:text-[16px] text-emerald-400 font-bold leading-none tracking-wide">
                    {step.title}
                  </div>
                  <div className="text-[10px] text-white/60 font-mono tracking-wider mt-0.5">
                    STEP {currentStep + 1} OF {GUIDE_STEPS.length}
                  </div>
                </div>
              </div>

              <button
                onClick={handleDismiss}
                className="w-6 h-6 rounded-md hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors cursor-pointer"
                title="Skip and close guide"
              >
                <X size={14} />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-4 sm:p-5 space-y-3">
              <p className="text-xs sm:text-[13px] text-white/90 leading-relaxed">
                {step.content}
              </p>

              <div className="p-2.5 rounded-xl bg-black/40 border border-emerald-500/25 flex items-start gap-2">
                <span className="text-emerald-400 font-bold text-xs">TIP:</span>
                <span className="text-[11px] text-emerald-200/90 leading-snug">
                  {step.highlight}
                </span>
              </div>

              {/* Progress Dots */}
              <div className="flex items-center justify-center gap-1.5 pt-1">
                {GUIDE_STEPS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentStep(idx)}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      currentStep === idx ? "w-6 bg-emerald-400" : "w-1.5 bg-white/20 hover:bg-white/40"
                    }`}
                    aria-label={`Go to step ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Footer Navigation */}
            <div className="px-4 py-3 bg-[#0e1018] border-t border-white/10 flex items-center justify-between text-xs">
              <button
                onClick={handleDismiss}
                className="text-white/50 hover:text-white/80 font-medium transition-colors cursor-pointer text-[11px]"
              >
                Skip Guide
              </button>

              <div className="flex items-center gap-2">
                {currentStep > 0 && (
                  <button
                    onClick={handlePrev}
                    className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white/90 font-medium flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <ChevronLeft size={13} />
                    <span>Back</span>
                  </button>
                )}

                <button
                  onClick={handleNext}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold flex items-center gap-1 shadow-md shadow-emerald-950/40 cursor-pointer active:scale-95 transition-all"
                >
                  <span>{currentStep === GUIDE_STEPS.length - 1 ? "Got It!" : "Next Tip"}</span>
                  <ChevronRight size={13} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
