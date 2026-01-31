'use client';

import { useEffect, useRef, useState } from 'react';
import { useScroll, useSpring, useMotionValueEvent, motion } from 'framer-motion';
import clsx from 'clsx';

const FRAME_COUNT = 120;

export default function ScrollSequence() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loadingProgress, setLoadingProgress] = useState(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    useEffect(() => {
        let loadedCount = 0;
        const imgs: HTMLImageElement[] = [];

        const loadImages = async () => {
            const promises = [];
            for (let i = 0; i < FRAME_COUNT; i++) {
                const promise = new Promise<void>((resolve) => {
                    const img = new Image();
                    img.src = `/sequence/frame_${i}.jpg`;
                    img.onload = () => {
                        loadedCount++;
                        setLoadingProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
                        resolve();
                    };
                    img.onerror = () => {
                        // If a frame fails, we resolve anyway to avoid stuck loading
                        console.error(`Failed to load frame ${i}`);
                        resolve();
                    };
                    imgs[i] = img;
                });
                promises.push(promise);
            }

            await Promise.all(promises);
            setImages(imgs);
            setIsLoading(false);
        };

        loadImages();
    }, []);

    const renderFrame = (index: number) => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');
        const img = images[index];

        if (!canvas || !context || !img) return;

        // Handle high DPI displays
        const dpr = window.devicePixelRatio || 1;
        // We only set width/height if they differ to avoid clearing canvas unnecessarily on every frame if strictly resizing
        // But here we need to ensure resize sync. 
        // Usually resize logic is separate. For now assume canvas size matches clientWidth/Height via simple CSS/resize observer

        // Clear
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Calculate "contain" fit
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const imgRatio = img.width / img.height;
        const canvasRatio = canvasWidth / canvasHeight;

        let drawWidth, drawHeight, offsetX, offsetY;

        if (canvasRatio > imgRatio) {
            // Canvas is wider than image -> cover by scaling width
            drawWidth = canvasWidth;
            drawHeight = canvasWidth / imgRatio;
        } else {
            // Canvas is taller than image -> cover by scaling height
            drawHeight = canvasHeight;
            drawWidth = canvasHeight * imgRatio;
        }

        offsetX = (canvasWidth - drawWidth) / 2;
        offsetY = (canvasHeight - drawHeight) / 2;

        context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    // Resize handler
    useEffect(() => {
        const handleResize = () => {
            const canvas = canvasRef.current;
            if (canvas) {
                // Set actual canvas size to match display size for sharpness
                const dpr = window.devicePixelRatio || 1;
                canvas.width = window.innerWidth * dpr;
                canvas.height = window.innerHeight * dpr;

                // Re-render current frame
                const currentProgress = smoothProgress.get();
                const index = Math.min(
                    FRAME_COUNT - 1,
                    Math.floor(currentProgress * (FRAME_COUNT - 1))
                );
                if (images.length > 0) {
                    renderFrame(index);
                }
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Init

        return () => window.removeEventListener('resize', handleResize);
    }, [images]); // Re-bind if images load?

    // Animation Loop
    useMotionValueEvent(smoothProgress, 'change', (latest) => {
        if (isLoading || images.length === 0) return;

        const frameIndex = Math.min(
            FRAME_COUNT - 1,
            Math.floor(latest * (FRAME_COUNT - 1))
        );

        requestAnimationFrame(() => renderFrame(frameIndex));
    });

    // Initial render when loading finishes
    useEffect(() => {
        if (!isLoading && images.length > 0) {
            renderFrame(0);
        }
    }, [isLoading, images]);

    return (
        <div ref={containerRef} className="h-[400vh] relative z-0">
            <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#050505] pointer-events-none z-0">
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center z-50 text-white">
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-64 h-1 bg-white/20 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-white"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${loadingProgress}%` }}
                                />
                            </div>
                            <span className="text-sm font-mono tracking-widest">{loadingProgress}%</span>
                        </div>
                    </div>
                )}
                <canvas
                    ref={canvasRef}
                    className={clsx(
                        "w-full h-full object-cover block",
                        isLoading ? "opacity-0" : "opacity-100 transition-opacity duration-700"
                    )}
                />
            </div>
        </div>
    );
}
