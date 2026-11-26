import { motion } from "framer-motion";
import { ArrowUpRight, FileText } from "lucide-react";
import HelixBackground from "./HelixBackground";

const Hero = () => {
  const name = "AMUDIESHWAR";

  return (
    <section id="hero" className="relative min-h-screen h-[100dvh] w-full overflow-hidden bg-[#0A0A12]">
      {/* Helix canvas background */}
      <HelixBackground />

      {/* Content overlay */}
      <div className="relative z-10 h-full flex flex-col justify-between px-5 sm:px-8 md:px-14 pt-20 sm:pt-24 md:pt-28 pb-8 sm:pb-10">

        {/* Availability badge — top left */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.55 }}
          className="flex items-center gap-2 sm:gap-2.5 px-3 sm:px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md w-max shadow-[0_2px_12px_rgba(0,0,0,0.3)]"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="font-display text-[10px] sm:text-[11px] font-semibold text-white/80 tracking-wider uppercase">
            Available for Opportunities
          </span>
        </motion.div>

        {/* Main content — bottom-aligned on mobile to frame helix above, vertically centered on desktop */}
        <div className="flex flex-col justify-end md:justify-center flex-1 w-full md:max-w-[58%] lg:max-w-[52%] mt-4 pb-2 md:pb-0">
          {/* Name */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.035, delayChildren: 0.5 } },
            }}
            className="mb-3 md:mb-4 flex flex-nowrap md:flex-wrap"
          >
            {name.split("").map((char, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { y: 50, opacity: 0 },
                  visible: {
                    y: 0,
                    opacity: 1,
                    transition: { duration: 0.55, ease: [0.25, 0.4, 0.25, 1] },
                  },
                }}
                className="font-display font-bold leading-none text-white text-[clamp(1.75rem,8.2vw,3.2rem)] md:text-[clamp(2.8rem,6.5vw,5.5rem)]"
              >
                {char}
              </motion.span>
            ))}
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.55 }}
            className="font-body font-semibold text-[#FAC300] mb-3 md:mb-4"
            style={{ fontSize: "clamp(1.05rem, 2.2vw, 1.35rem)" }}
          >
            AI Engineer &amp; Full Stack Developer
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.55 }}
            className="text-white/65 md:text-white/55 font-body leading-relaxed mb-6 md:mb-8 max-w-sm md:max-w-xs"
            style={{ fontSize: "clamp(0.85rem, 1.1vw, 0.95rem)" }}
          >
            Crafting intelligent, scalable and beautiful digital experiences with modern technologies.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="flex items-center gap-3 sm:gap-3.5 flex-wrap"
          >
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full bg-[#FAC300] hover:bg-[#FAC300]/90 text-[#0A0A12] font-display font-semibold text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_4px_20px_rgba(250,195,0,0.25)]"
            >
              <span>Get in Touch</span>
              <ArrowUpRight size={14} strokeWidth={2.4} />
            </motion.a>

            <motion.a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-white/85 hover:text-white border border-white/10 hover:border-[#FAC300]/40 font-display font-medium text-xs uppercase tracking-wider transition-all duration-300 shadow-sm"
            >
              <FileText size={14} className="text-[#FAC300]" />
              <span>Resume</span>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
