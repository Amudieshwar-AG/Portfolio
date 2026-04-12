import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { staggerContainer } from "@/lib/animations";
import { Award, BookOpen, Trophy, Star } from "lucide-react";

const achievements = [
  { icon: Trophy, title: "Hackathon Winner", desc: "1st place at TechHacks 2024 — Built an AI-powered accessibility tool" },
  { icon: BookOpen, title: "Research Publication", desc: "Published paper on efficient transformer architectures at ML conference" },
  { icon: Award, title: "Dean's List", desc: "Consistent academic excellence across 4 semesters" },
  { icon: Star, title: "Open Source Contributor", desc: "500+ contributions to major ML/AI open source projects" },
  { icon: Trophy, title: "Kaggle Expert", desc: "Top 5% in multiple data science competitions" },
];

const TiltCard = ({ achievement }: { achievement: (typeof achievements)[0] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-50, 50], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-50, 50], [-8, 8]), { stiffness: 200, damping: 20 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const Icon = achievement.icon;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => { setHovering(false); x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="flex-shrink-0 w-72 md:w-80 glass-card rounded-lg p-6 border-l-2 border-l-lime cursor-default"
    >
      <Icon size={24} className="text-lime mb-3" />
      <h4 className="font-display text-lg font-bold mb-2">{achievement.title}</h4>
      <p className="text-sm text-muted-foreground leading-relaxed">{achievement.desc}</p>
    </motion.div>
  );
};

const Milestones = () => {
  const [paused, setPaused] = useState(false);

  return (
    <section className="py-32 overflow-hidden">
      <div className="px-6 md:px-12 mb-12">
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="font-mono text-xs uppercase tracking-[0.3em] text-lime block mb-4"
        >
          // Achievements
        </motion.span>
        <motion.h2
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="font-display text-4xl md:text-6xl font-bold"
        >
          {"Milestones".split("").map((char, i) => (
            <motion.span
              key={i}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: i * 0.04 } },
              }}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </motion.h2>
      </div>

      {/* Auto-scrolling marquee */}
      <div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        className="overflow-hidden"
      >
        <motion.div
          className="flex gap-6 px-6"
          animate={{ x: paused ? undefined : [0, -(achievements.length * 340)] }}
          transition={{ x: { duration: 30, repeat: Infinity, ease: "linear" } }}
        >
          {[...achievements, ...achievements, ...achievements].map((a, i) => (
            <TiltCard key={i} achievement={a} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Milestones;
