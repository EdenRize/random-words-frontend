import { useState, useEffect } from "react";
import { getRandomWordsMap } from "./services/random-words.service";
import WordCloudVisualization from "./components/WordCloudVisualization";
import ErrorMessage from "./components/ErrorMessage";
import LoadingSpinner from "./components/LoadingSpinner";

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
    <div className="flex p-4 justify-center items-center min-h-screen">
      {loading && <LoadingSpinner message="Loading words..." />}

      {error && <ErrorMessage message={error} onRetry={fetchWordsData} />}

      {!loading && !error && wordsData && (
        <WordCloudVisualization wordsData={wordsData} />
      )}
    </div>
  );
}

export default App;
