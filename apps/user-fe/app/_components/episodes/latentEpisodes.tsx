import { cn } from "@repo/ui/utils";
import { manrope } from "../../lib/fonts";
import { EpisodeCard } from "../home/episodeCard";

export default function EpisodesLatent() {
  return (
    <div className="mt-16">
      <div className="flex items-center justify-between mb-8">
        <h2
          className={cn(
            "text-neutral-50 text-3xl font-bold",
            manrope.className
          )}
        >
          Latent Episodes
        </h2>
        <button className="text-neutral-50 ">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 18L15 12L9 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <EpisodeCard />
        <EpisodeCard />
        <EpisodeCard />
        <EpisodeCard />
        <EpisodeCard />
        <EpisodeCard />
      </div>
    </div>
  );
}
