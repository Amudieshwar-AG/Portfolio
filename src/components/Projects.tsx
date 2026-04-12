import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { slideInLeft, slideInRight } from "@/lib/animations";
import { ArrowUpRight, Github } from "lucide-react";

const projects = [
  {
    num: "01",
    title: "Neural Style Transfer",
    tags: ["PyTorch", "Computer Vision", "Python"],
    desc: "A real-time neural style transfer application that transforms images using deep learning, achieving artistic effects with optimized inference.",
    live: "#",
    github: "#",
  },
  {
    num: "02",
    title: "AI Chat Platform",
    tags: ["React", "LangChain", "OpenAI", "Next.js"],
    desc: "Full-stack conversational AI platform with RAG capabilities, supporting multiple document types and real-time streaming responses.",
    live: "#",
    github: "#",
  },
  {
    num: "03",
    title: "Data Viz Dashboard",
    tags: ["D3.js", "Python", "FastAPI", "React"],
    desc: "Interactive analytics dashboard processing millions of data points with real-time visualizations and predictive modeling.",
    live: "#",
    github: "#",
  },
];

const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section id="projects" ref={containerRef} className="relative" style={{ height: `${(projects.length + 1) * 100}vh` }}>
      {/* Header */}
      <div className="sticky top-0 h-screen flex flex-col overflow-hidden">
        <div className="px-6 md:px-12 pt-24 pb-8 flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
          <motion.span
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="font-mono text-xs uppercase tracking-[0.3em] text-lime"
          >
            // Selected Work
          </motion.span>
          <motion.h2
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="font-display text-4xl md:text-6xl font-bold"
          >
            Projects
          </motion.h2>
        </div>

        {/* Scroll progress line */}
        <motion.div
          className="h-[2px] bg-lime mx-6 md:mx-12"
          style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
        />

        {/* Horizontal scroll area */}
        <div className="flex-1 flex items-center overflow-hidden">
          <motion.div
            className="flex gap-8 px-6 md:px-12"
            style={{
              x: useTransform(scrollYProgress, [0, 1], ["0%", `-${(projects.length - 1) * 85}%`]),
            }}
          >
            {projects.map((project, i) => (
              <ProjectCard key={project.num} project={project} index={i} progress={scrollYProgress} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({
  project,
  index,
  progress,
}: {
  project: (typeof projects)[0];
  index: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) => {
  const range = [index * 0.25, index * 0.25 + 0.15, index * 0.25 + 0.3];
  const scale = useTransform(progress, range, [0.85, 1, 0.85]);

  return (
    <motion.div
      style={{ scale }}
      className="flex-shrink-0 w-[85vw] md:w-[75vw] h-[60vh] md:h-[65vh] glass-card rounded-xl p-8 md:p-12 flex flex-col justify-between relative overflow-hidden group"
    >
      {/* Project number */}
      <span className="font-mono text-[8rem] md:text-[12rem] font-bold text-foreground/[0.04] absolute top-4 left-8 leading-none select-none">
        {project.num}
      </span>

      <div className="relative z-10">
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-xs px-3 py-1 rounded-full border border-lime/20 text-lime/80"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-10 mt-auto">
        <h3 className="font-display text-3xl md:text-5xl font-bold mb-3">{project.title}</h3>
        <p className="text-muted-foreground max-w-lg text-sm md:text-base mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          {project.desc}
        </p>
        <div className="flex gap-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
          <a
            href={project.live}
            className="flex items-center gap-2 font-mono text-sm text-lime hover:text-foreground transition-colors"
          >
            Live <ArrowUpRight size={14} />
          </a>
          <a
            href={project.github}
            className="flex items-center gap-2 font-mono text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            GitHub <Github size={14} />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default Projects;
