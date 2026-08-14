import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  OrbitControls,
  Sphere,
  MeshDistortMaterial,
  Float,
  Html,
} from "@react-three/drei";

import CanvasLoader from "../Loader";

const CodeParticles = () => {
  const count = 150;
  const particlesRef = useRef();

  useEffect(() => {
    if (!particlesRef.current) return;

    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phiInput = Math.max(-1, Math.min(1, Math.random() * 2 - 1));
      const phi = Math.acos(phiInput);
      const radius = 3 + Math.random() * 2;

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      positions[i * 3] = Number.isFinite(x) ? x : 0;
      positions[i * 3 + 1] = Number.isFinite(y) ? y : 0;
      positions[i * 3 + 2] = Number.isFinite(z) ? z : 0;

      const colorChoice = Math.random();
      if (colorChoice < 0.5) {
        colors[i * 3] = 0.5 + Math.random() * 0.5;
        colors[i * 3 + 1] = 0.2 + Math.random() * 0.3;
        colors[i * 3 + 2] = 1.0;
      } else {
        colors[i * 3] = 0.0;
        colors[i * 3 + 1] = 0.8 + Math.random() * 0.2;
        colors[i * 3 + 2] = 1.0;
      }
    }

    const geometry = particlesRef.current.geometry;
    if (geometry) {
      const positionAttribute = new THREE.BufferAttribute(positions, 3);
      const colorAttribute = new THREE.BufferAttribute(colors, 3);

      geometry.setAttribute("position", positionAttribute);
      geometry.setAttribute("color", colorAttribute);
      geometry.computeBoundingSphere();
    }
  }, [count]);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry />
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
};

const CodeRings = () => {
  const ringRef1 = useRef();
  const ringRef2 = useRef();
  const ringRef3 = useRef();

  useFrame((state) => {
    if (ringRef1.current) {
      ringRef1.current.rotation.z = state.clock.elapsedTime * 0.3;
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.y = state.clock.elapsedTime * 0.4;
    }
    if (ringRef3.current) {
      ringRef3.current.rotation.x = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group>
      <mesh ref={ringRef1} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.5, 0.02, 16, 100]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={0.5}
        />
      </mesh>
      <mesh ref={ringRef2} rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[2.8, 0.02, 16, 100]} />
        <meshStandardMaterial
          color="#d1d5db"
          emissive="#d1d5db"
          emissiveIntensity={0.5}
        />
      </mesh>
      <mesh ref={ringRef3} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
        <torusGeometry args={[3.1, 0.02, 16, 100]} />
        <meshStandardMaterial
          color="#9ca3af"
          emissive="#9ca3af"
          emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  );
};

const CodeSymbols = ({ isMobile }) => {
  const symbols = [
    "< />",
    "{ }",
    "[ ]",
    "( )",
    "fn",
    "if",
    "=",
    "+",
    "*",
    "&&",
  ];

  return (
    <group>
      {symbols.map((symbol, index) => {
        const angle = (index / symbols.length) * Math.PI * 2;
        const radius = 3.5;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = Math.sin(index * 2) * 0.5;

        return (
          <Float
            key={symbol + index}
            speed={1.5 + index * 0.1}
            rotationIntensity={0.5}
            floatIntensity={1}
          >
            <Html
              position={[x, y, z]}
              center
              distanceFactor={8}
              style={{
                pointerEvents: "none",
                userSelect: "none",
              }}
            >
              <div
                style={{
                  color: index % 2 === 0 ? "#ffffff" : "#d1d5db",
                  fontSize: isMobile ? "20px" : "24px",
                  fontWeight: "bold",
                  fontFamily: "monospace",
                  textShadow: "0 0 10px currentColor",
                  background: "transparent",
                }}
              >
                {symbol}
              </div>
            </Html>
          </Float>
        );
      })}
    </group>
  );
};

const CodeSphere = ({ isMobile }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <Sphere ref={meshRef} args={[1.8, 64, 64]} scale={isMobile ? 0.7 : 1}>
          <MeshDistortMaterial
            color="#ffffff"
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0.2}
            metalness={0.8}
            emissive="#ffffff"
            emissiveIntensity={0.4}
            wireframe={false}
          />
        </Sphere>
      </Float>

      <CodeRings />

      <CodeSymbols isMobile={isMobile} />

      <CodeParticles />

      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#d1d5db" />
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={1.5}
        color="#ffffff"
      />
      <hemisphereLight intensity={0.3} groundColor="#151030" />
    </group>
  );
};

const CodeSphereCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop="always"
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 0, 8], fov: 50 }}
      gl={{
        preserveDrawingBuffer: true,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      }}
      onCreated={() => setIsLoaded(true)}
      style={{
        width: "100%",
        height: "100%",
        display: "block",
        background: "transparent",
        position: "absolute",
        top: 0,
        left: 0,
      }}
    >
      <Suspense fallback={isLoaded ? null : <CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          autoRotate
          autoRotateSpeed={1}
        />
        <CodeSphere isMobile={isMobile} />
      </Suspense>
    </Canvas>
  );
};

export default CodeSphereCanvas;
