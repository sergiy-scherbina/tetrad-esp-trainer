'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import Image from 'next/image';

interface CellProps {
    index: number;
    isSelected: boolean;
    isTarget: boolean;
    isRevealing: boolean;
    onSelect: () => void;
    onCommit: () => void;
    imageId: string;
}

export const Cell = ({
    index,
    isSelected,
    isTarget,
    isRevealing,
    onSelect,
    onCommit,
    imageId
}: CellProps) => {
    const lastTap = useRef<number>(0);

    const handlePointerDown = (e: React.PointerEvent) => {
        // If revealing, do nothing here (container handles skip)
        if (isRevealing) return;

        const now = Date.now();
        const DOUBLE_TAP_DELAY = 300;

        if (now - lastTap.current < DOUBLE_TAP_DELAY) {
            onCommit();
        } else {
            lastTap.current = now;
            onSelect();
        }
    };

    // Parse image ID to get filename number (img_1 -> 01, img_10 -> 10)
    // Assuming imageId format is 'img_X'
    const imageNumber = imageId.split('_')[1]?.padStart(2, '0') || '01';
    const imagePath = `/static/images/${imageNumber}.jpg`;

    return (
        <motion.div
            className={clsx(
                "relative w-full aspect-square rounded-[24px] overflow-hidden cursor-pointer transition-all duration-200 border-none",

                "bg-gradient-to-b from-[#00D964] to-[#00A854] hover:bg-[#009e4d] shadow-[0_4px_0_rgba(0,0,0,0.2)]",

                isSelected && !isRevealing && "bg-[#01632E] shadow-[inset_0_0_80px_rgba(0,0,0,0.8)] ",

                isRevealing && isTarget && "bg-[radial-gradient(circle_at_center,_#4ade80_0%,_#00A651_100%)]"
            )}
            onPointerDown={handlePointerDown}
            initial={{ opacity: 1 }}
            whileTap={{ scale: 1 }}
        >
            {/* {isRevealing && isTarget && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    <Image src={imagePath} alt="Target" width={1024} height={1024} fill={false} className="object-contain w-full h-full" />
                </motion.div>
            )} */}
        </motion.div>
    );
};
