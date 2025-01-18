import Image from "next/image";
import { LatentPlusCard } from "./latentPlusCard";
import { hero1, hero2 } from "../../assets";

export function MediaShowcase() {
  return (
    <div className="relative w-full max-w-[600px] mx-auto">
      {/* Glow Effect */}
      <div className="absolute -left-32 top-24 w-[140%] h-[140%] bg-[#dba238] blur-[120px] opacity-15" />

      {/* Content Stack */}
      <div className="relative space-y-4">
        {/* Top Image - Logo Banner */}
        <div className="relative aspect-[6.2/1] overflow-hidden rounded-2xl shadow-[0_8px_28px_-6px_rgba(0,0,0,0.6)]">
          <Image
            src={hero2}
            alt="India's Got Latent Show"
            layout="fill"
            className="object-cover"
            priority
          />
        </div>

        <LatentPlusCard />

        {/* Bottom Image - People with Red Curtain */}
        <div className="relative aspect-[6.2/1] overflow-hidden rounded-2xl shadow-[0_8px_28px_-6px_rgba(0,0,0,0.6)]">
          <Image
            src={hero1}
            alt="India's Got Latent Show Episode"
            layout="fill"
            className="object-cover"
          />
        </div>
        <div className="absolute bottom-0 left-0 w-full h-[80px] bg-gradient-to-t from-[#000000] to-[hsla(255,100%,100%,0)]"></div>
        <div className="absolute top-[-20px] left-0 w-full h-[80px] bg-gradient-to-b  from-[#000000] to-[hsla(255,100%,100%,0)]"></div>
      </div>
    </div>
  );
}
