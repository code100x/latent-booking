"use client";
import { useState } from "react";
import { Dialog, DialogContent } from "@repo/ui/dialog";
import { PremiumFeatures } from "./home/premiumFeature";
import { Carousel } from "./carousel";
import { LatentPlusEpisodeCard } from "./home/latentPlusEpisodeCard";

export const premiumEpisodes = [
  {
    title:
      "India's Got Latent ft. Ashish Chanchlani, Beer Biceps, Rebel Kid | EP 1",
    thumbnail: "https://m.media-amazon.com/images/M/MV5BNDViYTM1MDUtZjZlZi00YTEyLWFiNmYtZGQ0Yjk0Mzk3MmY0XkEyXkFqcGc@._V1_.jpg",
    slug: "episode-1",
    videoUrl: "https://m.media-amazon.com/images/M/MV5BNDViYTM1MDUtZjZlZi00YTEyLWFiNmYtZGQ0Yjk0Mzk3MmY0XkEyXkFqcGc@._V1_.jpg",
  },
  {
    title: "India's Got Latent ft. Tanmay Bhat, CarryMinati | EP 2",
    thumbnail: "https://m.media-amazon.com/images/M/MV5BNDViYTM1MDUtZjZlZi00YTEyLWFiNmYtZGQ0Yjk0Mzk3MmY0XkEyXkFqcGc@._V1_.jpg",
    slug: "episode-2",
    videoUrl: "https://m.media-amazon.com/images/M/MV5BNDViYTM1MDUtZjZlZi00YTEyLWFiNmYtZGQ0Yjk0Mzk3MmY0XkEyXkFqcGc@._V1_.jpg",
  },
  {
    title: "India's Got Latent ft. Zakir Khan, BB Ki Vines | EP 3",
    thumbnail: "https://m.media-amazon.com/images/M/MV5BNDViYTM1MDUtZjZlZi00YTEyLWFiNmYtZGQ0Yjk0Mzk3MmY0XkEyXkFqcGc@._V1_.jpg",
    slug: "episode-3",
    videoUrl: "https://m.media-amazon.com/images/M/MV5BNDViYTM1MDUtZjZlZi00YTEyLWFiNmYtZGQ0Yjk0Mzk3MmY0XkEyXkFqcGc@._V1_.jpg",
  },
  {
    title: "India's Got Latent ft. Harsh Gujral, Technical Guruji | EP 4",
    thumbnail: "https://m.media-amazon.com/images/M/MV5BNDViYTM1MDUtZjZlZi00YTEyLWFiNmYtZGQ0Yjk0Mzk3MmY0XkEyXkFqcGc@._V1_.jpg",
    slug: "episode-4",
    videoUrl: "https://m.media-amazon.com/images/M/MV5BNDViYTM1MDUtZjZlZi00YTEyLWFiNmYtZGQ0Yjk0Mzk3MmY0XkEyXkFqcGc@._V1_.jpg",
  },
  {
    title: "India's Got Latent ft. Anubhav Bassi, Flying Beast | EP 5",
    thumbnail: "https://m.media-amazon.com/images/M/MV5BNDViYTM1MDUtZjZlZi00YTEyLWFiNmYtZGQ0Yjk0Mzk3MmY0XkEyXkFqcGc@._V1_.jpg",
    slug: "episode-5",
    videoUrl: "https://m.media-amazon.com/images/M/MV5BNDViYTM1MDUtZjZlZi00YTEyLWFiNmYtZGQ0Yjk0Mzk3MmY0XkEyXkFqcGc@._V1_.jpg",
  },
];

export function LatentPlusEpisodes() {
  const [isPremiumFeaturesOpen, setIsPremiumFeaturesOpen] = useState(false);
  return (
    <>
      <Carousel
        title="Latent+ Episodes"
        titleClassName="text-[#F8D48D]"
        itemClassName="gap-3 [&>*]:cursor-pointer"
      >
        {premiumEpisodes.map((episode) => (
          <LatentPlusEpisodeCard key={episode.slug} {...episode} />
        ))}
      </Carousel>
      <Dialog
        open={isPremiumFeaturesOpen}
        onOpenChange={setIsPremiumFeaturesOpen}
      >
        <DialogContent>
          <PremiumFeatures />
        </DialogContent>
      </Dialog>
    </>
  );
}
