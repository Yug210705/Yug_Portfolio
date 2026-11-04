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
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const CATEGORIES = ["ALL", "Hackathons", "Leadership", "Conferences", "Work"];
  const filteredArchives =
    activeCategory === "ALL"
      ? FIELD_ARCHIVES
      : FIELD_ARCHIVES.filter((item) => item.category === activeCategory);

  return (
    <div className="fixed inset-0 bg-[#0c0e14] text-[#f1f5f9] flex flex-col font-sans select-none overflow-hidden z-50">
      {/* Mobile Top System Bar (iOS/Android feel) */}
      <div className="h-11 px-5 flex items-center justify-between text-xs font-semibold text-white/80 shrink-0 border-b border-white/5 bg-[#0e1017]/90 backdrop-blur-md">
        <span>{currentTime || "11:30 PM"}</span>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-emerald-400 font-mono tracking-wider flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            LIVE
          </span>
          <span className="text-xs">5G</span>
          <div className="w-5 h-2.5 border border-white/60 rounded-sm p-0.5 flex items-center">
            <div className="w-full h-full bg-emerald-400 rounded-2xs" />
          </div>
        </div>
      </div>

      {/* App Top Nav Header */}
      <header className="px-4 py-2.5 flex items-center justify-between bg-[#121520] border-b border-white/10 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <img
              src={HEADSHOT}
              alt="Yug Pathak"
              className="w-9 h-9 rounded-full object-cover border border-emerald-400/60 shadow"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-[#121520]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm text-white tracking-tight">Yug Pathak</span>
              <CheckCircle2 size={13} className="text-sky-400 fill-sky-400/20" />
            </div>
            <p className="text-[11px] text-white/60 leading-none">Software Developer · CSE '26</p>
          </div>
        </div>

        {/* Switch to Desktop OS Pill */}
        <button
          onClick={onSwitchDesktop}
          className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 border border-white/15 text-[11px] font-medium text-white/90 flex items-center gap-1.5 transition-colors cursor-pointer"
          title="Switch to Retro Desktop OS"
        >
          <Monitor size={12} className="text-sky-400" />
          <span>Desktop OS</span>
        </button>
      </header>

      {/* Main Scrollable Body Content */}
      <main className="flex-1 min-h-0 overflow-y-auto px-4 py-4 pb-24 space-y-4">
        {/* ============================================================== */}
        {/* TAB 1: HOME */}
        {/* ============================================================== */}
        {activeTab === "home" && (
          <motion.div
            key="tab-home"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {/* Hero Profile Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-[#1a1f33] via-[#141829] to-[#0f121d] border border-white/10 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    Available for SDE Roles & Internships
                  </span>
                  <h1 className="text-xl font-bold text-white tracking-tight">
                    Yug Pathak
                  </h1>
                  <p className="text-xs text-sky-400 font-medium mt-0.5">
                    Driven by Curiosity · Practical Problem Solver
                  </p>
                </div>
                <img
                  src={CASUAL}
                  alt="Yug casual"
                  className="w-14 h-14 rounded-xl object-cover border border-white/20 shadow-md shrink-0"
                />
              </div>

              <p className="text-xs text-white/80 leading-relaxed mt-3">
                3rd-year B.Tech CSE at Poornima University, Jaipur (8.88 CGPA), originally from Gurgaon.
                Primary language C++ & DSA, building full-stack production systems, DevOps pipelines, and AI harnesses.
              </p>

              {/* 1-Tap Quick Action Buttons */}
              <div className="grid grid-cols-2 gap-2 mt-4">
                <button
                  onClick={onOpenInterview}
                  className="p-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:brightness-110 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-950/40 cursor-pointer active:scale-98 transition-transform"
                >
                  <Video size={14} />
                  <span>Start AI Interview</span>
                </button>
                <a
                  href={LINKS.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer active:scale-98 transition-transform"
                >
                  <FileDown size={14} />
                  <span>View Resume PDF</span>
                </a>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-2">
              <div className="p-3 rounded-xl bg-[#141724] border border-white/5 text-center shadow">
                <div className="text-lg font-black text-sky-400">8.88</div>
                <div className="text-[10px] text-white/60 uppercase tracking-wider mt-0.5">CGPA</div>
              </div>
              <div className="p-3 rounded-xl bg-[#141724] border border-white/5 text-center shadow">
                <div className="text-lg font-black text-amber-400">₹75K</div>
                <div className="text-[10px] text-white/60 uppercase tracking-wider mt-0.5">SAP Winner</div>
              </div>
              <div className="p-3 rounded-xl bg-[#141724] border border-white/5 text-center shadow">
                <div className="text-lg font-black text-emerald-400">2,300+</div>
                <div className="text-[10px] text-white/60 uppercase tracking-wider mt-0.5">GDG Members</div>
              </div>
            </div>

            {/* Featured System Highlight */}
            <div className="p-3.5 rounded-xl bg-[#141824] border border-emerald-500/30 shadow-md">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                  <Flame size={12} /> FEATURED ARCHITECTURE
                </span>
                <span className="text-[10px] text-white/50">SAP HackFest Winner</span>
              </div>
              <h3 className="font-bold text-sm text-white">LinqChain (Resilience OS)</h3>
              <p className="text-xs text-white/70 mt-1 leading-snug">
                Deterministic supply chain control room simulating multi-tier disruptions and automated re-routing with SAP HANA resilience pipelines.
              </p>
              <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-white/10">
                <div className="flex gap-1.5">
                  <span className="px-2 py-0.5 text-[9px] rounded bg-white/10 text-white/80 font-mono">React</span>
                  <span className="px-2 py-0.5 text-[9px] rounded bg-white/10 text-white/80 font-mono">FastAPI</span>
                  <span className="px-2 py-0.5 text-[9px] rounded bg-white/10 text-white/80 font-mono">SAP HANA</span>
                </div>
                <button
                  onClick={() => {
                    setActiveTab("projects");
                    setExpandedProject("resilience");
                  }}
                  className="text-xs text-sky-400 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  Inspect <ChevronRight size={12} />
                </button>
              </div>
            </div>

            {/* Interactive Assistant Terminal Launcher */}
            <div
              onClick={onOpenTerminal}
              className="p-3.5 rounded-xl bg-[#10121b] border border-white/10 flex items-center justify-between cursor-pointer active:scale-98 transition-transform"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center">
                  <Zap size={16} />
                </div>
                <div>
                  <div className="font-semibold text-xs text-white">Ask Yug AI Terminal</div>
                  <div className="text-[11px] text-white/50">Run commands, inspect projects, or ask questions</div>
                </div>
              </div>
              <span className="text-xs text-sky-400 font-mono">RUN ↗</span>
            </div>

            {/* Verified Stages / Field Proof Preview */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-white/60">
                  Verified Real-World Proof
                </h3>
                <button
                  onClick={() => setActiveTab("proof")}
                  className="text-xs text-sky-400 font-medium"
                >
                  View All ({FIELD_ARCHIVES.length}) →
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {FIELD_ARCHIVES.slice(0, 2).map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedPhoto(item)}
                    className="group relative rounded-xl overflow-hidden bg-[#141824] border border-white/10 cursor-pointer"
                  >
                    <img
                      src={item.photo}
                      alt={item.title}
                      className="w-full h-24 object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="p-2">
                      <div className="font-bold text-[11px] text-white truncate">{item.title}</div>
                      <div className="text-[10px] text-emerald-400 truncate">{item.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: PROJECTS */}
        {/* ============================================================== */}
        {activeTab === "projects" && (
          <motion.div
            key="tab-projects"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-3"
          >
            <div className="flex items-center justify-between pb-1">
              <div>
                <h2 className="text-base font-bold text-white">Engineered Systems</h2>
                <p className="text-[11px] text-white/60">Production architectures, AI platforms, and hackathon winners</p>
              </div>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80">
                {PROJECTS.length} Systems
              </span>
            </div>

            {PROJECTS.map((proj) => {
              const isExpanded = expandedProject === proj.id;
              return (
                <div
                  key={proj.id}
                  className="rounded-xl bg-[#141824] border border-white/10 overflow-hidden shadow-sm transition-all"
                >
                  <div
                    onClick={() => setExpandedProject(isExpanded ? null : proj.id)}
                    className="p-3.5 flex items-start justify-between gap-2 cursor-pointer hover:bg-white/[0.02]"
                  >
                    <div>
                      <span className="text-[10px] font-mono font-semibold text-amber-400 uppercase tracking-wider">
                        {proj.tag}
                      </span>
                      <h3 className="font-bold text-sm text-white mt-0.5">{proj.name}</h3>
                      <p className="text-xs text-white/70 line-clamp-2 mt-1 leading-snug">
                        {proj.problem}
                      </p>
                    </div>
                    <ChevronRight
                      size={16}
                      className={`text-white/40 mt-1 shrink-0 transition-transform ${
                        isExpanded ? "rotate-90 text-white" : ""
                      }`}
                    />
                  </div>

                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-3.5 pb-4 pt-1 border-t border-white/5 space-y-3 bg-[#11141f]"
                    >
                      {/* Architecture Solution */}
                      <div>
                        <div className="text-[11px] font-bold text-sky-400 uppercase tracking-wider mb-1">
                          The Architecture & Solution
                        </div>
                        <p className="text-xs text-white/80 leading-relaxed">
                          {proj.solution}
                        </p>
                      </div>

                      {/* Tech Stack Chips */}
                      {proj.techStack && (
                        <div>
                          <div className="text-[11px] font-bold text-white/60 uppercase tracking-wider mb-1.5">
                            Technologies
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {proj.techStack.map((tech) => (
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

                      {/* Architecture Layers */}
                      {proj.architecture && (
                        <div>
                          <div className="text-[11px] font-bold text-white/60 uppercase tracking-wider mb-1.5">
                            System Flow
                          </div>
                          <div className="space-y-1">
                            {proj.architecture.map((arch) => (
                              <div
                                key={arch.layer}
                                className="p-2 rounded bg-black/40 border border-white/5 text-[11px]"
                              >
                                <span className="font-bold text-emerald-400">{arch.layer}: </span>
                                <span className="text-white/80">{arch.tech} — {arch.role}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Live Demo & Code Links */}
                      <div className="flex items-center gap-2 pt-2">
                        {proj.live && (
                          <a
                            href={proj.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                          >
                            <span>Live Deployment</span>
                            <ArrowUpRight size={13} />
                          </a>
                        )}
                        {proj.github && (
                          <a
                            href={proj.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="py-2 px-3 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                          >
                            <Github size={13} />
                            <span>Source</span>
                          </a>
                        )}
                      </div>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </motion.div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: FIELD PROOF (Moments & Stages) */}
        {/* ============================================================== */}
        {activeTab === "proof" && (
          <motion.div
            key="tab-proof"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-3"
          >
            <div>
              <h2 className="text-base font-bold text-white">Spotted in the Wild</h2>
              <p className="text-[11px] text-white/60">
                Verified photos from 72h hackathons, GDG audis, and client completion letters
              </p>
            </div>

            {/* Categories */}
            <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1 rounded-full text-xs font-medium shrink-0 transition-colors ${
                    activeCategory === cat
                      ? "bg-emerald-500 text-black font-bold"
                      : "bg-white/10 text-white/70 hover:bg-white/15"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Photo Feed */}
            <div className="space-y-3">
              {filteredArchives.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl bg-[#141824] border border-white/10 overflow-hidden shadow-lg"
                >
                  <div className="relative group cursor-pointer" onClick={() => setSelectedPhoto(item)}>
                    <img
                      src={item.photo}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-48 sm:h-56 object-cover"
                    />
                    <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md text-[10px] font-bold text-emerald-400 border border-emerald-400/30">
                      {item.category}
                    </div>
                    <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white">
                      <ZoomIn size={13} />
                    </div>
                  </div>

                  <div className="p-3.5">
                    <div className="flex items-center justify-between text-[11px] text-white/50 mb-1">
                      <span>{item.date}</span>
                      <span>{item.location}</span>
                    </div>
                    <h3 className="font-bold text-sm text-white">{item.title}</h3>
                    <div className="text-xs font-medium text-sky-400 mt-0.5">{item.role}</div>
                    <p className="text-xs text-white/70 mt-2 leading-relaxed">
                      {item.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ============================================================== */}
        {/* TAB 4: INTERVIEW LAUNCHER */}
        {/* ============================================================== */}
        {activeTab === "interview" && (
          <motion.div
            key="tab-interview"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-4 text-center py-4"
          >
            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-2xl shadow-emerald-500/20">
              <div className="w-full h-full rounded-[22px] bg-[#121520] flex items-center justify-center">
                <Video size={36} className="text-emerald-400 animate-pulse" />
              </div>
            </div>

            <div>
              <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-2">
                INTERACTIVE 3D AVATAR
              </span>
              <h2 className="text-xl font-bold text-white">Live Virtual Interview</h2>
              <p className="text-xs text-white/70 max-w-xs mx-auto mt-1 leading-relaxed">
                Connect directly with Yug's AI avatar. Ask about his architecture decisions, GDG leadership, C++ DSA foundations, or hackathon wins.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#141824] border border-white/10 max-w-sm mx-auto text-left space-y-2">
              <div className="text-[11px] font-bold text-white/60 uppercase tracking-wider">
                Sample Questions to Ask:
              </div>
              <ul className="text-xs text-white/80 space-y-1.5 list-disc list-inside">
                <li>Tell me about yourself and your journey</li>
                <li>Explain LinqChain (Resilience OS) architecture</li>
                <li>How did you grow GDG from 1,100 to 2,300?</li>
                <li>What broke in production and what did it teach you?</li>
              </ul>
            </div>

            <button
              onClick={onOpenInterview}
              className="w-full max-w-sm mx-auto py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 hover:brightness-110 text-white font-bold text-sm shadow-xl shadow-emerald-950/50 flex items-center justify-center gap-2 cursor-pointer active:scale-98 transition-transform"
            >
              <Video size={18} />
              <span>Launch Interview Room</span>
            </button>
          </motion.div>
        )}

        {/* ============================================================== */}
        {/* TAB 5: RECRUITER / DOSSIER */}
        {/* ============================================================== */}
        {activeTab === "recruiter" && (
          <motion.div
            key="tab-recruiter"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between pb-1">
              <div>
                <h2 className="text-base font-bold text-white">Recruiter 60-Second View</h2>
                <p className="text-[11px] text-white/60">Key metrics, verified credentials, and immediate contacts</p>
              </div>
              <a
                href={LINKS.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold flex items-center gap-1 shadow cursor-pointer"
              >
                <FileDown size={12} />
                <span>PDF</span>
              </a>
            </div>

            {/* Summary Card */}
            <div className="p-4 rounded-2xl bg-[#141824] border border-white/10 space-y-3">
              <div className="flex items-center gap-3">
                <img
                  src={HEADSHOT}
                  alt="Yug"
                  className="w-14 h-14 rounded-xl object-cover border border-white/20"
                />
                <div>
                  <h3 className="font-bold text-base text-white">{RECRUITER.name}</h3>
                  <div className="text-xs text-emerald-400 font-medium">{RECRUITER.role}</div>
                  <div className="text-[11px] text-white/60 mt-0.5">{RECRUITER.education}</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10">
                {RECRUITER.stats.map((s) => (
                  <div key={s.v} className="p-2 rounded-lg bg-black/30 text-center">
                    <div className="text-base font-bold text-sky-400">{s.k}</div>
                    <div className="text-[9px] text-white/50 tracking-wider uppercase">{s.v}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Highlights List */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white/60">
                Verified Career Highlights
              </h3>
              {RECRUITER.highlights.map((h) => (
                <div
                  key={h.org}
                  className="p-3 rounded-xl bg-[#141824] border border-white/5 flex items-start gap-2.5"
                >
                  <Award size={15} className="text-amber-400 mt-0.5 shrink-0" />
                  <div>
                    <div className="font-bold text-xs text-white">{h.org}</div>
                    <div className="text-[11px] text-white/70 mt-0.5 leading-snug">{h.what}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Direct Connect Grid */}
            <div className="p-4 rounded-2xl bg-[#141824] border border-white/10 space-y-2.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white/60">
                Get In Touch
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`mailto:${LINKS.email}`}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-medium flex items-center gap-2"
                >
                  <Mail size={14} className="text-emerald-400" />
                  <span className="truncate">Email Me</span>
                </a>
                <a
                  href={LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-medium flex items-center gap-2"
                >
                  <Linkedin size={14} className="text-sky-400" />
                  <span className="truncate">LinkedIn</span>
                </a>
                <a
                  href={LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-medium flex items-center gap-2"
                >
                  <Github size={14} className="text-white/80" />
                  <span className="truncate">GitHub</span>
                </a>
                <button
                  onClick={onOpenTerminal}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-medium flex items-center gap-2 cursor-pointer"
                >
                  <Zap size={14} className="text-amber-400" />
                  <span className="truncate">Terminal AI</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </main>

      {/* Bottom Mobile App Navigation Bar */}
      <nav className="h-16 px-2 bg-[#10131d]/95 backdrop-blur-xl border-t border-white/10 flex items-center justify-around shrink-0 z-30 pb-[env(safe-area-inset-bottom)]">
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
                    className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-emerald-400"
                  />
                )}
              </div>
              <span className="text-[10px] font-medium mt-1 leading-none">{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Full-Screen Lightbox for Photos */}
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
              <span className="text-xs font-semibold">{selectedPhoto.title}</span>
              <button
                onClick={() => setSelectedPhoto(null)}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>
            <div className="my-auto flex items-center justify-center">
              <img
                src={selectedPhoto.photo}
                alt={selectedPhoto.title}
                className="max-h-[65vh] w-auto max-w-full rounded-xl object-contain shadow-2xl"
              />
            </div>
            <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md text-center text-xs text-white/90">
              <div className="font-bold">{selectedPhoto.role} · {selectedPhoto.location}</div>
              <div className="text-[11px] text-white/70 mt-1">{selectedPhoto.caption}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
