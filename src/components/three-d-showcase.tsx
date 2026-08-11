"use client";

import { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, ContactShadows, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { Box, Rotate3D } from "lucide-react";

function IcosahedronMesh() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.15;
    meshRef.current.rotation.y = t * 0.2;
    meshRef.current.position.y = Math.sin(t * 0.5) * 0.15;
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.4, 1]} />
      <meshStandardMaterial
        color="#8b5cf6"
        metalness={0.7}
        roughness={0.2}
        wireframe={false}
        flatShading
      />
    </mesh>
  );
}

function WireframeSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.1;
    meshRef.current.rotation.y = -t * 0.15;
    meshRef.current.scale.setScalar(1 + Math.sin(t * 0.3) * 0.05);
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2.2, 24, 24]} />
      <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.15} />
    </mesh>
  );
}

function FloatingCubes() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.08;
    groupRef.current.children.forEach((child, i) => {
      child.position.y = Math.sin(t * 0.8 + i * 1.5) * 0.2;
    });
  });

  const cubes = [
    { position: [-2.4, 0.6, -0.5], size: 0.25, color: "#f59e0b" },
    { position: [2.4, -0.4, -0.3], size: 0.2, color: "#10b981" },
    { position: [-1.8, -1.2, 0.4], size: 0.18, color: "#3b82f6" },
    { position: [2.1, 1.1, 0.2], size: 0.22, color: "#ec4899" },
  ];

  return (
    <group ref={groupRef}>
      {cubes.map((cube, i) => (
        <mesh key={i} position={cube.position as [number, number, number]}>
          <boxGeometry args={[cube.size, cube.size, cube.size]} />
          <meshStandardMaterial
            color={cube.color}
            metalness={0.5}
            roughness={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <pointLight position={[-5, -3, -5]} intensity={0.6} color="#8b5cf6" />
      <pointLight position={[3, -2, 4]} intensity={0.4} color="#3b82f6" />

      <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
        <IcosahedronMesh />
      </Float>
      <WireframeSphere />
      <FloatingCubes />

      <ContactShadows
        position={[0, -2.4, 0]}
        opacity={0.4}
        scale={8}
        blur={2.5}
        far={4}
      />

      <Environment preset="city" />
    </>
  );
}

export function ThreeDShowcase() {
  const [isClient, setIsClient] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
  }, []);

  if (!isClient) {
    return (
      <div className="relative rounded-3xl border border-border bg-card overflow-hidden">
        <div className="relative aspect-[16/10] md:aspect-[16/8]">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Box className="w-12 h-12 text-accent mx-auto mb-4" />
              <p className="text-muted-foreground text-sm">Loading 3D experience...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative rounded-3xl border border-border bg-card overflow-hidden">
      <div className="relative aspect-[16/10] md:aspect-[16/8]">
        <Canvas
          camera={{ position: [0, 0, 6], fov: 50 }}
          dpr={[1, 1.5]}
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
              autoRotateSpeed={0.8}
              maxPolarAngle={Math.PI / 2.2}
              minPolarAngle={Math.PI / 3.5}
            />
          )}
        </Canvas>

        {/* Overlay label */}
        <div className="absolute top-6 left-6 pointer-events-none">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 backdrop-blur-md border border-border text-sm font-medium">
            <Rotate3D className="w-4 h-4 text-accent" />
            Interactive 3D Experience
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none">
          <p className="text-xs text-muted-foreground bg-background/60 backdrop-blur-sm px-4 py-2 rounded-full border border-border">
            Drag to rotate · Scroll to zoom
          </p>
        </div>
      </div>
    </div>
  );
}