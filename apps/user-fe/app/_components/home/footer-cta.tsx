import Image from "next/image";
import { cn } from "@repo/ui/utils";
import { manrope } from "../../lib/fonts";
import { Amic, appStore, mobile, playStore } from "../../assets";

export default function FooterCta() {
  return (
    <div className="relative w-full mt-16">
      <div className="relative bg-gradient-to-br from-[#d1b759] via-[#efe188] to-[#aa823d] rounded-[24px] p-8 overflow-hidden">
        {/* Left Content */}
        <div className="relative z-10 flex flex-col max-w-[600px]">
          {/* Logo */}
          <div className="mb-10">
            <Image src={Amic} alt="Latent Icon" className="object-contain " />
          </div>

          {/* Text Content */}
          <div className="space-y-4">
            <h2
              className={cn(
                "text-[#1A1A1A] text-[44px] font-bold leading-[1.1]",
                manrope.className
              )}
            >
              Install Latent on mobile
            </h2>
            <p
              className={cn(
                "text-[#1A1A1A]/80 text-xl leading-relaxed max-w-[800px] ",
                manrope.className
              )}
            >
              Grab the app to check out all the cool exclusive stuff anytime,
              right from your phone. Download the Latent app today!
            </p>
          </div>

          {/* App Store Buttons */}
          <div className="flex justify-start pt-16 mb-6">
            <div className="flex justify-center items-center gap-6">
              <a
                href="#"
                className="overflow-hidden hover:opacity-90 transition-opacity"
              >
                <Image
                  src={playStore || "/placeholder.svg"}
                  width={194}
                  alt="Get it on Google Play"
                />
              </a>
              <a
                href="#"
                className="overflow-hidden hover:opacity-90 transition-opacity"
              >
                <Image
                  src={appStore || "/placeholder.svg"}
                  alt="Download on the App Store"
                  width={180}
                  className="bg-[#E1D283]"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Phone Image */}
        <div className="absolute right-[-5%] -top-36 w-[960px] h-[1250px] ">
          <Image
            src={mobile}
            alt="Latent App"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
}
