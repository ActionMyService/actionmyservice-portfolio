"use client";

import { useRef, useState, useEffect, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  Environment,
  ContactShadows,
  OrbitControls,
  RoundedBox,
  Text,
  Sparkles,
} from "@react-three/drei";
import * as THREE from "three";
import { Rotate3D, MousePointer2, Box } from "lucide-react";

// ===== 3D Portfolio Preview v2 =====
// An interactive 3D showcase of floating project cards with
// browser chrome details, mockup frames, glow rings, connecting
// beams, and cinematic lighting.

const PROJECT_CARDS = [
  {
    position: [0, 0.7, 0] as [number, number, number],
    rotation: [0, 0, 0] as [number, number, number],
    color: "#8b5cf6",
    title: "Neo Interface",
    category: "3D UI/UX",
    size: [2.4, 1.5, 0.09] as [number, number, number],
    isHero: true,
  },
  {
    position: [-2.8, 0.1, -0.6] as [number, number, number],
    rotation: [0.02, 0.45, -0.08] as [number, number, number],
    color: "#3b82f6",
    title: "Nova Studio",
    category: "Website",
    size: [1.7, 1.1, 0.07] as [number, number, number],
    isHero: false,
  },
  {
    position: [2.8, 0.3, -0.5] as [number, number, number],
    rotation: [-0.02, -0.4, 0.06] as [number, number, number],
    color: "#10b981",
    title: "Future Vision",
    category: "AI Video",
    size: [1.6, 1.1, 0.07] as [number, number, number],
    isHero: false,
  },
  {
    position: [-2.4, -1.6, -0.3] as [number, number, number],
    rotation: [0.08, 0.35, 0.05] as [number, number, number],
    color: "#f59e0b",
    title: "Mono Brand",
    category: "Branding",
    size: [1.5, 1.0, 0.07] as [number, number, number],
    isHero: false,
  },
  {
    position: [2.5, -1.5, -0.2] as [number, number, number],
    rotation: [-0.06, -0.35, -0.05] as [number, number, number],
    color: "#ec4899",
    title: "Digital Dream",
    category: "AI Creative",
    size: [1.5, 1.0, 0.07] as [number, number, number],
    isHero: false,
  },
];

function BrowserChrome({ width, color }: { width: number; color: string }) {
  return (
    <group>
      {/* Chrome bar */}
      <mesh position={[0, 0, 0.04]}>
        <boxGeometry args={[width, 0.07, 0.01]} />
        <meshStandardMaterial color="#111118" metalness={0.8} roughness={0.3} />
      </mesh>
      {/* Chrome dots */}
      {[-width / 2 + 0.16, -width / 2 + 0.24, -width / 2 + 0.32].map((x, i) => (
        <mesh key={i} position={[x, 0, 0.05]}>
          <sphereGeometry args={[0.018, 12, 12]} />
          <meshStandardMaterial
            color={i === 0 ? "#ef4444" : i === 1 ? "#f59e0b" : "#22c55e"}
            emissive={i === 0 ? "#ef4444" : i === 1 ? "#f59e0b" : "#22c55e"}
            emissiveIntensity={0.4}
          />
        </mesh>
      ))}
      {/* URL bar */}
      <mesh position={[0.1, 0, 0.05]}>
        <boxGeometry args={[width * 0.55, 0.045, 0.01]} />
        <meshStandardMaterial color="#1c1c26" metalness={0.5} roughness={0.4} />
      </mesh>
      {/* Accent line */}
      <mesh position={[0, -0.12, 0.04]}>
        <boxGeometry args={[width, 0.008, 0.01]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.35} />
      </mesh>
    </group>
  );
}

function ProjectCard3D({
  position,
  rotation,
  color,
  title,
  category,
  size,
  isHero,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  color: string;
  title: string;
  category: string;
  size: [number, number, number];
  isHero: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.position.y =
      position[1] + Math.sin(t * 0.5 + position[0] * 2) * (isHero ? 0.12 : 0.08);
    groupRef.current.rotation.z =
      rotation[2] + Math.sin(t * 0.3 + position[1]) * 0.015;
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      {/* Main card */}
      <RoundedBox args={size} radius={isHero ? 0.08 : 0.06} smoothness={6}>
        <meshStandardMaterial
          color="#0a0a12"
          metalness={0.6}
          roughness={0.2}
          transparent
          opacity={0.96}
          envMapIntensity={0.9}
        />
      </RoundedBox>

      {/* Browser chrome for hero card */}
      {isHero && <BrowserChrome width={size[0]} color={color} />}

      {/* Card accent */}
      <mesh position={[-size[0] / 2 + 0.3, size[1] / 2 - 0.28, size[2] / 2 + 0.01]}>
        <boxGeometry args={[0.5, 0.07, 0.01]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} />
      </mesh>

      {/* Card lines - hero has deeper layout */}
      {(isHero ? [0, 1, 2, 3] : [0, 1, 2]).map((i) => (
        <mesh
          key={i}
          position={[-size[0] / 2 + 0.3, size[1] / 2 - 0.5 - i * 0.18, size[2] / 2 + 0.01]}
        >
          <boxGeometry args={[size[0] - 0.6 - i * 0.24, 0.04, 0.01]} />
          <meshStandardMaterial color={i % 2 === 0 ? "#3f3f46" : "#2c2c35"} />
        </mesh>
      ))}

      {/* Hero card media block */}
      {isHero && (
        <>
          <mesh position={[0.3, -0.25, size[2] / 2 + 0.01]}>
            <boxGeometry args={[size[0] - 0.6, 0.06, 0.01]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.25} />
          </mesh>
          <mesh position={[-size[0] / 2 + 0.6, -0.45, size[2] / 2 + 0.01]}>
            <boxGeometry args={[size[0] / 2 - 0.5, 0.28, 0.01]} />
            <meshStandardMaterial color="#1c1c26" />
          </mesh>
        </>
      )}

      {/* Title */}
      <Text
        position={[0, -size[1] / 2 - 0.17, size[2] / 2 + 0.01]}
        fontSize={isHero ? 0.14 : 0.11}
        color="#e4e4e7"
        anchorX="center"
        anchorY="middle"
        fontWeight={600}
      >
        {title}
      </Text>

      {/* Category */}
      <Text
        position={[0, -size[1] / 2 - 0.32, size[2] / 2 + 0.01]}
        fontSize={isHero ? 0.09 : 0.07}
        color={color}
        anchorX="center"
        anchorY="middle"
      >
        {category}
      </Text>
    </group>
  );
}

function ConnectingBeams() {
  const beamsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!beamsRef.current) return;
    const t = state.clock.getElapsedTime();
    beamsRef.current.rotation.y = t * 0.05;
    const opacity = 0.15 + Math.sin(t * 0.8) * 0.08;
    beamsRef.current.children.forEach((child) => {
      const mat = child as THREE.Mesh;
      const material = mat.material as THREE.MeshBasicMaterial;
      if (material && material.transparent) {
        material.opacity = opacity;
      }
    });
  });

  return (
    <group ref={beamsRef}>
      {PROJECT_CARDS.filter((c) => !c.isHero).map((card, i) => {
        const target = card.position;
        const start: [number, number, number] = [0, 0.7, 0];
        const mid: [number, number, number] = [
          (start[0] + target[0]) / 2,
          (start[1] + target[1]) / 2,
          (start[2] + target[2]) / 2,
        ];
        const length = Math.sqrt(
          Math.pow(target[0] - start[0], 2) +
            Math.pow(target[1] - start[1], 2) +
            Math.pow(target[2] - start[2], 2)
        );
        const dir: [number, number, number] = [
          (target[0] - start[0]) / length,
          (target[1] - start[1]) / length,
          (target[2] - start[2]) / length,
        ];
        return (
          <mesh key={i} position={mid} quaternion={new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(1, 0, 0), new THREE.Vector3(...dir))}>
            <cylinderGeometry args={[0.008, 0.008, length, 6, 1, true]} />
            <meshBasicMaterial color={card.color} transparent opacity={0.15} />
          </mesh>
        );
      })}
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.45} />
      <directionalLight position={[5, 5, 5]} intensity={1.4} />
      <directionalLight position={[-4, -2, -4]} intensity={0.4} color="#818cf8" />
      <pointLight position={[-4, -2, -4]} intensity={0.9} color="#8b5cf6" distance={25} decay={2} />
      <pointLight position={[3, 2, 3]} intensity={0.7} color="#3b82f6" distance={25} decay={2} />
      <pointLight position={[0, -3, 2]} intensity={0.5} color="#ec4899" distance={20} decay={2} />

      <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.4}>
        <ConnectingBeams />
      </Float>

      {PROJECT_CARDS.map((card) => (
        <ProjectCard3D key={card.title} {...card} />
      ))}

      <Sparkles
        count={120}
        scale={[12, 7, 7]}
        size={3}
        speed={0.3}
        color="#a78bfa"
        opacity={0.5}
      />

      <ContactShadows
        position={[0, -2.5, 0]}
        opacity={0.4}
        scale={12}
        blur={2.8}
        far={4.5}
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
      <div className="relative rounded-3xl border border-border bg-card overflow-hidden canvas-frame">
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
    <div className="relative rounded-3xl border border-border bg-card overflow-hidden shadow-2xl canvas-frame ambient-glow">
      <div className="relative aspect-[16/10]">
        <Canvas
          camera={{ position: [0, 0, 6.5], fov: 50 }}
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
              maxPolarAngle={Math.PI / 2.05}
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