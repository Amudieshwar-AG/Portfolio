import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { slideInLeft, slideInRight } from "@/lib/animations";

const experiences = [
  {
    role: "ML Research Intern",
    company: "Tech Corp",
    year: "2024",
    points: [
      "Developed novel attention mechanism improving accuracy by 12%",
      "Published findings in peer-reviewed conference proceedings",
      "Collaborated with senior researchers on transformer architectures",
    ],
  },
  {
    role: "Full Stack Developer",
    company: "StartupXYZ",
    year: "2023",
    points: [
      "Built and shipped 3 production features serving 10k+ users",
      "Implemented real-time data pipeline reducing latency by 40%",
      "Led frontend migration to Next.js with TypeScript",
    ],
  },
  {
    role: "AI/ML Intern",
    company: "DataLab",
    year: "2023",
    points: [
      "Designed and trained computer vision models for object detection",
      "Optimized inference pipeline achieving 3x speedup",
      "Created data annotation tools used across the organization",
    ],
  },
];

const Experience = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const watermarkY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <section id="experience" ref={sectionRef} className="relative py-32 px-6 md:px-12 overflow-hidden">
      <motion.div
        style={{ y: watermarkY }}
        className="absolute top-0 left-0 font-display text-[18vw] font-bold text-foreground/[0.03] select-none pointer-events-none leading-none"
      >
        TIMELINE
      </motion.div>

      <div className="relative z-10 mb-20 flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
        <motion.span
          variants={slideInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="font-mono text-xs uppercase tracking-[0.3em] text-lime"
        >
          // Journey
        </motion.span>
        <motion.h2
          variants={slideInRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="font-display text-4xl md:text-6xl font-bold"
        >
          Experience
        </motion.h2>
      </div>

      {/* Timeline */}
      <div className="relative max-w-4xl mx-auto">
        {/* Center line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-foreground/10 md:-translate-x-px">
          <motion.div
            className="w-full bg-lime origin-top"
            style={{ height: lineHeight }}
          />
        </div>

        {experiences.map((exp, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -80 : 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
            className={`relative mb-16 md:mb-24 pl-12 md:pl-0 ${
              i % 2 === 0 ? "md:pr-[55%]" : "md:pl-[55%]"
            }`}
          >
            {/* Dot */}
            <motion.div
              className="absolute left-[11px] md:left-1/2 top-2 w-3 h-3 rounded-full bg-lime md:-translate-x-1.5"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            />

            {/* Card */}
            <div className="glass-card rounded-lg p-6">
              <div className="flex items-center gap-3 mb-3">
                <h3 className="font-display text-xl font-bold">{exp.role}</h3>
                <span className="font-mono text-xs px-2 py-0.5 rounded-full bg-lime/10 text-lime border border-lime/20">
                  {exp.year}
                </span>
              </div>
              <p className="font-mono text-sm text-muted-foreground mb-4">{exp.company}</p>
              <motion.ul
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                className="space-y-2"
              >
                {exp.points.map((point, j) => (
                  <motion.li
                    key={j}
                    variants={{
                      hidden: { opacity: 0, x: -10 },
                      visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
                    }}
                    className="text-sm text-foreground/70 flex items-start gap-2"
                  >
                    <span className="text-lime mt-1">›</span>
                    {point}
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
