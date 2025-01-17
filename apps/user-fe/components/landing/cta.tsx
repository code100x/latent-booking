import React from "react";
import { Button } from "../ui/button";
import {
  googlePlay,
  appleStore,
  mockup,
  latentLogo,
  googleApple,
} from "@/images/image";
import Image from "next/image";

export default function CTA() {
  return (
    <>
      <section className="flex flex-col md:flex-row relative border-2 border-primary/30 overflow-hidden bg-gradient-to-br from-[#D1B85A] via-[#EFE288] to-[#AA823D] items-center my-20 p-4 h-[30rem] md:h-[25rem] px-6 md:px-10 py-10 gap-10 md:gap-28 rounded-2xl bg-neutral-900 w-full">
        <div className="flex w-full md:w-1/2 gap-4 h-full flex-col">
          <div className="flex justify-center md:justify-start">
            <Image
              className="w-24 md:w-32 -translate-x-4 md:-translate-x-6 h-auto object-contain"
              src={latentLogo}
              alt="latent-logo"
            />
          </div>
          <div className="text-2xl md:text-4xl text-neutral-900 font-bold text-center md:text-left">
            Install Latent on mobile
          </div>
          <div className="text-neutral-700 text-sm md:text-base text-center md:text-left">
            Grab the app to check out all the cool exclusive stuff anytime,
            right from your phone. Download the Latent app today!
          </div>
        </div>
        <div className="md:absolute top-7 right-10 md:right-32 flex flex-col justify-end gap-4">
          <Image
            src={mockup}
            alt="mockup"
            className="w-[15rem] md:w-[20rem] md:rotate-[23deg]"
          />
        </div>
      </section>
    </>
  );
}
