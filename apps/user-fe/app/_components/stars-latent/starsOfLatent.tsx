// app/_components/stars-latent/starsOfLatent.tsx
import {
  StarKeshav,
  StarShanonVerma,
  StarJohnyTony,
  StarKushal,
} from "../../assets/stars";
import { figtree, manrope } from "../../lib/fonts";
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
    <section className="w-full bg-black px-4 lg:px-6 py-16">
      <div className="max-w-[1440px] mx-auto">
        <div className="space-y-4 mb-16">
          <h2
            className={cn(
              "text-[#F8D48D] text-4xl font-semibold",
              figtree.className
            )}
          >
            Stars Of Latent
          </h2>
          <p
            className={cn(
              "text-neutral-400 text-lg max-w-[580px]",
              manrope.className
            )}
          >
            A gathering of our brightest talents, showcasing their hidden
            potential and extraordinary skills, ready to shine in the spotlight.
          </p>
        </div>

        {/* Increased gap between rows */}
        <div className="grid grid-cols-5 gap-x-8 gap-y-16">
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
