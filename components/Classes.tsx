'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import ContentBackground from '@/components/ContentBackground';

const disciplines = [
    {
        id: 'mma',
        title: 'MMA',
        subtitle: 'The Ultimate Hybrid',
        desc: 'שילוב של לחימה בעמידה וקרקע. האימון המקיף ביותר המכין את הלוחם לזירה ולמצבי אמת. כאן הכל מתחבר.',
        video: 'https://cdn.pixabay.com/video/2021/01/29/63503-506992631_large.mp4',
        image: '/images/MMA.jpg',
        gridSpan: 'md:col-span-2 md:row-span-2',
        accent: 'from-[#C5A059] to-[#8B6D31]',
        placeholderLabel: 'MMA'
    },
    {
        id: 'bjj',
        title: 'BJJ',
        subtitle: 'The Human Chess',
        desc: 'ג\'יו ג\'יטסו ברזילאי. לחימת קרקע חכמה, בריחים וחניקות. מתמקד בשליטה וטכניקה על פני כוח.',
        video: 'https://cdn.pixabay.com/video/2021/04/12/70868-537443152_large.mp4',
        image: '/images/bjj.jpg',
        gridSpan: 'md:col-span-1 md:row-span-1',
        accent: 'from-zinc-400 to-zinc-600',
        placeholderLabel: 'ג\'יו ג\'יטסו'
    },
    {
        id: 'muay-thai',
        title: 'MUAY THAI',
        subtitle: 'Art of 8 Limbs',
        desc: 'אמנות 8 הגפיים. שימוש באגרופים, מרפקים, ברכיים ובעיטות. עוצמה, דיוק וקצב.',
        video: 'https://cdn.pixabay.com/video/2016/09/20/5316-183794301_large.mp4',
        image: '/images/muaythai.jpg',
        gridSpan: 'md:col-span-1 md:row-span-2',
        accent: 'from-[#C5A059] to-transparent',
        placeholderLabel: 'מואי תאי'
    },
    {
        id: 'self-defense',
        title: 'DEFENSE',
        subtitle: 'Reality Based',
        desc: 'מיומנויות מעשיות לחיים. בניית ביטחון עצמי ויכולת תגובה למצבי דחק. הגנה עצמית מודרנית.',
        video: 'https://cdn.pixabay.com/video/2016/03/17/2422-158301549_large.mp4',
        image: '/images/defence.jpg',
        gridSpan: 'md:col-span-2 md:row-span-1',
        accent: 'from-zinc-800 to-black',
        placeholderLabel: 'הגנה עצמית'
    },
    {
        id: 'youth',
        title: 'YOUTH',
        subtitle: 'Tomorrow\'s Warriors',
        desc: 'פיתוח קורדינציה, משמעת וביטחון עצמי באווירה תומכת ומהנה עבור הדור הבא.',
        video: 'https://cdn.pixabay.com/video/2024/05/26/213797_large.mp4',
        image: '/images/youth.jpg',
        gridSpan: 'md:col-span-3 md:row-span-1',
        accent: 'from-white/20 to-transparent',
        placeholderLabel: 'ילדים ונוער'
    }
];

export default function Classes() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start']
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, -200]);

    return (
        <section ref={containerRef} id="classes" className="py-40 bg-black relative overflow-hidden">
            <ContentBackground />

            <div className="container mx-auto px-6 relative z-10">
                <header className="mb-32 flex flex-col items-center text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-[#C5A059] font-black uppercase tracking-[0.5em] text-xs mb-6 block">Elite Disciplines</span>
                        <h2 className="text-7xl md:text-9xl font-black text-white mb-8 tracking-tighter uppercase italic">
                            שיטות <span className="text-transparent border-text">אימון</span>
                        </h2>
                        <div className="h-1 w-32 bg-[#C5A059] rounded-full" />
                    </motion.div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-4 gap-8 min-h-[1400px]">
                    {disciplines.map((d, i) => (
                        <ClassCard key={d.id} discipline={d} index={i} />
                    ))}
                </div>
            </div>

            <style jsx>{`
                .border-text {
                    -webkit-text-stroke: 1px rgba(255, 255, 255, 0.4);
                }
            `}</style>
        </section>
    );
}

function ClassCard({ discipline, index }: { discipline: any, index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className={`group relative overflow-hidden rounded-[3rem] bg-zinc-900 border border-white/5 cursor-pointer ${discipline.gridSpan}`}
        >
            {/* Media Layer */}
            <div className="absolute inset-0 z-0 bg-zinc-950 flex items-center justify-center">
                <Image
                    src={discipline.image}
                    alt={discipline.title}
                    fill
                    className="object-cover opacity-60 transition-transform duration-[1.5s] group-hover:scale-110 grayscale group-hover:grayscale-0"
                />

                {/* Fallback Placeholder Text (Hebrew) */}
                <div className="absolute inset-0 flex items-center justify-center p-12 text-center select-none pointer-events-none">
                    <span className="text-white/10 font-black text-6xl md:text-8xl lg:text-9xl uppercase italic tracking-tighter transform -rotate-12 group-hover:opacity-0 transition-opacity duration-700">
                        {discipline.placeholderLabel}
                    </span>
                </div>

                {/* Video Hover Overlay */}
                <video
                    className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-60 transition-opacity duration-700"
                    autoPlay
                    loop
                    muted
                    playsInline
                >
                    <source src={discipline.video} type="video/mp4" />
                </video>

                {/* Gradient Masks */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className={`absolute inset-0 bg-gradient-to-br ${discipline.accent} opacity-10 group-hover:opacity-20 transition-opacity`} />
            </div>

            {/* Content Layer */}
            <div className="absolute inset-0 z-10 p-10 flex flex-col justify-end">
                <motion.span
                    className="text-[#C5A059] font-black text-xs uppercase tracking-[0.3em] mb-2 opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500"
                >
                    {discipline.subtitle}
                </motion.span>
                <h3 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tighter uppercase italic translate-y-8 group-hover:translate-y-0 transition-transform duration-700">
                    {discipline.title}
                </h3>

                <div className="max-h-0 opacity-0 group-hover:max-h-40 group-hover:opacity-100 transition-all duration-700 overflow-hidden">
                    <p className="text-gray-300 text-lg leading-relaxed mb-6 max-w-sm">
                        {discipline.desc}
                    </p>
                    <div className="flex items-center gap-4 text-white font-black uppercase text-[10px] tracking-widest">
                        <span>Learn More</span>
                        <div className="flex-1 h-px bg-white/20 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                    </div>
                </div>
            </div>

            {/* Scanline Effect */}
            <div className="absolute inset-0 pointer-events-none opacity-5 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] z-20" style={{ backgroundSize: '100% 4px' }} />
        </motion.div>
    );
}
