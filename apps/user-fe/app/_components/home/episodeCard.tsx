import { cn } from "@repo/ui/utils";
import Image from "next/image";
import { figtree } from "../../lib/fonts";
import { latentEpisode } from "../../assets";

export function EpisodeCard({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-4", className)}>
      {/* Image Container with Full Rounded Corners */}
      <div className="relative rounded-[24px] overflow-hidden ">
        <Image
          src={latentEpisode}
          alt="Episode Thumbnail"
          width={400}
          height={225}
          className="object-cover w-full aspect-[16/9] border-[#f8d48d]  border-opacity-25 border-2"
        />
        {/* Episode Number Badge */}
      </div>

      {/* Title Text */}
      <p className={cn("text-neutral-50 text-lg", figtree.className)}>
        India&apos;s Got Latent ft. @Ashish Chanchalani, @Beer Biceps, @Rebel
        Kid
      </p>
    </div>
  );
}
