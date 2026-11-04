import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

const BASE_IMAGE = "/assets/yug_interview.png?v=5";
const EYELIDS_IMAGE = "/assets/yug_eyelids_closed.png?v=5";

export default function AvatarCanvas({ isSpeaking = false, className = "" }) {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const [blinkProgress, setBlinkProgress] = useState(0); // 0 = open, 1 = closed

  // 1. Natural Periodic Blinking Engine
  useEffect(() => {
    let blinkTimeout;
    let animFrame;

    const triggerBlink = () => {
      const isDouble = Math.random() < 0.28; // 28% chance of human double-blink

      const runSingleBlink = (onDone) => {
        setIsBlinking(true);
        const startTime = performance.now();
        const duration = 160; // ms

        const animate = (now) => {
          const elapsed = now - startTime;
          const progress = elapsed / duration;

          if (progress < 0.5) {
            // Eyelid closing (0 -> 1)
            setBlinkProgress(progress * 2);
          } else if (progress < 1) {
            // Eyelid opening (1 -> 0)
            setBlinkProgress(1 - (progress - 0.5) * 2);
          } else {
            setBlinkProgress(0);
            setIsBlinking(false);
            if (onDone) onDone();
            return;
          }
          animFrame = requestAnimationFrame(animate);
        };
        animFrame = requestAnimationFrame(animate);
      };

      runSingleBlink(() => {
        if (isDouble) {
          // Pause 110ms then blink again
          blinkTimeout = setTimeout(() => {
            runSingleBlink(() => scheduleNext());
          }, 110);
        } else {
          scheduleNext();
        }
      });
    };

    const scheduleNext = () => {
      // Human blinking occurs roughly every 3.2 - 5.5s
      const delay = 3200 + Math.random() * 2400;
      blinkTimeout = setTimeout(triggerBlink, delay);
    };

    scheduleNext();

    return () => {
      clearTimeout(blinkTimeout);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  // 2. 3D Parallax Tracking & Idle Head Drift
  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to +0.5
    const ny = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to +0.5
    setMousePos({ x: nx, y: ny });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMousePos({ x: 0, y: 0 });
  }, []);

  // Compute 3D rotation angles
  const rotY = mousePos.x * 12; // -6 to +6 deg
  const rotX = -mousePos.y * 10; // -5 to +5 deg
  const transX = mousePos.x * 8; // parallax shift
  const transY = mousePos.y * 6;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full h-full overflow-hidden select-none bg-[#0e1117] flex items-center justify-center ${className}`}
      style={{ perspective: "1100px" }}
    >
      {/* Studio Background Ambient Glow */}
      <div className="absolute inset-0 bg-radial from-slate-800/40 via-transparent to-black pointer-events-none" />

      {/* 3D Rotating Avatar Viewport */}
      <motion.div
        animate={{
          rotateX: rotX,
          rotateY: rotY,
          x: transX,
          y: transY,
        }}
        transition={{ type: "spring", stiffness: 180, damping: 22 }}
        className="relative w-full h-full max-w-[560px] max-h-[570px] flex items-center justify-center will-change-transform"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Subtle breathing & speech sway */}
        <motion.div
          animate={{
            y: isSpeaking ? [0, -2, 0.5, 0] : [0, -2, 0],
            scale: [1, 1.003, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: isSpeaking ? 2.8 : 4.2,
            ease: "easeInOut",
          }}
          className="relative w-full h-full flex items-center justify-center"
        >
          {/* Base High-Resolution Portrait */}
          <img
            src={BASE_IMAGE}
            alt="Yug Pathak - Virtual Interview Avatar"
            className="w-full h-full object-contain pointer-events-none drop-shadow-2xl"
            loading="eager"
            decoding="sync"
          />

          {/* Eyelid Blink Overlay with Smooth Alpha Transition */}
          <img
            src={EYELIDS_IMAGE}
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-contain pointer-events-none transition-opacity duration-75"
            style={{
              opacity: isBlinking ? blinkProgress : 0,
            }}
          />
        </motion.div>
      </motion.div>

      {/* Top Stream Status Badges */}
      <div className="absolute top-3 left-3 flex items-center gap-2 z-10 select-none">
        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 border border-emerald-500/40 text-emerald-400 font-mono text-[11px] backdrop-blur-md shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          LIVE 1080P HD 60FPS
        </span>
        <span className="hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded-full bg-black/40 border border-white/10 text-white/70 font-mono text-[10px] backdrop-blur-md">
          Wispr Studio Audio · 14ms
        </span>
      </div>

      {/* Bottom Nameplate Badge */}
      <div className="absolute bottom-3 left-3 flex items-center gap-2 z-10 select-none">
        <div className="px-3 py-1.5 rounded-lg bg-black/70 border border-white/15 text-white backdrop-blur-md shadow-lg flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-emerald-500/30" />
          <span className="font-sans font-semibold text-xs tracking-wide">Yug Pathak</span>
          <span className="text-[11px] text-white/60">Candidate</span>
        </div>
      </div>

      {/* Audio Waveform Equalizer (Pulses during speech) */}
      <div className="absolute bottom-3 right-3 flex items-end gap-1 px-2.5 py-2 rounded-lg bg-black/60 border border-white/10 backdrop-blur-md z-10">
        {[0.4, 0.8, 1, 0.6, 0.9, 0.5].map((scale, i) => (
          <motion.div
            key={i}
            animate={
              isSpeaking
                ? {
                    height: [4, 18 * scale, 6, 22 * scale, 4],
                  }
                : { height: 4 }
            }
            transition={
              isSpeaking
                ? {
                    repeat: Infinity,
                    duration: 0.5 + (i % 3) * 0.15,
                    ease: "easeInOut",
                  }
                : { duration: 0.2 }
            }
            className={`w-1 rounded-full transition-colors ${
              isSpeaking ? "bg-emerald-400" : "bg-white/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
