import React from "react";
import { useTheme } from "@/context/ThemeContext";
import {
  Sparkles,
  BookOpen,
  FileText,
  FlaskConical,
  Bot,
  User,
  Sliders,
  Terminal as TerminalIcon,
  HardDrive,
  Folder,
  Layers,
  Settings as SettingsIcon,
  Video,
  Camera,
} from "lucide-react";

/**
 * High-fidelity OS-specific icons for XP, Win7, Win8, Win10, Win11, and Ubuntu.
 */

// 1. COMPUTER / MEET YUG
export const OSComputerIcon = ({ size = 32, className = "" }) => {
  const { theme } = useTheme();

  // Ubuntu 24.04: Authentic Yaru Home Folder / Files Squircle
  if (theme === "ubuntu") {
    return (
      <div className={`relative flex items-center justify-center rounded-[24%] bg-gradient-to-b from-[#e95420] to-[#b3370b] shadow-md border border-black/30 ${className}`} style={{ width: size, height: size }}>
        <Folder size={size * 0.58} className="text-white drop-shadow" />
        <span className="absolute -bottom-0.5 right-0.5 w-2.5 h-2.5 rounded-full bg-white border border-[#b3370b] flex items-center justify-center text-[7px] font-bold text-[#b3370b]">
          Y
        </span>
      </div>
    );
  }

  // Windows 11: Modern Fluent Display
  if (theme === "win11") {
    return (
      <div className={`relative flex items-center justify-center rounded-xl bg-gradient-to-br from-sky-400/20 via-blue-500/25 to-indigo-600/30 border border-sky-300/40 shadow-md backdrop-blur-sm ${className}`} style={{ width: size, height: size }}>
        <div className="w-[72%] h-[60%] rounded-md bg-gradient-to-b from-sky-300 to-blue-600 p-[1px] shadow">
          <div className="w-full h-full bg-[#182035] rounded-[5px] flex items-center justify-center">
            <div className="grid grid-cols-2 gap-[1.5px] w-2.5 h-2.5">
              <div className="bg-[#00a4ef] rounded-[0.5px]" />
              <div className="bg-[#00a4ef] rounded-[0.5px]" />
              <div className="bg-[#00a4ef] rounded-[0.5px]" />
              <div className="bg-[#00a4ef] rounded-[0.5px]" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Windows 10: Fluent Wireframe PC
  if (theme === "win10") {
    return (
      <div className={`flex items-center justify-center bg-[#1f1f1f] border border-white/20 shadow-sm ${className}`} style={{ width: size, height: size }}>
        <HardDrive size={size * 0.6} className="text-[#0078d7]" />
      </div>
    );
  }

  // Windows 8: Metro Flat Square Tile
  if (theme === "win8") {
    return (
      <div className={`flex items-center justify-center bg-[#0b7a75] shadow-sm ${className}`} style={{ width: size, height: size }}>
        <Sparkles size={size * 0.58} className="text-white" />
      </div>
    );
  }

  // Windows 7: Aero Glossy 3D Monitor
  if (theme === "win7") {
    return (
      <div className={`relative flex items-center justify-center rounded-lg bg-gradient-to-b from-white/30 via-sky-200/20 to-sky-600/30 border border-white/50 shadow-md backdrop-blur-sm ${className}`} style={{ width: size, height: size }}>
        <div className="w-[75%] h-[62%] rounded bg-gradient-to-b from-slate-200 to-slate-400 p-[1.5px] shadow-sm">
          <div className="w-full h-full bg-gradient-to-br from-sky-400 to-[#123a6b] rounded-sm flex items-center justify-center">
            <Sparkles size={size * 0.35} className="text-white drop-shadow" />
          </div>
        </div>
      </div>
    );
  }

  // Windows XP: Pixelated CRT Computer
  return (
    <div className={`bevel flex items-center justify-center bg-[#c0c0c0] ${className}`} style={{ width: size, height: size }}>
      <div className="w-[70%] h-[65%] border-2 border-[#404040] bg-[#008080] flex items-center justify-center shadow-inner">
        <span className="font-vt text-[11px] text-yellow-300 font-bold leading-none">XP</span>
      </div>
    </div>
  );
};

// 2. TERMINAL / ASK YUG
export const OSTerminalIcon = ({ size = 32, className = "" }) => {
  const { theme } = useTheme();

  if (theme === "ubuntu") {
    return (
      <div className={`flex items-center justify-center rounded-[24%] bg-gradient-to-b from-[#300a24] to-[#1e0517] border border-black/40 shadow-md ${className}`} style={{ width: size, height: size }}>
        <span className="font-mono font-bold text-xs text-[#e95420] tracking-tight">{">_"}</span>
      </div>
    );
  }

  if (theme === "win11") {
    return (
      <div className={`flex items-center justify-center rounded-xl bg-gradient-to-br from-[#1e1e2e] to-[#0f111a] border border-white/20 shadow-md ${className}`} style={{ width: size, height: size }}>
        <span className="font-mono font-bold text-xs text-sky-400">{">_"}</span>
      </div>
    );
  }

  if (theme === "win10") {
    return (
      <div className={`flex items-center justify-center bg-[#0c0c0c] border border-white/25 shadow-sm ${className}`} style={{ width: size, height: size }}>
        <TerminalIcon size={size * 0.55} className="text-[#0078d7]" />
      </div>
    );
  }

  if (theme === "win8") {
    return (
      <div className={`flex items-center justify-center bg-[#0078d7] shadow-sm ${className}`} style={{ width: size, height: size }}>
        <Bot size={size * 0.58} className="text-white" />
      </div>
    );
  }

  if (theme === "win7") {
    return (
      <div className={`flex items-center justify-center rounded-lg bg-gradient-to-b from-white/25 via-slate-800 to-black border border-white/40 shadow-md ${className}`} style={{ width: size, height: size }}>
        <span className="font-mono text-xs text-emerald-400 font-bold drop-shadow">{">_"}</span>
      </div>
    );
  }

  // Windows XP: MS-DOS Prompt Icon
  return (
    <div className={`bevel flex items-center justify-center bg-[#c0c0c0] ${className}`} style={{ width: size, height: size }}>
      <div className="w-[75%] h-[68%] bg-black border border-[#808080] flex items-center justify-center">
        <span className="font-vt text-[13px] text-[#33ff33] font-black leading-none">C:\&gt;</span>
      </div>
    </div>
  );
};

// 3. STORY MODE
export const OSStoryIcon = ({ size = 32, className = "" }) => {
  const { theme } = useTheme();

  if (theme === "ubuntu") {
    return (
      <div className={`flex items-center justify-center rounded-[24%] bg-gradient-to-b from-[#77216b] to-[#4a0f36] border border-black/40 shadow-md ${className}`} style={{ width: size, height: size }}>
        <BookOpen size={size * 0.56} className="text-white drop-shadow" />
      </div>
    );
  }

  if (theme === "win11") {
    return (
      <div className={`flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-600/30 border border-indigo-400/30 shadow-md backdrop-blur-sm ${className}`} style={{ width: size, height: size }}>
        <BookOpen size={size * 0.55} className="text-indigo-300 drop-shadow" />
      </div>
    );
  }

  if (theme === "win8") {
    return (
      <div className={`flex items-center justify-center bg-[#5c2d91] shadow-sm ${className}`} style={{ width: size, height: size }}>
        <BookOpen size={size * 0.58} className="text-white" />
      </div>
    );
  }

  if (theme === "win7") {
    return (
      <div className={`flex items-center justify-center rounded-lg bg-gradient-to-b from-white/30 via-indigo-500/25 to-indigo-800/40 border border-white/40 shadow-md backdrop-blur-sm ${className}`} style={{ width: size, height: size }}>
        <BookOpen size={size * 0.55} className="text-sky-200 drop-shadow" />
      </div>
    );
  }

  return (
    <div className={`bevel flex items-center justify-center bg-[#c0c0c0] ${className}`} style={{ width: size, height: size }}>
      <BookOpen size={size * 0.6} className="text-[#000080]" />
    </div>
  );
};

// 4. RECRUITER / RESUME
export const OSResumeIcon = ({ size = 32, className = "" }) => {
  const { theme } = useTheme();

  if (theme === "ubuntu") {
    return (
      <div className={`flex items-center justify-center rounded-[24%] bg-gradient-to-b from-[#e95420] via-[#c94514] to-[#99340f] border border-black/40 shadow-md ${className}`} style={{ width: size, height: size }}>
        <FileText size={size * 0.56} className="text-white drop-shadow" />
      </div>
    );
  }

  if (theme === "win11") {
    return (
      <div className={`flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/25 border border-cyan-400/30 shadow-md backdrop-blur-sm ${className}`} style={{ width: size, height: size }}>
        <FileText size={size * 0.55} className="text-cyan-300 drop-shadow" />
      </div>
    );
  }

  if (theme === "win8") {
    return (
      <div className={`flex items-center justify-center bg-[#d83b01] shadow-sm ${className}`} style={{ width: size, height: size }}>
        <FileText size={size * 0.58} className="text-white" />
      </div>
    );
  }

  if (theme === "win7") {
    return (
      <div className={`flex items-center justify-center rounded-lg bg-gradient-to-b from-white/35 via-blue-400/25 to-blue-700/35 border border-white/45 shadow-md backdrop-blur-sm ${className}`} style={{ width: size, height: size }}>
        <FileText size={size * 0.55} className="text-white drop-shadow" />
      </div>
    );
  }

  // Windows XP: Notepad text document with blue bar
  return (
    <div className={`bevel flex items-center justify-center bg-[#c0c0c0] ${className}`} style={{ width: size, height: size }}>
      <div className="w-[65%] h-[72%] bg-white border border-[#404040] shadow-sm p-1 flex flex-col gap-0.5">
        <div className="w-full h-1 bg-[#000080]" />
        <div className="w-3/4 h-[1px] bg-gray-400" />
        <div className="w-full h-[1px] bg-gray-400" />
        <div className="w-1/2 h-[1px] bg-gray-400" />
      </div>
    </div>
  );
};

// 5. BUILDER LAB / ENGINEERING DOSSIERS
export const OSLabIcon = ({ size = 32, className = "" }) => {
  const { theme } = useTheme();

  if (theme === "ubuntu") {
    return (
      <div className={`flex items-center justify-center rounded-[24%] bg-gradient-to-b from-[#5e2750] to-[#3a1531] border border-black/40 shadow-md ${className}`} style={{ width: size, height: size }}>
        <FlaskConical size={size * 0.56} className="text-[#e95420] drop-shadow" />
      </div>
    );
  }

  if (theme === "win11") {
    return (
      <div className={`flex items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-600/30 border border-emerald-400/30 shadow-md backdrop-blur-sm ${className}`} style={{ width: size, height: size }}>
        <FlaskConical size={size * 0.55} className="text-emerald-300 drop-shadow" />
      </div>
    );
  }

  if (theme === "win8") {
    return (
      <div className={`flex items-center justify-center bg-[#107c41] shadow-sm ${className}`} style={{ width: size, height: size }}>
        <FlaskConical size={size * 0.58} className="text-white" />
      </div>
    );
  }

  if (theme === "win7") {
    return (
      <div className={`flex items-center justify-center rounded-lg bg-gradient-to-b from-white/35 via-teal-400/25 to-teal-800/35 border border-white/45 shadow-md backdrop-blur-sm ${className}`} style={{ width: size, height: size }}>
        <FlaskConical size={size * 0.55} className="text-emerald-200 drop-shadow" />
      </div>
    );
  }

  return (
    <div className={`bevel flex items-center justify-center bg-[#c0c0c0] ${className}`} style={{ width: size, height: size }}>
      <FlaskConical size={size * 0.6} className="text-[#005a5a]" />
    </div>
  );
};

// 6. ABOUT YUG / USER
export const OSUserIcon = ({ size = 32, className = "" }) => {
  const { theme } = useTheme();

  if (theme === "ubuntu") {
    return (
      <div className={`flex items-center justify-center rounded-[24%] bg-gradient-to-b from-[#3e3e3e] to-[#222222] border border-black/40 shadow-md ${className}`} style={{ width: size, height: size }}>
        <User size={size * 0.56} className="text-white drop-shadow" />
      </div>
    );
  }

  if (theme === "win11") {
    return (
      <div className={`flex items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-600/30 border border-purple-400/30 shadow-md backdrop-blur-sm ${className}`} style={{ width: size, height: size }}>
        <User size={size * 0.55} className="text-purple-300 drop-shadow" />
      </div>
    );
  }

  if (theme === "win8") {
    return (
      <div className={`flex items-center justify-center bg-[#68217a] shadow-sm ${className}`} style={{ width: size, height: size }}>
        <User size={size * 0.58} className="text-white" />
      </div>
    );
  }

  if (theme === "win7") {
    return (
      <div className={`flex items-center justify-center rounded-lg bg-gradient-to-b from-white/35 via-sky-300/25 to-sky-600/35 border border-white/45 shadow-md backdrop-blur-sm ${className}`} style={{ width: size, height: size }}>
        <User size={size * 0.55} className="text-white drop-shadow" />
      </div>
    );
  }

  return (
    <div className={`bevel flex items-center justify-center bg-[#c0c0c0] ${className}`} style={{ width: size, height: size }}>
      <User size={size * 0.6} className="text-[#000080]" />
    </div>
  );
};

// 7. SETTINGS / CONTROL PANEL
export const OSSettingsIcon = ({ size = 32, className = "" }) => {
  const { theme } = useTheme();

  if (theme === "ubuntu") {
    return (
      <div className={`flex items-center justify-center rounded-[24%] bg-gradient-to-b from-[#484848] to-[#262626] border border-black/40 shadow-md ${className}`} style={{ width: size, height: size }}>
        <Sliders size={size * 0.56} className="text-[#e95420] drop-shadow" />
      </div>
    );
  }

  if (theme === "win11") {
    return (
      <div className={`flex items-center justify-center rounded-xl bg-gradient-to-br from-slate-400/20 to-slate-600/30 border border-slate-400/30 shadow-md backdrop-blur-sm ${className}`} style={{ width: size, height: size }}>
        <SettingsIcon size={size * 0.55} className="text-slate-200 drop-shadow" />
      </div>
    );
  }

  if (theme === "win8") {
    return (
      <div className={`flex items-center justify-center bg-[#008272] shadow-sm ${className}`} style={{ width: size, height: size }}>
        <SettingsIcon size={size * 0.58} className="text-white" />
      </div>
    );
  }

  if (theme === "win7") {
    return (
      <div className={`flex items-center justify-center rounded-lg bg-gradient-to-b from-white/35 via-amber-300/25 to-blue-700/35 border border-white/45 shadow-md backdrop-blur-sm ${className}`} style={{ width: size, height: size }}>
        <SettingsIcon size={size * 0.55} className="text-cyan-200 drop-shadow" />
      </div>
    );
  }

  // Windows XP: Control Panel Folder with Gear
  return (
    <div className={`bevel flex items-center justify-center bg-[#c0c0c0] ${className}`} style={{ width: size, height: size }}>
      <div className="w-[70%] h-[65%] bg-[#ffcc00] border border-[#806600] flex items-center justify-center">
        <SettingsIcon size={size * 0.4} className="text-[#000080]" />
      </div>
    </div>
  );
};

// 8. INTERVIEW YUG / VIDEO CALL (3D AVATAR)
export const OSInterviewIcon = ({ size = 32, className = "" }) => {
  const { theme } = useTheme();

  // Ubuntu: Yaru Aubergine Squircle with Orange Camera
  if (theme === "ubuntu") {
    return (
      <div className={`relative flex items-center justify-center rounded-[24%] bg-gradient-to-b from-[#77216b] to-[#4a0f36] border border-black/40 shadow-md ${className}`} style={{ width: size, height: size }}>
        <Video size={size * 0.58} className="text-[#e95420] drop-shadow" />
        <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
      </div>
    );
  }

  // Windows 11: Modern Fluent Glass Video Meet
  if (theme === "win11") {
    return (
      <div className={`relative flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/25 via-sky-500/30 to-blue-600/40 border border-sky-300/40 shadow-lg backdrop-blur-md ${className}`} style={{ width: size, height: size }}>
        <Video size={size * 0.58} className="text-sky-300 drop-shadow" />
        <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-emerald-400/40 animate-pulse" />
      </div>
    );
  }

  // Windows 10: Clean Flat Dark Video Tile
  if (theme === "win10") {
    return (
      <div className={`relative flex items-center justify-center bg-[#252525] border border-white/20 shadow-sm ${className}`} style={{ width: size, height: size }}>
        <Video size={size * 0.58} className="text-[#0078d7]" />
        <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-emerald-400" />
      </div>
    );
  }

  // Windows 8: Metro Flat Purple/Teal Video Tile
  if (theme === "win8") {
    return (
      <div className={`relative flex items-center justify-center bg-[#68217a] shadow-sm ${className}`} style={{ width: size, height: size }}>
        <Video size={size * 0.6} className="text-white" />
        <span className="absolute bottom-0.5 right-0.5 w-1.5 h-1.5 bg-emerald-400" />
      </div>
    );
  }

  // Windows 7: Aero Glass Glossy Video Camera
  if (theme === "win7") {
    return (
      <div className={`relative flex items-center justify-center rounded-lg bg-gradient-to-b from-white/45 via-sky-300/30 to-blue-700/40 border border-white/50 shadow-md backdrop-blur-sm ${className}`} style={{ width: size, height: size }}>
        <Video size={size * 0.56} className="text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]" />
        <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-400 border border-white/70 shadow" />
      </div>
    );
  }

  // Windows XP: Retro Beveled Webcam with Red REC Light
  return (
    <div className={`bevel flex items-center justify-center bg-[#c0c0c0] relative ${className}`} style={{ width: size, height: size }}>
      <Video size={size * 0.52} className="text-[#000080]" />
      <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-red-600 border border-black animate-pulse" />
    </div>
  );
};



// 9. GALLERY / SPOTTED IN THE WILD
export const OSGalleryIcon = ({ size = 32, className = "" }) => {
  const { theme } = useTheme();

  // Ubuntu 24.04: Authentic Yaru Photos / Camera Squircle
  if (theme === "ubuntu") {
    return (
      <div className={`relative flex items-center justify-center rounded-[24%] bg-gradient-to-b from-[#2c001e] to-[#77216f] shadow-md border border-black/30 ${className}`} style={{ width: size, height: size }}>
        <Camera size={size * 0.58} className="text-[#e95420] drop-shadow" />
        <span className="absolute -bottom-0.5 right-0.5 w-2 h-2 rounded-full bg-[#38b44a]" />
      </div>
    );
  }

  // Windows 11: Fluent Photos / Camera
  if (theme === "win11") {
    return (
      <div className={`relative flex items-center justify-center rounded-xl bg-gradient-to-br from-amber-400/25 via-rose-500/30 to-purple-600/35 border border-amber-300/40 shadow-md backdrop-blur-sm ${className}`} style={{ width: size, height: size }}>
        <Camera size={size * 0.58} className="text-amber-200 drop-shadow" />
      </div>
    );
  }

  // Windows 10: Metro Flat Photos Tile
  if (theme === "win10") {
    return (
      <div className={`relative flex items-center justify-center bg-[#008272] border border-white/20 shadow-sm ${className}`} style={{ width: size, height: size }}>
        <Camera size={size * 0.58} className="text-white" />
      </div>
    );
  }

  // Windows 8: Metro Flat Cyan Tile
  if (theme === "win8") {
    return (
      <div className={`relative flex items-center justify-center bg-[#00a4a6] shadow-sm ${className}`} style={{ width: size, height: size }}>
        <Camera size={size * 0.6} className="text-white" />
      </div>
    );
  }

  // Windows 7: Aero Glass Polaroid / Photo Frame
  if (theme === "win7") {
    return (
      <div className={`relative flex items-center justify-center rounded-lg bg-gradient-to-b from-white/50 via-amber-200/30 to-amber-600/40 border border-white/50 shadow-md backdrop-blur-sm ${className}`} style={{ width: size, height: size }}>
        <Camera size={size * 0.56} className="text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]" />
      </div>
    );
  }

  // Windows XP: Retro Beveled Camera
  return (
    <div className={`bevel flex items-center justify-center bg-[#c0c0c0] relative ${className}`} style={{ width: size, height: size }}>
      <Camera size={size * 0.52} className="text-[#800080]" />
      <span className="absolute bottom-0.5 right-0.5 w-1.5 h-1.5 bg-[#008000] border border-black" />
    </div>
  );
};
