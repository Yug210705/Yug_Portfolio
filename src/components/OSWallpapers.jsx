import { useTheme } from "@/context/ThemeContext";

export const OSWallpaper = () => {
  const { theme } = useTheme();

  // Windows XP: Bliss
  if (theme === "xp") {
    return (
      <img
        src="/assets/wallpaper.jpeg"
        alt="Windows XP Bliss Wallpaper"
        aria-hidden
        className="wallpaper absolute inset-0 w-full h-full object-cover"
      />
    );
  }

  // Windows 7: Aero Crystal Energy
  if (theme === "win7") {
    return (
      <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-[#05182e] via-[#103a6b] to-[#2072b2]">
        {/* Aero light energy streaks */}
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_50%_40%,rgba(130,210,255,0.7)_0%,transparent_65%)]" />
        <div className="absolute -top-40 inset-x-0 h-[600px] opacity-35 bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,255,255,0.6)_0%,transparent_50%)]" />
        
        {/* Subtle Windows 7 4-color glowing center emblem */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-25">
          <div className="relative w-48 h-48 grid grid-cols-2 gap-3 transform -rotate-12 scale-110 blur-[1px]">
            <div className="rounded-tl-2xl bg-gradient-to-br from-[#ff5252] to-[#d50000] shadow-[0_0_30px_#ff5252]" />
            <div className="rounded-tr-2xl bg-gradient-to-br from-[#40c4ff] to-[#0091ea] shadow-[0_0_30px_#40c4ff]" />
            <div className="rounded-bl-2xl bg-gradient-to-br from-[#76ff03] to-[#64dd17] shadow-[0_0_30px_#76ff03]" />
            <div className="rounded-br-2xl bg-gradient-to-br from-[#ffd600] to-[#ffab00] shadow-[0_0_30px_#ffd600]" />
          </div>
        </div>
      </div>
    );
  }

  // Windows 8: Metro Geometric Teal
  if (theme === "win8") {
    return (
      <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-[#0b7a75] via-[#10567a] to-[#1a2332]">
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        {/* Large stylized angled 4-pane Windows 8 watermark */}
        <div className="absolute right-[8%] top-[20%] w-72 h-72 opacity-10 pointer-events-none grid grid-cols-2 gap-3 -skew-y-6">
          <div className="bg-white" />
          <div className="bg-white" />
          <div className="bg-white" />
          <div className="bg-white" />
        </div>
      </div>
    );
  }

  // Windows 10: Iconic Laser Window (Hero)
  if (theme === "win10") {
    return (
      <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-[#040c17] via-[#091b33] to-[#0a2344]">
        {/* Volumetric light streaks */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(0,120,215,0.45)_0%,transparent_70%)]" />
        <div className="absolute top-[25%] left-[30%] w-[550px] h-[350px] bg-gradient-to-r from-transparent via-[#00a4ef]/20 to-transparent transform -skew-x-12 blur-2xl pointer-events-none" />

        {/* Windows 10 Hero 4-pane window outline with laser glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
          <div className="grid grid-cols-2 gap-4 w-64 h-64 transform -perspective-[600px] rotate-y-[24deg] -skew-y-3">
            <div className="border-4 border-sky-400 bg-sky-500/10 shadow-[0_0_35px_rgba(0,180,255,0.7)]" />
            <div className="border-4 border-sky-400 bg-sky-500/10 shadow-[0_0_35px_rgba(0,180,255,0.7)]" />
            <div className="border-4 border-sky-400 bg-sky-500/10 shadow-[0_0_35px_rgba(0,180,255,0.7)]" />
            <div className="border-4 border-sky-400 bg-sky-500/10 shadow-[0_0_35px_rgba(0,180,255,0.7)]" />
          </div>
        </div>
      </div>
    );
  }

  // Windows 11: Bloom Blue Silk Petals
  if (theme === "win11") {
    return (
      <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-[#0a0f1d] via-[#10172b] to-[#161a33]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(66,133,244,0.3)_0%,rgba(123,97,255,0.15)_45%,transparent_75%)]" />

        {/* Windows 11 Bloom Silk Abstract Shape */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative w-96 h-96">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#0067b8] via-[#4a72d4] to-[#7b83d9] opacity-35 blur-3xl" />
            <div className="absolute inset-4 rounded-full bg-gradient-to-bl from-[#6b46c1] via-[#3182ce] to-[#63b3ed] opacity-40 blur-2xl transform rotate-45" />
            <div className="absolute inset-12 rounded-[40%] bg-gradient-to-r from-cyan-400 to-indigo-600 opacity-30 blur-xl transform -rotate-12" />
          </div>
        </div>
      </div>
    );
  }

  // Ubuntu 24.04: Jammy / Noble Aubergine & Orange
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-[#2c001e] via-[#5e2750] to-[#77216b]">
      {/* Orange atmospheric ambient glow */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] rounded-full bg-[#e95420]/25 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] rounded-full bg-[#77216b]/40 blur-2xl pointer-events-none" />

      {/* Official Ubuntu Circle of Friends Watermark */}
      <div className="absolute right-[12%] bottom-[15%] w-72 h-72 opacity-15 pointer-events-none flex items-center justify-center">
        <div className="relative w-64 h-64 rounded-full border-8 border-white flex items-center justify-center">
          <div className="w-24 h-24 rounded-full border-4 border-white" />
          <span className="absolute top-2 w-7 h-7 rounded-full bg-white" />
          <span className="absolute bottom-6 left-4 w-7 h-7 rounded-full bg-white" />
          <span className="absolute bottom-6 right-4 w-7 h-7 rounded-full bg-white" />
        </div>
      </div>
    </div>
  );
};
