import { useState } from "react";
import { FlaskConical, HelpCircle } from "lucide-react";
import { PROJECTS } from "@/data/content";
import { Win98Window, PendingNote } from "./Win98";

const Section = ({ label, children, tone }) => (
  <div className={`p-3.5 ${tone === "amber" ? "bevel-dark-amber" : "bevel-dark"}`}>
    <div className={`font-vt text-[14px] tracking-[0.25em] mb-2 ${tone === "amber" ? "text-[#ffb000]/80" : "text-[#33ff33]/60"}`}>{label}</div>
    <div className="text-[14px] leading-relaxed text-[#e2e8f0]">
      {Array.isArray(children) ? (
        <ul className="flex flex-col gap-1.5">
          {children.map((x) => (
            <li key={x} className="flex gap-2">
              <span className="text-[#33ff33]/80 shrink-0">▪</span>
              <span>{x}</span>
            </li>
          ))}
        </ul>
      ) : (
        children
      )}
    </div>
  </div>
);

const ArchDiagram = ({ d }) => (
  <div className="bevel-dark p-4" data-testid="arch-diagram">
    <div className="font-vt text-[13px] tracking-widest text-[#33ff33]/50 mb-3">SIMPLIFIED ARCHITECTURE</div>
    <div className="flex flex-col items-center gap-2">
      <div className="font-vt text-[16px] text-[#ffb000] border border-[#ffb000]/50 px-3 py-1.5">{d.top}</div>
      <div className="w-px h-4 bg-[#33ff33]/40" />
      <div className="flex flex-wrap justify-center gap-2">
        {d.nodes.map((n) => (
          <div key={n} className="font-vt text-[15px] text-[#33ff33] border border-[#33ff33]/40 px-3 py-1.5 bg-[#0f1a10]">
            {n}
          </div>
        ))}
      </div>
    </div>
  </div>
);

const BuilderMode = ({ goMode, initialProject }) => {
  const [active, setActive] = useState(initialProject || "resilience");
  const proj = PROJECTS.find((p) => p.id === active) || PROJECTS[0];

  return (
    <div className="fixed inset-0 bg-[var(--desk)] p-3 sm:p-8 pb-16 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none grid-floor" />
      <Win98Window
        testid="window-engineering-lab"
        title="BUILDER_LAB.EXE — ENGINEERING DOSSIERS"
        icon={FlaskConical}
        dark
        onClose={() => goMode("desktop")}
        className="h-full max-w-4xl mx-auto"
      >
        <div className="bg-[#14161c] min-h-full">
          <div className="flex flex-wrap gap-1 px-3 pt-3">
            {PROJECTS.map((p) => (
              <button
                key={p.id}
                data-testid={`builder-tab-${p.id}`}
                onClick={() => setActive(p.id)}
                className={`font-vt text-[15px] px-3 py-1.5 border ${
                  active === p.id
                    ? "bg-[#0c0d12] text-[#33ff33] border-[#33ff33]/50"
                    : "bg-transparent text-[#9fb0c3] border-[#33ff33]/20 hover:text-[#33ff33]"
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>

          <div className="p-4 sm:p-5 flex flex-col gap-3.5" data-lenis-prevent>
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="font-vt text-3xl text-[#33ff33] phos">{proj.name}</h2>
              <span className="font-vt text-[13px] tracking-widest text-[#ffb000] border border-[#ffb000]/50 px-2 py-0.5">
                {proj.tag}
              </span>
              {proj.live && (
                <a
                  href={proj.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`open-live-${proj.id}`}
                  className="bevel-btn font-vt text-[15px] px-3 py-1.5 text-inherit"
                >
                  OPEN LIVE ↗
                </a>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-3.5">
              <Section label="PROBLEM">{proj.problem}</Section>
              <Section label="MY RESPONSIBILITY">{proj.responsibility}</Section>
            </div>

            <ArchDiagram d={proj.arch_diagram} />
            <p className="text-[13px] text-[#9fb0c3]">{proj.architecture}</p>

            <Section label="STACK">{proj.stack.length ? proj.stack.join(" · ") : <PendingNote label="STACK — FIELD NOTES PENDING" />}</Section>
            <Section label="ENGINEERING DECISIONS">
              {proj.decisions.length ? proj.decisions : <PendingNote label="DECISIONS — FIELD NOTES PENDING" />}
            </Section>
            <Section label="OUTCOME">{proj.outcome.length ? proj.outcome : <PendingNote label="OUTCOME — FIELD NOTES PENDING" />}</Section>

            <Section label="WHAT BROKE" tone="amber">
              {proj.broke.length ? proj.broke : <PendingNote label="WHAT BROKE — FIELD NOTES PENDING" />}
            </Section>
            {proj.id === "campus" && (
              <div className="bevel-dark-amber p-3 flex items-start gap-3" data-testid="redacted-teaser">
                <HelpCircle size={16} className="text-[#ffb000] shrink-0 mt-1" />
                <p className="font-vt text-[16px] leading-snug text-[#ffb000]">
                  ASK ME ABOUT THE REDACTED ONE → the Campus OS breakage stays in my build logs. Interviews are where it gets told.
                </p>
              </div>
            )}
            <Section label="WHAT I LEARNED">{proj.learned}</Section>

            <p className="font-vt text-[14px] text-[#33ff33]/50">
              NOTE: this lab ships honest field notes, not marketing. Deep specs land here once Yug transcribes them from
              his build logs — nothing is invented for effect.
            </p>
          </div>
        </div>
      </Win98Window>
    </div>
  );
};

export default BuilderMode;
