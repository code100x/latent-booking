import React from "react";
import Episode from "./episode";
import { ChevronRight } from "lucide-react";

export default function LockedEp() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between mb-4">
        <div className="text-2xl font-semibold">Latent Episodes</div>
        <ChevronRight className="w-4 h-4" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((item, index) => (
          <Episode isLocked={true} key={index} />
        ))}
      </div>
    </div>
  );
}
