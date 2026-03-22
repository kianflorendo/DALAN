'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { irisFadeVariants } from '@/lib/motion-variants';

interface SectionTransitionProps {
    children: React.ReactNode;
}

export default function SectionTransition({ children }: SectionTransitionProps) {
    return (
        <AnimatePresence mode="wait">
            <motion.div
                variants={irisFadeVariants}
                initial="initial"
                animate="animate"
                exit="exit"
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
