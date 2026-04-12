import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { fadeInUp, staggerContainer, slideInLeft, slideInRight } from "@/lib/animations";

const skillCategories = [
  {
    title: "AI / ML",
    icon: "🧠",
    skills: ["PyTorch", "TensorFlow", "Scikit-Learn", "Hugging Face", "LangChain", "OpenAI API"],
  },
  {
    title: "Frontend",
    icon: "🎨",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js"],
  },
  {
    title: "Backend & Data",
    icon: "⚙️",
    skills: ["Python", "Node.js", "PostgreSQL", "FastAPI", "Docker", "AWS"],
  },
];

const allSkills = skillCategories.flatMap((c) => c.skills);

const Skills = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const watermarkY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section id="skills" ref={sectionRef} className="relative py-32 px-6 md:px-12 overflow-hidden grid-bg">
      {/* Center glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-96 h-96 rounded-full bg-lime/5 blur-[120px]" />
      </div>

      {/* Watermark */}
      <motion.div
        style={{ y: watermarkY }}
        className="absolute top-10 right-0 font-display text-[18vw] font-bold text-foreground/[0.03] select-none pointer-events-none leading-none"
      >
        SKILLS
      </motion.div>

      {/* Header */}
      <div className="relative z-10 mb-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
        <motion.span
          variants={slideInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="font-mono text-xs uppercase tracking-[0.3em] text-lime"
        >
          // Tech Stack
        </motion.span>
        <motion.h2
          variants={slideInRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="font-display text-4xl md:text-6xl font-bold"
        >
          What I Use
        </motion.h2>
      </div>

      {/* Bento grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
        {skillCategories.map((category, i) => (
          <motion.div
            key={category.title}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={i}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            className="glass-card rounded-lg p-8 hover:glow-lime transition-shadow duration-500 group"
          >
            <div className="text-4xl mb-4">{category.icon}</div>
            <h3 className="font-display text-xl font-bold mb-6">{category.title}</h3>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-wrap gap-2"
            >
              {category.skills.map((skill) => (
                <motion.span
                  key={skill}
                  variants={fadeInUp}
                  className="font-mono text-xs px-3 py-1.5 rounded-full border border-foreground/10 text-muted-foreground group-hover:border-lime/30 group-hover:text-foreground transition-colors duration-300"
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Full-width skill ticker */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10 mt-4 glass-card rounded-lg p-6 max-w-6xl mx-auto overflow-hidden"
      >
        <div className="flex animate-marquee whitespace-nowrap">
          {[...allSkills, ...allSkills].map((skill, i) => (
            <span key={i} className="font-mono text-sm text-muted-foreground mx-4">
              {skill}
              <span className="text-lime ml-4">•</span>
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Skills;
