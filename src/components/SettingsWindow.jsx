import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Sliders,
  Palette,
  Monitor,
  Volume2,
  Info,
  Laptop,
  Check,
  Search,
  ChevronRight,
  Shield,
  Layers,
  Sparkles,
  RefreshCw,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { Win98Window, BevelBtn } from "./Win98";
import { cn } from "@/lib/utils";

const OS_OPTIONS = [
  { id: "xp", name: "Windows XP", desc: "Luna Blue & Bliss Wallpaper (2001)", color: "#245edb" },
  { id: "win7", name: "Windows 7", desc: "Aero Glass & Crystal Energy (2009)", color: "#2b8ac9" },
  { id: "win8", name: "Windows 8", desc: "Metro UI & Modern Live Tiles (2012)", color: "#0b7a75" },
  { id: "win10", name: "Windows 10", desc: "Fluent Acrylic & Laser Hero (2015)", color: "#0078d7" },
  { id: "win11", name: "Windows 11", desc: "Centered Mica & Bloom Silk (2021)", color: "#0067b8" },
  { id: "ubuntu", name: "Ubuntu 24.04", desc: "GNOME 46 & Noble Aubergine (2024)", color: "#e95420" },
];

export const SettingsWindow = ({ open, onClose }) => {
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("personalize");
  const [searchQuery, setSearchQuery] = useState("");

  if (!open) return null;

  const getWindowTitle = () => {
    switch (theme) {
      case "ubuntu":
        return "Settings — GNOME Control Center";
      case "win11":
        return "Settings — System & Personalization";
      case "win10":
        return "Windows Settings";
      case "win8":
        return "PC Settings";
      case "win7":
        return "Control Panel\\All Control Panel Items\\Personalization";
      case "xp":
      default:
        return "Control Panel";
    }
  };

  /* ------------------- WINDOWS XP CONTROL PANEL ------------------- */
  const renderXPControlPanel = () => (
    <div className="flex flex-col sm:flex-row min-h-[420px] bg-[#ece9d8] text-[#1a1a1a] font-sans">
      {/* Left XP Blue Sidebar */}
      <div className="w-full sm:w-52 bg-gradient-to-b from-[#6487dc] to-[#7ba2e7] p-3 text-white flex flex-col gap-3 border-r border-[#0055ea]/30">
        <div className="flex items-center gap-2 pb-2 border-b border-white/30">
          <Sliders size={20} className="text-white drop-shadow" />
          <span className="font-bold text-sm [text-shadow:1px_1px_1px_#10358a]">Control Panel</span>
        </div>
        <div className="text-xs flex flex-col gap-1.5 [text-shadow:0_1px_1px_rgba(0,0,0,0.4)]">
          <span className="font-semibold text-white/90">Pick a task...</span>
          <button
            onClick={() => setActiveTab("personalize")}
            className={cn(
              "text-left p-1.5 rounded hover:bg-white/20 transition-colors cursor-pointer text-xs flex items-center justify-between",
              activeTab === "personalize" && "bg-white/30 font-bold"
            )}
          >
            <span>Appearance & Themes</span>
            <ChevronRight size={13} />
          </button>
          <button
            onClick={() => setActiveTab("system")}
            className={cn(
              "text-left p-1.5 rounded hover:bg-white/20 transition-colors cursor-pointer text-xs flex items-center justify-between",
              activeTab === "system" && "bg-white/30 font-bold"
            )}
          >
            <span>System Properties</span>
            <ChevronRight size={13} />
          </button>
        </div>
        <div className="mt-auto p-2 bg-[#1c4fb3]/40 rounded border border-white/20 text-[11px] leading-tight">
          <span className="font-bold block mb-1">Tip:</span>
          Select any OS theme to reboot the live portfolio VM instantly.
        </div>
      </div>

      {/* Main XP Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        {activeTab === "personalize" ? (
          <div>
            <h3 className="font-bold text-base text-[#000080] border-b border-[#c0c0c0] pb-1 mb-3">
              Appearance and Operating System Themes
            </h3>
            <p className="text-xs text-[#374151] font-medium mb-4">
              Select an operating system style below to completely transform the portfolio environment:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {OS_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setTheme(opt.id)}
                  className={cn(
                    "bevel-btn p-3 text-left flex items-start gap-3 cursor-pointer group",
                    theme === opt.id && "bg-[#d4e4f7] border-2 border-[#0055ea]"
                  )}
                >
                  <span
                    className="w-5 h-5 rounded-sm shrink-0 border border-black/40 mt-0.5 shadow-sm"
                    style={{ background: opt.color }}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="font-bold text-xs flex items-center justify-between text-[#1a1a1a]">
                      <span>{opt.name}</span>
                      {theme === opt.id && <span className="text-[#0055ea] font-black text-[10px]">APPLIED</span>}
                    </div>
                    <div className="text-[11px] text-[#374151] mt-0.5">{opt.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <h3 className="font-bold text-base text-[#000080] border-b border-[#c0c0c0] pb-1 mb-3">
              System Properties & Machine Dossier
            </h3>
            <div className="bevel-in p-3 text-xs flex flex-col gap-2 font-mono">
              <div className="text-[#000080] font-bold">Microsoft Windows XP Professional</div>
              <div className="text-[#374151]">Version 2002 Service Pack 3</div>
              <div className="border-t border-black/15 pt-2 mt-1">
                <div>Manufactured and supported by:</div>
                <div className="font-bold text-[#1a1a1a]">Yug Pathak — Developer Portfolio Machine</div>
              </div>
              <div className="border-t border-black/15 pt-2 mt-1">
                <div>Computer:</div>
                <div>Intel(R) Core(TM) i7-14700K CPU @ 3.40GHz</div>
                <div>16.0 GB of RAM · 640K Base Memory OK</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  /* ------------------- WINDOWS 7 AERO CONTROL PANEL ------------------- */
  const renderWin7ControlPanel = () => (
    <div className="flex flex-col min-h-[440px] bg-[#f0f4f9] text-[#142233] font-sans">
      {/* Win7 Breadcrumbs & Search */}
      <div className="bg-[#e4ecf7] border-b border-[#b0c4de] px-4 py-2 flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-1.5 text-[#335588] truncate">
          <Sliders size={15} className="text-[#2b8ac9]" />
          <span>Control Panel</span>
          <span>›</span>
          <span className="font-semibold text-[#142233]">Personalization & Display</span>
        </div>
        <div className="relative w-48 hidden sm:block">
          <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search Control Panel"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-[#7f9db9] rounded pl-7 pr-2 py-0.5 text-xs outline-none focus:border-[#3c7fb1]"
          />
        </div>
      </div>

      {/* Win7 Themes Grid */}
      <div className="p-5 flex-1 overflow-y-auto">
        <div className="text-sm font-bold text-[#1a385c] mb-1">
          Change the visuals and sounds on your computer
        </div>
        <div className="text-xs text-[#2a4059] font-medium mb-4">
          Click a theme to change the desktop background, window border color, sounds, and screen saver.
        </div>

        <div className="text-xs font-bold text-[#2a5584] uppercase tracking-wider mb-2 border-b border-[#c5d8ea] pb-1">
          Aero Themes ({OS_OPTIONS.length})
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
          {OS_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setTheme(opt.id)}
              className={cn(
                "p-3 rounded-lg border text-left transition-all cursor-pointer flex flex-col justify-between h-28 relative group bg-white/80 shadow-sm",
                theme === opt.id
                  ? "border-[#2b8ac9] ring-2 ring-[#2b8ac9]/50 bg-gradient-to-b from-white to-[#d9ecff]"
                  : "border-[#b0c4de] hover:border-[#3c7fb1] hover:bg-white"
              )}
            >
              <div className="flex items-center justify-between w-full">
                <span className="w-6 h-6 rounded border border-black/30 shadow-sm" style={{ background: opt.color }} />
                {theme === opt.id && (
                  <span className="w-5 h-5 rounded-full bg-[#2b8ac9] text-white flex items-center justify-center text-[10px] font-bold shadow">
                    ✓
                  </span>
                )}
              </div>
              <div>
                <div className="font-bold text-xs text-[#142233]">{opt.name}</div>
                <div className="text-[10px] text-[#2a4059] font-medium truncate mt-0.5">{opt.desc}</div>
              </div>
            </button>
          ))}
        </div>

        {/* System Score Badge */}
        <div className="bg-gradient-to-r from-sky-100 to-blue-50 border border-sky-200 rounded-lg p-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-[#2b8ac9] text-white flex items-center justify-center font-bold text-lg shadow">
              7.9
            </div>
            <div>
              <div className="font-bold text-xs text-[#142233]">Windows Experience Index</div>
              <div className="text-[11px] text-[#2a4059]">Determined by lowest subscore (Processor: 7.9, Gaming: 7.9)</div>
            </div>
          </div>
          <span className="font-mono text-xs text-sky-700 font-semibold hidden sm:inline">Windows 7 Ultimate SP1</span>
        </div>
      </div>
    </div>
  );

  /* ------------------- WINDOWS 8 PC SETTINGS ------------------- */
  const renderWin8ControlPanel = () => (
    <div className="flex flex-col sm:flex-row min-h-[420px] bg-[#141414] text-white font-sans">
      {/* Metro Purple/Teal Left Bar */}
      <div className="w-full sm:w-56 bg-[#1a2332] p-4 flex flex-col gap-2 border-r border-[#0b7a75]/40">
        <h2 className="font-light text-2xl uppercase tracking-wider text-[#0b7a75] mb-3">PC settings</h2>
        {["Personalize", "Display", "PC and devices", "PC info"].map((item) => (
          <button
            key={item}
            onClick={() => setActiveTab(item.toLowerCase())}
            className={cn(
              "text-left px-3 py-2 text-xs font-semibold uppercase tracking-wider cursor-pointer transition-colors",
              activeTab === item.toLowerCase() ? "bg-[#0b7a75] text-white" : "text-white/70 hover:bg-white/10"
            )}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Main Metro Tiles */}
      <div className="flex-1 p-5 overflow-y-auto">
        <h3 className="font-light text-xl uppercase tracking-wider text-white mb-4">
          Personalize Your System Experience
        </h3>
        <div className="grid grid-cols-2 gap-3 mb-6">
          {OS_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setTheme(opt.id)}
              className={cn(
                "p-4 text-left cursor-pointer transition-all flex flex-col justify-between h-24 relative shadow",
                theme === opt.id ? "border-2 border-white ring-2 ring-[#0b7a75]" : "border border-white/20 hover:border-white/50"
              )}
              style={{ background: opt.color }}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-xs tracking-wider uppercase">{opt.name}</span>
                {theme === opt.id && <Check size={16} className="text-white" />}
              </div>
              <span className="text-[11px] text-white/80">{opt.desc}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  /* ------------------- WINDOWS 10 SETTINGS ------------------- */
  const renderWin10ControlPanel = () => (
    <div className="flex flex-col min-h-[440px] bg-[#1f1f1f] text-white font-sans">
      {/* Win10 Search Header */}
      <div className="p-5 text-center border-b border-white/10">
        <h2 className="font-semibold text-xl text-white mb-3">Windows Settings</h2>
        <div className="max-w-md mx-auto relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            placeholder="Find a setting"
            className="w-full bg-[#2b2b2b] border border-white/20 px-9 py-1.5 text-xs text-white placeholder-white/40 outline-none focus:border-[#0078d7]"
          />
        </div>
      </div>

      {/* Win10 Personalization View */}
      <div className="p-5 flex-1 overflow-y-auto">
        <div className="flex items-center gap-2 text-sm font-semibold text-[#0078d7] uppercase tracking-wider mb-3">
          <Palette size={16} /> Personalization — Operating System & Background
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
          {OS_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setTheme(opt.id)}
              className={cn(
                "p-3 text-left border cursor-pointer transition-all bg-[#2b2b2b]",
                theme === opt.id ? "border-[#0078d7] outline outline-1 outline-[#0078d7]" : "border-white/15 hover:border-white/40"
              )}
            >
              <div className="w-full h-12 rounded-none mb-2.5 flex items-center justify-center" style={{ background: opt.color }}>
                <span className="font-bold text-xs text-white uppercase">{opt.name}</span>
              </div>
              <div className="font-medium text-xs text-white flex items-center justify-between">
                <span>{opt.name}</span>
                {theme === opt.id && <span className="text-[#0078d7] text-[10px]">CURRENT</span>}
              </div>
            </button>
          ))}
        </div>

        <div className="p-3 bg-[#181818] border border-white/10 text-xs text-white/70 flex items-center justify-between">
          <span>Windows 10 Pro · Version 22H2 · OS Build 19045.3803</span>
          <span className="text-[#0078d7] font-semibold">Windows Feature Experience Pack</span>
        </div>
      </div>
    </div>
  );

  /* ------------------- WINDOWS 11 MODERN MICA SETTINGS ------------------- */
  const renderWin11ControlPanel = () => (
    <div className="flex flex-col sm:flex-row min-h-[460px] bg-[#1c1e2e]/95 text-[#f5f5f7] font-sans backdrop-blur-2xl">
      {/* Win11 Left Sidebar */}
      <div className="w-full sm:w-60 bg-white/5 border-r border-white/10 p-4 flex flex-col gap-2">
        {/* User Card */}
        <div className="flex items-center gap-3 p-2 rounded-xl bg-white/5 mb-3">
          <div className="w-9 h-9 rounded-full bg-sky-500/20 border border-sky-400/40 flex items-center justify-center font-bold text-sky-300 text-xs shadow-sm">
            YP
          </div>
          <div className="min-w-0">
            <div className="font-semibold text-xs leading-tight truncate">Yug Pathak</div>
            <div className="text-[10px] text-white/50">yugpathak2005@gmail.com</div>
          </div>
        </div>

        {["System", "Personalization", "Accessibility", "About Machine"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab.toLowerCase())}
            className={cn(
              "px-3 py-2 rounded-lg text-left text-xs font-medium cursor-pointer transition-colors flex items-center justify-between",
              activeTab === tab.toLowerCase() ? "bg-white/15 text-sky-400" : "text-white/75 hover:bg-white/10"
            )}
          >
            <span>{tab}</span>
            <ChevronRight size={13} className="opacity-50" />
          </button>
        ))}
      </div>

      {/* Win11 Right Panel */}
      <div className="flex-1 p-6 overflow-y-auto">
        <h2 className="text-xl font-bold tracking-tight mb-1">Personalization</h2>
        <p className="text-xs text-white/85 mb-5">Select a theme to apply across windows, taskbar, and controls.</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
          {OS_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setTheme(opt.id)}
              className={cn(
                "p-3.5 rounded-xl border text-left cursor-pointer transition-all flex flex-col justify-between h-28 relative backdrop-blur-md",
                theme === opt.id
                  ? "bg-white/15 border-sky-400/60 shadow-[0_4px_16px_rgba(0,120,215,0.35)]"
                  : "bg-white/5 border-white/10 hover:bg-white/10"
              )}
            >
              <div className="flex items-center justify-between">
                <span className="w-5 h-5 rounded-full border border-white/30 shadow-sm" style={{ background: opt.color }} />
                {theme === opt.id && <span className="w-2 h-2 rounded-full bg-sky-400" />}
              </div>
              <div>
                <div className="font-semibold text-xs text-white">{opt.name}</div>
                <div className="text-[11px] text-white/80 truncate mt-0.5">{opt.desc}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Specifications Card */}
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-2 text-xs">
          <div className="font-semibold text-sky-400">Device Specifications</div>
          <div className="grid grid-cols-2 gap-2 text-white/80 text-[11px]">
            <div>Device name: YUG-PORTFOLIO-VM</div>
            <div>Processor: Apple Silicon / x86_64 Compatible</div>
            <div>Edition: Windows 11 Pro 24H2</div>
            <div>Experience: Windows Feature Experience Pack 1000</div>
          </div>
        </div>
      </div>
    </div>
  );

  /* ------------------- UBUNTU 24.04 GNOME CONTROL CENTER ------------------- */
  const renderUbuntuControlPanel = () => (
    <div className="flex flex-col sm:flex-row min-h-[460px] bg-[#2b2b2b] text-[#f5f5f5] font-sans">
      {/* GNOME Left Sidebar */}
      <div className="w-full sm:w-56 bg-[#222222] border-r border-black/50 p-3 flex flex-col gap-1.5">
        <div className="px-3 py-2 text-xs font-bold text-[#e95420] uppercase tracking-wider">GNOME Settings</div>
        {["Appearance", "Displays", "Sound", "About"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab.toLowerCase())}
            className={cn(
              "px-3 py-2 rounded-md text-left text-xs font-medium cursor-pointer transition-colors",
              activeTab === tab.toLowerCase() ? "bg-[#e95420] text-white" : "text-white/80 hover:bg-white/10"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* GNOME Main Content */}
      <div className="flex-1 p-5 overflow-y-auto">
        <h2 className="text-lg font-bold text-white mb-1">Appearance</h2>
        <p className="text-xs text-white/85 mb-4">Choose desktop theme and window system styling.</p>

        <div className="text-xs font-semibold text-[#e95420] mb-2">Operating System Themes</div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
          {OS_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setTheme(opt.id)}
              className={cn(
                "p-3 rounded-lg border text-left cursor-pointer transition-all flex flex-col justify-between h-24",
                theme === opt.id
                  ? "bg-[#3e3e3e] border-[#e95420] shadow-[0_2px_8px_rgba(233,84,32,0.4)]"
                  : "bg-[#333333] border-black/40 hover:border-white/30"
              )}
            >
              <div className="flex items-center justify-between">
                <span className="w-4 h-4 rounded-full border border-black/50" style={{ background: opt.color }} />
                {theme === opt.id && <span className="text-[10px] text-[#e95420] font-bold">ACTIVE</span>}
              </div>
              <div>
                <div className="font-semibold text-xs text-white">{opt.name}</div>
                <div className="text-[10px] text-white/80 truncate mt-0.5">{opt.desc}</div>
              </div>
            </button>
          ))}
        </div>

        <div className="p-3.5 rounded-md bg-[#222222] border border-black/50 text-xs">
          <div className="font-bold text-white mb-1">About Ubuntu 24.04 LTS (Noble Numbat)</div>
          <div className="text-white/60 text-[11px] leading-relaxed">
            GNOME Version: 46 · Windowing System: Wayland · Kernel: Linux 6.8.0-generic
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[95] bg-black/60 flex items-center justify-center p-3 sm:p-6 pb-20 sm:pb-24"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.94, y: 15 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.96, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 26 }}
          className="w-full max-w-4xl max-h-[76vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <Win98Window
            title={getWindowTitle()}
            icon={Sliders}
            onClose={onClose}
            className="w-full shadow-2xl max-h-[76vh] flex flex-col overflow-hidden"
          >
            {theme === "ubuntu" && renderUbuntuControlPanel()}
            {theme === "win11" && renderWin11ControlPanel()}
            {theme === "win10" && renderWin10ControlPanel()}
            {theme === "win8" && renderWin8ControlPanel()}
            {theme === "win7" && renderWin7ControlPanel()}
            {theme === "xp" && renderXPControlPanel()}
          </Win98Window>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SettingsWindow;
