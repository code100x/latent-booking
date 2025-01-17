import React from "react";
import { Button } from "../ui/button";
import Tick from "../ui/svgs/tick";

export default function Upgrade() {
  return (
    <>
      <section className="flex flex-col md:flex-row border-2 border-primary/30 drop-shadow-[0px_0px_40px_#DCA33940] items-center my-20 p-8 min-h-[20rem] max-h-fit px-8 md:px-10 gap-8 md:gap-28 rounded-xl bg-neutral-900 justify-between w-full">
        <div className="flex w-full md:w-1/2 gap-4 flex-col">
          <div className="text-3xl md:text-4xl font-bold">
            Upgrade to{" "}
            <span className="bg-gradient-to-r from-[#D1B85A] via-[#EFE288] to-[#AA823D] bg-clip-text text-transparent">
              Latent+
            </span>
          </div>
          <div className="text-neutral-300 text-xs  md:text-sm md:text-base">
            Elevate your fandom by becoming a Samay ke Dost, a Samay ke Khaas,
            or a Silent Supporter! Unlock amazing exclusive perks and get early
            access to the hottest episodes of India&apos;s Got Latent!
          </div>
          <Button className="w-fit mt-4 md:mt-8">Join Latent+</Button>
        </div>
        <div className="flex flex-col w-full md:w-1/2 justify-end gap-4">
          <div className="flex items-center gap-4">
            <Tick className="text-primary" />
            <div className="text-neutral-300 text-base md:text-xl">
              India's Got Latent deleted footage
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Tick className="text-primary" />
            <div className="text-neutral-300 text-base md:text-xl">
              Access to members only live streams
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Tick className="text-primary" />
            <div className="text-neutral-300 text-base md:text-xl">
              Access to all unlisted content
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Tick className="text-primary" />
            <div className="text-neutral-300 text-base md:text-xl">
              Access to members only live chat
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Tick className="text-primary" />
            <div className="text-neutral-300 text-base md:text-xl">
              Discord voice channel for the members
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
