'use client';

import { motion } from 'framer-motion';

interface GlowTextProps {
    children: React.ReactNode;
    color?: string;
    className?: string;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'span' | 'p';
}

export default function GlowText({
    children,
    color = '#FFD166',
    className = '',
    as: Tag = 'span',
}: GlowTextProps) {
    return (
        <motion.span
            className={`inline-block ${className}`}
            style={{ color }}
            animate={{
                textShadow: [
                    `0 0 20px ${color}30`,
                    `0 0 40px ${color}50`,
                    `0 0 20px ${color}30`,
                ],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
            <Tag>{children}</Tag>
        </motion.span>
    );
}
