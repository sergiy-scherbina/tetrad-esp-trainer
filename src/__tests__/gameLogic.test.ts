import { describe, it, expect, beforeEach } from 'vitest';
import { generateTrials, TOTAL_TRIALS, TOTAL_IMAGES, BUTTON_POSITIONS } from '../lib/gameUtils';
import { useGameStore } from '../lib/store';

describe('Game Logic Utils', () => {
    it('generates correct number of trials', () => {
        const trials = generateTrials();
        expect(trials.length).toBe(TOTAL_TRIALS);
    });

    it('trials have valid properties', () => {
        const trials = generateTrials();
        trials.forEach(trial => {
            expect(trial.targetPosition).toBeGreaterThanOrEqual(0);
            expect(trial.targetPosition).toBeLessThan(BUTTON_POSITIONS);
            expect(parseInt(trial.targetImageId.split('_')[1])).toBeGreaterThanOrEqual(1);
            expect(parseInt(trial.targetImageId.split('_')[1])).toBeLessThanOrEqual(TOTAL_IMAGES);
        });
    });
});

describe('Game Store', () => {
    beforeEach(() => {
        useGameStore.getState().resetGame();
    });

    it('initializes game correctly', () => {
        const store = useGameStore.getState();
        store.startNewGame();
        const state = useGameStore.getState();
        expect(state.status).toBe('playing');
        expect(state.trials.length).toBe(TOTAL_TRIALS);
        expect(state.currentTrialIndex).toBe(0);
        expect(state.results).toEqual([]);
    });

    it('advances state on correct input flow', () => {
        const store = useGameStore.getState();
        store.startNewGame();

        // Select
        store.selectPosition(0);
        expect(useGameStore.getState().selectedPosition).toBe(0);

        // Commit
        store.commitGuess();
        expect(useGameStore.getState().status).toBe('revealing');
        expect(useGameStore.getState().results.length).toBe(1);

        // Complete Trial
        store.completeTrial();
        expect(useGameStore.getState().status).toBe('playing');
        expect(useGameStore.getState().currentTrialIndex).toBe(1);
    });
});
