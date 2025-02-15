import {
  MediaPlayer,
  MediaProvider,
  PlayButton,
  Slider,
} from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import { Poster } from "@vidstack/react";
import { Controls } from "@vidstack/react";
import { PauseIcon, PlayIcon } from "lucide-react";
import { FullscreenExitIcon, FullscreenIcon } from "@vidstack/react/icons";
import { FullscreenButton } from "@vidstack/react";

export default function VideoPlayer() {
  return (
    <MediaPlayer
      title="Sprite Fight"
      src="https://files.vidstack.io/sprite-fight/720p.mp4"
      playsInline
      className="!rounded-xl overflow-hidden"
    >
      <MediaProvider />
      <DefaultVideoLayout
        thumbnails="https://files.vidstack.io/sprite-fight/thumbnails.vtt"
        icons={defaultLayoutIcons}
      />
      <Poster
        className="vds-poster"
        src="https://files.vidstack.io/sprite-fight/poster.webp"
        alt="Girl walks into campfire with gnomes surrounding her friend ready for their next meal!"
      />
    </MediaPlayer>
  );
}
