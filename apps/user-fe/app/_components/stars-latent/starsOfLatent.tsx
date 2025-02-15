// app/_components/stars-latent/starsOfLatent.tsx
import {
  StarKeshav,
  StarShanonVerma,
  StarJohnyTony,
  StarKushal,
} from "../../_assets/stars";
import React from "react";
import { cn } from "@repo/ui/utils";
import { StarCard } from "./starCard";

export function StarsOfLatent() {
  const stars = [
    { name: "KESHAV JHA", image: StarKeshav },
    { name: "SHANON VERMA", image: StarShanonVerma },
    { name: "JONY & TONY", image: StarJohnyTony },
    { name: "KUSHAL BHANUSHALI", image: StarKushal },
    { name: "SHANON VERMA", image: StarShanonVerma },
  ];

  return (
    <section className="w-full px-4 lg:px-6 py-16">
      <div className="mx-auto flex flex-col gap-16">
        <div className="flex flex-col gap-4">
          <h2 className={cn("text-[#F8D48D] text-4xl font-bold")}>
            Stars Of Latent
          </h2>
          <p className={cn("text-neutral-400 text-lg max-w-prose")}>
            A gathering of our brightest talents, showcasing their hidden
            potential and extraordinary skills, ready to shine in the spotlight.
          </p>
        </div>

        {/* Increased gap between rows */}
        <div className="grid grid-cols-5 gap-8">
          {[...Array(3)].map((_, rowIndex) => (
            <React.Fragment key={rowIndex}>
              {stars.map((star, index) => (
                <StarCard
                  key={`${rowIndex}-${index}`}
                  name={star.name}
                  image={star.image}
                />
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
