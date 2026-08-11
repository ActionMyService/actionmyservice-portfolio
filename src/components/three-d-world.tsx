"use client";

import { useRef, useState, useEffect, Suspense, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ===== Section-Aware Spatial World =====
// A clean, cinematic 3D backdrop.
//
// Design principles:
// - Content is ALWAYS the visual priority
// - Only ONE subtle accent per major section, placed at the EDGES of the viewport
// - No random floating objects behind text
// - Gentle scroll-driven camera drift
// - Minimal geometry, low particle count, efficient materials
//
// Sections:
//   Hero (0.00)        → clean space
//   Portfolio (0.20)   → clean space (project visuals carry the section)
//   Services (0.40)    → clean space (service cards carry the section)
//   3D UI/UX (0.55)    → wireframe torus knot at right edge
//   AI Video (0.67)    → thin wireframe screen outline at right edge
//   Branding (0.80)    → small cube at left edge
//   Footer / CTA (0.92)→ clean space

const worldState = {
  progress: 0,
  velocity: 0,
  mouseX: 0,
  mouseY: 0,
  reduced: false,
  lowPower: false,
};

function smoothstep(t: number, a: number, b: number) {
  const x = Math.min(1, Math.max(0, (t - a) / (b - a)));
  return x * x * (3 - 2 * x);
}

// ===== Subtle Grid Floor =====
// A faint horizontal grid that gives the world spatial depth.
// Placed far below content, fades slightly with scroll.
function GridFloor() {
  const ref = useRef<THREE.LineSegments>(null);

  useFrame(() => {
    if (!ref.current) return;
    const p = worldState.progress;
    const mat = ref.current.material as THREE.LineBasicMaterial;
    if (!mat.transparent) {
      mat.transparent = true;
      mat.depthWrite = false;
    }
    mat.opacity = Math.max(0.05, 0.14 * (1 - p * 0.5));
  });

  return (
    <group position={[0, -3.4, -2]}>
      <gridHelper ref={ref} args={[80, 40, "#6366f1", "#3b82f6"]} />
    </group>
  );
}

// ===== Minimal Edge Dust =====
// 24 tiny particles along the far left/right edges only.
// Never behind content. Extremely low opacity.
function Dust() {
  const points = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const n = 24;
    const arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const side = Math.random() > 0.5 ? 1 : -1;
      arr[i * 3] = side * (3.5 + Math.random() * 5);
      arr[i * 3 + 1] = (Math.random() - 0.5) * 6;
      arr[i * 3 + 2] = -2 - Math.random() * 6;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!points.current) return;
    points.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.02) * 0.02;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#a78bfa"
        transparent
        opacity={0.18}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

// ===== 3D UI/UX Section Accent =====
// A wireframe torus knot, visible only during the 3D UI/UX section.
// Positioned at the far right edge, partially out of frame.
function UiuxAccent() {
  const group = useRef<THREE.Group>(null);
  const mat = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state) => {
    if (!group.current || !mat.current) return;
    const p = worldState.progress;
    const appear = smoothstep(p, 0.5, 0.56) * (1 - smoothstep(p, 0.62, 0.68));
    group.current.visible = appear > 0.02;
    mat.current.opacity = appear * 0.4;
    group.current.scale.setScalar(0.001 + appear * 0.95);
    group.current.rotation.y = state.clock.getElapsedTime() * 0.08;
  });

  return (
    <group ref={group} position={[3.8, 0.2, -5]} scale={0.001}>
      <mesh>
        <torusKnotGeometry args={[0.6, 0.15, 40, 10]} />
        <meshStandardMaterial
          ref={mat}
          color="#818cf8"
          wireframe
          transparent
          opacity={0}
          depthWrite={false}
          emissive="#818cf8"
          emissiveIntensity={0.25}
        />
      </mesh>
    </group>
  );
}

// ===== AI Video Section Accent =====
// A thin wireframe screen outline, visible only during the AI Video section.
// Positioned at the far right edge.
function VideoAccent() {
  const group = useRef<THREE.Group>(null);
  const mat = useRef<THREE.MeshBasicMaterial>(null);

  useFrame((state) => {
    if (!group.current || !mat.current) return;
    const p = worldState.progress;
    const appear = smoothstep(p, 0.66, 0.72) * (1 - smoothstep(p, 0.78, 0.84));
    group.current.visible = appear > 0.02;
    mat.current.opacity = appear * 0.3;
    group.current.scale.setScalar(0.001 + appear * 0.9);
    group.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.15) * 0.1;
  });

  return (
    <group ref={group} position={[4.2, 0.3, -5]} scale={0.001}>
      <mesh>
        <boxGeometry args={[1.1, 0.65, 0.02]} />
        <meshBasicMaterial
          ref={mat}
          color="#0ea5e9"
          wireframe
          transparent
          opacity={0}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

// ===== Branding Section Accent =====
// A small smooth cube, visible only during the Branding section.
// Positioned at the far left edge.
function BrandAccent() {
  const group = useRef<THREE.Group>(null);
  const mat = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state) => {
    if (!group.current || !mat.current) return;
    const p = worldState.progress;
    const appear = smoothstep(p, 0.8, 0.86) * (1 - smoothstep(p, 0.92, 0.98));
    group.current.visible = appear > 0.02;
    mat.current.opacity = appear * 0.3;
    group.current.scale.setScalar(0.001 + appear * 0.9);
    group.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.25) * 0.25;
  });

  return (
    <group ref={group} position={[-3.8, 0.2, -5]} scale={0.001}>
      <mesh rotation={[0.4, 0.5, 0]}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial
          ref={mat}
          color="#e4e4e7"
          metalness={0.2}
          roughness={0.4}
          transparent
          opacity={0}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

// ===== Gentle Camera =====
// Slow, restrained camera drift with mouse parallax.
// Never aggressive — supports content rather than competing.
function CameraRig() {
  const { camera } = useThree();
  const target = useMemo(() => new THREE.Vector3(), []);

  useFrame((_, delta) => {
    if (worldState.reduced) {
      target.set(0, 0, 8);
      camera.position.lerp(target, Math.min(1, delta * 2));
      camera.lookAt(0, 0, 0);
      return;
    }
    const p = worldState.progress;
    target.set(
      Math.sin(p * Math.PI * 1.5) * 0.5 + worldState.mouseX * 0.2,
      (p - 0.5) * 0.6 + worldState.mouseY * 0.12,
      8 - p * 1.2
    );
    camera.position.lerp(target, Math.min(1, delta * 1.6));
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// ===== Scene =====
function Scene() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 8, 5]} intensity={0.6} />
      <directionalLight position={[-5, -3, -5]} intensity={0.25} color="#8b5cf6" />

      <GridFloor />
      <Dust />
      <UiuxAccent />
      <VideoAccent />
      <BrandAccent />
      <CameraRig />
    </>
  );
}

// ===== Main Component =====

export function ThreeDWorld() {
  const [ready, setReady] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [lowPower, setLowPower] = useState(false);
  const [webglOk, setWebglOk] = useState(true);
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    setReady(true);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    worldState.reduced = mq.matches;

    const nav = navigator as Navigator & { deviceMemory?: number };
    if (nav.deviceMemory && nav.deviceMemory <= 4) {
      setLowPower(true);
      worldState.lowPower = true;
    }

    try {
      const canvas = document.createElement("canvas");
      if (!canvas.getContext("webgl2") && !canvas.getContext("webgl")) {
        setWebglOk(false);
        setUseFallback(true);
      }
    } catch {
      setWebglOk(false);
      setUseFallback(true);
    }
  }, []);

  // Scroll listener — measures progress across the current page
  useEffect(() => {
    if (!ready || !webglOk) return;
    let raf = 0;
    let last = 0;
    const update = () => {
      const doc = document.documentElement;
      const total = doc.scrollHeight - window.innerHeight;
      const progress = total > 0 ? Math.min(1, Math.max(0, window.scrollY / total)) : 0;
      worldState.velocity = Math.abs(progress - last);
      last = progress;
      worldState.progress = progress;
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onMove = (e: PointerEvent) => {
      worldState.mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      worldState.mouseY = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ready, webglOk]);

  if (!ready) return null;

  // CSS-based fallback when WebGL is unavailable
  if (useFallback) {
    return (
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40" aria-hidden="true">
        <div className="absolute inset-0 fallback-world">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-accent/30 blur-[100px] animate-pulse" />
          <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-emerald-500/20 blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full bg-blue-500/20 blur-[120px] animate-pulse" style={{ animationDelay: "2s" }} />
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={lowPower ? [1, 1] : [1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}