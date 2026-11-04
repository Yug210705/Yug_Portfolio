import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import { PixelScene } from "./PixelScene";

const MemoryWindow = ({ obj, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (!obj) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [obj, onClose]);

  return (
    <AnimatePresence>
      {obj && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[90] bg-black/65 backdrop-blur-[2px] flex items-center justify-center p-3 sm:p-6 pb-20 sm:pb-24"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.94, y: 14 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            className="bevel hard-shadow w-full max-w-4xl lg:max-w-5xl flex flex-col"
            style={{ maxHeight: "min(76dvh, 76vh)" }}
            onClick={(e) => e.stopPropagation()}
            data-testid={`memory-window-${obj.id}`}
            role="dialog"
            aria-label={obj.name}
          >
            {/* Titlebar */}
            <div className="titlebar-dark flex items-center justify-between gap-2 px-3 py-1.5 shrink-0 select-none">
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-2.5 h-2.5 rounded-full bg-[#33ff33] animate-pulse shrink-0" />
                <span className="font-vt text-[15px] text-[#33ff33] truncate">
                  {obj.file} — {obj.name}
                </span>
                <span className="hidden sm:inline-block font-vt text-[12px] text-[#ffb000] border border-[#ffb000]/30 px-1.5 py-0.2 shrink-0">
                  ARCHIVAL DOSSIER
                </span>
              </div>
              <button
                aria-label="close memory"
                onClick={onClose}
                className="bevel-btn w-6 h-6 flex items-center justify-center text-inherit hover:bg-red-600 hover:text-white transition-colors cursor-pointer shrink-0"
              >
                <X size={13} />
              </button>
            </div>

            {/* Horizontally Wide Body - 2 Columns */}
            <div className="p-4 sm:p-5 bg-[#14161c] overflow-y-auto flex-1 min-h-0" data-lenis-prevent>
              <div className={`grid grid-cols-1 ${obj.photos || obj.photo ? "md:grid-cols-12 gap-5" : "gap-4"}`}>
                {/* Left Column: Narrative & Pixel Scene */}
                <div className={obj.photos || obj.photo ? "md:col-span-6 flex flex-col" : "max-w-2xl"}>
                  <div className="bevel-dark p-2 mb-3 bg-black/40">
                    <PixelScene art={obj.art} className="w-full h-24 sm:h-28" />
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-vt text-[13px] text-[#33ff33]/80 tracking-widest uppercase">
                      ERA: {obj.era}
                    </span>
                    <span className="h-px flex-1 bg-[#33ff33]/20" />
                  </div>

                  <p className="text-[14px] sm:text-[15px] leading-relaxed text-[#e2e8f0] font-sans opacity-95">
                    {obj.memory}
                  </p>

                  <div className="mt-4 pt-3 border-t border-[#33ff33]/20 font-vt text-[15px] sm:text-[16px] text-[#ffb000] phos-amber">
                    {obj.caused}
                  </div>
                </div>

                {/* Right Column: Photographic Evidence */}
                {(obj.photos || obj.photo) && (
                  <div className="md:col-span-6 flex flex-col justify-start">
                    <div className="font-vt text-[12px] text-[#33ff33]/70 uppercase tracking-wider mb-2 flex items-center justify-between">
                      <span>ATTACHED ARCHIVAL PHOTOGRAPHS</span>
                      <span className="text-[#ffb000]">REAL-WORLD PROOF</span>
                    </div>

                    {obj.photo && (
                      <div className="bevel-dark p-1.5 bg-[#0a0c10] mb-3 group relative overflow-hidden">
                        <img
                          src={obj.photo}
                          alt={obj.name}
                          loading="lazy"
                          className="w-full h-56 sm:h-64 object-cover rounded cursor-pointer transition-transform group-hover:scale-[1.02]"
                          onClick={() => setSelectedImage(obj.photo)}
                        />
                        <div
                          onClick={() => setSelectedImage(obj.photo)}
                          className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer"
                        >
                          <div className="flex items-center gap-1.5 px-3 py-1 bg-black/80 text-white font-vt text-sm border border-white/20 rounded">
                            <ZoomIn size={14} /> ENLARGE PHOTOGRAPH
                          </div>
                        </div>
                      </div>
                    )}

                    {obj.photos && (
                      <div
                        className="grid grid-cols-3 gap-2"
                        data-testid="memory-photo-gallery"
                      >
                        {obj.photos.map((p, idx) => (
                          <div
                            key={p + idx}
                            className="bevel-dark p-1 bg-[#0a0c10] group relative overflow-hidden cursor-pointer"
                            onClick={() => setSelectedImage(p)}
                          >
                            <img
                              src={p}
                              alt={`${obj.name} archive ${idx + 1}`}
                              loading="lazy"
                              className="w-full h-24 object-cover rounded transition-transform group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                              <ZoomIn size={14} className="text-white" />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="font-vt text-[12px] text-[#33ff33]/50 mt-2">
                      STATUS: Verified authentic evidence from university events and industry stages.
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Image Lightbox Inspection */}
            <AnimatePresence>
              {selectedImage && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[100] bg-black/90 p-4 pb-20 flex flex-col items-center justify-center"
                  onClick={() => setSelectedImage(null)}
                >
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-4 right-4 text-white hover:text-red-400 p-2 cursor-pointer"
                  >
                    <X size={24} />
                  </button>
                  <img
                    src={selectedImage}
                    alt="Full archival inspection"
                    className="max-w-[90vw] max-h-[75vh] object-contain border border-[#33ff33]/40 shadow-2xl"
                  />
                  <div className="font-vt text-sm text-[#33ff33] mt-3">
                    CLICK ANYWHERE OR ESCAPE TO RETURN TO DOSSIER
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MemoryWindow;
