import React from "react";
import Navbar from "./navbar";
import Hero from "./hero";
import Featured from "./featured";
import Upgrade from "./upgrade";
import LockedEp from "../locked-ep";
import CTA from "./cta";

export default function Landing() {
  return (
    <>
      <Hero />
      <Featured />
      <Upgrade />
      <LockedEp />
      <CTA />
    </>
  );
}
