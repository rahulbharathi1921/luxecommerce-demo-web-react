import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Float, MeshDistortMaterial } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';

const Model = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.x = Math.cos(time / 4) / 8;
    meshRef.current.rotation.y = Math.sin(time / 4) / 8;
    meshRef.current.position.y = Math.sin(time / 2) / 10;
  });

  return (
    <Float speed={5} rotationIntensity={2} floatIntensity={2}>
      <mesh ref={meshRef} scale={1.8}>
        <torusKnotGeometry args={[1, 0.3, 256, 64]} />
        <MeshDistortMaterial
          color="#ffffff"
          roughness={0.1}
          metalness={1}
          distort={0.4}
          speed={2}
        />
      </mesh>
    </Float>
  );
};

const FloatingModel = () => (
  <div className="w-full max-w-[500px] h-[350px] md:h-[450px] lg:h-[500px] flex items-center justify-center cursor-grab active:cursor-grabbing">
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, 2]}
      style={{ position: 'relative', width: '100%', height: '100%' }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
        <pointLight position={[-10, -10, -10]} intensity={1} />
        <Model />
        <OrbitControls
          enableZoom={false}
          autoRotate
          autoRotateSpeed={0.5}
          enableDamping
          dampingFactor={0.05}
        />
        <Environment preset="studio" />
      </Suspense>
    </Canvas>
  </div>
);

export default FloatingModel;
