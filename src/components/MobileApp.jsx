import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  BookOpen,
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
  Share2,
  Filter,
} from "lucide-react";
import { RECRUITER, PROJECTS, FIELD_ARCHIVES, LINKS, CHAPTERS } from "@/data/content";

const HEADSHOT = "/assets/headshot.png";
const CASUAL = "/assets/casual.png";

export default function MobileApp({
  onOpenInterview,
  onOpenTerminal,
  onSwitchDesktop,
}) {
  const [activeTab, setActiveTab] = useState("home");
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [storyEraFilter, setStoryEraFilter] = useState("ALL");
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [expandedProject, setExpandedProject] = useState("resilience");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [quickQuestion, setQuickQuestion] = useState("");
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

  const sharePortfolio = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2200);
    }
  };

  const submitQuickQuestion = (e) => {
    e.preventDefault();
    if (quickQuestion.trim()) {
      onOpenTerminal();
    }
  };

  const CATEGORIES = ["ALL", "Hackathons", "Leadership", "Conferences", "Work", "AI & Research"];
  const filteredArchives =
    activeCategory === "ALL"
      ? FIELD_ARCHIVES
      : FIELD_ARCHIVES.filter((item) => item.category === activeCategory);

  const filteredChapters = CHAPTERS.filter((ch) => {
    if (storyEraFilter === "ALL") return true;
    if (storyEraFilter === "Class 6-10") return ch.id === "ch00" || ch.id === "ch01";
    if (storyEraFilter === "JEE Pivot") return ch.id === "ch02" || ch.id === "ch03";
    if (storyEraFilter === "College & GDG") return ch.id === "ch04" || ch.id === "ch05" || ch.id === "ch06" || ch.id === "ch07";
    if (storyEraFilter === "3rd Year Systems") return ch.id === "ch08" || ch.id === "ch09";
    return true;
  });

  return (
    <div className="fixed inset-0 bg-[#07090e] text-[#f1f5f9] flex flex-col font-sans select-none overflow-hidden z-50 max-w-full">
      {/* Background Ambient Glow Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[340px] h-[340px] bg-gradient-to-br from-emerald-500/15 via-teal-500/10 to-sky-500/15 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute bottom-20 right-0 w-[240px] h-[240px] bg-sky-500/10 rounded-full blur-[80px] pointer-events-none" />

      {/* Top Phone Status Bar */}
      <div className="h-10 px-4 sm:px-5 flex items-center justify-between text-[11px] font-semibold text-white/70 shrink-0 border-b border-white/5 bg-[#0a0d14]/90 backdrop-blur-md z-20">
        <span className="font-mono">{currentTime || "12:10 AM"}</span>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-emerald-400 font-mono tracking-wider flex items-center gap-1 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            LIVE
          </span>
          <span className="text-[11px] font-mono">5G</span>
          <div className="w-5 h-2.5 border border-white/60 rounded-xs p-0.5 flex items-center">
            <div className="w-full h-full bg-emerald-400 rounded-2xs" />
          </div>
        </div>
      </div>

      {/* App Header Bar with Share + Desktop Switcher */}
      <header className="px-3.5 py-2.5 flex items-center justify-between bg-[#0e121c]/95 border-b border-white/10 shrink-0 z-20 backdrop-blur-xl">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="relative shrink-0">
            <img
              src={HEADSHOT}
              alt="Yug Pathak"
              className="w-10 h-10 rounded-full object-cover border-2 border-emerald-400/80 shadow-md shadow-emerald-950/40"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#0e121c]" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm text-white tracking-tight truncate">Yug Pathak</span>
              <CheckCircle2 size={14} className="text-sky-400 fill-sky-400/20 shrink-0" />
            </div>
            <p className="text-[11px] text-emerald-400/90 font-mono font-medium leading-none mt-0.5 truncate">
              SWE & AI Builder · CSE '26
            </p>
          </div>
        </div>

        {/* Right Header Buttons */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={sharePortfolio}
            className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/80 transition-colors cursor-pointer active:scale-95"
            title="Share portfolio link"
          >
            {copiedLink ? <Check size={14} className="text-emerald-400" /> : <Share2 size={14} />}
          </button>
          <button
            onClick={onSwitchDesktop}
            className="px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-sky-500/20 to-indigo-500/20 hover:from-sky-500/30 hover:to-indigo-500/30 border border-sky-400/40 text-[11px] font-semibold text-sky-200 flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 shadow"
            title="Switch to Retro Desktop OS"
          >
            <Monitor size={13} className="text-sky-300" />
            <span className="hidden xs:inline">Desktop</span>
          </button>
        </div>
      </header>

      {/* Share Toast Notification */}
      <AnimatePresence>
        {copiedLink && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-12 left-1/2 -translate-x-1/2 z-50 px-3 py-1.5 rounded-full bg-emerald-600 text-white font-mono text-xs font-bold shadow-2xl flex items-center gap-1.5 border border-white/30 backdrop-blur-md"
          >
            <Check size={13} />
            <span>Portfolio URL Copied!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ticker / Live Achievement Marquee */}
      <div
        className="h-8 bg-[#071310] border-b border-emerald-500/25 flex items-center overflow-hidden shrink-0 z-10 px-3 pointer-events-none"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 24px, black calc(100% - 24px), transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 24px, black calc(100% - 24px), transparent)",
        }}
      >
        <motion.div
          animate={{ x: [0, -1100] }}
          transition={{ repeat: Infinity, duration: 24, ease: "linear" }}
          className="whitespace-nowrap flex items-center gap-7 text-[11px] font-mono text-emerald-300 font-medium leading-none"
        >
          <span className="flex items-center gap-1.5"><span className="text-amber-400">🏆</span> National Finalist: SAP HackFest 2026</span>
          <span className="flex items-center gap-1.5"><span className="text-emerald-400">✦</span> GDG On Campus Lead (1,100 → 2,300+ Members)</span>
          <span className="flex items-center gap-1.5"><span className="text-sky-400">⚡</span> 8.88 CGPA · 3rd-Year B.Tech CSE (Poornima Univ)</span>
          <span className="flex items-center gap-1.5"><span className="text-teal-400">🚀</span> LinqChain (Resilience OS) SAP CAP + HANA Cloud</span>
          <span className="flex items-center gap-1.5"><span className="text-orange-400">🔥</span> Frontend Intern @ Mittal Alliance · 10+ APIs</span>
          <span className="flex items-center gap-1.5"><span className="text-indigo-400">💡</span> Core Engineering: C++ & DSA Foundations</span>
        </motion.div>
      </div>

      {/* Main Scrollable View Area with NO SCROLLER (Smooth Swipe Only) */}
      <main
        className="flex-1 min-h-0 overflow-y-auto no-scrollbar touch-pan-y px-3.5 sm:px-4 py-4 pb-24 space-y-4 z-10 max-w-full overflow-x-hidden"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {/* ============================================================== */}
        {/* TAB 1: HOME */}
        {/* ============================================================== */}
        {activeTab === "home" && (
          <motion.div
            key="tab-home"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-4 max-w-full"
          >
            {/* Holographic Hero Card */}
            <div className="relative rounded-2xl bg-gradient-to-b from-[#151a29]/90 to-[#0e111a]/95 border border-emerald-500/30 p-4 sm:p-5 shadow-2xl overflow-hidden backdrop-blur-xl">
              <div className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-br from-emerald-500/20 to-teal-500/0 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1 min-w-0">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/15 border border-emerald-400/30 text-emerald-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    OPEN TO SDE ROLES & INTERNSHIPS
                  </span>
                  <h1 className="text-2xl font-black text-white tracking-tight pt-1 truncate">
                    Yug Pathak
                  </h1>
                  <p className="text-xs text-slate-300 leading-snug">
                    B.Tech CSE @ Poornima University, Jaipur · Originally Gurgaon
                  </p>
                </div>
                <img
                  src={CASUAL}
                  alt="Yug casual"
                  className="w-16 h-16 rounded-2xl object-cover object-top border-2 border-white/20 shadow-xl shrink-0"
                  style={{ objectPosition: "center 5%" }}
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
                <div className="text-sm font-black text-amber-400 font-mono pt-1">FINALIST</div>
                <div className="text-[9px] text-white/60 uppercase tracking-widest font-mono mt-0.5">SAP Hackfest</div>
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

            {/* Read the Full Story Banner (Class 6th to 3rd Year) */}
            <div
              onClick={() => setActiveTab("story")}
              className="p-3.5 rounded-2xl bg-gradient-to-r from-purple-950/40 via-[#151929] to-indigo-950/40 border border-purple-500/30 flex items-center justify-between cursor-pointer active:scale-98 transition-all shadow"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center shrink-0">
                  <BookOpen size={18} />
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-xs text-white truncate">The Journey: Class 6th → 3rd Year</div>
                  <div className="text-[11px] text-slate-300 mt-0.5 truncate">MS Paint, QBasic, JEE pivot, GDG Lead & SAP Finals</div>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-purple-400 shrink-0 ml-2">READ →</span>
            </div>

            {/* Featured System Hero Card: LinqChain (Resilience OS) */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-[#13192b] to-[#0c0f18] border-2 border-emerald-500/40 shadow-xl space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                <span className="self-start px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  🏆 SAP HACKFEST '26 NATIONAL FINALIST
                </span>
                <span className="text-[10px] font-mono text-emerald-400 font-bold self-start sm:self-auto">
                  ENTERPRISE COMMAND CENTER
                </span>
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
              <div className="grid grid-cols-2 gap-2.5">
                {FIELD_ARCHIVES.slice(0, 2).map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedPhoto(item)}
                    className="group relative rounded-xl overflow-hidden bg-[#131622] border border-white/10 cursor-pointer shadow-lg hover:border-emerald-500/40 transition-all flex flex-col justify-between"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-28 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-full bg-black/80 backdrop-blur-md text-[8.5px] font-mono text-emerald-300 font-semibold border border-emerald-400/30 shadow truncate max-w-[90%]">
                        {item.badge}
                      </span>
                    </div>
                    <div className="p-2.5 bg-[#0b0e18] flex-1 flex flex-col justify-between">
                      <div className="font-bold text-xs text-white line-clamp-2 leading-tight min-h-[30px]">
                        {item.title}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate mt-1 flex items-center gap-1 font-mono">
                        <MapPin size={10} className="shrink-0 text-slate-500" />
                        <span>{item.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: STORY (Class 6th to 3rd Year B.Tech Full Journey) */}
        {/* ============================================================== */}
        {activeTab === "story" && (
          <motion.div
            key="tab-story"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-4 max-w-full"
          >
            {/* Story Header */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/60 to-indigo-950/60 border border-purple-500/30">
              <span className="text-[10px] font-mono text-purple-300 uppercase tracking-widest font-bold">
                CHRONOLOGICAL MEMORY ARCHIVE
              </span>
              <h2 className="text-xl font-black text-white mt-0.5">Class 6th → 3rd Year B.Tech</h2>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed font-sans">
                Eleven interconnected chapters. Every breakthrough, pivot, failure, and hackathon stage that turned a curious kid into an engineer.
              </p>
            </div>

            {/* Era Filter Chips */}
            <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
              {["ALL", "Class 6-10", "JEE Pivot", "College & GDG", "3rd Year Systems"].map((era) => (
                <button
                  key={era}
                  onClick={() => setStoryEraFilter(era)}
                  className={`px-3 py-1 rounded-full text-xs font-mono font-semibold shrink-0 transition-all cursor-pointer ${
                    storyEraFilter === era
                      ? "bg-purple-600 text-white font-bold shadow-md shadow-purple-900/40"
                      : "bg-white/10 text-white/70 hover:bg-white/15"
                  }`}
                >
                  {era}
                </button>
              ))}
            </div>

            {/* Chapters Timeline List */}
            <div className="space-y-4 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-gradient-to-b before:from-purple-500/60 before:via-emerald-500/40 before:to-sky-500/60">
              {filteredChapters.map((ch, idx) => (
                <div key={ch.id} className="relative pl-9 space-y-2">
                  {/* Timeline Node Dot */}
                  <div className="absolute left-1.5 top-2 w-4 h-4 rounded-full bg-[#0a0d14] border-2 border-purple-400 flex items-center justify-center text-[8px] font-mono text-purple-300 font-bold">
                    {ch.num}
                  </div>

                  {/* Chapter Card */}
                  <div className="p-4 rounded-2xl bg-[#111422] border border-white/10 shadow-lg space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-purple-400 tracking-wider">
                        CH {ch.num} · {ch.era}
                      </span>
                      <span className="text-[10px] font-mono text-white/50">{ch.label}</span>
                    </div>

                    <h3 className="font-bold text-sm text-white tracking-wide">
                      {ch.lines && ch.lines.join(" ")}
                    </h3>

                    <div className="space-y-2 text-xs text-slate-300 leading-relaxed font-sans">
                      {ch.paras && ch.paras.map((para, pIdx) => (
                        <p key={pIdx}>{para}</p>
                      ))}
                    </div>

                    {/* Attached Photo if present */}
                    {ch.photo && (
                      <div className="rounded-xl overflow-hidden border border-white/10 mt-2">
                        <img
                          src={ch.photo.src}
                          alt={ch.photo.caption}
                          loading="lazy"
                          className="w-full h-40 object-cover"
                        />
                        <div className="p-2 bg-black/60 font-mono text-[10px] text-slate-400 text-center">
                          {ch.photo.caption}
                        </div>
                      </div>
                    )}

                    {/* Quote Box */}
                    {ch.quote && (
                      <div className="p-3 rounded-xl bg-purple-950/30 border-l-2 border-purple-400 text-xs italic text-purple-200">
                        "{ch.quote.text}"
                        <div className="text-[10px] text-purple-300/70 font-mono not-italic mt-1">
                          — {ch.quote.by}
                        </div>
                      </div>
                    )}

                    {/* Cause and Effect Footer */}
                    {ch.effect && (
                      <div className="text-[11px] font-mono text-emerald-400 font-semibold pt-1 border-t border-white/5">
                        {ch.effect}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: PROJECTS */}
        {/* ============================================================== */}
        {activeTab === "projects" && (
          <motion.div
            key="tab-projects"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-3 max-w-full"
          >
            <div className="flex items-center justify-between gap-3 pb-1">
              <div className="min-w-0 flex-1">
                <h2 className="text-lg font-black text-white leading-tight">Engineered Systems</h2>
                <p className="text-[11px] text-slate-400 font-mono truncate">Production architectures & verified codebases</p>
              </div>
              <span className="shrink-0 whitespace-nowrap text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shadow-sm">
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
        {/* TAB 4: FIELD PROOF (Stages & Real Photos) */}
        {/* ============================================================== */}
        {activeTab === "proof" && (
          <motion.div
            key="tab-proof"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-3.5 max-w-full"
          >
            <div>
              <h2 className="text-lg font-black text-white">Spotted in the Wild</h2>
              <p className="text-[11px] text-slate-400 font-mono">
                Verified photos from national hackathons, 2,300+ GDG stages, and client letters
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
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
        {/* TAB 5: INTERVIEW (Manly Baritone 3D Virtual Technical Interview) */}
        {/* ============================================================== */}
        {activeTab === "interview" && (
          <motion.div
            key="tab-interview"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-4 text-center py-4 max-w-full"
          >
            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-2xl shadow-emerald-500/30">
              <div className="w-full h-full rounded-[22px] bg-[#0c0f18] flex items-center justify-center">
                <Video size={36} className="text-emerald-400 animate-pulse" />
              </div>
            </div>

            <div>
              <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-2">
                MULTIMODAL AI AGENT · DEEP BARITONE VOICE
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
      </main>

      {/* Floating Bottom Navigation Bar (Home, Story, Projects, Proof, Interview) */}
      <nav className="h-16 px-2 bg-[#090c14]/95 backdrop-blur-2xl border-t border-white/10 flex items-center justify-around shrink-0 z-30 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_24px_rgba(0,0,0,0.5)]">
        {[
          { id: "home", label: "Home", icon: Home },
          { id: "story", label: "Story", icon: BookOpen },
          { id: "projects", label: "Projects", icon: Briefcase },
          { id: "proof", label: "Proof", icon: Camera },
          { id: "interview", label: "Interview", icon: Video },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex flex-col items-center justify-center flex-1 py-1 cursor-pointer transition-all active:scale-95"
            >
              <div
                className={`px-3 py-0.5 rounded-full transition-all duration-200 flex items-center justify-center ${
                  isActive
                    ? "bg-emerald-500/20 text-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.3)]"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Icon size={18} className={isActive ? "stroke-[2.5]" : "stroke-[1.8]"} />
              </div>
              <span
                className={`text-[10px] font-mono mt-1 tracking-tight transition-colors ${
                  isActive ? "text-emerald-400 font-bold" : "text-slate-400"
                }`}
              >
                {tab.label}
              </span>
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
