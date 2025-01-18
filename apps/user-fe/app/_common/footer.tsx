"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import { footerLogo, instagram, twitter, youtube } from "../assets";
import { manrope } from "../lib/fonts";
import { cn } from "@repo/ui/utils";
import Link from "next/link";

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer className="w-full px-4 lg:px-6 py-12">
      <div className="max-w-[1440px] mx-auto">
        <div className="bg-[#1A1A1A] rounded-[32px] border-[#f8d48d] border-opacity-25 border-2 p-8 lg:p-12">
          <div className="flex justify-between">
            {/* Logo and Description */}
            <div className="space-y-6 max-w-[420px]">
              <Image
                src={footerLogo}
                alt="India's Got Latent"
                width={160}
                height={48}
                className="object-contain"
              />
              <p
                className={cn(
                  "text-neutral-400 text-base leading-relaxed",
                  manrope.className
                )}
              >
                India&apos;s Got Latent humorously celebrates India&apos;s
                quirkiest hidden talents, blending entertainment, satire, and
                unconventional performances.
              </p>
              <p className={cn("text-neutral-300 text-sm", manrope.className)}>
                All rights reserved to Samay Raina 2025.
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-4 pt-4">
                <Link
                  href="#"
                  className="w-8 h-8 flex items-center overflow-clip justify-center border border-[#333333] rounded-sm hover:border-neutral-700 transition-colors"
                  aria-label="Twitter"
                >
                  <Image src={twitter} alt="Twitter" objectFit="contain" />
                </Link>
                <Link
                  href="#"
                  className="w-8 h-8 flex items-center overflow-clip justify-center border border-[#333333] rounded-sm hover:border-neutral-700 transition-colors"
                  aria-label="Instagram"
                >
                  <Image src={instagram} alt="Instagram" objectFit="contain" />
                </Link>
                <Link
                  href="#"
                  className="w-8 h-8 flex items-center overflow-clip justify-center border border-[#333333] rounded-sm hover:border-neutral-700 transition-colors"
                  aria-label="YouTube"
                >
                  <Image src={youtube} alt="YouTube" objectFit="contain" />
                </Link>
              </div>
            </div>

            {/* Links Column */}
            <div className="flex space-x-12">
              <div className="space-y-6">
                <h3
                  className={cn(
                    "text-neutral-50 font-medium",
                    manrope.className
                  )}
                >
                  Links
                </h3>
                <div className="flex flex-col space-y-4">
                  <Link
                    href="/"
                    className={cn(
                      pathname === "/"
                        ? "text-[#F8D48D] font-medium"
                        : "text-neutral-400 hover:text-neutral-200",
                      "transition-colors",
                      manrope.className
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
                      "transition-colors",
                      manrope.className
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
                      "transition-colors",
                      manrope.className
                    )}
                  >
                    Stars of Latent
                  </Link>
                </div>
              </div>

              {/* Legal Column */}
              <div className="space-y-6">
                <h3
                  className={cn(
                    "text-neutral-50 font-medium",
                    manrope.className
                  )}
                >
                  Legal
                </h3>
                <div className="flex flex-col space-y-4">
                  <Link
                    href="/terms"
                    className={cn(
                      pathname === "/terms"
                        ? "text-[#F8D48D] font-medium"
                        : "text-neutral-400 hover:text-neutral-200",
                      "transition-colors",
                      manrope.className
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
                      "transition-colors",
                      manrope.className
                    )}
                  >
                    Privacy Policy
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
