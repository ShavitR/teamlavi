'use client';

import { motion } from 'framer-motion';

export default function ContactPage() {
    return (
        <main className="bg-[#050505] min-h-screen pt-32 px-6">
            <div className="container mx-auto max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-6">צור קשר</h1>
                    <p className="text-xl text-gray-400">אנחנו כאן לכל שאלה. בואו להתאמן איתנו.</p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-zinc-900 p-8 rounded-3xl border border-white/5"
                    >
                        <h3 className="text-2xl font-bold text-white mb-6">פרטי התקשרות</h3>
                        <div className="space-y-6">
                            <div>
                                <p className="text-gray-500 text-sm mb-1">כתובת</p>
                                <p className="text-xl text-white">רחוב התעונה 5, רחובות</p>
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm mb-1">טלפון</p>
                                <p className="text-xl text-white" dir="ltr">+972 53-436-3694</p>
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm mb-1">דוא"ל</p>
                                <p className="text-xl text-white">info@teamlavi.co.il</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-zinc-900 p-8 rounded-3xl border border-white/5"
                    >
                        <h3 className="text-2xl font-bold text-white mb-6">שלחו הודעה</h3>
                        <form className="space-y-4">
                            <div>
                                <label className="block text-gray-500 text-sm mb-2">שם מלא</label>
                                <input type="text" className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-[#C5A059] outline-none transition-colors" />
                            </div>
                            <div>
                                <label className="block text-gray-500 text-sm mb-2">טלפון</label>
                                <input type="tel" className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-[#C5A059] outline-none transition-colors" />
                            </div>
                            <div>
                                <label className="block text-gray-500 text-sm mb-2">הודעה</label>
                                <textarea rows={4} className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-[#C5A059] outline-none transition-colors" />
                            </div>
                            <button type="submit" className="w-full bg-[#D4AF37] hover:bg-[#C5A059] text-black font-bold py-4 rounded-xl transition-colors">
                                שליחה
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </main>
    )
}
