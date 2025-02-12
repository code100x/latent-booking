import { EpisodeCard } from "./home/episodeCard";
import { Carousel } from "./carousel";

const episodes = [
  {
    title: "India's Got Latent ft. Ashish Chanchlani | EP 1",
    thumbnail:
      "https://m.media-amazon.com/images/M/MV5BNDViYTM1MDUtZjZlZi00YTEyLWFiNmYtZGQ0Yjk0Mzk3MmY0XkEyXkFqcGc@._V1_.jpg",
    episodeNumber: 1,
    youtubeId: "Ry2sHFGQXzI",
  },
  {
    title: "India's Got Latent ft. Tanmay Bhat | EP 2",
    thumbnail:
      "https://m.media-amazon.com/images/M/MV5BNDViYTM1MDUtZjZlZi00YTEyLWFiNmYtZGQ0Yjk0Mzk3MmY0XkEyXkFqcGc@._V1_.jpg",
    episodeNumber: 2,
    youtubeId: "Ry2sHFGQXzI",
  },
  {
    title: "India's Got Latent ft. Zakir Khan | EP 3",
    thumbnail:
      "https://m.media-amazon.com/images/M/MV5BNDViYTM1MDUtZjZlZi00YTEyLWFiNmYtZGQ0Yjk0Mzk3MmY0XkEyXkFqcGc@._V1_.jpg",
    episodeNumber: 3,
    youtubeId: "Ry2sHFGQXzI",
  },
  {
    title: "India's Got Latent ft. Harsh Gujral | EP 4",
    thumbnail:
      "https://m.media-amazon.com/images/M/MV5BNDViYTM1MDUtZjZlZi00YTEyLWFiNmYtZGQ0Yjk0Mzk3MmY0XkEyXkFqcGc@._V1_.jpg",
    episodeNumber: 4,
    youtubeId: "Ry2sHFGQXzI",
  },
  {
    title: "India's Got Latent ft. Anubhav Bassi | EP 5",
    thumbnail:
      "https://m.media-amazon.com/images/M/MV5BNDViYTM1MDUtZjZlZi00YTEyLWFiNmYtZGQ0Yjk0Mzk3MmY0XkEyXkFqcGc@._V1_.jpg",
    episodeNumber: 5,
    youtubeId: "Ry2sHFGQXzI",
  },
];

export function LatentEpisodes() {
  return (
    <Carousel
      title="Latent Episodes"
      itemClassName="gap-3 [&>*]:cursor-pointer"
    >
      {episodes.map((episode) => (
        <EpisodeCard key={episode.episodeNumber} {...episode} />
      ))}
    </Carousel>
  );
}
