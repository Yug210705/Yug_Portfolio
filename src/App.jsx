import { useCallback, useEffect, useRef, useState } from "react";
import { MotionConfig } from "framer-motion";
import Lenis from "lenis";
import "@/App.css";
import ErrorBoundary from "@/components/ErrorBoundary";
import Boot from "@/components/Boot";
import Desktop from "@/components/Desktop";
import StoryMode from "@/components/StoryMode";
import RecruiterMode from "@/components/RecruiterMode";
import BuilderMode from "@/components/BuilderMode";
import Taskbar from "@/components/Taskbar";
import VoiceLayer from "@/components/VoiceLayer";
import Terminal from "@/components/Terminal";
import SettingsWindow from "@/components/SettingsWindow";
import InterviewModal from "@/components/InterviewModal";
import MobileApp from "@/components/MobileApp";
import GuideTourBox from "@/components/GuideTourBox";
import { ThemeProvider, useTheme } from "@/context/ThemeContext";
import { OSSwitchTransition } from "@/components/OSSwitchTransition";

const PHASES = ["desktop", "story", "recruiter", "builder"];
const hashToPhase = () => {
  const h = window.location.hash.replace("#", "");
  return PHASES.includes(h) ? h : "desktop";
};

function AppInner() {
  const [phase, setPhase] = useState(() =>
    sessionStorage.getItem("yug_booted") ? hashToPhase() : "boot"
  );
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 768;
    }
    return false;
  });
  const [forceDesktop, setForceDesktop] = useState(false);
  const [voiceOpen, setVoiceOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [interviewOpen, setInterviewOpen] = useState(false);
  const [builderProject, setBuilderProject] = useState(null);
  const lenisRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const goMode = useCallback((mode) => {
    setBuilderProject(null);
    setPhase(PHASES.includes(mode) ? mode : "desktop");
    if (window.location.hash !== `#${mode}`) window.location.hash = PHASES.includes(mode) ? mode : "";
  }, []);

  const goBuilder = useCallback((projectId) => {
    setBuilderProject(projectId);
    setPhase("builder");
    window.location.hash = "builder";
  }, []);

  const restartBoot = useCallback(() => {
    sessionStorage.removeItem("yug_booted");
    setPhase("boot");
    window.location.hash = "";
  }, []);

  useEffect(() => {
    const onHash = () => {
      if (phase !== "boot") setPhase(hashToPhase());
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [phase]);

  useEffect(() => {
    if (phase === "boot") return;
    sessionStorage.setItem("yug_booted", "1");
    window.scrollTo(0, 0);
  }, [phase]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (phase !== "story" || reduced) return undefined;
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    lenisRef.current = lenis;
    let raf;
    const loop = (t) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [phase]);

  return (
    <MotionConfig reducedMotion="user">
      <ErrorBoundary>
        <OSSwitchTransition />

        {isMobile && !forceDesktop ? (
          <>
            <MobileApp
              onOpenInterview={() => setInterviewOpen(true)}
              onOpenTerminal={() => setTerminalOpen(true)}
              onSwitchDesktop={() => {
                sessionStorage.setItem("yug_booted", "1");
                setForceDesktop(true);
              }}
            />
            <Terminal open={terminalOpen} onClose={() => setTerminalOpen(false)} />
            <InterviewModal open={interviewOpen} onClose={() => setInterviewOpen(false)} />
          </>
        ) : (
          <>
            {isMobile && forceDesktop && (
              <button
                onClick={() => setForceDesktop(false)}
                className="fixed top-2 right-2 z-[999] px-3 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-sans text-xs font-semibold shadow-2xl flex items-center gap-1.5 border border-white/20 cursor-pointer backdrop-blur-md"
              >
                <span>📱 Switch to Mobile App</span>
              </button>
            )}

            {phase === "boot" && (
              <Boot
                onDone={() => {
                  if (window.location.hash) window.location.hash = "";
                  setPhase("desktop");
                }}
              />
            )}

            {phase !== "boot" && (
              <>
                {phase === "desktop" && (
                  <Desktop
                    goMode={goMode}
                    restartBoot={restartBoot}
                    onAskYug={() => setTerminalOpen(true)}
                    openSettings={() => setSettingsOpen(true)}
                    openInterview={() => setInterviewOpen(true)}
                  />
                )}
                {phase === "story" && <StoryMode onOpenVoice={() => setVoiceOpen(true)} />}
                {phase === "recruiter" && <RecruiterMode goMode={goMode} goBuilder={goBuilder} />}
                {phase === "builder" && <BuilderMode goMode={goMode} initialProject={builderProject} />}

                <Taskbar
                  phase={phase}
                  goMode={goMode}
                  openChooser={goMode.bind(null, "desktop")}
                  restartBoot={restartBoot}
                  voiceOpen={voiceOpen}
                  setVoiceOpen={setVoiceOpen}
                  askYug={() => setTerminalOpen(true)}
                  openSettings={() => setSettingsOpen(true)}
                  openInterview={() => setInterviewOpen(true)}
                  interviewOpen={interviewOpen}
                />
                <VoiceLayer open={voiceOpen} setOpen={setVoiceOpen} />
                <Terminal open={terminalOpen} onClose={() => setTerminalOpen(false)} />
                <SettingsWindow open={settingsOpen} onClose={() => setSettingsOpen(false)} />
                <InterviewModal open={interviewOpen} onClose={() => setInterviewOpen(false)} />
                <GuideTourBox />
              </>
            )}
          </>
        )}
      </ErrorBoundary>
    </MotionConfig>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  );
}

export default App;
