# Tetrad ESP Trainer

A Next.js 14+ application designed for ESP training research. Users identify a hidden image across 24 trials.

## Technology Stack
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4, Framer Motion
- **State Management**: Zustand
- **Backend**: Firebase (Firestore)
- **Testing**: Vitest

## Features
- **Project Structure**: Modern Next.js App Router with strict TypeScript.
- **Game Logic**: 24 pre-generated trials per round. 
- **Interaction**: Single tap/hold to select, Double tap to reveal.
- **Animations**: Smooth fade-in and scale effects using Framer Motion.
- **Data Persistence**: Aggregates trial results in Firestore.
- **Responsiveness**: Fully responsive layout optimized for mobile (touch interactions).

## Setup Instructions

### Prerequisites
- Node.js 18+
- NPM

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Firebase Configuration
Create a `.env.local` file in the root directory with your Firebase credentials:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### Running Locally
```bash
npm run dev
```

### Testing
```bash
npm test
```

## Time Tracking
| Task | Time |
|------|------|
| Project Setup & Config | 15m |
| Game Logic & State | 25m |
| UI Implementation (Grid/Cell) | 30m |
| Page & Flow Integration | 15m |
| Testing & Validation | 15m |
| **Total** | **~1h 40m** |

## Deployment
This project is configured for easy deployment on Vercel.
1. Push to GitHub.
2. Import project in Vercel.
3. Add the Firebase environment variables in Project Settings.
4. Deploy.

Live URL: [Insert Vercel URL]
GitHub: [Insert GitHub URL]
