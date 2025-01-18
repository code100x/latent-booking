import { Dialog, DialogContent } from "@repo/ui/dialog";
import Image from "next/image";
import { cn } from "@repo/ui/utils";
import { manrope } from "../../lib/fonts";
import { OtpGirl } from "../../assets";
import { useState } from "react";

interface OtpDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

// app/_components/auth/otp-dialog.tsx

export function OtpDialog({ isOpen, onClose }: OtpDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[480px] bg-[#1A1A1A] p-12 border-[#f8d48d] border-opacity-25 border-2 rounded-[32px]">
        <div className="flex flex-col items-center pt-10 pb-8">
          {/* Back Button */}
          <button
            onClick={onClose}
            className="self-start text-white mb-6 hover:text-neutral-400 transition-colors"
          >
            ← Back
          </button>

          {/* Image Container with Speech Bubble */}
          <div className="relative mb-8">
            {/* Speech Bubble */}
            <div className="absolute top-44 left-1/2 -translate-x-1/3 bg-white text-neutral-950 px-4 py-2 rounded-3xl font-medium text-base whitespace-nowrap z-20">
              Kahin to consent le raha hai
            </div>

            <div className="w-[216px] h-[216px] rounded-full overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-[#fdffe0] via-[#f7ca7f] to-[#f4b45a] rounded-full" />
              <Image
                src={OtpGirl}
                alt="OTP Girl"
                width={240}
                height={240}
                className="object-cover relative z-10 rounded-full top-4"
                priority
              />
            </div>
          </div>

          <div className="mb-8">
            <h2 className={cn("text-white text-2xl mb-1", manrope.className)}>
              Enter your OTP.{" "}
              <span>
                <button className="text-neutral-400 text-2xl underline mb-6">
                  Resend?
                </button>
              </span>
            </h2>
          </div>

          {/* Resend Link */}

          {/* OTP Input Fields */}
          <div className="flex gap-3 mb-6">
            {[...Array(4)].map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                className="w-14 h-14 bg-transparent border border-[#333333] rounded-xl text-center text-white text-2xl focus:outline-none focus:border-[#F8D48D]"
              />
            ))}
          </div>

          {/* Verify Button */}
          <button className="w-full h-14 bg-[#F4F4F4] text-black font-medium py-4 rounded-xl hover:bg-white transition-colors text-lg">
            Verify
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
