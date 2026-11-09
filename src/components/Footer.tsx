import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="relative py-12 px-6 md:px-12 border-t border-foreground/5 overflow-hidden">
      {/* Credit line */}
      <div className="relative z-10 mb-8">
        <p className="font-mono text-xs text-muted-foreground text-center">
          Designed & Built by Amudieshwar • 2025
        </p>
      </div>

      {/* Giant name */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative z-10 w-full flex justify-center px-4"
      >
        <h2 
          className="font-display font-bold text-center leading-none select-none"
          style={{ 
            fontSize: "clamp(2rem, 10vw, 12rem)",
            background: "linear-gradient(to right, #FFFFFF, #FAC300)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}
        >
          AMUDIESHWAR
        </h2>
      </motion.div>
    </footer>
  );
};

export default Footer;
