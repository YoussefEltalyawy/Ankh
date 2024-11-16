import { cn } from "@nextui-org/theme";
import { X } from "lucide-react";
import SpotifyPlaylistForm from "./SpotifyPlaylistForm";
import { useState } from "react";
import SpotifyPlaylistEmbed from "./SpotifyPlaylistEmbed";

interface MusicProps {
  isOpen: boolean;
}

function Music({ isOpen }: MusicProps) {
  const [playlistId, setPlaylistId] = useState<string>(
    "37i9dQZF1DX4hpot8sYudB"
  );

  const handleSubmit = (id: string) => {
    setPlaylistId(id);
  };

  return (
    <div
      className={cn(
        "bg-black h-full fixed left-0 w-full sm:w-[80vw] md:w-[50vw] lg:w-[30vw] transition-transform duration-300 ease-in-out z-10",
        isOpen ? "translate-x-[0%]" : "translate-x-[-100%]"
      )}
    >
      <div className="relative">
        <button
          onClick={() => {
            const overlay = document.querySelector(".bg-black.bg-opacity-50");
            if (overlay) {
              (overlay as HTMLElement).click();
            }
          }}
          className="absolute right-4 top-4 p-2 sm:hidden text-white hover:bg-white/10 rounded-full transition-colors"
          aria-label="Close music sidebar"
        >
          <X size={24} />
        </button>

        <h1 className="text-white text-xl sm:text-2xl md:text-3xl text-center mt-4 sm:mt-6 md:mt-9">
          Music
        </h1>
      </div>

      <div className="p-4 sm:p-6 md:p-10">
        <SpotifyPlaylistForm onSubmit={handleSubmit} />
        <SpotifyPlaylistEmbed playlistId={playlistId} />
      </div>
    </div>
  );
}

export default Music;
