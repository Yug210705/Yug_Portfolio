import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Power,
  Palette,
  Search,
  Wifi,
  Volume2,
  Bell,
  Sparkles,
  BookOpen,
  FileText,
  FlaskConical,
  Bot,
  RotateCcw,
  Sliders,
  User,
  Grid,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context/ThemeContext";
import {
  OSComputerIcon,
  OSTerminalIcon,
  OSStoryIcon,
  OSResumeIcon,
  OSLabIcon,
  OSSettingsIcon,
  OSInterviewIcon,
} from "./OSIcons";

const THEME_OPTIONS = [
  { id: "xp", label: "Windows XP (Luna)", desc: "Classic Bliss & Luna Blue", dot: "#245edb" },
  { id: "win7", label: "Windows 7 (Aero)", desc: "Frosted Glass & Start Orb", dot: "#2b8ac9" },
  { id: "win8", label: "Windows 8 (Metro)", desc: "Flat Modern & Live Tiles", dot: "#0b7a75" },
  { id: "win10", label: "Windows 10 (Fluent)", desc: "Dark Acrylic & Search Bar", dot: "#0078d7" },
  { id: "win11", label: "Windows 11 (Centered)", desc: "Centered Mica & Modern Rounded", dot: "#0067b8" },
  { id: "ubuntu", label: "Ubuntu 24.04 (Yaru)", desc: "Aubergine & Left Dock", dot: "#e95420" },
];

const Taskbar = ({
  phase,
  goMode,
  openChooser,
  restartBoot,
  askYug,
  voiceOpen,
  setVoiceOpen,
  openSettings,
  openInterview,
  interviewOpen,
}) => {
  const { theme, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [themesOpen, setThemesOpen] = useState(false);
  const [shutdown, setShutdown] = useState(false);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const i = setInterval(() => setNow(new Date()), 20000);
    return () => clearInterval(i);
  }, []);

  const time = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  const dateStr = now.toLocaleDateString("en-US", { month: "short", day: "numeric" });

  const activeApp = interviewOpen
    ? "INTERVIEW"
    : phase === "desktop"
    ? "DESKTOP"
    : phase === "story"
    ? "STORY_MODE"
    : phase === "recruiter"
    ? "RECRUITER.TXT"
    : "BUILDER_LAB";

  const appButtons = [
    {
      id: "desktop",
      label:
        theme === "ubuntu"
          ? "Files"
          : theme === "win8"
          ? "MEET YUG"
          : theme === "xp"
          ? "MEET_YUG"
          : "Meet Yug",
      icon: OSComputerIcon,
      onClick: openChooser,
    },
    {
      id: "interview",
      label:
        theme === "ubuntu"
          ? "Interview"
          : theme === "win8"
          ? "INTERVIEW"
          : theme === "xp"
          ? "INTERVIEW.EXE"
          : "Live Interview",
      icon: OSInterviewIcon,
      onClick: openInterview,
    },
    {
      id: "story",
      label:
        theme === "ubuntu"
          ? "Story"
          : theme === "win8"
          ? "STORY"
          : theme === "xp"
          ? "STORY"
          : "Story Mode",
      icon: OSStoryIcon,
      onClick: () => goMode("story"),
    },
    {
      id: "recruiter",
      label:
        theme === "ubuntu"
          ? "CV"
          : theme === "win8"
          ? "RECRUITER"
          : theme === "xp"
          ? "RECRUITER"
          : "Recruiter",
      icon: OSResumeIcon,
      onClick: () => goMode("recruiter"),
    },
    {
      id: "builder",
      label:
        theme === "ubuntu"
          ? "Projects"
          : theme === "win8"
          ? "BUILDER LAB"
          : theme === "xp"
          ? "BUILDER_LAB"
          : "Developer Lab",
      icon: OSLabIcon,
      onClick: () => goMode("builder"),
    },
    {
      id: "ask",
      label:
        theme === "ubuntu"
          ? "Terminal"
          : theme === "win8"
          ? "ASK YUG"
          : theme === "xp"
          ? "ASK_YUG.EXE"
          : "Terminal AI",
      icon: OSTerminalIcon,
      onClick: askYug,
    },
  ];

  /* ------------------- OS SPECIFIC START BUTTONS ------------------- */
  const renderStartButton = () => {
    if (theme === "win11") {
      return (
        <button
          data-testid="desktop-start-menu-button"
          onClick={() => setMenuOpen((m) => !m)}
          title="Start"
          className={cn(
            "w-10 h-10 rounded-lg flex items-center justify-center hover:bg-white/10 active:scale-95 transition-all cursor-pointer",
            menuOpen && "bg-white/15"
          )}
        >
          {/* Windows 11 Blue 4-Square Logo */}
          <div className="grid grid-cols-2 gap-[2.5px] w-5 h-5">
            <div className="bg-[#00a4ef] rounded-[1px]" />
            <div className="bg-[#00a4ef] rounded-[1px]" />
            <div className="bg-[#00a4ef] rounded-[1px]" />
            <div className="bg-[#00a4ef] rounded-[1px]" />
          </div>
        </button>
      );
    }

    if (theme === "win10") {
      return (
        <button
          data-testid="desktop-start-menu-button"
          onClick={() => setMenuOpen((m) => !m)}
          title="Start"
          className={cn(
            "w-12 h-full flex items-center justify-center hover:bg-white/10 active:bg-white/20 transition-colors cursor-pointer",
            menuOpen && "bg-white/15"
          )}
        >
          {/* Windows 10 Flat Logo */}
          <div className="grid grid-cols-2 gap-[2px] w-4 h-4 text-white hover:text-[#0078d7]">
            <div className="bg-current" />
            <div className="bg-current" />
            <div className="bg-current" />
            <div className="bg-current" />
          </div>
        </button>
      );
    }

    if (theme === "win8") {
      return (
        <button
          data-testid="desktop-start-menu-button"
          onClick={() => setMenuOpen((m) => !m)}
          title="Start"
          className={cn(
            "px-4 h-full flex items-center justify-center hover:bg-[#0b7a75] transition-colors cursor-pointer",
            menuOpen && "bg-[#0b7a75]"
          )}
        >
          {/* Windows 8 Angled Logo */}
          <div className="grid grid-cols-2 gap-[2px] w-4 h-4 -skew-y-3">
            <div className="bg-white" />
            <div className="bg-white" />
            <div className="bg-white" />
            <div className="bg-white" />
          </div>
        </button>
      );
    }

    if (theme === "win7") {
      return (
        <button
          data-testid="desktop-start-menu-button"
          onClick={() => setMenuOpen((m) => !m)}
          title="Start"
          className="relative w-11 h-11 rounded-full bg-gradient-to-b from-[#3587c6] to-[#0c3966] shadow-[0_0_12px_rgba(40,150,255,0.7),inset_0_1px_1px_rgba(255,255,255,0.8)] border border-cyan-300/60 flex items-center justify-center -translate-y-1 hover:scale-105 active:scale-95 transition-all cursor-pointer z-10 shrink-0"
        >
          {/* Windows 7 Glowing 4-Color Orb */}
          <div className="grid grid-cols-2 gap-[2px] w-5 h-5 -rotate-12">
            <div className="rounded-tl-[3px] bg-gradient-to-br from-[#ff5252] to-[#d50000] shadow-[0_0_4px_#ff5252]" />
            <div className="rounded-tr-[3px] bg-gradient-to-br from-[#40c4ff] to-[#0091ea] shadow-[0_0_4px_#40c4ff]" />
            <div className="rounded-bl-[3px] bg-gradient-to-br from-[#76ff03] to-[#64dd17] shadow-[0_0_4px_#76ff03]" />
            <div className="rounded-br-[3px] bg-gradient-to-br from-[#ffd600] to-[#ffab00] shadow-[0_0_4px_#ffd600]" />
          </div>
        </button>
      );
    }

    if (theme === "ubuntu") {
      return (
        <button
          data-testid="desktop-start-menu-button"
          onClick={() => setMenuOpen((m) => !m)}
          title="Applications"
          className="w-10 h-10 rounded-full bg-[#e95420] hover:brightness-110 flex items-center justify-center text-white shadow-md cursor-pointer transition-all active:scale-95 shrink-0"
        >
          <Grid size={18} />
        </button>
      );
    }

    // Default: Windows XP Luna Green Start Button
    return (
      <button
        data-testid="desktop-start-menu-button"
        onClick={() => setMenuOpen((m) => !m)}
        className={cn(
          "h-full px-4 rounded-r-2xl bg-gradient-to-b from-[#388e3c] via-[#4caf50] to-[#1b5e20] shadow-[inset_1px_1px_0_#a5d6a7,inset_-1px_-1px_0_#1b5e20] flex items-center gap-2 text-white hover:brightness-110 active:brightness-90 transition-all cursor-pointer select-none",
          menuOpen && "brightness-90 shadow-inner"
        )}
      >
        <div className="grid grid-cols-2 gap-[1.5px] w-4 h-4 -rotate-12">
          <div className="bg-[#ff5252] rounded-[1px]" />
          <div className="bg-[#40c4ff] rounded-[1px]" />
          <div className="bg-[#76ff03] rounded-[1px]" />
          <div className="bg-[#ffd600] rounded-[1px]" />
        </div>
        <span className="font-sans italic font-black text-[17px] tracking-normal leading-none [text-shadow:1px_1px_1px_#000]">
          start
        </span>
      </button>
    );
  };

  /* ------------------- OS SPECIFIC START MENU ------------------- */
  const renderStartMenu = () => (
    <AnimatePresence>
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.98 }}
          transition={{ duration: 0.15 }}
          className={cn(
            "fixed z-[100] overflow-hidden select-none",
            theme === "win11"
              ? "bottom-[58px] left-1/2 -translate-x-1/2 w-[520px] max-w-[92vw] rounded-2xl bg-[#1f2233]/90 backdrop-blur-2xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.85)] p-5 text-white"
              : theme === "win10"
              ? "bottom-[42px] left-0 w-[420px] max-w-[95vw] bg-[#1a1a1a]/95 backdrop-blur-xl border border-white/15 shadow-2xl flex"
              : theme === "win8"
              ? "bottom-[42px] left-0 w-[460px] max-w-[95vw] bg-[#0c1824]/95 border-2 border-[#0b7a75] p-4 text-white"
              : theme === "win7"
              ? "bottom-[44px] left-2 w-[400px] max-w-[95vw] rounded-t-xl bg-[#122e4d]/85 backdrop-blur-2xl border border-white/40 shadow-[0_12px_40px_rgba(0,0,0,0.8)] p-3"
              : theme === "ubuntu"
              ? "top-[32px] left-[62px] w-[440px] max-w-[90vw] rounded-xl bg-[#242424]/95 backdrop-blur-2xl border border-white/15 shadow-2xl p-5 text-white"
              : "bottom-[40px] left-1 w-72 rounded-t-lg border-2 border-[#0055ea] bg-[#ece9d8] shadow-[0_10px_35px_rgba(0,0,0,0.7)]"
          )}
          data-testid="start-menu"
        >
          {/* Windows 11 Start Menu */}
          {theme === "win11" && (
            <div className="flex flex-col gap-4">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
                <input
                  type="text"
                  placeholder="Type to search apps, stories, projects..."
                  className="w-full bg-white/10 rounded-full pl-9 pr-4 py-2 text-sm text-white placeholder-white/40 outline-none border border-white/10 focus:border-sky-400"
                />
              </div>

              <div>
                <div className="text-xs font-semibold text-white/60 mb-2 uppercase tracking-wider">Pinned Experiences</div>
                <div className="grid grid-cols-3 gap-2">
                  {appButtons.map((app) => (
                    <button
                      key={app.id}
                      onClick={() => {
                        setMenuOpen(false);
                        app.onClick();
                      }}
                      className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-white/10 transition-colors cursor-pointer text-center"
                    >
                      <app.icon size={26} className="text-sky-400" />
                      <span className="font-sans text-xs text-white/90 font-medium">{app.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-white/10 pt-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-sky-500/20 border border-sky-400/40 flex items-center justify-center font-bold text-sky-300 text-xs">
                    YP
                  </div>
                  <span className="text-xs font-medium">Yug Pathak</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      openSettings();
                    }}
                    title="Settings"
                    className="p-2 rounded-lg hover:bg-white/10 text-white/70 hover:text-white cursor-pointer"
                  >
                    <Sliders size={15} />
                  </button>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      restartBoot();
                    }}
                    title="Restart"
                    className="p-2 rounded-lg hover:bg-white/10 text-white/70 hover:text-white cursor-pointer"
                  >
                    <RotateCcw size={15} />
                  </button>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      setShutdown(true);
                    }}
                    title="Shut Down"
                    className="p-2 rounded-lg hover:bg-red-500/20 text-white/70 hover:text-red-400 cursor-pointer"
                  >
                    <Power size={15} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Windows 10 Start Menu */}
          {theme === "win10" && (
            <div className="flex w-full">
              {/* Left slim strip */}
              <div className="w-12 bg-black/40 flex flex-col justify-between py-3 items-center border-r border-white/10">
                <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold text-white">
                  YP
                </div>
                <div className="flex flex-col gap-2.5">
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      openSettings();
                    }}
                    title="Settings"
                    className="p-2 hover:bg-white/15 text-white/80 cursor-pointer"
                  >
                    <Sliders size={16} />
                  </button>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      restartBoot();
                    }}
                    title="Restart"
                    className="p-2 hover:bg-white/15 text-white/80 cursor-pointer"
                  >
                    <RotateCcw size={16} />
                  </button>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      setShutdown(true);
                    }}
                    title="Power"
                    className="p-2 hover:bg-white/15 text-white/80 cursor-pointer"
                  >
                    <Power size={16} />
                  </button>
                </div>
              </div>

              {/* Right Tiles Grid */}
              <div className="flex-1 p-4">
                <div className="text-xs text-[#0078d7] font-semibold mb-3 tracking-wider">YUG.EXE APPS & TILES</div>
                <div className="grid grid-cols-2 gap-2">
                  {appButtons.map((app) => (
                    <button
                      key={app.id}
                      onClick={() => {
                        setMenuOpen(false);
                        app.onClick();
                      }}
                      className="p-3 bg-[#0078d7]/20 border border-[#0078d7]/40 hover:bg-[#0078d7]/35 text-left transition-colors cursor-pointer flex flex-col gap-2"
                    >
                      <app.icon size={20} className="text-[#00a4ef]" />
                      <span className="font-sans text-xs text-white font-medium">{app.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Windows 8 Metro Start Screen / Live Tiles */}
          {theme === "win8" && (
            <div>
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#0b7a75]/50">
                <div className="font-sans font-light text-2xl tracking-wider text-white uppercase">
                  Start
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-white/70 font-sans">Yug Pathak</span>
                  <div className="w-7 h-7 bg-[#0b7a75] flex items-center justify-center text-xs font-bold text-white shadow">
                    YP
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-[#0b7a75] font-bold uppercase tracking-widest mb-2 font-sans">
                Metro Tiles & Experiences
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {appButtons.map((app, idx) => {
                  const tileColors = [
                    "bg-[#0078d7] hover:bg-[#0063b1]",
                    "bg-[#0b7a75] hover:bg-[#12948e]",
                    "bg-[#d83b01] hover:bg-[#ea4a1f]",
                    "bg-[#5c2d91] hover:bg-[#6c39a3]",
                    "bg-[#107c41] hover:bg-[#168e4c]",
                  ];
                  const tileColor = tileColors[idx % tileColors.length];
                  return (
                    <button
                      key={app.id}
                      onClick={() => {
                        setMenuOpen(false);
                        app.onClick();
                      }}
                      className={cn(
                        "h-20 p-2.5 text-left transition-all cursor-pointer flex flex-col justify-between text-white shadow-md relative overflow-hidden",
                        tileColor
                      )}
                    >
                      <app.icon size={22} className="text-white" />
                      <div className="font-sans font-semibold text-[11px] tracking-wide uppercase truncate">
                        {app.label}
                      </div>
                    </button>
                  );
                })}
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    openSettings();
                  }}
                  className="h-20 p-2.5 text-left transition-all cursor-pointer flex flex-col justify-between text-white shadow-md relative overflow-hidden bg-[#008272] hover:bg-[#009b88]"
                >
                  <OSSettingsIcon size={22} className="text-white" />
                  <div className="font-sans font-semibold text-[11px] tracking-wide uppercase truncate">
                    PC SETTINGS
                  </div>
                </button>
              </div>

              <div className="border-t border-[#0b7a75]/40 mt-4 pt-3 flex items-center justify-between">
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    restartBoot();
                  }}
                  className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-xs font-sans uppercase flex items-center gap-1.5 cursor-pointer text-white"
                >
                  <RotateCcw size={13} /> Restart
                </button>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    setShutdown(true);
                  }}
                  className="px-3 py-1.5 bg-[#d83b01] hover:bg-[#ea4a1f] text-xs font-sans uppercase flex items-center gap-1.5 cursor-pointer text-white"
                >
                  <Power size={13} /> Turn Off
                </button>
              </div>
            </div>
          )}

          {/* Windows 7 Iconic 2-Column Aero Glass Start Menu */}
          {theme === "win7" && (
            <div className="flex flex-col">
              <div className="flex rounded-lg overflow-hidden border border-white/40 shadow-inner">
                {/* Left Column: Programs list */}
                <div className="w-[58%] bg-white p-2 flex flex-col gap-1">
                  {appButtons.map((app) => (
                    <button
                      key={app.id}
                      onClick={() => {
                        setMenuOpen(false);
                        app.onClick();
                      }}
                      className="flex items-center gap-2.5 px-2.5 py-1.5 rounded hover:bg-[#d9ecff] hover:border hover:border-[#7da2ce] text-left transition-colors cursor-pointer text-[#1a2d42] group"
                    >
                      <app.icon size={20} className="text-[#2b8ac9] group-hover:scale-105 transition-transform shrink-0" />
                      <span className="font-sans font-medium text-xs truncate">{app.label}</span>
                    </button>
                  ))}
                  <div className="flex-1 min-h-[30px]" />
                  {/* Win7 Search Input */}
                  <div className="relative mt-2">
                    <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search programs and files"
                      className="w-full bg-white border border-[#7f9db9] rounded pl-8 pr-2 py-1 text-xs text-gray-800 italic outline-none focus:border-[#3c7fb1] focus:ring-1 focus:ring-[#3c7fb1]"
                    />
                  </div>
                </div>

                {/* Right Column: User & Shortcuts */}
                <div className="w-[42%] bg-gradient-to-b from-[#1c3d64] via-[#122e4d] to-[#0a1e34] p-3 flex flex-col text-white text-xs border-l border-white/20 font-sans">
                  <div className="flex items-center gap-2.5 pb-3 border-b border-white/15 mb-2">
                    <div className="w-9 h-9 rounded-md bg-gradient-to-b from-sky-300 to-sky-600 p-[1px] shadow">
                      <div className="w-full h-full bg-[#122e4d] rounded-[5px] flex items-center justify-center font-bold text-xs text-sky-200">
                        YP
                      </div>
                    </div>
                    <span className="font-semibold text-xs leading-tight">Yug Pathak</span>
                  </div>

                  <div className="flex flex-col gap-2 text-white/80 text-[11px] flex-1">
                    <button onClick={openChooser} className="text-left hover:text-white hover:underline cursor-pointer">
                      Documents
                    </button>
                    <button onClick={() => goMode("builder")} className="text-left hover:text-white hover:underline cursor-pointer">
                      Engineering Lab
                    </button>
                    <button onClick={() => goMode("recruiter")} className="text-left hover:text-white hover:underline cursor-pointer">
                      Recruiter View
                    </button>
                    <button onClick={() => { setMenuOpen(false); openSettings(); }} className="text-left hover:text-white hover:underline cursor-pointer">
                      Control Panel
                    </button>
                  </div>

                  {/* Windows 7 Glossy Shut Down Button */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/15 mt-2">
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        restartBoot();
                      }}
                      title="Restart"
                      className="p-1.5 rounded hover:bg-white/15 text-white/80 cursor-pointer"
                    >
                      <RotateCcw size={14} />
                    </button>
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        setShutdown(true);
                      }}
                      className="px-3 py-1 rounded bg-gradient-to-b from-red-500/80 to-red-700/90 hover:brightness-125 border border-red-400/50 text-white font-medium text-xs shadow cursor-pointer flex items-center gap-1.5"
                    >
                      <Power size={12} /> Shut down
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Ubuntu 24.04 GNOME Activities App Launcher */}
          {theme === "ubuntu" && (
            <div>
              <div className="relative mb-4">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
                <input
                  type="text"
                  placeholder="Type to search applications..."
                  className="w-full bg-[#1e1e1e] rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-white/40 outline-none border border-white/10 focus:border-[#e95420]"
                />
              </div>

              <div className="text-xs font-semibold text-[#e95420] mb-2 uppercase tracking-wider font-sans">
                Applications
              </div>

              <div className="grid grid-cols-3 gap-3">
                {appButtons.map((app) => (
                  <button
                    key={app.id}
                    onClick={() => {
                      setMenuOpen(false);
                      app.onClick();
                    }}
                    className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-white/10 transition-colors cursor-pointer text-center group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-[#333333] border border-black/40 flex items-center justify-center text-[#e95420] group-hover:scale-105 group-hover:border-[#e95420] transition-all shadow-md">
                      <app.icon size={24} />
                    </div>
                    <span className="font-sans text-xs text-white/90 font-medium truncate max-w-full">
                      {app.label}
                    </span>
                  </button>
                ))}
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    openSettings();
                  }}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-white/10 transition-colors cursor-pointer text-center group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#333333] border border-black/40 flex items-center justify-center text-[#e95420] group-hover:scale-105 group-hover:border-[#e95420] transition-all shadow-md">
                    <OSSettingsIcon size={24} />
                  </div>
                  <span className="font-sans text-xs text-white/90 font-medium truncate max-w-full">
                    Settings
                  </span>
                </button>
              </div>

              <div className="border-t border-white/10 mt-4 pt-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#e95420] flex items-center justify-center font-bold text-white text-xs">
                    YP
                  </div>
                  <span className="text-xs font-medium text-white/80">Yug Pathak</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      restartBoot();
                    }}
                    title="Restart"
                    className="p-2 rounded-lg hover:bg-white/10 text-white/70 hover:text-white cursor-pointer"
                  >
                    <RotateCcw size={15} />
                  </button>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      setShutdown(true);
                    }}
                    title="Power Off"
                    className="p-2 rounded-lg hover:bg-red-500/20 text-white/70 hover:text-red-400 cursor-pointer"
                  >
                    <Power size={15} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Windows XP Classic Luna Start Menu */}
          {theme === "xp" && (
            <div>
              {/* Header */}
              <div className="bg-gradient-to-r from-[#0058ee] to-[#0030a8] p-3 flex items-center gap-3 border-b border-[#002277]">
                <div className="w-10 h-10 rounded-md bg-white/20 border-2 border-white/60 flex items-center justify-center text-white font-black text-sm shadow">
                  YP
                </div>
                <div>
                  <div className="font-sans font-bold text-sm text-white leading-tight [text-shadow:1px_1px_1px_#000]">
                    Yug Pathak
                  </div>
                  <div className="font-sans text-[11px] text-sky-200">Software Developer</div>
                </div>
              </div>

              {/* Items List */}
              <div className="p-2 flex flex-col gap-1 bg-[#ece9d8]">
                {appButtons.map((app) => (
                  <button
                    key={app.id}
                    onClick={() => {
                      setMenuOpen(false);
                      app.onClick();
                    }}
                    className="flex items-center gap-3 px-3 py-2 rounded text-left hover:bg-[#0055ea] hover:text-white transition-colors cursor-pointer text-[#1a1a1a] group"
                  >
                    <app.icon size={18} className="text-[#0055ea] group-hover:text-white shrink-0" />
                    <span className="font-sans font-semibold text-xs">{app.label}</span>
                  </button>
                ))}
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    openSettings();
                  }}
                  className="flex items-center gap-3 px-3 py-2 rounded text-left hover:bg-[#0055ea] hover:text-white transition-colors cursor-pointer text-[#1a1a1a] group"
                >
                  <OSSettingsIcon size={18} className="shrink-0" />
                  <span className="font-sans font-semibold text-xs">CONTROL_PANEL.CPL</span>
                </button>
                <div className="border-t border-black/15 my-1" />
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    restartBoot();
                  }}
                  className="flex items-center gap-3 px-3 py-1.5 rounded text-left hover:bg-[#0055ea] hover:text-white text-xs font-sans cursor-pointer text-[#333]"
                >
                  <RotateCcw size={14} /> Reboot Machine (BIOS)
                </button>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    setShutdown(true);
                  }}
                  className="flex items-center gap-3 px-3 py-1.5 rounded text-left hover:bg-red-600 hover:text-white text-xs font-sans cursor-pointer text-[#b70a17]"
                >
                  <Power size={14} /> Turn Off Computer
                </button>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );

  /* ------------------- UBUNTU TOP PANEL & LEFT DOCK ------------------- */
  if (theme === "ubuntu") {
    return (
      <>
        {/* Ubuntu Top Bar */}
        <div className="fixed top-0 inset-x-0 h-[28px] bg-[#111111]/95 backdrop-blur-md border-b border-black text-white text-xs px-3.5 flex items-center justify-between z-[90] select-none font-sans">
          <button
            onClick={() => setMenuOpen((m) => !m)}
            className="font-medium hover:text-[#e95420] transition-colors cursor-pointer"
          >
            Activities
          </button>
          <div className="font-medium text-white/90">{dateStr} {time}</div>
          <div className="flex items-center gap-3 text-white/80">
            <button
              onClick={() => setThemesOpen(true)}
              title="Switch OS Theme"
              className="flex items-center gap-1 hover:text-[#e95420] cursor-pointer"
            >
              <Palette size={13} />
              <span className="text-[11px] font-mono">UBUNTU</span>
            </button>
            <button
              onClick={openSettings}
              title="Settings"
              className="flex items-center gap-1 hover:text-[#e95420] cursor-pointer"
            >
              <Sliders size={13} />
            </button>
            <Wifi size={13} />
            <Volume2 size={13} />
            <button onClick={() => setShutdown(true)} className="hover:text-[#e95420] cursor-pointer">
              <Power size={13} />
            </button>
          </div>
        </div>

        {/* Ubuntu Left Dock */}
        <div className="fixed left-0 top-[28px] bottom-0 w-[54px] bg-[#111111]/90 backdrop-blur-md border-r border-white/10 z-[85] flex flex-col items-center py-2.5 gap-2 select-none">
          {renderStartButton()}
          <div className="w-8 border-t border-white/10 my-1" />
          {appButtons.map((app) => (
            <button
              key={app.id}
              onClick={app.onClick}
              title={app.label}
              className={cn(
                "relative w-10 h-10 rounded-xl flex items-center justify-center hover:bg-white/15 transition-all cursor-pointer text-white/85 hover:text-white",
                phase === app.id && "bg-white/20 text-[#e95420]"
              )}
            >
              {phase === app.id && (
                <span className="absolute -left-1 top-1/2 -translate-y-1/2 w-1.5 h-3 bg-[#e95420] rounded-r-full" />
              )}
              <app.icon size={20} />
            </button>
          ))}
          <div className="flex-1" />
          <button
            onClick={() => setVoiceOpen(true)}
            title="Wispr Flow Voice Dictation"
            className="w-10 h-10 rounded-xl bg-red-600/20 text-red-400 hover:bg-red-600/30 flex items-center justify-center cursor-pointer transition-colors"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 blink" />
          </button>
        </div>

        {renderStartMenu()}
        {renderThemeSelector()}
        {renderShutdownOverlay()}
      </>
    );
  }

  /* ------------------- WINDOWS 11 CENTERED TASKBAR ------------------- */
  if (theme === "win11") {
    return (
      <div className="fixed bottom-0 inset-x-0 z-[80] h-[48px] bg-[#1a1c29]/80 backdrop-blur-2xl border-t border-white/15 shadow-2xl flex items-center px-4 select-none pb-[env(safe-area-inset-bottom)]">
        {renderStartMenu()}

        {/* Left empty spacer to balance centering */}
        <div className="flex-1 hidden md:block" />

        {/* Centered App Icons */}
        <div className="flex items-center gap-1.5 mx-auto md:mx-0">
          {renderStartButton()}
          <button
            onClick={askYug}
            title="Search"
            className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-white/10 text-white/80 cursor-pointer"
          >
            <Search size={18} />
          </button>

          {appButtons.map((app) => (
            <button
              key={app.id}
              onClick={app.onClick}
              title={app.label}
              className={cn(
                "relative w-10 h-10 rounded-lg flex items-center justify-center hover:bg-white/10 transition-all cursor-pointer text-white/90",
                phase === app.id && "bg-white/15 text-sky-400"
              )}
            >
              <app.icon size={20} />
              {phase === app.id && (
                <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-sky-400" />
              )}
            </button>
          ))}
        </div>

        {/* Right System Tray Pill */}
        <div className="flex-1 flex justify-end items-center gap-2">
          <button
            onClick={() => setVoiceOpen(true)}
            className="h-8 px-2.5 rounded-lg bg-red-500/15 hover:bg-red-500/25 border border-red-500/30 flex items-center gap-2 text-xs text-red-200 cursor-pointer transition-colors"
            title="THIS SITE WAS BUILT BY SPEAKING"
          >
            <span className="w-2 h-2 rounded-full bg-red-500 blink" />
            <span className="hidden sm:inline">BUILT BY SPEAKING</span>
          </button>

          <button
            onClick={() => setThemesOpen(true)}
            className="h-8 px-2.5 rounded-lg hover:bg-white/10 flex items-center gap-1.5 text-xs text-white cursor-pointer transition-colors"
            title="Switch OS Theme"
          >
            <Palette size={14} className="text-sky-400" />
            <span className="hidden sm:inline font-mono">WIN11</span>
          </button>

          <div className="h-8 px-3 rounded-lg hover:bg-white/10 flex items-center gap-2.5 text-xs text-white/90 cursor-default">
            <Wifi size={14} />
            <Volume2 size={14} />
            <span>{time}</span>
          </div>
        </div>

        {renderThemeSelector()}
        {renderShutdownOverlay()}
      </div>
    );
  }

  /* ------------------- WINDOWS 10 TASKBAR ------------------- */
  if (theme === "win10") {
    return (
      <div className="fixed bottom-0 inset-x-0 z-[80] h-[40px] bg-[#0c0c0c]/90 backdrop-blur-md border-t border-white/15 shadow-xl flex items-center select-none pb-[env(safe-area-inset-bottom)]">
        {renderStartMenu()}
        {renderStartButton()}

        {/* Windows 10 Search Bar */}
        <div
          onClick={askYug}
          className="hidden md:flex items-center gap-2 h-full bg-[#1f1f1f] border-r border-white/10 px-3 w-56 text-white/50 text-xs hover:bg-[#252525] cursor-pointer"
        >
          <Search size={14} />
          <span>Type here to search</span>
        </div>

        {/* Running Apps Strip */}
        <div className="flex items-center h-full">
          {appButtons.map((app) => (
            <button
              key={app.id}
              onClick={app.onClick}
              title={app.label}
              className={cn(
                "h-full px-3.5 flex items-center gap-2 hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer text-xs font-sans relative",
                phase === app.id && "bg-white/15 text-white"
              )}
            >
              <app.icon size={16} />
              <span className="hidden sm:inline">{app.label}</span>
              {phase === app.id && (
                <span className="absolute bottom-0 inset-x-0 h-[2px] bg-[#0078d7]" />
              )}
            </button>
          ))}
        </div>

        <div className="flex-1" />

        {/* Right System Tray */}
        <div className="flex items-center h-full pr-1">
          <button
            onClick={() => setVoiceOpen(true)}
            className="h-full px-3 hover:bg-white/10 flex items-center gap-2 text-xs text-white cursor-pointer"
            title="THIS SITE WAS BUILT BY SPEAKING"
          >
            <span className="w-2 h-2 rounded-full bg-[#e81123] blink" />
            <span className="hidden sm:inline">VOICE LOG</span>
          </button>

          <button
            onClick={() => setThemesOpen(true)}
            className="h-full px-3 hover:bg-white/10 flex items-center gap-1.5 text-xs text-white cursor-pointer"
            title="Switch OS Theme"
          >
            <Palette size={13} className="text-[#0078d7]" />
            <span className="hidden sm:inline font-mono">WIN10</span>
          </button>

          <div className="h-full px-3 hover:bg-white/10 flex flex-col justify-center text-[11px] text-white/90 text-right leading-tight">
            <span>{time}</span>
            <span className="text-[10px] text-white/60">{dateStr}</span>
          </div>

          {/* Action Center line */}
          <div className="w-[3px] h-full border-l border-white/20 ml-1" />
        </div>

        {renderThemeSelector()}
        {renderShutdownOverlay()}
      </div>
    );
  }

  /* ------------------- WINDOWS 8 METRO TASKBAR ------------------- */
  if (theme === "win8") {
    return (
      <div className="fixed bottom-0 inset-x-0 z-[80] h-[40px] bg-[#141414] border-t-2 border-[#0b7a75] shadow-2xl flex items-center select-none pb-[env(safe-area-inset-bottom)]">
        {renderStartMenu()}
        {renderStartButton()}

        {/* Running Apps Strip */}
        <div className="flex items-center h-full">
          {appButtons.map((app) => (
            <button
              key={app.id}
              onClick={app.onClick}
              title={app.label}
              className={cn(
                "h-full px-4 flex items-center gap-2 text-white/80 hover:text-white hover:bg-[#0b7a75]/40 transition-colors cursor-pointer text-xs font-sans uppercase font-semibold",
                phase === app.id && "bg-[#0b7a75] text-white"
              )}
            >
              <app.icon size={16} />
              <span className="hidden sm:inline">{app.label}</span>
            </button>
          ))}
        </div>

        <div className="flex-1" />

        {/* Right System Tray */}
        <div className="flex items-center h-full pr-2">
          <button
            onClick={() => setVoiceOpen(true)}
            className="h-full px-3 hover:bg-[#0b7a75]/40 flex items-center gap-2 text-xs text-white cursor-pointer font-sans"
            title="THIS SITE WAS BUILT BY SPEAKING"
          >
            <span className="w-2 h-2 bg-[#ff5252] blink" />
            <span className="hidden sm:inline">REC</span>
          </button>

          <button
            onClick={() => setThemesOpen(true)}
            className="h-full px-3 hover:bg-[#0b7a75]/40 flex items-center gap-1.5 text-xs text-white cursor-pointer font-mono"
            title="Switch OS Theme"
          >
            <Palette size={13} className="text-[#0b7a75]" />
            <span className="hidden sm:inline">WIN8</span>
          </button>

          <div className="h-full px-3 flex flex-col justify-center text-[11px] text-white text-right leading-tight font-sans">
            <span>{time}</span>
            <span className="text-[10px] text-white/60">{dateStr}</span>
          </div>
        </div>

        {renderThemeSelector()}
        {renderShutdownOverlay()}
      </div>
    );
  }

  /* ------------------- WINDOWS 7 AERO TASKBAR ------------------- */
  if (theme === "win7") {
    return (
      <div className="fixed bottom-0 inset-x-0 z-[80] h-[40px] bg-gradient-to-b from-[#1b436c]/85 via-[#0e2742]/90 to-[#071626]/95 backdrop-blur-xl border-t border-cyan-300/40 shadow-2xl flex items-center px-2 select-none pb-[env(safe-area-inset-bottom)]">
        {renderStartMenu()}
        {renderStartButton()}

        <div className="flex items-center gap-1.5 ml-2 h-full">
          {appButtons.map((app) => (
            <button
              key={app.id}
              onClick={app.onClick}
              title={app.label}
              className={cn(
                "h-[32px] px-3 rounded-sm flex items-center gap-2 text-xs font-sans font-medium text-white/90 transition-all cursor-pointer border border-transparent",
                phase === app.id
                  ? "bg-gradient-to-b from-white/35 to-sky-500/35 border-cyan-300/60 shadow-[0_0_8px_rgba(50,150,255,0.6)]"
                  : "hover:bg-white/20 hover:border-white/30"
              )}
            >
              <app.icon size={16} className="drop-shadow" />
              <span className="hidden sm:inline">{app.label}</span>
            </button>
          ))}
        </div>

        <div className="flex-1" />

        <div className="flex items-center gap-2 h-full">
          <button
            onClick={() => setVoiceOpen(true)}
            className="h-[30px] px-2.5 rounded bg-white/10 hover:bg-white/20 border border-white/30 flex items-center gap-2 text-xs text-white cursor-pointer"
            title="THIS SITE WAS BUILT BY SPEAKING"
          >
            <span className="w-2 h-2 rounded-full bg-red-500 blink" />
            <span className="hidden sm:inline">REC</span>
          </button>

          <button
            onClick={() => setThemesOpen(true)}
            className="h-[30px] px-2.5 rounded bg-white/10 hover:bg-white/20 border border-white/30 flex items-center gap-1.5 text-xs text-white cursor-pointer"
            title="Switch OS Theme"
          >
            <Palette size={13} className="text-cyan-300" />
            <span className="hidden sm:inline font-mono">WIN7</span>
          </button>

          <div className="px-2 text-xs font-sans text-white text-right leading-tight drop-shadow">
            <div>{time}</div>
            <div className="text-[10px] text-sky-200">{dateStr}</div>
          </div>

          {/* Aero Peek button on right */}
          <div className="w-3.5 h-[34px] rounded-r border-l border-white/30 hover:bg-white/30 cursor-pointer ml-1" title="Show desktop" />
        </div>

        {renderThemeSelector()}
        {renderShutdownOverlay()}
      </div>
    );
  }

  /* ------------------- WINDOWS XP LUNA TASKBAR (DEFAULT) ------------------- */
  return (
    <div
      data-testid="desktop-taskbar"
      className="fixed bottom-0 inset-x-0 z-[80] h-[38px] bg-gradient-to-b from-[#245edb] via-[#3f8cf3] to-[#1941a5] border-t border-t-[#3593ff] flex items-center select-none pb-[env(safe-area-inset-bottom)] shadow-[0_-2px_10px_rgba(0,0,0,0.5)]"
    >
      {renderStartMenu()}
      {renderStartButton()}

      {/* Running App Buttons */}
      <div className="flex items-center gap-1 px-2 h-full">
        {appButtons.map((app) => (
          <button
            key={app.id}
            onClick={app.onClick}
            title={app.label}
            className={cn(
              "h-[28px] px-3 rounded-sm flex items-center gap-1.5 text-xs font-sans font-semibold text-white border transition-all cursor-pointer",
              phase === app.id
                ? "bg-[#1c4fb3] border-[#0d3284] shadow-inner text-[#ffcc00]"
                : "bg-gradient-to-b from-[#3a7feb] to-[#1e58c8] border-[#1846a3] hover:brightness-110"
            )}
          >
            <app.icon size={14} />
            <span className="hidden sm:inline">{app.label}</span>
          </button>
        ))}
      </div>

      <div className="flex-1" />

      {/* Windows XP System Tray */}
      <div className="h-full bg-gradient-to-b from-[#0f388a] via-[#103fa0] to-[#0c2c6e] border-l border-l-[#1941a5] flex items-center gap-2 px-3 text-white text-xs font-sans shadow-inner">
        <button
          data-testid="wispr-voice-indicator"
          onClick={() => setVoiceOpen(true)}
          className="flex items-center gap-1.5 hover:brightness-125 cursor-pointer text-white"
          title="THIS SITE WAS BUILT BY SPEAKING"
        >
          <span className="w-2 h-2 rounded-full bg-[#ff3b30] blink" />
          <span className="hidden sm:inline font-vt text-[13px]">REC</span>
        </button>

        <button
          data-testid="theme-toggle"
          onClick={() => setThemesOpen((t) => !t)}
          className="flex items-center gap-1 hover:brightness-125 cursor-pointer text-white px-1.5 py-0.5 rounded bg-[#1c4fb3]/60 border border-[#2b6be0]"
          title="Switch OS Theme"
        >
          <Palette size={13} className="text-yellow-300" />
          <span className="hidden sm:inline font-mono text-[11px]">{theme.toUpperCase()}</span>
        </button>

        <div className="font-mono text-xs pl-1">{time}</div>
      </div>

      {renderThemeSelector()}
      {renderShutdownOverlay()}
    </div>
  );

  /* ------------------- THEME PICKER MODAL ------------------- */
  function renderThemeSelector() {
    return (
      <AnimatePresence>
        {themesOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            className="fixed bottom-[48px] right-3 z-[110] w-72 rounded-xl bg-[#141824]/95 backdrop-blur-xl border border-white/20 shadow-2xl p-3 select-none"
            data-testid="theme-menu"
          >
            <div className="px-2 py-1 font-sans font-bold text-xs text-sky-400 tracking-wider uppercase border-b border-white/10 pb-2 mb-2 flex items-center justify-between">
              <span>Switch Operating System</span>
              <span className="text-[10px] text-white/50">LIVE VM</span>
            </div>
            <div className="flex flex-col gap-1">
              {THEME_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  data-testid={`theme-option-${opt.id}`}
                  onClick={() => {
                    setTheme(opt.id);
                    setThemesOpen(false);
                  }}
                  className={cn(
                    "w-full text-left p-2.5 rounded-lg flex items-center gap-3 transition-colors cursor-pointer text-white hover:bg-white/10",
                    theme === opt.id && "bg-sky-500/20 border border-sky-400/40"
                  )}
                >
                  <span
                    className="w-4 h-4 rounded-full shrink-0 shadow-sm border border-white/40"
                    style={{ background: opt.dot }}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="font-sans font-semibold text-xs leading-none text-white flex items-center justify-between">
                      <span>{opt.label}</span>
                      {theme === opt.id && <span className="text-sky-400 font-bold">ACTIVE</span>}
                    </div>
                    <div className="font-sans text-[11px] text-white/50 mt-1 truncate">{opt.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  /* ------------------- SHUTDOWN OVERLAY ------------------- */
  function renderShutdownOverlay() {
    return (
      <AnimatePresence>
        {shutdown && (
          <motion.div
            data-testid="shutdown-overlay"
            className="fixed inset-0 z-[160] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShutdown(false)}
          >
            <motion.div
              initial={{ scale: 0.92, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm rounded-xl bg-[#003399] border-2 border-white/40 p-6 shadow-2xl text-white text-center"
            >
              <div className="flex items-center justify-between border-b border-white/20 pb-3 mb-5">
                <span className="font-sans font-bold text-lg">Turn off computer</span>
                <span className="font-mono text-xs text-sky-200">YUG.EXE</span>
              </div>
              <div className="flex justify-center gap-6 my-6">
                <div className="flex flex-col items-center gap-2">
                  <button
                    onClick={() => {
                      setShutdown(false);
                      restartBoot();
                    }}
                    className="w-12 h-12 rounded-full bg-gradient-to-b from-[#4caf50] to-[#2e7d32] border border-white/50 flex items-center justify-center text-white hover:brightness-125 cursor-pointer shadow-lg active:scale-95"
                  >
                    <RotateCcw size={20} />
                  </button>
                  <span className="text-xs font-semibold">Restart</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <button
                    onClick={() => window.location.reload()}
                    className="w-12 h-12 rounded-full bg-gradient-to-b from-[#e53935] to-[#b71c1c] border border-white/50 flex items-center justify-center text-white hover:brightness-125 cursor-pointer shadow-lg active:scale-95"
                  >
                    <Power size={20} />
                  </button>
                  <span className="text-xs font-semibold">Turn Off</span>
                </div>
              </div>
              <button
                onClick={() => setShutdown(false)}
                className="mt-2 px-6 py-1.5 rounded bg-white/20 hover:bg-white/30 border border-white/40 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
};

export default Taskbar;
