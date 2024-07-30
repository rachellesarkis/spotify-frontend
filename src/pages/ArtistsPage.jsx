import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ArtistCard from "../components/ArtistCard";
import "../styles/artists.css";
import { ArrowLeft } from "../assets/ArrowLeft";
import { capitalizeEachLetter } from "../utils/capitalizeString";

export const ArtistsPage = () => {
  const { genre } = useParams();
  const navigate = useNavigate();
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const fetchGenreData = () => {
      const storedData = localStorage.getItem("genreArtists");
      if (storedData) {
        const genreArtists = JSON.parse(storedData);
        const genreData = genreArtists.find((item) => item.genre === genre);

        if (genreData) {
          setArtists(genreData.artists);
        } else {
          navigate("/");
        }
      } else {
        navigate("/");
      }
    };

    fetchGenreData();
  }, [genre, navigate]);

  const navigateToGenresPage = () => {
    navigate("/");
  };

  const navigateToChatPage = (artist) => {
    localStorage.setItem("artistToChat", JSON.stringify(artist));
    navigate(`/chat/${encodeURIComponent(artist.id)}`);
  };

  const handleKeyDown = (event, artist) => {
    if (event.key === "Enter") {
      navigateToChatPage(artist);
    }
  };

  return (
    <div className="artists-page">
      <div className="artists-navbar">
        <div className="artists-navigate-back" onClick={navigateToGenresPage}>
          <ArrowLeft />
        </div>
        <h1 className="artists-title">Genre / {capitalizeEachLetter(genre)}</h1>
      </div>
      <div className="artists-list">
        {artists.length > 0 ? (
          artists.map((artist, index) => (
            <div
              key={index}
              className="artist-card"
              onClick={() => navigateToChatPage(artist)}
              tabIndex={0}
              onKeyDown={(event) => handleKeyDown(event, artist)}
            >
              <ArtistCard artist={artist} />
            </div>
          ))
        ) : (
          <p className="artists-not-found">No artists found for this genre.</p>
        )}
      </div>
    </div>
  );
};
