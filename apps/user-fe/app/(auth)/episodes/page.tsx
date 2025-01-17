import Featured from "@/components/landing/featured";
import LockedEp from "@/components/locked-ep";
import React from "react";

export default function EpisodesPage() {
  return (
    <>
      <div className="flex flex-col gap-14">
        <Featured />
        <LockedEp />
      </div>
      <div>EpisodesPage</div>
    </>
  );
}
