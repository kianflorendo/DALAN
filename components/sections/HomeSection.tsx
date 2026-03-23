'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import MoonTag from '@/components/ui/MoonTag';
import SerpentDivider from '@/components/ui/SerpentDivider';
import GoldFrame from '@/components/ui/GoldFrame';
import { MOON_CONFIGS } from '@/lib/moon-config';

// ============ MOON PHILOSOPHY DATA ============
const MOON_PHILOSOPHIES = [
    { philosophy: 'Curiosity & Awakening', desc: 'Every learning journey begins with a spark. Our AI detects natural curiosity patterns in students and nurtures them into structured exploration. Igniting the desire to learn before any formal lesson begins.' },
    { philosophy: 'Adaptive Discovery', desc: 'No two learners are the same. Our platform continuously maps each student\'s strengths, pace, and learning style to build a truly personalized K–12 curriculum experience, powered by real-time AI analysis.' },
    { philosophy: 'Deep Knowledge Building', desc: 'Moving beyond memorization into genuine understanding. Interactive STEM labs, AI-guided problem solving, and hands-on exercises develop lasting knowledge that transfers across subjects.' },
    { philosophy: 'Mastery Through Assessment', desc: 'Adaptive assessments that evolve with the learner. Our AI identifies knowledge gaps in real-time, adjusting difficulty and question types to ensure deep comprehension before advancing to new concepts.' },
    { philosophy: 'Cultural Roots & Identity', desc: 'Education rooted in Philippine values and mythology. We weave the narrative of the Bakunawa into every lesson connecting ancient wisdom to modern STEM, building identity alongside intellect.' },
    { philosophy: 'Community & Collaboration', desc: 'Learning amplified through connection. Students, teachers, and institutions collaborate across districts, sharing resources and insights. Turning individual progress into collective impact.' },
    { philosophy: 'Impact & Transformation', desc: 'The ultimate goal: learners who transform their communities. From acquired knowledge to actionable impact. Graduates of the Dalan path become innovators, educators, and leaders of tomorrow.' },
];

// ============ CSS KEYFRAMES FOR MOON ANIMATIONS ============
const moonAnimStyles = `
@keyframes moonSpin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
@keyframes moonSpinReverse {
  from { transform: rotate(360deg); }
  to { transform: rotate(0deg); }
}
@keyframes starTwinkle {
  0%, 100% { opacity: 0; transform: scale(0.3) rotate(0deg); }
  50% { opacity: 1; transform: scale(1) rotate(180deg); }
}
`;

// ============ REALISTIC MOON COMPONENT ============
function RealisticMoon({ color, id, size = 120, speed = 60, reverse = false }: { color: string, id: string, size?: number, speed?: number, reverse?: boolean }) {
    return (
        <div className="relative" style={{ width: size, height: size }}>
            {/* Outer Glow Layer - PULSATING */}
            <motion.div
                className="absolute inset-0 rounded-full blur-[40px]"
                style={{
                    background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
                    transform: 'scale(1.8)',
                }}
                animate={{
                    opacity: [0.2, 0.5, 0.2],
                    scale: [1.6, 2.0, 1.6],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* Spinning Surface Wrapper */}
            <motion.div
                className="w-full h-full relative"
                animate={{ rotate: reverse ? -360 : 360 }}
                transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
            >
                <svg viewBox="0 0 120 120" className="w-full h-full overflow-visible">
                    <defs>
                        {/* High-Quality Surface Texture Gradient */}
                        <radialGradient id={`grad-${id}`} cx="35%" cy="30%" r="65%">
                            <stop offset="0%" stopColor="#FFFFFF" />
                            <stop offset="25%" stopColor={color} />
                            <stop offset="60%" stopColor={color} stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#08081a" />
                        </radialGradient>

                        {/* Lunar Surface Texture Filter (Noise) */}
                        <filter id={`noise-${id}`}>
                            <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" stitchTiles="stitch" />
                            <feColorMatrix type="saturate" values="0" />
                            <feBlend in="SourceGraphic" mode="multiply" />
                        </filter>

                        {/* Shadow Mask */}
                        <radialGradient id={`shadow-${id}`} cx="70%" cy="70%" r="50%">
                            <stop offset="0%" stopColor="#000" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#000" stopOpacity="0" />
                        </radialGradient>

                        <clipPath id={`clip-${id}`}>
                            <circle cx="60" cy="60" r="58" />
                        </clipPath>
                    </defs>

                    {/* Main Moon Body */}
                    <circle cx="60" cy="60" r="58" fill={`url(#grad-${id})`} />

                    {/* Noise Texture Layer */}
                    <circle cx="60" cy="60" r="58" fill={`url(#grad-${id})`} filter={`url(#noise-${id})`} opacity="0.3" clipPath={`url(#clip-${id})`} />

                    {/* Craters - Explicitly drawn for realism */}
                    <g clipPath={`url(#clip-${id})`} opacity="0.4">
                        <circle cx="35" cy="40" r="8" fill="rgba(0,0,0,0.2)" />
                        <circle cx="75" cy="55" r="10" fill="rgba(0,0,0,0.2)" />
                        <circle cx="50" cy="80" r="6" fill="rgba(0,0,0,0.2)" />
                        <circle cx="85" cy="30" r="5" fill="rgba(0,0,0,0.15)" />
                        <circle cx="20" cy="70" r="7" fill="rgba(0,0,0,0.25)" />
                        <circle cx="55" cy="20" r="4" fill="rgba(0,0,0,0.1)" />
                    </g>

                    {/* Atmospheric Shadow (terminator line) */}
                    <circle cx="60" cy="60" r="58" fill={`url(#shadow-${id})`} />

                    {/* Final Rim Highlight */}
                    <circle cx="60" cy="60" r="58" fill="none" stroke="white" strokeWidth="0.5" opacity="0.2" />
                </svg>
            </motion.div>
        </div>
    );
}

// ============ PLATFORM INTRO (CLEAN DESIGN - VIDEO REMOVED) ============
function PlatformIntro() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start']
    });

    const yMove = useTransform(scrollYProgress, [0, 1], [0, -60]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center py-24 px-6 overflow-hidden bg-void">
            <style>{moonAnimStyles}</style>

            {/* Background Atmosphere - VIDEO REMOVED for clarity */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-void via-transparent to-void" />

                {/* Intense Ambient Glows - Sharp Imperial/Emerald */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[80vh] opacity-15 blur-[120px]"
                    style={{ background: 'radial-gradient(circle, var(--color-imperial-500) 0%, transparent 70%)' }}
                />
            </div>

            {/* Tiny Twinkling Stars - INCREASED DENSITY */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {[...Array(120)].map((_, i) => (
                    <div
                        key={`intro-star-${i}`}
                        className="absolute rounded-full"
                        style={{
                            width: Math.random() * 1.5 + 0.5 + 'px',
                            height: Math.random() * 1.5 + 0.5 + 'px',
                            background: i % 4 === 0 ? 'var(--color-gold)' : i % 4 === 1 ? 'var(--color-emerald)' : i % 4 === 2 ? '#FFF' : '#A09A8E',
                            left: Math.random() * 100 + '%',
                            top: Math.random() * 100 + '%',
                            opacity: Math.random() * 0.5 + 0.1,
                            boxShadow: i % 5 === 0 ? `0 0 6px currentColor` : 'none',
                            animation: `starTwinkle ${Math.random() * 4 + 3}s ease-in-out ${Math.random() * 5}s infinite`,
                        }}
                    />
                ))}
            </div>

            {/* Realistic Floating Moons - RESTORED & IMPROVED */}
            <motion.div
                className="absolute top-[15%] left-[10%] pointer-events-none"
                style={{ y: useTransform(scrollYProgress, [0, 1], [30, -100]), opacity: 0.6 }}
            >
                <RealisticMoon color="var(--color-gold)" id="intro-moon-1" size={150} speed={80} />
            </motion.div>

            <motion.div
                className="absolute bottom-[15%] right-[10%] pointer-events-none"
                style={{ y: useTransform(scrollYProgress, [0, 1], [60, -140]), opacity: 0.5 }}
            >
                <RealisticMoon color="var(--color-emerald)" id="intro-moon-2" size={200} speed={100} reverse />
            </motion.div>

            {/* Content */}
            <div className="max-w-7xl mx-auto relative z-10 px-4 md:px-12">
                <motion.div
                    className="text-center"
                    style={{ y: yMove, opacity }}
                >
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-xs tracking-[0.5em] uppercase mb-4"
                        style={{ fontFamily: 'var(--font-ui)', color: 'var(--color-emerald)' }}
                    >
                        Chapter II
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="text-3xl md:text-5xl lg:text-6xl mb-6 tracking-tight text-gradient-gold-shine"
                        style={{ fontFamily: 'var(--font-display)' }}
                    >
                        The Path of Dalan
                    </motion.h2>
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '100px' }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="h-[1px] mx-auto mb-8"
                        style={{ background: 'linear-gradient(90deg, transparent, var(--color-imperial-300), transparent)' }}
                    />
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-base md:text-lg lg:text-xl max-w-5xl mx-auto leading-relaxed"
                        style={{ color: '#FFFFFF', fontFamily: 'var(--font-body)', fontWeight: 400 }}
                    >
                        An AI-driven, adaptive learning platform rooted in Philippine values. Mapping each student&apos;s unique learning journey from K–12 foundations to STEM mastery.
                    </motion.p>
                </motion.div>
            </div>
        </section>
    );
}

// ============ ORBITAL RINGS COMPONENT (MAGIC CIRCLE) ============
function OrbitalRings({ color, isActive }: { color: string, isActive: boolean }) {
    return (
        <div
            className="pointer-events-none"
            style={{
                position: 'absolute',
                top: '85px',
                left: '50%',
                width: '260px',
                height: '260px',
                zIndex: 0,
                perspective: '900px',
                transform: 'translateX(-50%) rotateX(73deg)',
            }}
        >
            <motion.div
                className="w-full h-full"
                animate={isActive ? { rotateZ: 360 } : { rotateZ: 0 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            >
                <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_0_15px_rgba(255,209,102,0.6)]">
                    <defs>
                        <filter id="gold-glow">
                            <feGaussianBlur stdDeviation="2.5" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                    </defs>

                    {/* 1. OUTERMOST BORDER */}
                    <circle cx="100" cy="100" r="98" stroke="#FFD166" strokeWidth="2" opacity="1" filter="url(#gold-glow)" />
                    <circle cx="100" cy="100" r="94" stroke="#FFF9E0" strokeWidth="0.8" opacity="0.8" />

                    {/* 2. RUNIC BAND (Double Ring) */}
                    <circle cx="100" cy="100" r="82" stroke="#FFD166" strokeWidth="1.5" opacity="0.9" />
                    <circle cx="100" cy="100" r="68" stroke="#FFD166" strokeWidth="1.5" opacity="0.9" />

                    {/* Connecting ticks in the band */}
                    {[...Array(36)].map((_, i) => (
                        <line
                            key={`tick-${i}`}
                            x1={100 + 68 * Math.cos((i * 10) * Math.PI / 180)}
                            y1={100 + 68 * Math.sin((i * 10) * Math.PI / 180)}
                            x2={100 + 82 * Math.cos((i * 10) * Math.PI / 180)}
                            y2={100 + 82 * Math.sin((i * 10) * Math.PI / 180)}
                            stroke={i % 3 === 0 ? "#FFF9E0" : "#FFD166"}
                            strokeWidth={i % 3 === 0 ? "1.5" : "0.8"}
                            opacity="0.9"
                        />
                    ))}

                    {/* Styled Runes (Representational) */}
                    {[...Array(12)].map((_, i) => (
                        <g key={`rune-${i}`} transform={`rotate(${i * 30 + 15}, 100, 100) translate(100, 24)`}>
                            <path
                                d="M-4 -2 C-2 2, 2 2, 4 -2 M0 -5 L0 5"
                                stroke="#FFF9E0"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                opacity="1"
                            />
                        </g>
                    ))}

                    {/* 3. CENTRAL PENTAGRAM (Star from ring.png) */}
                    <path
                        d="M100 32 L120 88 L180 88 L134 122 L152 180 L100 144 L48 180 L66 122 L20 88 L80 88 Z"
                        stroke="#FFD166"
                        strokeWidth="2"
                        strokeLinejoin="round"
                        filter="url(#gold-glow)"
                        opacity="1"
                    />

                    {/* 4. INNER CIRCLES (Inside Star) */}
                    <circle cx="100" cy="100" r="45" stroke="#FFD166" strokeWidth="1.5" opacity="0.9" />
                    <circle cx="100" cy="100" r="41" stroke="#FFF9E0" strokeWidth="0.8" opacity="0.7" />

                    {/* 5. CENTER GLOW (Where the moon sits) */}
                    <circle cx="100" cy="100" r="40" fill={`radial-gradient(circle, ${color}60 0%, transparent 80%)`} />

                    {/* Connecting lines to star points */}
                    <line x1="100" y1="100" x2="100" y2="32" stroke="#FFF9E0" strokeWidth="0.8" opacity="0.7" />
                    <line x1="100" y1="100" x2="180" y2="88" stroke="#FFF9E0" strokeWidth="0.8" opacity="0.7" />
                    <line x1="100" y1="100" x2="152" y2="180" stroke="#FFF9E0" strokeWidth="0.8" opacity="0.7" />
                    <line x1="100" y1="100" x2="48" y2="180" stroke="#FFF9E0" strokeWidth="0.8" opacity="0.7" />
                    <line x1="100" y1="100" x2="20" y2="88" stroke="#FFF9E0" strokeWidth="0.8" opacity="0.7" />
                </svg>
            </motion.div>
        </div>
    );
}

// ============ NEBULA DANCING BACKGROUND ============
function NebulaDancingBackground() {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
            {/* Intense drifting nebula clouds - INCREASED VISIBILITY */}
            {[
                { color: '#3E3EFF', top: '5%', left: '-10%', size: '900px', delay: 0, duration: 30 }, // Imperial Blue
                { color: '#FFD166', top: '35%', right: '-15%', size: '1000px', delay: 4, duration: 35 }, // Gold
                { color: '#00FFC0', bottom: '-10%', left: '10%', size: '850px', delay: 2, duration: 28 }, // Emerald
                { color: '#7373FF', top: '15%', right: '15%', size: '950px', delay: 7, duration: 40 }, // Soft Blue
            ].map((nebula, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full blur-[120px] mix-blend-screen"
                    style={{
                        width: nebula.size,
                        height: nebula.size,
                        top: nebula.top,
                        left: nebula.left,
                        right: nebula.right,
                        bottom: nebula.bottom,
                        background: `radial-gradient(circle, ${nebula.color}33 0%, ${nebula.color}11 50%, transparent 80%)`,
                    }}
                    animate={{
                        x: [0, 100, -80, 0],
                        y: [0, -80, 80, 0],
                        scale: [1, 1.25, 0.85, 1],
                        opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                        duration: nebula.duration,
                        repeat: Infinity,
                        delay: nebula.delay,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
}

// ============ HORIZONTAL MOONS PHILOSOPHY ============
function HorizontalMoonsPhilosophy() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef });

    const progressScale = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);
    const rawIndex = useTransform(scrollYProgress, [0.1, 0.9], [0, 6]);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        return rawIndex.on('change', (v) => {
            setActiveIndex(Math.round(Math.max(0, Math.min(6, v))));
        });
    }, [rawIndex]);

    return (
        <section ref={containerRef} className="relative" style={{ height: '500vh', backgroundColor: 'var(--color-void)' }}>
            <div className="sticky top-0 h-screen overflow-hidden">
                <NebulaDancingBackground />
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140vw] h-[140vh] opacity-15"
                        style={{ background: 'radial-gradient(circle, var(--color-imperial-900) 0%, transparent 80%)' }}
                    />
                </div>

                <div className="absolute top-[14%] left-0 w-full text-center z-20 pointer-events-none">
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="text-xl md:text-3xl lg:text-4xl mb-6 tracking-tight text-gradient-gold-shine px-4"
                        style={{ fontFamily: 'var(--font-display)' }}
                    >
                        7 Moons Learning Philosophy
                    </motion.h2>
                </div>
                {/* Carousel moon cards */}
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden px-4 pt-20 md:pt-24">
                    <div className="relative w-full flex items-center justify-center" style={{ height: 'min(84vh, 700px)', perspective: '1500px' }}>

                        {MOON_CONFIGS.map((moon, i) => {
                            const phil = MOON_PHILOSOPHIES[i];
                            const offset = i - activeIndex;
                            const absOffset = Math.abs(offset);
                            const isActive = absOffset === 0;
                            const isVisible = absOffset <= 2;

                            return (
                                <div
                                    key={moon.id}
                                    className="absolute top-1/2 left-1/2 -translate-y-1/2"
                                    style={{
                                        width: 'min(85vw, 420px)',
                                        height: '100%',
                                        transform: `translateX(calc(-50% + ${offset * 85}%)) translateY(${isActive ? '0px' : absOffset === 1 ? '15px' : '30px'}) scale(${isActive ? 0.85 : absOffset === 1 ? 0.7 : 0.55})`,
                                        zIndex: isActive ? 30 : 20 - absOffset,
                                        opacity: !isVisible ? 0 : isActive ? 1 : absOffset === 1 ? 0.5 : 0.2,
                                        filter: isActive ? 'none' : 'brightness(0.3) blur(2px)',
                                        transition: 'all 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
                                        pointerEvents: isActive ? 'auto' : 'none',
                                    }}
                                >
                                    <GoldFrame
                                        isActive={isActive}
                                        color={moon.color}
                                        className="h-full"
                                    >
                                        <div className="p-5 md:p-7 h-full flex flex-col items-center relative">
                                            {/* Moon + Rings — fixed-height box prevents rings from pushing MoonTag down */}
                                            <div
                                                className="flex-shrink-0 mt-3 mb-3"
                                                style={{ position: 'relative', width: '100%', height: '230px' }}
                                            >
                                                {/* Ambient glow behind moon */}
                                                <div
                                                    className="absolute rounded-full blur-[40px] opacity-25 pointer-events-none"
                                                    style={{
                                                        width: '172px', height: '172px',
                                                        top: '10px', left: '50%',
                                                        transform: 'translateX(-50%)',
                                                        background: `radial-gradient(circle, ${moon.color} 0%, transparent 70%)`,
                                                    }}
                                                />
                                                {/* Rings — absolutely placed, self-centers via translateX(-50%) */}
                                                <OrbitalRings color={moon.color} isActive={isActive} />
                                                {/* Moon — centered on ring */}
                                                <div style={{ position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)', zIndex: 1 }}>
                                                    <RealisticMoon color={moon.color} id={`home-${moon.id}`} size={172} speed={isActive ? 40 : 100} />
                                                </div>
                                            </div>

                                            <div className="flex justify-center mt-16 mb-4 relative z-10 flex-shrink-0">
                                                <MoonTag label={`${moon.id} · ${moon.meaning}`} color={moon.color} />
                                            </div>

                                            <h3
                                                className="text-xl md:text-2xl mb-3 relative z-10 text-center uppercase tracking-[0.1em] px-3 flex-shrink-0"
                                                style={{ fontFamily: 'var(--font-heading)', color: '#F0EDE8', lineHeight: 1.25 }}
                                            >
                                                {phil?.philosophy}
                                            </h3>
                                            <p
                                                className="text-sm md:text-base leading-relaxed relative z-10 text-center px-4 pb-4 flex-1 overflow-y-auto"
                                                style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)', fontWeight: 300 }}
                                            >
                                                {phil?.desc}
                                            </p>

                                        </div>
                                    </GoldFrame>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center">
                    <div className="w-64 h-[1px] rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(255,209,102,0.1)' }}>
                        <motion.div
                            className="h-full"
                            style={{
                                scaleX: progressScale,
                                transformOrigin: 'left',
                                background: 'linear-gradient(90deg, transparent, var(--color-gold), transparent)',
                            }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

// ============ HOME SECTION (MAIN EXPORT) ============
export default function HomeSection() {
    return (
        <div id="home" style={{ backgroundColor: 'var(--color-void)' }}>
            {/* 1. PLATFORM INTRO (The Path of Dalan) - CLEAN DESIGN */}
            <PlatformIntro />

            <SerpentDivider />

            {/* 2. 7 MOONS PHILOSOPHY (HORIZONTAL SCROLL) */}
            <HorizontalMoonsPhilosophy />
        </div>
    );
}
