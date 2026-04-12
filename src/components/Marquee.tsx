import { motion } from "framer-motion";

const items = [
  "MACHINE LEARNING",
  "DATA SCIENCE",
  "AI SYSTEMS",
  "FULL STACK",
  "OPEN SOURCE",
  "DEEP LEARNING",
  "COMPUTER VISION",
];

const Marquee = () => {
  const marqueeText = items.join(" • ") + " • ";

  return (
    <div className="py-8 border-y border-foreground/5 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        <span className="font-display text-xl md:text-3xl font-bold text-lime tracking-wider">
          {marqueeText}
        </span>
        <span className="font-display text-xl md:text-3xl font-bold text-lime tracking-wider">
          {marqueeText}
        </span>
      </div>
    </div>
  );
};

export default Marquee;
