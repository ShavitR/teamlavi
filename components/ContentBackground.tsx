'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';
import WebGLFluidBackground from './WebGLFluidBackground';

export default function ContentBackground() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const particles = useMemo(() => {
        if (!mounted) return [];
        return Array.from({ length: 30 }).map(() => ({
            x: Math.random() * 120 - 10 + "%",
            y: Math.random() * 120 - 10 + "%",
            opacity: Math.random() * 0.5,
            duration: Math.random() * 20 + 20,
            delay: Math.random() * 10,
            yDist: (Math.random() * -300 - 150) + "px",
            xDist: (Math.random() * 60 - 30) + "px"
        }));
    }, [mounted]);

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            <WebGLFluidBackground />
            {/* Animated Glows */}
            <motion.div
                animate={{
                    x: [0, 100, 0],
                    y: [0, 50, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] bg-[#C5A059]/10 rounded-full blur-[180px]"
            />

            <motion.div
                animate={{
                    x: [0, -80, 0],
                    y: [0, 100, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                }}
                className="absolute bottom-1/4 -right-1/4 w-[900px] h-[900px] bg-white/5 rounded-full blur-[200px]"
            />

            <motion.div
                animate={{
                    opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(197,160,89,0.05),transparent_70%)]"
            />

            {/* Floating Dust Particles - Hydration Safe */}
            <div className="absolute inset-0 opacity-30">
                {particles.map((p, i) => (
                    <motion.div
                        key={i}
                        initial={{
                            x: p.x,
                            y: p.y,
                            opacity: p.opacity
                        }}
                        animate={{
                            y: [null, p.yDist],
                            x: [null, p.xDist],
                            opacity: [0, 0.8, 0],
                        }}
                        transition={{
                            duration: p.duration,
                            repeat: Infinity,
                            ease: "linear",
                            delay: p.delay
                        }}
                        className="absolute w-1 h-1 bg-white rounded-full blur-[1px]"
                    />
                ))}
            </div>

            {/* Cinematic Noise Texture */}
            <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />
        </div>
    );
}
