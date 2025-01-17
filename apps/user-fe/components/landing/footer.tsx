import { igl, instagram, twitter, youtube } from "@/images/image";
import Image from "next/image";
import React from "react";

export default function Footer() {
  return (
    <>
      <div className="flex flex-col md:flex-row w-full mt-10 xl:max-w-7xl mx-auto p-6 md:p-14 bg-neutral-900 m-4 rounded-3xl justify-between items-start">
        <div className="flex flex-col gap-4 w-full md:w-[35%]">
          <div className="w-fit flex h-fit">
            <Image src={igl} alt="igl" className="w-38 -translate-x-6" />
          </div>
          <div className="text-xs text-neutral-400 text-left md:text-left">
            India's Got Latent is a professionally curated entertainment
            platform where we showcase gaming, pop culture, music, sports, and
            unconventional entertainment.
          </div>
          <div className="text-xs text-neutral-500 text-left md:text-left">
            All rights reserved to Samay Raina 2025
          </div>
          <div className="flex justify-start gap-4 mb-10">
            <Image src={twitter} alt="twitter" className="w-6" />
            <Image src={instagram} alt="instagram" className="w-6" />
            <Image src={youtube} alt="youtube" className="w-6" />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-8 text-xs text-neutral-400 w-full md:w-[60%]">
          <div className="flex flex-col gap-8">
            <div className="text-xs font-semibold">Links</div>
            <div className="flex flex-col gap-2">
              <div className="hover:text-primary">Home</div>
              <div className="hover:text-primary">Episodes</div>
              <div className="hover:text-primary">Stars of Latent</div>
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <div className="text-xs font-semibold">Legal</div>
            <div className="flex flex-col gap-2">
              <div className="hover:text-primary">Terms & Conditions</div>
              <div className="hover:text-primary">Privacy Policy</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
