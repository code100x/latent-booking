import { cn } from "@repo/ui/utils";

export function JoinButton() {
  return (
    <button
      className={cn(
        "px-6 py-3 bg-gradient-to-r from-[#aa823d] via-[#efe188] to-[#d1b759] rounded-xl",
        "hover:opacity-90 transition-opacity w-fit shadow-[0_0_15px_rgba(170,130,61,0.3)]"
      )}
    >
      <a href="/premium">
        <span className="text-neutral-950 text-lg font-semibold">
          Join Latent+
        </span>
      </a>
    </button>
  );
}
