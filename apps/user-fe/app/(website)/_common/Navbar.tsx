"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className="font-manrope flex items-center justify-between py-6 mb-[90px]">
      <div className="logo">
        <Image src="/assests/img/latent-logo.png" alt="logo" width={70} height={70} />
      </div>

      <div>
        <ul className="flex items-center space-x-12">
          <li>
            <Link
              href="/"
              className={`${
                pathname === "/" ? "text-[#F8D48D]" : "text-[#A3A3A3]"
              } font-medium text-base`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/Episode"
              className={`${
                pathname === "/Episode" ? "text-[#F8D48D]" : "text-[#A3A3A3]"
              } font-medium text-base`}
            >
              Episodes
            </Link>
          </li>
          <li>
            <Link
              href="/Star"
              className={`${
                pathname === "/Star" ? "text-[#F8D48D]" : "text-[#A3A3A3]"
              } font-medium text-base`}
            >
              Stars Of Latent
            </Link>
          </li>
        </ul>
      </div>

      <div>
        <button className="font-figtree py-2 px-6 rounded-lg bg-[linear-gradient(262deg,#AA823D_-0.19%,#EFE288_59.57%,#D1B85A_85.24%)] text-[#0A0A0A] font-semibold text-base">
          Login
        </button>
      </div>
    </div>
  );
};

export default Navbar;