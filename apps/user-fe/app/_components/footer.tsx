"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import { IMAGES } from "../_assets";
import { cn } from "@repo/ui/utils";
import Link from "next/link";

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer className="w-full mt-16 p-4 lg:p-6 border-t border-neutral-800 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6 justify-between p-4 md:p-6">
          {/* Logo and Description */}
          <div className="flex flex-col gap-4">
            <Image
              src={IMAGES.footerLogo}
              alt="India's Got Latent"
              width={160}
              height={48}
              className="object-contain"
            />
            <p className={cn("text-neutral-400 text-base max-w-prose")}>
              India&apos;s Got Latent humorously celebrates India&apos;s
              quirkiest hidden talents, blending entertainment, satire, and
              unconventional performances.
            </p>
            <p className={cn("text-neutral-300 text-sm")}>
              All rights reserved to Samay Raina 2025.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4 pt-4">
              <Link
                href="#"
                className="w-8 h-8 flex items-center overflow-clip justify-center border border-[#333333] rounded-sm hover:border-neutral-700 transition-colors"
                aria-label="Twitter"
              >
                <Image src={IMAGES.twitter} alt="Twitter" objectFit="contain" />
              </Link>
              <Link
                href="#"
                className="w-8 h-8 flex items-center overflow-clip justify-center border border-[#333333] rounded-sm hover:border-neutral-700 transition-colors"
                aria-label="Instagram"
              >
                <Image
                  src={IMAGES.instagram}
                  alt="Instagram"
                  objectFit="contain"
                />
              </Link>
              <Link
                href="#"
                className="w-8 h-8 flex items-center overflow-clip justify-center border border-[#333333] rounded-sm hover:border-neutral-700 transition-colors"
                aria-label="YouTube"
              >
                <Image src={IMAGES.youtube} alt="YouTube" objectFit="contain" />
              </Link>
            </div>
          </div>

          {/* Links Column */}
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex flex-col gap-4">
              <h3 className={cn("text-neutral-50 font-medium")}>Links</h3>
              <div className="flex flex-col space-y-4">
                <Link
                  href="/"
                  className={cn(
                    pathname === "/"
                      ? "text-[#F8D48D] font-medium"
                      : "text-neutral-400 hover:text-neutral-200",
                    "transition-colors"
                  )}
                >
                  Home
                </Link>
                <Link
                  href="/episodes"
                  className={cn(
                    pathname === "/episodes"
                      ? "text-[#F8D48D] font-medium"
                      : "text-neutral-400 hover:text-neutral-200",
                    "transition-colors"
                  )}
                >
                  Episodes
                </Link>
                <Link
                  href="/stars-of-latent"
                  className={cn(
                    pathname === "/stars-of-latent"
                      ? "text-[#F8D48D] font-medium"
                      : "text-neutral-400 hover:text-neutral-200",
                    "transition-colors"
                  )}
                >
                  Stars of Latent
                </Link>
              </div>
            </div>

            {/* Legal Column */}
            <div className="flex flex-col gap-4">
              <h3 className={cn("text-neutral-50 font-medium")}>Legal</h3>
              <div className="flex flex-col space-y-4">
                <Link
                  href="/terms"
                  className={cn(
                    pathname === "/terms"
                      ? "text-[#F8D48D] font-medium"
                      : "text-neutral-400 hover:text-neutral-200",
                    "transition-colors"
                  )}
                >
                  Terms & Conditions
                </Link>
                <Link
                  href="/privacy"
                  className={cn(
                    pathname === "/privacy"
                      ? "text-[#F8D48D] font-medium"
                      : "text-neutral-400 hover:text-neutral-200",
                    "transition-colors"
                  )}
                >
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
