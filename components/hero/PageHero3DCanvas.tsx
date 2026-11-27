"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export type PageHeroAnimationVariant = "services" | "work" | "about" | "waves" | "constellation" | "core";

interface PageHero3DCanvasProps {
  variant?: PageHeroAnimationVariant;
  className?: string;
}

export default function PageHero3DCanvas({
  className = "",
}: PageHero3DCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 4, 28);
    camera.lookAt(0, 0, 0);

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setClearColor(0x000000, 0); // Transparent canvas background
    } catch (e) {
      console.warn("[CodeNest] WebGL not supported or failed to initialize:", e);
      return;
    }

    // Normalized Mouse coordinates with smooth lerping
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouse.targetX = x;
      mouse.targetY = y;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // 2. Interactive 3D Wave Particle Grid (Original first wave terrain)
    // 64 x 64 = 4096 points
    const gridCols = 64;
    const gridRows = 64;
    const totalPoints = gridCols * gridRows;
    const waveSpacing = 0.95;

    const waveGeometry = new THREE.BufferGeometry();
    const wavePositions = new Float32Array(totalPoints * 3);
    const waveColors = new Float32Array(totalPoints * 3);
    const baseWaveY = new Float32Array(totalPoints);

    // Pure Monochrome Palette: Deep Charcoal / Black to Very Dim White / Soft Silver
    const colorPeak = new THREE.Color("#d4d4d8"); // Very dim white / silver crests
    const colorMid = new THREE.Color("#52525b");  // Mid zinc / charcoal
    const colorBase = new THREE.Color("#18181b"); // Deep black / base troughs

    let pIndex = 0;
    const startX = -((gridCols - 1) * waveSpacing) / 2;
    const startZ = -((gridRows - 1) * waveSpacing) / 2 - 4;

    for (let r = 0; r < gridRows; r++) {
      for (let c = 0; c < gridCols; c++) {
        const x = startX + c * waveSpacing;
        const z = startZ + r * waveSpacing;
        const y = -8.5; // Sit gracefully in the lower perspective plane

        wavePositions[pIndex * 3] = x;
        wavePositions[pIndex * 3 + 1] = y;
        wavePositions[pIndex * 3 + 2] = z;
        baseWaveY[pIndex] = y;

        // Distribute initial color tones
        const distFromCenter = Math.sqrt(x * x + z * z) / 25;
        const tempColor = new THREE.Color().copy(colorBase).lerp(colorMid, Math.max(0, 1 - distFromCenter));
        waveColors[pIndex * 3] = tempColor.r;
        waveColors[pIndex * 3 + 1] = tempColor.g;
        waveColors[pIndex * 3 + 2] = tempColor.b;

        pIndex++;
      }
    }

    waveGeometry.setAttribute("position", new THREE.BufferAttribute(wavePositions, 3));
    waveGeometry.setAttribute("color", new THREE.BufferAttribute(waveColors, 3));

    // Circular glowing particle texture
    const createParticleTexture = () => {
      const c = document.createElement("canvas");
      c.width = 64;
      c.height = 64;
      const ctx = c.getContext("2d");
      if (ctx) {
        const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        grad.addColorStop(0, "rgba(255, 255, 255, 0.95)");
        grad.addColorStop(0.3, "rgba(220, 220, 230, 0.45)");
        grad.addColorStop(0.65, "rgba(120, 120, 130, 0.12)");
        grad.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 64, 64);
      }
      return new THREE.CanvasTexture(c);
    };

    const particleTexture = createParticleTexture();

    const waveMaterial = new THREE.PointsMaterial({
      size: 0.32,
      map: particleTexture,
      transparent: true,
      vertexColors: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const wavePoints = new THREE.Points(waveGeometry, waveMaterial);
    scene.add(wavePoints);

    // 3. Ambient Dust Particles (Dim white floating stardust in upper depth)
    const dustCount = 140;
    const dustGeo = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      dustPositions[i * 3] = (Math.random() - 0.5) * 60;
      dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 32 + 4;
      dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 45 - 8;
    }
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));

    const dustMat = new THREE.PointsMaterial({
      size: 0.16,
      color: 0xd4d4d8,
      map: particleTexture,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const dustPoints = new THREE.Points(dustGeo, dustMat);
    scene.add(dustPoints);

    // 4. Visibility Observer (Pause when off-screen to save 100% GPU)
    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // 5. Responsive Resize Handler
    const handleResize = () => {
      if (!container || !renderer) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener("resize", handleResize, { passive: true });

    // 6. High-Performance Render Loop with Increased Wave Height
    let animId = 0;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (!isVisible || prefersReducedMotion) {
        if (!prefersReducedMotion && renderer) {
          renderer.render(scene, camera);
        }
        return;
      }

      const elapsed = clock.getElapsedTime();

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      // Camera subtle parallax (Original first wave)
      camera.position.x = mouse.x * 2.2;
      camera.position.y = 4 + mouse.y * 1.5;
      camera.lookAt(0, 0, 0);

      // Animate Wave Particles (Original first wave animation)
      const posAttr = waveGeometry.getAttribute("position") as THREE.BufferAttribute;
      const colAttr = waveGeometry.getAttribute("color") as THREE.BufferAttribute;
      const posArr = posAttr.array as Float32Array;
      const colArr = colAttr.array as Float32Array;

      let idx = 0;
      for (let r = 0; r < gridRows; r++) {
        for (let c = 0; c < gridCols; c++) {
          const x = posArr[idx * 3];
          const z = posArr[idx * 3 + 2];

          // Complex dual-sine wave propagation (Exact first wave formula)
          const waveHeight =
            Math.sin(x * 0.18 + elapsed * 1.6) * 1.4 +
            Math.cos(z * 0.18 + elapsed * 1.2) * 1.1 +
            Math.sin((x + z) * 0.12 + elapsed * 0.9) * 0.7;

          // Mouse proximity displacement (Exact first wave)
          const dx = x - mouse.x * 15;
          const dz = z - (-mouse.y * 15);
          const distSq = dx * dx + dz * dz;
          const mouseDisplacement = Math.max(0, 2.2 - Math.sqrt(distSq) * 0.18);

          posArr[idx * 3 + 1] = baseWaveY[idx] + waveHeight + mouseDisplacement;

          // Dynamic peak coloring
          const normalizedHeight = THREE.MathUtils.clamp((waveHeight + mouseDisplacement + 2.5) / 5, 0, 1);
          const pointColor = new THREE.Color().copy(colorBase).lerp(colorPeak, normalizedHeight);
          colArr[idx * 3] = pointColor.r;
          colArr[idx * 3 + 1] = pointColor.g;
          colArr[idx * 3 + 2] = pointColor.b;

          idx++;
        }
      }
      posAttr.needsUpdate = true;
      colAttr.needsUpdate = true;

      // Slowly drift ambient dust
      dustPoints.rotation.y = elapsed * 0.02;
      dustPoints.rotation.x = elapsed * 0.01;

      if (renderer) {
        renderer.render(scene, camera);
      }
    };

    animate();

    // 7. Cleanup
    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      waveMaterial.dispose();
      waveGeometry.dispose();
      dustMat.dispose();
      dustGeo.dispose();
      particleTexture.dispose();

      if (renderer) {
        renderer.dispose();
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}