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
  Sparkles,
} from "@react-three/drei";
import * as THREE from "three";
import { Rotate3D, MousePointer2 } from "lucide-react";

// ===== Premium 3D Hero Scene v2 =====
// A cinematic composition with a central morphing core,
// holographic rings, floating UI panels, particle constellations,
// orbiting elements and premium volumetric lighting.

function MorphCore() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.12;
    meshRef.current.rotation.y = t * 0.18;
    meshRef.current.rotation.z = t * 0.05;
    meshRef.current.position.y = Math.sin(t * 0.4) * 0.12;
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.2, 4]} />
      <MeshDistortMaterial
        color="#7c6cf6"
        metalness={0.9}
        roughness={0.08}
        envMapIntensity={1.6}
        distort={0.3}
        speed={1.8}
        emissive="#4c1d95"
        emissiveIntensity={0.15}
      />
    </mesh>
  );
}

function HolographicRings() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.x = Math.sin(t * 0.2) * 0.35;
    groupRef.current.rotation.y = t * 0.3;
    groupRef.current.rotation.z = Math.cos(t * 0.15) * 0.15;
  });

  return (
    <group ref={groupRef}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.9, 0.02, 16, 128]} />
        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#8b5cf6"
          emissiveIntensity={0.6}
          metalness={0.9}
          roughness={0.15}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2.3, 0.4, 0.2]}>
        <torusGeometry args={[2.3, 0.014, 16, 128]} />
        <meshStandardMaterial
          color="#3b82f6"
          emissive="#3b82f6"
          emissiveIntensity={0.45}
          metalness={0.9}
          roughness={0.15}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2.7, -0.3, -0.1]}>
        <torusGeometry args={[2.7, 0.01, 16, 128]} />
        <meshStandardMaterial
          color="#ec4899"
          emissive="#ec4899"
          emissiveIntensity={0.35}
          metalness={0.9}
          roughness={0.15}
        />
      </mesh>
      <mesh rotation={[Math.PI / 1.8, 0.6, 0.4]}>
        <torusGeometry args={[1.6, 0.01, 16, 128]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#06b6d4"
          emissiveIntensity={0.4}
          metalness={0.9}
          roughness={0.15}
        />
      </mesh>
    </group>
  );
}

function OrbitingSats() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.4;
    groupRef.current.rotation.x = Math.sin(t * 0.1) * 0.1;
  });

  const satellites = useMemo(
    () =>
      Array.from({ length: 6 }).map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        const radius = 2.8;
        return {
          position: [
            Math.cos(angle) * radius,
            Math.sin(i * 1.3) * 0.5,
            Math.sin(angle) * radius,
          ] as [number, number, number],
          color: ["#8b5cf6", "#3b82f6", "#10b981", "#ec4899", "#f59e0b", "#06b6d4"][i],
          size: 0.09 + (i % 3) * 0.02,
        };
      }),
    []
  );

  return (
    <group ref={groupRef}>
      {satellites.map((sat, i) => (
        <mesh key={i} position={sat.position}>
          <boxGeometry args={[sat.size, sat.size, sat.size]} />
          <meshStandardMaterial
            color={sat.color}
            emissive={sat.color}
            emissiveIntensity={0.5}
            metalness={0.85}
            roughness={0.15}
          />
        </mesh>
      ))}
    </group>
  );
}

function GlassSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.y = t * 0.1;
    meshRef.current.rotation.z = t * 0.05;
    const scale = 1 + Math.sin(t * 0.5) * 0.06;
    meshRef.current.scale.setScalar(scale);
  });

  return (
    <mesh ref={meshRef} position={[2.8, 0.9, -1]}>
      <icosahedronGeometry args={[0.75, 3]} />
      <meshPhysicalMaterial
        color="#38bdf8"
        metalness={0.1}
        roughness={0.05}
        transmission={0.7}
        thickness={0.6}
        clearcoat={1}
        clearcoatRoughness={0.05}
        envMapIntensity={1.6}
      />
    </mesh>
  );
}

function AmbientOrb() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.y = t * 0.3;
    const scale = 1 + Math.sin(t * 0.7) * 0.08;
    meshRef.current.scale.setScalar(scale);
    meshRef.current.position.y = Math.sin(t * 0.5) * 0.1;
  });

  return (
    <mesh ref={meshRef} position={[-2.9, -0.6, 0.5]} scale={0.5}>
      <octahedronGeometry args={[0.5, 0]} />
      <meshStandardMaterial
        color="#f59e0b"
        metalness={0.8}
        roughness={0.15}
        emissive="#f59e0b"
        emissiveIntensity={0.3}
      />
    </mesh>
  );
}

function FloatingUIPanel({
  position,
  rotation,
  color,
  label,
  lines,
  title,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  color: string;
  label: string;
  title: string;
  lines: number;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.position.y = position[1] + Math.sin(t * 0.6 + position[0]) * 0.14;
    groupRef.current.rotation.z = rotation[2] + Math.sin(t * 0.3 + position[1]) * 0.02;
    groupRef.current.rotation.x = rotation[0] + Math.sin(t * 0.25 + position[2]) * 0.015;
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      <RoundedBox args={[1.7, 1.2, 0.07]} radius={0.08} smoothness={6}>
        <meshStandardMaterial
          color="#0a0a12"
          metalness={0.6}
          roughness={0.2}
          transparent
          opacity={0.94}
          envMapIntensity={0.8}
        />
      </RoundedBox>
      {/* Panel accent bar */}
      <mesh position={[-0.65, 0.38, 0.05]}>
        <boxGeometry args={[0.5, 0.08, 0.01]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} />
      </mesh>
      {/* Panel header dot */}
      <mesh position={[-0.78, 0.42, 0.05]}>
        <sphereGeometry args={[0.035, 16, 16]} />
        <meshStandardMaterial color="#71717a" emissive="#71717a" emissiveIntensity={0.4} />
      </mesh>
      <mesh position={[-0.7, 0.42, 0.05]}>
        <sphereGeometry args={[0.035, 16, 16]} />
        <meshStandardMaterial color="#71717a" emissive="#71717a" emissiveIntensity={0.4} />
      </mesh>
      <mesh position={[-0.62, 0.42, 0.05]}>
        <sphereGeometry args={[0.035, 16, 16]} />
        <meshStandardMaterial color="#71717a" emissive="#71717a" emissiveIntensity={0.4} />
      </mesh>
      {/* Panel lines */}
      {Array.from({ length: lines }).map((_, i) => (
        <mesh key={i} position={[-0.55, 0.15 - i * 0.18, 0.05]}>
          <boxGeometry args={[1.1 - i * 0.15, 0.04, 0.01]} />
          <meshStandardMaterial color="#3f3f46" />
        </mesh>
      ))}
      {/* Title */}
      <Text
        position={[0, -0.42, 0.06]}
        fontSize={0.11}
        color="#e4e4e7"
        anchorX="center"
        anchorY="middle"
        fontWeight={600}
      >
        {title}
      </Text>
      {/* Label */}
      <Text
        position={[0, -0.55, 0.06]}
        fontSize={0.07}
        color={color}
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  );
}

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 600;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 9;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 9;
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
    pointsRef.current.rotation.y = t * 0.015;
    pointsRef.current.rotation.x = Math.sin(t * 0.04) * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function WireframeIcosahedron() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.08;
    meshRef.current.rotation.y = -t * 0.12;
    const scale = 1 + Math.sin(t * 0.3) * 0.05;
    meshRef.current.scale.setScalar(scale);
  });

  return (
    <mesh ref={meshRef} position={[-2.7, 1.4, -0.8]}>
      <icosahedronGeometry args={[0.85, 1]} />
      <meshBasicMaterial wireframe color="#8b5cf6" transparent opacity={0.35} />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} />
      <directionalLight position={[-5, -3, -3]} intensity={0.5} color="#818cf8" />
      <pointLight position={[-5, -3, -5]} intensity={1.2} color="#8b5cf6" distance={20} decay={2} />
      <pointLight position={[3, -2, 4]} intensity={0.8} color="#3b82f6" distance={20} decay={2} />
      <pointLight position={[0, 3, 2]} intensity={0.6} color="#ec4899" distance={20} decay={2} />
      <pointLight position={[2, 1, 3]} intensity={0.6} color="#f59e0b" distance={15} decay={2} />

      <Float speed={1.4} rotationIntensity={0.35} floatIntensity={0.6}>
        <MorphCore />
      </Float>

      <HolographicRings />
      <OrbitingSats />

      <GlassSphere />
      <AmbientOrb />
      <WireframeIcosahedron />

      <FloatingUIPanel
        position={[-2.6, 1.4, 0.5]}
        rotation={[0.1, 0.35, -0.15]}
        color="#8b5cf6"
        label="Website Development"
        title="Nova Studio"
        lines={3}
      />
      <FloatingUIPanel
        position={[2.4, -1.2, 0.3]}
        rotation={[-0.08, -0.28, 0.12]}
        color="#10b981"
        label="AI Video Creation"
        title="Future Vision"
        lines={2}
      />
      <FloatingUIPanel
        position={[-2.0, -1.5, -0.4]}
        rotation={[0.15, 0.22, 0.1]}
        color="#f59e0b"
        label="Branding"
        title="Mono Brand"
        lines={3}
      />
      <FloatingUIPanel
        position={[2.8, 1.5, -0.6]}
        rotation={[-0.1, -0.32, -0.08]}
        color="#ec4899"
        label="3D UI/UX Design"
        title="Neo Interface"
        lines={2}
      />

      <ParticleField />

      <Sparkles
        count={80}
        scale={[10, 6, 6]}
        size={2.5}
        speed={0.4}
        color="#a78bfa"
        opacity={0.5}
      />

      <ContactShadows
        position={[0, -3, 0]}
        opacity={0.4}
        scale={12}
        blur={3}
        far={5}
      />

      <Environment preset="city" />
    </>
  );
}

export function ThreeDHero() {
  const [isClient, setIsClient] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isLowPower, setIsLowPower] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    // Detect low-power devices
    const nav = navigator as Navigator & { deviceMemory?: number };
    if (nav.deviceMemory && nav.deviceMemory <= 4) {
      setIsLowPower(true);
    }
  }, []);

  if (!isClient) {
    return (
      <div className="relative rounded-3xl border border-border bg-card overflow-hidden canvas-frame">
        <div className="relative aspect-[4/5] md:aspect-[16/10]">
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
    <div className="relative rounded-3xl border border-border bg-card overflow-hidden shadow-2xl canvas-frame ambient-glow">
      <div className="relative aspect-[4/5] md:aspect-[16/10]">
        <Canvas
          camera={{ position: [0, 0, 7], fov: 45 }}
          dpr={isLowPower ? [1, 1] : [1, 1.5]}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
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

        {/* Overlay labels */}
        <div className="absolute top-5 left-5 pointer-events-none">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 backdrop-blur-md border border-border text-sm font-medium">
            <Rotate3D className="w-4 h-4 text-accent" />
            Interactive 3D
          </div>
        </div>

        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 pointer-events-none">
          <p className="text-xs text-muted-foreground bg-background/60 backdrop-blur-sm px-4 py-2 rounded-full border border-border flex items-center gap-2">
            <MousePointer2 className="w-3.5 h-3.5" />
            Drag to explore
          </p>
        </div>
      </div>
    </div>
  );
}