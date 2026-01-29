'use client';

import { useGameStore } from '@/lib/store';
import { Cell } from './Cell';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

export const Grid = () => {
    const {
        trials,
        currentTrialIndex,
        selectedPosition,
        status,
        selectPosition,
        commitGuess,
        completeTrial
    } = useGameStore();

    const currentTrial = trials[currentTrialIndex];

    // Auto advance after animation + pause
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (status === 'revealing') {
            // Animation is 300ms. Let's wait 1.5s total for user to see result
            timer = setTimeout(() => {
                completeTrial();
            }, 1200);
        }
        return () => clearTimeout(timer);
    }, [status, completeTrial]);

    if (!currentTrial) return null;

    return (
        <div
            className="w-full max-w-[624px] mx-auto aspect-square p-2"
            onPointerDown={(e) => {
                // If revealing, any tap anywhere skips to end
                if (status === 'revealing') {
                    // We need to ensure completeTrial calls aren't debounced too aggressively if we want instant skip
                    completeTrial();
                }
            }}
        >
            <div className="grid grid-cols-2 gap-4 sm:gap-6 w-full h-full">
                {[0, 1, 2, 3].map((pos) => (
                    <Cell
                        key={`${currentTrial.id}-${pos}`} // Re-mount key to ensure animations fire fresh
                        index={pos}
                        isSelected={selectedPosition === pos}
                        isTarget={currentTrial.targetPosition === pos}
                        isRevealing={status === 'revealing'}
                        onSelect={() => selectPosition(pos)}
                        onCommit={() => commitGuess()}
                        imageId={currentTrial.targetImageId}
                    />
                ))}
            </div>
        </div>
    );
};
