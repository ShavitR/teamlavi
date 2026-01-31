'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import LionCore from '@/components/LionCore';

const stats = [
    { label: 'שנות ניסיון', value: '15+', icon: '⌛' },
    { label: 'לוחמים פעילים', value: '250+', icon: '🥋' },
    { label: 'אליפויות', value: '12', icon: '🏆' },
    { label: 'קבוצות אימון', value: '8', icon: '👥' }
];

export default function Stats() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start']
    });

    const xLeft = useTransform(scrollYProgress, [0, 1], [-500, 500]);
    const xRight = useTransform(scrollYProgress, [0, 1], [500, -500]);

    return (
        <section ref={containerRef} className="py-64 bg-[#050505] overflow-hidden relative border-y border-white/5">
            <LionCore />
            {/* Massive Background Moving Text - Multi layered */}
            <div className="absolute inset-0 flex flex-col justify-center gap-12 opacity-[0.03] pointer-events-none select-none">
                <motion.div style={{ x: xLeft }} className="text-[25vw] font-black whitespace-nowrap leading-none text-white italic">
                    TEAM LAVI ACADEMY TEAM LAVI ACADEMY
                </motion.div>
                <motion.div style={{ x: xRight }} className="text-[25vw] font-black whitespace-nowrap leading-none text-white italic">
                    UNLEASH THE LION UNLEASH THE LION
                </motion.div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-20 md:gap-12">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 1,
                                delay: i * 0.1,
                                ease: [0.16, 1, 0.3, 1]
                            }}
                            className="relative text-center"
                        >
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-4xl opacity-20 filter grayscale hover:grayscale-0 transition-all">
                                {stat.icon}
                            </div>
                            <div className="text-7xl md:text-9xl font-black text-white mb-2 tracking-tighter drop-shadow-2xl">
                                {stat.value}
                            </div>
                            <div className="text-[#C5A059] font-black uppercase tracking-[0.3em] text-xs md:text-sm">
                                {stat.label}
                            </div>

                            {/* Hover accent */}
                            <motion.div
                                className="absolute -bottom-4 left-1/2 -translate-x-1/2 h-1 bg-white/20 rounded-full"
                                initial={{ width: 0 }}
                                whileInView={{ width: 48 }}
                                viewport={{ once: true }}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* High-end lighting overlays */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#050505] to-transparent z-10" />
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#050505] to-transparent z-10" />
        </section>
    );
}
