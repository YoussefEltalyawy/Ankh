import React from "react";

interface SpotifyPlaylistEmbedProps {
  playlistId: string;
}

const SpotifyPlaylistEmbed: React.FC<SpotifyPlaylistEmbedProps> = ({
  playlistId,
}) => {
  return (
    <div className="max-w-md mx-auto">
      <iframe
        src={`https://open.spotify.com/embed/playlist/${playlistId}`}
        width="100%"
        height="152"
        frameBorder="0"
        allowTransparency={true}
        allow="encrypted-media"
        className="rounded-md shadow-md"
      ></iframe>
    </div>
  );
};

export default SpotifyPlaylistEmbed;
