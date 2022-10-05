import { useState } from "react";
import "./Search.css";

function App() {
  const [loading, setLoading] = useState();
  const [results, setResults] = useState();
  const [error, setError] = useState();

  const handleChange = () => {
    const options = {
      method: "GET",
    };
    // todo když user dopíše a fetch ještě nevrátí result nebo chybu, tak nasetovat loading
    fetch("https://api.chucknorris.io/jokes/random", options)
      .then((res) => res.json())
      .then((res) => {
        setResults(res);
      })
      .catch((err) => {
        setError(err);
      });
  };

  return (
    <div className="search">
      <input type="text" onChange={handleChange} />
      {results && <div className="results">{results?.value}</div>}
    </div>
  );
}

export default App;
