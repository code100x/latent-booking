import { heroImage2 } from "@/images/image";
import { Lock } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function Episode({ isLocked }: { isLocked: boolean }) {
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="w-full overflow-hidden relative h-full">
          {isLocked && (
            <>
              <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-b from-[#09060080] to-[#090600]"></div>
              <Lock className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary w-8 h-8" />
            </>
          )}
          <Image
            width={800}
            height={800}
            src={heroImage2}
            alt="Episode 1"
            className="w-full border-primary/30 border rounded-xl h-full"
          />
        </div>
        <div className="text-sm text-neutal-100 font-medium">
          India&apos;s Got Latent ft. @Ashish Chanchalani, @Beer Biceps, @Rebel
          Kid
        </div>
      </div>
    </>
  );
}
