import { create } from 'zustand';
import { generateTrials, TOTAL_TRIALS } from './gameUtils';
import { Trial, TrialResult } from './types';
import { v4 as uuidv4 } from 'uuid';

interface GameState {
    // Config
    sessionId: string;

    // State
    trials: Trial[];
    currentTrialIndex: number;
    results: TrialResult[];
    status: 'idle' | 'playing' | 'revealing' | 'finished';

    // Current Trial State
    selectedPosition: number | null; // For highlighting
    startTime: number; // For reaction time

    // Actions
    startNewGame: () => void;
    selectPosition: (pos: number) => void;
    commitGuess: () => void; // Triggered by double tap
    completeTrial: () => void; // Called after animation
    resetGame: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
    sessionId: '',
    trials: [],
    currentTrialIndex: 0,
    results: [],
    status: 'idle',
    selectedPosition: null, // index 0-3
    startTime: 0,

    startNewGame: () => {
        set({
            sessionId: uuidv4(),
            trials: generateTrials(),
            currentTrialIndex: 0,
            results: [],
            status: 'playing',
            selectedPosition: null,
            startTime: Date.now(),
        });
    },

    selectPosition: (pos) => {
        const { status } = get();
        if (status !== 'playing') return;
        set({ selectedPosition: pos });
    },

    commitGuess: () => {
        const { status, selectedPosition, currentTrialIndex, trials, startTime } = get();

        // Requirement: "Double tap: Reveal image". 
        // If nothing selected, maybe double tap selects and commits? 
        // But logically you double tap ON a button.

        if (status !== 'playing') return;
        // Note: If selectedPosition is null, we can't commit. 
        // But the UI will likely ensure selectPosition happens on the first tap of the double tap.
        // If we call commitGuess without a selection, we should arguably ignore or select whatever was tapped.
        // We'll assume selectPosition is called before commitGuess by the component logic.
        if (selectedPosition === null) return;

        const currentTrial = trials[currentTrialIndex];
        if (!currentTrial) return;

        const reactionTime = Date.now() - startTime;
        const isHit = selectedPosition === currentTrial.targetPosition;

        // Record result immediately
        const result: TrialResult = {
            trialIndex: currentTrialIndex,
            imageId: currentTrial.targetImageId,
            selectedPosition,
            targetPosition: currentTrial.targetPosition,
            isHit,
            reactionTimeMs: reactionTime,
            timestamp: new Date().toISOString(),
        };

        set((state) => ({
            results: [...state.results, result],
            status: 'revealing',
        }));
    },

    completeTrial: () => {
        const { currentTrialIndex } = get();
        const nextIndex = currentTrialIndex + 1;

        if (nextIndex >= TOTAL_TRIALS) {
            set({ status: 'finished' });
        } else {
            set({
                currentTrialIndex: nextIndex,
                status: 'playing',
                selectedPosition: null,
                startTime: Date.now(),
            });
        }
    },

    resetGame: () => {
        set({ status: 'idle', trials: [], results: [] });
    }
}));

// Add a simple hook or extender for history if we want to track across rounds in memory
export const useGameHistory = create<{
    totalRounds: number;
    totalScore: number;
    addRound: (score: number) => void;
}>((set) => ({
    totalRounds: 0,
    totalScore: 0,
    addRound: (score) => set((state) => ({
        totalRounds: state.totalRounds + 1,
        totalScore: state.totalScore + score
    })),
}));
