import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function ParticleCloud({ count = 80 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate random coordinates for floating stars/nodes
  const positions = useMemo(() => {
    const temp = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      temp[i * 3] = (Math.random() - 0.5) * 12; // X
      temp[i * 3 + 1] = (Math.random() - 0.5) * 12; // Y
      temp[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2; // Z
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    
    // Slow rotational drift
    pointsRef.current.rotation.y = time * 0.03;
    pointsRef.current.rotation.x = time * 0.015;

    // React to cursor position
    const { x, y } = state.pointer;
    pointsRef.current.rotation.y += (x * 0.1 - pointsRef.current.rotation.y) * 0.05;
    pointsRef.current.rotation.x += (-y * 0.1 - pointsRef.current.rotation.x) * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#818cf8"
        size={0.06}
        sizeAttenuation
        transparent
        opacity={0.5}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function FloatingShapes() {
  const shape1 = useRef<THREE.Mesh>(null);
  const shape2 = useRef<THREE.Mesh>(null);
  const shape3 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (shape1.current) {
      shape1.current.rotation.x = time * 0.15;
      shape1.current.rotation.y = time * 0.2;
      shape1.current.position.y = Math.sin(time * 0.5) * 0.4 + 1.8;
      shape1.current.position.x = Math.cos(time * 0.3) * 0.2 + 2.5;
    }

    if (shape2.current) {
      shape2.current.rotation.y = time * -0.2;
      shape2.current.rotation.z = time * 0.15;
      shape2.current.position.y = Math.cos(time * 0.4) * 0.5 - 2;
      shape2.current.position.x = Math.sin(time * 0.3) * 0.3 - 2.8;
    }

    if (shape3.current) {
      shape3.current.rotation.x = time * 0.1;
      shape3.current.rotation.z = time * 0.25;
      shape3.current.position.y = Math.sin(time * 0.6) * 0.3 + 0.5;
      shape3.current.position.x = Math.cos(time * 0.5) * 0.4 + 4;
    }
  });

  return (
    <>
      {/* Floating Torus - Neon Blue Glass effect */}
      <mesh ref={shape1} position={[2.5, 1.8, -2]}>
        <torusGeometry args={[0.6, 0.15, 16, 60]} />
        <meshPhysicalMaterial
          color="#60a5fa"
          roughness={0.15}
          metalness={0.1}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          transmission={0.6}
          thickness={1.2}
          transparent
        />
      </mesh>

      {/* Floating Octahedron - Neon Purple Glass effect */}
      <mesh ref={shape2} position={[-2.8, -2, -1]}>
        <octahedronGeometry args={[0.7]} />
        <meshPhysicalMaterial
          color="#a78bfa"
          roughness={0.2}
          metalness={0.2}
          clearcoat={0.8}
          transmission={0.5}
          thickness={1.0}
          transparent
        />
      </mesh>

      {/* Floating Dodecahedron - Neon Pink Glass effect */}
      <mesh ref={shape3} position={[4, 0.5, -3]}>
        <dodecahedronGeometry args={[0.55]} />
        <meshPhysicalMaterial
          color="#f472b6"
          roughness={0.1}
          metalness={0.3}
          clearcoat={0.9}
          transmission={0.7}
          thickness={0.8}
          transparent
        />
      </mesh>
    </>
  );
}

export default function Scene3D() {
  return (
    <div className="fixed inset-0 w-full h-full -z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.8} />
        <pointLight position={[-10, -10, -5]} intensity={0.8} color="#818cf8" />
        <pointLight position={[10, -10, 5]} intensity={0.5} color="#ec4899" />
        
        <ParticleCloud count={90} />
        <FloatingShapes />
      </Canvas>
    </div>
  );
}
