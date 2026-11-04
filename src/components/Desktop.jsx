import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  BookOpen,
  FileText,
  FlaskConical,
  Laptop,
  Palette,
  Gamepad2,
  Terminal,
  Blocks,
  Code2,
  Cpu,
  Banknote,
  Timer,
  Users,
  Briefcase,
  ShieldAlert,
  Eye,
  Bot,
  User,
  Sliders,
} from "lucide-react";
import { MEMORY_OBJECTS, MODES } from "@/data/content";
import { BevelBtn, Win98Window } from "./Win98";
import MemoryWindow from "./MemoryWindow";
import { OSWallpaper } from "./OSWallpapers";
import {
  OSComputerIcon,
  OSTerminalIcon,
  OSStoryIcon,
  OSResumeIcon,
  OSLabIcon,
  OSUserIcon,
  OSSettingsIcon,
  OSInterviewIcon,
  OSGalleryIcon,
  OSMobileIcon,
} from "./OSIcons";
import FieldGalleryModal from "./FieldGalleryModal";
import DesktopContextMenu from "./DesktopContextMenu";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";

const CASUAL = "/assets/casual.png";
const HEADSHOT = "/assets/headshot.png";

const ICONS = {
  MEET: Sparkles,
  STORY: BookOpen,
  RECRUIT: FileText,
  BUILDER: FlaskConical,
  ASK: Bot,
  ABOUT: User,
  laptop: Laptop,
  paint: Palette,
  games: Gamepad2,
  qbasic: Terminal,
  scratch: Blocks,
  cpp: Code2,
  arduino: Cpu,
  aws: Banknote,
  lnmhacks: Timer,
  gdg: Users,
  mittal: Briefcase,
  resilience: ShieldAlert,
  obs: Eye,
};

const DeskIcon = ({ icon: Icon, customIcon: CustomIcon, label, onOpen, testid, selected, onSelect, index = 0 }) => {
  const { theme } = useTheme();

  const getIconContainerClass = () => {
    switch (theme) {
      case "win7":
        return "w-12 h-12 rounded-lg bg-gradient-to-b from-white/20 to-sky-600/30 border border-white/40 shadow-md backdrop-blur-sm flex items-center justify-center text-cyan-200 group-hover:text-white group-hover:from-white/35 group-hover:to-sky-500/50";
      case "win8":
        return "w-12 h-12 rounded-none bg-[#0b7a75] border-0 flex items-center justify-center text-white group-hover:brightness-125 shadow-sm";
      case "win10":
        return "w-12 h-12 rounded-sm bg-white/5 border border-transparent group-hover:border-white/20 group-hover:bg-white/15 flex items-center justify-center text-sky-400 group-hover:text-white";
      case "win11":
        return "w-12 h-12 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md shadow-md flex items-center justify-center text-sky-400 group-hover:text-white group-hover:bg-white/20";
      case "ubuntu":
        return "w-12 h-12 rounded-xl bg-[#2e2e2e]/90 border border-black/40 shadow-sm flex items-center justify-center text-[#e95420] group-hover:brightness-125";
      case "xp":
      default:
        return cn(
          "bevel w-12 h-12 flex items-center justify-center text-[#000080] group-hover:text-black",
          selected ? "pressed" : ""
        );
    }
  };

  const getLabelClass = () => {
    switch (theme) {
      case "win7":
        return "font-sans font-medium text-[12px] leading-tight text-white text-center [text-shadow:0_1px_3px_#000] px-1";
      case "win8":
      case "win10":
        return "font-sans text-[11px] leading-tight text-white text-center [text-shadow:0_1px_2px_#000] px-1";
      case "win11":
        return "font-sans font-medium text-[11px] leading-tight text-white/90 text-center [text-shadow:0_1px_3px_#000] px-1";
      case "ubuntu":
        return "font-sans font-normal text-[11px] leading-tight text-white text-center [text-shadow:0_1px_2px_#000] px-1";
      case "xp":
      default:
        return "font-vt text-[14px] leading-tight text-white text-center [text-shadow:1px_1px_0_#000] px-0.5";
    }
  };

  return (
    <motion.button
      data-testid={testid}
      onClick={() => {
        onSelect();
        onOpen();
      }}
      animate={{ y: [0, -2.5, 0] }}
      transition={{ repeat: Infinity, duration: 3.5 + (index % 4) * 0.6, ease: "easeInOut", delay: (index % 6) * 0.2 }}
      whileHover={{ scale: 1.08, y: -4 }}
      whileTap={{ scale: 0.95 }}
      className="w-[96px] sm:w-[104px] flex flex-col items-center gap-1.5 p-2 group cursor-pointer select-none"
    >
      {CustomIcon ? (
        <span className="transition-all transform group-hover:scale-105">
          <CustomIcon size={44} />
        </span>
      ) : (
        <span className={cn(getIconContainerClass(), "transition-all")}>
          <Icon size={24} />
        </span>
      )}
      <span className={getLabelClass()}>{label}</span>
    </motion.button>
  );
};

const Desktop = ({ goMode, restartBoot, onAskYug, openSettings, openInterview, onOpenMobile }) => {
  const { theme } = useTheme();
  const [chooserOpen, setChooserOpen] = useState(true);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [memory, setMemory] = useState(null);
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0 });

  const systemIcons = useMemo(() => {
    switch (theme) {
      case "ubuntu":
        return [
          { customIcon: OSComputerIcon, label: "Home (Meet Yug)", onOpen: () => setChooserOpen(true), testid: "desktop-icon-meet-yug" },
          { customIcon: OSInterviewIcon, label: "Live Interview", onOpen: openInterview, testid: "desktop-icon-interview" },
          { customIcon: OSTerminalIcon, label: "Terminal", onOpen: onAskYug, testid: "desktop-icon-ask-yug" },
          { customIcon: OSStoryIcon, label: "Interactive Story", onOpen: () => goMode("story"), testid: "desktop-icon-story" },
          { customIcon: OSResumeIcon, label: "Curriculum Vitae", onOpen: () => goMode("recruiter"), testid: "desktop-icon-recruiter" },
          { customIcon: OSLabIcon, label: "Developer Projects", onOpen: () => goMode("builder"), testid: "desktop-icon-builder" },
          { customIcon: OSGalleryIcon, label: "Spotted in Wild", onOpen: () => setGalleryOpen(true), testid: "desktop-icon-gallery" },
          { customIcon: OSGalleryIcon, label: "Field Archives", onOpen: () => setGalleryOpen(true), testid: "desktop-icon-gallery" },
          { customIcon: OSGalleryIcon, label: "Field Proof", onOpen: () => setGalleryOpen(true), testid: "desktop-icon-gallery" },
          { customIcon: OSUserIcon, label: "About Yug", onOpen: () => setAboutOpen(true), testid: "desktop-icon-about" },
          { customIcon: OSSettingsIcon, label: "System Settings", onOpen: openSettings, testid: "desktop-icon-settings" },
        ];
      case "win11":
        return [
          { customIcon: OSComputerIcon, label: "Meet Yug", onOpen: () => setChooserOpen(true), testid: "desktop-icon-meet-yug" },
          { customIcon: OSInterviewIcon, label: "Interview Yug", onOpen: openInterview, testid: "desktop-icon-interview" },
          { customIcon: OSTerminalIcon, label: "Terminal (Ask Yug)", onOpen: onAskYug, testid: "desktop-icon-ask-yug" },
          { customIcon: OSStoryIcon, label: "Story Mode", onOpen: () => goMode("story"), testid: "desktop-icon-story" },
          { customIcon: OSResumeIcon, label: "Recruiter Profile", onOpen: () => goMode("recruiter"), testid: "desktop-icon-recruiter" },
          { customIcon: OSLabIcon, label: "Developer Lab", onOpen: () => goMode("builder"), testid: "desktop-icon-builder" },
          { customIcon: OSUserIcon, label: "About Yug", onOpen: () => setAboutOpen(true), testid: "desktop-icon-about" },
          { customIcon: OSSettingsIcon, label: "Settings", onOpen: openSettings, testid: "desktop-icon-settings" },
        ];
      case "win10":
        return [
          { customIcon: OSComputerIcon, label: "Meet Yug", onOpen: () => setChooserOpen(true), testid: "desktop-icon-meet-yug" },
          { customIcon: OSInterviewIcon, label: "Live Interview", onOpen: openInterview, testid: "desktop-icon-interview" },
          { customIcon: OSTerminalIcon, label: "Ask Yug Terminal", onOpen: onAskYug, testid: "desktop-icon-ask-yug" },
          { customIcon: OSStoryIcon, label: "Interactive Story", onOpen: () => goMode("story"), testid: "desktop-icon-story" },
          { customIcon: OSResumeIcon, label: "Recruiter Summary", onOpen: () => goMode("recruiter"), testid: "desktop-icon-recruiter" },
          { customIcon: OSLabIcon, label: "Engineering Lab", onOpen: () => goMode("builder"), testid: "desktop-icon-builder" },
          { customIcon: OSGalleryIcon, label: "Spotted in Wild", onOpen: () => setGalleryOpen(true), testid: "desktop-icon-gallery" },
          { customIcon: OSUserIcon, label: "About Me", onOpen: () => setAboutOpen(true), testid: "desktop-icon-about" },
          { customIcon: OSSettingsIcon, label: "Settings", onOpen: openSettings, testid: "desktop-icon-settings" },
        ];
      case "win8":
        return [
          { customIcon: OSComputerIcon, label: "MEET YUG", onOpen: () => setChooserOpen(true), testid: "desktop-icon-meet-yug" },
          { customIcon: OSInterviewIcon, label: "INTERVIEW YUG", onOpen: openInterview, testid: "desktop-icon-interview" },
          { customIcon: OSTerminalIcon, label: "ASK YUG", onOpen: onAskYug, testid: "desktop-icon-ask-yug" },
          { customIcon: OSStoryIcon, label: "STORY EXPERIENCE", onOpen: () => goMode("story"), testid: "desktop-icon-story" },
          { customIcon: OSResumeIcon, label: "RECRUITER DOSSIER", onOpen: () => goMode("recruiter"), testid: "desktop-icon-recruiter" },
          { customIcon: OSLabIcon, label: "BUILDER LAB", onOpen: () => goMode("builder"), testid: "desktop-icon-builder" },
          { customIcon: OSGalleryIcon, label: "FIELD PROOF", onOpen: () => setGalleryOpen(true), testid: "desktop-icon-gallery" },
          { customIcon: OSUserIcon, label: "ABOUT YUG", onOpen: () => setAboutOpen(true), testid: "desktop-icon-about" },
          { customIcon: OSSettingsIcon, label: "PC SETTINGS", onOpen: openSettings, testid: "desktop-icon-settings" },
        ];
      case "win7":
        return [
          { customIcon: OSComputerIcon, label: "Meet Yug", onOpen: () => setChooserOpen(true), testid: "desktop-icon-meet-yug" },
          { customIcon: OSInterviewIcon, label: "Live Interview", onOpen: openInterview, testid: "desktop-icon-interview" },
          { customIcon: OSTerminalIcon, label: "Ask Yug (AI)", onOpen: onAskYug, testid: "desktop-icon-ask-yug" },
          { customIcon: OSStoryIcon, label: "Story Mode", onOpen: () => goMode("story"), testid: "desktop-icon-story" },
          { customIcon: OSResumeIcon, label: "Recruiter Overview", onOpen: () => goMode("recruiter"), testid: "desktop-icon-recruiter" },
          { customIcon: OSLabIcon, label: "Engineering Lab", onOpen: () => goMode("builder"), testid: "desktop-icon-builder" },
          { customIcon: OSUserIcon, label: "About Yug", onOpen: () => setAboutOpen(true), testid: "desktop-icon-about" },
          { customIcon: OSSettingsIcon, label: "Control Panel", onOpen: openSettings, testid: "desktop-icon-settings" },
        ];
      case "xp":
      default:
        return [
          { customIcon: OSComputerIcon, label: "MEET_YUG.EXE", onOpen: () => setChooserOpen(true), testid: "desktop-icon-meet-yug" },
          { customIcon: OSInterviewIcon, label: "INTERVIEW_YUG.EXE", onOpen: openInterview, testid: "desktop-icon-interview" },
          { customIcon: OSTerminalIcon, label: "ASK_YUG.EXE", onOpen: onAskYug, testid: "desktop-icon-ask-yug" },
          { customIcon: OSStoryIcon, label: "STORY_MODE.EXE", onOpen: () => goMode("story"), testid: "desktop-icon-story" },
          { customIcon: OSResumeIcon, label: "RECRUITER.TXT", onOpen: () => goMode("recruiter"), testid: "desktop-icon-recruiter" },
          { customIcon: OSLabIcon, label: "BUILDER_LAB.EXE", onOpen: () => goMode("builder"), testid: "desktop-icon-builder" },
          { customIcon: OSGalleryIcon, label: "FIELD_PROOF.EXE", onOpen: () => setGalleryOpen(true), testid: "desktop-icon-gallery" },
          { customIcon: OSMobileIcon, label: "MOBILE_APP.EXE", onOpen: onOpenMobile, testid: "desktop-icon-mobile" },
          { customIcon: OSUserIcon, label: "ABOUT_YUG.TXT", onOpen: () => setAboutOpen(true), testid: "desktop-icon-about" },
          { customIcon: OSSettingsIcon, label: "CONTROL_PANEL.CPL", onOpen: openSettings, testid: "desktop-icon-settings" },
        ];
    }
  }, [theme, goMode, onAskYug, openSettings, openInterview]);

  return (
    <div
      onContextMenu={(e) => {
        e.preventDefault();
        setContextMenu({ visible: true, x: e.clientX, y: e.clientY });
      }}
      className="fixed inset-0 overflow-hidden bg-[var(--desk)]"
    >
      {/* Authentic OS Wallpaper */}
      <OSWallpaper />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/50 pointer-events-none" />

      {/* About Yug Window */}
      <AnimatePresence>
        {aboutOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-20 flex items-center justify-center p-4 pb-20 sm:pb-24 pointer-events-none"
          >
            <Win98Window
              testid="about-window"
              title="ABOUT_YUG.TXT — THE HUMAN BEHIND THE MACHINE"
              icon={User}
              onClose={() => setAboutOpen(false)}
              className="pointer-events-auto w-full max-w-4xl max-h-[80vh] flex flex-col shadow-2xl"
            >
              <div className="p-5 sm:p-6 bg-[#0f111a] text-[#f1f5f9] transition-colors overflow-y-auto flex-1 min-h-0 border-t border-white/10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  {/* Photo Column with cyber-border and badge */}
                  <div className="md:col-span-5 space-y-3">
                    <div className="relative group rounded-xl overflow-hidden border-2 border-emerald-500/40 shadow-xl bg-black/60">
                      <img
                        src={CASUAL}
                        alt="Yug Pathak"
                        loading="lazy"
                        className="w-full h-52 sm:h-60 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-black/80 backdrop-blur-md border border-emerald-400/50 text-[10px] font-mono text-emerald-400 font-bold flex items-center gap-1.5 shadow">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        BUILDING REAL SYSTEMS
                      </div>
                      <div className="absolute bottom-0 inset-x-0 p-2.5 bg-gradient-to-t from-black/95 via-black/70 to-transparent flex items-center justify-between text-[11px] font-mono text-white/90">
                        <span>POORNIMA UNIV · JAIPUR</span>
                        <span className="text-emerald-400 font-bold">8.88 CGPA</span>
                      </div>
                    </div>

                    {/* Quick Metric Pills */}
                    <div className="grid grid-cols-2 gap-2 text-center font-mono">
                      <div className="p-2 rounded-lg bg-[#161a29] border border-white/10">
                        <div className="text-base font-bold text-amber-400">FINALIST</div>
                        <div className="text-[10px] text-white/60">SAP HackFest Finalist</div>
                      </div>
                      <div className="p-2 rounded-lg bg-[#161a29] border border-white/10">
                        <div className="text-base font-bold text-sky-400">2,300+</div>
                        <div className="text-[10px] text-white/60">GDG Campus Lead</div>
                      </div>
                    </div>
                  </div>

                  {/* Narrative & Details Column */}
                  <div className="md:col-span-7 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <h2 className="font-vt text-3xl sm:text-4xl font-bold text-white tracking-wide leading-none">
                          Yug Pathak
                        </h2>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 font-mono text-[11px] font-semibold">
                          Open for SDE Roles & Internships
                        </span>
                      </div>
                      <div className="font-mono text-xs sm:text-[13px] text-sky-400 font-medium">
                        3rd-Year B.Tech CSE · Core Language: C++ · DevOps & Full-Stack AI
                      </div>
                    </div>

                    <p className="text-[13px] sm:text-[14px] leading-relaxed text-slate-300 font-sans">
                      Driven by curiosity, practical problem-solving, and building technology with measurable real-world impact.
                      From winning <strong>National Finalist at SAP HackFest 2026</strong> for LinqChain (Resilience OS) to scaling Google Developer Groups on Campus to over <strong>2,300+ members</strong> across 15+ events, I focus on systems that run in production under pressure.
                    </p>

                    {/* Highlight Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {["C++ (DSA)", "FastAPI", "React", "Docker", "Kubernetes", "Jenkins", "AWS", "SAP HANA", "Wispr Flow"].map((t) => (
                        <span key={t} className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-white/80 font-mono text-[11px]">
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Verified Connect Bar */}
                    <div className="p-3 rounded-xl bg-[#141824] border border-white/10 flex flex-wrap items-center justify-between gap-2">
                      <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        <span>yugpathak2005@gmail.com</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <a
                          href="https://github.com/Yug210705"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-medium transition-colors"
                        >
                          GitHub ↗
                        </a>
                        <a
                          href="https://www.linkedin.com/in/yug-pathak-94b7b225b"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 rounded-md bg-sky-600/80 hover:bg-sky-500 text-white text-xs font-mono font-medium transition-colors"
                        >
                          LinkedIn ↗
                        </a>
                        <a
                          href="/assets/resume.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 rounded-md bg-emerald-600/80 hover:bg-emerald-500 text-white text-xs font-mono font-medium transition-colors"
                        >
                          Resume ↗
                        </a>
                      </div>
                    </div>

                    {/* High-Impact CTA */}
                    <button
                      testid="about-open-terminal"
                      onClick={() => {
                        setAboutOpen(false);
                        onAskYug();
                      }}
                      className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 hover:brightness-110 text-white font-mono text-xs sm:text-sm font-bold tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50 cursor-pointer active:scale-98 transition-all"
                    >
                      <span>⚡ RUN ASK_YUG.EXE — Interrogate the AI Agent directly</span>
                      <span>↵</span>
                    </button>
                  </div>
                </div>
              </div>
            </Win98Window>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Icons - Layout adjusted for Ubuntu top panel & left dock */}
      <div
        className={cn(
          "absolute flex flex-row flex-wrap gap-1 justify-center sm:justify-start sm:flex-col sm:flex-wrap sm:max-h-[calc(100%-120px)] content-start transition-all z-10",
          theme === "ubuntu"
            ? "top-10 left-16 right-2 sm:right-auto"
            : "top-3 left-2 right-2 sm:right-auto"
        )}
      >
        {systemIcons.map((ic, i) => (
          <DeskIcon
            key={ic.label}
            icon={ic.icon ? ICONS[ic.icon] : undefined}
            customIcon={ic.customIcon}
            label={ic.label}
            onOpen={ic.onOpen}
            testid={ic.testid}
            selected={selected === ic.testid}
            onSelect={() => setSelected(ic.testid)}
            index={i}
          />
        ))}
        <div className="w-[104px] border-t border-white/20 my-1 hidden sm:block" />
        {MEMORY_OBJECTS.map((obj, i) => (
          <DeskIcon
            key={obj.id}
            icon={ICONS[obj.id] || Sparkles}
            label={obj.name}
            onOpen={() => setMemory(obj)}
            testid={`memory-object-${obj.id}`}
            selected={selected === obj.id}
            onSelect={() => setSelected(obj.id)}
            index={i + 6}
          />
        ))}
      </div>

      {/* Mode Selector Window (MEET_YUG.EXE) */}
      <AnimatePresence>
        {chooserOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="absolute inset-0 flex items-center justify-center p-4 pb-20 sm:pb-24 pointer-events-none z-20"
          >
            <Win98Window
              testid="mode-selector-window"
              title="MEET_YUG.EXE — HOW DO YOU WANT TO MEET YUG?"
              onClose={() => setChooserOpen(false)}
              className="pointer-events-auto w-full max-w-3xl lg:max-w-4xl max-h-[78vh] flex flex-col shadow-2xl"
            >
              <div className="p-4 sm:p-6 bg-[var(--window-bg,#ece8dc)] text-[var(--window-text,#1a1a1a)] transition-colors overflow-y-auto flex-1 min-h-0">
                <div className="font-vt text-lg sm:text-xl font-bold mb-1">This is Yug Pathak. This is not just a resume.</div>
                <div className="font-vt text-[14px] sm:text-[15px] opacity-85 text-[var(--window-subtext,inherit)] mb-4">
                  Pick your route — the machine rearranges its entire interface around how you evaluate engineers.
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {MODES.map((m) => {
                    const isCurious = m.id === "curious";
                    return (
                      <motion.button
                        key={m.id}
                        data-testid={`mode-selector-${m.id}`}
                        onClick={() => {
                          setChooserOpen(false);
                          if (m.id === "interview") {
                            openInterview();
                          } else {
                            goMode(isCurious ? "story" : m.id);
                          }
                        }}
                        animate={isCurious ? { y: [0, -3, 0] } : {}}
                        transition={isCurious ? { repeat: Infinity, duration: 3.2, ease: "easeInOut" } : {}}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className={`bevel-btn text-left p-3.5 sm:p-4 group relative overflow-hidden cursor-pointer flex flex-col justify-between ${
                          isCurious ? "border-l-4 border-l-[var(--accent-color,#000080)] shadow-md" : ""
                        }`}
                      >
                        <div>
                          {isCurious && (
                            <motion.span
                              animate={{ opacity: [0.75, 1, 0.75], scale: [0.98, 1.02, 0.98] }}
                              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                              className="absolute top-2.5 right-2.5 font-vt text-[11px] text-[var(--accent-color,#000080)] bg-[#33ff33]/25 border border-[var(--accent-color,#000080)]/30 px-1.5 py-0.5 tracking-wider hidden sm:inline-block"
                            >
                              ✦ INTERACTIVE STORY
                            </motion.span>
                          )}
                          <div className="font-vt text-lg sm:text-[20px] text-[var(--accent-color,#000080)] group-hover:opacity-100 flex items-center gap-1.5">
                            <span>{m.label}</span>
                            <span className="opacity-70 text-inherit text-sm">→ {m.sub}</span>
                          </div>
                          <div className="text-[13px] opacity-85 text-inherit mt-1.5 leading-snug">{m.desc}</div>
                        </div>
                        <div className="mt-3 pt-2 border-t border-black/10 dark:border-white/10 font-vt text-[12px] opacity-60 flex items-center justify-between">
                          <span>LAUNCH WORKSPACE</span>
                          <span>ENTER ↵</span>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
                <div className="mt-4 bevel-in px-3 py-2 font-vt text-[13px] sm:text-[14px] opacity-90 flex items-center justify-between">
                  <span>TIP: The desktop icons open the raw archival dossiers with real photos and evidence.</span>
                  <span className="hidden sm:inline-block font-mono text-[11px] opacity-70">ESC to close</span>
                </div>
              </div>
            </Win98Window>
          </motion.div>
        )}
      </AnimatePresence>

      <MemoryWindow obj={memory} onClose={() => setMemory(null)} />

      <FieldGalleryModal
        open={galleryOpen}
        onClose={() => setGalleryOpen(false)}
        onOpenStory={() => goMode("story")}
      />

      <DesktopContextMenu
        visible={contextMenu.visible}
        x={contextMenu.x}
        y={contextMenu.y}
        onClose={() => setContextMenu({ visible: false, x: 0, y: 0 })}
        onOpenSettings={openSettings}
        onOpenTerminal={onAskYug}
        onOpenInterview={openInterview}
        onRefresh={() => setSelected(null)}
      />
    </div>
  );
};

export default Desktop;
