'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/Button';
import SerpentDivider from '@/components/ui/SerpentDivider';
import { fadeUpVariant, staggerContainer } from '@/lib/motion-variants';

export default function VoteSection() {
    return (
        <div id="vote" className="pt-24 pb-20" style={{ backgroundColor: 'var(--color-void)' }}>
            <div className="max-w-7xl mx-auto px-6">
                {/* Hero */}
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
                        className="text-5xl md:text-6xl mb-6"
                        style={{ fontFamily: 'var(--font-display)', color: '#F0EDE8' }}
                    >
                        Shape the Path
                    </motion.h1>
                    <motion.p
                        variants={fadeUpVariant}
                        custom={2}
                        className="text-lg max-w-xl mx-auto"
                        style={{ color: '#A09A8E', fontFamily: 'var(--font-body)' }}
                    >
                        Dalan is built for the community, by the community. Vote on upcoming features, curriculum priorities, and community initiatives.
                    </motion.p>
                </motion.div>
            </div>
        </div>
    );
}
