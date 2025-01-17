"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { heroImage1, heroImage3, heroImage2 } from "@/images/image";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import React from "react";

export function VerticalCarousel() {
  const carouselImages = [heroImage1, heroImage2, heroImage3];
  const plugin = React.useRef(
    Autoplay({
      delay: 0,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
      stopOnFocusIn: false,
    })
  );
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
        skipSnaps: true,
        dragFree: true,
        containScroll: "trimSnaps",
        duration: 3000,
        axis: "y", // This makes it vertical
      }}
      plugins={[plugin.current]}
      orientation={window.innerWidth >= 768 ? "vertical" : "horizontal"}
      className="w-full h-full"
    >
      <CarouselContent className="h-[400px]">
        {carouselImages.map((image, index) => (
          <CarouselItem key={`${image}-${index}`} className="pt-2">
            <div className="relative aspect-video rounded-xl max-w-lg overflow-hidden">
              <Image
                src={image}
                alt={`Carousel image ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
