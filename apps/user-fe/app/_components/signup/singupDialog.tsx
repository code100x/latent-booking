import { Dialog, DialogContent } from "@repo/ui/dialog";
import { Input } from "@repo/ui/input";
import { Button } from "@repo/ui/button";
import Image from "next/image";
import { cn } from "@repo/ui/utils";
import { figtree, manrope } from "../../lib/fonts";
import { useState } from "react";
import { MaheepSingh } from "../../assets";
import { OtpDialog } from "./otp-dialog";

interface LoginDialogProps {
  isOpen: boolean;
  onClose: () => void;
}
import Link from "next/link";

interface LoginDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

interface LoginDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginDialog({ isOpen, onClose }: LoginDialogProps) {
  const [showOtp, setShowOtp] = useState(false);

  // Handle closing both dialogs
  const handleClose = () => {
    setShowOtp(false);
    onClose();
  };

  // Handle next button click
  const handleNextClick = () => {
    setShowOtp(true);
  };

  return (
    <>
      <Dialog open={isOpen && !showOtp} onOpenChange={handleClose}>
        <DialogContent className="max-w-[480px] bg-[#1A1A1A] p-12 border-[#f8d48d] border-opacity-25 border-2 rounded-[32px]">
          <div className="flex flex-col items-center pt-10 pb-8">
            {/* Maheep Singh Image with Speech Bubble */}
            <div className="relative mb-8">
              <div className="w-[216px] h-[216px] rounded-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#fdffe0] via-[#f7ca7f] to-[#f4b45a] rounded-full" />
                <Image
                  src={MaheepSingh}
                  alt="Maheep Singh"
                  width={240}
                  height={240}
                  className="object-cover relative z-10 rounded-full top-4"
                  priority
                />
              </div>
              {/* Speech Bubble */}
              <div className="absolute -right-10 top-8 bg-white text-black px-3 py-1 rounded-xl text-sm font-medium -rotate-6">
                Likho 98..
              </div>
            </div>

            {/* Text */}
            <div className="mb-8">
              <h2 className={cn("text-white text-2xl mb-1", figtree.className)}>
                Enter your phone number or email,{" "}
                <span className="text-neutral-400 text-2xl">
                  we promise no spam.
                </span>
              </h2>
            </div>

            {/* Input Field */}
            <input
              type="text"
              placeholder="98"
              className="w-full h-14 bg-transparent border border-[#333333] rounded-xl px-5 py-6 text-white mb-4 focus:outline-none focus:border-[#F8D48D] placeholder-neutral-400 text-lg"
            />

            {/* Buttons with Separator */}
            <div className="w-full space-y-3">
              <button
                onClick={() => setShowOtp(true)}
                className="w-full h-14 bg-[#F4F4F4] text-black font-medium py-4 rounded-xl hover:bg-white transition-colors text-lg"
              >
                Next
              </button>

              <div className="w-full h-[1px] bg-[#333333]" />

              <button className="w-full h-14 bg-[#F4F4F4] text-black font-medium py-4 rounded-xl hover:bg-white transition-colors text-lg">
                Continue with Google
              </button>
            </div>

            {/* Terms Text */}
            <div
              className={cn(
                "text-neutral-400 text-sm mt-6 text-center flex flex-col gap-1",
                manrope.className
              )}
            >
              <p>By starting the onboarding you agree to the</p>
              <p>
                <Link
                  href="/terms"
                  className="text-white hover:underline underline"
                >
                  Terms of service
                </Link>{" "}
                &{" "}
                <Link href="/privacy" className="text-white underline">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <OtpDialog isOpen={showOtp} onClose={() => setShowOtp(false)} />
    </>
  );
}

// Usage in your component:
export function YourComponent() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsLoginOpen(true)}
        className="px-6 py-2 bg-gradient-to-r from-[#aa823d] via-[#efe188] to-[#d1b759] rounded-lg"
      >
        Login
      </Button>

      <LoginDialog isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
}
