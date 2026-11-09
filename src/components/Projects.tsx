import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { slideInLeft, slideInRight } from "@/lib/animations";
import { ArrowUpRight, Github, ZoomIn } from "lucide-react";
import { useLightbox } from "@/context/LightboxContext";

interface Project {
  num: string;
  title: string;
  category: string;
  tags: string[];
  desc: string;
  image: string;
  github: string;
  live?: string | null;
  status?: string;
}

const projects: Project[] = [
  {
    num: "01",
    title: "DeviceGuardian",
    category: "Telemetry & Predictive Maintenance AI",
    tags: ["FastAPI", "Flutter & Kotlin", "Python", "XGBoost & SHAP", "Supabase", "Win32 APIs"],
    desc: "A cross-platform device telemetry and predictive maintenance software suite that forecasts laptop and smartphone degradation before failures occur. Features native background client apps for Windows and Android alongside a FastAPI backend running an XGBoost and SHAP pipeline, converting low-level battery, thermal, and storage metrics into explainable health diagnostics.",
    image: "/projects/deviceguardian.png",
    github: "https://github.com/Amudieshwar-AG/DeviceGuardian-AI.git",
    live: "https://device-guardian-ai.vercel.app/",
  },
  {
    num: "02",
    title: "LexGuard AI",
    category: "Legal Tech & RAG Intelligence",
    tags: ["FastAPI", "React", "TypeScript", "Google Gemini API", "FAISS", "Supabase"],
    desc: "A web-based legal analysis platform to automate contract screening for M&A deals, identifying critical liabilities, indemnities, and termination risks. Engineered an asynchronous RAG pipeline using FastAPI, PyMuPDF, and FAISS vector search with Google Gemini to semantically rank clause severity in seconds and generate audit-ready due diligence PDF reports.",
    image: "/projects/lexguardai.png",
    github: "https://github.com/Amudieshwar-AG/lexguard-ai.git",
    live: "https://lexguard-ai-phi.vercel.app/login",
  },
  {
    num: "03",
    title: "ExpenseIQ",
    category: "FinTech & Reactive Expense Analytics",
    tags: ["Flutter", "Dart", "Supabase", "PostgreSQL", "Firebase Hosting"],
    desc: "A cross-platform expense tracker running on consumer mobile devices and web browsers to eliminate manual bookkeeping and personal budget deficits. Built with a reactive Flutter architecture backed by Supabase PostgreSQL with row-level security, conditional compilation adapters for browser file downloads, automated overspend alerts, dynamic trend visualizations, and CSV data exports.",
    image: "/projects/expenseiq.png",
    github: "https://github.com/Amudieshwar-AG/ExpenseIQ.git",
    live: "https://expenseiq-cc09e.web.app/",
  },
  {
    num: "04",
    title: "HireConnect",
    category: "Bilingual Recruitment & Inclusive PWA",
    tags: ["React", "TypeScript", "Firebase", "Tailwind CSS", "PWA"],
    desc: "A bilingual Progressive Web App solving recruitment fragmentation across Tamil Nadu for both degree holders and informal vocational workers. Built using React, TypeScript, and a serverless Firebase backend with custom Service Worker caching for low-bandwidth resilience, featuring instant English-Tamil toggling, automated qualification scoring, and one-click direct-call hiring.",
    image: "/projects/hireconnect.png",
    github: "https://github.com/nanbargal28/Hire-connect-.git",
    live: "https://hireconnect-iota.vercel.app/",
  },
  {
    num: "05",
    title: "AI Stroke Detection",
    category: "Deep Learning & Clinical Diagnostics",
    tags: ["PyTorch", "FastAPI", "React", "TypeScript", "Grad-CAM", "EfficientNet"],
    desc: "A browser-based clinical software platform that analyzes head CT scans to differentiate between ischemic stroke, hemorrhagic stroke, and normal tissue for rapid triage. Couples a fine-tuned PyTorch EfficientNet-B0 model with Grad-CAM attribution served via FastAPI to stream visual lesion heatmaps directly to React, achieving 99.7% classification accuracy in under two seconds.",
    image: "/projects/aistroke-detect.png",
    github: "https://github.com/Amudieshwar-AG/radar-project.git",
    live: null,
    status: "Research Phase / WIP",
  },
];

const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(() => {
    if (typeof window !== "undefined") {
      return (projects.length - 1) * (window.innerWidth * 0.74);
    }
    return 2400;
  });

  useEffect(() => {
    const updateScrollRange = () => {
      if (trackRef.current) {
        const totalWidth = trackRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        const maxScroll = Math.max(0, totalWidth - viewportWidth);
        setScrollRange(maxScroll);
      }
    };

    updateScrollRange();
    const timer = setTimeout(updateScrollRange, 250);
    window.addEventListener("resize", updateScrollRange);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateScrollRange);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Exactly translates the track so project 5 settles cleanly at the end without extra dead space
  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative bg-[#0A0A12]"
      style={{ height: "300vh" }}
    >
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 h-screen flex flex-col justify-between overflow-hidden">
        {/* Header */}
        <div className="px-6 md:px-14 pt-20 md:pt-24 pb-3 flex flex-col md:flex-row items-start md:items-end justify-between gap-3 z-20">
          <div>
            <motion.span
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="font-mono text-xs uppercase tracking-[0.3em] text-[#FAC300] block mb-2"
            >
              // Selected Work ({projects.length})
            </motion.span>
            <motion.h2
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight"
            >
              Featured Projects
            </motion.h2>
          </div>
          <div className="text-white/40 font-mono text-xs hidden md:block">
            Scroll down to explore &rarr;
          </div>
        </div>

        {/* Scroll Progress Bar */}
        <div className="mx-6 md:mx-14 h-[2px] bg-white/10 rounded-full overflow-hidden z-20">
          <motion.div
            className="h-full bg-[#FAC300] shadow-[0_0_12px_rgba(250,195,0,0.8)]"
            style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
          />
        </div>

        {/* Horizontal Track Area */}
        <div className="flex-1 flex items-center overflow-hidden my-auto py-2">
          <motion.div
            ref={trackRef}
            className="flex gap-6 md:gap-8 px-6 md:px-14 items-center"
            style={{ x }}
          >
            {projects.map((project, i) => (
              <ProjectCard
                key={project.num}
                project={project}
                index={i}
                total={projects.length}
                progress={scrollYProgress}
              />
            ))}
          </motion.div>
        </div>

        {/* Bottom subtle indicator */}
        <div className="px-6 md:px-14 pb-5 flex items-center justify-between text-[11px] font-mono text-white/40 z-20">
          <span>01 / {projects[0].title}</span>
          <span className="hidden sm:inline">Engineered with high precision & scalable architectures</span>
          <span>05 / {projects[projects.length - 1].title}</span>
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({
  project,
  index,
  total,
  progress,
}: {
  project: Project;
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) => {
  const { openLightbox } = useLightbox();
  const step = 1 / Math.max(1, total - 1);
  const center = index * step;
  const range = [
    Math.max(0, center - step * 0.5),
    center,
    Math.min(1, center + step * 0.5),
  ];
  const scale = useTransform(progress, range, [0.94, 1, 0.94]);
  const opacity = useTransform(progress, range, [0.75, 1, 0.75]);

  return (
    <motion.div
      style={{ scale, opacity }}
      className="flex-shrink-0 w-[88vw] sm:w-[82vw] md:w-[76vw] lg:w-[70vw] max-w-[1050px] h-[65vh] md:h-[68vh] max-h-[660px] min-h-[480px] rounded-2xl p-6 md:p-8 lg:p-9 flex flex-col justify-between relative overflow-hidden group bg-[#0D0D17]/90 border border-white/10 hover:border-[#FAC300]/35 transition-all duration-500 shadow-[0_12px_40px_rgba(0,0,0,0.55)] backdrop-blur-xl"
    >
      {/* Background Watermark Project Number */}
      <span className="font-mono text-[7rem] md:text-[11rem] font-bold text-white/[0.025] absolute -top-6 right-4 leading-none select-none pointer-events-none group-hover:text-[#FAC300]/[0.04] transition-colors duration-500">
        {project.num}
      </span>

      {/* Main Card Content */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 h-full items-center">
        {/* Left Column: Details & CTA */}
        <div className="md:col-span-7 flex flex-col justify-between h-full overflow-hidden">
          {/* Header Row: Badge & Category */}
          <div>
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <span className="font-mono text-xs font-bold text-[#FAC300] px-2.5 py-0.5 rounded-full bg-[#FAC300]/10 border border-[#FAC300]/30 shadow-[0_0_12px_rgba(250,195,0,0.15)]">
                {project.num}
              </span>
              <span className="font-mono text-[11px] md:text-xs text-white/50 tracking-wider uppercase">
                {project.category}
              </span>
            </div>

            {/* Title */}
            <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-3 group-hover:text-[#FAC300] transition-colors duration-300">
              {project.title}
            </h3>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-1.5 md:gap-2 mb-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[10px] md:text-xs px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-white/75 hover:border-[#FAC300]/30 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Description */}
            <p className="text-white/65 font-body text-xs sm:text-sm md:text-sm leading-relaxed line-clamp-4 md:line-clamp-5 max-w-xl">
              {project.desc}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-3 mt-auto">
            {project.live ? (
              <motion.a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 font-display text-xs md:text-sm font-semibold bg-[#FAC300] hover:bg-[#FAC300]/90 text-[#0A0A12] px-5 py-2.5 rounded-full shadow-[0_4px_18px_rgba(250,195,0,0.25)] transition-all duration-300"
              >
                <span>Live Demo</span>
                <ArrowUpRight size={14} strokeWidth={2.5} />
              </motion.a>
            ) : (
              <div className="flex items-center gap-2 font-mono text-xs px-3.5 py-2 rounded-full bg-white/[0.04] border border-emerald-500/30 text-emerald-400">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span>{project.status || "In Development"}</span>
              </div>
            )}

            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 font-display text-xs md:text-sm font-semibold bg-white/[0.05] hover:bg-white/[0.1] text-white/90 border border-white/15 hover:border-white/30 px-4 py-2.5 rounded-full transition-all duration-300"
            >
              <Github size={14} />
              <span>Source Code</span>
            </motion.a>
          </div>
        </div>

        {/* Right Column: Interactive Browser Mockup with Lightbox Zoom */}
        <div className="md:col-span-5 h-full flex flex-col justify-center">
          <div
            role="button"
            tabIndex={0}
            onClick={() => openLightbox(project.image, `${project.title} — Project Preview`)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                openLightbox(project.image, `${project.title} — Project Preview`);
              }
            }}
            className="relative w-full h-[180px] sm:h-[220px] md:h-[280px] lg:h-[310px] rounded-xl overflow-hidden bg-black/50 border border-white/10 group-hover:border-[#FAC300]/40 transition-all duration-500 shadow-2xl flex flex-col group/mockup cursor-zoom-in"
          >
            {/* Browser Window Bar */}
            <div className="h-7 bg-white/[0.05] border-b border-white/10 px-3 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
              </div>
              <span className="text-[10px] font-mono text-white/40 truncate max-w-[160px]">
                {project.live
                  ? project.live.replace(/^https?:\/\//, "").replace(/\/$/, "")
                  : "github.com/Amudieshwar-AG"}
              </span>
              <div className="w-6" />
            </div>

            {/* Screenshot Preview */}
            <div className="relative flex-1 w-full overflow-hidden bg-neutral-950">
              <img
                src={project.image}
                alt={`${project.title} Preview`}
                loading="lazy"
                className="w-full h-full object-cover object-top group-hover/mockup:scale-105 transition-transform duration-700 ease-out"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/placeholder.svg";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A12]/80 via-transparent to-transparent pointer-events-none" />

              {/* Hover Zoom Overlay Pill */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/mockup:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px] pointer-events-none">
                <span className="font-mono text-xs px-3.5 py-1.5 rounded-full bg-[#FAC300] text-[#0A0A12] font-bold flex items-center gap-1.5 shadow-[0_0_16px_rgba(250,195,0,0.5)]">
                  <ZoomIn size={13} strokeWidth={2.5} />
                  <span>Click to Zoom</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Projects;