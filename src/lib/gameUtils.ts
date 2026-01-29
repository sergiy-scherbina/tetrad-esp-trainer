import { Trial } from './types';
import { v4 as uuidv4 } from 'uuid';

export const TOTAL_TRIALS = 24;
export const TOTAL_IMAGES = 10;
export const BUTTON_POSITIONS = 4;

export const generateTrials = (): Trial[] => {
    const trials: Trial[] = [];

    for (let i = 0; i < TOTAL_TRIALS; i++) {
        const randomImageIndex = Math.floor(Math.random() * TOTAL_IMAGES) + 1;
        const targetImageId = `img_${randomImageIndex}`;
        const targetPosition = Math.floor(Math.random() * BUTTON_POSITIONS) as 0 | 1 | 2 | 3;

        trials.push({
            id: uuidv4(),
            targetImageId,
            targetPosition,
        });
    }

    return trials;
};
