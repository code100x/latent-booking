import { cn } from "@repo/ui/utils";
import { manrope } from "../../lib/fonts";
import { LatentPlusEpisodeCard } from "./latentPlusEpisodeCard";

export function LatentPlusEpisodes() {
  return (
    <div className="mt-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className={cn("font-bold", manrope.className)}>
          <span className="text-3xl text-[#F8D48D]">Latent+ Episodes</span>
        </h2>
        <button className="text-neutral-50">
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
        <LatentPlusEpisodeCard />
        <LatentPlusEpisodeCard />
        <LatentPlusEpisodeCard />
      </div>
    </div>
  );
}
