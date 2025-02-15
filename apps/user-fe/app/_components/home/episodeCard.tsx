import { cn } from "@repo/ui/utils";
import Image from "next/image";
import Link from "next/link";

interface EpisodeCardProps {
  className?: string;
  title: string;
  thumbnail: string;
  episodeNumber: number;
  youtubeId: string;
}

export function EpisodeCard({
  className,
  title,
  thumbnail,
  episodeNumber,
  youtubeId,
}: EpisodeCardProps) {
  return (
    <Link href={`https://youtube.com/watch?v=${youtubeId}`} target="_blank">
      <div
        className={cn(
          "flex flex-col gap-2 min-w-[340px] w-full md:max-w-[340px] group",
          className
        )}
      >
        <div className="relative overflow-hidden aspect-[16/9] rounded-2xl">
          <Image
            src={thumbnail}
            alt={title}
            width={400}
            height={225}
            className="object-cover w-full transition-transform duration-300"
          />
          <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-md">
            <span className="text-sm font-medium">EP {episodeNumber}</span>
          </div>
        </div>

        <p
          className={cn(
            "text-neutral-50 line-clamp-2 group-hover:text-[#F8D48D] transition-colors"
          )}
        >
          {title}
        </p>
      </div>
    </Link>
  );
}
