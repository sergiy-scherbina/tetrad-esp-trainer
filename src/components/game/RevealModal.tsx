'use client';

import { useGameStore } from '@/lib/store';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export const RevealModal = () => {
    const { status, trials, currentTrialIndex, completeTrial } = useGameStore();

    // The modal should only appear when 'revealing'
    const isRevealing = status === 'revealing';
    const currentTrial = trials[currentTrialIndex];

    if (!currentTrial) return null;

    const imageNumber = currentTrial.targetImageId.split('_')[1]?.padStart(2, '0') || '01';
    const imagePath = `/static/images/${imageNumber}.jpg`;

    return (
        <AnimatePresence>
            {isRevealing && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, delay: 0.3 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
                    onPointerDown={() => {
                        // Allow skipping by tapping background
                        completeTrial();
                    }}
                >
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 25
                        }}
                        className="relative aspect-square bg-[#151533] overflow-hidden shadow-2xl flex-shrink-0 select-none h-[min(100vh,100vw)] w-[min(100vh,100vw)]"
                        onPointerDown={(e) => {
                            e.stopPropagation();
                            completeTrial();
                        }}
                    >
                        <Image
                            src={imagePath}
                            alt="Correct Answer"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 300px, 400px"
                            priority
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
