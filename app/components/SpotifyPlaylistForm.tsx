import React, { useState, FormEvent } from "react";

interface SpotifyPlaylistFormProps {
  onSubmit: (playlistId: string) => void;
}

const SpotifyPlaylistForm: React.FC<SpotifyPlaylistFormProps> = ({
  onSubmit,
}) => {
  const [playlistLink, setPlaylistLink] = useState<string>("");

  const extractPlaylistId = (link: string): string | null => {
    const match = link.match(/playlist\/([a-zA-Z0-9]+)/);
    return match ? match[1] : null;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const playlistId = extractPlaylistId(playlistLink);
    if (playlistId) {
      onSubmit(playlistId);
    } else {
      alert("Invalid Spotify playlist link");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full mx-auto">
      <div className="">
        <input
          type="text"
          value={playlistLink}
          onChange={(e) => setPlaylistLink(e.target.value)}
          placeholder="Paste Spotify playlist link here"
          className="px-4 py-2 mb-5 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          type="submit"
          className="bg-white mb-5 opacity-95 font-manrope text-h6 font-bold p-2 rounded-xl px-4 w-full"
        >
          Generate Player
        </button>
      </div>
    </form>
  );
};

export default SpotifyPlaylistForm;
