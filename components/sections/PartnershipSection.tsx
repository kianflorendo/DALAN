'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import SerpentDivider from '@/components/ui/SerpentDivider';
import { fadeUpVariant, staggerContainer } from '@/lib/motion-variants';
import { MOON_CONFIGS } from '@/lib/moon-config';

// ============ 3D MOON SOLAR SYSTEM COMPONENTS ============

function CosmicSolarMoon({ moon, index, total }: { moon: any; index: number; total: number }) {
    // Distribute moons evenly around the circle to prevent collisions
    const startRotation = (index / total) * 360;
    
    return (
        <motion.div
            className="absolute top-1/2 left-1/2"
            initial={{ rotate: startRotation }}
            animate={{ rotate: startRotation + 360 }}
            transition={{
                duration: 60, // Unified duration: 60s for all moons = perfect formation, no collisions
                repeat: Infinity,
                ease: "linear"
            }}
            style={{ width: 0, height: 0, transformStyle: 'preserve-3d' }}
        >
            {/* The Orbital Radius Offset - REDUCED for better on-screen fit */}
            <div className="absolute" style={{ transform: `translateX(${160 + index * 25}px)`, transformStyle: 'preserve-3d' }}>
                {/* Counter-rotation to keep moon upright relative to the orbit plane */}
                <motion.div
                    initial={{ rotate: -startRotation }}
                    animate={{ rotate: -(startRotation + 360) }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    {/* Un-tilt the 3D plane so the moon faces the camera directly - Adjusted for new 65deg tilt */}
                    <div className="absolute flex items-center justify-center" style={{ transform: 'translate(-50%, -50%) rotateX(-65deg)' }}>
                        {/* High-Fidelity Realistic 3D SVG Moon */}
                        <div className="relative group">
                            {/* Atmospheric Glow Bloom */}
                            <div 
                                className="absolute -inset-10 rounded-full blur-3xl transition-opacity duration-700 opacity-20 group-hover:opacity-45"
                                style={{ background: `radial-gradient(circle, ${moon.color} 0%, transparent 75%)` }}
                            />
                            
                            <svg 
                                viewBox="0 0 100 100" 
                                width={42 + (index % 3) * 10} 
                                height={42 + (index % 3) * 10} 
                                style={{ 
                                    filter: `
                                        drop-shadow(0 0 15px ${moon.color}88) 
                                        drop-shadow(0 0 35px ${moon.color}33)
                                    ` 
                                }}
                            >
                                <defs>
                                    <radialGradient id={`solarMoon-${moon.id}-base`} cx="25%" cy="25%" r="80%">
                                        <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                                        <stop offset="15%" stopColor={moon.color} stopOpacity="0.95" />
                                        <stop offset="50%" stopColor={moon.color} stopOpacity="0.7" />
                                        <stop offset="85%" stopColor="#0a0a1a" stopOpacity="0.9" />
                                        <stop offset="100%" stopColor="#000000" stopOpacity="1" />
                                    </radialGradient>
                                    <radialGradient id={`solarMoon-${moon.id}-shadow`} cx="75%" cy="75%" r="65%">
                                        <stop offset="0%" stopColor="#000" stopOpacity="0" />
                                        <stop offset="35%" stopColor="#000" stopOpacity="0.6" />
                                        <stop offset="75%" stopColor="#000" stopOpacity="0.9" />
                                        <stop offset="100%" stopColor="#000" stopOpacity="1" />
                                    </radialGradient>
                                    <filter id={`solarMoon-${moon.id}-noise`}>
                                        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" seed={index * 19 + 7} stitchTiles="stitch" />
                                        <feColorMatrix type="saturate" values="0" />
                                        <feBlend in="SourceGraphic" mode="multiply" />
                                    </filter>
                                    <clipPath id={`solarMoon-${moon.id}-clip`}>
                                        <circle cx="50" cy="50" r="48" />
                                    </clipPath>
                                </defs>
                                
                                <circle cx="50" cy="50" r="48" fill="#000000" />
                                <circle cx="50" cy="50" r="48" fill={`url(#solarMoon-${moon.id}-base)`} />
                                <circle cx="50" cy="50" r="48" fill={`url(#solarMoon-${moon.id}-base)`} filter={`url(#solarMoon-${moon.id}-noise)`} opacity="0.45" clipPath={`url(#solarMoon-${moon.id}-clip)`} />
                                
                                <g clipPath={`url(#solarMoon-${moon.id}-clip)`}>
                                    <g opacity="0.3">
                                        <ellipse cx="38" cy="30" rx="8" ry="7" fill="rgba(0,0,0,0.5)" />
                                        <ellipse cx="60" cy="42" rx="5.5" ry="5" fill="rgba(0,0,0,0.4)" />
                                        <circle cx="30" cy="55" r="3.5" fill="rgba(0,0,0,0.4)" />
                                        <circle cx="52" cy="65" r="5" fill="rgba(0,0,0,0.5)" />
                                        <ellipse cx="42" cy="40" rx="16" ry="12" fill="#000" opacity="0.2" />
                                        <ellipse cx="62" cy="55" rx="10" ry="14" fill="#000" opacity="0.2" />
                                    </g>

                                    <g opacity="0.1">
                                        <path d="M 50 2 A 48 48 0 0 1 98 50 A 40 48 0 0 0 50 2" fill="#ffffff" />
                                        <path d="M 10 50 L 20 48 L 15 55 Z" fill={moon.color} />
                                        <path d="M 80 40 L 90 42 L 85 35 Z" fill={moon.color} />
                                        <line x1="0" y1="50" x2="100" y2="50" stroke={moon.color} strokeWidth="0.5" />
                                        <line x1="50" y1="0" x2="50" y2="100" stroke={moon.color} strokeWidth="0.5" />
                                        <line x1="20" y1="20" x2="25" y2="25" stroke={moon.color} strokeWidth="0.3" />
                                        <line x1="20" y1="25" x2="25" y2="20" stroke={moon.color} strokeWidth="0.3" />
                                        <line x1="75" y1="75" x2="80" y2="80" stroke={moon.color} strokeWidth="0.4" />
                                        <line x1="75" y1="80" x2="80" y2="75" stroke={moon.color} strokeWidth="0.4" />
                                    </g>
                                </g>

                                <circle cx="50" cy="50" r="48" fill={`url(#solarMoon-${moon.id}-shadow)`} />

                                <g clipPath={`url(#solarMoon-${moon.id}-clip)`}>
                                    <path 
                                        d="M 12 35 A 48 48 0 0 1 35 12" 
                                        fill="none" 
                                        stroke="#ffffff" 
                                        strokeWidth="2.5" 
                                        strokeLinecap="round" 
                                        opacity="0.35" 
                                        style={{ filter: 'blur(1.5px)' }}
                                    />
                                    <ellipse cx="28" cy="26" rx="16" ry="11" fill="rgba(255,255,255,0.2)" transform="rotate(-35 28 26)" style={{ filter: 'blur(2.5px)' }} />
                                </g>

                                <circle cx="50" cy="50" r="48.5" fill="none" stroke={moon.color} strokeWidth="1.2" opacity="0.4" />
                                <circle cx="50" cy="50" r="49.5" fill="none" stroke="#ffffff" strokeWidth="0.3" opacity="0.2" />

                                <ellipse cx="50" cy="50" rx="64" ry="20" fill="none" stroke={moon.color} strokeWidth="0.4" transform="rotate(30 50 50)" opacity="0.1" />
                                <ellipse cx="50" cy="50" rx="60" ry="14" fill="none" stroke={moon.color} strokeWidth="0.3" transform="rotate(-15 50 50)" opacity="0.07" />
                            </svg>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}

function MoonSolarSystem3D() {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
            {/* Background Atmosphere */}
            <div className="absolute inset-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vh] opacity-25"
                    style={{ background: 'radial-gradient(circle, rgba(91,91,255,0.12) 0%, rgba(0,212,160,0.06) 35%, transparent 70%)', filter: 'blur(100px)' }}
                />
            </div>

            {/* True 3D Perspective Scene */}
            <div 
                className="relative flex items-center justify-center w-full h-full"
                style={{ 
                    perspective: '1400px',
                    transformStyle: 'preserve-3d'
                }}
            >
                {/* Tilted Orbital Plane */}
                <div 
                    className="relative flex items-center justify-center"
                    style={{ 
                        transform: 'rotateX(72deg) translateY(15%)',
                        transformStyle: 'preserve-3d'
                    }}
                >
                    {/* Orbit Rings - Reduced to 3 key orbits for a cleaner look */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px]" style={{ transformStyle: 'preserve-3d' }}>
                        <svg width="1200" height="1200" viewBox="0 0 1200 1200" className="absolute pointer-events-none overflow-visible">
                            {/* Inner, Middle, and Outer rings only */}
                            {[0, 3, 6].map((idx) => {
                                const moon = MOON_CONFIGS[idx];
                                const radius = 220 + idx * 35;
                                return (
                                    <circle
                                        key={`ring-${idx}`}
                                        cx="600"
                                        cy="600"
                                        r={radius}
                                        fill="none"
                                        stroke={moon.color}
                                        strokeWidth="0.8"
                                        strokeOpacity="0.2"
                                        style={{ filter: `blur(0.5px) drop-shadow(0 0 4px ${moon.color}33)` }}
                                    />
                                );
                            })}
                        </svg>
                    </div>

                    {/* Central Core Glow - Embedded in 3D plane so moons orbit AROUND it */}
                    <div className="absolute top-1/2 left-1/2" style={{ transform: 'translate(-50%, -50%) rotateX(-72deg)' }}>
                        <motion.div 
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-white blur-[80px] opacity-15"
                            animate={{ scale: [1, 1.25, 1], opacity: [0.1, 0.2, 0.1] }}
                            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <motion.div 
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-[#FFD166] blur-[35px] opacity-40"
                            animate={{ scale: [1, 1.15, 1] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </div>

                    {/* The Moons - Real 3D Orbits, Collision Proof */}
                    {MOON_CONFIGS.map((moon, i) => (
                        <CosmicSolarMoon key={moon.id} moon={moon} index={i} total={MOON_CONFIGS.length} />
                    ))}
                </div>
            </div>

            {/* Background Twinkling Stars - Increased density for more vibrancy */}
            {[...Array(200)].map((_, i) => {
                const size = Math.random() * 1.5 + 0.5;
                const colors = ['#ffffff', '#7FDBFF', '#FFD166', '#C8B8FF'];
                const color = colors[Math.floor(Math.random() * colors.length)];
                return (
                    <motion.div
                        key={i}
                        className="absolute rounded-full"
                        style={{
                            width: size,
                            height: size,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            backgroundColor: color,
                            boxShadow: size > 1.2 ? `0 0 4px ${color}` : 'none',
                        }}
                        animate={{ 
                            opacity: [0.1, 0.7, 0.1],
                            scale: size > 1 ? [1, 1.3, 1] : [1, 1.1, 1]
                        }}
                        transition={{ 
                            duration: 2 + Math.random() * 5, 
                            repeat: Infinity, 
                            delay: Math.random() * 10,
                            ease: "easeInOut"
                        }}
                    />
                );
            })}
        </div>
    );
}

const TIERS = [
    {
        name: 'Crescent',
        subtitle: 'Affiliate Partner',
        color: '#7FDBFF',
        price: 'Free',
        benefits: [
            'Co-branded marketing materials',
            'Access to educator community',
            'Monthly newsletter & insights',
            'Affiliate referral program',
        ],
        cta: 'Apply',
        highlight: false,
    },
    {
        name: 'Half Moon',
        subtitle: 'Institutional Partner',
        color: '#FFD166',
        price: 'Custom',
        benefits: [
            'All Crescent benefits',
            'Bulk licensing for students',
            'Custom curriculum integration',
            'Dedicated account manager',
            'Analytics dashboard access',
            'Priority support channel',
        ],
        cta: 'Apply',
        highlight: true,
    },
    {
        name: 'Full Moon',
        subtitle: 'Strategic Partner',
        color: '#C8B8FF',
        price: 'Enterprise',
        benefits: [
            'All Half Moon benefits',
            'Co-development opportunities',
            'White-label options',
            'Research collaboration',
            'Board advisory access',
            'Revenue sharing model',
            'Dedicated engineering support',
        ],
        cta: 'Contact Us',
        highlight: false,
    },
];

const PARTNERS: { name: string; logo: string; showName?: boolean }[] = [
    { name: 'Axon Enjin', logo: '/partners/axon enjin.png', showName: false },
    { name: 'Google Developer Group', logo: '/partners/Google Dev Group Logo.png', showName: false },
    { name: 'Seekers Guild', logo: '/partners/SG Official Logo.png', showName: true },
];

const WHY_PARTNER_ICONS: Record<string, React.ReactNode> = {
    reach: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="14" stroke="#7FDBFF" strokeWidth="1.5" opacity="0.6" />
            <circle cx="20" cy="20" r="8" stroke="#FFD166" strokeWidth="1.2" opacity="0.8" />
            <ellipse cx="20" cy="20" rx="14" ry="6" stroke="#7FDBFF" strokeWidth="1" opacity="0.4" />
            <circle cx="20" cy="12" r="2" fill="#FFD166" opacity="0.9" />
            <circle cx="28" cy="22" r="1.5" fill="#7FDBFF" opacity="0.7" />
            <circle cx="13" cy="25" r="1.8" fill="#C8B8FF" opacity="0.7" />
            <line x1="20" y1="12" x2="28" y2="22" stroke="#7FDBFF" strokeWidth="0.6" opacity="0.3" />
            <line x1="28" y1="22" x2="13" y2="25" stroke="#7FDBFF" strokeWidth="0.6" opacity="0.3" />
            <line x1="13" y1="25" x2="20" y2="12" stroke="#7FDBFF" strokeWidth="0.6" opacity="0.3" />
        </svg>
    ),
    technology: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 4L22.5 16L20 14L17.5 16L20 4Z" fill="#FFD166" opacity="0.9" />
            <path d="M20 36L17.5 24L20 26L22.5 24L20 36Z" fill="#FFD166" opacity="0.6" />
            <path d="M4 20L16 17.5L14 20L16 22.5L4 20Z" fill="#FFD166" opacity="0.6" />
            <path d="M36 20L24 22.5L26 20L24 17.5L36 20Z" fill="#FFD166" opacity="0.6" />
            <circle cx="20" cy="20" r="5" stroke="#FFD166" strokeWidth="1.5" />
            <circle cx="20" cy="20" r="2" fill="#FFD166" opacity="0.8" />
            <circle cx="20" cy="20" r="10" stroke="#7FDBFF" strokeWidth="0.8" opacity="0.3" strokeDasharray="3 3" />
        </svg>
    ),
    cobranding: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 8a10 10 0 1 0 0 20" stroke="#C8B8FF" strokeWidth="1.5" fill="none" />
            <circle cx="16" cy="18" r="10" stroke="#FFD166" strokeWidth="1.5" fill="none" opacity="0.8" />
            <path d="M16 8a10 10 0 0 1 5.5 3.4" stroke="#FFD166" strokeWidth="1.5" fill="none" opacity="0" />
            <circle cx="20" cy="18" r="3" fill="#7FDBFF" opacity="0.25" />
            <circle cx="11" cy="18" r="1.5" fill="#FFD166" opacity="0.6" />
            <circle cx="29" cy="18" r="1.5" fill="#C8B8FF" opacity="0.6" />
        </svg>
    ),
    research: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="18" cy="18" r="9" stroke="#7FDBFF" strokeWidth="1.5" opacity="0.7" />
            <path d="M18 11a7 7 0 0 0-5 2" stroke="#C8B8FF" strokeWidth="1" opacity="0.5" strokeLinecap="round" />
            <line x1="25" y1="25" x2="33" y2="33" stroke="#FFD166" strokeWidth="2" strokeLinecap="round" />
            <circle cx="18" cy="18" r="4" stroke="#7FDBFF" strokeWidth="0.8" opacity="0.3" />
            <circle cx="12" cy="8" r="1" fill="#FFD166" opacity="0.5" />
            <circle cx="30" cy="10" r="0.8" fill="#C8B8FF" opacity="0.4" />
            <circle cx="8" cy="28" r="0.8" fill="#7FDBFF" opacity="0.4" />
        </svg>
    ),
};

const WHY_PARTNER = [
    { iconKey: 'reach', title: 'Reach', description: '10,000+ learners across the Philippines' },
    { iconKey: 'technology', title: 'Technology', description: 'State-of-the-art AI/ML infrastructure' },
    { iconKey: 'cobranding', title: 'Co-branding', description: 'Joint marketing and brand visibility' },
    { iconKey: 'research', title: 'Research Access', description: 'Education data & research collaboration' },
];

// Realistic SVG moon for each tier phase
function TierMoon({ index, color }: { index: number; color: string }) {
    const id = `tierMoon-${index}`;
    return (
        <div className="relative" style={{ width: 100, height: 100 }}>
            {/* Outer glow aura */}
            <div
                className="absolute -inset-6 rounded-full pointer-events-none"
                style={{
                    background: `radial-gradient(circle, ${color}20 0%, ${color}08 40%, transparent 70%)`,
                    filter: 'blur(8px)',
                }}
                aria-hidden="true"
            />
            <svg viewBox="0 0 100 100" width="100" height="100" style={{ filter: `drop-shadow(0 0 18px ${color}60)` }}>
                <defs>
                    <radialGradient id={`${id}-base`} cx="38%" cy="35%" r="55%">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                        <stop offset="20%" stopColor={color} stopOpacity="0.85" />
                        <stop offset="55%" stopColor={color} stopOpacity="0.4" />
                        <stop offset="80%" stopColor="#1a1a2e" stopOpacity="0.85" />
                        <stop offset="100%" stopColor="#0a0a14" stopOpacity="0.95" />
                    </radialGradient>
                    <radialGradient id={`${id}-shadow`} cx="70%" cy="50%" r="55%">
                        <stop offset="0%" stopColor="#000" stopOpacity="0.55" />
                        <stop offset="50%" stopColor="#000" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#000" stopOpacity="0" />
                    </radialGradient>
                    <filter id={`${id}-noise`}>
                        <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="4" seed={index * 31 + 7} stitchTiles="stitch" />
                        <feColorMatrix type="saturate" values="0" />
                        <feBlend in="SourceGraphic" mode="multiply" />
                    </filter>
                    <clipPath id={`${id}-clip`}>
                        <circle cx="50" cy="50" r="48" />
                    </clipPath>
                    {/* Phase masks */}
                    {index === 0 && (
                        <mask id={`${id}-crescent`}>
                            <rect width="100" height="100" fill="white" />
                            <circle cx="62" cy="48" r="40" fill="black" />
                        </mask>
                    )}
                    {index === 1 && (
                        <mask id={`${id}-half`}>
                            <rect width="100" height="100" fill="white" />
                            <rect x="0" y="0" width="48" height="100" fill="black" />
                        </mask>
                    )}
                </defs>

                {/* Dark base sphere visible behind phase mask */}
                <circle cx="50" cy="50" r="48" fill="#0a0a14" />
                <circle cx="50" cy="50" r="48" fill={`url(#${id}-base)`} opacity="0.15" />

                {/* Lit surface with phase mask */}
                <g mask={index < 2 ? `url(#${id}-${index === 0 ? 'crescent' : 'half'})` : undefined}>
                    <circle cx="50" cy="50" r="48" fill={`url(#${id}-base)`} />
                    <circle cx="50" cy="50" r="48" fill={`url(#${id}-base)`} filter={`url(#${id}-noise)`} opacity="0.35" clipPath={`url(#${id}-clip)`} />
                    {/* Craters */}
                    <g clipPath={`url(#${id}-clip)`} opacity="0.4">
                        <ellipse cx="38" cy="30" rx="8" ry="7" fill="rgba(0,0,0,0.2)" />
                        <ellipse cx="60" cy="42" rx="5.5" ry="5" fill="rgba(0,0,0,0.18)" />
                        <circle cx="30" cy="55" r="3.5" fill="rgba(0,0,0,0.15)" />
                        <circle cx="52" cy="65" r="5" fill="rgba(0,0,0,0.18)" />
                        <circle cx="70" cy="58" r="2.8" fill="rgba(0,0,0,0.12)" />
                        <circle cx="45" cy="22" r="2.2" fill="rgba(0,0,0,0.1)" />
                        <circle cx="34" cy="72" r="3.2" fill="rgba(0,0,0,0.13)" />
                    </g>
                    {/* Mare regions */}
                    <g clipPath={`url(#${id}-clip)`} opacity="0.1">
                        <ellipse cx="42" cy="40" rx="16" ry="12" fill="#000" />
                        <ellipse cx="62" cy="55" rx="10" ry="14" fill="#000" />
                    </g>
                    {/* Terminator shadow */}
                    <circle cx="50" cy="50" r="48" fill={`url(#${id}-shadow)`} />
                    {/* Specular highlights */}
                    <ellipse cx="38" cy="32" rx="11" ry="9" fill="rgba(255,255,255,0.12)" />
                    <ellipse cx="35" cy="28" rx="5" ry="3.5" fill="rgba(255,255,255,0.2)" />
                </g>

                {/* Earthshine on dark side for crescent & half */}
                {index < 2 && (
                    <g clipPath={`url(#${id}-clip)`}>
                        <circle cx="50" cy="50" r="47" fill="none" stroke={color} strokeWidth="0.5" opacity="0.08" />
                        <circle cx={index === 0 ? '35' : '25'} cy="50" r="30" fill={color} opacity="0.03" />
                    </g>
                )}

                {/* Atmosphere rim */}
                <circle cx="50" cy="50" r="47.5" fill="none" stroke={color} strokeWidth="1.5" opacity="0.3" />
                <circle cx="50" cy="50" r="48.5" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
            </svg>
        </div>
    );
}

function NebulaDancingBackground() {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
            {/* Soft drifting nebula clouds */}
            {[
                { color: '#7FDBFF', top: '10%', left: '5%', size: '600px', delay: 0, duration: 25 },
                { color: '#FFD166', top: '40%', right: '0%', size: '700px', delay: 5, duration: 30 },
                { color: '#C8B8FF', bottom: '10%', left: '15%', size: '550px', delay: 2, duration: 28 },
                { color: '#5B5BFF', top: '20%', right: '20%', size: '650px', delay: 8, duration: 35 },
            ].map((nebula, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full opacity-60 blur-[80px]"
                    style={{
                        width: nebula.size,
                        height: nebula.size,
                        top: nebula.top,
                        left: nebula.left,
                        right: nebula.right,
                        bottom: nebula.bottom,
                        background: `radial-gradient(circle, ${nebula.color}66 0%, ${nebula.color}33 40%, transparent 70%)`,
                    }}
                    animate={{
                        x: [0, 60, -40, 0],
                        y: [0, -50, 50, 0],
                        scale: [1, 1.2, 0.85, 1],
                        opacity: [0.4, 0.7, 0.4],
                    }}
                    transition={{
                        duration: nebula.duration,
                        repeat: Infinity,
                        delay: nebula.delay,
                        ease: "easeInOut",
                    }}
                />
            ))}
            
            {/* Subtle drifting space dust */}
            <div className="absolute inset-0 opacity-30">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={`dust-${i}`}
                        className="absolute w-1 h-1 bg-white rounded-full"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -100],
                            x: [0, (Math.random() - 0.5) * 50],
                            opacity: [0, 0.5, 0],
                        }}
                        transition={{
                            duration: 10 + Math.random() * 20,
                            repeat: Infinity,
                            delay: Math.random() * 10,
                            ease: "linear",
                        }}
                    />
                ))}
            </div>

            {/* Twinkling tiny stars */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(100)].map((_, i) => {
                    const size = Math.random() * 1.5 + 0.5;
                    const colors = ['#ffffff', '#7FDBFF', '#FFD166', '#C8B8FF'];
                    const color = colors[Math.floor(Math.random() * colors.length)];
                    return (
                        <motion.div
                            key={`star-${i}`}
                            className="absolute rounded-full"
                            style={{
                                width: size,
                                height: size,
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                backgroundColor: color,
                                boxShadow: size > 1.2 ? `0 0 4px ${color}` : 'none',
                            }}
                            animate={{ 
                                opacity: [0.1, 0.8, 0.1],
                                scale: size > 1 ? [1, 1.2, 1] : [1, 1.1, 1]
                            }}
                            transition={{ 
                                duration: 3 + Math.random() * 5, 
                                repeat: Infinity, 
                                delay: Math.random() * 5,
                                ease: "easeInOut"
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default function PartnershipSection() {
    const [form, setForm] = useState({
        orgName: '',
        type: '',
        contact: '',
        email: '',
        description: '',
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Mock submission
        await new Promise((r) => setTimeout(r, 1000));
        setSubmitted(true);
    };

    return (
        <div id="partnership" className="relative" style={{ backgroundColor: 'var(--color-void)' }}>
            {/* Hero — Full Screen Immersive Background */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* The 3D Solar System Background - Now truly edge-to-edge */}
                <div className="absolute inset-0 z-0">
                    <MoonSolarSystem3D />
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
                    <motion.div
                        className="text-center max-w-3xl mx-auto"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <motion.p
                            variants={fadeUpVariant}
                            className="text-xs tracking-[0.3em] uppercase mb-4"
                            style={{ fontFamily: 'var(--font-heading)', color: '#7FDBFF' }}
                        >
                            The Moons Align
                        </motion.p>
                        <motion.h1
                            variants={fadeUpVariant}
                            custom={1}
                            className="text-3xl md:text-4xl lg:text-5xl mb-6"
                            style={{ fontFamily: 'var(--font-display)', color: '#FFD166' }}
                        >
                            Build the Future of ASEAN Education With Us
                        </motion.h1>
                        <motion.p
                            variants={fadeUpVariant}
                            custom={2}
                            className="text-lg md:text-xl"
                            style={{ color: '#A09A8E', fontFamily: 'var(--font-body)' }}
                        >
                            The Bakunawa calls for allies. Join us in lighting the path for every ASEAN learner.
                        </motion.p>
                    </motion.div>
                </div>

                {/* Bottom transition divider - moved inside for seamless background */}
                <div className="absolute bottom-0 left-0 right-0 z-20">
                    <div className="max-w-7xl mx-auto px-6">
                        <SerpentDivider />
                    </div>
                </div>
            </section>

            {/* Tiers Section with Full-Width Nebula Background */}
            <section className="relative py-16 overflow-hidden">
                <NebulaDancingBackground />
                
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    {/* Partnership Tiers */}
                    <motion.h2
                        className="text-3xl text-center mb-12"
                        style={{ fontFamily: 'var(--font-heading)', color: '#FFD166' }}
                        variants={fadeUpVariant}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        Partnership Tiers
                    </motion.h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        {TIERS.map((tier, i) => (
                            <motion.div
                                key={i}
                                className="relative rounded-2xl p-8 flex flex-col"
                                style={{
                                    backgroundColor: 'rgba(8,8,18,0.45)',
                                    backdropFilter: 'blur(12px)',
                                    WebkitBackdropFilter: 'blur(12px)',
                                    border: '1px solid rgba(255,209,102,0.25)',
                                    boxShadow: tier.highlight
                                        ? '0 0 50px rgba(255,209,102,0.1), inset 0 0 60px rgba(255,209,102,0.04)'
                                        : '0 0 30px rgba(255,209,102,0.04), inset 0 0 40px rgba(255,209,102,0.02)',
                                }}
                                variants={fadeUpVariant}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                custom={i}
                                whileHover={{
                                    borderColor: 'rgba(255,209,102,0.4)',
                                    boxShadow: '0 0 50px rgba(255,209,102,0.1), inset 0 0 60px rgba(255,209,102,0.03)',
                                }}
                            >
                                {/* Nebula background effects inside card */}
                                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl" aria-hidden="true">
                                    {/* Drifting nebula cloud 1 */}
                                    <motion.div
                                        className="absolute rounded-full"
                                        style={{
                                            width: '200%',
                                            height: '70%',
                                            top: '-15%',
                                            left: '-50%',
                                            background: `radial-gradient(ellipse, ${tier.color}44 0%, ${tier.color}22 35%, transparent 70%)`,
                                            filter: 'blur(20px)',
                                        }}
                                        animate={{ 
                                            x: [0, 50, -30, 0], 
                                            y: [0, -25, 25, 0],
                                            opacity: [0.5, 1, 0.5] 
                                        }}
                                        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: i * 2 }}
                                    />
                                    {/* Drifting nebula cloud 2 */}
                                    <motion.div
                                        className="absolute rounded-full"
                                        style={{
                                            width: '180%',
                                            height: '60%',
                                            bottom: '-10%',
                                            right: '-40%',
                                            background: `radial-gradient(ellipse, ${tier.color}33 0%, ${tier.color}18 45%, transparent 75%)`,
                                            filter: 'blur(18px)',
                                        }}
                                        animate={{ 
                                            x: [0, -40, 40, 0], 
                                            y: [0, 25, -25, 0],
                                            opacity: [0.4, 0.9, 0.4] 
                                        }}
                                        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: i * 1.5 }}
                                    />
                                    {/* Third nebula cloud for more depth */}
                                    <motion.div
                                        className="absolute rounded-full"
                                        style={{
                                            width: '120%',
                                            height: '80%',
                                            top: '20%',
                                            left: '-10%',
                                            background: `radial-gradient(ellipse, ${tier.color}28 0%, transparent 60%)`,
                                            filter: 'blur(25px)',
                                        }}
                                        animate={{ 
                                            x: [0, 30, -20, 0], 
                                            y: [0, -15, 15, 0],
                                            opacity: [0.3, 0.7, 0.3] 
                                        }}
                                        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: i * 3 }}
                                    />
                                    {/* Cosmic dust particles */}
                                    {Array.from({ length: 8 }).map((_, pi) => {
                                        const seed = i * 20 + pi;
                                        return (
                                            <motion.div
                                                key={pi}
                                                className="absolute rounded-full"
                                                style={{
                                                    width: 2 + (seed % 2),
                                                    height: 2 + (seed % 2),
                                                    left: `${10 + (seed * 13.7) % 80}%`,
                                                    top: `${10 + (seed * 17.3) % 80}%`,
                                                    backgroundColor: pi % 3 === 0 ? tier.color : '#F0EDE8',
                                                    boxShadow: `0 0 4px ${pi % 3 === 0 ? tier.color : '#F0EDE8'}`,
                                                }}
                                                animate={{ opacity: [0.2, 0.7, 0.2], scale: [1, 1.5, 1] }}
                                                transition={{ duration: 2.5 + (pi % 3), repeat: Infinity, delay: pi * 0.5 }}
                                            />
                                        );
                                    })}
                                </div>

                                {tier.highlight && (
                                    <div
                                        className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs z-20"
                                        style={{
                                            backgroundColor: 'rgba(255,209,102,0.15)',
                                            border: '1px solid rgba(255,209,102,0.4)',
                                            color: '#FFD166',
                                            fontFamily: 'var(--font-ui)',
                                        }}
                                    >
                                        Most Popular
                                    </div>
                                )}

                                {/* Moon phase SVG */}
                                <div className="flex justify-center mb-6 mt-4 relative z-10">
                                    <motion.div
                                        aria-hidden="true"
                                        animate={{ y: [0, -8, 0] }}
                                        transition={{
                                            duration: 4,
                                            repeat: Infinity,
                                            ease: 'easeInOut',
                                            delay: i * 0.4,
                                        }}
                                    >
                                        <TierMoon index={i} color={tier.color} />
                                    </motion.div>
                                </div>

                                <h3
                                    className="text-xl text-center mb-1 relative z-10"
                                    style={{ fontFamily: 'var(--font-heading)', color: tier.color }}
                                >
                                    {tier.name}
                                </h3>
                                <p className="text-sm text-center mb-6 relative z-10" style={{ fontFamily: 'var(--font-ui)', color: '#A09A8E' }}>
                                    {tier.subtitle}
                                </p>

                                <ul className="space-y-3 flex-1 mb-8 relative z-10">
                                    {tier.benefits.map((benefit, j) => (
                                        <li key={j} className="flex items-start gap-2 text-sm" style={{ color: '#A09A8E', fontFamily: 'var(--font-body)' }}>
                                            <span style={{ color: tier.color, flexShrink: 0 }}>✦</span>
                                            {benefit}
                                        </li>
                                    ))}
                                </ul>

                                <div className="relative z-10">
                                <Button
                                    variant={tier.highlight ? 'solid' : 'ghost'}
                                    color={tier.color === '#FFD166' ? 'gold' : 'emerald'}
                                    href="#apply"
                                    className="w-full justify-center"
                                >
                                    {tier.cta}
                                </Button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <SerpentDivider />

                {/* Current Partners */}
                <section className="py-16">
                    <motion.h2
                        className="text-3xl text-center mb-12"
                        style={{ fontFamily: 'var(--font-heading)', color: '#FFD166' }}
                        variants={fadeUpVariant}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        Our Partners
                    </motion.h2>

                    <div className="flex flex-wrap items-center justify-center gap-16">
                        {PARTNERS.map((partner, i) => (
                            <motion.div
                                key={i}
                                className="flex flex-col items-center justify-center gap-3"
                                variants={fadeUpVariant}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                custom={i}
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                <Image
                                    src={partner.logo}
                                    alt={partner.name}
                                    width={partner.showName ? 140 : 220}
                                    height={partner.showName ? 140 : 220}
                                    className="object-contain"
                                    style={{ maxHeight: partner.showName ? '80px' : '120px', width: 'auto' }}
                                />
                                {partner.showName && (
                                    <span
                                        className="text-sm tracking-wide"
                                        style={{ fontFamily: 'var(--font-heading)', color: '#A09A8E' }}
                                    >
                                        {partner.name}
                                    </span>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </section>

                <SerpentDivider />

                {/* Why Partner */}
                <section className="py-16">
                    <motion.h2
                        className="text-3xl text-center mb-12"
                        style={{ fontFamily: 'var(--font-heading)', color: '#FFD166' }}
                        variants={fadeUpVariant}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        Why Partner With Us
                    </motion.h2>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {WHY_PARTNER.map((item, i) => (
                            <Card key={i} moonColor="#7FDBFF" delay={i}>
                                <div className="text-center">
                                    <div className="flex justify-center mb-3">
                                        {WHY_PARTNER_ICONS[item.iconKey]}
                                    </div>
                                    <h3 className="text-lg mb-2" style={{ fontFamily: 'var(--font-heading)', color: '#F0EDE8' }}>
                                        {item.title}
                                    </h3>
                                    <p className="text-sm" style={{ fontFamily: 'var(--font-body)', color: '#A09A8E' }}>
                                        {item.description}
                                    </p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </section>

                <SerpentDivider />

                {/* Application Form */}
                <section id="apply" className="py-16 max-w-2xl mx-auto">
                    <motion.h2
                        className="text-3xl text-center mb-12"
                        style={{ fontFamily: 'var(--font-heading)', color: '#FFD166' }}
                        variants={fadeUpVariant}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        Apply for Partnership
                    </motion.h2>

                    {submitted ? (
                        <motion.div
                            className="text-center p-12 rounded-2xl"
                            style={{
                                backgroundColor: 'rgba(13,13,26,0.6)',
                                border: '1px solid rgba(0,212,160,0.3)',
                            }}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                        >
                            <div className="w-16 h-16 rounded-full mx-auto mb-6" style={{ backgroundColor: 'rgba(0,212,160,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <span className="text-3xl">✓</span>
                            </div>
                            <h3 className="text-2xl mb-4" style={{ fontFamily: 'var(--font-heading)', color: '#00D4A0' }}>
                                Application Received
                            </h3>
                            <p style={{ fontFamily: 'var(--font-body)', color: '#A09A8E' }}>
                                Thank you for your interest in partnering with Dalan. Our team will review your application and reach out within 5 business days.
                            </p>
                        </motion.div>
                    ) : (
                        <motion.form
                            onSubmit={handleSubmit}
                            className="space-y-6"
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            {[
                                { label: 'Organization Name', key: 'orgName', type: 'text' },
                                { label: 'Contact Person', key: 'contact', type: 'text' },
                                { label: 'Email Address', key: 'email', type: 'email' },
                            ].map((field) => (
                                <motion.div key={field.key} variants={fadeUpVariant}>
                                    <label
                                        className="block text-sm mb-2"
                                        style={{ fontFamily: 'var(--font-ui)', color: '#A09A8E' }}
                                    >
                                        {field.label}
                                    </label>
                                    <input
                                        type={field.type}
                                        required
                                        value={form[field.key as keyof typeof form]}
                                        onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl text-base outline-none transition-all duration-300"
                                        style={{
                                            backgroundColor: 'rgba(18,18,42,0.6)',
                                            border: '1px solid rgba(91,91,255,0.2)',
                                            color: '#F0EDE8',
                                            fontFamily: 'var(--font-body)',
                                        }}
                                        onFocus={(e) => { (e.target as HTMLElement).style.borderColor = 'rgba(0,212,160,0.5)'; }}
                                        onBlur={(e) => { (e.target as HTMLElement).style.borderColor = 'rgba(91,91,255,0.2)'; }}
                                    />
                                </motion.div>
                            ))}

                            <motion.div variants={fadeUpVariant}>
                                <label className="block text-sm mb-2" style={{ fontFamily: 'var(--font-ui)', color: '#A09A8E' }}>
                                    Partnership Type
                                </label>
                                <select
                                    required
                                    value={form.type}
                                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl text-base outline-none"
                                    style={{
                                        backgroundColor: 'rgba(18,18,42,0.6)',
                                        border: '1px solid rgba(91,91,255,0.2)',
                                        color: '#F0EDE8',
                                        fontFamily: 'var(--font-body)',
                                    }}
                                >
                                    <option value="">Select a tier...</option>
                                    <option value="crescent">Crescent — Affiliate Partner</option>
                                    <option value="half">Half Moon — Institutional Partner</option>
                                    <option value="full">Full Moon — Strategic Partner</option>
                                </select>
                            </motion.div>

                            <motion.div variants={fadeUpVariant}>
                                <label className="block text-sm mb-2" style={{ fontFamily: 'var(--font-ui)', color: '#A09A8E' }}>
                                    Description of Interest
                                </label>
                                <textarea
                                    required
                                    rows={4}
                                    value={form.description}
                                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl text-base outline-none resize-none"
                                    style={{
                                        backgroundColor: 'rgba(18,18,42,0.6)',
                                        border: '1px solid rgba(91,91,255,0.2)',
                                        color: '#F0EDE8',
                                        fontFamily: 'var(--font-body)',
                                    }}
                                    onFocus={(e) => { (e.target as HTMLElement).style.borderColor = 'rgba(0,212,160,0.5)'; }}
                                    onBlur={(e) => { (e.target as HTMLElement).style.borderColor = 'rgba(91,91,255,0.2)'; }}
                                />
                            </motion.div>

                            <motion.div variants={fadeUpVariant} className="pt-4">
                                <Button variant="solid" color="emerald" type="submit">
                                    Submit Application
                                </Button>
                            </motion.div>
                        </motion.form>
                    )}
                </section>
            </section>
        </div>
    );
}
