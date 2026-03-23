'use client';

import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import MoonTag from '@/components/ui/MoonTag';
import SerpentDivider from '@/components/ui/SerpentDivider';
import { fadeUpVariant, staggerContainer } from '@/lib/motion-variants';

const BLOG_CATEGORIES = [
    { label: 'AI & Education', color: '#00D4A0' },
    { label: 'K–12 Insights', color: '#5B5BFF' },
    { label: 'STEM Innovation', color: '#FFD166' },
    { label: 'Platform Updates', color: '#FF8C6B' },
    { label: 'ASEAN Education', color: '#FF6B9D' },
];

const BLOG_POSTS = [
    {
        title: 'How AI Transforms Classroom Learning in ASIA',
        excerpt: 'Exploring the intersection of artificial intelligence and the ASEAN educational landscape, from rural communities to metro schools.',
        category: 'AI & Education',
        date: 'February 20, 2026',
        author: 'Dalan AI Team',
        readTime: 5,
        featured: true,
    },
    {
        title: 'Adaptive Assessments: Beyond One-Size-Fits-All',
        excerpt: 'How Dalan creates personalized assessment paths that meet each student where they are.',
        category: 'K–12 Insights',
        date: 'February 15, 2026',
        author: 'Maria Santos',
        readTime: 4,
        featured: false,
    },
    {
        title: 'STEM Mastery Through Mythological Storytelling',
        excerpt: 'The Bakunawa framework: using Philippine mythology to teach scientific concepts in an engaging narrative format.',
        category: 'STEM Innovation',
        date: 'February 10, 2026',
        author: 'Juan dela Cruz',
        readTime: 7,
        featured: false,
    },
    {
        title: 'Dalan v2.0 — New Features & Improvements',
        excerpt: 'A comprehensive look at the latest platform updates, including new AI models and curriculum expansions.',
        category: 'Platform Updates',
        date: 'February 5, 2026',
        author: 'Engineering Team',
        readTime: 3,
        featured: false,
    },
];

function getCategoryColor(category: string): string {
    return BLOG_CATEGORIES.find((c) => c.label === category)?.color || '#00D4A0';
}

function ReadTimeMoons({ minutes }: { minutes: number }) {
    return (
        <div className="flex items-center gap-1" title={`${minutes} min read`}>
            {Array.from({ length: Math.min(minutes, 7) }, (_, i) => (
                <div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: '#FFD166', opacity: 0.5 + (i / minutes) * 0.5 }}
                    aria-hidden="true"
                />
            ))}
            <span className="text-xs ml-1" style={{ color: '#5C5850', fontFamily: 'var(--font-mono)' }}>
                {minutes}m
            </span>
        </div>
    );
}

function BlogSkyLayer() {
    return (
        <div
            className="absolute inset-0 -z-10 pointer-events-none overflow-hidden"
            aria-hidden="true"
        >
            {/* Star field matching hero vibrancy */}
            <div className="absolute inset-0">
                {Array.from({ length: 80 }).map((_, i) => {
                    const isGold = i % 5 === 0;
                    const color = isGold ? '#FCE38A' : '#FFFFFF';
                    const size = (Math.random() * 2 + 1.2).toFixed(2);
                    const left = Math.random() * 100;
                    const top = Math.random() * 100;
                    const blur = isGold ? 4 : 3;
                    const delay = (Math.random() * 4).toFixed(2);
                    const duration = (3 + Math.random() * 4).toFixed(2);

                    return (
                        <motion.div
                            key={i}
                            className="absolute rounded-full"
                            style={{
                                width: Number(size),
                                height: Number(size),
                                left: `${left}%`,
                                top: `${top}%`,
                                backgroundColor: color,
                                boxShadow: `0 0 ${blur}px ${color}`,
                            }}
                            animate={{ opacity: [0.2, 1, 0.2], scale: [0.7, 1.3, 0.7] }}
                            transition={{
                                duration: Number(duration),
                                repeat: Infinity,
                                delay: Number(delay),
                                ease: 'easeInOut',
                            }}
                        />
                    );
                })}
            </div>

            {/* Floating cloud bands to echo hero video */}
            <motion.div
                className="absolute -bottom-24 -left-10 w-[420px] opacity-60"
                animate={{ x: [-30, 40, -30] }}
                transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
            >
                <img
                    src="/cloud 2.png"
                    alt="Decorative cloud"
                    className="w-full h-auto drop-shadow-[0_10px_40px_rgba(0,0,0,0.6)]"
                />
            </motion.div>

            <motion.div
                className="absolute -bottom-10 right-[-15%] w-[360px] opacity-55"
                animate={{ x: [20, -40, 20] }}
                transition={{ duration: 110, repeat: Infinity, ease: 'linear' }}
            >
                <img
                    src="/japanese cloud.png"
                    alt="Decorative cloud"
                    className="w-full h-auto drop-shadow-[0_10px_40px_rgba(0,0,0,0.6)]"
                />
            </motion.div>

            {/* Subtle sky gradient behind content */}
            <div
                className="absolute inset-0"
                style={{
                    background:
                        'radial-gradient(ellipse at 50% 0%, rgba(26,26,80,0.6) 0%, transparent 55%), radial-gradient(ellipse at 50% 100%, rgba(0,0,0,0.85) 0%, rgba(0,0,0,1) 55%)',
                }}
            />
        </div>
    );
}

export default function BlogSection() {
    const featured = BLOG_POSTS.find((p) => p.featured);
    const posts = BLOG_POSTS.filter((p) => !p.featured);

    return (
        <div
            id="blog"
            className="relative pt-8 pb-20 overflow-hidden"
            style={{ backgroundColor: 'var(--color-void)' }}
        >
            <BlogSkyLayer />
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
                        style={{ fontFamily: 'var(--font-heading)', color: '#00D4A0' }}
                    >
                        The Scales of the Serpent
                    </motion.p>
                    <motion.h1
                        variants={fadeUpVariant}
                        custom={1}
                        className="text-5xl md:text-7xl mb-6"
                        style={{ fontFamily: 'var(--font-display)', color: '#FFD166' }}
                    >
                        CHRONICLES
                    </motion.h1>
                    <motion.p
                        variants={fadeUpVariant}
                        custom={2}
                        className="text-lg max-w-xl mx-auto"
                        style={{ color: '#A09A8E', fontFamily: 'var(--font-body)' }}
                    >
                        Each scale a story. Insights on AI, education, and the future of learning in ASIA.
                    </motion.p>
                </motion.div>

                {/* Category filters */}
                <motion.div
                    className="flex flex-wrap justify-center gap-3 mb-12"
                    variants={fadeUpVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {BLOG_CATEGORIES.map((cat) => (
                        <MoonTag key={cat.label} label={cat.label} color={cat.color} className="cursor-pointer" />
                    ))}
                </motion.div>

                <SerpentDivider />

                {/* Featured post */}
                {featured && (
                    <motion.div
                        className="mb-16"
                        variants={fadeUpVariant}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <div
                            className="relative rounded-2xl overflow-hidden cursor-pointer group"
                            style={{
                                backgroundColor: 'rgba(13,13,26,0.6)',
                                border: `1px solid ${getCategoryColor(featured.category)}20`,
                            }}
                        >
                            {/* Image placeholder */}
                            <div
                                className="h-[40vh] relative"
                                style={{
                                    background: `linear-gradient(135deg, ${getCategoryColor(featured.category)}10 0%, var(--color-deep) 100%)`,
                                }}
                            >
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-6xl opacity-10" style={{ fontFamily: 'var(--font-display)', color: getCategoryColor(featured.category) }}>
                                        ✦
                                    </span>
                                </div> 
                                <div className="absolute top-4 left-4">
                                    <MoonTag label="Featured" color={getCategoryColor(featured.category)} />
                                </div>
                            </div>
                            <div className="p-8">
                                <MoonTag label={featured.category} color={getCategoryColor(featured.category)} className="mb-4" />
                                <h2
                                    className="text-2xl md:text-3xl mb-3 group-hover:text-gold-DEFAULT transition-colors"
                                    style={{ fontFamily: 'var(--font-heading)', color: '#F0EDE8' }}
                                >
                                    {featured.title}
                                </h2>
                                <p className="text-base mb-4" style={{ color: '#A09A8E', fontFamily: 'var(--font-body)' }}>
                                    {featured.excerpt}
                                </p>
                                <div className="flex items-center gap-4">
                                    <span className="text-xs" style={{ color: '#5C5850', fontFamily: 'var(--font-ui)' }}>
                                        {featured.date} · {featured.author}
                                    </span>
                                    <ReadTimeMoons minutes={featured.readTime} />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Post grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post, i) => (
                        <Card key={i} moonColor={getCategoryColor(post.category)} delay={i} className="cursor-pointer group">
                            {/* Scale clip image */}
                            <div
                                className="h-40 rounded-xl mb-4 relative overflow-hidden"
                                style={{
                                    background: `linear-gradient(135deg, ${getCategoryColor(post.category)}08 0%, var(--color-surface) 100%)`,
                                    clipPath: 'polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)',
                                }}
                            >
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-4xl opacity-10" style={{ fontFamily: 'var(--font-display)', color: getCategoryColor(post.category) }}>
                                        ✦
                                    </span>
                                </div>
                            </div>
                            <MoonTag label={post.category} color={getCategoryColor(post.category)} className="mb-3" />
                            <h3
                                className="text-lg mb-2 group-hover:text-gold-DEFAULT transition-colors"
                                style={{ fontFamily: 'var(--font-heading)', color: '#F0EDE8' }}
                            >
                                {post.title}
                            </h3>
                            <p className="text-sm mb-3 line-clamp-2" style={{ color: '#A09A8E', fontFamily: 'var(--font-body)' }}>
                                {post.excerpt}
                            </p>
                            <div className="flex items-center justify-between">
                                <span className="text-xs" style={{ color: '#5C5850', fontFamily: 'var(--font-ui)' }}>
                                    {post.date}
                                </span>
                                <ReadTimeMoons minutes={post.readTime} />
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
