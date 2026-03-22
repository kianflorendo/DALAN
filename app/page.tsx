'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Button from '@/components/ui/Button';

// Section imports
import HomeSection from '@/components/sections/HomeSection';
import BlogSection from '@/components/sections/BlogSection';
import FaqsSection from '@/components/sections/FaqsSection';
import AboutSection from '@/components/sections/AboutSection';
import PartnershipSection from '@/components/sections/PartnershipSection';
import VoteSection from '@/components/sections/VoteSection';
import Footer from '@/components/layout/Footer';

// ============ CLOUDS OVERLAY ============
function CloudsOverlay() {
  return (
    <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Cloud 1 - Top Left */}
      <motion.div
        className="absolute top-[5%] left-[-15%] w-[380px] opacity-[0.35] blur-[1px]"
        animate={{ x: [-50, 200, -50], y: [0, -10, 0] }}
        transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
      >
        <img src="/japanese cloud.png" alt="" className="w-full h-auto drop-shadow-2xl object-contain opacity-50 sepia-[.2] hue-rotate-[200deg]" />
      </motion.div>

      {/* Cloud 2 - Middle Left (Behind Title and Subtitle) */}
      <motion.div
        className="absolute top-[40%] left-[-5%] w-[500px] lg:w-[700px] xl:w-[850px] z-0 pointer-events-none"
        animate={{ x: [-60, 200, -60], y: [0, -10, 0] }}
        transition={{ duration: 180, repeat: Infinity, ease: 'linear', delay: 0 }}
      >
        <img
          src="/cloud 2.png"
          alt=""
          className="w-full h-auto drop-shadow-[0_10px_40px_rgba(0,0,0,0.5)] object-contain opacity-[0.4] filter brightness-110 contrast-110"
        />
      </motion.div>

      {/* Cloud 3 - Bottom Left */}
      <motion.div
        className="absolute top-[65%] left-[-15%] w-[330px] opacity-[0.45] blur-[1px]"
        animate={{ x: [-80, 200, -80], y: [0, -25, 0] }}
        transition={{ duration: 90, repeat: Infinity, ease: 'linear', delay: 5 }}
      >
        <img src="/japanese cloud.png" alt="" className="w-full h-auto drop-shadow-2xl object-contain opacity-50 sepia-[.15] hue-rotate-[200deg]" />
      </motion.div>
    </div>
  );
}

// ============ PARTICLE SYSTEM ============
function ParticleField() {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
    opacity: number;
  }>>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 120 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2.5 + 1.0, // slightly larger for SVG sparkles
        duration: Math.random() * 25 + 20,
        delay: Math.random() * 15,
        opacity: Math.random() * 0.4 + 0.15,
      }))
    );
  }, []);

  if (particles.length === 0) {
    return <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true" />;
  }

  return (
    <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((p) => {
        const isGold = p.id % 4 === 0;
        const color = isGold ? '#FCE38A' : '#FFFFFF';
        const shadow = isGold ? 'rgba(252,227,138,0.8)' : 'rgba(255,255,255,0.8)';

        return (
          <motion.div
            key={p.id}
            className="absolute flex items-center justify-center"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size * 5, // Container larger than actual star
              height: p.size * 5,
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, Math.sin(p.id * 0.5) * 15, 0],
              opacity: [0, p.opacity, 0],
              scale: [0.8, 1.2, 0.8], // Twinkle effect
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: 'easeInOut',
            }}
          >
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full"
              style={{ filter: `drop-shadow(0 0 ${p.size * 2}px ${shadow}) drop-shadow(0 0 ${p.size}px ${shadow})` }}
            >
              {/* 4-pointed sparkle curve */}
              <path
                d="M50 0 C50 40 40 50 0 50 C40 50 50 60 50 100 C50 60 60 50 100 50 C60 50 50 40 50 0 Z"
                fill={color}
              />
            </svg>
          </motion.div>
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

  // Pause video exactly at 5 seconds smoothly
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let rafId: number;

    const checkTime = () => {
      const time = video.currentTime;
      if (time >= 4.9) {
        // Stop right before 5.0 to ensure the frame is locked smoothly
        video.pause();
        video.currentTime = 5.0; // lock exact frame
        video.playbackRate = 1.0; // reset for potential replay
      } else {
        // Smooth slowdown between 3.0 and 5.0 seconds
        if (time >= 3.0) {
          const progress = (time - 3.0) / 2.0; // 0.0 to 1.0
          const easeOut = 1 - Math.pow(progress, 2); // quadratic ease out
          // Lower limit so it doesn't get stuck infinitely before 5.0
          video.playbackRate = Math.max(0.1, easeOut);
        }
        rafId = requestAnimationFrame(checkTime);
      }
    };

    const handlePlay = () => {
      rafId = requestAnimationFrame(checkTime);
    };

    video.addEventListener('play', handlePlay);

    // Address the race condition if video auto-played before useEffect mounted
    if (!video.paused) {
      rafId = requestAnimationFrame(checkTime);
    }

    return () => {
      video.removeEventListener('play', handlePlay);
      video.playbackRate = 1.0; // Reset
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* ========== LANDING HERO ========== */}
      <section
        ref={heroRef}
        id="landing"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background Video Wrapper (True Fullscreen Background) */}
        <div
          className="absolute inset-0 z-0 bg-[#030610]"
          aria-hidden="true"
        >
          {/* Subtle responsive glow behind the dragon */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-30 blur-[120px] bg-gradient-to-tr from-[#1a2b56] via-[#0d1b38] to-transparent pointer-events-none" />

          {/* Improved Video Container */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              preload="auto"
              /* ZOMMED OUT: Scale reduced to 1.05 to show more of the dragon and moon naturally */
              className="w-full h-full object-cover object-center relative z-10 scale-[1.05] md:scale-105"
              style={{
                imageRendering: 'high-quality' as 'auto',
                backfaceVisibility: 'hidden',
                perspective: '1000px',
                transform: 'translateZ(0)',
                willChange: 'transform, filter, opacity',
                filter: 'brightness(1.05) contrast(1.1) saturate(1.1)',

                /* TIGHTER MASK TO COMPENSATE: 
                 * Since the video is zoomed out, the real edges are closer. 
                 * We pull the transparent stop inward to 75% so it fades out before hitting the edge.
                 */
                WebkitMaskImage:
                  'radial-gradient(ellipse 65% 70% at 50% 50%, black 35%, rgba(0,0,0,0.8) 55%, transparent 75%)',
                maskImage:
                  'radial-gradient(ellipse 65% 70% at 50% 50%, black 35%, rgba(0,0,0,0.8) 55%, transparent 75%)',
              }}
            >
              <source src="/New dragon.mp4" type="video/mp4" />
            </video>

            {/* Vignette adjusted to match the tighter mask */}
            <div
              className="absolute inset-0 z-20 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse 65% 70% at 50% 50%, transparent 45%, rgba(3,6,16,0.7) 65%, #030610 85%)'
              }}
            />
          </div>

          {/* 4-Sided Gradient Shadow Frame: Guaranteed to hide physical DOM edges softly */}
          <div className="absolute inset-0 z-30 pointer-events-none flex flex-col justify-between">
            {/* Top Fade */}
            <div className="w-full h-[10vh] bg-gradient-to-b from-[#030610] to-transparent" />

            {/* Middle Left/Right Fades */}
            <div className="absolute inset-0 flex justify-between">
              <div className="w-[10vw] h-full bg-gradient-to-r from-[#030610] to-transparent" />
              <div className="w-[10vw] h-full bg-gradient-to-l from-[#030610] to-transparent" />
            </div>

            {/* Bottom Fade (Stronger to blend into the next section) */}
            <div className="w-full h-[20vh] bg-gradient-to-t from-[#030610] via-[#030610]/80 to-transparent" />
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
            className="w-full max-w-3xl text-center mt-20 md:mt-28 lg:mt-32"
            style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          >
            {/* Headline */}
            <motion.h1
              className="mb-6 flex items-baseline justify-center"
              initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: 4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <span
                className="tracking-wider font-semibold text-gradient-gold-shine"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(3.5rem, 9vw, 7rem)',
                  lineHeight: 1.2,
                  filter: 'drop-shadow(0 2px 20px rgba(0,0,0,0.8)) drop-shadow(0 0 40px rgba(0,0,0,0.5))',
                }}
              >
                DALAN
              </span>
            </motion.h1>

            {/* Subheadline */}
            <div className="text-xl md:text-2xl leading-relaxed mb-10 max-w-2xl flex flex-wrap justify-center text-center" style={{ fontFamily: 'var(--font-body)', color: '#E8E4DD', fontWeight: 500, letterSpacing: '0.02em', textShadow: '0 4px 20px rgba(0,0,0,1), 0 0 50px rgba(0,0,0,0.8), 0 0 100px rgba(0,0,0,0.6)' }}>
              {headlineWords.map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block mr-[0.3em] last:mr-0"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 5.2 + i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  {word}
                </motion.span>
              ))}
            </div>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 6.5, duration: 0.5 }}
            >
              <Button variant="solid" color="emerald" href="#home" size="lg">
                Begin the Journey
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Button>
              <Button variant="ghost" color="gold" href="#home" size="lg">
                Explore Platform
              </Button>
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* ========== PAGE SECTIONS ========== */}
      <HomeSection />
      <BlogSection />
      <FaqsSection />
      <AboutSection />
      <PartnershipSection />
      <VoteSection />
      <Footer />
    </div>
  );
}
