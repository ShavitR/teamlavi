'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, MeshDistortMaterial, Float, Sphere, PerspectiveCamera } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

function Core() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        const t = state.clock.getElapsedTime();
        meshRef.current.rotation.x = t * 0.2;
        meshRef.current.rotation.y = t * 0.3;

        // Dynamic floating motion
        meshRef.current.position.y = Math.sin(t * 0.5) * 0.2;
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <Sphere ref={meshRef} args={[1, 64, 64]}>
                <MeshDistortMaterial
                    color="#C5A059"
                    speed={3}
                    distort={0.4}
                    radius={1}
                    metalness={1}
                    roughness={0.1}
                    emissive="#8B6D31"
                    emissiveIntensity={0.2}
                />
            </Sphere>
        </Float>
    );
}

function InnerSoul() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        meshRef.current.rotation.z += 0.01;
    });

    return (
        <mesh ref={meshRef}>
            <icosahedronGeometry args={[1.5, 15]} />
            <meshStandardMaterial
                color="#ffffff"
                wireframe
                transparent
                opacity={0.05}
            />
        </mesh>
    );
}

export default function LionCore() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
            <Canvas dpr={[1, 2]}>
                <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#C5A059" />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ffffff" />

                <Core />
                <InnerSoul />

                <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
            </Canvas>
        </div>
    );
}
