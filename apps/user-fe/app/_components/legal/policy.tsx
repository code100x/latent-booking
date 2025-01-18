import { cn } from "@repo/ui/utils";
import { manrope } from "../../lib/fonts";

interface PolicyLayoutProps {
  title: string;
  children: React.ReactNode;
}

export function PolicyLayout({ title, children }: PolicyLayoutProps) {
  return (
    <div className="w-full min-h-screen bg-black px-4 lg:px-6 py-16">
      <div className="max-w-[1440px] mx-auto">
        {/* Title */}
        <h1
          className={cn(
            "text-transparent bg-clip-text bg-gradient-to-t from-[#AA823D] via-[#EFE288] to-[#D1B85A] text-5xl font-bold mb-12",
            manrope.className
          )}
        >
          {title}
        </h1>

        {/* Content */}
        <div
          className={cn(
            "space-y-6 text-neutral-400 leading-relaxed",
            manrope.className
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
