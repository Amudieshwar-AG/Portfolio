import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoaderProps {
  onComplete?: () => void;
}

const Loader = ({ onComplete }: LoaderProps) => {
  const [isDone, setIsDone] = useState(false);
  const [showShutter, setShowShutter] = useState(true);

  // Direct DOM refs to eliminate React re-render overhead for locked 60/120fps
  const counterRef = useRef<HTMLSpanElement>(null);
  const leftBeamRef = useRef<HTMLDivElement>(null);
  const rightBeamRef = useRef<HTMLDivElement>(null);
  const leftGlintRef = useRef<HTMLDivElement>(null);
  const rightGlintRef = useRef<HTMLDivElement>(null);
  const emblemBaseRef = useRef<HTMLImageElement>(null);
  const emblemGlowRef = useRef<HTMLImageElement>(null);
  const circleGlowRef = useRef<HTMLDivElement>(null);
  const subFlareRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 4.0 seconds duration requested by the user
    const duration = 4000;
    const startTime = performance.now();
    let animationFrameId: number;

    const updateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(1, elapsed / duration);

      // Smooth custom easing curve
      const eased = 1 - Math.pow(1 - progress, 2.4);
      const current = Math.round(eased * 100);

      // 1. Direct Counter DOM Update (000% -> 100%)
      if (counterRef.current) {
        counterRef.current.textContent = `${String(current).padStart(3, "0")}%`;
      }

      // 2. Beams growing from BOTH ends toward the center (GPU Compositor translateZ)
      const beamScale = Math.min(1, eased * 1.02);
      if (leftBeamRef.current) {
        leftBeamRef.current.style.transform = `translateZ(0) scaleX(${beamScale})`;
      }
      if (rightBeamRef.current) {
        rightBeamRef.current.style.transform = `translateZ(0) scaleX(${beamScale})`;
      }

      // 3. Glints traveling along the beam
      if (leftGlintRef.current) {
        leftGlintRef.current.style.opacity = `${0.2 + eased * 0.8}`;
      }
      if (rightGlintRef.current) {
        rightGlintRef.current.style.opacity = `${0.2 + eased * 0.8}`;
      }

      // 4. Center Emblem glow escalation via 100% GPU-composited opacity (Zero CPU filter repaints)
      if (emblemBaseRef.current) {
        emblemBaseRef.current.style.opacity = `${0.65 + eased * 0.35}`;
      }
      if (emblemGlowRef.current) {
        emblemGlowRef.current.style.opacity = `${eased}`;
      }

      // 5. Radial Ambient Glow behind emblem (pure GPU opacity)
      if (circleGlowRef.current) {
        circleGlowRef.current.style.opacity = `${0.1 + eased * 0.55}`;
      }

      // 6. Sub-counter flare intensity
      if (subFlareRef.current) {
        subFlareRef.current.style.opacity = `${0.2 + eased * 0.8}`;
        subFlareRef.current.style.transform = `translateZ(0) scaleX(${0.5 + eased * 0.5})`;
      }

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateProgress);
      } else {
        // Hold at 100% for 180ms to show full peak radiance
        setTimeout(() => {
          setIsDone(true); // Triggers the horizontal split from center circle

          // Remove loader after split finishes
          setTimeout(() => {
            setShowShutter(false);
            setTimeout(() => {
              onComplete?.();
            }, 950);
          }, 180);
        }, 180);
      }
    };

    animationFrameId = requestAnimationFrame(updateProgress);

    return () => cancelAnimationFrame(animationFrameId);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {showShutter && (
        <div className="fixed inset-0 z-[200] pointer-events-none select-none overflow-hidden bg-black">
          {/* ========================================================= */}
          {/* HORIZONTAL SPLIT SHUTTER (Divides from center circle line) */}
          {/* ========================================================= */}

          {/* TOP HALF PANEL (Slides UP on 100%) */}
          <motion.div
            initial={{ y: 0 }}
            animate={isDone ? { y: "-100%" } : { y: 0 }}
            transition={{
              duration: 0.95,
              ease: [0.76, 0, 0.24, 1], // Cinematic luxury cubic-bezier
              delay: 0.05,
            }}
            className="absolute top-0 left-0 right-0 h-1/2 bg-black pointer-events-auto shadow-[0_15px_50px_rgba(0,0,0,0.9)] will-change-transform"
          />

          {/* BOTTOM HALF PANEL (Slides DOWN on 100%) */}
          <motion.div
            initial={{ y: 0 }}
            animate={isDone ? { y: "100%" } : { y: 0 }}
            transition={{
              duration: 0.95,
              ease: [0.76, 0, 0.24, 1],
              delay: 0.05,
            }}
            className="absolute bottom-0 left-0 right-0 h-1/2 bg-black pointer-events-auto shadow-[0_-15px_50px_rgba(0,0,0,0.9)] will-change-transform"
          />

          {/* CENTER GOLDEN HORIZONTAL SEAM (ONLY appears and flashes during horizontal split reveal) */}
          {isDone && (
            <motion.div
              initial={{ opacity: 0, scaleX: 0.6 }}
              animate={{ opacity: [0, 1, 0], scaleX: [0.6, 1.25, 0] }}
              transition={{ duration: 0.65, ease: "easeOut" }}
              className="absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent z-30 shadow-[0_0_20px_rgba(250,195,0,0.9)] pointer-events-none"
            />
          )}

          {/* ========================================================= */}
          {/* FOREGROUND ANIMATION STAGE                                 */}
          {/* ========================================================= */}
          <motion.div
            animate={
              isDone
                ? { opacity: 0, scale: 0.94, filter: "blur(6px)" }
                : { opacity: 1, scale: 1, filter: "blur(0px)" }
            }
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="absolute inset-0 z-20 pointer-events-auto overflow-hidden"
          >
            {/* ------------------------------------------------------- */}
            {/* INWARD DUAL-RAIL LIGHT BEAMS (Stops cleanly at collar)  */}
            {/* ------------------------------------------------------- */}

            {/* LEFT DUAL-RAIL BEAM */}
            <div
              ref={leftBeamRef}
              className="absolute left-0 top-1/2 -translate-y-1/2 origin-left pointer-events-none flex flex-col justify-center z-10 will-change-transform"
              style={{
                width: "calc(50% - 78px)",
                height: "16px",
                transform: "translateZ(0) scaleX(0)",
              }}
            >
              {/* Top hairline rail */}
              <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#C89B28] to-[#FFD700] opacity-80" />

              {/* Center intense laser core */}
              <div
                className="w-full h-[2px] my-auto bg-gradient-to-r from-transparent via-[#FAC300] to-white"
                style={{
                  boxShadow: "0 0 16px rgba(250,195,0,0.9), 0 0 30px rgba(250,195,0,0.5)",
                }}
              />

              {/* Bottom hairline rail */}
              <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#C89B28] to-[#FFD700] opacity-80" />

              {/* Flare Glint on left beam */}
              <div
                ref={leftGlintRef}
                className="absolute right-8 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full pointer-events-none"
                style={{
                  background: "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(250,195,0,0.85) 35%, transparent 70%)",
                  filter: "blur(0.5px)",
                }}
              />
            </div>

            {/* RIGHT DUAL-RAIL BEAM */}
            <div
              ref={rightBeamRef}
              className="absolute right-0 top-1/2 -translate-y-1/2 origin-right pointer-events-none flex flex-col justify-center z-10 will-change-transform"
              style={{
                width: "calc(50% - 78px)",
                height: "16px",
                transform: "translateZ(0) scaleX(0)",
              }}
            >
              {/* Top hairline rail */}
              <div className="w-full h-[1px] bg-gradient-to-l from-transparent via-[#C89B28] to-[#FFD700] opacity-80" />

              {/* Center intense laser core */}
              <div
                className="w-full h-[2px] my-auto bg-gradient-to-l from-transparent via-[#FAC300] to-white"
                style={{
                  boxShadow: "0 0 16px rgba(250,195,0,0.9), 0 0 30px rgba(250,195,0,0.5)",
                }}
              />

              {/* Bottom hairline rail */}
              <div className="w-full h-[1px] bg-gradient-to-l from-transparent via-[#C89B28] to-[#FFD700] opacity-80" />

              {/* Flare Glint on right beam */}
              <div
                ref={rightGlintRef}
                className="absolute left-8 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full pointer-events-none"
                style={{
                  background: "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(250,195,0,0.85) 35%, transparent 70%)",
                  filter: "blur(0.5px)",
                }}
              />
            </div>

            {/* ------------------------------------------------------- */}
            {/* AMBIENT RADIAL GLOW (Seamless screen blend behind emblem) */}
            {/* ------------------------------------------------------- */}
            <div
              ref={circleGlowRef}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-[#FAC300]/20 blur-[80px] pointer-events-none z-10 mix-blend-screen will-change-opacity"
              style={{
                opacity: 0.1,
              }}
            />

            {/* ------------------------------------------------------- */}
            {/* DARK BACKING DISC BEHIND INNER CIRCLE                   */}
            {/* Guarantees ZERO horizontal line or light bleeds into AG */}
            {/* ------------------------------------------------------- */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[74px] sm:w-[86px] h-[74px] sm:h-[86px] rounded-full bg-black z-15 pointer-events-none shadow-[0_0_15px_rgba(0,0,0,1)]"
            />

            {/* ------------------------------------------------------- */}
            {/* CENTER EMBLEM (GPU Composite Layered for 60/120fps)     */}
            {/* ------------------------------------------------------- */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none z-20"
              style={{
                width: "min(460px, 92vw)",
                height: "auto",
              }}
            >
              {/* Base sharp emblem */}
              <img
                ref={emblemBaseRef}
                src="/ag_center.png"
                alt="AG Emblem"
                className="w-full h-auto object-contain select-none pointer-events-none mix-blend-screen will-change-opacity"
                style={{ opacity: 0.65 }}
              />

              {/* Pre-cached drop-shadow glow layer (modulates opacity via GPU compositor, 0 CPU re-rasterization) */}
              <img
                ref={emblemGlowRef}
                src="/ag_center.png"
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-auto object-contain select-none pointer-events-none mix-blend-screen will-change-opacity"
                style={{
                  opacity: 0,
                  filter: "drop-shadow(0 0 16px rgba(250, 195, 0, 0.85)) drop-shadow(0 0 35px rgba(250, 195, 0, 0.45))",
                }}
              />
            </div>

            {/* ------------------------------------------------------- */}
            {/* PERCENTAGE COUNTER + LENS STREAK (Positioned underneath)*/}
            {/* ------------------------------------------------------- */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-20"
              style={{
                transform: "translate(-50%, min(74px, 17vw))",
              }}
            >
              {/* 000% -> 100% Counter in Clean Bold Typography */}
              <span
                ref={counterRef}
                className="font-mono text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-widest text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]"
              >
                000%
              </span>

              {/* Exact Lens Flare Streak right beneath the numbers */}
              <div
                ref={subFlareRef}
                className="mt-1 flex items-center justify-center pointer-events-none mix-blend-screen will-change-transform will-change-opacity"
                style={{
                  opacity: 0.2,
                  transform: "translateZ(0) scaleX(0.5)",
                }}
              >
                <img
                  src="/ag_streak.png"
                  alt=""
                  aria-hidden="true"
                  className="w-28 sm:w-36 md:w-44 h-auto object-contain"
                />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
