import { useEffect, useRef } from "react";
import WordCloud from "wordcloud";

interface WordCloudVisualizationProps {
  wordsData: Record<string, number>;
  width?: number;
  height?: number;
}

function WordCloudVisualization({
  wordsData,
  width = 800,
  height = 600,
}: WordCloudVisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const wordList: [string, number][] = Object.entries(wordsData).map(
        ([word, count]) => [word, count] as [string, number],
      );

      WordCloud(canvasRef.current, {
        list: wordList,
        gridSize: Math.round((16 * canvasRef.current.width) / 1024),
        weightFactor: 5,
        fontFamily: "Arial, sans-serif",
        color: function () {
          const hue = Math.floor(Math.random() * 360);
          return `hsl(${hue}, 70%, 50%)`;
        },
        backgroundColor: "#ffff",
        rotateRatio: 0.3,
        rotationSteps: 2,
        minSize: 12,
        drawOutOfBound: false,
        shrinkToFit: true,
      });
    }
  }, [wordsData]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{
        maxWidth: "100%",
        maxHeight: "100%",
        backgroundColor: "#ffff",
      }}
    />
  );
}

export default WordCloudVisualization;
