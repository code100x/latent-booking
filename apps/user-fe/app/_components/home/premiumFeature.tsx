import { cn } from "@repo/ui/utils";
import { JoinButton } from "./joinButton";
import { BadgeCheckIcon } from "lucide-react";

export function PremiumFeatures() {
  const features = [
    "India's Got Latent deleted footage",
    "Access to members only live streams",
    "Access to all unlisted content",
    "Access to members only live chat",
    "Discord voice channel for the members",
  ];

  return (
    <div className="relative">
      <div className="rounded-[24px] bg-[#1A1A1A] border border-[#aa823d]/20 p-12 relative">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-[#aa823d] opacity-[0.03] blur-[100px]" />

        <div className="grid grid-cols-1 lg:grid-cols-2 relative z-10 justify-between ">
          {/* Left section */}
          <div className="space-y-10 ">
            <div className="space-y-4">
              <h2 className={cn("text-[40px] leading-tight font-bold")}>
                <span className="text-neutral-50">Upgrade to </span>
                <span className="bg-gradient-to-r from-[#AA823D] via-[#EFE288] to-[#D1B85A] text-transparent bg-clip-text">
                  Latent+
                </span>
              </h2>
              <p
                className={cn(
                  "text-neutral-200 text-lg leading-relaxed max-w-[600px]"
                )}
              >
                Elevate your fandom by becoming a Samay ke Dost, a Samay ke
                Khaas, or a Silent Supporter! Unlock amazing exclusive perks and
                get early access to the hottest episodes of India&apos;s Got
                Latent!
              </p>
            </div>
            <JoinButton />
          </div>

          {/* Right section - Feature list */}
          <div className="space-y-8 w-[480px] ml-auto">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <BadgeCheckIcon className="w-6 h-6 text-[#AA823D] flex-shrink-0" />
                <span
                  className={cn(
                    "text-neutral-50 text-2xl font-thin leading-10"
                  )}
                >
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
