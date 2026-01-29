'use client';
import { useGameStore } from '@/lib/store';
import { TOTAL_TRIALS } from '@/lib/gameUtils';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

export const TrialIndicator = () => {
    const { currentTrialIndex, results } = useGameStore();

    return (
        <div className="w-full max-w-2xl mx-auto mb-18 flex flex-col items-center space-y-2">

            {/* Breadcrumbs */}
            <div className="flex flex-wrap justify-center gap-[8px]">
                {Array.from({ length: TOTAL_TRIALS }).map((_, i) => {
                    const result = results.find(r => r.trialIndex === i);
                    const isCurrent = i === currentTrialIndex;
                    const isPast = i < currentTrialIndex;

                    return (
                        <div
                            key={i}
                            className={clsx(
                                "w-[16px] h-[16px] rounded-[4px] flex items-center justify-center text-[10px] font-medium transition-all duration-300 border",
                                // Current Trial
                                isCurrent && "bg-white/10 text-white scale-110 shadow-lg shadow-purple-500/20 border-transparent",
                                // Past Trial (Hit)
                                isPast && result?.isHit && "bg-purple-500 text-white/90 border-transparent",
                                // Past Trial (Miss) - Using a duller purple or different shade to match 'VEREVIO' look which seems monochromatic, 
                                // but for functionality we distinguish. If strict visual match: use different opacity.
                                isPast && !result?.isHit && "bg-white/20 border-purple-500 text-white/50",
                                // Future
                                !isPast && !isCurrent && "bg-white/20 border-transparent"
                            )}
                        >
                            {isCurrent && (
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    {i + 1}
                                </motion.span>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
