"use client";

import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

function createRoundedRectShape(width: number, height: number, radius: number): THREE.Shape {
  const shape = new THREE.Shape();
  const x = -width / 2;
  const y = -height / 2;
  shape.moveTo(x + radius, y);
  shape.lineTo(x + width - radius, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + radius);
  shape.lineTo(x + width, y + height - radius);
  shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  shape.lineTo(x + radius, y + height);
  shape.quadraticCurveTo(x, y + height, x, y + height - radius);
  shape.lineTo(x, y + radius);
  shape.quadraticCurveTo(x, y, x + radius, y);
  return shape;
}

function CascadingSculpture({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const floatRef = useRef<THREE.Group>(null);

  // Slab settings for cascading metallic sheets
  const slabSettings = useMemo(
    () => ({
      depth: 0.08,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.05,
      bevelThickness: 0.06,
    }),
    []
  );

  const slabGeometry = useMemo(() => {
    const shape = createRoundedRectShape(3.2, 4.4, 0.35);
    const geom = new THREE.ExtrudeGeometry(shape, slabSettings);
    geom.center();
    return geom;
  }, [slabSettings]);

  // Monogram Extrude Settings
  const extrudeSettings = useMemo(
    () => ({
      depth: 0.35,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.06,
      bevelThickness: 0.08,
    }),
    []
  );

  const { cGeometry, nGeometry } = useMemo(() => {
    // Elegant geometric 'C' shape
    const cShape = new THREE.Shape();
    cShape.moveTo(0.1, 1.25);
    cShape.lineTo(-1.0, 1.25);
    cShape.bezierCurveTo(-1.95, 1.25, -2.35, 0.7, -2.35, 0);
    cShape.bezierCurveTo(-2.35, -0.7, -1.95, -1.25, -1.0, -1.25);
    cShape.lineTo(0.1, -1.25);
    cShape.lineTo(0.1, -0.65);
    cShape.lineTo(-0.85, -0.65);
    cShape.bezierCurveTo(-1.45, -0.65, -1.6, -0.35, -1.6, 0);
    cShape.bezierCurveTo(-1.6, 0.35, -1.45, 0.65, -0.85, 0.65);
    cShape.lineTo(0.1, 0.65);
    cShape.closePath();

    // Geometric 'N' shape
    const nShape = new THREE.Shape();
    nShape.moveTo(-0.1, -1.25);
    nShape.lineTo(-0.1, 1.25);
    nShape.lineTo(0.5, 1.25);
    nShape.lineTo(1.45, -0.35);
    nShape.lineTo(1.45, 1.25);
    nShape.lineTo(2.1, 1.25);
    nShape.lineTo(2.1, -1.25);
    nShape.lineTo(1.5, -1.25);
    nShape.lineTo(0.55, 0.35);
    nShape.lineTo(0.55, -1.25);
    nShape.closePath();

    const cGeom = new THREE.ExtrudeGeometry(cShape, extrudeSettings);
    const nGeom = new THREE.ExtrudeGeometry(nShape, extrudeSettings);

    cGeom.center();
    nGeom.center();

    return { cGeometry: cGeom, nGeometry: nGeom };
  }, [extrudeSettings]);

  // Metallic Olive Material (exact sampled tones: #7D8B5E and #94AB32)
  const slabMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#7D8B5E"),
      emissive: new THREE.Color("#2F4508"),
      emissiveIntensity: 0.12,
      metalness: 0.88,
      roughness: 0.18,
      clearcoat: 0.95,
      clearcoatRoughness: 0.1,
      reflectivity: 0.95,
    });
  }, []);

  const monogramMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#C5D45A"),
      emissive: new THREE.Color("#48600C"),
      emissiveIntensity: 0.2,
      metalness: 0.92,
      roughness: 0.16,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      reflectivity: 1.0,
    });
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Smooth mouse tilt & scroll rotation
    const targetY = state.pointer.x * 0.35 + scrollProgress * Math.PI * 1.2;
    const targetX = -state.pointer.y * 0.25;

    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      targetY,
      3.5,
      delta
    );
    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      targetX,
      3.5,
      delta
    );

    // Subtle breathing float
    if (floatRef.current) {
      floatRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.3) * 0.06;
    }
  });

  return (
    <group ref={groupRef}>
      <group ref={floatRef}>
        {/* Cascading Metallic Slabs (Inspire from user reference) */}
        <group position={[0.6, 0, -0.4]}>
          {[0, 1, 2, 3, 4, 5].map((idx) => (
            <mesh
              key={idx}
              geometry={slabGeometry}
              material={slabMaterial}
              position={[idx * 0.38, 0.2 - idx * 0.18, -idx * 0.58]}
              rotation={[-0.06, -0.42, 0.04]}
              scale={1 - idx * 0.05}
              castShadow
              receiveShadow
            />
          ))}
        </group>

        {/* Floating Solid Glossy CN Monogram in Front */}
        <group position={[-0.8, 0.1, 0.7]} scale={0.78}>
          <mesh
            geometry={cGeometry}
            material={monogramMaterial}
            position={[-0.85, 0, 0]}
            castShadow
            receiveShadow
          />
          <mesh
            geometry={nGeometry}
            material={monogramMaterial}
            position={[0.85, 0, 0]}
            castShadow
            receiveShadow
          />
        </group>
      </group>
    </group>
  );
}

export default function Hero3DCanvas() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = window.innerHeight * 1.5;
      const progress = Math.min(window.scrollY / maxScroll, 2);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 0, 6.8], fov: 42 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.25,
        }}
      >
        <ambientLight intensity={0.5} color="#C5D45A" />

        {/* Studio Directional Key & Rim Lights */}
        <directionalLight
          position={[7, 9, 8]}
          intensity={2.8}
          color="#F2F3EE"
          castShadow
        />
        <directionalLight
          position={[-6, -4, -3]}
          intensity={1.2}
          color="#789024"
        />
        <spotLight
          position={[4, 8, 4]}
          intensity={2.2}
          angle={0.65}
          penumbra={0.9}
          color="#C5D45A"
        />
        <pointLight position={[0, -2, 3]} intensity={1.0} color="#94AB32" />

        <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.25}>
          <CascadingSculpture scrollProgress={scrollProgress} />
        </Float>

        {/* Soft ground contact shadow */}
        <ContactShadows
          position={[0, -2.6, 0]}
          opacity={0.5}
          scale={8}
          blur={2.5}
          far={5}
          color="#050506"
        />
      </Canvas>
    </div>
  );
}
