'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const coaches = [
    {
        id: 'amos-lavi',
        name: 'עמוס לביא',
        role: 'מייסד ומאמן ראשי',
        image: '/images/amostrain.jpg',
        specialties: ['MMA', 'BJJ', 'Muay Thai'],
        bio: 'בעל ניסיון תחרותי עשיר, מתמחה בהכנת לוחמים לתחרויות תוך דגש על טכניקה, ביצועים ובטיחות.',
    },
    {
        id: 'amir-ben-nun',
        name: 'אמיר בן נון',
        role: 'מאמן סטרייקינג',
        image: '/images/amirtrainlowkickdefence.jpg',
        specialties: ['Kickboxing', 'Muay Thai', 'Striking'],
        bio: 'מומחה לחימה בעמידה, מתמחה בטכניקות סטרייקינג מתקדמות ושיפור יכולות התנועה והתקפה.',
    },
    {
        id: 'maor-issachar',
        name: 'מאור יששכר',
        role: 'מאמן BJJ',
        image: '/images/maorissachar.png',
        specialties: ['BJJ', 'Ground Game', 'Grappling'],
        bio: 'מומחה לג\'יו-ג\'יטסו ברזילאי, שם דגש על הבנה עמוקה של מכניקת הגוף ואסטרטגיית קרקע חכמה.',
    },
    {
        id: 'yan-gard',
        name: 'יאן גארד',
        role: 'מאמן היאבקות',
        image: '/images/yangard.png',
        specialties: ['Wrestling', 'Takedowns', 'Control'],
        bio: 'מומחה היאבקות, מתמחה בטכניקות הפלה ושליטה בקרקע, מביא ניסיון עשיר מהנבחרות המובילות.',
    },
    {
        id: 'hillel-litman',
        name: 'הילל ליטמן',
        role: 'מאמן',
        image: '/images/amostrain2.jpg',
        specialties: ['קרב קרקע', 'איגרוף'],
        bio: 'מתמחה בלימוד כל רמות הכישרון, עם פוקוס על יסודות חזקים ושיפור מתמיד.',
    }
];

export default function Coaches() {
    return (
        <section id="coaches" className="py-32 bg-[#050505] relative overflow-hidden">
            {/* Sector Highlight */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-radial from-[#C5A059]/5 to-transparent pointer-events-none opacity-50" />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-32 text-center"
                >
                    <span className="text-[#C5A059] font-black uppercase tracking-[0.6em] text-xs mb-4 block">Elite Instructors</span>
                    <h2 className="text-6xl md:text-9xl font-black mb-8 text-white tracking-tighter uppercase italic">
                        המאמנים <span className="text-transparent border-white/20" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>שלנו</span>
                    </h2>
                    <div className="h-1 w-24 bg-[#C5A059] mx-auto rounded-full" />
                </motion.div>

                <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
                    {coaches.map((coach, index) => (
                        <Link key={coach.id} href={`/coaches/${coach.id}`}>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                    scale: index === 0 ? [1, 1.02, 1] : 1
                                }}
                                viewport={{ once: true, amount: 0 }}
                                transition={{
                                    duration: 0.8,
                                    delay: index * 0.1,
                                    ease: [0.16, 1, 0.3, 1],
                                    scale: index === 0 ? {
                                        duration: 2,
                                        repeat: 2,
                                        delay: 1.5
                                    } : { duration: 0.8 }
                                }}
                                whileHover={{ y: -10, scale: 1.02 }}
                                className="group relative h-[600px] md:h-[700px] w-full overflow-hidden rounded-[3rem] bg-zinc-950 cursor-pointer border border-white/5"
                            >
                                <Image
                                    src={coach.image}
                                    alt={coach.name}
                                    fill
                                    className="object-cover transition-transform duration-[1.5s] group-hover:scale-110 opacity-70 md:opacity-70 group-hover:opacity-40"
                                />

                                {/* Inner Glow */}
                                <div className="absolute inset-0 bg-gradient-to-br from-[#C5A059]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex flex-col justify-end p-10 md:p-16">
                                    <motion.div
                                        className="mb-2 w-12 h-1 bg-[#C5A059] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                                    />
                                    <h3 className="text-4xl md:text-7xl font-black text-white mb-4 tracking-tighter italic uppercase">{coach.name}</h3>
                                    <p className="text-[#C5A059] font-black text-lg md:text-2xl mb-6 tracking-widest uppercase">{coach.role}</p>

                                    <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-8 max-w-md opacity-100 md:opacity-0 md:translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-700 delay-100">
                                        {coach.bio}
                                    </p>

                                    <div className="flex flex-wrap gap-3 mb-10">
                                        {coach.specialties.map(s => (
                                            <span key={s} className="px-5 py-2 bg-white/5 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-white border border-white/10 group-hover:border-[#C5A059]/50 transition-colors">
                                                {s}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex items-center gap-4 text-white font-black uppercase text-xs md:text-sm tracking-[0.2em] transform translate-y-0 md:translate-y-10 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-700 delay-200">
                                        <span className="group-hover:text-[#C5A059] transition-colors">לעמוד המאמן</span>
                                        <div className="w-12 h-px bg-white/20 group-hover:bg-[#C5A059] group-hover:w-20 transition-all duration-700" />
                                    </div>
                                </div>

                                {index === 0 && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: [0, 1, 0] }}
                                        transition={{
                                            duration: 2,
                                            repeat: 2,
                                            delay: 1.5,
                                            ease: "easeInOut"
                                        }}
                                        className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
                                    >
                                        <span className="text-white font-black text-3xl uppercase tracking-widest bg-black/40 backdrop-blur-sm px-8 py-4 rounded-full border border-[#C5A059]/50 shadow-[0_0_30px_rgba(197,160,89,0.3)]">
                                            לחץ
                                        </span>
                                    </motion.div>
                                )}

                                {/* Cinematic Scanline Overlay */}
                                <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10" style={{ backgroundSize: '100% 2px, 3px 100%' }} />
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
