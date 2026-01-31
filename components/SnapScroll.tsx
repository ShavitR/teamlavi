'use client';

import { useEffect } from 'react';

export default function SnapScroll() {
    useEffect(() => {
        document.documentElement.classList.add('snap-scroll');
        return () => {
            document.documentElement.classList.remove('snap-scroll');
        };
    }, []);

    return null;
}
