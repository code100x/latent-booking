import React from "react";
import { Button } from "../ui/button";
import { VerticalCarousel } from "../vertical-carousel";

export default function Hero() {
  return (
    <>
      <section className="flex flex-col md:flex-row items-center justify-between w-full gap-8 md:gap-20 h-fit px-4 mt-20 md:mt-0 md:px-0">
        <div className="flex w-full md:w-1/2 flex-col gap-4 text-center md:text-left">
          <div className="text-3xl md:text-4xl font-bold">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-[#D1B85A] via-[#EFE288] to-[#AA823D] text-transparent bg-clip-text">
              India&apos;s Got Latent
            </span>
          </div>
          <div className="text-neutral-300 text-sm md:text-base">
            Hosted by the ever-sarcastic{" "}
            <span className="font-bold text-foreground">Samay Raina</span>, this
            show is less about finding the next superstar and more about giving
            your latent (read: bizarre) talents a chance to shine—while being
            lovingly roasted.
          </div>
          <Button className="mt-4 md:mt-8 w-fit mx-auto md:mx-0">
            Join Latent
          </Button>
        </div>
        <div className="w-full md:w-1/2 py-10 md:py-20 flex items-center justify-center md:justify-end relative">
          <div className="absolute top-8 md:top-14 left-0 w-full h-20 md:h-28 z-[100] bg-gradient-to-b from-background via-background to-transparent"></div>
          <VerticalCarousel />
          <div className="absolute bottom-8 md:bottom-14 left-0 w-full h-20 md:h-28 z-[100] bg-gradient-to-t from-background via-background to-transparent"></div>
        </div>
      </section>
    </>
  );
}
