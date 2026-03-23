'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface GoldFrameProps {
    children: React.ReactNode;
    isActive?: boolean;
    className?: string;
    color?: string;
}

const CornerDecoration = ({ position }: { position: 'tl' | 'tr' | 'bl' | 'br'}) => {
    const rotations = {
        tl: '0deg',
        tr: '90deg',
        br: '180deg',
        bl: '270deg',
    };

    return (
        <div 
            className={`absolute pointer-events-none z-30 w-16 h-16`}
            style={{ 
                top: position.includes('t') ? '-1px' : 'auto',
                bottom: position.includes('b') ? '-1px' : 'auto',
                left: position.includes('l') ? '-1px' : 'auto',
                right: position.includes('r') ? '-1px' : 'auto',
                transform: `rotate(${rotations[position]})`,
            }}
        >
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                {/* Main corner arc - Thicker for visibility */}
                <path 
                    d="M100 2H30C15 2 2 15 2 30V100" 
                    stroke="url(#gold-gradient-thin)" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                />
                
                {/* Secondary inner accent */}
                <path 
                    d="M100 8H40C25 8 8 25 8 40V100" 
                    stroke="url(#gold-gradient-thin)" 
                    strokeWidth="1" 
                    opacity="0.8"
                />

                {/* Corner Knot / Filigree Detail */}
                <path 
                    d="M5 5L25 25M5 25L25 5" 
                    stroke="url(#gold-gradient-thin)" 
                    strokeWidth="1" 
                />
                <circle cx="15" cy="15" r="2.5" fill="url(#gold-gradient-thin)" />
                
                {/* Small decorative whisps */}
                <path d="M40 2C45 2 50 5 50 10" stroke="url(#gold-gradient-thin)" strokeWidth="0.8" opacity="0.6" />
                <path d="M2 40C2 45 5 50 10 50" stroke="url(#gold-gradient-thin)" strokeWidth="0.8" opacity="0.6" />

                <defs>
                    <linearGradient id="gold-gradient-thin" x1="0" y1="0" x2="100" y2="100">
                        <stop offset="0%" stopColor="#D1A435" />
                        <stop offset="30%" stopColor="#FFD166" />
                        <stop offset="50%" stopColor="#FFFFFF" />
                        <stop offset="70%" stopColor="#FFD166" />
                        <stop offset="100%" stopColor="#D1A435" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
};

const CenterNotch = ({ position }: { position: 'top' | 'bottom' }) => (
    <div 
        className={`absolute left-1/2 -translate-x-1/2 pointer-events-none z-30 w-12 h-4`}
        style={{ [position]: '-1px' }}
    >
        <svg viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path 
                d={position === 'top' ? "M0 2H40L50 12L60 2H100" : "M0 38H40L50 28L60 38H100"} 
                stroke="url(#gold-gradient-thin)" 
                strokeWidth="1.5"
            />
            <path 
                d={position === 'top' ? "M45 2L50 7L55 2" : "M45 38L50 33L55 38"} 
                stroke="url(#gold-gradient-thin)" 
                strokeWidth="0.8"
                opacity="0.8"
            />
        </svg>
    </div>
);

export default function GoldFrame({ children, isActive = false, className = '', color = '#FFD166' }: GoldFrameProps) {
    return (
        <div className={`relative ${className} group transition-all duration-1000`}>
            {/* Main Thin Gold Border - Increased opacity */}
            <div 
                className="absolute inset-0 pointer-events-none z-20"
                style={{
                    border: '1px solid transparent',
                    borderImage: 'linear-gradient(90deg, transparent 0%, #D1A435 20%, #FFD166 50%, #D1A435 80%, transparent 100%) 1',
                    opacity: isActive ? 1.0 : 0.4,
                    transition: 'opacity 0.8s ease',
                }}
            />

            {/* Vertical borders need separate styling because borderImage with linear-gradient is tricky for all 4 sides at once if we want transparency at ends */}
            <div className="absolute inset-y-0 left-0 w-[1px] pointer-events-none z-20"
                style={{ background: 'linear-gradient(to bottom, transparent, #D1A435 20%, #D1A435 80%, transparent)', opacity: isActive ? 1.0 : 0.4 }}
            />
            <div className="absolute inset-y-0 right-0 w-[1px] pointer-events-none z-20"
                style={{ background: 'linear-gradient(to bottom, transparent, #D1A435 20%, #D1A435 80%, transparent)', opacity: isActive ? 1.0 : 0.4 }}
            />

            {/* Corner Decorations */}
            <CornerDecoration position="tl" />
            <CornerDecoration position="tr" />
            <CornerDecoration position="bl" />
            <CornerDecoration position="br" />

            {/* Center Notches */}
            <CenterNotch position="top" />
            <CenterNotch position="bottom" />

            {/* Background with deep void feel & subtle glow */}
            <div 
                className="relative z-10 h-full w-full overflow-hidden"
                style={{
                    background: isActive 
                        ? `linear-gradient(165deg, #0A0A20 0%, #020205 100%)` 
                        : `linear-gradient(165deg, #050510 0%, #000000 100%)`,
                    transition: 'background 1s ease',
                    boxShadow: isActive ? `inset 0 0 60px ${color}10, 0 0 40px rgba(0,0,0,0.8)` : 'none',
                }}
            >
                {/* Ethereal texture overlay - Opacity increased for visibility */}
                <div className="absolute inset-0 opacity-[0.25] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]" />
                
                {children}
            </div>

            {/* Outer Glow Aura */}
            <motion.div
                className="absolute -inset-10 z-0 pointer-events-none opacity-0 group-hover:opacity-100"
                animate={isActive ? {
                    opacity: [0.1, 0.2, 0.1],
                } : { opacity: 0 }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                style={{
                    background: `radial-gradient(circle at center, ${color}15 0%, transparent 70%)`,
                }}
            />
        </div>
    );
}
