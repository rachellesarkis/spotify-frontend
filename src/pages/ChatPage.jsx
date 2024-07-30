import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft } from "../assets/ArrowLeft";
import { formatNumber } from "../utils/formatNumber";

import "../styles/chat.css";

export const ChatPage = () => {
  const { artistId } = useParams();
  const navigate = useNavigate();
  const [artist, setArtist] = useState(null);

  useEffect(() => {
    const getArtistData = () => {
      const storedData = localStorage.getItem("artistToChat");
      if (storedData) {
        const artistData = JSON.parse(storedData);
        setArtist(artistData);
      } else {
        navigate("/");
      }
    };

    getArtistData();
  }, [navigate]);

  const navigateToGenresPage = () => {
    console.log(artistId);
    navigate("/");
  };

  return (
    <div className="chat-page">
      <div className="chat-navbar">
        <div className="chat-navigate-back" onClick={navigateToGenresPage}>
          <ArrowLeft />
        </div>
        {artist && (
          <>
            <img
              src={artist.images[0]?.url}
              alt={artist.name}
              className="chat-artist-image"
            />
            <div>
              <p className="chat-artist-name">{artist.name}</p>
              <p className="chat-artist-followers">
                {formatNumber(artist.followers.total)} followers
              </p>
            </div>
            <p className="chat-artist-popularity">{artist.popularity}</p>
          </>
        )}
      </div>
    </div>
  );
};
