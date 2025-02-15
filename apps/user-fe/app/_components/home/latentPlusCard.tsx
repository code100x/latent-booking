import Image from "next/image";
import { cn } from "@repo/ui/utils";
import { IMAGES } from "@/app/_assets";
export function LatentPlusCard() {
  return (
    <div className="relative w-full aspect-[1.91] rounded-2xl overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-[#000000]">
      {/* Base gradient image with built-in logos */}
      <div className="absolute inset-0 opacity-90">
        <Image
          src={IMAGES.latentPlusLogo}
          alt="Latent+ Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Logos overlay at the start */}
      <div>
        <Image src={IMAGES.logos} alt="Latent+" layout="fill" />
      </div>

      {/* Content container */}
      <div className="relative h-full flex flex-col items-center justify-center gap-5 px-8">
        {/* Main logo */}
        <div className="w-[240px] h-[72px] relative">
          <Image
            src={IMAGES.latentLogo}
            alt="Latent+"
            layout="fill"
            className="object-contain"
          />
        </div>

        <div className="flex flex-col items-center gap-3">
          <p
            className={cn("text-neutral-100 text-lg text-center relative z-10")}
          >
            unlock bonus episodes, community chats & more!
          </p>
          <button
            className={cn(
              "px-5 py-2 bg-gradient-to-r from-[#aa823d] via-[#efe188] to-[#d1b759] rounded-lg",
              "shadow-[0_0_12px_rgba(170,130,61,0.4)]",
              "hover:opacity-90 transition-opacity relative z-10"
            )}
          >
            <span className="text-neutral-950 text-sm font-bold tracking-wide">
              UPGRADE NOW
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
