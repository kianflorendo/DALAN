'use client';

import { motion, useScroll, useTransform, useMotionTemplate, useInView, type MotionValue } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import GoldFrame from '@/components/ui/GoldFrame';
import SerpentDivider from '@/components/ui/SerpentDivider';
import { fadeUpVariant, staggerContainer } from '@/lib/motion-variants';
import { MOON_CONFIGS } from '@/lib/moon-config';

// ============ DATA ============
const TIMELINE = [
    { year: '1st Phase', event: 'The Idea', description: 'Concept for AI-driven education with ASEAN cultural anchoring was born.' },
    { year: '2nd Phase', event: 'Foundation', description: 'Core team assembled. Early R&D on adaptive learning models and AI tutoring.' },
    { year: '3rd Phase', event: 'First Light', description: 'Alpha launch with 500 beta testers across Philippine provinces.' },
    { year: '4th Phase', event: 'Rising', description: 'Platform v2.0 with full K–12 curriculum, STEM mastery track, and 1000+ learners.' },
];

const TEAM = [
    { name: 'Kian Angelo Florendo', role: 'System Engineer', department: 'Development', moonId: 1 },
    { name: 'Nyzel Cayat', role: 'Marketing Specialist', department: 'Engagement', moonId: 2 },
    { name: 'Carlos Jericho De La Torre', role: 'Product Development', department: 'Operations', moonId: 3 },
];

// ============ CSS KEYFRAMES ============
const mistStyles = `
@keyframes mistDriftLeft {
  0% { transform: translateX(-20%) scaleX(1.2); opacity: 0; }
  30% { opacity: 0.7; }
  70% { opacity: 0.5; }
  100% { transform: translateX(15%) scaleX(1); opacity: 0; }
}
@keyframes mistDriftRight {
  0% { transform: translateX(20%) scaleX(1.2); opacity: 0; }
  30% { opacity: 0.7; }
  70% { opacity: 0.5; }
  100% { transform: translateX(-15%) scaleX(1); opacity: 0; }
}
@keyframes smokeRise {
  0% { transform: translateY(30px) scale(0.8); opacity: 0; filter: blur(8px); }
  20% { opacity: 0.6; filter: blur(12px); }
  60% { opacity: 0.35; filter: blur(18px); }
  100% { transform: translateY(-60px) scale(1.5); opacity: 0; filter: blur(25px); }
}
@keyframes mistPulse {
  0%, 100% { opacity: 0.15; transform: scale(1); }
  50% { opacity: 0.35; transform: scale(1.08); }
}
@keyframes particleFloat {
  0% { transform: translateY(0) translateX(0); opacity: 0; }
  15% { opacity: 0.8; }
  85% { opacity: 0.4; }
  100% { transform: translateY(-80px) translateX(var(--float-x, 10px)); opacity: 0; }
}
@keyframes nebulaPulse {
  0%, 100% { opacity: 0.2; transform: scale(1) rotate(0deg); }
  33% { opacity: 0.4; transform: scale(1.05) rotate(1deg); }
  66% { opacity: 0.3; transform: scale(0.98) rotate(-1deg); }
}
@keyframes nebulaShift {
  0%, 100% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(8px, -5px) scale(1.03); }
  50% { transform: translate(-5px, 8px) scale(0.97); }
  75% { transform: translate(5px, 5px) scale(1.02); }
}
@keyframes circleSpin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
@keyframes circleSpinReverse {
  from { transform: rotate(360deg); }
  to { transform: rotate(0deg); }
}
@keyframes ambientNebulaSpin {
  0% { transform: rotate(0deg) scale(1); }
  50% { transform: rotate(180deg) scale(1.15); }
  100% { transform: rotate(360deg) scale(1); }
}
@keyframes ambientNebulaSpinReverse {
  0% { transform: rotate(360deg) scale(1.1); }
  50% { transform: rotate(180deg) scale(1); }
  100% { transform: rotate(0deg) scale(1.1); }
}
@keyframes pulseGlow {
  0%, 100% { filter: drop-shadow(0 0 8px rgba(0, 212, 160, 0.1)) drop-shadow(0 0 20px rgba(255,209,102,0.08)) brightness(1); }
  50% { filter: drop-shadow(0 0 16px rgba(0, 212, 160, 0.18)) drop-shadow(0 0 30px rgba(255,209,102,0.14)) brightness(1.04); }
}
@keyframes nebulaDrift1 {
  0%, 100% { transform: translate(-20px, -10px) rotate(0deg); }
  50% { transform: translate(20px, 10px) rotate(5deg); }
}
@keyframes nebulaDrift2 {
  0%, 100% { transform: translate(30px, 0) rotate(0deg) scale(1); }
  50% { transform: translate(-30px, 0) rotate(-8deg) scale(1.1); }
}
@keyframes nebulaDrift3 {
  0%, 100% { opacity: 0.1; transform: scale(0.95); }
  50% { opacity: 0.18; transform: scale(1.05); }
}
@keyframes nebulaDrift4 {
  0%, 100% { transform: translate(-40px, 20px) rotate(0deg); }
  50% { transform: translate(40px, -20px) rotate(12deg); }
}
@keyframes nebulaDrift5 {
  0%, 100% { transform: skewX(0deg) scale(1); }
  50% { transform: skewX(5deg) scale(1.2); }
}
@keyframes nebulaBreath {
  0%, 100% { opacity: 0.03; }
  50% { opacity: 0.07; }
}
@keyframes sideNebulaLeft {
  0%, 100% { transform: rotate(0deg) scale(1); }
  50% { transform: rotate(15deg) scale(1.1); }
}
@keyframes sideNebulaRight {
  0%, 100% { transform: rotate(0deg) scale(1); }
  50% { transform: rotate(-15deg) scale(1.05); }
}
@keyframes phaseCNebulaLeft {
  0%, 100% { transform: rotate(0deg) scale(1); }
  50% { transform: rotate(12deg) scale(1.1); }
}
@keyframes phaseCNebulaRight {
  0%, 100% { transform: rotate(0deg) scale(1); }
  50% { transform: rotate(-12deg) scale(1.08); }
}
@keyframes phaseCBloom {
  0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
  50% { transform: translate(-50%, -50%) scale(1.15); opacity: 0.9; }
}
@keyframes sealPulse {
  0%, 100% { r: var(--base-r); opacity: var(--min-opacity); }
  50% { r: calc(var(--base-r) * 1.03); opacity: var(--max-opacity); }
}
`;

// ============ NEBULA EFFECT COMPONENT ============
function NebulaEffect() {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden mix-blend-screen" aria-hidden="true">
            {/* Grain Texture Overlay for realism */}
            <div className="absolute inset-0 opacity-[0.03] contrast-150 brightness-150" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

            {/* Deep Void Core */}
            <div className="absolute inset-0 bg-radial-[circle_at_50%_50%] from-transparent via-void/40 to-void" />

            {/* Carina-style Deep Blue/Purple Cloud */}
            <div
                className="absolute w-[150vw] h-[120vh] -top-[20%] -left-[20%] opacity-[0.22] blur-[120px]"
                style={{
                    background: 'radial-gradient(ellipse at 30% 40%, #0A0A2E 0%, #1A1A6E 25%, #2D2DB8 50%, transparent 80%)',
                    animation: 'nebulaDrift1 50s ease-in-out infinite',
                    willChange: 'transform',
                }}
            />

            {/* Vibrant Emerald Ionized Gas */}
            <div
                className="absolute w-[110vw] h-[100vh] top-[10%] left-[15%] opacity-[0.18] blur-[90px]"
                style={{
                    background: 'radial-gradient(ellipse at 60% 50%, #00D4A0 0%, #007A5C 30%, #0A0A2E 60%, transparent 85%)',
                    animation: 'nebulaDrift2 65s ease-in-out 2s infinite',
                    willChange: 'transform',
                }}
            />

            {/* Stellar Nursery - Rose/Magenta High Energy */}
            <div
                className="absolute w-[90vw] h-[80vh] top-[5%] right-[0%] blur-[70px]"
                style={{
                    background: 'radial-gradient(circle at 40% 40%, #FF6B9D 0%, #C8B8FF 25%, #1A1A6E 55%, transparent 80%)',
                    animation: 'nebulaDrift3 35s ease-in-out infinite',
                    willChange: 'transform, opacity',
                }}
            />

            {/* Hydrogen Alpha - Warm Coral/Gold Glow */}
            <div
                className="absolute w-[100vw] h-[110vh] bottom-[-10%] right-[-10%] opacity-[0.15] blur-[130px]"
                style={{
                    background: 'radial-gradient(ellipse at 40% 70%, #FF8C6B 0%, #FFD166 20%, #B8922A 45%, transparent 75%)',
                    animation: 'nebulaDrift4 80s ease-in-out 5s infinite',
                    willChange: 'transform',
                }}
            />

            {/* Filamentary Dust Structures - Cyan/Sky */}
            <div
                className="absolute w-[80vw] h-[70vh] bottom-[15%] left-[-5%] opacity-[0.1] blur-[60px]"
                style={{
                    background: 'radial-gradient(ellipse at center, #7FDBFF 0%, #5B5BFF 40%, transparent 70%)',
                    animation: 'nebulaDrift5 45s linear infinite',
                    willChange: 'transform',
                }}
            />

            {/* Ambient Background Shimmer */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'radial-gradient(circle at 50% 50%, #1A1A6E 0%, transparent 80%)',
                    animation: 'nebulaBreath 20s ease-in-out infinite',
                    willChange: 'opacity',
                }}
            />
        </div>
    );
}

// ============ REUSABLE ARCANE SEAL COMPONENT ============
// This draws the pentagram and runic rings scaled perfectly to the given radius
function ArcaneSeal({ cx, cy, radius, color, index, filterBloom, filterGlow }: { cx: number, cy: number, radius: number, color: string, index: number, filterBloom?: string, filterGlow?: string }) {
    const rIn = radius * 1.35;
    const rOut = radius * 1.65;
    
    // Pentagram Path Calculation
    const p0 = `0,${-rIn}`;
    const p1 = `${rIn * 0.951},${-rIn * 0.309}`;
    const p2 = `${rIn * 0.588},${rIn * 0.809}`;
    const p3 = `${-rIn * 0.588},${rIn * 0.809}`;
    const p4 = `${-rIn * 0.951},${-rIn * 0.309}`;
    const starPath = `M ${p0} L ${p2} L ${p4} L ${p1} L ${p3} Z`;

    return (
        <g transform={`translate(${cx}, ${cy})`}>
            {/* Subtle Moon Rings — toned down (CSS animated for perf) */}
            <g opacity="0.18">
                <circle
                    cx="0" cy="0" r={rOut * 1.2}
                    fill="none" stroke={color} strokeWidth={radius * 0.015}
                    strokeDasharray="4 8"
                    style={{ animation: 'nebulaPulse 10s ease-in-out infinite', opacity: 0.08, willChange: 'transform, opacity' }}
                />
                <circle
                    cx="0" cy="0" r={rOut * 1.4}
                    fill="none" stroke={color} strokeWidth={radius * 0.01}
                    strokeDasharray="1 12"
                    style={{ animation: 'nebulaPulse 15s ease-in-out 2s infinite', opacity: 0.05, willChange: 'transform, opacity' }}
                />
            </g>

            {/* Primary rotating arcane seal */}
            <g style={{ animation: `circleSpin ${25 + index * 2}s linear infinite ${index % 2 === 0 ? 'reverse' : 'normal'}`, willChange: 'transform' }}>
                {/* Inner Pentagram */}
                <path d={starPath} fill="none" stroke={color} strokeWidth={radius * 0.04} opacity="0.22" filter={filterBloom} />

                {/* Inner Ring Boundary */}
                <circle cx="0" cy="0" r={rIn} fill="none" stroke={color} strokeWidth={radius * 0.04} opacity="0.25" filter={filterBloom} />

                {/* Outer Ring Boundary */}
                <circle cx="0" cy="0" r={rOut} fill="none" stroke={color} strokeWidth={radius * 0.05} opacity="0.25" filter={filterBloom} />

                {/* Rune Track */}
                <circle cx="0" cy="0" r={(rIn + rOut) / 2} fill="none" stroke={color} strokeWidth={radius * 0.14} strokeDasharray={`${radius*0.1} ${radius*0.25} ${radius*0.35} ${radius*0.2} ${radius*0.08} ${radius*0.15}`} opacity="0.18" />

                {/* Connecting rune spokes */}
                {[...Array(12)].map((_, i) => (
                    <line
                        key={i}
                        x1="0" y1={-rIn} x2="0" y2={-rOut}
                        stroke={color} strokeWidth={radius * 0.04} opacity="0.22"
                        transform={`rotate(${i * 30})`}
                    />
                ))}

                {/* Orbiting Magical Satellite */}
                <circle cx="0" cy={-rOut} r={Math.max(1.5, radius * 0.08)} fill="#FFF" filter={filterGlow} opacity="0.45" />
            </g>

            {/* Secondary inner counter-rotating geometric track */}
            <g style={{ animation: `circleSpin ${30 + index * 3}s linear infinite ${index % 2 !== 0 ? 'reverse' : 'normal'}`, willChange: 'transform' }}>
                <circle cx="0" cy="0" r={rIn * 0.75} fill="none" stroke="#FFD166" strokeWidth={radius * 0.03} opacity="0.18" strokeDasharray={`${radius*0.2} ${radius*0.2}`} />
            </g>
        </g>
    );
}

// ============ MIST LAYER COMPONENT ============
function MistLayer({ side, color, delay = 0 }: { side: 'left' | 'right'; color: string; delay?: number }) {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
            {/* Primary mist cloud */}
            <div
                className="absolute w-[120%] h-[60%]"
                style={{
                    top: '20%',
                    left: side === 'left' ? '-30%' : '10%',
                    background: `radial-gradient(ellipse at ${side === 'left' ? '70%' : '30%'} 50%, ${color}18 0%, ${color}08 35%, transparent 70%)`,
                    animation: `${side === 'left' ? 'mistDriftLeft' : 'mistDriftRight'} ${8 + delay}s ease-in-out ${delay}s infinite`,
                }}
            />
            {/* Secondary wisps */}
            <div
                className="absolute w-[80%] h-[40%]"
                style={{
                    top: '35%',
                    left: side === 'left' ? '-15%' : '35%',
                    background: `radial-gradient(ellipse at 50% 50%, ${color}12 0%, transparent 60%)`,
                    animation: `${side === 'left' ? 'mistDriftLeft' : 'mistDriftRight'} ${12 + delay}s ease-in-out ${delay + 2}s infinite`,
                }}
            />
            {/* Rising smoke tendrils */}
            {[...Array(4)].map((_, i) => (
                <div
                    key={`smoke-${side}-${i}`}
                    className="absolute rounded-full"
                    style={{
                        width: `${60 + i * 30}px`,
                        height: `${40 + i * 20}px`,
                        bottom: `${10 + i * 12}%`,
                        left: side === 'left' ? `${10 + i * 15}%` : `${50 + i * 10}%`,
                        background: `radial-gradient(ellipse, ${color}15 0%, transparent 70%)`,
                        animation: `smokeRise ${5 + i * 1.5}s ease-out ${delay + i * 0.8}s infinite`,
                    }}
                />
            ))}
            {/* Ambient pulse */}
            <div
                className="absolute w-[60%] h-[50%]"
                style={{
                    top: '25%',
                    left: side === 'left' ? '5%' : '35%',
                    background: `radial-gradient(circle at 50% 50%, ${color}0a 0%, transparent 60%)`,
                    animation: `mistPulse ${6 + delay}s ease-in-out ${delay}s infinite`,
                }}
            />
        </div>
    );
}

// ============ FLOATING PARTICLES ============
function FloatingParticles({ color, count = 12 }: { color: string; count?: number }) {
    const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; dur: number; delay: number; floatX: number }>>([]);

    useEffect(() => {
        setParticles(
            Array.from({ length: count }, (_, i) => ({
                id: i,
                x: Math.random() * 100,
                y: 40 + Math.random() * 50,
                size: 1 + Math.random() * 2.5,
                dur: 4 + Math.random() * 5,
                delay: Math.random() * 6,
                floatX: (Math.random() - 0.5) * 30,
            }))
        );
    }, [count]);

    if (particles.length === 0) return null;

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
            {particles.map((p) => (
                <div
                    key={p.id}
                    className="absolute rounded-full"
                    style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        width: p.size,
                        height: p.size,
                        backgroundColor: color,
                        boxShadow: `0 0 ${p.size * 3}px ${color}`,
                        animation: `particleFloat ${p.dur}s ease-in-out ${p.delay}s infinite`,
                        '--float-x': `${p.floatX}px`,
                    } as React.CSSProperties}
                />
            ))}
        </div>
    );
}

// ============ CHAPTER 1: THE ORIGIN + MISSION & VISION ============
function ChapterOrigin() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

    // Phase A: Subtitle fades in (0→8%), holds (8→18%), fades out (18→25%)
    const subtitleOpacity = useTransform(scrollYProgress, [0, 0.08, 0.18, 0.25], [0, 1, 1, 0]);
    const subtitleY = useTransform(scrollYProgress, [0, 0.08, 0.18, 0.25], [40, 0, 0, -30]);
    const subtitleScale = useTransform(scrollYProgress, [0, 0.08, 0.18, 0.25], [0.85, 1, 1, 0.9]);

    // Phase B: Quote fades in (26→36%), holds (36→50%), fades out (50→58%)
    const quoteOpacity = useTransform(scrollYProgress, [0.26, 0.36, 0.50, 0.58], [0, 1, 1, 0]);
    const quoteY = useTransform(scrollYProgress, [0.26, 0.36, 0.50, 0.58], [50, 0, 0, -40]);
    const quoteScale = useTransform(scrollYProgress, [0.26, 0.36, 0.50, 0.58], [0.9, 1, 1, 0.95]);

    // Decorative line follows quote
    const lineWidth = useTransform(scrollYProgress, [0.32, 0.42], [0, 120]);
    const lineOpacity = useTransform(scrollYProgress, [0.32, 0.38, 0.50, 0.58], [0, 0.6, 0.6, 0]);

    // Phase C: Mission & Vision cards (56→68% fade in, hold until end)
    const cardsContainerOpacity = useTransform(scrollYProgress, [0.56, 0.68], [0, 1]);
    const missionX = useTransform(scrollYProgress, [0.56, 0.72], [-120, 0]);
    const missionOpacity = useTransform(scrollYProgress, [0.56, 0.70], [0, 1]);
    const visionX = useTransform(scrollYProgress, [0.58, 0.74], [120, 0]);
    const visionOpacity = useTransform(scrollYProgress, [0.58, 0.72], [0, 1]);
    const mistOpacity = useTransform(scrollYProgress, [0.52, 0.64, 0.80], [0, 1, 0.6]);

    // Magic Circle scroll-linked opacity (peaks at 0.7 for rich glow)
    const magicCircleOpacity = useTransform(scrollYProgress, [0, 0.08, 0.55, 0.60], [0, 1, 1, 0]);

    return (
        <section ref={ref} className="relative" style={{ height: '300vh', backgroundColor: 'var(--color-void)', contain: 'layout style' }}>
            <style>{mistStyles}</style>
            <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center" style={{ contain: 'paint' }}>
                
                {/* === SIDE NEBULA EFFECTS (HUGS EDGES) === */}
                <motion.div 
                    className="absolute inset-0 pointer-events-none mix-blend-screen overflow-hidden" 
                    style={{ opacity: magicCircleOpacity }}
                >
                    {/* Left Side: Emerald/Imperial Blue Nebula */}
                    <div
                        className="absolute w-[80vw] h-[150vh] max-w-[800px] rounded-[100%] blur-[120px]"
                        style={{
                            left: '-30%',
                            top: '-20%',
                            background: 'radial-gradient(ellipse at center, rgba(0,212,160,0.3) 0%, rgba(91,91,255,0.2) 40%, transparent 70%)',
                            animation: 'sideNebulaLeft 60s linear infinite',
                            willChange: 'transform',
                        }}
                    />

                    {/* Right Side: Coral/Warm Gold Nebula */}
                    <div
                        className="absolute w-[80vw] h-[150vh] max-w-[800px] rounded-[100%] blur-[120px]"
                        style={{
                            right: '-30%',
                            bottom: '-20%',
                            background: 'radial-gradient(ellipse at center, rgba(255,140,107,0.25) 0%, rgba(255,209,102,0.15) 40%, transparent 70%)',
                            animation: 'sideNebulaRight 80s linear infinite',
                            willChange: 'transform',
                        }}
                    />

                    {/* Bottom Left Accent */}
                    <div
                        className="absolute w-[50vw] h-[80vh] max-w-[500px] rounded-full blur-[80px] opacity-40"
                        style={{
                            left: '-15%',
                            bottom: '10%',
                            background: 'radial-gradient(circle, rgba(91,91,255,0.2) 0%, transparent 60%)',
                            willChange: 'transform',
                        }}
                    />

                    {/* Top Right Accent */}
                    <div
                        className="absolute w-[50vw] h-[80vh] max-w-[500px] rounded-full blur-[80px] opacity-40"
                        style={{
                            right: '-15%',
                            top: '10%',
                            background: 'radial-gradient(circle, rgba(0,212,160,0.2) 0%, transparent 60%)',
                            willChange: 'transform',
                        }}
                    />
                </motion.div>

                {/* === HIGHLY STYLIZED CELESTIAL MAGIC CIRCLE === */}
                <motion.div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    style={{ opacity: magicCircleOpacity }}
                    aria-hidden="true"
                >
                    <svg viewBox="-50 -50 700 700" className="w-[85vmin] h-[85vmin] max-w-[85vw] max-h-[85vh] overflow-visible" style={{ animation: 'pulseGlow 8s ease-in-out infinite', willChange: 'filter' }}>
                        <defs>
                            {/* Softened Blooms & Glows */}
                            <filter id="magicBloom" x="-30%" y="-30%" width="160%" height="160%">
                                <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="bloom" />
                                <feMerge>
                                    <feMergeNode in="bloom" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>

                            <filter id="coreGlow" x="-40%" y="-40%" width="180%" height="180%">
                                <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="glow" />
                                <feMerge>
                                    <feMergeNode in="glow" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>

                            {/* Moon base gradients & Crescent Masks */}
                            {MOON_CONFIGS.map((moon) => (
                                <g key={`moon-defs-${moon.id}`}>
                                    <radialGradient id={`moonGrad-${moon.id}`} cx="35%" cy="35%" r="70%">
                                        <stop offset="0%" stopColor="#C8C4C4" stopOpacity="1" />
                                        <stop offset="25%" stopColor={moon.color} stopOpacity="0.55" />
                                        <stop offset="60%" stopColor={moon.color} stopOpacity="0.38" />
                                        <stop offset="90%" stopColor="#08081a" stopOpacity="1" />
                                        <stop offset="100%" stopColor="#000" stopOpacity="1" />
                                    </radialGradient>                                    {/* Clip path for the crescent highlight overlay */}
                                    <clipPath id={`crescentClip-${moon.id}`}>
                                        <circle cx="300" cy="52" r="25" />
                                    </clipPath>
                                </g>
                            ))}

                            <linearGradient id="goldRing" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#FFD166" />
                                <stop offset="20%" stopColor="#FFFAE6" />
                                <stop offset="40%" stopColor="#FFD166" />
                                <stop offset="60%" stopColor="#DFAA30" />
                                <stop offset="80%" stopColor="#FFD166" />
                                <stop offset="100%" stopColor="#FFFAE6" />
                            </linearGradient>
                        </defs>

                        {/* Outer rotating intricate rings */}
                        <g style={{ transformOrigin: '300px 300px', animation: 'circleSpin 180s linear infinite', willChange: 'transform' }}>
                            {/* Glowing aura ring */}
                            <circle cx="300" cy="300" r="305" fill="none" stroke="rgba(0, 212, 160, 0.07)" strokeWidth="10" filter="url(#magicBloom)" />

                            <circle cx="300" cy="300" r="315" fill="none" stroke="#5B5BFF" strokeWidth="0.8" opacity="0.18" strokeDasharray="4 12" />
                            <circle cx="300" cy="300" r="285" fill="none" stroke="#00D4A0" strokeWidth="1.2" strokeDasharray="2 6" opacity="0.25" />

                            {/* Triple main gold boundary — vibrant */}
                            <circle cx="300" cy="300" r="275" fill="none" stroke="#5B5BFF" strokeWidth="1" opacity="0.18" />
                            <circle cx="300" cy="300" r="268" fill="none" stroke="url(#goldRing)" strokeWidth="2.5" opacity="0.45" filter="url(#magicBloom)" />
                            <circle cx="300" cy="300" r="261" fill="none" stroke="#5B5BFF" strokeWidth="1" opacity="0.18" />

                            {/* Runes / Tick Marks — boosted */}
                            {[...Array(72)].map((_, i) => (
                                <g key={`rune-set-${i}`} transform={`rotate(${i * 5} 300 300)`}>
                                    <line x1="300" y1="24" x2="300" y2="39" stroke={i % 2 === 0 ? "#FFD166" : "#00D4A0"} strokeWidth={i % 2 === 0 ? "1.5" : "0.8"} opacity={i % 2 === 0 ? "0.38" : "0.22"} />
                                    {i % 6 === 0 && (
                                        <circle cx="300" cy="18" r="2.5" fill="#FFD166" opacity="0.45" filter="url(#coreGlow)" />
                                    )}
                                </g>
                            ))}
                        </g>

                        {/* Middle Geometry Layer (Heptagrams & Moons) */}
                        <g style={{ transformOrigin: '300px 300px', animation: 'circleSpinReverse 220s linear infinite', willChange: 'transform' }}>
                            {/* Background geometric scaffolding */}
                            <circle cx="300" cy="300" r="215" fill="none" stroke="rgba(91,91,255,0.08)" strokeWidth="1" />

                            {/* Dual Interlocking Heptagrams - Enhanced */}
                            <g strokeWidth="1" fill="none">
                                {/* Sharp Heptagram */}
                                {[...Array(7)].map((_, i) => (
                                    <line
                                        key={`hept1-${i}`}
                                        x1="300" y1="35"
                                        x2="505" y2="488"
                                        stroke="#00D4A0" opacity="0.18"
                                        transform={`rotate(${i * (360 / 7)} 300 300)`}
                                    />
                                ))}
                                {/* Blunt Heptagram */}
                                {[...Array(7)].map((_, i) => (
                                    <path
                                        key={`hept2-${i}`}
                                        d="M 300 85 L 345 165 L 435 180 Line 300 300"
                                        stroke="#5B5BFF" opacity="0.14" strokeWidth="1.5"
                                        transform={`rotate(${i * (360 / 7)} 300 300)`}
                                    />
                                ))}
                            </g>

                            {/* Solid Orbital Ring / Track for the Moons — vibrant */}
                            <circle cx="300" cy="300" r="248" fill="none" stroke="#00D4A0" strokeWidth="1.2" opacity="0.12" />
                            <circle cx="300" cy="300" r="248" fill="none" stroke="url(#goldRing)" strokeWidth="2.5" opacity="0.22" filter="url(#magicBloom)" />

                            {/* Inner Resonance Ring */}
                            <circle cx="300" cy="300" r="185" fill="none" stroke="#00D4A0" strokeWidth="1.5" strokeDasharray="2 8" opacity="0.07" />

                            {/* The Authentic 7 Folklore Moon Orbs */}
                            {MOON_CONFIGS.slice(0, 7).map((moon, i) => (
                                <g key={`moon-group-${moon.id}`} transform={`rotate(${i * (360 / 7)} 300 300)`}>
                                    {/* Underlying glow — reduced */}
                                    <circle cx="300" cy="52" r="28" fill={moon.color} filter="url(#coreGlow)" opacity="0.35" />

                                    {/* THE NEW ARCANE PENTAGRAM SEAL OVER THE MOON (Behind the moon body) */}
                                    <ArcaneSeal cx={300} cy={52} radius={25} color={moon.color} index={i} filterBloom="url(#magicBloom)" filterGlow="url(#coreGlow)" />
                                    
                                    {/* Solid 3D sphere body */}
                                    <circle cx="300" cy="52" r="25" fill={`url(#moonGrad-${moon.id})`} />

                                    {/* Stylized Crescent Highlight Overlay */}
                                    <circle 
                                        cx="292" cy="46" r="25" 
                                        fill="rgba(255,255,255,0.15)" 
                                        clipPath={`url(#crescentClip-${moon.id})`} 
                                    />
                                    
                                    {/* Authentic MoonOrb Craters (Spinning on own axis) */}
                                    <g style={{ transformOrigin: '300px 52px', animation: 'circleSpin 35s linear infinite' }}>
                                        {/* Extremely subtle plains / mare - totally removed blocky dots */}
                                        <g transform="translate(275, 27)" opacity="0.04">
                                            <ellipse cx="20" cy="20" rx="12" ry="10" fill="#000" />
                                            <ellipse cx="35" cy="35" rx="8" ry="12" fill="#000" />
                                        </g>
                                    </g>

                                    {/* Outer atmospheric boundary */}
                                    <circle cx="300" cy="52" r="26" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
                                    
                                    {/* Connectivity lines to inner ring */}
                                    <line x1="300" y1="96" x2="300" y2="140" stroke={moon.color} strokeWidth="1" opacity="0.06" strokeDasharray="4 4" />
                                </g>
                            ))}
                        </g>

                        {/* Inner rotating sun/moon burst */}
                        <g style={{ transformOrigin: '300px 300px', animation: 'circleSpin 100s ease-in-out infinite alternate', willChange: 'transform' }}>
                            {/* Inner protective barrier — vibrant */}
                            <circle cx="300" cy="300" r="150" fill="none" stroke="#5B5BFF" strokeWidth="1" opacity="0.1" strokeDasharray="1 4" />
                            <circle cx="300" cy="300" r="140" fill="none" stroke="url(#goldRing)" strokeWidth="2" strokeDasharray="12 8" opacity="0.2" filter="url(#magicBloom)" />
                            <circle cx="300" cy="300" r="132" fill="none" stroke="#5B5BFF" strokeWidth="1" opacity="0.1" />

                            <circle cx="300" cy="300" r="105" fill="none" stroke="#FFD166" strokeWidth="1" opacity="0.1" strokeDasharray="4 4" />

                            {/* Intricate wavy rays — boosted */}
                            {[...Array(28)].map((_, i) => (
                                <g key={`ray-group-${i}`} transform={`rotate(${i * (360 / 28)} 300 300)`}>
                                    <path
                                        d="M 300 105 C 320 120, 280 130, 300 150"
                                        fill="none"
                                        stroke={i % 2 === 0 ? "#FFD166" : "#00D4A0"}
                                        strokeWidth="1.2"
                                        opacity="0.18"
                                    />
                                    {/* Micro-nodes on rays */}
                                    <circle cx="300" cy="150" r="2.5" fill={i % 2 === 0 ? "#FFD166" : "#00D4A0"} opacity="0.35" />
                                </g>
                            ))}
                        </g>
                    </svg>
                </motion.div>

                {/* Phase A: Subtitle */}
                <motion.div
                    className="absolute inset-0 flex items-center justify-center px-6 z-10"
                    style={{ opacity: subtitleOpacity, y: subtitleY, scale: subtitleScale }}
                >
                    <p
                        className="text-xl md:text-3xl tracking-[0.3em] uppercase font-bold text-center"
                        style={{ 
                            fontFamily: 'var(--font-heading)', 
                            color: '#FF8C6B',
                            textShadow: '0 4px 10px rgba(0,0,0,0.9), 0 0 20px rgba(255,140,107,0.6)',
                            filter: 'drop-shadow(0px 2px 10px rgba(0,0,0,1))'
                        }}
                    >
                        The Origin of the Bakunawa
                    </p>
                </motion.div>

                {/* Phase B: Quote */}
                <motion.div
                    className="absolute inset-0 flex flex-col items-center justify-center px-6 z-20"
                    style={{ opacity: quoteOpacity, y: quoteY, scale: quoteScale }}
                >
                    {/* Soft radial vignette behind the quote for contrast */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background:
                                'radial-gradient(circle at 50% 45%, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.65) 28%, rgba(0,0,0,0.4) 55%, transparent 80%)',
                        }}
                        aria-hidden="true"
                    />
                    <blockquote
                        className="relative text-3xl md:text-5xl lg:text-6xl leading-relaxed text-center max-w-4xl"
                        style={{
                            fontFamily: 'var(--font-body)',
                            color: '#FFF5E2',
                            fontStyle: 'italic',
                            textShadow:
                                '0 0 10px rgba(0,0,0,0.85), 0 18px 40px rgba(0,0,0,0.9)',
                        }}
                    >
                        &ldquo;We believe every learner deserves a path lit by intelligence.&rdquo;
                    </blockquote>
                    {/* Decorative reveal line */}
                    <motion.div
                        className="mt-8 h-[2px] rounded-full"
                        style={{
                            width: lineWidth,
                            opacity: lineOpacity,
                            background: 'linear-gradient(90deg, transparent, #FF8C6B, transparent)',
                        }}
                    />
                </motion.div>

                {/* === PHASE C NEBULA BACKGROUND === */}
                <motion.div
                    className="absolute inset-0 pointer-events-none mix-blend-screen overflow-hidden z-20"
                    style={{ opacity: cardsContainerOpacity }}
                >
                    {/* Emerald left nebula */}
                    <div
                        className="absolute rounded-[100%] blur-[100px]"
                        style={{
                            width: '70vw', height: '120vh', maxWidth: '700px',
                            left: '-20%', top: '-10%',
                            background: 'radial-gradient(ellipse at center, rgba(0,212,160,0.45) 0%, rgba(0,100,80,0.25) 45%, transparent 70%)',
                            animation: 'phaseCNebulaLeft 50s linear infinite',
                            willChange: 'transform',
                        }}
                    />
                    {/* Gold right nebula */}
                    <div
                        className="absolute rounded-[100%] blur-[100px]"
                        style={{
                            width: '70vw', height: '120vh', maxWidth: '700px',
                            right: '-20%', bottom: '-10%',
                            background: 'radial-gradient(ellipse at center, rgba(255,209,102,0.4) 0%, rgba(200,120,0,0.2) 45%, transparent 70%)',
                            animation: 'phaseCNebulaRight 60s linear infinite',
                            willChange: 'transform',
                        }}
                    />
                    {/* Centre deep imperial bloom */}
                    <div
                        className="absolute rounded-full blur-[140px]"
                        style={{
                            width: '60vw', height: '60vw', maxWidth: '600px', maxHeight: '600px',
                            left: '50%', top: '50%',
                            background: 'radial-gradient(circle, rgba(91,91,255,0.25) 0%, rgba(30,20,80,0.15) 50%, transparent 75%)',
                            animation: 'phaseCBloom 8s ease-in-out infinite',
                            willChange: 'transform, opacity',
                        }}
                    />
                    {/* Top-left accent */}
                    <div className="absolute rounded-full blur-[80px] opacity-60"
                        style={{ width: '40vw', height: '50vh', left: '-5%', top: '5%',
                            background: 'radial-gradient(circle, rgba(0,212,160,0.3) 0%, transparent 65%)', willChange: 'transform' }} />
                    {/* Bottom-right accent */}
                    <div className="absolute rounded-full blur-[80px] opacity-60"
                        style={{ width: '40vw', height: '50vh', right: '-5%', bottom: '5%',
                            background: 'radial-gradient(circle, rgba(255,209,102,0.3) 0%, transparent 65%)', willChange: 'transform' }} />
                </motion.div>

                {/* Phase C: Mission & Vision with Mist */}
                <motion.div
                    className="absolute inset-0 z-30"
                    style={{ opacity: cardsContainerOpacity }}
                >
                    {/* === MIST / SMOKE EFFECTS === */}
                    <motion.div className="absolute inset-0" style={{ opacity: mistOpacity }}>
                        {/* Left mist (emerald) */}
                        <MistLayer side="left" color="#00D4A0" delay={0} />
                        {/* Right mist (gold) */}
                        <MistLayer side="right" color="#FFD166" delay={1.5} />

                        {/* Central convergence smoke */}
                        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
                            {[...Array(6)].map((_, i) => (
                                <div
                                    key={`center-smoke-${i}`}
                                    className="absolute left-1/2 -translate-x-1/2 rounded-full"
                                    style={{
                                        width: `${100 + i * 40}px`,
                                        height: `${60 + i * 25}px`,
                                        bottom: `${5 + i * 8}%`,
                                        background: `radial-gradient(ellipse, rgba(200,190,170,0.08) 0%, transparent 70%)`,
                                        animation: `smokeRise ${6 + i * 1.2}s ease-out ${i * 0.6}s infinite`,
                                    }}
                                />
                            ))}
                        </div>

                        {/* Floating ember particles */}
                        <FloatingParticles color="rgba(0,212,160,0.6)" count={8} />
                        <FloatingParticles color="rgba(255,209,102,0.5)" count={8} />
                    </motion.div>

                    {/* === MISSION & VISION CARDS === */}
                    <div className="absolute inset-0 flex items-center justify-center px-4 md:px-8">
                        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-6 md:gap-8">
                            {/* Mission — from left */}
                            <motion.div style={{ x: missionX, opacity: missionOpacity }}>
                                <div
                                    className="p-8 md:p-12 rounded-2xl relative overflow-hidden group h-full transition-all duration-500 hover:-translate-y-1"
                                    style={{
                                        background: 'linear-gradient(160deg, rgba(8,8,20,0.92) 0%, rgba(10,8,18,0.7) 50%, rgba(0,30,20,0.15) 100%)',
                                        border: '1px solid rgba(0,212,160,0.25)',
                                        backdropFilter: 'blur(16px)',
                                        boxShadow: '0 0 60px rgba(0,212,160,0.08), 0 8px 32px rgba(0,0,0,0.6), inset 0 1px 0 rgba(0,212,160,0.1)',
                                    }}
                                >
                                    {/* === ORNAMENTAL BORDER SVG === */}
                                    <svg
                                        className="absolute inset-0 w-full h-full rounded-2xl pointer-events-none"
                                        preserveAspectRatio="none"
                                        viewBox="0 0 700 340"
                                        fill="none"
                                        aria-hidden="true"
                                    >
                                        <defs>
                                            <linearGradient id="emeraldGrad-mission" x1="0" y1="0" x2="1" y2="1">
                                                <stop offset="0%" stopColor="#00D4A0" stopOpacity="0.7" />
                                                <stop offset="50%" stopColor="#008B6A" stopOpacity="0.5" />
                                                <stop offset="100%" stopColor="#00D4A0" stopOpacity="0.65" />
                                            </linearGradient>
                                        </defs>

                                        {/* Corner filigrees — top-left */}
                                        <g opacity="0.85" className="transition-opacity duration-700 group-hover:opacity-100">
                                            <path d="M 16 4 Q 4 4 4 16" stroke="url(#emeraldGrad-mission)" strokeWidth="1.8" fill="none" />
                                            <path d="M 36 4 Q 4 4 4 36" stroke="rgba(0,212,160,0.35)" strokeWidth="1" fill="none" />
                                            <path d="M 50 4 Q 4 6 4 50" stroke="rgba(0,212,160,0.15)" strokeWidth="0.6" fill="none" />
                                            <circle cx="4" cy="4" r="2.5" fill="rgba(0,212,160,0.6)" />
                                            <path d="M 24 4 C 24 14, 16 20, 4 20" stroke="rgba(0,212,160,0.3)" strokeWidth="0.8" fill="none" />
                                            <path d="M 4 28 C 14 28, 20 20, 20 4" stroke="rgba(0,212,160,0.25)" strokeWidth="0.7" fill="none" />
                                            <path d="M 30 4 C 28 8, 24 12, 16 14 C 22 10, 26 6, 30 4" stroke="rgba(0,212,160,0.2)" strokeWidth="0.5" fill="rgba(0,212,160,0.06)" />
                                            <path d="M 4 34 C 8 30, 12 26, 18 20 C 12 24, 8 28, 4 34" stroke="rgba(0,212,160,0.18)" strokeWidth="0.5" fill="rgba(0,212,160,0.05)" />
                                            <circle cx="24" cy="4" r="1.2" fill="rgba(0,212,160,0.5)" />
                                            <circle cx="4" cy="24" r="1.2" fill="rgba(0,212,160,0.5)" />
                                            <circle cx="16" cy="14" r="0.8" fill="rgba(0,212,160,0.35)" />
                                        </g>

                                        {/* Corner filigrees — top-right */}
                                        <g opacity="0.85" className="transition-opacity duration-700 group-hover:opacity-100" transform="translate(700,0) scale(-1,1)">
                                            <path d="M 16 4 Q 4 4 4 16" stroke="url(#emeraldGrad-mission)" strokeWidth="1.8" fill="none" />
                                            <path d="M 36 4 Q 4 4 4 36" stroke="rgba(0,212,160,0.35)" strokeWidth="1" fill="none" />
                                            <path d="M 50 4 Q 4 6 4 50" stroke="rgba(0,212,160,0.15)" strokeWidth="0.6" fill="none" />
                                            <circle cx="4" cy="4" r="2.5" fill="rgba(0,212,160,0.6)" />
                                            <path d="M 24 4 C 24 14, 16 20, 4 20" stroke="rgba(0,212,160,0.3)" strokeWidth="0.8" fill="none" />
                                            <path d="M 4 28 C 14 28, 20 20, 20 4" stroke="rgba(0,212,160,0.25)" strokeWidth="0.7" fill="none" />
                                            <path d="M 30 4 C 28 8, 24 12, 16 14 C 22 10, 26 6, 30 4" stroke="rgba(0,212,160,0.2)" strokeWidth="0.5" fill="rgba(0,212,160,0.06)" />
                                            <circle cx="24" cy="4" r="1.2" fill="rgba(0,212,160,0.5)" />
                                            <circle cx="16" cy="14" r="0.8" fill="rgba(0,212,160,0.35)" />
                                        </g>

                                        {/* Corner filigrees — bottom-left */}
                                        <g opacity="0.85" className="transition-opacity duration-700 group-hover:opacity-100" transform="translate(0,340) scale(1,-1)">
                                            <path d="M 16 4 Q 4 4 4 16" stroke="url(#emeraldGrad-mission)" strokeWidth="1.8" fill="none" />
                                            <path d="M 36 4 Q 4 4 4 36" stroke="rgba(0,212,160,0.35)" strokeWidth="1" fill="none" />
                                            <path d="M 50 4 Q 4 6 4 50" stroke="rgba(0,212,160,0.15)" strokeWidth="0.6" fill="none" />
                                            <circle cx="4" cy="4" r="2.5" fill="rgba(0,212,160,0.6)" />
                                            <path d="M 24 4 C 24 14, 16 20, 4 20" stroke="rgba(0,212,160,0.3)" strokeWidth="0.8" fill="none" />
                                            <path d="M 30 4 C 28 8, 24 12, 16 14 C 22 10, 26 6, 30 4" stroke="rgba(0,212,160,0.2)" strokeWidth="0.5" fill="rgba(0,212,160,0.06)" />
                                            <circle cx="4" cy="24" r="1.2" fill="rgba(0,212,160,0.5)" />
                                        </g>

                                        {/* Corner filigrees — bottom-right */}
                                        <g opacity="0.85" className="transition-opacity duration-700 group-hover:opacity-100" transform="translate(700,340) scale(-1,-1)">
                                            <path d="M 16 4 Q 4 4 4 16" stroke="url(#emeraldGrad-mission)" strokeWidth="1.8" fill="none" />
                                            <path d="M 36 4 Q 4 4 4 36" stroke="rgba(0,212,160,0.35)" strokeWidth="1" fill="none" />
                                            <path d="M 50 4 Q 4 6 4 50" stroke="rgba(0,212,160,0.15)" strokeWidth="0.6" fill="none" />
                                            <circle cx="4" cy="4" r="2.5" fill="rgba(0,212,160,0.6)" />
                                            <path d="M 24 4 C 24 14, 16 20, 4 20" stroke="rgba(0,212,160,0.3)" strokeWidth="0.8" fill="none" />
                                            <path d="M 30 4 C 28 8, 24 12, 16 14 C 22 10, 26 6, 30 4" stroke="rgba(0,212,160,0.2)" strokeWidth="0.5" fill="rgba(0,212,160,0.06)" />
                                            <circle cx="24" cy="4" r="1.2" fill="rgba(0,212,160,0.5)" />
                                        </g>

                                        {/* Top edge ornament — center diamond */}
                                        <g opacity="0.7" className="transition-opacity duration-700 group-hover:opacity-[0.9]">
                                            <line x1="60" y1="1" x2="310" y2="1" stroke="rgba(0,212,160,0.2)" strokeWidth="0.6" />
                                            <line x1="390" y1="1" x2="640" y2="1" stroke="rgba(0,212,160,0.2)" strokeWidth="0.6" />
                                            <path d="M 320 1 L 350 14 L 380 1" stroke="rgba(0,212,160,0.45)" strokeWidth="0.8" fill="none" />
                                            <path d="M 335 1 L 350 8 L 365 1" stroke="rgba(0,212,160,0.3)" strokeWidth="0.5" fill="rgba(0,212,160,0.05)" />
                                            <circle cx="350" cy="14" r="1.5" fill="rgba(0,212,160,0.55)" />
                                            <circle cx="320" cy="1" r="0.8" fill="rgba(0,212,160,0.35)" />
                                            <circle cx="380" cy="1" r="0.8" fill="rgba(0,212,160,0.35)" />
                                        </g>

                                        {/* Bottom edge ornament */}
                                        <g opacity="0.6" className="transition-opacity duration-700 group-hover:opacity-[0.85]">
                                            <line x1="60" y1="339" x2="310" y2="339" stroke="rgba(0,212,160,0.18)" strokeWidth="0.6" />
                                            <line x1="390" y1="339" x2="640" y2="339" stroke="rgba(0,212,160,0.18)" strokeWidth="0.6" />
                                            <path d="M 320 339 L 350 326 L 380 339" stroke="rgba(0,212,160,0.35)" strokeWidth="0.8" fill="none" />
                                            <path d="M 335 339 L 350 332 L 365 339" stroke="rgba(0,212,160,0.25)" strokeWidth="0.5" fill="rgba(0,212,160,0.04)" />
                                            <circle cx="350" cy="326" r="1.5" fill="rgba(0,212,160,0.45)" />
                                        </g>

                                        {/* Side lines */}
                                        <line x1="2" y1="55" x2="2" y2="285" stroke="#00D4A0" strokeWidth="0.8" opacity="0.3" className="transition-opacity duration-700 group-hover:opacity-[0.5]" />
                                        <line x1="698" y1="55" x2="698" y2="285" stroke="#00D4A0" strokeWidth="0.8" opacity="0.3" className="transition-opacity duration-700 group-hover:opacity-[0.5]" />

                                        {/* Inner frame border */}
                                        <rect x="10" y="10" width="680" height="320" rx="12" stroke="rgba(0,212,160,0.06)" strokeWidth="0.5" fill="none" className="transition-all duration-700 group-hover:[stroke-opacity:0.14]" />
                                    </svg>

                                    {/* Hover glow */}
                                    <div
                                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                                        style={{ boxShadow: 'inset 0 0 80px rgba(0,212,160,0.04), 0 0 60px rgba(0,212,160,0.05), inset 0 1px 0 rgba(0,212,160,0.08)' }}
                                    />
                                    {/* Corner glow */}
                                    <div
                                        className="absolute -top-16 -left-16 w-40 h-40 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                                        style={{ background: 'radial-gradient(circle, rgba(0,212,160,0.06), transparent 70%)' }}
                                    />

                                    <div className="relative z-10">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div
                                                className="w-3 h-3 rounded-full"
                                                style={{
                                                    backgroundColor: '#00D4A0',
                                                    boxShadow: '0 0 16px rgba(0,212,160,0.5), 0 0 40px rgba(0,212,160,0.2)',
                                                }}
                                                aria-hidden="true"
                                            />
                                            <span
                                                className="text-xs tracking-[0.3em] uppercase"
                                                style={{ fontFamily: 'var(--font-ui)', color: '#00D4A0' }}
                                            >
                                                Chapter II
                                            </span>
                                        </div>
                                        <h2
                                            className="text-3xl md:text-4xl mb-5"
                                            style={{ fontFamily: 'var(--font-heading)', color: '#00D4A0' }}
                                        >
                                            Our Mission
                                        </h2>
                                        <p
                                            className="text-base md:text-lg leading-relaxed"
                                            style={{ fontFamily: 'var(--font-body)', color: '#A09A8E' }}
                                        >
                                            To democratize quality education in Asia through AI-powered, culturally-rooted learning experiences that adapt to every student&apos;s unique potential. Making world-class education accessible to everyone.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Vision — from right */}
                            <motion.div style={{ x: visionX, opacity: visionOpacity }}>
                                <div
                                    className="p-8 md:p-12 rounded-2xl relative overflow-hidden group h-full transition-all duration-500 hover:-translate-y-1"
                                    style={{
                                        background: 'linear-gradient(160deg, rgba(8,8,20,0.92) 0%, rgba(10,8,18,0.7) 50%, rgba(20,16,10,0.15) 100%)',
                                        border: '1px solid rgba(255,209,102,0.25)',
                                        backdropFilter: 'blur(16px)',
                                        boxShadow: '0 0 60px rgba(255,209,102,0.08), 0 8px 32px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,209,102,0.1)',
                                    }}
                                >
                                    {/* === ORNAMENTAL BORDER SVG === */}
                                    <svg
                                        className="absolute inset-0 w-full h-full rounded-2xl pointer-events-none"
                                        preserveAspectRatio="none"
                                        viewBox="0 0 700 340"
                                        fill="none"
                                        aria-hidden="true"
                                    >
                                        <defs>
                                            <linearGradient id="goldGrad-vision" x1="0" y1="0" x2="1" y2="1">
                                                <stop offset="0%" stopColor="#FFD166" stopOpacity="0.7" />
                                                <stop offset="50%" stopColor="#B8922A" stopOpacity="0.5" />
                                                <stop offset="100%" stopColor="#FFD166" stopOpacity="0.65" />
                                            </linearGradient>
                                        </defs>

                                        {/* Corner filigrees — top-left */}
                                        <g opacity="0.85" className="transition-opacity duration-700 group-hover:opacity-100">
                                            <path d="M 16 4 Q 4 4 4 16" stroke="url(#goldGrad-vision)" strokeWidth="1.8" fill="none" />
                                            <path d="M 36 4 Q 4 4 4 36" stroke="rgba(255,209,102,0.35)" strokeWidth="1" fill="none" />
                                            <path d="M 50 4 Q 4 6 4 50" stroke="rgba(255,209,102,0.15)" strokeWidth="0.6" fill="none" />
                                            <circle cx="4" cy="4" r="2.5" fill="rgba(255,209,102,0.6)" />
                                            <path d="M 24 4 C 24 14, 16 20, 4 20" stroke="rgba(255,209,102,0.3)" strokeWidth="0.8" fill="none" />
                                            <path d="M 4 28 C 14 28, 20 20, 20 4" stroke="rgba(255,209,102,0.25)" strokeWidth="0.7" fill="none" />
                                            <path d="M 30 4 C 28 8, 24 12, 16 14 C 22 10, 26 6, 30 4" stroke="rgba(255,209,102,0.2)" strokeWidth="0.5" fill="rgba(255,209,102,0.06)" />
                                            <path d="M 4 34 C 8 30, 12 26, 18 20 C 12 24, 8 28, 4 34" stroke="rgba(255,209,102,0.18)" strokeWidth="0.5" fill="rgba(255,209,102,0.05)" />
                                            <circle cx="24" cy="4" r="1.2" fill="rgba(255,209,102,0.5)" />
                                            <circle cx="4" cy="24" r="1.2" fill="rgba(255,209,102,0.5)" />
                                            <circle cx="16" cy="14" r="0.8" fill="rgba(255,209,102,0.35)" />
                                        </g>

                                        {/* Corner filigrees — top-right */}
                                        <g opacity="0.85" className="transition-opacity duration-700 group-hover:opacity-100" transform="translate(700,0) scale(-1,1)">
                                            <path d="M 16 4 Q 4 4 4 16" stroke="url(#goldGrad-vision)" strokeWidth="1.8" fill="none" />
                                            <path d="M 36 4 Q 4 4 4 36" stroke="rgba(255,209,102,0.35)" strokeWidth="1" fill="none" />
                                            <path d="M 50 4 Q 4 6 4 50" stroke="rgba(255,209,102,0.15)" strokeWidth="0.6" fill="none" />
                                            <circle cx="4" cy="4" r="2.5" fill="rgba(255,209,102,0.6)" />
                                            <path d="M 24 4 C 24 14, 16 20, 4 20" stroke="rgba(255,209,102,0.3)" strokeWidth="0.8" fill="none" />
                                            <path d="M 4 28 C 14 28, 20 20, 20 4" stroke="rgba(255,209,102,0.25)" strokeWidth="0.7" fill="none" />
                                            <path d="M 30 4 C 28 8, 24 12, 16 14 C 22 10, 26 6, 30 4" stroke="rgba(255,209,102,0.2)" strokeWidth="0.5" fill="rgba(255,209,102,0.06)" />
                                            <circle cx="24" cy="4" r="1.2" fill="rgba(255,209,102,0.5)" />
                                            <circle cx="16" cy="14" r="0.8" fill="rgba(255,209,102,0.35)" />
                                        </g>

                                        {/* Corner filigrees — bottom-left */}
                                        <g opacity="0.85" className="transition-opacity duration-700 group-hover:opacity-100" transform="translate(0,340) scale(1,-1)">
                                            <path d="M 16 4 Q 4 4 4 16" stroke="url(#goldGrad-vision)" strokeWidth="1.8" fill="none" />
                                            <path d="M 36 4 Q 4 4 4 36" stroke="rgba(255,209,102,0.35)" strokeWidth="1" fill="none" />
                                            <path d="M 50 4 Q 4 6 4 50" stroke="rgba(255,209,102,0.15)" strokeWidth="0.6" fill="none" />
                                            <circle cx="4" cy="4" r="2.5" fill="rgba(255,209,102,0.6)" />
                                            <path d="M 24 4 C 24 14, 16 20, 4 20" stroke="rgba(255,209,102,0.3)" strokeWidth="0.8" fill="none" />
                                            <path d="M 30 4 C 28 8, 24 12, 16 14 C 22 10, 26 6, 30 4" stroke="rgba(255,209,102,0.2)" strokeWidth="0.5" fill="rgba(255,209,102,0.06)" />
                                            <circle cx="4" cy="24" r="1.2" fill="rgba(255,209,102,0.5)" />
                                        </g>

                                        {/* Corner filigrees — bottom-right */}
                                        <g opacity="0.85" className="transition-opacity duration-700 group-hover:opacity-100" transform="translate(700,340) scale(-1,-1)">
                                            <path d="M 16 4 Q 4 4 4 16" stroke="url(#goldGrad-vision)" strokeWidth="1.8" fill="none" />
                                            <path d="M 36 4 Q 4 4 4 36" stroke="rgba(255,209,102,0.35)" strokeWidth="1" fill="none" />
                                            <path d="M 50 4 Q 4 6 4 50" stroke="rgba(255,209,102,0.15)" strokeWidth="0.6" fill="none" />
                                            <circle cx="4" cy="4" r="2.5" fill="rgba(255,209,102,0.6)" />
                                            <path d="M 24 4 C 24 14, 16 20, 4 20" stroke="rgba(255,209,102,0.3)" strokeWidth="0.8" fill="none" />
                                            <path d="M 30 4 C 28 8, 24 12, 16 14 C 22 10, 26 6, 30 4" stroke="rgba(255,209,102,0.2)" strokeWidth="0.5" fill="rgba(255,209,102,0.06)" />
                                            <circle cx="24" cy="4" r="1.2" fill="rgba(255,209,102,0.5)" />
                                        </g>

                                        {/* Top edge ornament — center diamond */}
                                        <g opacity="0.7" className="transition-opacity duration-700 group-hover:opacity-[0.9]">
                                            <line x1="60" y1="1" x2="310" y2="1" stroke="rgba(255,209,102,0.2)" strokeWidth="0.6" />
                                            <line x1="390" y1="1" x2="640" y2="1" stroke="rgba(255,209,102,0.2)" strokeWidth="0.6" />
                                            <path d="M 320 1 L 350 14 L 380 1" stroke="rgba(255,209,102,0.45)" strokeWidth="0.8" fill="none" />
                                            <path d="M 335 1 L 350 8 L 365 1" stroke="rgba(255,209,102,0.3)" strokeWidth="0.5" fill="rgba(255,209,102,0.05)" />
                                            <circle cx="350" cy="14" r="1.5" fill="rgba(255,209,102,0.55)" />
                                            <circle cx="320" cy="1" r="0.8" fill="rgba(255,209,102,0.35)" />
                                            <circle cx="380" cy="1" r="0.8" fill="rgba(255,209,102,0.35)" />
                                        </g>

                                        {/* Bottom edge ornament */}
                                        <g opacity="0.6" className="transition-opacity duration-700 group-hover:opacity-[0.85]">
                                            <line x1="60" y1="339" x2="310" y2="339" stroke="rgba(255,209,102,0.18)" strokeWidth="0.6" />
                                            <line x1="390" y1="339" x2="640" y2="339" stroke="rgba(255,209,102,0.18)" strokeWidth="0.6" />
                                            <path d="M 320 339 L 350 326 L 380 339" stroke="rgba(255,209,102,0.35)" strokeWidth="0.8" fill="none" />
                                            <path d="M 335 339 L 350 332 L 365 339" stroke="rgba(255,209,102,0.25)" strokeWidth="0.5" fill="rgba(255,209,102,0.04)" />
                                            <circle cx="350" cy="326" r="1.5" fill="rgba(255,209,102,0.45)" />
                                        </g>

                                        {/* Side lines */}
                                        <line x1="2" y1="55" x2="2" y2="285" stroke="#FFD166" strokeWidth="0.8" opacity="0.3" className="transition-opacity duration-700 group-hover:opacity-[0.5]" />
                                        <line x1="698" y1="55" x2="698" y2="285" stroke="#FFD166" strokeWidth="0.8" opacity="0.3" className="transition-opacity duration-700 group-hover:opacity-[0.5]" />

                                        {/* Inner frame border */}
                                        <rect x="10" y="10" width="680" height="320" rx="12" stroke="rgba(255,209,102,0.06)" strokeWidth="0.5" fill="none" className="transition-all duration-700 group-hover:[stroke-opacity:0.14]" />
                                    </svg>

                                    {/* Hover glow */}
                                    <div
                                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                                        style={{ boxShadow: 'inset 0 0 80px rgba(255,209,102,0.04), 0 0 60px rgba(255,209,102,0.05), inset 0 1px 0 rgba(255,209,102,0.08)' }}
                                    />
                                    {/* Corner glow */}
                                    <div
                                        className="absolute -top-16 -right-16 w-40 h-40 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                                        style={{ background: 'radial-gradient(circle, rgba(255,209,102,0.06), transparent 70%)' }}
                                    />

                                    <div className="relative z-10">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div
                                                className="w-3 h-3 rounded-full"
                                                style={{
                                                    backgroundColor: '#FFD166',
                                                    boxShadow: '0 0 16px rgba(255,209,102,0.5), 0 0 40px rgba(255,209,102,0.2)',
                                                }}
                                                aria-hidden="true"
                                            />
                                            <span
                                                className="text-xs tracking-[0.3em] uppercase"
                                                style={{ fontFamily: 'var(--font-ui)', color: '#FFD166' }}
                                            >
                                                Our North Star
                                            </span>
                                        </div>
                                        <h2
                                            className="text-3xl md:text-4xl mb-5"
                                            style={{ fontFamily: 'var(--font-heading)', color: '#FFD166' }}
                                        >
                                            Our Vision
                                        </h2>
                                        <p
                                            className="text-base md:text-lg leading-relaxed"
                                            style={{ fontFamily: 'var(--font-body)', color: '#A09A8E' }}
                                        >
                                            A education where no learner is left behind, where intelligent technology and rich cultural narratives combine to produce globally competitive, deeply rooted ASEAN graduates who lead with innovation and heart.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Bottom transition divider - moved inside for seamless background */}
                    <div className="absolute bottom-0 left-0 right-0 z-20">
                        <div className="max-w-7xl mx-auto px-6">
                            <SerpentDivider />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

// ============ PATHMAKERS STARFIELD ============
const pathmakersStyles = `
@keyframes bgStarTwinkle {
  0%, 100% { opacity: 0.15; }
  50% { opacity: 0.7; }
}
`;

function PathmakersStarfield({ isInView }: { isInView: boolean }) {
    const [stars, setStars] = useState<{ id: number; x: number; y: number; size: number; color: string; duration: number; delay: number }[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start'],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 0.6, 0.6, 0]);
    const yTransform = useTransform(scrollYProgress, [0, 1], [-220, -120]);

    useEffect(() => {
        const colors = ['#FFFFFF', '#B0B0FF', '#FFD166', '#00D4A0', '#FF8C6B'];

        // General scattered stars
        const scattered = Array.from({ length: 400 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 0.04 + 0.01,
            color: colors[Math.floor(Math.random() * colors.length)],
            duration: 3 + Math.random() * 4,
            delay: Math.random() * 5,
        }));

        // Milky Way band — dense cluster of tiny stars along a diagonal stripe
        const milkyWay = Array.from({ length: 600 }, (_, i) => {
            // Band runs from top-left to bottom-right with gaussian-like spread
            const t = Math.random();
            const centerX = 10 + t * 80;
            const centerY = 5 + t * 90;
            // Spread perpendicular to the diagonal (narrower = tighter band)
            const spread = (Math.random() + Math.random() + Math.random()) / 3 - 0.5; // approx gaussian -0.5..0.5
            const offsetX = spread * 25;
            const offsetY = spread * -20;
            return {
                id: 400 + i,
                x: Math.min(100, Math.max(0, centerX + offsetX)),
                y: Math.min(100, Math.max(0, centerY + offsetY)),
                size: Math.random() * 0.025 + 0.005,
                color: ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#B0B0FF', '#FFD166', '#E8E0D4'][Math.floor(Math.random() * 6)],
                duration: 2 + Math.random() * 5,
                delay: Math.random() * 6,
            };
        });

        setStars([...scattered, ...milkyWay]);
    }, []);

    return (
        <motion.div
            ref={containerRef}
            className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
            style={{ opacity, contain: 'layout style paint' }}
        >
            <style>{pathmakersStyles}</style>
            <motion.div className="absolute inset-0" style={{ y: yTransform }}>
                {/* Ethereal nebula background */}
                <div
                    className="absolute inset-0 opacity-15"
                    style={{
                        background: 'radial-gradient(ellipse at 50% 50%, rgba(176, 176, 255, 0.2) 0%, rgba(0, 212, 160, 0.1) 40%, transparent 70%)',
                        filter: 'blur(80px)',
                        willChange: 'transform',
                    }}
                />

                {/* Milky Way nebula band — diagonal hazy glow */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: 'linear-gradient(135deg, transparent 15%, rgba(176,176,255,0.04) 30%, rgba(255,255,255,0.06) 45%, rgba(200,190,255,0.05) 55%, rgba(255,209,102,0.03) 65%, transparent 80%)',
                        filter: 'blur(40px)',
                    }}
                />
                <div
                    className="absolute inset-0"
                    style={{
                        background: 'linear-gradient(135deg, transparent 25%, rgba(255,255,255,0.03) 40%, rgba(180,180,255,0.04) 50%, rgba(255,255,255,0.03) 60%, transparent 75%)',
                        filter: 'blur(20px)',
                    }}
                />

                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full overflow-visible">
                    {stars.map((star) => (
                        <circle
                            key={`bg-star-${star.id}`}
                            cx={star.x}
                            cy={star.y}
                            r={star.size}
                            fill={star.color}
                            style={{
                                opacity: isInView ? undefined : 0,
                                animation: isInView
                                    ? `bgStarTwinkle ${star.duration}s ease-in-out ${star.delay}s infinite`
                                    : 'none',
                            }}
                        />
                    ))}
                </svg>
            </motion.div>
        </motion.div>
    );
}

// ============ CHAPTER 3: THE PATHMAKERS (TEAM) ============
function ChapterPathmakers() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

    return (
        <section ref={sectionRef} className="min-h-screen flex items-center justify-center py-16 px-6 relative overflow-hidden" style={{ backgroundColor: 'var(--color-void)', contain: 'layout style' }}>
            {/* Constellation is absolute inset-0 to cover whole section background */}
            <div className="absolute inset-0 z-0">
                <PathmakersStarfield isInView={isInView} />
            </div>

            {/* Central unifying nebula glow */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-full pointer-events-none z-0 opacity-40"
                style={{
                    background: 'radial-gradient(circle at center, rgba(91,91,255,0.08) 0%, rgba(0,212,160,0.05) 30%, transparent 70%)',
                    filter: 'blur(100px)',
                    willChange: 'transform',
                }}
            />
            
            <div className="max-w-6xl mx-auto relative z-10 w-full">
                {/* Header */}
                <motion.div
                    className="text-center mb-12"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <motion.p
                        variants={fadeUpVariant}
                        className="text-xs tracking-[0.4em] uppercase mb-3"
                        style={{ fontFamily: 'var(--font-ui)', color: '#FF8C6B' }}
                    >
                        Chapter III
                    </motion.p>
                    <motion.h2
                        variants={fadeUpVariant}
                        custom={1}
                        className="text-4xl md:text-5xl lg:text-6xl mb-4 tracking-tight"
                        style={{ fontFamily: 'var(--font-heading)', color: '#FFD166' }}
                    >
                        The Pathmakers
                    </motion.h2>
                    <motion.p
                        variants={fadeUpVariant}
                        custom={2}
                        className="text-base md:text-lg max-w-2xl mx-auto"
                        style={{ color: '#A09A8E', fontFamily: 'var(--font-body)' }}
                    >
                        The people behind the serpent&apos;s path.
                    </motion.p>
                </motion.div>

                {/* Team cards perfectly centered using grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10 place-items-center mx-auto w-full">
                    {TEAM.map((member, i) => {
                        const moon = MOON_CONFIGS.find((m) => m.id === member.moonId)!;
                        return (
                            <motion.div
                                key={i}
                                className="w-full max-w-xs flex justify-center"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    delay: i * 0.15,
                                    duration: 0.6,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                            >
                                <GoldFrame color={moon.color} className="flex-1">
                                    <div className="flex-1 flex flex-col items-center text-center p-6">
                                        {/* Hexagonal avatar with realistic moon rendering */}
                                        <div className="flex justify-center mb-5">
                                            {/* Golden Border Wrapper for Hexagon */}
                                            <div 
                                                className="w-[102px] h-[102px] flex items-center justify-center relative"
                                                style={{
                                                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                                                    background: 'linear-gradient(135deg, #D1A435 0%, #FFD166 50%, #D1A435 100%)',
                                                    filter: 'drop-shadow(0 0 8px rgba(209, 164, 53, 0.4))',
                                                }}
                                            >
                                                <div
                                                    className="w-[96px] h-[96px] flex items-center justify-center relative"
                                                    style={{
                                                        clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                                                        backgroundColor: 'var(--color-void)',
                                                        zIndex: 1,
                                                    }}
                                                >
                                                    <div
                                                        className="w-full h-full flex items-center justify-center relative"
                                                        style={{
                                                            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                                                            backgroundColor: `${moon.color}15`,
                                                            // Outer box-shadow for atmospheric glow
                                                            filter: 'drop-shadow(0 0 12px rgba(255, 255, 255, 0.15))',
                                                        }}
                                                    >
                                                        {/* Moon surface with 3D spherical effect */}
                                                        <div
                                                            className="absolute inset-0"
                                                            style={{
                                                                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                                                                background: `
                                                                    radial-gradient(circle at 35% 30%, ${moon.color}80 0%, ${moon.color}60 15%, transparent 35%),
                                                                    radial-gradient(circle at 30% 30%, rgba(255,255,255,0.25) 0%, transparent 20%),
                                                                    radial-gradient(circle at 65% 60%, rgba(0,0,0,0.3) 0%, transparent 25%),
                                                                    radial-gradient(circle at 45% 55%, rgba(0,0,0,0.2) 0%, transparent 20%),
                                                                    radial-gradient(circle at 50% 50%, ${moon.color}40 0%, ${moon.color}80 50%, ${moon.color}100 100%)
                                                                `,
                                                            }}
                                                        />

                                                        {/* Surface crater texture pattern */}
                                                        <div
                                                            className="absolute inset-0 opacity-20"
                                                            style={{
                                                                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                                                                backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px),
                                                                    repeating-linear-gradient(-45deg, transparent, transparent 2px, rgba(255,255,255,0.02) 2px, rgba(255,255,255,0.02) 4px)`,
                                                            }}
                                                        />

                                                        {/* Subtle noise overlay for surface texture */}
                                                        <div
                                                            className="absolute inset-0 mix-blend-overlay"
                                                            style={{
                                                                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                                                                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E")`,
                                                                opacity: 0.4,
                                                            }}
                                                        />

                                                        {/* Inner shadow for depth */}
                                                        <div
                                                            className="absolute inset-0"
                                                            style={{
                                                                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                                                                boxShadow: 'inset -3px -3px 8px rgba(0,0,0,0.4), inset 2px 2px 5px rgba(255,255,255,0.1)',
                                                            }}
                                                        />

                                                        {/* Initial letter with enhanced visibility */}
                                                        <span
                                                            className="text-3xl font-bold relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
                                                            style={{ fontFamily: 'var(--font-heading)', color: moon.color, textShadow: `0 0 10px ${moon.color}60` }}
                                                        >
                                                            {member.name.charAt(0)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex-1 flex flex-col items-center justify-center w-full">
                                            <h3
                                                className="text-lg md:text-xl mb-1"
                                                style={{ fontFamily: 'var(--font-heading)', color: '#F0EDE8' }}
                                            >
                                                {member.name}
                                            </h3>
                                            <p
                                                className="text-sm mb-3"
                                                style={{ fontFamily: 'var(--font-ui)', color: '#A09A8E' }}
                                            >
                                                {member.role}
                                            </p>
                                            <div className="flex items-center justify-center gap-2 mt-auto">
                                                <div
                                                    className="w-2 h-2 rounded-full"
                                                    style={{
                                                        backgroundColor: moon.color,
                                                        boxShadow: `0 0 8px ${moon.color}60`,
                                                    }}
                                                    aria-hidden="true"
                                                />
                                                <span
                                                    className="text-xs"
                                                    style={{ fontFamily: 'var(--font-mono)', color: moon.color }}
                                                >
                                                    {member.department}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </GoldFrame>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Bottom transition divider - moved inside for seamless background */}
            <div className="absolute bottom-0 left-0 right-0 z-20">
                <div className="max-w-7xl mx-auto px-6">
                    <SerpentDivider />
                </div>
            </div>
        </section>
    );
}

// ============ CHAPTER 4: OUR STORY (MOON ZOOM SCROLL) ============

// -- Sub-component: each story slide with its own scroll-driven transforms --
function StorySlide({
    scrollYProgress,
    index,
    item,
    total,
}: {
    scrollYProgress: MotionValue<number>;
    index: number;
    item: { year: string; event: string; description: string };
    total: number;
}) {
    const seg = 1 / total;
    const s = index * seg;
    const moon = MOON_CONFIGS[index % MOON_CONFIGS.length];
    const isLast = index === total - 1;

    // Solar orbit direction: first moon enters center, then alternating left/right
    const orbitDirection = index === 0 ? 0 : index % 2 === 1 ? -1 : 1; // -1 = from left, 1 = from right
    const orbitOffset = index === 0 ? 0 : 35; // vw offset for orbit entry

    // Moon zoom: tiny dot in distance → full size → massive fly-through past camera
    const moonScale = useTransform(
        scrollYProgress,
        [s, s + seg * 0.28, s + seg * 0.72, s + seg],
        [0.08, 1, 1, isLast ? 1 : 4.5]
    );

    // Moon horizontal orbit: sweeps in from left or right, settles center, exits opposite
    const moonX = useTransform(
        scrollYProgress,
        [s, s + seg * 0.25, s + seg * 0.72, s + seg],
        [
            orbitDirection * orbitOffset + 'vw',
            '0vw',
            '0vw',
            isLast ? '0vw' : (-orbitDirection * orbitOffset * 0.6) + 'vw',
        ]
    );

    // Subtle vertical arc — moons dip slightly as they travel across
    const moonArcY = useTransform(
        scrollYProgress,
        [s, s + seg * 0.15, s + seg * 0.28, s + seg * 0.72, s + seg * 0.85, s + seg],
        [index === 0 ? 0 : -15, index === 0 ? 0 : 8, 0, 0, isLast ? 0 : -8, isLast ? 0 : 15]
    );

    // Subtle rotation on entry — tilt in the direction of travel
    const moonRotate = useTransform(
        scrollYProgress,
        [s, s + seg * 0.25, s + seg * 0.72, s + seg],
        [orbitDirection * -8, 0, 0, isLast ? 0 : orbitDirection * 8]
    );

    // Container opacity — faster fade-out for fly-through immersion
    const slideOpacity = useTransform(
        scrollYProgress,
        [s, s + seg * 0.10, s + seg * 0.82, s + seg * 0.94],
        [0, 1, 1, 0]
    );

    // Moon blur: heavy blur at distance → sharp → motion blur on fly-through
    const moonBlurVal = useTransform(
        scrollYProgress,
        [s, s + seg * 0.22, s + seg * 0.75, s + seg],
        [14, 0, 0, isLast ? 0 : 20]
    );
    const moonFilter = useMotionTemplate`blur(${moonBlurVal}px)`;

    // Text reveal (appears after moon settles)
    const textOpacity = useTransform(
        scrollYProgress,
        [s + seg * 0.28, s + seg * 0.38, s + seg * 0.62, s + seg * 0.74],
        [0, 1, 1, 0]
    );
    const textY = useTransform(
        scrollYProgress,
        [s + seg * 0.28, s + seg * 0.38, s + seg * 0.62, s + seg * 0.74],
        [60, 0, 0, -50]
    );

    // Background glow intensity — brighter approach, dramatic on fly-through
    const glowOpacity = useTransform(
        scrollYProgress,
        [s, s + seg * 0.3, s + seg * 0.7, s + seg],
        [0, 0.22, 0.22, isLast ? 0.05 : 0.55]
    );

    // Year badge scale pop
    const yearScale = useTransform(
        scrollYProgress,
        [s + seg * 0.28, s + seg * 0.36],
        [0.7, 1]
    );

    // Star field — rushing outward during fly-through (warp effect)
    const starParallax = useTransform(
        scrollYProgress,
        [s, s + seg * 0.3, s + seg * 0.72, s + seg],
        [0.7, 1, 1, isLast ? 1 : 3.5]
    );
    // Star field opacity — stars become streaks then vanish
    const starFieldOpacity = useTransform(
        scrollYProgress,
        [s, s + seg * 0.15, s + seg * 0.8, s + seg * 0.92],
        [0, 1, 1, isLast ? 0.6 : 0]
    );

    // Warp speed lines opacity — visible only during fly-through transition
    const warpOpacity = useTransform(
        scrollYProgress,
        [s + seg * 0.74, s + seg * 0.82, s + seg * 0.92, s + seg],
        [0, isLast ? 0 : 0.6, isLast ? 0 : 0.4, 0]
    );

    // Vignette darkening during travel — tunnel vision effect
    const vignetteOpacity = useTransform(
        scrollYProgress,
        [s + seg * 0.7, s + seg * 0.85, s + seg],
        [0, isLast ? 0 : 0.7, 0]
    );

    // Generate deterministic star positions — more stars for density
    const stars = Array.from({ length: 50 }, (_, si) => {
        const seed = index * 100 + si;
        const angle = (seed * 137.508) % 360;
        const radius = 20 + (seed * 7.31) % 48;
        const x = 50 + radius * Math.cos((angle * Math.PI) / 180);
        const y = 50 + radius * Math.sin((angle * Math.PI) / 180);
        const size = 1 + (seed % 3);
        const opacity = 0.15 + (seed % 5) * 0.1;
        return { x, y, size, opacity, delay: (si * 0.12) % 2.5, angle };
    });

    // Warp speed lines — radial streaks from center
    const warpLines = Array.from({ length: 24 }, (_, wi) => {
        const angle = (wi / 24) * 360;
        const length = 15 + (wi * 7.3) % 25;
        const dist = 20 + (wi * 13.7) % 35;
        return { angle, length, dist, delay: (wi * 0.08) % 1.5 };
    });

    return (
        <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center"
            style={{ opacity: slideOpacity }}
        >
            {/* Nebula glow behind moon — follows orbit path */}
            <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
                style={{
                    width: '110vmin',
                    height: '110vmin',
                    opacity: glowOpacity,
                    x: moonX,
                    background: `radial-gradient(circle, ${moon.color}22 0%, ${moon.color}08 35%, transparent 65%)`,
                }}
                aria-hidden="true"
            />

            {/* Orbital trail — faint arc showing the travel path */}
            {index > 0 && (
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                    style={{
                        width: '90vw',
                        height: '4px',
                        opacity: useTransform(
                            scrollYProgress,
                            [s, s + seg * 0.1, s + seg * 0.25, s + seg * 0.4],
                            [0, 0.25, 0.15, 0]
                        ),
                        background: `linear-gradient(${orbitDirection === -1 ? '90deg' : '270deg'}, transparent, ${moon.color}30, ${moon.color}10, transparent)`,
                        filter: 'blur(3px)',
                        borderRadius: '50%',
                    }}
                    aria-hidden="true"
                />
            )}

            {/* Vignette tunnel — darkens edges during warp travel */}
            <motion.div
                className="absolute inset-0 pointer-events-none z-20"
                style={{
                    opacity: vignetteOpacity,
                    background: 'radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.85) 100%)',
                }}
                aria-hidden="true"
            />

            {/* Warp speed lines — radial streaks rushing outward from center */}
            <motion.div
                className="absolute inset-0 pointer-events-none z-15"
                style={{ opacity: warpOpacity }}
                aria-hidden="true"
            >
                {warpLines.map((line, wi) => {
                    const rad = (line.angle * Math.PI) / 180;
                    const x1 = 50 + line.dist * Math.cos(rad);
                    const y1 = 50 + line.dist * Math.sin(rad);
                    const x2 = 50 + (line.dist + line.length) * Math.cos(rad);
                    const y2 = 50 + (line.dist + line.length) * Math.sin(rad);
                    return (
                        <div
                            key={`warp-${wi}`}
                            className="absolute"
                            style={{
                                left: `${Math.min(x1, x2)}%`,
                                top: `${Math.min(y1, y2)}%`,
                                width: `${Math.abs(x2 - x1) + 1}%`,
                                height: '2px',
                                background: `linear-gradient(90deg, transparent, ${wi % 3 === 0 ? moon.color : '#F0EDE8'}60, transparent)`,
                                transform: `rotate(${line.angle}deg)`,
                                transformOrigin: 'left center',
                                filter: `blur(${0.5 + (wi % 2)}px)`,
                            }}
                        />
                    );
                })}
            </motion.div>

            {/* Star field — rushes outward during warp */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{ scale: starParallax, opacity: starFieldOpacity }}
                aria-hidden="true"
            >
                {stars.map((star, si) => (
                    <motion.div
                        key={si}
                        className="absolute rounded-full"
                        style={{
                            left: `${star.x}%`,
                            top: `${star.y}%`,
                            width: star.size,
                            height: star.size,
                            backgroundColor: si % 4 === 0 ? moon.color : '#F0EDE8',
                        }}
                        animate={{
                            opacity: [star.opacity, star.opacity * 2.5, star.opacity],
                            scale: [1, 1.4, 1],
                        }}
                        transition={{
                            duration: 2.5 + (si % 3) * 0.8,
                            repeat: Infinity,
                            delay: star.delay,
                            ease: 'easeInOut',
                        }}
                    />
                ))}
            </motion.div>

            {/* Moon container — orbiting from left/right with approach depth */}
            <motion.div
                className="relative z-10 flex items-center justify-center"
                style={{ scale: moonScale, filter: moonFilter, x: moonX, y: moonArcY, rotate: moonRotate }}
            >
                <div className="w-36 h-36 md:w-48 md:h-48 lg:w-56 lg:h-56 relative flex items-center justify-center">
                    {/* Approach bloom — bright flash when arriving close */}
                    <motion.div
                        className="absolute -inset-20 rounded-full"
                        style={{
                            background: `radial-gradient(circle, ${moon.color}15, ${moon.color}08 40%, transparent 70%)`,
                            opacity: useTransform(
                                scrollYProgress,
                                [s + seg * 0.18, s + seg * 0.28, s + seg * 0.35],
                                [0, 0.8, 0.2]
                            ),
                        }}
                        aria-hidden="true"
                    />
                    {/* Soft outer aura */}
                    <div
                        className="absolute -inset-10 rounded-full pointer-events-none"
                        style={{ background: `radial-gradient(circle, ${moon.color}18, transparent 65%)` }}
                        aria-hidden="true"
                    />
                    {/* Pulse ring */}
                    <motion.div
                        className="absolute -inset-5 rounded-full pointer-events-none"
                        style={{ border: `1px solid ${moon.color}20` }}
                        animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0, 0.4] }}
                        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                        aria-hidden="true"
                    />
                    
                    {/* EXPANDED SVG: 250% width to allow room for outer stylized rings */}
                    <svg
                        viewBox="0 0 250 250"
                        className="absolute z-10 pointer-events-none"
                        style={{ 
                            width: '250%', 
                            height: '250%',
                            filter: `drop-shadow(0 0 24px ${moon.color}50)` 
                        }}
                    >
                        <defs>
                            <radialGradient id={`storyMoonG-${index}`} cx="38%" cy="35%" r="55%">
                                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                                <stop offset="25%" stopColor={moon.color} stopOpacity="0.85" />
                                <stop offset="60%" stopColor={moon.color} stopOpacity="0.45" />
                                <stop offset="85%" stopColor="#1a1a2e" stopOpacity="0.8" />
                                <stop offset="100%" stopColor="#0a0a14" stopOpacity="0.95" />
                            </radialGradient>
                            <radialGradient id={`storyMoonSh-${index}`} cx="70%" cy="50%" r="55%">
                                <stop offset="0%" stopColor="#000" stopOpacity="0.6" />
                                <stop offset="50%" stopColor="#000" stopOpacity="0.2" />
                                <stop offset="100%" stopColor="#000" stopOpacity="0" />
                            </radialGradient>
                            <filter id={`storyNoise-${index}`}>
                                <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="4" seed={index * 37 + 5} stitchTiles="stitch" />
                                <feColorMatrix type="saturate" values="0" />
                                <feBlend in="SourceGraphic" mode="multiply" />
                            </filter>
                            <clipPath id={`storyClip-${index}`}>
                                {/* The clip path defines the moon boundary. Since the moon group is translated, 
                                    the clipPath must remain at 50,50 to match the inner coordinates */}
                                <circle cx="50" cy="50" r="49" />
                            </clipPath>
                            <filter id={`storyRingGlow-${index}`}>
                                <feGaussianBlur stdDeviation="3" result="blur" />
                                <feMerge>
                                    <feMergeNode in="blur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>

                        {/* Moon Body (Centered at 125, 125 via translation) */}
                        <g transform="translate(75, 75)">
                            {/* Base sphere */}
                            <circle cx="50" cy="50" r="49" fill={`url(#storyMoonG-${index})`} />
                            {/* Surface texture */}
                            <circle cx="50" cy="50" r="49" fill={`url(#storyMoonG-${index})`} filter={`url(#storyNoise-${index})`} opacity="0.3" clipPath={`url(#storyClip-${index})`} />
                            
                            {/* Mare (Soft dark plains, completely removed blocky dots) */}
                            <g clipPath={`url(#storyClip-${index})`} opacity="0.15">
                                <ellipse cx="40" cy="42" rx="18" ry="14" fill="#000" />
                                <ellipse cx="60" cy="55" rx="12" ry="16" fill="#000" />
                                <ellipse cx="30" cy="65" rx="10" ry="8" fill="#000" />
                            </g>
                            
                            {/* Terminator shadow */}
                            <circle cx="50" cy="50" r="49" fill={`url(#storyMoonSh-${index})`} />
                            {/* Specular highlights */}
                            <ellipse cx="36" cy="32" rx="12" ry="10" fill="rgba(255,255,255,0.12)" />
                            <ellipse cx="33" cy="28" rx="5" ry="4" fill="rgba(255,255,255,0.18)" />
                            {/* Atmosphere rim (simple outline, rings removed for Story section) */}
                            <circle cx="50" cy="50" r="49" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="0.6" />
                        </g>
                    </svg>
                </div>
            </motion.div>

            {/* Story text */}
            <motion.div
                className="mt-8 md:mt-12 text-center px-6 max-w-xl relative z-10"
                style={{ opacity: textOpacity, y: textY }}
            >
                {/* Year badge */}
                <motion.span
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-5"
                    style={{
                        scale: yearScale,
                        fontFamily: 'var(--font-mono)',
                        color: moon.color,
                        backgroundColor: `${moon.color}12`,
                        border: `1px solid ${moon.color}30`,
                    }}
                >
                    <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: moon.color, boxShadow: `0 0 8px ${moon.color}80` }}
                        aria-hidden="true"
                    />
                    {item.year}
                </motion.span>

                <h3
                    className="text-2xl md:text-3xl lg:text-4xl mb-3"
                    style={{ fontFamily: 'var(--font-heading)', color: '#F0EDE8' }}
                >
                    {item.event}
                </h3>

                {/* Decorative divider */}
                <div
                    className="mx-auto h-[1px] w-14 mb-4"
                    style={{ background: `linear-gradient(90deg, transparent, ${moon.color}, transparent)` }}
                    aria-hidden="true"
                />

                <p
                    className="text-base md:text-lg leading-relaxed"
                    style={{ fontFamily: 'var(--font-body)', color: '#A09A8E' }}
                >
                    {item.description}
                </p>
            </motion.div>
        </motion.div>
    );
}

// -- Sub-component: progress dot --
function StoryProgressDot({
    scrollYProgress,
    index,
    total,
    color,
}: {
    scrollYProgress: MotionValue<number>;
    index: number;
    total: number;
    color: string;
}) {
    const seg = 1 / total;
    const s = index * seg;
    const active = useTransform(
        scrollYProgress,
        [s, s + seg * 0.1, s + seg * 0.9, s + seg],
        [0.25, 1, 1, 0.25]
    );
    const dotScale = useTransform(
        scrollYProgress,
        [s, s + seg * 0.1, s + seg * 0.9, s + seg],
        [0.6, 1.2, 1.2, 0.6]
    );

    return (
        <motion.div
            className="w-2.5 h-2.5 rounded-full"
            style={{
                opacity: active,
                scale: dotScale,
                backgroundColor: color,
                boxShadow: `0 0 8px ${color}60`,
            }}
        />
    );
}

// -- Main Chapter Story component --
function ChapterStory() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end end'],
    });

    // Header transforms — visible at start, fades as first story arrives
    const headerOpacity = useTransform(scrollYProgress, [0, 0.03, 0.07], [1, 1, 0]);
    const headerScale = useTransform(scrollYProgress, [0, 0.07], [1, 0.88]);
    const headerY = useTransform(scrollYProgress, [0, 0.07], [0, -60]);

    // Progress bar opacity — visible during stories
    const progressOpacity = useTransform(scrollYProgress, [0.06, 0.1, 0.92, 0.98], [0, 1, 1, 0]);

    // Scroll-progress line
    const progressWidth = useTransform(scrollYProgress, [0.08, 0.95], ['0%', '100%']);

    return (
        <section
            ref={sectionRef}
            className="relative"
            style={{ height: `${TIMELINE.length * 150 + 50}vh`, backgroundColor: 'var(--color-void)' }}
        >
            <div className="sticky top-0 h-screen overflow-hidden">
                {/* Deep space background gradient */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: 'radial-gradient(ellipse at 50% 40%, rgba(91,91,255,0.03) 0%, transparent 60%)',
                    }}
                    aria-hidden="true"
                />

                {/* === SIDE NEBULA EFFECTS FOR STORY SECTION === */}
                <div className="absolute inset-0 pointer-events-none mix-blend-screen overflow-hidden">
                    {/* Left Side Nebula */}
                    <div 
                        className="absolute w-[80vw] h-[150vh] max-w-[800px] rounded-[100%] blur-[100px] opacity-40" 
                        style={{ 
                            left: '-40%',
                            top: '10%',
                            background: 'radial-gradient(ellipse at center, rgba(91,91,255,0.2) 0%, rgba(0,212,160,0.1) 40%, transparent 70%)', 
                            animation: 'ambientNebulaSpin 100s linear infinite',
                            transformOrigin: 'center right'
                        }} 
                    />
                    {/* Right Side Nebula */}
                    <div 
                        className="absolute w-[80vw] h-[150vh] max-w-[800px] rounded-[100%] blur-[100px] opacity-40" 
                        style={{ 
                            right: '-40%',
                            bottom: '10%',
                            background: 'radial-gradient(ellipse at center, rgba(255,209,102,0.15) 0%, rgba(255,140,107,0.1) 40%, transparent 70%)', 
                            animation: 'ambientNebulaSpinReverse 130s linear infinite',
                            transformOrigin: 'center left'
                        }} 
                    />
                </div>

                {/* Header overlay */}
                <motion.div
                    className="absolute inset-0 flex flex-col items-center justify-center z-40 pointer-events-none"
                    style={{ opacity: headerOpacity, scale: headerScale, y: headerY }}
                >
                    <p
                        className="text-xs tracking-[0.35em] uppercase mb-5"
                        style={{ fontFamily: 'var(--font-ui)', color: '#5B5BFF' }}
                    >
                        Chapter IV
                    </p>
                    <h2
                        className="text-5xl md:text-6xl lg:text-7xl mb-5"
                        style={{ fontFamily: 'var(--font-display)', color: '#FFD166' }}
                    >
                        Our Story
                    </h2>
                    <p
                        className="text-lg md:text-xl max-w-lg text-center"
                        style={{ color: '#A09A8E', fontFamily: 'var(--font-body)' }}
                    >
                        Every serpent leaves a trail. Here is ours.
                    </p>
                    <div
                        className="mt-8 h-[1px] w-24"
                        style={{ background: 'linear-gradient(90deg, transparent, #5B5BFF, transparent)' }}
                        aria-hidden="true"
                    />
                    {/* Scroll hint */}
                    <motion.div
                        className="mt-12 flex flex-col items-center gap-2"
                        animate={{ opacity: [0.4, 0.8, 0.4], y: [0, 6, 0] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        <span
                            className="text-[10px] tracking-[0.2em] uppercase"
                            style={{ fontFamily: 'var(--font-ui)', color: '#5B5BFF80' }}
                        >
                            Scroll to explore
                        </span>
                        <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
                            <rect x="1" y="1" width="14" height="22" rx="7" stroke="#5B5BFF" strokeWidth="1" strokeOpacity="0.3" />
                            <motion.circle
                                cx="8" cy="8" r="2" fill="#5B5BFF"
                                animate={{ cy: [8, 16, 8] }}
                                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                            />
                        </svg>
                    </motion.div>
                </motion.div>

                {/* Story slides */}
                {TIMELINE.map((item, i) => (
                    <StorySlide
                        key={i}
                        scrollYProgress={scrollYProgress}
                        index={i}
                        item={item}
                        total={TIMELINE.length}
                    />
                ))}

                {/* Bottom progress indicator */}
                <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-30 pointer-events-none"
                    style={{ opacity: progressOpacity }}
                >
                    {/* Progress dots */}
                    <div className="flex items-center gap-3">
                        {TIMELINE.map((_, i) => (
                            <StoryProgressDot
                                key={i}
                                scrollYProgress={scrollYProgress}
                                index={i}
                                total={TIMELINE.length}
                                color={MOON_CONFIGS[i % MOON_CONFIGS.length].color}
                            />
                        ))}
                    </div>
                    {/* Progress track */}
                    <div className="w-32 h-[1px] rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(91,91,255,0.1)' }}>
                        <motion.div
                            className="h-full rounded-full"
                            style={{
                                width: progressWidth,
                                background: 'linear-gradient(90deg, #C8B8FF, #5B5BFF, #00D4A0, #FFD166)',
                            }}
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

// ============ ABOUT SECTION (MAIN EXPORT) ============
export default function AboutSection() {
    return (
        <div id="about" className="relative" style={{ backgroundColor: 'var(--color-void)' }}>
            <NebulaEffect />
            {/* Chapter 1: The Origin — Manifesto + Mission & Vision */}
            <ChapterOrigin />

            {/* Chapter 3: The Pathmakers — Team */}
            <ChapterPathmakers />

            {/* Chapter 4: Our Story — Timeline */}
            <ChapterStory />
        </div>
    );
}