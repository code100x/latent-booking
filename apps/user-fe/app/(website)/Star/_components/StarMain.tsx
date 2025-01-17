import React from "react";
import Upgrade from "../../home/_components/Upgrade";
import Image from "next/image";
import Star from "../../../../public/assests/svg/star.svg";

const StarMain = () => {
  return (
    <div>
      <div>
        <p className=" font-manrope text-[48px] font-bold text-[#F8D48D]">
          Stars Of Latent
        </p>
        <p className=" font-manrope text-[#E5E5E5] w-[35%]">
          A gathering of our brightest talents, showcasing their hidden
          potential and extraordinary skills, ready to shine in the spotlight.
        </p>
      </div>

      <div className="grid grid-cols-5 gap-4 justify-center items-center mx-auto pt-[90px]">
        {Array(16)
          .fill("")
          .map((item, index) => (
            <div className="flex items-center justify-center" key={index}>
              <Image src={Star} alt="star" />
            </div>
          ))}
      </div>

      <Upgrade />
    </div>
  );
};

export default StarMain;
