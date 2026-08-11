"use client";

import { useRef, useState, useEffect, Suspense, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Float,
  Environment,
  RoundedBox,
  Text,
  Sparkles,
} from "@react-three/drei";
import * as THREE from "three";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";

// ===== Scroll-Driven 3D Experience =====
// A full-viewport sticky 3D canvas that transforms as the user
// scrolls through four cinematic chapters:
//   01 — We Build    → Websites & Digital Experiences
//   02 — We Create   → AI Video & Creative Projects
//   03 — We Design   → Immersive 3D UI/UX
//   04 — We Define   → Branding & Identity
// Scroll progress (0→1) drives the camera path, object transforms,
// accent colors and chapter text fades. Smooth, cinematic,
// performance-conscious and reduced-motion friendly.

const scrollState = {
  progress: 0,
  velocity: 0,
  reducedMotion: false,
};

const mouseState = { x: 0, y: 0 };

const CHAPTERS = [
  {
    eyebrow: "01 — We Build",
    title: "Websites & Digital Experiences",
    description:
      "Premium websites, landing pages and web apps that put brands front-and-center.",
    color: "#8b5cf6",
  },
  {
    eyebrow: "02 — We Create",
    title: "AI Video & Creative Projects",
    description:
      "Cinematic AI films, product videos and AI-powered visual experiments.",
    color: "#10b981",
  },
  {
    eyebrow: "03 — We Design",
    title: "Immersive 3D UI/UX",
    description:
      "Interactive 3D interfaces, WebGL experiences and spatial product showcases.",
    color: "#3b82f6",
  },
  {
    eyebrow: "04 — We Define",
    title: "Branding & Identity",
    description:
      "Distinctive logos, visual systems and complete brand identities.",
    color: "#ec4899",
  },
];

function smoothstep(t: number, a: number, b: number) {
  const x = Math.min(1, Math.max(0, (t - a) / (b - a)));
  return x * x * (3 - 2 * x);
}

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

// ===== Scene Elements =====

function TorusKnot() {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const p = scrollState.reducedMotion ? 0 : scrollState.progress;
    const t = state.clock.getElapsedTime();

    // Idle rotation + scroll-driven spin
    meshRef.current.rotation.x = t * 0.1 + Math.sin(t * 0.3) * 0.1;
    meshRef.current.rotation.y = t * 0.15 + p * Math.PI * 1.6;

    // Scroll-driven position: center → left, rises at chapter 3
    const x = THREE.MathUtils.lerp(0.6, -2.3, easeInOut(p));
    const y = Math.sin(t * 0.4) * 0.15 + Math.sin(p * Math.PI) * 0.7;
    meshRef.current.position.x = x;
    meshRef.current.position.y = y;

    // Scale breathing + chapter pulse
    const scale =
      1 + Math.sin(t * 0.5) * 0.04 + Math.sin(p * Math.PI * 2) * 0.1;
    meshRef.current.scale.setScalar(scale);

    // Color: violet → indigo → blue drift
    if (matRef.current) {
      const base = new THREE.Color("#8b5cf6");
      const end = new THREE.Color("#3b82f6");
      matRef.current.color.copy(base).lerp(end, smoothstep(p, 0.35, 0.8));
    }
  });

  return (
    <mesh ref={meshRef} position={[0.6, 0, 0]}>
      <torusKnotGeometry args={[1.15, 0.34, 160, 24]} />
      <meshStandardMaterial
        ref={matRef}
        color="#8b5cf6"
        metalness={0.85}
        roughness={0.15}
        envMapIntensity={1.3}
      />
    </mesh>
  );
}

function GlassSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const p = scrollState.reducedMotion ? 0 : scrollState.progress;
    const t = state.clock.getElapsedTime();

    // Appears at chapter 02, grows in
    const appear = smoothstep(p, 0.2, 0.32);
    meshRef.current.scale.setScalar(
      Math.max(0.0001, appear * (1 + Math.sin(t * 0.6) * 0.05))
    );

    meshRef.current.position.x = THREE.MathUtils.lerp(2.8, 2.5, p);
    meshRef.current.position.y = Math.sin(t * 0.5) * 0.2 + p * 0.9;
    meshRef.current.rotation.y = t * 0.15;
    meshRef.current.rotation.z = t * 0.08;
  });

  return (
    <mesh ref={meshRef} position={[2.8, 0.8, -0.5]} scale={0.0001}>
      <icosahedronGeometry args={[0.9, 3]} />
      <meshPhysicalMaterial
        color="#38bdf8"
        metalness={0.15}
        roughness={0.06}
        transmission={0.65}
        thickness={0.6}
        clearcoat={1}
        clearcoatRoughness={0.08}
        envMapIntensity={1.4}
      />
    </mesh>
  );
}

function SmallOrb() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const p = scrollState.reducedMotion ? 0 : scrollState.progress;
    const t = state.clock.getElapsedTime();
    const orbit = t * 0.4 + p * Math.PI * 2;
    meshRef.current.position.x = Math.cos(orbit) * 1.7 - 0.2;
    meshRef.current.position.y = Math.sin(orbit * 1.3) * 1.1 + 0.4;
    meshRef.current.position.z = Math.sin(orbit) * 0.5 - 0.3;
    meshRef.current.rotation.y = t * 0.8;
  });

  return (
    <mesh ref={meshRef}>
      <octahedronGeometry args={[0.22, 0]} />
      <meshStandardMaterial
        color="#f59e0b"
        metalness={0.7}
        roughness={0.2}
        emissive="#f59e0b"
        emissiveIntensity={0.35}
      />
    </mesh>
  );
}

function ServicePanel({
  index,
  position,
  rotation,
  color,
  label,
  size,
}: {
  index: number;
  position: [number, number, number];
  rotation: [number, number, number];
  color: string;
  label: string;
  size: [number, number, number];
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const p = scrollState.reducedMotion ? 0 : scrollState.progress;
    const t = state.clock.getElapsedTime();

    // Each panel becomes prominent during its chapter window
    const start = index / CHAPTERS.length;
    const end = (index + 1) / CHAPTERS.length;
    const prominence =
      smoothstep(p, start, start + 0.12) -
      smoothstep(p, end - 0.12, end);

    const baseY = Math.sin(t * 0.6 + index * 1.7) * 0.12;
    groupRef.current.position.y = position[1] + baseY + prominence * 0.4;
    groupRef.current.position.x = position[0] + Math.sin(t * 0.3 + index) * 0.06;
    groupRef.current.rotation.y = rotation[1] + Math.sin(t * 0.4 + index) * 0.05 + prominence * 0.25;
    groupRef.current.rotation.z = rotation[2] - prominence * 0.06;

    const scale = 0.85 + prominence * 0.45;
    groupRef.current.scale.setScalar(scale);
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      <RoundedBox args={size} radius={0.08} smoothness={4}>
        <meshStandardMaterial
          color="#0e0e14"
          metalness={0.5}
          roughness={0.25}
          transparent
          opacity={0.94}
        />
      </RoundedBox>

      {/* Accent bar */}
      <mesh position={[-size[0] / 2 + 0.3, size[1] / 2 - 0.14, size[2] / 2 + 0.01]}>
        <boxGeometry args={[0.45, 0.07, 0.01]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.55} />
      </mesh>

      {/* Lines */}
      {[0, 1, 2].map((i) => (
        <mesh
          key={i}
          position={[-size[0] / 2 + 0.3, size[1] / 2 - 0.34 - i * 0.18, size[2] / 2 + 0.01]}
        >
          <boxGeometry args={[size[0] - 0.6 - i * 0.22, 0.04, 0.01]} />
          <meshStandardMaterial color="#3f3f46" />
        </mesh>
      ))}

      {/* Label */}
      <Text
        position={[0, -size[1] / 2 - 0.16, size[2] / 2 + 0.01]}
        fontSize={0.11}
        color="#e4e4e7"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  );
}

function Particles({ count }: { count: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 16;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return arr;
  }, [count]);

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
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const p = scrollState.progress;
    const vel = scrollState.velocity;
    pointsRef.current.rotation.y += (0.02 + p * 0.12 + vel * 0.5) * 0.016;
    pointsRef.current.rotation.x = Math.sin(p * Math.PI) * 0.12;
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
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function LightRig() {
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame(() => {
    if (!lightRef.current) return;
    const p = scrollState.progress;
    const colors = [
      new THREE.Color("#8b5cf6"),
      new THREE.Color("#10b981"),
      new THREE.Color("#3b82f6"),
      new THREE.Color("#ec4899"),
    ];
    const raw = Math.min(colors.length - 1.001, p * colors.length);
    const idx = Math.floor(raw);
    const mix = raw - idx;
    lightRef.current.color
      .copy(colors[idx])
      .lerp(colors[idx + 1] ?? colors[idx], mix);
    lightRef.current.position.x = Math.sin(p * Math.PI * 2) * 3.5;
    lightRef.current.position.y = Math.cos(p * Math.PI) * 2.5;
  });

  return <pointLight ref={lightRef} position={[3, 2, 3]} intensity={40} distance={25} decay={2} color="#8b5cf6" />;
}

function Scene({
  particleCount,
  isLowPower,
}: {
  particleCount: number;
  isLowPower: boolean;
}) {
  return (
    <>
      <ambientLight intensity={0.45} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <directionalLight position={[-4, -3, -4]} intensity={0.6} color="#818cf8" />
      <pointLight position={[0, 3, 2]} intensity={0.6} color="#ec4899" />
      <LightRig />

      <Float speed={1.1} rotationIntensity={0.25} floatIntensity={0.4}>
        <TorusKnot />
      </Float>

      <GlassSphere />
      <SmallOrb />

      {/* Service panels */}
      <ServicePanel
        index={0}
        position={[-3.2, 1.8, -0.8]}
        rotation={[0.1, 0.35, -0.12]}
        color="#8b5cf6"
        label="Websites"
        size={[1.7, 1.15, 0.07]}
      />
      <ServicePanel
        index={1}
        position={[3.1, -1.2, -0.4]}
        rotation={[-0.08, -0.3, 0.1]}
        color="#10b981"
        label="AI Video"
        size={[1.6, 1.1, 0.07]}
      />
      <ServicePanel
        index={2}
        position={[-2.5, -1.8, 0.2]}
        rotation={[0.12, 0.25, 0.08]}
        color="#3b82f6"
        label="3D UI/UX"
        size={[1.65, 1.12, 0.07]}
      />
      <ServicePanel
        index={3}
        position={[3.2, 1.7, -1]}
        rotation={[-0.1, -0.32, -0.06]}
        color="#ec4899"
        label="Branding"
        size={[1.5, 1.05, 0.07]}
      />

      <Particles count={particleCount} />

      <Sparkles
        count={isLowPower ? 40 : 100}
        scale={[16, 10, 8]}
        size={3}
        speed={0.3}
        color="#a78bfa"
        opacity={0.45}
      />

      <Environment preset="city" />
    </>
  );
}

function CameraRig() {
  const { camera } = useThree();
  const target = useMemo(() => new THREE.Vector3(0, 0, 8), []);

  useFrame((state, delta) => {
    const p = scrollState.progress;

    // Cinematic camera path driven by scroll
    target.set(
      Math.sin(p * Math.PI * 1.5) * 2.4 + mouseState.x * 0.5,
      (p - 0.5) * 1.8 + mouseState.y * 0.35,
      8.5 - p * 2.8
    );

    if (scrollState.reducedMotion) {
      target.set(0, 0, 8);
      state.camera.position.lerp(target, Math.min(1, delta * 2));
    } else {
      state.camera.position.lerp(target, Math.min(1, delta * 2.4));
    }

    state.camera.lookAt(
      mouseState.x * 0.15,
      mouseState.y * 0.1,
      0
    );
  });

  return null;
}

// ===== Main Scroll Experience =====

export function Scroll3DExperience() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const chapterRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hintRef = useRef<HTMLDivElement>(null);
  const railRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isLowPower, setIsLowPower] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    scrollState.reducedMotion = mq.matches;

    const nav = navigator as Navigator & { deviceMemory?: number };
    if (nav.deviceMemory && nav.deviceMemory <= 4) {
      setIsLowPower(true);
    }
  }, []);

  useEffect(() => {
    if (!isClient) return;
    const wrap = wrapRef.current;
    if (!wrap) return;

    let raf = 0;
    let lastRaw = 0;

    const update = () => {
      const rect = wrap.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const raw = total > 0 ? scrolled / total : 0;

      scrollState.velocity = Math.abs(raw - lastRaw);
      lastRaw = raw;
      scrollState.progress = raw;

      // Chapter text fades
      chapterRefs.current.forEach((el, i) => {
        if (!el) return;
        const start = i / CHAPTERS.length;
        const end = (i + 1) / CHAPTERS.length;
        const fadeIn = smoothstep(raw, start, start + 0.13);
        const fadeOut = 1 - smoothstep(raw, end - 0.13, end);
        const opacity = Math.max(0, Math.min(fadeIn, fadeOut));
        el.style.opacity = String(opacity);
        el.style.transform = `translateY(${(1 - opacity) * 48}px) scale(${
          0.94 + opacity * 0.06
        })`;
        el.style.visibility = opacity > 0.01 ? "visible" : "hidden";
      });

      // Scroll hint
      if (hintRef.current) {
        hintRef.current.style.opacity = raw > 0.04 ? "0" : "1";
        hintRef.current.style.transform =
          raw > 0.04 ? "translate(-50%, 18px)" : "translate(-50%, 0)";
      }

      // Rail dots
      railRefs.current.forEach((dot, i) => {
        if (!dot) return;
        const active =
          raw >= i / CHAPTERS.length && raw < (i + 1) / CHAPTERS.length;
        dot.classList.toggle("is-active", active);
      });

      raf = 0;
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    const onPointerMove = (e: PointerEvent) => {
      mouseState.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseState.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [isClient]);

  if (!isClient) {
    return (
      <div className="relative h-screen bg-[#050508] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-2 border-accent border-t-transparent animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground text-sm">
            Loading 3D experience...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div ref={wrapRef} className="relative h-[500vh] md:h-[480vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-[#050508]">
        {/* 3D Canvas */}
        <Canvas
          className="absolute inset-0"
          camera={{ position: [0, 0, 8.5], fov: 45 }}
          dpr={isLowPower ? [1, 1] : [1, 1.5]}
          gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        >
          <Suspense fallback={null}>
            <Scene
              particleCount={isLowPower ? 200 : 500}
              isLowPower={isLowPower}
            />
            {!reducedMotion && <CameraRig />}
          </Suspense>
        </Canvas>

        {/* Cinematic overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(5,5,8,0.55)_100%)] pointer-events-none" />

        {/* Chapter text */}
        {CHAPTERS.map((chapter, i) => (
          <div
            key={chapter.eyebrow}
            ref={(el) => {
              chapterRefs.current[i] = el;
            }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none px-6"
            style={{ opacity: 0, visibility: "hidden" }}
          >
            <div className="text-center max-w-3xl mx-auto">
              <p
                className="text-xs md:text-sm font-semibold uppercase tracking-[0.35em] mb-5"
                style={{ color: chapter.color }}
              >
                {chapter.eyebrow}
              </p>
              <h3 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white text-balance leading-[1.05]">
                {chapter.title}
              </h3>
              <p className="mt-5 md:mt-7 text-base md:text-xl text-zinc-300/90 max-w-xl mx-auto leading-relaxed">
                {chapter.description}
              </p>
              {i === CHAPTERS.length - 1 && (
                <div className="mt-8 md:mt-10 flex flex-wrap justify-center gap-4 pointer-events-auto">
                  <Link
                    href="/portfolio"
                    className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-black text-sm font-semibold hover:bg-zinc-200 transition-colors"
                  >
                    Explore Portfolio
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/25 text-white text-sm font-semibold hover:bg-white/10 transition-colors backdrop-blur-sm"
                  >
                    Start a Project
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Scroll hint */}
        <div
          ref={hintRef}
          className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-500 pointer-events-none"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-zinc-400">
            Scroll to explore
          </span>
          <ArrowDown className="w-4 h-4 text-accent animate-bounce" />
        </div>

        {/* Chapter rail */}
        <div className="absolute right-5 md:right-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3 z-10">
          {CHAPTERS.map((c, i) => (
            <div
              key={c.eyebrow}
              ref={(el) => {
                railRefs.current[i] = el;
              }}
              className="scroll-rail-dot"
              style={{ background: c.color }}
              aria-hidden="true"
            />
          ))}
        </div>

        {/* Top-left badge */}
        <div className="absolute top-5 left-5 md:top-7 md:left-8 pointer-events-none z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white/80 text-xs md:text-sm font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Immersive 3D Scroll Experience
          </div>
        </div>
      </div>
    </div>
  );
}