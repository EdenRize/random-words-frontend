import { useLayoutEffect, useRef } from "react";
import { randomWordsMap } from "./randomWordsMap";
import WordCloud from "wordcloud";

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useLayoutEffect(() => {
    if (canvasRef.current) {
      const wordList: [string, number][] = Object.entries(randomWordsMap).map(
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
        backgroundColor: "#f5f5f5",
        rotateRatio: 0.3,
        rotationSteps: 2,
        minSize: 12,
        drawOutOfBound: false,
        shrinkToFit: true,
      });
    }
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#ffff",
      }}
    >
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
          backgroundColor: "#ffff",
        }}
      />
    </div>
  );
}

export default App;
