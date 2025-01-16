import React from "react";
import Image from "next/image";
import latent from "../../../../public/assests/img/indiagot.png";
import youtube from "../../../../public/assests/img/youtube.png";
import twitter from "../../../../public/assests/img/twitter.png";
import insta from "../../../../public/assests/img/instagram.png";
const Footer = () => {
  return (
    <div className=" border-2 border-[rgba(248,212,141,0.25)] bg-[#171717] p-16 rounded-[32px] flex items-start justify-between ">
        <div className="w-[40%]">
            <Image src={latent} alt="latent"/>
            <p className="text-[#A3A3A3] font-manrope text-base my-8">India’s Got Latent humorously celebrates India’s quirkiest hidden talents, blending entertainment, satire, and unconventional performances.</p>
            <p className=" font-manrope text-[#D4D4D4]">All rights reserved to Samay Raina 2025.</p>

            <div className=" pt-16 flex items-center -space-x-28 mt-[-7rem] ml-[-4rem]">
            <Image src={youtube} alt="latent"/>
            <Image src={twitter} alt="latent"/>
            <Image src={insta} alt="latent"/>
            </div>
        </div>
        <div className=" w-[40%] flex items-start gap-10 justify-end">
            <div>
                <p className=" text-[#E5E5E5] font-manrope text-base font-semibold mb-6">Links</p>
                <div>
                    <ul>
                        <li className="mb-3">Home</li>
                        <li className="mb-3">Episodes</li>
                        <li className="mb-3">Stars of Latent</li>
                    </ul>
                </div>
            </div>
            <div>
                <p className=" text-[#E5E5E5] font-manrope text-base font-semibold mb-6">Legal</p>
                <div>
                    <ul>
                        <li className="mb-3">Terms & Conditions</li>
                        <li className="mb-3">Privacy Policy</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Footer;
