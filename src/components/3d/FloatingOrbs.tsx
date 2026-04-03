import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const FloatingOrbs = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      const { mouse } = state;
      // Parallax: move opposite to mouse
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, -mouse.x * 2, 0.1);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, -mouse.y * 1.5, 0.1);
      
      // Gentle rotation
      groupRef.current.rotation.y += 0.005;
      groupRef.current.rotation.x += 0.003;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Large distorted orb */}
      <Sphere args={[1.2, 64, 64]} position={[-4, 2, -5]}>
        <MeshDistortMaterial
          color="#ff3366"
          distort={0.6}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          emissive="#330011"
        />
      </Sphere>
      
      {/* Metallic orb */}
      <Sphere args={[0.8, 64, 64]} position={[4, -2, -6]}>
        <MeshDistortMaterial
          color="#44aaff"
          distort={0.4}
          speed={1.5}
          roughness={0.1}
          metalness={0.9}
        />
      </Sphere>
      
      {/* Small glowing orb */}
      <Sphere args={[0.5, 32, 32]} position={[0, 4, -8]}>
        <MeshDistortMaterial
          color="#ffaa33"
          distort={0.8}
          speed={3}
          emissive="#442200"
          transparent
          opacity={0.5}
        />
      </Sphere>
    </group>
  );
};

export default FloatingOrbs;
