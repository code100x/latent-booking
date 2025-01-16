"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import banner from "../../../../public/assests/img/ban.png";
import Image from "next/image";
import LatestEpisodes from "./LatestEpisodes";
import Upgrade from "./Upgrade";
import DownLoadMobile from "./DownLoadMobile";
import Footer from "./Footer";

const HomeHero = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const images = gsap.utils.toArray(".scroll-image");
      gsap.fromTo(
        images,
        { y: 0 },
        {
          y: "-=100%",
          repeat: -1,
          duration: 10,
          ease: "linear",
          modifiers: {
            y: gsap.utils.unitize((y) => parseFloat(y) % 100),
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className=" pb-10">
      <div className="flex items-center justify-between w-full">
        <div className="CTA font-manrope w-[50%]">
          <p className="text-[36px] font-bold">
            Welcome to{" "}
            <span className="text-4xl font-bold bg-gradient-to-r from-[#AA823D] via-[#EFE288] to-[#D1B85A] bg-clip-text text-transparent mb-3">
              India’s Got Latent
            </span>
          </p>
          <p className="text-lg font-normal mb-12">
            Hosted by the ever-sarcastic <strong>Samay Raina</strong>, this show
            is less about finding the next superstar and more about giving your
            latent (read: bizarre) talents a chance to shine—while being
            lovingly roasted.
          </p>

          <button className="text-[#0A0A0A] font-figtree text-base font-semibold py-3 px-6 rounded-lg bg-[linear-gradient(262deg,#AA823D_-0.19%,#EFE288_59.57%,#D1B85A_85.24%)]">
            Join Latent+
          </button>
        </div>

        <div className="relative h-full">
          <div
            ref={containerRef}
            className=" space-y-4 h-[25rem] overflow-y-hidden  w-full relative z-[99999]"
          >
            <Image src={banner} alt="Banner" className=" scroll-image" />
            <Image src={banner} alt="Banner" className=" scroll-image" />
            <Image src={banner} alt="Banner" className=" scroll-image" />
            <Image src={banner} alt="Banner" className=" scroll-image" />
            <Image src={banner} alt="Banner" className=" scroll-image" />
            <Image src={banner} alt="Banner" className=" scroll-image" />
          </div>
          <div className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none bg-[#EFE288] blur-3xl rounded-full opacity-50">
            {/* Content for the absolute div */}
          </div>
        </div>
      </div>
      <LatestEpisodes />
      <Upgrade />
      <div className=" latest_episodes mt-[90px]">
        <div className=" flex items-center justify-between">
          <p className=" font-manrope text-[30px] font-bold mb-6 text-[#F8D48D]">
            Latent+ Episodes
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 20 21"
            fill="none"
            className="mr-10"
          >
            <path
              d="M14.4132 11.1632L8.16325 17.4132C7.98713 17.5894 7.74826 17.6883 7.49918 17.6883C7.25011 17.6883 7.01124 17.5894 6.83512 17.4132C6.659 17.2371 6.56006 16.9983 6.56006 16.7492C6.56006 16.5001 6.659 16.2612 6.83512 16.0851L12.4218 10.5L6.83668 4.91325C6.74948 4.82604 6.6803 4.72251 6.63311 4.60857C6.58591 4.49463 6.56162 4.37251 6.56162 4.24918C6.56162 4.12586 6.58591 4.00374 6.63311 3.8898C6.6803 3.77586 6.74948 3.67233 6.83668 3.58512C6.92389 3.49792 7.02742 3.42874 7.14136 3.38155C7.2553 3.33435 7.37742 3.31006 7.50075 3.31006C7.62408 3.31006 7.7462 3.33435 7.86014 3.38155C7.97408 3.42874 8.0776 3.49792 8.16481 3.58512L14.4148 9.83512C14.5021 9.92232 14.5713 10.0259 14.6185 10.1399C14.6657 10.2539 14.6899 10.3761 14.6898 10.4995C14.6896 10.6229 14.6651 10.745 14.6177 10.8589C14.5702 10.9728 14.5008 11.0763 14.4132 11.1632Z"
              fill="white"
            />
          </svg>
        </div>
        <div className=" flex items-center space-x-4">
          <div className="relative z-10">
            <div className="relative w-full">
              <Image src={banner} alt="banner" className="w-full" />
              <div className="absolute inset-0 bg-black opacity-50 z-[1] rounded-2xl flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="45"
                  height="44"
                  viewBox="0 0 45 44"
                  fill="#F8D48D"
                >
                  <path
                    d="M36.4097 13.117H31.6171V9.69371C31.6171 7.33312 30.6793 5.06921 29.0101 3.40002C27.3409 1.73083 25.077 0.793091 22.7164 0.793091C20.3558 0.793091 18.0919 1.73083 16.4227 3.40002C14.7536 5.06921 13.8158 7.33312 13.8158 9.69371V13.117H9.02317C8.11525 13.117 7.24452 13.4777 6.60252 14.1197C5.96052 14.7617 5.59985 15.6324 5.59985 16.5403V35.7109C5.59985 36.6188 5.96052 37.4896 6.60252 38.1316C7.24452 38.7736 8.11525 39.1342 9.02317 39.1342H36.4097C37.3176 39.1342 38.1884 38.7736 38.8304 38.1316C39.4724 37.4896 39.833 36.6188 39.833 35.7109V16.5403C39.833 15.6324 39.4724 14.7617 38.8304 14.1197C38.1884 13.4777 37.3176 13.117 36.4097 13.117ZM17.9238 9.69371C17.9238 8.42263 18.4287 7.2036 19.3275 6.3048C20.2263 5.40601 21.4454 4.90107 22.7164 4.90107C23.9875 4.90107 25.2066 5.40601 26.1054 6.3048C27.0041 7.2036 27.5091 8.42263 27.5091 9.69371V13.117H17.9238V9.69371ZM35.725 35.0263H9.70783V17.225H35.725V35.0263ZM25.4551 26.1256C25.4551 26.6673 25.2945 27.1968 24.9935 27.6472C24.6926 28.0975 24.2649 28.4485 23.7645 28.6558C23.2641 28.8631 22.7134 28.9173 22.1822 28.8117C21.6509 28.706 21.1629 28.4452 20.7799 28.0622C20.3969 27.6791 20.1361 27.1912 20.0304 26.6599C19.9247 26.1287 19.979 25.578 20.1863 25.0776C20.3935 24.5772 20.7446 24.1495 21.1949 23.8485C21.6453 23.5476 22.1748 23.387 22.7164 23.387C23.4428 23.387 24.1394 23.6755 24.653 24.1891C25.1666 24.7027 25.4551 25.3993 25.4551 26.1256Z"
                    fill="#F8D48D"
                  />
                </svg>
                F
              </div>
            </div>
            <p className="text-lg font-medium">
              India’s Got Latent ft. @Ashish Chanchalani, @Beer Biceps, @Rebel
              Kid
            </p>
          </div>

          <div className="relative z-10">
            <div className="relative w-full">
              <Image src={banner} alt="banner" className="w-full" />
              <div className="absolute inset-0 bg-black opacity-50 z-[1] rounded-2xl flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="45"
                  height="44"
                  viewBox="0 0 45 44"
                  fill="#F8D48D"
                >
                  <path
                    d="M36.4097 13.117H31.6171V9.69371C31.6171 7.33312 30.6793 5.06921 29.0101 3.40002C27.3409 1.73083 25.077 0.793091 22.7164 0.793091C20.3558 0.793091 18.0919 1.73083 16.4227 3.40002C14.7536 5.06921 13.8158 7.33312 13.8158 9.69371V13.117H9.02317C8.11525 13.117 7.24452 13.4777 6.60252 14.1197C5.96052 14.7617 5.59985 15.6324 5.59985 16.5403V35.7109C5.59985 36.6188 5.96052 37.4896 6.60252 38.1316C7.24452 38.7736 8.11525 39.1342 9.02317 39.1342H36.4097C37.3176 39.1342 38.1884 38.7736 38.8304 38.1316C39.4724 37.4896 39.833 36.6188 39.833 35.7109V16.5403C39.833 15.6324 39.4724 14.7617 38.8304 14.1197C38.1884 13.4777 37.3176 13.117 36.4097 13.117ZM17.9238 9.69371C17.9238 8.42263 18.4287 7.2036 19.3275 6.3048C20.2263 5.40601 21.4454 4.90107 22.7164 4.90107C23.9875 4.90107 25.2066 5.40601 26.1054 6.3048C27.0041 7.2036 27.5091 8.42263 27.5091 9.69371V13.117H17.9238V9.69371ZM35.725 35.0263H9.70783V17.225H35.725V35.0263ZM25.4551 26.1256C25.4551 26.6673 25.2945 27.1968 24.9935 27.6472C24.6926 28.0975 24.2649 28.4485 23.7645 28.6558C23.2641 28.8631 22.7134 28.9173 22.1822 28.8117C21.6509 28.706 21.1629 28.4452 20.7799 28.0622C20.3969 27.6791 20.1361 27.1912 20.0304 26.6599C19.9247 26.1287 19.979 25.578 20.1863 25.0776C20.3935 24.5772 20.7446 24.1495 21.1949 23.8485C21.6453 23.5476 22.1748 23.387 22.7164 23.387C23.4428 23.387 24.1394 23.6755 24.653 24.1891C25.1666 24.7027 25.4551 25.3993 25.4551 26.1256Z"
                    fill="#F8D48D"
                  />
                </svg>
                F
              </div>
            </div>
            <p className="text-lg font-medium">
              India’s Got Latent ft. @Ashish Chanchalani, @Beer Biceps, @Rebel
              Kid
            </p>
          </div>

          <div className="relative z-10">
            <div className="relative w-full">
              <Image src={banner} alt="banner" className="w-full" />
              <div className="absolute inset-0 bg-black opacity-50 z-[1] rounded-2xl flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="45"
                  height="44"
                  viewBox="0 0 45 44"
                  fill="#F8D48D"
                >
                  <path
                    d="M36.4097 13.117H31.6171V9.69371C31.6171 7.33312 30.6793 5.06921 29.0101 3.40002C27.3409 1.73083 25.077 0.793091 22.7164 0.793091C20.3558 0.793091 18.0919 1.73083 16.4227 3.40002C14.7536 5.06921 13.8158 7.33312 13.8158 9.69371V13.117H9.02317C8.11525 13.117 7.24452 13.4777 6.60252 14.1197C5.96052 14.7617 5.59985 15.6324 5.59985 16.5403V35.7109C5.59985 36.6188 5.96052 37.4896 6.60252 38.1316C7.24452 38.7736 8.11525 39.1342 9.02317 39.1342H36.4097C37.3176 39.1342 38.1884 38.7736 38.8304 38.1316C39.4724 37.4896 39.833 36.6188 39.833 35.7109V16.5403C39.833 15.6324 39.4724 14.7617 38.8304 14.1197C38.1884 13.4777 37.3176 13.117 36.4097 13.117ZM17.9238 9.69371C17.9238 8.42263 18.4287 7.2036 19.3275 6.3048C20.2263 5.40601 21.4454 4.90107 22.7164 4.90107C23.9875 4.90107 25.2066 5.40601 26.1054 6.3048C27.0041 7.2036 27.5091 8.42263 27.5091 9.69371V13.117H17.9238V9.69371ZM35.725 35.0263H9.70783V17.225H35.725V35.0263ZM25.4551 26.1256C25.4551 26.6673 25.2945 27.1968 24.9935 27.6472C24.6926 28.0975 24.2649 28.4485 23.7645 28.6558C23.2641 28.8631 22.7134 28.9173 22.1822 28.8117C21.6509 28.706 21.1629 28.4452 20.7799 28.0622C20.3969 27.6791 20.1361 27.1912 20.0304 26.6599C19.9247 26.1287 19.979 25.578 20.1863 25.0776C20.3935 24.5772 20.7446 24.1495 21.1949 23.8485C21.6453 23.5476 22.1748 23.387 22.7164 23.387C23.4428 23.387 24.1394 23.6755 24.653 24.1891C25.1666 24.7027 25.4551 25.3993 25.4551 26.1256Z"
                    fill="#F8D48D"
                  />
                </svg>
                F
              </div>
            </div>
            <p className="text-lg font-medium">
              India’s Got Latent ft. @Ashish Chanchalani, @Beer Biceps, @Rebel
              Kid
            </p>
          </div>
        </div>
      </div>
        <DownLoadMobile/>
        <Footer/>
    </div>
  );
};

export default HomeHero;
