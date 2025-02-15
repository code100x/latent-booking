import { cn } from "@repo/ui/utils";
import Image from "next/image";
import { OrignalStar } from "../../_assets/stars";

interface StarCardProps {
  name: string;
  image: any;
}
export function StarCard({ name, image: ImageComponent }: StarCardProps) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative aspect-square w-full">
        <div className="absolute z-10">
          <Image src={OrignalStar} alt="Original Star" priority />
          <Image
            src={ImageComponent}
            alt={name}
            fill
            className="object-contain"
            style={{
              clipPath: `url(${OrignalStar.src})`,
              WebkitClipPath: `url(${OrignalStar.src})`,
            }}
            priority
          />
        </div>
      </div>

      <p className={cn("text-primary text-center text-lg font-bold")}>{name}</p>
    </div>
  );
}
