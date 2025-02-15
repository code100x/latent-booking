import { IMAGES } from "@/app/_assets";
import { cn } from "@repo/ui/utils";
import { LockIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface LatentPlusEpisodeCardProps {
  className?: string;
  slug?: string;
  title?: string;
  thumbnail?: string;
}

export function LatentPlusEpisodeCard({
  className,
  slug = "episode-1",
  title = "India's Got Latent ft. @Ashish Chanchalani, @Beer Biceps, @Rebel Kid",
  thumbnail = "https://picsum.photos/id/2/1920/1080",
}: LatentPlusEpisodeCardProps) {
  return (
    <Link href={`/episodes/${slug}`}>
      <div
        className={cn(
          "relative overflow-hidden group cursor-pointer min-w-[340px]",
          className
        )}
      >
        <div className="relative flex items-center justify-center rounded-2xl overflow-hidden">
          <LockIcon className="size-6 text-[#F8D48D] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[1]" />
          <div className="absolute inset-0 bg-black/60 flex" />
          <Image
            src={thumbnail}
            alt={title}
            width={400}
            height={225}
            className="object-cover w-full aspect-[16/9]"
          />
        </div>
        <div className="mt-4">
          <p className={cn("text-neutral-50 line-clamp-2")}>{title}</p>
        </div>
      </div>
    </Link>
  );
}
