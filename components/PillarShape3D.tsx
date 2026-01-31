'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshWobbleMaterial, Text, PerspectiveCamera } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function Temple3D() {
    return (
        <group>
            {/* Simple Temple Representation: Base, Columns, Roof */}
            <mesh position={[0, -0.6, 0]}>
                <boxGeometry args={[1.5, 0.2, 1]} />
                <meshStandardMaterial color="#C5A059" metalness={0.8} roughness={0.2} />
            </mesh>
            <mesh position={[-0.5, -0.1, 0.3]}>
                <cylinderGeometry args={[0.05, 0.05, 1]} />
                <meshStandardMaterial color="#C5A059" metalness={0.8} roughness={0.2} />
            </mesh>
            <mesh position={[0.5, -0.1, 0.3]}>
                <cylinderGeometry args={[0.05, 0.05, 1]} />
                <meshStandardMaterial color="#C5A059" metalness={0.8} roughness={0.2} />
            </mesh>
            <mesh position={[-0.5, -0.1, -0.3]}>
                <cylinderGeometry args={[0.05, 0.05, 1]} />
                <meshStandardMaterial color="#C5A059" metalness={0.8} roughness={0.2} />
            </mesh>
            <mesh position={[0.5, -0.1, -0.3]}>
                <cylinderGeometry args={[0.05, 0.05, 1]} />
                <meshStandardMaterial color="#C5A059" metalness={0.8} roughness={0.2} />
            </mesh>
            <mesh position={[0, 0.5, 0]} rotation={[0, 0, 0]}>
                <coneGeometry args={[1.1, 0.5, 4]} />
                <meshStandardMaterial color="#C5A059" metalness={0.8} roughness={0.2} />
            </mesh>
        </group>
    );
}

function Fire3D() {
    const meshRef = useRef<THREE.Mesh>(null);
    useFrame((state) => {
        if (!meshRef.current) return;
        meshRef.current.rotation.y += 0.05;
    });
    return (
        <mesh ref={meshRef}>
            <octahedronGeometry args={[0.8, 1]} />
            <MeshWobbleMaterial
                color="#ff4d00"
                emissive="#C5A059"
                emissiveIntensity={1}
                factor={1}
                speed={5}
            />
        </mesh>
    );
}

function Handshake3D() {
    return (
        <group>
            {/* Abstract Handshake: Two Interlocking Rings */}
            <mesh rotation={[Math.PI / 2, 0, 0]} position={[-0.3, 0, 0]}>
                <torusGeometry args={[0.5, 0.15, 16, 100]} />
                <meshStandardMaterial color="#C5A059" metalness={0.9} roughness={0.1} />
            </mesh>
            <mesh rotation={[Math.PI / 2, Math.PI / 2, 0]} position={[0.3, 0, 0]}>
                <torusGeometry args={[0.5, 0.15, 16, 100]} />
                <meshStandardMaterial color="#ffffff" metalness={0.9} roughness={0.1} />
            </mesh>
        </group>
    );
}

export default function PillarShape3D({ type }: { type: number }) {
    const groupRef = useRef<THREE.Group>(null);

    return (
        <div className="w-32 h-32 mb-8">
            <Canvas camera={{ position: [0, 0, 4] }}>
                <ambientLight intensity={0.6} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#C5A059" />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ffffff" />

                <Float speed={4} rotationIntensity={1} floatIntensity={1}>
                    <group ref={groupRef}>
                        {type === 0 && <Temple3D />}
                        {type === 1 && <Fire3D />}
                        {type === 2 && <Handshake3D />}
                    </group>
                </Float>
            </Canvas>
        </div>
    );
}
