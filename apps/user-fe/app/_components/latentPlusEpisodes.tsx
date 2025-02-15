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
    thumbnail: "https://files.vidstack.io/sprite-fight/poster.webp",
    slug: "episode-1",
    videoUrl: "https://files.vidstack.io/sprite-fight/poster.webp",
  },
  {
    title: "India's Got Latent ft. Tanmay Bhat, CarryMinati | EP 2",
    thumbnail: "https://files.vidstack.io/sprite-fight/poster.webp",
    slug: "episode-2",
    videoUrl: "https://files.vidstack.io/sprite-fight/poster.webp",
  },
  {
    title: "India's Got Latent ft. Zakir Khan, BB Ki Vines | EP 3",
    thumbnail: "https://files.vidstack.io/sprite-fight/poster.webp",
    slug: "episode-3",
    videoUrl: "https://files.vidstack.io/sprite-fight/poster.webp",
  },
  {
    title: "India's Got Latent ft. Harsh Gujral, Technical Guruji | EP 4",
    thumbnail: "https://files.vidstack.io/sprite-fight/poster.webp",
    slug: "episode-4",
    videoUrl: "https://files.vidstack.io/sprite-fight/poster.webp",
  },
  {
    title: "India's Got Latent ft. Anubhav Bassi, Flying Beast | EP 5",
    thumbnail: "https://files.vidstack.io/sprite-fight/poster.webp",
    slug: "episode-5",
    videoUrl: "https://files.vidstack.io/sprite-fight/poster.webp",
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
