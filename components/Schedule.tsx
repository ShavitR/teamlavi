'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const scheduleData = [
    {
        day: 'ראשון',
        classes: [
            { time: '07:00', name: "ג'יו ג'יטסו *", type: 'morning' },
            { time: '19:00 - 20:15', name: "ג'יו ג'יטסו בסיס", type: 'evening' },
            { time: '19:00 - 20:00', name: 'MMA', type: 'evening' },
            { time: '20:15 - 21:30', name: 'סטרייקינג', type: 'late' }
        ]
    },
    {
        day: 'שני',
        classes: [
            { time: '07:00', name: "ג'יו ג'יטסו *", type: 'morning' },
            { time: '19:00 - 20:15', name: 'Jiu Jitsu מתקדמים', type: 'evening' },
            { time: '20:15 - 21:30', name: 'סטרייקינג', type: 'late' }
        ]
    },
    {
        day: 'שלישי',
        classes: [
            { time: '17:00', name: 'פונקציונאלי', type: 'afternoon' },
            { time: '18:00', name: 'קרבות מתקדמים', type: 'evening' },
            { time: '19:00 - 20:30', name: 'אימון היאבקות', type: 'evening' }
        ]
    },
    {
        day: 'רביעי',
        classes: [
            { time: '07:00', name: "ג'יו ג'יטסו *", type: 'morning' },
            { time: '19:00 - 20:15', name: 'Jiu Jitsu בסיס', type: 'evening' },
            { time: '19:00 - 20:00', name: 'MMA', type: 'evening' }
        ]
    },
    {
        day: 'חמישי',
        classes: [
            { time: '07:00', name: "ג'יו ג'יטסו *", type: 'morning' },
            { time: '19:00 - 20:15', name: 'MMA', type: 'evening' },
            { time: '20:15 - 21:30', name: "ג'יו ג'יטסו", type: 'late' },
            { time: '20:15 - 21:30', name: 'איגרוף', type: 'late' }
        ]
    },
    {
        day: 'שישי',
        classes: [
            { time: 'בוקר', name: 'מזרן פתוח', type: 'special' }
        ]
    },
    {
        day: 'שבת',
        classes: [
            { time: '19:00 - 20:00', name: "ג'יו ג'יטסו בסיס", type: 'evening' },
            { time: '20:00 - 21:30', name: 'מזרן פתוח', type: 'late' }
        ]
    }
];

export default function Schedule() {
    const [activeDay, setActiveDay] = useState(0);

    return (
        <section id="schedule" className="py-40 bg-[#050505] relative overflow-hidden">
            {/* Background Accents */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
                <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-[#C5A059]/10 rounded-full blur-[150px]" />
                <div className="absolute bottom-1/4 left-0 w-[500px] h-[400px] bg-white/5 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <header className="mb-24 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-[#C5A059] font-black uppercase tracking-[0.5em] text-xs mb-4 block">Battle Plan</span>
                        <h2 className="text-6xl md:text-9xl font-black text-white mb-8 tracking-tighter uppercase italic">
                            לוח <span className="text-transparent border-white/20" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.2)' }}>אימונים</span>
                        </h2>
                        <div className="h-1 w-32 bg-[#C5A059] mx-auto rounded-full" />
                    </motion.div>
                </header>

                {/* Day Selectors - Mobile Scrollable Bar */}
                <div className="flex md:justify-center overflow-x-auto pb-8 gap-4 mb-20 scrollbar-hide no-scrollbar">
                    {scheduleData.map((day, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveDay(idx)}
                            className={`px-10 py-5 rounded-full text-sm font-black uppercase tracking-widest transition-all duration-500 whitespace-nowrap border ${activeDay === idx
                                ? 'bg-[#C5A059] text-black border-[#C5A059] shadow-[0_0_30px_rgba(197,160,89,0.3)] scale-110'
                                : 'bg-white/5 text-white/40 border-white/10 hover:border-white/30 hover:text-white'
                                }`}
                        >
                            {day.day}
                        </button>
                    ))}
                </div>

                {/* Schedule Display */}
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        key={activeDay}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-6"
                    >
                        {scheduleData[activeDay].classes.map((cls, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="group relative"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
                                <div className="relative p-8 md:p-10 border border-white/5 rounded-3xl bg-zinc-900/40 backdrop-blur-xl flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-[#C5A059]/30 transition-all duration-500">
                                    <div className="flex items-center gap-8">
                                        <div className="w-1.5 h-16 bg-[#C5A059] rounded-full group-hover:scale-y-110 transition-transform origin-center" />
                                        <div>
                                            <div className="text-[#C5A059] font-black text-xl mb-1 tracking-tighter uppercase">{cls.time}</div>
                                            <h3 className="text-2xl md:text-4xl font-black text-white italic uppercase tracking-tight">{cls.name}</h3>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="px-5 py-2 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-widest text-[#C5A059] group-hover:bg-[#C5A059] group-hover:text-black transition-all">
                                            {cls.type === 'morning' ? 'Early Session' : cls.type === 'special' ? 'Open Mat' : 'Adults Class'}
                                        </div>
                                        <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/20 group-hover:text-white group-hover:border-[#C5A059] transition-all">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Footer Info */}
                <div className="mt-24 text-center">
                    <div className="text-white/20 text-xs font-bold mb-4">בס״ד</div>
                    <p className="text-gray-500 text-sm font-bold uppercase tracking-[0.2em]">
                        * על בסיס רישום | קלמן גבריאלוב 39 אזור התעשייה רחובות | 053-436363694
                    </p>
                </div>
            </div>
        </section>
    );
}
