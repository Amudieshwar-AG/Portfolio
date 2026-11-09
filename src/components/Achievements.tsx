import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { slideInLeft, slideInRight, fadeInUp, staggerContainer } from "@/lib/animations";
import { Trophy, Award, ShieldCheck, MapPin, Users, CheckCircle2, ZoomIn } from "lucide-react";
import { useLightbox } from "@/context/LightboxContext";

interface Achievement {
  id: string;
  badge: string;
  category: string;
  title: string;
  organization: string;
  location: string;
  date: string;
  team: string;
  image: string;
  imageFit?: "cover" | "contain";
  summary: string;
  highlights: string[];
}

const achievements: Achievement[] = [
  {
    id: "hackathon-winner",
    badge: "1st Place Winner",
    category: "24-Hour AI Hackathon",
    title: "Robochipx Hackathon — AI Track Winner",
    organization: "VLSI Dept, Rajalakshmi Institute of Technology",
    location: "Chennai, India",
    date: "July 2024",
    team: "Team Lead • System Hackers",
    image: "/achievements/hackathon-winner.jpg",
    imageFit: "contain",
    summary:
      "Led team System Hackers to 1st Place among 100 competing AI teams. Built DeviceGuardian AI in 24 hours—a Prognostic Health Management platform powered by XGBoost and SHAP (99.5% R²) forecasting hardware degradation in real-time, winning the ₹10,000 cash prize.",
    highlights: ["1st Place out of 100 AI Teams", "₹10,000 Cash Prize", "DeviceGuardian AI (99.5% R²)"],
  },
  {
    id: "iit-madras-summit",
    badge: "Selected Delegate",
    category: "Generative AI & Industry Summit",
    title: "MakeGPT Summit 2025 — IIT Madras",
    organization: "IIT Madras Research Park (IITMRP)",
    location: "Chennai, India",
    date: "2025",
    team: "AI & DS Department Delegation",
    image: "/achievements/iit-madras-summit.jpg",
    imageFit: "cover",
    summary:
      "Represented RIT Chennai's AI & Data Science delegation at the MakeGPT Summit hosted at the prestigious IIT Madras Research Park. Explored advancements in Generative AI, enterprise LLM architectures, and networked with technology leaders like Andy Palanisamy on transforming AI research into real-world systems.",
    highlights: ["IIT Madras Research Park", "Enterprise GenAI Applications", "Academic-Industry Synergy"],
  },
  {
    id: "sih-2026",
    badge: "Qualified Winner",
    category: "Cybersecurity & Defense",
    title: "Smart India Hackathon 2026 — Internal Qualifier",
    organization: "Ministry of Education / RIT Chennai",
    location: "Chennai, India",
    date: "2026",
    team: "Team Lead • RIT-System Hackers",
    image: "/achievements/sih-hackathon.jpg",
    imageFit: "cover",
    summary:
      "Won the internal institutional qualifier for Smart India Hackathon (SIH 2026) under Blockchain & Cybersecurity (PS ID: SIH26145). As Team Lead, spearheaded an AI-powered real-time intrusion monitoring framework for unidirectional (one-way) IP traffic to isolate threats in air-gapped critical networks.",
    highlights: ["Team ID: 171783", "PS ID: SIH26145 (Cybersecurity)", "Air-Gapped Network Defense"],
  },
];

const Achievements = () => {
  const { openLightbox } = useLightbox();
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const watermarkY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section
      id="achievements"
      ref={sectionRef}
      className="relative py-28 md:py-36 px-6 md:px-14 overflow-hidden bg-[#0A0A12] border-t border-white/[0.04]"
    >
      {/* Background Watermark */}
      <motion.div
        style={{ y: watermarkY }}
        className="absolute top-10 left-6 font-display text-[15vw] font-bold text-white/[0.02] select-none pointer-events-none leading-none tracking-tighter"
      >
        HONORS
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
            // Recognitions & Competitions ({achievements.length})
          </motion.span>
          <motion.h2
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight"
          >
            Achievements
          </motion.h2>
        </div>
        <p className="text-white/50 font-body text-xs md:text-sm max-w-md">
          Competitive hackathon victories, institutional representations, and high-impact AI research summits.
        </p>
      </div>

      {/* Achievements Cards Grid */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {achievements.map((item, index) => (
            <motion.div
              key={item.id}
              variants={fadeInUp}
              custom={index}
              className="group relative rounded-2xl overflow-hidden bg-[#0D0D17]/90 border border-white/10 hover:border-[#FAC300]/40 transition-all duration-500 flex flex-col justify-between shadow-[0_12px_36px_rgba(0,0,0,0.5)] hover:shadow-[0_16px_40px_rgba(250,195,0,0.12)] backdrop-blur-xl"
            >
              {/* Image Preview Banner with Lightbox Zoom */}
              <div
                role="button"
                tabIndex={0}
                onClick={() => openLightbox(item.image, `${item.title} — ${item.badge}`)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    openLightbox(item.image, `${item.title} — ${item.badge}`);
                  }
                }}
                className="relative w-full h-64 sm:h-72 overflow-hidden bg-[#070710] border-b border-white/10 flex items-center justify-center cursor-zoom-in group/img"
              >
                {/* Blurred backdrop fill for portrait images to ensure aesthetics */}
                {item.imageFit === "contain" && (
                  <img
                    src={item.image}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover blur-xl opacity-30 scale-110 pointer-events-none"
                  />
                )}

                {/* Main Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className={`relative z-10 w-full h-full group-hover:scale-[1.03] transition-transform duration-700 ease-out ${
                    item.imageFit === "contain"
                      ? "object-contain p-2"
                      : "object-cover object-center"
                  }`}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder.svg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D17] via-transparent to-black/35 pointer-events-none z-10" />

                {/* Hover Zoom Pill */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px] pointer-events-none z-20">
                  <span className="font-mono text-xs px-3.5 py-1.5 rounded-full bg-[#FAC300] text-[#0A0A12] font-bold flex items-center gap-1.5 shadow-[0_0_16px_rgba(250,195,0,0.5)]">
                    <ZoomIn size={13} strokeWidth={2.5} />
                    <span>Click to Zoom</span>
                  </span>
                </div>

                {/* Floating Top Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-20">
                  <span className="font-mono text-[10px] md:text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#0A0A12]/85 backdrop-blur-md border border-[#FAC300]/40 text-[#FAC300] flex items-center gap-1.5 shadow-[0_0_12px_rgba(250,195,0,0.2)]">
                    {index === 0 ? <Trophy size={11} /> : index === 1 ? <Award size={11} /> : <ShieldCheck size={11} />}
                    <span>{item.badge}</span>
                  </span>
                  <span className="font-mono text-[10px] px-2.5 py-1 rounded-full bg-[#0A0A12]/80 backdrop-blur-md border border-white/15 text-white/80">
                    {item.date}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 md:p-7 flex flex-col flex-1 justify-between">
                <div>
                  {/* Meta: Category & Location */}
                  <div className="flex items-center gap-2 text-white/45 font-mono text-[11px] mb-2 flex-wrap">
                    <span className="text-[#FAC300] uppercase font-semibold">{item.category}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin size={10} />
                      {item.location}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-xl font-bold text-white mb-2 leading-snug group-hover:text-[#FAC300] transition-colors duration-300">
                    {item.title}
                  </h3>

                  {/* Institution */}
                  <p className="font-mono text-xs text-white/60 mb-4">
                    {item.organization}
                  </p>

                  {/* Description */}
                  <p className="font-body text-xs sm:text-sm text-white/70 leading-relaxed mb-5">
                    {item.summary}
                  </p>
                </div>

                {/* Highlights Pills */}
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-5 pt-2 border-t border-white/[0.06]">
                    {item.highlights.map((h) => (
                      <span
                        key={h}
                        className="font-mono text-[10px] px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/10 text-white/75 flex items-center gap-1"
                      >
                        <CheckCircle2 size={10} className="text-[#FAC300]" />
                        <span>{h}</span>
                      </span>
                    ))}
                  </div>

                  {/* Card Footer */}
                  <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-white/45">
                    <div className="flex items-center gap-1.5 font-medium text-white/80">
                      <Users size={12} className="text-[#FAC300]" />
                      <span>{item.team}</span>
                    </div>
                    <span className="text-[#FAC300]/80 font-bold">0{index + 1}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;