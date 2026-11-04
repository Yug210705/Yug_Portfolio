import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RotateCcw,
  Sliders,
  Terminal,
  Layers,
  Sparkles,
  Monitor,
  ExternalLink,
  Video,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";

export const DesktopContextMenu = ({
  x,
  y,
  visible,
  onClose,
  onOpenSettings,
  onOpenTerminal,
  onOpenInterview,
  onRefresh,
}) => {
  const { theme } = useTheme();
  const menuRef = useRef(null);

  useEffect(() => {
    if (!visible) return;
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };
    window.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", onClose, true);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", onClose, true);
    };
  }, [visible, onClose]);

  if (!visible) return null;

  // Keep menu on screen
  const menuX = Math.min(x, window.innerWidth - 220);
  const menuY = Math.min(y, window.innerHeight - 260);

  const getMenuContainerClass = () => {
    switch (theme) {
      case "ubuntu":
        return "bg-[#282828]/95 backdrop-blur-xl border border-black/60 rounded-xl shadow-[0_12px_32px_rgba(0,0,0,0.8)] py-1.5 text-[#dedede] text-xs font-sans min-w-[200px]";
      case "win11":
        return "bg-[#1c1d2e]/90 backdrop-blur-2xl border border-white/15 rounded-xl shadow-[0_16px_40px_rgba(0,0,0,0.7)] p-1.5 text-white/90 text-xs font-sans min-w-[210px]";
      case "win10":
        return "bg-[#1f1f1f] border border-white/20 rounded-none shadow-2xl py-1 text-white text-xs font-sans min-w-[200px]";
      case "win8":
        return "bg-[#141414] border-2 border-[#0b7a75] rounded-none shadow-2xl py-1 text-white text-xs font-sans uppercase min-w-[200px]";
      case "win7":
        return "bg-gradient-to-b from-[#f2f7fc]/95 to-[#d8e6f5]/95 backdrop-blur-md border border-white/60 rounded shadow-[0_8px_25px_rgba(0,0,0,0.4)] p-1 text-[#142233] text-xs font-sans min-w-[195px]";
      case "xp":
      default:
        return "bevel bg-[#c0c0c0] p-1 text-black font-vt text-[15px] min-w-[190px] hard-shadow";
    }
  };

  const getItemClass = () => {
    switch (theme) {
      case "ubuntu":
        return "w-full text-left px-3.5 py-1.5 rounded-md hover:bg-[#e95420] hover:text-white transition-colors cursor-pointer flex items-center gap-2.5";
      case "win11":
        return "w-full text-left px-3 py-1.5 rounded-lg hover:bg-white/10 text-white/85 hover:text-white transition-colors cursor-pointer flex items-center gap-2.5";
      case "win10":
        return "w-full text-left px-3 py-1.5 hover:bg-white/10 text-white transition-colors cursor-pointer flex items-center gap-2.5";
      case "win8":
        return "w-full text-left px-3.5 py-1.5 hover:bg-[#0b7a75] text-white transition-colors cursor-pointer flex items-center gap-2.5 tracking-wider";
      case "win7":
        return "w-full text-left px-3 py-1 rounded-sm hover:bg-gradient-to-b hover:from-[#cbe3fb] hover:to-[#aed2f8] hover:border hover:border-[#7da2ce] text-[#142233] transition-colors cursor-pointer flex items-center gap-2";
      case "xp":
      default:
        return "w-full text-left px-3 py-1 hover:bg-[#000080] hover:text-white transition-colors cursor-pointer flex items-center gap-2";
    }
  };

  const getDividerClass = () => {
    switch (theme) {
      case "ubuntu":
      case "win11":
      case "win10":
        return "my-1 border-t border-white/10";
      case "win8":
        return "my-1 border-t border-[#0b7a75]/40";
      case "win7":
        return "my-1 border-t border-[#b0c4de]";
      case "xp":
      default:
        return "my-1 border-t border-[#808080] border-b border-b-white";
    }
  };

  const getPersonalizeLabel = () => {
    switch (theme) {
      case "ubuntu":
        return "Settings...";
      case "win11":
      case "win10":
      case "win7":
        return "Personalize";
      case "win8":
        return "PC Settings";
      case "xp":
      default:
        return "Properties";
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        ref={menuRef}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.1 }}
        style={{ left: menuX, top: menuY }}
        className={cn("fixed z-[120] select-none", getMenuContainerClass())}
      >
        <button
          onClick={() => {
            onClose();
            onRefresh();
          }}
          className={getItemClass()}
        >
          <RotateCcw size={14} className="opacity-70 shrink-0" />
          <span>Refresh Desktop</span>
        </button>

        <button
          onClick={() => {
            onClose();
            if (onOpenInterview) onOpenInterview();
          }}
          className={getItemClass()}
        >
          <Video size={14} className="opacity-70 shrink-0 text-emerald-400" />
          <span>Interview Yug (Video Call)</span>
        </button>

        <button
          onClick={() => {
            onClose();
            onOpenTerminal();
          }}
          className={getItemClass()}
        >
          <Terminal size={14} className="opacity-70 shrink-0" />
          <span>{theme === "ubuntu" ? "Open in Terminal" : "Ask Yug (Terminal)"}</span>
        </button>

        <div className={getDividerClass()} />

        <button
          onClick={() => {
            onClose();
            onOpenSettings();
          }}
          className={getItemClass()}
        >
          <Sliders size={14} className="opacity-70 shrink-0" />
          <span>{getPersonalizeLabel()}</span>
        </button>
      </motion.div>
    </AnimatePresence>
  );
};

export default DesktopContextMenu;
