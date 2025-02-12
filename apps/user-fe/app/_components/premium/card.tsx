"use client";

import { useState } from "react";
import { Button } from "@repo/ui/button";
import {
  Check,
  Crown,
  Star,
  Zap,
  Smartphone,
  Video,
  Users,
} from "lucide-react";
import { cn } from "@repo/ui/utils";

export function PremiumCard() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly"
  );

  const features = [
    {
      icon: <Video className="w-4 h-4 text-[#f4b45a]" />,
      title: "HD & 4K Streaming",
      description: "Watch in stunning high definition quality",
    },
    {
      icon: <Zap className="w-4 h-4 text-[#f4b45a]" />,
      title: "Ad-Free Experience",
      description: "Uninterrupted viewing without ads",
    },
    {
      icon: <Smartphone className="w-4 h-4 text-[#f4b45a]" />,
      title: "Offline Downloads",
      description: "Watch your favorite content offline",
    },
    {
      icon: <Users className="w-4 h-4 text-[#f4b45a]" />,
      title: "Multiple Devices",
      description: "Stream on up to 4 devices at once",
    },
  ];

  const additionalFeatures = [
    "Early Access to New Videos",
    "Priority Customer Support 24/7",
    "Exclusive Member Events",
    "Premium Content Library",
  ];

  return (
    <div className="w-full max-w-[1200px] mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Content */}
        <div className="flex flex-col justify-center space-y-8">
          <div>
            <h2 className="text-4xl font-bold text-white mb-4">
              Upgrade to
              <span className="bg-gradient-to-r from-[#fdffe0] to-[#f4b45a] bg-clip-text text-transparent">
                {" "}
                Premium
              </span>
            </h2>
            <p className="text-neutral-400 text-lg">
              Unlock the full potential of our platform with premium features
              and exclusive content.
            </p>
          </div>

          {/* Main Features */}
          <div className="grid grid-cols-1 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-4 group">
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#f4b45a]/10 flex items-center justify-center
                  group-hover:bg-[#f4b45a]/20 transition-colors duration-300"
                >
                  {feature.icon}
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-neutral-400">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Features */}
          <div className="grid grid-cols-2 gap-4">
            {additionalFeatures.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#f4b45a]/10 flex items-center justify-center">
                  <Check className="w-3 h-3 text-[#f4b45a]" />
                </div>
                <span className="text-neutral-300 text-sm">{feature}</span>
              </div>
            ))}
          </div>

          {/* Trust Badges */}
          <div className="flex items-center gap-6 text-neutral-400 text-sm pt-4">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-[#f4b45a]" />
              <span>30-day money-back guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <Crown className="w-4 h-4 text-[#f4b45a]" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>

        {/* Right Card */}
        <div className="relative bg-[#1A1A1A] rounded-[32px] border-2 border-[#f8d48d] border-opacity-25 overflow-hidden">
          {/* Premium Badge */}
          <div className="absolute top-6 right-6">
            <div className="flex items-center gap-2 bg-[#f4b45a]/10 px-4 py-2 rounded-full border border-[#f4b45a]/20">
              <Crown className="w-4 h-4 text-[#f4b45a]" />
              <span className="text-sm font-medium text-[#f4b45a]">
                Premium
              </span>
            </div>
          </div>

          <div className="p-8">
            {/* Billing Toggle */}
            <div className="flex justify-center gap-4 mb-8">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={cn(
                  "px-6 py-2 rounded-full transition-all duration-300",
                  billingCycle === "monthly"
                    ? "bg-gradient-to-r from-[#fdffe0] via-[#f7ca7f] to-[#f4b45a] text-black font-medium shadow-lg"
                    : "text-neutral-400 hover:text-white"
                )}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("yearly")}
                className={cn(
                  "px-6 py-2 rounded-full transition-all duration-300 relative",
                  billingCycle === "yearly"
                    ? "bg-gradient-to-r from-[#fdffe0] via-[#f7ca7f] to-[#f4b45a] text-black font-medium shadow-lg"
                    : "text-neutral-400 hover:text-white"
                )}
              >
                Yearly
                <span className="absolute -top-3 -right-3 bg-[#f4b45a] text-black text-xs px-2 py-0.5 rounded-full font-medium">
                  -20%
                </span>
              </button>
            </div>

            {/* Price Display */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-2">
                <span className="text-5xl font-bold bg-gradient-to-r from-[#fdffe0] to-[#f4b45a] bg-clip-text text-transparent">
                  {billingCycle === "monthly" ? "₹299" : "₹2,999"}
                </span>
                <span className="text-neutral-400 ml-2">
                  /{billingCycle === "monthly" ? "mo" : "yr"}
                </span>
              </div>
              {billingCycle === "yearly" && (
                <div className="mt-2">
                  <span className="text-sm text-[#f4b45a]">
                    <span className="line-through opacity-50">₹3,588</span>{" "}
                    <span className="font-bold">₹2,999</span> ·{" "}
                    <span className="bg-[#f4b45a]/20 px-2 py-0.5 rounded-full">
                      Save ₹589
                    </span>
                  </span>
                </div>
              )}
            </div>

            {/* What's Included Section */}
            <div className="mb-8">
              <h4 className="text-white text-sm font-medium mb-4">
                What's included:
              </h4>
              <div className="space-y-3">
                {[
                  "Unlimited Access to All Content",
                  "Ad-Free Experience",
                  "HD & 4K Quality",
                  "Offline Downloads",
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-[#f4b45a]" />
                    <span className="text-neutral-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <Button
              className="w-full bg-gradient-to-r from-[#fdffe0] via-[#f7ca7f] to-[#f4b45a] 
                text-black font-medium py-6 rounded-xl hover:shadow-lg hover:shadow-[#f4b45a]/20 
                transition-all duration-300 transform hover:scale-[1.02] relative group overflow-hidden"
            >
              <span className="relative z-10">Get Premium Access</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </Button>

            {/* Trust Indicators */}
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-center gap-2 text-sm text-neutral-400">
                <Star className="w-4 h-4 text-[#f4b45a]" />
                <span>30-day money-back guarantee</span>
              </div>
              <div className="flex items-center justify-center gap-4 pt-4 border-t border-neutral-800">
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-[#f4b45a]" />
                  <span className="text-xs text-neutral-400">No Contract</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-[#f4b45a]" />
                  <span className="text-xs text-neutral-400">
                    Cancel Anytime
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-[#f4b45a]" />
                  <span className="text-xs text-neutral-400">
                    Instant Access
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PremiumCard;
