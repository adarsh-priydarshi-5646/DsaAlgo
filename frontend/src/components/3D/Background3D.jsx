import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function Background3D() {
  const ref = useRef();
  
  // Generate random points for the particle system
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(5000 * 3);
    const colors = new Float32Array(5000 * 3);
    
    for (let i = 0; i < 5000; i++) {
      // Random positions in a sphere
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 20;
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      
      // Purple/blue gradient colors
      const color = new THREE.Color();
      color.setHSL(0.7 + Math.random() * 0.2, 0.8, 0.5 + Math.random() * 0.3);
      
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    
    return [positions, colors];
  }, []);

  // Animate the particles
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.1;
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.05) * 0.05;
    }
  });

  return (
    <>
      {/* Ambient lighting */}
      <ambientLight intensity={0.3} />
      
      {/* Directional light */}
      <directionalLight position={[10, 10, 5]} intensity={0.5} />
      
      {/* Particle system */}
      <Points ref={ref} positions={positions} colors={colors}>
        <PointMaterial
          transparent
          vertexColors
          size={0.02}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
      
      {/* Floating geometric shapes */}
      <FloatingShapes />
    </>
  );
}

function FloatingShapes() {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Floating cubes */}
      {Array.from({ length: 8 }, (_, i) => (
        <FloatingCube key={i} position={[
          Math.sin(i * 0.8) * 8,
          Math.cos(i * 0.6) * 6,
          Math.sin(i * 0.4) * 10
        ]} />
      ))}
      
      {/* Floating spheres */}
      {Array.from({ length: 6 }, (_, i) => (
        <FloatingSphere key={i} position={[
          Math.cos(i * 1.2) * 12,
          Math.sin(i * 0.9) * 8,
          Math.cos(i * 0.7) * 15
        ]} />
      ))}
    </group>
  );
}

function FloatingCube({ position }) {
  const ref = useRef();
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.5;
      ref.current.rotation.y = state.clock.elapsedTime * 0.3;
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.5;
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial 
        color="#8B5CF6" 
        transparent 
        opacity={0.3}
        wireframe
      />
    </mesh>
  );
}

function FloatingSphere({ position }) {
  const ref = useRef();
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.2;
      ref.current.rotation.z = state.clock.elapsedTime * 0.4;
      ref.current.position.y = position[1] + Math.cos(state.clock.elapsedTime + position[0]) * 0.8;
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.3, 16, 16]} />
      <meshStandardMaterial 
        color="#3B82F6" 
        transparent 
        opacity={0.4}
        wireframe
      />
    </mesh>
  );
}

export default Background3D;
