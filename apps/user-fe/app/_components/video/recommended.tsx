import { EpisodeCard } from "../home/episodeCard";

export function RecommendedVideos() {
  // Reference to your existing episodes data
  const episodes = [
    {
      title: "India's Got Latent ft. Tanmay Bhat | EP 2",
      thumbnail: "https://files.vidstack.io/sprite-fight/poster.webp",
      episodeNumber: 1,
      youtubeId: "Ry2sHFGQXzI",
    },
    {
      title: "India's Got Latent ft. Tanmay Bhat | EP 2",
      thumbnail: "https://files.vidstack.io/sprite-fight/poster.webp",
      episodeNumber: 2,
      youtubeId: "Ry2sHFGQXzI",
    },
    {
      title: "India's Got Latent ft. Zakir Khan | EP 3",
      thumbnail: "https://files.vidstack.io/sprite-fight/poster.webp",
      episodeNumber: 3,
      youtubeId: "Ry2sHFGQXzI",
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Recommended</h3>
      <div className="flex flex-col gap-4">
        {episodes.map((episode) => (
          <EpisodeCard
            key={episode.episodeNumber}
            {...episode}
            className="!min-w-0"
          />
        ))}
      </div>
    </div>
  );
}
