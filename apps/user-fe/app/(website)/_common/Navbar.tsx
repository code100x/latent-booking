"use client";
import React, { useState } from "react";
import logo from "../../../public/assests/img/latent-logo.png";
import Image from "next/image";

const Navbar = () => {
    const labels = ["Home" , "Episodes" , "Stars Of Latent"];
    const[selected , setSelected] = useState("Home");
  return (
    <div className=" font-manrope flex items-center justify-around py-6 mb-[90px]">
      <div className="logo ml-[-12rem]">
        <Image src={logo} alt="logo" />
      </div>

      <div>
        <ul className=" flex items-center space-x-12 cursor-pointer">
            {labels.map((item,index) => <li className={`${selected === item ? " text-[#F8D48D]" : "text-[#A3A3A3]"}  font-medium text-base`} onClick={() => setSelected(item)} key={index}>{item}</li> )}
        </ul>
      </div>

      <div className=" mr-[-12rem]">
        <button className="font-figtree py-2 px-6 rounded-lg bg-[linear-gradient(262deg,#AA823D_-0.19%,#EFE288_59.57%,#D1B85A_85.24%)] text-[#0A0A0A] font-semibold text-base">
          Login
        </button>
      </div>
    </div>
  );
};

export default Navbar;
