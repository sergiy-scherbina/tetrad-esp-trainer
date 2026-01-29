import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, addDoc, doc, setDoc, increment } from 'firebase/firestore';
import { GameSession, TrialResult } from './types';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);



export const saveGameSession = async (sessionData: {
    sessionId: string;
    score: number;
    totalTrials: number;
    results: TrialResult[];
}) => {
    try {
        // 1. Save the detailed session log
        const docRef = await addDoc(collection(db, "game_results"), {
            ...sessionData,
            timestamp: new Date().toISOString(),
        });
        console.log("Session saved with ID: ", docRef.id);

        // 2. Aggregate stats per image (Write-time aggregation)
        // We do this to allow easy querying of "Image X hits/misses" without reading all logs

        // Calculate deltas in memory first
        const imageStatsDelta: Record<string, { hits: number; misses: number }> = {};

        sessionData.results.forEach(result => {
            const imgId = result.imageId;
            if (!imageStatsDelta[imgId]) {
                imageStatsDelta[imgId] = { hits: 0, misses: 0 };
            }
            if (result.isHit) {
                imageStatsDelta[imgId].hits++;
            } else {
                imageStatsDelta[imgId].misses++;
            }
        });

        // Batch updates to firestore (using promises for parallel execution)
        const updatePromises = Object.entries(imageStatsDelta).map(async ([imageId, stats]) => {
            const statsRef = doc(db, "image_stats", imageId);

            // We use setDoc with merge because the doc might not exist yet
            // treating increment on undefined field as starting from 0
            return setDoc(statsRef, {
                hits: increment(stats.hits),
                misses: increment(stats.misses),
                totalRequests: increment(stats.hits + stats.misses),
                lastUpdated: new Date().toISOString()
            }, { merge: true });
        });

        await Promise.all(updatePromises);
        console.log("Aggregated stats updated for images.");

        return docRef.id;
    } catch (e) {
        console.error("Error saving game session: ", e);
    }
};

export { db };
