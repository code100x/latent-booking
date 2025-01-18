"use client";

import Link from "next/link";
import { NavLogo } from "../assets";
import Image from "next/image";
import { figtree, manrope } from "../lib/fonts";
import { cn } from "@repo/ui/utils";
import { usePathname } from "next/navigation";

import { useState } from "react";
import { LoginDialog } from "../_components/signup/singupDialog";

export default function Navbar() {
  const pathname = usePathname();
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <nav className="w-full bg-black">
      <div className="max-w-[1440px] mx-auto h-24 px-6 lg:px-24 flex items-center justify-between">
        <Link href="/" className="flex-shrink-0">
          <Image
            src={NavLogo}
            alt="India's Got Latent"
            width={48}
            height={48}
            className="object-contain"
          />
        </Link>

        <div className="flex items-center gap-12">
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
            Stars Of Latent
          </Link>
        </div>

        <button
          onClick={() => setIsLoginOpen(true)}
          className={cn(
            "px-6 py-2 bg-gradient-to-r from-[#aa823d] via-[#efe188] to-[#d1b759]",
            "rounded-lg text-neutral-950 font-semibold",
            "hover:opacity-90 transition-opacity",
            figtree.className
          )}
        >
          Login
        </button>

        {/* Login Dialog */}
        <LoginDialog
          isOpen={isLoginOpen}
          onClose={() => setIsLoginOpen(false)}
        />
      </div>
    </nav>
  );
}
