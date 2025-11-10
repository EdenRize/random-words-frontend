import { useState, useEffect } from "react";
import { getRandomWordsMap } from "./services/random-words.service";
import WordCloudVisualization from "./components/WordCloudVisualization";

function App() {
  const [wordsData, setWordsData] = useState<Record<string, number> | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchWordsData();
  }, []);

  const fetchWordsData = async () => {
    if (loading) return;
    try {
      setLoading(true);
      setError(null);
      const data = await getRandomWordsMap();
      if (data) {
        setWordsData(data);
      } else {
        setError("Failed to load words data");
      }
    } catch (err) {
      setError("An error occurred while loading data");
    } finally {
      setLoading(false);
    }
  };

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
      {loading && (
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              border: "4px solid #f3f3f3",
              borderTop: "4px solid #3498db",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "0 auto 20px",
            }}
          />
          <p>Loading words...</p>
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      )}

      {error && (
        <div style={{ textAlign: "center", color: "red" }}>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: "10px 20px",
              backgroundColor: "#3498db",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Retry
          </button>
        </div>
      )}

      {!loading && !error && wordsData && (
        <WordCloudVisualization wordsData={wordsData} />
      )}
    </div>
  );
}

export default App;
