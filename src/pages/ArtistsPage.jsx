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

  return (
    <div className="artists-page">
      <div className="artists-navbar">
        <div className="artists-navigate-back" onClick={navigateToGenresPage}>
          <ArrowLeft />
        </div>
        <h1 className="artists-title">Genre / {capitalizeEachLetter(genre)}</h1>
      </div>
      <div className="artists-list">
        {artists.map((artist, index) => (
          <div key={index} className="artist-card">
            <ArtistCard artist={artist} />
          </div>
        ))}
      </div>
    </div>
  );
};
