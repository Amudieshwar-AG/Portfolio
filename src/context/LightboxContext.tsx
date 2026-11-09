import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ZoomIn, ZoomOut, RotateCcw, X, Maximize2 } from "lucide-react";

interface LightboxState {
  isOpen: boolean;
  src: string;
  title: string;
}

interface LightboxContextType {
  openLightbox: (src: string, title?: string) => void;
  closeLightbox: () => void;
}

const LightboxContext = createContext<LightboxContextType | undefined>(undefined);

export const LightboxProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lightbox, setLightbox] = useState<LightboxState>({
    isOpen: false,
    src: "",
    title: "",
  });

  const [scale, setScale] = useState(1);

  const openLightbox = useCallback((src: string, title: string = "") => {
    setLightbox({ isOpen: true, src, title });
    setScale(1);
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setLightbox((prev) => ({ ...prev, isOpen: false }));
    setScale(1);
    document.body.style.overflow = "";
  }, []);

  const zoomIn = () => setScale((prev) => Math.min(3.5, Number((prev + 0.25).toFixed(2))));
  const zoomOut = () => setScale((prev) => Math.max(0.5, Number((prev - 0.25).toFixed(2))));
  const resetZoom = () => setScale(1);

  // Keyboard navigation (ESC to close, +/- to zoom)
  useEffect(() => {
    if (!lightbox.isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "+" || e.key === "=") zoomIn();
      if (e.key === "-" || e.key === "_") zoomOut();
      if (e.key === "0") resetZoom();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightbox.isOpen, closeLightbox]);

  // Wheel zoom handler
  const handleWheel = (e: React.WheelEvent) => {
    e.stopPropagation();
    if (e.deltaY < 0) {
      zoomIn();
    } else {
      zoomOut();
    }
  };

  return (
    <LightboxContext.Provider value={{ openLightbox, closeLightbox }}>
      {children}

      <AnimatePresence>
        {lightbox.isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex flex-col justify-between bg-black/92 backdrop-blur-xl select-none"
            onClick={closeLightbox}
          >
            {/* Top Bar: Title & Controls */}
            <div
              className="relative z-10 w-full px-6 py-4 flex items-center justify-between border-b border-white/10 bg-black/40 backdrop-blur-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-2 truncate max-w-[60%]">
                <span className="font-mono text-xs text-[#FAC300] tracking-wider uppercase font-semibold">
                  Preview //
                </span>
                <span className="font-display text-sm md:text-base font-medium text-white truncate">
                  {lightbox.title || "Image Viewer"}
                </span>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Zoom Out */}
                <button
                  type="button"
                  onClick={zoomOut}
                  disabled={scale <= 0.5}
                  title="Zoom Out (-)"
                  className="p-2 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] disabled:opacity-40 text-white transition-colors"
                >
                  <ZoomOut size={17} />
                </button>

                {/* Percentage readout / Reset */}
                <button
                  type="button"
                  onClick={resetZoom}
                  title="Reset Zoom (0)"
                  className="px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-xs font-mono text-white/90 transition-colors flex items-center gap-1.5"
                >
                  <RotateCcw size={12} className="text-[#FAC300]" />
                  <span>{Math.round(scale * 100)}%</span>
                </button>

                {/* Zoom In */}
                <button
                  type="button"
                  onClick={zoomIn}
                  disabled={scale >= 3.5}
                  title="Zoom In (+)"
                  className="p-2 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] disabled:opacity-40 text-white transition-colors"
                >
                  <ZoomIn size={17} />
                </button>

                <div className="w-px h-5 bg-white/15 mx-1" />

                {/* Close Button */}
                <button
                  type="button"
                  onClick={closeLightbox}
                  title="Close (Esc)"
                  className="p-2 rounded-lg bg-[#FAC300] hover:bg-[#FAC300]/90 text-[#0A0A12] font-bold transition-all shadow-[0_0_12px_rgba(250,195,0,0.3)] hover:scale-105"
                >
                  <X size={18} strokeWidth={2.5} />
                </button>
              </div>
            </div>

            {/* Main Image Stage */}
            <div
              className="relative flex-1 w-full h-full flex items-center justify-center p-4 md:p-8 overflow-hidden"
              onWheel={handleWheel}
              onClick={closeLightbox}
            >
              <motion.div
                drag={scale > 1}
                dragConstraints={{ left: -400 * scale, right: 400 * scale, top: -300 * scale, bottom: 300 * scale }}
                dragElastic={0.08}
                animate={{ scale }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className={`relative flex items-center justify-center max-w-full max-h-full ${
                  scale > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (scale === 1) zoomIn();
                }}
                onDoubleClick={(e) => {
                  e.stopPropagation();
                  setScale((prev) => (prev > 1 ? 1 : 2));
                }}
              >
                <img
                  src={lightbox.src}
                  alt={lightbox.title}
                  className="max-h-[80vh] max-w-[90vw] object-contain rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] border border-white/10 pointer-events-auto"
                />
              </motion.div>
            </div>

            {/* Bottom Helper Bar */}
            <div
              className="py-3 px-6 text-center border-t border-white/[0.06] bg-black/40 text-[11px] font-mono text-white/40 flex items-center justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="hidden sm:inline">Tip: Scroll mouse wheel to zoom in / out</span>
              <span className="hidden sm:inline">Double-click to toggle 2x zoom • Drag to pan when zoomed</span>
              <span className="text-white/60">Press ESC or click background to close</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </LightboxContext.Provider>
  );
};

export const useLightbox = () => {
  const context = useContext(LightboxContext);
  if (!context) {
    throw new Error("useLightbox must be used within a LightboxProvider");
  }
  return context;
};
