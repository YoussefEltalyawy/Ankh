import { MoreHorizontal } from "lucide-react";
import SpotifyPlaylistEmbed from "../SpotifyPlaylistEmbed";

type MusicProps = {
  visible: boolean;
  opacity: number;
  playlistId: string;
};
function Music({
  visible,
  opacity,
  playlistId
} : MusicProps) {
if (!visible) return null;

return (
  <div
    data-swapy-item="first"
    className={`
        card bg-[rgba(255,255,255,0.09)] px-[16px] py-[16px] rounded-3xl
        border border-[rgba(255,255,255,.1)] backdrop-blur-[5.7px] transition-opacity duration-300 ease-in-out
        ${opacity === 100 ? "opacity-100" : "opacity-0"}
        flex flex-col h-full max-h-[440px] overflow-hidden
      `}
  >
    <div className="">
      <SpotifyPlaylistEmbed playlistId={playlistId} />
    </div>
  </div>
);
}
export default Music;