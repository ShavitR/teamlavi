'use client';

import { useState, useEffect } from 'react';
import { motion, useMotionValueEvent, useScroll, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import WebGLFluidBackground from './WebGLFluidBackground';

const navLinks = [
    { name: 'מאמנים', href: '/coaches' },
    { name: 'שיטות אימון', href: '/classes' },
    { name: 'לוח זמנים', href: '/schedule' },
    { name: 'מחירים', href: '/pricing' },
    { name: 'צור קשר', href: '/contact' },
];

export default function Navigation() {
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    const [hoveredPath, setHoveredPath] = useState(pathname);

    // Focus mode: Hide links when on a coach's profile page
    const isFocusMode = pathname.startsWith('/coaches/') && pathname !== '/coaches';

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 20);
    });

    // Close menu on link click or route change
    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    // Prevent scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMenuOpen]);

    return (
        <>
            <div className="fixed top-0 left-0 w-full z-[100] flex justify-center pt-6 pointer-events-none">
                <motion.header
                    layout
                    className={clsx(
                        "pointer-events-auto",
                        "flex items-center",
                        isFocusMode ? "justify-between px-6 gap-6" : "justify-between px-2 gap-2",
                        "bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50",
                        "rounded-full transition-colors duration-700 will-change-transform overflow-hidden relative z-50",
                        isFocusMode
                            ? "w-[90%] md:w-fit px-8 py-3"
                            : (isScrolled ? "w-[90%] md:w-fit px-8 py-3" : "w-[95%] md:max-w-3xl px-6 py-2")
                    )}
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                        y: { duration: 1.2, type: "spring", bounce: 0.3 },
                        opacity: { duration: 1.2 },
                        layout: { duration: 0.8, type: "spring", bounce: 0.1 }
                    }}
                >
                    <div className={clsx(
                        "absolute top-1 text-[12px] text-white/30 font-bold select-none pointer-events-none md:block hidden transition-all duration-700",
                        isFocusMode ? "left-8" : "right-8"
                    )}>
                        בס״ד
                    </div>
                    {/* Cinematic Back Button in Focus Mode */}
                    <motion.div
                        animate={{
                            width: isFocusMode ? 'auto' : 0,
                            opacity: isFocusMode ? 1 : 0,
                            marginRight: isFocusMode ? 8 : 0
                        }}
                        className="overflow-hidden flex items-center shrink-0"
                    >
                        <button
                            onClick={() => window.history.back()}
                            className="flex items-center gap-3 text-[#C5A059] hover:text-white transition-colors group cursor-pointer"
                        >
                            <div className="w-8 h-8 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                                </svg>
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap">
                                כל המאמנים
                            </span>
                        </button>
                        <div className="h-4 w-px bg-white/10 ml-6" />
                    </motion.div>

                    <Link href="/" className="relative z-10 px-4 py-2 group shrink-0" onClick={() => setIsMenuOpen(false)}>
                        <span className="text-xl font-black tracking-tighter text-white group-hover:text-[#C5A059] transition-colors duration-300">
                            TEAM LAVI
                        </span>
                    </Link>

                    <motion.nav
                        animate={{
                            width: isFocusMode ? 0 : 'auto',
                            opacity: isFocusMode ? 0 : 1,
                            x: isFocusMode ? 20 : 0
                        }}
                        className={clsx(
                            "hidden md:flex gap-1 items-center bg-white/5 p-1 rounded-full border border-white/5 overflow-hidden",
                            isFocusMode && "pointer-events-none"
                        )}
                    >
                        <Link
                            href="/"
                            className="relative px-4 py-2 rounded-full text-sm font-medium transition-colors"
                            onMouseEnter={() => setHoveredPath('/')}
                            onMouseLeave={() => setHoveredPath(pathname)}
                        >
                            {pathname === '/' && (
                                <motion.span
                                    layoutId="nav-pill"
                                    className="absolute inset-0 bg-white shadow-lg shadow-white/20 rounded-full"
                                    style={{ borderRadius: 9999 }}
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            {hoveredPath === '/' && pathname !== '/' && (
                                <motion.span
                                    layoutId="nav-hover"
                                    className="absolute inset-0 bg-white/10 rounded-full"
                                    style={{ borderRadius: 9999 }}
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.3 }}
                                />
                            )}
                            <span className={clsx("relative z-10 whitespace-nowrap", pathname === '/' ? "text-black font-bold" : "text-gray-300")}>
                                דף הבית
                            </span>
                        </Link>

                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="relative px-4 py-2 rounded-full text-sm font-medium transition-colors"
                                    onMouseEnter={() => setHoveredPath(link.href)}
                                    onMouseLeave={() => setHoveredPath(pathname)}
                                >
                                    {isActive && (
                                        <motion.span
                                            layoutId="nav-pill"
                                            className="absolute inset-0 bg-white shadow-lg shadow-white/20 rounded-full"
                                            style={{ borderRadius: 9999 }}
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    {hoveredPath === link.href && !isActive && (
                                        <motion.span
                                            layoutId="nav-hover"
                                            className="absolute inset-0 bg-white/10 rounded-full"
                                            style={{ borderRadius: 9999 }}
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.3 }}
                                        />
                                    )}
                                    <span className={clsx("relative z-10 whitespace-nowrap", isActive ? "text-black font-bold" : "text-gray-300")}>
                                        {link.name}
                                    </span>
                                </Link>
                            );
                        })}
                    </motion.nav>

                    {/* Mobile Menu Button with Breathing Animation */}
                    <motion.button
                        animate={{
                            width: 'auto',
                            padding: '0.75rem',
                            scale: [1, 1.05, 1],
                            opacity: 1,
                            marginLeft: '0.5rem'
                        }}
                        transition={{
                            scale: {
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            },
                            width: { duration: 0.3 },
                            opacity: { duration: 0.3 }
                        }}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden flex items-center justify-center text-white rounded-full hover:bg-white/10 transition-colors border border-[#C5A059]/30 active:scale-95 shrink-0 overflow-hidden relative group"
                    >
                        {/* Interactive Glow Pulse */}
                        {!isMenuOpen && (
                            <motion.div
                                animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                                className="absolute inset-x-0 inset-y-0 bg-[#C5A059]/20 rounded-full"
                            />
                        )}

                        <div className="relative w-6 h-6 z-10">
                            <motion.span
                                animate={isMenuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -8 }}
                                className="absolute top-1/2 left-0 w-full h-0.5 bg-[#C5A059] rounded-full -translate-y-1/2 origin-center"
                            />
                            <motion.span
                                animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                                className="absolute top-1/2 left-0 w-full h-0.5 bg-[#C5A059] rounded-full -translate-y-1/2"
                            />
                            <motion.span
                                animate={isMenuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 8 }}
                                className="absolute top-1/2 left-0 w-full h-0.5 bg-[#C5A059] rounded-full -translate-y-1/2 origin-center"
                            />
                        </div>
                    </motion.button>
                </motion.header>
            </div>

            {/* Full Screen Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[90] bg-black/95 backdrop-blur-2xl md:hidden overflow-hidden flex flex-col items-center justify-center"
                    >
                        <WebGLFluidBackground />
                        {/* Background Decor */}
                        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-[#C5A059]/10 rounded-full blur-[100px] pointer-events-none" />
                        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />

                        <div className="absolute top-[5.5rem] right-10 text-white/30 text-[10px] font-bold uppercase z-30">בס״ד</div>
                        <nav className="relative z-10 flex flex-col gap-8 text-center p-6 pt-32">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                            >
                                <Link
                                    href="/"
                                    className={clsx(
                                        "text-4xl font-black uppercase tracking-tighter transition-colors italic",
                                        pathname === '/' ? "text-[#C5A059]" : "text-white hover:text-[#C5A059]"
                                    )}
                                >
                                    דף הבית
                                </Link>
                            </motion.div>

                            {navLinks.map((link, i) => {
                                const isCoachesLink = link.href === '/coaches';
                                return (
                                    <motion.div
                                        key={link.name}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 * (i + 2) }}
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={(e) => {
                                                if (isCoachesLink && isFocusMode) {
                                                    e.preventDefault();
                                                    setIsMenuOpen(false);
                                                    setTimeout(() => window.history.back(), 100);
                                                }
                                            }}
                                            className={clsx(
                                                "text-4xl font-black uppercase tracking-tighter transition-colors italic",
                                                (pathname === link.href || (isCoachesLink && isFocusMode)) ? "text-[#C5A059]" : "text-white hover:text-[#C5A059]"
                                            )}
                                        >
                                            {link.name}
                                        </Link>
                                    </motion.div>
                                );
                            })}

                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.7 }}
                                className="mt-12"
                            >
                                <Link
                                    href="/contact"
                                    className="px-12 py-5 bg-[#C5A059] text-black font-black text-xl rounded-full uppercase tracking-tighter hover:bg-white transition-all shadow-xl shadow-[#C5A059]/20"
                                >
                                    START TRAINING
                                </Link>
                            </motion.div>
                        </nav>

                        {/* Cinematic Scanline Overlay */}
                        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] z-20" style={{ backgroundSize: '100% 4px' }} />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
