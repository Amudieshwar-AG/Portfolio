import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, Stars } from "@react-three/drei";
import * as THREE from "three";

const GlassSphere = ({
  position,
  size,
  speed,
  rotationIntensity,
  floatIntensity,
}: {
  position: [number, number, number];
  size: number;
  speed: number;
  rotationIntensity: number;
  floatIntensity: number;
}) => {
  return (
    <Float
      speed={speed}
      rotationIntensity={rotationIntensity}
      floatIntensity={floatIntensity}
    >
      <mesh position={position}>
        <sphereGeometry args={[size, 64, 64]} />
        <meshPhysicalMaterial
          color="#ffffff"
          emissive="#FFC107"
          emissiveIntensity={0.05}
          transmission={1}
          opacity={1}
          metalness={0}
          roughness={0.05}
          ior={1.5}
          thickness={2}
          specularIntensity={1}
          specularColor="#FFC107"
          clearcoat={1}
          clearcoatRoughness={0.1}
          envMapIntensity={1.5}
        />
      </mesh>
    </Float>
  );
};

const MouseParallax = () => {
  const { camera, pointer } = useThree();
  const target = new THREE.Vector3();

  useFrame((state, delta) => {
    // Very subtle parallax: move camera slightly based on mouse
    // Mouse coords are -1 to +1
    target.set(pointer.x * 2, pointer.y * 2, camera.position.z);
    camera.position.lerp(target, delta * 2);
    camera.lookAt(0, 0, 0);
  });

  return null;
};

const Scene = () => {
  // Generate 12-15 random spheres
  const spheres = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => {
      // Sizes between 1 and 8 in three.js units (approx 20px to 240px depending on camera)
      const size = Math.random() * 3 + 0.5;
      // Random positions spread out
      const x = (Math.random() - 0.5) * 35;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 15 - 5;
      
      return {
        id: i,
        position: [x, y, z] as [number, number, number],
        size,
        speed: Math.random() * 0.5 + 0.2, // slow float
        rotationIntensity: Math.random() * 0.5 + 0.2,
        floatIntensity: Math.random() * 0.5 + 0.5,
      };
    });
  }, []);

  return (
    <>
      <MouseParallax />

      {/* Tiny white stars */}
      <Stars radius={50} depth={50} count={2000} factor={2} saturation={0} fade speed={0.5} />
      {/* Tiny gold stars */}
      <Stars radius={50} depth={50} count={1000} factor={2.5} saturation={1} fade speed={0.5} />

      {/* Lighting to accent the glass */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 10]} intensity={1} color="#FFC107" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#FFC107" />
      
      {/* Environment for glass reflections */}
      <Environment preset="city" />

      {spheres.map((props) => (
        <GlassSphere key={props.id} {...props} />
      ))}
    </>
  );
};

const GlassSpheresBackground = () => {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-auto" style={{ zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 20], fov: 45 }}
        dpr={[1, 2]} // Optimize for mobile and high DPI
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
};

export default GlassSpheresBackground;
