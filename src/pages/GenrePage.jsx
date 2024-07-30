import { useEffect, useState } from "react";

import "../styles/genre.css";
import { getGenres } from "../utils/apiService";

export const GenrePage = () => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGenres = async () => {
      const storedGenres = localStorage.getItem("genres");
      if (storedGenres) {
        setGenres(JSON.parse(storedGenres));
        setLoading(false);
      } else {
        try {
          const data = await getGenres();
          setGenres(data);
          localStorage.setItem("genres", JSON.stringify(data));
        } catch (err) {
          setError("Failed to fetch genres");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchGenres();
  }, []);

  return (
    <div className="genre-page">
      {loading && <p className="genre-loading-message">Loading...</p>}
      {error && <p className="genre-error-message">{error}</p>}
      {!loading && !error && (
        <div className="genre-container">
          <p className="genre-title">Pick your genre</p>
          <div className="genre-list">
            {genres.map((genre, index) => (
              <button key={index} className="genre-item">
                {genre}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
