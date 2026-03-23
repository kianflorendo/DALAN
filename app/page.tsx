'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Button from '@/components/ui/Button';

// Section imports
import HomeSection from '@/components/sections/HomeSection';
import BlogSection from '@/components/sections/BlogSection';
import FaqsSection from '@/components/sections/FaqsSection';
import AboutSection from '@/components/sections/AboutSection';
import WhyDalanSection from '@/components/sections/WhyDalanSection';
import GapBridgeSection from '@/components/sections/GapBridgeSection';
import PartnershipSection from '@/components/sections/PartnershipSection';
import VoteSection from '@/components/sections/VoteSection';
import Footer from '@/components/layout/Footer';

// ============ CLOUDS OVERLAY (CSS animations — no JS per-frame) ============
const cloudStyles = `
@keyframes cloudDrift1 {
  0%, 100% { transform: translate3d(-50px, 0, 0); }
  50% { transform: translate3d(200px, -10px, 0); }
}
@keyframes cloudDrift2 {
  0%, 100% { transform: translate3d(-60px, 0, 0); }
  50% { transform: translate3d(200px, -10px, 0); }
}
@keyframes cloudDrift3 {
  0%, 100% { transform: translate3d(-80px, 0, 0); }
  50% { transform: translate3d(200px, -25px, 0); }
}
@keyframes cloudDrift4 {
  0%, 100% { transform: translate3d(50px, 0, 0); }
  50% { transform: translate3d(-150px, 15px, 0); }
}
`;

function CloudsOverlay() {
  return (
    <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none" aria-hidden="true">
      <style>{cloudStyles}</style>
      {/* Cloud 1 - Top Left */}
      <div
        className="absolute top-[5%] left-[-15%] w-[380px] opacity-[0.35] blur-[1px]"
        style={{ animation: 'cloudDrift1 90s linear infinite', willChange: 'transform' }}
      >
        <img src="/japanese cloud.png" alt="" className="w-full h-auto drop-shadow-2xl object-contain opacity-50 sepia-[.2] hue-rotate-[200deg]" loading="eager" />
      </div>

      {/* Cloud 2 - Middle Left */}
      <div
        className="absolute top-[40%] left-[-5%] w-[500px] lg:w-[700px] xl:w-[850px] z-0 pointer-events-none"
        style={{ animation: 'cloudDrift2 180s linear infinite', willChange: 'transform' }}
      >
        <img
          src="/cloud 2.png"
          alt=""
          className="w-full h-auto drop-shadow-[0_10px_40px_rgba(0,0,0,0.5)] object-contain opacity-[0.4] filter brightness-110 contrast-110"
          loading="eager"
        />
      </div>

      {/* Cloud 3 - Bottom Left */}
      <div
        className="absolute top-[65%] left-[-15%] w-[330px] opacity-[0.45] blur-[1px]"
        style={{ animation: 'cloudDrift3 90s linear 5s infinite', willChange: 'transform' }}
      >
        <img src="/japanese cloud.png" alt="" className="w-full h-auto drop-shadow-2xl object-contain opacity-50 sepia-[.15] hue-rotate-[200deg]" loading="eager" />
      </div>

      {/* Cloud 4 - Top Right */}
      <div
        className="absolute top-[8%] right-[-10%] w-[450px] lg:w-[600px] opacity-[0.3] z-0 pointer-events-none"
        style={{ animation: 'cloudDrift4 120s linear 2s infinite', willChange: 'transform' }}
      >
        <img
          src="/cloud 2.png"
          alt=""
          className="w-full h-auto drop-shadow-2xl object-contain filter brightness-110 contrast-110"
          loading="eager"
        />
      </div>
    </div>
  );
}

// ============ PARTICLE SYSTEM (CSS animations — GPU composited) ============
const particleStyles = `
@keyframes particlePulse {
  0%, 100% { opacity: 0; transform: scale(0.6); }
  50% { opacity: var(--p-opacity); transform: scale(1.4); }
}
`;

const COLORS = [
  { bg: '#FFD166', shadow: 'rgba(255,209,102,1)' },
  { bg: '#00FFC0', shadow: 'rgba(0,255,192,1)' },
  { bg: '#7373FF', shadow: 'rgba(115,115,255,1)' },
  { bg: '#D5C8FF', shadow: 'rgba(213,200,255,0.8)' },
  { bg: '#FFFFFF', shadow: 'rgba(255,255,255,0.8)' },
];

function ParticleField() {
  const [particles, setParticles] = useState<Array<{
    id: number; x: number; y: number; size: number;
    duration: number; delay: number; opacity: number; colorIdx: number;
  }>>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 300 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 1.2 + 0.4,
        duration: Math.random() * 10 + 6,
        delay: Math.random() * 12,
        opacity: Math.random() * 0.7 + 0.3,
        colorIdx: i % 5,
      }))
    );
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="absolute inset-0 z-15 overflow-hidden pointer-events-none">
      <style>{particleStyles}</style>
      {particles.map((p) => {
        const c = COLORS[p.colorIdx];
        return (
          <div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              backgroundColor: c.bg,
              boxShadow: `0 0 ${p.size * 6}px ${c.shadow}, 0 0 ${p.size * 3}px ${c.shadow}`,
              ['--p-opacity' as string]: p.opacity,
              animation: `particlePulse ${p.duration}s ease-in-out ${p.delay}s infinite`,
              willChange: 'opacity, transform',
            }}
          />
        );
      })}
    </div>
  );
}

// ============ LANDING PAGE ============
export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.97]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  const headlineWords = 'Where education and knowledge meet the future of learning.'.split(' ');

  // Start at 2s and stop at 5s for a punchy intro
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Start video at 2 seconds mark
    video.currentTime = 2.0;

    const handleTimeUpdate = () => {
      // Use 5.0 as the hard stop
      if (video.currentTime >= 5.0) {
        video.pause();
        video.currentTime = 5.0;
        video.removeEventListener('timeupdate', handleTimeUpdate);
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => video.removeEventListener('timeupdate', handleTimeUpdate);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* ========== LANDING HERO ========== */}
      <section
        ref={heroRef}
        id="landing"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background Video Wrapper */}
        <div
          className="absolute inset-0 z-0 bg-[#030610]"
          aria-hidden="true"
        >
          {/* Subtle responsive glow behind the dragon */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              width: 800, height: 800,
              background: 'radial-gradient(circle, rgba(26,43,86,0.35) 0%, rgba(13,27,56,0.2) 40%, transparent 70%)',
              willChange: 'transform',
            }}
          />

          {/* Optimized Video Container */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            <motion.div
              className="relative w-full h-full max-w-[1400px] max-h-[85vh] flex items-center justify-center"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            >
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                preload="auto"
                className="w-full h-full object-contain relative z-10"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'translateZ(0)',
                  willChange: 'transform',
                  contain: 'layout style paint',
                }}
              >
                <source src="/New dragon.mp4" type="video/mp4" />
              </video>

              {/* Circular vignette mask — soft blend into void */}
              <div
                className="absolute inset-0 z-20 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at 50% 48%, transparent 18%, rgba(3,6,16,0.15) 30%, rgba(3,6,16,0.5) 45%, rgba(3,6,16,0.85) 58%, #030610 72%)'
                }}
              />
            </motion.div>
          </div>

          {/* Blurred edge frame — seamless blend into site background */}
          <div className="absolute inset-0 z-30 pointer-events-none">
            {/* Top */}
            <div className="absolute top-0 left-0 right-0 h-[18vh]" style={{
              background: 'linear-gradient(to bottom, #030610 0%, rgba(3,6,16,0.85) 40%, rgba(3,6,16,0.3) 70%, transparent 100%)',
              backdropFilter: 'blur(12px)',
              mask: 'linear-gradient(to bottom, black 0%, black 50%, transparent 100%)',
              WebkitMask: 'linear-gradient(to bottom, black 0%, black 50%, transparent 100%)',
            }} />
            {/* Bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-[25vh]" style={{
              background: 'linear-gradient(to top, #030610 0%, rgba(3,6,16,0.9) 35%, rgba(3,6,16,0.4) 65%, transparent 100%)',
              backdropFilter: 'blur(16px)',
              mask: 'linear-gradient(to top, black 0%, black 50%, transparent 100%)',
              WebkitMask: 'linear-gradient(to top, black 0%, black 50%, transparent 100%)',
            }} />
            {/* Left */}
            <div className="absolute top-0 bottom-0 left-0 w-[22vw]" style={{
              background: 'linear-gradient(to right, #030610 0%, rgba(3,6,16,0.92) 30%, rgba(3,6,16,0.6) 55%, rgba(3,6,16,0.2) 75%, transparent 100%)',
              backdropFilter: 'blur(20px)',
              mask: 'linear-gradient(to right, black 0%, black 60%, transparent 100%)',
              WebkitMask: 'linear-gradient(to right, black 0%, black 60%, transparent 100%)',
            }} />
            {/* Right */}
            <div className="absolute top-0 bottom-0 right-0 w-[22vw]" style={{
              background: 'linear-gradient(to left, #030610 0%, rgba(3,6,16,0.92) 30%, rgba(3,6,16,0.6) 55%, rgba(3,6,16,0.2) 75%, transparent 100%)',
              backdropFilter: 'blur(20px)',
              mask: 'linear-gradient(to left, black 0%, black 60%, transparent 100%)',
              WebkitMask: 'linear-gradient(to left, black 0%, black 60%, transparent 100%)',
            }} />
          </div>
        </div>

        <CloudsOverlay />
        <ParticleField />

        {/* Layered ambient gradients */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {/* Central nebula shifted left */}
          <div
            className="absolute inset-0"
            style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(26,26,110,0.15) 0%, transparent 60%)' }}
          />
          {/* Top-right emerald accent */}
          <div
            className="absolute top-0 right-0 w-[600px] h-[600px]"
            style={{ background: 'radial-gradient(circle, rgba(0,212,160,0.04) 0%, transparent 70%)' }}
          />
          {/* Bottom-left imperial accent */}
          <div
            className="absolute bottom-0 left-0 w-[500px] h-[500px]"
            style={{ background: 'radial-gradient(circle, rgba(91,91,255,0.05) 0%, transparent 70%)' }}
          />
        </div>

        <div className="container relative z-10 mx-auto px-6 h-full flex items-center justify-center">
          <motion.div
            className="w-full max-w-3xl text-center mt-48 md:mt-64 lg:mt-80"
            style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          >
            {/* Headline */}
            <motion.h1
              className="mb-8 flex items-baseline justify-center relative"
              initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: 3.2, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <span
                className="tracking-wider font-bold relative z-10"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(3.5rem, 10vw, 7.2rem)',
                  lineHeight: 1.1,
                  color: 'var(--color-gold)',
                  /* HIGH-END EMBOSSED EFFECT: Refined for Warm Gold */
                  textShadow: `
                    -1px -1px 0 #FFF9E0, /* Light highlight */
                    0 1px 0 #D1A435,
                    0 2px 0 #A67C1A,
                    0 3px 0 #856112,
                    0 4px 0 #61460D,
                    0 12px 25px rgba(0,0,0,0.8),
                    0 0 40px rgba(255, 209, 102, 0.2)
                  `,
                }}
              >
                DALAN
              </span>
            </motion.h1>

            {/* Subheadline */}
            <div className="text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto flex flex-wrap justify-center text-center"
              style={{
                fontFamily: 'var(--font-body)',
                color: '#F0EDE8',
                fontWeight: 500,
                letterSpacing: '0.04em',
                textShadow: '0 2px 10px rgba(0,0,0,0.8)'
              }}>
              {headlineWords.map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block mr-[0.3em] last:mr-0"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 4.2 + i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  {word}
                </motion.span>
              ))}
            </div>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-20"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 5.5, duration: 0.5 }}
            >
              <div className="drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
                <Button variant="solid" color="emerald" href="#home" size="md">
                  Begin the Journey
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Button>
              </div>
              <div className="drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
                <Button variant="ghost" color="gold" href="#home" size="md">
                  Explore Platform
                </Button>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* ========== PAGE SECTIONS ========== */}
      <HomeSection />
      <BlogSection />
      <FaqsSection />
      <AboutSection />
      <WhyDalanSection />
      <GapBridgeSection />
      <PartnershipSection />
      <VoteSection />
      <Footer />
    </div>
  );
}
