'use client';

import { motion } from 'framer-motion';

const plans = [
    { name: 'נוער / ילדים', price: '270', period: 'חודש', features: ['אימוני ערב', 'קבוצות גיל מותאמות'] },
    { name: 'מבוגרים (2 בשבוע)', price: '350', period: 'חודש', features: ['פעמיים בשבוע', 'גישה לכל השיטות'] },
    { name: 'מבוגרים (ללא הגבלה)', price: '450', period: 'חודש', features: ['ללא הגבלת אימונים', 'גישה מלאה להכל', 'כולל ספארינג'], recommended: true },
];

export default function Pricing() {
    return (
        <section id="pricing" className="py-24 bg-[#0a0a0a relative]">
            <div className="container mx-auto px-6">
                <h2 className="text-5xl font-black text-white mb-20 text-center tracking-tighter">הרשמה ומחירים</h2>

                <div className="grid md:grid-cols-3 gap-8 mb-32 max-w-5xl mx-auto">
                    {plans.map((plan, i) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className={`p-8 rounded-3xl border ${plan.recommended ? 'border-[#C5A059] bg-white/5' : 'border-white/10 bg-transparent'} flex flex-col relative`}
                        >
                            {plan.recommended && (
                                <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-[#D4AF37] text-black px-4 py-1 rounded-full text-sm font-bold shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                                    מומלץ
                                </div>
                            )}
                            <h3 className="text-xl text-gray-300 font-bold mb-4">{plan.name}</h3>
                            <div className="mb-6">
                                <span className="text-5xl font-black text-white">₪{plan.price}</span>
                                <span className="text-gray-500">/{plan.period}</span>
                            </div>
                            <ul className="mb-8 flex-1 space-y-4">
                                {plan.features.map(f => (
                                    <li key={f} className="flex items-center text-gray-300 text-sm">
                                        <span className="w-1.5 h-1.5 bg-[#C5A059] rounded-full ml-3" />
                                        {f}
                                    </li>
                                ))}
                            </ul>
                            <button className={`w-full py-4 rounded-xl font-bold transition-all ${plan.recommended ? 'bg-[#D4AF37] text-black hover:bg-[#C5A059]' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                                הרשמה
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
