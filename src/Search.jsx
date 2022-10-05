import { useEffect, useState } from "react";
import "./Search.css";

function App() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(false);

  const handleQueryChange = () => {
    const options = {
      method: "GET",
    };
    fetch("https://api.chucknorris.io/jokes/random", options)
      .then((res) => res.json())
      .then((res) => {
        setLoading(false);
        setResults(res);
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  };

  useEffect(() => {
    if (query !== "") {
      setLoading(true);
      const getData = setTimeout(() => {
        handleQueryChange();
      }, 1000);
      return () => clearTimeout(getData);
    } else {
      setLoading(false);
      setResults(null);
    }
  }, [query]);

  return (
    <div className="search">
      <input type="text" onChange={(e) => setQuery(e.target.value)} />
      {loading && <div className="loading">Hledám...</div>}
      {error && <div className="error">Nenalezen žádný výsledek.</div>}
      {results && !loading && !error && (
        <div className="results">{results?.value}</div>
      )}
    </div>
  );
}

export default App;
