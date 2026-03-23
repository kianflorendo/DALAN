'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface ButtonProps {
    variant?: 'ghost' | 'solid' | 'outline';
    color?: 'emerald' | 'gold';
    href?: string;
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    type?: 'button' | 'submit';
    size?: 'sm' | 'md' | 'lg';
}

const colorMap = {
    emerald: { main: '#00D4A0', dim: '#007A5C', glow: 'rgba(0,212,160,0.15)' },
    gold: { main: '#FFD166', dim: '#B8922A', glow: 'rgba(255,209,102,0.12)' },
};

const sizeMap = {
    sm: { padding: '0.5rem 1.25rem', fontSize: '0.8rem' },
    md: { padding: '0.75rem 1.75rem', fontSize: '0.875rem' },
    lg: { padding: '0.875rem 2.25rem', fontSize: '0.9rem' },
};

export default function Button({
    variant = 'ghost',
    color = 'emerald',
    href,
    children,
    className = '',
    onClick,
    type = 'button',
    size = 'md',
}: ButtonProps) {
    const c = colorMap[color];
    const s = sizeMap[size];

    const baseStyles: React.CSSProperties = {
        fontFamily: 'var(--font-ui)',
        fontSize: s.fontSize,
        fontWeight: 500,
        letterSpacing: '0.04em',
        borderRadius: '9999px',
        padding: s.padding,
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
    };

    const variantStyles: Record<string, React.CSSProperties> = {
        ghost: {
            ...baseStyles,
            color: c.main,
            backgroundColor: `${c.main}08`,
            border: `1px solid ${c.main}30`,
        },
        solid: {
            ...baseStyles,
            color: '#000000',
            backgroundColor: c.main,
            border: `1px solid ${c.main}`,
            fontWeight: 600,
        },
        outline: {
            ...baseStyles,
            color: c.main,
            backgroundColor: 'transparent',
            border: `1px solid ${c.main}40`,
        },
    };

    const content = (
        <motion.span
            className={className}
            style={variantStyles[variant]}
            whileHover={{
                boxShadow: `0 0 30px ${c.glow}, 0 4px 16px rgba(0,0,0,0.3)`,
                borderColor: variant === 'solid' ? c.main : `${c.main}80`,
                scale: 1.03,
                backgroundColor: variant === 'ghost' ? `${c.main}12` : undefined,
            }}
            whileTap={{ scale: 0.97 }}
        >
            {/* Shimmer sweep */}
            <span
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: `linear-gradient(105deg, transparent 40%, ${c.main}15, transparent 60%)`,
                    animation: 'shimmer 4s infinite',
                    pointerEvents: 'none',
                }}
            />
            <span style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>{children}</span>
        </motion.span>
    );

    if (href) {
        return <Link href={href}>{content}</Link>;
    }

    return (
        <button type={type} onClick={onClick} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
            {content}
        </button>
    );
}
