import { cn } from "@nextui-org/theme";
import SpotifyPlaylistForm from "../SpotifyPlaylistForm";
import { useState } from "react";
import SpotifyPlaylistEmbed from "../SpotifyPlaylistEmbed";

interface MusicProps {
  isOpen: boolean;
}

function Music({ isOpen }: MusicProps) {
  const [playlistId, setPlaylistId] = useState<string>(
    "0vvXsWCC9xrXsKd4FyS8kM"
  );
  const handleSubmit = (id: string) => {
    setPlaylistId(id);
  };

  return (
    <div
      className={cn(
        "bg-black h-full absolute left-0 w-[30vw] transition-transform duration-300 ease-in-out z-10",
        isOpen ? "translate-x-[0%]" : "translate-x-[-100%]"
      )}
    >
      <h1 className="text-white text-h2 text-center mt-10">Music</h1>
      <div className="p-10">
        <SpotifyPlaylistForm onSubmit={handleSubmit} />
        <SpotifyPlaylistEmbed playlistId={playlistId}/>
      </div>
    </div>
  );
}

export default Music;
