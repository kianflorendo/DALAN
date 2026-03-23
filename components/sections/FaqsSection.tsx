'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SerpentDivider from '@/components/ui/SerpentDivider';
import { fadeUpVariant, staggerContainer } from '@/lib/motion-variants';

const FAQ_CATEGORIES = [
    { id: 1, label: 'About Dalan', color: '#C8B8FF' },
    { id: 2, label: 'K–12 Programs', color: '#5B5BFF' },
    { id: 3, label: 'STEM Curriculum', color: '#00D4A0' },
    { id: 4, label: 'AI Personalization', color: '#FFD166' },
    { id: 5, label: 'Pricing & Access', color: '#FF8C6B' },
    { id: 6, label: 'Technical & Platform', color: '#7FDBFF' },
    { id: 7, label: 'Privacy & Safety', color: '#FF6B9D' },
];

const FAQS: Record<number, { question: string; answer: string }[]> = {
    1: [
        { question: 'What is Dalan?', answer: 'Dalan is an AI-driven education platform focused on K–12 and STEM learning, designed specifically for Filipino students. We use adaptive AI to personalize each student\'s learning journey.' },
        { question: 'What does "Dalan" mean?', answer: '"Dalan" means "path" or "road" in several Philippine languages. It represents our mission: to light the path of every learner through intelligent, personalized education technology.' },
        { question: 'Who is the Bakunawa?', answer: 'The Bakunawa is a serpent deity from Philippine mythology known as the Moon Eater. In our platform, it serves as a narrative metaphor — each of its 7 swallowed moons represents a learning milestone from curiosity to mastery.' },
    ],
    2: [
        { question: 'What grade levels does Dalan support?', answer: 'Dalan supports the full Philippine K–12 enhanced basic education curriculum — from Grade 1 through Grade 12, including the Senior High School tracks.' },
        { question: 'Is the content aligned with DepEd standards?', answer: 'Yes, all K–12 content is aligned with the Department of Education (DepEd) curriculum standards and competencies, with AI enhancements for deeper comprehension and personalized pacing.' },
    ],
    3: [
        { question: 'What STEM subjects do you cover?', answer: 'We cover Mathematics, Physics, Chemistry, Biology, Computer Science, and Engineering foundations — with interactive labs, simulations, and code-based exercises powered by AI.' },
        { question: 'Can STEM courses be taken alongside K–12?', answer: 'Absolutely. STEM modules are designed to complement the K–12 curriculum, providing deeper exploration for students who want to go beyond standard coursework.' },
    ],
    4: [
        { question: 'How does AI personalization work?', answer: 'Our AI engine continuously assesses each student\'s strengths, weaknesses, pace, and learning style. It then adapts the content difficulty, question types, and revision schedules to optimize knowledge retention.' },
        { question: 'Does the AI replace teachers?', answer: 'No. Dalan is designed to augment, not replace, educators. Our AI serves as a tireless study companion that works alongside teachers to provide individualized support at scale.' },
    ],
    5: [
        { question: 'Is Dalan free?', answer: 'We offer a free tier with access to core learning modules. Premium plans unlock advanced AI features, unlimited assessments, and detailed analytics dashboards for students and parents.' },
        { question: 'Are there plans for schools?', answer: 'Yes, we offer institutional licensing for schools and school districts. Contact our partnership team for volume pricing and custom deployment options.' },
    ],
    6: [
        { question: 'What devices does Dalan support?', answer: 'Dalan works on any modern web browser — desktop, tablet, or mobile. We are actively developing native iOS and Android apps for offline access in areas with limited connectivity.' },
        { question: 'Is there offline support?', answer: 'While the full AI-powered features require internet connectivity, we are developing an offline mode that allows students to download lessons and complete them without an active connection.' },
    ],
    7: [
        { question: 'How do you protect student data?', answer: 'Student data privacy is our top priority. We comply with Philippine Data Privacy Act (RA 10173) and implement end-to-end encryption, role-based access, and regular security audits.' },
        { question: 'Do you share data with third parties?', answer: 'No. We never sell or share student data with third parties. All data is used solely to improve the student\'s learning experience within the Dalan platform.' },
    ],
};

function AccordionItem({
    question,
    answer,
    color,
    isOpen,
    onClick,
}: {
    question: string;
    answer: string;
    color: string;
    isOpen: boolean;
    onClick: () => void;
}) {
    return (
        <div className="mb-4">
            <button
                onClick={onClick}
                className="w-full flex items-center gap-3 text-left p-4 rounded-xl transition-all duration-300"
                style={{
                    backgroundColor: isOpen ? 'rgba(18,18,42,0.6)' : 'transparent',
                    border: `1px solid ${isOpen ? color + '30' : 'transparent'}`,
                }}
                aria-expanded={isOpen}
            >
                <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{
                        backgroundColor: color,
                        boxShadow: isOpen ? `0 0 8px ${color}60` : 'none',
                    }}
                    aria-hidden="true"
                />
                <span
                    className="flex-1 text-base"
                    style={{
                        fontFamily: 'var(--font-heading)',
                        color: isOpen ? '#F0EDE8' : '#A09A8E',
                    }}
                >
                    {question}
                </span>
                <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ color: color, fontSize: '1.2rem' }}
                >
                    +
                </motion.span>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                    >
                        <div
                            className="p-4 ml-6"
                            style={{
                                borderLeft: `2px solid ${color}`,
                                backgroundColor: 'rgba(18,18,42,0.3)',
                                borderRadius: '0 8px 8px 0',
                            }}
                        >
                            <p
                                className="text-base leading-relaxed"
                                style={{ fontFamily: 'var(--font-body)', color: '#A09A8E' }}
                            >
                                {answer}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

const shootingStarStyles = `
@keyframes shootingStar {
  0% { transform: translateX(0) translateY(0) rotate(-35deg) scale(0) translateZ(0); opacity: 0; }
  10% { opacity: 1; transform: translateX(-50px) translateY(35px) rotate(-35deg) scale(1.2) translateZ(0); }
  60% { opacity: 0; transform: translateX(-900px) translateY(630px) rotate(-35deg) scale(0.2) translateZ(0); }
  100% { opacity: 0; transform: translateX(-1000px) translateY(700px) rotate(-35deg) scale(0) translateZ(0); }
}

@keyframes nebulaSpin {
  0% { transform: rotate(0deg) scale(1) translateZ(0); }
  50% { transform: rotate(180deg) scale(1.2) translateZ(0); }
  100% { transform: rotate(360deg) scale(1) translateZ(0); }
}

@keyframes nebulaSpinReverse {
  0% { transform: rotate(360deg) scale(1) translateZ(0); }
  50% { transform: rotate(180deg) scale(1.1) translateZ(0); }
  100% { transform: rotate(0deg) scale(1) translateZ(0); }
}
`;

export default function FaqsSection() {
    const [activeCategory, setActiveCategory] = useState(1);
    const [openFaq, setOpenFaq] = useState<string | null>(null);

    const activeCat = FAQ_CATEGORIES.find((c) => c.id === activeCategory)!;
    const questions = FAQS[activeCategory] || [];

    return (
        <div id="faqs" className="pt-32 pb-20 relative overflow-hidden" style={{ backgroundColor: 'var(--color-void)' }}>
            <style>{shootingStarStyles}</style>

            {/* Rotating Nebula Mist Effects */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center">
                <div 
                    className="absolute w-[120vw] h-[120vw] max-w-[1200px] max-h-[1200px] rounded-full blur-[100px] will-change-transform mix-blend-screen"
                    style={{
                        background: 'radial-gradient(circle, rgba(91, 91, 255, 0.15) 0%, rgba(0, 212, 160, 0.06) 50%, transparent 70%)',
                        top: '-10%',
                        left: '-20%',
                        animation: 'nebulaSpin 120s linear infinite',
                    }}
                />
                <div 
                    className="absolute w-[100vw] h-[100vw] max-w-[1000px] max-h-[1000px] rounded-full blur-[120px] will-change-transform mix-blend-screen"
                    style={{
                        background: 'radial-gradient(circle, rgba(200, 184, 255, 0.08) 0%, rgba(255, 107, 157, 0.03) 50%, transparent 70%)',
                        bottom: '-20%',
                        right: '-10%',
                        animation: 'nebulaSpinReverse 150s linear infinite',
                    }}
                />
            </div>

            {/* Vibrant and Realistic Shooting Stars Background */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {[...Array(20)].map((_, i) => {
                    const colors = ['#C8B8FF', '#5B5BFF', '#00D4A0', '#FFD166', '#FF8C6B', '#7FDBFF', '#FF6B9D', '#FFFFFF'];
                    const color = colors[i % colors.length];
                    const delay = Math.random() * 12;
                    const duration = Math.random() * 3 + 3.5; 
                    
                    const isGiant = Math.random() > 0.75;
                    const widthStart = isGiant ? Math.random() * 150 + 200 : Math.random() * 80 + 100; 
                    const heightTail = isGiant ? 3 : 1.5;
                    const headSize = isGiant ? 8 : 4;
                    const glowRadius = isGiant ? 20 : 10;

                    const left = Math.random() * 100 + 20 + '%'; 
                    const top = Math.random() * 80 - 40 + '%'; 

                    return (
                        <div
                            key={`shooting-star-${i}`}
                            className="absolute flex items-center justify-end will-change-transform"
                            style={{
                                left,
                                top,
                                width: `${widthStart}px`,
                                height: `${headSize}px`,
                                // 1. Added opacity: 0 so they aren't "stuck" visible during their animation delay
                                opacity: 0, 
                                // 2. Added mixBlendMode for enhanced vibrancy
                                mixBlendMode: 'screen',
                                animation: `shootingStar ${duration}s cubic-bezier(0.25, 1, 0.5, 1) ${delay}s infinite`,
                                transformOrigin: 'top right',
                            }}
                        >
                            {/* The Glowing Head (Front) */}
                            <div 
                                className="rounded-full shrink-0 z-10 will-change-transform"
                                style={{
                                    width: `${headSize}px`,
                                    height: `${headSize}px`,
                                    // 3. Made the core white for realism, pushing the color into the massive box-shadow glow
                                    backgroundColor: '#FFFFFF', 
                                    boxShadow: `0 0 ${glowRadius}px ${color}, 0 0 ${glowRadius * 2}px ${color}, 0 0 ${glowRadius * 3}px ${color}`,
                                }}
                            />
                            {/* The Tapered Tail (Trailing behind) */}
                            <div 
                                className="w-full rounded-r-full" 
                                style={{ 
                                    height: `${heightTail}px`,
                                    background: `linear-gradient(to right, ${color}, transparent)`,
                                    // 4. Added a subtle drop shadow to the tail to make it pop
                                    boxShadow: `0 0 8px ${color}60`,
                                }} 
                            />
                        </div>
                    );
                })}
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
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
                        style={{ fontFamily: 'var(--font-heading)', color: '#FFD166' }}
                    >
                        The Bakunawa Answers
                    </motion.p>
                    <motion.h1
                        variants={fadeUpVariant}
                        custom={1}
                        className="text-5xl md:text-6xl mb-6"
                        style={{ fontFamily: 'var(--font-display)', color: '#FFD166' }}
                    >
                        Questions & Truths
                    </motion.h1>
                    <motion.p
                        variants={fadeUpVariant}
                        custom={2}
                        className="text-lg max-w-xl mx-auto"
                        style={{ color: '#A09A8E', fontFamily: 'var(--font-body)' }}
                    >
                        Each moon illuminates a truth. Find your answers here.
                    </motion.p>
                </motion.div>

                <SerpentDivider />

                {/* Two-column layout */}
                <div className="grid lg:grid-cols-[280px_1fr] gap-12 mt-12">
                    {/* Category sidebar */}
                    <div className="space-y-2">
                        <h3
                            className="text-xs tracking-[0.2em] uppercase mb-4"
                            style={{ fontFamily: 'var(--font-ui)', color: '#5C5850' }}
                        >
                            Categories
                        </h3>
                        {FAQ_CATEGORIES.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => { setActiveCategory(cat.id); setOpenFaq(null); }}
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300"
                                style={{
                                    backgroundColor: activeCategory === cat.id ? `${cat.color}10` : 'transparent',
                                    border: `1px solid ${activeCategory === cat.id ? cat.color + '30' : 'transparent'}`,
                                }}
                            >
                                <div
                                    className="w-3 h-3 rounded-full flex-shrink-0 transition-all duration-300"
                                    style={{
                                        backgroundColor: cat.color,
                                        boxShadow: activeCategory === cat.id ? `0 0 10px ${cat.color}60` : 'none',
                                        opacity: activeCategory === cat.id ? 1 : 0.4,
                                    }}
                                    aria-hidden="true"
                                />
                                <span
                                    className="text-sm"
                                    style={{
                                        fontFamily: 'var(--font-ui)',
                                        color: activeCategory === cat.id ? '#F0EDE8' : '#5C5850',
                                    }}
                                >
                                    {cat.label}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* FAQ accordion */}
                    <div>
                        <motion.div
                            key={activeCategory}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="flex items-center gap-3 mb-8">
                                <div
                                    className="w-5 h-5 rounded-full"
                                    style={{
                                        backgroundColor: activeCat.color,
                                        boxShadow: `0 0 12px ${activeCat.color}40`,
                                    }}
                                    aria-hidden="true"
                                />
                                <h2
                                    className="text-2xl"
                                    style={{ fontFamily: 'var(--font-heading)', color: '#F0EDE8' }}
                                >
                                    {activeCat.label}
                                </h2>
                            </div>

                            {questions.map((faq, i) => (
                                <AccordionItem
                                    key={`${activeCategory}-${i}`}
                                    question={faq.question}
                                    answer={faq.answer}
                                    color={activeCat.color}
                                    isOpen={openFaq === `${activeCategory}-${i}`}
                                    onClick={() =>
                                        setOpenFaq(openFaq === `${activeCategory}-${i}` ? null : `${activeCategory}-${i}`)
                                    }
                                />
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}