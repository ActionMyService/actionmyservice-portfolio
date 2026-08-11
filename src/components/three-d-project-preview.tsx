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
  MeshDistortMaterial,
  Sparkles as Sparkles3D,
} from "@react-three/drei";
import * as THREE from "three";
import {
  Rotate3D,
  MousePointer2,
  ZoomIn,
  ZoomOut,
  RefreshCw,
  Sparkles,
} from "lucide-react";

// ===== Interactive 3D Project Preview =====
// A premium immersive 3D showcase for 3D UI/UX project detail pages.
// Features a central distorted sphere, orbiting UI panels, floating
// interface cards, particle field and cinematic lighting.
// Supports rotate, zoom, auto-rotate toggle and touch interaction.

function CentralCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<any>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.15;
    meshRef.current.rotation.y = t * 0.2;
    meshRef.current.position.y = Math.sin(t * 0.4) * 0.15;

    const scale = 1 + Math.sin(t * 0.6) * 0.05;
    meshRef.current.scale.setScalar(scale);
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.2, 4]} />
      <MeshDistortMaterial
        ref={matRef}
        color="#8b5cf6"
        metalness={0.85}
        roughness={0.12}
        envMapIntensity={1.4}
        distort={0.25}
        speed={1.5}
      />
    </mesh>
  );
}

function InnerRing() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.x = Math.sin(t * 0.2) * 0.3;
    groupRef.current.rotation.y = t * 0.4;
    groupRef.current.rotation.z = Math.cos(t * 0.15) * 0.2;
  });

  return (
    <group ref={groupRef}>
      {/* Ring 1 */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.8, 0.015, 16, 100]} />
        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#8b5cf6"
          emissiveIntensity={0.4}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      {/* Ring 2 */}
      <mesh rotation={[Math.PI / 2.5, 0.4, 0]}>
        <torusGeometry args={[2.1, 0.01, 16, 100]} />
        <meshStandardMaterial
          color="#3b82f6"
          emissive="#3b82f6"
          emissiveIntensity={0.3}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      {/* Ring 3 */}
      <mesh rotation={[Math.PI / 3, -0.3, 0.2]}>
        <torusGeometry args={[2.4, 0.008, 16, 100]} />
        <meshStandardMaterial
          color="#ec4899"
          emissive="#ec4899"
          emissiveIntensity={0.25}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
}

function OrbitingCubes() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.25;
  });

  const cubes = useMemo(
    () =>
      Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 2.6;
        return {
          position: [
            Math.cos(angle) * radius,
            Math.sin(i * 1.7) * 0.4,
            Math.sin(angle) * radius,
          ] as [number, number, number],
          color: ["#8b5cf6", "#3b82f6", "#10b981", "#ec4899", "#f59e0b", "#06b6d4", "#8b5cf6", "#3b82f6"][i],
          size: 0.08 + (i % 3) * 0.03,
        };
      }),
    []
  );

  return (
    <group ref={groupRef}>
      {cubes.map((cube, i) => (
        <mesh key={i} position={cube.position}>
          <boxGeometry args={[cube.size, cube.size, cube.size]} />
          <meshStandardMaterial
            color={cube.color}
            emissive={cube.color}
            emissiveIntensity={0.3}
            metalness={0.7}
            roughness={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

function FloatingInterfaceCard({
  position,
  rotation,
  color,
  title,
  lines,
  size,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  color: string;
  title: string;
  lines: number;
  size: [number, number, number];
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.position.y = position[1] + Math.sin(t * 0.5 + position[0] * 2) * 0.1;
    groupRef.current.rotation.z = rotation[2] + Math.sin(t * 0.3 + position[1]) * 0.02;
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      <RoundedBox args={size} radius={0.07} smoothness={4}>
        <meshStandardMaterial
          color="#0a0a0f"
          metalness={0.5}
          roughness={0.25}
          transparent
          opacity={0.94}
        />
      </RoundedBox>

      {/* Accent bar */}
      <mesh position={[-size[0] / 2 + 0.28, size[1] / 2 - 0.13, size[2] / 2 + 0.01]}>
        <boxGeometry args={[0.45, 0.07, 0.01]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.55} />
      </mesh>

      {/* Lines */}
      {Array.from({ length: lines }).map((_, i) => (
        <mesh
          key={i}
          position={[-size[0] / 2 + 0.28, size[1] / 2 - 0.32 - i * 0.17, size[2] / 2 + 0.01]}
        >
          <boxGeometry args={[size[0] - 0.56 - i * 0.2, 0.04, 0.01]} />
          <meshStandardMaterial color="#3f3f46" />
        </mesh>
      ))}

      {/* Title */}
      <Text
        position={[0, -size[1] / 2 - 0.14, size[2] / 2 + 0.01]}
        fontSize={0.1}
        color="#e4e4e7"
        anchorX="center"
        anchorY="middle"
      >
        {title}
      </Text>
    </group>
  );
}

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 350;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return arr;
  }, []);

  const colors = useMemo(() => {
    const arr = new Float32Array(count * 3);
    const palette = [
      new THREE.Color("#8b5cf6"),
      new THREE.Color("#3b82f6"),
      new THREE.Color("#ec4899"),
      new THREE.Color("#10b981"),
    ];
    for (let i = 0; i < count; i++) {
      const c = palette[Math.floor(Math.random() * palette.length)];
      arr[i * 3] = c.r;
      arr[i * 3 + 1] = c.g;
      arr[i * 3 + 2] = c.b;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = t * 0.02;
    pointsRef.current.rotation.x = Math.sin(t * 0.05) * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        vertexColors
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function WireframeSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.06;
    meshRef.current.rotation.y = -t * 0.1;
    const scale = 1 + Math.sin(t * 0.35) * 0.06;
    meshRef.current.scale.setScalar(scale);
  });

  return (
    <mesh ref={meshRef} position={[-3, 1.4, -1]}>
      <icosahedronGeometry args={[0.95, 1]} />
      <meshBasicMaterial wireframe color="#8b5cf6" transparent opacity={0.28} />
    </mesh>
  );
}

function GlassOrb() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.y = t * 0.15;
    meshRef.current.position.y = Math.sin(t * 0.5 + 2) * 0.15;
  });

  return (
    <mesh ref={meshRef} position={[3.1, 0.6, -0.8]}>
      <icosahedronGeometry args={[0.7, 3]} />
      <meshPhysicalMaterial
        color="#38bdf8"
        metalness={0.1}
        roughness={0.05}
        transmission={0.7}
        thickness={0.5}
        clearcoat={1}
        clearcoatRoughness={0.05}
        envMapIntensity={1.5}
      />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.4} />
      <pointLight position={[-5, -3, -5]} intensity={0.8} color="#8b5cf6" />
      <pointLight position={[3, -2, 4]} intensity={0.6} color="#3b82f6" />
      <pointLight position={[0, 3, 2]} intensity={0.4} color="#ec4899" />

      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.5}>
        <CentralCore />
      </Float>

      <InnerRing />
      <OrbitingCubes />
      <WireframeSphere />
      <GlassOrb />

      <FloatingInterfaceCard
        position={[-2.6, 1.3, 0.4]}
        rotation={[0.1, 0.35, -0.12]}
        color="#8b5cf6"
        title="3D Interface"
        lines={3}
        size={[1.6, 1.1, 0.06]}
      />
      <FloatingInterfaceCard
        position={[2.5, -1.2, 0.3]}
        rotation={[-0.08, -0.3, 0.1]}
        color="#3b82f6"
        title="WebGL"
        lines={2}
        size={[1.4, 1.0, 0.06]}
      />
      <FloatingInterfaceCard
        position={[-2.2, -1.4, -0.3]}
        rotation={[0.12, 0.25, 0.08]}
        color="#10b981"
        title="Interaction"
        lines={3}
        size={[1.5, 1.05, 0.06]}
      />
      <FloatingInterfaceCard
        position={[2.7, 1.4, -0.5]}
        rotation={[-0.1, -0.32, -0.06]}
        color="#ec4899"
        title="3D Motion"
        lines={2}
        size={[1.3, 0.95, 0.06]}
      />

      <ParticleField />

      <Sparkles3D
        count={90}
        scale={[12, 8, 8]}
        size={2.5}
        speed={0.35}
        color="#a78bfa"
        opacity={0.45}
      />

      <ContactShadows
        position={[0, -2.6, 0]}
        opacity={0.35}
        scale={10}
        blur={2.8}
        far={4.5}
      />

      <Environment preset="city" />
    </>
  );
}

export function ThreeDProjectPreview({ title }: { title: string }) {
  const [isClient, setIsClient] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isLowPower, setIsLowPower] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [zoom, setZoom] = useState(6.5);

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
              <div className="w-12 h-12 rounded-full border-2 border-accent border-t-transparent animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground text-sm">Loading 3D experience...</p>
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
          camera={{ position: [0, 0, zoom], fov: 45 }}
          dpr={isLowPower ? [1, 1] : [1, 1.5]}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          style={{ background: "transparent" }}
        >
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
          {!reducedMotion && (
            <OrbitControls
              enableZoom
              enablePan={false}
              autoRotate={autoRotate}
              autoRotateSpeed={0.6}
              maxPolarAngle={Math.PI / 2.1}
              minPolarAngle={Math.PI / 3.5}
              minDistance={4}
              maxDistance={9}
            />
          )}
        </Canvas>

        {/* Top-left badge */}
        <div className="absolute top-5 left-5 pointer-events-none">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 backdrop-blur-md border border-border text-sm font-medium">
            <Rotate3D className="w-4 h-4 text-accent" />
            Interactive 3D Preview
          </div>
        </div>

        {/* Top-right controls */}
        <div className="absolute top-5 right-5 flex items-center gap-2">
          <button
            onClick={() => setAutoRotate((v) => !v)}
            className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-md border border-border flex items-center justify-center hover:bg-secondary transition-colors"
            aria-label={autoRotate ? "Disable auto-rotate" : "Enable auto-rotate"}
            title={autoRotate ? "Disable auto-rotate" : "Enable auto-rotate"}
          >
            <RefreshCw className={`w-4 h-4 ${autoRotate ? "text-accent" : "text-muted-foreground"}`} />
          </button>
          <button
            onClick={() => setZoom((z) => Math.max(4, z - 0.5))}
            className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-md border border-border flex items-center justify-center hover:bg-secondary transition-colors"
            aria-label="Zoom out"
            title="Zoom out"
          >
            <ZoomOut className="w-4 h-4 text-muted-foreground" />
          </button>
          <button
            onClick={() => setZoom((z) => Math.min(9, z + 0.5))}
            className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-md border border-border flex items-center justify-center hover:bg-secondary transition-colors"
            aria-label="Zoom in"
            title="Zoom in"
          >
            <ZoomIn className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* Bottom hint */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 pointer-events-none">
          <p className="text-xs text-muted-foreground bg-background/60 backdrop-blur-sm px-4 py-2 rounded-full border border-border flex items-center gap-2">
            <MousePointer2 className="w-3.5 h-3.5" />
            Drag to rotate · Scroll to zoom
          </p>
        </div>

        {/* Bottom-left project title */}
        <div className="absolute bottom-5 left-5 pointer-events-none">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/60 backdrop-blur-sm border border-border">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span className="text-xs font-medium text-muted-foreground">{title}</span>
          </div>
        </div>
      </div>
    </div>
  );
}