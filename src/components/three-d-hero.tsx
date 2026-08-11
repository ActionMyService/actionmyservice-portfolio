"use client";

import { useRef, useState, useEffect, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, ContactShadows, OrbitControls, RoundedBox, Text } from "@react-three/drei";
import * as THREE from "three";
import { Rotate3D, MousePointer2 } from "lucide-react";

// ===== Premium 3D Hero Scene =====
// A cinematic composition with a central torus knot,
// floating UI panels, orbiting particles and soft lighting.

function TorusKnot() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.12;
    meshRef.current.rotation.y = t * 0.18;
    meshRef.current.position.y = Math.sin(t * 0.4) * 0.12;
  });

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[1.1, 0.32, 128, 24]} />
      <meshStandardMaterial
        color="#8b5cf6"
        metalness={0.85}
        roughness={0.15}
        envMapIntensity={1.2}
      />
    </mesh>
  );
}

function DistortedSphere() {
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
    <mesh ref={meshRef} position={[2.6, 0.8, -1]}>
      <sphereGeometry args={[0.7, 32, 32]} />
      <meshPhysicalMaterial
        color="#3b82f6"
        metalness={0.3}
        roughness={0.1}
        transmission={0.4}
        thickness={0.5}
        clearcoat={1}
        clearcoatRoughness={0.1}
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
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  color: string;
  label: string;
  lines: number;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.position.y = position[1] + Math.sin(t * 0.6 + position[0]) * 0.12;
    groupRef.current.rotation.z = rotation[2] + Math.sin(t * 0.3 + position[1]) * 0.02;
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      <RoundedBox args={[1.6, 1.1, 0.06]} radius={0.08} smoothness={4}>
        <meshStandardMaterial
          color="#0a0a0f"
          metalness={0.4}
          roughness={0.3}
          transparent
          opacity={0.92}
        />
      </RoundedBox>
      {/* Panel accent bar */}
      <mesh position={[-0.6, 0.35, 0.04]}>
        <boxGeometry args={[0.5, 0.08, 0.01]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} />
      </mesh>
      {/* Panel lines */}
      {Array.from({ length: lines }).map((_, i) => (
        <mesh key={i} position={[-0.55, 0.15 - i * 0.18, 0.04]}>
          <boxGeometry args={[1.0 - i * 0.15, 0.04, 0.01]} />
          <meshStandardMaterial color="#3f3f46" />
        </mesh>
      ))}
      {/* Label */}
      <Text
        position={[0, -0.45, 0.05]}
        fontSize={0.12}
        color="#a1a1aa"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  );
}

function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 400;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8;
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
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#8b5cf6"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
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
        <TorusKnot />
      </Float>

      <DistortedSphere />

      <FloatingUIPanel
        position={[-2.4, 1.2, 0.5]}
        rotation={[0.1, 0.3, -0.15]}
        color="#8b5cf6"
        label="Website"
        lines={3}
      />
      <FloatingUIPanel
        position={[2.2, -1.1, 0.3]}
        rotation={[-0.08, -0.25, 0.12]}
        color="#10b981"
        label="AI Video"
        lines={2}
      />
      <FloatingUIPanel
        position={[-1.8, -1.4, -0.4]}
        rotation={[0.15, 0.2, 0.1]}
        color="#f59e0b"
        label="Branding"
        lines={3}
      />
      <FloatingUIPanel
        position={[2.6, 1.4, -0.6]}
        rotation={[-0.1, -0.3, -0.08]}
        color="#ec4899"
        label="3D UI/UX"
        lines={2}
      />

      <Particles />

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
      <div className="relative rounded-3xl border border-border bg-card overflow-hidden">
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
    <div className="relative rounded-3xl border border-border bg-card overflow-hidden shadow-2xl">
      <div className="relative aspect-[4/5] md:aspect-[16/10]">
        <Canvas
          camera={{ position: [0, 0, 6.5], fov: 45 }}
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
              autoRotateSpeed={0.6}
              maxPolarAngle={Math.PI / 2.1}
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