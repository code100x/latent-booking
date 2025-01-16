"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import mobile from "../../../../public/assests/img/mobile.png";
import logo from "../../../../public/assests/img/mobileLogo.png";
import google from "../../../../public/assests/img/googlePay.png";
import apple from "../../../../public/assests/img/appstore.png";

const DownLoadMobile = () => {
    const mobileRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mobileElement = mobileRef.current;

    // GSAP hover animation
    const onMouseEnter = () => {
      gsap.to(mobileElement, {
        scale: 1.1,
        y: -10,
        ease: "bounce.out",
        duration: 0.5,
      });
    };

    const onMouseLeave = () => {
      gsap.to(mobileElement, {
        scale: 1,
        y: 0,
        ease: "bounce.out",
        duration: 0.5,
      });
    };

    // Add event listeners
    mobileElement!.addEventListener("mouseenter", onMouseEnter);
    mobileElement!.addEventListener("mouseleave", onMouseLeave);

    // Cleanup event listeners on component unmount
    return () => {
      mobileElement!.removeEventListener("mouseenter", onMouseEnter);
      mobileElement!.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <div className="pt-[90px] pb-[90px]">
      <div className="rounded-[24px] border border-[rgba(248,212,141,0.25)] bg-gradient-to-r from-[#EFE288] via-[#EFE288] to-[#AA823D] bg-[#171717] shadow-[0px_0px_64px_0px_rgba(220,163,57,0.25)] px-12 pt-12 flex items-center overflow-hidden">
        <div className="w-[50%]">
          <Image src={logo} alt="logo" />
          <p className="mt-9 text-[#0A0A0A] font-manrope text-[36px] font-bold">
            Install Latent on mobile
          </p>
          <p className="text-[#404040] font-manrope text-base">
            Grab the app to check out all the cool exclusive stuff anytime,
            right from your phone. Download the Latent app today!
          </p>

          <div className="download flex items-center -space-x-24 ml-[-3rem] -mt-4">
            <Image src={google} alt="google" />
            <Image src={apple} alt="apple" />
          </div>
        </div>

        <div className="relative top-5" ref={mobileRef}>
          <Image src={mobile} alt="mobile" />
        </div>
      </div>
    </div>
  );
};

export default DownLoadMobile;
