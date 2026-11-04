import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Send,
  Sparkles,
  Layers,
  PhoneOff,
  Video,
  VideoOff,
  HelpCircle,
  Subtitles,
  ExternalLink,
  ChevronRight,
  Maximize2,
  Minimize2,
} from "lucide-react";
import AvatarCanvas from "./AvatarCanvas";
import { PRESET_QUESTIONS, getInterviewAnswer, getInterviewAnswerAsync, speechManager, getIntroductionText } from "@/lib/interviewEngine";
import { PROJECTS } from "@/data/content";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";

export default function InterviewModal({ open, onClose }) {
  const { theme } = useTheme();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [caption, setCaption] = useState("");
  const [currentWord, setCurrentWord] = useState("");
  const [userQuery, setUserQuery] = useState("");
  const [history, setHistory] = useState(() => [
    {
      role: "yug",
      text: getIntroductionText(),
      project: null,
    },
  ]);
  const [activeProject, setActiveProject] = useState(null);
  const [showArchDrawer, setShowArchDrawer] = useState(false);
  const [micMuted, setMicMuted] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [captionsEnabled, setCaptionsEnabled] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  const chatScrollRef = useRef(null);
  const recognitionRef = useRef(null);

  // Initialize with initial greeting speech when opened
  useEffect(() => {
    if (!open) {
      speechManager.stop();
      setIsSpeaking(false);
      return;
    }

    const currentIntro = getIntroductionText();
    setHistory((prev) => {
      if (prev.length <= 1) {
        return [{ role: "yug", text: currentIntro, project: null }];
      }
      return prev;
    });

    // Greet upon joining the interview
    const timer = setTimeout(() => {
      handleAnswer(currentIntro, null);
    }, 600);

    return () => {
      clearTimeout(timer);
      speechManager.stop();
    };
  }, [open]);

  // Keep chat scrolled to bottom
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [history, caption]);

  // Handle Speech Synthesis & Visemes
  const handleAnswer = useCallback(
    (text, projectId) => {
      if (projectId) {
        const found = PROJECTS.find((p) => p.id === projectId);
        if (found) {
          setActiveProject(found);
          setShowArchDrawer(true);
        }
      }

      setCaption("");
      setCurrentWord("");

      speechManager.speak(text, {
        onStart: () => setIsSpeaking(true),
        onCaption: (spoken, word) => {
          setCaption(spoken);
          setCurrentWord(word);
        },
        onEnd: () => {
          setIsSpeaking(false);
        },
      });
    },
    []
  );

  // Submit Interview Question
  const handleAsk = useCallback(
    async (query) => {
      const q = query || userQuery;
      if (!q.trim()) return;

      setUserQuery("");
      const userEntry = { role: "user", text: q };
      setHistory((prev) => [...prev, userEntry]);

      const { answer, project } = await getInterviewAnswerAsync(q);
      const yugEntry = { role: "yug", text: answer, project };

      setHistory((prev) => [...prev, yugEntry]);
      handleAnswer(answer, project);
    },
    [userQuery, handleAnswer]
  );

  // Mic dictation (Speech Recognition for voice questions)
  const toggleListening = useCallback(() => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Speech recognition is not supported in this browser. Please type your question.");
      return;
    }

    if (isListening) {
      if (recognitionRef.current) recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    const rec = new SpeechRec();
    rec.continuous = false;
    rec.interimResults = false;
    rec.lang = "en-US";

    rec.onstart = () => setIsListening(true);
    rec.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setUserQuery(transcript);
      handleAsk(transcript);
      setIsListening(false);
    };
    rec.onerror = () => setIsListening(false);
    rec.onend = () => setIsListening(false);

    recognitionRef.current = rec;
    rec.start();
  }, [isListening, handleAsk]);

  // Toggle Sound On/Off
  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    speechManager.setSoundEnabled(next);
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 sm:pb-24 bg-black/85 backdrop-blur-md"
        role="dialog"
        aria-label="Interview with Yug Pathak"
      >
        <motion.div
          initial={{ scale: 0.94, y: 15 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0 }}
          transition={{ type: "spring", stiffness: 280, damping: 26 }}
          className={cn(
            "relative w-full flex flex-col bg-[#14161f] border-0 sm:border border-white/20 shadow-2xl overflow-hidden transition-all duration-300",
            isMaximized
              ? "h-full max-w-full rounded-none"
              : "max-w-6xl h-full sm:h-[78vh] sm:max-h-[720px] rounded-none sm:rounded-2xl"
          )}
        >
          {/* Video Call Top Bar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-[#181a26] border-b border-white/10 select-none shrink-0">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              <div className="flex items-center gap-2">
                <span className="font-sans font-bold text-sm text-white tracking-wide">
                  YUG_MEET // Virtual Technical Interview
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] bg-white/10 text-white/80 font-mono">
                  Room #YP-CSE-888
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMaximized(!isMaximized)}
                className="w-7 h-7 rounded hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white cursor-pointer transition-colors"
                title={isMaximized ? "Restore window" : "Maximize window"}
              >
                {isMaximized ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
              </button>
              <button
                onClick={onClose}
                className="px-3 py-1 rounded-md bg-red-600/90 hover:bg-red-500 text-white font-sans text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow transition-all"
              >
                <PhoneOff size={13} />
                <span>Leave Interview</span>
              </button>
            </div>
          </div>

          {/* Main Content: Video Feed + Architecture Drawer */}
          <div className="flex-1 min-h-0 flex flex-col lg:flex-row overflow-hidden relative">
            {/* Left: 3D Visual Avatar Video Stream */}
            <div className="relative h-[44vh] sm:h-auto sm:flex-1 bg-black flex flex-col justify-center items-center overflow-hidden shrink-0 sm:shrink">
              <AvatarCanvas isSpeaking={isSpeaking} />

              {/* Real-time Subtitles / Closed Captions */}
              {captionsEnabled && caption && (
                <div className="absolute bottom-16 inset-x-4 sm:inset-x-8 z-20 pointer-events-none flex justify-center">
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-2xl px-4 py-2 rounded-xl bg-black/80 border border-white/15 backdrop-blur-md text-center shadow-xl"
                  >
                    <p className="text-sm sm:text-base font-sans text-white/95 leading-snug">
                      <span className="text-emerald-400 font-bold mr-2">Yug:</span>
                      {caption}
                      {currentWord && (
                        <span className="text-sky-300 font-semibold underline ml-1">
                          {currentWord}
                        </span>
                      )}
                    </p>
                  </motion.div>
                </div>
              )}

              {/* Picture-in-Picture: You (Interviewer) */}
              <div className="absolute top-4 right-4 z-20 hidden sm:block">
                <div className="w-28 h-20 rounded-xl bg-slate-900 border border-white/20 shadow-xl overflow-hidden relative flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-slate-800 border border-white/20 flex items-center justify-center text-white/80 font-bold text-xs">
                    YOU
                  </div>
                  <div className="absolute bottom-1 left-2 text-[9px] font-sans text-white/70">
                    Interviewer
                  </div>
                  <div className="absolute top-1.5 right-1.5 flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Live Interactive Architecture / Chat Drawer */}
            <div className="w-full lg:w-[380px] bg-[#161823] border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col flex-1 min-h-0 lg:h-full">
              {/* Drawer Tab Header */}
              <div className="flex items-center justify-between px-3 py-2 border-b border-white/10 bg-[#12141c]">
                <div className="flex items-center gap-2">
                  <Sparkles size={14} className="text-sky-400" />
                  <span className="font-sans font-semibold text-xs text-white">Interview Feed</span>
                </div>
                {activeProject && (
                  <button
                    onClick={() => setShowArchDrawer(!showArchDrawer)}
                    className="flex items-center gap-1 px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-400/30 text-[11px] font-medium cursor-pointer hover:bg-sky-500/30 transition-colors"
                  >
                    <Layers size={11} />
                    <span>{showArchDrawer ? "View Q&A" : "Architecture Slide"}</span>
                  </button>
                )}
              </div>

              {/* Architecture Slide-Out View OR Q&A Transcript */}
              {showArchDrawer && activeProject ? (
                <div className="flex-1 p-4 overflow-y-auto no-scrollbar bg-[#10121a]" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      LIVE SCREEN SHARE · ARCHITECTURE
                    </span>
                    <button
                      onClick={() => setShowArchDrawer(false)}
                      className="text-white/60 hover:text-white text-xs cursor-pointer"
                    >
                      ✕ Close
                    </button>
                  </div>
                  <h3 className="font-bold text-base text-white">{activeProject.name}</h3>
                  <div className="text-xs text-sky-400 font-mono mb-3">{activeProject.tag}</div>

                  {/* Architecture Node Diagram */}
                  {activeProject.arch_diagram && (
                    <div className="p-3 rounded-lg bg-black/60 border border-white/10 mb-3 text-center">
                      <div className="text-[11px] font-mono text-white/50 mb-1">SYSTEM TOPOLOGY</div>
                      <div className="inline-block px-2.5 py-1 rounded bg-sky-950 border border-sky-500 text-sky-200 text-xs font-mono font-semibold">
                        {activeProject.arch_diagram.top}
                      </div>
                      <div className="w-px h-3 bg-white/20 mx-auto my-1" />
                      <div className="flex flex-wrap justify-center gap-1.5">
                        {activeProject.arch_diagram.nodes.map((n) => (
                          <span
                            key={n}
                            className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 font-mono text-[11px]"
                          >
                            {n}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="text-xs text-white/80 leading-relaxed mb-3">
                    <strong className="text-white block mb-0.5">Problem & Responsibility:</strong>
                    {activeProject.problem}
                  </div>

                  <div className="text-xs text-white/80 leading-relaxed mb-3">
                    <strong className="text-white block mb-0.5">Stack:</strong>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {activeProject.stack.map((s) => (
                        <span key={s} className="px-2 py-0.5 rounded bg-white/10 text-white/90 text-[10px]">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {activeProject.live && (
                    <a
                      href={activeProject.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold shadow transition-all"
                    >
                      <span>Open Live Project</span>
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              ) : (
                <div ref={chatScrollRef} className="flex-1 p-3 overflow-y-auto no-scrollbar space-y-3" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                  {history.map((msg, i) => (
                    <div
                      key={i}
                      className={cn(
                        "p-2.5 rounded-xl text-xs leading-relaxed max-w-[90%]",
                        msg.role === "user"
                          ? "ml-auto bg-sky-600 text-white rounded-br-none"
                          : "mr-auto bg-white/10 text-white/90 rounded-bl-none border border-white/10"
                      )}
                    >
                      <div className="text-[10px] font-bold opacity-60 mb-1">
                        {msg.role === "user" ? "You (Interviewer)" : "Yug Pathak"}
                      </div>
                      <p>{msg.text}</p>
                      {msg.project && (
                        <button
                          onClick={() => {
                            const p = PROJECTS.find((proj) => proj.id === msg.project);
                            if (p) {
                              setActiveProject(p);
                              setShowArchDrawer(true);
                            }
                          }}
                          className="mt-2 text-[11px] text-sky-300 underline flex items-center gap-1 cursor-pointer hover:text-white"
                        >
                          <Layers size={11} /> View Architecture Slide →
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Preset Quick Questions Carousel */}
              <div className="p-2 border-t border-white/10 bg-[#12141c] overflow-x-auto select-none">
                <div className="flex gap-1.5 whitespace-nowrap">
                  {PRESET_QUESTIONS.map((pq) => (
                    <button
                      key={pq.id}
                      onClick={() => handleAsk(pq.query)}
                      className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/15 border border-white/15 text-[11px] text-white/80 hover:text-white transition-all cursor-pointer shrink-0"
                    >
                      {pq.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Interviewer Question Input Bar */}
              <div className="p-2.5 border-t border-white/10 bg-[#161823] flex items-center gap-1.5">
                <button
                  onClick={toggleListening}
                  className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-colors shrink-0",
                    isListening
                      ? "bg-red-500 text-white animate-pulse"
                      : "bg-white/10 text-white/70 hover:text-white hover:bg-white/15"
                  )}
                  title={isListening ? "Listening... click to stop" : "Speak question (Mic)"}
                >
                  <Mic size={15} />
                </button>

                <input
                  type="text"
                  placeholder="Ask Yug anything about his story, stack, projects..."
                  value={userQuery}
                  onChange={(e) => setUserQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAsk()}
                  className="flex-1 bg-black/40 border border-white/15 rounded-lg px-3 py-1.5 text-xs text-white placeholder-white/40 outline-none focus:border-sky-400"
                />

                <button
                  onClick={() => handleAsk()}
                  disabled={!userQuery.trim()}
                  className="w-8 h-8 rounded-lg bg-sky-600 disabled:opacity-40 hover:bg-sky-500 text-white flex items-center justify-center cursor-pointer transition-colors shrink-0 shadow"
                >
                  <Send size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Video Call Bar Controls */}
          <div className="px-4 py-2 bg-[#12141c] border-t border-white/10 flex items-center justify-between select-none">
            <div className="flex items-center gap-2">
              <button
                onClick={toggleSound}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium cursor-pointer transition-colors",
                  soundEnabled
                    ? "bg-white/10 text-white hover:bg-white/20"
                    : "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                )}
                title={soundEnabled ? "Mute Yug's Voice Audio" : "Unmute Voice Audio"}
              >
                {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
                <span className="hidden sm:inline">{soundEnabled ? "Voice On" : "Voice Muted"}</span>
              </button>

              <button
                onClick={() => setCaptionsEnabled(!captionsEnabled)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium cursor-pointer transition-colors",
                  captionsEnabled
                    ? "bg-white/10 text-white hover:bg-white/20"
                    : "bg-transparent text-white/50 hover:text-white"
                )}
                title="Toggle Live Closed Captions"
              >
                <Subtitles size={14} />
                <span className="hidden sm:inline">CC</span>
              </button>
            </div>

            <div className="text-[11px] text-white/50 font-mono hidden md:block">
              Candidate: Yug Pathak · Poornima Univ · 8.88 CGPA · GDG Lead
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="px-4 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow transition-all"
              >
                <PhoneOff size={14} />
                <span>End Call</span>
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
