import { cn } from "@repo/ui/utils";
import Image from "next/image";
import { figtree, luckiestGuy } from "../../lib/fonts";
import { OrignalStar } from "../../assets/stars";

interface StarCardProps {
  name: string;
  image: any;
}
export function StarCard({ name, image: ImageComponent }: StarCardProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-[222px] h-[222px] ">
        <div className="absolute inset-0 z-0">
          <Image
            src={OrignalStar}
            alt=""
            fill
            className="object-contain"
            priority
          />
        </div>
        <div className="absolute inset-[2%] z-10">
          <div className="relative w-full h-full">
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
          <p
            className={cn(
              "text-neutral-50 [21.42px] tracking-[0.02em] leading-snug uppercase text-center mt-1",
              luckiestGuy.className
            )}
          >
            {name}
          </p>
        </div>
      </div>
    </div>
  );
}
