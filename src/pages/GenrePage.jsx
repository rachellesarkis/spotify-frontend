import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/genre.css";
import { getGenres, getArtistsByGenre } from "../utils/apiService";
import { capitalizeEachLetter } from "../utils/capitalizeString";

export const GenrePage = () => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  const handleGenreClick = async (genre) => {
    try {
      const storedArtists = localStorage.getItem("genreArtists");
      let genreArtists = storedArtists ? JSON.parse(storedArtists) : [];
      const existingGenre = genreArtists.find((item) => item.genre === genre);
      if (existingGenre) {
        navigate(`/artists/${encodeURIComponent(genre)}`);
      } else {
        const data = await getArtistsByGenre(genre);
        genreArtists.push({ genre, artists: data });
        localStorage.setItem("genreArtists", JSON.stringify(genreArtists));
        navigate(`/artists/${encodeURIComponent(genre)}`);
      }
    } catch (err) {
      setError("Failed to fetch artists");
    }
  };

  return (
    <div className="genre-page">
      {loading && <p className="genre-loading-message">Loading...</p>}
      {error && <p className="genre-error-message">{error}</p>}
      {!loading && !error && (
        <div className="genre-container">
          <h1 className="genre-title">Pick your genre</h1>
          <div className="genre-list">
            {genres.map((genre, index) => (
              <button
                key={index}
                className="genre-item"
                onClick={() => handleGenreClick(genre)}
              >
                {capitalizeEachLetter(genre)}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
