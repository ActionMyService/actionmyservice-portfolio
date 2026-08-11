"use client";

import { useRef, useState, useEffect, Suspense, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Environment, Sparkles } from "@react-three/drei";
import * as THREE from "three";

// ===== Unified 3D World Background =====
// A fixed full-viewport WebGL canvas that sits behind the entire
// homepage. The camera + objects + lighting react to scroll position,
// creating one continuous digital universe across all sections.

const worldState = {
  progress: 0, // 0 → 1 across homepage
  velocity: 0,
  mouseX: 0,
  mouseY: 0,
  reduced: false,
  lowPower: false,
};

// Section landmarks (approximate scroll progress)
const SECTIONS = {
  intro: 0,
  scroll3d: 0.08,
  work: 0.2,
  show3d: 0.3,
  services: 0.4,
  uiux: 0.55,
  video: 0.67,
  about: 0.8,
  cta: 0.92,
};

function ease(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

function smoothstep(t: number, a: number, b: number) {
  const x = Math.min(1, Math.max(0, (t - a) / (b - a)));
  return x * x * (3 - 2 * x);
}

// ===== World Geometry =====

function FloatingCore() {
  const mesh = useRef<THREE.Mesh>(null);
  const mat = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state) => {
    if (!mesh.current) return;
    const p = worldState.progress;
    const t = state.clock.getElapsedTime();
    const speed = worldState.reduced ? 0.3 : 1;

    mesh.current.rotation.x = t * 0.08 * speed + Math.sin(t * 0.2) * 0.08;
    mesh.current.rotation.y = t * 0.12 * speed + p * Math.PI * 1.5;

    // Section-driven position shifts
    const x = THREE.MathUtils.lerp(0, -2.2, ease(Math.min(1, p * 2.5)));
    const y = Math.sin(t * 0.35) * 0.2 + Math.sin(p * Math.PI) * 0.8;
    mesh.current.position.x = x;
    mesh.current.position.y = y;

    const s = 1 + Math.sin(t * 0.5) * 0.05 + Math.sin(p * Math.PI * 3) * 0.12;
    mesh.current.scale.setScalar(s);

    if (mat.current) {
      const colors = [
        new THREE.Color("#8b5cf6"),
        new THREE.Color("#10b981"),
        new THREE.Color("#3b82f6"),
        new THREE.Color("#ec4899"),
      ];
      const idx = Math.min(colors.length - 1.001, p * colors.length);
      const i = Math.floor(idx);
      mat.current.color.copy(colors[i]).lerp(colors[i + 1] ?? colors[i], idx - i);
    }
  });

  return (
    <mesh ref={mesh} position={[0, 0, -3]}>
      <icosahedronGeometry args={[1.1, 3]} />
      <meshStandardMaterial
        ref={mat}
        color="#8b5cf6"
        metalness={0.8}
        roughness={0.15}
        envMapIntensity={1.2}
      />
    </mesh>
  );
}

function FloatingBrowsers() {
  const group = useRef<THREE.Group>(null);
  const browsers = useMemo(
    () =>
      Array.from({ length: 5 }).map((_, i) => ({
        position: [
          -3.2 + i * 1.6,
          (Math.sin(i * 2.4) * 2.2) - 1 + i * 0.3,
          -4 - (i % 3) * 1.5,
        ] as [number, number, number],
        rotation: [0.15, Math.sin(i) * 0.4, 0.08] as [number, number, number],
        scale: 0.5 + (i % 3) * 0.12,
      })),
    []
  );

  useFrame((state) => {
    if (!group.current) return;
    const p = worldState.progress;
    const t = state.clock.getElapsedTime();
    const speed = worldState.reduced ? 0.2 : 1;

    group.current.rotation.y = Math.sin(t * 0.05 * speed) * 0.06 + p * 0.4;
    group.current.position.x = p * 1.5;
    group.current.position.y = Math.sin(p * Math.PI) * 0.6;
  });

  return (
    <group ref={group}>
      {browsers.map((b, i) => (
        <group key={i} position={b.position} rotation={b.rotation} scale={b.scale}>
          <mesh>
            <boxGeometry args={[1.2, 0.85, 0.06]} />
            <meshStandardMaterial color="#0d0d14" metalness={0.4} roughness={0.3} transparent opacity={0.92} />
          </mesh>
          <mesh position={[0, 0.33, 0.031]}>
            <boxGeometry args={[1.2, 0.12, 0.01]} />
            <meshStandardMaterial color="#1a1a24" />
          </mesh>
          <mesh position={[0, 0.33, 0.036]}>
            <boxGeometry args={[0.08, 0.05, 0.01]} />
            <meshStandardMaterial color={["#8b5cf6", "#10b981", "#3b82f6", "#ec4899", "#f59e0b"][i]} emissive={["#8b5cf6", "#10b981", "#3b82f6", "#ec4899", "#f59e0b"][i]} emissiveIntensity={0.6} />
          </mesh>
          {[0, 1, 2, 3].map((l) => (
            <mesh key={l} position={[-0.4 + l * 0.27, 0.05 - l * 0.17, 0.031]}>
              <boxGeometry args={[0.2, 0.045, 0.01]} />
              <meshStandardMaterial color="#2a2a36" />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

function VideoScreens() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const p = worldState.progress;
    const t = state.clock.getElapsedTime();
    const speed = worldState.reduced ? 0.15 : 1;

    // Appear during AI video section
    const appear = smoothstep(p, 0.58, 0.68);
    group.current.scale.setScalar(Math.max(0.0001, appear));
    group.current.rotation.y = Math.sin(t * 0.08 * speed) * 0.1 + p * 0.25;
    group.current.position.y = -appear * 0.8;
  });

  return (
    <group ref={group} position={[2.5, 1.5, -2]} scale={0.0001}>
      {[0, 1, 2].map((i) => (
        <group key={i} position={[i * 1.4 - 1.4, (i % 2) * 0.3, -i * 0.5]} rotation={[0, i * 0.15, 0]}>
          <mesh>
            <boxGeometry args={[1.15, 0.72, 0.06]} />
            <meshStandardMaterial color="#050508" metalness={0.3} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0, 0.033]}>
            <planeGeometry args={[1.0, 0.58]} />
            <meshBasicMaterial color={["#7c3aed", "#0ea5e9", "#ec4899"][i]} transparent opacity={0.35} />
          </mesh>
          {/* Play button */}
          <mesh position={[0, 0, 0.036]}>
            <circleGeometry args={[0.09, 24]} />
            <meshBasicMaterial color="white" />
          </mesh>
          <mesh position={[0, 0, 0.04]} rotation={[0, 0, Math.PI / 2]}>
            <coneGeometry args={[0.035, 0.06, 4]} />
            <meshBasicMaterial color="#050508" />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function BrandObjects() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const p = worldState.progress;
    const t = state.clock.getElapsedTime();
    const speed = worldState.reduced ? 0.15 : 1;

    const appear = smoothstep(p, 0.74, 0.82);
    group.current.scale.setScalar(Math.max(0.0001, appear));
    group.current.rotation.y = t * 0.12 * speed + p * 0.6;
  });

  return (
    <group ref={group} position={[-2.8, -1, -2.5]} scale={0.0001}>
      {/* 3D logo cube */}
      <mesh rotation={[0.4, 0.5, 0]}>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial color="#e4e4e7" metalness={0.7} roughness={0.2} envMapIntensity={1.2} />
      </mesh>
      {/* Floating shapes */}
      {[0, 1, 2, 3].map((i) => (
        <mesh key={i} position={[Math.cos(i * 1.57) * 1.2, Math.sin(i * 1.57) * 1.2 - 0.3, 0.3]}>
          <icosahedronGeometry args={[0.12 + (i % 2) * 0.05, 0]} />
          <meshStandardMaterial color={["#8b5cf6", "#ec4899", "#f59e0b", "#10b981"][i]} emissive={["#8b5cf6", "#ec4899", "#f59e0b", "#10b981"][i]} emissiveIntensity={0.4} />
        </mesh>
      ))}
    </group>
  );
}

function Particles({ count }: { count: number }) {
  const points = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 18;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, [count]);

  const colors = useMemo(() => {
    const arr = new Float32Array(count * 3);
    const palette = [
      new THREE.Color("#8b5cf6"), new THREE.Color("#3b82f6"),
      new THREE.Color("#ec4899"), new THREE.Color("#10b981"),
      new THREE.Color("#f59e0b"),
    ];
    for (let i = 0; i < count; i++) {
      const c = palette[Math.floor(Math.random() * palette.length)];
      arr[i * 3] = c.r; arr[i * 3 + 1] = c.g; arr[i * 3 + 2] = c.b;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!points.current) return;
    const p = worldState.progress;
    const t = state.clock.getElapsedTime();
    const speed = worldState.reduced ? 0.2 : 1;
    points.current.rotation.y = t * 0.015 * speed + p * 0.8;
    points.current.position.y = Math.sin(p * Math.PI) * 0.5;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.02} vertexColors transparent opacity={0.55} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

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
      Math.sin(p * Math.PI * 2) * 1.5 + worldState.mouseX * 0.3,
      (p - 0.5) * 1.4 + worldState.mouseY * 0.2,
      8 - p * 3.2
    );
    camera.position.lerp(target, Math.min(1, delta * 2.2));
    camera.lookAt(worldState.mouseX * 0.1, worldState.mouseY * 0.08, 0);
  });

  return null;
}

function LightRig() {
  const light = useRef<THREE.PointLight>(null);

  useFrame(() => {
    if (!light.current) return;
    const p = worldState.progress;
    const colors = [
      new THREE.Color("#8b5cf6"), new THREE.Color("#10b981"),
      new THREE.Color("#3b82f6"), new THREE.Color("#ec4899"),
    ];
    const raw = Math.min(colors.length - 1.001, p * colors.length);
    const i = Math.floor(raw);
    light.current.color.copy(colors[i]).lerp(colors[i + 1] ?? colors[i], raw - i);
    light.current.position.x = Math.sin(p * Math.PI * 2) * 4;
    light.current.position.y = Math.cos(p * Math.PI) * 3;
  });

  return <pointLight ref={light} position={[3, 2, 3]} intensity={50} distance={30} decay={2} color="#8b5cf6" />;
}

function Scene({ particles }: { particles: number }) {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <directionalLight position={[-4, -2, -3]} intensity={0.4} color="#818cf8" />
      <LightRig />

      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
        <FloatingCore />
      </Float>
      <FloatingBrowsers />
      <VideoScreens />
      <BrandObjects />
      <Particles count={particles} />

      <Sparkles count={worldState.lowPower ? 30 : 80} scale={[18, 12, 10]} size={3} speed={0.3} color="#a78bfa" opacity={0.35} />

      <Environment preset="city" />
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

  // Scroll listener — measures progress over homepage height
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
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
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
          <Scene particles={lowPower ? 150 : 400} />
          <CameraRig />
        </Suspense>
      </Canvas>
    </div>
  );
}
