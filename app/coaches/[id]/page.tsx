'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import ContentBackground from '@/components/ContentBackground';

const coachesData = {
    'amos-lavi': {
        name: 'עמוס לביא',
        role: 'מייסד ומאמן ראשי',
        image: '/images/amostrain.jpg',
        videoPlaceholder: '/videos/amirtrain.mp4',
        specialties: ['MMA', 'BJJ', 'Muay Thai'],
        stats: [
            { label: 'קרבות מקצועיים', value: 12, suffix: '' },
            { label: 'שנות אימון', value: 15, suffix: '+' },
            { label: 'חגורה', value: 0, prefix: 'שחורה', suffix: '' }
        ],
        bio: 'עמוס לביא הוא הדמות המרכזית מאחורי האקדמיה. עם ניסיון של מעל עשור בזירות המובילות בעולם, הוא מביא גישה מדעית ומדויקת ללחימה. החזון שלו הוא לבנות לא רק לוחמים, אלא בני אדם חזקים וערכיים.',
        philosophy: 'הזירה היא רק ההשתקפות של העבודה הקשה בחדר האימונים. אין קיצורי דרך למצוינות.',
        spiritName: 'THE COMMANDER'
    },
    'amir-ben-nun': {
        name: 'אמיר בן נון',
        role: 'מאמן סטרייקינג',
        image: '/images/amirtrainlowkickdefence.jpg',
        videoPlaceholder: '/videos/amirtrain.mp4',
        specialties: ['Kickboxing', 'Muay Thai', 'Striking'],
        stats: [
            { label: 'קרבות מקצועיים', value: 8, suffix: '' },
            { label: 'שנות אימון', value: 10, suffix: '+' },
            { label: 'חגורה', value: 0, prefix: 'שחורה', suffix: '' }
        ],
        bio: 'מומחה לחימה בעמידה, מתמחה בטכניקות סטרייקינג מתקדמות ושיפור יכולות התנועה והתקפה. אמיר ידוע בגישה חדה ומדויקת להוראת לוחמה בעמידה.',
        philosophy: 'סטרייקינג הוא אמנות המרווח והתזמון. המכה המנצחת היא זו שהיריב לא רואה.',
        spiritName: 'THE THUNDER'
    },
    'maor-issachar': {
        name: 'מאור יששכר',
        role: 'מאמן BJJ',
        image: '/images/maorissachar.png',
        videoPlaceholder: 'https://cdn.pixabay.com/video/2016/09/20/5316-183794301_large.mp4',
        specialties: ['BJJ', 'Ground Game', 'Grappling'],
        stats: [
            { label: 'אליפויות', value: 3, suffix: '' },
            { label: 'שנות אימון', value: 6, suffix: '+' },
            { label: 'חגורה', value: 0, prefix: 'שחורה', suffix: '' }
        ],
        bio: 'מומחה לג\'יו-ג\'יטסו ברזילאי, שם דגש על הבנה עמוקה של מכניקת הגוף ואסטרטגיית קרקע חכמה. מאור מוביל את תחום הקרקע באקדמיה עם טכניקה ללא פשרות.',
        philosophy: 'הקרקע היא הבית שלי. בקרב קרקע, מי ששולט בנשימה שולט בקרב.',
        spiritName: 'THE PREDATOR'
    },
    'yan-gard': {
        name: 'יאן גארד',
        role: 'מאמן היאבקות',
        image: '/images/yangard.png',
        videoPlaceholder: 'https://cdn.pixabay.com/video/2021/04/12/70868-537443152_large.mp4',
        specialties: ['Wrestling', 'Takedowns', 'Control'],
        stats: [
            { label: 'זכיות', value: 5, suffix: '' },
            { label: 'שנות אימון', value: 12, suffix: '+' },
            { label: 'חגורה', value: 0, prefix: 'נבחרת', suffix: '' }
        ],
        bio: 'מומחה היאבקות, מתמחה בטכניקות הפלה ושליטה בקרקע, מביא ניסיון עשיר מהנבחרות המובילות. יאן מביא איתו את קשיחות ההיאבקות הקלאסית לתוך עולם ה-MMA.',
        philosophy: 'היאבקות היא הבסיס לכל שליטה. אם אתה לא יכול להוריד אותו, אתה לא יכול לנצח אותו.',
        spiritName: 'THE ANCHOR'
    },
    'hillel-litman': {
        name: 'הילל ליטמן',
        role: 'מאמן ג\'יו ג\'יטסו',
        image: '/images/amostrain2.jpg',
        videoPlaceholder: '/videos/Hilleltrain.mp4',
        specialties: ['BJJ', 'Submission Grappling'],
        stats: [
            { label: 'אליפויות', value: 4, suffix: '' },
            { label: 'שנות אימון', value: 8, suffix: '+' },
            { label: 'חגורה', value: 0, prefix: 'חומה', suffix: '' }
        ],
        bio: 'הילל ליטמן נחשב לאחד המוחות המבריקים בקרב הקרקע באזור. הוא ידוע ביכולת שלו לפרק טכניקות מורכבות לרמה הפשוטה ביותר, מה שהופך אותו למאמן מושלם עבור מתחילים ומקצוענים כאחד.',
        philosophy: 'ג\'יו ג\'יטסו הוא שחמט אנושי. המוח מנצח את הכוח.',
        spiritName: 'THE ARCHITECT'
    }
};

export default function CoachProfile() {
    const { id } = useParams();
    const coach = coachesData[id as keyof typeof coachesData];
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end']
    });

    const scale = useTransform(scrollYProgress, [0, 0.4], [1, 1.2]);
    const opacityHero = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
    const blurHero = useTransform(scrollYProgress, [0, 0.35], [0, 20]);
    const yHero = useTransform(scrollYProgress, [0, 0.35], [0, -100]);
    const xText = useTransform(scrollYProgress, [0, 1], [0, -1000]);

    if (!coach) return <div className="min-h-screen flex items-center justify-center text-white text-3xl font-black bg-black">Profile Not Found</div>;

    return (
        <main ref={containerRef} className="bg-[#050505] min-h-[300vh] relative overflow-x-hidden">

            {/* Cinematic Background Elements */}
            <div className="fixed inset-0 pointer-events-none z-10">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/50 to-[#050505]" />
            </div>

            {/* Sticky Hero */}
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
                <motion.div
                    style={{
                        scale,
                        opacity: opacityHero,
                        filter: useTransform(blurHero, (v) => `blur(${v}px)`)
                    }}
                    className="absolute inset-0 z-0"
                >
                    <video
                        className="w-full h-full object-cover grayscale brightness-50"
                        autoPlay
                        loop
                        muted
                        playsInline
                        poster={coach.image}
                    >
                        <source src={coach.videoPlaceholder} type="video/mp4" />
                    </video>
                </motion.div>

                {/* Parallax Background Name */}
                <motion.div
                    style={{ x: xText }}
                    className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none opacity-5 select-none"
                >
                    <h2 className="text-[40vw] font-black text-white whitespace-nowrap italic outline-text">
                        {coach.name} {coach.name}
                    </h2>
                </motion.div>

                <div className="container mx-auto px-6 md:px-24 z-20 h-full flex flex-col justify-end pb-32">
                    <motion.div
                        style={{ y: yHero, opacity: opacityHero }}
                    >
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-[#C5A059] font-black uppercase tracking-[0.8em] text-xs mb-6 block"
                        >
                            Legendary Instructor
                        </motion.span>
                        <h1 className="text-7xl md:text-[12vw] font-black text-white mb-8 tracking-tighter leading-none uppercase italic">
                            {coach.name.split(' ')[0]} <br />
                            <span className="text-transparent border-text">{coach.name.split(' ')[1]}</span>
                        </h1>

                        <div className="flex items-center gap-12">
                            <div className="h-px w-32 bg-[#C5A059]" />
                            <p className="text-xl md:text-2xl text-gray-400 font-bold uppercase tracking-widest">
                                {coach.role}
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Vertical Scrolling Stats */}
                <div className="absolute left-12 bottom-12 hidden lg:flex flex-col gap-12 z-30">
                    {coach.stats.map((stat, i) => (
                        <StatItem key={stat.label} stat={stat} index={i} progress={scrollYProgress} />
                    ))}
                </div>
            </div>

            {/* Depth Overlay Section */}
            <div className="relative z-20 bg-black pt-64 pb-96 overflow-hidden">
                <ContentBackground />
                {/* SPIRIT TITLE */}
                <div className="container mx-auto px-6 mb-40 text-center">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="inline-block relative"
                    >
                        <h3 className="text-6xl md:text-9xl font-black text-white italic opacity-10 leading-none">
                            {coach.spiritName}
                        </h3>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
                            <h2 className="text-3xl md:text-5xl font-black text-[#C5A059] uppercase tracking-[0.2em]">
                                החזון והדרך
                            </h2>
                        </div>
                    </motion.div>
                </div>

                <div className="container mx-auto max-w-7xl px-6">
                    <div className="grid lg:grid-cols-2 gap-32 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1 }}
                            viewport={{ once: true }}
                        >
                            <p className="text-3xl md:text-5xl font-light text-white leading-tight mb-16 text-balance">
                                "{coach.bio}"
                            </p>

                            <div className="flex gap-4 mb-12">
                                {coach.specialties.map(s => (
                                    <span key={s} className="px-6 py-3 border border-[#C5A059]/30 rounded-full text-[#C5A059] font-black text-sm uppercase tracking-widest bg-[#C5A059]/5 backdrop-blur-md">
                                        {s}
                                    </span>
                                ))}
                            </div>

                            <motion.div
                                whileHover={{ x: 20 }}
                                className="inline-flex items-center gap-6 text-white group cursor-pointer"
                            >
                                <div className="w-20 h-20 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#C5A059] transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 group-hover:text-[#C5A059] transition-colors">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                    </svg>
                                </div>
                                <span className="text-2xl font-black uppercase tracking-tighter">הזמן אימון אישי</span>
                            </motion.div>
                        </motion.div>

                        <div className="relative aspect-[3/4] rounded-[5rem] overflow-hidden group">
                            <Image
                                src={coach.image}
                                alt={coach.name}
                                fill
                                className="object-cover transition-transform duration-[2s] group-hover:scale-110 grayscale group-hover:grayscale-0"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                            <div className="absolute bottom-16 left-16">
                                <span className="text-[#C5A059] font-black text-8xl opacity-10">01</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Back to Reality */}
            <div className="h-screen bg-black flex items-center justify-center px-6 border-t border-white/5">
                <div className="text-center">
                    <h2 className="text-5xl md:text-8xl font-black text-white mb-12 uppercase italic tracking-tighter">
                        READY TO TRAIN?
                    </h2>
                    <Link
                        href="/contact"
                        className="px-20 py-10 bg-[#C5A059] text-black font-black text-3xl rounded-full hover:bg-white transition-all uppercase tracking-tighter"
                    >
                        START YOUR JOURNEY
                    </Link>
                </div>
            </div>



            <style jsx>{`
                .outline-text {
                    color: transparent;
                    -webkit-text-stroke: 1px rgba(255, 255, 255, 0.3);
                }
                .border-text {
                    -webkit-text-stroke: 2px white;
                    color: transparent;
                }
            `}</style>
        </main>
    );
}

function StatItem({ stat, index, progress }: { stat: any, index: number, progress: any }) {
    const start = 0.05 + index * 0.05;
    const opacity = useTransform(progress, [0, start, start + 0.1], [0, 0, 1]);
    const x = useTransform(progress, [0, start, start + 0.1], [-50, -50, 0]);

    return (
        <motion.div
            style={{ opacity, x }}
            className="flex flex-col"
        >
            <div className="text-[#C5A059] font-black text-5xl flex items-baseline gap-1">
                {stat.prefix && <span className="text-sm font-bold uppercase mr-2 text-gray-500">{stat.prefix}</span>}
                {stat.value > 0 ? stat.value : ''}
                {stat.suffix && <span className="text-2xl">{stat.suffix}</span>}
            </div>
            <div className="text-gray-500 uppercase font-bold text-[10px] tracking-[0.3em]">{stat.label}</div>
        </motion.div>
    );
}
