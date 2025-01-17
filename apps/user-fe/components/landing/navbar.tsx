"use client";
import React, { useState } from "react";
import Image from "next/image";
import { latentLogo } from "@/images/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className="flex justify-between items-center h-10 py-10 relative">
        <div>
          <Image
            src={latentLogo}
            className="w-10 object-contain h-10"
            alt="Latent Logo"
            width={100}
            height={100}
          />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex text-sm gap-8">
          <Link className="hover:text-primary" href="/">
            Home
          </Link>
          <Link className="hover:text-primary" href="/episodes">
            Episodes
          </Link>
          <Link className="hover:text-primary" href="/stars-of-latent">
            Stars of Latent
          </Link>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="absolute top-full right-0 left-0 bg-black p-4 flex flex-col gap-4 md:hidden">
            <Link href="/" className="text-sm">
              Home
            </Link>
            <Link href="/episodes" className="text-sm">
              Episodes
            </Link>
            <Link href="/stars-of-latent" className="text-sm">
              Stars of Latent
            </Link>
          </div>
        )}

        <Button className="hidden md:block rounded-[6px] font-bold px-6 bg-gradient-to-r from-[#D1B85A] via-[#EFE288] to-[#AA823D]">
          Login
        </Button>
      </nav>
    </>
  );
}
