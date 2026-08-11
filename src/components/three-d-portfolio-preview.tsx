"use client";

import { useRef, useState, useEffect, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, ContactShadows, OrbitControls, RoundedBox, Text } from "@react-three/drei";
import * as THREE from "three";
import { Rotate3D, MousePointer2, Box } from "lucide-react";

// ===== 3D Portfolio Preview =====
// An interactive 3D showcase of floating project cards
// that represent the six ActionMyService categories.

const PROJECT_CARDS = [
  {
    position: [0, 0.4, 0] as [number, number, number],
    rotation: [0, 0, 0] as [number, number, number],
    color: "#8b5cf6",
    title: "Neo Interface",
    category: "3D UI/UX",
    size: [2.2, 1.4, 0.08] as [number, number, number],
  },
  {
    position: [-2.6, 0.2, -0.5] as [number, number, number],
    rotation: [0, 0.4, -0.08] as [number, number, number],
    color: "#3b82f6",
    title: "Nova Studio",
    category: "Website",
    size: [1.6, 1.0, 0.06] as [number, number, number],
  },
  {
    position: [2.6, 0.3, -0.4] as [number, number, number],
    rotation: [0, -0.35, 0.06] as [number, number, number],
    color: "#10b981",
    title: "Future Vision",
    category: "AI Video",
    size: [1.5, 1.0, 0.06] as [number, number, number],
  },
  {
    position: [-2.2, -1.3, -0.3] as [number, number, number],
    rotation: [0.1, 0.3, 0.05] as [number, number, number],
    color: "#f59e0b",
    title: "Mono Brand",
    category: "Branding",
    size: [1.4, 0.9, 0.06] as [number, number, number],
  },
  {
    position: [2.3, -1.2, -0.2] as [number, number, number],
    rotation: [-0.08, -0.3, -0.05] as [number, number, number],
    color: "#ec4899",
    title: "Digital Dream",
    category: "AI Creative",
    size: [1.4, 0.9, 0.06] as [number, number, number],
  },
];

function ProjectCard3D({
  position,
  rotation,
  color,
  title,
  category,
  size,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  color: string;
  title: string;
  category: string;
  size: [number, number, number];
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.position.y = position[1] + Math.sin(t * 0.5 + position[0] * 2) * 0.08;
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      <RoundedBox args={size} radius={0.06} smoothness={4}>
        <meshStandardMaterial
          color="#0a0a0f"
          metalness={0.5}
          roughness={0.25}
          transparent
          opacity={0.95}
        />
      </RoundedBox>

      {/* Card accent */}
      <mesh position={[-size[0] / 2 + 0.25, size[1] / 2 - 0.12, size[2] / 2 + 0.01]}>
        <boxGeometry args={[0.4, 0.06, 0.01]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
      </mesh>

      {/* Card lines */}
      {[0, 1, 2].map((i) => (
        <mesh
          key={i}
          position={[-size[0] / 2 + 0.25, size[1] / 2 - 0.3 - i * 0.16, size[2] / 2 + 0.01]}
        >
          <boxGeometry args={[size[0] - 0.5 - i * 0.2, 0.035, 0.01]} />
          <meshStandardMaterial color="#3f3f46" />
        </mesh>
      ))}

      {/* Title */}
      <Text
        position={[0, -size[1] / 2 - 0.15, size[2] / 2 + 0.01]}
        fontSize={0.1}
        color="#e4e4e7"
        anchorX="center"
        anchorY="middle"
      >
        {title}
      </Text>

      {/* Category */}
      <Text
        position={[0, -size[1] / 2 - 0.3, size[2] / 2 + 0.01]}
        fontSize={0.07}
        color={color}
        anchorX="center"
        anchorY="middle"
      >
        {category}
      </Text>
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.3} />
      <pointLight position={[-4, -2, -4]} intensity={0.7} color="#8b5cf6" />
      <pointLight position={[3, 2, 3]} intensity={0.5} color="#3b82f6" />

      {PROJECT_CARDS.map((card) => (
        <ProjectCard3D key={card.title} {...card} />
      ))}

      <ContactShadows
        position={[0, -2.2, 0]}
        opacity={0.35}
        scale={10}
        blur={2.5}
        far={4}
      />

      <Environment preset="city" />
    </>
  );
}

export function ThreeDPortfolioPreview() {
  const [isClient, setIsClient] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isLowPower, setIsLowPower] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const nav = navigator as Navigator & { deviceMemory?: number };
    if (nav.deviceMemory && nav.deviceMemory <= 4) {
      setIsLowPower(true);
    }
  }, []);

  if (!isClient) {
    return (
      <div className="relative rounded-3xl border border-border bg-card overflow-hidden">
        <div className="relative aspect-[16/10]">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Box className="w-12 h-12 text-accent mx-auto mb-4" />
              <p className="text-muted-foreground text-sm">Loading 3D preview...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative rounded-3xl border border-border bg-card overflow-hidden shadow-2xl">
      <div className="relative aspect-[16/10]">
        <Canvas
          camera={{ position: [0, 0, 6], fov: 50 }}
          dpr={isLowPower ? [1, 1] : [1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          style={{ background: "transparent" }}
        >
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
          {!reducedMotion && (
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.5}
              maxPolarAngle={Math.PI / 2.1}
              minPolarAngle={Math.PI / 3.5}
            />
          )}
        </Canvas>

        <div className="absolute top-5 left-5 pointer-events-none">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 backdrop-blur-md border border-border text-sm font-medium">
            <Rotate3D className="w-4 h-4 text-accent" />
            Our Work in 3D
          </div>
        </div>

        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 pointer-events-none">
          <p className="text-xs text-muted-foreground bg-background/60 backdrop-blur-sm px-4 py-2 rounded-full border border-border flex items-center gap-2">
            <MousePointer2 className="w-3.5 h-3.5" />
            Drag to explore projects
          </p>
        </div>
      </div>
    </div>
  );
}