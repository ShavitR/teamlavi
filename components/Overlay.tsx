'use client';

import { useScroll, useTransform, motion, MotionValue } from 'framer-motion';
import { useRef } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import ScrollSpine from './ScrollSpine';

const beats = [
    {
        id: 'beat-a',
        start: -0.17,
        end: 0.30,
        align: 'center',
        title: 'TEAM LAVI',
        subtitle: 'אומנויות לחימה ברמה הגבוהה ביותר',
    },
    {
        id: 'beat-b',
        start: 0.1,
        end: 0.40,
        align: 'center',
        title: 'MMA & BJJ',
        subtitle: 'שילוב מנצח של לחימה בעמידה וקרקע',
    },
    {
        id: 'beat-c',
        start: 0.35,
        end: 0.70,
        align: 'center',
        title: 'MMA & BJJ',
        subtitle: 'שילוב מנצח של לחימה בעמידה וקרקע',
    },
    {
        id: 'beat-d',
        start: 0.65,
        end: 0.9,
        align: 'center',
        title: 'משפחה לוחמת',
        subtitle: 'סביבה תומכת, מקצועית ומחבקת לכל הגילאים',
    },
    {
        id: 'beat-e',
        start: 0.75,
        end: 1.1,
        align: 'center',
        title: 'מוכנים לשינוי?',
        subtitle: 'גלו איך להפוך לגרסה הטובה ביותר של עצמכם',
    },
];

export default function Overlay() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    return (
        <div ref={containerRef} className="absolute inset-0 pointer-events-none h-[400vh] overflow-hidden z-20">
            {/* Guiding Spine */}
            <ScrollSpine
                progress={scrollYProgress}
                beatPositions={beats.slice(0, -1).map(b => (b.start + b.end) / 2)}
            />

            {/* Magnetic Snap Points */}
            <div className="absolute inset-0 pointer-events-none">
                {beats.map((beat) => (
                    <div
                        key={`snap-${beat.id}`}
                        style={{
                            position: 'absolute',
                            top: `${(beat.start + beat.end) / 2 * 100}%`,
                            scrollSnapAlign: 'center',
                            height: '100px', // Larger hit area for snap proximity
                            width: '100%',
                        }}
                    />
                ))}
            </div>

            {beats.map((beat) => (
                <StaticBeat key={beat.id} beat={beat} progress={scrollYProgress} />
            ))}
        </div>
    );
}

function StaticBeat({
    beat,
    progress,
}: {
    beat: (typeof beats)[0];
    progress: MotionValue<number>;
}) {
    // Simple Opacity Mapping: 0 at start, 1 inside, 0 at end
    const opacity = useTransform(
        progress,
        [beat.start, beat.start + 0.05, beat.end - 0.05, beat.end],
        [0, 1, 1, 0]
    );

    // Position vertically centered in its scroll segment
    const topPos = `${(beat.start + beat.end) / 2 * 100}%`;

    // Basic Alignments
    let layoutClass = "items-center text-center";
    if (beat.align === 'left') layoutClass = "items-start text-right pr-6 md:pr-48";
    if (beat.align === 'right') layoutClass = "items-end text-left pl-6 md:pl-48";

    return (
        <motion.div
            style={{ opacity, top: topPos }}
            className={clsx(
                "absolute w-full px-6 flex flex-col justify-center transform -translate-y-1/2 z-20",
                layoutClass
            )}
        >
            <h2 className="text-7xl md:text-[10vw] font-black tracking-tighter text-white uppercase leading-none">
                {beat.title}
            </h2>

            <p className="text-xl md:text-3xl font-light text-gray-200 mt-6 max-w-4xl leading-relaxed">
                {beat.subtitle}
            </p>

        </motion.div>
    );
}
