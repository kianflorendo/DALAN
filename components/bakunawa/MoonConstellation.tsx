'use client';

import { useScroll, useTransform } from 'framer-motion';
import MoonOrb from './MoonOrb';
import { MOON_CONFIGS } from '@/lib/moon-config';

const MOON_POSITIONS = [
    { top: '5%', left: '85%', size: 90 },
    { top: '18%', right: '5%', size: 75 },
    { top: '32%', left: '3%', size: 105 },
    { top: '46%', right: '8%', size: 82 },
    { top: '58%', left: '6%', size: 97 },
    { top: '72%', right: '4%', size: 67 },
    { top: '88%', left: '10%', size: 82 },
];

export default function MoonConstellation() {
    const { scrollYProgress } = useScroll();

    // Determine active section based on scroll position (0-6)
    const activeSectionRaw = useTransform(
        scrollYProgress,
        [0, 0.143, 0.286, 0.429, 0.571, 0.714, 0.857, 1],
        [0, 1, 2, 3, 4, 5, 6, 6]
    );

    return (
        <div
            className="fixed inset-0 pointer-events-none"
            style={{ zIndex: 1 }}
            aria-hidden="true"
        >
            {MOON_CONFIGS.map((moon, index) => {
                const pos = MOON_POSITIONS[index];
                return (
                    <div
                        key={moon.id}
                        className="absolute"
                        style={{
                            top: pos.top,
                            left: 'left' in pos ? pos.left : undefined,
                            right: 'right' in pos ? pos.right : undefined,
                        }}
                    >
                        <MoonOrb
                            color={moon.color}
                            size={pos.size}
                            isActive={false}
                            delay={index * 0.8}
                        />
                    </div>
                );
            })}
        </div>
    );
}
