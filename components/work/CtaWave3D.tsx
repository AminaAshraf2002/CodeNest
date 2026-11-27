"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function CtaWave3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 3.5, 16);
    camera.lookAt(0, -1, 0);

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
      renderer.setClearColor(0x000000, 0);
    } catch {
      return;
    }

    // 2. Mouse Lerp for interaction
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouse.targetX = x;
      mouse.targetY = y;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // 3. Full-Coverage 3D Particle Wave (Pure Monochrome: Black, Dim White, Soft Zinc)
    const gridCols = 72;
    const gridRows = 36;
    const totalPoints = gridCols * gridRows;
    const spacingX = 0.52;
    const spacingZ = 0.44;

    const waveGeometry = new THREE.BufferGeometry();
    const wavePositions = new Float32Array(totalPoints * 3);
    const waveColors = new Float32Array(totalPoints * 3);
    const baseWaveY = new Float32Array(totalPoints);

    // Monochrome Palette: Dim White / Silver Crests to Deep Zinc
    const colorPeak = new THREE.Color("#d4d4d8"); // Dim white / soft silver
    const colorMid = new THREE.Color("#52525b");  // Mid zinc / charcoal
    const colorBase = new THREE.Color("#18181b"); // Deep black-zinc

    const startX = -((gridCols - 1) * spacingX) / 2;
    const startZ = -((gridRows - 1) * spacingZ) / 2;

    let pIndex = 0;
    for (let r = 0; r < gridRows; r++) {
      for (let c = 0; c < gridCols; c++) {
        const x = startX + c * spacingX;
        const z = startZ + r * spacingZ;
        const y = -2.2;

        wavePositions[pIndex * 3] = x;
        wavePositions[pIndex * 3 + 1] = y;
        wavePositions[pIndex * 3 + 2] = z;
        baseWaveY[pIndex] = y;

        const distFromCenter = Math.sqrt(x * x + z * z) / 16;
        const tempColor = new THREE.Color()
          .copy(colorBase)
          .lerp(colorMid, Math.max(0, 1 - distFromCenter));
        waveColors[pIndex * 3] = tempColor.r;
        waveColors[pIndex * 3 + 1] = tempColor.g;
        waveColors[pIndex * 3 + 2] = tempColor.b;

        pIndex++;
      }
    }

    waveGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(wavePositions, 3)
    );
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
        grad.addColorStop(0.3, "rgba(215, 215, 225, 0.45)");
        grad.addColorStop(0.65, "rgba(100, 100, 110, 0.12)");
        grad.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 64, 64);
      }
      return new THREE.CanvasTexture(c);
    };

    const particleTexture = createParticleTexture();

    const waveMaterial = new THREE.PointsMaterial({
      size: 0.22,
      map: particleTexture,
      transparent: true,
      vertexColors: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const wavePoints = new THREE.Points(waveGeometry, waveMaterial);
    scene.add(wavePoints);

    // 4. Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width === 0 || height === 0 || !renderer) return;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      }
    });
    resizeObserver.observe(container);

    // 5. Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      const elapsed = prefersReducedMotion ? 0 : clock.getElapsedTime() * 0.7;

      const posAttr = waveGeometry.attributes.position;
      const colAttr = waveGeometry.attributes.color;
      const posArr = posAttr.array as Float32Array;
      const colArr = colAttr.array as Float32Array;

      let idx = 0;
      for (let r = 0; r < gridRows; r++) {
        for (let c = 0; c < gridCols; c++) {
          const x = posArr[idx * 3];
          const z = posArr[idx * 3 + 2];

          // Dual-sine organic propagation across the entire card
          const waveHeight =
            Math.sin(x * 0.28 + elapsed * 1.5) * 0.85 +
            Math.cos(z * 0.32 + elapsed * 1.1) * 0.65 +
            Math.sin((x + z) * 0.2 + elapsed * 0.8) * 0.4;

          // Subtle cursor displacement
          const dx = x - mouse.x * 8;
          const dz = z - -mouse.y * 8;
          const distSq = dx * dx + dz * dz;
          const mouseDisplacement = Math.max(0, 1.2 - Math.sqrt(distSq) * 0.16);

          posArr[idx * 3 + 1] = baseWaveY[idx] + waveHeight + mouseDisplacement;

          // Dynamic brightness mapping to crests (Dim White on peaks)
          const normalizedHeight = THREE.MathUtils.clamp(
            (waveHeight + mouseDisplacement + 1.5) / 3,
            0,
            1
          );
          const pointColor = new THREE.Color()
            .copy(colorBase)
            .lerp(colorPeak, normalizedHeight);
          colArr[idx * 3] = pointColor.r;
          colArr[idx * 3 + 1] = pointColor.g;
          colArr[idx * 3 + 2] = pointColor.b;

          idx++;
        }
      }
      posAttr.needsUpdate = true;
      colAttr.needsUpdate = true;

      // Subtle tilt with mouse
      scene.rotation.y = mouse.x * 0.04;
      scene.rotation.x = -mouse.y * 0.02;

      renderer?.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      resizeObserver.disconnect();

      waveGeometry.dispose();
      waveMaterial.dispose();
      particleTexture.dispose();
      renderer?.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ pointerEvents: "none" }}
      />
    </div>
  );
}
