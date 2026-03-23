'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function BakunawaCanvas() {
    const containerRef = useRef<HTMLDivElement>(null);
    const pathRef = useRef<SVGPathElement>(null);
    const [pathLength, setPathLength] = useState(0);
    const { scrollYProgress } = useScroll();

    const strokeDashoffset = useTransform(
        scrollYProgress,
        [0, 1],
        [pathLength, 0]
    );

    const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.7, 0.5]);

    useEffect(() => {
        if (pathRef.current) {
            const length = pathRef.current.getTotalLength();
            setPathLength(length);
        }
    }, []);

    const serpentPath = `
    M 200 0
    C 350 200, 50 400, 250 600
    C 450 800, 100 1000, 300 1200
    C 500 1400, 50 1600, 250 1800
    C 450 2000, 100 2200, 300 2400
    C 500 2600, 50 2800, 250 3000
    C 450 3200, 100 3400, 300 3600
    C 500 3800, 150 4000, 250 4200
  `;

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 pointer-events-none"
            style={{ zIndex: 0 }}
            aria-hidden="true"
        >
            <svg
                viewBox="0 0 500 4200"
                className="absolute left-0 top-0 h-full w-full"
                preserveAspectRatio="none"
                style={{ opacity: 0.6 }}
            >
                <defs>
                    <linearGradient id="serpent-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#5B5BFF" />
                        <stop offset="50%" stopColor="#2D2DB8" />
                        <stop offset="100%" stopColor="#00D4A0" />
                    </linearGradient>
                    <filter id="serpent-glow">
                        <feGaussianBlur stdDeviation="6" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                    <filter id="serpent-glow-outer">
                        <feGaussianBlur stdDeviation="12" result="blur" />
                        <feColorMatrix
                            in="blur"
                            type="matrix"
                            values="0 0 0 0 0  0 0.8 0 0 0  0 0 0.6 0 0  0 0 0 0.4 0"
                        />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>

                {/* Outer glow layer */}
                <motion.path
                    d={serpentPath}
                    fill="none"
                    stroke="url(#serpent-gradient)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    filter="url(#serpent-glow-outer)"
                    style={{
                        strokeDasharray: pathLength,
                        strokeDashoffset,
                        opacity: glowOpacity,
                    }}
                />

                {/* Main serpent path */}
                <motion.path
                    ref={pathRef}
                    d={serpentPath}
                    fill="none"
                    stroke="url(#serpent-gradient)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    filter="url(#serpent-glow)"
                    style={{
                        strokeDasharray: pathLength,
                        strokeDashoffset,
                    }}
                />

                {/* Decorative scales along the path */}
                {[0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9].map((pos, i) => (
                    <g key={i} opacity="0.4">
                        <rect
                            x={200 + Math.sin(pos * Math.PI * 4) * 100 - 4}
                            y={pos * 4200 - 4}
                            width="8"
                            height="8"
                            fill="#00D4A0"
                            opacity="0.5"
                            transform={`rotate(45 ${200 + Math.sin(pos * Math.PI * 4) * 100} ${pos * 4200})`}
                        />
                    </g>
                ))}

                {/* Serpent head at top */}
                <motion.g
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 100, delay: 0.5, duration: 1.2 }}
                    style={{ transformOrigin: '200px 30px' }}
                >
                    <ellipse cx="200" cy="20" rx="12" ry="16" fill="#00D4A0" opacity="0.8" />
                    <ellipse cx="195" cy="14" rx="3" ry="4" fill="#FFD166" opacity="0.9" />
                    <ellipse cx="205" cy="14" rx="3" ry="4" fill="#FFD166" opacity="0.9" />
                </motion.g>
            </svg>
        </div>
    );
}
