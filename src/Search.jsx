import { useEffect, useState } from "react";
import { mockResults } from "./mockResults";
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
        setResults(mockResults.results);
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

  console.log("results", results);

  return (
    <>
      <input type="text" onChange={(e) => setQuery(e.target.value)} />
      {error && <div className="error">Nenalezen žádný výsledek.</div>}
      {!error && (results || loading) && (
        <div className="results">
          {loading && <span className="loading">Vyhledávám...</span>}
          {!loading &&
            results?.map(({ title, price, image, category, link }, index) => {
              return (
                <>
                  <a href={link} key={index} className="item">
                    <img src={image} alt={image} className="item-image" />
                    <h5 className="item-title">{title}</h5>
                    <span className="item-category">{category}</span>
                    <span className="item-price">{price}</span>
                    <span className="item-currency">
                      {mockResults.currency}
                    </span>
                  </a>
                </>
              );
            })}
        </div>
      )}
    </>
  );
}

export default App;
