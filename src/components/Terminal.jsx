import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, TerminalSquare, CornerDownLeft } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { getInterviewAnswer } from "@/lib/interviewEngine";
import { cn } from "@/lib/utils";

const QUICK = ["strongest project?", "the ₹3,000 story", "why wispr flow?", "how do I hire you?", "what did you still not figure out?"];

const localCommand = (cmd) => {
  const c = cmd.toLowerCase().trim();
  if (c === "clear") return "CLEAR";
  if (c === "help") return "commands: help · clear · whoami · projects · contact · sudo hire yug. anything else, I answer myself.";
  if (c === "whoami") return "yug pathak — 3rd-year b.tech cse at poornima university, aspiring software developer. the rest of this machine explains it.";
  if (c === "projects") return "linqchain / resilience os (SAP HackFest National Finalist) · obs (blockchain security on monad) · campus os (college operating system) · finassist (ai wealth copilot) · freight cost predictor (volkswagen) · project pravah (oil pipeline iot). full dossiers in BUILDER_LAB.";
  if (c === "contact") return "yugpathak2005@gmail.com · linkedin.com/in/yug-pathak-94b7b225b · github.com/Yug210705";
  if (c === "proof" || c === "gallery" || c === "photos") return "field proof archives: SAP HackFest 2026 National Finalist · GDG On Campus Lead (2,300+ members auditorium) · LNMHacks 8.0 72h Finalist · Mittal Alliance. Launch FIELD_PROOF.EXE from desktop to view full photographic evidence.";
  if (c === "selva" || c === "competitor") return "selva (thisisselva) is a creative marketer from Bengaluru. But when you need production distributed systems, SAP HANA resilience engines, Monad smart contracts, and real-time ML freight cost predictors... you call Yug Pathak.";
  if (c === "sudo hire yug") return "permission granted. draft the offer and email yugpathak2005@gmail.com.";
  return null;
};

const Terminal = ({ open, onClose }) => {
  const { theme } = useTheme();
  const messagesRef = useRef([]);
  const inputRef = useRef(null);
  const bodyRef = useRef(null);
  const sessionId = useRef(Math.random().toString(36).slice(2));

  const getPromptStr = () => {
    switch (theme) {
      case "ubuntu":
        return "yug@noble:~$ ";
      case "win11":
      case "win10":
      case "win8":
        return "PS C:\\Users\\Yug> ";
      case "win7":
        return "C:\\Users\\Yug> ";
      case "xp":
      default:
        return "C:\\YUG> ";
    }
  };

  const getTerminalTitle = () => {
    switch (theme) {
      case "ubuntu":
        return "yug@noble: ~ — bash";
      case "win11":
        return "Windows Terminal — PowerShell 7 (Ask Yug)";
      case "win10":
        return "Windows PowerShell — Ask Yug";
      case "win8":
        return "Administrator: Windows PowerShell";
      case "win7":
        return "Command Prompt — ASK_YUG.EXE";
      case "xp":
      default:
        return "Command Prompt — C:\\YUG> ASK_YUG.EXE";
    }
  };

  const reset = () => {
    messagesRef.current = [];
    render();
  };

  const render = () => {
    const body = bodyRef.current;
    if (!body) return;
    const prompt = getPromptStr();
    body.innerHTML = messagesRef.current
      .map((m) =>
        m.role === "user"
          ? `<p class="${theme === "ubuntu" ? "text-[#e95420]" : "text-[#ffb000]"} mt-3 font-mono">${escapeHtml(prompt + m.text)}</p>`
          : `<p class="${theme === "ubuntu" ? "text-[#dedede]" : "text-[#33ff33]"} mt-1 whitespace-pre-wrap font-mono">${escapeHtml(m.text)}</p>`
      )
      .join("");
    body.scrollTop = body.scrollHeight;
  };

  const send = async (text) => {
    if (!text.trim() || messagesRef.current.streaming) return;
    messagesRef.current.streaming = true;
    messagesRef.current = [...messagesRef.current, { role: "user", text: text.trim() }];
    const local = localCommand(text);
    if (local === "CLEAR") {
      reset();
      messagesRef.current.streaming = false;
      return;
    }
    if (local) {
      messagesRef.current = [...messagesRef.current, { role: "agent", text: local }];
      render();
      messagesRef.current.streaming = false;
      return;
    }
    messagesRef.current = [...messagesRef.current, { role: "agent", text: "" }];
    render();

    const patchLast = (chunk) => {
      const last = messagesRef.current[messagesRef.current.length - 1];
      last.text += chunk;
      render();
    };

    let got = "";
    const openRouterKey =
      process.env.OPEN_ROUTER_API_KEY ||
      (typeof import.meta !== "undefined" && import.meta.env?.VITE_OPEN_ROUTER_API_KEY) ||
      "";

    // 1. First Attempt: Real-time dynamic response via OpenRouter
    if (openRouterKey) {
      try {
        const ctrl = new AbortController();
        const timeout = setTimeout(() => ctrl.abort(), 20000);

        const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${openRouterKey}`,
            "HTTP-Referer": "https://yug-portfolio.vercel.app",
            "X-Title": "Yug Pathak Terminal",
          },
          signal: ctrl.signal,
          body: JSON.stringify({
            model: "google/gemini-2.0-flash-001",
            messages: [
              {
                role: "system",
                content:
                  "You are Yug Pathak's AI persona inside the retro terminal ASK_YUG.EXE. Respond directly as Yug in the first person ('I', 'my'). Be crisp, technical, confident, and direct (2 to 4 sentences). Mention your real work: LinqChain (Resilience OS, SAP HackFest 2026 National Finalist), OBS on Monad, Campus OS, Freight Cost Predictor for Volkswagen, Project Pravah for SIH Oil India, GDG On Campus Lead (2,300+ members), Mittal Alliance frontend intern (10+ APIs), Deccan AI (RLHF/SFT), C++ DSA, and DevOps (Docker, k8s, Jenkins, AWS). Email: yugpathak2005@gmail.com.",
              },
              ...messagesRef.current
                .filter((m) => m.role)
                .map(({ role, text: t }) => ({
                  role: role === "agent" ? "assistant" : "user",
                  content: t,
                })),
            ],
            stream: true,
          }),
        });

        clearTimeout(timeout);

        if (res.ok && res.body) {
          const reader = res.body.getReader();
          const dec = new TextDecoder();
          let buffer = "";

          for (;;) {
            const { done, value } = await reader.read();
            if (done) break;
            buffer += dec.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() || "";

            for (const line of lines) {
              const trimmed = line.trim();
              if (trimmed.startsWith("data: ") && trimmed !== "data: [DONE]") {
                try {
                  const parsed = JSON.parse(trimmed.slice(6));
                  const delta = parsed.choices?.[0]?.delta?.content || "";
                  if (delta) {
                    got += delta;
                    patchLast(delta);
                  }
                } catch (e) {}
              }
            }
          }
        }
      } catch (err) {
        // Fall back to knowledge base or backend
      }
    }

    // 2. Second Attempt: If no OpenRouter response, use local interview knowledge base
    if (!got.trim()) {
      const fallbackAns = getInterviewAnswer(text);
      if (fallbackAns && fallbackAns.answer) {
        got = fallbackAns.answer;
        patchLast(got);
      }
    }

    // 3. Third Attempt: Backend uplink or email note
    if (!got.trim()) {
      patchLast("\n[agent uplink down — email yugpathak2005@gmail.com]");
    }

    messagesRef.current.streaming = false;
  };

  const onKey = (e) => {
    if (e.key === "Enter") {
      send(e.target.value);
      e.target.value = "";
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[95] bg-black/70 flex items-center justify-center p-3 sm:p-6 pb-20 sm:pb-24"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.94, y: 14 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            className="bevel hard-shadow w-full max-w-4xl lg:max-w-5xl flex flex-col"
            style={{ maxHeight: "min(76dvh, 76vh)", height: "min(66dvh, 560px)" }}
            onClick={(e) => e.stopPropagation()}
            data-testid="terminal-window"
            role="dialog"
            aria-label="Ask Yug — AI terminal"
          >
            <div className="titlebar-dark flex items-center gap-2 px-3 py-2 shrink-0 select-none">
              <TerminalSquare size={14} className={theme === "ubuntu" ? "text-[#e95420]" : "text-sky-400"} />
              <span className="font-sans font-medium text-xs text-white/90 flex-1 truncate">{getTerminalTitle()}</span>
              <button aria-label="close terminal" onClick={onClose} data-testid="terminal-close" className="bevel-btn w-5 h-5 flex items-center justify-center text-black cursor-pointer">
                <X size={12} />
              </button>
            </div>
            <div
              ref={bodyRef}
              className={cn(
                "flex-1 min-h-0 overflow-y-auto p-4 font-mono text-[14px] leading-relaxed",
                theme === "ubuntu" ? "bg-[#300a24]" : theme === "win11" ? "bg-[#181a24]/95" : "bg-[#0c0d12]"
              )}
              data-lenis-prevent
            >
              <p className={cn("font-bold", theme === "ubuntu" ? "text-[#e95420]" : "text-[#33ff33]")}>
                {theme === "ubuntu" ? "Ubuntu 24.04 LTS (GNU/Linux 6.8.0-generic)" : "ASK_YUG.EXE v1.0 — the agent that knows yug."}
              </p>
              <p className="text-white/80 text-xs mt-1 font-sans">
                Ask anything about Yug Pathak — projects, story, skills, contact. Local commands: help · whoami · projects · contact · clear · sudo hire yug
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                {QUICK.map((q) => (
                  <button
                    key={q}
                    data-testid="terminal-quick"
                    onClick={() => send(q)}
                    className="bevel-btn font-mono text-xs px-2.5 py-1 text-inherit cursor-pointer"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
            <div
              className={cn(
                "shrink-0 flex items-center gap-2 px-3 py-2.5 border-t",
                theme === "ubuntu" ? "bg-[#24061a] border-white/10" : "bg-[#0c0d12] border-[#33ff33]/20"
              )}
            >
              <span className={cn("font-mono font-bold text-xs shrink-0 select-none", theme === "ubuntu" ? "text-[#e95420]" : "text-[#ffb000]")}>
                {getPromptStr()}
              </span>
              <input
                ref={inputRef}
                data-testid="terminal-input"
                placeholder="ask anything about yug…"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    send(e.target.value);
                    e.target.value = "";
                  }
                }}
                className={cn(
                  "flex-1 min-w-0 bg-transparent font-mono text-xs outline-none placeholder:opacity-40",
                  theme === "ubuntu" ? "text-white placeholder:text-white/40" : "text-[#33ff33] placeholder:text-[#33ff33]/40"
                )}
              />
              <button
                data-testid="terminal-send"
                onClick={(e) => {
                  const inp = inputRef.current;
                  send(inp.value);
                  inp.value = "";
                }}
                className="bevel-btn font-mono text-xs px-3 py-1 text-inherit flex items-center gap-1 cursor-pointer"
              >
                RUN <CornerDownLeft size={13} />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const escapeHtml = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export default Terminal;
