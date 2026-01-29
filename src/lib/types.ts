export type ImageId = 'img_1' | 'img_2' | 'img_3' | 'img_4' | 'img_5' | 'img_6' | 'img_7' | 'img_8' | 'img_9' | 'img_10';

export interface Trial {
    id: string;
    targetImageId: string;
    targetPosition: 0 | 1 | 2 | 3;
}

export interface TrialResult {
    trialIndex: number;
    imageId: string;
    selectedPosition: number; // 0-3
    targetPosition: number; // 0-3
    isHit: boolean;
    reactionTimeMs: number;
    timestamp: string;
}

export interface GameSession {
    sessionId: string;
    startTime: string;
    trials: Trial[];
    results: TrialResult[];
    isComplete: boolean;
}
