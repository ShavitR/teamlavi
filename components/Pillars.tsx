'use client';

import { motion } from 'framer-motion';

const pillars = [
    {
        title: 'משמעת',
        description: 'הבסיס לכל לוחם. אנחנו בונים אופי לפני שאנחנו בונים כוח. האימון מתחיל בראש ומסתיים בנשמה.',
        color: 'from-zinc-900 to-zinc-950',
        icon: '🏛️',
        delay: 0.1
    },
    {
        title: 'נחישות',
        description: 'לא מוותרים גם כשקשה. פה לומדים להתגבר על כל מכשול. לוחם נמדד ברגעים של קושי, לא של נוחות.',
        color: 'from-zinc-900 to-zinc-950',
        highlight: true,
        icon: '🔥',
        delay: 0.2
    },
    {
        title: 'כבוד',
        description: 'הערכה ליריב, למאמן ולעצמך היא נר לרגלינו. בלאבי, הדרך חשובה לא פחות מהתוצאה הסופית.',
        color: 'from-zinc-900 to-zinc-950',
        icon: '🤝',
        delay: 0.3
    }
];

export default function Pillars() {
    return (
        <section className="py-32 px-6 relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C5A059]/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="container mx-auto max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="text-center mb-32"
                >
                    <h2 className="text-5xl md:text-8xl font-black text-white mb-8 uppercase tracking-tighter drop-shadow-lg text-balance">העקרונות שלנו</h2>
                    <div className="flex justify-center items-center gap-4">
                        <div className="h-[2px] w-20 bg-gradient-to-r from-transparent to-[#C5A059]" />
                        <div className="w-3 h-3 bg-[#C5A059] rotate-45" />
                        <div className="h-[2px] w-20 bg-gradient-to-l from-transparent to-[#C5A059]" />
                    </div>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-10">
                    {pillars.map((pillar) => (
                        <motion.div
                            key={pillar.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0 }}
                            transition={{ duration: 0.8, delay: pillar.delay, ease: [0.16, 1, 0.3, 1] }}
                            whileHover={{ y: -15, scale: 1.02 }}
                            className={`p-12 rounded-[3.5rem] border border-white/5 bg-gradient-to-br ${pillar.color} relative overflow-hidden group backdrop-blur-sm`}
                        >
                            {/* Inner Glow Overlay */}
                            <div className="absolute inset-0 bg-white/[0.02] group-hover:bg-[#C5A059]/[0.05] transition-colors duration-700" />

                            <div className="relative z-10">
                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="text-7xl mb-10 group-hover:scale-110 transition-transform duration-700 origin-bottom-left"
                                >
                                    {pillar.icon}
                                </motion.div>
                                <h3 className="text-4xl font-black text-white mb-6 tracking-tight">{pillar.title}</h3>
                                <p className="text-gray-400 text-xl leading-relaxed font-light">
                                    {pillar.description}
                                </p>
                            </div>

                            {/* Glow Trail */}
                            <motion.div
                                className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
