import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoaderProps {
  onComplete?: () => void;
}

const Loader = ({ onComplete }: LoaderProps) => {
  const [isDone, setIsDone] = useState(false);
  const [showShutter, setShowShutter] = useState(true);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // 3.0 seconds duration: Gives Three.js & HDR environment ample time to initialize & compile in the background
    const duration = 3000;
    const startTime = performance.now();
    let animationFrameId: number;

    const updateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(1, elapsed / duration);

      // Smooth custom ease-out cubic curve
      const eased = 1 - Math.pow(1 - progress, 2.6);
      const current = Math.round(eased * 100);

      // Direct DOM update: Bypasses React state overhead for locked 60fps
      if (counterRef.current) {
        counterRef.current.textContent = `${String(current).padStart(3, "0")}%`;
      }

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateProgress);
      } else {
        // Brief hold at 100% to let eyes settle
        setTimeout(() => {
          setIsDone(true); // Fades out center monogram & counter

          // Trigger cinematic shutter open
          setTimeout(() => {
            setShowShutter(false);
            setTimeout(() => {
              onComplete?.();
            }, 950);
          }, 200);
        }, 150);
      }
    };

    animationFrameId = requestAnimationFrame(updateProgress);

    return () => cancelAnimationFrame(animationFrameId);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {showShutter && (
        <div className="fixed inset-0 z-[200] pointer-events-none select-none overflow-hidden">
          {/* CINEMATIC SHUTTER: TOP PANEL (Slides UP on complete) */}
          <motion.div
            initial={{ y: 0 }}
            animate={isDone ? { y: "-100%" } : { y: 0 }}
            transition={{
              duration: 0.95,
              ease: [0.76, 0, 0.24, 1],
              delay: 0.05,
            }}
            className="absolute top-0 left-0 right-0 h-1/2 bg-[#07070D] border-b border-[#FAC300]/20 pointer-events-auto shadow-[0_10px_40px_rgba(0,0,0,0.8)]"
          />

          {/* CINEMATIC SHUTTER: BOTTOM PANEL (Slides DOWN on complete) */}
          <motion.div
            initial={{ y: 0 }}
            animate={isDone ? { y: "100%" } : { y: 0 }}
            transition={{
              duration: 0.95,
              ease: [0.76, 0, 0.24, 1],
              delay: 0.05,
            }}
            className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#07070D] border-t border-[#FAC300]/20 pointer-events-auto shadow-[0_-10px_40px_rgba(0,0,0,0.8)]"
          />

          {/* CENTER GOLDEN HORIZONTAL SEAM (Expands and flashes on unveil) */}
          <motion.div
            initial={{ opacity: 0.4, scaleX: 1 }}
            animate={
              isDone
                ? { opacity: [0.4, 1, 0], scaleX: [1, 1.2, 0] }
                : { opacity: 0.4, scaleX: 1 }
            }
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute top-1/2 left-0 right-0 h-[1.5px] -translate-y-1/2 bg-gradient-to-r from-transparent via-[#FAC300] to-transparent z-10 shadow-[0_0_15px_rgba(250,195,0,0.8)]"
          />

          {/* FOREGROUND CONTENT: Minimalist Luxury Monogram & Counter Only */}
          <motion.div
            animate={
              isDone
                ? { opacity: 0, scale: 0.92, filter: "blur(6px)" }
                : { opacity: 1, scale: 1, filter: "blur(0px)" }
            }
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-auto"
          >
            {/* Center: Branded "AG" Monogram (Hardware-Accelerated) */}
            <div className="relative flex flex-col items-center justify-center">
              {/* Soft Ambient Gold Pulsing Glow */}
              <div
                className="absolute w-72 h-72 rounded-full bg-[#FAC300]/15 blur-[90px] pointer-events-none"
                style={{
                  willChange: "transform, opacity",
                  animation: "pulse-glow 3s ease-in-out infinite",
                }}
              />

              {/* Rotating Tech Calibration Ring */}
              <div
                className="relative w-40 h-40 flex items-center justify-center"
                style={{
                  willChange: "transform",
                  animation: "spin-smooth 20s linear infinite",
                }}
              >
                <svg width="160" height="160" viewBox="0 0 160 160" className="absolute inset-0">
                  <circle
                    cx="80"
                    cy="80"
                    r="74"
                    fill="none"
                    stroke="#FAC300"
                    strokeWidth="1.2"
                    strokeOpacity="0.25"
                    strokeDasharray="6 8"
                  />
                  <circle cx="80" cy="6" r="2.5" fill="#FAC300" />
                  <circle cx="154" cy="80" r="2.5" fill="#FAC300" />
                  <circle cx="80" cy="154" r="2.5" fill="#FAC300" />
                  <circle cx="6" cy="80" r="2.5" fill="#FAC300" />
                </svg>
              </div>

              {/* Hexagonal Shield & "AG" Monogram */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <svg width="130" height="130" viewBox="0 0 130 130">
                  {/* Outer Hexagon Shield */}
                  <polygon
                    points="65,10 115,38 115,92 65,120 15,92 15,38"
                    fill="rgba(11, 11, 19, 0.85)"
                    stroke="#FAC300"
                    strokeWidth="1.6"
                    strokeOpacity="0.75"
                    filter="drop-shadow(0 0 8px rgba(250,195,0,0.3))"
                  />

                  {/* Inner Dashed Border */}
                  <polygon
                    points="65,22 103,44 103,86 65,108 27,86 27,44"
                    fill="none"
                    stroke="#FAC300"
                    strokeWidth="0.8"
                    strokeOpacity="0.25"
                    strokeDasharray="3 4"
                  />

                  {/* "AG" Typography */}
                  <text
                    x="50%"
                    y="54%"
                    dominantBaseline="middle"
                    textAnchor="middle"
                    className="font-display font-bold select-none"
                    fontSize="42"
                    letterSpacing="2px"
                    fill="url(#goldGradient)"
                    stroke="#FAC300"
                    strokeWidth="1"
                  >
                    AG
                  </text>

                  <defs>
                    <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
                      <stop offset="45%" stopColor="#FAC300" stopOpacity="0.95" />
                      <stop offset="100%" stopColor="#FF9E00" stopOpacity="0.85" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Clean Precision Monospace Percentage Counter */}
              <div className="mt-8 flex flex-col items-center">
                <span
                  ref={counterRef}
                  className="font-mono text-3xl md:text-4xl font-bold tracking-widest text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.2)]"
                >
                  000%
                </span>
              </div>
            </div>
          </motion.div>

          {/* Embedded Compositor Keyframes */}
          <style>{`
            @keyframes spin-smooth {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            @keyframes pulse-glow {
              0%, 100% { opacity: 0.5; transform: scale(0.95); }
              50% { opacity: 0.9; transform: scale(1.08); }
            }
          `}</style>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Loader;