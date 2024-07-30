import React from "react";
import { formatNumber } from "../utils/formatNumber";

const ArtistCard = ({ artist }) => {
  return (
    <>
      <img
        src={artist.images[0]?.url}
        alt={artist.name}
        className="artist-image"
      />
      <div className="artist-info">
        <h2 className="artist-name">{artist.name}</h2>
        <p className="artist-followers">
          {formatNumber(artist.followers.total)} followers
        </p>
        <p className="artist-popularity">{artist.popularity}</p>
      </div>
    </>
  );
};

export default ArtistCard;
