// Motion variants library for Dalan
// Based on EPD §6 — Animation System Specification

export const fadeUpVariant = {
  hidden: { opacity: 0, y: 30, filter: 'blur(4px)' },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export const fadeInVariant = {
  hidden: { opacity: 0 },
  visible: (i = 0) => ({
    opacity: 1,
    transition: { delay: i * 0.15, duration: 0.8, ease: 'easeOut' },
  }),
};

export const scaleInVariant = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export const glowPulse = {
  animate: {
    boxShadow: [
      '0 0 20px rgba(0,212,160,0.1)',
      '0 0 40px rgba(0,212,160,0.3)',
      '0 0 20px rgba(0,212,160,0.1)',
    ],
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
  },
};

export const moonOrbit = {
  animate: {
    rotate: 360,
    transition: { duration: 30, repeat: Infinity, ease: 'linear' },
  },
};

export const bakunawaReveal = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 2, ease: 'easeInOut' },
  },
};

export const irisFadeVariants = {
  initial: { clipPath: 'circle(0% at 50% 50%)' },
  animate: {
    clipPath: 'circle(150% at 50% 50%)',
    transition: { duration: 0.8 },
  },
  exit: {
    clipPath: 'circle(0% at 50% 50%)',
    transition: { duration: 0.5 },
  },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};
