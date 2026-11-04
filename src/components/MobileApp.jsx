import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Briefcase,
  Camera,
  Video,
  FileText,
  Sparkles,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  FileDown,
  ChevronRight,
  Monitor,
  CheckCircle2,
  Award,
  Zap,
  ZoomIn,
  X,
  Code2,
  Cpu,
  Layers,
  GraduationCap,
  MapPin,
  Flame,
  ArrowUpRight,
  Send,
  HelpCircle,
  Copy,
  Check,
} from "lucide-react";
import { RECRUITER, PROJECTS, FIELD_ARCHIVES, LINKS } from "@/data/content";

const HEADSHOT = "/assets/headshot.png";
const CASUAL = "/assets/casual.png";

export default function MobileApp({
  onOpenInterview,
  onOpenTerminal,
  onSwitchDesktop,
}) {
  const [activeTab, setActiveTab] = useState("home");
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [expandedProject, setExpandedProject] = useState("resilience");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 20000);
    return () => clearInterval(interval);
  }, []);

  const copyEmail = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText("yugpathak2005@gmail.com");
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  const CATEGORIES = ["ALL", "Hackathons", "Leadership", "Conferences", "Work", "AI & Research"];
  const filteredArchives =
    activeCategory === "ALL"
      ? FIELD_ARCHIVES
      : FIELD_ARCHIVES.filter((item) => item.category === activeCategory);

  return (
    <div className="fixed inset-0 bg-[#07090e] text-[#f1f5f9] flex flex-col font-sans select-none overflow-hidden z-50">
      {/* Background Ambient Glow Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-gradient-to-br from-emerald-500/15 via-teal-500/10 to-sky-500/15 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute bottom-20 right-0 w-[240px] h-[240px] bg-sky-500/10 rounded-full blur-[80px] pointer-events-none" />

      {/* Top Phone Status Bar */}
      <div className="h-10 px-5 flex items-center justify-between text-[11px] font-semibold text-white/70 shrink-0 border-b border-white/5 bg-[#0a0d14]/90 backdrop-blur-md z-20">
        <span className="font-mono">{currentTime || "11:30 PM"}</span>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-emerald-400 font-mono tracking-wider flex items-center gap-1 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            ONLINE
          </span>
          <span className="text-[11px] font-mono">5G</span>
          <div className="w-5 h-2.5 border border-white/60 rounded-xs p-0.5 flex items-center">
            <div className="w-full h-full bg-emerald-400 rounded-2xs" />
          </div>
        </div>
      </div>

      {/* App Header Bar */}
      <header className="px-4 py-2.5 flex items-center justify-between bg-[#0e121c]/95 border-b border-white/10 shrink-0 z-20 backdrop-blur-xl">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <img
              src={HEADSHOT}
              alt="Yug Pathak"
              className="w-10 h-10 rounded-full object-cover border-2 border-emerald-400/80 shadow-md shadow-emerald-950/40"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#0e121c]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm text-white tracking-tight">Yug Pathak</span>
              <CheckCircle2 size={14} className="text-sky-400 fill-sky-400/20" />
            </div>
            <p className="text-[11px] text-emerald-400/90 font-mono font-medium leading-none mt-0.5">
              SWE & AI Builder · CSE '26
            </p>
          </div>
        </div>

        {/* Switch to Desktop OS Pill */}
        <button
          onClick={onSwitchDesktop}
          className="px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-sky-500/20 to-indigo-500/20 hover:from-sky-500/30 hover:to-indigo-500/30 border border-sky-400/40 text-[11px] font-semibold text-sky-200 flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 shadow"
          title="Switch to Retro Desktop OS"
        >
          <Monitor size={13} className="text-sky-300" />
          <span>Desktop OS</span>
        </button>
      </header>

      {/* Ticker / Live Achievement Marquee */}
      <div className="h-7 bg-emerald-950/50 border-b border-emerald-500/20 flex items-center overflow-hidden shrink-0 z-10 px-2">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 24, ease: "linear" }}
          className="whitespace-nowrap flex items-center gap-6 text-[10px] font-mono text-emerald-300 font-medium"
        >
          <span>🏆 1st Place Winner: SAP HackFest 2026 (₹75,000 Cheque)</span>
          <span>✦ Google Developer Groups on Campus Lead (1,100 → 2,300+ Members)</span>
          <span>⚡ 8.88 CGPA · 3rd-Year B.Tech CSE (Poornima University)</span>
          <span>🚀 LinqChain (Resilience OS) Enterprise Supply Chain Simulation</span>
          <span>🔥 Frontend Intern @ Mittal Alliance · 10+ Production APIs</span>
          <span>💡 Core Language: C++ & DSA Foundations</span>
        </motion.div>
      </div>

      {/* Main Scrollable View Area */}
      <main className="flex-1 min-h-0 overflow-y-auto px-4 py-4 pb-24 space-y-4 z-10">
        {/* ============================================================== */}
        {/* TAB 1: HOME (Instant 1-Second Wow Impression) */}
        {/* ============================================================== */}
        {activeTab === "home" && (
          <motion.div
            key="tab-home"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {/* Holographic Hero Card */}
            <div className="relative rounded-2xl bg-gradient-to-b from-[#151a29]/90 to-[#0e111a]/95 border border-emerald-500/30 p-4 sm:p-5 shadow-2xl overflow-hidden backdrop-blur-xl">
              <div className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-br from-emerald-500/20 to-teal-500/0 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/15 border border-emerald-400/30 text-emerald-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    OPEN TO SDE ROLES & INTERNSHIPS
                  </span>
                  <h1 className="text-2xl font-black text-white tracking-tight pt-1">
                    Yug Pathak
                  </h1>
                  <p className="text-xs text-slate-300 leading-snug">
                    B.Tech CSE @ Poornima University, Jaipur · Originally Gurgaon
                  </p>
                </div>
                <img
                  src={CASUAL}
                  alt="Yug casual"
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-white/20 shadow-xl shrink-0"
                />
              </div>

              <p className="text-xs text-slate-300/90 leading-relaxed mt-3 font-sans">
                Driven by curiosity, practical problem-solving, and building technology that creates measurable impact. Primary language <strong>C++ (DSA)</strong>, with production engineering in full-stack, DevOps, and AI alignment.
              </p>

              {/* High-Impact 1-Tap Action Hub */}
              <div className="grid grid-cols-2 gap-2 mt-4">
                <button
                  onClick={onOpenInterview}
                  className="p-3 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 hover:brightness-110 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/60 cursor-pointer active:scale-95 transition-all"
                >
                  <Video size={16} className="animate-pulse" />
                  <span>Start AI Interview</span>
                </button>
                <a
                  href={LINKS.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-all"
                >
                  <FileDown size={16} />
                  <span>Download Resume</span>
                </a>
              </div>
            </div>

            {/* Glowing 3-Metric Stat Ribbon */}
            <div className="grid grid-cols-3 gap-2">
              <div className="p-3 rounded-xl bg-[#111422] border border-white/10 text-center shadow-lg">
                <div className="text-xl font-black text-emerald-400 font-mono">8.88</div>
                <div className="text-[9px] text-white/60 uppercase tracking-widest font-mono mt-0.5">CGPA</div>
              </div>
              <div className="p-3 rounded-xl bg-[#111422] border border-white/10 text-center shadow-lg">
                <div className="text-xl font-black text-amber-400 font-mono">₹75K</div>
                <div className="text-[9px] text-white/60 uppercase tracking-widest font-mono mt-0.5">SAP Winner</div>
              </div>
              <div className="p-3 rounded-xl bg-[#111422] border border-white/10 text-center shadow-lg">
                <div className="text-xl font-black text-sky-400 font-mono">2,300+</div>
                <div className="text-[9px] text-white/60 uppercase tracking-widest font-mono mt-0.5">GDG Devs</div>
              </div>
            </div>

            {/* Quick Links Row (GitHub, LinkedIn, Email, Terminal) */}
            <div className="grid grid-cols-4 gap-2">
              <a
                href={LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-[#121624] border border-white/10 flex flex-col items-center justify-center gap-1 text-slate-300 hover:text-white hover:border-white/25 active:scale-95 transition-all"
              >
                <Github size={16} />
                <span className="text-[10px] font-mono">GitHub</span>
              </a>
              <a
                href={LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-[#121624] border border-white/10 flex flex-col items-center justify-center gap-1 text-sky-400 hover:text-sky-300 hover:border-sky-400/40 active:scale-95 transition-all"
              >
                <Linkedin size={16} />
                <span className="text-[10px] font-mono">LinkedIn</span>
              </a>
              <button
                onClick={copyEmail}
                className="p-2.5 rounded-xl bg-[#121624] border border-white/10 flex flex-col items-center justify-center gap-1 text-emerald-400 hover:text-emerald-300 hover:border-emerald-400/40 active:scale-95 transition-all cursor-pointer"
              >
                {copiedEmail ? <Check size={16} className="text-emerald-400" /> : <Mail size={16} />}
                <span className="text-[10px] font-mono">{copiedEmail ? "Copied!" : "Email"}</span>
              </button>
              <button
                onClick={onOpenTerminal}
                className="p-2.5 rounded-xl bg-[#121624] border border-white/10 flex flex-col items-center justify-center gap-1 text-amber-400 hover:text-amber-300 hover:border-amber-400/40 active:scale-95 transition-all cursor-pointer"
              >
                <Zap size={16} />
                <span className="text-[10px] font-mono">Terminal</span>
              </button>
            </div>

            {/* Featured System Hero Card: LinqChain (Resilience OS) */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-[#13192b] to-[#0c0f18] border-2 border-emerald-500/40 shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  🏆 SAP HACKFEST 2026 WINNER (₹75,000)
                </span>
                <span className="text-[10px] font-mono text-emerald-400">COMMAND CENTER</span>
              </div>
              <div>
                <h3 className="text-base font-bold text-white tracking-wide">
                  LinqChain · Resilience OS
                </h3>
                <p className="text-xs text-slate-300 mt-1 leading-snug">
                  Enterprise supply chain command center simulating tier-N cascading disruptions and automated recovery paths backed by SAP CAP and HANA Cloud.
                </p>
              </div>

              {/* Tech Stack Chips */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {["Next.js 14", "FastAPI", "Python", "SAP CAP", "SAP HANA Cloud", "Zustand"].map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded text-[10px] bg-white/10 text-white/90 font-mono">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                <a
                  href="https://resilience-os.vercel.app/command-center"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow"
                >
                  <span>Launch Live System</span>
                  <ArrowUpRight size={14} />
                </a>
                <button
                  onClick={() => {
                    setActiveTab("projects");
                    setExpandedProject("resilience");
                  }}
                  className="py-2 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-mono font-medium"
                >
                  Full Architecture →
                </button>
              </div>
            </div>

            {/* Proof Feed Preview Banner */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-white/70 font-mono">
                  Verified Photographic Proof
                </h3>
                <button
                  onClick={() => setActiveTab("proof")}
                  className="text-xs text-sky-400 font-mono font-semibold"
                >
                  View All ({FIELD_ARCHIVES.length}) →
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {FIELD_ARCHIVES.slice(0, 2).map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedPhoto(item)}
                    className="group relative rounded-xl overflow-hidden bg-[#141824] border border-white/10 cursor-pointer shadow-md"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-28 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-black/80 backdrop-blur-md text-[9px] font-mono text-emerald-400 font-bold border border-emerald-400/40">
                      {item.badge}
                    </div>
                    <div className="p-2 bg-[#0d101a]">
                      <div className="font-bold text-[11px] text-white truncate">{item.title}</div>
                      <div className="text-[10px] text-slate-400 truncate mt-0.5">{item.location}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: PROJECTS (All 7 Deep Architectures with Working Links) */}
        {/* ============================================================== */}
        {activeTab === "projects" && (
          <motion.div
            key="tab-projects"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-3"
          >
            <div className="flex items-center justify-between pb-1">
              <div>
                <h2 className="text-lg font-black text-white">Engineered Systems</h2>
                <p className="text-[11px] text-slate-400 font-mono">Production architectures & verified codebases</p>
              </div>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                {PROJECTS.length} Systems
              </span>
            </div>

            {PROJECTS.map((proj) => {
              const isExpanded = expandedProject === proj.id;
              return (
                <div
                  key={proj.id}
                  className="rounded-2xl bg-[#111422] border border-white/10 overflow-hidden shadow-md transition-all"
                >
                  <div
                    onClick={() => setExpandedProject(isExpanded ? null : proj.id)}
                    className="p-4 flex items-start justify-between gap-3 cursor-pointer hover:bg-white/[0.02]"
                  >
                    <div className="space-y-1 flex-1 min-w-0">
                      <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider">
                        {proj.tag}
                      </span>
                      <h3 className="font-bold text-sm text-white truncate">{proj.name}</h3>
                      <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                        {proj.problem}
                      </p>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center shrink-0 mt-1">
                      <ChevronRight
                        size={15}
                        className={`text-white/60 transition-transform ${
                          isExpanded ? "rotate-90 text-emerald-400" : ""
                        }`}
                      />
                    </div>
                  </div>

                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-4 pb-4 pt-1 border-t border-white/5 space-y-3.5 bg-[#0d101c]"
                    >
                      {/* Architecture Explanation */}
                      <div>
                        <div className="text-[11px] font-bold text-sky-400 uppercase tracking-wider font-mono mb-1">
                          System Architecture & Solution
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed font-sans">
                          {typeof proj.architecture === "string" ? proj.architecture : proj.solution}
                        </p>
                      </div>

                      {/* Architecture Flow Diagram Nodes */}
                      {proj.arch_diagram && proj.arch_diagram.nodes && (
                        <div>
                          <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider font-mono mb-1.5">
                            Pipeline Flow
                          </div>
                          <div className="space-y-1">
                            {proj.arch_diagram.nodes.map((node, i) => (
                              <div
                                key={i}
                                className="px-2.5 py-1.5 rounded-lg bg-black/50 border border-white/5 text-[11px] font-mono text-white/90 flex items-center gap-2"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                <span>{node}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Tech Stack Badges */}
                      {proj.stack && Array.isArray(proj.stack) && (
                        <div>
                          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono mb-1.5">
                            Technologies
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {proj.stack.map((tech) => (
                              <span
                                key={tech}
                                className="px-2 py-0.5 rounded text-[10px] bg-white/10 text-white font-mono"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Action Links */}
                      <div className="flex items-center gap-2 pt-2">
                        {proj.live && (
                          <a
                            href={proj.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:brightness-110 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow"
                          >
                            <span>Live Deployment</span>
                            <ArrowUpRight size={14} />
                          </a>
                        )}
                        <a
                          href={proj.github || LINKS.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-2.5 px-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-mono font-medium flex items-center gap-1.5"
                        >
                          <Github size={14} />
                          <span>Source</span>
                        </a>
                      </div>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </motion.div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: FIELD PROOF (Real Photos from Stages, Hackathons, Letters) */}
        {/* ============================================================== */}
        {activeTab === "proof" && (
          <motion.div
            key="tab-proof"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-3.5"
          >
            <div>
              <h2 className="text-lg font-black text-white">Spotted in the Wild</h2>
              <p className="text-[11px] text-slate-400 font-mono">
                Verified photos from national hackathons, 2,300+ GDG stages, and client letters
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1 rounded-full text-xs font-mono font-semibold shrink-0 transition-all cursor-pointer ${
                    activeCategory === cat
                      ? "bg-emerald-500 text-black font-bold shadow-md shadow-emerald-500/20"
                      : "bg-white/10 text-white/70 hover:bg-white/15"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Photo Cards Feed */}
            <div className="space-y-4">
              {filteredArchives.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl bg-[#111422] border border-white/10 overflow-hidden shadow-xl"
                >
                  <div
                    className="relative group cursor-pointer bg-black"
                    onClick={() => setSelectedPhoto(item)}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-52 sm:h-60 object-cover group-hover:scale-[1.02] transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-black/85 backdrop-blur-md text-[10px] font-mono font-bold text-emerald-400 border border-emerald-400/40">
                      {item.badge}
                    </div>
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/70 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                      <ZoomIn size={14} />
                    </div>
                    <div className="absolute bottom-0 inset-x-0 p-2.5 bg-gradient-to-t from-black/90 to-transparent flex items-center justify-between text-[11px] font-mono text-white/80">
                      <span>{item.date}</span>
                      <span>{item.location}</span>
                    </div>
                  </div>

                  <div className="p-3.5 space-y-1.5">
                    <h3 className="font-bold text-sm text-white">{item.title}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      {item.story}
                    </p>
                    {item.stats && (
                      <div className="pt-2 text-[10px] font-mono text-emerald-400/90 flex items-center gap-1.5 border-t border-white/5">
                        <Award size={12} />
                        <span>{item.stats}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ============================================================== */}
        {/* TAB 4: INTERVIEW (Virtual Technical Interview) */}
        {/* ============================================================== */}
        {activeTab === "interview" && (
          <motion.div
            key="tab-interview"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-4 text-center py-4"
          >
            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-2xl shadow-emerald-500/30">
              <div className="w-full h-full rounded-[22px] bg-[#0c0f18] flex items-center justify-center">
                <Video size={36} className="text-emerald-400 animate-pulse" />
              </div>
            </div>

            <div>
              <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-2">
                MULTIMODAL AI AGENT
              </span>
              <h2 className="text-2xl font-black text-white">Live Virtual Interview</h2>
              <p className="text-xs text-slate-300 max-w-xs mx-auto mt-1 leading-relaxed">
                Connect directly with Yug's 3D avatar. Ask technical questions about LinqChain, OBS, C++ DSA, GDG scaling, or DevOps pipelines.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#111422] border border-white/10 max-w-sm mx-auto text-left space-y-2.5 shadow-lg">
              <div className="text-[11px] font-mono font-bold text-white/70 uppercase tracking-wider">
                Recommended Questions:
              </div>
              <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside font-sans">
                <li>Tell me about yourself and your journey</li>
                <li>Explain LinqChain (Resilience OS) architecture</li>
                <li>How did you grow GDG from 1,100 to 2,300+?</li>
                <li>What broke in production and what did it teach you?</li>
              </ul>
            </div>

            <button
              onClick={onOpenInterview}
              className="w-full max-w-sm mx-auto py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 hover:brightness-110 text-white font-bold text-sm shadow-xl shadow-emerald-950/60 flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-all"
            >
              <Video size={18} />
              <span>Launch Virtual Interview Room</span>
            </button>
          </motion.div>
        )}

        {/* ============================================================== */}
        {/* TAB 5: RECRUITER DOSSIER */}
        {/* ============================================================== */}
        {activeTab === "recruiter" && (
          <motion.div
            key="tab-recruiter"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between pb-1">
              <div>
                <h2 className="text-lg font-black text-white">Recruiter 60-Sec Dossier</h2>
                <p className="text-[11px] text-slate-400 font-mono">Facts, verified credentials & direct contact</p>
              </div>
              <a
                href={LINKS.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center gap-1.5 shadow"
              >
                <FileDown size={14} />
                <span>PDF</span>
              </a>
            </div>

            {/* Profile Overview */}
            <div className="p-4 rounded-2xl bg-[#111422] border border-white/10 space-y-3 shadow-lg">
              <div className="flex items-center gap-3">
                <img
                  src={HEADSHOT}
                  alt="Yug"
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-white/20 shadow"
                />
                <div>
                  <h3 className="font-bold text-base text-white">{RECRUITER.name}</h3>
                  <div className="text-xs text-emerald-400 font-mono font-medium">{RECRUITER.role}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{RECRUITER.education}</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center font-mono">
                {RECRUITER.stats.map((s) => (
                  <div key={s.v} className="p-2 rounded-xl bg-black/40">
                    <div className="text-base font-bold text-sky-400">{s.k}</div>
                    <div className="text-[9px] text-white/50 tracking-wider uppercase">{s.v}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Highlights */}
            <div className="space-y-2">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white/70">
                Verified Career Highlights
              </h3>
              {RECRUITER.highlights.map((h) => (
                <div
                  key={h.org}
                  className="p-3 rounded-xl bg-[#111422] border border-white/5 flex items-start gap-2.5 shadow-sm"
                >
                  <Award size={16} className="text-amber-400 mt-0.5 shrink-0" />
                  <div>
                    <div className="font-bold text-xs text-white">{h.org}</div>
                    <div className="text-[11px] text-slate-300 mt-0.5 leading-snug">{h.what}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Direct Connect Grid */}
            <div className="p-4 rounded-2xl bg-[#111422] border border-white/10 space-y-3">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white/70">
                Direct Contact Channels
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`mailto:${LINKS.email}`}
                  className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-medium flex items-center gap-2"
                >
                  <Mail size={15} className="text-emerald-400" />
                  <span className="truncate">Email Me</span>
                </a>
                <a
                  href={LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-medium flex items-center gap-2"
                >
                  <Linkedin size={15} className="text-sky-400" />
                  <span className="truncate">LinkedIn</span>
                </a>
                <a
                  href={LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-medium flex items-center gap-2"
                >
                  <Github size={15} className="text-white/80" />
                  <span className="truncate">GitHub</span>
                </a>
                <button
                  onClick={onOpenTerminal}
                  className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-medium flex items-center gap-2 cursor-pointer"
                >
                  <Zap size={15} className="text-amber-400" />
                  <span className="truncate">Ask AI Agent</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </main>

      {/* Floating Bottom Navigation Bar */}
      <nav className="h-16 px-2 bg-[#0c0f18]/95 backdrop-blur-2xl border-t border-white/10 flex items-center justify-around shrink-0 z-30 pb-[env(safe-area-inset-bottom)]">
        {[
          { id: "home", label: "Home", icon: Home },
          { id: "projects", label: "Projects", icon: Briefcase },
          { id: "proof", label: "Proof", icon: Camera },
          { id: "interview", label: "Interview", icon: Video },
          { id: "recruiter", label: "Dossier", icon: FileText },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center flex-1 py-1 transition-all cursor-pointer ${
                isActive ? "text-emerald-400" : "text-white/50 hover:text-white/80"
              }`}
            >
              <div className="relative">
                <Icon size={19} className={isActive ? "scale-110 transition-transform" : ""} />
                {isActive && (
                  <motion.span
                    layoutId="mobile-nav-dot"
                    className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]"
                  />
                )}
              </div>
              <span className="text-[10px] font-mono font-medium mt-1 leading-none">{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Full-Screen High-Resolution Lightbox for Photos */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 p-4 flex flex-col justify-between"
            onClick={() => setSelectedPhoto(null)}
          >
            <div className="flex items-center justify-between text-white/80">
              <span className="text-xs font-mono font-bold text-emerald-400">{selectedPhoto.title}</span>
              <button
                onClick={() => setSelectedPhoto(null)}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>
            <div className="my-auto flex items-center justify-center">
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                className="max-h-[65vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl border border-white/20"
              />
            </div>
            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-xl text-center text-xs text-white/90 space-y-1">
              <div className="font-bold text-emerald-300 font-mono">
                {selectedPhoto.badge} · {selectedPhoto.location}
              </div>
              <div className="text-[11px] text-slate-300 font-sans leading-relaxed">
                {selectedPhoto.story}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
