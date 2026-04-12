import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { fadeInUp, slideInLeft, slideInRight } from "@/lib/animations";
import TextReveal from "./TextReveal";

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
    <span ref={ref} className="font-display text-4xl md:text-5xl font-bold text-lime">
      {count}{suffix}
    </span>
  );
};

const stats = [
  { number: 3, suffix: "+", label: "Projects" },
  { number: 2, suffix: "", label: "Internships" },
  { number: 1, suffix: "", label: "Research Paper" },
];

const About = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const watermarkY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="about" ref={sectionRef} className="relative py-32 px-6 md:px-12 overflow-hidden">
      <motion.div
        style={{ y: watermarkY }}
        className="absolute top-0 left-0 font-display text-[20vw] font-bold text-foreground/[0.03] select-none pointer-events-none leading-none"
      >
        ABOUT
      </motion.div>

      <div className="relative z-10 mb-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
        <motion.span variants={slideInLeft} initial="hidden" whileInView="visible" viewport={{ once: true }} className="font-mono text-xs uppercase tracking-[0.3em] text-lime">
          // About Me
        </motion.span>
        <motion.h2 variants={slideInRight} initial="hidden" whileInView="visible" viewport={{ once: true }} className="font-display text-4xl md:text-6xl font-bold">
          Who I Am
        </motion.h2>
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 max-w-6xl mx-auto">
        <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="relative aspect-[3/4] max-w-sm mx-auto md:mx-0">
          <div className="w-full h-full bg-surface rounded-sm overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-surface to-background flex items-center justify-center">
              <span className="font-display text-6xl font-bold text-foreground/10">JD</span>
            </div>
          </div>
          <motion.svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 300 400">
            <motion.rect x="4" y="4" width="292" height="392" fill="none" stroke="hsl(72, 100%, 50%)" strokeWidth="2" initial={{ strokeDasharray: 1400, strokeDashoffset: 1400 }} whileInView={{ strokeDashoffset: 0 }} viewport={{ once: true }} transition={{ duration: 2, ease: "easeInOut" }} />
          </motion.svg>
        </motion.div>

        <div className="flex flex-col justify-center">
          <TextReveal text="I'm a developer and AI enthusiast passionate about building intelligent systems that push the boundaries of what's possible." className="text-lg md:text-xl text-foreground/80 leading-relaxed mb-6" />
          <TextReveal text="With experience spanning machine learning, full-stack development, and research, I craft solutions that are both technically robust and beautifully designed." className="text-lg md:text-xl text-foreground/80 leading-relaxed mb-6" />
          <TextReveal text="Currently exploring the intersection of generative AI and human-computer interaction." className="text-base text-muted-foreground leading-relaxed" />
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-3 gap-8 max-w-3xl mx-auto mt-24">
        {stats.map((stat, i) => (
          <motion.div key={stat.label} variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} className="text-center">
            <CountUp target={stat.number} suffix={stat.suffix} />
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mt-2">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default About;
