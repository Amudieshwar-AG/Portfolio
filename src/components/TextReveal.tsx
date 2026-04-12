import { motion } from "framer-motion";
import { wordReveal, wordChild } from "@/lib/animations";

interface TextRevealProps {
  text: string;
  className?: string;
}

const TextReveal = ({ text, className = "" }: TextRevealProps) => {
  const words = text.split(" ");

  return (
    <motion.p
      variants={wordReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={className}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
          <motion.span variants={wordChild} className="inline-block">
            {word}
          </motion.span>
        </span>
      ))}
    </motion.p>
  );
};

export default TextReveal;
