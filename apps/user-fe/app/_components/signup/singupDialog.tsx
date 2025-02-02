import { Dialog, DialogContent } from "@repo/ui/dialog";
import Image from "next/image";
import { cn } from "@repo/ui/utils";
import { figtree, manrope } from "../../lib/fonts";
import { useState } from "react";
import { MaheepSingh } from "../../assets";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSignUpSchema } from "@repo/common/types";
import Link from "next/link";
import axios from "axios";
import { Loader } from 'lucide-react';
import { OtpDialog } from "./otp-dialog";
import { z } from "zod";

interface LoginDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginDialog({ isOpen, onClose }: LoginDialogProps) {
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const apiEndPoint = process.env.NEXT_PUBLIC_BACKEND_URL + "user/signup";

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<z.infer<typeof UserSignUpSchema>>({
    resolver: zodResolver(UserSignUpSchema),
    mode: "onChange",
  });

  const onSubmit = async () => {
    const phoneNumber = getValues("number");
    setLoading(true);
    try {
      const response = await axios.post(
        apiEndPoint,
        {
          number: process.env.NEXT_PUBLIC_PHONE_PREFIX + phoneNumber,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setShowOtp(true);
      }
    } catch (error) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog
        open={isOpen && !showOtp}
        onOpenChange={() => {
          setShowOtp(false);
          onClose();
        }}
      >
        <DialogContent className="max-w-[480px] max-h-[750px] bg-[#1A1A1A] p-12 border-[#f8d48d] border-opacity-25 border-2 rounded-[32px]">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center pt-10 pb-8"
          >
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
              <div className="absolute -right-10 top-8 bg-white text-black px-3 py-1 rounded-xl text-sm font-medium -rotate-6">
                Likho 98..
              </div>
            </div>

            <div className="mb-8">
              <h2 className={cn("text-white text-2xl mb-1", figtree.className)}>
                Enter your phone number or email,{" "}
                <span className="text-neutral-400 text-2xl">
                  we promise no spam.
                </span>
              </h2>
            </div>

            <input
              {...register("number")}
              type="text"
              placeholder="9876543***"
              className={cn(
                "w-full h-14 bg-transparent border rounded-xl px-5 py-6 text-white mb-4 focus:outline-none focus:border-[#F8D48D] placeholder-neutral-400 text-lg",
                errors.number ? "border-red-500" : "border-[#333333]"
              )}
            />
            {errors.number && (
              <p className="text-red-500 text-sm mb-4">
                {errors.number.message}
              </p>
            )}

            <div className="w-full space-y-3">
              <button
                type="submit"
                disabled= {loading ? true : false}
                className="w-full h-14 bg-[#F4F4F4] text-black font-medium py-4  flex justify-center items-center rounded-xl hover:bg-white transition-colors text-lg"
              >
                {loading ? <Loader className="animate-spin" /> : "Next"}
              </button>

              <div className="w-full h-[1px] bg-[#333333]" />

              <button
                type="button"
                className="w-full h-14 bg-[#F4F4F4] text-black font-medium py-4 rounded-xl hover:bg-white transition-colors text-lg"
              >
                Continue with Google
              </button>
            </div>

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
          </form>
        </DialogContent>
      </Dialog>

      <OtpDialog
        phoneNumber={process.env.NEXT_PUBLIC_PHONE_PREFIX + getValues("number")}
        isOpen={showOtp}
        onClose={() => setShowOtp(false)}
      />
    </>
  );
}
