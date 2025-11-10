import { useEffect, useRef } from "react";
import WordCloud from "wordcloud";

interface WordCloudVisualizationProps {
  wordsData: Record<string, number>;
}

function WordCloudVisualization({ wordsData }: WordCloudVisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setCanvasWordCloud();
  }, [wordsData, canvasRef]);

  const setCanvasWordCloud = () => {
    if (!canvasRef.current) {
      return;
    }

    const padding = 100;
    const width = window.innerWidth - padding;
    const height = window.innerHeight - padding;
    canvasRef.current.width = width;
    canvasRef.current.height = height;

    const wordList: [string, number][] = Object.entries(wordsData).map(
      ([word, count]) => [word, count] as [string, number],
    );

    WordCloud(canvasRef.current, {
      list: wordList,
      gridSize: Math.round((6 * width) / 1024),
      weightFactor: Math.min(width, height) / 1200,
      fontFamily: "Arial, sans-serif",
      color: function () {
        const hue = Math.floor(Math.random() * 360);
        return `hsl(${hue}, 70%, 50%)`;
      },
      backgroundColor: "#ffffff",
      rotateRatio: 0.1,
      rotationSteps: 2,
      minSize: 10,
      drawOutOfBound: false,
      shrinkToFit: true,
      clearCanvas: true,
    });
  };

  return <canvas ref={canvasRef} className="w-full h-full bg-white" />;
}

export default WordCloudVisualization;
