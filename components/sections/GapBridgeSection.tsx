'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const gapStarStyles = `
@keyframes gapTwinkle {
  0%, 100% { opacity: 0.08; }
  50% { opacity: 0.9; }
}
`;

function GapStarfield() {
    const [stars, setStars] = useState<{ id: number; x: number; y: number; r: number; color: string; dur: number; delay: number }[]>([]);
    useEffect(() => {
        const colors = ['#FFFFFF', '#FFD166', '#00FFC0', '#B0B0FF', '#FF8C6B', '#00B4FF', '#FF50A0', '#D5C8FF'];
        setStars(Array.from({ length: 500 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            r: Math.random() * 0.035 + 0.008,
            color: colors[Math.floor(Math.random() * colors.length)],
            dur: 1.5 + Math.random() * 4,
            delay: Math.random() * 6,
        })));
    }, []);
    return (
        <>
            <style>{gapStarStyles}</style>
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                {stars.map(s => (
                    <circle key={s.id} cx={s.x} cy={s.y} r={s.r} fill={s.color}
                        style={{ animation: `gapTwinkle ${s.dur}s ease-in-out ${s.delay}s infinite` }} />
                ))}
            </svg>
        </>
    );
}

const GAPS = [
    {
        num: '01',
        color: '#00FFC0',
        quote: '"My university syllabus doesn\'t teach me what employers actually want."',
        stat: '37.3% scored 1–2 / 5',
        body: 'Only 22.4% of students are genuinely confident their syllabus matches industry needs. The average confidence score is just 2.79 out of 5. More than a third actively distrust what their university is teaching them — and they\'re right to. CHED CMO 25, the law governing IT programs, was written in 2015. That\'s 11 years of AI revolutions, cloud-native shifts, and framework overhauls — all ignored.',
        solution: 'The Delta Calculator mathematically proves exactly how outdated a syllabus is by cross-referencing it against live 2026 ASEAN job postings — turning vague distrust into a precise, actionable score.',
    },
    {
        num: '02',
        color: '#FFD166',
        quote: '"I know I need a bootcamp. I just can\'t afford one."',
        stat: '55.2% — too expensive',
        body: 'A majority of respondents — 55.2% — said they considered a bootcamp but couldn\'t afford it. Combined with the 23.9% who did take one, that\'s 79.1% of students who already identified bootcamps as the solution. The demand is proven. The financial barrier is the only wall. Private tech bootcamps in the Philippines cost ₱30,000–₱80,000 — completely out of reach for state university students.',
        solution: 'Permanently free for students via zero-CAC community distribution (GDG on Campus, Seekers Guild, AWSCC). Dalan\'s targeted RAG modules replace the entire bootcamp outcome — at zero cost.',
    },
    {
        num: '03',
        color: '#7373FF',
        quote: '"I don\'t know exactly what I\'m missing to get hired."',
        stat: '76.1% guessing or vague',
        body: 'Only 23.9% of students know exactly what skills they\'re missing. The other 76.1% are either completely guessing (10.4%) or have only a vague sense (65.7%). This isn\'t a motivation problem — it\'s a navigation problem. Without a precise map of what\'s missing, even the most hardworking student wastes months studying the wrong things. Generic AI tools like ChatGPT make this worse by confidently quizzing students on whatever outdated syllabus they upload.',
        solution: 'The pgvector delta search calculates the exact cosine distance between a syllabus and 4,000+ live job postings — producing a ranked, specific list of missing skills. Vague anxiety becomes a precise action plan.',
    },
    {
        num: '04',
        color: '#FF8C6B',
        quote: '"I get overwhelmed and don\'t know where to start."',
        stat: '37.3% regularly quit',
        body: 'More than 1 in 3 students reported regularly getting overwhelmed and abandoning their upskilling effort entirely. On top of that, 56.7% try to figure it out completely alone — no mentor, no structured path, no feedback loop. The result is wasted hours, broken momentum, and deepening anxiety. YouTube tutorials (used by 88.1%) give information but no direction — they can\'t tell you what to watch next, or whether what you just learned actually closes your gap.',
        solution: 'Gamified daily modules with streaks and XP eliminate the "where do I start?" paralysis. Dalan always tells you the single most impactful next skill to learn — no decision fatigue, no overwhelm.',
    },
    {
        num: '05',
        color: '#D5C8FF',
        quote: '"I study hard, but I have nothing to show employers."',
        stat: '94% ready to commit time',
        body: '94% of respondents said they would commit 1–5+ hours per week to a free, targeted platform. The willingness is there. The missing piece is proof. Self-studying YouTube tutorials builds knowledge — but not a portfolio. Employers can\'t see a student\'s effort, their hours, or their growing competency. Students are trapped in a credentialing gap: too skilled for entry-level, too unverified for mid-level. Without documented, verifiable proof of their bridged skills, their effort remains invisible to the job market.',
        solution: 'Every completed bridge module auto-generates a verified portfolio entry pushed to GitHub. Students don\'t just learn — they automatically build mathematically verified proof of competency that employers can trust.',
    },
];

// Color → rgba helper
function toRgb(hex: string) {
    const c = hex.replace('#', '');
    return `${parseInt(c.slice(0, 2), 16)},${parseInt(c.slice(2, 4), 16)},${parseInt(c.slice(4, 6), 16)}`;
}

export default function GapBridgeSection() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

    // Map scroll progress to horizontal translation of the card rail
    // 5 cards: we slide from 0% to -80% (each card = 20% of rail width)
    const railX = useTransform(scrollYProgress, [0.05, 0.95], ['0%', '-80%']);

    return (
        <section
            ref={ref}
            className="relative"
            style={{ height: '600vh', backgroundColor: 'var(--color-void)' }}
        >
            <div className="sticky top-0 h-screen overflow-hidden flex flex-col items-center justify-center py-8">
                <GapStarfield />

                {/* Background nebula — vivid & colorful */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
                    {/* Deep violet / indigo — top left */}
                    <motion.div
                        className="absolute rounded-full blur-[160px]"
                        style={{
                            width: '85vw', height: '75vh',
                            left: '-10%', top: '-5%',
                            background: 'radial-gradient(circle, rgba(120,80,255,0.3) 0%, rgba(80,40,200,0.15) 40%, transparent 75%)',
                        }}
                        animate={{ scale: [1, 1.15, 1], opacity: [0.55, 0.95, 0.55] }}
                        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    {/* Warm gold / amber — bottom right */}
                    <motion.div
                        className="absolute rounded-full blur-[140px]"
                        style={{
                            width: '75vw', height: '70vh',
                            right: '-15%', bottom: '-5%',
                            background: 'radial-gradient(circle, rgba(255,190,60,0.25) 0%, rgba(255,120,80,0.15) 40%, transparent 70%)',
                        }}
                        animate={{ scale: [1, 1.12, 1], opacity: [0.45, 0.85, 0.45] }}
                        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
                    />
                    {/* Emerald / teal — center */}
                    <motion.div
                        className="absolute rounded-full blur-[130px]"
                        style={{
                            width: '65vw', height: '60vh',
                            left: '20%', top: '25%',
                            background: 'radial-gradient(circle, rgba(0,255,192,0.2) 0%, rgba(0,180,140,0.1) 45%, transparent 75%)',
                        }}
                        animate={{ scale: [1, 1.2, 1], opacity: [0.35, 0.8, 0.35] }}
                        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                    />
                    {/* Magenta / rose — top right accent */}
                    <motion.div
                        className="absolute rounded-full blur-[120px]"
                        style={{
                            width: '50vw', height: '50vh',
                            right: '5%', top: '5%',
                            background: 'radial-gradient(circle, rgba(255,80,160,0.18) 0%, rgba(200,50,120,0.08) 45%, transparent 75%)',
                        }}
                        animate={{ scale: [1, 1.18, 1], opacity: [0.3, 0.7, 0.3] }}
                        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
                    />
                    {/* Cyan / blue — bottom left accent */}
                    <motion.div
                        className="absolute rounded-full blur-[110px]"
                        style={{
                            width: '45vw', height: '45vh',
                            left: '5%', bottom: '10%',
                            background: 'radial-gradient(circle, rgba(0,180,255,0.18) 0%, rgba(60,100,255,0.1) 45%, transparent 75%)',
                        }}
                        animate={{ scale: [1, 1.14, 1], opacity: [0.3, 0.65, 0.3] }}
                        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 8 }}
                    />
                    {/* Ambient fill */}
                    <div
                        className="absolute inset-0"
                        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(100,80,255,0.1) 0%, rgba(0,212,160,0.04) 40%, transparent 65%)' }}
                    />
                </div>

                {/* Section header */}
                <div className="relative z-10 text-center px-6 mb-6 flex-shrink-0 w-full">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-xs tracking-[0.5em] uppercase mb-3"
                        style={{ fontFamily: 'var(--font-ui)', color: 'var(--color-emerald)' }}
                    >
                        Chapter VI
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.97 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.9, delay: 0.1 }}
                        className="text-3xl md:text-5xl lg:text-6xl tracking-tight text-gradient-gold-shine"
                        style={{ fontFamily: 'var(--font-display)' }}
                    >
                        DALAN Bridges These Gaps
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="text-base md:text-lg mt-3"
                        style={{ color: '#7A7870', fontFamily: 'var(--font-body)' }}
                    >
                        Between theory and practice.
                    </motion.p>
                </div>

                {/* Horizontal card rail */}
                <div className="relative z-10 flex items-center overflow-visible px-[10vw] w-full flex-shrink-0">
                    <motion.div
                        className="flex gap-5 will-change-transform"
                        style={{ x: railX, width: `${GAPS.length * 100}vw` }}
                    >
                        {GAPS.map((gap) => {
                            const rgb = toRgb(gap.color);
                            return (
                                <div
                                    key={gap.num}
                                    className="flex-shrink-0 rounded-2xl relative overflow-hidden"
                                    style={{
                                        width: 'min(55vw, 520px)',
                                        background: 'linear-gradient(160deg, rgba(8,8,20,0.95) 0%, rgba(10,8,18,0.80) 50%, rgba(4,4,14,0.92) 100%)',
                                        border: `1px solid rgba(${rgb},0.22)`,
                                        backdropFilter: 'blur(20px)',
                                        boxShadow: `0 0 60px rgba(${rgb},0.07), 0 12px 40px rgba(0,0,0,0.7), inset 0 1px 0 rgba(${rgb},0.1)`,
                                    }}
                                >
                                    {/* Corner glow accent */}
                                    <div
                                        className="absolute top-0 left-0 w-48 h-48 rounded-full blur-[80px] pointer-events-none"
                                        style={{ background: `radial-gradient(circle, rgba(${rgb},0.18) 0%, transparent 70%)`, transform: 'translate(-30%, -30%)' }}
                                    />

                                    <div className="p-5 md:p-6 flex flex-col gap-4 relative z-10">
                                        {/* Problem */}
                                        <div className="flex flex-col">
                                            {/* Number */}
                                            <div
                                                className="text-3xl md:text-4xl font-bold mb-3 leading-none"
                                                style={{
                                                    fontFamily: 'var(--font-display)',
                                                    color: `rgba(${rgb},0.12)`,
                                                    WebkitTextStroke: `1px rgba(${rgb},0.35)`,
                                                }}
                                            >
                                                {gap.num}
                                            </div>

                                            {/* Stat badge */}
                                            <div
                                                className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3 self-start"
                                                style={{
                                                    background: `rgba(${rgb},0.1)`,
                                                    border: `1px solid rgba(${rgb},0.3)`,
                                                }}
                                            >
                                                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: gap.color }} />
                                                <span
                                                    className="text-xs font-bold tracking-wider"
                                                    style={{ fontFamily: 'var(--font-ui)', color: gap.color, opacity: 1 }}
                                                >
                                                    {gap.stat}
                                                </span>
                                            </div>

                                            {/* Quote */}
                                            <blockquote
                                                className="text-lg md:text-xl leading-snug italic"
                                                style={{ fontFamily: 'var(--font-body)', color: '#FFFFFF', fontWeight: 500 }}
                                            >
                                                {gap.quote}
                                            </blockquote>
                                        </div>

                                        {/* Solution */}
                                        <div className="flex flex-col">

                                            <div
                                                className="rounded-xl p-4 md:p-6"
                                                style={{
                                                    background: `rgba(${rgb},0.05)`,
                                                    border: `1px solid rgba(${rgb},0.15)`,
                                                }}
                                            >
                                                {/* Dalan label */}
                                                <div className="flex items-center gap-3 mb-3">
                                                    <div
                                                        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                                                        style={{ background: `rgba(${rgb},0.15)`, border: `1px solid rgba(${rgb},0.4)` }}
                                                    >
                                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                                            <path d="M3 7L6 10L11 4" stroke={gap.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </div>
                                                    <span
                                                        className="text-sm font-bold tracking-[0.2em] uppercase"
                                                        style={{ fontFamily: 'var(--font-ui)', color: gap.color }}
                                                    >
                                                        Dalan →
                                                    </span>
                                                </div>

                                                {/* Solution text */}
                                                <p
                                                    className="text-sm md:text-base leading-relaxed"
                                                    style={{ color: '#D8D4CC', fontFamily: 'var(--font-body)', fontWeight: 300 }}
                                                >
                                                    {gap.solution}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </motion.div>
                </div>

                {/* Progress dots */}
                <div className="relative z-10 flex justify-center gap-2 mt-8 flex-shrink-0">
                    {GAPS.map((gap, i) => (
                        <div
                            key={i}
                            className="rounded-full"
                            style={{ width: 6, height: 6, backgroundColor: gap.color, opacity: 0.4 }}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
