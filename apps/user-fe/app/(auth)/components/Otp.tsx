"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import dependentaurat from "../../../public/assests/img/dependentaurat.png";

const Otp = () => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [otp, setOtp] = useState(new Array(4).fill(""));
 const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const{value} = e.target;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if(value && index < inputRefs.current.length-1){
        inputRefs.current[index + 1]?.focus();
    }
 }

 const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement> , index: number) => {
    
    if (e.key === "ArrowRight" && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "Backspace" && index > 0 && !(e.target as HTMLInputElement).value) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className=" border border-[#F8D48D] rounded-xl bg-dark relative flex flex-col items-center font-manrope w-[50%] m-auto p-8">
      <div className="logo bg-[linear-gradient(180deg,#FDFFE0_19.3%,#F7CA7F_40.22%,#F4B45A_58.41%)] border border-[#171717] rounded-full overflow-hidden mb-9 w-[200px] h-[200px] flex items-center justify-center">
        <Image
          src={dependentaurat}
          alt=" maheep"
          className="w-fit object-cover pt-5"
        />
        <div className=" bg-white rounded-3xl py-[9.6px] px-[14.4px] absolute top-14 right-[15%] z-[99999] font-semibold text-[#0A0A0A] -rotate-12">
          <p>Likho 98..</p>
        </div>
      </div>

      <div className="action_text mr-auto">
        <p className=" text-[#FAFAFA] font-manrope text-2xl font-medium">
          Enter your OTP.
          <span className=" text-[#A3A3A3] underline">Resend?</span>
        </p>
      </div>

      <div className=" grid grid-cols-4 gap-3 mt-6 mb-11">
        {Array(4)
          .fill("")
          .map((_, index) => (
            <input
              key={index}
              type="text"
              className=" border py-3 text-center outline-none focus:border-border-gold rounded-lg bg-[#262626] border-[#F8D48D40]"
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              value={otp[index]}
              onChange={(e) => handleChange(e , index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          ))}
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

      <div className=" text-center mt-6">
        <p className=" text-[#A3A3A3] font-medium">
          By starting the onboarding you agree to the{" "}
          <span className="text-[#FEFEFE] underline">Terms of service </span> &
          <span className="text-[#FEFEFE] underline"> Privacy Policy</span>
        </p>
      </div>
    </div>
  );
};

export default Otp;
