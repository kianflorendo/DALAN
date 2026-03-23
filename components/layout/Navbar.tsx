'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_LINKS } from '@/lib/moon-config';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [mobileOpen]);

    const isActive = (href: string) => {
        if (href === '/') return pathname === '/';
        return pathname.startsWith(href);
    };

    return (
        <>
            <motion.header
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="fixed top-0 left-0 right-0 z-50"
            >
                {/* Gradient border bottom */}
                <div
                    className="absolute bottom-0 left-0 right-0 h-px transition-opacity duration-500"
                    style={{
                        background: 'linear-gradient(90deg, transparent, rgba(91,91,255,0.2), rgba(0,212,160,0.15), transparent)',
                        opacity: scrolled ? 1 : 0,
                    }}
                />

                <div
                    className="transition-all duration-500"
                    style={{
                        backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
                        WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
                        backgroundColor: scrolled ? 'rgba(6,6,18,0.75)' : 'transparent',
                    }}
                >
                    <nav className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2.5 group">
                            <div className="relative">
                                <svg
                                    width="36"
                                    height="36"
                                    viewBox="0 0 36 36"
                                    className="transition-all duration-500 group-hover:scale-110"
                                    aria-hidden="true"
                                >
                                    <defs>
                                        <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#00D4A0" />
                                            <stop offset="100%" stopColor="#5B5BFF" />
                                        </linearGradient>
                                    </defs>
                                    <circle cx="18" cy="18" r="16" fill="none" stroke="url(#logo-grad)" strokeWidth="1.5" opacity="0.6" />
                                    <path
                                        d="M 18 5 C 27 9, 29 17, 23 26 C 21 29, 17 29, 15 26 C 10 19, 12 11, 18 5"
                                        fill="none"
                                        stroke="url(#logo-grad)"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                    />
                                    <circle cx="20" cy="13" r="2.5" fill="#FFD166" opacity="0.8" />
                                </svg>
                                {/* Ambient glow */}
                                <div
                                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    style={{ boxShadow: '0 0 20px rgba(0,212,160,0.3)' }}
                                />
                            </div>
                            <div className="flex items-baseline gap-0.5">
                                <span
                                    className="text-[22px] tracking-[0.18em] font-bold"
                                    style={{
                                        fontFamily: 'var(--font-display)',
                                        color: 'var(--color-gold)',
                                        textShadow: '0 2px 12px rgba(0,0,0,0.9)',
                                    }}
                                >
                                    DALAN
                                </span>
                            </div>
                        </Link>

                        {/* Desktop Nav */}
                        <div className="hidden lg:flex items-center gap-0.5">
                            {NAV_LINKS.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="relative px-4 py-2 text-[13px] font-medium tracking-wide transition-all duration-300 rounded-lg group/link"
                                    style={{
                                        fontFamily: 'var(--font-ui)',
                                        color: isActive(link.href) ? '#F0EDE8' : '#706B63',
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!isActive(link.href)) {
                                            (e.currentTarget as HTMLElement).style.color = '#F0EDE8';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isActive(link.href)) {
                                            (e.currentTarget as HTMLElement).style.color = '#706B63';
                                        }
                                    }}
                                >
                                    {/* Hover background */}
                                    <span
                                        className="absolute inset-0 rounded-lg opacity-0 group-hover/link:opacity-100 transition-opacity duration-300"
                                        style={{ backgroundColor: 'rgba(91,91,255,0.06)' }}
                                    />
                                    <span className="relative">{link.label}</span>
                                    {/* Active indicator */}
                                    {isActive(link.href) && (
                                        <motion.div
                                            layoutId="activeNav"
                                            className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-[2px] w-4 rounded-full"
                                            style={{
                                                background: `linear-gradient(90deg, ${link.moonColor}, ${link.moonColor}80)`,
                                                boxShadow: `0 0 8px ${link.moonColor}60`,
                                            }}
                                            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                        />
                                    )}
                                </Link>
                            ))}
                        </div>

                        {/* Desktop CTA */}
                        <Link
                            href="/#home"
                            className="hidden lg:flex items-center gap-2 px-5 py-2 text-[13px] font-medium rounded-full transition-all duration-400 group/cta"
                            style={{
                                fontFamily: 'var(--font-ui)',
                                color: '#00D4A0',
                                background: 'rgba(0,212,160,0.06)',
                                border: '1px solid rgba(0,212,160,0.2)',
                            }}
                            onMouseEnter={(e) => {
                                const el = e.currentTarget as HTMLElement;
                                el.style.background = 'rgba(0,212,160,0.12)';
                                el.style.borderColor = 'rgba(0,212,160,0.4)';
                                el.style.boxShadow = '0 0 24px rgba(0,212,160,0.15)';
                            }}
                            onMouseLeave={(e) => {
                                const el = e.currentTarget as HTMLElement;
                                el.style.background = 'rgba(0,212,160,0.06)';
                                el.style.borderColor = 'rgba(0,212,160,0.2)';
                                el.style.boxShadow = 'none';
                            }}
                        >
                            <span>Get Started</span>
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                                <path d="M5 3L9 7L5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>

                        {/* Mobile hamburger */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="lg:hidden flex flex-col items-center justify-center w-10 h-10 rounded-lg"
                            style={{ backgroundColor: mobileOpen ? 'rgba(91,91,255,0.1)' : 'transparent' }}
                            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                        >
                            <motion.span
                                animate={mobileOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                                className="block w-5 h-[1.5px] rounded-full mb-1"
                                style={{ backgroundColor: '#00D4A0' }}
                            />
                            <motion.span
                                animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                                className="block w-5 h-[1.5px] rounded-full mb-1"
                                style={{ backgroundColor: '#00D4A0' }}
                            />
                            <motion.span
                                animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                                className="block w-5 h-[1.5px] rounded-full"
                                style={{ backgroundColor: '#00D4A0' }}
                            />
                        </button>
                    </nav>
                </div>
            </motion.header>

            {/* Mobile overlay */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40"
                        style={{ backgroundColor: 'rgba(6,6,18,0.98)', backdropFilter: 'blur(30px)' }}
                    >
                        <div className="flex flex-col items-center justify-center h-full gap-6">
                            {NAV_LINKS.map((link, i) => (
                                <motion.div
                                    key={link.href}
                                    initial={{ opacity: 0, y: 30, filter: 'blur(4px)' }}
                                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                    transition={{ delay: 0.05 + i * 0.04, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setMobileOpen(false)}
                                        className="flex items-center gap-3 text-2xl tracking-wider"
                                        style={{
                                            fontFamily: 'var(--font-heading)',
                                            color: isActive(link.href) ? '#F0EDE8' : '#5C5850',
                                        }}
                                    >
                                        <span
                                            className="w-2 h-2 rounded-full"
                                            style={{ backgroundColor: link.moonColor, opacity: isActive(link.href) ? 1 : 0.3 }}
                                        />
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="mt-6"
                            >
                                <Link
                                    href="/#home"
                                    onClick={() => setMobileOpen(false)}
                                    className="px-8 py-3 text-sm font-medium rounded-full"
                                    style={{
                                        fontFamily: 'var(--font-ui)',
                                        color: '#00D4A0',
                                        border: '1px solid rgba(0,212,160,0.3)',
                                        background: 'rgba(0,212,160,0.08)',
                                    }}
                                >
                                    Get Started →
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
