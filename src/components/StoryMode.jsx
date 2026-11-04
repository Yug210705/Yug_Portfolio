import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Mic } from "lucide-react";
import { CHAPTERS, MEMORY_OBJECTS, STILL_FIGURING, WISPR_TIMELINE, FIELD_ARCHIVES } from "@/data/content";
import FieldGalleryModal from "./FieldGalleryModal";
import { CRTOverlay } from "./Win98";
import { PixelScene } from "./PixelScene";
import { QuoteBlock, MarqueeBand } from "./StoryBits";
import MemoryWindow from "./MemoryWindow";

const objById = Object.fromEntries(MEMORY_OBJECTS.map((o) => [o.id, o]));

const FLOATING_ARTIFACTS = [
  { text: "0x0000: BOOT_START", top: "8%", left: "4%", speed: -60 },
  { text: "MS_PAINT.EXE (CAR.DRV)", top: "18%", right: "5%", speed: 75 },
  { text: "QBASIC: 0 & 1", top: "28%", left: "6%", speed: -80 },
  { text: "STARS.CPP [TRIANGLE]", top: "42%", right: "4%", speed: 65 },
  { text: "ARDUINO.SYS [CARDBOARD]", top: "54%", left: "3%", speed: -75 },
  { text: "LNM_HACKS_72H", top: "66%", right: "6%", speed: 85 },
  { text: "AWS_EC2_BILL: ₹3,000", top: "76%", left: "5%", speed: -65 },
  { text: "SAP_HACKFEST_FINALIST", top: "86%", right: "5%", speed: 75 },
];

const FloatingStoryBackground = () => {
  const { scrollYProgress } = useScroll();
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      {FLOATING_ARTIFACTS.map((item, i) => {
        const y = useTransform(scrollYProgress, [0, 1], [0, item.speed]);
        return (
          <motion.div
            key={i}
            style={{
              top: item.top,
              left: item.left,
              right: item.right,
              y,
            }}
            className="absolute hidden sm:block will-change-transform"
          >
            <div
              style={{ animationDelay: `${(i * 0.6) % 3}s` }}
              className="animate-float-slow font-vt text-[13px] sm:text-[15px] text-[#33ff33]/30 tracking-widest border border-[#33ff33]/20 bg-[#0c0d12]/70 px-2.5 py-1 backdrop-blur-[1px]"
            >
              {item.text}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

const ChapterScene = ({ ch, onOpenObject }) => {
  const ref = useRef(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const z = useTransform(p, [0, 0.32, 0.68, 1], [-480, 0, 0, -380]);
  const rotateX = useTransform(p, [0, 0.32, 0.68, 1], [8, 0, 0, -5]);
  const opacity = useTransform(p, [0.05, 0.24, 0.76, 0.95], [0, 1, 1, 0]);
  const numY = useTransform(p, [0, 1], [90, -90]);
  const line1y = useTransform(p, [0.18, 0.36], ["110%", "0%"]);
  const line2y = useTransform(p, [0.22, 0.4], ["110%", "0%"]);
  const cardY = useTransform(p, [0.25, 0.5], [60, 0]);
  const cardOp = useTransform(p, [0.24, 0.42], [0, 1]);

  // Smooth, non-conflicting scrolling floating offsets
  const floatCardScroll = useTransform(p, [0.2, 0.8], [25, -25]);
  const floatPhotoScroll = useTransform(p, [0.2, 0.8], [35, -30]);
  const floatTagScroll = useTransform(p, [0, 1], [-20, 30]);
  const floatTextScroll = useTransform(p, [0.2, 0.8], [12, -12]);

  return (
    <section ref={ref} id={`story-chapter-${ch.id}`} className="relative" style={{ height: "200vh" }} data-testid={`story-chapter-${ch.id}`}>
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        {/* Floating background chapter numeral */}
        <motion.div
          aria-hidden
          className="absolute font-vt text-[34vw] leading-none text-transparent select-none pointer-events-none will-change-transform"
          style={{ WebkitTextStroke: "1px rgba(51,255,51,0.13)", y: numY, right: "2vw", top: "4vh" }}
        >
          <div className="animate-float-slow">
            {ch.num}
          </div>
        </motion.div>

        {/* Floating memory address badge */}
        <motion.div
          style={{ y: floatTagScroll }}
          className="absolute hidden sm:block top-[14%] right-[10%] pointer-events-none select-none will-change-transform z-0"
        >
          <div
            style={{ animationDelay: `${(parseInt(ch.num, 10) * 0.4) % 2.5}s` }}
            className="animate-float-gentle font-vt text-[#33ff33]/20 text-sm tracking-widest border border-[#33ff33]/20 bg-[#0c0d12]/50 px-2 py-0.5"
          >
            {"<MEM_" + ch.num + "_ADDR_0x" + ch.num + "F>"}
          </div>
        </motion.div>

        <motion.div
          style={{ z, rotateX, opacity, transformStyle: "preserve-3d" }}
          className="relative w-full max-w-6xl mx-auto px-5 sm:px-10 grid lg:grid-cols-[1.15fr_0.85fr] gap-8 lg:gap-12 items-center will-change-transform"
        >
          {/* Left-side story text */}
          <motion.div style={{ y: floatTextScroll }} className="will-change-transform">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
              <span className="font-vt text-[16px] tracking-[0.25em] text-[#33ff33] phos">CH{ch.num}</span>
              {ch.date && (
                <span className="font-vt text-[12px] sm:text-[13px] tracking-widest text-[#00ffff] border border-[#00ffff]/40 bg-[#00ffff]/10 px-2 py-0.5">
                  {ch.date}
                </span>
              )}
              {ch.metricBadge && (
                <span className="font-vt text-[12px] sm:text-[13px] tracking-widest text-[#ffb000] border border-[#ffb000]/50 bg-[#ffb000]/10 px-2 py-0.5">
                  {ch.metricBadge}
                </span>
              )}
              <span className="font-vt text-[14px] sm:text-[15px] tracking-[0.2em] text-[#33ff33]/60">{ch.label}</span>
              {ch.error && (
                <span className="animate-float-gentle font-vt text-[12px] tracking-widest text-[#ffb000] border border-[#ffb000]/50 px-2 py-0.5 inline-block">
                  ERROR_LOG
                </span>
              )}
            </div>
            <div className="font-vt text-[#e2e8f0] text-[36px] sm:text-6xl leading-[0.98] mb-5">
              <motion.span style={{ y: line1y }} className="line-mask">
                <span>{ch.lines[0]}</span>
              </motion.span>
              <motion.span style={{ y: line2y }} className="line-mask">
                <span>{ch.lines.slice(1).join(" ")}</span>
              </motion.span>
            </div>
            {ch.paras.map((para, i) => (
              <p key={i} className="text-[14px] sm:text-base leading-relaxed text-[#9fb0c3] mb-3.5 max-w-xl">
                {para}
              </p>
            ))}
            <QuoteBlock quote={ch.quote} />
            <div className="font-vt text-[18px] text-[#33ff33] phos mt-5 animate-float-gentle inline-block">
              {ch.effect}
            </div>
          </motion.div>

          {/* Right-side floating memory cards & photos */}
          {(ch.objects.length > 0 || ch.photo) && (
            <motion.div
              style={{ y: cardY, opacity: cardOp, transformStyle: "preserve-3d" }}
              className="flex flex-col gap-4 max-w-sm w-full mx-auto lg:mx-0 lg:justify-self-end w-full will-change-transform"
            >
              {ch.objects.map((oid, idx) => {
                const obj = objById[oid];
                if (!obj) return null;
                return (
                  <motion.div
                    key={oid}
                    style={{ y: idx === 0 ? floatCardScroll : floatPhotoScroll }}
                    className="w-full will-change-transform"
                  >
                    <div
                      style={{ animationDelay: `${idx * 0.8}s` }}
                      className={`w-full ${idx % 2 === 0 ? "animate-float-gentle" : "animate-float-gentle-alt"} transition-transform duration-200 hover:scale-[1.025]`}
                    >
                      <button
                        data-testid={`memory-object-${oid}`}
                        onClick={() => onOpenObject(obj)}
                        className="bevel hard-shadow text-left group w-full block cursor-pointer"
                      >
                        <div className="titlebar-dark px-2 py-1 font-vt text-[14px] text-[#33ff33] flex justify-between">
                          <span className="truncate">{obj.file}</span>
                          <span className="text-[#33ff33]/60 group-hover:text-[#ffb000] shrink-0 ml-2">OPEN ↗</span>
                        </div>
                        <div className="bg-[#0c0d12] p-3">
                          <PixelScene art={obj.art} className="w-full h-24" />
                          <div className="font-vt text-[16px] text-[#e2e8f0] mt-2 flex items-center justify-between">
                            <span>{obj.name}</span>
                            <span className="text-[12px] text-[#ffb000] font-vt tracking-wider">MEM_SLOT</span>
                          </div>
                        </div>
                      </button>
                    </div>
                  </motion.div>
                );
              })}

              {ch.photo && (
                <motion.div
                  style={{ y: floatPhotoScroll }}
                  className="w-full will-change-transform"
                >
                  <div className="w-full animate-float-gentle transition-transform duration-200 hover:scale-[1.02]">
                    <figure className="bevel hard-shadow overflow-hidden" data-testid={`story-photo-${ch.id}`}>
                      <img
                        src={ch.photo.src}
                        alt={ch.photo.caption}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-44 sm:h-52 object-cover block"
                      />
                      <figcaption className="bg-[#0c0d12] px-3 py-2 font-vt text-[15px] text-[#ffb000] tracking-wide flex items-center justify-between">
                        <span>{ch.photo.caption}</span>
                        <span className="text-[11px] text-[#33ff33]/60 tracking-widest">[ATTACHMENT]</span>
                      </figcaption>
                    </figure>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(p, [0, 1], [0, 140]);
  const op = useTransform(p, [0, 0.75], [1, 0]);
  const g1 = useTransform(p, [0, 1], [0, -90]);
  const g2 = useTransform(p, [0, 1], [0, -170]);
  const g4 = useTransform(p, [0, 1], [0, -210]);

  const line = (content, i) => (
    <span className="line-mask" key={i}>
      <motion.span
        initial={{ y: "112%" }}
        animate={{ y: "0%" }}
        transition={{ delay: 0.12 + i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="block"
      >
        {content}
      </motion.span>
    </span>
  );

  return (
    <section ref={ref} id="story-hero" className="relative h-[100svh] flex items-center overflow-hidden" data-testid="story-hero">
      {/* Floating Retro Elements with scroll transform and clean compositor floating */}
      <motion.div
        style={{ y: g1 }}
        aria-hidden
        className="absolute top-[16%] left-[8%] select-none will-change-transform z-10"
      >
        <div className="animate-float-gentle font-vt text-[#33ff33]/40 text-2xl sm:text-3xl bevel-dark px-2.5 py-1">
          {"<0/1>"}
        </div>
      </motion.div>

      <motion.div
        style={{ y: g2 }}
        aria-hidden
        className="absolute top-[62%] right-[9%] select-none will-change-transform z-10"
      >
        <div className="animate-float-gentle-alt font-vt text-[#ffb000]/40 text-2xl sm:text-3xl bevel-dark-amber px-2.5 py-1">
          72:00:00
        </div>
      </motion.div>

      <motion.div
        style={{ y: g4 }}
        aria-hidden
        className="absolute top-[28%] right-[16%] select-none hidden md:block will-change-transform z-10"
      >
        <div className="animate-float-gentle font-vt text-[#00ffff]/30 text-lg sm:text-xl bevel-dark px-2 py-0.5">
          MEM: 640K OK
        </div>
      </motion.div>

      <motion.div style={{ y, opacity: op }} className="relative max-w-6xl mx-auto px-5 sm:px-10 w-full will-change-transform">
        <div className="animate-float-gentle font-vt text-[16px] sm:text-[18px] tracking-[0.3em] text-[#33ff33] phos mb-5 inline-block">
          YUG.EXE · MEMORY MACHINE v1.0
        </div>
        <h1 className="font-vt text-[#e2e8f0] text-[46px] sm:text-7xl lg:text-8xl leading-[0.95] max-w-4xl">
          {line("A computer that", 0)}
          {line("remembers how it", 1)}
          {line(
            <>
              became a <span className="text-[#ffb000] phos-amber">computer scientist.</span>
            </>,
            2
          )}
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-6 text-[14px] sm:text-lg text-[#9fb0c3] max-w-xl"
        >
          Eleven chapters. Every one caused the next. The failures are in the log on purpose — that is the feature.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 font-vt text-[16px] text-[#33ff33]/70 flex items-center gap-2"
        >
          <span className="blink">▼</span> SCROLL TO EXECUTE
        </motion.div>
      </motion.div>
    </section>
  );
};

const WisprReveal = ({ onOpenVoice }) => {
  const ref = useRef(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const floatCard = useTransform(p, [0, 1], [30, -30]);

  return (
    <section ref={ref} id="wispr-flow-reveal-card" className="relative py-24 sm:py-32 px-5" data-testid="wispr-flow-reveal-card">
      <motion.div style={{ y: floatCard }} className="max-w-4xl mx-auto text-center will-change-transform">
        <div className="animate-float-gentle font-vt text-[15px] sm:text-[16px] tracking-[0.3em] text-[#33ff33]/70 mb-8 inline-block">
          THE OLDEST QUESTION IN THE STORY
        </div>
        <p className="font-vt text-[30px] sm:text-5xl leading-tight text-[#e2e8f0]">
          "Why can't I just tell the computer what I want in{" "}
          <span className="text-[#ffb000] phos-amber">simple English</span>?"
        </p>
        <p className="font-vt text-[16px] text-[#33ff33]/60 mt-3">— me, a kid, at a Windows XP laptop</p>

        {/* Floating timeline badges */}
        <div className="my-10 flex flex-wrap items-center justify-center gap-y-3 gap-x-2 sm:gap-x-3">
          {WISPR_TIMELINE.map((t, i) => (
            <span key={t} className="flex items-center gap-2 sm:gap-3">
              <span
                style={{ animationDelay: `${i * 0.25}s` }}
                className="animate-float-gentle bevel font-vt text-[16px] px-3 py-1.5 text-black cursor-default select-none shadow-sm inline-block transition-transform hover:scale-105"
              >
                {t}
              </span>
              {i < WISPR_TIMELINE.length - 1 && <span className="text-[#33ff33]/60">→</span>}
            </span>
          ))}
        </div>

        <p className="text-[14px] sm:text-lg text-[#9fb0c3] max-w-2xl mx-auto leading-relaxed">
          Years of translating human intent into machine syntax: QBasic, C++, Java, Python, JavaScript, AI. And then voice
          input grew up. The question my childhood self asked a beige laptop is the question Wispr Flow answers every time I
          speak to this screen. That is not corporate flattery — it is the reason this submission is an experience instead of
          a PDF.
        </p>

        <div className="mt-10 inline-block animate-float-gentle">
          <button
            onClick={onOpenVoice}
            data-testid="built-by-speaking-button"
            className="bevel hard-shadow px-5 py-4 group text-left inline-flex items-center gap-4 max-w-full cursor-pointer transition-transform hover:scale-[1.02]"
          >
            <Mic size={22} className="text-[var(--accent-color,#0055ea)] shrink-0" />
            <span className="min-w-0">
              <span className="font-vt text-[18px] sm:text-[20px] text-[var(--accent-color,#0055ea)] block group-hover:opacity-80">
                THIS SITE WAS BUILT BY SPEAKING
              </span>
              <span className="font-vt text-[14px] sm:text-[15px] opacity-85 text-inherit block">
                THOUGHT → VOICE → PROMPT → BUILD → REFINEMENT → SHIP. Click to open the loop.
              </span>
            </span>
          </button>
        </div>
      </motion.div>
    </section>
  );
};

const StillFiguringOut = () => {
  const ref = useRef(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const floatY = useTransform(p, [0, 1], [25, -25]);

  return (
    <section ref={ref} id="still-figuring-out" className="relative py-20 sm:py-24 px-5" data-testid="still-figuring-out">
      <motion.div style={{ y: floatY }} className="max-w-3xl mx-auto will-change-transform">
        <div className="bevel hard-shadow">
          <div className="titlebar px-2 py-1.5 font-vt text-[16px]">THINGS_I_AM_STILL_FIGURING_OUT.TXT</div>
          <div className="bg-[var(--window-bg,#ece8dc)] text-[var(--window-text,#1a1a1a)] p-5 transition-colors">
            <p className="text-[13px] sm:text-[14px] opacity-85 mb-4">
              Not a weakness list. A roadmap. Active learning areas, because pretending to know everything is the slowest way
              to learn anything.
            </p>
            <div className="flex flex-col gap-3">
              {STILL_FIGURING.map((s, idx) => (
                <div
                  key={s.area}
                  style={{ animationDelay: `${idx * 0.3}s` }}
                  className="bevel-in px-3 py-2.5 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 transition-transform hover:translate-x-1"
                >
                  <span className="font-vt text-[17px] text-[var(--accent-color,#0055ea)] sm:w-52 shrink-0">{s.area}</span>
                  <span className="font-vt text-[12px] tracking-widest text-[#b45309] border border-[#b45309]/40 px-2 py-0.5 shrink-0 self-start">
                    ACTIVELY LEARNING
                  </span>
                  <span className="text-[13px] opacity-85 text-inherit">{s.note}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

const StoryFooter = () => (
  <footer id="story-footer" className="relative border-t border-[#33ff33]/20 py-12 px-5 text-center" data-testid="story-footer">
    <div className="font-vt text-[22px] text-[#33ff33] phos inline-block animate-float-gentle">
      YUG.EXE v1.0
    </div>
    <p className="text-[13px] sm:text-[14px] text-[#9fb0c3] mt-2 max-w-md mx-auto">
      Yug Pathak — 3rd-year B.Tech CSE. Aspiring Software Developer. Built by speaking, refined by breaking.
    </p>
    <p className="font-vt text-[15px] text-[#33ff33]/50 mt-4">No fake numbers were harmed in the making of this site.</p>
  </footer>
);


const FieldProofSection = ({ onOpenGallery }) => {
  const ref = useRef(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const floatSection = useTransform(p, [0, 1], [30, -30]);

  return (
    <section ref={ref} id="story-field-archives" className="relative py-20 sm:py-28 px-5 border-y border-[#33ff33]/20 bg-[#090b10]" data-testid="story-field-archives">
      <motion.div style={{ y: floatSection }} className="max-w-6xl mx-auto will-change-transform">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <div className="font-vt text-[15px] sm:text-[17px] tracking-[0.3em] text-[#33ff33] phos mb-2">
              REAL-WORLD PROOF OF WORK
            </div>
            <h2 className="font-vt text-3xl sm:text-5xl text-white">
              SPOTTED IN THE WILD.
            </h2>
            <p className="text-sm text-[#9fb0c3] max-w-xl mt-2">
              Not just commits in a git log. Real stages, 72-hour hackathons, community auditoriums, and winning podiums.
            </p>
          </div>
          <button
            onClick={onOpenGallery}
            className="bevel-btn font-vt text-base px-4 py-2 text-inherit flex items-center gap-2 cursor-pointer transition-transform hover:scale-105"
          >
            OPEN FULL FIELD ARCHIVES ({FIELD_ARCHIVES.length} RECORDS) ↗
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FIELD_ARCHIVES.slice(0, 4).map((item) => (
            <div
              key={item.id}
              onClick={onOpenGallery}
              className="bevel-dark bg-[#12141c] border border-[#33ff33]/30 overflow-hidden cursor-pointer group transition-transform hover:-translate-y-1.5"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-black/40">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-2 left-2 bg-[#0c0d12]/90 border border-[#33ff33]/40 font-vt text-xs text-[#33ff33] px-2 py-0.5">
                  {item.date}
                </div>
              </div>
              <div className="p-4">
                <div className="font-vt text-xs tracking-wider text-[#ffb000] border border-[#ffb000]/40 bg-[#ffb000]/10 px-2 py-0.5 inline-block mb-2">
                  {item.badge}
                </div>
                <h3 className="font-vt text-2xl text-white group-hover:text-[#33ff33] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-[#9fb0c3] mt-2 line-clamp-2 leading-relaxed">
                  {item.story}
                </p>
                <div className="mt-4 pt-2.5 border-t border-white/10 font-vt text-xs text-[#33ff33] flex items-center justify-between">
                  <span>{item.stats}</span>
                  <span className="text-[#ffb000]">VIEW PROOF ↗</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

const StoryMode = ({ onOpenVoice }) => {
  const [memory, setMemory] = useState(null);
  const [galleryModalOpen, setGalleryModalOpen] = useState(false);
  const rail = ["hero", ...CHAPTERS.map((c) => c.id), "wispr"];

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="relative bg-[#07090c] min-h-screen" data-testid="window-story-mode">
      <div className="absolute inset-0 pointer-events-none grid-floor opacity-60" />
      <FloatingStoryBackground />

      <nav className="fixed right-3 top-1/2 -translate-y-1/2 z-[70] hidden lg:flex flex-col gap-1.5" aria-label="chapters">
        {rail.map((id, i) => (
          <button
            key={id}
            onClick={() => scrollTo(id === "hero" ? "story-hero" : id)}
            className="w-7 h-6 font-vt text-[13px] text-[#33ff33]/50 hover:text-[#ffb000] cursor-pointer"
            title={id}
            data-testid={`story-rail-${id}`}
          >
            {String(i).padStart(2, "0")}
          </button>
        ))}
      </nav>

      <div className="relative" style={{ perspective: "1100px" }}>
        <Hero />
        {CHAPTERS.map((ch) => (
          <ChapterScene key={ch.id} ch={ch} onOpenObject={setMemory} />
        ))}
        <MarqueeBand />
        <FieldProofSection onOpenGallery={() => setGalleryModalOpen(true)} />
        <WisprReveal onOpenVoice={onOpenVoice} />
        <StillFiguringOut />
        <StoryFooter />
      </div>
      <CRTOverlay />
      <MemoryWindow obj={memory} onClose={() => setMemory(null)} />
      <FieldGalleryModal
        open={galleryModalOpen}
        onClose={() => setGalleryModalOpen(false)}
      />
    </div>
  );
};

export default StoryMode;
