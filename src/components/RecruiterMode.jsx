import { motion } from "framer-motion";
import { FileText, Github, Linkedin, Mail, FileDown, BookOpen } from "lucide-react";
import { LINKS, RECRUITER, FIELD_ARCHIVES } from "@/data/content";
import { PROJECTS } from "@/data/content";
import { BevelBtn, Win98Window } from "./Win98";

const HEADSHOT = "/assets/headshot.png";

const LinkBtn = ({ href, icon: Icon, label, testid }) => {
  const disabled = !href;
  return disabled ? (
    <button
      disabled
      data-testid={testid}
      title="Link pending — Yug will connect this before final submission"
      className="bevel-btn font-vt text-[15px] px-3 py-2 flex items-center gap-2 opacity-50 text-inherit"
    >
      <Icon size={15} />
      {label}
      <span className="font-vt text-[12px] text-[#b45309] border border-[#b45309]/40 px-1">PENDING</span>
    </button>
  ) : (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-testid={testid}
      className="bevel-btn font-vt text-[15px] px-3 py-2 flex items-center gap-2 text-inherit hover:text-[var(--accent-color,#000080)]"
    >
      <Icon size={15} />
      {label}
    </a>
  );
};

const RecruiterMode = ({ goMode, goBuilder }) => {
  const [galleryOpen, setGalleryOpen] = useState(false);
  return (
  <div className="fixed inset-0 bg-[var(--desk)] p-3 sm:p-8 pb-16 overflow-hidden">
    <div className="absolute inset-0 opacity-[0.04] pointer-events-none grid-floor" />
    <Win98Window
      testid="window-recruiter-sheet"
      title="RECRUITER.TXT — YUG PATHAK — 60-SECOND VIEW"
      icon={FileText}
      onClose={() => goMode("desktop")}
      className="h-full max-w-4xl mx-auto"
    >
      <div className="bg-[var(--window-bg,#ece8dc)] text-[var(--window-text,#1a1a1a)] min-h-full transition-colors">
        <div className="px-5 sm:px-7 py-6 border-b border-[var(--card-border,#c0c0c0)]">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div className="flex items-center gap-4">
              <img
                src={HEADSHOT}
                alt="Yug Pathak"
                data-testid="recruiter-headshot"
                loading="lazy"
                className="w-16 h-16 sm:w-24 sm:h-24 object-cover bevel hard-shadow shrink-0"
              />
              <div>
                <h1 className="font-vt text-4xl sm:text-5xl text-[var(--window-text,#1a1a1a)] leading-none">{RECRUITER.name}</h1>
                <p className="font-vt text-[17px] text-[var(--accent-color,#000080)] mt-2">
                  {RECRUITER.education} · {RECRUITER.role}
                </p>
              </div>
            </div>
            <motion.button
              onClick={() => goMode("story")}
              data-testid="recruiter-to-story-link"
              animate={{ x: [0, 3, 0] }}
              transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
              whileHover={{ scale: 1.05 }}
              className="font-vt text-[15px] text-[var(--accent-color,#000080)] font-semibold underline hover:opacity-80 cursor-pointer"
            >
              Prefer the story? → STORY MODE (I'M CURIOUS)
            </motion.button>
          </div>
          <div className="grid grid-cols-3 gap-3 mt-6">
            {RECRUITER.stats.map((s) => (
              <div key={s.v} className="bevel-in px-3 py-3 text-center" data-testid={`recruiter-stat-${s.v.toLowerCase().replace("+", "plus")}`}>
                <div className="font-vt text-3xl sm:text-4xl text-[var(--accent-color,#000080)]">{s.k}</div>
                <div className="font-vt text-[14px] tracking-widest opacity-70 mt-1">{s.v}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="px-5 sm:px-7 py-6 grid md:grid-cols-2 gap-6">
          <div>
            <div className="font-vt text-[18px] text-[var(--window-text,#1a1a1a)] border-b border-[var(--card-border,#c0c0c0)] mb-3 pb-1">VERIFIED HIGHLIGHTS</div>
            <div className="flex flex-col gap-2.5">
              {RECRUITER.highlights.map((h) => (
                <div key={h.org} className="bevel-in px-3 py-2">
                  <div className="font-vt text-[17px] text-[var(--accent-color,#000080)]">{h.org}</div>
                  <div className="text-[13px] opacity-80">{h.what}</div>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <button
                onClick={() => setGalleryOpen(true)}
                className="w-full bevel font-vt text-[15px] px-3 py-2.5 bg-[var(--window-bg,#ece8dc)] text-[var(--accent-color,#000080)] hover:opacity-90 flex items-center justify-between cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Camera size={15} />
                  VIEW FIELD PROOF & STAGE PHOTOS ({FIELD_ARCHIVES.length} RECORDS)
                </span>
                <span>OPEN ↗</span>
              </button>
            </div>
          </div>

          <div>
            <div className="font-vt text-[18px] text-[var(--window-text,#1a1a1a)] border-b border-[var(--card-border,#c0c0c0)] mb-3 pb-1">SELECTED SYSTEMS</div>
            <div className="flex flex-col gap-2.5">
              {RECRUITER.projects.map((pid) => {
                const proj = PROJECTS.find((p) => p.id === pid);
                return (
                  <button
                    key={pid}
                    data-testid={`project-card-${pid}`}
                    onClick={() => goBuilder(pid)}
                    className="bevel-in px-3 py-2.5 text-left group cursor-pointer"
                  >
                    <div className="font-vt text-[17px] text-[var(--window-text,#1a1a1a)] group-hover:text-[var(--accent-color,#000080)] flex justify-between">
                      {proj.name}
                      <span className="opacity-70 group-hover:opacity-100">ARCHITECTURE ↗</span>
                    </div>
                    <div className="font-vt text-[13px] tracking-widest text-[#b45309]">{proj.tag}</div>
                  </button>
                );
              })}
            </div>

            <div className="font-vt text-[18px] text-[var(--window-text,#1a1a1a)] border-b border-[var(--card-border,#c0c0c0)] mt-6 mb-3 pb-1">CONNECT</div>
            <div className="flex flex-wrap gap-2">
              <LinkBtn href={LINKS.github} icon={Github} label="GitHub" testid="contact-github-link" />
              <LinkBtn href={LINKS.linkedin} icon={Linkedin} label="LinkedIn" testid="contact-linkedin-link" />
              <LinkBtn href={LINKS.resume} icon={FileDown} label="Resume" testid="download-resume-button" />
              <LinkBtn href={LINKS.email ? `mailto:${LINKS.email}` : ""} icon={Mail} label="Email" testid="contact-email-link" />
            </div>
          </div>
        </div>

        <div className="px-5 sm:px-7 pb-6">
          <motion.div
            animate={{ y: [0, -3.5, 0] }}
            transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
            whileHover={{ y: -5, scale: 1.01 }}
            className="bevel px-4 py-3 font-vt text-[15px] text-[var(--window-text,#1a1a1a)] flex flex-wrap items-center gap-2 shadow-sm"
          >
            <BookOpen size={15} />
            60 seconds up? The full memory runs in STORY MODE — same machine, different route.
            <BevelBtn testid="recruiter-open-story" onClick={() => goMode("story")} className="ml-auto">
              RUN STORY.EXE (I'M CURIOUS)
            </BevelBtn>
          </motion.div>
        </div>
      </div>
      <FieldGalleryModal
        open={galleryOpen}
        onClose={() => setGalleryOpen(false)}
        onOpenStory={() => goMode("story")}
      />
    </Win98Window>
  </div>
  );
};

export default RecruiterMode;
