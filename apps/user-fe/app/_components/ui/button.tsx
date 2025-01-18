import { cn } from "@repo/ui/utils";
import { figtree } from "../../lib/fonts";

export function Button() {
  return (
    <button
      className={cn(
        "px-8 py-3.5 bg-gradient-to-r from-[#aa823d] via-[#efe188] to-[#d1b759] rounded-xl",
        "hover:opacity-90 transition-opacity w-fit shadow-[0_0_15px_rgba(170,130,61,0.3)]",
        figtree.className
      )}
    >
      <span className="text-neutral-950 text-lg font-semibold">
        Join Latent+
      </span>
    </button>
  );
}
