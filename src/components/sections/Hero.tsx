"use client";

import { useRef, Suspense } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { TypeAnimation } from "react-type-animation";
import { ArrowDown, ExternalLink, Mail } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Float } from "@react-three/drei";
import * as THREE from "three";

function AnimatedSphere({
  position,
  color,
  speed,
  distort,
}: Readonly<{
  position: [number, number, number];
  color: string;
  speed: number;
  distort: number;
}>) {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      mesh.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={mesh} args={[1, 64, 64]} position={position}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={distort}
          speed={2}
          roughness={0.1}
          metalness={0.8}
          transparent
          opacity={0.7}
        />
      </Sphere>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#7c3aed" />
      <AnimatedSphere position={[0, 0, 0]} color="#6d28d9" speed={1.5} distort={0.4} />
      <AnimatedSphere position={[3, 2, -2]} color="#7c3aed" speed={2} distort={0.3} />
      <AnimatedSphere position={[-3, -1, -1]} color="#4f46e5" speed={1} distort={0.5} />
    </>
  );
}

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 -z-10">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-background via-background/90 to-background/60" />
      <div className="absolute bottom-0 left-0 right-0 h-32 -z-10 bg-gradient-to-t from-background to-transparent" />

      {/* Dot grid */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.15] dark:opacity-[0.08]"
        style={{
          backgroundImage: `radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Film grain */}
      <svg className="absolute inset-0 -z-10 w-full h-full opacity-[0.04] pointer-events-none" aria-hidden>
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ── Text content ── */}
          <div className="space-y-6 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-3"
            >
              <span className="inline-flex items-center gap-2 text-xs font-mono text-green-500 bg-green-500/10 border border-green-500/20 rounded-full px-3 py-1">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
                </span>
                {t("greeting")}
              </span>
              <span className="text-xs text-muted-foreground font-mono hidden sm:block">
                Jakarta, Indonesia 🇮🇩
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl sm:text-5xl xl:text-6xl font-bold tracking-tight leading-tight"
            >
              <span className="bg-gradient-to-r from-violet-600 via-purple-500 to-indigo-600 bg-clip-text text-transparent">
                {t("name")}
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg sm:text-xl font-mono"
            >
              <span className="text-muted-foreground">{"// "}</span>
              <TypeAnimation
                sequence={[
                  "Fullstack Developer",
                  2000,
                  "Backend Engineer",
                  2000,
                  "Frontend Developer",
                  2000,
                  "API & Systems Engineer",
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="text-primary"
              />
              <span className="animate-pulse">_</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-lg"
            >
              {t("description")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-3"
            >
              <Button
                size="lg"
                onClick={() =>
                  document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })
                }
                className="gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 shadow-lg shadow-violet-500/25"
              >
                <ExternalLink className="h-4 w-4" />
                {t("cta")}
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() =>
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
                }
                className="gap-2 border-primary/30 hover:bg-primary/10"
              >
                <Mail className="h-4 w-4" />
                {t("hireCta")}
              </Button>
            </motion.div>

            {/* Currently note */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="pt-2 border-t border-border"
            >
              <p className="text-xs text-muted-foreground font-mono">
                <span className="text-primary">▸ currently</span>{" "}
                building at Solusi Teknologi Kreatif · exploring distributed tracing & OTel
              </p>
            </motion.div>
          </div>

          {/* ── Photo ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            {/* Outer wrapper — controls max size and clips overflow of badges */}
            <div className="relative w-[260px] sm:w-[300px] lg:w-[340px] xl:w-[380px] mx-8 my-10">
              {/* Glow ring */}
              <div className="absolute -inset-6 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 opacity-20 blur-3xl animate-pulse" />

              {/* Gradient border ring */}
              <div className="relative rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 p-[3px]">
                <div className="rounded-full bg-background p-1.5">
                  <div className="relative aspect-square w-full rounded-full overflow-hidden">
                    <Image
                      src="/images/profile/ogi-1.png"
                      alt="Ogi Yatri Malakiano"
                      fill
                      className="object-cover"
                      style={{ objectPosition: "50% 100%" }}
                      priority
                    />
                  </div>
                </div>
              </div>

              {/* Floating badge — Next.js (top left) */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-10 top-6 bg-background border border-border rounded-xl px-3 py-2 shadow-xl text-xs font-mono whitespace-nowrap"
              >
                <span className="text-green-500 mr-1">▲</span>Next.js 14
              </motion.div>

              {/* Floating badge — NestJS (top right) */}
              <motion.div
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-10 top-10 bg-background border border-border rounded-xl px-3 py-2 shadow-xl text-xs font-mono whitespace-nowrap"
              >
                <span className="text-red-500 mr-1">⬡</span>NestJS
              </motion.div>

              {/* Floating badge — PostgreSQL (bottom) */}
              <motion.div
                animate={{ y: [-3, 7, -3] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-background border border-border rounded-xl px-3 py-2 shadow-xl text-xs font-mono whitespace-nowrap"
              >
                <span className="mr-1">🐘</span>PostgreSQL
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex flex-col items-center gap-2 mt-16 cursor-pointer"
          onClick={() =>
            document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })
          }
        >
          <span className="text-xs text-muted-foreground font-mono">{t("scrollDown")}</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="h-4 w-4 text-muted-foreground" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
