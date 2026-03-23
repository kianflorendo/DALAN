'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface GoldFrameProps {
    children: React.ReactNode;
    isActive?: boolean;
    className?: string;
    color?: string;
}

/** Convert hex "#RRGGBB" to "R,G,B" for use in rgba() strings */
function hexToRgb(hex: string): string {
    const clean = hex.replace('#', '');
    if (clean.length !== 6) return '255,209,102';
    const r = parseInt(clean.slice(0, 2), 16);
    const g = parseInt(clean.slice(2, 4), 16);
    const b = parseInt(clean.slice(4, 6), 16);
    return `${r},${g},${b}`;
}

export default function GoldFrame({ children, isActive = false, className = '', color = '#FFD166' }: GoldFrameProps) {
    const rgb = hexToRgb(color);
    // Safe unique id fragment for SVG gradient (strip non-alphanumeric)
    const gradId = `ofg-${color.replace(/[^a-z0-9]/gi, '')}`;

    return (
        <div className={`relative ${className} group transition-all duration-500`}>
            <div
                className="relative rounded-2xl overflow-hidden h-full transition-all duration-500 hover:-translate-y-1"
                style={{
                    background: 'linear-gradient(160deg, rgba(8,8,20,0.92) 0%, rgba(10,8,18,0.75) 50%, rgba(4,4,14,0.88) 100%)',
                    border: `1px solid rgba(${rgb},0.25)`,
                    backdropFilter: 'blur(16px)',
                    boxShadow: `0 0 60px rgba(${rgb},0.08), 0 8px 32px rgba(0,0,0,0.6), inset 0 1px 0 rgba(${rgb},0.1)`,
                }}
            >
                {/* ── Ornamental SVG Border ── */}
                <svg
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    preserveAspectRatio="none"
                    viewBox="0 0 700 600"
                    fill="none"
                    aria-hidden="true"
                >
                    <defs>
                        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%"   stopColor={color} stopOpacity="0.7" />
                            <stop offset="50%"  stopColor={color} stopOpacity="0.4" />
                            <stop offset="100%" stopColor={color} stopOpacity="0.65" />
                        </linearGradient>
                    </defs>

                    {/* ── Corner filigree: top-left ── */}
                    <g opacity={isActive ? 1 : 0.85} className="transition-opacity duration-700 group-hover:opacity-100">
                        <path d="M 16 4 Q 4 4 4 16"   stroke={`url(#${gradId})`} strokeWidth="1.8" fill="none" />
                        <path d="M 36 4 Q 4 4 4 36"   stroke={`rgba(${rgb},0.35)`} strokeWidth="1"   fill="none" />
                        <path d="M 50 4 Q 4 6 4 50"   stroke={`rgba(${rgb},0.15)`} strokeWidth="0.6" fill="none" />
                        <circle cx="4" cy="4" r="2.5" fill={`rgba(${rgb},0.6)`} />
                        <path d="M 24 4 C 24 14, 16 20, 4 20"              stroke={`rgba(${rgb},0.3)`}  strokeWidth="0.8" fill="none" />
                        <path d="M 4 28 C 14 28, 20 20, 20 4"             stroke={`rgba(${rgb},0.25)`} strokeWidth="0.7" fill="none" />
                        <path d="M 30 4 C 28 8, 24 12, 16 14 C 22 10, 26 6, 30 4" stroke={`rgba(${rgb},0.2)`} strokeWidth="0.5" fill={`rgba(${rgb},0.06)`} />
                        <path d="M 4 34 C 8 30, 12 26, 18 20 C 12 24, 8 28, 4 34" stroke={`rgba(${rgb},0.18)`} strokeWidth="0.5" fill={`rgba(${rgb},0.05)`} />
                        <circle cx="24" cy="4"  r="1.2" fill={`rgba(${rgb},0.5)`} />
                        <circle cx="4"  cy="24" r="1.2" fill={`rgba(${rgb},0.5)`} />
                        <circle cx="16" cy="14" r="0.8" fill={`rgba(${rgb},0.35)`} />
                    </g>

                    {/* ── Corner filigree: top-right ── */}
                    <g opacity={isActive ? 1 : 0.85} className="transition-opacity duration-700 group-hover:opacity-100" transform="translate(700,0) scale(-1,1)">
                        <path d="M 16 4 Q 4 4 4 16"   stroke={`url(#${gradId})`} strokeWidth="1.8" fill="none" />
                        <path d="M 36 4 Q 4 4 4 36"   stroke={`rgba(${rgb},0.35)`} strokeWidth="1"   fill="none" />
                        <path d="M 50 4 Q 4 6 4 50"   stroke={`rgba(${rgb},0.15)`} strokeWidth="0.6" fill="none" />
                        <circle cx="4" cy="4" r="2.5" fill={`rgba(${rgb},0.6)`} />
                        <path d="M 24 4 C 24 14, 16 20, 4 20"              stroke={`rgba(${rgb},0.3)`}  strokeWidth="0.8" fill="none" />
                        <path d="M 4 28 C 14 28, 20 20, 20 4"             stroke={`rgba(${rgb},0.25)`} strokeWidth="0.7" fill="none" />
                        <path d="M 30 4 C 28 8, 24 12, 16 14 C 22 10, 26 6, 30 4" stroke={`rgba(${rgb},0.2)`} strokeWidth="0.5" fill={`rgba(${rgb},0.06)`} />
                        <circle cx="24" cy="4"  r="1.2" fill={`rgba(${rgb},0.5)`} />
                        <circle cx="16" cy="14" r="0.8" fill={`rgba(${rgb},0.35)`} />
                    </g>

                    {/* ── Corner filigree: bottom-left ── */}
                    <g opacity={isActive ? 1 : 0.85} className="transition-opacity duration-700 group-hover:opacity-100" transform="translate(0,600) scale(1,-1)">
                        <path d="M 16 4 Q 4 4 4 16"   stroke={`url(#${gradId})`} strokeWidth="1.8" fill="none" />
                        <path d="M 36 4 Q 4 4 4 36"   stroke={`rgba(${rgb},0.35)`} strokeWidth="1"   fill="none" />
                        <path d="M 50 4 Q 4 6 4 50"   stroke={`rgba(${rgb},0.15)`} strokeWidth="0.6" fill="none" />
                        <circle cx="4" cy="4" r="2.5" fill={`rgba(${rgb},0.6)`} />
                        <path d="M 24 4 C 24 14, 16 20, 4 20"              stroke={`rgba(${rgb},0.3)`}  strokeWidth="0.8" fill="none" />
                        <path d="M 30 4 C 28 8, 24 12, 16 14 C 22 10, 26 6, 30 4" stroke={`rgba(${rgb},0.2)`} strokeWidth="0.5" fill={`rgba(${rgb},0.06)`} />
                        <circle cx="4"  cy="24" r="1.2" fill={`rgba(${rgb},0.5)`} />
                    </g>

                    {/* ── Corner filigree: bottom-right ── */}
                    <g opacity={isActive ? 1 : 0.85} className="transition-opacity duration-700 group-hover:opacity-100" transform="translate(700,600) scale(-1,-1)">
                        <path d="M 16 4 Q 4 4 4 16"   stroke={`url(#${gradId})`} strokeWidth="1.8" fill="none" />
                        <path d="M 36 4 Q 4 4 4 36"   stroke={`rgba(${rgb},0.35)`} strokeWidth="1"   fill="none" />
                        <path d="M 50 4 Q 4 6 4 50"   stroke={`rgba(${rgb},0.15)`} strokeWidth="0.6" fill="none" />
                        <circle cx="4" cy="4" r="2.5" fill={`rgba(${rgb},0.6)`} />
                        <path d="M 24 4 C 24 14, 16 20, 4 20"              stroke={`rgba(${rgb},0.3)`}  strokeWidth="0.8" fill="none" />
                        <path d="M 30 4 C 28 8, 24 12, 16 14 C 22 10, 26 6, 30 4" stroke={`rgba(${rgb},0.2)`} strokeWidth="0.5" fill={`rgba(${rgb},0.06)`} />
                        <circle cx="24" cy="4"  r="1.2" fill={`rgba(${rgb},0.5)`} />
                    </g>

                    {/* ── Top edge centre diamond ── */}
                    <g opacity={isActive ? 0.9 : 0.7} className="transition-opacity duration-700 group-hover:opacity-90">
                        <line x1="60"  y1="1" x2="310" y2="1" stroke={`rgba(${rgb},0.2)`} strokeWidth="0.6" />
                        <line x1="390" y1="1" x2="640" y2="1" stroke={`rgba(${rgb},0.2)`} strokeWidth="0.6" />
                        <path d="M 320 1 L 350 14 L 380 1"   stroke={`rgba(${rgb},0.45)`} strokeWidth="0.8" fill="none" />
                        <path d="M 335 1 L 350 8  L 365 1"   stroke={`rgba(${rgb},0.3)`}  strokeWidth="0.5" fill={`rgba(${rgb},0.05)`} />
                        <circle cx="350" cy="14" r="1.5" fill={`rgba(${rgb},0.55)`} />
                        <circle cx="320" cy="1"  r="0.8" fill={`rgba(${rgb},0.35)`} />
                        <circle cx="380" cy="1"  r="0.8" fill={`rgba(${rgb},0.35)`} />
                    </g>

                    {/* ── Bottom edge centre diamond ── */}
                    <g opacity={isActive ? 0.85 : 0.6} className="transition-opacity duration-700 group-hover:opacity-85">
                        <line x1="60"  y1="599" x2="310" y2="599" stroke={`rgba(${rgb},0.18)`} strokeWidth="0.6" />
                        <line x1="390" y1="599" x2="640" y2="599" stroke={`rgba(${rgb},0.18)`} strokeWidth="0.6" />
                        <path d="M 320 599 L 350 586 L 380 599" stroke={`rgba(${rgb},0.35)`} strokeWidth="0.8" fill="none" />
                        <path d="M 335 599 L 350 592 L 365 599" stroke={`rgba(${rgb},0.25)`} strokeWidth="0.5" fill={`rgba(${rgb},0.04)`} />
                        <circle cx="350" cy="586" r="1.5" fill={`rgba(${rgb},0.45)`} />
                    </g>

                    {/* ── Side lines ── */}
                    <line x1="2"   y1="55" x2="2"   y2="545" stroke={color} strokeWidth="0.8" opacity={isActive ? 0.5 : 0.3} className="transition-all duration-700 group-hover:opacity-50" />
                    <line x1="698" y1="55" x2="698" y2="545" stroke={color} strokeWidth="0.8" opacity={isActive ? 0.5 : 0.3} className="transition-all duration-700 group-hover:opacity-50" />

                    {/* ── Inner frame ── */}
                    <rect x="10" y="10" width="680" height="580" rx="12" stroke={`rgba(${rgb},0.06)`} strokeWidth="0.5" fill="none" className="transition-all duration-700 group-hover:[stroke-opacity:0.14]" />
                </svg>

                {/* Hover glow */}
                <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{ boxShadow: `inset 0 0 80px rgba(${rgb},0.04), 0 0 60px rgba(${rgb},0.05), inset 0 1px 0 rgba(${rgb},0.08)` }}
                />

                {/* Active pulse glow */}
                {isActive && (
                    <motion.div
                        className="absolute -inset-3 z-0 pointer-events-none rounded-2xl"
                        animate={{ opacity: [0.08, 0.18, 0.08] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                        style={{ background: `radial-gradient(circle at center, rgba(${rgb},0.15) 0%, transparent 70%)` }}
                    />
                )}

                {/* Content */}
                <div className="relative z-10 h-full">
                    {children}
                </div>
            </div>
        </div>
    );
}
