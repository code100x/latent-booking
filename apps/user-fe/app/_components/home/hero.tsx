"use client";
import Image from "next/image";
import { IMAGES } from "@/app/_assets";
import { Marquee } from "@/app/_components/marquee";
import { Button } from "@repo/ui/button";
import { TicketComponent } from "@/app/_components/ticket-component";
export function Hero() {
  return (
    <section className="pb-20 pt-10 flex flex-col items-center gap-8">
      <Image
        src={IMAGES.curtain}
        alt="Curtain"
        className="absolute top-0 left-0 w-1/3 lg:w-1/4 -z-[1] lg:z-10"
      />

      <Image
        src={IMAGES.curtain}
        alt="Curtain"
        className="absolute top-0 right-0 w-1/3 lg:w-1/4 scale-x-[-1] -z-[1] lg:z-10"
      />

      <div className="flex mx-auto w-full items-center flex-col max-w-3xl gap-2 px-4">
        <div className="relative w-full">
          <input
            placeholder="Search for episodes, shows, and more..."
            className="w-full rounded-2xl bg-neutral-900 border border-neutral-800 py-5 px-3 focus:outline-none focus:ring-0 focus:ring-offset-0 placeholder:text-neutral-300 text-sm"
          />
          <Button
            variant="accent"
            size="lg"
            className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-3 rounded-xl"
          >
            Search
          </Button>
        </div>

        <div className="w-full flex gap-2">
          <div className="relative w-full">
            <select className="w-full rounded-xl bg-neutral-900 border border-neutral-800 p-3 pt-6 pr-8 focus:outline-none focus:ring-0 focus:ring-offset-0 text-sm appearance-none peer">
              <option value="" hidden></option>
              <option value="mumbai">Mumbai</option>
              <option value="delhi">Delhi</option>
              <option value="bangalore">Bangalore</option>
              <option value="hyderabad">Hyderabad</option>
              <option value="chennai">Chennai</option>
              <option value="kolkata">Kolkata</option>
              <option value="pune">Pune</option>
              <option value="ahmedabad">Ahmedabad</option>
            </select>
            <label className="absolute left-3 text-[10px] text-neutral-400 top-2.5">
              City
            </label>
            <svg
              className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-neutral-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>

          <div className="relative w-full">
            <select className="w-full rounded-xl bg-neutral-900 border border-neutral-800 p-3 pt-6 pr-8 focus:outline-none focus:ring-0 focus:ring-offset-0 text-sm appearance-none peer">
              <option value="" hidden></option>
              <option value="all">All Ages</option>
              <option value="teen">13+</option>
              <option value="mature">18+</option>
            </select>
            <label className="absolute left-3 text-[10px] text-neutral-400 top-2.5">
              Age Rating
            </label>
            <svg
              className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-neutral-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>

          <div className="relative w-full">
            <select className="w-full rounded-xl bg-neutral-900 border border-neutral-800 p-3 pt-6 pr-8 focus:outline-none focus:ring-0 focus:ring-offset-0 text-sm appearance-none peer">
              <option value="" hidden></option>
              <option value="concert">Concert</option>
              <option value="theater">Theater</option>
              <option value="comedy">Comedy</option>
              <option value="sports">Sports</option>
            </select>
            <label className="absolute left-3 text-[10px] text-neutral-400 top-2.5">
              Event Type
            </label>
            <svg
              className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-neutral-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="relative w-full mx-auto [perspective:400px] overflow-hidden">
        <Marquee
          className="py-4 justify-center overflow-hidden [--duration:30s] gap-4"
          aria-hidden
        >
          <Image
            src={IMAGES.hero1}
            alt="Hero 1"
            className="rounded-xl max-w-[300px] lg:max-w-[500px] w-full transition-all duration-300"
          />
          <Image
            src={IMAGES.hero2}
            alt="Hero 2"
            className="rounded-xl max-w-[300px] lg:max-w-[500px] w-full transition-all duration-300"
          />
          <Image
            src={IMAGES.hero3}
            alt="Hero 3"
            className="rounded-xl max-w-[300px] lg:max-w-[500px] w-full transition-all duration-300"
          />
        </Marquee>
      </div>
    </section>
  );
}
