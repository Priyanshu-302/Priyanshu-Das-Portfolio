import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Deterministic pseudo-random helper for pure hook execution
function getDeterministicPositions(count: number) {
  const temp = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    // Deterministic pseudo-random distribution
    const seed1 = Math.sin(i * 12.9898) * 43758.5453;
    const rand1 = seed1 - Math.floor(seed1);
    const seed2 = Math.sin(i * 78.233) * 43758.5453;
    const rand2 = seed2 - Math.floor(seed2);
    const seed3 = Math.sin(i * 37.719) * 43758.5453;
    const rand3 = seed3 - Math.floor(seed3);

    temp[i * 3] = (rand1 - 0.5) * 14;
    temp[i * 3 + 1] = (rand2 - 0.5) * 14;
    temp[i * 3 + 2] = (rand3 - 0.5) * 10 - 2;
  }
  return temp;
}

function LiquidParticles({ count = 100 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    return getDeterministicPositions(count);
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();

    // Fluid rotational drift
    pointsRef.current.rotation.y = time * 0.025;
    pointsRef.current.rotation.x = Math.sin(time * 0.02) * 0.05;

    // React smoothly to cursor pointer
    const { x, y } = state.pointer;
    pointsRef.current.rotation.y += (x * 0.08 - pointsRef.current.rotation.y) * 0.03;
    pointsRef.current.rotation.x += (-y * 0.08 - pointsRef.current.rotation.x) * 0.03;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#a5b4fc"
        size={0.07}
        sizeAttenuation
        transparent
        opacity={0.65}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function LiquidGlassMeshes() {
  const mesh1 = useRef<THREE.Mesh>(null);
  const mesh2 = useRef<THREE.Mesh>(null);
  const mesh3 = useRef<THREE.Mesh>(null);
  const mesh4 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const { x, y } = state.pointer;

    // 1. Fluid Torus Knot (Top Right - Emerald/Cyan Liquid Glass)
    if (mesh1.current) {
      mesh1.current.rotation.x = time * 0.18;
      mesh1.current.rotation.y = time * 0.22;
      mesh1.current.position.y = Math.sin(time * 0.6) * 0.35 + 1.6;
      mesh1.current.position.x = Math.cos(time * 0.4) * 0.25 + 2.8 + x * 0.3;
    }

    // 2. Liquid Droplet Sphere (Bottom Left - Indigo/Violet Viscous Glass)
    if (mesh2.current) {
      mesh2.current.rotation.y = time * -0.2;
      mesh2.current.rotation.z = time * 0.15;
      mesh2.current.position.y = Math.cos(time * 0.5) * 0.4 - 1.8;
      mesh2.current.position.x = Math.sin(time * 0.35) * 0.3 - 3.2 + x * 0.2;
      const scale = 1 + Math.sin(time * 1.2) * 0.04;
      mesh2.current.scale.set(scale, scale, scale);
    }

    // 3. Fluid Octahedron (Center Right - Iridescent Rose/Pink Liquid)
    if (mesh3.current) {
      mesh3.current.rotation.x = time * 0.12;
      mesh3.current.rotation.z = time * 0.2;
      mesh3.current.position.y = Math.sin(time * 0.7) * 0.3 + 0.2;
      mesh3.current.position.x = Math.cos(time * 0.5) * 0.3 + 3.8 + x * 0.25;
    }

    // 4. Floating Mini Droplet (Top Left - Pure Refractive Water Droplet)
    if (mesh4.current) {
      mesh4.current.rotation.y = time * 0.3;
      mesh4.current.position.y = Math.sin(time * 0.8 + 1) * 0.25 + 2.2;
      mesh4.current.position.x = Math.cos(time * 0.6 + 1) * 0.25 - 2.5 + y * 0.2;
    }
  });

  return (
    <>
      {/* 1. Fluid Torus Knot - Emerald & Cyan High Refraction Liquid Glass */}
      <mesh ref={mesh1} position={[2.8, 1.6, -2]}>
        <torusKnotGeometry args={[0.55, 0.16, 100, 24, 2, 3]} />
        <meshPhysicalMaterial
          color="#38bdf8"
          roughness={0.04}
          metalness={0.05}
          transmission={0.96}
          thickness={2.5}
          ior={1.48}
          clearcoat={1.0}
          clearcoatRoughness={0.03}
          specularIntensity={1.0}
          specularColor={new THREE.Color("#ffffff")}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* 2. Liquid Droplet Icosahedron - Deep Indigo / Purple Viscous Glass */}
      <mesh ref={mesh2} position={[-3.2, -1.8, -1.5]}>
        <icosahedronGeometry args={[0.75, 4]} />
        <meshPhysicalMaterial
          color="#818cf8"
          roughness={0.05}
          metalness={0.08}
          transmission={0.94}
          thickness={2.2}
          ior={1.46}
          clearcoat={1.0}
          clearcoatRoughness={0.04}
          specularIntensity={1.0}
          specularColor={new THREE.Color("#e0e7ff")}
          transparent
          opacity={0.88}
        />
      </mesh>

      {/* 3. Fluid Octahedron - Rose / Pink Liquid Crystal Glass */}
      <mesh ref={mesh3} position={[3.8, 0.2, -2.5]}>
        <octahedronGeometry args={[0.65]} />
        <meshPhysicalMaterial
          color="#f472b6"
          roughness={0.03}
          metalness={0.1}
          transmission={0.95}
          thickness={1.8}
          ior={1.5}
          clearcoat={1.0}
          clearcoatRoughness={0.03}
          specularIntensity={1.0}
          specularColor={new THREE.Color("#ffffff")}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* 4. Mini Floating Refractive Droplet - Emerald Cyan Water Droplet */}
      <mesh ref={mesh4} position={[-2.5, 2.2, -2]}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshPhysicalMaterial
          color="#34d399"
          roughness={0.02}
          metalness={0.02}
          transmission={0.98}
          thickness={1.5}
          ior={1.42}
          clearcoat={1.0}
          clearcoatRoughness={0.02}
          specularIntensity={1.0}
          specularColor={new THREE.Color("#ffffff")}
          transparent
          opacity={0.9}
        />
      </mesh>
    </>
  );
}

export default function Scene3D() {
  return (
    <div className="fixed inset-0 w-full h-full -z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 58 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        {/* Soft Ambient Light */}
        <ambientLight intensity={0.7} />

        {/* Main Specular Directional Lights for Glass Refraction Highlights */}
        <directionalLight position={[8, 12, 6]} intensity={2.2} color="#ffffff" />
        <directionalLight position={[-8, -8, -4]} intensity={1.2} color="#818cf8" />

        {/* Caustic Point Lights */}
        <pointLight position={[-4, 4, 3]} intensity={1.2} color="#06b6d4" />
        <pointLight position={[5, -3, 2]} intensity={1.4} color="#ec4899" />
        <pointLight position={[0, -5, 4]} intensity={0.9} color="#10b981" />

        {/* 3D Liquid Scene */}
        <LiquidParticles count={110} />
        <LiquidGlassMeshes />
      </Canvas>
    </div>
  );
}
