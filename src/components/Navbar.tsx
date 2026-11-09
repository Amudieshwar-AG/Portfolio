import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = ["About", "Skills", "Projects", "Achievements", "Experience", "Research", "Contact"];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.toLowerCase()));
      let currentSection = "";
      
      // Add offset to make sure it highlights appropriately before scrolling completely past
      for (const section of sections) {
        if (section) {
          const rect = section.getBoundingClientRect();
          // Adjust threshold based on viewport height, roughly when element is near top/middle
          if (rect.top <= window.innerHeight / 3 && rect.bottom >= 100) {
            currentSection = section.id;
            break;
          }
        }
      }
      
      if (currentSection) {
        setActiveSection(currentSection);
      } else if (window.scrollY < 100) {
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once on mount to set initial state
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4 flex items-center justify-end"
      style={{ background: "rgba(10,10,18,0.55)", backdropFilter: "blur(12px)" }}
    >
      {/* Desktop */}
      <ul className="hidden md:flex items-center gap-8">
        {navItems.map((item) => {
          const isActive = activeSection === item.toLowerCase();
          return (
            <li key={item} className="relative flex items-center justify-center rounded-full h-[30px]">
              {isActive && (
                <motion.div
                  layoutId="active-nav-indicator"
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "rgba(255, 193, 7, 0.12)",
                    border: "1px solid rgba(255, 193, 7, 0.45)",
                    borderRadius: "9999px",
                    backdropFilter: "blur(8px)",
                    boxShadow: "0 0 10px rgba(255,193,7,0.15), 0 0 20px rgba(255,193,7,0.08)",
                  }}
                  transition={{
                    type: "tween",
                    ease: "easeInOut",
                    duration: 0.35,
                  }}
                />
              )}
              <a
                href={`#${item.toLowerCase()}`}
                className={`relative z-10 font-display text-xs font-semibold uppercase tracking-widest transition-colors duration-300 flex items-center h-full px-[18px] ${
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-lime"
                }`}
              >
                {item}
              </a>
            </li>
          );
        })}
      </ul>

      {/* Mobile toggle */}
      <button onClick={() => setOpen(!open)} className="md:hidden text-foreground z-50">
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-background/95 backdrop-blur-lg flex flex-col items-center justify-center gap-8 md:hidden"
        >
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setOpen(false)}
              className="font-display text-3xl font-bold text-foreground hover:text-lime transition-colors"
            >
              {item}
            </a>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
