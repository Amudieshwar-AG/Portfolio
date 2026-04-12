import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="relative py-12 px-6 md:px-12 border-t border-foreground/5 overflow-hidden">
      {/* Credit line */}
      <div className="relative z-10 mb-8">
        <p className="font-mono text-xs text-muted-foreground text-center">
          Designed & Built by John Doe • 2025
        </p>
      </div>

      {/* Giant name */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative z-10"
      >
        <h2 className="font-display text-[14vw] md:text-[12vw] font-bold text-center leading-none text-gradient-lime select-none">
          JOHN DOE
        </h2>
      </motion.div>
    </footer>
  );
};

export default Footer;
