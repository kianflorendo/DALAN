'use client';

import { motion } from 'framer-motion';

interface MoonOrbProps {
    color: string;
    size?: number;
    isActive?: boolean;
    delay?: number;
    className?: string;
}

export default function MoonOrb({
    color,
    size = 80,
    isActive = false,
    delay = 0,
    className = '',
}: MoonOrbProps) {
    return (
        <motion.div
            className={`relative rounded-full ${className}`}
            style={{
                width: size,
                height: size,
            }}
            animate={{
                scale: isActive ? 1.3 : 1,
                opacity: isActive ? 1 : 0.3,
                y: [0, -12, 0],
            }}
            transition={{
                scale: { duration: 0.6, ease: 'easeOut' },
                opacity: { duration: 0.6, ease: 'easeOut' },
                y: { duration: 6, repeat: Infinity, ease: 'easeInOut', delay },
            }}
            aria-hidden="true"
        >
            {/* Outer glow */}
            <div
                className="absolute inset-0 rounded-full"
                style={{
                    background: `radial-gradient(circle, ${color}40 0%, transparent 70%)`,
                    transform: 'scale(2)',
                    opacity: isActive ? 0.6 : 0.15,
                    transition: 'opacity 0.6s ease',
                }}
            />

            {/* Moon body */}
            <div
                className="absolute inset-0 rounded-full"
                style={{
                    background: `radial-gradient(circle at 35% 35%, ${color}, ${color}80 50%, ${color}20 100%)`,
                    boxShadow: `
            0 0 ${isActive ? 40 : 15}px ${color}40,
            0 0 ${isActive ? 80 : 30}px ${color}20,
            inset -${size / 6}px -${size / 6}px ${size / 3}px rgba(0,0,0,0.4)
          `,
                    transition: 'box-shadow 0.6s ease',
                }}
            />

            {/* Surface texture — subtle craters */}
            <svg
                className="absolute inset-0 rounded-full overflow-hidden"
                viewBox="0 0 100 100"
                style={{ opacity: 0.15 }}
            >
                <circle cx="30" cy="25" r="8" fill="rgba(0,0,0,0.3)" />
                <circle cx="65" cy="40" r="5" fill="rgba(0,0,0,0.2)" />
                <circle cx="45" cy="65" r="10" fill="rgba(0,0,0,0.25)" />
                <circle cx="70" cy="70" r="4" fill="rgba(0,0,0,0.15)" />
                <circle cx="25" cy="55" r="6" fill="rgba(0,0,0,0.2)" />
            </svg>

            {/* Rotation animation */}
            <motion.div
                className="absolute inset-0 rounded-full overflow-hidden"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                style={{ opacity: 0.08 }}
            >
                <svg viewBox="0 0 100 100">
                    <line x1="0" y1="30" x2="100" y2="35" stroke={color} strokeWidth="0.5" />
                    <line x1="0" y1="60" x2="100" y2="55" stroke={color} strokeWidth="0.3" />
                    <line x1="0" y1="80" x2="100" y2="82" stroke={color} strokeWidth="0.4" />
                </svg>
            </motion.div>
        </motion.div>
    );
}
