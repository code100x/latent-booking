import React from "react";
import certified from "../../../../public/assests/svg/check-verified-02.svg";
import Image from "next/image";

const Upgrade = () => {
  const labels = [
    "⁠India's Got Latent deleted footage",
    "Access to members only live streams",
    "⁠Access to all unlisted content",
    "Access to members only live chat",
    "Discord voice channel for the members",
  ];
  return (
    <div className=" mt-[90px] font-manrope">
      <div className="rounded-[24px] border border-[rgba(248,212,141,0.25)] bg-[#171717] shadow-[0px_0px_64px_rgba(220,163,57,0.25)] p-12 flex items-center justify-between">
        <div className="w-[50%]">
          <p className="text-[36px] font-bold">
            Upgrade to
            <span className="ml-2 text-4xl font-bold bg-gradient-to-r from-[#AA823D] via-[#EFE288] to-[#D1B85A] bg-clip-text text-transparent mb-3">
              Latent+
            </span>
          </p>
          <p className=" text-[#D4D4D4] text-base mt-3 mb-9">
            Elevate your fandom by becoming a Samay ke Dost, a Samay ke Khaas,
            or a Silent Supporter! Unlock amazing exclusive perks and get early
            access to the hottest episodes of India’s Got Latent!
          </p>
          <button className="text-[#0A0A0A] font-figtree text-base font-semibold py-3 px-6 rounded-lg bg-[linear-gradient(262deg,#AA823D_-0.19%,#EFE288_59.57%,#D1B85A_85.24%)]">
            Join Latent+
          </button>
        </div>

        <div>
          <ul className=" space-y-6">
            {labels.map((data) => (
              <li className=" flex items-center">
                <Image src={certified} alt="certifies" />
                <p className="text-[#E5E5E5] font-manrope text-2xl">{data}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Upgrade;
