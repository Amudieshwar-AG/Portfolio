import { useState, useCallback, useEffect } from "react";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Milestones from "@/components/Milestones";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";

const Index = () => {
  const [loaded, setLoaded] = useState(false);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    if (!loaded) return;
    let lenis: any;
    const init = async () => {
      const Lenis = (await import("@studio-freight/lenis")).default;
      lenis = new Lenis({ duration: 1.2, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
      const raf = (time: number) => {
        lenis.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
    };
    init();
    return () => lenis?.destroy();
  }, [loaded]);

  const handleLoaded = useCallback(() => setLoaded(true), []);

  return (
    <>
      {!loaded && <Loader onComplete={handleLoaded} />}
      {loaded && (
        <>
          <CustomCursor />
          <ScrollProgress />
          <Navbar />
          <main>
            <Hero />
            <Marquee />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Milestones />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </>
  );
};

export default Index;
