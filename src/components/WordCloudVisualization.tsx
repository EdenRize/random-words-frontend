import { useEffect, useRef } from "react";
import WordCloud from "wordcloud";

interface WordCloudVisualizationProps {
  wordsData: Record<string, number>;
}

function WordCloudVisualization({ wordsData }: WordCloudVisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (Object.keys(wordsData).length > 0) {
      setCanvasWordCloud();
    }
  }, [wordsData]);

  const setCanvasWordCloud = () => {
    if (!canvasRef.current) return;

    const padding = 100;
    const width = window.innerWidth - padding;
    const height = window.innerHeight - padding;
    canvasRef.current.width = width;
    canvasRef.current.height = height;

    const minCount = Math.min(...Object.values(wordsData));
    const maxCount = Math.max(...Object.values(wordsData));

    const MIN_FONT = 15;
    const MAX_FONT = 100;

    const isSameCount = minCount === maxCount;
    const averageFontSize = (MIN_FONT + MAX_FONT) / 2;
    const fontRange = MAX_FONT - MIN_FONT;
    const countRange = maxCount - minCount;

    const wordList: [string, number][] = Object.entries(wordsData).map(
      ([word, count]) => {
        const fontSize = isSameCount
          ? averageFontSize
          : MIN_FONT + ((count - minCount) / countRange) * fontRange;
        return [word, fontSize];
      },
    );

    WordCloud(canvasRef.current, {
      list: wordList,
      gridSize: Math.round((6 * width) / 1024),
      weightFactor: (fontSize) => fontSize,
      fontFamily: "Arial, sans-serif",
      color: () => {
        const hue = Math.floor(Math.random() * 360);
        return `hsl(${hue}, 70%, 50%)`;
      },
      backgroundColor: "#ffffff",
      rotateRatio: 0.1,
      rotationSteps: 2,
      drawOutOfBound: false,
      shrinkToFit: true,
      clearCanvas: true,
    });
  };

  return <canvas ref={canvasRef} className="w-full h-full bg-white" />;
}

export default WordCloudVisualization;
