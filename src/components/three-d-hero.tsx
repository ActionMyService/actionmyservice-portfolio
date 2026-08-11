"use client";

import { useRef, useState, useEffect, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  Environment,
  ContactShadows,
  OrbitControls,
  MeshDistortMaterial,
  Sparkles,
} from "@react-three/drei";
import * as THREE from "three";
import { Rotate3D, MousePointer2 } from "lucide-react";

// ===== Premium 3D Hero Scene v3 =====
// ONE carefully designed 3D visual element.
// A metallic morphing core with holographic rings.
// Clean, cinematic, premium. No random floating objects.

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

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 120;

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
        size={0.024}
        vertexColors
        transparent
        opacity={0.45}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
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

      <ParticleField />

      <Sparkles
        count={40}
        scale={[8, 5, 5]}
        size={2}
        speed={0.3}
        color="#a78bfa"
        opacity={0.35}
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