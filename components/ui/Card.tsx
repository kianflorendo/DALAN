'use client';

import { motion } from 'framer-motion';
import { fadeUpVariant } from '@/lib/motion-variants';

interface CardProps {
    moonColor?: string;
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
    delay?: number;
}

export default function Card({
    moonColor = '#00D4A0',
    children,
    className = '',
    hover = true,
    delay = 0,
}: CardProps) {
    return (
        <motion.div
            className={`relative rounded-2xl overflow-hidden ${className}`}
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            custom={delay}
            style={{
                padding: '1.5rem',
            }}
            whileHover={
                hover
                    ? {
                        y: -4,
                        transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
                    }
                    : undefined
            }
        >
            {/* Gradient border */}
            <div
                className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-500"
                style={{
                    padding: '1px',
                    background: `linear-gradient(135deg, ${moonColor}20, ${moonColor}08, transparent, ${moonColor}05)`,
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                }}
            />

            {/* Background */}
            <div
                className="absolute inset-0 rounded-2xl transition-all duration-500"
                style={{
                    backgroundColor: 'rgba(8,8,20,0.7)',
                    backdropFilter: 'blur(12px)',
                }}
            />

            {/* Hover glow effect */}
            <div
                className="absolute inset-0 rounded-2xl opacity-0 hover-glow transition-opacity duration-500 pointer-events-none"
                style={{
                    background: `radial-gradient(ellipse at 50% 0%, ${moonColor}08 0%, transparent 70%)`,
                }}
            />

            {/* Content */}
            <div className="relative z-10 flex-1 flex flex-col">{children}</div>

            <style jsx>{`
        .group:hover .hover-glow,
        div:hover > .hover-glow {
          opacity: 1;
        }
      `}</style>
        </motion.div>
    );
}
