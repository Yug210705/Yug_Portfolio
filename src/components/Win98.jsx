import { X, Minus, Square } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context/ThemeContext";

export const BevelBtn = ({ children, onClick, className, disabled, title, testid, type = "button" }) => {
  const { theme } = useTheme();

  const getThemeBtnClass = () => {
    switch (theme) {
      case "win7":
        return "bg-gradient-to-b from-white/90 via-[#e0edf8] to-[#c5dcfa] border border-[#7f9db9] rounded shadow-sm hover:border-[#3c7fb1] hover:from-white hover:to-[#d0e5ff] active:from-[#b0d0f5] text-[#1a2d42] font-sans font-medium text-[13px] px-3 py-1.5";
      case "win8":
        return "bg-[#0b7a75] hover:bg-[#12948e] active:bg-[#075653] text-white rounded-none border-0 font-sans text-[13px] px-4 py-2 uppercase tracking-wider font-semibold";
      case "win10":
        return "bg-[#2b2b2b] hover:bg-[#383838] active:bg-[#1f1f1f] text-white border border-white/20 rounded-none font-sans text-[13px] px-3.5 py-1.5";
      case "win11":
        return "bg-white/10 hover:bg-white/15 active:bg-white/5 border border-white/15 rounded-lg text-white font-sans text-[13px] px-3.5 py-1.5 shadow-sm backdrop-blur-md";
      case "ubuntu":
        return "bg-[#3e3e3e] hover:bg-[#484848] active:bg-[#2b2b2b] text-white border border-black/40 rounded-md font-sans text-[13px] px-3.5 py-1.5 shadow-sm hover:border-[#e95420]";
      case "xp":
      default:
        return "bevel-btn font-vt text-[15px] leading-none px-3 py-2 text-[#1a1a1a]";
    }
  };

  return (
    <button
      type={type}
      title={title}
      disabled={disabled}
      onClick={onClick}
      data-testid={testid}
      className={cn(getThemeBtnClass(), "select-none transition-all cursor-pointer", className)}
    >
      {children}
    </button>
  );
};

export const BevelInset = ({ children, className }) => {
  const { theme } = useTheme();

  const getInsetClass = () => {
    switch (theme) {
      case "win7":
        return "bg-white/70 border border-[#7f9db9] rounded-sm p-3 shadow-inner";
      case "win8":
        return "bg-[#1d1d1d] border border-white/10 p-3";
      case "win10":
        return "bg-[#181818] border border-white/15 p-3";
      case "win11":
        return "bg-black/30 border border-white/10 rounded-xl p-3 backdrop-blur-sm";
      case "ubuntu":
        return "bg-[#1e1e1e] border border-black/50 rounded-md p-3";
      case "xp":
      default:
        return "bevel-in p-3";
    }
  };

  return <div className={cn(getInsetClass(), className)}>{children}</div>;
};

export const TitleBar = ({ title, onClose, dark, icon: Icon }) => {
  const { theme } = useTheme();

  // Ubuntu has controls on the LEFT
  if (theme === "ubuntu") {
    return (
      <div className="flex items-center gap-3 px-3 py-2 bg-[#2c001e] border-b border-black/50 select-none shrink-0 rounded-t-lg">
        {/* Left Ubuntu circle controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={onClose}
            aria-label="close"
            className="w-3.5 h-3.5 rounded-full bg-[#e95420] hover:brightness-110 active:brightness-90 flex items-center justify-center text-white/90 cursor-pointer transition-all group"
          >
            <X size={9} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
          <button
            aria-label="minimize"
            className="w-3.5 h-3.5 rounded-full bg-[#4c4c4c] hover:brightness-125 flex items-center justify-center text-white/90 cursor-pointer group"
          >
            <Minus size={9} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
          <button
            aria-label="maximize"
            className="w-3.5 h-3.5 rounded-full bg-[#4c4c4c] hover:brightness-125 flex items-center justify-center text-white/90 cursor-pointer group"
          >
            <Square size={7} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>
        {Icon && <Icon size={14} className="text-[#e95420] shrink-0" />}
        <span className="font-sans font-medium text-[13px] text-[#f2f2f2] truncate flex-1 text-center pr-12">
          {title}
        </span>
      </div>
    );
  }

  // Windows 11 Modern Mica Titlebar
  if (theme === "win11") {
    return (
      <div className="flex items-center gap-2 px-3 py-2 bg-white/5 border-b border-white/10 select-none shrink-0 rounded-t-2xl">
        {Icon && <Icon size={14} className="text-sky-400 shrink-0" />}
        <span className="font-sans font-medium text-[13px] text-white/90 tracking-normal truncate flex-1">
          {title}
        </span>
        <div className="flex items-center gap-1">
          <button
            aria-label="minimize"
            className="w-7 h-7 rounded-md hover:bg-white/10 flex items-center justify-center text-white/80 cursor-pointer transition-colors"
          >
            <Minus size={12} />
          </button>
          <button
            aria-label="maximize"
            className="w-7 h-7 rounded-md hover:bg-white/10 flex items-center justify-center text-white/80 cursor-pointer transition-colors"
          >
            <Square size={10} />
          </button>
          <button
            aria-label="close"
            onClick={onClose}
            className="w-7 h-7 rounded-md hover:bg-[#e81123] flex items-center justify-center text-white/80 hover:text-white cursor-pointer transition-colors"
          >
            <X size={13} />
          </button>
        </div>
      </div>
    );
  }

  // Windows 10 Clean Acrylic Titlebar
  if (theme === "win10") {
    return (
      <div className="flex items-center gap-2 pl-3 bg-[#1f1f1f] border-b border-white/15 select-none shrink-0 h-[32px]">
        {Icon && <Icon size={13} className="text-sky-400 shrink-0" />}
        <span className="font-sans text-[12px] text-white/90 truncate flex-1">{title}</span>
        <div className="flex items-center h-full">
          <button
            aria-label="minimize"
            className="w-11 h-full hover:bg-white/10 flex items-center justify-center text-white/80 cursor-pointer transition-colors"
          >
            <Minus size={11} />
          </button>
          <button
            aria-label="maximize"
            className="w-11 h-full hover:bg-white/10 flex items-center justify-center text-white/80 cursor-pointer transition-colors"
          >
            <Square size={9} />
          </button>
          <button
            aria-label="close"
            onClick={onClose}
            className="w-11 h-full hover:bg-[#e81123] flex items-center justify-center text-white/80 hover:text-white cursor-pointer transition-colors"
          >
            <X size={12} />
          </button>
        </div>
      </div>
    );
  }

  // Windows 8 Flat Titlebar
  if (theme === "win8") {
    return (
      <div className="flex items-center gap-2 px-2 py-1.5 bg-[#0b7a75] select-none shrink-0">
        {Icon && <Icon size={14} className="text-white shrink-0" />}
        <span className="font-sans font-semibold text-[13px] text-white tracking-wide truncate flex-1 uppercase">
          {title}
        </span>
        <div className="flex items-center gap-0.5">
          <button
            aria-label="minimize"
            className="w-6 h-6 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
          >
            <Minus size={11} />
          </button>
          <button
            aria-label="maximize"
            className="w-6 h-6 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
          >
            <Square size={9} />
          </button>
          <button
            aria-label="close"
            onClick={onClose}
            className="w-6 h-6 hover:bg-[#c42b1c] flex items-center justify-center text-white cursor-pointer"
          >
            <X size={12} />
          </button>
        </div>
      </div>
    );
  }

  // Windows 7 Aero Glass Titlebar
  if (theme === "win7") {
    return (
      <div className="relative flex items-center gap-2 px-2.5 py-1.5 bg-gradient-to-b from-white/40 via-sky-200/25 to-sky-700/35 border-b border-white/40 select-none shrink-0 rounded-t-xl overflow-hidden backdrop-blur-md">
        <div className="absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-white/35 to-transparent pointer-events-none" />
        {Icon && <Icon size={14} className="text-cyan-200 shrink-0 drop-shadow" />}
        <span className="font-sans font-bold text-[13px] text-white tracking-wide truncate flex-1 [text-shadow:0_0_8px_rgba(255,255,255,0.85),0_1px_2px_#000]">
          {title}
        </span>
        <div className="flex items-center gap-1">
          <button
            aria-label="minimize"
            className="w-7 h-5 rounded-sm bg-white/20 border border-white/30 hover:bg-white/40 flex items-center justify-center text-white drop-shadow cursor-pointer transition-all"
          >
            <Minus size={11} />
          </button>
          <button
            aria-label="maximize"
            className="w-7 h-5 rounded-sm bg-white/20 border border-white/30 hover:bg-white/40 flex items-center justify-center text-white drop-shadow cursor-pointer transition-all"
          >
            <Square size={9} />
          </button>
          <button
            aria-label="close"
            onClick={onClose}
            className="w-10 h-5 rounded-sm bg-gradient-to-b from-red-400/80 to-red-600/90 border border-red-300/60 hover:brightness-125 flex items-center justify-center text-white drop-shadow shadow-[0_0_8px_rgba(255,50,50,0.6)] cursor-pointer transition-all"
          >
            <X size={12} />
          </button>
        </div>
      </div>
    );
  }

  // Windows XP Signature Luna Titlebar (Default)
  return (
    <div className="flex items-center gap-2 px-2 py-1 bg-gradient-to-b from-[#0058ee] via-[#0055e5] to-[#0030a8] border-t border-t-[#3593ff] rounded-t-md select-none shrink-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]">
      {Icon && <Icon size={14} className="text-white shrink-0 drop-shadow" />}
      <span className="font-sans font-bold text-[13px] text-white tracking-wide truncate flex-1 [text-shadow:1px_1px_1px_#0a246a]">
        {title}
      </span>
      <div className="flex items-center gap-1">
        <button
          aria-label="minimize"
          className="w-5 h-5 rounded-sm bg-gradient-to-b from-[#3593ff] to-[#0045d0] border border-white/40 flex items-center justify-center text-white font-bold cursor-pointer hover:brightness-110 active:brightness-90 shadow-sm"
          tabIndex={-1}
        >
          <Minus size={11} />
        </button>
        <button
          aria-label="maximize"
          className="w-5 h-5 rounded-sm bg-gradient-to-b from-[#3593ff] to-[#0045d0] border border-white/40 flex items-center justify-center text-white font-bold cursor-pointer hover:brightness-110 active:brightness-90 shadow-sm"
          tabIndex={-1}
        >
          <Square size={9} />
        </button>
        <button
          aria-label="close"
          onClick={onClose}
          data-testid={onClose ? "window-close-button" : undefined}
          className="w-5 h-5 rounded-sm bg-gradient-to-b from-[#e81123] to-[#b70a17] border border-white/50 flex items-center justify-center text-white font-black cursor-pointer hover:brightness-125 active:brightness-90 shadow-sm"
        >
          <X size={12} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
};

export const Win98Window = ({ title, icon, onClose, dark, children, className, testid }) => {
  const { theme } = useTheme();

  const getWindowWrapperClass = () => {
    switch (theme) {
      case "win7":
        return "rounded-xl border border-white/40 bg-[#122b44]/80 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.6)]";
      case "win8":
        return "rounded-none border-2 border-[#0b7a75] bg-[#1d1d1d] shadow-[0_8px_24px_rgba(0,0,0,0.7)]";
      case "win10":
        return "rounded-none border border-white/20 bg-[#1f1f1f] shadow-[0_12px_32px_rgba(0,0,0,0.85)]";
      case "win11":
        return "rounded-2xl border border-white/15 bg-[#1e1e2e]/90 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.75)]";
      case "ubuntu":
        return "rounded-lg border border-black/60 bg-[#2b2b2b] shadow-[0_14px_45px_rgba(0,0,0,0.8)]";
      case "xp":
      default:
        return "rounded-t-lg border-3 border-[#0055ea] bg-[#ece9d8] shadow-[0_10px_30px_rgba(0,0,0,0.6)]";
    }
  };

  return (
    <div
      data-testid={testid}
      className={cn(getWindowWrapperClass(), "flex flex-col overflow-hidden", className)}
      style={{ maxHeight: "min(92dvh, 92vh)" }}
      role="dialog"
      aria-label={title}
    >
      <TitleBar title={title} icon={icon} onClose={onClose} dark={dark} />
      <div className="flex-1 min-h-0 overflow-y-auto" data-lenis-prevent>
        {children}
      </div>
    </div>
  );
};

export const CRTOverlay = () => {
  const { theme } = useTheme();
  // Only show intense CRT scanlines in XP/retro mode
  if (theme !== "xp") return null;

  return (
    <>
      <div className="crt-glass" />
      <div className="crt-vignette" />
    </>
  );
};

export const PendingNote = ({ label = "FIELD NOTES PENDING" }) => (
  <p className="font-vt text-[15px] text-[#ffb000]/70 border border-dashed border-[#ffb000]/40 px-3 py-2">
    [ {label} — Yug is transcribing these from his build logs. Numbers intentionally absent until verified. ]
  </p>
);
