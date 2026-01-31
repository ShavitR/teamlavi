'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import FloatingLogo3D from './FloatingLogo3D';

export default function HomeCTA() {
    return (
        <section className="py-64 relative overflow-hidden bg-black">
            {/* Dynamic Background */}
            <div className="absolute inset-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-30">
                    <FloatingLogo3D />
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[#C5A059]/10 rounded-full blur-[150px] animate-pulse" />
                <div className="absolute inset-0 bg-white/[0.01] pointer-events-none" />
            </div>

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-5xl mx-auto"
                >
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-[#C5A059] font-black uppercase tracking-[0.5em] text-sm mb-12 block"
                    >
                        Are you ready?
                    </motion.span>

                    <h2 className="text-[12vw] sm:text-8xl md:text-[11vw] font-black text-white mb-16 tracking-tighter leading-[0.8] uppercase italic flex flex-col items-center">
                        <span className="relative">BECOME</span>
                        <span className="text-[#C5A059] drop-shadow-[0_0_80px_rgba(197,160,89,0.3)] relative">UNSTOPPABLE</span>
                    </h2>

                    <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link
                                href="/contact"
                                className="relative px-16 py-8 bg-white text-black font-black text-2xl rounded-full uppercase tracking-tighter transition-all hover:bg-zinc-200 group overflow-hidden block"
                            >
                                <span className="relative z-10">הזמן אימון חינם</span>
                                <div className="absolute inset-0 bg-[#D4AF37] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                            </Link>
                        </motion.div>

                        <Link href="/classes" className="text-white font-bold text-xl hover:text-[#C5A059] transition-colors border-b-2 border-white/10 pb-2">
                            ראה את כל הקבוצות
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Cinematic Scanline effect */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-white/[0.02] to-transparent h-px top-1/2 animate-scanline" />
        </section>
    );
}
