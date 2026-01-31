'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshWobbleMaterial, Sparkles } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function LaviIcon() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        meshRef.current.rotation.y += 0.005;
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh ref={meshRef}>
                <torusKnotGeometry args={[1, 0.3, 200, 32]} />
                <MeshWobbleMaterial
                    color="#C5A059"
                    factor={0.1}
                    speed={1}
                    metalness={1}
                    roughness={0.1}
                />
            </mesh>
            <Sparkles count={50} scale={3} size={2} speed={0.4} color="#C5A059" />
        </Float>
    );
}

export default function FloatingLogo3D() {
    return (
        <div className="w-full h-[400px] mb-12">
            <Canvas camera={{ position: [0, 0, 5] }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#C5A059" />
                <LaviIcon />
            </Canvas>
        </div>
    );
}
