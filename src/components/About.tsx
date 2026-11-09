import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { fadeInUp, slideInLeft, slideInRight } from "@/lib/animations";
import TextReveal from "./TextReveal";
import { Code, GraduationCap, FileText, Layers, ArrowUpRight, ZoomIn } from "lucide-react";
import { useLightbox } from "@/context/LightboxContext";

const CountUp = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1500;
    const startTime = Date.now();
    const step = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, target]);

  return (
    <span ref={ref} className="font-display text-4xl md:text-5xl font-bold text-[#EAB308]">
      {count}{suffix}
    </span>
  );
};

const stats = [
  { number: 5, suffix: "+", label: "Projects Built", icon: Code, href: "#projects" },
  { number: 2, suffix: "", label: "Internships", icon: GraduationCap, href: "#experience" },
  { number: 1, suffix: "", label: "Research Paper", icon: FileText, href: "#research" },
  { number: 15, suffix: "+", label: "Tech & Frameworks", icon: Layers, href: "#skills" },
];

const About = () => {
  const { openLightbox } = useLightbox();
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const watermarkY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="about" ref={sectionRef} className="relative py-32 px-6 md:px-12 overflow-hidden bg-[#030712] text-white">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[#EAB308]/5 blur-[120px] rounded-full pointer-events-none" />
      
      <motion.div
        style={{ y: watermarkY }}
        className="absolute top-0 left-0 w-full text-center font-display text-[15vw] font-bold text-white/[0.02] select-none pointer-events-none leading-none z-0"
      >
        ABOUT
      </motion.div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 max-w-6xl mx-auto pt-10">
        
        {/* Profile Image with Animated Gold Frame */}
        <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="relative aspect-[3/4] max-w-[320px] mx-auto md:mx-0 w-full">
          {/* Main Outer Glow */}
          <div className="absolute inset-0 bg-[#EAB308]/20 blur-2xl rounded-2xl" />
          
          {/* Image Container with Lightbox Zoom */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => openLightbox("/profile.jpg", "Amudieshwar — Profile")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                openLightbox("/profile.jpg", "Amudieshwar — Profile");
              }
            }}
            className="absolute inset-2 rounded-xl overflow-hidden bg-[#0B101A] z-10 cursor-zoom-in group"
            title="Click to view & zoom"
          >
            <img src="/profile.jpg" alt="Profile" className="w-full h-full object-cover filter brightness-90 group-hover:brightness-110 group-hover:scale-105 transition-all duration-500" />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
              <span className="font-mono text-xs px-3 py-1 rounded-full bg-[#FAC300] text-[#0A0A12] font-bold flex items-center gap-1 shadow-md">
                <ZoomIn size={12} strokeWidth={2.5} />
                <span>Zoom</span>
              </span>
            </div>
          </div>

          {/* Animated SVG Border */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-20 drop-shadow-[0_0_8px_rgba(234,179,8,0.8)]" viewBox="0 0 300 400">
            {/* Base static border */}
            <rect x="2" y="2" width="296" height="396" rx="16" fill="none" stroke="#EAB308" strokeWidth="1" strokeOpacity="0.3" />
            
            {/* Animated motion lines */}
            <motion.rect 
              x="2" y="2" width="296" height="396" rx="16" 
              fill="none" 
              stroke="#EAB308" 
              strokeWidth="3" 
              strokeDasharray="80 1320" 
              animate={{ strokeDashoffset: [1400, 0] }} 
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }} 
            />
            <motion.rect 
              x="2" y="2" width="296" height="396" rx="16" 
              fill="none" 
              stroke="#EAB308" 
              strokeWidth="3" 
              strokeDasharray="80 1320" 
              animate={{ strokeDashoffset: [700, -700] }} 
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }} 
            />
          </svg>
          
          {/* Tech Nodes (Corner Dots) */}
          <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-[#EAB308] rounded-full z-30 shadow-[0_0_10px_#EAB308]" />
          <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-[#EAB308] rounded-full z-30 shadow-[0_0_10px_#EAB308]" />
          <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-[#EAB308] rounded-full z-30 shadow-[0_0_10px_#EAB308]" />
          <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-[#EAB308] rounded-full z-30 shadow-[0_0_10px_#EAB308]" />
        </motion.div>

        {/* About Text */}
        <div className="flex flex-col justify-center relative z-10 pt-8">
          <motion.div variants={slideInLeft} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex items-center gap-3 mb-6">
            <span className="font-mono text-sm uppercase tracking-[0.3em] text-[#EAB308] font-bold">
              // About Me
            </span>
          </motion.div>
          
          <motion.h2 variants={slideInRight} initial="hidden" whileInView="visible" viewport={{ once: true }} className="font-display text-5xl md:text-6xl font-bold mb-4">
            Who I Am
          </motion.h2>
          
          <motion.div variants={slideInRight} initial="hidden" whileInView="visible" viewport={{ once: true }} className="w-16 h-1 bg-[#EAB308] mb-10 rounded-full shadow-[0_0_10px_rgba(234,179,8,0.5)]" />

          <TextReveal text="I'm a pre-final-year B.Tech student specializing in Artificial Intelligence and Data Science, with a strong foundation in AI, machine learning, and modern software development." className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6" />
          <TextReveal text="Driven by a passion for building practical projects, I enjoy taking intelligent algorithms and turning them into scalable, full-stack digital solutions." className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6" />
          <TextReveal text="Always curious and hands-on, I actively explore emerging technologies to solve real-world problems with clean, purposeful code." className="text-base text-gray-400 leading-relaxed mb-8" />

          {/* Focus Domains */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="pt-2"
          >
            <p className="font-mono text-xs uppercase tracking-widest text-[#EAB308] mb-3 font-semibold">
              Core Specializations
            </p>
            <div className="flex flex-wrap gap-2.5">
              {[
                "Artificial Intelligence",
                "Machine Learning",
                "Data Science",
                "Software Development",
                "Deep Learning",
                "Full Stack",
              ].map((domain) => (
                <span
                  key={domain}
                  className="font-display text-xs font-semibold px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-white/80 hover:border-[#EAB308]/50 hover:text-white transition-colors"
                >
                  {domain}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats Glassmorphism Container */}
      <motion.div 
        variants={fadeInUp} 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true }} 
        className="relative z-10 mt-28 max-w-4xl mx-auto bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-colors hover:border-[#EAB308]/30"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x-0 md:divide-x divide-white/10">
          {stats.map((stat, i) => (
            <motion.a
              key={stat.label}
              href={stat.href}
              variants={fadeInUp}
              custom={i}
              whileHover={{ y: -4, scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="flex flex-col items-center text-center px-4 group cursor-pointer transition-all duration-300"
            >
              <div className="relative">
                <stat.icon
                  size={36}
                  className="text-[#EAB308] mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_12px_rgba(234,179,8,0.7)]"
                  strokeWidth={1.5}
                />
                <span className="absolute -top-1 -right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[#EAB308]">
                  <ArrowUpRight size={13} strokeWidth={2.4} />
                </span>
              </div>
              <CountUp target={stat.number} suffix={stat.suffix} />
              <p className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-gray-400 mt-3 group-hover:text-[#EAB308] transition-colors flex items-center gap-1">
                <span>{stat.label}</span>
              </p>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default About;
