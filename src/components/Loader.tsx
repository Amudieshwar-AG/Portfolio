import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Loader = ({ onComplete }: { onComplete: () => void }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 400);
          return 100;
        }
        return prev + 2;
      });
    }, 40);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {count <= 100 && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* SVG Initials */}
          <motion.svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            className="mb-8"
          >
            <motion.text
              x="50%"
              y="55%"
              dominantBaseline="middle"
              textAnchor="middle"
              className="font-display"
              fill="none"
              stroke="hsl(72, 100%, 50%)"
              strokeWidth="1.5"
              fontSize="60"
              fontWeight="700"
              initial={{ strokeDasharray: 300, strokeDashoffset: 300 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            >
              JD
            </motion.text>
          </motion.svg>

          {/* Counter */}
          <span className="font-mono text-sm text-muted-foreground tracking-widest">
            {String(count).padStart(3, "0")}%
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
