import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import CodingProfiles from "@/components/CodingProfiles";
import Projects from "@/components/Projects";
import Achievements from "@/components/Achievements";
import Experience from "@/components/Experience";
import Research from "@/components/Research";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";

const Index = () => {
  const [loading, setLoading] = useState(true);

  // Initialize Lenis smooth scroll once loader completes to prevent main-thread contention
  useEffect(() => {
    if (loading) return;
    let lenis: any;
    let rafId: number;
    const init = async () => {
      const Lenis = (await import("@studio-freight/lenis")).default;
      lenis = new Lenis({ duration: 1.2, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
      const raf = (time: number) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    };
    init();
    return () => {
      cancelAnimationFrame(rafId);
      lenis?.destroy();
    };
  }, [loading]);

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}
      {!loading && <CustomCursor />}
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <CodingProfiles />
        <Projects />
        <Achievements />
        <Experience />
        <Research />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default Index;
