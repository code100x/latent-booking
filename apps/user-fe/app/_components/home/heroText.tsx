import { cn } from "@repo/ui/utils";

export function HeroText() {
  return (
    <div className="space-y-6 max-w-[540px] mt-7">
      <h1 className={cn("text-4xl leading-[1.1] font-bold")}>
        <div className="tracking-tighter">
          <span className="text-neutral-50">Welcome to </span>
          <span className="bg-gradient-to-r from-[#D1B85A] via-[#EFE288] to-[#AA823D] from text-transparent bg-clip-text">
            India&apos;s Got Latent
          </span>
        </div>
      </h1>
      <p className={cn("text-lg leading-relaxed")}>
        <span className="text-neutral-200">Hosted by the ever-sarcastic </span>
        <span className="text-neutral-50 font-bold">Samay Raina</span>
        <span className="text-neutral-200">
          , this show is less about finding the next superstar and more about
          giving your latent (read: bizarre) talents a chance to shine—while
          being lovingly roasted.
        </span>
      </p>
    </div>
  );
}
