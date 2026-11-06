import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  FileText,
  MapPin,
  CheckCircle2,
  Copy,
  Check,
  Laptop,
  Bot,
  RotateCcw,
  Play,
  Pause,
  X,
  Menu,
  Volume2,
  VolumeX,
  ChevronRight,
  ShieldCheck,
  Cpu,
  Music,
  ArrowUp,
  Smartphone,
} from "lucide-react";
import { PROJECTS, RECRUITER, LINKS } from "@/data/content";

// Colorful cursor palette (matching Figma / reel multiplayer colors, pure pointers with NO text)
const CURSOR_COLORS = [
  "#0095f6", // Figma Blue
  "#ff3b30", // Red / Coral
  "#34c759", // Emerald Green
  "#ff9500", // Amber
  "#af52de", // Purple
  "#5856d6", // Indigo
  "#00c7be", // Cyan
  "#ff2d55", // Hot Pink
];

// Sleek upward-pointing arrow cursor component
const UpwardPointer = ({ color = "#0095f6", rotation = 0, isClicking = false, size = 20 }) => (
  <div
    className="relative pointer-events-none select-none"
    style={{
      transformOrigin: "4px 4px",
      transform: `rotate(${rotation}deg)`,
      transition: "transform 0.08s ease-out",
    }}
  >
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      stroke="#ffffff"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.65))" }}
    >
      {/* Upward pointing precision pointer */}
      <polygon points="12 2 19 21 12 17 5 21" />
    </svg>

    {/* Click pulse effect */}
    {isClicking && (
      <span
        className="absolute -top-1 left-2 w-6 h-6 rounded-full border border-cyan-400 animate-ping opacity-90 pointer-events-none"
        style={{ animationDuration: "0.5s" }}
      />
    )}
  </div>
);

export default function ModernLandingPage({ goMode, openInterview, openTerminal }) {
  // Tour & Auto-crafting state
  const [isTouring, setIsTouring] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [stepProgress, setStepProgress] = useState(0); // 0 to 1 for current element spanning
  const [tourSpeed, setTourSpeed] = useState(1);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [revealedItems, setRevealedItems] = useState(new Set());

  // STRICT by Meechie Alexander background song
  const bgAudioRef = useRef(null);
  const bottomRef = useRef(null);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Gracefully stop sound when the website reaches its bottom or when pointer animation ends
  const stopSound = useCallback(() => {
    if (!bgAudioRef.current) return;
    const audio = bgAudioRef.current;
    audio.pause();
    audio.currentTime = 0;
    setMusicPlaying(false);
  }, []);

  // Start sound from beginning (used with pointer animation)
  const startSound = useCallback(() => {
    if (!bgAudioRef.current) return;
    bgAudioRef.current.currentTime = 0;
    bgAudioRef.current.volume = 1;
    bgAudioRef.current.play().then(() => {
      setMusicPlaying(true);
    }).catch(() => {
      // Browser policy blocked unmuted autoplay until user interacts
    });
  }, []);

  // Sound ends as soon as website reaches its bottom (via scroll or IntersectionObserver)
  useEffect(() => {
    const handleScrollBottom = () => {
      if (isTouring) return; // Do not prematurely stop while crafting tour is animating
      const scrollY = window.scrollY || window.pageYOffset;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      // When viewport reaches bottom (within 90px of document end)
      if (scrollY + windowHeight >= docHeight - 90) {
        stopSound();
      }
    };

    window.addEventListener("scroll", handleScrollBottom, { passive: true });

    let observer;
    if (bottomRef.current && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!isTouring && entry.isIntersecting) {
              stopSound();
            }
          });
        },
        { threshold: 0.1 }
      );
      observer.observe(bottomRef.current);
    }

    return () => {
      window.removeEventListener("scroll", handleScrollBottom);
      if (observer && bottomRef.current) observer.unobserve(bottomRef.current);
    };
  }, [stopSound, isTouring]);

  // Active selector box dimensions: { x, y, width, height, rotation, color }
  const [selectorBox, setSelectorBox] = useState(null);

  // Background random wandering pointers (pure pointers, no text, organic wandering)
  const [wanderers, setWanderers] = useState([]);

  // Manual interactive controls
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [sliderPos, setSliderPos] = useState(50);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const sliderRef = useRef(null);
  const isDraggingSlider = useRef(false);

  // Element DOM references
  const elemRefs = {
    heroTitle: useRef(null),
    heroName: useRef(null),
    heroBio: useRef(null),
    heroPortrait: useRef(null),
    heroStats: useRef(null),
    workHeader: useRef(null),
    workCard0: useRef(null),
    workCard1: useRef(null),
    workCard2: useRef(null),
    workCard3: useRef(null),
    workCard4: useRef(null),
    workCard5: useRef(null),
    workCard6: useRef(null),
    wireframeSection: useRef(null),
    craftSection: useRef(null),
    craftCard0: useRef(null),
    craftCard1: useRef(null),
    craftCard2: useRef(null),
    arsenal0: useRef(null),
    arsenal1: useRef(null),
    arsenal2: useRef(null),
    arsenal3: useRef(null),
    arsenal4: useRef(null),
    arsenal5: useRef(null),
    arsenal6: useRef(null),
    arsenal7: useRef(null),
    arsenal8: useRef(null),
    arsenal9: useRef(null),
    arsenal10: useRef(null),
    arsenal11: useRef(null),
    journeySection: useRef(null),
    journeyPhoto: useRef(null),
    contactSection: useRef(null),
    footerSection: useRef(null),
  };

  // Sound generator
  const playCraftPop = useCallback(
    (freq = 520) => {
      if (!audioEnabled) return;
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(freq * 0.35, ctx.currentTime + 0.05);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.05);
      } catch (e) {}
    },
    [audioEnabled]
  );

  // Steps sequence of elements to craft with selector box
  const STEPS = useMemo(
    () => [
      { id: "heroTitle", ref: elemRefs.heroTitle, sound: 440 },
      { id: "heroName", ref: elemRefs.heroName, sound: 520 },
      { id: "heroPortrait", ref: elemRefs.heroPortrait, sound: 600 },
      { id: "heroBio", ref: elemRefs.heroBio, sound: 480 },
      { id: "heroStats", ref: elemRefs.heroStats, sound: 560 },
      { id: "workHeader", ref: elemRefs.workHeader, sound: 500, autoScroll: true },
      { id: "workCard0", ref: elemRefs.workCard0, sound: 640 },
      { id: "workCard1", ref: elemRefs.workCard1, sound: 670 },
      { id: "workCard2", ref: elemRefs.workCard2, sound: 700 },
      { id: "workCard3", ref: elemRefs.workCard3, sound: 730 },
      { id: "workCard4", ref: elemRefs.workCard4, sound: 760 },
      { id: "workCard5", ref: elemRefs.workCard5, sound: 790 },
      { id: "workCard6", ref: elemRefs.workCard6, sound: 820 },
      { id: "wireframeSection", ref: elemRefs.wireframeSection, sound: 580, autoScroll: true },
      { id: "craftSection", ref: elemRefs.craftSection, sound: 620, autoScroll: true },
      { id: "craftCard0", ref: elemRefs.craftCard0, sound: 650, duration: 380 },
      { id: "craftCard1", ref: elemRefs.craftCard1, sound: 680, duration: 380 },
      { id: "craftCard2", ref: elemRefs.craftCard2, sound: 710, duration: 380 },
      { id: "arsenal0", ref: elemRefs.arsenal0, sound: 720, duration: 240 },
      { id: "arsenal1", ref: elemRefs.arsenal1, sound: 750, duration: 240 },
      { id: "arsenal2", ref: elemRefs.arsenal2, sound: 780, duration: 240 },
      { id: "arsenal3", ref: elemRefs.arsenal3, sound: 810, duration: 240 },
      { id: "arsenal4", ref: elemRefs.arsenal4, sound: 840, duration: 240 },
      { id: "arsenal5", ref: elemRefs.arsenal5, sound: 870, duration: 240 },
      { id: "arsenal6", ref: elemRefs.arsenal6, sound: 900, duration: 240 },
      { id: "arsenal7", ref: elemRefs.arsenal7, sound: 930, duration: 240 },
      { id: "arsenal8", ref: elemRefs.arsenal8, sound: 960, duration: 240 },
      { id: "arsenal9", ref: elemRefs.arsenal9, sound: 990, duration: 240 },
      { id: "arsenal10", ref: elemRefs.arsenal10, sound: 1020, duration: 240 },
      { id: "arsenal11", ref: elemRefs.arsenal11, sound: 1050, duration: 240 },
      { id: "journeySection", ref: elemRefs.journeySection, sound: 660, autoScroll: true },
      { id: "journeyPhoto", ref: elemRefs.journeyPhoto, sound: 700, duration: 460, autoScroll: true },
      { id: "contactSection", ref: elemRefs.contactSection, sound: 740, autoScroll: true },
      { id: "footerSection", ref: elemRefs.footerSection, sound: 780, duration: 620, autoScroll: true },
    ],
    []
  );

  // Initialize random wanderer pointers
  useEffect(() => {
    const list = Array.from({ length: 6 }).map((_, i) => ({
      id: i,
      x: 20 + Math.random() * 60,
      y: 20 + Math.random() * 60,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      rotation: Math.random() * 45 - 22.5,
      color: CURSOR_COLORS[i % CURSOR_COLORS.length],
      clicking: false,
    }));
    setWanderers(list);
  }, []);

  // Animate random wanderer pointers organically (NOT in a fixed circle)
  useEffect(() => {
    if (!isTouring || isPaused) return;
    const interval = setInterval(() => {
      setWanderers((prev) =>
        prev.map((w) => {
          let nx = w.x + w.vx * tourSpeed;
          let ny = w.y + w.vy * tourSpeed;
          let nvx = w.vx;
          let nvy = w.vy;

          // Bounce off bounds organically with random variation
          if (nx < 8 || nx > 92) {
            nvx = -nvx + (Math.random() - 0.5) * 0.4;
          }
          if (ny < 10 || ny > 88) {
            nvy = -nvy + (Math.random() - 0.5) * 0.4;
          }

          // Random slight steering changes
          if (Math.random() < 0.15) {
            nvx += (Math.random() - 0.5) * 0.6;
            nvy += (Math.random() - 0.5) * 0.6;
            const mag = Math.hypot(nvx, nvy);
            if (mag > 2) {
              nvx = (nvx / mag) * 2;
              nvy = (nvy / mag) * 2;
            }
          }

          // Calculate rotation from movement angle
          const moveAngle = Math.atan2(nvy, nvx) * (180 / Math.PI) - 90;
          const isClick = Math.random() < 0.08;

          return {
            ...w,
            x: Math.max(5, Math.min(95, nx)),
            y: Math.max(8, Math.min(92, ny)),
            vx: nvx,
            nvy,
            rotation: moveAngle * 0.4, // subtle natural tilt
            clicking: isClick,
          };
        })
      );
    }, 60);
    return () => clearInterval(interval);
  }, [isTouring, isPaused, tourSpeed]);

  // Start / restart animated crafting tour (Rebuild canvas or replay)
  const startTour = useCallback((speed = 1) => {
    setTourSpeed(speed);
    setCurrentStepIndex(0);
    setStepProgress(0);
    setRevealedItems(new Set());
    setIsPaused(false);
    setIsTouring(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    // Sound starts from beginning when clicking Rebuild canvas or Replay
    startSound();
  }, [startSound]);

  // Stop / Skip to live
  const stopTour = useCallback((scrollToTop = false) => {
    setIsTouring(false);
    setIsPaused(false);
    setSelectorBox(null);
    setRevealedItems(new Set(STEPS.map((s) => s.id)));
    stopSound();
    if (scrollToTop === true) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [STEPS, stopSound]);

  // Toggle music button in navbar or floating dock
  const toggleMusic = useCallback(() => {
    if (!isTouring) {
      // When website is already built, clicking music restarts pointer animation & song!
      startTour(1);
    } else {
      setIsPaused((p) => !p);
    }
  }, [isTouring, startTour]);

  // Song is strictly coupled to pointer animation:
  // ONLY plays when pointer animation is actively crafting (isTouring && !isPaused).
  // Stops as soon as pointer animation ends (when website is already built).
  useEffect(() => {
    if (isTouring && !isPaused) {
      if (bgAudioRef.current && bgAudioRef.current.paused) {
        bgAudioRef.current.volume = 1;
        bgAudioRef.current.play().then(() => setMusicPlaying(true)).catch(() => {});
      }
    } else {
      if (bgAudioRef.current && !bgAudioRef.current.paused) {
        bgAudioRef.current.pause();
        setMusicPlaying(false);
      }
    }
  }, [isTouring, isPaused]);

  // Start song and pointer animations on EVERY refresh
  useEffect(() => {
    try {
      sessionStorage.removeItem("reel_craft_tour_auto");
    } catch (e) {}

    const t = setTimeout(() => {
      startTour(1);
    }, 150);

    const unlockSound = () => {
      if (bgAudioRef.current && bgAudioRef.current.paused) {
        bgAudioRef.current.volume = 1;
        bgAudioRef.current.play().then(() => setMusicPlaying(true)).catch(() => {});
      }
      cleanup();
    };

    const cleanup = () => {
      window.removeEventListener("pointerdown", unlockSound);
      window.removeEventListener("pointermove", unlockSound);
      window.removeEventListener("touchstart", unlockSound);
      window.removeEventListener("keydown", unlockSound);
      window.removeEventListener("wheel", unlockSound);
      window.removeEventListener("scroll", unlockSound);
    };

    window.addEventListener("pointerdown", unlockSound, { once: true });
    window.addEventListener("pointermove", unlockSound, { once: true });
    window.addEventListener("touchstart", unlockSound, { once: true });
    window.addEventListener("keydown", unlockSound, { once: true });
    window.addEventListener("wheel", unlockSound, { once: true });
    window.addEventListener("scroll", unlockSound, { once: true });

    return () => {
      clearTimeout(t);
      cleanup();
    };
  }, [startTour]);

  // Main Selector Box Drag & Creation Animation Loop
  useEffect(() => {
    if (!isTouring || isPaused) return;

    if (currentStepIndex >= STEPS.length) {
      // All items fully created by pointers!
      // Let the song play for an extra 1.8 seconds so user enjoys the climax of the music
      const t = setTimeout(() => {
        stopSound();
        stopTour(true);
      }, 1800);
      return () => clearTimeout(t);
    }

    const currentStep = STEPS[currentStepIndex];
    const targetRef = currentStep?.ref?.current;

    if (!targetRef) {
      // Skip if ref not available yet
      setCurrentStepIndex((prev) => prev + 1);
      return;
    }

    // Measure target element relative to viewport
    const rect = targetRef.getBoundingClientRect();

    // Auto-scroll to element if needed to keep selector box and dragging pointer comfortably in view
    if (rect.top < 70 || rect.bottom > window.innerHeight - 70) {
      targetRef.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    let progress = 0;
    // Enhanced drag duration (+35ms per element) adds ~1.2s across the tour
    const dragDuration = ((currentStep.duration || 580) + 35) / tourSpeed; // ms to span selector box
    const startTime = performance.now();

    const animateSpan = (now) => {
      const elapsed = now - startTime;
      progress = Math.min(1, elapsed / dragDuration);
      setStepProgress(progress);

      // Re-measure in case of scroll
      const r = targetRef.getBoundingClientRect();
      const startX = r.left;
      const startY = r.top;
      const targetW = Math.max(40, r.width);
      const targetH = Math.max(40, r.height);

      // Spanning box dimensions as cursor drags diagonally
      const curW = targetW * progress;
      const curH = targetH * progress;
      const pointerX = startX + curW;
      const pointerY = startY + curH;

      // Pointer rotation dynamically calculated from the spanning expansion vector
      const spanAngle = Math.atan2(curH, curW) * (180 / Math.PI) - 45;

      setSelectorBox({
        x: startX,
        y: startY,
        width: curW,
        height: curH,
        pointerX,
        pointerY,
        rotation: spanAngle,
        color: CURSOR_COLORS[currentStepIndex % CURSOR_COLORS.length],
        title: currentStep.id.toUpperCase(),
      });

      if (progress < 1) {
        requestAnimationFrame(animateSpan);
      } else {
        // Finished spanning this element!
        playCraftPop(currentStep.sound || 550);
        setRevealedItems((prev) => new Set([...prev, currentStep.id]));
        setSelectorBox(null);

        // Demo dragging the comparison slider when that section is spanned
        if (currentStep.id === "wireframeSection") {
          let dragStep = 0;
          const sliderTimer = setInterval(() => {
            dragStep += 0.08;
            const newPos = 50 + Math.sin(dragStep * Math.PI) * 35;
            setSliderPos(Math.max(15, Math.min(85, newPos)));
            if (dragStep >= 2) {
              clearInterval(sliderTimer);
              setSliderPos(50);
            }
          }, 35);
        }

        // Pause briefly before moving to next element
        setTimeout(() => {
          setCurrentStepIndex((prev) => prev + 1);
        }, (currentStep.duration ? 80 : 130) / tourSpeed);
      }
    };

    const animId = requestAnimationFrame(animateSpan);
    return () => cancelAnimationFrame(animId);
  }, [isTouring, isPaused, currentStepIndex, tourSpeed, STEPS, playCraftPop, stopTour, stopSound]);

  // Comparison slider manual drag
  const handleSliderMove = (clientX) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(LINKS.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  // Filter projects
  const filteredProjects = useMemo(() => {
    if (selectedFilter === "all") return PROJECTS;
    if (selectedFilter === "systems")
      return PROJECTS.filter(
        (p) =>
          p.id === "resilience" ||
          p.id === "obs" ||
          p.tag?.toLowerCase().includes("supply") ||
          p.tag?.toLowerCase().includes("observability")
      );
    if (selectedFilter === "ai")
      return PROJECTS.filter(
        (p) =>
          p.id === "intervyo" ||
          p.id === "obs" ||
          p.name?.toLowerCase().includes("ai") ||
          p.tag?.toLowerCase().includes("agent")
      );
    if (selectedFilter === "web")
      return PROJECTS.filter((p) => p.id === "campus" || p.id === "pravah" || p.id === "finassist");
    return PROJECTS;
  }, [selectedFilter]);

  const totalProgressPercent = Math.min(
    100,
    Math.round(((currentStepIndex + stepProgress) / STEPS.length) * 100)
  );

  return (
    <div className="relative min-h-screen bg-[#090a0f] text-[#f1f5f9] font-manrope selection:bg-[#ff3b3b] selection:text-white overflow-x-hidden">
      {/* Background Architectural Grid */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="w-full h-full opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-gradient-to-b from-[#e11d48]/15 via-[#b91c1c]/5 to-transparent blur-[140px] pointer-events-none" />
        <div className="absolute top-[1200px] right-0 w-[600px] h-[600px] bg-gradient-to-l from-[#3b82f6]/10 to-transparent blur-[150px] pointer-events-none" />
      </div>

      {/* ========================================================================= */}
      {/* ACTIVE SELECTOR BOX + DRAGGING MOUSE POINTER (ANIMATED CREATION OVERLAY)  */}
      {/* ========================================================================= */}
      {isTouring && (
        <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
          {/* Active Spanning Selector Box */}
          {selectorBox && (
            <>
              {/* Spanning Selector Box with Bounding Handles */}
              <div
                className="absolute border-2 border-dashed pointer-events-none transition-none shadow-[0_0_15px_rgba(0,149,246,0.25)]"
                style={{
                  left: `${selectorBox.x}px`,
                  top: `${selectorBox.y}px`,
                  width: `${selectorBox.width}px`,
                  height: `${selectorBox.height}px`,
                  borderColor: selectorBox.color,
                  backgroundColor: `${selectorBox.color}15`,
                }}
              >
                {/* 4 Corner Handles (Figma style) */}
                <span
                  className="absolute -top-1 -left-1 w-2 h-2 bg-white border pointer-events-none"
                  style={{ borderColor: selectorBox.color }}
                />
                <span
                  className="absolute -top-1 -right-1 w-2 h-2 bg-white border pointer-events-none"
                  style={{ borderColor: selectorBox.color }}
                />
                <span
                  className="absolute -bottom-1 -left-1 w-2 h-2 bg-white border pointer-events-none"
                  style={{ borderColor: selectorBox.color }}
                />
                <span
                  className="absolute -bottom-1 -right-1 w-2 h-2 bg-white border pointer-events-none"
                  style={{ borderColor: selectorBox.color }}
                />

                {/* Subtitle Dimension Badge on Box */}
                <div
                  className="absolute -top-5 left-0 px-1.5 py-0.5 text-[9px] font-mono text-black font-bold rounded-sm pointer-events-none shadow"
                  style={{ backgroundColor: selectorBox.color }}
                >
                  {Math.round(selectorBox.width)} × {Math.round(selectorBox.height)}
                </div>
              </div>

              {/* Leading Mouse Pointer actively dragging the selector box */}
              <div
                className="absolute transition-none pointer-events-none z-[110]"
                style={{
                  left: `${selectorBox.pointerX}px`,
                  top: `${selectorBox.pointerY}px`,
                }}
              >
                <UpwardPointer
                  color={selectorBox.color}
                  rotation={selectorBox.rotation}
                  isClicking={true}
                  size={24}
                />
              </div>
            </>
          )}

          {/* Random Wandering Multiplayer Pointers (PURE POINTERS WITH NO TEXT) */}
          {wanderers.map((w) => (
            <div
              key={w.id}
              className="absolute pointer-events-none transition-transform duration-75"
              style={{
                left: `${w.x}%`,
                top: `${w.y}%`,
              }}
            >
              <UpwardPointer
                color={w.color}
                rotation={w.rotation}
                isClicking={w.clicking}
                size={20}
              />
            </div>
          ))}
        </div>
      )}

      {/* Hidden Background Music Player: STRICT by Meechie Alexander (2019) */}
      <audio
        ref={bgAudioRef}
        src="/assets/strict.mp3"
        loop
        preload="auto"
        onPlay={() => setMusicPlaying(true)}
        onPause={() => setMusicPlaying(false)}
      />

      {/* TOP NAVIGATION BAR */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#090a0f]/85 border-b border-white/[0.08] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Left: Brand + Status */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#hero"
              className="font-anton text-2xl tracking-wider text-white hover:text-[#ff4d5a] transition-colors shrink-0"
            >
              YUG<span className="text-[#ff3b3b]">.</span>
            </a>
            <div className="hidden sm:inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono font-medium text-emerald-400 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>
                AVAILABLE <span className="hidden xl:inline">FOR OPPORTUNITIES</span>
              </span>
            </div>
          </div>

          {/* Center: Desktop Nav Links (Visible only on xl screens: 1280px+) */}
          <nav className="hidden xl:flex items-center gap-7 text-xs font-semibold uppercase tracking-wider text-slate-300 shrink-0">
            <a href="#work" className="hover:text-white transition-colors">
              Work
            </a>
            <a href="#wireframe" className="hover:text-white transition-colors">
              Wireframe
            </a>
            <a href="#craft" className="hover:text-white transition-colors">
              Craft
            </a>
            <a href="#journey" className="hover:text-white transition-colors">
              Journey
            </a>
            <a href="#contact" className="hover:text-white transition-colors">
              Contact
            </a>
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Song Player Button: STRICT by Meechie Alexander (starts with intro skipped) */}
            <button
              onClick={toggleMusic}
              className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 rounded-full border transition-all cursor-pointer shrink-0 ${
                musicPlaying
                  ? "bg-[#ff3b3b]/15 border-[#ff3b3b]/40 text-[#ff4d5a] shadow-lg shadow-red-500/10"
                  : "bg-white/[0.04] border-white/10 text-slate-400 hover:text-white hover:bg-white/[0.08]"
              }`}
              title={musicPlaying ? "Pause STRICT by Meechie Alexander" : "Play STRICT by Meechie Alexander"}
            >
              <div className="flex items-end gap-[2px] h-3">
                <span className={`w-[2px] bg-current rounded-full transition-all ${musicPlaying ? "h-3 animate-pulse" : "h-1.5"}`} />
                <span className={`w-[2px] bg-current rounded-full transition-all ${musicPlaying ? "h-2 animate-bounce" : "h-1"}`} />
                <span className={`w-[2px] bg-current rounded-full transition-all ${musicPlaying ? "h-3.5 animate-pulse" : "h-2"}`} />
              </div>
              <span className="text-[10px] sm:text-[11px] font-mono font-medium tracking-wide">
                STRICT
              </span>
              <span className="hidden 2xl:inline text-[10px] font-mono text-slate-400">
                · Meechie Alexander
              </span>
            </button>

            {/* Rebuild Tour Button (Desktop / Tablet only) */}
            <button
              onClick={() => startTour(1)}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#ff3b3b] to-[#dc2626] hover:from-[#ff5252] hover:to-[#ef4444] text-white text-xs font-semibold shadow-lg shadow-red-500/25 transition-all hover:scale-105 active:scale-95 cursor-pointer shrink-0"
              title="Watch mouse pointers span selector boxes to craft the site"
            >
              <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "3s" }} />
              <span>✨ Rebuild Canvas</span>
            </button>

            {/* Retro OS Switcher (Desktop / Laptop Only) */}
            <button
              onClick={() => goMode("desktop")}
              className="hidden md:flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-xs font-medium text-slate-200 transition-all hover:scale-105 active:scale-95 cursor-pointer shrink-0"
              title="Launch Retro Windows 98 OS desktop (Desktop/Laptop only)"
            >
              <Laptop className="w-3.5 h-3.5 text-cyan-400" />
              <span>💾 Retro OS</span>
            </button>

            {/* Interview Modal (Desktop / Large Tablet) */}
            <button
              onClick={openInterview}
              className="hidden lg:flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-xs font-medium text-slate-200 transition-all hover:scale-105 active:scale-95 cursor-pointer shrink-0"
              title="Open 3D Mock Interview Call"
            >
              <Bot className="w-3.5 h-3.5 text-emerald-400" />
              <span>🎙️ Interview</span>
            </button>

            {/* Mobile / Tablet Nav Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="xl:hidden p-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-slate-300 hover:text-white transition-colors shrink-0"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile / Tablet Dropdown Drawer (Holds all app actions on mobile) */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="xl:hidden border-t border-white/[0.08] bg-[#090a0f]/95 backdrop-blur-2xl px-5 py-4 flex flex-col gap-3 overflow-hidden shadow-2xl"
            >
              {/* Quick Actions inside Hamburger */}
              <div className="flex flex-col gap-2 pb-3 border-b border-white/[0.08]">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    goMode("mobile");
                  }}
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/25 text-xs font-mono text-emerald-300 transition-all text-left"
                >
                  <span className="flex items-center gap-2.5">
                    <Smartphone className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="font-semibold">Open Main Mobile App</span>
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    startTour(1);
                  }}
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#ff3b3b]/10 hover:bg-[#ff3b3b]/20 border border-[#ff3b3b]/25 text-xs font-mono text-rose-300 transition-all text-left"
                >
                  <span className="flex items-center gap-2.5">
                    <Sparkles className="w-4 h-4 text-[#ff4d5a] shrink-0" />
                    <span className="font-semibold">✨ Rebuild Canvas Animation</span>
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#ff4d5a] shrink-0" />
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openInterview();
                  }}
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/25 text-xs font-mono text-cyan-300 transition-all text-left"
                >
                  <span className="flex items-center gap-2.5">
                    <Bot className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span className="font-semibold">Open 3D Mock Interview</span>
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <a
                  href="#work"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs font-mono font-medium tracking-wider text-slate-300 hover:text-white p-2 rounded-lg hover:bg-white/[0.04] transition-all flex items-center gap-1.5"
                >
                  <span className="text-[#ff3b3b]">01</span> WORK
                </a>
                <a
                  href="#wireframe"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs font-mono font-medium tracking-wider text-slate-300 hover:text-white p-2 rounded-lg hover:bg-white/[0.04] transition-all flex items-center gap-1.5"
                >
                  <span className="text-cyan-400">02</span> WIREFRAME
                </a>
                <a
                  href="#craft"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs font-mono font-medium tracking-wider text-slate-300 hover:text-white p-2 rounded-lg hover:bg-white/[0.04] transition-all flex items-center gap-1.5"
                >
                  <span className="text-amber-400">03</span> CRAFT
                </a>
                <a
                  href="#journey"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs font-mono font-medium tracking-wider text-slate-300 hover:text-white p-2 rounded-lg hover:bg-white/[0.04] transition-all flex items-center gap-1.5"
                >
                  <span className="text-purple-400">04</span> JOURNEY
                </a>
              </div>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-mono font-semibold tracking-wider text-white bg-[#ff3b3b]/20 border border-[#ff3b3b]/30 p-2.5 rounded-xl text-center hover:bg-[#ff3b3b]/30 transition-all"
              >
                LET&apos;S BUILD TOGETHER →
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ========================================================================= */}
      {/* MAIN HERO SECTION (EACH ELEMENT CREATED VIA SELECTOR BOX)                 */}
      {/* ========================================================================= */}
      <section
        id="hero"
        className="relative pt-24 sm:pt-36 pb-16 sm:pb-32 px-5 sm:px-8 max-w-7xl mx-auto flex flex-col justify-center min-h-[88vh] sm:min-h-[92vh] overflow-hidden"
      >
        {/* Giant Backdrop "PORTFOLIO" Headline */}
        <div
          ref={elemRefs.heroTitle}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none z-0"
        >
          <motion.span
            animate={{
              opacity: revealedItems.has("heroTitle") ? 1 : 0.08,
              scale: revealedItems.has("heroTitle") ? 1 : 0.94,
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="font-anton text-[16vw] sm:text-[18vw] leading-none tracking-tight block text-[#ff1e27]/[0.10] sm:text-[#ff1e27]/[0.14] scale-y-110 drop-shadow-[0_10px_40px_rgba(255,30,39,0.15)]"
            style={{ WebkitTextStroke: "1px rgba(255, 30, 39, 0.25)" }}
          >
            PORTFOLIO
          </motion.span>
        </div>

        {/* Foreground Content Grid */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          {/* Left Column: Name & Bio */}
          <div className="lg:col-span-5 flex flex-col items-start space-y-3 sm:space-y-5">
            <div className="flex items-center gap-2">
              <span className="font-caveat text-2xl sm:text-3xl text-amber-300 rotate-[-4deg] inline-block">
                Hello, I&apos;m
              </span>
            </div>

            {/* Name Element created by selector box */}
            <div ref={elemRefs.heroName} className="relative">
              <motion.h1
                animate={{
                  opacity: revealedItems.has("heroName") ? 1 : 0.15,
                  y: revealedItems.has("heroName") ? 0 : 10,
                }}
                transition={{ duration: 0.4 }}
                className="font-anton text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.92] text-white"
              >
                YUG PATHAK<span className="text-[#ff3b3b] inline-block ml-2 sm:ml-3">.</span>
              </motion.h1>
            </div>

            {/* Bio & Subtitle created by selector box */}
            <div ref={elemRefs.heroBio} className="space-y-3 sm:space-y-4 w-full">
              <motion.div
                animate={{
                  opacity: revealedItems.has("heroBio") ? 1 : 0.15,
                  y: revealedItems.has("heroBio") ? 0 : 10,
                }}
                transition={{ duration: 0.4 }}
                className="space-y-3 sm:space-y-4"
              >
                {/* Refined Role Glass Badge */}
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff3b3b]/10 border border-[#ff3b3b]/25 text-[11px] sm:text-xs font-mono font-bold tracking-wider text-[#ff4d5a] uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff3b3b] animate-pulse shrink-0" />
                    <span>SOFTWARE DEVELOPER & AI ENGINEER</span>
                  </div>
                </div>

                <p className="text-slate-300 text-[13.5px] sm:text-sm md:text-base leading-relaxed max-w-md font-light">
                  Designing resilient systems. Shipping high-scale products.
                  3rd-year B.Tech CSE at Poornima University, specializing in cloud architectures, AI evaluation (RLHF & SFT), and low-latency microservices.
                </p>

                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-1">
                  <a
                    href="#work"
                    className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#ff3b3b] hover:bg-[#e11d48] text-white text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-lg shadow-red-500/25 transition-all hover:scale-105 active:scale-95"
                  >
                    <span>See my work</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <a
                    href="#contact"
                    className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-white/[0.07] hover:bg-white/[0.12] border border-white/10 text-white text-xs sm:text-sm font-semibold transition-all hover:scale-105 active:scale-95"
                  >
                    Let&apos;s talk
                  </a>
                </div>

                <div className="inline-flex items-center gap-2 text-[11px] font-mono text-slate-400 pt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-[#ff4d5a] shrink-0" />
                  <span>JAIPUR, RAJASTHAN, INDIA</span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Center Column: Portrait created by Selector Box */}
          <div ref={elemRefs.heroPortrait} className="lg:col-span-4 flex justify-center relative w-full">
            <div className="relative w-full max-w-[270px] sm:max-w-xs lg:max-w-sm aspect-[3/4] flex items-end justify-center">
              <div className="absolute inset-0 bg-gradient-to-t from-[#ff1e27]/40 via-[#b91c1c]/20 to-transparent rounded-3xl blur-2xl -z-10" />

              <motion.div
                animate={{
                  opacity: revealedItems.has("heroPortrait") ? 1 : 0.15,
                  scale: revealedItems.has("heroPortrait") ? 1 : 0.94,
                }}
                transition={{ duration: 0.5 }}
                className="relative w-full h-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-gradient-to-b from-white/[0.05] to-[#12131a]"
              >
                {!revealedItems.has("heroPortrait") ? (
                  <div className="w-full h-full border-2 border-dashed border-cyan-400/40 p-4 flex flex-col items-center justify-center bg-cyan-950/20 font-mono text-cyan-300 text-xs">
                    <span className="font-bold text-center">SPANNED BY SELECTOR BOX</span>
                    <span className="text-[10px] opacity-75 mt-1">[PORTRAIT FRAME 380×520]</span>
                  </div>
                ) : (
                  <>
                    <img
                      src="/assets/headshot.png"
                      alt="Yug Pathak"
                      className="w-full h-full object-cover object-top filter brightness-105 contrast-105 drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#090a0f] via-[#090a0f]/60 to-transparent" />
                  </>
                )}

                <div className="absolute bottom-2.5 sm:bottom-3 left-2.5 sm:left-3 right-2.5 sm:right-3 p-2 sm:p-2.5 rounded-xl bg-black/75 backdrop-blur-md border border-white/15 flex items-center justify-between text-[11px] sm:text-xs font-mono">
                  <div className="flex items-center gap-1.5 sm:gap-2 truncate mr-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                    <span className="text-slate-200 font-medium truncate">Deccan AI Trainer</span>
                  </div>
                  <span className="text-[#ff4d5a] font-semibold shrink-0">RLHF & SFT</span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Column: Stats created by Selector Box */}
          <div
            ref={elemRefs.heroStats}
            className="lg:col-span-3 flex flex-col justify-center space-y-6 lg:pl-4"
          >
            <motion.div
              animate={{
                opacity: revealedItems.has("heroStats") ? 1 : 0.15,
                y: revealedItems.has("heroStats") ? 0 : 10,
              }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div className="border-l-2 border-[#ff3b3b] pl-4">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                  Engineering Manifesto
                </span>
                <p className="text-sm text-slate-200 mt-1 italic font-light">
                  &ldquo;Every single byte and latency millisecond has a purpose. Resilient systems are built by understanding what fails.&rdquo;
                </p>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-1 gap-2.5 sm:gap-4">
                {RECRUITER.stats.map((st, i) => (
                  <div
                    key={i}
                    className="p-3 sm:p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-white/20 transition-colors"
                  >
                    <div className="font-anton text-2xl sm:text-4xl text-[#ff3b3b] tracking-wide">
                      {st.k}
                    </div>
                    <div className="text-[10px] sm:text-[11px] font-mono tracking-wider text-slate-400 uppercase mt-0.5 leading-tight">
                      {st.v}
                    </div>
                  </div>
                ))}

                <div className="p-3 sm:p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-white/20 transition-colors">
                  <div className="font-anton text-2xl sm:text-4xl text-amber-400 tracking-wide">
                    7+
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-mono tracking-wider text-slate-400 uppercase mt-0.5 leading-tight">
                    NATIONAL AWARDS & FINALIST
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 01: SELECTED WORK ("WORK THAT SPEAKS.")                           */}
      {/* ========================================================================= */}
      <section
        id="work"
        className="py-12 sm:py-20 px-4 sm:px-8 max-w-7xl mx-auto border-t border-white/[0.08] relative"
      >
        <div ref={elemRefs.workHeader} className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 gap-4">
          <motion.div
            animate={{
              opacity: revealedItems.has("workHeader") ? 1 : 0.15,
            }}
            transition={{ duration: 0.4 }}
          >
            <div className="text-xs font-mono text-[#ff4d5a] tracking-widest uppercase mb-1">
              01 / SELECTED WORK
            </div>
            <h2 className="font-anton text-3xl sm:text-5xl text-white tracking-tight">
              WORK THAT SPEAKS<span className="text-[#ff3b3b] inline-block ml-1.5 sm:ml-2">.</span>
            </h2>
          </motion.div>

          <div className="flex items-center gap-1.5 p-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-medium self-start md:self-auto overflow-x-auto max-w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] touch-pan-x">
            {[
              { id: "all", label: "All" },
              { id: "systems", label: "Systems & Cloud" },
              { id: "ai", label: "AI & RLHF" },
              { id: "web", label: "Web Apps" },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFilter(f.id)}
                className={`px-3 py-1.5 rounded-full transition-all cursor-pointer whitespace-nowrap text-xs ${
                  selectedFilter === f.id
                    ? "bg-[#ff3b3b] text-white font-semibold shadow-md"
                    : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Spanned Sequentially */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6">
          {filteredProjects.map((proj, idx) => {
            const cardKey = `workCard${idx}`;
            const isRevealed = revealedItems.has(cardKey);

            return (
              <div
                key={proj.id}
                ref={elemRefs[cardKey] || null}
                className="relative"
              >
                <motion.div
                  animate={{
                    opacity: isRevealed ? 1 : 0.18,
                    scale: isRevealed ? 1 : 0.96,
                  }}
                  transition={{ duration: 0.45 }}
                  className="group relative rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.08] hover:border-[#ff3b3b]/50 transition-all duration-300 flex flex-col justify-between overflow-hidden p-4 sm:p-6 min-h-0 sm:min-h-[290px]"
                >
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-transparent to-transparent group-hover:via-[#ff3b3b] transition-all duration-500" />

                  {!isRevealed ? (
                    <div
                      onClick={() => {
                        playCraftPop(600 + idx * 30);
                        setRevealedItems((prev) => new Set([...prev, cardKey]));
                      }}
                      className="border-2 border-dashed border-cyan-400/30 hover:border-cyan-400/60 p-3 sm:p-4 rounded-xl font-mono text-xs text-cyan-300 space-y-2 sm:space-y-3 cursor-pointer transition-colors"
                      title="Click to craft this frame"
                    >
                      <div className="flex justify-between text-[10px]">
                        <span>FRAME_{idx + 1}</span>
                        <span className="text-[#ff4d5a] font-bold animate-pulse">[SELECT TO CRAFT]</span>
                      </div>
                      <div className="h-5 sm:h-6 bg-cyan-400/20 w-3/4 rounded" />
                      <div className="h-3 sm:h-4 bg-cyan-400/10 w-full rounded" />
                      <div className="h-3 sm:h-4 bg-cyan-400/10 w-2/3 rounded" />
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center justify-between text-[10px] sm:text-xs font-mono text-slate-400 mb-1.5 sm:mb-3">
                        <span className="text-[#ff4d5a] font-semibold tracking-wider truncate mr-2">{proj.tag}</span>
                        <span className="opacity-50 font-bold shrink-0">0{idx + 1}</span>
                      </div>

                      {proj.live ? (
                        <a
                          href={proj.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-anton text-lg sm:text-2xl text-white hover:text-[#ff4d5a] transition-colors tracking-wide block leading-snug"
                        >
                          {proj.name}
                        </a>
                      ) : (
                        <h3 className="font-anton text-lg sm:text-2xl text-white group-hover:text-[#ff4d5a] transition-colors tracking-wide leading-snug">
                          {proj.name}
                        </h3>
                      )}

                      <p className="text-slate-300 text-xs sm:text-sm mt-1.5 sm:mt-3 line-clamp-2 sm:line-clamp-3 leading-relaxed font-light">
                        {proj.problem}
                      </p>
                    </div>
                  )}

                  <div className="mt-3.5 sm:mt-6 pt-3 sm:pt-4 border-t border-white/[0.06] flex items-center justify-between">
                    {proj.live ? (
                      <a
                        href={proj.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-white hover:text-[#ff4d5a] transition-colors"
                      >
                        <span>Launch Live</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <span className="text-[11px] font-mono text-slate-400">Production Tier</span>
                    )}

                    <button
                      onClick={() => goMode("builder")}
                      className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-400 hover:text-white transition-colors cursor-pointer"
                    >
                      <span>Lab Specs</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION: "FROM WIREFRAME TO LIVE" INTERACTIVE SPLIT COMPARISON SLIDER      */}
      {/* ========================================================================= */}
      <section
        ref={elemRefs.wireframeSection}
        id="wireframe"
        className="py-12 sm:py-20 px-4 sm:px-8 max-w-7xl mx-auto border-t border-white/[0.08]"
      >
        <motion.div
          animate={{
            opacity: revealedItems.has("wireframeSection") ? 1 : 0.15,
          }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-5 sm:mb-8">
            <div className="text-xs font-mono text-[#ff4d5a] tracking-widest uppercase mb-1">
              02 / PROCESS REVEALED
            </div>
            <h2 className="font-anton text-3xl sm:text-5xl text-white tracking-tight">
              FROM WIREFRAME <span className="text-[#ff3b3b]">TO LIVE.</span>
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1.5 sm:mt-2 max-w-xl font-light">
              One interface. Every layer of technical thinking. Drag the divider to reveal how raw architectural wireframes transform into production-grade systems.
            </p>
          </div>

          <div
            ref={sliderRef}
            onMouseMove={(e) => isDraggingSlider.current && handleSliderMove(e.clientX)}
            onTouchStart={(e) => handleSliderMove(e.touches[0].clientX)}
            onTouchMove={(e) => handleSliderMove(e.touches[0].clientX)}
            onMouseDown={() => (isDraggingSlider.current = true)}
            onMouseUp={() => (isDraggingSlider.current = false)}
            onMouseLeave={() => (isDraggingSlider.current = false)}
            className="relative w-full h-[230px] sm:h-[380px] lg:h-[460px] rounded-2xl overflow-hidden border border-white/15 shadow-2xl select-none cursor-ew-resize bg-[#090b10] touch-none"
          >
            {/* Live Interface Layer */}
            <div className="absolute inset-0 p-3 sm:p-8 lg:p-10 flex flex-col justify-between bg-gradient-to-br from-[#12131c] via-[#0d0f18] to-[#08090e]">
              <div className="flex items-center justify-between pb-2 sm:pb-4 border-b border-white/10">
                <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 pr-2">
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/80 shrink-0" />
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80 shrink-0" />
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500/80 shrink-0" />
                  <a
                    href="https://linqchain.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 font-mono text-[9px] sm:text-xs text-slate-300 hover:text-white font-semibold tracking-wider truncate flex items-center gap-1.5 group/link"
                    title="Open LinqChain (https://linqchain.vercel.app/)"
                  >
                    <span className="truncate">LINQCHAIN // RESILIENCE OS — CONTROL ROOM</span>
                    <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#ff4d5a] opacity-80 group-hover/link:opacity-100 transition-opacity shrink-0" />
                  </a>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>ONLINE · ZERO DISRUPTIONS</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-1.5 sm:gap-4 my-auto">
                <div className="p-2 sm:p-4 rounded-xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-md">
                  <div className="text-[9px] sm:text-xs font-mono text-slate-400 uppercase truncate">Resilience</div>
                  <div className="font-anton text-lg sm:text-3xl lg:text-4xl text-emerald-400 mt-0.5">99.98%</div>
                  <div className="text-[9px] sm:text-[11px] text-slate-400 mt-0.5 hidden sm:block">Deterministic failover</div>
                </div>
                <div className="p-2 sm:p-4 rounded-xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-md">
                  <div className="text-[9px] sm:text-xs font-mono text-slate-400 uppercase truncate">Topology</div>
                  <div className="font-anton text-lg sm:text-3xl lg:text-4xl text-[#ff3b3b] mt-0.5">1,420</div>
                  <div className="text-[9px] sm:text-[11px] text-slate-400 mt-0.5 hidden sm:block">Real-time graph sync</div>
                </div>
                <div className="p-2 sm:p-4 rounded-xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-md">
                  <div className="text-[9px] sm:text-xs font-mono text-slate-400 uppercase truncate">Latency</div>
                  <div className="font-anton text-lg sm:text-3xl lg:text-4xl text-cyan-400 mt-0.5">14.2 ms</div>
                  <div className="text-[9px] sm:text-[11px] text-slate-400 mt-0.5 hidden sm:block">Sub-second recovery</div>
                </div>
              </div>

              <div className="flex items-center justify-between text-[9px] sm:text-xs text-slate-400 font-mono gap-2">
                <span className="truncate">LIVE SYSTEM</span>
                <span className="text-emerald-400 shrink-0">← SLIDE LEFT</span>
              </div>
            </div>

            {/* Clipped Wireframe Blueprint Layer */}
            <div
              className="absolute inset-0 bg-[#050914] p-3 sm:p-8 lg:p-10 flex flex-col justify-between border-r-2 border-cyan-400 pointer-events-none"
              style={{
                clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
                backgroundImage: `linear-gradient(to right, rgba(56,189,248,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(56,189,248,0.1) 1px, transparent 1px)`,
                backgroundSize: "24px 24px",
              }}
            >
              <div className="flex items-center justify-between pb-2 sm:pb-4 border-b border-cyan-500/30 font-mono text-[9px] sm:text-xs text-cyan-400">
                <div className="flex items-center gap-1.5 sm:gap-2 truncate mr-2">
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 border border-cyan-400 shrink-0" />
                  <span className="truncate">[FRAME 01] WIREFRAME_SPEC_V2.FIG</span>
                </div>
                <span className="shrink-0 text-[8px] sm:text-[10px]">W: 1440 H: 900</span>
              </div>

              <div className="grid grid-cols-3 gap-1.5 sm:gap-4 my-auto">
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    className="p-1.5 sm:p-4 border border-dashed border-cyan-500/40 relative flex flex-col justify-center h-14 sm:h-24 lg:h-28 rounded-lg"
                  >
                    <div className="text-[7px] sm:text-[9px] font-mono text-cyan-300 truncate mb-0.5 sm:mb-1">
                      COMP_{n}
                    </div>
                    <div className="h-1.5 sm:h-4 bg-cyan-500/20 w-3/4 mb-1 rounded-sm" />
                    <div className="h-1 sm:h-2 bg-cyan-500/20 w-1/2 rounded-sm" />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
                      <div className="w-full h-px bg-cyan-400 rotate-12" />
                      <div className="w-full h-px bg-cyan-400 -rotate-12" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between text-[9px] sm:text-xs text-cyan-400 font-mono gap-2">
                <span className="truncate">BLUEPRINT SPEC</span>
                <span className="shrink-0">SLIDE RIGHT →</span>
              </div>
            </div>

            {/* Draggable Divider Handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-cyan-400 cursor-ew-resize flex items-center justify-center -translate-x-1/2 z-20 shadow-[0_0_15px_rgba(56,189,248,0.8)]"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-cyan-400 text-black flex items-center justify-center shadow-lg font-bold text-[10px] sm:text-xs select-none">
                ⇄
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 03: BEHIND THE CRAFT ("MORE THAN CODE.")                          */}
      {/* ========================================================================= */}
      <section
        ref={elemRefs.craftSection}
        id="craft"
        className="py-20 px-4 sm:px-8 max-w-7xl mx-auto border-t border-white/[0.08]"
      >
        <motion.div
          animate={{
            opacity: revealedItems.has("craftSection") ? 1 : 0.15,
          }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        >
          <div className="lg:col-span-6 space-y-6">
            <div className="text-xs font-mono text-[#ff4d5a] tracking-widest uppercase">
              03 / BEHIND THE CRAFT
            </div>
            <h2 className="font-anton text-4xl sm:text-5xl text-white tracking-tight">
              MORE THAN CODE.<br />
              <span className="text-[#ff3b3b]">CRAFTING EXPERIENCES.</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
              I believe modern software isn&apos;t just about throwing APIs together. It&apos;s about deterministic state, resilience under failure, and crafting interfaces that feel as intuitive and fluid as human thought.
            </p>

            <div className="space-y-4 pt-2">
              {[
                {
                  id: "craftCard0",
                  title: "Resilient Systems First",
                  desc: "Architected LinqChain (SAP HackFest finalist) simulating cascading tier-N disruptions.",
                  icon: ShieldCheck,
                  iconBg: "bg-[#ff3b3b]/10 text-[#ff4d5a]",
                },
                {
                  id: "craftCard1",
                  title: "AI Evaluation & RLHF",
                  desc: "Trained model behaviors and evaluation benchmarks at Deccan AI for enterprise reliability.",
                  icon: Bot,
                  iconBg: "bg-emerald-500/10 text-emerald-400",
                },
                {
                  id: "craftCard2",
                  title: "Certified Cloud Engineer",
                  desc: "Oracle Cloud Infrastructure (OCI) Developer Professional Certified 2025.",
                  icon: Cpu,
                  iconBg: "bg-cyan-500/10 text-cyan-400",
                },
              ].map((card, idx) => {
                const isRevealed = revealedItems.has(card.id);
                const IconComp = card.icon;
                return (
                  <div
                    key={card.id}
                    ref={elemRefs[card.id]}
                    onClick={() => {
                      if (!isRevealed) {
                        playCraftPop(650 + idx * 30);
                        setRevealedItems((prev) => new Set([...prev, card.id]));
                      }
                    }}
                    className={`flex items-start gap-3 p-3 rounded-xl border transition-all duration-300 relative select-none ${
                      isRevealed
                        ? "bg-white/[0.02] border-white/[0.08] hover:border-white/20"
                        : "border-dashed border-cyan-400/30 bg-cyan-400/[0.02] cursor-pointer hover:border-cyan-400/60 opacity-60"
                    }`}
                    title={isRevealed ? card.title : `Click to craft ${card.title}`}
                  >
                    <div className={`p-2 rounded-lg ${card.iconBg} mt-0.5 shrink-0`}>
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-sm text-white">{card.title}</h4>
                        {!isRevealed && (
                          <span className="text-[9px] font-mono text-cyan-400 border border-cyan-400/40 px-1 py-0.2 rounded animate-pulse">
                            CRAFT
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">{card.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-6 p-4 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.08] shadow-xl">
            <div className="flex items-center justify-between mb-4 sm:mb-6 gap-2">
              <h3 className="font-anton text-xl sm:text-2xl text-white tracking-wide truncate">
                ENGINEERING ARSENAL
              </h3>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded-full border border-cyan-400/20 whitespace-nowrap shrink-0">
                12 CRAFTED BOXES
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
              {[
                { name: "React / Vite", cat: "Frontend" },
                { name: "Node.js", cat: "Backend" },
                { name: "Python", cat: "AI / RLHF" },
                { name: "FastAPI", cat: "Backend / API" },
                { name: "PostgreSQL", cat: "Database" },
                { name: "Redis", cat: "Cache / Queue" },
                { name: "Docker", cat: "DevOps" },
                { name: "Oracle OCI", cat: "Cloud" },
                { name: "AWS", cat: "Cloud" },
                { name: "Tailwind CSS", cat: "Styling" },
                { name: "Framer Motion", cat: "Motion" },
                { name: "WebSockets", cat: "Real-time" },
              ].map((tech, idx) => {
                const boxKey = `arsenal${idx}`;
                const isRevealed = revealedItems.has(boxKey);
                return (
                  <div
                    key={tech.name}
                    ref={elemRefs[boxKey]}
                    onClick={() => {
                      if (!isRevealed) {
                        playCraftPop(720 + idx * 25);
                        setRevealedItems((prev) => new Set([...prev, boxKey]));
                      }
                    }}
                    className={`p-2.5 sm:p-3 rounded-xl border transition-all duration-300 relative select-none ${
                      isRevealed
                        ? "bg-white/[0.03] border-white/[0.08] hover:border-white/20 hover:-translate-y-0.5 shadow-md shadow-black/20"
                        : "border-dashed border-cyan-400/30 bg-cyan-400/[0.02] cursor-pointer hover:border-cyan-400/60 opacity-60"
                    }`}
                    title={isRevealed ? tech.name : `Click to craft ${tech.name}`}
                  >
                    {!isRevealed ? (
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="h-3 w-14 bg-cyan-400/20 rounded font-mono text-[9px] text-cyan-300 flex items-center px-1">
                            {tech.name.slice(0, 8)}
                          </div>
                          <div className="h-2 w-8 bg-cyan-400/10 rounded mt-1.5" />
                        </div>
                        <span className="text-[8px] font-mono text-cyan-400 border border-cyan-400/40 px-1 py-0.5 rounded">
                          BOX_{idx + 1}
                        </span>
                      </div>
                    ) : (
                      <>
                        <div className="font-semibold text-xs text-white flex items-center justify-between">
                          <span className="truncate mr-1">{tech.name}</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                        </div>
                        <div className="text-[10px] font-mono text-slate-400 mt-0.5 truncate">{tech.cat}</div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 04: THE JOURNEY ("KEEP BUILDING. KEEP SHIPPING.")                 */}
      {/* ========================================================================= */}
      <section
        ref={elemRefs.journeySection}
        id="journey"
        className="py-20 px-4 sm:px-8 max-w-7xl mx-auto border-t border-white/[0.08]"
      >
        <motion.div
          animate={{
            opacity: revealedItems.has("journeySection") ? 1 : 0.15,
          }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-10">
            <div className="text-xs font-mono text-[#ff4d5a] tracking-widest uppercase mb-1">
              04 / THE JOURNEY
            </div>
            <h2 className="font-anton text-4xl sm:text-5xl text-white tracking-tight">
              KEEP BUILDING. <span className="text-[#ff3b3b]">KEEP SHIPPING.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-4">
              {RECRUITER.highlights.map((h, i) => (
                <div
                  key={i}
                  className="p-4 sm:p-5 rounded-xl bg-white/[0.02] border border-white/[0.07] hover:border-white/20 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <div className="font-anton text-lg sm:text-xl text-white tracking-wide">{h.org}</div>
                    <div className="text-xs text-slate-300 mt-1 font-light leading-relaxed">{h.what}</div>
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-mono text-[#ff4d5a] px-2.5 sm:px-3 py-1 rounded-full bg-[#ff3b3b]/10 border border-[#ff3b3b]/20 whitespace-nowrap self-start sm:self-auto shrink-0">
                    VERIFIED MILESTONE
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-4 p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#181a24] to-[#0d0f16] border border-white/10 flex flex-col justify-between">
              <div>
                <div className="font-anton text-3xl sm:text-4xl text-[#ff3b3b] tracking-wide">
                  SHIPPED.<br />LIVE. USED.
                </div>
                <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                  From hackathon arenas in IIT Delhi and SAP Labs to international clients at Mittal Alliance, every project has been battle-tested under production constraints.
                </p>
              </div>

              {/* Yug's Photo Frame crafted by mouse pointer selector box */}
              <div
                ref={elemRefs.journeyPhoto}
                onClick={() => {
                  if (!revealedItems.has("journeyPhoto")) {
                    playCraftPop(680);
                    setRevealedItems((prev) => new Set([...prev, "journeyPhoto"]));
                  }
                }}
                className={`my-6 rounded-xl overflow-hidden transition-all duration-300 relative select-none ${
                  revealedItems.has("journeyPhoto")
                    ? "bg-[#111422] border border-white/15 shadow-2xl group"
                    : "border-2 border-dashed border-cyan-400/30 bg-cyan-400/[0.02] cursor-pointer hover:border-cyan-400/60 p-4"
                }`}
                title={revealedItems.has("journeyPhoto") ? "Yug Pathak" : "Click to craft photo frame"}
              >
                {!revealedItems.has("journeyPhoto") ? (
                  <div className="flex flex-col justify-between items-center h-[320px] sm:h-[420px] font-mono text-cyan-300 p-4">
                    <div className="flex justify-between w-full text-[10px] text-cyan-400/70">
                      <span>FRAME: DEV_SNAPSHOT.JPG</span>
                      <span className="text-[#ff4d5a] font-bold animate-pulse">[SELECT TO CRAFT]</span>
                    </div>
                    <div className="flex flex-col items-center justify-center space-y-2.5">
                      <div className="w-16 h-16 rounded-full bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-cyan-300 text-xs">
                        ⚡ DEV
                      </div>
                      <div className="text-[11px] text-slate-400">Yug Pathak · Production Workspace</div>
                    </div>
                    <div className="text-[10px] font-mono text-cyan-400/50">W: 420 × H: 420</div>
                  </div>
                ) : (
                  <div className="relative group h-[320px] sm:h-[420px]">
                    <img
                      src="/assets/journey_yug.jpg"
                      alt="Yug Pathak - Live & Shipped"
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent pointer-events-none" />
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] font-mono">
                      <span className="text-white font-semibold flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        YUG PATHAK
                      </span>
                      <span className="text-slate-300 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded border border-white/10 text-[9px]">
                        FOUNDER & BUILDER
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-white/10 space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-400">LeetCode Problem Solved</span>
                  <span className="text-white font-bold">200+</span>
                </div>
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-400">International Clients Served</span>
                  <span className="text-white font-bold">3+</span>
                </div>
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-400">Production REST Endpoints</span>
                  <span className="text-white font-bold">10+</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 05: LET'S BUILD TOGETHER (CONTACT)                                */}
      {/* ========================================================================= */}
      <section
        ref={elemRefs.contactSection}
        id="contact"
        className="py-20 px-4 sm:px-8 max-w-7xl mx-auto border-t border-white/[0.08]"
      >
        <motion.div
          animate={{
            opacity: revealedItems.has("contactSection") ? 1 : 0.15,
          }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
        >
          <div className="lg:col-span-6 space-y-4">
            <div className="text-xs font-mono text-[#ff4d5a] tracking-widest uppercase">
              05 / YOUR NEXT PROJECT
            </div>
            <h2 className="font-anton text-4xl sm:text-6xl text-white tracking-tight leading-tight">
              LET&apos;S BUILD<br />
              <span className="text-[#ff3b3b]">TOGETHER.</span>
            </h2>
            <p className="text-slate-400 text-sm font-light max-w-md">
              Have an opening, an ambitious systems challenge, or a project in mind? Let&apos;s build software that stands out and doesn&apos;t break.
            </p>
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div
              onClick={copyEmail}
              className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-white/20 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span className="flex items-center gap-1.5 font-mono">
                  <Mail className="w-3.5 h-3.5 text-[#ff4d5a]" /> Email
                </span>
                {copiedEmail ? (
                  <span className="text-emerald-400 flex items-center gap-1 text-[11px]">
                    <Check className="w-3 h-3" /> Copied!
                  </span>
                ) : (
                  <Copy className="w-3 h-3 group-hover:text-white" />
                )}
              </div>
              <div className="text-xs font-mono text-white truncate font-medium">
                {LINKS.email}
              </div>
            </div>

            <a
              href={LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-white/20 transition-all group"
            >
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span className="flex items-center gap-1.5 font-mono">
                  <Linkedin className="w-3.5 h-3.5 text-[#0077b5]" /> LinkedIn
                </span>
                <ExternalLink className="w-3 h-3 group-hover:text-white" />
              </div>
              <div className="text-xs font-mono text-white truncate font-medium">
                yug-pathak-94b7b225b
              </div>
            </a>

            <a
              href={LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-white/20 transition-all group"
            >
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span className="flex items-center gap-1.5 font-mono">
                  <Github className="w-3.5 h-3.5 text-slate-200" /> GitHub
                </span>
                <ExternalLink className="w-3 h-3 group-hover:text-white" />
              </div>
              <div className="text-xs font-mono text-white truncate font-medium">
                Yug210705
              </div>
            </a>

            <a
              href={LINKS.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-white/20 transition-all group"
            >
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span className="flex items-center gap-1.5 font-mono">
                  <FileText className="w-3.5 h-3.5 text-amber-400" /> Resume
                </span>
                <ExternalLink className="w-3 h-3 group-hover:text-white" />
              </div>
              <div className="text-xs font-mono text-white truncate font-medium">
                Download PDF
              </div>
            </a>
          </div>
        </motion.div>
      </section>

      {/* ========================================================================= */}
      {/* PROFESSIONAL FOOTER (DESKTOP ARCHITECTURAL GRID & RESPONSIVE COLLAPSE)     */}
      {/* ========================================================================= */}
      <footer
        ref={elemRefs.footerSection}
        id="site-bottom"
        className="border-t border-white/[0.08] bg-[#07080e]/95 backdrop-blur-xl pt-14 pb-20 sm:pb-16 px-4 sm:px-8 relative overflow-hidden"
      >
        <motion.div
          animate={{
            opacity: revealedItems.has("footerSection") ? 1 : 0.15,
            y: revealedItems.has("footerSection") ? 0 : 12,
            scale: revealedItems.has("footerSection") ? 1 : 0.98,
          }}
          transition={{ duration: 0.5 }}
          className="relative w-full"
        >
          {/* Subtle accent glow */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[220px] bg-gradient-to-t from-[#ff1e27]/10 via-[#b91c1c]/5 to-transparent blur-[120px] pointer-events-none" />

          <div className="max-w-7xl mx-auto relative z-10">
            {/* Top Desktop Grid / Responsive Mobile Stack */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-10 sm:pb-12 border-b border-white/[0.08]">
              {/* Brand & Systems Identity (Col 1-5) */}
              <div className="md:col-span-5 space-y-4 text-center md:text-left">
                <a
                  href="#hero"
                  className="font-anton text-3xl sm:text-4xl tracking-wider text-white hover:text-[#ff4d5a] transition-colors inline-block"
                >
                  YUG PATHAK<span className="text-[#ff3b3b] inline-block ml-1.5">.</span>
                </a>

                <p className="text-xs font-mono text-[#ff4d5a] tracking-wider uppercase font-semibold">
                  SOFTWARE DEVELOPER & AI ENGINEER
                </p>

                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-light max-w-sm mx-auto md:mx-0">
                  Designing deterministic architectures, resilient distributed backends, and AI evaluation systems (RLHF & SFT) built to withstand real production constraints.
                </p>

                {/* Live Availability status pill */}
                <div className="pt-1 flex flex-wrap items-center justify-center md:justify-start gap-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[11px] font-mono text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span>AVAILABLE FOR OPPORTUNITIES · 2026</span>
                  </div>
                </div>

                <div className="flex items-center justify-center md:justify-start gap-2 text-[11px] font-mono text-slate-400">
                  <MapPin className="w-3.5 h-3.5 text-[#ff4d5a]" />
                  <span>Jaipur, Rajasthan, India · UTC+5:30 (IST)</span>
                </div>
              </div>

              {/* Directory Navigation (Col 6-7) */}
              <div className="md:col-span-2 space-y-3 text-center md:text-left">
                <div className="text-xs font-mono text-white tracking-widest uppercase font-semibold">
                  DIRECTORY
                </div>
                <ul className="space-y-2 text-xs font-mono text-slate-400">
                  <li>
                    <a href="#work" className="hover:text-white transition-colors inline-flex items-center gap-1.5 group">
                      <span className="text-[#ff3b3b] opacity-0 group-hover:opacity-100 transition-opacity hidden md:inline">›</span>
                      <span>Selected Work</span>
                    </a>
                  </li>
                  <li>
                    <a href="#wireframe" className="hover:text-white transition-colors inline-flex items-center gap-1.5 group">
                      <span className="text-[#ff3b3b] opacity-0 group-hover:opacity-100 transition-opacity hidden md:inline">›</span>
                      <span>Wireframe Blueprint</span>
                    </a>
                  </li>
                  <li>
                    <a href="#craft" className="hover:text-white transition-colors inline-flex items-center gap-1.5 group">
                      <span className="text-[#ff3b3b] opacity-0 group-hover:opacity-100 transition-opacity hidden md:inline">›</span>
                      <span>Behind the Craft</span>
                    </a>
                  </li>
                  <li>
                    <a href="#journey" className="hover:text-white transition-colors inline-flex items-center gap-1.5 group">
                      <span className="text-[#ff3b3b] opacity-0 group-hover:opacity-100 transition-opacity hidden md:inline">›</span>
                      <span>Engineering Journey</span>
                    </a>
                  </li>
                  <li>
                    <a href="#contact" className="hover:text-white transition-colors inline-flex items-center gap-1.5 group">
                      <span className="text-[#ff3b3b] opacity-0 group-hover:opacity-100 transition-opacity hidden md:inline">›</span>
                      <span>Direct Dispatch</span>
                    </a>
                  </li>
                </ul>
              </div>

              {/* Interactive Environments (Col 8-10) */}
              <div className="md:col-span-3 space-y-3 text-center md:text-left">
                <div className="text-xs font-mono text-white tracking-widest uppercase font-semibold">
                  ENVIRONMENTS
                </div>
                <div className="flex flex-col gap-2 max-w-xs mx-auto md:mx-0">
                  <button
                    onClick={() => goMode("desktop")}
                    className="hidden md:flex items-center justify-between px-3 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-slate-300 hover:text-white transition-all cursor-pointer group text-left"
                    title="Launch Retro Windows 98 OS desktop (Laptop/Desktop only)"
                  >
                    <span className="flex items-center gap-2">
                      <Laptop className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Windows 98 OS</span>
                    </span>
                    <span className="text-[10px] text-cyan-400 opacity-60 group-hover:opacity-100">LAUNCH →</span>
                  </button>

                  <button
                    onClick={openInterview}
                    className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-slate-300 hover:text-white transition-all cursor-pointer group text-left"
                    title="Launch 3D Avatar Mock Interview"
                  >
                    <span className="flex items-center gap-2">
                      <Bot className="w-3.5 h-3.5 text-emerald-400" />
                      <span>3D Mock Interview</span>
                    </span>
                    <span className="text-[10px] text-emerald-400 opacity-60 group-hover:opacity-100">TALK →</span>
                  </button>

                  <button
                    onClick={() => goMode("builder")}
                    className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-slate-300 hover:text-white transition-all cursor-pointer group text-left"
                    title="Open Builder Dossiers & Lab Specs"
                  >
                    <span className="flex items-center gap-2">
                      <Cpu className="w-3.5 h-3.5 text-amber-400" />
                      <span>Builder Lab Specs</span>
                    </span>
                    <span className="text-[10px] text-amber-400 opacity-60 group-hover:opacity-100">DOSSIERS →</span>
                  </button>

                  <button
                    onClick={() => goMode("mobile")}
                    className="md:hidden flex items-center justify-between px-3 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/25 text-xs font-mono text-emerald-300 transition-all cursor-pointer text-left"
                  >
                    <span className="flex items-center gap-2">
                      <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Main Mobile App</span>
                    </span>
                    <span className="text-[10px]">OPEN →</span>
                  </button>
                </div>
              </div>

              {/* Connect & Dispatch (Col 11-12) */}
              <div className="md:col-span-2 space-y-3 text-center md:text-left">
                <div className="text-xs font-mono text-white tracking-widest uppercase font-semibold">
                  CONNECT
                </div>
                <div className="flex flex-col gap-2.5 text-xs font-mono text-slate-400 max-w-xs mx-auto md:mx-0">
                  <a
                    href={LINKS.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between hover:text-white transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Github className="w-3.5 h-3.5 text-slate-300" />
                      <span>GitHub</span>
                    </span>
                    <ExternalLink className="w-2.5 h-2.5 opacity-40" />
                  </a>

                  <a
                    href={LINKS.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between hover:text-white transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Linkedin className="w-3.5 h-3.5 text-[#0077b5]" />
                      <span>LinkedIn</span>
                    </span>
                    <ExternalLink className="w-2.5 h-2.5 opacity-40" />
                  </a>

                  <button
                    onClick={copyEmail}
                    className="flex items-center justify-between hover:text-white transition-colors text-left cursor-pointer"
                    title="Copy Email"
                  >
                    <span className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-[#ff4d5a]" />
                      <span>{copiedEmail ? "Copied!" : "Email"}</span>
                    </span>
                    {copiedEmail ? (
                      <Check className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <Copy className="w-2.5 h-2.5 opacity-40" />
                    )}
                  </button>

                  <a
                    href={LINKS.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between text-white hover:text-amber-300 transition-colors pt-1"
                    title="Download Official Resume PDF"
                  >
                    <span className="flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5 text-amber-400" />
                      <span className="font-semibold">Resume</span>
                    </span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">
                      PDF
                    </span>
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom Engineering Metadata & Back to Top */}
            <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
                {/* Mandatory user requirement: "Made with skills by Yug Pathak" */}
                <div className="flex items-center gap-1.5 text-slate-300 font-medium">
                  <span>Made with skills by</span>
                  <span className="text-white font-bold tracking-wider hover:text-[#ff4d5a] transition-colors">
                    Yug Pathak
                  </span>
                </div>
                <span className="hidden sm:inline text-white/20">•</span>
                <span className="text-[11px] text-slate-500">
                  © {new Date().getFullYear()} YUG PATHAK · ALL RIGHTS RESERVED
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] text-slate-500">
                <span className="hidden lg:inline text-slate-400 font-medium">
                  REACT 18 · FASTAPI · SAP CAP & HANA CLOUD
                </span>
                <span className="hidden lg:inline text-white/20">•</span>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-300 hover:text-white transition-all cursor-pointer flex items-center gap-1.5 group"
                >
                  <span>Back to Top</span>
                  <ArrowUp className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
        {/* Observer sentinel to stop sound when user manually scrolls to the bottom */}
        <div ref={bottomRef} className="h-px w-full pointer-events-none" />
      </footer>

      {/* ========================================================================= */}
      {/* FLOATING MULTIPLAYER AGENT HUD DOCK (CONTROLS & LAYER TICKER)            */}
      {/* ========================================================================= */}
      <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-[120] flex items-center gap-1.5 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full bg-[#111422]/95 backdrop-blur-2xl border border-white/20 shadow-2xl text-[11px] sm:text-xs font-mono text-white transition-all hover:border-white/30 max-w-[calc(100vw-1.5rem)]">
        <div className="flex items-center gap-1.5 sm:gap-2 pr-2 sm:pr-3 border-r border-white/15 shrink-0">
          <span className="flex h-2 w-2 sm:h-2.5 sm:w-2.5 relative shrink-0">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                isTouring ? "bg-cyan-400" : "bg-emerald-400"
              }`}
            />
            <span
              className={`relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 ${
                isTouring ? "bg-cyan-500" : "bg-emerald-500"
              }`}
            />
          </span>
          <span className="font-semibold text-cyan-400 text-[10px] sm:text-xs">
            {isTouring ? "Layer:" : "Rebuilt:"}
          </span>
          <span className="text-slate-200 text-[10px] sm:text-xs">
            {isTouring ? `${Math.min(currentStepIndex + 1, STEPS.length)}/${STEPS.length}` : `${STEPS.length}`}
          </span>
        </div>

        <div className="w-16 sm:w-28 h-1.5 sm:h-2 bg-white/10 rounded-full overflow-hidden hidden md:block shrink-0">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 via-emerald-400 to-[#ff3b3b] transition-all duration-100"
            style={{ width: `${totalProgressPercent}%` }}
          />
        </div>

        {isTouring && (
          <button
            onClick={() => setIsPaused((p) => !p)}
            className="p-1 rounded-full hover:bg-white/15 text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0"
            title={isPaused ? "Resume Crafting Tour" : "Pause Crafting Tour"}
          >
            {isPaused ? <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> : <Pause className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
          </button>
        )}

        {isTouring && (
          <button
            onClick={() => setTourSpeed((s) => (s === 1 ? 2 : s === 2 ? 4 : 1))}
            className="px-1.5 sm:px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-[10px] sm:text-[11px] font-bold text-slate-200 transition-colors cursor-pointer shrink-0"
            title="Toggle Crafting Speed"
          >
            {tourSpeed}x
          </button>
        )}

        {/* Song Mute/Play toggle: STRICT by Meechie Alexander */}
        <button
          onClick={toggleMusic}
          className={`p-1 sm:p-1.5 rounded-full transition-colors cursor-pointer flex items-center justify-center shrink-0 ${
            musicPlaying
              ? "text-[#ff4d5a] bg-red-500/15 hover:bg-red-500/25"
              : "text-slate-400 hover:text-white hover:bg-white/10"
          }`}
          title={musicPlaying ? "Pause STRICT by Meechie Alexander" : "Play STRICT by Meechie Alexander"}
        >
          {musicPlaying ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
        </button>

        <button
          onClick={() => startTour(1)}
          className="flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white text-[10px] sm:text-[11px] font-semibold transition-colors cursor-pointer shrink-0"
          title="Restart Animated Selector Box Spanning"
        >
          <RotateCcw className="w-3 h-3" />
          <span className="hidden sm:inline">Replay</span>
        </button>

        {isTouring && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              stopTour(false);
            }}
            className="px-2.5 sm:px-3 py-1 rounded-full bg-[#ff3b3b] hover:bg-[#e11d48] text-white font-semibold text-[10px] sm:text-[11px] shadow-md cursor-pointer transition-all active:scale-95 shrink-0 whitespace-nowrap"
            title="Skip directly to finished live interface"
          >
            Live
          </button>
        )}
      </div>
    </div>
  );
}
