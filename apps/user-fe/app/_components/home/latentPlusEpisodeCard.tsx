import { cn } from "@repo/ui/utils";
import Image from "next/image";
import { figtree } from "../../lib/fonts";
import { latentEpisode, premiumLock } from "../../assets";

export function LatentPlusEpisodeCard({ className }: { className?: string }) {
  return (
    <div
      className={cn("relative rounded-2xl overflow-hidden group", className)}
    >
      {/* Lock overlay */}
      <div className="absolute inset-0 bg-black/60 z-10 flex items-center justify-center">
        <Image aria-hidden src={premiumLock} alt="latentPremium" />
      </div>

      <Image
        src={latentEpisode}
        alt="Episode Thumbnail"
        width={400}
        height={225}
        className="object-cover w-full aspect-[16/9]"
      />
      <div className="mt-4">
        <p className={cn("text-neutral-50 text-lg", figtree.className)}>
          India&apos;s Got Latent ft. @Ashish Chanchalani, @Beer Biceps, @Rebel
          Kid
        </p>
      </div>
    </div>
  );
}
