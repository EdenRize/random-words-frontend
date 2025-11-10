# Random Words Frontend

A React application that displays word cloud visualizations using randomly generated word frequency data. Built with TypeScript, Vite, and Tailwind CSS.

## 🚀 Quick Start

### Prerequisites
- [Docker](https://docs.docker.com/get-docker/) installed on your machine
- [Node.js](https://nodejs.org/) (optional, for local development)

### Running the Application

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server with Docker:**
   ```bash
   npm run docker:dev
   ```

3. **Open your browser and navigate to:**
   ```
   http://localhost:5173
   ```

### Available Scripts

- `npm run dev` - Start local development server
- `npm run docker:dev` - Start development server in Docker container
- `npm run docker:dev:down` - Stop Docker development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🎯 Features

### Word Cloud Visualization
- Interactive word cloud displaying 6,000+ words with varying frequencies
- Dynamic font sizes based on word frequency
- Random color generation for each word
- Responsive design that adapts to screen size
- Smooth animations and hover effects

### Application States

#### 🔄 Loading State
When the application starts, it displays a loading spinner with the message "Loading words..." while fetching word data from the API service. The loading state includes:
- Animated spinning icon using Tailwind's `animate-spin`
- Centered loading message
- Clean, minimalist design

#### ❌ Error State
If data fetching fails, the application shows an error state with:
- Clear error message explaining what went wrong
- Red text styling to indicate the error status
- **Retry button** that allows users to attempt loading the data again
- Automatic error handling for network failures or API issues

#### ✅ Success State
When data loads successfully, the application renders:
- Full-screen word cloud visualization
- Words sized proportionally to their frequency
- Colorful, randomly distributed word placement
- Responsive canvas that fills the viewport

## 🛠 Technology Stack

- **React 19** - Modern React with latest features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS v4** - Utility-first styling
- **WordCloud.js** - Word cloud visualization library
- **Axios** - HTTP client for API requests
- **Docker** - Containerized development environment

## 🏗 Project Structure

```
src/
├── components/
│   ├── WordCloudVisualization.tsx  # Main word cloud component
│   ├── LoadingSpinner.tsx          # Loading state component
│   └── ErrorMessage.tsx            # Error state component
├── services/
│   ├── axios.service.ts            # HTTP client configuration
│   └── random-words.service.ts     # Word data API service
├── App.tsx                         # Main application component
├── main.tsx                        # Application entry point
├── index.css                       # Global styles and Tailwind imports
└── randomWordsMap.ts               # Sample word data
```

## 🐳 Docker Development

The project includes Docker configuration for consistent development environments:

- **Dockerfile.dev** - Development container with hot reload
- **docker-compose.dev.yml** - Orchestrated development setup
- **Volume mounting** - Local file changes sync to container
- **Live reload** - Automatic browser refresh on code changes

### Docker Commands

```bash
# Start development environment
npm run docker:dev

# Stop development environment
npm run docker:dev:down

# Build development image only
npm run docker:build:dev
```

## 🎨 Customization

### Word Data
Modify `src/randomWordsMap.ts` to change the word frequencies or add new words.

### Styling
The application uses Tailwind CSS v4. Update component classes or modify `src/index.css` for global styles.

### Word Cloud Configuration
Adjust word cloud settings in `WordCloudVisualization.tsx`:
- `weightFactor` - Controls word size scaling
- `gridSize` - Affects word spacing
- `rotationSteps` - Number of rotation angles
- `minSize` - Minimum font size

### Font Size Scaling Function
The word cloud uses a dynamic scaling function to determine font sizes based on word frequency and screen dimensions:

```javascript
const weightFactor = Math.min(width, height) / 1200;
```

**How it works:**
1. **Screen-responsive scaling**: The scaling factor is calculated as the smaller dimension (width or height) divided by 1200
   - On a 1920x1080 screen: `weightFactor = 1080 / 1200 = 0.9`
   - On a mobile 375x667 screen: `weightFactor = 375 / 1200 = 0.31`

2. **Word frequency multiplication**: Each word's frequency count is multiplied by the weight factor
   - Word "the" (frequency: 320) → `320 × 0.9 = 288px` font size on desktop
   - Word "the" (frequency: 320) → `320 × 0.31 = 99px` font size on mobile

3. **Automatic bounds**: The WordCloud library automatically enforces minimum size (`minSize: 10`) to ensure readability

**Benefits of this approach:**
- **Proportional scaling**: Higher frequency words are always larger than lower frequency words
- **Responsive design**: Font sizes automatically adapt to different screen sizes
- **Prevents overflow**: Smaller screens get proportionally smaller text to fit more words
- **Consistent ratios**: The relative size differences between words remain constant across devices

**Example calculation for common words:**
```
Screen: 1200x800 (weightFactor = 800/1200 = 0.67)
- "the" (320 freq) → 320 × 0.67 = 214px
- "of" (180 freq) → 180 × 0.67 = 121px  
- "and" (165 freq) → 165 × 0.67 = 111px
- "like" (2 freq) → 2 × 0.67 = 1px → clamped to minSize: 10px
```

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with `npm run docker:dev`
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
