"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { LoginDialog } from "./signup/singupDialog";
import { Button } from "@repo/ui/button";
import { IMAGES } from "../_assets";
import { MenuIcon, XIcon } from "lucide-react";
import { AnimatedBackground } from "./animatedBackground";

export default function Navbar() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="w-full flex justify-between items-center py-4 px-4 lg:px-6 relative z-50">
      <Link href="/" className="flex-shrink-0">
        <Image
          alt="India's Got Latent"
          src={IMAGES.NavLogo}
          width={48}
          height={48}
          className="object-contain fixed top-4 left-4 lg:left-6 z-50"
        />
      </Link>

      {/* Desktop Navigation */}
      <div className="items-center gap-2 relative py-2 rounded-lg hidden lg:flex">
        <AnimatedBackground
          defaultValue="Latent & Chill"
          className="rounded-lg bg-muted"
          transition={{
            type: "spring",
            bounce: 0.2,
            duration: 0.3,
          }}
          enableHover
        >
          <Link
            href="/"
            data-id="Book Tickets"
            className="text-primary hover:text-[#d1b759] transition-all duration-300 px-4 py-2"
          >
            Book Tickets
          </Link>
          <Link
            href="/episodes"
            data-id="Latent & Chill"
            className="text-primary hover:text-[#d1b759] transition-all duration-300 px-4 py-2"
          >
            Latent & Chill
          </Link>
        </AnimatedBackground>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="lg:hidden p-2 ml-2"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <MenuIcon className="w-6 h-6" />
      </button>

      {/* Mobile Sidenav */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-background border-l border-neutral-800 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        } lg:hidden`}
      >
        <div className="p-4 flex flex-col gap-4 items-end">
          <button onClick={() => setIsMobileMenuOpen(false)}>
            <XIcon className="w-6 h-6" />
          </button>
          <div className="flex flex-col gap-4 w-full">
            <Link
              href="/episodes"
              className="block text-primary hover:text-[#d1b759] transition-all duration-300 p-2 rounded-lg hover:bg-muted"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Episodes
            </Link>
            <Link
              href="/shows"
              className="block text-primary hover:text-[#d1b759] transition-all duration-300 p-2 rounded-lg hover:bg-muted"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Tickets
            </Link>
            <Link
              href="/about"
              className="block text-primary hover:text-[#d1b759] transition-all duration-300 p-2 rounded-lg hover:bg-muted"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Memberships
            </Link>
          </div>
        </div>
      </div>

      <Button
        onClick={() => setIsLoginOpen(true)}
        variant="accent"
        className="hidden lg:block"
      >
        Login
      </Button>

      {/* Login Dialog */}
      <LoginDialog isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </nav>
  );
}
