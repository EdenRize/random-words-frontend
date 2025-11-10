# Random Words Frontend

A React word cloud visualization application built with TypeScript, Vite, and Tailwind CSS.

## Quick Start

**Prerequisites:** Docker installed

**Build and run:**
```bash
npm install
npm run docker:dev
```

**Access:** http://localhost:5173

## Font Size Scaling Function

The word cloud uses a responsive scaling function:

```javascript
const weightFactor = Math.min(width, height) / 1200;
```

**How it works:**
- Screen dimension-based scaling factor (smaller of width/height ÷ 1200)
- Each word's font size = frequency × weightFactor  
- Minimum size enforced at 10px for readability

**Examples:**
- Desktop (1920x1080): weightFactor = 0.9 → "the" (320 freq) = 288px
- Mobile (375x667): weightFactor = 0.31 → "the" (320 freq) = 99px

## Application Architecture

**Components:**
- `WordCloudVisualization` - Main canvas rendering
- `LoadingSpinner` - Loading state with animation
- `ErrorMessage` - Error handling with retry button

**Services:**
- `axios.service.ts` - HTTP client configuration
- `random-words.service.ts` - API data fetching

**States:**
- Loading: Animated spinner while fetching data
- Error: Message with retry functionality  
- Success: Full-screen responsive word cloud

## Available Scripts

```bash
npm run dev              # Local development
npm run docker:dev       # Docker development
npm run docker:dev:down  # Stop Docker
npm run build           # Production build
```

## Technology Stack

React 19, TypeScript, Vite, Tailwind CSS v4, WordCloud.js, Docker
