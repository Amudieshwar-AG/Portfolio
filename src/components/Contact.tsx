import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Copy, Check } from "lucide-react";
import { fadeInUp, slideInLeft } from "@/lib/animations";

const Contact = () => {
  const [displayText, setDisplayText] = useState("LET'S TALK");
  const [copied, setCopied] = useState(false);
  const sectionRef = useRef(null);
  const hasScrambled = useRef(false);
  const email = "amudieshwar22@gmail.com";

  // Text scramble effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasScrambled.current) {
          hasScrambled.current = true;
          const target = "LET'S TALK";
          const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%&";
          let iteration = 0;
          const interval = setInterval(() => {
            setDisplayText(
              target
                .split("")
                .map((char, i) => {
                  if (i < iteration) return target[i];
                  return chars[Math.floor(Math.random() * chars.length)];
                })
                .join("")
            );
            iteration += 1 / 3;
            if (iteration >= target.length) clearInterval(interval);
          }, 30);
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socials = [
    { label: "GitHub", href: "https://github.com/Amudieshwar-AG/Amudieshwar-AG" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/amudieshwar-a-g/" },
  ];

  return (
    <section id="contact" ref={sectionRef} className="relative py-32 px-6 md:px-12 overflow-hidden">
      {/* Rotating circle decoration */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 pointer-events-none">
        <motion.div
          className="w-[500px] h-[500px] rounded-full border border-lime/10"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Giant text */}
        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="font-display text-[12vw] md:text-[10vw] font-bold leading-none mb-16"
        >
          {displayText}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Email */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">
              Email
            </p>
            <div className="flex items-center gap-4 flex-wrap">
              <a
                href={`mailto:${email}?subject=Opportunity%20%2F%20Collaboration`}
                className="font-mono text-lg md:text-2xl text-foreground hover:text-[#FAC300] transition-colors break-all underline decoration-white/20 hover:decoration-[#FAC300] underline-offset-4"
                title="Click to compose an email"
              >
                {email}
              </a>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 font-mono text-xs px-3 py-1.5 rounded-full border border-foreground/10 text-muted-foreground hover:text-lime hover:border-lime/30 transition-colors"
              >
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.span
                      key="copied"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-1"
                    >
                      <Check size={12} /> Copied
                    </motion.span>
                  ) : (
                    <motion.span
                      key="copy"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-1"
                    >
                      <Copy size={12} /> Copy
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </motion.div>

          {/* Social links */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">
              Connect
            </p>
            <div className="space-y-4">
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-foreground/70 hover:text-lime transition-colors group"
                  whileHover="hover"
                >
                  <span className="font-body text-lg">{s.label}</span>
                  <motion.span variants={{ hover: { x: 6 } }} transition={{ type: "spring", stiffness: 300 }}>
                    <ArrowUpRight size={16} />
                  </motion.span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
