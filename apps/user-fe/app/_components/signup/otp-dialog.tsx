import React, { useState } from "react";
import { Dialog, DialogContent } from "@repo/ui/dialog";
import Image from "next/image";
import { cn } from "@repo/ui/utils";
import { manrope } from "../../lib/fonts";
import { OtpGirl } from "../../assets";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@repo/ui/input";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface OtpDialogProps {
  isOpen: boolean;
  phoneNumber: string;
  onClose: () => void;
}

export function OtpDialog({ isOpen, onClose, phoneNumber }: OtpDialogProps) {
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleOtpChange = (otpValue: string) => {
    setOtp(otpValue);
  };

  const handleSubmit = async () => {
    if (otp.length === 6) {
      setIsSubmitting(true);
    }
    console.log("otp", otp, " phone", phoneNumber);
    const response = await axios.post(
      process.env.NEXT_PUBLIC_BACKEND_URL + "user/signup/verify",
      {
        number: phoneNumber,
        totp: otp,
        name: "GUest User",
      },
      {
        withCredentials: true,
      }
    );
    console.log("Response in the otp", response.data);
    if (response.status === 200) {
      toast.success("Singin Successful.");
    } else {
      toast.error("Something went wrong.");
    }
    setIsSubmitting(false);
    router.push("/");
  };

  const handleResend = () => {
    // Implement resend OTP logic
    console.log("Resend OTP");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[480px] bg-[#1A1A1A] p-12 border-[#f8d48d] border-opacity-25 border-2 rounded-[32px]">
        <div className="flex flex-col items-center pt-10 pb-8">
          <button
            onClick={onClose}
            className="self-start text-white mb-6 hover:text-neutral-400 transition-colors"
          >
            ← Back
          </button>

          <div className="relative mb-8">
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
                <button
                  onClick={handleResend}
                  className="text-neutral-400 text-2xl underline mb-6"
                >
                  Resend?
                </button>
              </span>
            </h2>
          </div>

          <InputOTP maxLength={6} value={otp} onChange={handleOtpChange}>
            <InputOTPGroup>
              <InputOTPSlot
                index={0}
                className="border p-5 ml-1 border-slate-500"
              />
              <InputOTPSlot
                index={1}
                className="border p-5 ml-1 border-slate-500"
              />
              <InputOTPSlot
                index={2}
                className="border p-5 ml-1 border-slate-500"
              />
              <InputOTPSlot
                index={3}
                className="border p-5 ml-1 border-slate-500"
              />
              <InputOTPSlot
                index={4}
                className="border p-5 ml-1 border-slate-500"
              />
              <InputOTPSlot
                index={5}
                className="border p-5 ml-1 border-slate-500"
              />
            </InputOTPGroup>
          </InputOTP>

          <button
            onClick={handleSubmit}
            disabled={otp.length !== 6 || isSubmitting}
            className={cn(
              "w-full mt-10 h-14 text-black font-medium py-4 rounded-xl transition-colors text-lg",
              otp.length === 6 && !isSubmitting
                ? "bg-[#F4F4F4] hover:bg-white"
                : "bg-neutral-400 cursor-not-allowed"
            )}
          >
            {isSubmitting ? "Verifying..." : "Verify"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
