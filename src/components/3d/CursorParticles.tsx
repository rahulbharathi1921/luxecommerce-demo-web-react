import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const CursorParticles = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const { mouse, viewport } = useThree();
  
  // Create 2000 random particles in a sphere
  const particleCount = 2000;
  const positions = useMemo(() => {
    const arr = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      // Sphere distribution
      const radius = 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i*3] = radius * Math.sin(phi) * Math.cos(theta);
      arr[i*3+1] = radius * Math.sin(phi) * Math.sin(theta);
      arr[i*3+2] = radius * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame(() => {
    if (pointsRef.current) {
      // Map mouse coordinates (-1 to 1) to world position
      const targetX = mouse.x * (viewport.width / 2);
      const targetY = mouse.y * (viewport.height / 2);
      
      // Smoothly move particles toward cursor with spring effect
      pointsRef.current.position.x += (targetX - pointsRef.current.position.x) * 0.05;
      pointsRef.current.position.y += (targetY - pointsRef.current.position.y) * 0.05;
      
      // Rotate particles for extra flair
      pointsRef.current.rotation.y += 0.002;
      pointsRef.current.rotation.x += 0.001;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ff66cc"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.4}
      />
    </Points>
  );
};

export default CursorParticles;
