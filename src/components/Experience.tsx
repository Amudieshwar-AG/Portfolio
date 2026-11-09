import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { slideInLeft, slideInRight } from "@/lib/animations";
import { Calendar, Briefcase, CheckCircle2, ZoomIn } from "lucide-react";
import { useLightbox } from "@/context/LightboxContext";

interface ExperienceItem {
  role: string;
  type: string;
  company: string;
  partner?: string;
  year: string;
  image: string;
  tags: string[];
  points: string[];
}

const experiences: ExperienceItem[] = [
  {
    role: "Emerging Technologies (AI & Cloud) Intern",
    type: "Virtual Internship",
    company: "Edunet Foundation",
    partner: "in collaboration with AICTE & IBM SkillsBuild",
    year: "4 Weeks • 2024",
    image: "/experience/ibm.png",
    tags: ["IBM Cloud", "IBM SkillsBuild", "Cloud Architecture", "AI Services", "Data Handling"],
    points: [
      "Gained hands-on proficiency deploying cloud-native architectures and cognitive services on the IBM Cloud Platform.",
      "Completed rigorous technical tracks on the IBM SkillsBuild platform, focusing on scalable data management and cloud pipelines.",
      "Engineered data handling workflows and evaluated AI model deployments in enterprise cloud environments.",
    ],
  },
  {
    role: "Data Science Virtual Intern",
    type: "Virtual Internship",
    company: "CodSoft",
    partner: "Industry Data Science & Analytics Track",
    year: "01/07/2025 – 31/07/2025",
    image: "/experience/codsoft.png",
    tags: ["Data Science", "Python", "Machine Learning", "EDA", "Predictive Analytics"],
    points: [
      "Engineered end-to-end data science pipelines on real-time datasets, executing exploratory data analysis (EDA) and cleansing.",
      "Trained, fine-tuned, and benchmarked machine learning models to solve predictive classification and regression problems.",
      "Extracted actionable analytical insights, presenting model performance metrics through interactive data visualisations.",
    ],
  },
];

const Experience = () => {
  const { openLightbox } = useLightbox();
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const watermarkY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-28 md:py-36 px-6 md:px-14 overflow-hidden bg-[#0A0A12] border-t border-white/[0.04]"
    >
      {/* Background Watermark */}
      <motion.div
        style={{ y: watermarkY }}
        className="absolute top-10 left-6 font-display text-[16vw] font-bold text-white/[0.02] select-none pointer-events-none leading-none tracking-tighter"
      >
        JOURNEY
      </motion.div>

      {/* Header */}
      <div className="relative z-10 max-w-7xl mx-auto mb-16 md:mb-20 flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
        <div>
          <motion.span
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="font-mono text-xs uppercase tracking-[0.3em] text-[#FAC300] block mb-2"
          >
            // Professional Background ({experiences.length})
          </motion.span>
          <motion.h2
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight"
          >
            Experience
          </motion.h2>
        </div>
        <p className="text-white/50 font-body text-xs md:text-sm max-w-sm">
          Hands-on technical internships across Cloud Computing, Data Science, and Machine Learning architectures.
        </p>
      </div>

      {/* Timeline Container */}
      <div className="relative max-w-4xl mx-auto z-10">
        {/* Animated Center Vertical Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/10 md:-translate-x-px">
          <motion.div
            className="w-full bg-[#FAC300] origin-top shadow-[0_0_12px_rgba(250,195,0,0.6)]"
            style={{ height: lineHeight }}
          />
        </div>

        {experiences.map((exp, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
            className={`relative mb-14 md:mb-20 pl-12 md:pl-0 ${
              i % 2 === 0 ? "md:pr-[53%]" : "md:pl-[53%]"
            }`}
          >
            {/* Glowing Timeline Marker */}
            <div className="absolute left-[9px] md:left-1/2 top-6 w-3.5 h-3.5 rounded-full bg-[#FAC300] md:-translate-x-[7px] border-2 border-[#0A0A12] shadow-[0_0_12px_rgba(250,195,0,0.8)] z-20">
              <span className="animate-ping absolute inset-0 rounded-full bg-[#FAC300] opacity-40" />
            </div>

            {/* Experience Card */}
            <div className="group rounded-2xl p-6 md:p-7 bg-[#0D0D17]/90 border border-white/10 hover:border-[#FAC300]/40 transition-all duration-500 shadow-[0_12px_36px_rgba(0,0,0,0.45)] hover:shadow-[0_14px_40px_rgba(250,195,0,0.12)] backdrop-blur-xl">
              {/* Header with DP/Logo & Role */}
              <div className="flex items-start gap-4 mb-4">
                {/* DP / Certificate Badge Frame with Lightbox Zoom */}
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => openLightbox(exp.image, `${exp.role} — ${exp.company} Certificate / Badge`)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      openLightbox(exp.image, `${exp.role} — ${exp.company} Certificate / Badge`);
                    }
                  }}
                  className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden bg-white/[0.04] border border-white/15 p-1 flex-shrink-0 flex items-center justify-center group-hover:border-[#FAC300]/40 transition-colors shadow-inner cursor-zoom-in group/badge"
                  title="Click to view & zoom"
                >
                  <img
                    src={exp.image}
                    alt={exp.company}
                    loading="lazy"
                    className="w-full h-full object-contain group-hover/badge:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder.svg";
                    }}
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/badge:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <ZoomIn size={12} className="text-[#FAC300]" />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-[#FAC300]/10 border border-[#FAC300]/30 text-[#FAC300] font-semibold">
                      {exp.type}
                    </span>
                    <span className="font-mono text-[11px] text-white/40 flex items-center gap-1">
                      <Calendar size={11} />
                      {exp.year}
                    </span>
                  </div>

                  <h3 className="font-display text-lg sm:text-xl font-bold text-white group-hover:text-[#FAC300] transition-colors leading-snug">
                    {exp.role}
                  </h3>

                  <div className="font-mono text-xs text-white/60 flex items-center gap-1.5 mt-0.5">
                    <Briefcase size={12} className="text-[#FAC300]" />
                    <span className="font-medium text-white/80">{exp.company}</span>
                  </div>
                  {exp.partner && (
                    <p className="text-[11px] font-mono text-white/40 mt-0.5 truncate">
                      {exp.partner}
                    </p>
                  )}
                </div>
              </div>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4 pt-2 border-t border-white/[0.06]">
                {exp.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/10 text-white/75"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Key Deliverables / Points */}
              <ul className="space-y-2.5">
                {exp.points.map((point, j) => (
                  <li
                    key={j}
                    className="text-xs sm:text-sm text-white/70 flex items-start gap-2 leading-relaxed"
                  >
                    <CheckCircle2
                      size={14}
                      className="text-[#FAC300] mt-0.5 flex-shrink-0"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Experience;