'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import { fadeUpVariant, staggerContainer } from '@/lib/motion-variants';

// ============ CSS KEYFRAMES ============
const voteStyles = `
@keyframes voteButtonGlow {
  0%, 100% {
    box-shadow:
      0 0 0 2px rgba(255,209,102,0.4),
      0 0 8px rgba(255,209,102,0.2);
  }
  50% {
    box-shadow:
      0 0 0 2.5px rgba(255,209,102,0.95),
      0 0 14px 2px rgba(255,209,102,0.6);
  }
}
@keyframes voteTwinkle {
  0%, 100% { opacity: 0.05; }
  50% { opacity: 1; }
}
@keyframes nebulaDrift1 {
  0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
  50% { transform: translate(-50%, -50%) scale(1.12); opacity: 0.8; }
}
@keyframes nebulaDrift2 {
  0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.4; }
  50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.7; }
}
@keyframes nebulaDrift3 {
  0%, 100% { transform: translate(-50%, -50%) scale(1.05); opacity: 0.35; }
  50% { transform: translate(-50%, -50%) scale(1.15); opacity: 0.65; }
}
@keyframes moonSpin { to { transform: rotate(360deg); } }
@keyframes moonSpinReverse { to { transform: rotate(-360deg); } }
@keyframes moonGlow {
  0%, 100% { opacity: 0.25; transform: scale(1.6); }
  50% { opacity: 0.55; transform: scale(2.0); }
}
`;

// ============ VIBRANT MOON ============
function VibrantMoon({ color, id, size, speed, reverse = false }: {
    color: string; id: string; size: number; speed: number; reverse?: boolean;
}) {
    return (
        <div className="relative" style={{ width: size, height: size }}>
            {/* Pulsating outer glow */}
            <div
                className="absolute inset-0 rounded-full"
                style={{
                    background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
                    filter: 'blur(40px)',
                    animation: 'moonGlow 4s ease-in-out infinite',
                    willChange: 'opacity, transform',
                }}
            />
            {/* Spinning surface */}
            <div
                className="w-full h-full relative"
                style={{
                    animation: `${reverse ? 'moonSpinReverse' : 'moonSpin'} ${speed}s linear infinite`,
                    willChange: 'transform',
                }}
            >
                <svg viewBox="0 0 120 120" className="w-full h-full overflow-visible">
                    <defs>
                        <radialGradient id={`vg-${id}`} cx="35%" cy="30%" r="65%">
                            <stop offset="0%" stopColor="#FFFFFF" />
                            <stop offset="25%" stopColor={color} />
                            <stop offset="60%" stopColor={color} stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#08081a" />
                        </radialGradient>
                        <filter id={`vn-${id}`}>
                            <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" stitchTiles="stitch" />
                            <feColorMatrix type="saturate" values="0" />
                            <feBlend in="SourceGraphic" mode="multiply" />
                        </filter>
                        <radialGradient id={`vs-${id}`} cx="70%" cy="70%" r="50%">
                            <stop offset="0%" stopColor="#000" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#000" stopOpacity="0" />
                        </radialGradient>
                        <clipPath id={`vc-${id}`}>
                            <circle cx="60" cy="60" r="58" />
                        </clipPath>
                    </defs>
                    <circle cx="60" cy="60" r="58" fill={`url(#vg-${id})`} />
                    <circle cx="60" cy="60" r="58" fill={`url(#vg-${id})`} filter={`url(#vn-${id})`} opacity="0.3" clipPath={`url(#vc-${id})`} />
                    <g clipPath={`url(#vc-${id})`} opacity="0.4">
                        <circle cx="35" cy="40" r="8" fill="rgba(0,0,0,0.2)" />
                        <circle cx="75" cy="55" r="10" fill="rgba(0,0,0,0.2)" />
                        <circle cx="50" cy="80" r="6" fill="rgba(0,0,0,0.2)" />
                        <circle cx="85" cy="30" r="5" fill="rgba(0,0,0,0.15)" />
                        <circle cx="20" cy="70" r="7" fill="rgba(0,0,0,0.25)" />
                    </g>
                    <circle cx="60" cy="60" r="58" fill={`url(#vs-${id})`} />
                    <circle cx="60" cy="60" r="58" fill="none" stroke="white" strokeWidth="0.5" opacity="0.2" />
                </svg>
            </div>
        </div>
    );
}

// ============ VOTE SECTION ============
export default function VoteSection() {
    const [stars, setStars] = useState<{ id: number; x: number; y: number; size: number; color: string; duration: number; delay: number }[]>([]);

    useEffect(() => {
        const colors = ['#FFFFFF', '#B0B0FF', '#FFD166', '#00D4A0', '#FF8C6B', '#D5C8FF', '#FF3366', '#00FFFF', '#FF00FF', '#FFFF00'];
        setStars(
            Array.from({ length: 400 }, (_, i) => ({
                id: i,
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: Math.random() * 0.04 + 0.02, // very tiny dots
                color: colors[Math.floor(Math.random() * colors.length)],
                duration: 2 + Math.random() * 4, // slightly calmer twinkling
                delay: Math.random() * 6,
            }))
        );
    }, []);

    return (
        <div id="vote" className="relative pt-12 pb-20" style={{ backgroundColor: 'var(--color-void)', overflowX: 'clip' }}>
            <style>{voteStyles}</style>

            {/* Nebulae removed — Unified by the bridging nebula in PartnershipSection */}

            {/* ── Twinkling starfield ── */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                {stars.map((s) => (
                    <circle
                        key={s.id}
                        cx={s.x} cy={s.y} r={s.size}
                        fill={s.color}
                        style={{ animation: `voteTwinkle ${s.duration}s ease-in-out ${s.delay}s infinite` }}
                    />
                ))}
            </svg>

            {/* ── Moon 1 — upper left ── */}
            <div className="absolute pointer-events-none" style={{ top: '-20px', left: '-20px', opacity: 0.9 }}>
                <VibrantMoon color="#FFD166" id="vote-moon-1" size={180} speed={60} />
            </div>

            {/* ── Moon 2 — lower left ── */}
            <div className="absolute pointer-events-none" style={{ bottom: '-30px', left: '60px', opacity: 0.85 }}>
                <VibrantMoon color="#00FFC0" id="vote-moon-2" size={130} speed={80} reverse />
            </div>

            {/* ── Moon 3 — upper right ── */}
            <div className="absolute pointer-events-none" style={{ top: '-10px', right: '-30px', opacity: 0.85 }}>
                <VibrantMoon color="#7373FF" id="vote-moon-3" size={160} speed={70} reverse />
            </div>

            {/* ── Moon 4 — lower right ── */}
            <div className="absolute pointer-events-none" style={{ bottom: '-20px', right: '50px', opacity: 0.8 }}>
                <VibrantMoon color="#FF8C6B" id="vote-moon-4" size={140} speed={90} />
            </div>

            {/* ── Moon 5 — mid right edge ── */}
            <div className="absolute pointer-events-none" style={{ top: '38%', right: '-50px', opacity: 0.7 }}>
                <VibrantMoon color="#D5C8FF" id="vote-moon-5" size={100} speed={100} reverse />
            </div>

            {/* ── Moon 6 — mid left edge ── */}
            <div className="absolute pointer-events-none" style={{ top: '42%', left: '-40px', opacity: 0.7 }}>
                <VibrantMoon color="#00B4FF" id="vote-moon-6" size={110} speed={85} />
            </div>


            {/* ── Content ── */}
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.div
                    className="text-center mb-16"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <motion.p
                        variants={fadeUpVariant}
                        className="text-sm tracking-[0.3em] uppercase mb-4"
                        style={{ fontFamily: 'var(--font-heading)', color: '#FF8C6B' }}
                    >
                        The Voice of the People
                    </motion.p>
                    <motion.h1
                        variants={fadeUpVariant}
                        custom={1}
                        className="text-5xl md:text-6xl mb-6 text-gradient-gold-shine"
                        style={{ fontFamily: 'var(--font-display)' }}
                    >
                        Shape the Path
                    </motion.h1>
                    <motion.p
                        variants={fadeUpVariant}
                        custom={2}
                        className="text-lg max-w-xl mx-auto mb-8"
                        style={{ color: '#A09A8E', fontFamily: 'var(--font-body)' }}
                    >
                        Dalan is built for the community, by the community. Vote on upcoming features, curriculum priorities, and community initiatives.
                    </motion.p>
                    <motion.div variants={fadeUpVariant} custom={3} className="inline-block">
                        <div style={{
                            borderRadius: '9999px',
                            animation: 'voteButtonGlow 2.5s ease-in-out infinite',
                        }}>
                            <Button variant="solid" color="gold" href="#vote" size="md">
                                Vote Us Now!
                            </Button>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
