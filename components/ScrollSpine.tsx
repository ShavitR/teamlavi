'use client';

import { motion, useSpring, useTransform, MotionValue } from 'framer-motion';

interface ScrollSpineProps {
    progress: MotionValue<number>;
    beatPositions: number[];
}

export default function ScrollSpine({ progress, beatPositions }: ScrollSpineProps) {
    const scaleY = useSpring(progress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px z-10 pointer-events-none block">
            {/* Base Path (faint) */}
            <div className="absolute inset-0 bg-white/5" />

            {/* Growing Spine */}
            <motion.div
                style={{
                    scaleY,
                    originY: 0
                }}
                className="absolute inset-0 bg-gradient-to-b from-[#C5A059] via-[#D4AF37] to-white/20 shadow-[0_0_15px_rgba(197,160,89,0.5)]"
            >
                {/* Traveling Glow Pulse */}
                <motion.div
                    animate={{
                        top: ["0%", "100%"],
                        opacity: [0, 1, 0]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute w-[3px] -left-px h-20 bg-white blur-[2px]"
                />
            </motion.div>

            {/* Vertebrae (Nodes) - positioned relative to beats */}
            <div className="absolute inset-0">
                {beatPositions.map((pos, i) => (
                    <div
                        key={i}
                        className="absolute w-full flex items-center justify-center p-0"
                        style={{ top: `${pos * 100}%` }}
                    >
                        <Vertebra threshold={pos} progress={progress} />
                    </div>
                ))}
            </div>
        </div>
    );
}

function Vertebra({ threshold, progress }: { threshold: number, progress: MotionValue<number> }) {
    const opacity = useTransform(progress, [threshold - 0.05, threshold], [0.2, 1]);
    const scale = useTransform(progress, [threshold - 0.05, threshold], [0.8, 1.2]);
    const glow = useTransform(progress, [threshold - 0.05, threshold], [0, 1]);
    const rotate = useTransform(progress, [threshold - 0.1, threshold], [0, 45]);

    return (
        <motion.div
            style={{ opacity, scale, rotate }}
            className="relative flex items-center justify-center -translate-y-1/2"
        >
            {/* Outer Diamond */}
            <div className="w-5 h-5 border border-[#C5A059]/40 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                {/* Inner Core */}
                <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                        boxShadow: useTransform(glow, [0, 1], ["0 0 0px gold", "0 0 20px gold"])
                    }}
                    className="w-2 h-2 bg-[#C5A059] rounded-full"
                />
            </div>

            {/* Subtle Horizontal Leading Lines */}
            <motion.div
                style={{ scaleX: glow }}
                className="absolute left-full ml-4 w-16 h-[0.5px] bg-gradient-to-r from-[#C5A059]/40 to-transparent origin-left"
            />
            <motion.div
                style={{ scaleX: glow }}
                className="absolute right-full mr-4 w-16 h-[0.5px] bg-gradient-to-l from-[#C5A059]/40 to-transparent origin-right"
            />
        </motion.div>
    );
}
