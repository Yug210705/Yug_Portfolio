import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, MapPin, Calendar, Award, ExternalLink, X, ZoomIn } from "lucide-react";
import { FIELD_ARCHIVES } from "@/data/content";
import { Win98Window } from "./Win98";

const playClick = () => {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.04);
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.04);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.04);
  } catch (e) {}
};

const CATEGORIES = ["ALL", "Hackathons", "Leadership", "Conferences", "Work", "Voice AI"];

export default function FieldGalleryModal({ open, onClose, onOpenStory }) {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [activePhoto, setActivePhoto] = useState(null);

  if (!open) return null;

  const filtered = activeCategory === "ALL"
    ? FIELD_ARCHIVES
    : FIELD_ARCHIVES.filter((item) => item.category === activeCategory);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 pb-20 sm:pb-24 bg-black/60 backdrop-blur-sm">
      <Win98Window
        testid="window-field-archives"
        title="SPOTTED_IN_THE_WILD.EXE — REAL-WORLD PROOF OF WORK"
        icon={Camera}
        dark
        onClose={onClose}
        className="w-full max-w-5xl lg:max-w-6xl max-h-[76vh] flex flex-col shadow-2xl"
      >
        <div className="bg-[#12141c] text-[#e2e8f0] flex-1 flex flex-col overflow-hidden">
          {/* Header Bar with punchy Selva-beating headline */}
          <div className="p-4 sm:p-5 border-b border-[#33ff33]/20 bg-[#0e1017] flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-vt text-2xl sm:text-3xl text-[#33ff33] phos">SPOTTED IN THE WILD</span>
                <span className="font-vt text-xs tracking-widest text-[#ffb000] border border-[#ffb000]/40 px-2 py-0.5">
                  VERIFIED PROOF
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#9fb0c3] mt-1">
                Not just code in a repository. Real photos from stages, 72-hour hackathons, community rooms, and production deployments.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1.5">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    playClick();
                    setActiveCategory(cat);
                  }}
                  className={`font-vt text-sm px-3 py-1 border transition-colors cursor-pointer ${
                    activeCategory === cat
                      ? "bg-[#33ff33] text-black border-[#33ff33] font-bold"
                      : "bg-[#181a24] text-[#9fb0c3] border-[#33ff33]/30 hover:text-white"
                  }`}
                >
                  {cat.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Grid of Polaroid/Field Archive Cards */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6" data-lenis-prevent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.15 }}
                  onClick={() => {
                    playClick();
                    setActivePhoto(item);
                  }}
                  className="bevel-dark border border-[#33ff33]/20 bg-[#161822] cursor-pointer group flex flex-col justify-between overflow-hidden shadow-lg"
                >
                  <div>
                    {/* Photo with hover zoom */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-black/40">
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />

                      {/* Date Badge */}
                      <div className="absolute top-2 left-2 bg-[#0c0d12]/90 border border-[#33ff33]/40 font-vt text-xs text-[#33ff33] px-2 py-0.5 flex items-center gap-1">
                        <Calendar size={11} />
                        {item.date}
                      </div>

                      {/* Expand Icon */}
                      <div className="absolute bottom-2 right-2 bg-black/80 text-[#33ff33] p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ZoomIn size={14} />
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-3.5">
                      <div className="inline-block font-vt text-xs tracking-wider text-[#ffb000] border border-[#ffb000]/40 bg-[#ffb000]/10 px-2 py-0.5 mb-2">
                        {item.badge}
                      </div>
                      <h3 className="font-vt text-xl text-white group-hover:text-[#33ff33] transition-colors leading-snug">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-1 text-[11px] text-[#9fb0c3] mt-1 font-mono">
                        <MapPin size={11} className="text-[#33ff33]/70 shrink-0" />
                        <span className="truncate">{item.location}</span>
                      </div>
                      <p className="text-xs text-[#9fb0c3]/80 mt-2.5 line-clamp-3 leading-relaxed">
                        {item.story}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer Metric Strip */}
                  <div className="px-3.5 py-2 border-t border-white/5 bg-[#0e1017] font-vt text-xs text-[#33ff33]/80 flex items-center justify-between">
                    <span>{item.stats}</span>
                    <span className="text-[#ffb000] group-hover:translate-x-0.5 transition-transform">VIEW ↗</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Footer Bar */}
          <div className="p-3 border-t border-white/10 bg-[#0c0d12] flex items-center justify-between text-xs text-[#9fb0c3]">
            <span className="font-vt text-sm text-[#33ff33]">TOTAL FIELD RECORDS: {FIELD_ARCHIVES.length}</span>
            <div className="flex items-center gap-3">
              {onOpenStory && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenStory();
                  }}
                  className="font-vt text-sm text-[#ffb000] hover:underline cursor-pointer"
                >
                  Prefer reading the story? → STORY MODE
                </button>
              )}
              <button
                onClick={onClose}
                className="bevel-btn font-vt text-sm px-3 py-1 text-inherit"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      </Win98Window>

      {/* Full Lightbox Preview Modal */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePhoto(null)}
            className="fixed inset-0 z-60 bg-black/85 flex items-center justify-center p-3 sm:p-8 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#12141c] border-2 border-[#33ff33]/50 max-w-3xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute top-3 right-3 z-10 bg-black/70 hover:bg-red-600 text-white p-1.5 rounded transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>

              {/* Photo Display */}
              <div className="bg-black/60 max-h-[55vh] flex items-center justify-center overflow-hidden">
                <img
                  src={activePhoto.image}
                  alt={activePhoto.title}
                  className="max-h-[55vh] w-auto max-w-full object-contain"
                />
              </div>

              {/* Backstory Details */}
              <div className="p-5 overflow-y-auto">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="font-vt text-sm text-[#00ffff] border border-[#00ffff]/40 bg-[#00ffff]/10 px-2 py-0.5">
                    {activePhoto.date}
                  </span>
                  <span className="font-vt text-sm text-[#ffb000] border border-[#ffb000]/50 bg-[#ffb000]/10 px-2 py-0.5">
                    {activePhoto.badge}
                  </span>
                  <span className="font-mono text-xs text-[#9fb0c3] flex items-center gap-1">
                    <MapPin size={12} className="text-[#33ff33]" />
                    {activePhoto.location}
                  </span>
                </div>

                <h2 className="font-vt text-3xl text-white mt-1 phos">{activePhoto.title}</h2>
                <p className="text-sm text-[#9fb0c3] mt-3 leading-relaxed">
                  {activePhoto.story}
                </p>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between font-vt text-sm text-[#33ff33]">
                  <span>VERIFIED RECORD: {activePhoto.stats}</span>
                  <button
                    onClick={() => setActivePhoto(null)}
                    className="bevel-btn font-vt px-4 py-1 text-inherit"
                  >
                    CLOSE PREVIEW
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
