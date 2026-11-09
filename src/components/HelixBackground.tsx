import { useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Sparkles, Float } from "@react-three/drei";

class HelixCurve extends THREE.Curve<THREE.Vector3> {
  phase: number;
  constructor(phase = 0) {
    super();
    this.phase = phase;
  }
  getPoint(t: number, optionalTarget = new THREE.Vector3()) {
    const height = 30; // total vertical height
    const turns = 4; // number of full rotations
    const radius = 2.5; // radius of the helix
    
    // t goes from 0 to 1
    const y = (t - 0.5) * height; 
    const angle = t * Math.PI * 2 * turns + this.phase;
    
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;
    
    return optionalTarget.set(x, y, z);
  }
}

const DNA = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  const curve1 = useMemo(() => new HelixCurve(0), []);
  const curve2 = useMemo(() => new HelixCurve(Math.PI), []);

  const rungsCount = 60;
  const rungs = useMemo(() => {
    const arr = [];
    for (let i = 1; i < rungsCount; i++) {
      const t = i / rungsCount;
      const p1 = curve1.getPoint(t);
      const p2 = curve2.getPoint(t);
      
      const pos = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
      
      const axis = new THREE.Vector3().subVectors(p2, p1);
      const length = axis.length();
      
      const quaternion = new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        axis.clone().normalize()
      );
      
      arr.push({ pos, quaternion, length });
    }
    return arr;
  }, [curve1, curve2]);

  useFrame((state) => {
    if (groupRef.current) {
      // Smooth continuous 3D rotation
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.25;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });

  // Premium glossy gold material for that perfect 3D look
  const material = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#FFD700",
    emissive: "#6B4C00",
    emissiveIntensity: 0.5,
    metalness: 0.9,
    roughness: 0.1,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
  }), []);

  return (
    // Positioned to the right and tilted diagonally
    <group position={[5, 0, -8]} rotation={[0, 0, Math.PI / 5.5]}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.8}>
        <group ref={groupRef}>
          {/* Backbone 1 */}
          <mesh material={material}>
            <tubeGeometry args={[curve1, 200, 0.35, 32, false]} />
          </mesh>
          
          {/* Backbone 2 */}
          <mesh material={material}>
            <tubeGeometry args={[curve2, 200, 0.35, 32, false]} />
          </mesh>

          {/* Rungs */}
          {rungs.map((rung, i) => (
            <mesh key={i} position={rung.pos} quaternion={rung.quaternion} material={material}>
              <cylinderGeometry args={[0.12, 0.12, rung.length, 16]} />
            </mesh>
          ))}
        </group>
      </Float>
    </group>
  );
};

const NeuralNetwork = () => {
  const groupRef = useRef<THREE.Group>(null);
  const particleCount = 120;
  const maxDistance = 12;

  const { nodes, lines } = useMemo(() => {
    const nodes = [];
    const pts = [];

    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 80;
      const y = (Math.random() - 0.5) * 80;
      const z = (Math.random() - 0.5) * 20 - 5; // bring closer to camera
      
      const isSpecial = Math.random() > 0.85; // some nodes are larger with rings
      const size = isSpecial ? Math.random() * 0.3 + 0.15 : Math.random() * 0.15 + 0.05;
      
      nodes.push({ pos: new THREE.Vector3(x, y, z), size, isSpecial });
      pts.push(new THREE.Vector3(x, y, z));
    }

    const linePositions: number[] = [];
    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        const dist = pts[i].distanceTo(pts[j]);
        if (dist < maxDistance) {
          linePositions.push(
            pts[i].x, pts[i].y, pts[i].z,
            pts[j].x, pts[j].y, pts[j].z
          );
        }
      }
    }

    return { nodes, lines: new Float32Array(linePositions) };
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.015;
      groupRef.current.rotation.x = state.clock.elapsedTime * 0.008;
    }
  });

  const nodeMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#FFD700",
    emissive: "#FFB000",
    emissiveIntensity: 2.0,
    roughness: 0.1,
    metalness: 1,
    clearcoat: 1,
  }), []);

  return (
    <group ref={groupRef} position={[0, 0, -2]}>
      {/* Connections between nodes */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={lines.length / 3} array={lines} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial color="#FFD700" transparent opacity={0.6} />
      </lineSegments>

      {/* Actual 3D Nodes */}
      {nodes.map((node, i) => (
        <group key={i} position={node.pos}>
          {/* Sphere Node */}
          <mesh material={nodeMaterial}>
            <sphereGeometry args={[node.size, 16, 16]} />
          </mesh>

          {/* Special Ripples (Concentric rings for larger nodes) */}
          {node.isSpecial && (
            <group>
              {/* Inner ring */}
              <mesh>
                <ringGeometry args={[node.size + 0.2, node.size + 0.25, 32]} />
                <meshBasicMaterial color="#FFD700" transparent opacity={0.8} side={THREE.DoubleSide} />
              </mesh>
              {/* Outer ring */}
              <mesh>
                <ringGeometry args={[node.size + 0.5, node.size + 0.55, 32]} />
                <meshBasicMaterial color="#FFD700" transparent opacity={0.4} side={THREE.DoubleSide} />
              </mesh>
              {/* Extra glow lighting */}
              <pointLight distance={8} intensity={2.5} color="#FFD700" />
            </group>
          )}
        </group>
      ))}
    </group>
  );
};

const HelixBackground = () => {
  return (
    <>
      <div className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }} gl={{ antialias: true, alpha: true }}>
          {/* Lighting setup to enhance glossiness */}
          <ambientLight intensity={0.8} />
          <directionalLight position={[10, 10, 10]} intensity={2.5} color="#ffffff" />
          <directionalLight position={[-10, -10, -10]} intensity={1} color="#FAC300" />
          <spotLight position={[0, 10, 10]} intensity={3} angle={0.2} penumbra={1} color="#FAC300" />
          
          {/* Golden particles floating around for atmosphere - increased visibility */}
          <Sparkles 
            count={200} 
            scale={30} 
            size={6} 
            speed={0.4} 
            opacity={0.8} 
            color="#FFD700" 
          />
          
          {/* Background Neural Network */}
          <NeuralNetwork />
          
          {/* The 3D DNA Model */}
          <DNA />

          {/* Environment for rich realistic reflections */}
          <Environment preset="city" />
        </Canvas>
      </div>

      {/* Radial soft glow behind the 3D scene */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{
          background: "radial-gradient(circle at 75% 50%, rgba(250, 195, 0, 0.08) 0%, transparent 60%)",
          zIndex: -1
        }}
      />
      
      {/* Left-side dark vignette to protect text readability */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{
          background: "linear-gradient(to right, rgba(10,10,18,0.95) 0%, rgba(10,10,18,0.85) 35%, transparent 100%)",
          zIndex: 1
        }}
      />
    </>
  );
};

export default HelixBackground;
