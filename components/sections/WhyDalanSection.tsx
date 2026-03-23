'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import GoldFrame from '@/components/ui/GoldFrame';

const REASONS = [
    {
        color: '#00FFC0',
        icon: (
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="12" stroke="#00FFC0" strokeWidth="1.5" opacity="0.5" />
                <path d="M10 16 C10 10, 22 10, 22 16 C22 22, 10 22, 10 16" stroke="#00FFC0" strokeWidth="1.5" fill="none" />
                <circle cx="16" cy="16" r="3" fill="#00FFC0" opacity="0.8" />
                <path d="M16 4 L16 8 M16 24 L16 28 M4 16 L8 16 M24 16 L28 16" stroke="#00FFC0" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
            </svg>
        ),
        title: 'AI That Knows Every Learner',
        desc: 'Our adaptive engine maps each student\'s pace, strengths, and gaps in real-time building a curriculum that evolves with them, not against them.',
    },
    {
        color: '#FFD166',
        icon: (
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M16 4 C20 8, 28 12, 26 20 C24 26, 18 28, 16 28 C14 28, 8 26, 6 20 C4 12, 12 8, 16 4Z" stroke="#FFD166" strokeWidth="1.5" fill="none" />
                <circle cx="18" cy="12" r="3" fill="#FFD166" opacity="0.8" />
                <path d="M10 20 Q16 16 22 20" stroke="#FFD166" strokeWidth="1" fill="none" opacity="0.6" />
            </svg>
        ),
        title: 'Rooted in ASEAN Culture',
        desc: 'Every lesson is woven with the narrative of the Bakunawa connecting ancient ASEAN wisdom to modern STEM, so students learn who they are while they learn how to think.',
    },
    {
        color: '#7373FF',
        icon: (
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <rect x="4" y="4" width="10" height="10" rx="2" stroke="#7373FF" strokeWidth="1.5" fill="none" opacity="0.7" />
                <rect x="18" y="4" width="10" height="10" rx="2" stroke="#7373FF" strokeWidth="1.5" fill="none" opacity="0.7" />
                <rect x="4" y="18" width="10" height="10" rx="2" stroke="#7373FF" strokeWidth="1.5" fill="none" opacity="0.7" />
                <rect x="18" y="18" width="10" height="10" rx="2" stroke="#7373FF" strokeWidth="1.5" fill="none" opacity="0.7" />
                <line x1="9" y1="14" x2="9" y2="18" stroke="#7373FF" strokeWidth="1" opacity="0.5" />
                <line x1="23" y1="14" x2="23" y2="18" stroke="#7373FF" strokeWidth="1" opacity="0.5" />
                <line x1="14" y1="9" x2="18" y2="9" stroke="#7373FF" strokeWidth="1" opacity="0.5" />
                <line x1="14" y1="23" x2="18" y2="23" stroke="#7373FF" strokeWidth="1" opacity="0.5" />
            </svg>
        ),
        title: 'Equity-First by Design',
        desc: 'Built for provinces, not just cities. Dalan works on low-bandwidth connections and is accessible to every student — regardless of geography or economic background.',
    },
    {
        color: '#FF8C6B',
        icon: (
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M4 24 L10 16 L16 20 L22 10 L28 14" stroke="#FF8C6B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <circle cx="10" cy="16" r="2" fill="#FF8C6B" opacity="0.7" />
                <circle cx="16" cy="20" r="2" fill="#FF8C6B" opacity="0.7" />
                <circle cx="22" cy="10" r="2" fill="#FF8C6B" opacity="0.7" />
            </svg>
        ),
        title: 'Real-Time Progress Insights',
        desc: 'Teachers and parents get live dashboards showing exactly where each learner is thriving or struggling — enabling early intervention before gaps widen.',
    },
    {
        color: '#00FFC0',
        icon: (
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="10" r="5" stroke="#00FFC0" strokeWidth="1.5" fill="none" />
                <circle cx="7" cy="24" r="4" stroke="#00FFC0" strokeWidth="1.5" fill="none" />
                <circle cx="25" cy="24" r="4" stroke="#00FFC0" strokeWidth="1.5" fill="none" />
                <line x1="11" y1="13" x2="9" y2="20" stroke="#00FFC0" strokeWidth="1" opacity="0.6" />
                <line x1="21" y1="13" x2="23" y2="20" stroke="#00FFC0" strokeWidth="1" opacity="0.6" />
                <line x1="11" y1="24" x2="21" y2="24" stroke="#00FFC0" strokeWidth="1" opacity="0.6" />
            </svg>
        ),
        title: 'Community-Powered Learning',
        desc: 'Students, teachers, and districts collaborate across the platform — sharing resources, celebrating milestones, and turning individual progress into collective impact.',
    },
    {
        color: '#FFD166',
        icon: (
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M16 4 L19 13 L28 13 L21 19 L24 28 L16 22 L8 28 L11 19 L4 13 L13 13 Z" stroke="#FFD166" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
                <circle cx="16" cy="16" r="3" fill="#FFD166" opacity="0.4" />
            </svg>
        ),
        title: 'Proven K–12 Framework',
        desc: 'A complete, structured curriculum from foundational literacy to STEM mastery designed alongside educators and validated with students across Philippine provinces.',
    },
];

export default function WhyDalanSection() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
    const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
    const y = useTransform(scrollYProgress, [0, 0.15], [60, 0]);

    return (
        <section
            ref={ref}
            className="relative py-28 px-6 overflow-hidden"
            style={{ backgroundColor: 'var(--color-void)' }}
        >
            {/* Strong nebula background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
                <motion.div
                    className="absolute rounded-full blur-[140px]"
                    style={{
                        width: '90vw', height: '90vw', maxWidth: '900px', maxHeight: '900px',
                        left: '-25%', top: '0%',
                        background: 'radial-gradient(circle, rgba(0,212,160,0.28) 0%, rgba(91,91,255,0.15) 45%, transparent 75%)',
                    }}
                    animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                    className="absolute rounded-full blur-[140px]"
                    style={{
                        width: '90vw', height: '90vw', maxWidth: '900px', maxHeight: '900px',
                        right: '-25%', bottom: '-5%',
                        background: 'radial-gradient(circle, rgba(255,209,102,0.25) 0%, rgba(200,100,80,0.12) 45%, transparent 75%)',
                    }}
                    animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.9, 0.5] }}
                    transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
                />
                <motion.div
                    className="absolute rounded-full blur-[120px]"
                    style={{
                        width: '70vw', height: '70vw', maxWidth: '700px', maxHeight: '700px',
                        left: '15%', top: '20%',
                        background: 'radial-gradient(circle, rgba(115,115,255,0.2) 0%, rgba(0,255,192,0.1) 50%, transparent 75%)',
                    }}
                    animate={{ scale: [1, 1.18, 1], opacity: [0.3, 0.75, 0.3] }}
                    transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
                />
                <div
                    className="absolute inset-0"
                    style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(91,91,255,0.12) 0%, transparent 60%)' }}
                />
            </div>

            <motion.div
                className="max-w-7xl mx-auto relative z-10"
                style={{ opacity, y }}
            >
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="text-xs tracking-[0.5em] uppercase mb-4"
                        style={{ fontFamily: 'var(--font-ui)', color: 'var(--color-emerald)' }}
                    >
                        Chapter V
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.97 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.15 }}
                        className="text-4xl md:text-6xl lg:text-7xl mb-6 tracking-tight text-gradient-gold-shine"
                        style={{ fontFamily: 'var(--font-display)' }}
                    >
                        Why DALAN?
                    </motion.h2>
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '100px' }}
                        transition={{ duration: 1.4, delay: 0.4 }}
                        className="h-[1px] mx-auto mb-8"
                        style={{ background: 'linear-gradient(90deg, transparent, var(--color-gold), transparent)' }}
                    />
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
                        style={{ color: '#BCBAB6', fontFamily: 'var(--font-body)', fontWeight: 300 }}
                    >
                        Six reasons why Dalan is the future of learning in Asia and beyond.
                    </motion.p>
                </div>

                {/* Cards grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {REASONS.map((reason, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                            viewport={{ once: true, amount: 0.2 }}
                            whileHover={{ y: -3, transition: { duration: 0.2 } }}
                        >
                            <GoldFrame color={reason.color}>
                                <div className="px-5 py-4 flex items-center gap-4">
                                    {/* Icon */}
                                    <div
                                        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                                        style={{
                                            background: `${reason.color}12`,
                                            border: `1px solid ${reason.color}28`,
                                            boxShadow: `0 0 10px ${reason.color}10`,
                                        }}
                                    >
                                        <div style={{ transform: 'scale(0.72)', transformOrigin: 'center' }}>
                                            {reason.icon}
                                        </div>
                                    </div>

                                    {/* Title + accent */}
                                    <div className="flex flex-col gap-1 min-w-0">
                                        <div className="h-[1px] w-5 rounded-full" style={{ background: reason.color, opacity: 0.5 }} />
                                        <h3
                                            className="text-[11px] tracking-[0.12em] uppercase leading-tight"
                                            style={{ fontFamily: 'var(--font-heading)', color: '#E8E4DE' }}
                                        >
                                            {reason.title}
                                        </h3>
                                    </div>
                                </div>
                            </GoldFrame>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
