import { useState, useEffect, useRef, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Particle field component
const Particles = () => {
  const meshRef = useRef<THREE.Points>(null);
  const count = 800;

  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 8;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 8;

    // Lime-ish colors
    const isLime = Math.random() > 0.7;
    colors[i * 3] = isLime ? 0.91 : 0.3;
    colors[i * 3 + 1] = isLime ? 1.0 : 0.3;
    colors[i * 3 + 2] = isLime ? 0.0 : 0.3;
  }

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.03) * 0.1;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.03} vertexColors transparent opacity={0.8} sizeAttenuation />
    </points>
  );
};

const roles = ["AI Engineer", "ML Architect", "Full Stack Dev", "Problem Solver"];

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const name = "JOHN DOE";

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const socials = [
    { icon: Github, label: "GitHub", href: "#" },
    { icon: Linkedin, label: "LinkedIn", href: "#" },
    { icon: Mail, label: "Email", href: "mailto:hello@johndoe.dev" },
  ];

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Watermark */}
      <motion.div
        className="absolute top-1/2 left-0 -translate-y-1/2 font-display text-[20vw] font-bold text-foreground/[0.03] whitespace-nowrap select-none pointer-events-none"
        animate={{ x: [0, -200] }}
        transition={{ duration: 30, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
      >
        DEVELOPER
      </motion.div>

      {/* 3D Scene right half */}
      <div className="absolute right-0 top-0 w-full md:w-1/2 h-full opacity-60">
        <Suspense fallback={null}>
          <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
            <Particles />
          </Canvas>
        </Suspense>
      </div>

      {/* Content overlay */}
      <div className="relative z-10 h-full flex flex-col justify-between px-6 md:px-12 pt-24 pb-12">
        {/* Availability badge */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 3, duration: 0.6 }}
          className="flex items-center gap-2"
        >
          <motion.div
            className="w-2 h-2 rounded-full bg-lime"
            animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Open to opportunities
          </span>
        </motion.div>

        {/* Name */}
        <div className="flex-1 flex flex-col justify-center max-w-3xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.04, delayChildren: 3.2 } } }}
            className="mb-4"
          >
            {name.split("").map((char, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { y: Math.random() * 80 + 40, opacity: 0 },
                  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] } },
                }}
                className="font-display text-5xl md:text-8xl lg:text-9xl font-bold inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.div>

          {/* Role flipper */}
          <div className="h-10 md:h-14 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={roleIndex}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -40, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
                className="font-display text-2xl md:text-4xl font-semibold text-lime block"
              >
                {roles[roleIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex items-end justify-between">
          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.6 }}
            className="flex gap-6"
          >
            {socials.map(({ icon: Icon, label, href }) => (
              <motion.a
                key={label}
                href={href}
                className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors group"
                whileHover="hover"
              >
                <Icon size={16} />
                <span className="font-mono text-xs hidden md:inline">{label}</span>
                <motion.span
                  variants={{ hover: { x: 6 } }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <ArrowUpRight size={12} />
                </motion.span>
              </motion.a>
            ))}
          </motion.div>

          {/* Rotating badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.8 }}
            className="hidden md:block"
          >
            <div className="relative w-28 h-28">
              <motion.svg
                viewBox="0 0 200 200"
                className="w-full h-full animate-spin-slow"
              >
                <defs>
                  <path id="circlePath" d="M100,100 m-75,0 a75,75 0 1,1 150,0 a75,75 0 1,1 -150,0" />
                </defs>
                <text className="fill-muted-foreground" style={{ fontSize: "14px", fontFamily: "JetBrains Mono" }}>
                  <textPath href="#circlePath">
                    AVAILABLE FOR WORK • AVAILABLE FOR WORK •{" "}
                  </textPath>
                </text>
              </motion.svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-lime" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
