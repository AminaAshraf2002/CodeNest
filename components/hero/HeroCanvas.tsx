"use client";

import React, { useEffect, useRef, useCallback } from "react";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/*  GLSL Shaders for Seamless Frame Blending & Cinematic Effects      */
/* ------------------------------------------------------------------ */
const VERT_SHADER = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

const FRAG_SHADER = /* glsl */ `
precision highp float;
varying vec2 vUv;

uniform sampler2D uTexA;
uniform sampler2D uTexB;
uniform float uMix;
uniform float uTime;
uniform vec2 uMouse;      // Normalized -1 .. 1
uniform float uProgress;  // Scroll progress 0 .. 1
uniform vec2 uResolution; // Viewport width, height
uniform vec2 uImageSize;  // Image natural width, height

/* Cover-fit math preserving 16:9 ratio centered without distortion */
vec2 coverUv(vec2 uv, vec2 screenRes, vec2 imgRes) {
  float screenAspect = screenRes.x / screenRes.y;
  float imgAspect = imgRes.x / imgRes.y;
  vec2 st = uv;
  if (screenAspect > imgAspect) {
    float scale = screenAspect / imgAspect;
    st.y = (uv.y - 0.5) / scale + 0.5;
  } else {
    float scale = imgAspect / screenAspect;
    st.x = (uv.x - 0.5) / scale + 0.5;
  }
  return st;
}

/* Procedural high-frequency film grain */
float filmNoise(vec2 coord, float t) {
  return fract(sin(dot(coord + vec2(t * 11.23, t * 7.41), vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  // 1. Slow scroll camera dolly: scale 1.0 -> 1.06
  float dollyScale = 1.0 + uProgress * 0.06;
  vec2 centered = (vUv - 0.5) / dollyScale + 0.5;

  // 2. Mouse parallax: subtle offset up to ±12px in screen space
  vec2 mouseShift = (uMouse * 12.0) / uResolution;
  centered -= mouseShift;

  // 3. Cover-fit coordinates
  vec2 st = coverUv(centered, uResolution, uImageSize);

  // Fallback clamping
  st = clamp(st, 0.0, 1.0);

  // 4. Sample and cross-blend frames
  vec4 colorA = texture2D(uTexA, st);
  vec4 colorB = texture2D(uTexB, st);
  vec4 finalColor = mix(colorA, colorB, clamp(uMix, 0.0, 1.0));

  // 5. Soft bloom/glow on bright areas (archway moon light)
  float luma = dot(finalColor.rgb, vec3(0.299, 0.587, 0.114));
  float glowMask = smoothstep(0.55, 0.98, luma);
  finalColor.rgb += finalColor.rgb * glowMask * 0.18;

  // 6. Vignette overlay for cinematic framing
  vec2 vigCoord = (vUv - 0.5) * vec2(1.7, 1.35);
  float vig = 1.0 - smoothstep(0.42, 1.35, length(vigCoord));
  finalColor.rgb *= mix(0.38, 1.0, vig);

  // 7. Subtle film grain
  float grain = (filmNoise(vUv * uResolution, uTime) - 0.5) * 0.055;
  finalColor.rgb += grain;

  gl_FragColor = finalColor;
}
`;

/* ------------------------------------------------------------------ */
/*  Constants                                                         */
/* ------------------------------------------------------------------ */
const TOTAL_FRAMES = 96;
const FRAME_PATH = (i: number) =>
  `/hero-frames/f_${String(i).padStart(4, "0")}.webp`;
const LERP_FACTOR = 0.12;
const MIN_FRAMES_BEFORE_START = 20;

export interface HeroCanvasHandle {
  setProgress: (p: number) => void;
  setMouse: (x: number, y: number) => void;
  getLoadedCount: () => number;
  getCurrentFrame: () => number;
}

interface HeroCanvasProps {
  onReady?: () => void;
  canvasRef?: React.RefObject<HeroCanvasHandle | null>;
}

export default function HeroCanvas({ onReady, canvasRef }: HeroCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const fallbackImgRef = useRef<HTMLImageElement>(null);

  const state = useRef<{
    renderer: THREE.WebGLRenderer | null;
    material: THREE.ShaderMaterial | null;
    textures: (THREE.Texture | null)[];
    loadedCount: number;
    progress: number;
    targetFrame: number;
    currentFrame: number;
    mouseX: number;
    mouseY: number;
    lerpedMouseX: number;
    lerpedMouseY: number;
    disposed: boolean;
    isVisible: boolean;
    readyFired: boolean;
    animId: number;
    webglFailed: boolean;
  }>({
    renderer: null,
    material: null,
    textures: new Array(TOTAL_FRAMES).fill(null),
    loadedCount: 0,
    progress: 0,
    targetFrame: 0,
    currentFrame: 0,
    mouseX: 0,
    mouseY: 0,
    lerpedMouseX: 0,
    lerpedMouseY: 0,
    disposed: false,
    isVisible: true,
    readyFired: false,
    animId: 0,
    webglFailed: false,
  });

  /* Expose imperative methods to parent */
  const setProgress = useCallback((p: number) => {
    state.current.progress = Math.max(0, Math.min(1, p));
  }, []);

  const setMouse = useCallback((x: number, y: number) => {
    state.current.mouseX = x;
    state.current.mouseY = y;
  }, []);

  const getLoadedCount = useCallback(() => state.current.loadedCount, []);
  const getCurrentFrame = useCallback(() => state.current.currentFrame, []);

  useEffect(() => {
    if (canvasRef && "current" in canvasRef) {
      (canvasRef as React.MutableRefObject<HeroCanvasHandle | null>).current = {
        setProgress,
        setMouse,
        getLoadedCount,
        getCurrentFrame,
      };
    }
  }, [canvasRef, setProgress, setMouse, getLoadedCount, getCurrentFrame]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const s = state.current;
    s.disposed = false;

    // 1. Initialize WebGL Renderer
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: false,
        alpha: false,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      const initW = container.clientWidth || window.innerWidth;
      const initH = container.clientHeight || window.innerHeight;
      renderer.setSize(initW, initH, false);
      renderer.domElement.style.position = "absolute";
      renderer.domElement.style.inset = "0";
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      renderer.domElement.style.objectFit = "cover";
      renderer.domElement.style.pointerEvents = "none";
      renderer.domElement.style.zIndex = "0";
      container.appendChild(renderer.domElement);
      s.renderer = renderer;
    } catch (err) {
      console.warn("[HeroCanvas] WebGL not supported, falling back to <img> sequence:", err);
      s.webglFailed = true;
      return;
    }

    // 2. Camera & Scene
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const scene = new THREE.Scene();

    // 3. Fallback blank texture
    const placeholderCanvas = document.createElement("canvas");
    placeholderCanvas.width = 1600;
    placeholderCanvas.height = 900;
    const pctx = placeholderCanvas.getContext("2d");
    if (pctx) {
      pctx.fillStyle = "#050505";
      pctx.fillRect(0, 0, 1600, 900);
    }
    const placeholderTexture = new THREE.CanvasTexture(placeholderCanvas);

    // 4. ShaderMaterial
    const material = new THREE.ShaderMaterial({
      vertexShader: VERT_SHADER,
      fragmentShader: FRAG_SHADER,
      uniforms: {
        uTexA: { value: placeholderTexture },
        uTexB: { value: placeholderTexture },
        uMix: { value: 0 },
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uProgress: { value: 0 },
        uResolution: {
          value: new THREE.Vector2(
            container.clientWidth || window.innerWidth,
            container.clientHeight || window.innerHeight
          ),
        },
        uImageSize: { value: new THREE.Vector2(1600, 900) },
      },
      depthTest: false,
      depthWrite: false,
    });
    s.material = material;

    const plane = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(plane);

    // 5. Preload Poster first for immediate preview
    const loader = new THREE.TextureLoader();
    loader.load("/videos/hero-poster.jpg", (posterTex) => {
      if (s.disposed) {
        posterTex.dispose();
        return;
      }
      posterTex.colorSpace = THREE.SRGBColorSpace;
      posterTex.minFilter = THREE.LinearFilter;
      posterTex.magFilter = THREE.LinearFilter;
      posterTex.generateMipmaps = false;
      if (!s.textures[0]) {
        material.uniforms.uTexA.value = posterTex;
        material.uniforms.uTexB.value = posterTex;
        renderer.render(scene, camera);
      }
    });

    // 6. Frame Preloader (all 96 frames)
    const loadFrame = (index: number) => {
      if (s.disposed) return;
      const url = FRAME_PATH(index + 1); // 1-indexed (f_0001.webp .. f_0096.webp)
      loader.load(
        url,
        (tex) => {
          if (s.disposed) {
            tex.dispose();
            return;
          }
          tex.colorSpace = THREE.SRGBColorSpace;
          tex.minFilter = THREE.LinearFilter;
          tex.magFilter = THREE.LinearFilter;
          tex.generateMipmaps = false;
          s.textures[index] = tex;
          s.loadedCount++;

          // Check if first frame and first 20 frames are ready
          if (!s.readyFired && s.textures[0] && s.loadedCount >= MIN_FRAMES_BEFORE_START) {
            s.readyFired = true;
            if (fallbackImgRef.current) {
              fallbackImgRef.current.style.opacity = "0";
              setTimeout(() => {
                if (fallbackImgRef.current) fallbackImgRef.current.style.display = "none";
              }, 500);
            }
            console.log(`[HeroCanvas] Initial ${s.loadedCount} frames loaded, hero ready.`);
            onReady?.();
          }
        },
        undefined,
        (err) => {
          console.warn(`[HeroCanvas] Failed to load frame ${index + 1}:`, err);
        }
      );
    };

    // Load first 20 frames urgently
    for (let i = 0; i < Math.min(MIN_FRAMES_BEFORE_START, TOTAL_FRAMES); i++) {
      loadFrame(i);
    }

    // Stream the remaining frames in small batches
    let currentBatchIdx = MIN_FRAMES_BEFORE_START;
    const batchTimer = setInterval(() => {
      if (s.disposed || currentBatchIdx >= TOTAL_FRAMES) {
        clearInterval(batchTimer);
        return;
      }
      const end = Math.min(currentBatchIdx + 8, TOTAL_FRAMES);
      for (let i = currentBatchIdx; i < end; i++) {
        loadFrame(i);
      }
      currentBatchIdx = end;
    }, 120);

    // 7. Dynamic Resize Handler with ResizeObserver (Guaranteed full-bleed width)
    const handleResize = () => {
      if (s.disposed || !container || !s.renderer || !s.material) return;
      const rect = container.getBoundingClientRect();
      const w = Math.round(rect.width || container.clientWidth || window.innerWidth);
      const h = Math.round(rect.height || container.clientHeight || window.innerHeight);
      if (w <= 0 || h <= 0) return;
      s.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      s.renderer.setSize(w, h, false);
      s.renderer.domElement.style.width = "100%";
      s.renderer.domElement.style.height = "100%";
      s.material.uniforms.uResolution.value.set(w, h);
    };

    window.addEventListener("resize", handleResize);
    const ro = new ResizeObserver(handleResize);
    ro.observe(container);

    // Initial and post-mount checks to prevent any partial width crops
    handleResize();
    const t1 = setTimeout(handleResize, 100);
    const t2 = setTimeout(handleResize, 400);
    const onPreloaderStart = () => {
      setTimeout(handleResize, 50);
      setTimeout(handleResize, 350);
    };
    window.addEventListener("preloader-transition-start", onPreloaderStart, { once: true });

    // 8. Intersection Observer (pause rendering off-screen)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          s.isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.01 }
    );
    observer.observe(container);

    // 9. Main Render Loop
    const startTime = performance.now();

    const render = () => {
      if (s.disposed) return;
      s.animId = requestAnimationFrame(render);

      if (!s.isVisible || !s.renderer || !s.material) return;

      // Lerp mouse parallax
      s.lerpedMouseX += (s.mouseX - s.lerpedMouseX) * 0.08;
      s.lerpedMouseY += (s.mouseY - s.lerpedMouseY) * 0.08;

      // Lerp frame progress
      s.targetFrame = s.progress * (TOTAL_FRAMES - 1);
      s.currentFrame += (s.targetFrame - s.currentFrame) * LERP_FACTOR;
      const clampedFrame = Math.max(0, Math.min(TOTAL_FRAMES - 1, s.currentFrame));

      const idxA = Math.floor(clampedFrame);
      const idxB = Math.min(idxA + 1, TOTAL_FRAMES - 1);
      const mixFrac = clampedFrame - idxA;

      const texA = s.textures[idxA] || s.textures[0];
      const texB = s.textures[idxB] || texA;

      if (texA) {
        s.material.uniforms.uTexA.value = texA;
        s.material.uniforms.uTexB.value = texB || texA;
        s.material.uniforms.uMix.value = mixFrac;
        s.material.uniforms.uTime.value = (performance.now() - startTime) * 0.001;
        s.material.uniforms.uMouse.value.set(s.lerpedMouseX, s.lerpedMouseY);
        s.material.uniforms.uProgress.value = s.progress;

        s.renderer.render(scene, camera);
      }
    };

    s.animId = requestAnimationFrame(render);

    // Cleanup
    return () => {
      s.disposed = true;
      cancelAnimationFrame(s.animId);
      clearInterval(batchTimer);
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("preloader-transition-start", onPreloaderStart);
      window.removeEventListener("resize", handleResize);
      ro.disconnect();
      observer.disconnect();

      s.textures.forEach((t) => t?.dispose());
      s.textures = new Array(TOTAL_FRAMES).fill(null);
      placeholderTexture.dispose();
      material.dispose();
      plane.geometry.dispose();
      renderer.dispose();

      if (renderer.domElement && renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
      s.renderer = null;
      s.material = null;
    };
  }, [onReady]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none"
      style={{ zIndex: 0 }}
    >
      {/* Fallback poster while initial frames buffer */}
      <img
        ref={fallbackImgRef}
        src="/videos/hero-poster.jpg"
        alt="CodeNest Hero Backdrop"
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none opacity-40 transition-opacity duration-700"
      />
    </div>
  );
}
