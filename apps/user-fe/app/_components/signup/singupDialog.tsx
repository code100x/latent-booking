import { Dialog, DialogContent } from "@repo/ui/dialog";
import Image from "next/image";
import { cn } from "@repo/ui/utils";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSignUpSchema } from "@repo/common/types";
import Link from "next/link";
import axios from "axios";
import { Loader } from "lucide-react";
import { OtpDialog } from "./otp-dialog";
import { z } from "zod";
import { IMAGES } from "@/app/_assets";
import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
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
        <DialogContent className="max-w-[480px] max-h-[90vh] bg-background p-12 !rounded-3xl">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center gap-4"
          >
            <div className="relative">
              <div className="size-[180px] rounded-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#fdffe0] via-[#f7ca7f] to-[#f4b45a] rounded-full" />
                <Image
                  src={IMAGES.MaheepSingh}
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

            <h2 className="text-white text-2xl text-center">
              Enter your phone number or email,{" "}
              <span className="text-neutral-400 text-2xl">
                we promise no spam.
              </span>
            </h2>

            <Input
              {...register("number")}
              type="text"
              placeholder="98765 43210"
              className="rounded-lg text-base"
            />
            {errors.number && (
              <p className="text-red-500 text-sm">{errors.number.message}</p>
            )}

            <div className="w-full space-y-3">
              <Button
                type="submit"
                disabled={loading ? true : false}
                className="w-full"
                variant="accent"
                size="lg"
              >
                {loading ? <Loader className="animate-spin" /> : "Next"}
              </Button>

              <div className="w-full h-[1px] bg-[#333333]" />

              <Button
                type="button"
                variant="secondary"
                size="lg"
                className="w-full"
              >
                Continue with Google
              </Button>
            </div>

            <div
              className={cn(
                "text-neutral-400 text-sm mt-6 text-center flex flex-col gap-1"
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
