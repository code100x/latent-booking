import React from "react";
import Image from "next/image";
import maheep from "../../../public/assests/img/maheepji.png";

const Login = () => {
  return (
    <div className=" border border-[#F8D48D] rounded-xl bg-dark relative flex flex-col items-center font-manrope w-[70%] m-auto p-8">
      <div className="logo bg-[linear-gradient(180deg,#FDFFE0_19.3%,#F7CA7F_40.22%,#F4B45A_58.41%)] border border-[#171717] rounded-full overflow-hidden mb-9 w-[200px] h-[200px] flex items-center justify-center">
        <Image
          src={maheep}
          alt=" maheep"
          className="w-fit object-cover pt-5"
        />
        <div className=" bg-white rounded-3xl py-[9.6px] px-[14.4px] absolute top-14 right-[15%] z-[99999] font-semibold text-[#0A0A0A] -rotate-12">
          <p>Likho 98..</p>
        </div>
      </div>

      <div className="action_text w-full">
        <p className=" text-[#FAFAFA] font-manrope text-2xl font-medium">
        Enter your phone number or email,
          <span className=" text-[#A3A3A3] underline"> we promise no spam.</span>
        </p>
      </div>

      <div className=" mt-6 mb-11 w-full">
        <input type="text" className=" w-full bg-[#262626] border border-border-gold rounded-lg p-3 outline-none"/>
      </div>

      <div className=" cta font-semibold w-full">
        <div className=" bg-[#EDEAE2] rounded-lg text-[#0A0A0A] text-center py-3 ">
          <p>Next</p>
        </div>
        <p className=" bg-[#404040] h-[1px] w-full my-3"></p>
        <div className=" bg-[#EDEAE2] rounded-lg text-[#0A0A0A] text-center py-3 ">
          <p>Continue with Google</p>
        </div>
      </div>

      <div className=" text-center mt-6 w-[80%]">
        <p className=" text-[#A3A3A3] font-medium">
          By starting the onboarding you agree to the{" "}
          <span className="text-[#FEFEFE] underline">Terms of service </span> &
          <span className="text-[#FEFEFE] underline"> Privacy Policy</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
