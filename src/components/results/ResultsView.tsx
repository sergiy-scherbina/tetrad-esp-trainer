'use client';
import { useGameStore, useGameHistory } from '@/lib/store';
import { TOTAL_TRIALS } from '@/lib/gameUtils';
import { motion } from 'framer-motion';
import React from 'react';

export const ResultsView = () => {
    const { results, startNewGame } = useGameStore();
    const { totalRounds, totalScore, addRound } = useGameHistory();
    const hasAddedHistory = React.useRef(false);

    const score = results.filter(r => r.isHit).length;

    React.useEffect(() => {
        if (!hasAddedHistory.current) {
            addRound(score);
            hasAddedHistory.current = true;
        }
    }, [score, addRound]);

    // Mock data for "Previous Round" and "Last Record"
    const previousRound = "—";
    const lastRecord = "—";

    return (
        <div className="w-full mx-auto text-white flex flex-col items-center justify-center min-h-[50vh] space-y-12 animate-in fade-in duration-700 p-6">

            {/* Main Result Header */}
            <div className="text-center space-y-4 p-glow">
                <h2 className="text-4xl md:text-5xl font-bold tracking-wide">
                    RESULT: {score}/{TOTAL_TRIALS}
                </h2>
                <p className="text-lg md:text-xl font-light">
                    {score} hits confirm your ESP abilities
                </p>
            </div>

            {/* Content Grid */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">

                {/* Left: Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                    <StatBox label="Previous Round" value={previousRound} />
                    <StatBox label="Last Record" value={lastRecord} />
                    <StatBox label="Total Rounds" value={totalRounds.toString()} />
                    <StatBox label="Total Score" value={totalScore.toString()} />
                </div>

                {/* Right: Actions */}
                <div className="flex flex-col justify-center space-y-4">
                    <button
                        onClick={startNewGame}
                        className="w-full py-4 bg-[#8b5cf6] hover:bg-[#7c3aed] text-white rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-purple-500/25"
                    >
                        New Round
                    </button>
                    <button
                        onClick={() => window.location.reload()}
                        className="w-full py-4 bg-transparent border-2 border-[#8b5cf6] text-white rounded-xl font-bold text-lg hover:bg-[#8b5cf6]/10 transition-all"
                    >
                        Quit
                    </button>
                </div>
            </div>
        </div>
    );
};

const StatBox = ({ label, value }: { label: string, value: string }) => (
    <div className="bg-[#F9F9F9]/10 h-[120px] rounded-xl p-6 flex flex-col items-center justify-center space-y-2">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-2xl font-bold text-white">{value}</span>
    </div>
);
