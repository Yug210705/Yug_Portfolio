import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

export const OSSwitchTransition = () => {
  const { switching, targetTheme } = useTheme();

  if (!switching || !targetTheme) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[150] flex flex-col items-center justify-center select-none"
        style={{
          background:
            targetTheme === "ubuntu"
              ? "#2c001e"
              : targetTheme === "win8"
              ? "#0b7a75"
              : targetTheme === "win11"
              ? "#0f111a"
              : "#000000",
        }}
      >
        {/* Windows XP Splash */}
        {targetTheme === "xp" && (
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="font-sans font-bold text-3xl tracking-tight text-white">Microsoft</span>
              <span className="font-sans font-black text-4xl text-[#245edb]">Windows</span>
              <span className="font-sans font-black italic text-4xl text-[#ff5722]">XP</span>
            </div>
            {/* The 3 blue scrolling blocks */}
            <div className="w-56 h-4 border-2 border-[#555] rounded-full p-[2px] overflow-hidden bg-black flex">
              <motion.div
                animate={{ x: [-80, 240] }}
                transition={{ repeat: Infinity, duration: 1.1, ease: "linear" }}
                className="flex gap-1"
              >
                <div className="w-4 h-full bg-[#3593ff] rounded-sm" />
                <div className="w-4 h-full bg-[#245edb] rounded-sm" />
                <div className="w-4 h-full bg-[#1941a5] rounded-sm" />
              </motion.div>
            </div>
            <p className="font-vt text-sm text-[#aaa] mt-2">Loading Windows XP Luna Experience...</p>
          </div>
        )}

        {/* Windows 7 Splash */}
        {targetTheme === "win7" && (
          <div className="flex flex-col items-center gap-8">
            <div className="relative w-20 h-20">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
                className="absolute inset-0 grid grid-cols-2 gap-2"
              >
                <span className="w-8 h-8 rounded-full bg-[#e81123] blur-[2px] shadow-[0_0_15px_#e81123]" />
                <span className="w-8 h-8 rounded-full bg-[#00a4ef] blur-[2px] shadow-[0_0_15px_#00a4ef]" />
                <span className="w-8 h-8 rounded-full bg-[#7fba00] blur-[2px] shadow-[0_0_15px_#7fba00]" />
                <span className="w-8 h-8 rounded-full bg-[#ffb900] blur-[2px] shadow-[0_0_15px_#ffb900]" />
              </motion.div>
            </div>
            <div className="text-center">
              <h2 className="font-sans text-2xl text-white tracking-wider font-light">Starting Windows</h2>
              <p className="font-sans text-xs text-sky-300/70 mt-1">Applying Aero Glass Interface...</p>
            </div>
          </div>
        )}

        {/* Windows 8 Splash */}
        {targetTheme === "win8" && (
          <div className="flex flex-col items-center gap-8">
            <div className="grid grid-cols-2 gap-1.5 w-16 h-16 -skew-y-3">
              <div className="bg-white/95" />
              <div className="bg-white/95" />
              <div className="bg-white/95" />
              <div className="bg-white/95" />
            </div>
            <div className="flex gap-2">
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  animate={{ scale: [0.6, 1.4, 0.6], opacity: [0.3, 1, 0.3] }}
                  transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.15 }}
                  className="w-2.5 h-2.5 rounded-full bg-white"
                />
              ))}
            </div>
            <p className="font-sans text-sm text-white/80">Loading Windows 8 Modern UI...</p>
          </div>
        )}

        {/* Windows 10 Splash */}
        {targetTheme === "win10" && (
          <div className="flex flex-col items-center gap-8">
            <div className="grid grid-cols-2 gap-1.5 w-16 h-16">
              <div className="bg-[#0078d7]" />
              <div className="bg-[#0078d7]" />
              <div className="bg-[#0078d7]" />
              <div className="bg-[#0078d7]" />
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="w-10 h-10 border-2 border-white/20 border-t-white rounded-full"
            />
            <p className="font-sans text-sm text-white/70">Welcome to Windows 10...</p>
          </div>
        )}

        {/* Windows 11 Splash */}
        {targetTheme === "win11" && (
          <div className="flex flex-col items-center gap-8">
            <div className="grid grid-cols-2 gap-1.5 w-16 h-16">
              <div className="bg-[#0067b8] rounded-sm" />
              <div className="bg-[#0067b8] rounded-sm" />
              <div className="bg-[#0067b8] rounded-sm" />
              <div className="bg-[#0067b8] rounded-sm" />
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "linear" }}
              className="w-12 h-12 border-3 border-sky-500/20 border-t-sky-400 rounded-full"
            />
            <p className="font-sans text-sm text-sky-200/80 font-light">Starting Windows 11 Fluent...</p>
          </div>
        )}

        {/* Ubuntu Splash */}
        {targetTheme === "ubuntu" && (
          <div className="flex flex-col items-center gap-6">
            <div className="w-20 h-20 rounded-full border-4 border-[#e95420] flex items-center justify-center p-3">
              <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center">
                <span className="w-4 h-4 rounded-full bg-[#e95420]" />
              </div>
            </div>
            <div className="text-center">
              <h2 className="font-sans text-3xl font-bold text-white tracking-wide">ubuntu</h2>
              <p className="font-sans text-xs text-[#e95420] mt-1 font-mono">24.04 LTS · GNOME Yaru</p>
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="w-7 h-7 border-2 border-orange-500/20 border-t-[#e95420] rounded-full"
            />
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
