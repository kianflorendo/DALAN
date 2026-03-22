'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { NAV_LINKS } from '@/lib/moon-config';

const RESOURCES = [
    { label: 'Documentation', href: '#' },
    { label: 'Developer API', href: '#' },
    { label: 'Changelog', href: '#' },
    { label: 'Status', href: '#' },
];

const SOCIAL = [
    { label: 'GitHub', href: '#' },
    { label: 'Twitter', href: '#' },
    { label: 'Discord', href: '#' },
    { label: 'LinkedIn', href: '#' },
];

export default function Footer() {
    return (
        <footer className="relative" style={{ backgroundColor: 'var(--color-void)' }}>
            {/* Top gradient line */}
            <div style={{ background: 'linear-gradient(90deg, transparent, rgba(91,91,255,0.15), rgba(0,212,160,0.1), transparent)', height: '1px' }} />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-4 group">
                            <span
                                className="text-lg tracking-wider text-gradient-gold"
                                style={{ fontFamily: 'var(--font-display)' }}
                            >
                                DALAN
                            </span>
                        </Link>
                        <p className="text-sm leading-relaxed mb-6" style={{ color: '#5C5850', fontFamily: 'var(--font-body)' }}>
                            AI-driven education platform rooted in Philippine values, lighting the path for every Filipino learner.
                        </p>

                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="text-xs tracking-[0.2em] uppercase mb-5" style={{ fontFamily: 'var(--font-ui)', color: '#5C5850' }}>
                            Navigation
                        </h4>
                        <ul className="space-y-3">
                            {NAV_LINKS.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm transition-colors duration-300"
                                        style={{ fontFamily: 'var(--font-ui)', color: '#3A3530' }}
                                        onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#706B63'; }}
                                        onMouseLeave={(e) => { (e.target as HTMLElement).style.color = '#3A3530'; }}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="text-xs tracking-[0.2em] uppercase mb-5" style={{ fontFamily: 'var(--font-ui)', color: '#5C5850' }}>
                            Resources
                        </h4>
                        <ul className="space-y-3">
                            {RESOURCES.map((item) => (
                                <li key={item.label}>
                                    <Link
                                        href={item.href}
                                        className="text-sm transition-colors duration-300"
                                        style={{ fontFamily: 'var(--font-ui)', color: '#3A3530' }}
                                        onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#706B63'; }}
                                        onMouseLeave={(e) => { (e.target as HTMLElement).style.color = '#3A3530'; }}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Connect */}
                    <div>
                        <h4 className="text-xs tracking-[0.2em] uppercase mb-5" style={{ fontFamily: 'var(--font-ui)', color: '#5C5850' }}>
                            Connect
                        </h4>
                        <ul className="space-y-3">
                            {SOCIAL.map((item) => (
                                <li key={item.label}>
                                    <Link
                                        href={item.href}
                                        className="text-sm transition-colors duration-300"
                                        style={{ fontFamily: 'var(--font-ui)', color: '#3A3530' }}
                                        onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#706B63'; }}
                                        onMouseLeave={(e) => { (e.target as HTMLElement).style.color = '#3A3530'; }}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-16 pt-8" style={{ borderTop: '1px solid rgba(91,91,255,0.06)' }}>
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: '#2A2520' }}>
                            © {new Date().getFullYear()} Dalan — All rights reserved
                        </p>
                        <div className="flex items-center gap-4">
                            <Link href="#" className="text-xs transition-colors" style={{ fontFamily: 'var(--font-ui)', color: '#2A2520' }}>
                                Privacy Policy
                            </Link>
                            <Link href="#" className="text-xs transition-colors" style={{ fontFamily: 'var(--font-ui)', color: '#2A2520' }}>
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
