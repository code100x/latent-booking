import React, { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent } from "@repo/ui/dialog";
import Image from "next/image";
import { cn } from "@repo/ui/utils";
import { useRouter } from "next/navigation";
import { IMAGES } from "@/app/_assets";
import { authApi } from "@/api/auth";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

interface OtpDialogProps {
  isOpen: boolean;
  phoneNumber: string;
  onClose: () => void;
}

export function OtpDialog({ isOpen, onClose, phoneNumber }: OtpDialogProps) {
  const { setIsAuthenticated } = useAuth();
  const [otpValues, setOtpValues] = useState(["", "", "", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  // Reset OTP values when dialog opens/closes
  useEffect(() => {
    setOtpValues(["", "", "", ""]);
    // Focus first input when dialog opens
    if (isOpen) {
      setTimeout(() => {
        inputRefs[0].current?.focus();
      }, 100);
    }
  }, [isOpen]);

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);

    // Move to next input if value is entered
    if (value !== "" && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === "Backspace" && index > 0 && otpValues[index] === "") {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleSubmit = async () => {
    const otp = otpValues.join("");
    if (otp.length !== 4) return;

    setIsSubmitting(true);
    try {
      const deviceId =
        "WebBrowser" + Date.now() + Math.random().toString(36).slice(2);

      const response = await authApi.verifyOtp({
        useremail: phoneNumber,
        otp: otp,
        device_id: deviceId,
        mydeviceid: "",
        mydeviceid2: "",
      });

      if (response.status === 200) {
        // Store token and userId in localStorage
        localStorage.setItem("token", response.user.token);
        localStorage.setItem("userId", response.user.userid);

        // Update auth state immediately
        setIsAuthenticated(true);

        toast.success("Sign in successful");

        // Close dialog and redirect
        onClose();
        router.push("/");
      } else {
        toast.error("Invalid OTP");
      }
    } catch (error) {
      toast.error("Failed to verify OTP");
      console.error("OTP verification error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    try {
      const response = await authApi.resentOtp(phoneNumber); // Pass phone number directly
      if (response.status === 200) {
        toast.success("OTP resent successfully");
        // Reset OTP inputs
        setOtpValues(["", "", "", ""]);
        // Focus first input
        inputRefs[0].current?.focus();
      }
    } catch (error) {
      toast.error("Failed to resend OTP");
      console.error("Resend OTP error:", error);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          setOtpValues(["", "", "", ""]); // Clear values when dialog closes
          onClose();
        }
      }}
    >
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
                src={IMAGES.OtpGirl}
                alt="OTP Girl"
                width={240}
                height={240}
                className="object-cover relative z-10 rounded-full top-4"
                priority
              />
            </div>
          </div>

          <div className="w-full mb-8">
            <h2 className={cn("text-white text-2xl mb-6 text-center")}>
              Enter your OTP
            </h2>

            <div className="flex justify-center gap-4">
              {otpValues.map((value, index) => (
                <input
                  key={index}
                  ref={inputRefs[index]}
                  type="text"
                  maxLength={1}
                  value={value}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-14 h-14 text-center text-2xl font-semibold 
                    bg-[#2A2A2A] border-2 border-[#3A3A3A] rounded-xl
                    focus:border-[#f8d48d] focus:outline-none text-white
                    transition-colors"
                />
              ))}
            </div>

            <div className="text-center mt-4">
              <button
                onClick={handleResend}
                className="text-neutral-400 text-sm underline"
              >
                Resend OTP
              </button>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={otpValues.some((v) => v === "") || isSubmitting}
            className={cn(
              "w-full mt-4 h-14 text-black font-medium py-4 rounded-xl transition-colors text-lg",
              !otpValues.some((v) => v === "") && !isSubmitting
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
