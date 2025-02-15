"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { cn } from "@repo/ui/utils";
import { useEffect, useRef, useState } from "react";

interface CarouselProps {
  children: React.ReactNode;
  itemClassName?: string;
  showArrows?: boolean;
  title?: string;
  titleClassName?: string;
}

export function Carousel({
  children,
  itemClassName,
  showArrows = true,
  title,
  titleClassName,
}: CarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(Math.ceil(scrollLeft) < scrollWidth - clientWidth);
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -340,
        behavior: "smooth",
      });
      checkScrollability();
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: 340,
        behavior: "smooth",
      });
      checkScrollability();
    }
  };

  const handleScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const resizeObserver = new ResizeObserver(checkScrollability);
    resizeObserver.observe(carousel);
    checkScrollability();

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div className={cn("flex flex-col gap-4")}>
      <div className="flex items-center justify-between w-full px-4 md:px-6">
        <h2 className={cn("text-2xl font-bold ", titleClassName)}>{title}</h2>
        <div className="flex items-center gap-2">
          <button
            className="size-8 bg-neutral-900 rounded-full items-center justify-center transition-all duration-300 cursor-pointer flex disabled:opacity-50"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
          >
            <ChevronLeftIcon className="h-6 w-6 text-neutral-50" />
          </button>

          <button
            className="size-8 bg-neutral-900 rounded-full items-center justify-center transition-all duration-300 cursor-pointer flex disabled:opacity-50"
            onClick={scrollRight}
            disabled={!canScrollRight}
          >
            <ChevronRightIcon className="h-6 w-6 text-neutral-50" />
          </button>
        </div>
      </div>

      <div
        className={`flex overflow-x-auto no-scrollbar scroll-smooth py-1 px-4 md:px-6 ${itemClassName}`}
        ref={carouselRef}
        onScroll={handleScroll}
      >
        {children}
      </div>
    </div>
  );
}
